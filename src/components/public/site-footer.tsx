import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-grid">
        <div><span className="eyebrow">PTIK D1 2026</span><h2>Siap belajar<br />lebih terarah?</h2></div>
        <div className="footer-links"><Link href="/register">Daftar sebagai mentee <ArrowUpRight /></Link><Link href="/login">Masuk ke akun <ArrowUpRight /></Link><Link href="/mentor">Panel mentor demo <ArrowUpRight /></Link></div>
      </div>
      <div className="section-wrap footer-bottom"><span>Dibuat untuk ruang belajar yang lebih manusiawi.</span><span>Prototype · Agustus 2026</span></div>
    </footer>
  );
}
