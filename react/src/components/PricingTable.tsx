import React, { useState, useEffect } from 'react';
import { Check, Zap, Shield, Key, Sparkles, Tag, ArrowRight, Copy, Trash2, Plus, Lock } from 'lucide-react';

interface PricingTableProps {
  restUrl?: string;
  nonce?: string;
}

interface ApiKey {
  id: string;
  label: string;
  tier: string;
  masked_key: string;
  key: string;
  created_at: string;
  last_used: string;
  status: string;
}

export default function PricingTable({ restUrl, nonce }: PricingTableProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [couponCode, setCouponCode] = useState<string>('EARLYBIRD');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(25);
  const [discountMsg, setDiscountMsg] = useState<string>('25% Early Adopter Discount Applied!');
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  
  // API Key Management state
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  const [newKeyLabel, setNewKeyLabel] = useState<string>('');
  const [newKeyTier, setNewKeyTier] = useState<string>('developer');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const effectiveRestUrl = restUrl || window.forthexp_opts?.rest_url || '/wp-json/xp/v1';
  const effectiveNonce = nonce || window.forthexp_opts?.nonce || '';

  // Apply Coupon Logic
  const handleApplyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    setCouponCode(clean);
    if (['EARLYBIRD', 'EARLY25', 'FOUNDER25', 'COMPASS25'].includes(clean)) {
      setAppliedDiscount(25);
      setDiscountMsg('🎉 25% Early Adopter Discount Applied!');
    } else if (['VIP50', 'EARLY50'].includes(clean)) {
      setAppliedDiscount(50);
      setDiscountMsg('🚀 50% VIP Early Adopter Discount Applied!');
    } else if (clean === '') {
      setAppliedDiscount(0);
      setDiscountMsg('');
    } else {
      setAppliedDiscount(0);
      setDiscountMsg('Invalid discount code');
    }
  };

  // Fetch API Keys
  const fetchKeys = async () => {
    try {
      const res = await fetch(`${effectiveRestUrl}/keys`, {
        headers: { 'X-WP-Nonce': effectiveNonce }
      });
      const data = await res.json();
      if (data.keys) {
        setApiKeys(data.keys);
      }
    } catch (err) {
      console.error("Failed to load API keys", err);
    }
  };

  useEffect(() => {
    fetchKeys();
  }, [effectiveRestUrl, effectiveNonce]);

  // Create API Key
  const handleCreateKey = async () => {
    try {
      const res = await fetch(`${effectiveRestUrl}/keys`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': effectiveNonce
        },
        body: JSON.stringify({
          label: newKeyLabel || 'Production API Key',
          tier: newKeyTier
        })
      });
      const data = await res.json();
      if (data.success && data.key) {
        setCreatedKey(data.key.key);
        setNewKeyLabel('');
        fetchKeys();
      }
    } catch (err) {
      console.error("Failed to generate API Key", err);
    }
  };

  // Revoke Key
  const handleRevokeKey = async (id: string) => {
    try {
      await fetch(`${effectiveRestUrl}/keys/${id}`, {
        method: 'DELETE',
        headers: { 'X-WP-Nonce': effectiveNonce }
      });
      fetchKeys();
    } catch (err) {
      console.error("Failed to revoke key", err);
    }
  };

  // Stripe Checkout
  const handleCheckout = async (tierId: string) => {
    setLoadingTier(tierId);
    try {
      const res = await fetch(`${effectiveRestUrl}/subscriptions/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': effectiveNonce
        },
        body: JSON.stringify({
          tier: tierId,
          interval: billingCycle,
          coupon: couponCode,
          success_url: window.location.href,
          cancel_url: window.location.href,
        })
      });
      const data = await res.json();
      setLoadingTier(null);

      if (data.url) {
        if (data.is_mock) {
          if (data.issued_key) {
            setCreatedKey(data.issued_key);
            setShowKeyModal(true);
          }
          alert(`[Mock Stripe Checkout]\nSubscription Tier: ${tierId.toUpperCase()}\nFinal Price: $${data.final_price}\nDiscount: ${data.discount_percent}%\n\nAPI Key has been auto-generated and added to your keys!`);
          fetchKeys();
        } else {
          window.location.href = data.url;
        }
      } else if (data.message) {
        alert(`Checkout Notice: ${data.message}`);
      }
    } catch (err) {
      setLoadingTier(null);
      console.error("Checkout error", err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const calculatePrice = (monthly: number, yearly: number) => {
    const base = billingCycle === 'yearly' ? yearly / 12 : monthly;
    return Math.round(base);
  };

  const tiers = [
    {
      id: 'hobby',
      name: 'Developer Lite',
      description: 'Ideal for indie devs and side projects adding basic XP mechanics.',
      monthly: 19,
      yearly: 180,
      requests: '100,000 requests/mo',
      badge: 'Starter',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-cyan-500/30',
      btnColor: 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950',
      features: [
        '100k API Requests / Month',
        'Standard Webhook Triggers',
        'Up to 10 Custom XP Actions',
        'Community Support',
        'Basic Player Dashboards',
      ],
    },
    {
      id: 'developer',
      name: 'Growth Engine',
      description: 'Best for growing SaaS products & games requiring high availability & webhooks.',
      monthly: 49,
      yearly: 470,
      requests: '1,000,000 requests/mo',
      badge: 'Most Popular',
      popular: true,
      color: 'from-indigo-500/30 to-purple-500/30',
      borderColor: 'border-indigo-500/50',
      btnColor: 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-lg shadow-indigo-500/25',
      features: [
        '1 Million API Requests / Month',
        'Real-time Webhook Triggers',
        'Unlimited Custom XP Actions',
        'Player Leaderboards & Badges',
        'Priority API Keys & Rate limits',
        'Event Horizon System Sync',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Sovereign',
      description: 'Full sovereign scale for enterprise game ecosystems and high-volume platforms.',
      monthly: 199,
      yearly: 1900,
      requests: 'Unlimited API requests',
      badge: 'Enterprise',
      color: 'from-amber-500/20 to-emerald-500/20',
      borderColor: 'border-amber-500/30',
      btnColor: 'bg-amber-500 hover:bg-amber-400 text-zinc-950',
      features: [
        'Unlimited API Requests',
        'Dedicated API Infrastructure',
        'Custom Webhook Integrations',
        'Multi-tenant API Keys',
        '24/7 SLA & Dedicated Support',
        'Custom Gamification Audit',
      ],
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* SECTION HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
          <Sparkles className="h-3.5 w-3.5" />
          <span>SaaS API Infrastructure</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
          Flexible Pricing for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Every Developer</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Package your apps with the XP Gamification API engine. Instant API keys, Stripe subscription checkout, and automated webhook triggers.
        </p>
      </div>

      {/* BILLING TOGGLE */}
      <div className="flex flex-col items-center gap-6">
        
        {/* Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              billingCycle === 'monthly'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
              Save 20%
            </span>
          </button>
        </div>

      </div>

      {/* PRICING CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier) => {
          const priceDisplay = calculatePrice(tier.monthly, tier.yearly);

          return (
            <div
              key={tier.id}
              className={`relative bg-gradient-to-b ${tier.color} bg-white/5 border ${tier.borderColor} rounded-3xl p-8 flex flex-col justify-between space-y-8 backdrop-blur-xl hover:border-white/20 transition-all shadow-xl`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-mono font-bold tracking-wider uppercase shadow-lg shadow-indigo-500/30 border border-white/20">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-xl text-white tracking-tight">{tier.name}</h3>
                  {!tier.popular && (
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed min-h-[36px]">{tier.description}</p>

                {/* Price Display */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-extrabold text-4xl text-white">${priceDisplay}</span>
                    <span className="text-xs font-mono text-slate-400">/ mo</span>
                  </div>
                  <p className="text-[11px] font-mono text-cyan-400">{tier.requests}</p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 pt-4 border-t border-white/10">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleCheckout(tier.id)}
                disabled={loadingTier === tier.id}
                className={`w-full py-3 px-4 rounded-2xl font-display font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 ${tier.btnColor}`}
              >
                {loadingTier === tier.id ? (
                  <span>Connecting Stripe...</span>
                ) : (
                  <>
                    <span>Subscribe & Get API Key</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* API KEYS MANAGEMENT WIDGET */}
      <div className="bg-slate-950/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5 text-indigo-400" />
              <h3 className="font-display font-bold text-xl text-white tracking-tight">Your XP Service API Keys</h3>
            </div>
            <p className="text-xs text-slate-400">Generate, copy, and authenticate external applications with your SaaS API keys.</p>
          </div>

          <button
            onClick={() => setShowKeyModal(true)}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New Key</span>
          </button>
        </div>

        {/* API Key Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider">
                <th className="pb-3 px-2">Label</th>
                <th className="pb-3 px-2">Tier</th>
                <th className="pb-3 px-2">API Key</th>
                <th className="pb-3 px-2">Created</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {apiKeys.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500 italic">
                    No active API keys found. Click "Generate New Key" to create your first key.
                  </td>
                </tr>
              ) : (
                apiKeys.map((k) => (
                  <tr key={k.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-2 font-semibold text-white">{k.label}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px]">
                        {k.tier.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-slate-400">
                      <code>{k.masked_key}</code>
                    </td>
                    <td className="py-3 px-2 text-slate-500">{k.created_at}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                        ACTIVE
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right space-x-2">
                      <button
                        onClick={() => copyToClipboard(k.key)}
                        className="p-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg transition-colors"
                        title="Copy Key"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleRevokeKey(k.id)}
                        className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                        title="Revoke Key"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* GENERATE KEY MODAL */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-white/15 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h4 className="font-display font-bold text-lg text-white">Generate XP API Key</h4>
              <button onClick={() => setShowKeyModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {createdKey ? (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">API Key Issued Successfully!</span>
                  <div className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-xl border border-white/10 font-mono text-xs text-white">
                    <code className="truncate mr-2">{createdKey}</code>
                    <button
                      onClick={() => copyToClipboard(createdKey)}
                      className="px-2.5 py-1 bg-emerald-500 text-zinc-950 font-bold rounded-lg hover:bg-emerald-400 text-xs flex items-center gap-1"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>{copiedKey === createdKey ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400">Copy this key now. Authenticate requests using header <code>X-API-Key: {createdKey.substring(0, 10)}...</code></p>
                </div>
                <button
                  onClick={() => { setCreatedKey(null); setShowKeyModal(false); }}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">Key Label</label>
                  <input
                    type="text"
                    value={newKeyLabel}
                    onChange={(e) => setNewKeyLabel(e.target.value)}
                    placeholder="e.g. My Next.js Web App"
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-slate-300">Target Tier</label>
                  <select
                    value={newKeyTier}
                    onChange={(e) => setNewKeyTier(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="hobby">Indie / Hobby Tier</option>
                    <option value="developer">Pro / Growth Tier</option>
                    <option value="enterprise">Sovereign / Enterprise Tier</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowKeyModal(false)}
                    className="px-4 py-2 text-slate-400 hover:text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateKey}
                    className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/20"
                  >
                    Generate Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
