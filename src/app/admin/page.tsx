import { AdminForm } from "@/components/admin/AdminForm";
import { supabaseEnabled } from "@/lib/supabase";

// Simple gate: ?key= must match ADMIN_KEY (if set). Good enough per spec.
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;
  const required = process.env.ADMIN_KEY;
  const ok = !required || key === required;

  if (!ok) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-6">
        <form
          method="get"
          className="w-full max-w-sm space-y-4 rounded-3xl border border-ink/10 bg-surface p-8 shadow-xl"
        >
          <h1 className="font-display text-2xl font-semibold text-ink">Masuk Admin</h1>
          <p className="text-sm text-ink/60">Masukkan kunci akses untuk membuat kado.</p>
          <input
            name="key"
            type="password"
            placeholder="ADMIN_KEY"
            autoFocus
            className="w-full rounded-xl border border-ink/15 bg-bg px-4 py-3 outline-none focus:border-primary"
          />
          <button className="w-full rounded-full bg-primary py-3 font-semibold text-white">
            Masuk
          </button>
        </form>
      </main>
    );
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ?? "";
  return <AdminForm supabaseEnabled={supabaseEnabled} baseUrl={base} />;
}
