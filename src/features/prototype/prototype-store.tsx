"use client";

import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

import {
  approveMentee,
  recordAttendance,
  submitMaterialProgress,
  verifyMaterialProgress,
} from "@/features/prototype/domain";
import { initialPrototypeState } from "@/features/prototype/mock-data";
import type { AttendanceStatus, PrototypeState } from "@/features/prototype/types";

type PrototypeContextValue = {
  state: PrototypeState;
  approveUser: (menteeId: string) => void;
  submitMaterial: (materialId: string) => void;
  verifyMaterial: (menteeId: string, materialId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  openAttendance: (meetingId: string, durationMinutes: 30 | 45 | 60) => void;
  closeAttendance: () => void;
  simulateScan: () => void;
  setAttendanceStatus: (meetingId: string, menteeId: string, status: AttendanceStatus) => void;
  resetDemo: () => void;
};

const PrototypeContext = createContext<PrototypeContextValue | null>(null);

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PrototypeState>(initialPrototypeState);

  const value = useMemo<PrototypeContextValue>(
    () => ({
      state,
      approveUser: (menteeId) => setState((current) => approveMentee(current, menteeId)),
      submitMaterial: (materialId) =>
        setState((current) => submitMaterialProgress(current, current.activeMenteeId, materialId)),
      verifyMaterial: (menteeId, materialId) =>
        setState((current) => verifyMaterialProgress(current, menteeId, materialId)),
      markNotificationRead: (notificationId) =>
        setState((current) => ({
          ...current,
          notifications: current.notifications.map((notification) =>
            notification.id === notificationId ? { ...notification, read: true } : notification,
          ),
        })),
      openAttendance: (meetingId, durationMinutes) =>
        setState((current) => ({
          ...current,
          attendanceSession: { meetingId, durationMinutes, openedAt: Date.now() },
        })),
      closeAttendance: () =>
        setState((current) => ({ ...current, attendanceSession: null })),
      simulateScan: () =>
        setState((current) => {
          if (!current.attendanceSession) return current;
          return recordAttendance(
            current,
            current.attendanceSession.meetingId,
            current.activeMenteeId,
          );
        }),
      setAttendanceStatus: (meetingId, menteeId, status) =>
        setState((current) => recordAttendance(current, meetingId, menteeId, status)),
      resetDemo: () => setState(initialPrototypeState),
    }),
    [state],
  );

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) {
    throw new Error("usePrototype harus digunakan di dalam PrototypeProvider");
  }
  return context;
}
