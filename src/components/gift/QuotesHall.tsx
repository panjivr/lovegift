"use client";

import { motion } from "framer-motion";

// Lorong quotes: each line fades + slides in on scroll. `quotes` is the merged
// list (custom from admin + bank defaults).
export function QuotesHall({ quotes }: { quotes: string[] }) {
  if (!quotes.length) return null;

  return (
    <section className="relative mx-auto max-w-2xl px-6 py-24">
      <h2 className="mb-16 text-center font-display text-3xl font-semibold text-ink">
        Hal-hal yang ingin kukatakan
      </h2>
      <div className="flex flex-col gap-20">
        {quotes.map((q, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7 }}
            className={`max-w-md font-hand text-3xl leading-snug text-ink sm:text-4xl ${
              i % 3 === 0 ? "self-start text-left" : i % 3 === 1 ? "self-end text-right" : "self-center text-center"
            }`}
          >
            <span className="text-primary">“</span>
            {q}
            <span className="text-primary">”</span>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
