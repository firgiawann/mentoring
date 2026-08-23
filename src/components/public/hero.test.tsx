import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "@/components/public/hero";

describe("Hero", () => {
  it("greets mentees warmly without leading with technical feature labels", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { name: /ptik d1 2026/i })).toBeInTheDocument();
    expect(screen.getByText(/nggak harus langsung hebat/i)).toBeInTheDocument();
    expect(
      screen.getByRole("complementary", { name: /catatan mentor hari ini/i }),
    ).toHaveTextContent(/hari ini lagi sibuk apa/i);
    expect(screen.queryByText(/14 materi ringkas/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/presensi qr dinamis/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/progres terverifikasi/i)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /daftar sebagai mentee/i })).toHaveAttribute(
      "href",
      "/register",
    );
    expect(screen.getByRole("link", { name: /lihat dashboard demo/i })).toHaveAttribute(
      "href",
      "/dashboard",
    );
  });
});
