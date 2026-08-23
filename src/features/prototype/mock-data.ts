import type {
  AttendanceRecord,
  Material,
  MaterialProgress,
  Meeting,
  Mentee,
  Notification,
  PrototypeState,
  PublicContent,
} from "@/features/prototype/types";

export const mentees: Mentee[] = [
  ["mentee-01", "Alya Ramadhani", "2401001", "alya@ptik.id", "AR", "approved"],
  ["mentee-02", "Bagas Pratama", "2401002", "bagas@ptik.id", "BP", "approved"],
  ["mentee-03", "Citra Lestari", "2401003", "citra@ptik.id", "CL", "approved"],
  ["mentee-04", "Dimas Saputra", "2401004", "dimas@ptik.id", "DS", "approved"],
  ["mentee-05", "Eka Nuraini", "2401005", "eka@ptik.id", "EN", "approved"],
  ["mentee-06", "Fajar Mahendra", "2401006", "fajar@ptik.id", "FM", "approved"],
  ["mentee-07", "Gita Maharani", "2401007", "gita@ptik.id", "GM", "approved"],
  ["mentee-08", "Hafiz Akbar", "2401008", "hafiz@ptik.id", "HA", "approved"],
  ["mentee-09", "Intan Permata", "2401009", "intan@ptik.id", "IP", "pending"],
  ["mentee-10", "Jovan Kurnia", "2401010", "jovan@ptik.id", "JK", "pending"],
].map(([id, name, nim, email, initials, status], index) => ({
  id,
  name,
  nim,
  email,
  initials,
  status: status as Mentee["status"],
  joinedAt: `2026-08-${String(10 + index).padStart(2, "0")}T08:00:00.000Z`,
}));

const materialSeeds: Array<[string, string, number, Material["accent"], string]> = [
  ["Panduan Mentoring", "Kenali tujuan, mekanisme, hak, kewajiban, dan cara mengikuti mentoring dengan nyaman.", 8, "yellow", "Orientasi"],
  ["Norma dan Etika di Lingkungan Kampus", "Panduan bersikap, berkomunikasi, dan menjaga integritas di lingkungan akademik maupun digital.", 12, "pink", "Kehidupan Kampus"],
  ["Tata Tertib Fasilitas dan Laboratorium", "Gunakan ruang dan peralatan kampus secara aman, tertib, dan bertanggung jawab.", 10, "blue", "Kehidupan Kampus"],
  ["Kehidupan Kampus yang Positif", "Bangun kemandirian, manajemen waktu, relasi, dan budaya belajar yang sehat.", 12, "green", "Adaptasi"],
  ["Kesehatan Mental dan Adaptasi", "Kenali proses penyesuaian mahasiswa baru serta dukungan yang dapat dicari ketika mengalami kesulitan.", 9, "purple", "Kesejahteraan"],
  ["Lindungi Diri dari Bullying dan Kekerasan", "Mengenali tindakan yang tidak aman, mendukung korban, dan mencari bantuan melalui saluran yang tepat.", 16, "yellow", "Kampus Aman"],
  ["Lembaga Kemahasiswaan dan UKM", "Jelajahi ruang organisasi dan kegiatan yang sesuai dengan minat serta kapasitasmu.", 14, "pink", "Pengembangan Diri"],
  ["MBKM dan Kampus Berdampak", "Gambaran peluang belajar di luar kelas dan bekal yang dapat dipersiapkan sejak awal.", 9, "blue", "Peluang"],
  ["Beasiswa dan Lomba", "Kenali jenis peluang, dokumen yang perlu disiapkan, dan pentingnya memeriksa kanal resmi.", 15, "green", "Peluang"],
  ["Sistem Informasi JTIK", "Kenali fungsi portal akademik, kemahasiswaan, laboratorium, serta pencatatan prestasi.", 10, "purple", "Layanan Kampus"],
  ["Nilai Spiritual dalam Kehidupan Mahasiswa", "Ruang refleksi mengenai makna, kejujuran, rasa syukur, dan nilai yang menjadi kompas pribadi.", 15, "yellow", "Refleksi"],
  ["Proses dan Alur Tugas Akhir", "Peta awal tahapan tugas akhir agar perjalanan akademik jangka panjang terasa lebih mudah dipahami.", 8, "pink", "Akademik"],
  ["Plagiarisme dan Bijak Menggunakan AI", "Gunakan AI sebagai alat bantu sambil menjaga kejujuran, verifikasi sumber, dan kemandirian berpikir.", 12, "blue", "Integritas Akademik"],
  ["Konsultasi dengan Penasihat Akademik", "Persiapkan konsultasi, komunikasikan kebutuhan dengan jelas, dan tindak lanjuti hasil pembahasan.", 9, "green", "Akademik"],
];

