import Link from "next/link";
import { Compass, RefreshCcw, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "../ui/button.jsx";

function buildSuggestions(query) {
  const q = String(query || "").toLowerCase();

  if (q.includes("deal") || q.includes("offer") || q.includes("discount")) {
    return ["deals", "flash sale", "best sellers"];
  }
  if (q.includes("trend") || q.includes("popular")) {
    return ["trending", "top rated", "new arrivals"];
  }
  if (q.includes("wish")) {
    return ["wishlist", "saved items", "best sellers"];
  }
  return ["mobile phones", "laptops", "headphones", "fashion"];
}

export function NoProductsRescue({ query, onClearFilters }) {
  const suggestions = buildSuggestions(query).slice(0, 4);

  return (
    <div className="mb-4 rounded-2xl border border-border/80 bg-card/95 p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">No exact matches found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try suggestions below, or continue with trending alternatives already loaded.
          </p>
        </div>
        {onClearFilters && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={onClearFilters}
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((term) => (
          <Link
            key={term}
            href={`/search?q=${encodeURIComponent(term)}`}
            className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <Compass className="h-3.5 w-3.5" />
            Did you mean "{term}"?
          </Link>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href="/search?q=trending"
          className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
        >
          <TrendingUp className="h-3.5 w-3.5" />
          Popular alternatives
        </Link>
        <Link
          href="/search?q=deals"
          className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Deals of the day
        </Link>
      </div>
    </div>
  );
}

