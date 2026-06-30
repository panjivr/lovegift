/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Supabase Storage + arbitrary external photo URLs (URL-mode fallback).
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
