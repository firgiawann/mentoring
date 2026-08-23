# PTIK D1 2026 Mentoring Platform

> Status: Draft untuk ditinjau
> 
> Dokumen ini mendefinisikan arah produk, ruang lingkup, arsitektur, dan tahapan pengembangan. Dokumen ini belum merupakan implementation plan tingkat tugas/kode.

## 1. Latar Belakang

Platform ini dibuat sebagai bentuk dedikasi, antusiasme, dan inisiatif mentor PTIK D1 2026 untuk membantu kegiatan mentoring menjadi lebih terstruktur dan terdokumentasi.

Platform dipakai untuk:

- mencatat kegiatan mentoring;
- menyediakan ringkasan materi yang dapat dibaca mentee lebih awal;
- melacak progres materi;
- mencatat dan merekap kehadiran;
- memberi setiap mentee akses melalui akun pribadi;
- menyediakan panel mentor untuk mengelola seluruh kegiatan;
- menjadi fondasi kuis tugas, kuis live, podium, ranking, dan gamifikasi pada fase berikutnya.

## 2. Tujuan Produk

### Tujuan utama

1. Mentor mempunyai satu pusat pengelolaan kegiatan PTIK D1 2026.
2. Mentee dapat mengetahui jadwal, materi, progres, dan kehadirannya secara mandiri.
3. Riwayat mentoring tersimpan secara rapi dan dapat diekspor.
4. Platform mudah digunakan melalui ponsel maupun desktop.
5. Biaya awal gratis atau serendah mungkin.

### Indikator keberhasilan MVP

- Mentor dapat mengelola 10 mentee dengan batas rancangan maksimal 15 mentee.
- Mentee dapat mendaftar, disetujui mentor, kemudian mengakses dashboard masing-masing.
- Sekitar 14 materi dapat diterbitkan, dijadwalkan, dibaca, dan dilacak progresnya.
- Pertemuan dapat dijadwalkan dan didokumentasikan secara fleksibel sesuai kebutuhan mentor.
- Kehadiran dapat dicatat menggunakan QR dinamis.
- Mentor dapat melihat statistik serta mengekspor data CSV/Excel.
- Semua fitur inti nyaman digunakan pada ponsel.

## 3. Batas Cakupan

Platform MVP dibuat khusus untuk satu kelompok, yaitu **PTIK D1 2026**. Dukungan banyak angkatan, banyak kelas, atau banyak mentor belum menjadi bagian MVP.

Tidak ada tenggat pengembangan yang kaku. Kualitas dan kelengkapan diprioritaskan, tetapi pengerjaan tetap dibatasi melalui fase agar scope tidak terus melebar.

## 4. Pengguna dan Hak Akses

### 4.1 Pengunjung publik

Pengunjung tanpa akun dapat melihat konten yang secara eksplisit ditandai publik:

- landing page;
- informasi program mentoring;
- agenda pilihan;
- dokumentasi pilihan;
- pengumuman umum;
- materi pilihan.

Pengunjung tidak dapat melihat data akun, progres, presensi, atau catatan internal.

### 4.2 Mentee

Mentee dapat:

- mendaftar menggunakan email dan password;
- melihat status persetujuan akun;
- mengakses dashboard setelah disetujui mentor;
- melihat jadwal dan materi;
- membaca ringkasan materi mendatang;
- membaca isi lengkap materi yang sudah dibuka;
- menandai materi selesai;
- melihat status verifikasi progres;
- memindai QR presensi;
- melihat riwayat kehadiran;
- melihat notifikasi dalam web;
- mengelola profil pribadi sesuai batas yang ditentukan.

### 4.3 Mentor

Mentor mempunyai panel dan menu terpisah pada area `/mentor`.

Mentor dapat:

- melihat statistik keseluruhan;
- menyetujui, menolak, menonaktifkan, mengedit, dan menghapus akun;
- menetapkan password baru bagi mentee;
- mengelola materi dan visibilitas konten;
- mengelola jadwal dan catatan pertemuan;
- menghubungkan materi dengan pertemuan;
- membuka dan menutup sesi presensi;
- menampilkan QR dinamis;
- mengoreksi status kehadiran;
- memverifikasi progres materi;
- mengelola landing page dan konten publik;
- mengekspor laporan CSV/Excel.

