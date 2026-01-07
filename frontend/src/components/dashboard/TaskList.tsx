import React from "react";
import { Task } from "@/types/dashboard";

type Props = {
  tasks: Task[];
  onDelete: (id: string) => void;
  onToggle: (id: string, status: boolean) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
};

export default function TaskList({
  tasks,
  onDelete,
  onToggle,
  onUpdate,
}: Props) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<{ name: string; desc: string }>({
    name: "",
    desc: "",
  });

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setDraft({ name: task.name, desc: task.desc });
  };

  const saveEdit = (taskId: string) => {
    onUpdate(taskId, { name: draft.name.trim(), desc: draft.desc.trim() });
    setEditingId(null);
  };

  if (!tasks.length) {
    return (
      <div className="md:col-span-2 rounded-xl border border-white/10 bg-black/30 p-6 text-center text-zinc-400">
        No tasks match your filters.
      </div>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {tasks.map((task) => (
        <article
          key={task.id}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-indigo-400/40"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                {task.status ? "Done" : "Open"}
              </p>

              {editingId === task.id ? (
                <>
                  <input
                    value={draft.name}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, name: e.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-white/10 bg-black/30 px-2 py-1 text-sm text-zinc-100 outline-none"
                  />
                  <input
                    value={draft.desc}
                    onChange={(e) =>
                      setDraft((d) => ({ ...d, desc: e.target.value }))
                    }
                    className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-2 py-1 text-sm text-zinc-100 outline-none"
                  />
                </>
              ) : (
                <>
                  <h3 className="mt-1 text-base font-medium text-zinc-100">
                    {task.name}
                  </h3>
                  <p className="text-sm text-zinc-400">{task.desc}</p>
                </>
              )}
            </div>

            <button
              onClick={() => onDelete(task.id)}
              className="text-xs text-zinc-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => onToggle(task.id, !task.status)}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-zinc-200 hover:bg-white/10"
            >
              {task.status ? "Mark Open" : "Mark Done"}
            </button>

            {editingId === task.id ? (
              <>
                <button
                  onClick={() => saveEdit(task.id)}
                  className="rounded-md bg-indigo-500/20 px-3 py-1 text-indigo-100 hover:bg-indigo-500/30"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-zinc-200 hover:bg-white/10"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => startEdit(task)}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-zinc-200 hover:bg-white/10"
              >
                Edit
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
