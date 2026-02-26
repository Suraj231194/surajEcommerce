"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Sparkles, TrendingUp, X } from "lucide-react";
import { FilterSidebar } from "../../components/products/FilterSidebar.jsx";
import { ProductGrid } from "../../components/products/ProductGrid.jsx";
import { SortSelect } from "../../components/products/SortSelect.jsx";
import { NoProductsRescue } from "../../components/search/NoProductsRescue.jsx";
import { SearchAutocomplete } from "../../components/shared/SearchAutocomplete.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import {
  allProducts,
  getBestSellerProducts,
  getDealProducts,
  getTrendingProducts,
  searchProducts,
} from "../../data/products.js";
import { formatCurrency } from "../../lib/formatters.js";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoadingState />}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const queryLower = query.toLowerCase();
  const isDealsQuery = /deal|discount|offer|sale|flash/.test(queryLower);
  const isTrendingQuery = /trending|popular|hot/.test(queryLower);
  const isWishlistQuery = /wishlist|saved|liked|favorite|favourite/.test(queryLower);
  const { items: wishlistItems } = useWishlist();
  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    brands: [],
    subcategories: [],
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
  });
  const clearFilters = () =>
    setFilters({
      brands: [],
      subcategories: [],
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
    });

  const wishlistResults = useMemo(() => {
    return wishlistItems
      .map((item) => allProducts.find((product) => product.id === item.id) || item)
      .filter(Boolean);
  }, [wishlistItems]);

  const baseResults = useMemo(() => {
    if (!query) {
      return allProducts.slice(0, 180);
    }
    if (isWishlistQuery) {
      return wishlistResults.length ? wishlistResults : getBestSellerProducts(180);
    }
    return searchProducts(query);
  }, [query, isWishlistQuery, wishlistResults]);

  const brands = useMemo(
    () => [...new Set(baseResults.map((product) => product.brand))].sort(),
    [baseResults]
  );

  const subcategories = useMemo(
    () => [...new Set(baseResults.map((product) => product.subcategory))].sort(),
    [baseResults]
  );

  const priceRange = useMemo(() => {
    if (!baseResults.length) {
      return { min: 0, max: 100000 };
    }
    const prices = baseResults.map((product) => product.discountPrice);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [baseResults]);

  const products = useMemo(() => {
    let filtered = [...baseResults];

    if (filters.brands?.length) {
      filtered = filtered.filter((product) => filters.brands.includes(product.brand));
    }

    if (filters.subcategories?.length) {
      filtered = filtered.filter((product) => filters.subcategories.includes(product.subcategory));
    }

    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((product) => product.discountPrice >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((product) => product.discountPrice <= filters.maxPrice);
    }

    if (filters.minRating !== undefined) {
      filtered = filtered.filter((product) => product.ratingAvg >= filters.minRating);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.ratingAvg - a.ratingAvg);
        break;
      case "discount":
        filtered.sort((a, b) => (b.price - b.discountPrice) / b.price - (a.price - a.discountPrice) / a.price);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [baseResults, filters, sortBy]);

  const fallbackProducts = useMemo(() => {
    if (isDealsQuery) {
      return getDealProducts(24);
    }
    if (isTrendingQuery) {
      return getTrendingProducts(24);
    }
    if (isWishlistQuery) {
      return wishlistResults.length ? wishlistResults.slice(0, 24) : getBestSellerProducts(24);
    }
    return getTrendingProducts(24);
  }, [isDealsQuery, isTrendingQuery, isWishlistQuery, wishlistResults]);

  const noExactResults = products.length === 0;
  const displayProducts = noExactResults ? fallbackProducts : products;

  const appliedChips = useMemo(() => {
    const chips = [];

    (filters.brands || []).forEach((brand) => {
      chips.push({
        id: `brand-${brand}`,
        label: brand,
        onRemove: () =>
          setFilters((current) => ({
            ...current,
            brands: (current.brands || []).filter((item) => item !== brand),
          })),
      });
    });

    (filters.subcategories || []).forEach((subcategory) => {
      chips.push({
        id: `subcategory-${subcategory}`,
        label: subcategory,
        onRemove: () =>
          setFilters((current) => ({
            ...current,
            subcategories: (current.subcategories || []).filter((item) => item !== subcategory),
          })),
      });
    });

    if (filters.minRating !== undefined) {
      chips.push({
        id: `rating-${filters.minRating}`,
        label: `${filters.minRating} stars & up`,
        onRemove: () =>
          setFilters((current) => ({
            ...current,
            minRating: undefined,
          })),
      });
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const min = filters.minPrice ?? priceRange.min;
      const max = filters.maxPrice ?? priceRange.max;
      chips.push({
        id: "price-range",
        label: `${formatCurrency(min)} - ${formatCurrency(max)}`,
        onRemove: () =>
          setFilters((current) => ({
            ...current,
            minPrice: undefined,
            maxPrice: undefined,
          })),
      });
    }

    return chips;
  }, [filters, priceRange.max, priceRange.min]);

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 space-y-4">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>{" "}
            / Search
          </div>

          <div className="surface-card p-5 md:p-6">
            <h1 className="text-3xl font-semibold md:text-4xl">
              {query ? `Results for "${query}"` : "Explore products"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              Discover products with filters, sorting and quick actions.
            </p>
            <div className="mt-4 max-w-2xl">
              <SearchAutocomplete inputClassName="h-11 bg-background" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <QuickSearchChip href="/search?q=trending" label="Trending today" icon={TrendingUp} />
              <QuickSearchChip href="/search?q=deals" label="Deals of the day" icon={Sparkles} />
              <QuickSearchChip href="/search?q=best+sellers" label="Best sellers" />
              <QuickSearchChip href="/search?q=wishlist" label="Wishlist picks" />
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {noExactResults && query
              ? `No exact results for "${query}". Showing ${displayProducts.length} popular products.`
              : `${displayProducts.length} results found`}
          </p>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        {appliedChips.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {appliedChips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background px-3 py-1 text-xs font-medium transition hover:border-primary/40 hover:text-primary"
              >
                {chip.label}
                <X className="h-3.5 w-3.5" />
              </button>
            ))}
            <Button type="button" variant="ghost" size="sm" className="h-7 rounded-full text-xs" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}

        {noExactResults && (
          <NoProductsRescue query={query} onClearFilters={clearFilters} />
        )}

        <div className="flex gap-6">
          <FilterSidebar
            brands={brands}
            subcategories={subcategories}
            priceRange={priceRange}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
          />
          <div className="min-w-0 flex-1">
            <ProductGrid products={displayProducts} columns={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickSearchChip({ href, label, icon: Icon }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {label}
    </Link>
  );
}

function SearchLoadingState() {
  return (
    <div className="container-shell py-20">
      <div className="surface-card p-6">
        <p className="text-sm text-muted-foreground">Loading search results...</p>
      </div>
    </div>
  );
}