Mengetahui URL panel mentor tidak memberikan akses. Izin diperiksa pada aplikasi dan database.

## 5. Ruang Lingkup Fase

### Fase 1 — Fondasi/MVP

- landing page publik;
- autentikasi dan persetujuan akun;
- dashboard mentee;
- panel mentor;
- profil pengguna;
- materi dan ringkasan;
- checklist serta verifikasi progres;
- jadwal pertemuan;
- catatan kegiatan mentoring;
- presensi QR dinamis;
- riwayat dan statistik;
- notifikasi dalam web;
- ekspor CSV/Excel;
- PWA dan desain responsif.

### Fase 2 — Kuis tugas

- bank soal;
- pembuat kuis;
- pilihan ganda dan tipe soal tambahan;
- tenggat pengerjaan;
- percobaan pengerjaan;
- penilaian otomatis/manual;
- hasil dan pembahasan;
- riwayat kuis tugas.

### Fase 3 — Kuis live

- sesi kuis serentak;
- kode masuk sesi;
- ruang tunggu;
- timer soal;
- sinkronisasi realtime;
- skor dan kecepatan jawaban;
- podium;
- ranking;
- riwayat sesi dan hasil peserta.

### Fase 4 — Gamifikasi

- poin;
- badge;
- streak;
- tantangan;
- permainan belajar tambahan;
- statistik perkembangan yang lebih mendalam.

## 6. Alur Akun

### 6.1 Pendaftaran

1. Mentee mengisi nama lengkap, NIM, email, password, dan avatar opsional.
2. Email dan NIM harus unik.
3. Akun dibuat dengan status `pending`.
4. Mentee belum dapat mengakses area privat.
5. Mentor meninjau akun dari panel.
6. Mentor menyetujui atau menolak akun.
7. Akun berstatus `approved` dapat masuk ke dashboard.

Pendaftaran bersifat terbuka tanpa kode kelas. Perlindungan yang disiapkan:

- pembatasan percobaan/rate limiting;
- validasi input;
- proteksi bot/CAPTCHA jika diperlukan;
- pesan kesalahan yang tidak membocorkan akun terdaftar.

### 6.2 Status akun

- `pending`: menunggu persetujuan;
- `approved`: aktif dan dapat memakai sistem;
- `rejected`: ditolak;
- `suspended`: dinonaktifkan sementara.

### 6.3 Password

- Password lama tidak pernah dapat dilihat oleh mentor.
- Mentor dapat menetapkan password baru.
- Password baru tidak wajib diganti oleh mentee pada login berikutnya.
- Password disimpan oleh penyedia autentikasi dalam bentuk aman, bukan teks biasa.
- Perubahan password sebaiknya mengakhiri sesi lama.

## 7. Profil Mentee

Data profil yang disimpan:

- nama lengkap;
- email;
- NIM;
- foto/avatar;
- status akun;
- peran pengguna;
- waktu pendaftaran dan pembaruan.

Nomor WhatsApp, alamat, tanggal lahir, dan biodata sensitif lain tidak disimpan pada MVP.

## 8. Landing Page dan Konten Publik

Landing page menggunakan format publik yang lengkap dan dapat berisi:

- hero dan identitas PTIK D1 2026;
- tujuan program mentoring;
- ringkasan kegiatan;
- agenda;
- dokumentasi;
- materi pilihan;
- pengumuman;
- tombol login dan daftar.

Setiap konten memiliki visibilitas:

- `draft`: hanya terlihat mentor;
- `mentee`: hanya terlihat pengguna yang telah disetujui;
- `public`: dapat dilihat semua pengunjung.

Mentor menentukan visibilitas masing-masing konten.

## 9. Dashboard Mentee

Dashboard menampilkan ringkasan berikut dalam satu halaman:

- pertemuan berikutnya;
- materi terbaru;
- materi mendatang;
- progres keseluruhan;
- materi yang menunggu verifikasi;
- rekap kehadiran;
- notifikasi belum dibaca;
- tombol presensi saat sesi aktif.

