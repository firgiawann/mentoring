import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { MenteeShell } from "@/components/mentee/mentee-shell";
import { PrototypeProvider } from "@/features/prototype/prototype-store";

describe("MenteeShell mobile navigation", () => {
  it("opens a usable menu and closes it again", async () => {
    const user = userEvent.setup();
    render(
      <PrototypeProvider>
        <MenteeShell />
      </PrototypeProvider>,
    );

    const openButton = screen.getByRole("button", { name: /buka menu/i });
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    await user.click(openButton);
    expect(openButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog", { name: /menu mentee/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /tutup menu/i }));
    expect(screen.queryByRole("dialog", { name: /menu mentee/i })).not.toBeInTheDocument();
    expect(openButton).toHaveAttribute("aria-expanded", "false");
  });
});
