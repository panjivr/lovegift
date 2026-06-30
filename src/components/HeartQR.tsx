"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { THEMES } from "@/lib/theme";
import type { ThemeName } from "@/lib/types";

function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const top = h * 0.3;
  ctx.beginPath();
  ctx.moveTo(x, y + top);
  ctx.bezierCurveTo(x, y, x - w / 2, y, x - w / 2, y + top);
  ctx.bezierCurveTo(x - w / 2, y + (h + top) / 2, x, y + (h + top) / 2, x, y + h);
  ctx.bezierCurveTo(x, y + (h + top) / 2, x + w / 2, y + (h + top) / 2, x + w / 2, y + top);
  ctx.bezierCurveTo(x + w / 2, y, x, y, x, y + top);
  ctx.closePath();
}

// QR wrapped in a themed heart card. The QR itself stays square (finder patterns
// intact = scannable); the heart lives in the card frame around it. Downloadable
// as a PNG.
export function HeartQR({ url, theme }: { url: string; theme: ThemeName }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const p = THEMES[theme] ?? THEMES.rose;

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas || !url) return;

    (async () => {
      const tmp = document.createElement("canvas");
      await QRCode.toCanvas(tmp, url, {
        margin: 1,
        width: 220,
        color: { dark: p.ink, light: p.surface },
      });
      if (cancelled) return;

      const W = 320;
      const H = 380;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = W;
      canvas.height = H;

      // card
      ctx.fillStyle = p.surface;
      roundRect(ctx, 0, 0, W, H, 28);
      ctx.fill();

      // faint big heart watermark behind
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.fillStyle = p.primary;
      drawHeart(ctx, W / 2, 60, 260, 240);
      ctx.fill();
      ctx.restore();

      // little corner hearts
      ctx.fillStyle = p.accent;
      drawHeart(ctx, 44, 30, 26, 24);
      ctx.fill();
      drawHeart(ctx, W - 44, 30, 26, 24);
      ctx.fill();

      // QR
      ctx.drawImage(tmp, (W - 220) / 2, 64, 220, 220);

      // caption
      ctx.fillStyle = p.ink;
      ctx.textAlign = "center";
      ctx.font = "600 19px Georgia, serif";
      ctx.fillText("Pindai dengan cinta", W / 2, 322);
      ctx.font = "13px system-ui, sans-serif";
      ctx.globalAlpha = 0.7;
      ctx.fillText("Sebuah kado menunggumu", W / 2, 346);
      ctx.globalAlpha = 1;

      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [url, theme, p.ink, p.surface, p.primary, p.accent]);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "lovegift-qr.png";
      a.click();
      URL.revokeObjectURL(a.href);
    });
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        className="w-[240px] max-w-full rounded-3xl shadow-lg"
        aria-label="QR code kado berbentuk kartu hati"
      />
      <button
        onClick={download}
        disabled={!ready}
        className="rounded-full border border-accent px-4 py-2 text-sm font-medium text-ink transition hover:bg-accent/10 disabled:opacity-50"
      >
        Unduh QR (PNG)
      </button>
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
