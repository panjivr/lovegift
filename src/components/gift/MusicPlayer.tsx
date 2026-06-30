"use client";

import { useEffect, useRef } from "react";
import type { MusicType } from "@/lib/types";

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: any) => void;
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.src = src;
  s.async = true;
  document.body.appendChild(s);
}

/**
 * Hidden audio source. The gramophone is the visible "player"; this just drives
 * sound. Autoplay only works after a user gesture, so `started` is flipped true
 * once the recipient taps "Buka Hadiahmu". `muted` toggles via the controllers
 * (YouTube mute/unmute, Spotify pause/resume — Spotify embeds expose no volume).
 */
export function MusicPlayer({
  type,
  id,
  started,
  muted,
}: {
  type: MusicType;
  id: string;
  started: boolean;
  muted: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const ctrlRef = useRef<any>(null); // spotify EmbedController
  const ytRef = useRef<any>(null); // YT.Player
  const readyRef = useRef(false);

  // Init the right SDK once we have an id.
  useEffect(() => {
    if (!id || !hostRef.current) return;

    if (type === "spotify") {
      window.onSpotifyIframeApiReady = (api) => {
        if (!hostRef.current) return;
        api.createController(
          hostRef.current,
          { uri: `spotify:track:${id}`, width: "300", height: "80" },
          (controller: any) => {
            ctrlRef.current = controller;
            readyRef.current = true;
            if (started) controller.play();
          }
        );
      };
      loadScript("https://open.spotify.com/embed/iframe-api/v1");
    } else {
      const init = () => {
        const el = document.createElement("div");
        hostRef.current?.appendChild(el);
        ytRef.current = new window.YT.Player(el, {
          height: "80",
          width: "120",
          videoId: id,
          playerVars: {
            autoplay: started ? 1 : 0,
            controls: 0,
            loop: 1,
            playlist: id, // required for loop
            modestbranding: 1,
            playsinline: 1,
          },
          events: {
            onReady: (e: any) => {
              readyRef.current = true;
              if (started) {
                muted ? e.target.mute() : e.target.unMute();
                e.target.playVideo();
              }
            },
          },
        });
      };
      if (window.YT && window.YT.Player) init();
      else {
        window.onYouTubeIframeAPIReady = init;
        loadScript("https://www.youtube.com/iframe_api");
      }
    }

    return () => {
      try {
        ctrlRef.current?.destroy?.();
        ytRef.current?.destroy?.();
      } catch {
        /* noop */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, id]);

  // React to play start.
  useEffect(() => {
    if (!started || !readyRef.current) return;
    if (type === "spotify") {
      muted ? ctrlRef.current?.pause?.() : ctrlRef.current?.play?.();
    } else if (ytRef.current) {
      muted ? ytRef.current.mute?.() : ytRef.current.unMute?.();
      ytRef.current.playVideo?.();
    }
  }, [started, type]);

  // React to mute toggle.
  useEffect(() => {
    if (!started || !readyRef.current) return;
    if (type === "spotify") {
      muted ? ctrlRef.current?.pause?.() : ctrlRef.current?.resume?.();
    } else if (ytRef.current) {
      muted ? ytRef.current.mute?.() : ytRef.current.unMute?.();
    }
  }, [muted, started, type]);

  // Kept in DOM but visually hidden.
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        overflow: "hidden",
        opacity: 0,
        pointerEvents: "none",
        left: -9999,
        bottom: 0,
      }}
    >
      <div ref={hostRef} />
    </div>
  );
}
