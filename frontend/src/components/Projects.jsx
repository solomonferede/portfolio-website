import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function ProjectCard({ project, i }) {
  return (
    <motion.a
      href={project.link || '#'}
      target={project.link && project.link.startsWith('http') ? '_blank' : undefined}
      rel={project.link && project.link.startsWith('http') ? 'noreferrer' : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: i * 0.05 }}
      className="group card overflow-hidden hover:shadow-lg transition-shadow"
    >
      {project.image && (
        <div className="relative">
          <div className="aspect-video bg-slate-100 dark:bg-slate-800">
            {/* eslint-disable-next-line */}
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tech?.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-brand-600/10 text-brand-700 dark:text-brand-300 border border-brand-600/20">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
    fetch(`${base}/projects/`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        const normalized = (Array.isArray(data) ? data : [])
          .map((p) => ({
            id: p.id,
            title: p.title,
            description: p.description,
            tech: (p.technologies || '')
              .split(',')
              .map((t) => t.trim())
              .filter(Boolean),
            link: p.live_link || p.github_link || '#',
            image: '/vite.svg',
          }));
        setProjects(normalized);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <section id="projects" className="section">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Highlighted Projects</h2>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Selected work that aligns with practical impact</p>
        </div>
      </div>
      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">Loading projects...</div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} i={i} />
          ))}
        </div>
      )}
    </section>
  );
}


