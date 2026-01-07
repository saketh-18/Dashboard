"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

  const handleRegister = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        setError("Registration failed. Try different details.");
        return;
      }
      setSuccess("Account created. You can login now.");
      setTimeout(() => router.push("/login"), 900);
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070D] text-zinc-100 overflow-hidden">
      <Navbar />

      {/* Galaxy background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-[-30%] h-[600px] w-[600px] rounded-full bg-indigo-900/25 blur-[150px]" />
        <div className="absolute right-[-20%] bottom-[-40%] h-[700px] w-[700px] rounded-full bg-violet-900/20 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_70%_65%,rgba(255,255,255,0.03),transparent_45%)]" />
      </div>

      <main className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-md items-center px-4">
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Access
          </p>

          <h1 className="mt-1 text-2xl font-medium text-zinc-100">
            Create account
          </h1>

          <p className="mt-1 text-sm text-zinc-400">Set up your workspace.</p>

          <div className="mt-6 space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-indigo-400/50"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-indigo-400/50"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-indigo-400/50"
            />

            {error && (
              <div className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                {success}
              </div>
            )}

            <button
              onClick={handleRegister}
              className="w-full rounded-md bg-indigo-500/20 px-4 py-3 text-sm font-medium text-indigo-100 hover:bg-indigo-500/30"
            >
              Create account
            </button>
          </div>

          <p className="mt-5 text-sm text-zinc-400">
            Already have access?{" "}
            <Link href="/login" className="text-zinc-200 hover:text-zinc-100">
              Log in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
