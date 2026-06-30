"use client";

import { motion } from "framer-motion";

// Scroll-triggered reveal, polaroid frames with a gentle alternating tilt.
// Plain <img loading="lazy"> so external URL-mode photos work without config.
export function PhotoGallery({ photos }: { photos: string[] }) {
  if (!photos.length) return null;

  return (
    <section className="relative mx-auto max-w-2xl px-6 py-20">
      <h2 className="mb-12 text-center font-display text-3xl font-semibold text-ink">
        Momen-momen kita
      </h2>
      <div className="flex flex-col gap-16">
        {photos.map((src, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 48, rotate: i % 2 ? 3 : -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`mx-auto w-full max-w-sm rounded-sm bg-surface p-3 pb-10 shadow-xl ${
              i % 2 ? "self-end" : "self-start"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Kenangan ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
            <figcaption className="mt-3 text-center font-hand text-xl text-primary">
              ♥
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
