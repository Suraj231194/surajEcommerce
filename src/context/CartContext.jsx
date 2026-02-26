import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useToast } from "../hooks/use-toast.js";

const CartContext = createContext(undefined);

const CART_STORAGE_KEY = "ecommerce_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
      setIsInitialized(true);
    }
  }, []);

  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addToCart = useCallback((product, quantity = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      return [...prev, { product, quantity }];
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  }, [toast]);

  const removeFromCart = useCallback((productId) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  }, [toast]);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.product.id !== productId));
      return;
    }

    setItems(prev => prev.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    ));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const getSubtotal = useCallback(() => {
    return items.reduce((total, item) =>
      total + item.product.discountPrice * item.quantity, 0
    );
  }, [items]);

  const getTax = useCallback(() => {
    return Math.round(getSubtotal() * 0.18);
  }, [getSubtotal]);

  const getShipping = useCallback(() => {
    const subtotal = getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 1000 ? 0 : 99;
  }, [getSubtotal]);

  const getTotal = useCallback(() => {
    return getSubtotal() + getTax() + getShipping();
  }, [getSubtotal, getTax, getShipping]);

  const isInCart = useCallback((productId) => {
    return items.some(item => item.product.id === productId);
  }, [items]);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount,
      getSubtotal,
      getTax,
      getShipping,
      getTotal,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
