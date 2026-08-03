/**
 * ForTheXP Theme Front-End Interactive Script
 * 
 * Provides responsive client interactions, leveling animations, 
 * audio feedback queues, and REST API logging utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🌟 ForTheXP Gamification Theme Initialized!', 'color: #6366f1; font-weight: bold; font-size: 14px;');
    console.log('%cTrigger interactive events programmatically using standard hooks or calling the REST route: /wp-json/forthexp/v1/award', 'color: #94a3b8;');

    // 1. Level-Up Sound Synthesizer Hook
    window.playXpSoundEffect = (type = 'gain') => {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            if (type === 'level_up') {
                // Majestic dual-chime arpeggio for level milestones
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
                osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6
                
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                
                osc.start(now);
                osc.stop(now + 0.5);
            } else {
                // Short crisp blip for standard XP gains
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now); // A5
                osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08); // E6
                
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
                
                osc.start(now);
                osc.stop(now + 0.15);
            }
        } catch (e) {
            console.warn('Audio Context not allowed by user interaction yet:', e);
        }
    };

    // 2. Micro-interaction animations for cards
    const cards = document.querySelectorAll('.forthexp-wp-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Trigger a subtle clicking sound option if requested
            if (card.classList.contains('interactive-node')) {
                window.playXpSoundEffect('gain');
            }
        });
    });

    // 3. Diagnostics helper for local developer loop
    window.testRestAwardXP = async (amount = 25, actionName = 'portal_click') => {
        if (!window.forthexp_opts) {
            console.error('WordPress localized opts missing. Make sure you are running inside a WordPress environment with functions.php active.');
            return;
        }

        try {
            const response = await fetch(`${window.forthexp_opts.rest_url}/award`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': window.forthexp_opts.nonce
                },
                body: JSON.stringify({
                    xp: amount,
                    action: actionName
                })
            });

            const data = await response.json();
            if (data.status === 'success') {
                console.log('%cXP Award Success!', 'color: #10b981; font-weight: bold;', data);
                window.playXpSoundEffect(data.transaction.leveled_up ? 'level_up' : 'gain');
                
                // Show dynamic notice if applicable
                alert(`Successfully awarded ${amount} XP! New Level: ${data.current_profile.level}`);
            } else {
                console.error('XP Award Failed:', data);
            }
        } catch (err) {
            console.error('API Error:', err);
        }
    };
});
