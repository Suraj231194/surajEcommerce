"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Percent, Star } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { HomeHero } from "../components/home/HomeHero.jsx";
import { CategoryShowcase } from "../components/home/CategoryShowcase.jsx";
import { ProductRail } from "../components/home/ProductRail.jsx";
import { TopPromoStrip } from "../components/home/TopPromoStrip.jsx";
import { OfferCarousel } from "../components/home/OfferCarousel.jsx";
import { CouponOfferPanel } from "../components/home/CouponOfferPanel.jsx";
import { SmartShoppingModes } from "../components/home/SmartShoppingModes.jsx";
import { DailySpinRewards } from "../components/home/DailySpinRewards.jsx";
import { SectionHeading } from "../components/home/SectionHeading.jsx";
import { TrustHighlights } from "../components/home/TrustHighlights.jsx";
import { allProducts } from "../data/products.js";
import { formatCurrency, getDiscountPercent } from "../lib/formatters.js";
import { readRecentlyViewed } from "../lib/recentlyViewed.js";
import { useWishlist } from "../context/WishlistContext.jsx";

const bestSellers = [...allProducts]
  .sort((a, b) => b.reviewCount - a.reviewCount)
  .slice(0, 12);

const trending = [...allProducts]
  .sort((a, b) => b.ratingAvg * b.reviewCount - a.ratingAvg * a.reviewCount)
  .slice(0, 12);

const deals = [...allProducts]
  .sort(
    (a, b) =>
      getDiscountPercent(b.price, b.discountPrice) -
      getDiscountPercent(a.price, a.discountPrice)
  )
  .slice(0, 12);

