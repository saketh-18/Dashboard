import React, { FormEvent } from "react";
import { ProfileForm } from "@/types/dashboard";
import { LogoutStore } from "../../../stores/logout-store";

type Props = {
  profile: ProfileForm;
  editing: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<ProfileForm>) => void;
  onSave: () => void;
};

export default function ProfileCard({
  profile,
  editing,
  onToggle,
  onChange,
  onSave,
}: Props) {
  const setLogout = LogoutStore((s) => s.setLogout);

  function handleLogout() {
    localStorage.removeItem("token");
    setLogout(true);
  }
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
            Profile
          </p>
          <h3 className="mt-1 text-lg font-medium text-zinc-100">Pilot Card</h3>
          <p className="text-sm text-zinc-400">Manage your account details</p>
        </div>

        <button
          onClick={onToggle}
          className="rounded-md border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-200 hover:bg-white/10"
        >
          {editing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <input
          value={profile.username}
          disabled={!editing}
          onChange={(e) => onChange({ username: e.target.value })}
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-indigo-400/50 disabled:opacity-60"
        />

        <input
          value={profile.email}
          disabled={!editing}
          onChange={(e) => onChange({ email: e.target.value })}
          className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-indigo-400/50 disabled:opacity-60"
        />

        {editing && (
          <button
            onClick={onSave}
            className="w-full rounded-md bg-indigo-500/15 px-4 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-500/25"
          >
            Save Changes
          </button>
        )}

        <button
          onClick={handleLogout}
          className="w-full rounded-md border border-red-400/30 bg-red-500/5 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10"
        >
          Logout
        </button>
      </div>
    </section>
  );
}
