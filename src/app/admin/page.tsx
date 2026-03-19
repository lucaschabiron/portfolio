"use client";

import { useState, useCallback } from "react";
import HomepageEditor from "@/components/admin/HomepageEditor";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import PostsEditor from "@/components/admin/PostsEditor";

const TABS = ["Homepage", "Projects", "Posts"] as const;
type Tab = (typeof TABS)[number];

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("Homepage");
  const [logging, setLogging] = useState(false);

  const login = async () => {
    setLogging(true);
    setError("");
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key }),
    });
    if (res.ok) {
      setAuthed(true);
      sessionStorage.setItem("admin-key", key);
    } else {
      setError("Invalid key");
    }
    setLogging(false);
  };

  const adminKey = authed ? sessionStorage.getItem("admin-key")! : "";

  const fetcher = useCallback(
    (url: string, options?: RequestInit) =>
      fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
          ...options?.headers,
        },
      }),
    [adminKey]
  );

  if (!authed) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-sm p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">Admin</h1>
          <input
            type="password"
            placeholder="Admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={login}
            disabled={logging}
            className="w-full py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md font-medium hover:opacity-90 disabled:opacity-50"
          >
            {logging ? "..." : "Login"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("admin-key");
            setAuthed(false);
            setKey("");
          }}
          className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          Logout
        </button>
      </div>

      <div className="flex gap-1 border-b border-neutral-200 dark:border-neutral-700">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100"
                : "border-transparent text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Homepage" && <HomepageEditor fetcher={fetcher} />}
      {tab === "Projects" && <ProjectsEditor fetcher={fetcher} />}
      {tab === "Posts" && <PostsEditor fetcher={fetcher} />}
    </div>
  );
}
