import { Truck, ShieldCheck, Clock, CreditCard } from "lucide-react";

const features = [
    {
        icon: Truck,
        title: "Fast & Free Shipping",
        description:
            "Enjoy free shipping on all orders over ₹1000. We partner with top logistics providers to ensure your package arrives safely and on time.",
    },
    {
        icon: ShieldCheck,
        title: "Secure Payments",
        description:
            "Your security is our priority. We use industry-standard encryption to ensure your payment details are always safe and protected.",
    },
    {
        icon: Clock,
        title: "24/7 Customer Support",
        description:
            "Have a question? Our dedicated support team is available round the clock to assist you with any queries or concerns.",
    },
    {
        icon: CreditCard,
        title: "Easy Returns & Refunds",
        description:
            "Not satisfied with your purchase? No problem. We offer a hassle-free 30-day return policy with instant refunds.",
    },
];

export function EcommerceFeatures() {
    return (
        <section className="py-16 bg-primary/5" id="features">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Shop With Us?</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We strive to provide the best shopping experience possible. Here are
                        just a few reasons why our customers love us.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                        >
                            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
