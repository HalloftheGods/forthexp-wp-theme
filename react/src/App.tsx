import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Simulator, { getLevelInfo, GAME_ACHIEVEMENTS } from './components/Simulator';
import CodePlayground from './components/CodePlayground';
import Documentation from './components/Documentation';
import WPThemeGuide from './components/WPThemeGuide';
import PricingTable from './components/PricingTable';
import Footer from './components/Footer';
import HudBar from './components/HudBar';
import { LogEntry, EngineState } from './types';
import { playLevelUpSound, playXpSound } from './utils/audio';

declare global {
  interface Window {
    forthexp_opts?: {
      rest_url: string;
      nonce: string;
      is_logged_in: boolean;
    };
  }
}

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('simulator');
  const isLive = window.forthexp_opts?.is_logged_in === true;
  const restUrl = window.forthexp_opts?.rest_url || '';
  const nonce = window.forthexp_opts?.nonce || '';

  // Engine State
  const [engineState, setEngineState] = useState<EngineState | null>(null);

  const [totalXp, setTotalXp] = useState<number>(() => {
    const saved = localStorage.getItem('fxp_total_xp');
    return saved ? parseInt(saved) : 0;
  });

  const [totalAp, setTotalAp] = useState<number>(() => {
    const saved = localStorage.getItem('fxp_total_ap');
    return saved ? parseInt(saved) : 0;
  });

  const [totalGp, setTotalGp] = useState<number>(() => {
    const saved = localStorage.getItem('fxp_total_gp');
    return saved ? parseInt(saved) : 0;
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    const saved = localStorage.getItem('fxp_unlocked_achievements');
    return saved ? JSON.parse(saved) : [];
  });

  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem('fxp_logs');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 'init-log',
        timestamp: new Date().toLocaleTimeString(),
        message: 'ForTheXP.com Engine Sandbox initialized. Ready for connections.',
        type: 'api_call'
      }
    ];
  });

  // Sync local state if guest
  useEffect(() => {
    if (!isLive) {
      localStorage.setItem('fxp_total_xp', totalXp.toString());
      localStorage.setItem('fxp_total_ap', totalAp.toString());
      localStorage.setItem('fxp_total_gp', totalGp.toString());
      localStorage.setItem('fxp_unlocked_achievements', JSON.stringify(unlockedAchievements));
      localStorage.setItem('fxp_logs', JSON.stringify(logs));
    }
  }, [totalXp, totalAp, totalGp, unlockedAchievements, logs, isLive]);

  // Fetch live state if logged in
  useEffect(() => {
    if (isLive && restUrl) {
      fetch(`${restUrl}/state`, {
        headers: { 'X-WP-Nonce': nonce }
      })
      .then(res => res.json())
      .then(data => {
        if (data.state) setEngineState(data.state);
      });

      fetch(`${restUrl}/logs`, {
        headers: { 'X-WP-Nonce': nonce }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setLogs(data);
      });
    }
  }, [isLive, restUrl, nonce]);

  // Master function to add XP, check level ups, and unlock achievements
  const handleAddXp = async (amount: number, actionName: string, logType: LogEntry['type'], payload: any = {}) => {
    if (isLive) {
       try {
         // Generate a random slug for sandbox actions if they don't have one
         const slug = actionName.toLowerCase().replace(/[^a-z0-9]/g, '_');
         const reqPayload = {
           xp: amount,
           ...payload
         };
         
         await fetch(`${restUrl}/fire/${slug}`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
             'X-WP-Nonce': nonce
           },
           body: JSON.stringify(reqPayload)
         });

         // Refetch state and logs
         const stateRes = await fetch(`${restUrl}/state`, { headers: { 'X-WP-Nonce': nonce } });
         const stateData = await stateRes.json();
         if (stateData.state) {
            // Check level up
            if (engineState && stateData.state.level > engineState.level) {
                setTimeout(() => playLevelUpSound(), 150);
            }
            setEngineState(stateData.state);
         }

         const logRes = await fetch(`${restUrl}/logs`, { headers: { 'X-WP-Nonce': nonce } });
         const logData = await logRes.json();
         if (Array.isArray(logData)) setLogs(logData);

       } catch (err) {
         console.error("Failed to post action", err);
       }
       return;
    }

    // Guest Sandbox logic below
    setTotalXp(prevXp => {
      const newXp = prevXp + amount;
      const prevLevelInfo = getLevelInfo(prevXp);
      const newLevelInfo = getLevelInfo(newXp);
      
      const timestamp = new Date().toLocaleTimeString();
      const newLogs: LogEntry[] = [];
      
      // 1. Log the base XP gain
      newLogs.push({
        id: Math.random().toString(36).substr(2, 9),
        timestamp,
        message: `Action processed: "${actionName}"`,
        xpAdded: amount,
        apAdded: payload?.ap || 0,
        gpAdded: payload?.gp || 0,
        type: logType
      });

      if (payload?.ap) setTotalAp(prev => prev + payload.ap);
      if (payload?.gp) setTotalGp(prev => prev + payload.gp);

      // 2. Check for level ups
      if (newLevelInfo.level > prevLevelInfo.level) {
        setTimeout(() => {
          playLevelUpSound();
        }, 150);
        newLogs.push({
          id: Math.random().toString(36).substr(2, 9),
          timestamp,
          message: `🎉 LEVEL UP! Reached Level ${newLevelInfo.level} (${newLevelInfo.label})!`,
          type: 'level_up'
        });
      }

      // 3. Check for achievements unlocks
      const nextUnlocked = [...unlockedAchievements];
      
      // Hello World (first gain)
      if (newXp >= 5 && !nextUnlocked.includes('first_steps')) {
        nextUnlocked.push('first_steps');
        newLogs.push({
          id: Math.random().toString(36).substr(2, 9),
          timestamp,
          message: '🏆 Achievement Unlocked: Hello World! Earned first points.',
          xpAdded: 10,
          type: 'achievement_unlocked'
        });
      }

      // Apply bonuses to final state if any accomplishments were unlocked
      let finalXp = newXp;
      if (nextUnlocked.length > unlockedAchievements.length) {
        setUnlockedAchievements(nextUnlocked);
        const freshlyUnlocked = nextUnlocked.filter(id => !unlockedAchievements.includes(id));
        freshlyUnlocked.forEach(id => {
          if (id === 'first_steps') finalXp += 10;
        });
      }

      // Update feed log
      setLogs(prevLogs => [...newLogs, ...prevLogs].slice(0, 30));

      return finalXp;
    });
  };

  const handleReset = () => {
    localStorage.removeItem('fxp_total_xp');
    localStorage.removeItem('fxp_total_ap');
    localStorage.removeItem('fxp_total_gp');
    localStorage.removeItem('fxp_unlocked_achievements');
    localStorage.removeItem('fxp_logs');
    setTotalXp(0);
    setTotalAp(0);
    setTotalGp(0);
    setUnlockedAchievements([]);
    setLogs([
      {
        id: 'reset-log',
        timestamp: new Date().toLocaleTimeString(),
        message: 'Sandbox Stats Reset. Level database flushed.',
        type: 'api_call'
      }
    ]);
    playXpSound();
  };

  // Smooth scroll handler
  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Monitor screen scrolling to update active header indicators automatically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const sections = ['simulator', 'pricing', 'playground', 'documentation', 'wp-guide'];
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const levelInfo = getLevelInfo(totalXp);
  const passEngineState = isLive && engineState ? engineState : {
     level: levelInfo.level,
     current_xp: totalXp - levelInfo.minXp,
     target_xp: levelInfo.maxXp - levelInfo.minXp,
     total_xp: totalXp,
     total_ap: totalAp,
     total_gp: totalGp,
     title: levelInfo.label,
     stats: {}
  };

  const handleDecayAp = async (amount: number) => {
    if (isLive) {
      await fetch(`${restUrl}/simulate-decay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
        body: JSON.stringify({ ap: amount })
      });
      const stateRes = await fetch(`${restUrl}/state`, { headers: { 'X-WP-Nonce': nonce } });
      const stateData = await stateRes.json();
      if (stateData.state) setEngineState(stateData.state);
      
      const logRes = await fetch(`${restUrl}/logs`, { headers: { 'X-WP-Nonce': nonce } });
      const logData = await logRes.json();
      if (Array.isArray(logData)) setLogs(logData);
    } else {
      setTotalAp(prev => Math.max(0, prev - amount));
      const newLog: LogEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        message: `Simulate Weekly AP Decay`,
        type: 'api_call',
        apAdded: -amount
      };
      setLogs(prev => [newLog, ...prev].slice(0, 30));
    }
  };

  const handleSpendGp = async (amount: number, item: string) => {
    if (isLive) {
      await fetch(`${restUrl}/spend-gp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': nonce },
        body: JSON.stringify({ gp: amount, item })
      });
      const stateRes = await fetch(`${restUrl}/state`, { headers: { 'X-WP-Nonce': nonce } });
      const stateData = await stateRes.json();
      if (stateData.state) setEngineState(stateData.state);
      
      const logRes = await fetch(`${restUrl}/logs`, { headers: { 'X-WP-Nonce': nonce } });
      const logData = await logRes.json();
      if (Array.isArray(logData)) setLogs(logData);
    } else {
      if (totalGp >= amount) {
        setTotalGp(prev => prev - amount);
        const newLog: LogEntry = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toLocaleTimeString(),
          message: `Purchased: ${item}`,
          type: 'api_call',
          gpAdded: -amount
        };
        setLogs(prev => [newLog, ...prev].slice(0, 30));
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/20 antialiased flex flex-col justify-between pb-20">
      
      {/* Navigation Header */}
      <Header onSectionClick={handleSectionClick} activeSection={activeSection} />

      {/* Main Single Page Contents */}
      <main className="flex-1">
        
        {/* HERO INTRO & TRI-CURRENCY ENGINE */}
        <Hero onCtaclick={handleSectionClick} />

        {/* INTERACTIVE ENGINE SIMULATOR */}
        <div id="simulator">
          <Simulator 
            engineState={passEngineState}
            unlockedAchievements={unlockedAchievements}
            logs={logs}
            onAddXp={handleAddXp}
            onDecayAp={handleDecayAp}
            onSpendGp={handleSpendGp}
            onReset={handleReset}
            isLive={isLive}
          />
        </div>

        {/* PRICING TABLE & SAAS API KEYS */}
        <div id="pricing">
          <PricingTable restUrl={restUrl} nonce={nonce} />
        </div>

        {/* CODE SNIPPET PLAYGROUND */}
        <div id="playground">
          <CodePlayground onSimulateCode={(amount, label) => handleAddXp(amount, label, 'api_call')} />
        </div>

        {/* RICH TECHNICAL DOCUMENTATION */}
        <div id="documentation">
          <Documentation />
        </div>

        {/* WORDPRESS THEME INTEGRATION BLUEPRINT */}
        <div id="wp-guide">
          <WPThemeGuide />
        </div>

      </main>

      {/* Footer block */}
      <Footer onSectionClick={handleSectionClick} />

      {/* Fixed Game HUD */}
      <HudBar engineState={passEngineState} />

    </div>
  );
}
