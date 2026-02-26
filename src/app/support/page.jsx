"use client";

import Link from "next/link";
import { Headset, LifeBuoy, Mail, MessageSquare, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion.jsx";
import { Button } from "../../components/ui/button.jsx";

const FAQS = [
  {
    id: "item-1",
    question: "How can I track my order?",
    answer:
      "Open My Orders and select the order to view live tracking updates with dispatch and delivery milestones.",
  },
  {
    id: "item-2",
    question: "What is the return or replacement policy?",
    answer:
      "Eligible items can be returned or replaced within the policy window shown on the product page and order details page.",
  },
  {
    id: "item-3",
    question: "How do I apply coupon and bank offers?",
    answer:
      "At checkout, add your coupon in the summary section and select eligible payment options to unlock bank offers.",
  },
  {
    id: "item-4",
    question: "Is cash on delivery available?",
    answer:
      "COD depends on your PIN code, product category, and order value. You can check availability during checkout.",
  },
];

export default function SupportPage() {
  return (
    <div className="pb-12 pt-8">
      <div className="container-shell">
        <div className="mb-6 rounded-2xl border border-border/70 bg-gradient-to-r from-card to-secondary/35 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Support</p>
          <h1 className="text-3xl font-semibold">Help Center</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Get instant help for orders, delivery, returns and payments.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
          <section className="surface-card p-5">
            <h2 className="text-xl font-semibold">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-3">
              {FAQS.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <aside className="space-y-4">
            <div className="surface-card p-5">
              <h3 className="text-lg font-semibold">Contact support</h3>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  +91 1800-000-123
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  support@nexora.shop
                </p>
                <p className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Live chat: 24x7
                </p>
              </div>
              <Button className="mt-4 w-full rounded-xl">
                <Headset className="h-4 w-4" />
                Start live chat
              </Button>
            </div>

            <div className="surface-card p-5">
              <h3 className="text-lg font-semibold">Popular actions</h3>
              <div className="mt-3 grid gap-2">
                <Button asChild variant="outline" className="justify-start rounded-xl">
                  <Link href="/orders">Track an order</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start rounded-xl">
                  <Link href="/wishlist">Manage wishlist</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start rounded-xl">
                  <Link href="/account">Account settings</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start rounded-xl">
                  <Link href="/checkout">
                    <LifeBuoy className="h-4 w-4" />
                    Payment help
                  </Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

