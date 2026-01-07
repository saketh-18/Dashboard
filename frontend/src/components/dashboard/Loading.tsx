export default function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#05070D] text-zinc-100 overflow-hidden">
      {/* Galaxy background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-[-30%] h-[600px] w-[600px] rounded-full bg-indigo-900/20 blur-[150px]" />
        <div className="absolute right-[-20%] bottom-[-40%] h-[700px] w-[700px] rounded-full bg-violet-900/15 blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_70%_65%,rgba(255,255,255,0.03),transparent_45%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Initializing
        </p>

        <p className="text-sm font-medium text-zinc-300">
          Preparing your workspace
        </p>
      </div>
    </div>
  );
}
