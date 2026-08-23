import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { AttendanceControl } from "@/components/mentor/attendance-control";
import { meetings } from "@/features/prototype/mock-data";

describe("AttendanceControl", () => {
  it("opens a closed attendance session with the selected duration", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();

    render(
      <AttendanceControl
        meeting={meetings[3]}
        onClose={vi.fn()}
        onOpen={onOpen}
        session={null}
      />,
    );
    await user.selectOptions(screen.getByLabelText(/durasi sesi/i), "60");
    await user.click(screen.getByRole("button", { name: /buka presensi/i }));

    expect(onOpen).toHaveBeenCalledWith(meetings[3]?.id, 60);
  });

  it("shows the rotating QR and close action for an active session", () => {
    render(
      <AttendanceControl
        meeting={meetings[3]}
        now={Date.UTC(2026, 7, 22, 10, 10)}
        onClose={vi.fn()}
        onOpen={vi.fn()}
        session={{
          meetingId: meetings[3]!.id,
          openedAt: Date.UTC(2026, 7, 22, 10, 0),
          durationMinutes: 30,
        }}
      />,
    );

    expect(screen.getByRole("img", { name: /qr presensi aktif/i })).toBeInTheDocument();
    expect(screen.getByText(meetings[3]!.title)).toBeInTheDocument();
    expect(screen.getByText(/sisa sesi/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tutup presensi/i })).toBeInTheDocument();
  });
});
