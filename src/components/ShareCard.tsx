"use client";

import { useState } from "react";
import { HeartQR } from "./HeartQR";
import type { ThemeName } from "@/lib/types";

export function ShareCard({
  url,
  theme,
  recipient,
}: {
  url: string;
  theme: ThemeName;
  recipient: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sebuah kado untukmu 💝",
          text: `${recipient}, ada kado spesial menunggumu`,
          url,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      copy();
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <HeartQR url={url} theme={theme} />
      <div className="flex w-full max-w-sm flex-col gap-2">
        <code className="block w-full truncate rounded-xl bg-ink/5 px-4 py-3 text-center text-sm text-ink">
          {url}
        </code>
        <div className="flex gap-2">
          <button
            onClick={copy}
            className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {copied ? "Tersalin ✓" : "Salin Link"}
          </button>
          <button
            onClick={share}
            className="flex-1 rounded-full border border-primary px-4 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Bagikan
          </button>
        </div>
      </div>
    </div>
  );
}
