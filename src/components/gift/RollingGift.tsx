"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Confetti } from "./Confetti";

export function RollingGift({
  recipient,
  openingMsg,
  onOpen,
}: {
  recipient: string;
  openingMsg: string;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();
  const [arrived, setArrived] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (reduce) setArrived(true);
  }, [reduce]);

  const open = () => {
    setOpened(true);
    onOpen();
  };

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Confetti fire={opened} />

      <motion.div
        initial={reduce ? { x: 0, rotate: 0 } : { x: "-120vw", rotate: -720 }}
        animate={{ x: 0, rotate: 0 }}
        transition={{ duration: reduce ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => setArrived(true)}
        className="relative"
      >
        <GiftBox opened={opened} />
      </motion.div>

      {/* Revealed message */}
      <motion.div
        initial={false}
        animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 16 }}
        transition={{ duration: 0.6, delay: opened ? 0.25 : 0 }}
        className="mt-8 max-w-xl"
        aria-hidden={!opened}
      >
        <p className="font-hand text-2xl text-primary">Untuk yang tersayang,</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-6xl">
          {recipient}
        </h1>
        {openingMsg && (
          <p className="mt-4 text-base leading-relaxed text-ink/80 sm:text-lg">
            {openingMsg}
          </p>
        )}
      </motion.div>

      {/* CTA — also the music gesture */}
      {arrived && !opened && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={open}
          className="mt-10 rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-primary/30 transition hover:scale-[1.03] active:scale-95"
        >
          Buka Hadiahmu 💝
        </motion.button>
      )}

      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-ink/50"
        >
          gulir ke bawah ↓
        </motion.div>
      )}
    </section>
  );
}

function GiftBox({ opened }: { opened: boolean }) {
  return (
    <svg width="200" height="210" viewBox="0 0 200 210" className="drop-shadow-2xl">
      {/* lid lifts + tilts on open */}
      <motion.g
        animate={{ y: opened ? -54 : 0, rotate: opened ? -12 : 0 }}
        transition={{ duration: 0.7, ease: "backOut" }}
        style={{ transformOrigin: "100px 70px" }}
      >
        <rect x="34" y="52" width="132" height="34" rx="6" fill="var(--c-primary)" />
        <rect x="92" y="52" width="16" height="34" fill="var(--c-accent)" />
        {/* bow */}
        <circle cx="100" cy="46" r="10" fill="var(--c-accent)" />
        <path d="M100 50 C70 30 62 60 100 56 C138 60 130 30 100 50 Z" fill="var(--c-accent)" />
      </motion.g>

      {/* box body */}
      <rect x="42" y="86" width="116" height="104" rx="8" fill="var(--c-primary)" />
      <rect x="92" y="86" width="16" height="104" fill="var(--c-accent)" />
      <rect x="42" y="86" width="116" height="104" rx="8" fill="#000" opacity="0.06" />
    </svg>
  );
}
