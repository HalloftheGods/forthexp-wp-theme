# ForTheXP - WordPress Gamification Theme

This subdirectory containing a complete, stand-alone, fully structured **WordPress PHP Theme** crafted dynamically with modern **Tailwind Utility CSS**, custom **WordPress Shortcodes**, and fully functional **REST API endpoints** that allow syncing experience points (XP) to user meta.

---

## 📂 Theme Directory Structure

```text
forthexp-wordpress-theme/
├── style.css           # Theme metadata headers and base typography styles
├── header.php          # Dynamic document head, navigation, and font loading
├── index.php           # Post loops and interactive columns (renders cards & logs)
├── footer.php          # Site footnotes, copyright tags, and script triggers
├── functions.php       # Core PHP SDK: level calculations, user stats metadata, shortcodes
└── js/
    └── scripts.js      # Client-side audio chimes, micro-animations, and REST test scripts
```

---

## ⚡ How to Install on WordPress

1. **Compress the theme**:
   Zip all files directly inside this `./src/php` directory into a file named `forthexp-theme.zip`. Make sure the files (`style.css`, `header.php`, etc.) reside at the root level of the zip archive.

2. **Upload to WordPress**:
   - Go to your WordPress Dashboard.
   - Navigate to **Appearance** → **Themes** → **Add New**.
   - Click **Upload Theme** and select your `forthexp-theme.zip` file.
   - Click **Install Now** and then click **Activate**.

3. **Set up Navigation Menu**:
   - Go to **Appearance** → **Menus**.
   - Create a new menu, add a few pages, and assign it to the **Primary Navigation Menu** location.

---

## 🛠️ Developer integration guide

### 1. Progressive XP Math Formula
The experience scaling system is progressive, calculating required cumulative experience ($XP$) for any level ($L$) using the following cubic scaling equation in `functions.php`:

$$\text{Required XP}(L) = \text{Base XP} \times (L - 1)^{1.5} + \text{Offset}$$

By default, the theme sets **Base XP** to `150` and the **Offset** to `100`. You can override these multipliers easily in your theme's `functions.php` or using filters:

```php
// Tweak parameters inside your active site setup
add_filter('forthexp_xp_base_multiplier', function() {
    return 120; // Lower Base XP for faster level climbing
});
```

### 2. Custom WordPress Shortcode
We've registered a modern profile card shortcode:
```text
[forthexp_profile_card theme="dark" show_badges="true"]
```
You can place this shortcode anywhere inside block editors, post bodies, or widgets to render a glowing, responsive user avatar showing level, current XP progression, a filled animated visual progress bar, and unlocked badge arrays.

### 3. Exposing REST API webhooks
The theme registers a custom WordPress REST API endpoint:
- **Route**: `POST /wp-json/forthexp/v1/award`
- **Arguments**:
  - `user_id` (Integer, Optional): Target user to reward.
  - `xp` (Integer, Optional, default `25`): XP points to award.
  - `action` (String, Optional): Log tag, e.g. `'read_post_45'`.

#### Test Calling via Client JavaScript:
Open your browser console on any page running this theme, and call our localized JavaScript utility helper:
```javascript
// Awards 50 XP, triggers dual-tone chimes on level-up, and updates local state.
testRestAwardXP(50, 'quiz_completed');
```

---

## 🚀 Bundling React alongside PHP

If you build single-page dashboard apps using your compiled React/Vite assets, you can load them inside WordPress by simply enqueuing the compiled `dist` JS bundle.
Inside your `functions.php`, add:

```php
function forthexp_enqueue_react_bundle() {
    // Enqueue the production compiled script from your 'dist' folder
    wp_enqueue_script(
        'forthexp-react-app', 
        get_template_directory_uri() . '/dist/assets/index.js', 
        array(), 
        '1.0.0', 
        true
    );
}
add_action('wp_enqueue_scripts', 'forthexp_enqueue_react_bundle');
```
Then, render a container element `<div id="root"></div>` in any template page like `index.php` or a page template, and React will automatically mount and boot on your WordPress theme without any static compiling conflicts!

---

## 🎮 Games section

A data-driven showcase of playable games. The first entry is **Undead of Night: Last Round** (Hall of the Gods, Inc.), played at <https://undeadofnight.forthexp.com>.

### Where it shows

| Place | How |
| :--- | :--- |
| Front page | `GamesTeaser` in the React app (`#games` section, after the hero). |
| Navigation | A **Games** link in the React header (`react/src/components/Header.tsx`) and in the PHP header (`header.php`, after the menu or the page fallback list). |
| Games page | `page-games.php`, picked by WordPress for a published page with the slug `games`. It renders the PHP header and footer and mounts the React `GamesPage` in `#forthexp-games-root`. |

Until a `games` page exists, every Games link goes to the front page's `#games` section (`forthexp_games_url()` in `functions.php`).

### Adding a game