Dashboard memakai tampilan kartu neo-brutalism yang tetap ringkas pada layar ponsel.

## 10. Materi dan Progres

### 10.1 Struktur materi

Setiap materi memiliki:

- judul;
- slug;
- ringkasan;
- isi lengkap berbasis rich text;
- cover/gambar;
- lampiran file dan tautan;
- urutan;
- status publikasi;
- visibilitas;
- waktu pembukaan isi lengkap;
- relasi ke pertemuan.

Target awal adalah sekitar 14 materi.

### 10.2 Akses materi

- Ringkasan materi mendatang selalu dapat dibaca mentee.
- Isi lengkap dibuka berdasarkan jadwal atau tindakan mentor.
- Materi tertentu dapat ditandai publik.
- Materi privat hanya dapat dibaca akun yang sudah disetujui.

### 10.3 Relasi materi dan pertemuan

Relasinya banyak-ke-banyak:

- satu pertemuan dapat membahas beberapa materi;
- satu materi dapat dibahas pada beberapa pertemuan.

### 10.4 Checklist progres

Setiap materi mempunyai satu checklist, bukan checklist per subtopik.

Alur status:

1. `not_started` — belum selesai;
2. `pending_verification` — dicentang mentee dan menunggu mentor;
3. `verified` — disetujui mentor.

Mentor dapat memverifikasi, mengembalikan ke status sebelumnya, atau mengoreksi status.

## 11. Jadwal dan Catatan Pertemuan

### 11.1 Jadwal

- Jadwal utama dapat dibuat berulang setiap minggu.
- Setiap kejadian/pertemuan dapat diedit tanpa mengubah seluruh rangkaian.
- Mentor dapat mengubah tanggal, waktu, topik, status, atau membatalkan pertemuan tertentu.
- Jumlah pertemuan belum ditetapkan dan dapat berkembang sesuai kebutuhan program.

### 11.2 Isi pertemuan

Kolom bawaan:

- judul/topik;
- tanggal dan waktu;
- agenda;
- materi terkait;
- catatan mentor;
- presensi;
- dokumentasi/file/tautan;
- status pertemuan.

Kolom dapat digunakan secara fleksibel dan mentor dapat menambahkan bagian catatan sesuai kebutuhan.

## 12. Presensi QR Dinamis

### 12.1 Alur mentor

1. Mentor memilih pertemuan.
2. Mentor membuka sesi presensi.
3. Sistem menampilkan QR dinamis.
4. Isi QR berubah secara berkala dan berlaku singkat.
5. Mentor memilih durasi sesi selama 30, 45, atau 60 menit.
6. Sesi otomatis kedaluwarsa setelah durasi yang dipilih, atau dapat ditutup lebih awal oleh mentor.
7. Mentor memeriksa dan mengoreksi hasil bila diperlukan.

### 12.2 Alur mentee

1. Mentee login melalui ponsel.
2. Mentee membuka pemindai QR.
3. Kamera memindai QR aktif.
4. Server memvalidasi token, sesi, akun, dan waktu berlaku.
5. Sistem mencatat satu hasil presensi untuk mentee tersebut.
6. Mentee melihat konfirmasi keberhasilan atau alasan kegagalan.

### 12.3 Aturan keamanan

- Token QR ditandatangani server.
- Token QR visual hanya berlaku singkat dan terus berotasi selama sesi.
- Sesi presensi berlaku selama 30, 45, atau 60 menit sesuai pilihan mentor.
- Token terikat ke satu sesi pertemuan.
- Satu mentee hanya mempunyai satu catatan per sesi.
- Pemindaian ulang tidak membuat duplikasi.
- Lokasi perangkat tidak dikumpulkan.
- Mentor tetap menjadi pemeriksa akhir.

### 12.4 Status kehadiran

- hadir;
- terlambat;
- izin;
- sakit;
- alpa.

Mentor dapat menambahkan catatan pada status kehadiran.

## 13. Notifikasi

MVP hanya menggunakan notifikasi di dalam web.

