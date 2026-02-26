"use client";

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog.jsx";
import { formatCurrency, getDiscountPercent } from "../../lib/formatters.js";

export function ProductQuickView({ product, open, onOpenChange, onAddToCart, inCart }) {
  if (!product) {
    return null;
  }

  const discount = getDiscountPercent(product.price, product.discountPrice);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden rounded-2xl border-border/70 p-0">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative bg-muted/50">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="h-full min-h-72 w-full object-cover"
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
                {discount}% off
              </span>
            )}
          </div>

          <div className="p-6">
            <DialogTitle className="text-xl font-semibold">{product.name}</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              {product.description}
            </DialogDescription>

            <div className="mt-4 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white">
                <Star className="h-3 w-3 fill-current" />
                {product.ratingAvg}
              </span>
              <span className="text-xs text-muted-foreground">{product.reviewCount} reviews</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-primary">
                {formatCurrency(product.discountPrice)}
              </span>
              {discount > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                onClick={onAddToCart}
                disabled={product.stock === 0 || inCart}
                className="rounded-xl px-5"
              >
                <ShoppingCart className="h-4 w-4" />
                {inCart ? "In cart" : "Add to cart"}
              </Button>
              <Button variant="outline" asChild className="rounded-xl px-5">
                <Link href={`/product/${product.slug}`}>View full details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
