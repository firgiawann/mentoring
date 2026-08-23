# PTIK D1 2026 Mentoring — Prototype

Prototype fungsional berfidelitas tinggi untuk memvalidasi pengalaman mentoring PTIK D1 2026 sebelum backend produksi dibangun.

## Yang tersedia

- landing page publik lengkap;
- halaman login dan pendaftaran simulasi;
- dashboard mentee responsif;
- 14 materi modul dan contoh pertemuan yang dapat diatur fleksibel;
- checklist progres dengan antrean verifikasi;
- rekap kehadiran dan notifikasi dalam web;
- panel mentor terpisah;
- persetujuan akun dan verifikasi progres interaktif;
- sesi presensi 30, 45, atau 60 menit;
- QR yang berotasi setiap 15 detik selama sesi aktif;
- ekspor CSV presensi;
- manifest PWA dan ikon lokal.

## Menjalankan

Prasyarat: Node.js 22 atau lebih baru dan pnpm 11.

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:3000`.

## Rute demo

- `/` — landing page publik
- `/login` — login prototype
- `/register` — pendaftaran prototype
- `/dashboard` — pengalaman mentee (Alya Ramadhani)
- `/mentor` — panel mentor

Untuk mencoba presensi lintas halaman, buka panel mentor, pilih durasi, tekan **Buka presensi**, lalu berpindah ke dashboard menggunakan navigasi aplikasi pada tab yang sama.

## Verifikasi

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
```

Build memakai mode Webpack agar kompatibel dengan runtime Node.js bundel pada workspace Windows ini.

## Batas prototype

- Data disimpan pada state lokal dan kembali ke seed ketika halaman dimuat ulang.
- Form login/daftar tidak membuat akun nyata.
- Pemindaian kamera disimulasikan dengan tombol.
- QR bersifat demonstrasi dan belum memakai signature rahasia server.
- Tombol edit konten tertentu menunjukkan struktur UI tetapi belum menyimpan perubahan.
- PWA menyediakan manifest/ikon; strategi offline produksi belum diaktifkan agar data privat tidak tersaji sebagai cache lama.
- Supabase, GitHub, dan Vercel belum dihubungkan.

## Tahap produksi berikutnya

Setelah prototype disetujui, state lokal diganti dengan Supabase Auth, PostgreSQL, Storage, Realtime, serta Row Level Security. Repository GitHub dan integrasi Vercel dibuat pada tahap deployment sesuai `PLAN.md`.
