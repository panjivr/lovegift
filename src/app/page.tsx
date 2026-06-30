import Link from "next/link";

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-bg font-body text-ink">
      {/* soft glow blobs */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 py-20 text-center">
        <span className="rounded-full border border-accent/40 px-4 py-1 text-sm text-ink/70">
          gratis · tanpa ribet
        </span>

        <h1 className="font-display text-5xl font-semibold leading-[1.05] text-ink sm:text-7xl">
          Kado digital untuk
          <br />
          <span className="text-primary">orang tersayang</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-ink/75">
          Rangkai pesan, foto, quotes cinta, dan musik kesukaannya jadi satu link
          penuh kejutan. Dia buka — kado bergulir, gramofon berputar, kenangan
          mengalir. Bikin dia betah.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/admin"
            className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-primary/30 transition hover:scale-[1.03]"
          >
            Buat Kado 💝
          </Link>
          <span className="text-sm text-ink/50">± 2 menit jadi</span>
        </div>

        <div className="mt-10 grid w-full max-w-lg grid-cols-3 gap-4 text-sm">
          {[
            ["🎁", "Kado bergulir"],
            ["🎶", "Musik & gramofon"],
            ["💌", "Quotes & foto"],
          ].map(([icon, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-ink/10 bg-surface/60 p-4 text-ink/80 backdrop-blur"
            >
              <div className="text-2xl">{icon}</div>
              <div className="mt-2 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
