"use client";

import Link from "next/link";
import { MapPin, Package, Star, UserRound, Wallet } from "lucide-react";
import { Button } from "../../components/ui/button.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { allProducts } from "../../data/products.js";
import { formatCurrency } from "../../lib/formatters.js";
import { ProgressiveImage } from "../../components/ui/progressive-image.jsx";

const SAMPLE_ORDERS = [
  {
    id: "NX-102938",
    status: "In transit",
    date: "Feb 23, 2026",
    total: 45999,
  },
  {
    id: "NX-102671",
    status: "Delivered",
    date: "Feb 15, 2026",
    total: 12999,
  },
];

const NAV_ITEMS = [
  { id: "profile", label: "Profile summary", icon: UserRound },
  { id: "orders", label: "Recent orders", icon: Package },
  { id: "wishlist", label: "Wishlist preview", icon: Star },
  { id: "addresses", label: "Saved addresses", icon: MapPin },
];

export default function AccountPage() {
  const { user } = useAuth();
  const { items } = useWishlist();

  const wishlistPreview = items
    .map((item) => allProducts.find((product) => product.id === item.id) || item)
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card to-secondary/30 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">My account</p>
          <h1 className="text-3xl font-semibold">Account dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your profile, orders, saved products and addresses.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="surface-card h-fit p-3 lg:sticky lg:top-24">
            <div className="rounded-xl bg-secondary/60 p-3">
              <p className="text-sm font-semibold">{user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Guest user"}</p>
              <p className="text-xs text-muted-foreground">{user?.email || "hello@nexora.shop"}</p>
            </div>

            <nav className="mt-3 grid gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-3 rounded-xl border border-border/70 p-3 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground">Wallet balance</p>
              <p className="mt-1 text-lg font-semibold text-primary">{formatCurrency(2480)}</p>
              <p className="mt-1">Use balance for faster checkout.</p>
            </div>
          </aside>

          <div className="space-y-5">
            <section id="profile" className="surface-card p-5">
              <h2 className="text-xl font-semibold">Profile summary</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <Stat title="Total orders" value="24" />
                <Stat title="Wishlist items" value={String(items.length)} />
                <Stat title="Loyalty tier" value="Gold" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button className="rounded-full px-5">Edit profile</Button>
                <Button variant="outline" className="rounded-full px-5">
                  <Wallet className="h-4 w-4" />
                  Manage payments
                </Button>
              </div>
            </section>

            <section id="orders" className="surface-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent orders</h2>
                <Button asChild variant="outline" className="rounded-full px-4">
                  <Link href="/orders">View all</Link>
                </Button>
              </div>
              <div className="mt-4 space-y-3">
                {SAMPLE_ORDERS.map((order) => (
                  <article key={order.id} className="rounded-xl border border-border/70 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">Order total: {formatCurrency(order.total)}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="wishlist" className="surface-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Wishlist preview</h2>
                <Button asChild variant="outline" className="rounded-full px-4">
                  <Link href="/wishlist">Open wishlist</Link>
                </Button>
              </div>
              {wishlistPreview.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {wishlistPreview.map((product) => (
                    <Link key={product.id} href={`/product/${product.slug}`} className="rounded-xl border border-border/70 p-2 transition hover:-translate-y-0.5 hover:shadow-md">
                      <div className="aspect-square overflow-hidden rounded-lg">
                        <ProgressiveImage
                          src={product.image || product.images?.[0]}
                          alt={product.name}
                          imgClassName="h-full w-full rounded-lg object-cover"
                        />
                      </div>
                      <p className="mt-2 line-clamp-1 text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{formatCurrency(product.discountPrice)}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">No wishlist items yet.</p>
              )}
            </section>

            <section id="addresses" className="surface-card p-5">
              <h2 className="text-xl font-semibold">Saved addresses</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <AddressCard title="Home" lines={["Bandra Kurla Complex", "Mumbai, Maharashtra 400051"]} />
                <AddressCard title="Office" lines={["Koramangala", "Bengaluru, Karnataka 560095"]} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-xl border border-border/70 bg-secondary/40 p-3">
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}

function AddressCard({ title, lines }) {
  return (
    <div className="rounded-xl border border-border/70 p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{lines[0]}</p>
      <p className="text-sm text-muted-foreground">{lines[1]}</p>
      <Button variant="ghost" className="mt-3 h-8 rounded-full px-4 text-xs">
        Edit address
      </Button>
    </div>
  );
}
