"use client";

import Link from "next/link";
import { CheckCircle2, Download, Package, Truck, Warehouse } from "lucide-react";
import { Button } from "../../components/ui/button.jsx";
import { ProgressiveImage } from "../../components/ui/progressive-image.jsx";
import { allProducts } from "../../data/products.js";
import { formatCurrency } from "../../lib/formatters.js";

const TRACKING_STEPS = [
  { id: "ordered", label: "Order placed", done: true },
  { id: "packed", label: "Packed", done: true },
  { id: "shipped", label: "Shipped", done: true, active: true },
  { id: "out", label: "Out for delivery", done: false },
  { id: "delivered", label: "Delivered", done: false },
];

const TIMELINE = [
  { time: "Feb 26, 2026 - 10:42 AM", text: "Shipment departed from Mumbai facility", icon: Truck },
  { time: "Feb 26, 2026 - 8:10 AM", text: "Package processed at sorting center", icon: Warehouse },
  { time: "Feb 25, 2026 - 7:40 PM", text: "Order packed and handed to courier", icon: Package },
  { time: "Feb 25, 2026 - 4:30 PM", text: "Payment confirmed", icon: CheckCircle2 },
];

const ORDER = {
  id: "NX-102938",
  eta: "Expected delivery: Mar 2, 2026",
  address: "Unit 301, Maker Maxity, Bandra Kurla Complex, Mumbai 400051",
  total: 45999,
  items: [allProducts[5], allProducts[11]],
};

export default function OrdersPage() {
  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-r from-card via-card to-primary/10 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Order tracking</p>
          <h1 className="text-3xl font-semibold">Track your shipment</h1>
          <p className="mt-2 text-sm text-muted-foreground">Order {ORDER.id} - {ORDER.eta}</p>
        </div>

        <div className="surface-card p-5">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[700px]">
              <div className="relative mb-4 h-1 rounded-full bg-secondary">
                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-primary to-blue-700 transition-all" />
              </div>
              <div className="grid grid-cols-5 gap-2">
                {TRACKING_STEPS.map((step) => (
                  <div key={step.id} className="text-center">
                    <div
                      className={`mx-auto mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                        step.active
                          ? "animate-pulse border-primary bg-primary text-primary-foreground"
                          : step.done
                          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-700"
                          : "border-border bg-background text-muted-foreground"
                      }`}
                    >
                      {step.done ? "OK" : "-"}
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">{step.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="surface-card p-5">
            <h2 className="text-xl font-semibold">Tracking timeline</h2>
            <div className="mt-4 space-y-4">
              {TIMELINE.map((event, index) => (
                <article key={event.time} className="relative pl-9">
                  <span className="absolute left-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <event.icon className="h-4 w-4" />
                  </span>
                  {index !== TIMELINE.length - 1 && (
                    <span className="absolute left-3.5 top-7 h-[calc(100%+0.35rem)] w-px bg-border" />
                  )}
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                  <p className="text-sm font-medium">{event.text}</p>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-5">
            <div className="surface-card p-5">
              <h3 className="text-lg font-semibold">Delivery details</h3>
              <p className="mt-3 text-sm text-muted-foreground">{ORDER.address}</p>
              <p className="mt-3 text-sm font-semibold">Order total: {formatCurrency(ORDER.total)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-full">
                  <Download className="h-4 w-4" />
                  Invoice
                </Button>
                <Button asChild className="rounded-full">
                  <Link href="/support">Need help?</Link>
                </Button>
              </div>
            </div>

            <div className="surface-card p-5">
              <h3 className="text-lg font-semibold">Items in this order</h3>
              <div className="mt-3 space-y-2">
                {ORDER.items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.slug}`}
                    className="flex items-center gap-2 rounded-xl border border-border/70 p-2 transition hover:bg-muted/50"
                  >
                    <div className="h-12 w-12 overflow-hidden rounded-lg">
                      <ProgressiveImage
                        src={item.images[0]}
                        alt={item.name}
                        imgClassName="h-12 w-12 rounded-lg object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="line-clamp-1 text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
