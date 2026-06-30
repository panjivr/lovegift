import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { decodeGift } from "@/lib/encode";
import { GiftExperience } from "@/components/gift/GiftExperience";

// URL-mode gift: all data lives in ?d=<base64url>. No database needed.
export default async function UrlGiftPage({
  searchParams,
}: {
  searchParams: Promise<{ d?: string }>;
}) {
  const { d } = await searchParams;
  if (!d) notFound();
  const gift = decodeGift(d);
  if (!gift || !gift.recipient) notFound();

  const h = await headers();
  const base =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ||
    `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host") ?? "localhost:3000"}`;
  const shareUrl = `${base}/g/u?d=${d}`;

  return <GiftExperience gift={gift} shareUrl={shareUrl} />;
}
