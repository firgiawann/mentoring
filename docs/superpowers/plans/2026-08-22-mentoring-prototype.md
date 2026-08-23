# PTIK D1 2026 Mentoring Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-fidelity, responsive, installable prototype that demonstrates the public site, mentee dashboard, mentor panel, materials, progress verification, schedules, notifications, and rotating attendance QR flow using local mock data.

**Architecture:** Use one Next.js App Router application with feature-oriented React components and a client-side prototype store. Domain rules are implemented as pure TypeScript functions so they can be tested independently and later reused when Supabase replaces the mock store. The prototype has no external database, real authentication, camera scanning, GitHub integration, or Vercel deployment.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Lucide React, qrcode.react, Vitest, Testing Library, jsdom, PWA manifest

**Spec:** `PLAN.md`

## Global Constraints

- The prototype is for one group only: PTIK D1 2026.
- Seed exactly 10 mentees while supporting a stated design capacity of 15.
- Seed 14 materials and at least 10 meetings.
- Use Indonesian user-facing copy.
- Use a mobile-first neo-brutalist visual system with thick borders, hard shadows, bold colors, clear focus states, and readable data views.
- Mentee and mentor experiences must have separate navigation and layouts.
- All mutable behavior must remain local prototype state; no Supabase, GitHub, or Vercel connection is created in this plan.
- Attendance sessions last for a mentor-selected 30, 45, or 60 minutes; the visible QR payload still rotates every 15 seconds while the session is active.
- Private data must never be cached as offline truth; the prototype PWA only demonstrates installability and shell caching readiness.

---

## Planned File Map

- `package.json` — scripts and dependencies.
- `next.config.ts` — Next.js configuration.
- `tsconfig.json` — strict TypeScript configuration.
- `postcss.config.mjs` — Tailwind/PostCSS integration.
- `vitest.config.ts` and `vitest.setup.ts` — unit/component test environment.
- `src/app/layout.tsx` — root metadata, fonts, and prototype provider.
- `src/app/globals.css` — design tokens, resets, utilities, and responsive primitives.
- `src/app/page.tsx` — public landing composition.
- `src/app/login/page.tsx` and `src/app/register/page.tsx` — prototype auth screens.
- `src/app/dashboard/page.tsx` — mentee portal composition.
- `src/app/mentor/page.tsx` — mentor portal composition.
- `src/app/manifest.ts` — PWA manifest.
- `src/components/ui/*` — focused visual primitives.
- `src/components/public/*` — public landing sections.
- `src/components/mentee/*` — dashboard, materials, attendance, and activity sections.
- `src/components/mentor/*` — admin navigation, stats, user queue, materials, meetings, progress, attendance, and content views.
- `src/features/prototype/types.ts` — shared domain types.
- `src/features/prototype/mock-data.ts` — deterministic seed data.
- `src/features/prototype/domain.ts` — pure selectors and state transitions.
- `src/features/prototype/prototype-store.tsx` — local state provider and actions.
- `src/features/prototype/*.test.ts` — domain unit tests.
- `src/components/**/*.test.tsx` — representative component interaction tests.
- `public/icons/*` — local PWA icons.

