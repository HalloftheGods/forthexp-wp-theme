import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Code, Database, Compass, Trophy } from 'lucide-react';

interface HeroProps {
  onCtaclick: (sectionId: string) => void;
}

export default function Hero({ onCtaclick }: HeroProps) {
  const coreFeatures = [
    {
      icon: Code,
      title: "Extremely Dev-Friendly",
      desc: "Integrate using direct REST APIs, native JavaScript SDKs, or clean PHP hooks designed specifically for WordPress themes.",
      color: "from-indigo-500/20 to-purple-500/10",
      iconColor: "text-indigo-400",
    },
    {
      icon: Trophy,
      title: "Rich Rewards & Quests",
      desc: "Configure recurring badges, ranks, and custom achievements. Easily lock achievements behind complex multi-action milestones.",
      color: "from-purple-500/20 to-pink-500/10",
      iconColor: "text-purple-400",
    },
    {
      icon: Database,
      title: "Stateless & Lightweight",
      desc: "Zero-bloat engine. Runs directly on your site or syncs to our super-fast cloud API. DB queries are cached for extreme speed.",
      color: "from-blue-500/20 to-indigo-500/10",
      iconColor: "text-blue-400",
    },
    {
      icon: Compass,
      title: "WordPress Theme Perfect",
      desc: "Ready-to-use shortcodes and widgets that style themselves automatically to match your theme's layout and colors.",
      color: "from-violet-500/20 to-fuchsia-500/10",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 px-6 border-b border-white/10" id="hero-section">
      {/* Mesh gradients for background depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[90px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        
        {/* Tech Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-400 font-mono mb-8 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Announcing ForTheXP.com Gamification Engine</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
        >
          Inject <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500">Game Mechanics</span> <br />
          Into Any WordPress Theme
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
        >
          A lightweight, lightning-fast XP gamification engine designed to skyrocket user engagement. Reward comments, page views, logins, and social shares with beautiful live leveling and custom badges.
        </motion.p>

        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <button
            onClick={() => onCtaclick('simulator')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-950 font-bold tracking-tight shadow-xl shadow-indigo-500/10 hover:bg-slate-200 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            id="hero-cta-simulator"
          >
            Launch Interactive Simulator
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onCtaclick('playground')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            id="hero-cta-code"
          >
            Explore Interactive Snippets
          </button>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {coreFeatures.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-300"
                id={`hero-feature-${index}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-b ${feat.color} rounded-full blur-[30px] opacity-20 pointer-events-none`}></div>
                <div className="flex gap-4 items-start relative z-10">
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${feat.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-display font-semibold text-lg mb-2">{feat.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
