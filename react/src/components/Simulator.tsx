import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, Zap, RefreshCw, Send, Plus, 
  Terminal, ShieldCheck, User, Star, Award, MessageSquare, BookOpen, Bug, Flame
} from 'lucide-react';
import { playXpSound } from '../utils/audio';
import { EngineState, GamificationAction, Achievement, LogEntry } from '../types';

interface SimulatorProps {
  engineState: EngineState;
  unlockedAchievements: string[];
  logs: LogEntry[];
  onAddXp: (amount: number, actionName: string, type: LogEntry['type'], payload?: any) => void;
  onDecayAp: (amount: number) => void;
  onSpendGp: (amount: number, item: string) => void;
  onReset: () => void;
  isLive: boolean;
}

// Fixed milestones for levels
export function getLevelInfo(xp: number) {
  if (xp < 100) {
    return { level: 1, minXp: 0, maxXp: 100, label: 'Noob Coder', color: 'from-slate-400 to-slate-500' };
  } else if (xp < 250) {
    return { level: 2, minXp: 100, maxXp: 250, label: 'Script Apprentice', color: 'from-cyan-400 to-indigo-400' };
  } else if (xp < 500) {
    return { level: 3, minXp: 250, maxXp: 500, label: 'Syntax Warrior', color: 'from-indigo-400 to-purple-400' };
  } else if (xp < 900) {
    return { level: 4, minXp: 500, maxXp: 900, label: 'Fullstack Alchemist', color: 'from-purple-400 to-pink-400' };
  } else if (xp < 1500) {
    return { level: 5, minXp: 900, maxXp: 1500, label: 'Master Architect', color: 'from-pink-400 to-rose-400' };
  } else {
    // Infinite level formulas
    const extraXp = xp - 1500;
    const levelIndex = Math.floor(extraXp / 800);
    const min = 1500 + levelIndex * 800;
    const max = min + 800;
    return { 
      level: 6 + levelIndex, 
      minXp: min, 
      maxXp: max, 
      label: 'Gamification Deity 👑', 
      color: 'from-rose-400 via-purple-500 to-indigo-500 bg-animate' 
    };
  }
}

export const AVAILABLE_ACTIONS: GamificationAction[] = [
  { id: 'comment', name: 'Post Quality Comment', xpReward: 15, gpReward: 5, description: 'User submits a blog comment', iconName: 'MessageSquare' },
  { id: 'publish_post', name: 'Publish Article', xpReward: 45, gpReward: 20, apReward: 10, description: 'WordPress author publishes a post', iconName: 'BookOpen' },
  { id: 'debug_code', name: 'Solve Bug Ticket', xpReward: 30, apReward: 25, description: 'Fixed a code bug or reported issue', iconName: 'Bug' },
  { id: 'daily_streak', name: 'Consecutive Daily Visit', xpReward: 10, gpReward: 50, description: 'Logged in 3 days in a row', iconName: 'Flame' },
];

export const AVAILABLE_ITEMS = [
  { id: 'neon_glow', name: 'Neon Profile Glow', cost: 100, description: 'Surrounds your profile card in a neon pulse.', iconName: 'Star', color: 'bg-pink-500' },
  { id: 'golden_ticket', name: 'Golden Access Pass', cost: 250, description: 'Temporary access to VIP forums.', iconName: 'Trophy', color: 'bg-amber-500' }
];

export const AVAILABLE_ABILITIES = [
  { id: 'turbo_compiler', name: 'Turbo Compiler', maintenanceCost: 50, description: 'Requires 50 AP velocity. Reduces load times.', iconName: 'Zap', color: 'text-emerald-400' },
  { id: 'bug_hunter', name: 'Bug Hunter Vision', maintenanceCost: 150, description: 'Requires 150 AP velocity. Highlights syntax errors automatically.', iconName: 'ShieldCheck', color: 'text-indigo-400' }
];

