"use client";

import { Check, KeyRound, Mail, UserRoundCheck } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Mentee } from "@/features/prototype/types";

export function UserManagement({ mentees, onApprove }: { mentees: Mentee[]; onApprove: (id: string) => void }) {
  const [message, setMessage] = useState("");
  return <div className="admin-table-wrap">{message && <div className="admin-feedback"><Check size={18} /> {message}</div>}<div className="admin-table admin-user-table"><div className="admin-table__head"><span>Mentee</span><span>Status</span><span>Bergabung</span><span>Aksi</span></div>{mentees.map((mentee) => <div className="admin-table__row" key={mentee.id}><div className="user-cell"><span>{mentee.initials}</span><div><strong>{mentee.name}</strong><small><Mail size={12} /> {mentee.email} · {mentee.nim}</small></div></div><Badge tone={mentee.status === "approved" ? "green" : "yellow"}>{mentee.status === "approved" ? "Aktif" : "Pending"}</Badge><span className="table-muted">{new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(mentee.joinedAt))}</span><div className="table-actions">{mentee.status === "pending" && <Button aria-label={`Setujui ${mentee.name}`} onClick={() => onApprove(mentee.id)}><UserRoundCheck size={16} /> Setujui</Button>}<Button aria-label={`Atur password ${mentee.name}`} onClick={() => setMessage(`Password ${mentee.name} siap diatur pada versi produksi.`)} variant="ghost"><KeyRound size={16} /></Button></div></div>)}</div></div>;
}
