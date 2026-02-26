"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, ShoppingCart, Sparkles, Star } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import { ProgressiveImage } from "../ui/progressive-image.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { formatCurrency, getDiscountPercent } from "../../lib/formatters.js";
import { ProductQuickView } from "./ProductQuickView.jsx";
import { flyToCart } from "../../lib/flyToCart.js";

export function ProductCard({ product }) {
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quickOpen, setQuickOpen] = useState(false);
  const [heartPopping, setHeartPopping] = useState(false);

  const discountPercent = getDiscountPercent(product.price, product.discountPrice);
  const productInCart = isInCart(product.id);
  const productInWishlist = isInWishlist(product.id);

  const eta = useMemo(() => {
    const days = 2 + (product.id % 4);
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
  }, [product.id]);

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, 1);
    flyToCart(event.currentTarget, product.images?.[0]);
  };

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setHeartPopping(true);
    window.setTimeout(() => setHeartPopping(false), 220);
    toggleWishlist(product);
  };

  return (
    <>
      <article
        className="group surface-card flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        data-testid={`card-product-${product.id}`}
      >
        <Link
          href={`/product/${product.slug}`}
          className="flex h-full flex-col"
          onMouseEnter={() => router.prefetch(`/product/${product.slug}`)}
          onFocus={() => router.prefetch(`/product/${product.slug}`)}
        >
          <div className="relative aspect-square overflow-hidden bg-muted/50">
            <ProgressiveImage
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0"
              imgClassName="h-full w-full object-cover transition duration-500 group-hover:opacity-0"
            />
            <ProgressiveImage
              src={product.images[1] || product.images[0]}
              alt={`${product.name} alt view`}
              loading="lazy"
              className="absolute inset-0"
              imgClassName="h-full w-full object-cover opacity-0 transition duration-500 group-hover:opacity-100"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

            {discountPercent > 0 && (
              <Badge className="absolute left-3 top-3 animate-pulse bg-destructive text-destructive-foreground shadow-lg">
                {discountPercent}% off
              </Badge>
            )}
            {product.reviewCount > 3000 && (
              <Badge className="absolute left-3 top-12 bg-primary/90 text-primary-foreground shadow-lg">
                Bestseller
              </Badge>
            )}

            <button
              type="button"
              onClick={handleWishlistToggle}
              className={`absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-background/90 text-muted-foreground shadow-md backdrop-blur transition active:scale-[0.96] hover:text-destructive ${
                heartPopping ? "scale-110" : ""
              }`}
              aria-label="Wishlist"
              data-testid={`button-wishlist-${product.id}`}
            >
              <Heart className={`h-4 w-4 ${productInWishlist ? "fill-red-500 text-red-500" : ""}`} />
            </button>

            <div className="absolute inset-x-3 bottom-3 opacity-0 transition group-hover:opacity-100">
              <Button
                type="button"
                variant="secondary"
                className="h-8 w-full rounded-lg bg-background/90 text-xs shadow-md"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setQuickOpen(true);
                }}
              >
                Quick view
              </Button>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {product.brand}
            </p>
            <h3
              className="mt-1 line-clamp-2 min-h-[2.75rem] text-sm font-semibold leading-snug"
              data-testid={`text-name-${product.id}`}
            >
              {product.name}
            </h3>

            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-semibold text-white transition group-hover:scale-105">
                <Star className="h-3 w-3 fill-current" />
                {product.ratingAvg}
              </span>
              <span className="text-xs text-muted-foreground">
                {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-lg font-semibold text-primary">{formatCurrency(product.discountPrice)}</span>
              {discountPercent > 0 && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <p className="mt-1 text-[11px] text-muted-foreground">Delivery by {eta}</p>

            <div className="mt-2">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                  <Sparkles className="h-3 w-3" />
                  {product.stock < 10 ? `Only ${product.stock} left` : "In stock"}
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-medium text-destructive">
                  Out of stock
                </span>
              )}
            </div>

            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || productInCart}
              className="mt-4 h-9 w-full rounded-lg active:scale-[0.97]"
              data-testid={`button-add-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4" />
              {productInCart ? "In cart" : "Add to cart"}
            </Button>
          </div>
        </Link>
      </article>

      <ProductQuickView
        product={product}
        open={quickOpen}
        onOpenChange={setQuickOpen}
        onAddToCart={() => addToCart(product, 1)}
        inCart={productInCart}
      />
    </>
  );
}
