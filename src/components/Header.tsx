import { BarChart3, Bookmark, GitCompareArrows, GraduationCap, LayoutDashboard, Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export type Screen = 'overview' | 'explore' | 'compare' | 'saved' | 'review';

type HeaderProps = { screen: Screen; onNavigate: (screen: Screen) => void; savedCount: number; compareCount: number };

const links: Array<{ id: Screen; label: string; icon: typeof Search }> = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'compare', label: 'Compare', icon: GitCompareArrows },
  { id: 'saved', label: 'Saved', icon: Bookmark }
];

export function Header({ screen, onNavigate, savedCount, compareCount }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const go = (next: Screen) => { onNavigate(next); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <header className="app-header">
      <nav className="app-nav">
        <button className="brand brand-button" onClick={() => go('overview')}>
          <span className="logo-mark"><GraduationCap size={22} /></span><span>Course<span>Heat</span></span>
        </button>
        <div className={`nav-links app-nav-links ${open ? 'open' : ''}`}>
          {links.map(({ id, label, icon: Icon }) => (
            <button key={id} className={screen === id ? 'active' : ''} onClick={() => go(id)}>
              <Icon size={17} />{label}
              {id === 'saved' && savedCount > 0 && <em>{savedCount}</em>}
              {id === 'compare' && compareCount > 0 && <em>{compareCount}</em>}
            </button>
          ))}
        </div>
        <button className="button primary compact nav-cta" onClick={() => go('review')}><BarChart3 size={17} /> Write a review</button>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </nav>
    </header>
  );
}
