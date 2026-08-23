import { describe, expect, it } from "vitest";

import {
  calculateProgressSummary,
  createRotatingToken,
  isAttendanceSessionActive,
  recordAttendance,
  submitMaterialProgress,
  verifyMaterialProgress,
} from "@/features/prototype/domain";
import { initialPrototypeState } from "@/features/prototype/mock-data";

describe("prototype seed", () => {
  it("represents the agreed cohort and materials without imposing a fixed meeting count", () => {
    expect(initialPrototypeState.mentees).toHaveLength(10);
    expect(initialPrototypeState.materials).toHaveLength(14);
    expect(initialPrototypeState.meetings.length).toBeGreaterThan(0);
    expect(initialPrototypeState.meetings.every((meeting) => meeting.materialIds.length > 0)).toBe(true);
  });
});

describe("material progress", () => {
  it("moves a mentee submission into the verification queue", () => {
    const next = submitMaterialProgress(initialPrototypeState, "mentee-01", "material-05");
    const progress = next.materialProgress.find(
      (item) => item.menteeId === "mentee-01" && item.materialId === "material-05",
    );

    expect(progress?.status).toBe("pending_verification");
  });

  it("marks queued progress as verified", () => {
    const submitted = submitMaterialProgress(initialPrototypeState, "mentee-01", "material-05");
    const verified = verifyMaterialProgress(submitted, "mentee-01", "material-05");
    const progress = verified.materialProgress.find(
      (item) => item.menteeId === "mentee-01" && item.materialId === "material-05",
    );

    expect(progress?.status).toBe("verified");
  });

  it("keeps the progress summary aligned with all 14 materials", () => {
    const summary = calculateProgressSummary(initialPrototypeState, "mentee-01");

    expect(summary.total).toBe(14);
    expect(summary.notStarted + summary.pending + summary.verified).toBe(14);
  });
});

describe("attendance", () => {
  it("keeps one attendance record per mentee and meeting", () => {
    const once = recordAttendance(initialPrototypeState, "meeting-04", "mentee-01");
    const twice = recordAttendance(once, "meeting-04", "mentee-01");
    const records = twice.attendanceRecords.filter(
      (item) => item.meetingId === "meeting-04" && item.menteeId === "mentee-01",
    );

    expect(records).toHaveLength(1);
    expect(records[0]?.status).toBe("hadir");
  });
});

describe("rotating attendance token", () => {
  it("stays stable for one 15-second window and changes afterward", () => {
    const atStart = createRotatingToken("meeting-04", 30_001, 15);
    const inWindow = createRotatingToken("meeting-04", 44_999, 15);
    const nextWindow = createRotatingToken("meeting-04", 45_000, 15);

    expect(inWindow).toBe(atStart);
    expect(nextWindow).not.toBe(atStart);
  });

  it("keeps a 30-minute session active until its deadline", () => {
    const openedAt = Date.UTC(2026, 7, 22, 10, 0, 0);

    expect(isAttendanceSessionActive(openedAt, 30, openedAt + 29 * 60_000)).toBe(true);
    expect(isAttendanceSessionActive(openedAt, 30, openedAt + 30 * 60_000)).toBe(false);
  });
});
