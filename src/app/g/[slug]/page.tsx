import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { getGiftBySlug } from "@/lib/gifts";
import { GiftExperience } from "@/components/gift/GiftExperience";

async function origin(): Promise<string> {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  }
  const h = await headers();
  const host = h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}

export default async function GiftPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gift = await getGiftBySlug(slug);
  if (!gift) notFound();

  const shareUrl = `${await origin()}/g/${slug}`;
  return <GiftExperience gift={gift} shareUrl={shareUrl} />;
}
