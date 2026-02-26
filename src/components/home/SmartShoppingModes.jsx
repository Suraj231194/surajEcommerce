"use client";

import { useMemo } from "react";
import { Moon, Rocket, Sparkles, Star, Tag } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { useTheme } from "../../context/ThemeContext.jsx";

const MODES = [
  {
    id: "all",
    label: "Default",
    description: "Balanced marketplace feed",
    icon: Sparkles,
  },
  {
    id: "deal",
    label: "Deal Mode",
    description: "High-discount products first",
    icon: Tag,
  },
  {
    id: "premium",
    label: "Premium Mode",
    description: "Top-rated quality picks",
    icon: Star,
  },
  {
    id: "fast",
    label: "Fast Delivery",
    description: "Quick-dispatch options",
    icon: Rocket,
  },
  {
    id: "night",
    label: "Night Mode",
    description: "Low-light shopping view",
    icon: Moon,
  },
];

export function SmartShoppingModes({ mode = "all", onModeChange, counts }) {
  const { setTheme } = useTheme();

  const subtitle = useMemo(() => {
    const active = MODES.find((item) => item.id === mode) || MODES[0];
    return active.description;
  }, [mode]);

  const handleModeChange = (nextMode) => {
    if (nextMode === "night") {
      setTheme("dark");
    } else if (mode === "night") {
      setTheme("light");
    }
    onModeChange?.(nextMode);
  };

  return (
    <section className="pt-6">
      <div className="container-shell">
        <div className="surface-card-strong p-4 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold">Smart shopping mode</p>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {MODES.map((item) => {
              const isActive = mode === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleModeChange(item.id)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left transition active:scale-[0.98]",
                    isActive
                      ? "border-primary/40 bg-primary/10 text-primary shadow-sm"
                      : "border-border/70 bg-background hover:border-primary/30 hover:text-primary"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <p className="text-sm font-semibold">{item.label}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                </button>
              );
            })}
          </div>

          {counts && (
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-secondary px-3 py-1 text-muted-foreground">
                Showing {counts.visible} of {counts.total} curated products
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

