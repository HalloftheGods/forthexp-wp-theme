import { ArrowRight, Download, Play } from 'lucide-react';
import type { Game, GameGallery } from '../../games/types';
import PixelImage from './PixelImage';

interface GameShowcaseProps {
  game: Game;
}

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950';

export const PLAY_BUTTON = `inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-slate-950 font-bold tracking-tight shadow-xl shadow-indigo-500/10 hover:bg-slate-200 motion-safe:hover:scale-[1.02] motion-safe:transition-all duration-300 ${FOCUS}`;
export const GHOST_BUTTON = `inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium motion-safe:transition-colors ${FOCUS}`;

const STATUS_LABEL: Record<Game['status'], string> = { playable: 'Playable now', 'in-development': 'In development' };

export function StatusBadge({ game }: GameShowcaseProps) {
  const live = game.status === 'playable';
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-mono font-medium">
      <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-emerald-400 motion-safe:animate-pulse' : 'bg-amber-400'}`} aria-hidden="true"></span>
      {STATUS_LABEL[game.status]}
    </span>
  );
}

export function TagList({ game }: GameShowcaseProps) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
      {game.tags.map((tag) => (
        <li key={tag} className="text-[10px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Gallery({ gallery, gameId }: { gallery: GameGallery; gameId: string }) {
  const headingId = `${gameId}-gallery-${gallery.id}`;
  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <div>
        <h4 id={headingId} className="font-display font-semibold text-lg text-white">{gallery.title}</h4>
        {gallery.note && <p className="text-slate-400 text-sm">{gallery.note}</p>}
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {gallery.art.map((art) => (
          <li key={art.src}>
            <figure className="h-full flex flex-col items-center gap-2 bg-slate-900/60 border border-white/10 rounded-2xl p-2 overflow-hidden">
              <PixelImage art={art} scales={[2, 3, 3]} className="rounded-lg" />
              {art.caption && <figcaption className="text-[11px] font-mono text-slate-400 text-center leading-snug">{art.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** One game's full showcase: hero, features, gallery and the install note. */
export default function GameShowcase({ game }: GameShowcaseProps) {
  const titleId = `game-${game.id}-title`;
  return (
    <article aria-labelledby={titleId} id={`game-${game.id}`} className="space-y-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 text-left">
          <p className="text-xs font-mono text-indigo-400 uppercase tracking-wider">{game.studio}</p>
          <h2 id={titleId} className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-tight">{game.title}</h2>
          <p className="text-lg text-slate-200 leading-relaxed">{game.tagline}</p>
          <p className="text-slate-400 leading-relaxed">{game.description}</p>
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
            {game.install && (
              <a href={`#${game.id}-install`} className={GHOST_BUTTON}>
                <Download className="h-4 w-4" aria-hidden="true" />
                Install as an app
              </a>
            )}
          </div>
          {game.links.some((link) => link.href !== game.playUrl) && (
            <ul className="flex flex-wrap gap-4 text-sm">
              {game.links.filter((link) => link.href !== game.playUrl).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={`text-indigo-300 hover:text-white underline underline-offset-4 ${FOCUS}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center order-first lg:order-none">
          <div className="rounded-3xl border border-white/10 bg-black p-2 shadow-2xl shadow-indigo-500/10">
            <PixelImage art={game.hero} scales={[1, 2, 2]} className="rounded-2xl" eager />
          </div>
        </div>
      </div>

      <section aria-label="Key features">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {game.features.map((feature, index) => (
            <li key={feature.title} className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-2">
              <span className="font-mono text-[10px] text-indigo-400" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="text-white font-display font-semibold text-lg">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby={`${game.id}-gallery`} className="space-y-10">
        <h3 id={`${game.id}-gallery`} className="font-display font-bold text-2xl text-white tracking-tight">Gallery</h3>
        {game.galleries.map((gallery) => (
          <div key={gallery.id}>
            <Gallery gallery={gallery} gameId={game.id} />
          </div>
        ))}
      </section>

      {game.install && (
        <section id={`${game.id}-install`} aria-labelledby={`${game.id}-install-title`} className="scroll-mt-28 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          {game.install.art && <PixelImage art={game.install.art} scales={[2, 3, 3]} />}
          <div className="space-y-4 text-center sm:text-left">
            <h3 id={`${game.id}-install-title`} className="font-display font-bold text-2xl text-white tracking-tight">Install as an app</h3>
            <p className="text-slate-400 leading-relaxed max-w-2xl">{game.install.text}</p>
            <a href={game.playUrl} className={`${GHOST_BUTTON} py-3`}>
              Open the game
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      )}
    </article>
  );
}
