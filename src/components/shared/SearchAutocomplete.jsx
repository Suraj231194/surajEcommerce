"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock3, Search, Sparkles, TrendingUp, X } from "lucide-react";
import { Input } from "../ui/input.jsx";
import { Badge } from "../ui/badge.jsx";
import { ProgressiveImage } from "../ui/progressive-image.jsx";
import { cn } from "../../lib/utils.js";
import { allProducts, categories } from "../../data/products.js";
import { formatCurrency } from "../../lib/formatters.js";

const TRENDING = [
  "wireless headphones",
  "gaming laptop",
  "smart watch",
  "running shoes",
];

const SEARCH_DICTIONARY = [
  ...TRENDING,
  ...categories.map((category) => category.name.toLowerCase()),
  ...[...new Set(allProducts.map((product) => product.brand.toLowerCase()))],
];

export function SearchAutocomplete({
  className,
  inputClassName,
  placeholder = "Search for products, brands and categories",
}) {
  const router = useRouter();
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [recent, setRecent] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem("recent_searches");
    if (!stored) {
      return;
    }
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        setRecent(parsed.slice(0, 4));
      }
    } catch (error) {
      // Ignore malformed values from previous sessions.
    }
  }, []);

  useEffect(() => {
    const onDocumentClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, []);

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return [];
    }

    return allProducts
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(value) ||
          product.brand.toLowerCase().includes(value) ||
          product.subcategory.toLowerCase().includes(value)
        );
      })
      .slice(0, 6);
  }, [query]);

  const recentTerms = useMemo(() => recent.slice(0, 4), [recent]);

  const trendingTerms = useMemo(() => {
    return TRENDING.filter((term) => !recentTerms.includes(term)).slice(0, 4);
  }, [recentTerms]);

  const activeItems = useMemo(() => {
    if (query.trim()) {
      return suggestions.map((product) => ({ type: "product", value: product }));
    }
    return [...recentTerms, ...trendingTerms].map((term) => ({ type: "term", value: term }));
  }, [query, recentTerms, suggestions, trendingTerms]);

  const didYouMean = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value || suggestions.length > 0 || value.length < 3) {
      return null;
    }
    let best = null;
    let bestScore = Number.POSITIVE_INFINITY;
    for (const candidate of SEARCH_DICTIONARY) {
      const score = levenshtein(value, candidate);
      if (score < bestScore) {
        bestScore = score;
        best = candidate;
      }
    }
    if (!best || bestScore > Math.max(2, Math.floor(value.length / 2))) {
      return null;
    }
    return best;
  }, [query, suggestions.length]);

  const saveRecentSearch = (value) => {
    const normalized = value.trim();
    if (!normalized || typeof window === "undefined") {
      return;
    }
    const next = [normalized, ...recent.filter((item) => item !== normalized)].slice(0, 4);
    setRecent(next);
    window.localStorage.setItem("recent_searches", JSON.stringify(next));
  };

  const goToSearch = (value) => {
    const searchValue = value.trim();
    if (!searchValue) {
      return;
    }
    saveRecentSearch(searchValue);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(searchValue)}`);
  };

  const goToProduct = (product) => {
    saveRecentSearch(product.name);
    setIsOpen(false);
    router.push(`/product/${product.slug}`);
  };

  const onKeyDown = (event) => {
    if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (!activeItems.length) {
      if (event.key === "Enter") {
        event.preventDefault();
        goToSearch(query);
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) => (current + 1) % activeItems.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((current) => (current <= 0 ? activeItems.length - 1 : current - 1));
      return;
    }

    if (event.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (highlightedIndex >= 0) {
        const selected = activeItems[highlightedIndex];
        if (!selected) {
          return;
        }
        if (selected.type === "product") {
          goToProduct(selected.value);
          return;
        }
        goToSearch(selected.value);
        return;
      }
      goToSearch(query);
    }
  };

  return (
    <div className={cn("relative", className)} ref={containerRef}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          goToSearch(query);
        }}
        className="relative"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onKeyDown={onKeyDown}
          onFocus={() => {
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          placeholder={placeholder}
          className={cn(
            "h-11 rounded-full border-border/80 bg-card pl-11 pr-11 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-primary/50",
            inputClassName
          )}
          data-testid="input-search-autocomplete"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(true);
              setHighlightedIndex(-1);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.65rem)] z-40 overflow-hidden rounded-2xl border border-border/90 bg-card/95 shadow-2xl backdrop-blur-xl">
          <div className="max-h-[26rem] overflow-y-auto p-2">
            {!query.trim() && (
              <>
                {trendingTerms.length > 0 && (
                  <>
                    <div className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Trending
                    </div>
                    <div className="mb-3 flex flex-wrap gap-2 px-2">
                      {trendingTerms.map((term, index) => (
                        <button
                          key={term}
                          type="button"
                          onMouseEnter={() => setHighlightedIndex(recentTerms.length + index)}
                          onClick={() => goToSearch(term)}
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium transition hover:border-primary/30 hover:text-primary",
                            highlightedIndex === recentTerms.length + index ? "border-primary/40 text-primary" : ""
                          )}
                        >
                          <TrendingUp className="h-3 w-3" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {recentTerms.length > 0 && (
                  <>
                    <div className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Recent
                    </div>
                    <div className="mb-1 space-y-1 px-1">
                      {recentTerms.map((term, index) => (
                        <button
                          key={term}
                          type="button"
                          onMouseEnter={() => setHighlightedIndex(index)}
                          onClick={() => goToSearch(term)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition hover:bg-muted",
                            highlightedIndex === index ? "bg-muted" : ""
                          )}
                        >
                          <Clock3 className="h-3.5 w-3.5 text-muted-foreground" />
                          {term}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}

            {query.trim() && suggestions.length === 0 && (
              <div className="rounded-lg px-4 py-7 text-center text-sm text-muted-foreground">
                <p>No matching products found</p>
                {didYouMean && (
                  <button
                    type="button"
                    className="mt-3 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-foreground hover:border-primary/40 hover:text-primary"
                    onClick={() => goToSearch(didYouMean)}
                  >
                    Did you mean "{didYouMean}"?
                  </button>
                )}
              </div>
            )}

            {suggestions.length > 0 && (
              <>
                <div className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Suggestions
                </div>
                <div className="space-y-1 px-1">
                  {suggestions.map((product, index) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onFocus={() => router.prefetch(`/product/${product.slug}`)}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onMouseOver={() => router.prefetch(`/product/${product.slug}`)}
                      onClick={() => {
                        saveRecentSearch(product.name);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2 transition hover:bg-muted",
                        highlightedIndex === index ? "bg-muted" : ""
                      )}
                    >
                      <div className="h-12 w-12 overflow-hidden rounded-lg border border-border/70 bg-secondary">
                        <ProgressiveImage
                          src={product.images[0]}
                          alt={product.name}
                          imgClassName="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-primary">
                          {formatCurrency(product.discountPrice)}
                        </p>
                        <Badge variant="outline" className="mt-1 text-[10px]">
                          <Sparkles className="h-3 w-3" />
                          Top pick
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="px-3 pb-2 pt-3">
                  <button
                    type="button"
                    onClick={() => goToSearch(query)}
                    className="w-full rounded-lg border border-border/80 bg-secondary px-3 py-2 text-sm font-medium transition hover:border-primary/40 hover:text-primary"
                  >
                    View all results for "{query.trim()}"
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function levenshtein(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row;
  }
  for (let col = 0; col < cols; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = a[row - 1] === b[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost
      );
    }
  }

  return matrix[rows - 1][cols - 1];
}
