<!DOCTYPE html>
<html <?php language_attributes(); ?> style="background-color: #020617; color-scheme: dark;">
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="dark">
    <meta name="theme-color" content="#020617">
    <style>
        :root, html, body {
            background-color: #020617 !important;
            color: #cbd5e1;
            color-scheme: dark;
        }
    </style>
    <!-- Prefetch for smooth font delivery -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-slate-950 text-slate-300 font-sans min-h-screen antialiased selection:bg-indigo-500/20 selection:text-white'); ?> style="background-color: #020617;">

<!-- Dynamic WordPress Header with Tailwind UI Style -->
<header class="relative md:sticky md:top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <!-- Logo and Brand -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2 cursor-pointer group" id="header-logo-container">
            <div class="bg-indigo-500 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <svg class="h-6 w-6 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
            </div>
            <div>
                <div class="flex items-center gap-1.5">
                    <span class="font-display font-bold text-xl text-white tracking-tight">ForThe<span class="text-indigo-400">XP</span></span>
                    <span class="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono font-medium border border-indigo-500/20">
                        .com
                    </span>
                </div>
                <p class="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Bespoke Gamification Core</p>
            </div>
        </a>

        <!-- Navigation Menu -->
        <nav class="flex flex-wrap items-center justify-center gap-1 bg-white/5 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
            <?php
            if (has_nav_menu('primary-menu')) {
                wp_nav_menu(array(
                    'theme_location' => 'primary-menu',
                    'container' => false,
                    'items_wrap' => '%3$s',
                    'fallback_cb' => false,
                    'before' => '<span class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/5">',
                    'after' => '</span>'
                ));
            } else {
                // Fallback list (the Games page gets its own link below)
                $games_page = forthexp_games_page();
                $pages = get_pages(array('number' => 4, 'exclude' => $games_page ? array($games_page->ID) : array()));
                foreach ($pages as $page) {
                    echo '<a href="' . esc_url(get_page_link($page->ID)) . '" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/5">' . esc_html($page->post_title) . '</a>';
                }
            }
            ?>
            <a href="<?php echo esc_url(forthexp_games_url()); ?>" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 <?php echo is_page('games') ? 'bg-white/15 text-white border border-white/10 font-semibold' : 'text-slate-400 hover:text-white hover:bg-white/5'; ?>" id="nav-games"<?php echo is_page('games') ? ' aria-current="page"' : ''; ?>>
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6 11h4M8 9v4M15 12h.01M18 10h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59l-.9 8.06A2.5 2.5 0 0 0 4.3 19.4c.94 0 1.8-.53 2.23-1.36L7.5 16h9l.97 2.04a2.5 2.5 0 0 0 2.23 1.36 2.5 2.5 0 0 0 2.49-2.75l-.9-8.06A4 4 0 0 0 17.32 5z"/></svg>
                Games
            </a>
        </nav>

        <!-- External Tags & Quick Info -->
        <div class="hidden lg:flex items-center gap-3">
            <span class="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 font-mono">
                v1.2.0-stable
            </span>
            <span class="text-[11px] px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono flex items-center gap-1.5 font-medium">
                <span class="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                WP 7.0+ Ready
            </span>
        </div>

    </div>
</header>
