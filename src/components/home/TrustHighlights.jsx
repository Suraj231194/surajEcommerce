import { CreditCard, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const HIGHLIGHTS = [
  {
    icon: Truck,
    title: "Same-day dispatch",
    description: "Orders placed before 2 PM are packed and shipped the same day.",
  },
  {
    icon: ShieldCheck,
    title: "100% genuine products",
    description: "Every item passes quality checks before being listed for sale.",
  },
  {
    icon: CreditCard,
    title: "Secure payments",
    description: "Card, UPI and wallet checkout with encrypted transaction flow.",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "Simple self-serve returns with quick refund processing.",
  },
];

export function TrustHighlights() {
  return (
    <section className="py-12">
      <div className="container-shell">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="surface-card p-4">
              <div className="mb-3 inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
