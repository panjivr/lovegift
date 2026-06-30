"use client";

import { useEffect, useState } from "react";

// One-shot heart confetti burst. Skipped entirely under reduced motion.
export function Confetti({ fire }: { fire: boolean }) {
  const [pieces, setPieces] = useState<
    { x: number; delay: number; dur: number; rot: number; color: string }[]
  >([]);

  useEffect(() => {
    if (!fire) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const colors = ["var(--c-primary)", "var(--c-accent)", "#ffffff"];
    setPieces(
      Array.from({ length: 40 }).map(() => ({
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        dur: 1.6 + Math.random() * 1.4,
        rot: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
      }))
    );
  }, [fire]);

  if (!pieces.length) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="lg-petal absolute top-0"
          style={{
            left: `${p.x}%`,
            color: p.color,
            fontSize: "16px",
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rot}deg)`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
