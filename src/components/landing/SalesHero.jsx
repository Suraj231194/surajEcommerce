import Link from "next/link";
import { Button } from "../ui/button";

export function SalesHero() {
    return (
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    Mega Season Sale
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl text-primary-foreground/90">
                    Up to 50% off on premium electronics, fashion, and home accessories. Limited time offer!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button size="lg" variant="secondary" asChild className="text-lg px-8">
                        <Link href="/category/mobile-phones">Shop the Sale</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        <Link href="#features">Learn More</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
