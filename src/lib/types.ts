export type Gender = "cewe" | "cowo";
export type ThemeName = "rose" | "midnight" | "sunset";
export type MusicType = "spotify" | "youtube";

export interface Gift {
  slug: string;
  gender: Gender;
  recipient: string;
  sender: string;
  opening_msg: string;
  quotes: string[];
  photos: string[];
  music_type: MusicType;
  music_id: string;
  theme: ThemeName;
  created_at?: string;
}

// Shape used by the admin form / API payload (no slug/created_at yet).
export type GiftInput = Omit<Gift, "slug" | "created_at">;
