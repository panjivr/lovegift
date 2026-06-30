"use client";

import { motion } from "framer-motion";

// Antique gramophone: the vinyl spins forever (CSS .lg-record), the tonearm
// rests on it. Visual stand-in for the hidden music player.
export function Gramophone({
  muted,
  onToggleMute,
  playing,
}: {
  muted: boolean;
  onToggleMute: () => void;
  playing: boolean;
}) {
  return (
    <section className="relative flex min-h-[90svh] flex-col items-center justify-center gap-8 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <svg width="260" height="280" viewBox="0 0 260 280" aria-label="Gramofon kuno">
          {/* base */}
          <rect x="40" y="196" width="180" height="58" rx="12" fill="var(--c-ink)" />
          <rect x="40" y="196" width="180" height="58" rx="12" fill="#000" opacity="0.12" />

          {/* turntable platter */}
          <ellipse cx="130" cy="196" rx="92" ry="22" fill="var(--c-surface)" opacity="0.15" />

          {/* spinning record */}
          <g style={{ transformBox: "fill-box", transformOrigin: "center" }}>
            <g className={playing ? "lg-record" : ""} style={{ transformOrigin: "118px 150px" }}>
              <circle cx="118" cy="150" r="74" fill="#15101c" />
              <circle cx="118" cy="150" r="74" fill="none" stroke="var(--c-accent)" strokeOpacity="0.25" strokeWidth="1" />
              <circle cx="118" cy="150" r="56" fill="none" stroke="var(--c-accent)" strokeOpacity="0.2" strokeWidth="1" />
              <circle cx="118" cy="150" r="38" fill="none" stroke="var(--c-accent)" strokeOpacity="0.2" strokeWidth="1" />
              <circle cx="118" cy="150" r="22" fill="var(--c-primary)" />
              <circle cx="118" cy="150" r="4" fill="var(--c-surface)" />
            </g>
          </g>

          {/* horn */}
          <path
            d="M150 70 C212 40 250 70 232 110 C220 134 188 130 176 120 L160 132 Z"
            fill="var(--c-accent)"
          />
          <path d="M150 70 L176 120 L160 132 Z" fill="var(--c-primary)" />

          {/* tonearm */}
          <motion.g
            style={{ transformOrigin: "196px 96px" }}
            animate={{ rotate: playing ? [0, -3, 0] : 0 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="196" y1="96" x2="132" y2="150" stroke="var(--c-ink)" strokeWidth="6" strokeLinecap="round" />
            <circle cx="196" cy="96" r="9" fill="var(--c-ink)" />
            <circle cx="132" cy="150" r="5" fill="var(--c-primary)" />
          </motion.g>
        </svg>
      </motion.div>

      <div className="space-y-3">
        <p className="font-hand text-3xl text-primary">
          {playing ? "♪ untukmu, lagu ini ♪" : "tekan untuk memutar lagu"}
        </p>
        <button
          onClick={onToggleMute}
          aria-pressed={!muted}
          className="rounded-full border border-ink/20 bg-surface px-5 py-2 text-sm font-medium text-ink shadow-sm transition hover:bg-ink/5"
        >
          {muted ? "🔇 Bunyikan musik" : "🔊 Senyapkan"}
        </button>
      </div>
    </section>
  );
}
