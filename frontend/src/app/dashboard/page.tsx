"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TaskFilters from "@/components/dashboard/TaskFilters";
import TaskForm from "@/components/dashboard/TaskForm";
import TaskList from "@/components/dashboard/TaskList";
import ProfileCard from "@/components/dashboard/ProfileCard";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiDelete, apiGet, apiPost, apiPut } from "@/lib/apiClient";
import { ProfileForm, Task, TaskPayload } from "@/types/dashboard";
import LoadingScreen from "@/components/dashboard/Loading";

const initialTasks: Task[] = [
  {
    id: crypto.randomUUID(),
    name: "Loading tasks...",
    desc: "Fetching latest mission queue.",
    status: false,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { checking, checked } = useAuthGuard();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskForm, setTaskForm] = useState({ name: "", desc: "" });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "done">(
    "all"
  );

  const [profile, setProfile] = useState<ProfileForm>({
    username: "",
    email: "",
  });
  const [profileEditing, setProfileEditing] = useState(false);

  // If auth check completed and user is not authenticated, force redirect client-side
  useEffect(() => {
    if (checking) return; 

    if (!checked) {
      console.log("not authenticated, redirecting");
      router.replace("/login");
    }
  }, [checked, checking, router]);

  // Fetch profile and tasks after auth checked
  useEffect(() => {
    if (!checked) return;

    const fetchAll = async () => {
      try {
        const profileData = await apiGet<ProfileForm>("/profile");
        setProfile({
          username: profileData.username ?? "",
          email: profileData.email ?? "",
        });
      } catch (err) {
        console.error("Profile fetch failed", err);
      }

      try {
        const data = await apiGet<Task[]>("/tasks");
        const mapped: Task[] = (data ?? []).map((t: any) => ({
          id: t.id ?? crypto.randomUUID(),
          name: t.name ?? "Untitled",
          desc: t.desc ?? "",
          status: Boolean(t.status),
        }));
        setTasks(mapped);
      } catch (err) {
        console.error("Tasks fetch failed", err);
        setTasks([]);
      }
    };

    fetchAll();
  }, [checked]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.name.toLowerCase().includes(search.toLowerCase()) ||
        task.desc.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "done"
          ? task.status
          : !task.status;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const addTask = async () => {
    if (!taskForm.name.trim()) return;
    const payload: TaskPayload = {
      name: taskForm.name.trim(),
      desc: taskForm.desc.trim(),
      status: false,
    };
    try {
      const data = await apiPost<{ task: Task }>("/tasks", payload);
      const created: Task = {
        id: data.task?.id ?? crypto.randomUUID(),
        name: data.task?.name ?? payload.name,
        desc: data.task?.desc ?? payload.desc,
        status: Boolean(data.task?.status ?? false),
      };
      setTasks((prev) => [created, ...prev]);
      setTaskForm({ name: "", desc: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    try {
      await apiPut(`/tasks/${id}`, updates);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await apiDelete(`/tasks/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileSave = () => {
    setProfileEditing(false);
    const save = async () => {
      try {
        await apiPost(`/edit`, profile);
      } catch (err) {
        console.error(err);
      }
    };
    void save();
  };

  if (checking) {
    return <LoadingScreen />
  }

  return (
    <div className="relative min-h-screen bg-[#05070D] text-zinc-100 overflow-hidden dashboard-container">
      {/* Galaxy background layers */}
      <div className="pointer-events-none absolute inset-0">
        {/* Deep space glow */}
        <div className="absolute left-1/4 top-[-25%] h-[600px] w-[600px] rounded-full bg-indigo-900/25 blur-[120px]" />
        <div className="absolute right-[-20%] bottom-[-30%] h-[700px] w-[700px] rounded-full bg-violet-900/20 blur-[160px]" />

        {/* Faint star dust */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.04),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.03),transparent_45%)]" />
      </div>

      <Navbar />

      <main className="relative mx-auto flex min-h-[calc(100vh-64px)] w-full max-w-6xl flex-col px-4 pb-20 pt-10 md:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
            Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-400">
            A quiet place to plan, track, and move work forward.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Tasks Panel */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-white/2 p-6 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
            {/* Header */}
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-medium tracking-tight text-zinc-100">
                  Tasks
                </h2>
                <p className="text-sm text-zinc-500">
                  Organize your work in quiet focus.
                </p>
              </div>

              <TaskFilters
                search={search}
                statusFilter={statusFilter}
                onSearch={setSearch}
                onStatus={(val) => setStatusFilter(val)}
              />
            </div>

            {/* Task Form */}
            <div className="mb-5 rounded-xl border border-white/5 bg-black/30 p-4">
              <TaskForm
                name={taskForm.name}
                desc={taskForm.desc}
                onChange={(u) => setTaskForm((prev) => ({ ...prev, ...u }))}
                onAdd={addTask}
              />
            </div>

            {/* Task List */}
            <div className="space-y-2">
              <TaskList
                tasks={filteredTasks}
                onDelete={deleteTask}
                onToggle={(id, status) => updateTask(id, { status })}
                onUpdate={(id, updates) => updateTask(id, updates)}
              />
            </div>
          </div>

          {/* Profile Panel */}
          <div className="rounded-2xl border border-white/5 bg-linear-to-b from-white/4 to-white/2 p-5 backdrop-blur-md">
            <ProfileCard
              profile={profile}
              editing={profileEditing}
              onToggle={() => setProfileEditing((v) => !v)}
              onChange={(u) => setProfile((p) => ({ ...p, ...u }))}
              onSave={handleProfileSave}
            />
          </div>
        </section>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { label: "Total Tasks", value: filteredTasks.length },
            {
              label: "Completed",
              value: filteredTasks.filter((t) => t.status === true).length,
            },
            { label: "Focus Mode", value: "Active" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/5 bg-white/3 px-4 py-3 text-sm backdrop-blur-md"
            >
              <p className="text-zinc-500">{item.label}</p>
              <p className="mt-1 text-lg font-medium text-zinc-100">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
