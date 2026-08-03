import { useState } from 'react';
import { BookOpen, Layers, Code, Settings } from 'lucide-react';

export default function Documentation() {
  const [activeTopic, setActiveTopic] = useState<string>('getting-started');

  const topics = [
    { id: 'getting-started', label: '1. Getting Started', icon: BookOpen },
    { id: 'shortcodes', label: '2. Shortcode Library', icon: Layers },
    { id: 'php-api', label: '3. Theme Core API', icon: Code },
    { id: 'tri-currency-api', label: '4. Tri-Currency REST API', icon: Settings },
    { id: 'math-formulas', label: '5. Level-Up Formula', icon: Settings },
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/10" id="documentation">
      
      {/* Section Title */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="font-display font-bold text-3xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
          <BookOpen className="h-6 w-6 text-indigo-400" />
          Technical Documentation
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
          Unlock the full capability of the ForTheXP gamification engine. Explore our shortcodes, custom PHP hooks, and responsive database structures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DOCUMENTATION TOPICS LIST (LEFT SIDE) */}
        <div className="lg:col-span-3 flex flex-col gap-1 bg-white/5 backdrop-blur-xl p-2.5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-3 py-2 font-bold block text-left">
            Doc Categories
          </span>
          {topics.map(topic => {
            const Icon = topic.icon;
            const isActive = activeTopic === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
                id={`doc-tab-${topic.id}`}
              >
                <Icon className="h-4 w-4" />
                {topic.label}
              </button>
            );
          })}
        </div>

        {/* TOPIC CONTENT CONTAINER (RIGHT SIDE) */}
        <div className="lg:col-span-9 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 min-h-[420px] text-left shadow-2xl">
          
          {/* TOPIC: GETTING STARTED */}
          {activeTopic === 'getting-started' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Getting Started with ForTheXP</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ForTheXP is a high-performance gamification engine that rewards users with experience points (XP) for custom actions, helping developers build engaging, sticky websites.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-mono text-indigo-400 font-semibold uppercase">Three-Step Setup</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950/60 border border-white/10 p-4 rounded-xl">
                    <div className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center mb-3">1</div>
                    <span className="text-xs text-white font-bold block mb-1">Upload the Code</span>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Copy the `forthexp` folder directly into your WP theme, or load our client SDK in the HTML header.
                    </p>
                  </div>

                  <div className="bg-slate-950/60 border border-white/10 p-4 rounded-xl">
                    <div className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center mb-3">2</div>
                    <span className="text-xs text-white font-bold block mb-1">Define Actions</span>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Define experience rewards for commenting, page views, and daily login streaks inside functions.php or the admin.
                    </p>
                  </div>

                  <div className="bg-slate-950/60 border border-white/10 p-4 rounded-xl">
                    <div className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center mb-3">3</div>
                    <span className="text-xs text-white font-bold block mb-1">Render Widgets</span>
                    <p className="text-[10px] text-slate-400 leading-normal">
                      Use standard shortcodes like `[forthexp_profile_card]` to render profile badges, ranks, and user progress bars.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950/40 border border-white/10 rounded-xl space-y-2">
                <span className="text-xs font-mono text-slate-300 font-medium block">Verification Test</span>
                <p className="text-[11px] text-slate-400 leading-normal">
                  To verify your setup is functioning, call the test reward function within any PHP file:
                </p>
                <pre className="font-mono text-[10px] text-indigo-300 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                  {`<?php
if (function_exists('forthexp_add_xp')) {
    forthexp_add_xp(get_current_user_id(), [
        'xp' => 10,
        'action' => 'setup_verification'
    ]);
}`}
                </pre>
              </div>
            </div>
          )}

          {/* TOPIC: SHORTCODES */}
          {activeTopic === 'shortcodes' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">WordPress Shortcodes Directory</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ForTheXP provides beautiful, responsive out-of-the-box widgets styled dynamically in SVG. Use them inside any block editor, post content, or text widget.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-500 uppercase text-[10px]">
                      <th className="py-2.5">Shortcode</th>
                      <th className="py-2.5 px-4">Attributes</th>
                      <th className="py-2.5">Output Preview Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-slate-300">
                    <tr>
                      <td className="py-3 font-semibold text-indigo-400">[forthexp_profile]</td>
                      <td className="py-3 px-4 text-slate-400">theme="dark|light"<br />badges="true|false"</td>
                      <td className="py-3 text-slate-400 font-sans text-[11px]">Renders a glowing user avatar profile complete with current level, titles, and XP meters.</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-indigo-400">[forthexp_leaderboard]</td>
                      <td className="py-3 px-4 text-slate-400">limit="10"<br />period="all|monthly"</td>
                      <td className="py-3 text-slate-400 font-sans text-[11px]">Displays an interactive top ranking ladder showcasing avatars, level scores, and earned accomplishments.</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-indigo-400">[forthexp_badge_grid]</td>
                      <td className="py-3 px-4 text-slate-400">columns="4"<br />show_locked="true"</td>
                      <td className="py-3 text-slate-400 font-sans text-[11px]">Shows a grid of unlocked and mystery accomplishments. Locked badges automatically filter to grayscale.</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-indigo-400">[forthexp_toast]</td>
                      <td className="py-3 px-4 text-slate-400">sound="on|off"<br />duration="5"</td>
                      <td className="py-3 text-slate-400 font-sans text-[11px]">Listens for active database XP rewards and triggers slide-in floating visual cards when the user gains XP.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TOPIC: PHP CORE API */}
          {activeTopic === 'php-api' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Theme Integration API Reference</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Inject gamification directly inside custom WordPress templates (`header.php`, `single.php`, `author.php`) using our stable database functions.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Method 1 */}
                <div className="p-4 bg-slate-950/60 border border-white/10 rounded-xl text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                    <span className="font-mono text-xs text-indigo-400 font-semibold">forthexp_add_xp($user_id, $args)</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">Helper Function</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 font-sans leading-normal">
                    Manually adds XP to any user. Automatically checks for level-ups, updates user database tables, and queues live dashboard notifications.
                  </p>
                  <pre className="font-mono text-[10px] text-indigo-300 bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                    {`forthexp_add_xp($user_id, [
    'xp'          => 45,                  // XP to grant (Progression)
    'ap'          => 10,                  // AP to grant (Velocity)
    'gp'          => 20,                  // GP to grant (Economy)
    'action'      => 'completed_lesson',  // Action handle for logs
    'description' => 'Unlocked next course chapter'
]);`}
                  </pre>
                </div>

                {/* Method 2 */}
                <div className="p-4 bg-slate-950/60 border border-white/10 rounded-xl text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                    <span className="font-mono text-xs text-indigo-400 font-semibold">forthexp_get_user_stats($user_id)</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">Query Function</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 font-sans leading-normal">
                    Queries the database to fetch a complete profile structure of current XP, levels, current rank titles, and unlocked credentials.
                  </p>
                  <pre className="font-mono text-[10px] text-indigo-300 bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                    {`$stats = forthexp_get_user_stats($user_id);
echo "User is Level " . $stats['level']; // returns (int) 3
echo "Total XP earned: " . $stats['total_xp']; // returns (int) 280`}
                  </pre>
                </div>

              </div>
            </div>
          )}

          {/* TOPIC: TRI-CURRENCY REST API */}
          {activeTopic === 'tri-currency-api' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Tri-Currency REST API</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Interact with the XP, AP, and GP systems via secure REST endpoints. Perfect for headless apps or frontend JavaScript interactions.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Method 1: Fire Action */}
                <div className="p-4 bg-slate-950/60 border border-white/10 rounded-xl text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                    <span className="font-mono text-xs text-indigo-400 font-semibold">POST /wp-json/xp/v1/fire/[action_slug]</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">Grant Currencies</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 font-sans leading-normal">
                    Fires a specific action for the current logged-in user, granting XP, AP, and GP based on the request payload.
                  </p>
                  <pre className="font-mono text-[10px] text-indigo-300 bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                    {`fetch('/wp-json/xp/v1/fire/quiz_completed', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
  body: JSON.stringify({ xp: 50, ap: 10, gp: 25 })
});`}
                  </pre>
                </div>

                {/* Method 2: AP Decay */}
                <div className="p-4 bg-slate-950/60 border border-white/10 rounded-xl text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                    <span className="font-mono text-xs text-emerald-400 font-semibold">POST /wp-json/xp/v1/simulate-decay</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">Velocity Drain</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 font-sans leading-normal">
                    Simulates the passing of time by decaying a user's AP (Ability Points). Essential for ensuring users maintain an active velocity to keep perks unlocked.
                  </p>
                  <pre className="font-mono text-[10px] text-emerald-300 bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                    {`fetch('/wp-json/xp/v1/simulate-decay', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
  body: JSON.stringify({ ap: 50 }) // Decays 50 AP
});`}
                  </pre>
                </div>

                {/* Method 3: GP Spend */}
                <div className="p-4 bg-slate-950/60 border border-white/10 rounded-xl text-left">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
                    <span className="font-mono text-xs text-amber-400 font-semibold">POST /wp-json/xp/v1/spend-gp</span>
                    <span className="text-[10px] font-mono text-slate-500 uppercase bg-white/5 px-2 py-0.5 rounded border border-white/10">Liquid Economy</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 font-sans leading-normal">
                    Spends Gold Points (GP) to purchase an item or cosmetic. Will return an error if the user has insufficient GP.
                  </p>
                  <pre className="font-mono text-[10px] text-amber-300 bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                    {`fetch('/wp-json/xp/v1/spend-gp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
  body: JSON.stringify({ gp: 100, item: 'Neon Profile Glow' })
});`}
                  </pre>
                </div>

              </div>
            </div>
          )}

          {/* TOPIC: LEVEL UP MATH FORMULA */}
          {activeTopic === 'math-formulas' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">Customizing the XP Scaling Progression</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  ForTheXP operates on a customizable progressive formula to calculate user level-ups. Avoid standard static milestones and adjust math curves for balanced gameplay.
                </p>
              </div>

              <div className="p-4 bg-slate-950/60 border border-white/10 rounded-xl">
                <span className="text-xs font-mono text-slate-300 block mb-2 font-medium">Default Cubic Scaling Math Formula</span>
                <p className="text-xs text-slate-400 leading-relaxed font-sans mb-3">
                  Each level requires proportionally more XP than the previous. The required XP for a given Level ($L$) is computed using:
                </p>
                <div className="p-3 bg-slate-950/80 rounded-lg border border-white/5 text-center font-mono text-indigo-400 text-sm">
                  Required_XP(L) = Base_XP × (L - 1)<sup>1.5</sup> + Offset
                </div>
              </div>

              <div className="space-y-3 font-sans text-xs text-slate-400">
                <p className="leading-relaxed">
                  By default, <strong>Base_XP</strong> is set to <code>150</code>, and <strong>Offset</strong> is <code>100</code>. This creates a natural, progressively challenging climb:
                </p>
                <ul className="list-disc pl-5 space-y-1 font-mono text-[11px] text-slate-300">
                  <li>Level 1 to 2: 100 XP (Quick start for noobs)</li>
                  <li>Level 2 to 3: 150 XP (Total 250 XP required)</li>
                  <li>Level 3 to 4: 250 XP (Total 500 XP required)</li>
                  <li>Level 4 to 5: 400 XP (Total 900 XP required)</li>
                </ul>
                <p className="leading-relaxed">
                  These constants can be overridden inside your WordPress site settings, or by registering a filter Hook inside functions.php:
                </p>
                <pre className="font-mono text-[10px] text-indigo-300 bg-slate-950 p-2.5 rounded-lg border border-white/10">
                  {`add_filter('forthexp_xp_base_multiplier', function() {
    return 120; // Lower Base XP for rapid level-ups!
});`}
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>

    </section>
  );
}
