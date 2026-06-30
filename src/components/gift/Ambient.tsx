"use client";

import { useMemo } from "react";

// Floating hearts + falling petals. Counts are capped to stay light, and the
// whole thing is hidden under prefers-reduced-motion (see globals.css).
export function Ambient({ hearts = 10, petals = 8 }: { hearts?: number; petals?: number }) {
  const heartItems = useMemo(
    () =>
      Array.from({ length: hearts }).map((_, i) => ({
        left: Math.random() * 100,
        size: 10 + Math.random() * 18,
        dur: 9 + Math.random() * 8,
        delay: Math.random() * 10,
        op: 0.25 + Math.random() * 0.4,
      })),
    [hearts]
  );
  const petalItems = useMemo(
    () =>
      Array.from({ length: petals }).map((_, i) => ({
        left: Math.random() * 100,
        size: 8 + Math.random() * 10,
        dur: 11 + Math.random() * 9,
        delay: Math.random() * 12,
      })),
    [petals]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {heartItems.map((h, i) => (
        <span
          key={`h${i}`}
          className="lg-float absolute bottom-0 text-primary"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            opacity: h.op,
          }}
        >
          ♥
        </span>
      ))}
      {petalItems.map((p, i) => (
        <span
          key={`p${i}`}
          className="lg-petal absolute top-0 rounded-full bg-accent/40"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
