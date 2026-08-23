import type { Metadata } from "next";

import { MenteeShell } from "@/components/mentee/mentee-shell";

export const metadata: Metadata = { title: "Dashboard Mentee" };

export default function DashboardPage() {
  return <MenteeShell />;
}
