import React from "react";

type Props = {
  search: string;
  statusFilter: "all" | "open" | "done";
  onSearch: (val: string) => void;
  onStatus: (val: "all" | "open" | "done") => void;
};

export default function TaskFilters({
  search,
  statusFilter,
  onSearch,
  onStatus,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
        className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-indigo-400/50"
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatus(e.target.value as Props["statusFilter"])}
        className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-indigo-400/50"
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
