// Native Web Audio API synthesizer for retro-inspired XP and level up sounds.
// This is completely self-contained and does not load external files.

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a quick, pleasant dual-tone XP collection sound (retro coin sound)
 */
export function playXpSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    // Create oscillator and gain node
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    
    // Starting short coin sound (E5 then B5)
    osc.frequency.setValueAtTime(659.25, now); // E5
    osc.frequency.setValueAtTime(987.77, now + 0.08); // B5
    
    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.25);
  } catch (error) {
    console.warn('Audio play failed', error);
  }
}

/**
 * Plays a triumphant level-up major-arpeggio fanfare
 */
export function playLevelUpSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6
    const noteDuration = 0.07;
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle'; // Smoother, retro-synth sound
      osc.frequency.setValueAtTime(freq, now + idx * noteDuration);
      
      gainNode.gain.setValueAtTime(0.12, now + idx * noteDuration);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + idx * noteDuration + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now + idx * noteDuration);
      osc.stop(now + idx * noteDuration + 0.32);
    });
  } catch (error) {
    console.warn('Audio play failed', error);
  }
}
