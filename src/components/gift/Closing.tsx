"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ShareCard } from "../ShareCard";
import type { ThemeName } from "@/lib/types";

function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(text.length);
      return;
    }
    const id = setInterval(() => {
      setN((c) => {
        if (c >= text.length) {
          clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 45);
    return () => clearInterval(id);
  }, [inView, text]);

  return (
    <p ref={ref} className="min-h-[5rem] font-display text-2xl leading-relaxed text-ink sm:text-3xl">
      {text.slice(0, n)}
      <span className="animate-pulse text-primary">|</span>
    </p>
  );
}

export function Closing({
  sender,
  recipient,
  shareUrl,
  theme,
}: {
  sender: string;
  recipient: string;
  shareUrl: string;
  theme: ThemeName;
}) {
  return (
    <section className="relative mx-auto flex max-w-xl flex-col items-center gap-12 px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <Typewriter
          text={`Terima kasih sudah jadi alasan paling indah dalam hidupku. Apa pun yang terjadi, aku memilihmu — hari ini, besok, dan seterusnya.`}
        />
        <p className="font-hand text-3xl text-primary">— {sender}</p>
      </motion.div>

      <div className="h-px w-24 bg-accent/50" />

      <div className="w-full">
        <p className="mb-6 text-sm text-ink/60">Bagikan kado ini kembali</p>
        <ShareCard url={shareUrl} theme={theme} recipient={recipient} />
      </div>

      <p className="pt-8 text-xs text-ink/40">dibuat dengan ♥ di LoveGift</p>
    </section>
  );
}
