import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { Providers } from "./providers.jsx";
import "./globals.css";
import { Navbar } from "../components/layout/Navbar.jsx";
import { Footer } from "../components/layout/Footer.jsx";
import { MobileBottomNav } from "../components/layout/MobileBottomNav.jsx";
import { ShoppingAssistantWidget } from "../components/assistant/ShoppingAssistantWidget.jsx";
import { PageTransition } from "../components/layout/PageTransition.jsx";
import { ScrollTopButton } from "../components/layout/ScrollTopButton.jsx";
import { GlobalCommandPalette } from "../components/layout/GlobalCommandPalette.jsx";
import { BRAND_NAME } from "../lib/brand.js";

const bodyFont = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-body",
});

const displayFont = Fraunces({
    subsets: ["latin"],
    variable: "--font-display",
});
export const metadata = {
    title: BRAND_NAME,
    description: "Premium modern e-commerce platform",
};
export default function RootLayout({ children, }) {
    return (<html lang="en">
        <body className={`${bodyFont.variable} ${displayFont.variable}`}>
            <Providers>
                <div className="min-h-screen flex flex-col bg-background">
                    <Navbar />
                    <main className="flex-1 pb-24 md:pb-0">
                        <PageTransition>{children}</PageTransition>
                    </main>
                    <Footer />
                    <MobileBottomNav />
                    <ShoppingAssistantWidget />
                    <ScrollTopButton />
                    <GlobalCommandPalette />
                </div>
            </Providers>
        </body>
    </html>);
}
