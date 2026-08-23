# Mentee Home UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengubah beranda dan navigasi mentee menjadi pengalaman task-first yang interaktif dan mudah dipahami mahasiswa baru.

**Architecture:** `DashboardOverview` menjadi komponen client untuk interaksi lokal check-in dan panduan, sementara data domain tetap diterima melalui props. `MenteeShell` menyimpan state menu mobile dan tetap menjadi penghubung prototype store dengan seluruh bagian dashboard. Perubahan visual berada di design system CSS yang sudah ada tanpa dependency baru.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4/global CSS, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-22-mentee-home-ux-design.md`

## Global Constraints

- Tahap ini hanya mengubah bagian ringkasan/beranda dan navigasi mentee.
- Neo-brutalism tetap dipertahankan dengan susunan informasi yang lebih tenang.
- State check-in, panel panduan, dan menu mobile bersifat lokal.
- Tidak ada perubahan data domain, dependency, autentikasi, atau panel mentor.
- Git belum diinisialisasi sesuai keputusan proyek, sehingga langkah commit tidak dijalankan.

---

### Task 1: Beranda Mentee Interaktif

**Files:**
- Modify: `src/components/mentee/dashboard-overview.tsx`
- Create: `src/components/mentee/dashboard-overview.test.tsx`

**Interfaces:**
- Consumes: `mentee: Mentee`, `nextMeeting?: Meeting`, `summary: ProgressSummary`, `attendanceActive: boolean`.
- Produces: check-in lokal, panel panduan yang dapat ditutup/dibuka, dan tautan fokus ke `#materi-belajar`, `#jadwal`, serta `#presensi`.

- [ ] **Step 1: Write the failing interaction tests**

```tsx
render(<DashboardOverview attendanceActive={false} mentee={mentee} summary={summary} />);
await user.click(screen.getByRole("button", { name: /butuh bantuan/i }));
expect(screen.getByRole("status")).toHaveTextContent(/cerita ke mentor/i);
await user.click(screen.getByRole("button", { name: /tutup panduan/i }));
expect(screen.getByRole("button", { name: /buka panduan/i })).toBeInTheDocument();
expect(screen.getByRole("link", { name: /buka materi/i })).toHaveAttribute("href", "#materi-belajar");
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node node_modules/vitest/vitest.mjs run src/components/mentee/dashboard-overview.test.tsx`

Expected: FAIL karena prop dan kontrol interaktif belum tersedia.

- [ ] **Step 3: Implement the client-side dashboard interactions**

Tambahkan `"use client"`, state `mood` dan `showGuide`, tiga tombol check-in, respons ber-role `status`, panel “Mulai dari sini”, serta tiga tautan fokus yang memakai anchor bagian dashboard.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node node_modules/vitest/vitest.mjs run src/components/mentee/dashboard-overview.test.tsx`

Expected: PASS.

### Task 2: Navigasi Mobile yang Berfungsi

**Files:**
- Modify: `src/components/mentee/mentee-shell.tsx`
- Create: `src/components/mentee/mentee-shell.test.tsx`

**Interfaces:**
- Consumes: prototype store melalui `usePrototype()` dan `attendanceActive` dari sesi yang sudah dihitung.
- Produces: tombol `aria-expanded`, dialog navigasi mobile berlabel “Menu mentee”, backdrop, tombol tutup, dan tujuan notifikasi.

- [ ] **Step 1: Write the failing menu test**

```tsx
render(<MenteeShell />);
await user.click(screen.getByRole("button", { name: /buka menu/i }));
expect(screen.getByRole("dialog", { name: /menu mentee/i })).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: /tutup menu/i }));
expect(screen.queryByRole("dialog", { name: /menu mentee/i })).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `node node_modules/vitest/vitest.mjs run src/components/mentee/mentee-shell.test.tsx`

Expected: FAIL karena tombol menu belum mengubah state.

- [ ] **Step 3: Implement accessible mobile navigation**

Tambahkan state `mobileMenuOpen`, event buka/tutup, overlay, panel ber-role `dialog`, tombol tutup, dan panggil `setMobileMenuOpen(false)` ketika tautan dipilih. Teruskan `Boolean(activeMeeting)` sebagai `attendanceActive` ke `DashboardOverview`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node node_modules/vitest/vitest.mjs run src/components/mentee/mentee-shell.test.tsx`

Expected: PASS.

### Task 3: Visual, Responsiveness, and Regression

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: class baru dari Task 1 dan Task 2.
- Produces: tata letak task-first desktop/mobile, state hover/pressed/focus, dan drawer mobile tanpa overflow.

- [ ] **Step 1: Add styles for interaction states and layout**

Tambahkan aturan untuk `.mentee-checkin`, `.mood-options`, `.today-focus`, `.focus-action`, `.new-student-guide`, `.mobile-menu-backdrop`, dan `.mobile-menu-panel`. Gunakan `:hover`, `[aria-pressed="true"]`, serta `:focus-visible` untuk umpan balik.

- [ ] **Step 2: Add responsive behavior**

Pada lebar maksimal 760px, susun check-in dan fokus menjadi satu kolom, tampilkan drawer dari sisi kanan, dan pastikan tombol mempunyai tinggi sentuh minimal 44px.

- [ ] **Step 3: Run complete automated verification**

Run: full Vitest suite, `tsc --noEmit`, ESLint, lalu `next build --webpack` secara terpisah.

Expected: semua command exit 0.

- [ ] **Step 4: Perform browser QA**

Periksa `/dashboard` pada viewport desktop dan 390x844: tidak ada horizontal overflow, check-in berubah, panduan dapat ditutup/dibuka, menu mobile dapat dibuka/ditutup, dan semua anchor utama tetap dapat dijangkau.
