"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { allProducts } from "../../data/products.js";
import { formatCurrency } from "../../lib/formatters.js";
import { ProgressiveImage } from "../ui/progressive-image.jsx";

const QUICK_PROMPTS = [
  "Find deals under INR 5000",
  "Show best rated headphones",
  "Help me choose a gaming laptop",
];

export function ShoppingAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I can help you discover products, compare options, and find the best deals.",
    },
  ]);

  const recommendations = useMemo(() => {
    return [...allProducts].sort((a, b) => b.ratingAvg - a.ratingAvg).slice(0, 3);
  }, []);

  const submitMessage = (message) => {
    const value = message.trim();
    if (!value) {
      return;
    }

    setMessages((current) => [...current, { role: "user", text: value }]);
    setInput("");

    window.setTimeout(() => {
      const fallback = recommendations[0];
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: `Great choice. You can start with ${fallback.name} at ${formatCurrency(
            fallback.discountPrice
          )}, or open /search for broader results.`,
        },
      ]);
    }, 450);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-20 left-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-700 text-white shadow-2xl shadow-primary/35 transition hover:scale-105 md:bottom-6 md:left-auto md:right-6"
        aria-label="Open AI shopping assistant"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      <div
        className={`fixed bottom-40 right-4 z-50 w-[calc(100%-2rem)] max-w-sm origin-bottom-right rounded-2xl border border-white/35 bg-white/12 shadow-2xl backdrop-blur-xl transition-all duration-300 md:bottom-24 md:right-6 ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-border/60 bg-background/80">
          <header className="flex items-center justify-between border-b border-border/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Bot className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">AI Shopping Assistant</p>
                <p className="text-[11px] text-muted-foreground">Always available</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-secondary text-foreground"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                {message.text}
              </div>
            ))}

            <div className="rounded-xl border border-border/70 bg-secondary/45 p-2.5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Quick prompts
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => submitMessage(prompt)}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs transition hover:border-primary/35 hover:text-primary"
                  >
                    <Sparkles className="mr-1 inline h-3 w-3" />
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border/70 bg-background p-2.5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Recommended now
              </p>
              <div className="space-y-2">
                {recommendations.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="flex items-center gap-2 rounded-lg px-1.5 py-1 transition hover:bg-muted"
                  >
                    <div className="h-8 w-8 overflow-hidden rounded-md">
                      <ProgressiveImage
                        src={product.images[0]}
                        alt={product.name}
                        imgClassName="h-8 w-8 rounded-md object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-medium">{product.name}</p>
                      <p className="text-[11px] text-muted-foreground">{formatCurrency(product.discountPrice)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitMessage(input);
            }}
            className="border-t border-border/70 p-3"
          >
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask for product recommendations..."
                className="h-6 flex-1 bg-transparent text-sm outline-none"
              />
              <button
                type="submit"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
