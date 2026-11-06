import { ArrowRight, Gamepad2, Play } from 'lucide-react';
import { GAMES } from '../../games/games';
import { gamesPageUrl } from '../../games/assets';
import { GHOST_BUTTON, PLAY_BUTTON, StatusBadge, TagList } from './GameShowcase';
import PixelImage from './PixelImage';

/** The front page's Games section: one card per game, linking to the Games page. */
export default function GamesTeaser() {
  const pageUrl = gamesPageUrl();
  const hasPage = !pageUrl.startsWith('#');
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/10 scroll-mt-28" id="games" aria-labelledby="games-title">
      <div className="mb-10 text-center md:text-left">
        <h2 id="games-title" className="font-display font-bold text-3xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
          <Gamepad2 className="h-6 w-6 text-indigo-400" aria-hidden="true" />
          Games
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">Games you can play right now, in your browser.</p>
      </div>

      <ul className="space-y-8">
        {GAMES.map((game) => (
          <li key={game.id} className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-4 sm:p-6 space-y-6 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex justify-center">
                <div className="rounded-2xl border border-white/10 bg-black p-1.5">
                  <PixelImage art={game.hero} scales={[1, 2, 2]} className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-5 text-left">
                <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider">{game.studio}</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">{game.title}</h3>
                <p className="text-slate-300 leading-relaxed">{game.tagline}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge game={game} />
                  {game.statusNote && <span className="text-xs text-slate-400">{game.statusNote}</span>}
                </div>
                <TagList game={game} />
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={game.playUrl} className={PLAY_BUTTON}>
                    <Play className="h-4 w-4" aria-hidden="true" />
                    Play now
                  </a>
                  {hasPage && (
                    <a href={`${pageUrl}#game-${game.id}`} className={GHOST_BUTTON}>
                      More about the game
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            {game.strip && (
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-black p-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400" tabIndex={0} role="region" aria-label={`${game.title} levels, scrollable`}>
                <PixelImage art={game.strip} scales={[2, 2, 2]} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
