"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import {
  categories,
  filterProducts,
  getBrandsByCategory,
  getPriceRange,
} from "../../../data/products.js";
import { ProductGrid } from "../../../components/products/ProductGrid.jsx";
import { FilterSidebar } from "../../../components/products/FilterSidebar.jsx";
import { SortSelect } from "../../../components/products/SortSelect.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { formatCurrency } from "../../../lib/formatters.js";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const category = categories.find((item) => item.slug === slug);

  const [sortBy, setSortBy] = useState("newest");
  const [filters, setFilters] = useState({
    brands: [],
    subcategories: [],
    minPrice: undefined,
    maxPrice: undefined,
    minRating: undefined,
  });

  const toggleSubcategory = (subcategory) => {
    setFilters((current) => {
      const selected = current.subcategories || [];
      const exists = selected.includes(subcategory);
      return {
        ...current,
        subcategories: exists
          ? selected.filter((item) => item !== subcategory)
          : [...selected, subcategory],
      };
    });
  };

  const clearSubcategoryChips = () =>
    setFilters((current) => ({
      ...current,
      subcategories: [],
    }));

  const clearFilters = () =>
    setFilters({
      brands: [],
      subcategories: [],
      minPrice: undefined,
      maxPrice: undefined,
      minRating: undefined,
    });

  const brands = useMemo(() => getBrandsByCategory(slug), [slug]);
  const priceRange = useMemo(() => getPriceRange(slug), [slug]);

  const products = useMemo(() => {
    const selectedSort = sortBy === "relevance" ? undefined : sortBy;
    return filterProducts(slug, filters, selectedSort);
  }, [slug, filters, sortBy]);

  if (!category) {
    return (
      <div className="container-shell py-16 text-center">
        <h1 className="text-4xl font-semibold">Category Not Found</h1>
        <p className="mt-3 text-muted-foreground">
          We could not locate this category.
        </p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    );
  }

  const hasActiveFilters =
    (filters.brands?.length || 0) > 0 ||
    (filters.subcategories?.length || 0) > 0 ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined ||
    filters.minRating !== undefined;

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
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </div>

          <div className="surface-card p-5 md:p-6">
            <h1 className="text-3xl font-semibold md:text-4xl">{category.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              {category.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full bg-secondary px-3 py-1">{products.length} products</span>
              <button
                type="button"
                onClick={clearSubcategoryChips}
                className={`rounded-full border px-3 py-1 transition ${
                  (filters.subcategories || []).length === 0
                    ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                All
              </button>
              {(category.subcategories || []).map((subcategory) => (
                <button
                  type="button"
                  key={subcategory}
                  onClick={() => toggleSubcategory(subcategory)}
                  className={`rounded-full border px-3 py-1 transition ${
                    (filters.subcategories || []).includes(subcategory)
                      ? "border-primary/40 bg-primary/10 font-semibold text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {subcategory}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{products.length} results</span>
            {hasActiveFilters && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">Filtered</span>}
          </div>
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

        <div className="flex gap-6">
          <FilterSidebar
            brands={brands}
            subcategories={category.subcategories || []}
            priceRange={priceRange}
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
          />
          <div className="min-w-0 flex-1">
            <ProductGrid products={products} columns={4} />
          </div>
        </div>
      </div>
    </div>
  );
}
