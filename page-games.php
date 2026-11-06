<?php
/**
 * The Games page. WordPress picks this template for a published page with the slug "games"
 * (page-{slug}.php). The showcase itself is the React GamesPage (react/src/components/games/),
 * mounted under this theme's PHP header and footer; its data lives in react/src/games/games.ts
 * and its pictures in assets/games/.
 */

if (!defined('ABSPATH')) {
    exit;
}

get_header(); ?>

<main id="games-page" class="flex-1">
    <div id="forthexp-games-root"></div>
    <noscript>
        <section class="max-w-7xl mx-auto px-6 py-16 space-y-4">
            <h1 class="font-display font-bold text-4xl text-white tracking-tight">Games</h1>
            <p class="text-slate-400">
                <a class="text-indigo-400 underline" href="https://undeadofnight.forthexp.com">Play Undead of Night: Last Round</a>,
                a top-down pixel-art zombie survival game, in your browser.
            </p>
        </section>
    </noscript>
</main>

<?php get_footer();