### Task 1: Application Foundation and Neo-Brutalist UI System

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/progress-bar.tsx`
- Test: `src/components/ui/button.test.tsx`

**Interfaces:**
- Produces: `Button`, `Card`, `Badge`, and `ProgressBar` components used by every later task.
- Produces: global CSS variables `--ink`, `--paper`, `--yellow`, `--pink`, `--blue`, `--green`, and `--purple`.

- [ ] **Step 1: Create the package and strict project configuration**

Define scripts `dev`, `build`, `start`, `lint`, `typecheck`, and `test`. Pin compatible stable versions of Next.js, React, TypeScript, Tailwind CSS, Vitest, Testing Library, jsdom, Lucide React, and qrcode.react.

- [ ] **Step 2: Write the failing button interaction test**

Test that `Button` renders its label, exposes an accessible button role, runs `onClick`, supports `variant="primary" | "secondary" | "ghost" | "danger"`, and can render as a link through an `href` prop.

- [ ] **Step 3: Run the focused test and confirm the missing component failure**

Run: `pnpm test src/components/ui/button.test.tsx`

Expected: FAIL because `src/components/ui/button.tsx` does not exist.

- [ ] **Step 4: Implement the UI primitives and global design tokens**

Implement focused components with typed props. Buttons use a 3px black border, 4px hard shadow, visible focus ring, and pressed translation. Cards expose color variants without embedding page-specific content. Progress bars expose accessible `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` attributes.

- [ ] **Step 5: Run UI tests and type checking**

Run: `pnpm test src/components/ui/button.test.tsx` and `pnpm typecheck`.

Expected: all pass.

### Task 2: Prototype Domain, Seed Data, and State Transitions

**Files:**
- Create: `src/features/prototype/types.ts`
- Create: `src/features/prototype/mock-data.ts`
- Create: `src/features/prototype/domain.ts`
- Create: `src/features/prototype/domain.test.ts`
- Create: `src/features/prototype/prototype-store.tsx`

**Interfaces:**
- Produces: types `Mentee`, `Material`, `MaterialProgress`, `Meeting`, `AttendanceRecord`, `Notification`, `PublicContent`, and `PrototypeState`.
- Produces: `calculateProgressSummary(state, menteeId)`, `approveMentee(state, menteeId)`, `submitMaterialProgress(state, menteeId, materialId)`, `verifyMaterialProgress(state, menteeId, materialId)`, `recordAttendance(state, meetingId, menteeId)`, and `createRotatingToken(meetingId, timestamp, intervalSeconds)`.
- Produces: `PrototypeProvider` and `usePrototype()`.

- [ ] **Step 1: Write failing tests for domain rules**

Cover these exact expectations: seed has 10 mentees, 14 materials, and at least 10 meetings; a submitted material becomes `pending_verification`; verified material becomes `verified`; duplicate attendance preserves one record; progress summary totals add up to 14; QR token remains stable within a 15-second window and changes in the next window.

- [ ] **Step 2: Run the domain tests and confirm missing exports**

Run: `pnpm test src/features/prototype/domain.test.ts`

Expected: FAIL because the domain modules do not exist.

- [ ] **Step 3: Implement deterministic types and mock data**

Use stable string IDs such as `mentee-01`, `material-01`, and `meeting-01`. Include account statuses, five attendance statuses, three progress statuses, published/upcoming materials, recurring weekly meetings, and unread/read notifications.

- [ ] **Step 4: Implement pure transition functions**

Every mutation returns a new `PrototypeState`. Reject invalid IDs with a descriptive `Error`. Preserve uniqueness for `(meetingId, menteeId)` attendance and `(materialId, menteeId)` progress.

- [ ] **Step 5: Add the client prototype provider**

Expose state plus actions for approving users, changing attendance, submitting/verifying progress, marking notifications read, opening/closing attendance, and resetting the demo.

- [ ] **Step 6: Run domain tests and type checking**

Run: `pnpm test src/features/prototype/domain.test.ts` and `pnpm typecheck`.

Expected: all pass.

### Task 3: Public Landing and Prototype Authentication Screens

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/login/page.tsx`
- Create: `src/app/register/page.tsx`
- Create: `src/components/public/site-header.tsx`
- Create: `src/components/public/hero.tsx`
- Create: `src/components/public/program-overview.tsx`
- Create: `src/components/public/upcoming-agenda.tsx`
- Create: `src/components/public/public-materials.tsx`
- Create: `src/components/public/gallery-strip.tsx`
- Create: `src/components/public/site-footer.tsx`
- Test: `src/components/public/hero.test.tsx`

**Interfaces:**
- Consumes: UI primitives from Task 1 and public mock content from Task 2.
- Produces: navigation paths `/`, `/login`, `/register`, `/dashboard`, and `/mentor`.

- [ ] **Step 1: Write the failing hero test**

Test for the title `PTIK D1 2026`, a visible mentoring value proposition, a `Daftar sebagai mentee` link to `/register`, and a `Lihat dashboard demo` link to `/dashboard`.

- [ ] **Step 2: Run the hero test and confirm failure**

Run: `pnpm test src/components/public/hero.test.tsx`

Expected: FAIL because the hero component does not exist.

- [ ] **Step 3: Build the public landing sections**

Compose a complete public page with asymmetric neo-brutalist layout, high-contrast hero, program stats, next agenda, public material previews, documentation placeholders made from CSS shapes, and clear login/register calls to action.

- [ ] **Step 4: Build login and registration prototype forms**

The forms validate required fields locally and route to the pending-account or dashboard demo state without creating real credentials. Display a visible `Mode prototype` notice so users do not mistake it for production authentication.

- [ ] **Step 5: Verify public routes**

Run: `pnpm test src/components/public/hero.test.tsx`, `pnpm typecheck`, and `pnpm build`.

Expected: all pass and all three public routes pre-render successfully.

