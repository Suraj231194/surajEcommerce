"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Camera,
  ChevronDown,
  Heart,
  Headphones,
  Laptop2,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Package,
  Search,
  Shirt,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Sun,
  Tablet,
  User,
  Watch,
} from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Badge } from "../ui/badge.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu.jsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import { categories } from "../../data/products.js";
import { useToast } from "../../hooks/use-toast.js";
import { SearchAutocomplete } from "../shared/SearchAutocomplete.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { cn } from "../../lib/utils.js";
import { BRAND_NAME, BRAND_SHORT, BRAND_TAGLINE } from "../../lib/brand.js";

const DESKTOP_CATEGORIES = categories.slice(0, 8);
const MORE_CATEGORIES = categories.slice(8);

const CATEGORY_ICON_MAP = {
  "mobile-phones": Smartphone,
  "laptops-computers": Laptop2,
  "tablets-ereaders": Tablet,
  "headphones-audio": Headphones,
  "cameras-photography": Camera,
  "mens-fashion": Shirt,
  "womens-fashion": Sparkles,
  "kids-fashion": Shirt,
  "watches-accessories": Watch,
};

const MOBILE_QUICK_LINKS = [
  { href: "/deals", label: "Flash deals", icon: Sparkles },
  { href: "/search", label: "All products", icon: Search },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/orders", label: "Orders", icon: Package },
  { href: "/account", label: "Account", icon: User },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const { toast } = useToast();
  const { getItemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const itemCount = getItemCount();
  const wishlistCount = wishlistItems.length;
  const [isCompact, setIsCompact] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [wishlistBump, setWishlistBump] = useState(false);
  const previousItemCount = useRef(itemCount);
  const previousWishlistCount = useRef(wishlistCount);

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (itemCount === previousItemCount.current) {
      return;
    }
    previousItemCount.current = itemCount;
    setCartBump(true);
    const timer = window.setTimeout(() => setCartBump(false), 420);
    return () => window.clearTimeout(timer);
  }, [itemCount]);

  useEffect(() => {
    if (wishlistCount === previousWishlistCount.current) {
      return;
    }
    previousWishlistCount.current = wishlistCount;
    setWishlistBump(true);
    const timer = window.setTimeout(() => setWishlistBump(false), 420);
    return () => window.clearTimeout(timer);
  }, [wishlistCount]);

  const getUserInitials = () => {
    if (!user) {
      return "U";
    }
    const first = user.firstName?.[0] || "";
    const last = user.lastName?.[0] || "";
    return (first + last).toUpperCase() || user.email?.[0]?.toUpperCase() || "U";
  };

  const getDashboardLink = () => {
    if (!user) {
      return "/";
    }
    switch (user.role) {
      case "admin":
        return "/admin";
      case "seller":
        return "/seller";
      default:
        return "/account";
    }
  };

  const handleLogout = async () => {
    await logout();
    toast({ title: "Signed out", description: "You have been signed out successfully." });
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="container-shell">
        <div className={cn("flex items-center gap-3 transition-all", isCompact ? "h-14" : "h-16")}>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex h-full flex-col bg-gradient-to-b from-background to-secondary/25">
                <div className="border-b border-border/70 p-5">
                  <Link href="/" className="inline-flex items-center gap-2 text-xl font-semibold" data-testid="link-logo-mobile">
                    <LogoMark />
                    {BRAND_NAME}
                  </Link>
                  <p className="mt-1 text-xs text-muted-foreground">{BRAND_TAGLINE}</p>
                </div>

                <div className="p-5">
                  <SearchAutocomplete inputClassName="h-10 bg-background" />
                </div>

                <nav className="flex-1 space-y-4 overflow-y-auto px-4 pb-4">
                  <SheetClose asChild>
                    <Link
                      href="/deals"
                      className="block rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/15 via-background to-amber-500/20 p-3"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                        Top ad
                      </p>
                      <p className="mt-1 text-sm font-semibold">Live Flash Sale - Up to 60% off today</p>
                      <p className="mt-1 text-xs text-muted-foreground">Tap to open premium offers</p>
                    </Link>
                  </SheetClose>

                  <div>
                    <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Quick links
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {MOBILE_QUICK_LINKS.map((item) => (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/90 px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-primary/5"
                          >
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-primary">
                              <item.icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </div>

                  <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Shop by category
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => {
                      const Icon = CATEGORY_ICON_MAP[category.slug] || Sparkles;
                      return (
                        <SheetClose asChild key={category.id}>
                          <Link
                            href={`/category/${category.slug}`}
                            className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/90 px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-primary/5"
                            data-testid={`link-category-mobile-${category.slug}`}
                          >
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-primary">
                              <Icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="line-clamp-2 font-medium leading-tight">{category.name}</span>
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </div>
                </nav>

                <div className="border-t border-border/70 p-4 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between gap-2">
                    <SheetClose asChild>
                      <Link href="/cart" className="inline-flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-muted">
                        <ShoppingCart className="h-4 w-4" />
                        Go to cart
                      </Link>
                    </SheetClose>
                    <Button type="button" variant="outline" className="h-9 rounded-full px-3" onClick={toggleTheme}>
                      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                      {theme === "dark" ? "Light" : "Dark"}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="inline-flex items-center gap-2" data-testid="link-logo">
            <LogoMark />
            <span className="hidden text-xl font-semibold sm:inline">{BRAND_NAME}</span>
          </Link>

          <div className="hidden flex-1 md:block">
            <SearchAutocomplete />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => router.push("/search")}
            data-testid="button-search-mobile"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Link href="/cart" className="relative" data-testid="button-cart">
            <Button
              variant="outline"
              className={cn("h-10 rounded-full px-3 shadow-sm sm:px-4", cartBump ? "cart-bump" : "")}
              data-cart-anchor="true"
              id="navbar-cart-anchor"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
            </Button>
            {itemCount > 0 && (
              <Badge
                className={cn(
                  "absolute -right-1 -top-2 h-5 min-w-5 rounded-full px-1 text-[10px]",
                  cartBump ? "cart-bump" : ""
                )}
                data-testid="badge-cart-count"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </Badge>
            )}
          </Link>

          <Link href="/wishlist" className="relative hidden md:inline-flex" data-testid="button-wishlist-nav">
            <Button
              variant="outline"
              className={cn("h-10 rounded-full px-3 shadow-sm", wishlistBump ? "cart-bump" : "")}
            >
              <Heart className="h-4 w-4" />
              <span className="hidden lg:inline">Wishlist</span>
            </Button>
            {wishlistCount > 0 && (
              <Badge
                className={cn(
                  "absolute -right-1 -top-2 h-5 min-w-5 rounded-full px-1 text-[10px]",
                  wishlistBump ? "cart-bump" : ""
                )}
              >
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </Badge>
            )}
          </Link>

          <Button
            type="button"
            variant="outline"
            size="icon"
            className="hidden rounded-full md:inline-flex"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {isLoading ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          ) : isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 rounded-full border-border/80 pl-1 pr-3"
                  data-testid="button-user-menu"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || "User"} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm sm:inline">{user.firstName || "Account"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href={getDashboardLink()} className="flex items-center gap-2" data-testid="link-dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center gap-2" data-testid="link-orders">
                    <Package className="h-4 w-4" />
                    My orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist" className="flex items-center gap-2" data-testid="link-wishlist">
                    <Heart className="h-4 w-4" />
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-destructive"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="h-10 rounded-full px-5" data-testid="button-login">
              <Link href="/login">
                <User className="h-4 w-4" />
                Sign in
              </Link>
            </Button>
          )}
        </div>

        <div className="pb-3 md:hidden">
          <SearchAutocomplete inputClassName="h-10 bg-card" />
        </div>
      </div>

      <div className="hidden border-t border-border/60 bg-card/70 md:block">
        <nav className="container-shell flex items-center gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border/80 bg-background px-3 text-xs font-semibold shadow-sm transition hover:border-primary/30 hover:text-primary">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                Categories
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[44rem] p-3" align="start">
              <div className="grid grid-cols-3 gap-2">
                {categories.map((category) => {
                  const Icon = CATEGORY_ICON_MAP[category.slug] || Sparkles;
                  return (
                    <DropdownMenuItem asChild key={`mega-${category.id}`}>
                      <Link href={`/category/${category.slug}`} className="flex items-center gap-2 rounded-lg p-2">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium">{category.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {DESKTOP_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICON_MAP[category.slug] || Sparkles;
            const isActive = pathname?.startsWith(`/category/${category.slug}`);
            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className={cn(
                  "group inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium whitespace-nowrap transition",
                  isActive
                    ? "border-primary/40 bg-primary/10 text-primary shadow-sm"
                    : "border-transparent bg-transparent text-muted-foreground hover:border-border/80 hover:bg-background hover:text-foreground"
                )}
                data-testid={`link-category-desktop-${category.slug}`}
              >
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>{category.name}</span>
              </Link>
            );
          })}

          {MORE_CATEGORIES.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-transparent px-3 text-xs text-muted-foreground transition hover:border-border/80 hover:bg-background hover:text-foreground">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                  More
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {MORE_CATEGORIES.map((category) => (
                  <DropdownMenuItem asChild key={`more-${category.id}`}>
                    <Link href={`/category/${category.slug}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Link
            href="/search"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-border/80 bg-background px-3 text-xs font-semibold text-primary shadow-sm transition hover:border-primary/30"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Search className="h-3.5 w-3.5" />
            </span>
            All products
          </Link>

          <Link
            href="/deals"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 text-xs font-semibold text-destructive transition hover:border-destructive/50"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-destructive/15 text-destructive">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Flash deals
          </Link>
        </nav>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-blue-600 to-cyan-500 text-sm font-black text-white shadow-lg">
      {BRAND_SHORT}
    </span>
  );
}
