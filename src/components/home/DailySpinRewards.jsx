"use client";

import { useMemo, useState } from "react";
import { Gift, Sparkles } from "lucide-react";
import { Button } from "../ui/button.jsx";
import { useToast } from "../../hooks/use-toast.js";

const SEGMENTS = [
  { label: "WELCOME10", color: "#16a34a", validCoupon: true },
  { label: "TRY AGAIN", color: "#334155", validCoupon: false },
  { label: "FLASH20", color: "#ea580c", validCoupon: true },
  { label: "FREE SHIP", color: "#0284c7", validCoupon: false },
  { label: "NEXORA30", color: "#7c3aed", validCoupon: true },
  { label: "BONUS", color: "#be123c", validCoupon: false },
];

const SEGMENT_ANGLE = 360 / SEGMENTS.length;

export function DailySpinRewards({ onCouponUnlock }) {
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selected = selectedIndex === null ? null : SEGMENTS[selectedIndex];

  const wheelStyle = useMemo(() => {
    const stops = SEGMENTS.map((segment, index) => {
      const start = index * SEGMENT_ANGLE;
      const end = start + SEGMENT_ANGLE;
      return `${segment.color} ${start}deg ${end}deg`;
    }).join(", ");
    return {
      backgroundImage: `conic-gradient(${stops})`,
      transform: `rotate(${rotation}deg)`,
      transition: isSpinning ? "transform 2.8s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
    };
  }, [isSpinning, rotation]);

  const spin = () => {
    if (isSpinning) {
      return;
    }

    const winner = Math.floor(Math.random() * SEGMENTS.length);
    const targetRotation = 360 * 6 + (360 - winner * SEGMENT_ANGLE - SEGMENT_ANGLE / 2);

    setIsSpinning(true);
    setSelectedIndex(null);
    setRotation((current) => current + targetRotation);

    window.setTimeout(() => {
      const reward = SEGMENTS[winner];
      setSelectedIndex(winner);
      setIsSpinning(false);

      if (reward.validCoupon) {
        onCouponUnlock?.(reward.label);
        toast({
          title: "Reward unlocked",
          description: `${reward.label} is ready to apply in coupon section.`,
        });
      } else {
        toast({
          title: "Spin completed",
          description: "No coupon this time. Try again later for a better reward.",
        });
      }
    }, 2900);
  };

  return (
    <section className="py-10">
      <div className="container-shell">
        <div className="surface-card-strong overflow-hidden p-5 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Gamified rewards</p>
              <h3 className="mt-2 text-2xl font-semibold md:text-3xl">Daily spin to unlock surprise offers</h3>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                Spin once and get a chance to unlock high-value coupon codes instantly.
              </p>

              <Button
                type="button"
                onClick={spin}
                disabled={isSpinning}
                className="mt-5 h-11 rounded-full px-6"
              >
                <Gift className="h-4 w-4" />
                {isSpinning ? "Spinning..." : "Spin now"}
              </Button>

              {selected && (
                <div
                  className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${
                    selected.validCoupon
                      ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                      : "border border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  {selected.validCoupon
                    ? `You won ${selected.label}. Apply it below.`
                    : `${selected.label}. Come back tomorrow for another spin.`}
                </div>
              )}
            </div>

            <div className="relative mx-auto h-64 w-64">
              <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
                <div className="h-0 w-0 border-x-[10px] border-b-[16px] border-x-transparent border-b-primary" />
              </div>

              <div className="h-full w-full rounded-full border-4 border-card shadow-xl" style={wheelStyle}>
                <div className="relative h-full w-full">
                  {SEGMENTS.map((segment, index) => (
                    <span
                      key={segment.label}
                      className="absolute left-1/2 top-1/2 origin-center text-[10px] font-semibold text-white drop-shadow"
                      style={{
                        transform: `rotate(${index * SEGMENT_ANGLE + SEGMENT_ANGLE / 2}deg) translateY(-108px) rotate(90deg)`,
                      }}
                    >
                      {segment.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background shadow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

