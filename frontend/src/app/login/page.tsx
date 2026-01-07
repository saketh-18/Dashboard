"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { LogoutStore } from "@/stores/logout-store";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        setError("Login failed. Check your credentials.");
        return;
      }
      const data = await res.json();
      if (data.token) {
        console.log("login succesfull")
        console.log("FROM:LOGIN: jwt_token ", data.token);
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        setError("No token returned by server.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black text-zinc-100">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-fuchsia-700/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      </div>

      <main className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 pb-16 pt-20">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Access
          </p>
          <h1 className="text-3xl font-semibold text-white">
            Log in to Mission Control
          </h1>
          <p className="text-sm text-zinc-400">
            Use your credentials to enter the dashboard.
          </p>

          <div className="mt-6 space-y-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-indigo-400/60"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-indigo-400/60"
            />
            {error && (
              <div className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                {error}
              </div>
            )}
            <button
              onClick={handleLogin}
              className="w-full rounded-lg bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:translate-y-[-1px]"
            >
              Login
            </button>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            New here?{" "}
            <Link
              href="/register"
              className="text-indigo-300 hover:text-indigo-200"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
