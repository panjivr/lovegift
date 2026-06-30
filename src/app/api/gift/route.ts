import { NextRequest, NextResponse } from "next/server";
import { createGift, getGiftBySlug } from "@/lib/gifts";
import { supabaseEnabled } from "@/lib/supabase";
import type { GiftInput } from "@/lib/types";

function baseUrl(req: NextRequest): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || req.nextUrl.origin
  );
}

export async function POST(req: NextRequest) {
  if (!supabaseEnabled) {
    return NextResponse.json(
      { error: "DB_DISABLED", message: "Supabase belum dikonfigurasi. Gunakan mode URL." },
      { status: 503 }
    );
  }

  let body: Partial<GiftInput>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "BAD_JSON" }, { status: 400 });
  }

  if (!body.recipient || !body.sender) {
    return NextResponse.json(
      { error: "MISSING_FIELDS", message: "Nama penerima & pengirim wajib diisi." },
      { status: 400 }
    );
  }

  const input: GiftInput = {
    gender: body.gender === "cowo" ? "cowo" : "cewe",
    recipient: String(body.recipient).slice(0, 80),
    sender: String(body.sender).slice(0, 80),
    opening_msg: String(body.opening_msg || "").slice(0, 500),
    quotes: Array.isArray(body.quotes) ? body.quotes.slice(0, 20).map(String) : [],
    photos: Array.isArray(body.photos) ? body.photos.slice(0, 12).map(String) : [],
    music_type: body.music_type === "youtube" ? "youtube" : "spotify",
    music_id: String(body.music_id || ""),
    theme: ["rose", "midnight", "sunset"].includes(body.theme as string)
      ? (body.theme as GiftInput["theme"])
      : "rose",
  };

  try {
    const gift = await createGift(input);
    return NextResponse.json({
      slug: gift.slug,
      url: `${baseUrl(req)}/g/${gift.slug}`,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "UNKNOWN";
    return NextResponse.json({ error: "CREATE_FAILED", message: msg }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "NO_SLUG" }, { status: 400 });
  const gift = await getGiftBySlug(slug);
  if (!gift) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json(gift);
}
