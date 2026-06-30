# 💝 LoveGift — Web Generator Kado Digital

Bikin kado digital gratis untuk orang tersayang: isi lewat admin panel → keluar
**link share + QR berbentuk hati**. Penerima buka link → pengalaman immersive:
kado bergulir, gramofon berputar, galeri foto, lorong quotes cinta, musik auto-play.

Dibangun dengan **Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion**,
data di **Supabase** (opsional — ada mode tanpa DB).

## Jalankan lokal

```bash
npm install
cp .env.example .env.local   # isi seperlunya (boleh dikosongkan → mode URL)
npm run dev                  # http://localhost:3000
```

- `/` — landing + tombol "Buat Kado"
- `/admin` — form generator (digembok `ADMIN_KEY` lewat `?key=`)
- `/g/<slug>` — halaman kado (mode database)
- `/g/u?d=<blob>` — halaman kado (mode URL, tanpa database)

## Dua mode

**Mode Supabase (default).** Foto di-upload, kado disimpan di DB, link pendek `/g/<slug>`.

**Mode URL (otomatis aktif kalau env Supabase kosong).** Tanpa database: semua data
dikemas ke dalam link `/g/u?d=...`. Foto pakai **link gambar eksternal** (paste URL).

## Setup Supabase (mode default)

1. Buat project di [supabase.com](https://supabase.com).
2. Buka **SQL Editor**, paste & run isi [`supabase/schema.sql`](supabase/schema.sql)
   (membuat tabel `gifts`, policy read publik, dan bucket `gift-photos`).
3. Isi env (Project Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE=eyJ...          # untuk upload foto (server-side)
ADMIN_KEY=kunci-rahasia-kamu
NEXT_PUBLIC_BASE_URL=https://domainmu.vercel.app
```

> Tanpa Supabase pun aplikasi tetap jalan dalam **mode URL**. Cukup set `ADMIN_KEY`
> dan `NEXT_PUBLIC_BASE_URL`.

## Deploy ke Vercel

```bash
npm i -g vercel
vercel            # ikuti prompt
vercel --prod     # deploy production
```

Set semua env di **Vercel → Project → Settings → Environment Variables**, lalu redeploy.

## Catatan teknis

- **Musik**: Spotify embed / YouTube IFrame API. Autoplay dimulai setelah penerima
  menekan "Buka Hadiahmu" (butuh user gesture). Ada toggle mute.
- **QR hati**: QR tetap kotak (agar scannable) di dalam kartu berbentuk hati,
  diwarnai sesuai tema, bisa diunduh PNG.
- **Aksesibilitas**: `prefers-reduced-motion` dihormati (confetti & partikel mati,
  gramofon berputar pelan), fokus keyboard terlihat, responsive mobile.
- **Tema**: `rose` · `midnight` · `sunset` (lihat `src/lib/theme.ts`).
