import { ArrowUpRight, Clock3, LockKeyhole } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { materials } from "@/features/prototype/mock-data";

export function PublicMaterials() {
  return (
    <section className="materials-preview" id="materi">
      <div className="section-wrap">
        <div className="section-heading">
          <div><span className="eyebrow">BACA DULU, DISKUSI NANTI</span><h2>Materi yang tidak<br />bikin kaget.</h2></div>
          <Button href="/dashboard" variant="ghost">Jelajahi semua <ArrowUpRight size={18} /></Button>
        </div>
        <div className="material-preview-grid">
          {materials.slice(0, 4).map((material, index) => (
            <article className={`material-preview material-preview--${material.accent}`} key={material.id}>
              <div className="material-number">{String(material.order).padStart(2, "0")}</div>
              <div className="material-meta"><Badge tone={index < 2 ? "green" : "muted"}>{index < 2 ? "Publik" : "Ringkasan"}</Badge><span><Clock3 size={15} /> {material.durationMinutes} menit</span></div>
              <h3>{material.title}</h3>
              <p>{material.summary}</p>
              {index >= 2 && <span className="locked-copy"><LockKeyhole size={16} /> Isi lengkap untuk mentee</span>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
