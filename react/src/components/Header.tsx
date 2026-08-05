import { Award, Zap, Terminal, Globe, Key } from 'lucide-react';

interface HeaderProps {
  onSectionClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onSectionClick, activeSection }: HeaderProps) {
  const navItems = [
    { id: 'simulator', label: 'Engine Simulator', icon: Zap },
    { id: 'pricing', label: 'Pricing & API Keys', icon: Key },
    { id: 'playground', label: 'Code Snippets', icon: Terminal },
    { id: 'documentation', label: 'Documentation', icon: Award },
    { id: 'wp-guide', label: 'WP Theme Guide', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div 
          onClick={() => onSectionClick('hero')} 
          className="flex items-center gap-2 cursor-pointer group"
          id="header-logo-container"
        >
          <div className="bg-indigo-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap className="h-6 w-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-xl text-white tracking-tight">ForThe<span className="text-indigo-400">XP</span></span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-medium border border-indigo-500/20">
                .com
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Bespoke Gamification Core</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-wrap items-center justify-center gap-1 bg-white/5 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-all duration-200 ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/10 font-semibold shadow-md backdrop-blur-xl'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                id={`nav-${item.id}`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* External Tags & Quick Info */}
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 font-mono">
            v1.2.0-stable
          </span>
          <span className="text-[11px] px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono flex items-center gap-1.5 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Universal Engine
          </span>
        </div>

      </div>
    </header>
  );
}