export const materials: Material[] = materialSeeds.map(([title, summary, durationMinutes, accent, category], index) => ({
  id: `material-${String(index + 1).padStart(2, "0")}`,
  order: index + 1,
  title,
  summary,
  category,
  durationMinutes,
  isOpen: index < 6,
  visibility: index < 2 ? "public" : "mentee",
  accent,
}));

const meetingTitles = [
  "Kickoff & Panduan Mentoring",
  "Etika dan Lingkungan Kampus",
  "Adaptasi Mahasiswa Baru",
  "Kampus Aman & Dukungan",
];

export const meetings: Meeting[] = meetingTitles.map((title, index) => {
  const day = 24 + index * 7;
  const date = new Date(Date.UTC(2026, 7, day, 11, 30));
  const completed = index < 3;
  return {
    id: `meeting-${String(index + 1).padStart(2, "0")}`,
    sequence: index + 1,
    title,
    date: date.toISOString(),
    time: "19.30–21.00 WITA",
    location: index % 3 === 0 ? "Lab PTIK" : "Ruang Kelas D1",
    agenda: `Diskusi dan aktivitas materi ${index + 1}–${Math.min(index + 2, 14)}`,
    materialIds: [`material-${String(index + 1).padStart(2, "0")}`, `material-${String(Math.min(index + 2, 14)).padStart(2, "0")}`],
    status: completed ? "selesai" : "akan_datang",
  };
});

const progressStatusByOrder: Record<number, MaterialProgress["status"]> = {
  1: "verified",
  2: "verified",
  3: "verified",
  4: "pending_verification",
};

export const materialProgress: MaterialProgress[] = mentees.flatMap((mentee, menteeIndex) =>
  materials
    .filter((material) => material.order <= Math.max(1, 4 - (menteeIndex % 3)))
    .map((material) => ({
      materialId: material.id,
      menteeId: mentee.id,
      status: progressStatusByOrder[material.order] ?? "not_started",
      updatedAt: "2026-08-21T10:00:00.000Z",
    })),
);

export const attendanceRecords: AttendanceRecord[] = meetings.slice(0, 3).flatMap((meeting, meetingIndex) =>
  mentees.slice(0, 8).map((mentee, menteeIndex) => ({
    id: `attendance-${meeting.id}-${mentee.id}`,
    meetingId: meeting.id,
    menteeId: mentee.id,
    status: menteeIndex === 6 && meetingIndex === 1 ? "izin" : menteeIndex === 7 ? "terlambat" : "hadir",
    recordedAt: meeting.date,
  })),
);

export const notifications: Notification[] = [
  {
    id: "notification-01",
    menteeId: "mentee-01",
    title: "Materi baru terbuka",
    body: "Materi Kesehatan Mental dan Adaptasi sudah bisa kamu baca sebelum pertemuan berikutnya.",
    createdAt: "2026-08-22T08:00:00.000Z",
    read: false,
    tone: "info",
  },
  {
    id: "notification-02",
    menteeId: "mentee-01",
    title: "Progres terverifikasi",
    body: "Mentor telah memverifikasi materi Norma dan Etika di Lingkungan Kampus.",
    createdAt: "2026-08-21T12:30:00.000Z",
    read: false,
    tone: "success",
  },
  {
    id: "notification-03",
    menteeId: "mentee-01",
    title: "Jadwal diperbarui",
    body: "Pertemuan berikutnya dimulai pukul 19.30 WITA di Ruang Kelas D1.",
    createdAt: "2026-08-20T06:30:00.000Z",
    read: true,
    tone: "warning",
  },
];

export const publicContent: PublicContent[] = [
  {
    id: "public-01",
    title: "Belajar tumbuh bareng",
    excerpt: "Ruang aman untuk beradaptasi, membangun kebiasaan belajar, dan tumbuh bersama di kampus.",
    visibility: "public",
    type: "announcement",
  },
  {
    id: "public-02",
    title: "Pekan pertama: berani bertanya",
    excerpt: "Potongan suasana kickoff, penyusunan target, dan sesi tanya jawab pertama.",
    visibility: "public",
    type: "documentation",
  },
];

export const initialPrototypeState: PrototypeState = {
  mentees,
  materials,
  materialProgress,
  meetings,
  attendanceRecords,
  notifications,
  publicContent,
  activeMenteeId: "mentee-01",
  attendanceSession: null,
};
