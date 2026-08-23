import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { DashboardOverview } from "@/components/mentee/dashboard-overview";
import type { Meeting, Mentee, ProgressSummary } from "@/features/prototype/types";

const mentee: Mentee = {
  id: "mentee-01",
  name: "Alya Ramadhani",
  nim: "2601001",
  email: "alya@example.test",
  initials: "AR",
  status: "approved",
  joinedAt: "2026-08-01T00:00:00.000Z",
};

const meeting: Meeting = {
  id: "meeting-04",
  sequence: 4,
  title: "Kenalan dengan Algoritma",
  date: "2026-08-29T00:00:00.000Z",
  time: "09.00 WITA",
  location: "Lab PTIK",
  agenda: "Latihan menyusun langkah sederhana.",
  materialIds: ["material-04"],
  status: "akan_datang",
};

const summary: ProgressSummary = {
  total: 14,
  notStarted: 8,
  pending: 2,
  verified: 4,
};

describe("DashboardOverview", () => {
  it("responds supportively when a mentee says they need help", async () => {
    const user = userEvent.setup();
    render(
      <DashboardOverview
        attendanceActive={false}
        mentee={mentee}
        nextMeeting={meeting}
        summary={summary}
      />,
    );

    await user.click(screen.getByRole("button", { name: /butuh bantuan/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/cerita ke mentor/i);
    expect(screen.getByRole("button", { name: /butuh bantuan/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("offers actionable first steps and lets the mentee collapse the guide", async () => {
    const user = userEvent.setup();
    render(
      <DashboardOverview
        attendanceActive={false}
        mentee={mentee}
        nextMeeting={meeting}
        summary={summary}
      />,
    );

    expect(screen.getByRole("link", { name: /buka materi/i })).toHaveAttribute(
      "href",
      "#materi-belajar",
    );
    expect(screen.getByRole("link", { name: /cek agenda/i })).toHaveAttribute(
      "href",
      "#jadwal",
    );
    expect(screen.getByRole("link", { name: /lihat status presensi/i })).toHaveAttribute(
      "href",
      "#presensi",
    );

    await user.click(screen.getByRole("button", { name: /tutup panduan/i }));
    expect(screen.queryByText(/baca ringkasan/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /buka panduan/i }));
    expect(screen.getByText(/baca ringkasan/i)).toBeInTheDocument();
  });
});
