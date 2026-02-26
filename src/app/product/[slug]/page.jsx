"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Heart,
  MapPin,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { allProducts } from "../../../data/products.js";
import { Badge } from "../../../components/ui/badge.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs.jsx";
import { ProductGrid } from "../../../components/products/ProductGrid.jsx";
import { ProductComparisonModal } from "../../../components/products/ProductComparisonModal.jsx";
import { ProductDecisionTools } from "../../../components/products/ProductDecisionTools.jsx";
import { ProgressiveImage } from "../../../components/ui/progressive-image.jsx";
import { useCart } from "../../../context/CartContext.jsx";
import { useWishlist } from "../../../context/WishlistContext.jsx";
import { formatCurrency, getDiscountPercent } from "../../../lib/formatters.js";
import { flyToCart } from "../../../lib/flyToCart.js";
import { readRecentlyViewed, saveRecentlyViewed } from "../../../lib/recentlyViewed.js";
import { getSellerByBrand } from "../../../lib/sellers.js";

const REVIEW_NAMES = ["Anita", "Rohit", "Meera", "Arjun", "Karan", "Neha"];

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = allProducts.find((item) => item.slug === params.slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isAdded, setIsAdded] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [pinCode, setPinCode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  useEffect(() => {
    if (!product) {
      return;
    }
    saveRecentlyViewed(product.id);
    const recentIds = readRecentlyViewed().filter((id) => id !== product.id);
    setRecentlyViewed(
      allProducts.filter((item) => recentIds.includes(item.id)).slice(0, 8)
    );
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }
    return allProducts
      .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
      .slice(0, 8);
  }, [product]);

  const alsoBought = useMemo(() => {
    if (!product) {
      return [];
    }
    return allProducts
      .filter((item) => item.brand === product.brand && item.id !== product.id)
      .slice(0, 8);
  }, [product]);

  const reviews = useMemo(() => {
    if (!product) {
      return [];
    }

    return Array.from({ length: 5 }).map((_, index) => ({
      id: index + 1,
      name: REVIEW_NAMES[(product.id + index) % REVIEW_NAMES.length],
      rating: Math.max(4, Math.round(product.ratingAvg - (index % 2 === 0 ? 0 : 1))),
      title: ["Excellent quality", "Value for money", "Premium finish", "Highly recommended", "Very satisfied"][index],
      comment:
        "Packaging was clean, delivery was fast, and the product quality matched expectations. Smooth buying experience overall.",
      daysAgo: [2, 5, 8, 11, 18][index],
    }));
  }, [product]);

  const seller = useMemo(() => {
    if (!product) {
      return null;
    }
    return getSellerByBrand(product.brand);
  }, [product]);

  const boughtCount = useMemo(() => {
    if (!product) {
      return 0;
    }
    return Math.max(120, Math.round(product.reviewCount * 0.42));
  }, [product]);

  const ratingBreakdown = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((review) => {
      counts[review.rating] += 1;
    });

    const total = reviews.length || 1;
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: counts[stars],
      percent: Math.round((counts[stars] / total) * 100),
    }));
  }, [reviews]);

  const qaItems = useMemo(() => {
    if (!product) {
      return [];
    }

    return [
      {
        id: 1,
        question: `Is ${product.name} covered under brand warranty?`,
        answer: "Yes, all products come with official brand warranty and invoice.",
      },
      {
        id: 2,
        question: "Does this product support doorstep return?",
        answer: "Easy return and replacement are available within the policy window.",
      },
      {
        id: 3,
        question: "Is cash on delivery available?",
        answer: "COD availability depends on your PIN code and order value.",
      },
    ];
  }, [product]);

  if (!product) {
    return (
      <div className="container-shell py-16 text-center">
        <h1 className="text-4xl font-semibold">Product Not Found</h1>
        <p className="mt-3 text-muted-foreground">We could not find this product.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>
      </div>
    );
  }

  const discountPercent = getDiscountPercent(product.price, product.discountPrice);

  const changeImage = (direction) => {
    if (direction === "prev") {
      setSelectedImage((current) => (current === 0 ? product.images.length - 1 : current - 1));
      return;
    }
    setSelectedImage((current) => (current === product.images.length - 1 ? 0 : current + 1));
  };

  const handleAddToCart = (event) => {
    addToCart(product, 1);
    setIsAdded(true);
    if (event?.currentTarget) {
      flyToCart(event.currentTarget, product.images?.[0]);
    }
    window.setTimeout(() => setIsAdded(false), 900);
  };

  const checkPinCode = () => {
    const sanitized = pinCode.replace(/\D/g, "").slice(0, 6);
    setPinCode(sanitized);

    if (!/^\d{6}$/.test(sanitized)) {
      setDeliveryStatus({
        type: "error",
        text: "Enter a valid 6 digit PIN code to check delivery options.",
      });
      return;
    }

    const days = 1 + (Number(sanitized[sanitized.length - 1]) % 4);
    const eta = new Date();
    eta.setDate(eta.getDate() + days);
    const codAvailable = Number(sanitized) % 2 === 0;

    setDeliveryStatus({
      type: "success",
      text: `Delivery by ${eta.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      })}${codAvailable ? " | COD available" : " | Prepaid only"}`,
    });
  };

  return (
    <>
      <div className="pb-12 pt-8">
        <div className="container-shell">
          <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <div className="surface-card-strong relative overflow-hidden">
                <div
                  className="relative aspect-square overflow-hidden"
                  onMouseMove={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width) * 100;
                    const y = ((event.clientY - rect.top) / rect.height) * 100;
                    setZoomOrigin({ x, y });
                  }}
                >
                  <ProgressiveImage
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover transition duration-300 hover:scale-[1.45]"
                    style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
                  />

                  {discountPercent > 0 && (
                    <Badge className="absolute left-4 top-4 bg-destructive text-destructive-foreground">
                      {discountPercent}% off
                    </Badge>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur"
                    aria-label="Save to wishlist"
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </button>

                  <button
                    type="button"
                    onClick={() => changeImage("prev")}
                    className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 shadow-md backdrop-blur transition hover:bg-background"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeImage("next")}
                    className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 shadow-md backdrop-blur transition hover:bg-background"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-xl border transition ${
                      selectedImage === index ? "border-primary shadow-lg" : "border-border/70"
                    }`}
                  >
                    <ProgressiveImage
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      imgClassName="aspect-square w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {product.brand}
              </p>
              <h1 className="mt-2 text-3xl font-semibold md:text-4xl">{product.name}</h1>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-sm font-semibold text-white">
                  <Star className="h-4 w-4 fill-current" />
                  {product.ratingAvg}
                </span>
                <span className="text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} ratings</span>
                <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700">
                  {boughtCount.toLocaleString()} bought in last month
                </span>
              </div>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-primary">{formatCurrency(product.discountPrice)}</span>
                {discountPercent > 0 && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatCurrency(product.price)}</span>
                    <span className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <p className="mt-2 text-xs text-muted-foreground">Estimated delivery by {new Date(Date.now() + 3 * 86400000).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}</p>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              {seller && (
                <div className="mt-4 rounded-2xl border border-border/70 bg-secondary/40 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Sold by</p>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-sm font-semibold">{seller.name}</p>
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Verified
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {seller.ratingAvg} seller rating | {seller.reviewCount.toLocaleString()} reviews
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="rounded-full">
                      <Link href={`/store/${seller.slug}`}>Visit Store</Link>
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-4 rounded-2xl border border-border/70 bg-card p-4">
                <p className="text-sm font-semibold">Deliver to PIN code</p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={pinCode}
                    onChange={(event) => {
                      setPinCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                      if (deliveryStatus) {
                        setDeliveryStatus(null);
                      }
                    }}
                    inputMode="numeric"
                    placeholder="Enter 6 digit PIN"
                    className="h-10 max-w-xs"
                  />
                  <Button type="button" variant="outline" className="h-10 rounded-full px-5" onClick={checkPinCode}>
                    <MapPin className="h-4 w-4" />
                    Check
                  </Button>
                </div>
                {deliveryStatus && (
                  <p
                    className={`mt-2 text-xs ${
                      deliveryStatus.type === "success" ? "text-emerald-700" : "text-destructive"
                    }`}
                  >
                    {deliveryStatus.text}
                  </p>
                )}
              </div>

              <div className="mt-4 rounded-2xl border border-border/70 bg-card p-4">
                <p className="text-sm font-semibold">Bank offers & EMI</p>
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <p className="flex items-start gap-2">
                    <CreditCard className="mt-0.5 h-3.5 w-3.5 text-primary" />
                    10% instant discount on select bank cards up to INR 1,500.
                  </p>
                  <p className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 text-primary" />
                    No-cost EMI starts at INR {Math.max(999, Math.round(product.discountPrice / 9)).toLocaleString("en-IN")}/month.
                  </p>
                  <p className="flex items-start gap-2">
                    <Shield className="mt-0.5 h-3.5 w-3.5 text-primary" />
                    Secure checkout with buyer protection and easy return policy.
                  </p>
                </div>
              </div>

              <ProductDecisionTools product={product} />

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  disabled={product.stock === 0 || isInCart(product.id)}
                  onClick={handleAddToCart}
                  className={`h-12 rounded-xl px-7 transition ${isAdded ? "scale-105" : ""}`}
                >
                  {isAdded || isInCart(product.id) ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      Add to cart
                    </>
                  )}
                </Button>

                <Button variant="outline" size="lg" className="h-12 rounded-xl px-7" onClick={() => toggleWishlist(product)}>
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  Wishlist
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-xl px-7"
                  onClick={() => setCompareOpen(true)}
                >
                  Compare
                </Button>
              </div>

              <div className="mt-6 grid gap-3 rounded-2xl border border-border/70 bg-card p-4 sm:grid-cols-2">
                <InfoPill icon={Truck} title="Express shipping" subtitle="Delivery in 1-3 days" />
                <InfoPill icon={Shield} title="Secure purchase" subtitle="Warranty and easy returns" />
              </div>

              <Tabs defaultValue="specs" className="mt-8">
                <TabsList className="grid w-full grid-cols-2 gap-1 rounded-xl bg-muted/70 sm:grid-cols-4">
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="qa">Q&A</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>

                <TabsContent value="specs" className="surface-card mt-3 p-4">
                  <dl className="grid gap-2 text-sm">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-3 border-b border-border/60 py-2 last:border-b-0">
                        <dt className="text-muted-foreground">{key}</dt>
                        <dd className="font-medium">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </TabsContent>

                <TabsContent value="reviews" className="surface-card mt-3 p-4">
                  <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
                    <aside className="rounded-xl border border-border/60 bg-secondary/30 p-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Rating summary</p>
                      <p className="mt-2 text-2xl font-semibold">{product.ratingAvg} / 5</p>
                      <p className="text-xs text-muted-foreground">{product.reviewCount.toLocaleString()} verified ratings</p>
                      <div className="mt-4 space-y-2">
                        {ratingBreakdown.map((item) => (
                          <div key={item.stars} className="flex items-center gap-2 text-xs">
                            <span className="w-7 text-muted-foreground">{item.stars}*</span>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                              <div
                                className="h-full rounded-full bg-amber-500"
                                style={{ width: `${item.percent}%` }}
                              />
                            </div>
                            <span className="w-6 text-right text-muted-foreground">{item.count}</span>
                          </div>
                        ))}
                      </div>
                    </aside>

                    <div className="space-y-4">
                      {reviews.map((review, index) => (
                        <article key={review.id} className="rounded-xl border border-border/60 p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold">{review.name}</p>
                              <p className="text-xs text-muted-foreground">{review.daysAgo} days ago</p>
                            </div>
                            <div className="inline-flex items-center gap-0.5 rounded-full bg-amber-500/10 px-2 py-1 text-amber-600">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <Star
                                  key={starIndex}
                                  className={`h-3.5 w-3.5 ${
                                    starIndex < review.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                              Verified purchase
                            </span>
                            {index === 0 && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                                Most helpful
                              </span>
                            )}
                          </div>
                          <p className="mt-2 text-sm font-medium">{review.title}</p>
                          <p className="mt-1 text-sm text-muted-foreground">{review.comment}</p>
                        </article>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="qa" className="surface-card mt-3 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold">Customer questions & answers</p>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <CircleHelp className="h-4 w-4" />
                      Ask question
                    </Button>
                  </div>
                  <div className="mt-4 space-y-3">
                    {qaItems.map((item) => (
                      <article key={item.id} className="rounded-xl border border-border/60 p-3">
                        <p className="text-sm font-medium">Q. {item.question}</p>
                        <p className="mt-2 text-sm text-muted-foreground">A. {item.answer}</p>
                      </article>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="surface-card mt-3 p-4 text-sm text-muted-foreground">
                  Free shipping on eligible orders over INR 1000. Standard delivery takes 3-5 business days. Return window is 30 days with doorstep pickup.
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold">Similar products</h2>
              <ProductGrid products={relatedProducts} columns={4} />
            </section>
          )}

          {alsoBought.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold">Customers also bought</h2>
              <ProductGrid products={alsoBought} columns={4} />
            </section>
          )}

          {recentlyViewed.length > 0 && (
            <section className="mt-12">
              <h2 className="mb-4 text-2xl font-semibold">Recently viewed</h2>
              <ProductGrid products={recentlyViewed} columns={4} />
            </section>
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-16 z-30 border-t border-border/70 bg-background/95 p-3 backdrop-blur md:hidden">
        <div className="container-shell flex items-center justify-between gap-3 px-0">
          <div className="min-w-0">
            <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
            <p className="text-sm text-primary">{formatCurrency(product.discountPrice)}</p>
          </div>
          <Button
            size="sm"
            disabled={product.stock === 0 || isInCart(product.id)}
            onClick={handleAddToCart}
            className="rounded-full px-4"
          >
            <ShoppingCart className="h-4 w-4" />
            {isInCart(product.id) ? "In cart" : "Add"}
          </Button>
        </div>
      </div>

      <ProductComparisonModal
        open={compareOpen}
        onOpenChange={setCompareOpen}
        products={[product, ...relatedProducts.slice(0, 2)]}
      />
    </>
  );
}

function InfoPill({ icon: Icon, title, subtitle }) {
  return (
    <div className="rounded-xl bg-secondary/70 p-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <p className="text-sm font-semibold">{title}</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}

