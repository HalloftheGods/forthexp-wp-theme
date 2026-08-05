import { Zap, Heart, MessageSquare, Terminal, Shield } from 'lucide-react';

interface FooterProps {
  onSectionClick: (sectionId: string) => void;
}

export default function Footer({ onSectionClick }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-slate-950/20 py-16 px-6" id="footer-section">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 text-left items-start">
        
        {/* BRAND COLUMN (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSectionClick('hero')}>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg text-white shadow-md">
              <Zap className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-lg text-white tracking-tight">ForTheXP.com</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            A high-performance gamification engine engineered for scale. Seamlessly inject bespoke XP loops, unlockable milestones, and robust leaderboard caches directly into your application architecture.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
            <span>Powered by PHP, Node & React</span>
            <span>•</span>
            <span className="flex items-center gap-0.5 text-indigo-400">
              <Heart className="h-3 w-3 fill-current" />
              For All Web & App Developers
            </span>
          </div>
        </div>

        {/* QUICK MENU COLUMN (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold block">Engine Links</span>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <button onClick={() => onSectionClick('simulator')} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                <Terminal className="h-3.5 w-3.5 text-indigo-500/60" />
                Live Simulator
              </button>
            </li>
            <li>
              <button onClick={() => onSectionClick('playground')} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                <Terminal className="h-3.5 w-3.5 text-indigo-500/60" />
                Code Playground
              </button>
            </li>
            <li>
              <button onClick={() => onSectionClick('documentation')} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                <MessageSquare className="h-3.5 w-3.5 text-indigo-500/60" />
                API Documentation
              </button>
            </li>
            <li>
              <button onClick={() => onSectionClick('wp-guide')} className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer">
                <Shield className="h-3.5 w-3.5 text-indigo-500/60" />
                Integration Blueprint
              </button>
            </li>
          </ul>
        </div>

        {/* COMPATIBILITY COLUMNS (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold block">Market Integrations</span>
          <p className="text-xs text-slate-400 leading-normal">
            ForTheXP is a powerful gamification engine designed to supercharge user retention across SaaS platforms, e-commerce stores, learning management systems, and thriving online communities.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1.5">
            <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">Universal REST API</span>
            <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">WordPress & Node Ready</span>
            <span className="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">React / Vue SDKs</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-mono text-slate-600">
          © {new Date().getFullYear()} ForTheXP.com. Built as a universal gamification engine & developer platform. All rights reserved.
        </p>
        <div className="flex gap-4 text-[10px] font-mono text-slate-500">
          <a href="#hero-section" className="hover:text-slate-300">Back to Top</a>
          <span>·</span>
          <a href="#documentation" className="hover:text-slate-300">SDK Terms</a>
          <span>·</span>
          <a href="#wp-guide" className="hover:text-slate-300">WP Export License</a>
        </div>
      </div>
    </footer>
  );
}
