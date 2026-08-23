# Interactive Materials Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menyediakan detail interaktif untuk seluruh 14 materi modul tanpa mengikatnya pada jumlah pertemuan tertentu.

**Architecture:** Metadata kartu tetap memakai `Material`, sementara pengalaman detail disimpan dalam katalog `MaterialExperience` dengan blok terurut dan renderer berbasis discriminated union. Panel detail dan semua aktivitas berjalan sebagai Client Components dengan state lokal; alur progres lama tetap menjadi satu-satunya penulis status materi.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Lucide React, global CSS, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-08-23-interactive-materials-design.md`

## Global Constraints

- Terdapat tepat 14 materi dari modul.
- Jumlah pertemuan fleksibel dan tidak boleh diklaim tepat atau minimal 10.
- Tidak menambah dependency baru.
- Refleksi mental, bullying, kekerasan, dan spiritual tidak memiliki skor/ranking.
- Tautan eksternal berlabel prototipe dan tanggal pemeriksaan.
- State aktivitas hanya berlaku selama panel terbuka.
- Git belum diinisialisasi sehingga langkah commit tidak dijalankan.

---

### Task 1: Domain Materi Interaktif dan Dokumen Produk

**Files:**
- Modify: `PLAN.md`
- Modify: `README.md`
- Modify: `src/features/prototype/mock-data.ts`
- Create: `src/features/materials/types.ts`
- Create: `src/features/materials/material-experiences.ts`
- Create: `src/features/materials/material-experiences.test.ts`

**Interfaces:**
- Produces: `MaterialBlock`, `MaterialExperience`, `CompletionPolicy`, `materialExperiences`, dan `getMaterialExperience(materialId)`.

- [ ] **Step 1: Write the failing catalog test**

```ts
expect(materialExperiences).toHaveLength(14);
expect(new Set(materialExperiences.map((item) => item.materialId)).size).toBe(14);
expect(materialExperiences.every((item) => item.blocks.length > 0)).toBe(true);
expect(getMaterialExperience("material-01")?.sourcePages).toEqual([1, 6]);
```

- [ ] **Step 2: Run the catalog test and verify RED**

Run: bundled Node + `vitest run src/features/materials/material-experiences.test.ts`.

Expected: FAIL karena katalog belum ada.

- [ ] **Step 3: Add exact type contracts**

```ts
type MaterialBlock =
  | { id: string; type: "intro"; body: string }
  | { id: string; type: "key_points"; title: string; items: string[] }
  | { id: string; type: "fact"; title: string; body: string; sourceLabel: string }
  | { id: string; type: "link"; title: string; description: string; href: string; domain: string; reviewedAt: string }
  | { id: string; type: "checklist"; title: string; items: string[] }
  | { id: string; type: "reflection"; title: string; prompt: string; privacyNote: string }
  | { id: string; type: "scenario"; title: string; prompt: string; options: { id: string; label: string; feedback: string; recommended: boolean }[] }
  | { id: string; type: "true_false"; statement: string; answer: boolean; explanation: string }
  | { id: string; type: "ordering"; title: string; items: { id: string; label: string; order: number }[] }
  | { id: string; type: "resource"; title: string; body: string; actionLabel?: string; href?: string };
