import "server-only";
import { customAlphabet } from "nanoid";
import { getSupabase, getServiceSupabase } from "./supabase";
import type { Gift, GiftInput } from "./types";

const nano = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 8);

export async function createGift(input: GiftInput): Promise<Gift> {
  const db = getServiceSupabase() ?? getSupabase();
  if (!db) throw new Error("DB_DISABLED");

  const row: Gift = { slug: nano(), ...input };
  const { error } = await db.from("gifts").insert(row);
  if (error) throw new Error(error.message);
  return row;
}

export async function getGiftBySlug(slug: string): Promise<Gift | null> {
  const db = getSupabase();
  if (!db) return null;
  const { data, error } = await db
    .from("gifts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as Gift;
}
