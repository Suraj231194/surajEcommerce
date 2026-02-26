"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, BadgeCheck, ShieldCheck, Star, Store, Truck, Users } from "lucide-react";
import { Button } from "../../../components/ui/button.jsx";
import { Badge } from "../../../components/ui/badge.jsx";
import { ProductGrid } from "../../../components/products/ProductGrid.jsx";
import { SortSelect } from "../../../components/products/SortSelect.jsx";
import { getProductsBySellerSlug, getSellerBySlug } from "../../../lib/sellers.js";

export default function SellerStorePage() {
  const params = useParams();
  const slug = params.slug;
  const [sortBy, setSortBy] = useState("newest");

  const seller = useMemo(() => getSellerBySlug(slug), [slug]);

  const products = useMemo(() => {
    const list = [...getProductsBySellerSlug(slug)];

    switch (sortBy) {
      case "price-low":
        list.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "price-high":
        list.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case "rating":
        list.sort((a, b) => b.ratingAvg - a.ratingAvg);
        break;
      case "discount":
        list.sort((a, b) => (b.price - b.discountPrice) / b.price - (a.price - a.discountPrice) / a.price);
        break;
      case "relevance":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "newest":
      default:
        list.sort((a, b) => b.id - a.id);
        break;
    }

    return list;
  }, [slug, sortBy]);

  if (!seller) {
    return (
      <div className="container-shell py-16 text-center">
        <h1 className="text-4xl font-semibold">Store Not Found</h1>
        <p className="mt-3 text-muted-foreground">We could not find this seller storefront.</p>
        <Button asChild className="mt-6 rounded-full">
          <Link href="/search">
            <ArrowLeft className="h-4 w-4" />
            Browse products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div
          className="relative overflow-hidden rounded-3xl border border-border/70 p-5 text-white md:p-8"
          style={{
            backgroundImage: `linear-gradient(135deg, ${seller.bannerFrom}, ${seller.bannerTo})`,
          }}
        >
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-white/20 text-white">
                <Store className="h-3.5 w-3.5" />
                Seller storefront
              </Badge>
              <Badge className="bg-white/20 text-white">
                <BadgeCheck className="h-3.5 w-3.5" />
                Verified
              </Badge>
            </div>

            <h1 className="mt-3 text-3xl font-semibold md:text-4xl">{seller.name}</h1>
            <p className="mt-2 max-w-3xl text-sm text-white/90 md:text-base">{seller.about}</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric icon={Star} value={`${seller.ratingAvg} / 5`} label={`${seller.reviewCount.toLocaleString()} ratings`} />
              <Metric icon={Users} value={seller.followers.toLocaleString()} label="Followers" />
              <Metric icon={Truck} value={`${seller.shipTimeDays} day dispatch`} label="Average shipping speed" />
              <Metric icon={ShieldCheck} value={`${seller.responseRate}%`} label="Seller response rate" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {seller.badges.map((badge) => (
                <span key={badge} className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {products.length} products from this store
          </div>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        <div className="mt-4">
          <ProductGrid products={products} columns={4} />
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, value, label }) {
  return (
    <div className="rounded-xl border border-white/30 bg-white/10 p-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <p className="text-sm font-semibold">{value}</p>
      </div>
      <p className="mt-1 text-xs text-white/85">{label}</p>
    </div>
  );
}

