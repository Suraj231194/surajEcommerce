"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, Package, ShoppingCart, Sparkles, User } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";

const ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/deals", label: "Deals", icon: Sparkles },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/account", label: "Account", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const itemCount = getItemCount();
  const wishlistCount = wishlistItems.length;
  const [cartBump, setCartBump] = useState(false);
  const previousItemCount = useRef(itemCount);

  useEffect(() => {
    if (itemCount === previousItemCount.current) {
      return;
    }
    previousItemCount.current = itemCount;
    setCartBump(true);
    const timer = window.setTimeout(() => setCartBump(false), 420);
    return () => window.clearTimeout(timer);
  }, [itemCount]);

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur md:hidden">
        <div className="mx-auto grid h-16 max-w-xl grid-cols-5 px-2">
          {ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative inline-flex flex-col items-center justify-center gap-1 text-[11px] transition",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.href === "/wishlist" && wishlistCount > 0 && (
                  <span className="absolute -top-0.5 right-3 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <Link
        href="/cart"
        className={cn(
          "fixed bottom-20 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/30 transition hover:scale-105 md:hidden",
          cartBump ? "cart-bump" : ""
        )}
        data-testid="mobile-floating-cart"
        aria-label="Open cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span
            className={cn(
              "absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground",
              cartBump ? "cart-bump" : ""
            )}
          >
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        )}
      </Link>
    </>
  );
}
