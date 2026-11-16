// The Games section's catalogue. Add a game by adding a record here and its PNGs under
// assets/games/<id>/. Describe only what ships today or in development.

import type { Game, GameArt } from './types';

const UON = 'undead-of-night';

/** A 56x40 card from the game's own art book, exported at 6x. */
const card = (file: string, alt: string, caption: string): GameArt => ({ src: `${UON}/${file}`, alt, caption, w: 56, h: 40 });

const LEVELS: readonly (readonly [string, string])[] = [
  ['Silent Ruins', 'a moonlit street of dark houses'],
  ['Escalation', 'a car under a flashing red light with zombies closing in'],
  ['Into the Breach', 'an industrial yard at dusk'],
  ['Abyssal Depths', 'a flooded street'],
  ['Contamination Zone', 'a street under green hazard light'],
  ['Blackout', 'a town with the power cut'],
  ['Quarantine Breach', 'a medical tent and an army truck under red emergency light'],
  ['Frozen Wasteland', 'a snowed-in street'],
  ['The Hive', 'an infested building glowing green'],
  ['Final Stand', 'a town on fire'],
];

const levelArt = LEVELS.map(([title, scene], i): GameArt =>
  card(`level-${String(i + 1).padStart(2, '0')}.png`, `Level ${i + 1}, ${title}: pixel-art card showing ${scene}`, `${i + 1} · ${title}`),
);

export const UNDEAD_OF_NIGHT: Game = {
  id: UON,
  title: 'Undead of Night: Last Round',
  studio: 'Hall of the Gods, Inc.',
  tagline: 'Scavenge a dark town, make every bullet count, and hold out until the van comes.',
  description:
    'Top-down pixel-art zombie survival in an open town at night. Ammo and health are finite: you find them in the town’s buildings, and every gunshot tells nearby zombies where you are. Ten levels, five survivors, four difficulties, solo or co-op.',
  status: 'playable',
  statusNote: 'Runs in your browser. More is on the way.',
  playUrl: 'https://undeadofnight.forthexp.com',
  hero: {
    src: `${UON}/hero.png`,
    alt: 'Undead of Night: Last Round logo, dripping red letters and a full moon, over a pixel-art town on fire',
    w: 280,
    h: 200,
  },
  logo: { src: `${UON}/logo.png`, alt: 'Undead of Night: Last Round', w: 276, h: 94 },
  strip: {
    src: `${UON}/level-strip.png`,
    alt: 'The ten level cards in a row, from Silent Ruins to Final Stand',
    w: 578,
    h: 40,
  },
  tags: ['Zombie survival', 'Top-down', 'Pixel art', 'Solo', 'Co-op', 'Installable app'],
  features: [
    {
      title: 'Ten levels, ten towns',
      text: 'Each level is its own town with its own look, and the hordes grow. Floodwater and Blackout towns change how you play, not just how it looks.',
    },
    {
      title: 'Every shot is a noise',
      text: 'Zombies notice you by sight, which walls block, and by sound, which gunfire spreads. Sneak, sprint, or throw a bottle to pull them away.',
    },
    {
      title: 'Scavenge to survive',
      text: 'Search cars, crates, lockers and fridges for ammo and medicine. Guns and rounds wait at the police station and the gun shop.',
    },
    {
      title: 'Five survivors',
      text: 'Each has a trait: one moves quieter, one reloads faster, one runs faster, one shoves harder, and one finds more loot.',
    },
    {
      title: 'Four difficulties',
      text: 'From Night Light On, with plenty of ammo and slow zombies, to Undead Tired, with scarce ammo, fast zombies and big hordes.',
    },
    {
      title: 'Workbench upgrades',
      text: 'Between levels, fit the barrels, grips, magazines and suppressors you found: damage, fire rate, magazine size or a quieter shot.',
    },
    {
      title: 'Solo or co-op',
      text: 'Play alone, or co-op with friends (online matchmaking coming). Today co-op runs on a small server you host yourself.',
    },
    {
      title: 'Installs as an app',
      text: 'Add it to your home screen or desktop from the browser. Once installed, solo play opens offline.',
    },
  ],
  galleries: [
    { id: 'levels', title: 'Levels', note: 'Ten towns, each with its own night.', art: levelArt },
    {
      id: 'difficulty',
      title: 'Difficulty',
      note: 'Picked before each run and remembered.',
      art: [
        card('difficulty-night-light.png', 'Night Light On difficulty card', 'Night Light On · plenty of ammo'),
        card('difficulty-stay-close.png', 'Stay Close difficulty card', 'Stay Close · the default'),
        card('difficulty-lights-out.png', 'Lights Out difficulty card', 'Lights Out · as it was built'),
        card('difficulty-undead-tired.png', 'Undead Tired difficulty card', 'Undead Tired · scarce ammo, big hordes'),
      ],
    },
    {
      id: 'modes',
      title: 'Modes and the workbench',
      art: [
        card('mode-solo.png', 'Solo mode card: a survivor with a flashlight on a moonlit road', 'Solo'),
        card('mode-multi.png', 'Multiplayer mode card: survivors around a campfire', 'Co-op · matchmaking coming'),
        card('station-workbench.png', 'The workbench: a lamp, tools and a gun on the bench', 'Workbench upgrades'),
      ],
    },
  ],
  install: {
    text: 'Open the game and press the Install Game cartridge, or use your browser’s own Install or Add to Home Screen. It then launches like any app, and solo play works offline.',
    art: {
      src: `${UON}/cartridge.png`,
      alt: 'A grey game cartridge labelled Undead of Night',
      w: 48,
      h: 56,
    },
  },
  links: [{ label: 'Play in your browser', href: 'https://undeadofnight.forthexp.com' }],
};

