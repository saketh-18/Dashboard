import React from "react";

type Props = {
  name: string;
  desc: string;
  onChange: (updates: { name?: string; desc?: string }) => void;
  onAdd: () => void;
};

export default function TaskForm({ name, desc, onChange, onAdd }: Props) {
  return (
    <div className="mb-5 grid gap-3 rounded-xl border border-white/10 bg-black/25 p-4 md:grid-cols-2">
      <input
        value={name}
        onChange={(e) => onChange({ name: e.target.value })}
        placeholder="Task title"
        className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-indigo-400/50"
      />

      <input
        value={desc}
        onChange={(e) => onChange({ desc: e.target.value })}
        placeholder="Details"
        className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-indigo-400/50"
      />

      <button
        onClick={onAdd}
        className="md:col-span-2 rounded-md bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-500/30"
      >
        Add Task
      </button>
    </div>
  );
}
