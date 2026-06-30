"use client";

import { useMemo, useState } from "react";
import type { GiftInput } from "@/lib/types";
import { themeVars } from "@/lib/theme";
import { bankQuotes } from "@/lib/quotes";
import { Ambient } from "./Ambient";
import { RollingGift } from "./RollingGift";
import { Gramophone } from "./Gramophone";
import { PhotoGallery } from "./PhotoGallery";
import { QuotesHall } from "./QuotesHall";
import { Closing } from "./Closing";
import { MusicPlayer } from "./MusicPlayer";

export function GiftExperience({
  gift,
  shareUrl,
}: {
  gift: GiftInput;
  shareUrl: string;
}) {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  // custom quotes first, then bank — deduped, capped for pacing.
  const quotes = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const q of [...gift.quotes, ...bankQuotes(gift.gender)]) {
      const t = q.trim();
      if (t && !seen.has(t)) {
        seen.add(t);
        out.push(t);
      }
      if (out.length >= 14) break;
    }
    return out;
  }, [gift.quotes, gift.gender]);

  const hasMusic = Boolean(gift.music_id);

  return (
    <main
      style={themeVars(gift.theme)}
      className="relative min-h-screen bg-bg font-body text-ink"
    >
      <Ambient />

      <div className="relative z-10">
        <RollingGift
          recipient={gift.recipient}
          openingMsg={gift.opening_msg}
          onOpen={() => setStarted(true)}
        />

        {hasMusic && (
          <Gramophone
            muted={muted}
            playing={started && !muted}
            onToggleMute={() => setMuted((m) => !m)}
          />
        )}

        <PhotoGallery photos={gift.photos} />

        <QuotesHall quotes={quotes} />

        <Closing
          sender={gift.sender}
          recipient={gift.recipient}
          shareUrl={shareUrl}
          theme={gift.theme}
        />
      </div>

      {hasMusic && (
        <MusicPlayer
          type={gift.music_type}
          id={gift.music_id}
          started={started}
          muted={muted}
        />
      )}
    </main>
  );
}
