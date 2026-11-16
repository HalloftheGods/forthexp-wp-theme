<?php
/**
 * The Arcade page template. WordPress picks this for page slug "arcade".
 * Mounts the React GamesPage / ArcadeCabinet powered by @knerd/gui Canvas UI.
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header(); ?>

<main id="arcade-page" class="flex-1">
    <div id="forthexp-games-root"></div>
    <noscript>
        <section class="max-w-7xl mx-auto px-6 py-16 space-y-4">
            <h1 class="font-display font-bold text-4xl text-white tracking-tight">ForTheXP Arcade</h1>
            <p class="text-slate-400">
                Play Undead of Night: Last Round, The Tales of Xadion, and Khro Fighter in your browser.
            </p>
        </section>
    </noscript>
</main>

<?php get_footer();
