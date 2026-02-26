import { ProductCard } from "./ProductCard.jsx";
import { Skeleton } from "../ui/skeleton.jsx";

export function ProductGrid({ products, isLoading, columns = 4 }) {
  const columnsClass = getColumnsClass(columns);

  if (isLoading) {
    return (
      <div className={`grid gap-4 md:gap-6 ${columnsClass}`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductGridSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium text-muted-foreground">No products found</p>
        <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-4 md:gap-6 ${columnsClass}`} data-testid="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="surface-card overflow-hidden">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-3/5" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}

function getColumnsClass(columns) {
  switch (columns) {
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 3:
      return "grid-cols-2 lg:grid-cols-3";
    case 5:
      return "grid-cols-2 lg:grid-cols-4 xl:grid-cols-5";
    default:
      return "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
  }
}
