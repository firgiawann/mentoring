import { CalendarDays, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Meeting } from "@/features/prototype/types";

export function ScheduleList({ meetings }: { meetings: Meeting[] }) {
  return <div className="portal-list">{meetings.map((meeting) => <article className="portal-list-row" key={meeting.id}><div className="meeting-sequence">{String(meeting.sequence).padStart(2, "0")}</div><div><div className="row-badges"><Badge tone={meeting.status === "selesai" ? "green" : "yellow"}>{meeting.status === "selesai" ? "Selesai" : "Akan datang"}</Badge><span><CalendarDays size={15} /> {new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(new Date(meeting.date))}</span></div><h3>{meeting.title}</h3><p>{meeting.agenda}</p></div><div className="row-place"><MapPin size={17} /> {meeting.location}<span>{meeting.time}</span></div></article>)}</div>;
}
