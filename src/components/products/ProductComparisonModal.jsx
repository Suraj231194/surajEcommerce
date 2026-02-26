"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog.jsx";
import { formatCurrency } from "../../lib/formatters.js";

export function ProductComparisonModal({ open, onOpenChange, products = [] }) {
  if (!products.length) {
    return null;
  }

  const specificationKeys = Array.from(
    new Set(
      products.flatMap((product) => Object.keys(product.specifications || {}))
    )
  ).slice(0, 8);

  const rows = [
    {
      label: "Price",
      values: products.map((product) => formatCurrency(product.discountPrice)),
    },
    {
      label: "Rating",
      values: products.map((product) => `${product.ratingAvg} / 5`),
    },
    {
      label: "Reviews",
      values: products.map((product) => `${(product.reviewCount || 0).toLocaleString()}`),
    },
    {
      label: "Stock",
      values: products.map((product) => `${product.stock} available`),
    },
    ...specificationKeys.map((key) => ({
      label: key,
      values: products.map((product) => String(product.specifications?.[key] ?? "-")),
    })),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-6xl overflow-hidden rounded-2xl p-0">
        <DialogTitle className="border-b border-border/70 px-5 py-4 text-left text-xl font-semibold">
          Product comparison
        </DialogTitle>

        <div className="max-h-[calc(90vh-72px)] overflow-auto p-4">
          <div className="min-w-[760px] overflow-hidden rounded-xl border border-border/70">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-card">
                <tr className="border-b border-border/70">
                  <th className="w-44 border-r border-border/70 px-4 py-3 text-left font-semibold text-muted-foreground">
                    Feature
                  </th>
                  {products.map((product) => (
                    <th key={product.id} className="border-r border-border/70 px-4 py-3 text-left last:border-r-0">
                      <div className="flex items-center gap-2">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <p className="line-clamp-1 text-sm font-semibold">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const isDifferent = new Set(row.values).size > 1;
                  return (
                    <tr key={row.label} className="border-b border-border/60 last:border-b-0">
                      <td className="border-r border-border/60 px-4 py-3 font-medium text-foreground">
                        {row.label}
                      </td>
                      {row.values.map((value, index) => (
                        <td
                          key={`${row.label}-${index}`}
                          className={`border-r border-border/60 px-4 py-3 text-muted-foreground last:border-r-0 ${
                            isDifferent ? "bg-amber-500/5" : ""
                          }`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
