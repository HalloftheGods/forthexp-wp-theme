import { Trophy, Zap, Coins } from 'lucide-react';

export default function CurrenciesGuide() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12">
        <h2 className="text-3xl font-display font-bold text-white mb-4 text-center md:text-left">
          The Tri-Currency Engine
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl mb-12 text-center md:text-left leading-relaxed">
          The ForTheXP engine operates on a sophisticated Tri-Currency model. Gamification is more than just a single progression bar. It is a balancing act of Experience (XP), Ability Points (AP), and Gold Points (GP), each driving a different psychological motivator for your users.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* XP - Experience Points */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300 group">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 group-hover:bg-indigo-500/30 transition-colors">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">Experience (XP)</h3>
            <span className="inline-block text-[10px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded mb-4 uppercase tracking-wider">Status & Progression</span>
            <p className="text-sm text-slate-400 leading-relaxed">
              XP is the immovable backbone of a user's prestige. It never depletes. As users accumulate XP, they automatically climb Ranks and Levels. It serves as the primary metric for leaderboards, long-term retention, and visual clout.
            </p>
          </div>

          {/* AP - Ability Points */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300 group">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 group-hover:bg-emerald-500/30 transition-colors">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">Ability Points (AP)</h3>
            <span className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded mb-4 uppercase tracking-wider">Velocity & Maintenance</span>
            <p className="text-sm text-slate-400 leading-relaxed">
              AP fuels the strategic layer through a rolling timeframe. AP points are an expiry metric: to keep powerful abilities and perks unlocked, users must maintain a specific AP velocity (e.g., earning 100 AP per week). This prevents stagnation and requires active, ongoing participation to retain elite privileges.
            </p>
          </div>

          {/* GP - Gold Points */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-transform hover:-translate-y-1 duration-300 group">
            <div className="h-12 w-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 group-hover:bg-amber-500/30 transition-colors">
              <Coins className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-display">Gold Points (GP)</h3>
            <span className="inline-block text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded mb-4 uppercase tracking-wider">Economy & Cosmetics</span>
            <p className="text-sm text-slate-400 leading-relaxed">
              GP is the liquid economy. It is spent on temporary boosts, consumable items, profile cosmetics, or real-world rewards. Because GP can be rapidly gained and spent, it acts as the high-frequency interaction loop that keeps users checking in daily.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
