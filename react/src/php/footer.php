<!-- Footer template -->
<footer class="border-t border-white/10 bg-slate-950/20 py-16 px-6 mt-auto" id="footer-section">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 text-left items-start">
        
        <!-- Brand Description -->
        <div class="md:col-span-5 space-y-4">
            <div class="flex items-center gap-2">
                <div class="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg text-white shadow-md">
                    <svg class="h-4.5 w-4.5 stroke-[2]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                </div>
                <span class="font-display font-bold text-lg text-white tracking-tight">ForTheXP.com</span>
            </div>
            <p class="text-xs text-slate-400 max-w-sm leading-relaxed">
                The high-performance web gamification engine. Embed experience progress, achievements, user levels, and leaderboard data caches inside any layout in minutes.
            </p>
            <div class="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                <span>Theme Engine Spec v1.0.0</span>
                <span>•</span>
                <span class="text-indigo-400 font-bold uppercase">WordPress Native</span>
            </div>
        </div>

        <!-- Documentation Links -->
        <div class="md:col-span-3 space-y-3">
            <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold block">PHP Theme Docs</span>
            <ul class="space-y-2 text-xs font-mono">
                <li>
                    <a href="https://forthexp.com/docs/api" class="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <span>→</span> Theme API Reference
                    </a>
                </li>
                <li>
                    <a href="https://forthexp.com/docs/shortcodes" class="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <span>→</span> Shortcode Index
                    </a>
                </li>
                <li>
                    <a href="https://forthexp.com/docs/database" class="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                        <span>→</span> Database Schema
                    </a>
                </li>
            </ul>
        </div>

        <!-- System Specifications -->
        <div class="md:col-span-4 space-y-3">
            <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold block">CMS Integration specs</span>
            <p class="text-xs text-slate-400 leading-normal">
                ForTheXP integrates natively with standard WordPress database options, custom post meta tables, and exposes high-performance REST routes for headless WordPress frameworks.
            </p>
            <div class="flex flex-wrap gap-1.5 pt-1.5">
                <span class="text-[9px] font-mono bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded">WordPress v6.x</span>
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
