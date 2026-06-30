import type { MusicType } from "./types";

// Extracts a track/video id from a pasted Spotify or YouTube URL.
// Accepts a raw id too (returns it as-is).
export function extractMusicId(type: MusicType, raw: string): string {
  const v = (raw || "").trim();
  if (!v) return "";

  if (type === "spotify") {
    // https://open.spotify.com/track/<id> | spotify:track:<id> | /embed/track/<id>
    const m = v.match(/track[/:]([a-zA-Z0-9]+)/);
    if (m) return m[1];
    return v.replace(/[^a-zA-Z0-9]/g, "");
  }

  // youtube: watch?v=<id> | youtu.be/<id> | /embed/<id> | shorts/<id>
  const m =
    v.match(/[?&]v=([a-zA-Z0-9_-]{11})/) ||
    v.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ||
    v.match(/embed\/([a-zA-Z0-9_-]{11})/) ||
    v.match(/shorts\/([a-zA-Z0-9_-]{11})/);
  if (m) return m[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
  return v;
}

export function spotifyEmbedUrl(id: string): string {
  return `https://open.spotify.com/embed/track/${id}?utm_source=lovegift`;
}
