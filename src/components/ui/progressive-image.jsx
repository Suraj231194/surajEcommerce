"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils.js";

export function ProgressiveImage({
  src,
  alt,
  className,
  imgClassName,
  placeholderClassName,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setHasError(false);
  }, [src]);

  const safeSrc = useMemo(() => {
    if (src && !hasError) {
      return src;
    }
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23dbeafe' offset='0'/%3E%3Cstop stop-color='%23bfdbfe' offset='1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='34' fill='%231e3a8a'%3ENexora%3C/text%3E%3C/svg%3E";
  }, [src, hasError]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-muted via-secondary to-muted soft-shimmer transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100",
          placeholderClassName
        )}
      />
      <img
        src={safeSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => {
          setHasError(true);
          setLoaded(true);
        }}
        className={cn(
          "h-full w-full object-cover transition-all duration-500",
          loaded ? "scale-100 blur-0 opacity-100" : "scale-105 blur-sm opacity-0",
          imgClassName
        )}
        {...props}
      />
    </div>
  );
}
