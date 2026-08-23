import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { MaterialList } from "@/components/mentee/material-list";
import type { Material, MaterialProgress } from "@/features/prototype/types";

const material: Material = {
  id: "material-05",
  order: 5,
  title: "CSS Fundamental",
  summary: "Mengenal cascade dan box model.",
  category: "Web Dasar",
  durationMinutes: 55,
  isOpen: true,
  visibility: "mentee",
  accent: "purple",
};

describe("MaterialList", () => {
  it("opens and closes the selected material experience", async () => {
    const user = userEvent.setup();
    const panduan: Material = {
      ...material,
      id: "material-01",
      order: 1,
      title: "Panduan Mentoring",
    };

    render(<MaterialList materials={[panduan]} onSubmit={vi.fn()} progress={[]} />);

    await user.click(screen.getByRole("button", { name: /buka materi panduan mentoring/i }));
    expect(screen.getByRole("dialog", { name: /panduan mentoring/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /tutup materi/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buka materi panduan mentoring/i })).toHaveFocus();
  });

  it("closes the material experience with Escape", async () => {
    const user = userEvent.setup();
    const panduan: Material = { ...material, id: "material-01", order: 1, title: "Panduan Mentoring" };

    render(<MaterialList materials={[panduan]} onSubmit={vi.fn()} progress={[]} />);
    await user.click(screen.getByRole("button", { name: /buka materi panduan mentoring/i }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buka materi panduan mentoring/i })).toHaveFocus();
  });

  it("shows an early summary without revealing a locked activity", async () => {
    const user = userEvent.setup();
    const upcoming: Material = {
      ...material,
      id: "material-07",
      order: 7,
      title: "Lembaga Kemahasiswaan dan UKM",
      isOpen: false,
    };

    render(<MaterialList materials={[upcoming]} onSubmit={vi.fn()} progress={[]} />);
    await user.click(screen.getByRole("button", { name: /buka materi lembaga kemahasiswaan/i }));

    expect(screen.getByText(/versi ringkas untuk dibaca lebih awal/i)).toBeInTheDocument();
    expect(screen.queryByText(/bidang yang ingin saya eksplorasi/i)).not.toBeInTheDocument();
  });

  it("submits an available material and reflects its verification queue status", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const { rerender } = render(
      <MaterialList materials={[material]} onSubmit={onSubmit} progress={[]} />,
    );

    await user.click(screen.getByRole("button", { name: /tandai selesai/i }));
    expect(onSubmit).toHaveBeenCalledWith("material-05");

    const queued: MaterialProgress[] = [{
      materialId: "material-05",
      menteeId: "mentee-01",
      status: "pending_verification",
      updatedAt: "2026-08-22T10:00:00.000Z",
    }];
    rerender(<MaterialList materials={[material]} onSubmit={onSubmit} progress={queued} />);

    expect(screen.getByText(/menunggu verifikasi/i)).toBeInTheDocument();
  });
});
