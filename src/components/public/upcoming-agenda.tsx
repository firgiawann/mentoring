import { ArrowRight, CalendarCheck2, MapPin } from "lucide-react";

import { meetings } from "@/features/prototype/mock-data";

export function UpcomingAgenda() {
  const upcoming = meetings.filter((meeting) => meeting.status === "akan_datang").slice(0, 3);
  return (
    <section className="agenda-section" id="agenda">
      <div className="section-wrap">
        <div className="section-heading section-heading--compact">
          <div><span className="eyebrow">AGENDA BERIKUTNYA</span><h2>Jangan datang<br />tanpa konteks.</h2></div>
          <span className="agenda-stamp"><CalendarCheck2 size={30} /> WEEKLY<br />MENTORING</span>
        </div>
        <div className="agenda-list">
          {upcoming.map((meeting) => {
            const date = new Intl.DateTimeFormat("id-ID", { day: "2-digit", month: "short" }).format(new Date(meeting.date));
            return (
              <article className="agenda-row" key={meeting.id}>
                <div className="agenda-date">{date}</div>
                <div><span className="eyebrow">PERTEMUAN {String(meeting.sequence).padStart(2, "0")}</span><h3>{meeting.title}</h3><p>{meeting.agenda}</p></div>
                <div className="agenda-place"><MapPin size={18} /> {meeting.location}<br /><span>{meeting.time}</span></div>
                <ArrowRight className="agenda-arrow" size={28} strokeWidth={3} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
