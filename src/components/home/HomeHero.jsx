import Link from "next/link";
import { ArrowRight, BadgeCheck, ShoppingBag, Truck, Zap } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import { SearchAutocomplete } from "../shared/SearchAutocomplete.jsx";
import { categories, allProducts } from "../../data/products.js";
import { formatCompactNumber } from "../../lib/formatters.js";

const HERO_CATEGORIES = categories.slice(0, 4);

export function HomeHero() {
  return (
    <section className="relative overflow-hidden pt-8 md:pt-12">
      <div className="absolute inset-0 -z-10 bg-grid-dots opacity-[0.35]" />
      <div className="container-shell">
        <div className="surface-card-strong relative overflow-hidden px-5 py-8 sm:px-8 md:px-10 md:py-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <Badge className="mb-4 rounded-full bg-primary/10 px-3 py-1 text-primary">
                <Zap className="h-3.5 w-3.5" />
                Premium sale season
              </Badge>

              <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
                Discover premium products with faster checkout and smarter search
              </h1>

              <p className="mt-4 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
                Explore curated best-sellers, top-rated brands, and lightning deals in one
                polished shopping experience.
              </p>

              <div className="mt-6 max-w-2xl">
                <SearchAutocomplete inputClassName="h-12 bg-background" />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href="/search?q=best%20sellers">
                    Shop best sellers
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-primary/25 bg-background/80 px-7"
                >
                  <Link href="/category/mobile-phones">Browse categories</Link>
                </Button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatChip
                  icon={ShoppingBag}
                  title={`${formatCompactNumber(allProducts.length)}+ products`}
                  subtitle="Across top categories"
                />
                <StatChip
                  icon={Truck}
                  title="Express shipping"
                  subtitle="Fast metro delivery"
                />
                <StatChip
                  icon={BadgeCheck}
                  title="Trusted quality"
                  subtitle="Only verified sellers"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {HERO_CATEGORIES.map((category, index) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border border-border/80 bg-card ${
                    index === 0 ? "col-span-2 sm:col-span-1 sm:row-span-2" : ""
                  }`}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                      index === 0 ? "h-[16.5rem] sm:h-full" : "h-40"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <p className="text-sm opacity-85">Featured category</p>
                    <p className="text-lg font-semibold">{category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatChip({ icon: Icon, title, subtitle }) {
  return (
    <div className="rounded-xl border border-border/70 bg-background/90 p-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="rounded-lg bg-primary/10 p-1.5 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <p className="text-xs font-semibold sm:text-sm">{title}</p>
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{subtitle}</p>
    </div>
  );
}
