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
<header class="sticky top-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/10 px-6 py-4">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Logo and Brand -->
        <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center gap-2.5 group">
            <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg transition-transform group-hover:scale-105 duration-300">
                <svg class="h-5.5 w-5.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
            </div>
            <div>
                <div class="flex items-center gap-1.5">
                    <span class="font-display font-bold text-xl text-white tracking-tight leading-none"><?php bloginfo('name'); ?></span>
                    <span class="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono border border-indigo-500/20 font-bold uppercase leading-none">PRO</span>
                </div>
                <p class="text-[9px] text-slate-400 font-mono tracking-wider uppercase mt-1 leading-none"><?php bloginfo('description'); ?></p>
            </div>
        </a>

        <!-- WordPress Custom Menu -->
        <nav class="flex flex-wrap items-center justify-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/10">
            <?php
            if (has_nav_menu('primary-menu')) {
                wp_nav_menu(array(
                    'theme_location' => 'primary-menu',
                    'container' => false,
                    'items_wrap' => '%3$s',
                    'fallback_cb' => false,
                    'before' => '<span class="text-slate-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">',
                    'after' => '</span>'
                ));
            } else {
                // Fallback elegant list of site pages
                $pages = get_pages(array('number' => 4));
                foreach ($pages as $page) {
                    echo '<a href="' . esc_url(get_page_link($page->ID)) . '" class="text-slate-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">' . esc_html($page->post_title) . '</a>';
                }
            }
            ?>
        </nav>
    </div>
</header>