export default function Home() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [shoppingMode, setShoppingMode] = useState("all");
  const [spinCouponCode, setSpinCouponCode] = useState("");
  const { items: wishlistItems } = useWishlist();

  const wishlistProducts = useMemo(() => {
    if (!wishlistItems.length) {
      return [];
    }
    return wishlistItems
      .map((item) => allProducts.find((product) => product.id === item.id) || item)
      .filter(Boolean)
      .slice(0, 12);
  }, [wishlistItems]);

  useEffect(() => {
    const ids = readRecentlyViewed();
    if (!ids.length) {
      return;
    }
    setRecentlyViewed(allProducts.filter((product) => ids.includes(product.id)).slice(0, 12));
  }, []);

  const visibleBestSellers = useMemo(
    () => applyShoppingMode(bestSellers, shoppingMode),
    [shoppingMode]
  );
  const visibleTrending = useMemo(
    () => applyShoppingMode(trending, shoppingMode),
    [shoppingMode]
  );
  const visibleDeals = useMemo(
    () => applyShoppingMode(deals, shoppingMode),
    [shoppingMode]
  );
  const visibleDealCards = useMemo(() => visibleDeals.slice(0, 4), [visibleDeals]);
  const visibleWishlistProducts = useMemo(
    () => applyShoppingMode(wishlistProducts, shoppingMode),
    [shoppingMode, wishlistProducts]
  );
  const visibleRecentlyViewed = useMemo(
    () => applyShoppingMode(recentlyViewed, shoppingMode),
    [shoppingMode, recentlyViewed]
  );

  const modeCounts = useMemo(() => {
    const total = bestSellers.length + trending.length + deals.length;
    const visible = visibleBestSellers.length + visibleTrending.length + visibleDeals.length;
    return { total, visible };
  }, [visibleBestSellers.length, visibleDeals.length, visibleTrending.length]);

  return (
    <div className="pb-12">
      <TopPromoStrip />
      <HomeHero />
      <SmartShoppingModes mode={shoppingMode} onModeChange={setShoppingMode} counts={modeCounts} />
      <OfferCarousel products={visibleDeals.slice(0, 10)} />
      <DailySpinRewards onCouponUnlock={setSpinCouponCode} />
      <CouponOfferPanel prefillCode={spinCouponCode} />

      {modeCounts.visible === 0 && (
        <section className="pt-4">
          <div className="container-shell">
            <div className="surface-card p-4 text-sm text-muted-foreground">
              No products found for this mode. Switch mode to continue exploring.
            </div>
          </div>
        </section>
      )}

      <CategoryShowcase />

      <ProductRail
        title="Best Sellers"
        description={getModeDescription(shoppingMode, "Most loved products customers keep coming back for.")}
        products={visibleBestSellers}
        query="best sellers"
      />

      <ProductRail
        title="Trending Right Now"
        description={getModeDescription(shoppingMode, "Hot picks based on ratings, reviews and demand.")}
        products={visibleTrending}
        query="trending"
      />

      <section className="py-12">
        <div className="container-shell">
          <SectionHeading
            title="Deals of the Day"
            description="Limited-time offers with high-value savings."
            action={
              <Badge className="rounded-full bg-destructive/10 px-3 py-1 text-destructive">
                <Clock3 className="h-3.5 w-3.5" />
                Ends tonight
              </Badge>
            }
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {visibleDealCards.map((product) => {
              const discount = getDiscountPercent(product.price, product.discountPrice);
              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group surface-card-strong overflow-hidden transition duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge className="bg-destructive text-destructive-foreground">
                        <Percent className="h-3 w-3" />
                        {discount}% off
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="line-clamp-2 text-sm font-semibold">{product.name}</p>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-primary">
                        {formatCurrency(product.discountPrice)}
                      </span>
                      <span className="text-xs text-muted-foreground line-through">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full rounded-lg border-primary/20 bg-background group-hover:border-primary/40"
                    >
                      View deal
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ProductRail
        title="Mega Deal Carousel"
        description={getModeDescription(
          shoppingMode,
          "Scroll through deeply discounted picks across all departments."
        )}
        products={visibleDeals}
        query="deals"
      />

      {visibleWishlistProducts.length > 0 && (
        <ProductRail
          title="From Your Wishlist"
          description="Your saved products in one place. Open wishlist to manage all."
          products={visibleWishlistProducts}
          query="wishlist"
        />
      )}

      {visibleRecentlyViewed.length > 0 && (
        <ProductRail
          title="Inspired by Your Browsing"
          description="Recently viewed items and similar picks curated for you."
          products={visibleRecentlyViewed}
          query="recently viewed"
        />
      )}

      <TrustHighlights />

      <section className="py-10">
        <div className="container-shell">
          <SectionHeading
            title="What Customers Say"
            description="Trusted by shoppers across categories."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Ritika V.",
                text: "Fast delivery, clean packaging, and exactly as shown.",
              },
              {
                name: "Aman K.",
                text: "The checkout flow feels smooth and premium. Loved it.",
              },
              {
                name: "Neha S.",
                text: "Great deals and authentic products. Will order again.",
              },
            ].map((item) => (
              <article key={item.name} className="surface-card p-4">
                <div className="mb-2 flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">"{item.text}"</p>
                <p className="mt-3 text-sm font-semibold">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container-shell">
          <div className="surface-card relative overflow-hidden p-6 text-center md:p-9">
            <div className="absolute -right-24 top-0 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
            <h3 className="text-2xl font-semibold md:text-3xl">
              Get launch offers in your inbox
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              Be first to know about flash sales and premium product drops.
            </p>
            <form className="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 rounded-full border border-border bg-background px-4 text-sm shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                data-testid="input-newsletter"
              />
              <Button className="h-11 rounded-full px-6" data-testid="button-subscribe">
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function applyShoppingMode(products, mode) {
  if (!Array.isArray(products) || !products.length) {
    return [];
  }

  switch (mode) {
    case "deal":
      return products.filter((product) => getDiscountPercent(product.price, product.discountPrice) >= 15);
    case "premium":
      return products.filter((product) => product.ratingAvg >= 4.5 && product.reviewCount >= 1000);
    case "fast":
      return products.filter((product) => 1 + (product.id % 4) <= 2);
    case "night":
    case "all":
    default:
      return products;
  }
}

function getModeDescription(mode, fallback) {
  switch (mode) {
    case "deal":
      return "Deal mode active: showing stronger discount opportunities first.";
    case "premium":
      return "Premium mode active: curated top-rated picks with stronger trust signals.";
    case "fast":
      return "Fast delivery mode active: highlighting quick-dispatch products.";
    case "night":
      return "Night mode active: low-light browsing with the same curated products.";
    case "all":
    default:
      return fallback;
  }
}
