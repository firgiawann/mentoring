import Link from "next/link";

import { AuthForm } from "@/components/public/auth-form";

export default function RegisterPage() {
  return <main className="auth-page auth-page--register" id="main-content"><Link className="auth-brand" href="/">← PTIK / D1 / 2026</Link><AuthForm mode="register" /><div className="auth-decoration">START<br />SMALL.<br />GROW BIG.</div></main>;
}
