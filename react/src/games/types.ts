// The shape of an entry in the Games section. One record per game in games.ts.

/** A picture from a game's own art, exported as a PNG under assets/games/. */
export interface GameArt {
  /** Path under the theme's assets/games/ folder. */
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
  /** The art's own size in game pixels; the PNG is a whole-number upscale of it. */
  readonly w: number;
  readonly h: number;
}

/** A titled run of pictures in a game's gallery. */
export interface GameGallery {
  readonly id: string;
  readonly title: string;
  readonly note?: string;
  readonly art: readonly GameArt[];
}

export interface GameFeature {
  readonly title: string;
  readonly text: string;
}

export interface GameLink {
  readonly label: string;
  readonly href: string;
}

export type GameStatus = 'playable' | 'in-development';

export interface Game {
  /** Stable id, used in anchors (#game-<id>). */
  readonly id: string;
  readonly title: string;
  readonly studio: string;
  readonly tagline: string;
  readonly description: string;
  readonly status: GameStatus;
  /** A short line under the status badge, e.g. what is on the way. */
  readonly statusNote?: string;
  readonly playUrl: string;
  readonly hero: GameArt;
  readonly logo?: GameArt;
  /** A single wide picture for the front page teaser. */
  readonly strip?: GameArt;
  readonly tags: readonly string[];
  readonly features: readonly GameFeature[];
  readonly galleries: readonly GameGallery[];
  /** How to install it as an app, when it is one. */
  readonly install?: { readonly text: string; readonly art?: GameArt };
  readonly links: readonly GameLink[];
}
