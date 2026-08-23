"use client";

import { BadgeCheck, BookOpenCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Material, MaterialProgress, Mentee } from "@/features/prototype/types";

export function ProgressVerification({ queue, materials, mentees, onVerify }: { queue: MaterialProgress[]; materials: Material[]; mentees: Mentee[]; onVerify: (menteeId: string, materialId: string) => void }) {
  if (!queue.length) return <div className="admin-empty"><BadgeCheck size={42} /><h3>Semua progres sudah diperiksa.</h3><p>Tidak ada antrean verifikasi saat ini.</p></div>;
  return <div className="verification-list">{queue.map((item) => { const mentee = mentees.find((value) => value.id === item.menteeId); const material = materials.find((value) => value.id === item.materialId); return <article className="verification-row" key={`${item.menteeId}-${item.materialId}`}><div className="user-cell"><span>{mentee?.initials}</span><div><strong>{mentee?.name}</strong><small>{mentee?.nim}</small></div></div><div><span className="eyebrow">MATERI {String(material?.order ?? 0).padStart(2, "0")}</span><h3>{material?.title}</h3></div><Button onClick={() => onVerify(item.menteeId, item.materialId)}><BookOpenCheck size={17} /> Verifikasi</Button></article>; })}</div>;
}
