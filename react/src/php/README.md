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
