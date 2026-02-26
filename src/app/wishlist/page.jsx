"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Share2, ShoppingCart, Star, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { formatCurrency } from "../../lib/formatters.js";
import { allProducts } from "../../data/products.js";
import { ProgressiveImage } from "../../components/ui/progressive-image.jsx";

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const products = items
    .map((item) => allProducts.find((product) => product.id === item.id) || item)
    .filter(Boolean);

  if (!products.length) {
    return (
      <div className="container-shell py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-border/70 bg-card p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-semibold">Your wishlist is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Save products you love and revisit them anytime.
          </p>
          <Button asChild className="mt-6 rounded-full px-7">
            <Link href="/search">Explore products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card to-secondary/35 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Saved for later</p>
              <h1 className="text-3xl font-semibold">Wishlist</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="rounded-full"
                onClick={async () => {
                  if (typeof window === "undefined") {
                    return;
                  }
                  await navigator.clipboard.writeText(window.location.href);
                }}
              >
                <Share2 className="h-4 w-4" />
                Share wishlist
              </Button>
              <Button variant="ghost" className="rounded-full" onClick={clearWishlist}>
                Clear all
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article
              key={product.id}
              className="group surface-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Link
                href={`/product/${product.slug}`}
                onMouseEnter={() => router.prefetch(`/product/${product.slug}`)}
                onFocus={() => router.prefetch(`/product/${product.slug}`)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted/50">
                  <ProgressiveImage
                    src={product.image || product.images?.[0]}
                    alt={product.name}
                    imgClassName="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold shadow">
                    Luxury pick
                  </div>
                </div>
              </Link>
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{product.brand}</p>
                <Link href={`/product/${product.slug}`} className="mt-1 line-clamp-2 block text-sm font-semibold hover:text-primary">
                  {product.name}
                </Link>

                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs text-white">
                    <Star className="h-3 w-3 fill-current" />
                    {product.ratingAvg || 4.5}
                  </span>
                  <span className="text-xs text-muted-foreground">{(product.reviewCount || 1200).toLocaleString()} reviews</span>
                </div>

                <p className="mt-3 text-lg font-semibold text-primary">{formatCurrency(product.discountPrice)}</p>

                <div className="mt-4 flex gap-2">
                  <Button
                    className="flex-1 rounded-lg"
                    onClick={() => addToCart(product, 1)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Move to cart
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-lg"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
