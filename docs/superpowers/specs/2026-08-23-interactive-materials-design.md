# Desain Sistem Materi Interaktif

## Tujuan

Mengubah 14 bab Modul Pembekalan Mahasiswa JTIK 2026 menjadi pengalaman belajar web yang ringkas, bertahap, dan interaktif. Setiap materi dapat memakai susunan konten dan aktivitas berbeda sesuai kebutuhan, tanpa memaksakan mini-game pada topik yang tidak relevan.

## Keputusan Utama

- Terdapat 14 materi yang berasal dari modul resmi.
- Jumlah pertemuan belum ditentukan dan tidak menjadi target materi.
- Materi dan pertemuan mempunyai relasi banyak-ke-banyak yang opsional.
- Materi tetap dapat dibaca meskipun belum dihubungkan ke pertemuan.
- PDF asli tetap menjadi referensi; web menjadi pengalaman belajar utama.
- Versi prototipe menyimpan hasil interaksi secara lokal selama halaman terbuka.

## Pendekatan Arsitektur

Materi dibentuk dari blok konten terurut. Renderer memilih komponen berdasarkan tipe blok, sehingga satu materi dapat berisi fakta unik dan tautan, sedangkan materi lain dapat memakai simulasi, checklist, refleksi, atau mini-kuis.

Pendekatan ini dipilih dibanding halaman statis seragam karena lebih interaktif, dan dibanding membuat komponen khusus per bab karena lebih mudah dikelola serta dikembangkan melalui panel mentor pada versi berikutnya.

## Tipe Blok Prototipe

- `intro`: pengantar dan tujuan belajar.
- `key_points`: daftar poin utama.
- `fact`: fakta unik dengan label sumber.
- `link`: tautan akses dengan domain dan tanggal pemeriksaan.
- `checklist`: daftar yang dapat ditandai mentee.
- `reflection`: isian refleksi privat dan tidak dinilai.
- `scenario`: pertanyaan berbasis situasi dengan beberapa pilihan dan umpan balik.
- `true_false`: mini-game benar atau salah dengan penjelasan.
- `ordering`: menyusun langkah ke urutan yang tepat.
- `resource`: informasi bantuan atau pelaporan resmi.

## Struktur Data

`Material` tetap menyimpan metadata kartu. Konten detail disimpan pada `MaterialExperience` dengan bentuk:

- `materialId`;
- `sourcePages`;
- `readTimeMinutes`;
- `objectives`;
- `blocks`;
- `completionPolicy`;
- `sensitivity`;
- `lastReviewedAt`.

`completionPolicy` menentukan apakah materi cukup dibaca, membutuhkan aktivitas, atau masih harus diverifikasi mentor. Relasi ke pertemuan tidak disimpan pada konten materi dan tidak diwajibkan.

## Pengalaman Mentee

1. Mentee memilih kartu materi.
2. Sistem membuka panel detail berlabel jelas tanpa meninggalkan dashboard.
3. Panel menampilkan progres bagian, estimasi baca, sumber halaman PDF, dan tujuan belajar.
4. Blok ditampilkan berurutan dengan interaksi yang sesuai.
5. Aktivitas memberi umpan balik langsung tanpa menghukum kesalahan.
6. Mentee dapat menutup panel dan kembali ke daftar.
7. Tombol selesai memakai alur verifikasi progres yang sudah ada.

## Pemetaan Aktivitas

1. Panduan Mentoring: skenario izin, keterlambatan, daring, dan luring.
2. Norma dan Etika: simulator memilih susunan pesan kepada dosen.
3. Fasilitas dan Laboratorium: benar/salah tentang penggunaan fasilitas.
4. Kehidupan Kampus Positif: checklist kebiasaan dan manajemen waktu.
5. Kesehatan Mental: check-in dan refleksi privat tanpa skor.
6. Bullying dan Kekerasan: skenario tindakan aman serta sumber bantuan.
7. Lembaga dan UKM: eksplorasi minat melalui checklist.
8. MBKM: pemeriksaan kesiapan dan tautan informasi.
9. Beasiswa dan Lomba: checklist persiapan dan tautan resmi bertanggal.
10. Sistem Informasi JTIK: mencocokkan kebutuhan dengan sistem melalui skenario.
11. Nilai Spiritual: refleksi nilai pribadi yang tidak dikirim otomatis.
12. Tugas Akhir: mini-game mengurutkan tahapan umum.
13. Plagiarisme dan AI: klasifikasi penggunaan AI yang etis.
14. Konsultasi dengan PA: simulator persiapan dan komunikasi konsultasi.

## Topik Sensitif

- Kesehatan mental, bullying, kekerasan, dan nilai spiritual tidak memakai ranking, streak, atau podium.
- Refleksi tidak dianggap terkirim kepada mentor.
- Materi bantuan menggunakan bahasa suportif, tidak menyalahkan korban, dan menyarankan saluran resmi.
- Prototipe memberi label bahwa tautan resmi perlu diverifikasi sebelum produksi.

## Panel Mentor

Tahap ini hanya menampilkan katalog tipe interaksi pada panel pengelolaan materi. Editor blok lengkap, unggah PDF, perubahan tautan, dan analitik jawaban menjadi fase terpisah setelah integrasi Supabase.

## Perubahan Dokumen Produk

`PLAN.md` harus diubah agar tidak lagi menyatakan minimal 10 pertemuan. Jumlah pertemuan bersifat fleksibel dan ditetapkan mentor kemudian. Contoh data pertemuan pada prototipe tidak dianggap sebagai target program.

## Pengujian

- Setiap tipe blok interaktif utama mempunyai pengujian perilaku.
- Kartu materi membuka panel detail yang sesuai.
- Panel dapat ditutup dan mengembalikan fokus ke tombol pembuka.
- Skenario memberi umpan balik berdasarkan pilihan.
- Refleksi menjelaskan bahwa jawaban bersifat privat.
- Tautan menampilkan domain dan tanggal pemeriksaan.
- Materi sensitif tidak menampilkan ranking atau skor.
- Seluruh test suite, TypeScript, lint, build produksi, serta QA desktop/mobile dijalankan.

## Kriteria Selesai

- Seluruh 14 kartu mempunyai detail materi awal.
- Setiap materi mempunyai sedikitnya satu blok khas yang relevan.
- Sedikitnya empat pola interaksi berbeda dapat digunakan ulang.
- Tidak ada klaim bahwa program mempunyai tepat atau minimal 10 pertemuan.
- Tombol detail materi tidak lagi dekoratif.
- Pengalaman detail nyaman digunakan pada ponsel dan desktop.
