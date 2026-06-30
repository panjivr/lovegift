import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { getServiceSupabase, PHOTO_BUCKET } from "@/lib/supabase";

const nano = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 6);

// Uploads photos to Supabase Storage (public bucket) and returns their URLs.
export async function POST(req: NextRequest) {
  const db = getServiceSupabase();
  if (!db) {
    return NextResponse.json(
      { error: "DB_DISABLED", message: "Storage tidak aktif. Pakai mode URL (paste link foto)." },
      { status: 503 }
    );
  }

  const form = await req.formData();
  const files = form.getAll("files").filter((f): f is File => f instanceof File);
  if (!files.length) return NextResponse.json({ error: "NO_FILES" }, { status: 400 });

  const folder = nano();
  const urls: string[] = [];

  for (let i = 0; i < files.length && i < 12; i++) {
    const f = files[i];
    const ext = (f.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${folder}/${Date.now()}-${i}.${ext}`;
    const buf = Buffer.from(await f.arrayBuffer());
    const { error } = await db.storage
      .from(PHOTO_BUCKET)
      .upload(path, buf, { contentType: f.type || "image/jpeg", upsert: false });
    if (error) {
      return NextResponse.json({ error: "UPLOAD_FAILED", message: error.message }, { status: 500 });
    }
    urls.push(db.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl);
  }

  return NextResponse.json({ urls });
}
