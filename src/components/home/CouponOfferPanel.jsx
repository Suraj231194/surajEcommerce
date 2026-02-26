"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Sparkles, TicketPercent } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { Input } from "../ui/input.jsx";
import { Progress } from "../ui/progress.jsx";
import { Badge } from "../ui/badge.jsx";
import { formatCurrency } from "../../lib/formatters.js";

const COUPONS = {
  WELCOME10: { discount: 10, maxSave: 350, level: "Starter" },
  FLASH20: { discount: 20, maxSave: 900, level: "Pro" },
  NEXORA30: { discount: 30, maxSave: 1500, level: "Elite" },
};

const BASE_CART_VALUE = 5499;

export function CouponOfferPanel({ prefillCode = "" }) {
  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState("idle");
  const [applied, setApplied] = useState(null);

  useEffect(() => {
    const next = String(prefillCode || "").trim().toUpperCase();
    if (!next) {
      return;
    }
    setCoupon(next);
    setStatus("idle");
  }, [prefillCode]);

  const normalizedCode = coupon.trim().toUpperCase();
  const preview = useMemo(() => COUPONS[normalizedCode] || null, [normalizedCode]);

  const applyCoupon = () => {
    if (!normalizedCode) {
      return;
    }
    const found = COUPONS[normalizedCode];
    if (!found) {
      setStatus("invalid");
      setApplied(null);
      return;
    }
    setApplied({ code: normalizedCode, ...found });
    setStatus("applied");
  };

  const savings = applied
    ? Math.min(Math.round((BASE_CART_VALUE * applied.discount) / 100), applied.maxSave)
    : 0;
  const saleLevel = applied ? Math.min(100, 45 + applied.discount * 1.6) : 52;

  return (
    <section className="py-10">
      <div className="container-shell">
        <div className="surface-card-strong overflow-hidden p-5 md:p-7">
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Badge className="rounded-full bg-primary/10 text-primary">
                <TicketPercent className="h-3.5 w-3.5" />
                Promo zone
              </Badge>
              <h3 className="mt-3 text-2xl font-semibold md:text-3xl">
                Apply promo code and unlock higher sale level
              </h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Try <span className="font-semibold text-foreground">WELCOME10</span>,{" "}
                <span className="font-semibold text-foreground">FLASH20</span> or{" "}
                <span className="font-semibold text-foreground">NEXORA30</span>.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Input
                  value={coupon}
                  onChange={(event) => {
                    setCoupon(event.target.value);
                    if (status !== "idle") {
                      setStatus("idle");
                    }
                  }}
                  placeholder="Enter coupon code"
                  className="h-11 rounded-full sm:max-w-xs"
                />
                <Button className="h-11 rounded-full px-6" onClick={applyCoupon}>
                  Apply coupon
                </Button>
              </div>

              {status === "applied" && applied && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-sm font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Offer applied: {applied.code} - You saved {formatCurrency(savings)}
                </div>
              )}

              {status === "invalid" && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-sm font-medium text-destructive">
                  Invalid coupon code. Try WELCOME10, FLASH20 or NEXORA30.
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-background to-secondary/55 p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold">Current sale level</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  {applied?.level || "Starter"}
                </span>
              </div>
              <Progress value={saleLevel} className="h-2.5" />
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{Math.round(saleLevel)}%</span>
                <span>100%</span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/80 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Cart value preview</span>
                  <span className="font-semibold">{formatCurrency(BASE_CART_VALUE)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-background/80 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Estimated savings</span>
                  <span className="font-semibold text-emerald-600">
                    {applied ? formatCurrency(savings) : "Apply code"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
