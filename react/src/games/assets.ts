// Where the Games section finds its files and pages. WordPress passes the theme URL and the
// Games page URL in forthexp_opts (functions.php); without them, paths fall back to the site root.

export function gameAssetUrl(src: string): string {
  const base = window.forthexp_opts?.theme_url ?? '';
  return `${base}/assets/games/${src}`;
}

/** The Games page, or the front page's Games section when no Games page exists yet. */
export function gamesPageUrl(): string {
  return window.forthexp_opts?.games_url || '#games';
}
