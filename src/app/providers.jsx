"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient.js";
import { TooltipProvider } from "../components/ui/tooltip.jsx";
import { CartProvider } from "../context/CartContext.jsx";
import { WishlistProvider } from "../context/WishlistContext.jsx";
import { ThemeProvider } from "../context/ThemeContext.jsx";
import { Toaster } from "../components/ui/toaster.jsx";
export function Providers({ children }) {
    return (<QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <TooltipProvider>
                <WishlistProvider>
                    <CartProvider>
                        {children}
                        <Toaster />
                    </CartProvider>
                </WishlistProvider>
            </TooltipProvider>
        </ThemeProvider>
    </QueryClientProvider>);
}
