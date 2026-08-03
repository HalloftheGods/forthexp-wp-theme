import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Clipboard, Check, Play, Sliders, Info } from 'lucide-react';
import { Highlight, themes, Prism } from 'prism-react-renderer';
import { CodeTab, SnippetParameters } from '../types';
import { playXpSound } from '../utils/audio';

interface CodePlaygroundProps {
  onSimulateCode: (amount: number, label: string) => void;
}

export default function CodePlayground({ onSimulateCode }: CodePlaygroundProps) {
  const [activeTab, setActiveTab] = useState<CodeTab>('js');
  const [copied, setCopied] = useState<boolean>(false);
  const [langsLoaded, setLangsLoaded] = useState<boolean>(false);
  
  useEffect(() => {
    async function loadLangs() {
      if (typeof window !== 'undefined') {
        (window as any).Prism = Prism;
        // Load markup-templating first as PHP depends on it
        await import('prismjs/components/prism-markup-templating');
        await import('prismjs/components/prism-php');
        await import('prismjs/components/prism-bash');
        setLangsLoaded(true);
      }
    }
    loadLangs();
  }, []);

  // Interactive snippet state
  const [params, setParams] = useState<SnippetParameters>({
    userId: 'user_9823',
    actionKey: 'submit_comment',
    xpAmount: 20,
    apAmount: 5,
    gpAmount: 10,
    badgeName: 'Review Wizard',
    badgeIcon: 'Star',
    theme: 'dark'
  });

  // Code templates generator
  const getCodeString = (tab: CodeTab): string => {
    switch (tab) {
      case 'js':
        return `import ForTheXP from '@forthexp/sdk';

const fxp = new ForTheXP('fxp_live_891f7a36c5b9e2');

// Reward user for an action
fxp.rewardUser({
  userId: '${params.userId}',
  action: '${params.actionKey}',
  xp: ${params.xpAmount},
  ap: ${params.apAmount},
  gp: ${params.gpAmount},
  metadata: {
    client_version: '1.2.0',
    platform: 'web'
  }
}).then(response => {
  console.log(\`XP added successfully! New level: \${response.user.level}\`);
});`;

      case 'php':
        return `<?php
/**
 * WordPress Theme Integration Hook
 * Place this inside your theme's functions.php file!
 */

// Reward XP when a user publishes a blog comment
add_action('comment_post', 'forthexp_reward_user_comment', 10, 3);

function forthexp_reward_user_comment($comment_ID, $comment_approved, $commentdata) {
    $user_id = $commentdata['user_id'];
    
    // Check if user is logged in
    if ($user_id > 0 && function_exists('forthexp_add_xp')) {
        forthexp_add_xp($user_id, [
            'xp' => ${params.xpAmount},
            'ap' => ${params.apAmount},
            'gp' => ${params.gpAmount},
            'action' => '${params.actionKey}',
            'description' => 'User earned points for submitting a verified comment!'
        ]);
    }
}

// Custom hook helper to listen for Level Up events
add_action('forthexp_user_leveled_up', 'notify_level_up_slack', 10, 2);
function notify_level_up_slack($user_id, $new_level) {
    // Integrate notifications, badges, or DB syncs here
}`;

      case 'shortcode':
        return `<!-- Display the user's gamified profile card in any WP post or sidebar -->
[forthexp_profile_card theme="${params.theme}" badges="true"]

<!-- Create an interactive widget that updates instantly when XP is awarded -->
[forthexp_interactive_banner action_trigger="${params.actionKey}" xp_value="${params.xpAmount}"]

<!-- Render a customizable badge locked behind level achievements -->
[forthexp_badge id="${params.badgeIcon.toLowerCase()}_badge" name="${params.badgeName}" size="medium"]

<!-- Embed the global community leaderboard -->
[forthexp_leaderboard limit="5" order_by="xp_monthly"]`;

      case 'curl':
        return `curl -X POST "https://api.forthexp.com/v1/reward" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer fxp_live_891f7a36c5b9e2" \\
  -d '{
    "user_id": "${params.userId}",
    "action_key": "${params.actionKey}",
    "xp_to_add": ${params.xpAmount},
    "ap_to_add": ${params.apAmount},
    "gp_to_add": ${params.gpAmount},
    "notify_client_socket": true
  }'`;
      default:
        return '';
    }
  };

  const handleCopy = () => {
    const code = getCodeString(activeTab);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePlayground = () => {
    playXpSound();
    const cleanLabel = params.actionKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    onSimulateCode(params.xpAmount, `Code Trigger: ${cleanLabel}`);
  };

  const tabs: { id: CodeTab; label: string; lang: string }[] = [
    { id: 'js', label: 'JavaScript SDK', lang: 'javascript' },
    { id: 'php', label: 'WordPress (PHP)', lang: 'php' },
    { id: 'shortcode', label: 'WP Shortcodes', lang: 'html' },
    { id: 'curl', label: 'REST API (cURL)', lang: 'bash' },
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/10" id="playground">
      
      {/* Header Block */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="font-display font-bold text-3xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
          <Code className="h-6 w-6 text-indigo-400" />
          Interactive Code Snippets
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
          Tweak the settings below, watch the code adjust dynamically to your parameters, and press compile to instantly inject those exact values into the active simulator above.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PARAMETERS CONTROLLER (35% width) */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 space-y-6">
          <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
            <Sliders className="h-4.5 w-4.5 text-indigo-400" />
            Snippet Customizer
          </h3>

          <div className="space-y-4">
            
            {/* User ID Parameter */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">User ID Parameter</label>
              <input
                type="text"
                value={params.userId}
                onChange={(e) => setParams(prev => ({ ...prev, userId: e.target.value }))}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                id="param-user-id"
              />
            </div>

            {/* Action Key Parameter */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">Action Key (Trigger ID)</label>
              <input
                type="text"
                value={params.actionKey}
                onChange={(e) => setParams(prev => ({ ...prev, actionKey: e.target.value.replace(/\s+/g, '_') }))}
                className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                id="param-action-key"
              />
            </div>

            {/* XP Value Parameter */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">XP Award Value</label>
                <span className="text-xs font-mono text-indigo-400 font-bold">{params.xpAmount} XP</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={params.xpAmount}
                onChange={(e) => setParams(prev => ({ ...prev, xpAmount: parseInt(e.target.value) }))}
                className="w-full accent-indigo-500 h-1 bg-white/10 rounded cursor-pointer"
                id="param-xp-range"
              />
            </div>

            {/* AP Value Parameter */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">AP Award Value</label>
                <span className="text-xs font-mono text-emerald-400 font-bold">{params.apAmount} AP</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={params.apAmount}
                onChange={(e) => setParams(prev => ({ ...prev, apAmount: parseInt(e.target.value) }))}
                className="w-full accent-emerald-500 h-1 bg-white/10 rounded cursor-pointer"
                id="param-ap-range"
              />
            </div>

            {/* GP Value Parameter */}
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-[11px] font-mono text-slate-400 uppercase">GP Award Value</label>
                <span className="text-xs font-mono text-amber-400 font-bold">{params.gpAmount} GP</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.gpAmount}
                onChange={(e) => setParams(prev => ({ ...prev, gpAmount: parseInt(e.target.value) }))}
                className="w-full accent-amber-500 h-1 bg-white/10 rounded cursor-pointer"
                id="param-gp-range"
              />
            </div>

            {/* WP Shortcode Custom Options */}
            <div className="border-t border-white/10 pt-4 space-y-4">
              <span className="text-[10px] font-mono text-slate-300 uppercase tracking-wide block font-semibold">Shortcode & Badge Options</span>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">Badge Name</label>
                  <input
                    type="text"
                    value={params.badgeName}
                    onChange={(e) => setParams(prev => ({ ...prev, badgeName: e.target.value }))}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-indigo-500"
                    id="param-badge-name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 mb-1">Badge Icon</label>
                  <select
                    value={params.badgeIcon}
                    onChange={(e) => setParams(prev => ({ ...prev, badgeIcon: e.target.value }))}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-indigo-500 font-mono"
                    id="param-badge-icon"
                  >
                    <option value="Star">Star</option>
                    <option value="Zap">Zap</option>
                    <option value="Trophy">Trophy</option>
                    <option value="Award">Award</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">Widget Theme</label>
                <div className="flex gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/10">
                  {['dark', 'light', 'emerald'].map((thm) => (
                    <button
                      key={thm}
                      type="button"
                      onClick={() => setParams(prev => ({ ...prev, theme: thm as any }))}
                      className={`flex-1 py-1 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                        params.theme === thm
                          ? 'bg-indigo-500 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                      id={`param-theme-${thm}`}
                    >
                      {thm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Quick Notice */}
          <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 flex gap-2 items-start text-left">
            <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-normal">
              Copy these snippets directly into your WordPress theme template structure to bind events to database actions immediately.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: CODE VIEWER & PLAY (65% width) */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
          
          {/* TAB HEADER */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-white/10 bg-white/5 p-2 gap-2">
            
            {/* Tabs List */}
            <div className="flex flex-wrap gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-indigo-300 border border-white/10 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  id={`tab-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 px-1 justify-end">
              
              {/* Simulate Executing Button */}
              <button
                onClick={handleSimulatePlayground}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-lg shadow-indigo-600/15"
                title="Test run this code parameters in the sandbox above!"
                id="simulate-code-action"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Run Simulation
              </button>

              {/* Copy Code */}
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1 font-sans text-xs cursor-pointer"
                id="copy-code-action"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-indigo-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* CODE EDITOR BOX */}
          <div className="flex-1 p-5 overflow-auto bg-slate-950/60 text-left border-b border-white/10 scrollbar-none transition-colors duration-500">
            {langsLoaded ? (
              <Highlight
                theme={themes.dracula}
                code={getCodeString(activeTab)}
                language={(tabs.find(t => t.id === activeTab)?.lang as any) || 'javascript'}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`font-mono text-[13px] leading-relaxed selection:bg-indigo-500/30 whitespace-pre ${className}`} style={{ ...style, backgroundColor: 'transparent' }}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            ) : (
              <pre className="font-mono text-[13px] text-slate-300 leading-relaxed whitespace-pre">
                <code>{getCodeString(activeTab)}</code>
              </pre>
            )}
          </div>

          {/* CODE CONSOLE FOOTER */}
          <div className="p-3 bg-white/5 px-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <Terminal className="h-3.5 w-3.5" />
              Language: {activeTab === 'php' ? 'PHP (WordPress)' : activeTab === 'shortcode' ? 'HTML/Shortcode' : activeTab === 'js' ? 'Javascript ESM' : 'cURL'}
            </span>
            <span>UTF-8 • Unix (LF)</span>
          </div>

        </div>

      </div>

    </section>
  );
}
