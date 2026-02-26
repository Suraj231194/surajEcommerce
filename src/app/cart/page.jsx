"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, ShieldCheck, Trash2, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { Button } from "../../components/ui/button.jsx";
import { formatCurrency } from "../../lib/formatters.js";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getSubtotal,
    getTax,
    getShipping,
    getTotal,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-shell py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-border/70 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-semibold">Your cart is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Looks like you have not added any products yet.
          </p>
          <Button asChild className="mt-6 rounded-full px-7">
            <Link href="/">Start shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-card p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Checkout flow</p>
          <h1 className="mt-1 text-3xl font-semibold md:text-4xl">Shopping cart</h1>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs sm:text-sm">
            <StepChip label="Cart" active />
            <StepChip label="Address" />
            <StepChip label="Payment" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="space-y-4">
            {items.map((item) => (
              <article
                key={item.product.id}
                className="surface-card grid gap-4 p-4 sm:grid-cols-[120px_1fr] sm:items-center"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl border border-border/70 bg-muted">
                  {item.product.images?.[0] ? (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <ShoppingBag className="h-7 w-7" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="line-clamp-2 text-base font-semibold">{item.product.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.product.brand}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:text-destructive"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="inline-flex items-center rounded-full border border-border bg-background p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <p className="text-lg font-semibold text-primary">
                      {formatCurrency(item.product.discountPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="surface-card-strong sticky top-24 h-fit p-5">
            <h2 className="text-xl font-semibold">Order summary</h2>

            <div className="mt-5 space-y-3 text-sm">
              <Row label="Subtotal" value={formatCurrency(getSubtotal())} />
              <Row label="Tax" value={formatCurrency(getTax())} />
              <Row
                label="Shipping"
                value={getShipping() === 0 ? "Free" : formatCurrency(getShipping())}
              />
            </div>

            <div className="my-4 h-px bg-border" />
            <Row label="Total" value={formatCurrency(getTotal())} strong />

            <Button asChild size="lg" className="mt-5 h-11 w-full rounded-xl">
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>

            <div className="mt-4 space-y-2 rounded-xl bg-secondary/70 p-3 text-xs text-muted-foreground">
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" />
                Estimated delivery: 2-4 business days
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Secure checkout with purchase protection
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function StepChip({ label, active = false }) {
  return (
    <div
      className={`rounded-full border px-3 py-1.5 text-center ${
        active
          ? "border-primary/30 bg-primary/10 font-semibold text-primary"
          : "border-border bg-background text-muted-foreground"
      }`}
    >
      {label}
    </div>
  );
}

function Row({ label, value, strong = false }) {
  return (
    <div className={`flex items-center justify-between ${strong ? "text-base font-semibold" : ""}`}>
      <span className={strong ? "text-foreground" : "text-muted-foreground"}>{label}</span>
      <span>{value}</span>
    </div>
  );
}
