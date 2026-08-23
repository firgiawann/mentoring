# Desain UX Beranda Mentee

## Tujuan

Membuat beranda mentee lebih mudah dipahami dan lebih interaktif untuk mahasiswa baru. Pengguna harus mengetahui kondisi belajarnya, langkah terdekat yang dapat dilakukan, serta cara berpindah ke materi, jadwal, presensi, dan notifikasi tanpa harus memahami struktur aplikasi terlebih dahulu.

## Pendekatan

Beranda menggunakan pendekatan **task-first guided dashboard**. Informasi statistik tetap tersedia, tetapi prioritas pertama adalah sapaan, check-in kondisi, dan daftar langkah hari ini. Neo-brutalism dipertahankan melalui garis tebal, warna kontras, dan bayangan keras dengan susunan yang lebih tenang.

Pendekatan gamifikasi penuh tidak digunakan pada tahap ini karena kuis, poin, dan ranking belum menjadi bagian prototipe. Pendekatan dashboard statistik murni juga tidak digunakan karena kurang memberi arahan bagi mahasiswa baru.

## Ruang Lingkup

Tahap ini hanya mengubah:

- bagian ringkasan atau beranda dashboard mentee;
- navigasi desktop dan mobile;
- interaksi ringan yang berdiri sendiri pada beranda.

Tahap ini tidak mengubah alur materi, presensi, jadwal, autentikasi, penyimpanan data, atau panel mentor.

## Pengalaman Beranda

### Sapaan dan check-in

Bagian teratas menyapa mentee dengan bahasa sederhana dan menanyakan kondisinya. Mentee dapat memilih satu dari tiga keadaan: siap, santai, atau butuh bantuan. Pilihan menampilkan respons singkat yang relevan dan dapat diganti kapan saja selama halaman terbuka.

### Fokus hari ini

Beranda menampilkan tiga langkah yang berasal dari data prototipe yang sudah tersedia:

1. membuka materi berikutnya;
2. mengecek agenda pertemuan;
3. membuka presensi ketika sesi tersedia.

Setiap langkah memiliki tujuan yang jelas dan tautan menuju bagian terkait. Daftar ini bukan pengganti progres materi dan tidak menulis data baru ke penyimpanan.

### Ringkasan progres

Kartu progres dan pertemuan berikutnya tetap ditampilkan, tetapi teksnya dibuat lebih langsung. Kartu presensi cepat menjadi salah satu aksi yang mudah ditemukan, bukan sekadar informasi teknis.

### Panduan pengguna baru

Beranda menyediakan panel singkat “Mulai dari sini” yang menjelaskan urutan dasar penggunaan: baca ringkasan, ikuti mentoring, lalu catat progres. Panel dapat ditutup dan dibuka kembali pada sesi halaman yang sama.

## Navigasi

Navigasi desktop tetap menggunakan sidebar dengan label yang lebih akrab dan indikator tujuan yang jelas.

Pada ponsel:

- tombol menu membuka panel navigasi nyata;
- panel dapat ditutup melalui tombol tutup, memilih tautan, atau menekan area di luar panel;
- status buka/tutup dapat dipahami pembaca layar;
- navigasi bawah tetap menyediakan jalan cepat ke bagian utama;
- notifikasi menjadi tujuan navigasi yang dapat dipilih.

## Komponen

- `DashboardOverview` mengatur sapaan, check-in, fokus hari ini, progres, dan panduan awal.
- `MenteeShell` mengatur struktur halaman dan status menu mobile.
- Data progres, pertemuan, serta sesi presensi tetap berasal dari prototype store yang ada.
- State check-in, panel panduan, dan menu mobile bersifat lokal karena belum menjadi data domain.

## Umpan Balik dan Kondisi Khusus

- Setiap tombol menampilkan perubahan visual dan teks setelah dipilih.
- Jika jadwal belum tersedia, aksi agenda tetap menjelaskan bahwa jadwal menyusul.
- Jika presensi belum aktif, pengguna diarahkan ke bagian presensi untuk melihat statusnya, bukan diberi tombol mati tanpa penjelasan.
- Fokus keyboard terlihat jelas dan target sentuh dirancang minimal nyaman untuk ponsel.

## Pengujian

- Pengujian komponen memastikan check-in memberi respons yang sesuai.
- Pengujian memastikan panduan dapat ditutup dan dibuka kembali.
- Pengujian memastikan langkah hari ini memiliki tujuan navigasi yang benar.
- Pengujian shell memastikan menu mobile dapat dibuka dan ditutup.
- Seluruh test suite, TypeScript, lint, dan build produksi dijalankan.
- Tampilan desktop dan ponsel diperiksa untuk overflow serta keterbacaan.

## Kriteria Selesai

- Mentee langsung melihat apa yang dapat dilakukan hari ini.
- Beranda mempunyai sedikitnya dua interaksi bermakna selain navigasi biasa.
- Menu mobile tidak lagi menjadi tombol dekoratif.
- Semua fitur dashboard lama tetap dapat dijangkau.
- Tidak ada perubahan pada data domain atau panel mentor.
