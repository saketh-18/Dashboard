import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-white/5 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          className="text-lg font-medium tracking-wide text-zinc-100"
        >
          Galaxy
        </Link>

        <nav className="flex items-center gap-4 text-sm text-zinc-400">
          <Link
            href="/dashboard"
            className="hover:text-zinc-100"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
