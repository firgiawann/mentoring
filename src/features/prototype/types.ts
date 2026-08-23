export type AccountStatus = "pending" | "approved" | "rejected" | "suspended";
export type ProgressStatus = "not_started" | "pending_verification" | "verified";
export type AttendanceStatus = "hadir" | "terlambat" | "izin" | "sakit" | "alpa";
export type Visibility = "draft" | "mentee" | "public";

export type Mentee = {
  id: string;
  name: string;
  nim: string;
  email: string;
  initials: string;
  status: AccountStatus;
  joinedAt: string;
};

export type Material = {
  id: string;
  order: number;
  title: string;
  summary: string;
  category: string;
  durationMinutes: number;
  isOpen: boolean;
  visibility: Visibility;
  accent: "yellow" | "pink" | "blue" | "green" | "purple";
};

export type MaterialProgress = {
  materialId: string;
  menteeId: string;
  status: ProgressStatus;
  updatedAt: string;
};

export type Meeting = {
  id: string;
  sequence: number;
  title: string;
  date: string;
  time: string;
  location: string;
  agenda: string;
  materialIds: string[];
  status: "selesai" | "akan_datang" | "dibatalkan";
};

export type AttendanceRecord = {
  id: string;
  meetingId: string;
  menteeId: string;
  status: AttendanceStatus;
  recordedAt: string;
  note?: string;
};

export type Notification = {
  id: string;
  menteeId: string;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  tone: "info" | "success" | "warning";
};

export type PublicContent = {
  id: string;
  title: string;
  excerpt: string;
  visibility: Visibility;
  type: "announcement" | "documentation";
};

export type AttendanceSession = {
  meetingId: string;
  openedAt: number;
  durationMinutes: 30 | 45 | 60;
};

export type PrototypeState = {
  mentees: Mentee[];
  materials: Material[];
  materialProgress: MaterialProgress[];
  meetings: Meeting[];
  attendanceRecords: AttendanceRecord[];
  notifications: Notification[];
  publicContent: PublicContent[];
  activeMenteeId: string;
  attendanceSession: AttendanceSession | null;
};

export type ProgressSummary = {
  total: number;
  notStarted: number;
  pending: number;
  verified: number;
};
