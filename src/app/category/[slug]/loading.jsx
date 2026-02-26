export default function CategoryLoading() {
  return (
    <div className="container-shell py-8">
      <div className="surface-card p-6">
        <div className="soft-shimmer h-8 w-52 rounded-lg" />
        <div className="mt-3 soft-shimmer h-4 w-80 rounded-md" />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-border/70">
            <div className="soft-shimmer aspect-square w-full" />
            <div className="space-y-2 p-4">
              <div className="soft-shimmer h-3 w-20 rounded-md" />
              <div className="soft-shimmer h-4 w-full rounded-md" />
              <div className="soft-shimmer h-8 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
