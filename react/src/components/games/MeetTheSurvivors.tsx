// "Meet the survivors": the five busts from Undead of Night's character select.
// A self-contained block on purpose, so it can come out cleanly: delete this file, its entry in
// GAME_EXTRAS in GamesPage.tsx, and assets/games/undead-of-night/survivors/.

import type { GameArt } from '../../games/types';
import PixelImage from './PixelImage';

const bust = (name: string): GameArt => ({
  src: `undead-of-night/survivors/survivor-${name.toLowerCase()}.png`,
  alt: `Pixel-art portrait of ${name}, a survivor in Undead of Night`,
  w: 48,
  h: 56,
});

const SURVIVORS: readonly { name: string; trait: string }[] = [
  { name: 'Night', trait: 'Moves quieter' },
  { name: 'Bandus', trait: 'Reloads faster' },
  { name: 'Queen', trait: 'Runs faster' },
  { name: 'Rex', trait: 'Shoves harder' },
  { name: 'Sol', trait: 'Loots more' },
];

export default function MeetTheSurvivors() {
  return (
    <section aria-labelledby="undead-of-night-survivors" className="space-y-6">
      <div>
        <h3 id="undead-of-night-survivors" className="font-display font-bold text-2xl text-white tracking-tight">Meet the survivors</h3>
        <p className="text-slate-400 text-sm mt-1">Pick one on the title screen. In co-op nobody shares a survivor.</p>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {SURVIVORS.map(({ name, trait }) => (
          <li key={name}>
            <figure className="h-full flex flex-col items-center gap-2 bg-slate-900/60 border border-white/10 rounded-2xl p-3 overflow-hidden">
              <PixelImage art={bust(name)} scales={[2, 3, 3]} />
              <figcaption className="text-center">
                <span className="block font-display font-semibold text-white">{name}</span>
                <span className="block text-[11px] font-mono text-indigo-300">{trait}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