export const TALES_OF_XADION: Game = {
  id: 'tales-of-xadion',
  title: 'The Tales of Xadion: Lightning in a Bottle',
  studio: 'Hall of the Gods, Inc.',
  tagline: 'An authentic 16-bit HD-2D tactical RPG experience across the mystical realms of Xadion.',
  description:
    'Venture through enchanted realms in a rich story-driven tactical pixel RPG. Master magic, bond with allies, and discover ancient secrets in the expanding Tales of Xadion universe.',
  status: 'in-development',
  statusNote: 'In active development for web and native platforms.',
  playUrl: 'https://undeadofnight.forthexp.com',
  hero: {
    src: `${UON}/hero.png`,
    alt: 'The Tales of Xadion logo and fantasy world',
    w: 280,
    h: 200,
  },
  logo: { src: `${UON}/logo.png`, alt: 'The Tales of Xadion', w: 276, h: 94 },
  tags: ['16-bit RPG', 'HD-2D', 'Tactical', 'Story Rich', 'Pixel Art'],
  features: [
    {
      title: 'Epic Tactical Combat',
      text: 'Grid-based tactical skirmishes with elemental synergies and combo attacks.',
    },
    {
      title: 'Handcrafted Pixel Art',
      text: 'Rich retro 16-bit visual aesthetics with modern dynamic lighting.',
    },
  ],
  galleries: [],
  links: [{ label: 'View Roadmap', href: '#arcade' }],
};

export const KHRO_FIGHTER: Game = {
  id: 'khro-fighter',
  title: 'Khro Fighter',
  studio: 'Hall of the Gods, Inc.',
  tagline: 'High-octane retro horizontal shoot-em-up in the spirit of classic R-Type arcade shooters.',
  description:
    'Piloting the experimental Khro starfighter, navigate treacherous alien starbases, weave through dense bullet curtains, and deploy devastating wave-beam weaponry against cosmic horrors.',
  status: 'in-development',
  statusNote: 'Upcoming arcade shooter prototype.',
  playUrl: 'https://undeadofnight.forthexp.com',
  hero: {
    src: `${UON}/hero.png`,
    alt: 'Khro Fighter arcade marquee',
    w: 280,
    h: 200,
  },
  logo: { src: `${UON}/logo.png`, alt: 'Khro Fighter', w: 276, h: 94 },
  tags: ['Shmup', 'Arcade', 'R-Type style', 'Horizontal shooter', 'Pixel art'],
  features: [
    {
      title: 'Wave-Beam Charge System',
      text: 'Charge concentrated plasma bursts or fire rapid-fire vulcan cannons.',
    },
    {
      title: 'Arcade Scoring & Leaderboards',
      text: 'Chain enemy destructions for massive score multipliers and global XP.',
    },
  ],
  galleries: [],
  links: [{ label: 'Arcade Preview', href: '#arcade' }],
};

export const GAMES: readonly Game[] = [UNDEAD_OF_NIGHT, TALES_OF_XADION, KHRO_FIGHTER];
