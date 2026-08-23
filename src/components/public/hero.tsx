import { ArrowDownRight, MessageCircleHeart, MousePointer2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="hero-section">
      <div className="section-wrap hero-grid">
        <div className="hero-copy">
          <span className="hero-kicker"><span className="live-dot" /> Mentoring aktif · 10 mentee</span>
          <h1 aria-label="PTIK D1 2026" className="display-title">PTIK D1<br /><span>2026</span></h1>
          <p className="hero-lead">Di sini kamu nggak harus langsung hebat. Cukup hadir, berani bertanya, dan lanjut satu langkah lagi.</p>
          <div className="hero-actions">
            <Button href="/register">Daftar sebagai mentee <ArrowDownRight size={19} strokeWidth={3} /></Button>
            <Button href="/dashboard" variant="ghost">Lihat dashboard demo</Button>
          </div>
          <aside aria-label="Catatan mentor hari ini" className="mentor-note">
            <MessageCircleHeart size={25} strokeWidth={2.8} />
            <div>
              <strong>Catatan mentor hari ini</strong>
              <p>Hari ini lagi sibuk apa? Kalau capek, istirahat sebentar. Jangan lupa cerita kalau ada yang bikin belajarmu tersendat, ya.</p>
            </div>
          </aside>
        </div>
        <div aria-label="Cuplikan dashboard mentoring" className="hero-visual">
          <div className="tape tape--one">LEARN / TRACK / GROW</div>
          <div className="mini-dashboard">
            <div className="mini-dashboard__top">
              <span className="eyebrow">PROGRES KAMU</span>
              <span className="scribble">57%</span>
            </div>
            <div className="giant-progress"><span /></div>
            <div className="mini-grid">
              <div><strong>08</strong><small>materi selesai</small></div>
              <div><strong>03</strong><small>hadir beruntun</small></div>
            </div>
          </div>
          <div className="floating-note"><MousePointer2 size={18} fill="currentColor" /> Kamu ada di sini!</div>
          <div className="sticker-orbit">D1</div>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div>Pelan-pelan tetap progres ✦ Berani bertanya ✦ Kamu nggak belajar sendirian ✦ Cerita kalau ada kendala ✦ Pelan-pelan tetap progres ✦</div>
      </div>
    </section>
  );
}
