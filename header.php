<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Prefetch for smooth font delivery -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-slate-950 text-slate-300 font-sans min-h-screen antialiased selection:bg-indigo-500/20 selection:text-white'); ?>>

<!-- Dynamic WordPress Header with Tailwind UI Style -->
<header class="sticky top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4">
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
                // Fallback list
                $pages = get_pages(array('number' => 4));
                foreach ($pages as $page) {
                    echo '<a href="' . esc_url(get_page_link($page->ID)) . '" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium tracking-tight transition-all duration-200 text-slate-400 hover:text-white hover:bg-white/5">' . esc_html($page->post_title) . '</a>';
                }
            }
            ?>
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
