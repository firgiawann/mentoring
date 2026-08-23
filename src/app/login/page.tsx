import Link from "next/link";

import { AuthForm } from "@/components/public/auth-form";

export default function LoginPage() {
  return <main className="auth-page" id="main-content"><Link className="auth-brand" href="/">← PTIK / D1 / 2026</Link><AuthForm mode="login" /><div className="auth-decoration">TRACK<br />YOUR<br />GROWTH.</div></main>;
}
