"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command.jsx";
import { categories, allProducts } from "../../data/products.js";
import { formatCurrency } from "../../lib/formatters.js";

export function GlobalCommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const featuredProducts = useMemo(() => {
    return [...allProducts].sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 8);
  }, []);

  const navigate = (href) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 left-4 z-40 hidden items-center gap-2 rounded-full border border-border/70 bg-background/95 px-3 py-2 text-xs text-muted-foreground shadow-lg backdrop-blur transition hover:border-primary/30 hover:text-primary lg:inline-flex"
        aria-label="Open search command palette"
      >
        <Search className="h-3.5 w-3.5" />
        Search
        <span className="rounded border border-border px-1.5 py-0.5 text-[10px]">Ctrl K</span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search products, categories or pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Quick links">
            <CommandItem onSelect={() => navigate("/")}>
              Home
              <CommandShortcut>/</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/deals")}>
              Deals
              <CommandShortcut>SALE</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => navigate("/wishlist")}>Wishlist</CommandItem>
            <CommandItem onSelect={() => navigate("/orders")}>Orders</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Categories">
            {categories.slice(0, 8).map((category) => (
              <CommandItem
                key={category.id}
                onSelect={() => navigate(`/category/${category.slug}`)}
              >
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Top products">
            {featuredProducts.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => navigate(`/product/${product.slug}`)}
              >
                <span className="line-clamp-1 flex-1">{product.name}</span>
                <CommandShortcut>{formatCurrency(product.discountPrice)}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
