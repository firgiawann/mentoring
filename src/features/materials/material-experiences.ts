import type { MaterialExperience } from "@/features/materials/types";

export const materialExperiences: MaterialExperience[] = [
  {
    materialId: "material-01", sourcePages: [1, 6], readTimeMinutes: 8,
    objectives: ["Memahami tujuan mentoring", "Mengetahui hak dan kewajiban mentee"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m1-intro", type: "intro", body: "Mentoring adalah ruang pendampingan untuk membantu mahasiswa baru beradaptasi secara akademik, sosial, dan lingkungan kampus." },
      { id: "m1-points", type: "key_points", title: "Pegangan singkat", items: ["Hadir sesuai kesepakatan", "Aktif bertanya dan berdiskusi", "Sampaikan kendala secara jujur", "Saling menghormati selama kegiatan"] },
      { id: "m1-scenario", type: "scenario", title: "Kalau berhalangan hadir?", prompt: "Kamu mendadak sakit sebelum pertemuan dimulai. Apa tindakan yang paling tepat?", options: [
        { id: "silent", label: "Tidak hadir tanpa kabar", feedback: "Mentor jadi tidak mengetahui kondisimu. Komunikasikan kendala sedini mungkin.", recommended: false },
        { id: "permission", label: "Meminta izin kepada mentor dan menjelaskan kondisi", feedback: "Tepat. Sampaikan izin dengan sopan dan lengkapi bukti jika memang diperlukan.", recommended: true },
        { id: "friend", label: "Hanya memberi tahu teman", feedback: "Teman boleh membantu, tetapi mentor tetap perlu menerima kabar langsung darimu.", recommended: false },
      ] },
    ],
  },
  {
    materialId: "material-02", sourcePages: [7, 16], readTimeMinutes: 12,
    objectives: ["Mengenali etika akademik", "Berkomunikasi secara sopan di kanal digital"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m2-intro", type: "intro", body: "Etika kampus membantu kita menghargai dosen, tenaga kependidikan, teman, fasilitas, dan diri sendiri—baik secara langsung maupun digital." },
      { id: "m2-fact", type: "fact", title: "Jejak digital ikut berbicara", body: "Pesan, unggahan, dan komentar dapat memengaruhi hubungan akademik serta reputasi profesional di masa depan.", sourceLabel: "Modul JTIK 2026, materi Norma dan Etika" },
      { id: "m2-scenario", type: "scenario", title: "Susun sikap sebelum mengirim pesan", prompt: "Kamu perlu menanyakan jadwal pengganti kepada dosen. Pesan mana yang paling tepat?", options: [
        { id: "short", label: "Pak, jadinya kapan?", feedback: "Tujuannya belum jelas dan tidak menyertakan identitas maupun salam.", recommended: false },
        { id: "formal", label: "Salam, perkenalan, tujuan singkat, lalu terima kasih", feedback: "Tepat. Struktur ini sopan, jelas, dan menghargai waktu dosen.", recommended: true },
        { id: "spam", label: "Mengirim pesan berulang sampai dibalas", feedback: "Hindari spam. Beri waktu yang wajar sebelum menindaklanjuti.", recommended: false },
      ] },
    ],
  },
  {
    materialId: "material-03", sourcePages: [17, 25], readTimeMinutes: 10,
    objectives: ["Menggunakan fasilitas dengan tertib", "Menjaga keamanan laboratorium"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m3-intro", type: "intro", body: "Fasilitas kampus adalah ruang bersama. Ketertiban penggunaan menjaga alat tetap aman dan bisa dipakai semua mahasiswa." },
      { id: "m3-tf", type: "true_false", statement: "Peralatan laboratorium boleh dipindahkan tanpa izin selama dikembalikan di hari yang sama.", answer: false, explanation: "Pemindahan atau peminjaman harus mengikuti prosedur dan izin penanggung jawab laboratorium." },
    ],
  },
  {
    materialId: "material-04", sourcePages: [26, 38], readTimeMinutes: 12,
    objectives: ["Beradaptasi dengan pola belajar mandiri", "Membangun kebiasaan kampus yang sehat"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m4-intro", type: "intro", body: "Kehidupan kampus bukan hanya belajar di kelas. Kamu juga akan berlatih mandiri, bekerja sama, menjaga integritas, dan mengatur waktu." },
      { id: "m4-list", type: "checklist", title: "Kebiasaan yang ingin saya mulai", items: ["Mencatat jadwal kuliah dan tenggat", "Menyiapkan materi sebelum kelas", "Bertanya ketika belum paham", "Menyisihkan waktu istirahat"] },
    ],
  },
  {
    materialId: "material-05", sourcePages: [39, 44], readTimeMinutes: 9,
    objectives: ["Mengenali proses adaptasi", "Mengetahui kapan perlu mencari dukungan"],
    completionPolicy: "read", sensitivity: "private_reflection", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m5-intro", type: "intro", body: "Adaptasi membutuhkan waktu. Merasa bingung, lelah, atau belum menemukan ritme tidak membuatmu gagal sebagai mahasiswa." },
      { id: "m5-reflect", type: "reflection", title: "Check-in pribadi", prompt: "Hal apa yang paling menguras energimu minggu ini, dan dukungan apa yang mungkin membantu?", privacyNote: "Jawaban ini hanya tersimpan selama panel terbuka dan tidak otomatis dikirim kepada mentor." },
      { id: "m5-help", type: "resource", title: "Kamu boleh mencari bantuan", body: "Bicarakan dengan orang tepercaya, mentor, penasihat akademik, atau layanan konseling kampus ketika kesulitan mulai mengganggu aktivitas sehari-hari." },
    ],
  },
  {
    materialId: "material-06", sourcePages: [45, 73], readTimeMinutes: 16,
    objectives: ["Mengenali bentuk bullying dan kekerasan", "Memilih tindakan aman dan suportif"],
    completionPolicy: "activity", sensitivity: "support", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m6-intro", type: "intro", body: "Bullying dan kekerasan bukan bagian normal dari adaptasi kampus. Korban berhak didengar, dilindungi, dan mendapat pendampingan." },
      { id: "m6-scenario", type: "scenario", title: "Saat teman bercerita", prompt: "Seorang teman mengatakan ia mengalami pelecehan. Respons awal yang paling aman adalah…", options: [
        { id: "blame", label: "Menanyakan mengapa ia tidak melawan", feedback: "Pertanyaan ini dapat terasa menyalahkan korban. Dengarkan tanpa menghakimi.", recommended: false },
        { id: "listen", label: "Mendengarkan, menjaga privasi, dan menawarkan bantuan", feedback: "Tepat. Hargai pilihan korban dan bantu mencari layanan resmi bila ia menginginkannya.", recommended: true },
        { id: "post", label: "Mengunggah ceritanya agar viral", feedback: "Jangan menyebarkan identitas atau cerita tanpa persetujuan korban.", recommended: false },
      ] },
      { id: "m6-help", type: "resource", title: "Gunakan saluran resmi", body: "Pada versi produksi, bagian ini harus berisi kontak bantuan kampus yang sudah diverifikasi mentor. Dalam keadaan darurat, prioritaskan keselamatan dan hubungi layanan darurat setempat." },
    ],
  },
  {
    materialId: "material-07", sourcePages: [74, 93], readTimeMinutes: 14,
    objectives: ["Mengenali ruang organisasi mahasiswa", "Memilih kegiatan sesuai minat dan kapasitas"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m7-intro", type: "intro", body: "Organisasi dan UKM dapat menjadi ruang belajar kepemimpinan, kerja tim, komunikasi, kreativitas, dan pengabdian." },
      { id: "m7-fact", type: "fact", title: "Aktif tidak berarti ikut semuanya", body: "Kegiatan yang tepat adalah yang sesuai minat, tujuan belajar, dan waktu yang sanggup kamu kelola.", sourceLabel: "Ringkasan Modul JTIK 2026" },
      { id: "m7-check", type: "checklist", title: "Bidang yang ingin saya eksplorasi", items: ["Kepemimpinan dan organisasi", "Olahraga atau seni", "Teknologi dan riset", "Jurnalistik dan komunikasi", "Sosial dan pengabdian"] },
    ],
  },
  {
    materialId: "material-08", sourcePages: [94, 100], readTimeMinutes: 9,
    objectives: ["Memahami gambaran program MBKM", "Mengenali kesiapan yang perlu dibangun"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m8-intro", type: "intro", body: "Program pembelajaran di luar kelas memberi kesempatan mengembangkan pengalaman melalui magang, mengajar, riset, kewirausahaan, atau pengabdian." },
      { id: "m8-check", type: "checklist", title: "Bekal yang bisa disiapkan sejak awal", items: ["Menjaga perkembangan akademik", "Mencatat pengalaman dan prestasi", "Melatih komunikasi dan kerja tim", "Mengikuti informasi dari kanal resmi"] },
      { id: "m8-link", type: "link", title: "Portal program", description: "Gunakan sebagai pintu awal dan cek kembali ketentuan tahun berjalan.", href: "https://kampusmerdeka.kemdikbud.go.id/", domain: "kampusmerdeka.kemdikbud.go.id", reviewedAt: "Perlu verifikasi sebelum produksi" },
    ],
  },
  {
    materialId: "material-09", sourcePages: [101, 123], readTimeMinutes: 15,
    objectives: ["Mengenali jenis peluang", "Menyiapkan dokumen dan rekam prestasi"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m9-intro", type: "intro", body: "Beasiswa dan lomba memiliki persyaratan berbeda. Kebiasaan menyimpan dokumen serta memantau kanal resmi akan membuatmu lebih siap." },
      { id: "m9-check", type: "checklist", title: "Folder persiapan peluang", items: ["Identitas dan dokumen akademik", "Sertifikat serta portofolio", "CV singkat yang diperbarui", "Daftar tenggat dan tautan resmi"] },
      { id: "m9-link", type: "link", title: "Beasiswa Unggulan", description: "Informasi dapat berubah; selalu cek pedoman tahun pendaftaran.", href: "https://beasiswaunggulan.kemdikbud.go.id/", domain: "beasiswaunggulan.kemdikbud.go.id", reviewedAt: "Perlu verifikasi sebelum produksi" },
    ],
  },
  {
    materialId: "material-10", sourcePages: [124, 133], readTimeMinutes: 10,
    objectives: ["Mengetahui fungsi sistem kampus", "Memilih kanal sesuai kebutuhan"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m10-intro", type: "intro", body: "Sistem akademik dan kemahasiswaan memiliki fungsi berbeda, mulai dari KRS dan nilai hingga pencatatan kegiatan serta prestasi." },
      { id: "m10-scenario", type: "scenario", title: "Pilih sistem yang tepat", prompt: "Kamu ingin mengisi KRS dan memeriksa jadwal kuliah. Sistem mana yang perlu dibuka?", options: [
        { id: "siakad", label: "SIAKAD/SIA", feedback: "Tepat. Sistem akademik digunakan untuk KRS, jadwal, dan informasi studi.", recommended: true },
        { id: "simlab", label: "SIM LAB", feedback: "SIM LAB berfokus pada inventaris dan administrasi fasilitas laboratorium.", recommended: false },
        { id: "ids", label: "IDS JTIK", feedback: "IDS JTIK digunakan untuk rekam kegiatan dan prestasi mahasiswa.", recommended: false },
      ] },
      { id: "m10-link", type: "link", title: "Portal SIAKAD UNM", description: "Gunakan akun kampus dan jangan membagikan kredensial.", href: "https://siakad.unm.ac.id/", domain: "siakad.unm.ac.id", reviewedAt: "Perlu verifikasi sebelum produksi" },
    ],
  },
  {
    materialId: "material-11", sourcePages: [134, 154], readTimeMinutes: 15,
    objectives: ["Mengenali nilai yang menjadi pegangan", "Menghubungkan nilai dengan tindakan sehari-hari"],
    completionPolicy: "read", sensitivity: "private_reflection", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m11-intro", type: "intro", body: "Nilai spiritual dipahami sebagai ruang makna, kejujuran, penerimaan diri, rasa syukur, dan karakter—dengan menghormati keberagaman latar belakang." },
      { id: "m11-reflect", type: "reflection", title: "Kompas pribadi", prompt: "Nilai apa yang ingin kamu pegang ketika menghadapi pilihan sulit di kampus?", privacyNote: "Refleksi ini bersifat pribadi, tidak dinilai, dan tidak otomatis dikirim kepada mentor." },
    ],
  },
  {
    materialId: "material-12", sourcePages: [155, 160], readTimeMinutes: 8,
    objectives: ["Mendapat gambaran perjalanan tugas akhir", "Mengenali pentingnya administrasi dan bimbingan"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m12-intro", type: "intro", body: "Materi ini bukan tuntutan untuk mahasiswa baru, melainkan peta awal agar kamu memahami bahwa tugas akhir berjalan bertahap dan membutuhkan bimbingan." },
      { id: "m12-order", type: "ordering", title: "Susun gambaran tahapannya", items: [
        { id: "proposal", label: "Seminar proposal", order: 1 }, { id: "research", label: "Pelaksanaan penelitian", order: 2 }, { id: "result", label: "Seminar hasil", order: 3 }, { id: "final", label: "Ujian tutup", order: 4 },
      ] },
    ],
  },
  {
    materialId: "material-13", sourcePages: [161, 174], readTimeMinutes: 12,
    objectives: ["Membedakan bantuan dan penggantian proses berpikir", "Memeriksa keluaran AI secara kritis"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m13-intro", type: "intro", body: "AI dapat membantu belajar, tetapi tanggung jawab atas kebenaran, sitasi, dan kejujuran karya tetap berada pada mahasiswa." },
      { id: "m13-tf", type: "true_false", statement: "Menyalin jawaban AI tanpa memeriksa sumber dan menyerahkannya sebagai karya sendiri adalah penggunaan yang etis.", answer: false, explanation: "AI sebaiknya menjadi alat bantu. Verifikasi informasi, olah dengan pemahaman sendiri, dan ikuti aturan tugas serta sitasi yang berlaku." },
      { id: "m13-scenario", type: "scenario", title: "AI sebagai alat bantu", prompt: "Penggunaan mana yang paling bertanggung jawab?", options: [
        { id: "submit", label: "Mengumpulkan hasil AI tanpa dibaca", feedback: "Ini menghilangkan proses belajar dan berisiko memuat informasi keliru.", recommended: false },
        { id: "review", label: "Memakai AI untuk ide awal lalu memeriksa sumber dan menulis sendiri", feedback: "Tepat. Kamu tetap berpikir, memverifikasi, dan bertanggung jawab atas hasil akhir.", recommended: true },
      ] },
    ],
  },
  {
    materialId: "material-14", sourcePages: [175, 182], readTimeMinutes: 9,
    objectives: ["Mempersiapkan konsultasi dengan PA", "Menindaklanjuti hasil konsultasi"],
    completionPolicy: "activity", sensitivity: "standard", lastReviewedAt: "2026-08-23",
    blocks: [
      { id: "m14-intro", type: "intro", body: "Penasihat Akademik membantu perencanaan studi, evaluasi hasil, dan pembahasan kendala akademik. Konsultasi akan lebih efektif jika dipersiapkan." },
      { id: "m14-check", type: "checklist", title: "Sebelum konsultasi", items: ["Tentukan tujuan konsultasi", "Siapkan KRS/KHS atau dokumen terkait", "Catat pertanyaan utama", "Tuliskan tindak lanjut setelah konsultasi"] },
      { id: "m14-scenario", type: "scenario", title: "Menghubungi PA", prompt: "Apa yang sebaiknya ada dalam pesan permohonan konsultasi?", options: [
        { id: "complete", label: "Salam, identitas, tujuan, pilihan waktu, dan terima kasih", feedback: "Tepat. Pesan menjadi jelas dan memudahkan PA memberi respons.", recommended: true },
        { id: "empty", label: "P tanpa identitas", feedback: "Pesan ini tidak memberi konteks. Perkenalkan diri dan sampaikan tujuan dengan jelas.", recommended: false },
      ] },
    ],
  },
];

export function getMaterialExperience(materialId: string) {
  return materialExperiences.find((item) => item.materialId === materialId);
}
