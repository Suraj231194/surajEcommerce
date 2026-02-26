"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Bolt, Flame, Percent, Timer } from "lucide-react";
import { allProducts } from "../../data/products.js";
import { Badge } from "../../components/ui/badge.jsx";
import { Button } from "../../components/ui/button.jsx";
import { formatCurrency, getDiscountPercent } from "../../lib/formatters.js";

const END_TIMESTAMP = Date.now() + 1000 * 60 * 60 * 14;

export default function DealsPage() {
  const [remaining, setRemaining] = useState(getRemainingTime());

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemainingTime()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const deals = useMemo(
    () =>
      [...allProducts]
        .sort(
          (a, b) =>
            getDiscountPercent(b.price, b.discountPrice) -
            getDiscountPercent(a.price, a.discountPrice)
        )
        .slice(0, 20),
    []
  );

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <section className="relative overflow-hidden rounded-3xl border border-red-300/40 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 p-6 text-white shadow-2xl shadow-orange-500/20 md:p-8">
          <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -left-16 -bottom-20 h-72 w-72 rounded-full bg-black/20 blur-3xl" />
          <div className="relative">
            <Badge className="mb-3 bg-white/20 text-white">
              <Bolt className="h-3.5 w-3.5" />
              Flash sale live
            </Badge>
            <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">Mega Flash Sale</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/90 md:text-base">
              Massive discounts on trending products. Stock moves fast, grab your deal now.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <TimeCard label="Hours" value={String(remaining.hours).padStart(2, "0")} />
              <TimeCard label="Minutes" value={String(remaining.minutes).padStart(2, "0")} />
              <TimeCard label="Seconds" value={String(remaining.seconds).padStart(2, "0")} />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild variant="secondary" className="rounded-full px-6">
                <Link href="#deal-grid">Shop now</Link>
              </Button>
              <Button asChild className="rounded-full border border-white/50 bg-white/10 px-6 text-white hover:bg-white/20">
                <Link href="/search?q=trending%20deals">View all deals</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="deal-grid" className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {deals.map((product) => {
            const discount = getDiscountPercent(product.price, product.discountPrice);
            const sold = 30 + (product.id % 63);
            return (
              <article key={product.id} className="group surface-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/product/${product.slug}`} className="block aspect-square overflow-hidden bg-muted/40">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge className="bg-destructive text-destructive-foreground">
                      <Percent className="h-3 w-3" />
                      {discount}% off
                    </Badge>
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-600">
                      <Flame className="h-3.5 w-3.5" />
                      Hot
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm font-semibold">{product.name}</p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-semibold text-primary">
                      {formatCurrency(product.discountPrice)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatCurrency(product.price)}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{sold}% sold</span>
                      <span>{100 - sold}% left</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-red-700 transition-all"
                        style={{ width: `${sold}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">Hurry, deal ending soon</p>
                  </div>

                  <Button asChild className="mt-4 h-9 w-full rounded-lg">
                    <Link href={`/product/${product.slug}`}>
                      <Timer className="h-4 w-4" />
                      Grab deal
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}

function TimeCard({ label, value }) {
  return (
    <div className="rounded-xl border border-white/30 bg-white/15 px-4 py-2 text-center backdrop-blur">
      <p className="text-2xl font-semibold leading-none">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/80">{label}</p>
    </div>
  );
}

function getRemainingTime() {
  const diff = Math.max(0, END_TIMESTAMP - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
}
