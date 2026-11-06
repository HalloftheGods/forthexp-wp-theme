import type { ComponentType } from 'react';
import { Gamepad2 } from 'lucide-react';
import { GAMES } from '../../games/games';
import GameShowcase from './GameShowcase';
import MeetTheSurvivors from './MeetTheSurvivors';

/** Optional blocks shown after a game's showcase, by game id. */
const GAME_EXTRAS: Record<string, ComponentType> = {
  'undead-of-night': MeetTheSurvivors,
};

/** The Games page body (page-games.php mounts it under the theme's PHP header). */
export default function GamesPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] max-w-full h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-16 space-y-16">
        <header className="text-center md:text-left space-y-3">
          <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-indigo-400 font-mono">
            <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
            {GAMES.length === 1 ? '1 game' : `${GAMES.length} games`}
          </p>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">Games</h1>
          <p className="text-slate-400 max-w-2xl leading-relaxed">Games you can play right now, in your browser.</p>
          {GAMES.length > 1 && (
            <nav aria-label="Games on this page">
              <ul className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                {GAMES.map((game) => (
                  <li key={game.id}>
                    <a href={`#game-${game.id}`} className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white">{game.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>
        {GAMES.map((game) => {
          const Extra = GAME_EXTRAS[game.id];
          return (
            <div key={game.id} className="space-y-16 border-t border-white/10 pt-16">
              <GameShowcase game={game} />
              {Extra && <Extra />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
