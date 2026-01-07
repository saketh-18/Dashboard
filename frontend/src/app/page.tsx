import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <div className="relative flex h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden bg-[#05070D]">
        {/* Galaxy background */}
        <div className="pointer-events-none absolute inset-0">
          {/* Core nebula */}
          <div className="absolute left-1/4 top-[-30%] h-[700px] w-[700px] rounded-full bg-indigo-900/25 blur-[160px]" />
          <div className="absolute right-[-20%] bottom-[-40%] h-[800px] w-[800px] rounded-full bg-violet-900/20 blur-[200px]" />

          {/* Subtle star field */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.05),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(255,255,255,0.04),transparent_45%)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
            Personal Productivity
          </p>

          <h1 className="text-4xl font-medium tracking-tight text-zinc-100 sm:text-5xl">
            Galaxy Dashboard
          </h1>

          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            A quiet space to plan, track, and focus — without noise.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/dashboard"
              className="rounded-md border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-100 hover:bg-white/10"
            >
              Enter Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