Contoh notifikasi:

- akun disetujui atau ditolak;
- materi baru diterbitkan;
- isi lengkap materi dibuka;
- progres diverifikasi atau dikembalikan;
- jadwal berubah;
- sesi presensi dibuka;
- status presensi dikoreksi.

Notifikasi memiliki status dibaca/belum dibaca. Integrasi email dan WhatsApp tidak termasuk MVP.

## 14. Statistik dan Ekspor

Panel mentor menampilkan:

- jumlah akun berdasarkan status;
- kehadiran per pertemuan;
- rekap kehadiran per mentee;
- progres materi per mentee;
- progres keseluruhan materi;
- materi yang menunggu verifikasi;
- aktivitas terbaru.

Data dapat diekspor menjadi CSV/Excel:

- daftar mentee;
- rekap presensi;
- progres materi;
- ringkasan kegiatan pertemuan.

Laporan PDF siap cetak belum menjadi bagian MVP.

## 15. Arsitektur Teknis

### 15.1 Stack utama

- **Framework:** Next.js dengan App Router
- **Bahasa:** TypeScript
- **UI:** React dan Tailwind CSS
- **Backend platform:** Supabase
- **Database:** PostgreSQL Supabase
- **Autentikasi:** Supabase Auth
- **File storage:** Supabase Storage
- **Realtime:** Supabase Realtime
- **Hosting:** Vercel
- **Repository:** GitHub
- **Target aplikasi:** responsive web + PWA

### 15.2 Struktur aplikasi

Satu proyek Next.js mempunyai tiga area:

- area publik;
- area mentee;
- panel mentor pada `/mentor`.

Tidak diperlukan backend repository terpisah. Operasi biasa dapat memakai Supabase dengan Row Level Security, sedangkan operasi sensitif dijalankan melalui kode server Next.js.

### 15.3 GitHub dan Vercel

- GitHub menjadi sumber kode utama.
- Branch utama digunakan untuk production.
- Branch/PR dapat menghasilkan preview deployment.
- Integrasi GitHub–Vercel dilakukan pada tahap deployment, bukan pada awal planning.
- Secret dan credential hanya disimpan sebagai environment variable, tidak dimasukkan ke repository.

## 16. Rancangan Data Awal

Entitas utama:

- `profiles` — profil dan peran pengguna;
- `account_status_history` — riwayat perubahan status akun;
- `materials` — materi dan pengaturan publikasi;
- `material_attachments` — gambar, file, dan tautan materi;
- `material_progress` — progres setiap mentee;
- `meetings` — kejadian pertemuan aktual;
- `recurrence_rules` — aturan jadwal berulang;
- `meeting_materials` — relasi materi dan pertemuan;
- `meeting_sections` — bagian catatan yang dapat disesuaikan;
- `attendance_sessions` — sesi QR aktif;
- `attendance_records` — hasil presensi;
- `notifications` — notifikasi dalam aplikasi;
- `public_content` — bagian landing page dan konten publik;
- `media_assets` — metadata file/dokumentasi;
- `audit_logs` — aktivitas sensitif mentor.

### Relasi penting

- Satu profil dapat mempunyai banyak progres materi.
- Satu materi dapat mempunyai progres dari banyak mentee.
- Materi dan pertemuan terhubung banyak-ke-banyak.
- Satu pertemuan mempunyai maksimal satu sesi presensi aktif pada suatu waktu.
- Satu mentee mempunyai maksimal satu catatan presensi per pertemuan.
- Satu pengguna dapat mempunyai banyak notifikasi.

## 17. Keamanan dan Privasi

### 17.1 Prinsip akses

- Akses ditentukan berdasarkan peran dan status akun.
- Akun `pending`, `rejected`, dan `suspended` tidak dapat membuka data privat.
- Mentee hanya dapat melihat data miliknya sendiri, kecuali konten kelas yang memang dibagikan.
- Operasi mentor diverifikasi ulang di server.
- Row Level Security diterapkan pada tabel yang diakses aplikasi.

### 17.2 Perlindungan data

