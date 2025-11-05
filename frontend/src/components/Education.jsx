import { useEffect, useState } from 'react';

export default function Education() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    fetch(`${base}/educations/`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section id="education" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Education</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Academic background</p>
      {loading ? (
        <div className="mt-4 text-slate-500 dark:text-slate-400">Loading education...</div>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((it) => (
            <div key={it.id} className="card p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <div className="font-semibold">{it.degree} • {it.institution}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {it.start_date} — {it.end_date || 'Present'}
                </div>
              </div>
              {it.location && (<div className="text-sm text-slate-500 dark:text-slate-400">{it.location}</div>)}
              {it.description && (<p className="mt-2 text-slate-600 dark:text-slate-300">{it.description}</p>)}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}


