import { profile } from '../data/data.js';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="section py-8 text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-left">{profile.footer}</p>
        <div className="text-slate-500 dark:text-slate-400 text-xs">Built with React, Vite, TailwindCSS</div>
      </div>
    </footer>
  );
}


