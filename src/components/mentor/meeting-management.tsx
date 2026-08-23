import { CalendarPlus2, MoreHorizontal, Repeat2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Meeting } from "@/features/prototype/types";

export function MeetingManagement({ meetings }: { meetings: Meeting[] }) {
  return <><div className="admin-inline-actions"><span className="repeat-note"><Repeat2 size={18} /> Jadwal mingguan · tiap sesi bisa diedit</span><Button><CalendarPlus2 size={17} /> Tambah pertemuan</Button></div><div className="meeting-admin-list">{meetings.map((meeting) => <article key={meeting.id}><div className="meeting-sequence">{String(meeting.sequence).padStart(2, "0")}</div><div><Badge tone={meeting.status === "selesai" ? "green" : "yellow"}>{meeting.status === "selesai" ? "Selesai" : "Terjadwal"}</Badge><h3>{meeting.title}</h3><p>{meeting.agenda}</p></div><div className="meeting-admin-time"><strong>{new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(meeting.date))}</strong><span>{meeting.time}</span></div><Button aria-label={`Kelola ${meeting.title}`} variant="ghost"><MoreHorizontal /></Button></article>)}</div></>;
}
