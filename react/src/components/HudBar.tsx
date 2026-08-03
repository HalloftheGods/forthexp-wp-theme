import { ShieldCheck, Zap, Star, Trophy } from 'lucide-react';
import { EngineState } from '../types';

interface HudBarProps {
  engineState: EngineState;
}

export default function HudBar({ engineState }: HudBarProps) {
  const levelProgressPercent = Math.min(100, Math.max(0, (engineState.current_xp / engineState.target_xp) * 100));

  return (
    <div className="fixed bottom-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-t border-white/10 px-6 py-2 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Character Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 p-[2px] flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <div className="h-full w-full bg-slate-900 rounded-[6px] flex items-center justify-center text-slate-200 font-bold text-sm">
                Lvl {engineState.level}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white flex items-center gap-1">
              DevAdventurer
              <ShieldCheck className="h-3 w-3 text-indigo-400" />
            </h3>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-indigo-400 border border-white/10 font-medium">
              {engineState.title}
            </span>
          </div>
        </div>

        {/* XP Bar */}
        <div className="flex-1 max-w-md mx-auto min-w-[200px]">
          <div className="flex justify-between items-end text-[10px] font-mono mb-1">
            <span className="text-slate-400 uppercase tracking-widest">XP</span>
            <span className="text-slate-300 font-medium">
              {engineState.total_xp} / <span className="text-slate-500">{engineState.total_xp + engineState.target_xp - engineState.current_xp}</span>
            </span>
          </div>
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <div 
              style={{ width: `${levelProgressPercent}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)] transition-all duration-500"
            ></div>
          </div>
        </div>

        {/* Currency Resources */}
        <div className="flex items-center gap-2">
          {/* AP */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-emerald-500/20 px-3 py-1.5 rounded-lg shadow-[inset_0_0_10px_rgba(16,185,129,0.05)]">
            <Zap className="h-4 w-4 text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" />
            <div className="flex flex-col">
              <span className="text-[8px] text-emerald-500 font-mono uppercase font-bold leading-none mb-0.5">AP</span>
              <span className="text-xs font-bold font-mono text-emerald-300 leading-none">{engineState.total_ap}</span>
            </div>
          </div>

          {/* GP */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-amber-500/20 px-3 py-1.5 rounded-lg shadow-[inset_0_0_10px_rgba(245,158,11,0.05)]">
            <Star className="h-4 w-4 text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.5)]" />
            <div className="flex flex-col">
              <span className="text-[8px] text-amber-500 font-mono uppercase font-bold leading-none mb-0.5">GP</span>
              <span className="text-xs font-bold font-mono text-amber-300 leading-none">{engineState.total_gp}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
