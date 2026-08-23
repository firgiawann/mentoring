"use client";

import { useEffect, useRef } from "react";
import { BookOpenText, Clock3, FileText, LockKeyhole, X } from "lucide-react";

import { MaterialBlockRenderer } from "@/components/mentee/material-block-renderer";
import { Button } from "@/components/ui/button";
import type { MaterialExperience } from "@/features/materials/types";
import type { Material, ProgressStatus } from "@/features/prototype/types";

type MaterialExperiencePanelProps = {
  material: Material;
  experience: MaterialExperience;
  status: ProgressStatus;
  onClose: () => void;
  onSubmit: (materialId: string) => void;
};

export function MaterialExperiencePanel({
  material,
  experience,
  status,
  onClose,
  onSubmit,
}: MaterialExperiencePanelProps) {
  const headingId = `material-heading-${material.id}`;
  const visibleBlocks = material.isOpen
    ? experience.blocks
    : experience.blocks.filter((block) => ["intro", "key_points", "fact"].includes(block.type));
  const panelRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="material-experience-layer">
      <button
        aria-label="Tutup lewat area luar"
        className="material-experience-backdrop"
        onClick={onClose}
        type="button"
      />
      <section
        aria-labelledby={headingId}
        aria-modal="true"
        className="material-experience-panel"
        ref={panelRef}
        role="dialog"
      >
        <header className="material-experience-header">
          <div>
            <span className="eyebrow">Materi {String(material.order).padStart(2, "0")}</span>
            <h2 id={headingId}>{material.title}</h2>
          </div>
          <button aria-label="Tutup materi" className="icon-action" onClick={onClose} ref={closeButtonRef} type="button">
            <X />
          </button>
        </header>

        <div className="material-experience-meta" aria-label="Informasi materi">
          <span><Clock3 size={17} /> ± {experience.readTimeMinutes} menit</span>
          <span><FileText size={17} /> Referensi halaman {experience.sourcePages[0]}–{experience.sourcePages[1]}</span>
        </div>

        <div className="material-objectives">
          <span className="eyebrow">Setelah membaca, kamu dapat</span>
          <ul>
            {experience.objectives.map((objective) => <li key={objective}>{objective}</li>)}
          </ul>
        </div>

        {!material.isOpen ? (
          <p className="material-preview-note"><LockKeyhole size={18} /> Ini versi ringkas untuk dibaca lebih awal. Aktivitas lengkap akan dibuka mentor sesuai kebutuhan.</p>
        ) : null}

        <div className="material-blocks">
          {visibleBlocks.map((block) => <MaterialBlockRenderer block={block} key={block.id} />)}
        </div>

        {material.isOpen && status === "not_started" ? (
          <footer className="material-experience-footer">
            <Button onClick={() => onSubmit(material.id)}><BookOpenText size={17} /> Tandai selesai</Button>
          </footer>
        ) : null}
      </section>
    </div>
  );
}
