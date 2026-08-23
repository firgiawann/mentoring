import type {
  AttendanceStatus,
  ProgressSummary,
  PrototypeState,
} from "@/features/prototype/types";

function assertMentee(state: PrototypeState, menteeId: string) {
  if (!state.mentees.some((mentee) => mentee.id === menteeId)) {
    throw new Error(`Mentee tidak ditemukan: ${menteeId}`);
  }
}

function assertMaterial(state: PrototypeState, materialId: string) {
  if (!state.materials.some((material) => material.id === materialId)) {
    throw new Error(`Materi tidak ditemukan: ${materialId}`);
  }
}

function assertMeeting(state: PrototypeState, meetingId: string) {
  if (!state.meetings.some((meeting) => meeting.id === meetingId)) {
    throw new Error(`Pertemuan tidak ditemukan: ${meetingId}`);
  }
}

export function calculateProgressSummary(state: PrototypeState, menteeId: string): ProgressSummary {
  assertMentee(state, menteeId);
  const progress = state.materialProgress.filter((item) => item.menteeId === menteeId);
  const verified = progress.filter((item) => item.status === "verified").length;
  const pending = progress.filter((item) => item.status === "pending_verification").length;
  return {
    total: state.materials.length,
    verified,
    pending,
    notStarted: state.materials.length - verified - pending,
  };
}

export function approveMentee(state: PrototypeState, menteeId: string): PrototypeState {
  assertMentee(state, menteeId);
  return {
    ...state,
    mentees: state.mentees.map((mentee) =>
      mentee.id === menteeId ? { ...mentee, status: "approved" } : mentee,
    ),
  };
}

export function submitMaterialProgress(
  state: PrototypeState,
  menteeId: string,
  materialId: string,
): PrototypeState {
  assertMentee(state, menteeId);
  assertMaterial(state, materialId);
  const existing = state.materialProgress.find(
    (item) => item.menteeId === menteeId && item.materialId === materialId,
  );
  const nextProgress = {
    materialId,
    menteeId,
    status: "pending_verification" as const,
    updatedAt: new Date().toISOString(),
  };
  return {
    ...state,
    materialProgress: existing
      ? state.materialProgress.map((item) =>
          item.menteeId === menteeId && item.materialId === materialId ? nextProgress : item,
        )
      : [...state.materialProgress, nextProgress],
  };
}

export function verifyMaterialProgress(
  state: PrototypeState,
  menteeId: string,
  materialId: string,
): PrototypeState {
  const submitted = submitMaterialProgress(state, menteeId, materialId);
  return {
    ...submitted,
    materialProgress: submitted.materialProgress.map((item) =>
      item.menteeId === menteeId && item.materialId === materialId
        ? { ...item, status: "verified", updatedAt: new Date().toISOString() }
        : item,
    ),
  };
}

export function recordAttendance(
  state: PrototypeState,
  meetingId: string,
  menteeId: string,
  status: AttendanceStatus = "hadir",
): PrototypeState {
  assertMeeting(state, meetingId);
  assertMentee(state, menteeId);
  const existing = state.attendanceRecords.find(
    (item) => item.meetingId === meetingId && item.menteeId === menteeId,
  );
  const record = {
    id: existing?.id ?? `attendance-${meetingId}-${menteeId}`,
    meetingId,
    menteeId,
    status,
    recordedAt: new Date().toISOString(),
  };
  return {
    ...state,
    attendanceRecords: existing
      ? state.attendanceRecords.map((item) => (item.id === existing.id ? record : item))
      : [...state.attendanceRecords, record],
  };
}

export function createRotatingToken(
  meetingId: string,
  timestamp: number,
  intervalSeconds = 15,
): string {
  const window = Math.floor(timestamp / (intervalSeconds * 1000));
  const source = `${meetingId}:${window}:ptik-d1-2026-prototype`;
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `PTIK-${(hash >>> 0).toString(36).toUpperCase()}`;
}

export function isAttendanceSessionActive(
  openedAt: number,
  durationMinutes: 30 | 45 | 60,
  timestamp = Date.now(),
): boolean {
  return timestamp >= openedAt && timestamp < openedAt + durationMinutes * 60_000;
}
