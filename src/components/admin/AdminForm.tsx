"use client";

import { useState } from "react";
import { THEME_LIST, THEMES } from "@/lib/theme";
import { extractMusicId } from "@/lib/music";
import { encodeGift } from "@/lib/encode";
import { ShareCard } from "@/components/ShareCard";
import type { GiftInput, Gender, MusicType, ThemeName } from "@/lib/types";

const field =
  "w-full rounded-xl border border-ink/15 bg-surface px-4 py-3 outline-none transition focus:border-primary";
const label = "block text-sm font-medium text-ink mb-1.5";

export function AdminForm({
  supabaseEnabled,
  baseUrl,
}: {
  supabaseEnabled: boolean;
  baseUrl: string;
}) {
  const [gender, setGender] = useState<Gender>("cewe");
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");
  const [openingMsg, setOpeningMsg] = useState("");
  const [theme, setTheme] = useState<ThemeName>("rose");
  const [musicType, setMusicType] = useState<MusicType>("spotify");
  const [musicLink, setMusicLink] = useState("");
  const [quotesText, setQuotesText] = useState("");

  const [photoUrls, setPhotoUrls] = useState<string[]>([]); // uploaded (Supabase)
  const [photoLinks, setPhotoLinks] = useState(""); // URL-mode (pasted links)
  const [uploading, setUploading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const onUpload = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("files", f));
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload gagal");
      setPhotoUrls((prev) => [...prev, ...data.urls].slice(0, 12));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload gagal");
    } finally {
      setUploading(false);
    }
  };

  const buildInput = (): GiftInput => ({
    gender,
    recipient: recipient.trim(),
    sender: sender.trim(),
    opening_msg: openingMsg.trim(),
    quotes: quotesText.split("\n").map((s) => s.trim()).filter(Boolean),
    photos: supabaseEnabled
      ? photoUrls
      : photoLinks.split("\n").map((s) => s.trim()).filter(Boolean),
    music_type: musicType,
    music_id: extractMusicId(musicType, musicLink),
    theme,
  });

  const submit = async () => {
    setError("");
    if (!recipient.trim() || !sender.trim()) {
      setError("Nama penerima & pengirim wajib diisi.");
      return;
    }
    setSubmitting(true);
    try {
      const input = buildInput();
      if (supabaseEnabled) {
        const res = await fetch("/api/gift", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Gagal membuat kado");
        setResultUrl(data.url);
      } else {
        const origin = baseUrl || window.location.origin;
        setResultUrl(`${origin}/g/u?d=${encodeGift(input)}`);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Gagal membuat kado");
    } finally {
      setSubmitting(false);
    }
  };

  if (resultUrl) {
    return (
      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center gap-8 px-6 py-16 text-center">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Kado siap! 🎉</h1>
          <p className="mt-2 text-ink/70">
            Bagikan link atau QR ini ke {recipient || "dia"}.
          </p>
        </div>
        <ShareCard url={resultUrl} theme={theme} recipient={recipient} />
        <div className="flex gap-3">
          <a
            href={resultUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary"
          >
            Pratinjau kado
          </a>
          <button
            onClick={() => setResultUrl(null)}
            className="rounded-full border border-ink/20 px-5 py-2.5 text-sm font-medium text-ink"
          >
            Buat lagi
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-4xl font-semibold text-ink">Buat Kado 💝</h1>
      <p className="mt-2 text-ink/65">
        Isi yang perlu saja. Yang kosong pakai default manis.
      </p>
      {!supabaseEnabled && (
        <p className="mt-4 rounded-xl bg-accent/15 px-4 py-3 text-sm text-ink/80">
          Mode URL aktif (tanpa database). Foto pakai <b>link gambar</b>, dan semua
          data tersimpan di dalam link kado.
        </p>
      )}

      <div className="mt-8 space-y-6">
        {/* target */}
        <div>
          <span className={label}>Kado untuk</span>
          <div className="flex gap-2">
            {(["cewe", "cowo"] as Gender[]).map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium capitalize transition ${
                  gender === g
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-ink/15 text-ink/70"
                }`}
              >
                {g === "cewe" ? "Pacar cewek" : "Pacar cowok"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="recipient">Nama penerima</label>
            <input id="recipient" className={field} value={recipient}
              onChange={(e) => setRecipient(e.target.value)} placeholder="mis. Sayang" />
          </div>
          <div>
            <label className={label} htmlFor="sender">Nama pengirim</label>
            <input id="sender" className={field} value={sender}
              onChange={(e) => setSender(e.target.value)} placeholder="mis. Kamu" />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="opening">Pesan pembuka</label>
          <textarea id="opening" className={field} rows={3} value={openingMsg}
            onChange={(e) => setOpeningMsg(e.target.value)}
            placeholder="Beberapa kalimat hangat saat kado terbuka..." />
        </div>

        {/* theme */}
        <div>
          <span className={label}>Tema warna</span>
          <div className="flex gap-3">
            {THEME_LIST.map((t) => {
              const p = THEMES[t];
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 rounded-xl border p-3 text-center transition ${
                    theme === t ? "border-primary ring-2 ring-primary/40" : "border-ink/15"
                  }`}
                >
                  <div className="mx-auto mb-2 flex h-8 w-full gap-1 overflow-hidden rounded-md">
                    <span className="flex-1" style={{ background: p.bg }} />
                    <span className="flex-1" style={{ background: p.primary }} />
                    <span className="flex-1" style={{ background: p.accent }} />
                  </div>
                  <span className="text-xs font-medium capitalize text-ink/80">{t}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* music */}
        <div>
          <span className={label}>Musik</span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              className={`${field} sm:w-40`}
              value={musicType}
              onChange={(e) => setMusicType(e.target.value as MusicType)}
            >
              <option value="spotify">Spotify</option>
              <option value="youtube">YouTube</option>
            </select>
            <input
              className={field}
              value={musicLink}
              onChange={(e) => setMusicLink(e.target.value)}
              placeholder={
                musicType === "spotify"
                  ? "Tempel link Spotify track..."
                  : "Tempel link YouTube..."
              }
            />
          </div>
          {musicLink && (
            <p className="mt-1 text-xs text-ink/50">
              ID terbaca: {extractMusicId(musicType, musicLink) || "—"}
            </p>
          )}
        </div>

        {/* photos */}
        <div>
          <span className={label}>Foto</span>
          {supabaseEnabled ? (
            <>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onUpload(e.target.files)}
                className="block w-full text-sm text-ink/70 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
              />
              {uploading && <p className="mt-2 text-sm text-ink/50">Mengunggah...</p>}
              {photoUrls.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {photoUrls.map((u, i) => (
                    <div key={i} className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={u} alt="" className="aspect-square w-full rounded-lg object-cover" />
                      <button
                        onClick={() => setPhotoUrls((p) => p.filter((_, j) => j !== i))}
                        className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-full bg-ink text-xs text-white"
                        aria-label="Hapus foto"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <textarea
              className={field}
              rows={3}
              value={photoLinks}
              onChange={(e) => setPhotoLinks(e.target.value)}
              placeholder={"Satu link gambar per baris\nhttps://...jpg"}
            />
          )}
        </div>

        {/* quotes */}
        <div>
          <label className={label} htmlFor="quotes">Quotes tambahan (opsional)</label>
          <textarea id="quotes" className={field} rows={4} value={quotesText}
            onChange={(e) => setQuotesText(e.target.value)}
            placeholder={"Satu quote per baris.\nDikosongkan pun sudah ada bank quotes bawaan."} />
        </div>

        {error && (
          <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">{error}</p>
        )}

        <button
          onClick={submit}
          disabled={submitting}
          className="w-full rounded-full bg-primary py-4 text-lg font-semibold text-white shadow-lg shadow-primary/30 transition hover:opacity-95 disabled:opacity-60"
        >
          {submitting ? "Membuat..." : "Buat Kado & Dapatkan Link"}
        </button>
      </div>
    </main>
  );
}
