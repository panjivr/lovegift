import type { GiftInput } from "./types";

// URL-mode: pack the whole gift into a base64url blob so it lives in the link
// itself — no database required. Used by /g/u?d=<blob>.
// Compact keys keep the URL short.

interface PackedGift {
  g: string; // gender
  r: string; // recipient
  s: string; // sender
  o: string; // opening_msg
  q: string[]; // quotes
  p: string[]; // photo urls (external in URL-mode)
  mt: string; // music_type
  mi: string; // music_id
  t: string; // theme
}

function b64urlEncode(str: string): string {
  const b64 =
    typeof window === "undefined"
      ? Buffer.from(str, "utf-8").toString("base64")
      : btoa(unescape(encodeURIComponent(str)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): string {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  if (typeof window === "undefined") {
    return Buffer.from(b64, "base64").toString("utf-8");
  }
  return decodeURIComponent(escape(atob(b64)));
}

export function encodeGift(g: GiftInput): string {
  const packed: PackedGift = {
    g: g.gender,
    r: g.recipient,
    s: g.sender,
    o: g.opening_msg,
    q: g.quotes,
    p: g.photos,
    mt: g.music_type,
    mi: g.music_id,
    t: g.theme,
  };
  return b64urlEncode(JSON.stringify(packed));
}

export function decodeGift(blob: string): GiftInput | null {
  try {
    const p = JSON.parse(b64urlDecode(blob)) as PackedGift;
    return {
      gender: (p.g as GiftInput["gender"]) || "cewe",
      recipient: p.r || "",
      sender: p.s || "",
      opening_msg: p.o || "",
      quotes: Array.isArray(p.q) ? p.q : [],
      photos: Array.isArray(p.p) ? p.p : [],
      music_type: (p.mt as GiftInput["music_type"]) || "spotify",
      music_id: p.mi || "",
      theme: (p.t as GiftInput["theme"]) || "rose",
    };
  } catch {
    return null;
  }
}
