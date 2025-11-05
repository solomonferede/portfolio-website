import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar({ onToggleTheme, isDark }) {
  const [open, setOpen] = useState(false);

  const items = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Tech Stack' },
    { href: '#contact', label: 'Contact' },
  ];

  function handleNavClick(e, href) {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/70 backdrop-blur border-b border-slate-200/60 dark:border-slate-800/60">
      <nav className="section py-4 flex items-center justify-between">
        <Link to="/" className="font-semibold text-lg tracking-tight">
          <span className="text-brand-600">Solomon</span> Ferede
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="text-sm hover:text-brand-600" onClick={(e) => handleNavClick(e, it.href)}>
              {it.label}
            </a>
          ))}
          <button aria-label="Toggle Theme" onClick={onToggleTheme} className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button aria-label="Toggle Theme" onClick={onToggleTheme} className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <button aria-label="Open Menu" onClick={() => setOpen((o) => !o)} className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden container-px pb-4">
          <div className="card p-4 flex flex-col gap-3">
            {items.map((it) => (
              <a key={it.href} href={it.href} className="py-1" onClick={(e) => handleNavClick(e, it.href)}>
                {it.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


