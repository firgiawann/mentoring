"use client";

import { useRef, useState } from "react";
import { BookOpenText, Check, ChevronRight, Clock3, LockKeyhole, TimerReset } from "lucide-react";

import { MaterialExperiencePanel } from "@/components/mentee/material-experience-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMaterialExperience } from "@/features/materials/material-experiences";
import type { Material, MaterialProgress } from "@/features/prototype/types";

type MaterialListProps = {
  materials: Material[];
  progress: MaterialProgress[];
  onSubmit: (materialId: string) => void;
};

export function MaterialList({ materials, progress, onSubmit }: MaterialListProps) {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const selectedMaterial = materials.find((material) => material.id === selectedMaterialId);
  const selectedExperience = selectedMaterial ? getMaterialExperience(selectedMaterial.id) : undefined;
  const selectedStatus = progress.find((item) => item.materialId === selectedMaterialId)?.status ?? "not_started";

  function closePanel() {
    setSelectedMaterialId(null);
    lastTriggerRef.current?.focus();
  }

  return (
    <>
      <div className="mentee-material-grid">
      {materials.map((material) => {
        const itemProgress = progress.find((item) => item.materialId === material.id);
        const status = itemProgress?.status ?? "not_started";
        return (
          <article className={`mentee-material mentee-material--${material.accent}`} key={material.id}>
            <div className="mentee-material__head">
              <span className="material-order">{String(material.order).padStart(2, "0")}</span>
              <Badge tone={material.isOpen ? "green" : "muted"}>{material.isOpen ? "Terbuka" : "Ringkasan"}</Badge>
            </div>
            <span className="eyebrow">{material.category}</span>
            <h3>{material.title}</h3>
            <p>{material.summary}</p>
            <div className="material-duration"><Clock3 size={15} /> {material.durationMinutes} menit</div>
            <div className="mentee-material__footer">
              {status === "verified" ? <span className="status-line status-line--verified"><Check size={18} /> Terverifikasi</span> : status === "pending_verification" ? <span className="status-line status-line--pending"><TimerReset size={18} /> Menunggu verifikasi</span> : material.isOpen ? <Button onClick={() => onSubmit(material.id)} variant="ghost"><BookOpenText size={17} /> Tandai selesai</Button> : <span className="status-line"><LockKeyhole size={17} /> Isi belum dibuka</span>}
              <button
                aria-label={`Buka materi ${material.title}`}
                className="icon-action"
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setSelectedMaterialId(material.id);
                }}
                type="button"
              >
                <ChevronRight />
              </button>
            </div>
          </article>
        );
      })}
      </div>
      {selectedMaterial && selectedExperience ? (
        <MaterialExperiencePanel
          experience={selectedExperience}
          material={selectedMaterial}
          onClose={closePanel}
          onSubmit={onSubmit}
          status={selectedStatus}
        />
      ) : null}
    </>
  );
}
