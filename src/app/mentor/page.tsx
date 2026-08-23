import type { Metadata } from "next";

import { MentorShell } from "@/components/mentor/mentor-shell";

export const metadata: Metadata = { title: "Panel Mentor" };

export default function MentorPage() {
  return <MentorShell />;
}
