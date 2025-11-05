import { useEffect, useState } from 'react';

export default function Certificates() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    fetch(`${base}/certificates/`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section id="certificates" className="section">
      <h2 className="text-2xl sm:text-3xl font-bold">Certificates</h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">Certifications and credentials</p>
      {loading ? (
        <div className="mt-4 text-slate-500 dark:text-slate-400">Loading certificates...</div>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((it) => (
            <div key={it.id} className="card p-5">
              <div className="flex flex-wrap justify-between gap-2">
                <div className="font-semibold">{it.name}{it.issuer ? ` • ${it.issuer}` : ''}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{it.issue_date || ''}</div>
              </div>
              {it.description && (<p className="mt-2 text-slate-600 dark:text-slate-300">{it.description}</p>)}
              {it.credential_url && (
                <div className="mt-2"><a href={it.credential_url} target="_blank" rel="noreferrer" className="text-sm text-brand-600 hover:underline">View credential</a></div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}


