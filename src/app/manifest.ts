import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PTIK D1 2026 Mentoring",
    short_name: "PTIK Mentor",
    description: "Ruang belajar, progres, jadwal, dan presensi mentoring PTIK D1 2026.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3e8",
    theme_color: "#f5e642",
    orientation: "portrait-primary",
    icons: [
      { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
      { src: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
