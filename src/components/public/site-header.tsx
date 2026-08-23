import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="section-wrap site-header__inner">
        <Link aria-label="PTIK D1 2026 — beranda" className="brand-lockup" href="/">
          <span className="brand-mark"><Sparkles size={20} strokeWidth={3} /></span>
          <span>PTIK / D1 / 2026</span>
        </Link>
        <nav aria-label="Navigasi publik" className="public-nav">
          <a href="#program">Program</a>
          <a href="#agenda">Agenda</a>
          <a href="#materi">Materi</a>
        </nav>
        <div className="header-actions">
          <Button href="/login" variant="ghost">Masuk</Button>
          <Button href="/register">Daftar <ArrowUpRight size={17} strokeWidth={3} /></Button>
        </div>
      </div>
    </header>
  );
}