1. Add a `Game` record to `GAMES` in `react/src/games/games.ts` (types in `react/src/games/types.ts`). Describe only what ships today.
2. Put its PNGs in `assets/games/<id>/`. Pixel art is shown at whole-number scales with hard edges (`PixelImage` and `.pixel-art` in `react/src/index.css`); give each picture its art's own size (`w`, `h`) so the scale stays whole.
3. Rebuild: `npm --prefix react run build` (or `pnpm build:forthexp` from the monorepo root), and commit `react-dist/`.

The Undead of Night PNGs are exported from the game's own art book (`apps/zombie-survival/src/art`), nearest-neighbour upscaled (6x for the 56x40 cards, cartridge and busts, 3x for the logo and the hero), about 140 KB in all.

**Meet the survivors** (the five character-select busts) is one self-contained block. To take it out: delete `react/src/components/games/MeetTheSurvivors.tsx`, its entry in `GAME_EXTRAS` in `react/src/components/games/GamesPage.tsx`, and `assets/games/undead-of-night/survivors/`, then rebuild.

### Files this change touched

- New: `page-games.php`, `assets/games/undead-of-night/*.png` (+ `survivors/`), `react/src/games/{types,games,assets}.ts`, `react/src/components/games/{PixelImage,GameShowcase,GamesTeaser,GamesPage,MeetTheSurvivors}.tsx`.
- Changed: `functions.php` (`forthexp_games_page()`, `forthexp_games_url()`, `theme_url` and `games_url` in `forthexp_opts`, the React bundle also loads on the Games page), `header.php` (Games link; the header is sticky from `md` up only, so the wrapped phone nav no longer covers the page), `react/src/main.tsx` (mounts `App` on `#root` and `GamesPage` on `#forthexp-games-root`, and nothing when neither is on the page), `react/src/App.tsx`, `react/src/components/Header.tsx`, `react/src/index.css` (`.pixel-art`, and `@source "../../*.php"` so Tailwind also builds the classes the PHP templates use), `react-dist/assets/index.{js,css}`.

### How the theme reaches www.forthexp.com

- The live site is blog 77 (`https://www.forthexp.com`) of the multisite at `~/site/public_html` on `mycompass.tempurl.host`. Its theme folder is a plain copy (no git checkout) at `wp-content/themes/forthexp-wp-theme`, version 26.9.15-1188 when checked on 2026-11-06.
- A push to `main` here runs `.github/workflows/compass.yml`, which calls the shared `HalloftheGods/.github` pipeline: it bumps the version in `style.css` and publishes a GitHub release `v<version>` with `forthexp-wp-theme-<version>.zip` (the repo minus `.git/`, `.github/`, `node_modules/`, `*.zip`). The network-active **xophz-compass** plugin's updater (`includes/class-xophz-compass-updater.php`, through the `Update URI` header) then offers that release as a theme update.
- Front page: Settings → Reading is "A static page" with **Front Page** (ID 4) as the front page. WordPress renders it with this theme's `front-page.php` (the React app), because `front-page.php` outranks any page template; page 4's slug `one-page-express` and its `default` template are leftovers with no effect.

### Publishing (run by you)

```bash
# 1. Push the theme, then the monorepo pointer
git -C wp-content/themes/forthexp-wp-theme push origin main
git push origin main
# 2. Wait for the Compass workflow to publish the new release
gh release list -R HalloftheGods/forthexp-wp-theme -L 3
# 3. Back up the live copy, then update the theme on the server
ssh mycompass.tempurl.host 'cp -a ~/site/public_html/wp-content/themes/forthexp-wp-theme ~/backups/forthexp-wp-theme-26.9.15-1188'
ssh mycompass.tempurl.host 'cd ~/site/public_html && wp theme update forthexp-wp-theme'
#    (or Network Admin → Themes → Update)
# 4. Create the Games page on www.forthexp.com (default template; the slug picks page-games.php)
ssh mycompass.tempurl.host 'cd ~/site/public_html && wp --url=https://www.forthexp.com post create --post_type=page --post_title=Games --post_name=games --post_status=publish'
```

No menu work is needed: no menu is assigned to `primary-menu`, and the PHP header adds the Games link itself. If a menu is assigned later, leave Games out of it or the link shows twice.

### Rolling back

- Restore the backup: `ssh mycompass.tempurl.host 'rm -rf ~/site/public_html/wp-content/themes/forthexp-wp-theme && cp -a ~/backups/forthexp-wp-theme-26.9.15-1188 ~/site/public_html/wp-content/themes/forthexp-wp-theme'`.
- Or reinstall the previous release: `wp theme install https://github.com/HalloftheGods/forthexp-wp-theme/releases/download/v26.9.15/forthexp-wp-theme-26.9.15.zip --force` (check the asset name with `gh release view v26.9.15 -R HalloftheGods/forthexp-wp-theme`).
- Or `git revert` the Games commit here and push, which publishes a new release without it.
- The Games page can stay: without `page-games.php` it falls back to `index.php`. Trash it with `wp --url=https://www.forthexp.com post delete <id>` if wanted.
