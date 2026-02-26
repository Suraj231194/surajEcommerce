"use client";

import { useMemo, useState } from "react";
import { BarChart3, Calculator, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "../ui/input.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select.jsx";
import { formatCurrency } from "../../lib/formatters.js";

const EMI_MONTH_OPTIONS = ["3", "6", "9", "12", "18", "24"];

export function ProductDecisionTools({ product }) {
  const [months, setMonths] = useState("12");
  const [annualRate, setAnnualRate] = useState("12");
  const [downPayment, setDownPayment] = useState(String(Math.round(product.discountPrice * 0.1)));

  const parsedMonths = Number(months) || 12;
  const parsedRate = Number(annualRate) || 0;
  const parsedDownPayment = Math.max(0, Number(downPayment) || 0);
  const principal = Math.max(0, product.discountPrice - parsedDownPayment);

  const emi = useMemo(() => {
    if (principal <= 0) {
      return 0;
    }
    const monthlyRate = parsedRate / 12 / 100;
    if (monthlyRate === 0) {
      return principal / parsedMonths;
    }
    const factor = (1 + monthlyRate) ** parsedMonths;
    return (principal * monthlyRate * factor) / (factor - 1);
  }, [principal, parsedMonths, parsedRate]);

  const totalPayable = emi * parsedMonths + parsedDownPayment;
  const totalInterest = Math.max(0, totalPayable - product.discountPrice);

  const history = useMemo(() => {
    const base = product.discountPrice;
    return ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"].map((month, index) => {
      const diff = ((product.id + index * 13) % 9) * 120;
      const direction = index % 2 === 0 ? -1 : 1;
      const value = Math.max(base * 0.84, base + direction * diff);
      return { month, value: Math.round(value) };
    });
  }, [product.discountPrice, product.id]);

  const minHistory = Math.min(...history.map((item) => item.value));
  const maxHistory = Math.max(...history.map((item) => item.value));

  const pros = [
    product.ratingAvg >= 4.4 ? "Strong customer rating and verified reviews." : "Competitive value for its category.",
    product.stock > 10 ? "Healthy stock availability for quick dispatch." : "Limited stock can add urgency for purchase.",
    "Secure payment and easy return policy available.",
  ];

  const cons = [
    product.discountPrice > 60000 ? "Higher price point compared to entry-level alternatives." : "Feature upgrades may require higher variants.",
    "Color and variant availability may vary by PIN code.",
  ];

  const whoShouldBuy = getWhoShouldBuy(product.categorySlug);

  return (
    <div className="mt-4 space-y-4">
      <div className="rounded-2xl border border-border/70 bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <Calculator className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold">EMI calculator</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Down payment</p>
            <Input
              inputMode="numeric"
              value={downPayment}
              onChange={(event) => setDownPayment(event.target.value.replace(/\D/g, ""))}
              className="h-9"
            />
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Tenure (months)</p>
            <Select value={months} onValueChange={setMonths}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EMI_MONTH_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option} months
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Interest % (yearly)</p>
            <Input
              inputMode="decimal"
              value={annualRate}
              onChange={(event) => setAnnualRate(event.target.value.replace(/[^\d.]/g, ""))}
              className="h-9"
            />
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <Metric label="Monthly EMI" value={formatCurrency(Math.round(emi))} primary />
          <Metric label="Total interest" value={formatCurrency(Math.round(totalInterest))} />
          <Metric label="Total payable" value={formatCurrency(Math.round(totalPayable))} />
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-4">
        <div className="mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold">Price history trend (mock)</p>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {history.map((item) => {
            const percent = maxHistory === minHistory ? 65 : ((item.value - minHistory) / (maxHistory - minHistory)) * 65 + 20;
            return (
              <div key={item.month} className="text-center">
                <div className="mx-auto flex h-20 w-8 items-end">
                  <div className="w-full rounded-t-md bg-primary/70" style={{ height: `${percent}%` }} />
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">{item.month}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-4">
        <p className="text-sm font-semibold">Who should buy this?</p>
        <p className="mt-1 text-xs text-muted-foreground">{whoShouldBuy}</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">Pros</p>
            <div className="mt-2 space-y-2">
              {pros.map((pro) => (
                <p key={pro} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                  {pro}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-700">Cons</p>
            <div className="mt-2 space-y-2">
              {cons.map((con) => (
                <p key={con} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <XCircle className="mt-0.5 h-3.5 w-3.5 text-amber-600" />
                  {con}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, primary = false }) {
  return (
    <div className="rounded-xl border border-border/70 bg-secondary/40 p-2.5">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${primary ? "text-primary" : ""}`}>{value}</p>
    </div>
  );
}

function getWhoShouldBuy(categorySlug) {
  if (categorySlug.includes("mobile")) {
    return "Best for users upgrading to a reliable daily smartphone with balanced camera, battery and long-term value.";
  }
  if (categorySlug.includes("laptops")) {
    return "Great for students and professionals who need a dependable machine for work, meetings and everyday productivity.";
  }
  if (categorySlug.includes("fashion")) {
    return "Ideal for buyers looking for trend-focused style with comfortable all-day wear and brand-backed quality.";
  }
  if (categorySlug.includes("audio")) {
    return "Perfect for commuters, casual listeners and gamers who want clearer sound and easy device compatibility.";
  }
  return "Recommended for shoppers who want trusted quality, stable pricing and smoother after-sales support.";
}

