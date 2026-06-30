import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE;

// Supabase is optional: when env is missing the app runs in URL-only mode.
export const supabaseEnabled = Boolean(url && anon);

// Anonymous client (public read of gifts). Safe to import on server.
export function getSupabase(): SupabaseClient | null {
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}

// Service-role client for server-side writes/uploads. Never import client-side.
export function getServiceSupabase(): SupabaseClient | null {
  if (!url || !service) return null;
  return createClient(url, service, { auth: { persistSession: false } });
}

export const PHOTO_BUCKET = "gift-photos";
