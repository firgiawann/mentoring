"use client";

import { CheckCircle2, Eye, EyeOff, Info, LockKeyhole, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isRegister = mode === "register";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="auth-success" tone="green">
        <CheckCircle2 size={46} strokeWidth={3} />
        <h1>{isRegister ? "Pendaftaran tercatat!" : "Berhasil masuk ke demo!"}</h1>
        <p>{isRegister ? "Pada versi produksi, akunmu akan menunggu persetujuan mentor. Untuk sekarang, lanjutkan ke dashboard prototype." : "Autentikasi belum terhubung. Kamu sedang masuk sebagai Alya Ramadhani pada mode prototype."}</p>
        <Button href="/dashboard">Buka dashboard demo</Button>
      </Card>
    );
  }

  return (
    <Card as="section" className="auth-card" tone="paper">
      <div className="prototype-notice"><Info size={18} /><span><strong>Mode prototype.</strong> Jangan gunakan password asli.</span></div>
      <span className="eyebrow">{isRegister ? "MULAI PERJALANANMU" : "SELAMAT DATANG LAGI"}</span>
      <h1>{isRegister ? "Daftar sebagai mentee." : "Masuk ke ruang belajar."}</h1>
      <p>{isRegister ? "Isi data dasar. Pada versi produksi, mentor akan meninjau akunmu lebih dulu." : "Gunakan data apa saja untuk mencoba pengalaman dashboard."}</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isRegister && <><label htmlFor="name">Nama lengkap</label><div className="input-wrap"><UserRound size={19} /><input id="name" name="name" placeholder="Mis. Alya Ramadhani" required /></div><label htmlFor="nim">NIM</label><input id="nim" name="nim" pattern="[0-9]{6,15}" placeholder="Nomor induk mahasiswa" required /></>}
        <label htmlFor="email">Email</label>
        <div className="input-wrap"><Mail size={19} /><input id="email" name="email" placeholder="nama@email.com" required type="email" /></div>
        <label htmlFor="password">Password</label>
        <div className="input-wrap"><LockKeyhole size={19} /><input id="password" minLength={6} name="password" placeholder="Minimal 6 karakter" required type={showPassword ? "text" : "password"} /><button aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"} className="password-toggle" onClick={() => setShowPassword((value) => !value)} type="button">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></div>
        <Button className="auth-submit" type="submit">{isRegister ? "Kirim pendaftaran" : "Masuk ke demo"}</Button>
      </form>
      <p className="auth-switch">{isRegister ? "Sudah punya akun?" : "Belum punya akun?"} <Link href={isRegister ? "/login" : "/register"}>{isRegister ? "Masuk" : "Daftar sekarang"}</Link></p>
    </Card>
  );
}
