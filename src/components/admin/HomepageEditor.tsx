"use client";

import { useState, useEffect } from "react";

type SectionItem = { id?: number; text: string; link?: string | null; linkKey?: string | null; linkUrl?: string | null };
type HomepageData = {
  currently: SectionItem[];
  past: SectionItem[];
  random: SectionItem[];
};

type Fetcher = (url: string, options?: RequestInit) => Promise<Response>;

export default function HomepageEditor({ fetcher }: { fetcher: Fetcher }) {
  const [data, setData] = useState<HomepageData | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetcher("/api/admin/homepage")
      .then((r) => r.json())
      .then((d) => { if (!cancelled) setData(d); });
    return () => { cancelled = true; };
  }, [fetcher]);

  const save = async () => {
    setSaving(true);
    setStatus("");
    const res = await fetcher("/api/admin/homepage", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? "Saved" : "Error saving");
    setSaving(false);
    setTimeout(() => setStatus(""), 2000);
  };

  if (!data) return <p className="text-neutral-500">Loading...</p>;

  const updateItem = (
    section: "currently" | "past",
    index: number,
    field: string,
    value: string
  ) => {
    setData((prev) => {
      if (!prev) return prev;
      const items = [...prev[section]];
      const item = { ...items[index] };
      if (field === "text") item.text = value;
      else if (field === "linkKey") item.linkKey = value || null;
      else if (field === "linkUrl") item.linkUrl = value || null;
      items[index] = item;
      return { ...prev, [section]: items };
    });
  };

  const addItem = (section: "currently" | "past") => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, [section]: [...prev[section], { text: "" }] };
    });
  };

  const removeItem = (section: "currently" | "past", index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, [section]: prev[section].filter((_, i) => i !== index) };
    });
  };

  const updateRandom = (index: number, field: "text" | "link", value: string) => {
    setData((prev) => {
      if (!prev) return prev;
      const items = [...prev.random];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, random: items };
    });
  };

  const addRandom = () => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, random: [...prev.random, { text: "", link: "" }] };
    });
  };

  const removeRandom = (index: number) => {
    setData((prev) => {
      if (!prev) return prev;
      return { ...prev, random: prev.random.filter((_, i) => i !== index) };
    });
  };

  const renderSection = (section: "currently" | "past") => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold capitalize">{section}</h3>
        <button onClick={() => addItem(section)} className="text-sm text-blue-600 hover:underline">
          + Add item
        </button>
      </div>
      {data[section].map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          <div className="flex-1 space-y-1">
            <input
              value={item.text}
              onChange={(e) => updateItem(section, i, "text", e.target.value)}
              placeholder="Text (use @name for links)"
              className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
            />
            <div className="flex gap-2">
              <input
                value={item.linkKey || ""}
                onChange={(e) => updateItem(section, i, "linkKey", e.target.value)}
                placeholder="@mention"
                className="w-1/3 px-2 py-1 text-xs border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
              />
              <input
                value={item.linkUrl || ""}
                onChange={(e) => updateItem(section, i, "linkUrl", e.target.value)}
                placeholder="URL"
                className="flex-1 px-2 py-1 text-xs border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
              />
            </div>
          </div>
          <button
            onClick={() => removeItem(section, i)}
            className="text-red-500 hover:text-red-700 text-sm mt-1"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderSection("currently")}
      {renderSection("past")}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Random</h3>
          <button onClick={addRandom} className="text-sm text-blue-600 hover:underline">
            + Add item
          </button>
        </div>
        {data.random.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="flex-1 space-y-1">
              <input
                value={item.text}
                onChange={(e) => updateRandom(i, "text", e.target.value)}
                placeholder="Title"
                className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
              />
              <input
                value={item.link || ""}
                onChange={(e) => updateRandom(i, "link", e.target.value)}
                placeholder="URL"
                className="w-full px-2 py-1 text-xs border border-neutral-200 dark:border-neutral-700 rounded bg-white dark:bg-neutral-800"
              />
            </div>
            <button
              onClick={() => removeRandom(i)}
              className="text-red-500 hover:text-red-700 text-sm mt-1"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
        {status && <span className="text-sm text-green-600">{status}</span>}
      </div>
    </div>
  );
}
