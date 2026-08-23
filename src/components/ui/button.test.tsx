import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("runs the supplied action when activated", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Simpan</Button>);
    await user.click(screen.getByRole("button", { name: "Simpan" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders real navigation when an href is supplied", () => {
    render(<Button href="/dashboard">Buka dashboard</Button>);

    expect(screen.getByRole("link", { name: "Buka dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
  });
});
