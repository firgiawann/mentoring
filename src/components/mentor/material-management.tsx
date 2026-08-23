import { Eye, FilePenLine, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMaterialExperience } from "@/features/materials/material-experiences";
import type { Material } from "@/features/prototype/types";

export function MaterialManagement({ materials }: { materials: Material[] }) {
  return <><div className="admin-inline-actions"><p>14 topik modul dapat dipakai lintas pertemuan sesuai kebutuhan mentoring.</p><Button><Plus size={17} /> Materi baru</Button></div><div className="admin-material-grid">{materials.map((material) => {
    const experience = getMaterialExperience(material.id);
    const activityCount = experience?.blocks.filter((block) => ["checklist", "reflection", "scenario", "true_false", "ordering"].includes(block.type)).length ?? 0;
    return <article className={`admin-material admin-material--${material.accent}`} key={material.id}><span className="material-order">{String(material.order).padStart(2, "0")}</span><div><Badge tone={material.visibility === "public" ? "green" : "muted"}>{material.visibility === "public" ? "Publik" : "Mentee"}</Badge><h3>{material.title}</h3><p>{experience?.blocks.length ?? 0} blok · {activityCount} aktivitas interaktif · ± {experience?.readTimeMinutes ?? material.durationMinutes} menit</p></div><div className="table-actions"><Button aria-label={`Pratinjau ${material.title}`} variant="ghost"><Eye size={16} /></Button><Button aria-label={`Edit ${material.title} (versi produksi)`} title="Editor tersedia setelah backend produksi" variant="ghost"><FilePenLine size={16} /></Button></div></article>;
  })}</div></>;
}