```

- [ ] **Step 4: Seed 14 experiences and update product wording**

Setiap pengalaman mempunyai `sourcePages`, `readTimeMinutes`, `objectives`, `blocks`, `completionPolicy`, `sensitivity`, dan `lastReviewedAt`. Ganti seed kartu di `mock-data.ts` dengan 14 judul/ringkasan modul resmi sambil mempertahankan ID dan accent. Ganti semua klaim target 10 pertemuan pada `PLAN.md` dan `README.md` dengan bahasa jumlah fleksibel; jangan mengubah dokumen rencana historis di `docs/superpowers/plans/2026-08-22-mentoring-prototype.md`.

- [ ] **Step 5: Run the catalog test and verify GREEN**

Expected: 14 pengalaman unik, semua mempunyai blok, dan test exit 0.

### Task 2: Panel Detail Materi yang Aksesibel

**Files:**
- Create: `src/components/mentee/material-experience-panel.tsx`
- Create: `src/components/mentee/material-experience-panel.test.tsx`
- Modify: `src/components/mentee/material-list.tsx`
- Modify: `src/components/mentee/material-list.test.tsx`

**Interfaces:**
- Consumes: `experience: MaterialExperience`, `material: Material`, `status: ProgressStatus`, `onClose()`, dan `onSubmit(materialId)`.
- Produces: dialog berlabel judul materi, tombol tutup, metadata baca/sumber, dan slot renderer blok.

- [ ] **Step 1: Write failing open/close tests**

```tsx
await user.click(screen.getByRole("button", { name: /buka materi panduan mentoring/i }));
expect(screen.getByRole("dialog", { name: /panduan mentoring/i })).toBeInTheDocument();
await user.click(screen.getByRole("button", { name: /tutup materi/i }));
expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
```

- [ ] **Step 2: Run focused tests and verify RED**

Expected: FAIL karena tombol detail belum mengubah state.

- [ ] **Step 3: Implement local selection and dialog shell**

`MaterialList` menyimpan `selectedMaterialId`. Tombol detail memakai nama `Buka materi {title}`. Dialog menggunakan `role="dialog"`, `aria-modal="true"`, heading sebagai accessible name, backdrop yang dapat menutup panel, dan tombol selesai hanya ketika materi terbuka.

- [ ] **Step 4: Run focused tests and verify GREEN**

Expected: panel membuka pengalaman yang benar dan dapat ditutup.

### Task 3: Renderer Aktivitas Reusable

**Files:**
- Create: `src/components/mentee/material-block-renderer.tsx`
- Create: `src/components/mentee/material-block-renderer.test.tsx`
- Modify: `src/components/mentee/material-experience-panel.tsx`

**Interfaces:**
- Consumes: `block: MaterialBlock`.
- Produces: renderer untuk seluruh tipe blok dan umpan balik lokal untuk checklist, reflection, scenario, true/false, dan ordering.

- [ ] **Step 1: Write failing behavior tests**

```tsx
await user.click(screen.getByRole("button", { name: /meminta izin kepada mentor/i }));
expect(screen.getByRole("status")).toHaveTextContent(/tepat/i);
await user.click(screen.getByRole("button", { name: /benar/i }));
expect(screen.getByRole("status")).toHaveTextContent(/jawaban/i);
await user.type(screen.getByRole("textbox"), "Saya akan bertanya saat bingung.");
expect(screen.getByText(/tersimpan hanya selama panel ini terbuka/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run renderer tests and verify RED**

Expected: FAIL karena renderer belum tersedia.

- [ ] **Step 3: Implement the renderer with local state**

Gunakan komponen kecil per tipe blok di file yang sama. `scenario` dan `true_false` memakai `role="status"`; `reflection` selalu menampilkan catatan privasi; `ordering` menyediakan tombol naik/turun dan tombol periksa, bukan drag-only, agar dapat digunakan keyboard.

- [ ] **Step 4: Run renderer tests and verify GREEN**

Expected: seluruh pola interaksi memberi umpan balik yang dapat dibaca.

### Task 4: Integrasi Visual, Mentor Catalog, dan Verifikasi

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/mentor/material-management.tsx`
- Test: all existing and new test files.

**Interfaces:**
- Consumes: class panel dan blok dari Task 2-3 serta `materialExperiences` dari Task 1.
- Produces: drawer responsif tanpa overflow dan label tipe pengalaman pada katalog mentor.

- [ ] **Step 1: Add responsive styles**

Panel memakai sisi kanan pada desktop dan layar penuh pada ponsel. Setiap kontrol mempunyai target sentuh minimal 44px, fokus terlihat, dan area isi dapat digulir tanpa menggeser halaman belakang.

- [ ] **Step 2: Show interaction metadata in mentor material catalog**

Tampilkan jumlah blok dan tipe aktivitas utama sebagai pratinjau read-only. Tombol edit tetap berlabel versi produksi agar tidak menyiratkan penyimpanan yang belum tersedia.

- [ ] **Step 3: Run full automated verification**

Run full Vitest, `tsc --noEmit`, ESLint, lalu `next build --webpack` secara serial untuk build.

Expected: semua command exit 0.

- [ ] **Step 4: Perform browser QA**

Pada desktop dan 390x844, buka materi pertama, jalankan skenario, tutup panel, buka materi sensitif, dan pastikan tidak ada skor/ranking maupun horizontal overflow.