- Password tidak pernah disimpan di tabel aplikasi.
- Service-role key Supabase hanya tersedia di server.
- File privat memakai bucket privat dan signed URL.
- Input rich text disanitasi untuk mencegah script berbahaya.
- Unggahan dibatasi berdasarkan tipe dan ukuran.
- Perubahan penting mentor dicatat pada audit log aplikasi.

### 17.3 Data minimal

Sistem hanya menyimpan data yang diperlukan untuk mentoring. Lokasi, alamat, tanggal lahir, dan data sensitif lain tidak dikumpulkan.

## 18. Backup dan Pemulihan

Paket gratis Supabase tidak menyediakan backup otomatis. Karena itu MVP perlu prosedur berikut:

- ekspor database secara berkala;
- ekspor CSV/Excel melalui panel untuk data operasional;
- salinan file penting di lokasi terpisah;
- dokumentasi langkah pemulihan;
- opsi peningkatan ke paket berbayar apabila platform menjadi kritis.

Frekuensi backup operasional yang disarankan: mingguan dan setelah perubahan data besar.

## 19. Desain Visual

### 19.1 Arah neo-brutalism

- garis tepi tebal;
- bayangan keras tanpa blur;
- warna kontras dan berani;
- bentuk geometris sederhana;
- tipografi tegas;
- tombol dengan respons tekan yang jelas;
- kartu dan panel yang terasa seperti objek fisik.

### 19.2 Prinsip penggunaan

Neo-brutalism digunakan sebagai identitas visual, bukan alasan mengurangi keterbacaan. Sistem tetap memperhatikan:

- kontras teks;
- ukuran target sentuh;
- hierarki informasi;
- navigasi keyboard;
- label form yang jelas;
- kondisi loading, kosong, sukses, dan gagal;
- desain mobile-first.

Area publik dapat lebih ekspresif. Dashboard mentee dan panel mentor dibuat lebih tenang agar data mudah dipindai.

## 20. PWA

PWA menyediakan:

- manifest dan ikon aplikasi;
- kemampuan dipasang ke home screen;
- tampilan standalone;
- caching kerangka aplikasi dan aset statis;
- halaman offline yang jelas;
- pembaruan service worker yang aman.

Data privat dan presensi tidak dianggap valid dari cache. Presensi QR membutuhkan koneksi ke server.

## 21. Penanganan Kesalahan

### Prinsip umum

- Pesan kesalahan menggunakan bahasa yang mudah dipahami.
- Kesalahan teknis tidak membocorkan credential atau detail server.
- Aksi penting memberikan konfirmasi keberhasilan.
- Form mempertahankan isian ketika terjadi kesalahan yang dapat diperbaiki.
- Operasi yang berpotensi ganda dibuat idempotent bila memungkinkan.

### Contoh kondisi

- akun belum disetujui;
- email atau NIM sudah dipakai;
- sesi presensi belum dibuka atau sudah ditutup;
- QR kedaluwarsa;
- presensi sudah tercatat;
- kamera tidak mendapat izin;
- koneksi terputus;
- unggahan terlalu besar atau tipe file tidak didukung;
- materi belum dibuka;
- pengguna tidak memiliki izin.

## 22. Pengujian

### Unit test

- validasi data;
- transisi status akun dan progres;
- aturan status kehadiran;
- pembuatan dan validasi token QR;
- perhitungan statistik.

### Integration test

- pendaftaran dan persetujuan akun;
- otorisasi mentor/mentee;
- penerbitan materi;
- perubahan progres;
- pembuatan jadwal berulang;
- pencatatan presensi;
- ekspor data.

### End-to-end test

- pengunjung mendaftar menjadi mentee;
- mentor menyetujui akun;
- mentee membaca dan menyelesaikan materi;
- mentor memverifikasi progres;
- mentor membuka QR;
- mentee melakukan presensi;
- mentor mengoreksi dan mengekspor hasil.

### Pemeriksaan tambahan

- responsif pada ponsel, tablet, dan desktop;
- aksesibilitas dasar;
- keamanan Row Level Security;
- PWA dan kondisi offline;
- browser modern utama.

## 23. Tahapan Implementasi Tingkat Tinggi