### Task 4: Mentee Dashboard and Interactive Learning Flow

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/components/mentee/mentee-shell.tsx`
- Create: `src/components/mentee/dashboard-overview.tsx`
- Create: `src/components/mentee/material-list.tsx`
- Create: `src/components/mentee/schedule-list.tsx`
- Create: `src/components/mentee/attendance-summary.tsx`
- Create: `src/components/mentee/notification-drawer.tsx`
- Create: `src/components/mentee/scan-attendance-card.tsx`
- Test: `src/components/mentee/material-list.test.tsx`

**Interfaces:**
- Consumes: `usePrototype()`, `calculateProgressSummary`, and UI primitives.
- Produces: interactive mentee actions `submitMaterial(materialId)`, `markNotificationRead(notificationId)`, and `simulateScan()`.

- [ ] **Step 1: Write the failing material interaction test**

Render the material list with one available `not_started` material, click `Tandai selesai`, and assert that `onSubmit(materialId)` runs and the status copy becomes `Menunggu verifikasi` when rerendered.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `pnpm test src/components/mentee/material-list.test.tsx`

Expected: FAIL because the mentee components do not exist.

- [ ] **Step 3: Implement the responsive mentee shell**

Use a bottom navigation on narrow screens and a left rail on desktop. Include overview, materials, schedule, attendance, and notification sections in one demo page with anchored navigation.

- [ ] **Step 4: Implement dashboard interactions**

Allow submitting unstarted materials, reading notifications, and simulating a valid QR scan when the attendance session is open. Locked material bodies display their summaries and opening labels without revealing full content.

- [ ] **Step 5: Verify mentee behavior**

Run: `pnpm test src/components/mentee/material-list.test.tsx`, `pnpm typecheck`, and `pnpm build`.

Expected: all pass.

### Task 5: Mentor Panel, Verification, and Rotating Attendance QR

**Files:**
- Create: `src/app/mentor/page.tsx`
- Create: `src/components/mentor/mentor-shell.tsx`
- Create: `src/components/mentor/mentor-overview.tsx`
- Create: `src/components/mentor/user-management.tsx`
- Create: `src/components/mentor/material-management.tsx`
- Create: `src/components/mentor/progress-verification.tsx`
- Create: `src/components/mentor/meeting-management.tsx`
- Create: `src/components/mentor/attendance-control.tsx`
- Create: `src/components/mentor/content-management.tsx`
- Create: `src/components/mentor/export-panel.tsx`
- Test: `src/components/mentor/attendance-control.test.tsx`

**Interfaces:**
- Consumes: prototype state/actions, `createRotatingToken`, `QRCodeSVG`, and UI primitives.
- Produces: mentor actions for account approval, progress verification, attendance session control, attendance correction, demo export, and demo reset.

- [ ] **Step 1: Write the failing attendance-control test**

Render a closed session and assert that clicking `Buka presensi` calls `onOpen`. Render an open session and assert the QR region, countdown label, meeting title, and `Tutup presensi` action are visible.

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `pnpm test src/components/mentor/attendance-control.test.tsx`

Expected: FAIL because the mentor components do not exist.

- [ ] **Step 3: Implement the mentor information architecture**

Use a separate yellow/black admin shell with overview, users, materials, meetings, progress queue, attendance, public content, and export sections. Keep dense tables responsive by switching to stacked records on narrow screens.

- [ ] **Step 4: Implement account and progress actions**

Allow pending user approval and pending material verification. Each interaction updates summary counts immediately through the prototype store and displays concise status feedback.

- [ ] **Step 5: Implement rotating QR attendance**

When open, generate a QR payload containing prototype marker, meeting ID, and the deterministic 15-second token. Update the QR and countdown each second. Closing the session invalidates the visible scan action.

- [ ] **Step 6: Implement meeting, content, and export demonstrations**

Show editable-looking meeting/content controls with clearly marked prototype interactions. Generate downloadable CSV text for the seeded attendance records entirely in the browser.

- [ ] **Step 7: Verify mentor behavior**

Run: `pnpm test src/components/mentor/attendance-control.test.tsx`, `pnpm test`, `pnpm typecheck`, and `pnpm build`.

Expected: all pass.

### Task 6: PWA Assets, Accessibility, and Visual Verification

**Files:**
- Create: `src/app/manifest.ts`
- Create: `public/icons/icon-192.svg`
- Create: `public/icons/icon-512.svg`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `README.md`

**Interfaces:**
- Consumes: all routes and components from Tasks 1–5.
- Produces: installable metadata, documented demo routes, and verified responsive layouts.

- [ ] **Step 1: Add the web manifest and local icons**

Set name `PTIK D1 2026 Mentoring`, short name `PTIK Mentor`, theme color `#F5E642`, background color `#F7F3E8`, display `standalone`, and start URL `/`.

- [ ] **Step 2: Add global accessibility refinements**

Provide skip links, visible `:focus-visible` outlines, reduced-motion handling, semantic landmarks, descriptive labels, and minimum 44px primary touch targets.

- [ ] **Step 3: Document prototype usage**

README must include runtime prerequisites, install/run/test/build commands, demo routes, prototype limitations, and the later Supabase/GitHub/Vercel integration boundary.

- [ ] **Step 4: Run the complete automated verification**

Run: `pnpm test`, `pnpm typecheck`, and `pnpm build`.

Expected: all tests pass, TypeScript reports no errors, and Next.js emits successful route builds.

- [ ] **Step 5: Run local visual verification**

Open `/`, `/register`, `/dashboard`, and `/mentor` at mobile and desktop viewport sizes. Confirm there is no horizontal overflow, navigation remains usable, text is readable, QR fits the viewport, and all primary interactions provide visible feedback.

- [ ] **Step 6: Record completion state**

Update this checklist to reflect executed tasks and report any intentional prototype limitations. Do not initialize Git or deploy to Vercel in this task.
