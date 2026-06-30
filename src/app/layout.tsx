import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LoveGift — Kado Digital untuk Orang Tersayang",
  description:
    "Buat kado digital gratis: pesan, foto, quotes cinta, dan musik dalam satu link penuh kejutan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