Urutan ini belum memuat rincian file atau tugas coding.

1. Fondasi repository dan kualitas kode.
2. Design system neo-brutalism.
3. Konfigurasi Supabase dan model data.
4. Autentikasi, profil, dan persetujuan akun.
5. Area publik dan landing page.
6. Dashboard serta navigasi mentee.
7. Materi, rich text, file, dan progres.
8. Jadwal berulang dan catatan pertemuan.
9. Presensi QR dinamis.
10. Notifikasi dalam web.
11. Statistik dan ekspor CSV/Excel.
12. PWA, aksesibilitas, keamanan, dan pengujian.
13. Persiapan GitHub dan deployment Vercel.
14. Dokumentasi operasional dan backup.

## 24. Hal yang Tidak Masuk MVP

- banyak angkatan atau kelompok;
- banyak mentor dengan peran berbeda;
- notifikasi email atau WhatsApp;
- pelacakan lokasi;
- laporan PDF;
- kuis tugas;
- kuis live;
- kode masuk kuis;
- podium dan ranking;
- badge, poin, streak, dan permainan;
- aplikasi Android/iOS native.

## 25. Risiko dan Mitigasi

### Scope melebar

Mitigasi: selesaikan Fase 1 sebelum fitur kuis dan gamifikasi.

### Penyalahgunaan pendaftaran terbuka

Mitigasi: status pending, rate limiting, validasi unik, dan CAPTCHA bila dibutuhkan.

### Titip presensi

Mitigasi: QR berubah cepat, token singkat, validasi akun, satu catatan per sesi, dan koreksi mentor.

### Proyek Supabase gratis dijeda

Mitigasi: pemeriksaan rutin, dokumentasi aktivasi kembali, dan upgrade bila penggunaan menjadi kritis.

### Tidak ada backup otomatis pada paket gratis

Mitigasi: backup mingguan, ekspor data, dan salinan file penting.

### Tampilan neo-brutalism terlalu ramai

Mitigasi: area data memakai palet lebih terkendali dan hierarki visual yang konsisten.

## 26. Keputusan yang Sudah Disetujui

- MVP khusus PTIK D1 2026.
- Pendaftaran email/password dan persetujuan mentor.
- Pendaftaran terbuka tanpa kode kelas.
- Login tunggal dengan panel mentor terpisah.
- Mentee menandai progres dan mentor memverifikasi.
- Ringkasan materi mendatang dapat dibaca lebih awal.
- Presensi QR dinamis tanpa lokasi.
- Status hadir, terlambat, izin, sakit, dan alpa.
- Jadwal mingguan berulang dan dapat diedit per pertemuan.
- Catatan pertemuan lengkap dan fleksibel.
- Dashboard mentee berupa ringkasan lengkap.
- Notifikasi hanya di dalam web.
- Statistik dan ekspor CSV/Excel.
- Mentor dapat menetapkan password baru tanpa wajib diganti.
- Profil dasar: nama, email, NIM, avatar, dan status.
- Biaya awal gratis atau serendah mungkin.
- Jumlah pengguna 10 mentee, maksimal sekitar 15.
- Next.js/TypeScript.
- Responsive web + PWA.
- Sekitar 14 materi dengan jumlah pertemuan yang fleksibel.
- Materi dan pertemuan terhubung banyak-ke-banyak.
- Editor materi berbasis rich text.
- Satu checklist per materi.
- Status progres tiga tahap.
- Landing page publik lengkap.
- Visibilitas konten dikontrol mentor.
- Tidak ada tenggat tetap.
- Supabase sebagai backend platform.
- Vercel sebagai hosting.
- GitHub sebagai repository dan nantinya terintegrasi dengan Vercel.

## 27. Gate Sebelum Implementasi

Sebelum implementation plan dan coding dibuat:

1. Mentor meninjau dokumen ini.
2. Semua koreksi dan tambahan dimasukkan.
3. Dokumen mendapat persetujuan eksplisit.
4. Baru setelah itu dibuat implementation plan rinci berisi urutan tugas, file, pengujian, dan checkpoint.
