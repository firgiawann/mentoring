import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { createSitePath } from "@/config/site-path";
import { PrototypeProvider } from "@/features/prototype/prototype-store";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PTIK D1 2026 Mentoring",
    template: "%s · PTIK D1 2026",
  },
  description: "Ruang belajar dan pelacak kegiatan mentoring PTIK D1 2026.",
  manifest: createSitePath("/manifest.webmanifest"),
  icons: {
    icon: createSitePath("/icons/icon-192.svg"),
    apple: createSitePath("/icons/icon-192.svg"),
  },
};

export const viewport: Viewport = {
  themeColor: "#f5e642",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="id">
      <body>
        <a className="skip-link" href="#main-content">
          Lewati ke konten utama
        </a>
        <PrototypeProvider>{children}</PrototypeProvider>
      </body>
    </html>
  );
}
