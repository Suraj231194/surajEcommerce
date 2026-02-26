export default function ProductLoading() {
  return (
    <div className="container-shell py-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border/70">
          <div className="soft-shimmer aspect-square w-full" />
        </div>
        <div className="space-y-3">
          <div className="soft-shimmer h-5 w-28 rounded-md" />
          <div className="soft-shimmer h-9 w-4/5 rounded-md" />
          <div className="soft-shimmer h-5 w-40 rounded-md" />
          <div className="soft-shimmer h-16 w-full rounded-xl" />
          <div className="soft-shimmer h-11 w-48 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
