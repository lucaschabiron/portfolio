"use client";

import { useState, useEffect } from "react";

type PostMeta = { slug: string; title: string; date: string };
type PostFull = { slug: string; title: string; description: string; date: string; content: string };

type Fetcher = (url: string, options?: RequestInit) => Promise<Response>;

export default function PostsEditor({ fetcher }: { fetcher: Fetcher }) {
  const [posts, setPosts] = useState<PostMeta[]>([]);
  const [editingPost, setEditingPost] = useState<PostFull | null>(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({ slug: "", title: "", description: "", date: "", content: "" });
  const [status, setStatus] = useState("");

  const load = async () => {
    const res = await fetcher("/api/admin/posts");
    setPosts(await res.json());
  };

  useEffect(() => {
    let cancelled = false;
    fetcher("/api/admin/posts")
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setPosts(data); });
    return () => { cancelled = true; };
  }, [fetcher]);

  const flash = (msg: string) => {
    setStatus(msg);
    setTimeout(() => setStatus(""), 2000);
  };

  const openPost = async (slug: string) => {
    const res = await fetcher(`/api/admin/posts?slug=${slug}`);
    const post = await res.json();
    const dateStr = typeof post.date === "string" ? post.date.slice(0, 10) : new Date(post.date).toISOString().slice(0, 10);
    setEditingPost(post);
    setDraft({
      slug: post.slug,
      title: post.title,
      description: post.description || "",
      date: dateStr,
      content: post.content,
    });
    setCreating(false);
  };

  const startCreate = () => {
    setDraft({ slug: "", title: "", description: "", date: new Date().toISOString().slice(0, 10), content: "" });
    setCreating(true);
    setEditingPost(null);
  };

  const cancel = () => {
    setCreating(false);
    setEditingPost(null);
  };

  const save = async () => {
    if (creating) {
      if (!draft.slug.trim() || !draft.title.trim()) return;
      const slug = draft.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
      await fetcher("/api/admin/posts", {
        method: "POST",
        body: JSON.stringify({ slug, title: draft.title, description: draft.description, date: draft.date, content: draft.content }),
      });
      flash("Created");
    } else if (editingPost) {
      await fetcher("/api/admin/posts", {
        method: "PUT",
        body: JSON.stringify({ slug: editingPost.slug, title: draft.title, description: draft.description, date: draft.date, content: draft.content }),
      });
      flash("Saved");
    }
    cancel();
    load();
  };

  const remove = async (slug: string) => {
    if (!confirm(`Delete post "${slug}"?`)) return;
    await fetcher("/api/admin/posts", { method: "DELETE", body: JSON.stringify({ slug }) });
    flash("Deleted");
    load();
  };

  const showEditor = creating || editingPost !== null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Posts ({posts.length})</h3>
        {!showEditor && (
          <button onClick={startCreate} className="text-sm text-blue-600 hover:underline">
            + New post
          </button>
        )}
      </div>

      {status && <p className="text-sm text-green-600">{status}</p>}

      {showEditor && (
        <div className="space-y-2">
          {creating && (
            <input
              value={draft.slug}
              onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
              placeholder="post-slug (e.g. my-new-post)"
              className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
            />
          )}
          {editingPost && (
            <p className="text-sm text-neutral-500">Editing: {editingPost.slug}</p>
          )}
          <input
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="Title"
            className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
          />
          <div className="flex gap-2">
            <input
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              placeholder="Description"
              className="flex-1 px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
            />
            <input
              type="date"
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              className="px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
            />
          </div>
          <textarea
            value={draft.content}
            onChange={(e) => setDraft({ ...draft, content: e.target.value })}
            rows={20}
            placeholder="Markdown content..."
            className="w-full px-3 py-2 text-sm font-mono border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800 resize-y"
          />
          <div className="flex gap-2">
            <button
              onClick={save}
              className="px-3 py-1.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded text-sm font-medium hover:opacity-90"
            >
              {creating ? "Create" : "Save"}
            </button>
            <button onClick={cancel} className="px-3 py-1.5 text-sm text-neutral-500 hover:text-neutral-700">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {posts.map((p) => (
          <div
            key={p.slug}
            className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-md"
          >
            <div>
              <p className="font-medium text-sm">{p.title}</p>
              <p className="text-xs text-neutral-500">{p.date} &middot; {p.slug}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openPost(p.slug)} className="text-xs text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => remove(p.slug)} className="text-xs text-red-500 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
