# Deploy LoveGift to Vercel

Next.js 15 app with API routes (`/api/gift`, `/api/upload`) + Supabase. Needs a serverless host — Vercel.

## 1. Supabase (database + photo storage)

1. Create a project at https://supabase.com/dashboard (free tier is fine).
2. **SQL Editor → New query** → paste all of `supabase-schema.sql` → **Run**.
3. **Project Settings → API**, copy:
   - `Project URL`            → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key        → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key       → `SUPABASE_SERVICE_ROLE`  (secret — server only)

> Skip this to launch in **URL-only mode** (no DB): the gift builder still works,
> but links aren't saved server-side and photo upload is disabled (paste image URLs instead).

## 2. Push code to GitHub (required for Vercel's browser import)

In the project folder:

    git init
    git add .
    git commit -m "LoveGift"
    git branch -M main
    git remote add origin https://github.com/<you>/lovegift.git
    git push -u origin main

(`node_modules`, `.next`, `.env*` are already git-ignored.)

## 3. Import to Vercel

1. https://vercel.com/new → **Import** the `lovegift` repo.
2. Framework auto-detects **Next.js**. Leave build settings default.
3. **Environment Variables** — add:

   | Key                             | Value                                  |
   |---------------------------------|----------------------------------------|
   | `NEXT_PUBLIC_SUPABASE_URL`      | from step 1                            |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from step 1                            |
   | `SUPABASE_SERVICE_ROLE`         | from step 1                            |
   | `ADMIN_KEY`                     | a private password for `/admin`        |
   | `NEXT_PUBLIC_BASE_URL`          | `https://<your-project>.vercel.app`    |

4. **Deploy.**

## 4. After first deploy

- You won't know the final domain until after deploy. Once live, set
  `NEXT_PUBLIC_BASE_URL` to the real URL (Settings → Environment Variables) and
  **Redeploy** so generated share links use it.
- Visit `/admin` and enter `ADMIN_KEY` to create gifts.

## Notes

- `next.config.mjs` already allows images from any HTTPS host.
- Reads use the anon key (RLS allows public SELECT); writes/uploads use the
  service-role key (bypasses RLS). No extra policies needed.
