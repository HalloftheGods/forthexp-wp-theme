<!-- Footer template -->
<footer class="border-t border-white/10 bg-slate-950/20 py-16 px-6 mt-auto" id="footer-section">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 text-left items-start">
        
        <!-- Brand Description -->
        <div class="md:col-span-5 space-y-4">
            <div class="flex items-center gap-2">
                <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg text-white shadow-md">
                    <svg class="h-5 w-5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                </div>
                <span class="font-display font-bold text-lg text-white tracking-tight">ForTheXP.com</span>
            </div>
            <p class="text-xs text-slate-400 max-w-sm leading-relaxed">
                A high-performance gamification engine engineered for scale. Seamlessly inject bespoke XP loops, unlockable milestones, and robust leaderboard caches directly into your application architecture.
            </p>
            <div class="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <span>Powered by PHP & React</span>
                <span>•</span>
                <span class="flex items-center gap-0.5 text-indigo-400">
                    <svg class="h-3 w-3 fill-current" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    For WordPress Developers
                </span>
            </div>
        </div>

        <!-- QUICK MENU COLUMN (3 cols) -->
        <div class="md:col-span-3 space-y-3">
            <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold block">Engine Links</span>
            <ul class="space-y-2 text-xs font-mono">
                <li>
                    <a href="<?php echo esc_url(home_url('/')); ?>#simulator" class="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <svg class="h-3.5 w-3.5 text-indigo-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 17l6-6-6-6m12 12h-6"></path></svg>
                        Live Simulator
                    </a>
                </li>
                <li>
                    <a href="<?php echo esc_url(home_url('/')); ?>#playground" class="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <svg class="h-3.5 w-3.5 text-indigo-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 17l6-6-6-6m12 12h-6"></path></svg>
                        Code Playground
                    </a>
                </li>
                <li>
                    <a href="<?php echo esc_url(home_url('/')); ?>#documentation" class="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <svg class="h-3.5 w-3.5 text-indigo-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"></path></svg>
                        API Documentation
                    </a>
                </li>
                <li>
                    <a href="<?php echo esc_url(home_url('/')); ?>#wp-guide" class="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <svg class="h-3.5 w-3.5 text-indigo-500/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                        Theme Blueprint
                    </a>
                </li>
            </ul>
        </div>

        <!-- COMPATIBILITY COLUMNS (4 cols) -->
        <div class="md:col-span-4 space-y-3">
            <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold block">CMS Integration specs</span>
            <p class="text-xs text-slate-400 leading-normal">
                ForTheXP integrates natively with standard WordPress database options, custom database tables, and exposes high-performance REST routes for headless WordPress frameworks.
            </p>
            <div class="flex flex-wrap gap-1.5 pt-1.5">
                <span class="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">WordPress v7.0+</span>
                <span class="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">Classic & Block Themes</span>
                <span class="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">REST API v2</span>
            </div>
        </div>

    </div>

    <!-- Bottom Copyright -->
    <div class="max-w-7xl mx-auto border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-[10px] font-mono text-slate-600">
            © <?php echo date('Y'); ?> ForTheXP.com. Built as a fully integrated WordPress gamification theme. All rights reserved.
        </p>
        <div class="flex gap-4 text-[10px] font-mono text-slate-500">
            <a href="#" class="hover:text-slate-300">Back to Top</a>
            <span>·</span>
            <a href="#" class="hover:text-slate-300">SDK Terms</a>
            <span>·</span>
            <a href="#" class="hover:text-slate-300">WP Export License</a>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
