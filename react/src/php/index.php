<?php get_header(); ?>

<main class="min-h-screen pb-20">
    <!-- HERO DECORATION -->
    <section class="relative overflow-hidden py-24 px-6 border-b border-white/10 bg-slate-950">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div class="max-w-5xl mx-auto text-center relative z-10 space-y-6">
            <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
                Inject <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Game Mechanics</span><br>Into Your Website
            </h1>
            <p class="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                <?php 
                if (have_posts()) {
                    the_post();
                    the_excerpt();
                    rewind_posts();
                } else {
                    echo esc_html('The modern gamification engine for developers. Build custom XP events, unlock beautiful milestone badges, and drive active user engagement.');
                }
                ?>
            </p>
        </div>
    </section>

    <!-- CONTENT AND INTERACTIVE GRID -->
    <div class="max-w-7xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <!-- LEFT COLUMN: WORDPRESS BLOG FEED (7 cols) -->
            <div class="lg:col-span-7 space-y-10">
                <div class="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div class="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
                    <h2 class="font-display font-bold text-2xl text-white tracking-tight">Active Portal Content</h2>
                </div>

                <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                    <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-4 hover:border-white/15 transition-all'); ?>>
                        <div class="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400">
                            <span class="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/15">
                                <?php the_category(', '); ?>
                            </span>
                            <span>•</span>
                            <time datetime="<?php echo get_the_date('c'); ?>"><?php echo get_the_date(); ?></time>
                            <span>•</span>
                            <span>By <?php the_author(); ?></span>
                        </div>

                        <h3 class="font-display font-bold text-xl md:text-2xl text-white hover:text-indigo-400 transition-colors">
                            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                        </h3>

                        <div class="text-slate-300 text-sm leading-relaxed prose prose-invert max-w-none">
                            <?php the_content(); ?>
                        </div>

                        <!-- WP Post Meta: Simulator Hook -->
                        <div class="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
                            <span class="flex items-center gap-1">
                                🔑 Trigger ID: <code class="bg-slate-950 px-2 py-1 rounded text-slate-300">read_post_<?php the_ID(); ?></code>
                            </span>
                            <span class="text-indigo-400 font-bold">+25 XP AVAILABLE</span>
                        </div>
                    </article>
                <?php endwhile; else : ?>
                    <!-- Fallback default beautiful post mock for standalone previews -->
                    <div class="bg-white/5 border border-white/10 rounded-3xl p-8 text-center space-y-4">
                        <div class="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
                            <svg class="h-6 w-6 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v1.5M16.5 7.5h3"/>
                            </svg>
                        </div>
                        <h3 class="font-display font-bold text-lg text-white">No custom posts loaded yet</h3>
                        <p class="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                            This custom WordPress theme loops your posts dynamically here. Each post can be coded to trigger a direct database XP transaction when accessed!
                        </p>
                    </div>
                <?php endif; ?>
            </div>

            <!-- RIGHT COLUMN: GAMIFIED WIDGET SIDEBAR (5 cols) -->
            <div class="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
                
                <!-- Gamified Player Dashboard Hook -->
                <div class="space-y-4">
                    <div class="flex items-center gap-2 border-b border-white/10 pb-4">
                        <svg class="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <h2 class="font-display font-bold text-lg text-white tracking-tight">WordPress Player Sync</h2>
                    </div>

                    <?php 
                    // Render the real live profile shortcode from functions.php
                    echo do_shortcode('[forthexp_profile_card theme="dark" show_badges="true"]'); 
                    ?>
                </div>

                <!-- Recent Activities Logs -->
                <div class="space-y-4">
                    <h3 class="font-display font-bold text-sm text-slate-400 uppercase tracking-wider font-mono">Simulated Webhook Logs</h3>
                    <div class="bg-slate-950 border border-white/10 rounded-2xl p-4.5 space-y-3.5 font-mono text-[11px] text-slate-400">
                        <div class="flex items-start gap-2 text-indigo-400">
                            <span class="text-slate-600">[02:38]</span>
                            <span>API trigger fired: <code>on_comment_submit</code></span>
                        </div>
                        <div class="flex items-start gap-2 text-emerald-400">
                            <span class="text-slate-600">[02:35]</span>
                            <span>Database update: User #1 gained 50 XP (Milestone achieved)</span>
                        </div>
                        <div class="flex items-start gap-2 text-slate-500">
                            <span class="text-slate-600">[02:12]</span>
                            <span>Listening on REST route: <code>/wp-json/forthexp/v1/award</code></span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>
