"use client";

import { useState, useEffect } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
  link: string;
};

type Fetcher = (url: string, options?: RequestInit) => Promise<Response>;

export default function ProjectsEditor({ fetcher }: { fetcher: Fetcher }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState({ title: "", description: "", status: "Active", tags: [] as string[], link: "" });
  const [tagsInput, setTagsInput] = useState("");
  const [adding, setAdding] = useState(false);
  const [status, setStatus] = useState("");

  const load = async () => {
    const res = await fetcher("/api/admin/projects");
    setProjects(await res.json());
  };

  useEffect(() => {
    let cancelled = false;
    fetcher("/api/admin/projects")
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setProjects(data); });
    return () => { cancelled = true; };
  }, [fetcher]);

  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 2000);
  };

  const startAdd = () => {
    setDraft({ title: "", description: "", status: "Active", tags: [], link: "" });
    setTagsInput("");
    setAdding(true);
    setEditing(null);
  };

  const startEdit = (project: Project) => {
    setDraft({ title: project.title, description: project.description, status: project.status, tags: project.tags, link: project.link });
    setTagsInput(project.tags.join(", "));
    setEditing(project.id);
    setAdding(false);
  };

  const cancel = () => {
    setAdding(false);
    setEditing(null);
  };

  const saveDraft = async () => {
    const project = { ...draft, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
    if (adding) {
      await fetcher("/api/admin/projects", { method: "POST", body: JSON.stringify(project) });
      flash("Added");
    } else if (editing !== null) {
      await fetcher("/api/admin/projects", { method: "PUT", body: JSON.stringify({ id: editing, ...project }) });
      flash("Updated");
    }
    cancel();
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    await fetcher("/api/admin/projects", { method: "DELETE", body: JSON.stringify({ id }) });
    flash("Deleted");
    load();
  };

  const showForm = adding || editing !== null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Projects ({projects.length})</h3>
        {!showForm && (
          <button onClick={startAdd} className="text-sm text-blue-600 hover:underline">
            + Add project
          </button>
        )}
      </div>

      {status && <p className="text-sm text-green-600">{status}</p>}

      {showForm && (
        <div className="space-y-2 p-4 border border-neutral-200 dark:border-neutral-700 rounded-md">
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="Title"
            className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
          />
          <input
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="Description"
            className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
          />
          <div className="flex gap-2">
            <select
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              className="px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
            >
              <option value="Active">Active</option>
              <option value="Finished">Finished</option>
            </select>
            <input
              value={draft.link}
              onChange={(e) => setDraft({ ...draft, link: e.target.value })}
              placeholder="Link URL"
              className="flex-1 px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
            />
          </div>
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
          />
          <div className="flex gap-2">
            <button
              onClick={saveDraft}
              className="px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded text-sm font-medium hover:opacity-90"
            >
              {adding ? "Add" : "Update"}
            </button>
            <button onClick={cancel} className="px-3 py-1.5 text-sm text-neutral-500 hover:text-neutral-700">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-md"
          >
            <div>
              <p className="font-medium text-sm">{p.title}</p>
              <p className="text-xs text-neutral-500">
                {p.status} &middot; {p.tags.join(", ")}
              </p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(p)} className="text-xs text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => remove(p.id)} className="text-xs text-red-500 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
