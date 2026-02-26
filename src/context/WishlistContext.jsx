"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "../hooks/use-toast.js";

const WishlistContext = createContext(undefined);
const WISHLIST_STORAGE_KEY = "nexora_wishlist";

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      } catch (error) {
        // Ignore malformed values from previous sessions.
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized || typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  }, [items, isInitialized]);

  const isInWishlist = useCallback(
    (productId) => items.some((item) => item.id === productId),
    [items]
  );

  const toggleWishlist = useCallback(
    (product) => {
      const exists = items.some((item) => item.id === product.id);
      if (exists) {
        setItems((current) => current.filter((item) => item.id !== product.id));
        toast({
          title: "Removed from wishlist",
          description: `${product.name} was removed from your wishlist.`,
        });
        return;
      }

      const payload = {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        discountPrice: product.discountPrice,
        price: product.price,
        ratingAvg: product.ratingAvg,
        reviewCount: product.reviewCount,
        image: product.images?.[0] || "",
        stock: product.stock,
        savedAt: Date.now(),
      };
      setItems((current) => [payload, ...current]);
      toast({
        title: "Added to wishlist",
        description: `${product.name} was saved for later.`,
      });
    },
    [items, toast]
  );

  const removeFromWishlist = useCallback((productId) => {
    setItems((current) => current.filter((item) => item.id !== productId));
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
    }),
    [items, isInWishlist, toggleWishlist, removeFromWishlist, clearWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