export const GAME_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_steps', name: 'Hello World', description: 'Earn your very first experience points', requiredXp: 5, iconName: 'Star', color: 'border-indigo-500/30 text-indigo-300 bg-indigo-500/10' },
  { id: 'mid_tier', name: 'Syntax Warrior', description: 'Reach Level 3 to prove your gamification prowess', requiredXp: 250, iconName: 'Zap', color: 'border-blue-500/30 text-blue-300 bg-blue-500/10' },
  { id: 'wp_master', name: 'Shortcode Sorcerer', description: 'Acquire 600 total XP within the engine sandbox', requiredXp: 600, iconName: 'Award', color: 'border-purple-500/30 text-purple-300 bg-purple-500/10' },
  { id: 'deity_status', name: 'Level 5 Architect', description: 'Unchain full mastery by hitting 900 total XP', requiredXp: 900, iconName: 'Trophy', color: 'border-pink-500/30 text-pink-300 bg-pink-500/10' },
];

export default function Simulator({ 
  engineState, 
  unlockedAchievements, 
  logs, 
  onAddXp, 
  onDecayAp,
  onSpendGp,
  onReset, 
  isLive 
}: SimulatorProps) {
  // For custom event trigger form
  const [customXp, setCustomXp] = useState<number>(20);
  const [customAp, setCustomAp] = useState<number>(5);
  const [customGp, setCustomGp] = useState<number>(10);
  const [customKey, setCustomKey] = useState<string>('quiz_completed');
  
  // Track floating points animations
  const [floatingXps, setFloatingXps] = useState<{ id: number; amount: number; x: number; y: number }[]>([]);
  const floatingIdCounter = useRef(0);

  // Trigger floating XP on total_xp changes
  useEffect(() => {
    if (engineState.total_xp === 0) return; // Ignore reset
    
    // Calculate difference
    // This is simple for now, but we can't accurately get the diff without tracking prev state.
    // Assuming this effect triggers once per XP add, we can just render a fixed floating number for now
    // Since App.tsx adds it and rerenders.
    const diff = 10; 
    
    const id = floatingIdCounter.current++;
    const xOffset = Math.random() * 80 - 40; // Random X offset between -40 and +40
    
    setFloatingXps(prev => [...prev, { id, amount: diff, x: xOffset, y: 0 }]);
    
    setTimeout(() => {
      setFloatingXps(prev => prev.filter(f => f.id !== id));
    }, 1500);
  }, [engineState.total_xp]);

  const levelProgressPercent = Math.min(100, Math.max(0, (engineState.current_xp / engineState.target_xp) * 100));

  // Render icons helper
  const renderIcon = (name: string, className = "h-5 w-5") => {
    switch (name) {
      case 'MessageSquare': return <MessageSquare className={className} />;
      case 'BookOpen': return <BookOpen className={className} />;
      case 'Bug': return <Bug className={className} />;
      case 'Flame': return <Flame className={className} />;
      case 'Star': return <Star className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Award': return <Award className={className} />;
      case 'Trophy': return <Trophy className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      default: return <Award className={className} />;
    }
  };

  const handleActionClick = (act: GamificationAction) => {
    playXpSound();
    onAddXp(act.xpReward, act.name, 'xp_gain', { ap: act.apReward, gp: act.gpReward });
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customKey.trim() || customXp < 0) return;
    playXpSound();
    const actionLabel = customKey.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_');
    onAddXp(customXp, `Custom Event: ${actionLabel}`, 'api_call', { ap: customAp, gp: customGp });
  };

  // Get current JSON log state (latest mock API payload)
  const latestLog = logs[0];
  const mockApiResponse = {
    status: "success",
    timestamp: new Date().toISOString(),
    event_processed: latestLog ? latestLog.message : "engine_initialized",
    value_added: latestLog?.xpAdded || 0,
    engine_state: {
      user_id: "fxp_dev_01",
      current_xp: engineState.total_xp,
      current_level: engineState.level,
      xp_to_next_level: engineState.target_xp - engineState.current_xp,
      level_unlocked_achievements: unlockedAchievements.length
    }
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto" id="simulator">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-2">
            <Terminal className="text-emerald-400 h-8 w-8" /> 
            Live Application Simulator
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm">
            Watch the system react to gamification events in real time. 
            {!isLive ? " You are currently in Guest Sandbox Mode. Login to test with real user data connected to the PHP Plugin's REST API." : " You are currently connected to the live REST API."}
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg text-sm text-slate-300 font-medium transition-all"
        >
          <RefreshCw className="h-4 w-4" /> Reset Sandbox
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: THE SIMULATED PROFILE (40% width on LG) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 relative overflow-hidden shadow-2xl shadow-indigo-950/10">
            {/* Visual glow backdrop */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full blur-[40px] pointer-events-none"></div>

            {/* Profile Header */}
            <div className="flex items-center gap-4 relative z-10 mb-6">
              
              {/* Animated Avatar Container */}
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 p-0.5 flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-indigo-500/20">
                  <div className="h-full w-full bg-slate-950/80 rounded-[14px] flex items-center justify-center text-slate-200">
                    <User className="h-8 w-8 text-indigo-400" />
                  </div>
                </div>

                {/* Level Tag Overlay */}
                <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white px-2 py-0.5 rounded-md font-mono text-xs font-bold shadow-md border border-slate-950">
                  Lvl {engineState.level}
                </div>

                {/* Floating XP Indicators */}
                <AnimatePresence>
                  {floatingXps.map(fxp => (
                    <motion.div
                      key={fxp.id}
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -45, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 font-mono font-bold text-lg text-indigo-400 whitespace-nowrap drop-shadow-[0_2px_8px_rgba(99,102,241,0.5)] z-25"
                      style={{ left: `calc(50% + ${fxp.x}px)` }}
                    >
                      +{fxp.amount} XP
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* User Bio and Title */}
              <div>
                <h3 className="font-display font-bold text-lg text-white flex items-center gap-1.5">
                  DevAdventurer
                  <ShieldCheck className="h-4 w-4 text-indigo-400" />
                </h3>
                <span className={`text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-indigo-400 border border-white/10 font-medium`}>
                  {engineState.title}
                </span>
              </div>
            </div>

            {/* XP Statistics */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-end text-xs font-mono">
                <span className="text-slate-500">LEVEL PROGRESS</span>
                <span className="text-slate-300 font-medium">
                  {engineState.total_xp} XP / <span className="text-slate-500">{engineState.total_xp + engineState.target_xp - engineState.current_xp} XP</span>
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgressPercent}%` }}
                  transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                ></motion.div>
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>{engineState.total_xp - engineState.current_xp} XP</span>
                <span>{engineState.target_xp - engineState.current_xp} XP to Lvl {engineState.level + 1}</span>
              </div>
            </div>

            {/* AP / GP Balances */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-1 relative z-10">Ability Points</span>
                <span className="text-2xl font-bold font-mono text-emerald-300 relative z-10">{engineState.total_ap}</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="text-amber-400 font-mono text-[10px] uppercase font-bold tracking-wider mb-1 relative z-10">Gold Points</span>
                <span className="text-2xl font-bold font-mono text-amber-300 relative z-10">{engineState.total_gp}</span>
              </div>
            </div>

            {/* Achievements Subpanel */}
            <div className="border-t border-white/10 pt-5 mt-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider font-semibold">Unlocked Badges</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-mono">
                  {unlockedAchievements.length} / {GAME_ACHIEVEMENTS.length}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {GAME_ACHIEVEMENTS.map(ach => {
                  const isUnlocked = unlockedAchievements.includes(ach.id);
                  return (
                    <div 
                      key={ach.id}
                      className={`p-3 rounded-xl border text-left transition-all duration-300 backdrop-blur-md ${
                        isUnlocked 
                          ? `${ach.color} border-opacity-50` 
                          : 'border-white/5 bg-white/2 text-slate-600 grayscale opacity-40'
                      }`}
                      id={`achievement-${ach.id}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`p-1 rounded-md ${isUnlocked ? 'bg-black/30' : 'bg-black/10'}`}>
                          {renderIcon(ach.iconName, "h-4 w-4")}
                        </div>
                        <span className={`text-xs font-display font-semibold truncate ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>
                          {ach.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-snug">{ach.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: ACTION TRIGGERS & LOGS (70% width on LG) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* ACTION BUTTON GRID */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
            <h4 className="text-sm text-slate-300 font-mono uppercase tracking-wider font-semibold mb-4">
              Simulated User Interactions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {AVAILABLE_ACTIONS.map(act => {
                return (
                  <button
                    key={act.id}
                    onClick={() => handleActionClick(act)}
                    className="flex items-start text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/30 hover:bg-white/10 cursor-pointer group transition-all duration-250"
                    id={`trigger-${act.id}`}
                  >
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-indigo-400 group-hover:text-indigo-300 group-hover:scale-105 transition-all mr-3">
                      {renderIcon(act.iconName, "h-4.5 w-4.5")}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs text-white font-medium truncate">{act.name}</span>
                        <div className="flex gap-1 shrink-0">
                          <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/15">
                            +{act.xpReward} XP
                          </span>
                          {act.apReward ? (
                            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/15">
                              +{act.apReward} AP
                            </span>
                          ) : null}
                          {act.gpReward ? (
                            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/15">
                              +{act.gpReward} GP
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal truncate">{act.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TRI-CURRENCY MECHANICS SHOWCASE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* AP ABILITIES DECAY */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm text-emerald-300 font-mono uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <Zap className="h-4 w-4" /> Active Perks (AP)
                </h4>
                <button
                  onClick={() => onDecayAp(50)}
                  className="text-[10px] font-mono font-bold px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded hover:bg-emerald-500/30 transition-colors"
                >
                  Simulate -50 AP
                </button>
              </div>
              <div className="space-y-3">
                {AVAILABLE_ABILITIES.map(ability => {
                  const isActive = engineState.total_ap >= ability.maintenanceCost;
                  return (
                    <div key={ability.id} className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${isActive ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900/50 border-white/5 opacity-50 grayscale'}`}>
                      <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-slate-500'}`}>
                        {renderIcon(ability.iconName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <span className={`text-xs font-bold font-display ${isActive ? 'text-emerald-100' : 'text-slate-400'}`}>{ability.name}</span>
                          <span className={`text-[10px] font-mono ${isActive ? 'text-emerald-400' : 'text-slate-500'}`}>{isActive ? 'ACTIVE' : 'LOCKED'}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 truncate">{ability.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* GP STORE */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
              <h4 className="text-sm text-amber-300 font-mono uppercase tracking-wider font-semibold mb-4 flex items-center gap-1.5">
                <Star className="h-4 w-4" /> Economy Store (GP)
              </h4>
              <div className="space-y-3">
                {AVAILABLE_ITEMS.map(item => {
                  const canAfford = engineState.total_gp >= item.cost;
                  return (
                    <div key={item.id} className="p-3 rounded-xl border bg-amber-500/5 border-amber-500/20 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                        {renderIcon(item.iconName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold font-display text-amber-100 block mb-0.5 truncate">{item.name}</span>
                        <p className="text-[10px] text-amber-400/70 truncate">{item.cost} GP • {item.description}</p>
                      </div>
                      <button
                        onClick={() => onSpendGp(item.cost, item.name)}
                        disabled={!canAfford}
                        className="text-[10px] font-mono font-bold px-3 py-1.5 bg-amber-500 text-slate-900 rounded-md disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-400 transition-colors shadow-sm"
                      >
                        BUY
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FULL WIDTH BOTTOM PANELS */}
      <div className="space-y-6 mt-8">
        {/* CUSTOM EVENT FORM */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6">
            <h4 className="text-sm text-slate-300 font-mono uppercase tracking-wider font-semibold mb-4 flex items-center gap-1.5">
              <Plus className="h-4 w-4 text-indigo-400" />
              Craft Custom API Call
            </h4>

            <form onSubmit={handleCustomSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
              <div className="sm:col-span-5">
                <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">Event Identifier</label>
                <div className="relative">
                  <input
                    type="text"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="e.g. course_unlocked"
                    className="w-full bg-slate-950/60 border border-white/10 focus:border-indigo-500 focus:outline-none rounded-xl px-3 py-2.5 text-xs text-white font-mono"
                    id="custom-event-input"
                  />
                </div>
              </div>

              <div className="sm:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-4 mt-2">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">XP Amount ({customXp} XP)</label>
                  <div className="flex items-center gap-2 bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2">
                    <input
                      type="range"
                      min="0"
                      max="150"
                      step="5"
                      value={customXp}
                      onChange={(e) => setCustomXp(parseInt(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                      id="custom-xp-range"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">AP Amount ({customAp} AP)</label>
                  <div className="flex items-center gap-2 bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="1"
                      value={customAp}
                      onChange={(e) => setCustomAp(parseInt(e.target.value))}
                      className="w-full accent-emerald-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                      id="custom-ap-range"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">GP Amount ({customGp} GP)</label>
                  <div className="flex items-center gap-2 bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={customGp}
                      onChange={(e) => setCustomGp(parseInt(e.target.value))}
                      className="w-full accent-amber-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                      id="custom-gp-range"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-7 flex justify-end">
                <button
                  type="submit"
                  disabled={!customKey.trim()}
                  className="w-full md:w-auto py-2.5 px-6 bg-indigo-600 disabled:opacity-40 hover:bg-indigo-500 disabled:hover:bg-indigo-600 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-indigo-600/15 cursor-pointer hover:scale-[1.02]"
                  id="custom-event-submit"
                >
                  <Send className="h-3.5 w-3.5 stroke-[2.5]" />
                  Inject XP
                </button>
              </div>
            </form>
          </div>

          {/* ENGINE DEBUG OUTPUT & LOGS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* TERMINAL JSON OUTPUT (55% width) */}
            <div className="md:col-span-7 bg-slate-950/40 border border-white/10 backdrop-blur-md rounded-2xl p-4 overflow-hidden flex flex-col h-60">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 font-mono text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-indigo-400" />
                  API Response Log
                </span>
                <span className="text-[10px] text-indigo-400">200 OK</span>
              </div>
              <div className="flex-1 overflow-y-auto font-mono text-[10px] text-indigo-300 leading-normal scrollbar-thin scrollbar-thumb-indigo-500/20 hover:scrollbar-thumb-indigo-500/40 scrollbar-track-transparent rounded-r-2xl pr-2">
                <pre>{JSON.stringify(mockApiResponse, null, 2)}</pre>
              </div>
            </div>

            {/* REAL-TIME ENGINE LOGS (45% width) */}
            <div className="md:col-span-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4 h-60 flex flex-col">
              <span className="font-mono text-[11px] text-slate-300 border-b border-white/10 pb-2 mb-2 block font-semibold">
                Event Activity Feed
              </span>
              
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-indigo-500/20 hover:scrollbar-thumb-indigo-500/40 scrollbar-track-transparent" id="feed-container">
                <AnimatePresence initial={false}>
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-2 rounded-lg bg-slate-950/40 border border-white/5 text-left"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <p className="text-[10px] text-slate-300 font-medium leading-tight">{log.message}</p>
                        {log.xpAdded !== undefined && (
                          <span className={`text-[10px] font-mono font-bold shrink-0 ${
                            log.type === 'level_up' 
                              ? 'text-pink-400' 
                              : log.type === 'achievement_unlocked' 
                              ? 'text-purple-400' 
                              : 'text-indigo-400'
                          }`}>
                            +{log.xpAdded} XP
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-mono text-slate-500 block mt-1">{log.timestamp}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

          </div>

        </div>

    </section>
  );
}
