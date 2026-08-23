import type { MetadataRoute } from "next";

import { createSitePath } from "@/config/site-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PTIK D1 2026 Mentoring",
    short_name: "PTIK Mentor",
    description: "Ruang belajar, progres, jadwal, dan presensi mentoring PTIK D1 2026.",
    start_url: createSitePath("/"),
    display: "standalone",
    background_color: "#f7f3e8",
    theme_color: "#f5e642",
    orientation: "portrait-primary",
    icons: [
      { src: createSitePath("/icons/icon-192.svg"), sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: createSitePath("/icons/icon-512.svg"), sizes: "512x512", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
