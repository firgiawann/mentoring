import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MaterialBlockRenderer } from "@/components/mentee/material-block-renderer";
import type { MaterialBlock } from "@/features/materials/types";

describe("MaterialBlockRenderer", () => {
  it("gives immediate, non-scored feedback for a scenario", async () => {
    const user = userEvent.setup();
    const block: MaterialBlock = {
      id: "scenario",
      type: "scenario",
      title: "Kalau berhalangan hadir?",
      prompt: "Apa tindakan yang paling tepat?",
      options: [
        { id: "silent", label: "Diam saja", feedback: "Mentor perlu menerima kabar.", recommended: false },
        { id: "permission", label: "Meminta izin kepada mentor", feedback: "Tepat. Komunikasikan kondisimu.", recommended: true },
      ],
    };

    render(<MaterialBlockRenderer block={block} />);
    await user.click(screen.getByRole("button", { name: /meminta izin/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/tepat/i);
    expect(screen.queryByText(/skor|poin|ranking/i)).not.toBeInTheDocument();
  });

  it("explains a true-or-false answer", async () => {
    const user = userEvent.setup();
    const block: MaterialBlock = {
      id: "tf",
      type: "true_false",
      statement: "Peralatan boleh dipindah tanpa izin.",
      answer: false,
      explanation: "Pemindahan harus mengikuti prosedur.",
    };

    render(<MaterialBlockRenderer block={block} />);
    await user.click(screen.getByRole("button", { name: "Salah" }));

    expect(screen.getByRole("status")).toHaveTextContent(/tepat.*pemindahan harus/i);
  });

  it("keeps a sensitive reflection local to the open panel", async () => {
    const user = userEvent.setup();
    const block: MaterialBlock = {
      id: "reflection",
      type: "reflection",
      title: "Check-in pribadi",
      prompt: "Apa yang sedang kamu rasakan?",
      privacyNote: "Jawaban hanya tersimpan selama panel ini terbuka.",
    };

    render(<MaterialBlockRenderer block={block} />);
    await user.type(screen.getByRole("textbox"), "Sedang beradaptasi");

    expect(screen.getByRole("textbox")).toHaveValue("Sedang beradaptasi");
    expect(screen.getByText(/hanya tersimpan selama panel/i)).toBeInTheDocument();
  });

  it("lets mentees reorder a sequence and check it", async () => {
    const user = userEvent.setup();
    const block: MaterialBlock = {
      id: "ordering",
      type: "ordering",
      title: "Susun tahapannya",
      items: [
        { id: "first", label: "Tahap awal", order: 1 },
        { id: "last", label: "Tahap akhir", order: 2 },
      ],
    };

    render(<MaterialBlockRenderer block={block} />);
    await user.click(screen.getByRole("button", { name: /naikkan tahap awal/i }));
    await user.click(screen.getByRole("button", { name: /periksa urutan/i }));

    expect(screen.getByRole("status")).toHaveTextContent(/urutan sudah tepat/i);
  });
});
