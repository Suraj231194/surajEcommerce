import { Button } from "../ui/button";
import Link from "next/link";

export function InfoSection() {
    return (
        <div className="flex flex-col gap-0">
            {/* Section 1: Quality */}
            <section className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                                alt="Quality Products"
                                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Curated Quality for You
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                We believe in quality over quantity. Every product in our catalog
                                is hand-picked by our experts to ensure you get the best value
                                for your money. From durability to design, we check everything.
                            </p>
                            <Button asChild>
                                <Link href="/about">Our Story</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: Sustainability */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Sustainable Shopping
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                We are committed to reducing our carbon footprint. Our packaging
                                is 100% recyclable, and we partner with eco-friendly brands to
                                bring you products that are good for you and the planet.
                            </p>
                            <Button variant="outline" asChild>
                                <Link href="/sustainability">Learn More</Link>
                            </Button>
                        </div>
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                                alt="Sustainability"
                                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Community */}
            <section className="py-16 md:py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                                alt="Community"
                                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Join Our Community
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Be part of a growing community of smart shoppers. Share your
                                reviews, get exclusive tips, and participate in our monthly
                                giveaways.
                            </p>
                            <Button asChild>
                                <Link href="/signup">Join Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
