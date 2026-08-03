import { useState, useEffect } from 'react';
import { Globe, FolderTree, FileText, Check, Settings, Code, Info } from 'lucide-react';
import { Highlight, themes, Prism } from 'prism-react-renderer';

export default function WPThemeGuide() {
  const [activeFile, setActiveFile] = useState<string>('style-css');
  const [copied, setCopied] = useState<string | null>(null);
  const [langsLoaded, setLangsLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function loadLangs() {
      if (typeof window !== 'undefined') {
        (window as any).Prism = Prism;
        await import('prismjs/components/prism-markup-templating');
        await import('prismjs/components/prism-php');
        await import('prismjs/components/prism-bash');
        setLangsLoaded(true);
      }
    }
    loadLangs();
  }, []);

  const themeFiles = [
    { id: 'style-css', label: 'style.css (WP Headers)', icon: FileText },
    { id: 'header-php', label: 'header.php (Header Template)', icon: Code },
    { id: 'index-php', label: 'index.php (Main Template)', icon: Code },
    { id: 'footer-php', label: 'footer.php (Footer Template)', icon: Code },
    { id: 'functions-php', label: 'functions.php (Enqueues)', icon: Settings },
  ];

  const getCodeString = (fileId: string): string => {
    switch (fileId) {
      case 'style-css':
        return `/*
Theme Name: ForTheXP Dev Showcase
Theme URI: https://forthexp.com/theme
Author: ForTheXP Team
Author URI: https://forthexp.com
Description: A high-performance, developer-focused, gamified WordPress theme designed to promote custom XP systems and showcase project documentations.
Version: 1.0.0
License: GNU GPL v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Text Domain: forthexp-theme
Tags: gamification, clean, slate-dark, dark-mode, developers, documentation, custom-colors
*/

/* Reset margins and set core styles */
body {
    background-color: #020617; /* bg-slate-950 */
    color: #cbd5e1; /* text-slate-300 */
    font-family: 'Inter', sans-serif;
    margin: 0;
}`;

      case 'header-php':
        return `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Fonts Integration -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-slate-950 text-slate-300 font-sans min-h-screen'); ?>>

<header className="sticky top-0 z-50 bg-slate-950/50 backdrop-blur-md border-b border-white/10 px-6 py-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Logo and Brand -->
        <a href="<?php echo esc_url(home_url('/')); ?>" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl text-white shadow-lg">
                <svg class="h-6 w-6 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div>
                <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-xl text-white tracking-tight"><?php bloginfo('name'); ?></span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-mono border border-indigo-500/20">.com</span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase"><?php bloginfo('description'); ?></p>
            </div>
        </a>

        <!-- WordPress Custom Menu -->
        <nav className="flex flex-wrap items-center justify-center gap-1 bg-white/5 p-1.5 rounded-xl border border-white/10">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary-menu',
                'container' => false,
                'items_wrap' => '%3$s',
                'fallback_cb' => false
            ));
            ?>
        </nav>
    </div>
</header>`;

      case 'index-php':
        return `<?php get_header(); ?>

<main className="min-h-screen pb-20">
    <!-- HERO SECTION -->
    <section className="relative overflow-hidden py-20 px-6 border-b border-white/10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                Inject <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Game Mechanics</span><br>Into Your Website
            </h1>
            <p className="text-slate-400 text-base max-w-2xl mx-auto mb-10"><?php the_content(); ?></p>
        </div>
    </section>

    <!-- INTERACTIVE ENGINE SIMULATOR (Renders the Shortcodes) -->
    <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <!-- Left Side: User profile rendering via our WP Widget Shortcode -->
            <div className="lg:col-span-5">
                <?php echo do_shortcode('[forthexp_profile theme="dark"]'); ?>
            </div>
            
            <!-- Right Side: Leaderboard list -->
            <div className="lg:col-span-7">
                <?php echo do_shortcode('[forthexp_leaderboard limit="5"]'); ?>
            </div>
        </div>
    </div>
</main>

<?php get_footer(); ?>`;

      case 'footer-php':
        return `<footer className="border-t border-white/10 bg-slate-950/20 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="font-display font-bold text-slate-100">ForTheXP.com</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-500 font-mono">v1.2.0</span>
            </div>
            <p className="text-xs text-slate-500">© <?php echo date('Y'); ?> ForTheXP. All rights reserved. WordPress Theme Theme Integration.</p>
        </div>
        
        <div className="flex gap-4 text-xs font-mono">
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Documentation</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">PHP SDK</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Support</a>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>`;

      case 'functions-php':
        return `<?php
/**
 * ForTheXP Theme Functions and Enqueues
 */

function forthexp_theme_setup() {
    // Register Support for WP features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary-menu' => esc_html__('Primary Navigation Menu', 'forthexp-theme'),
    ));
}
add_action('after_setup_theme', 'forthexp_theme_setup');

function forthexp_enqueue_scripts() {
    // Enqueue Google fonts, Tailwind stylesheet, and standard styles
    wp_enqueue_style('forthexp-style', get_stylesheet_uri(), array(), '1.0.0');
    
    // Enqueue Custom scripts
    wp_enqueue_script('forthexp-custom-scripts', get_template_directory_uri() . '/js/scripts.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'forthexp_enqueue_scripts');

/**
 * Custom shortcode to render the ForTheXP Gamification profile card
 */
add_shortcode('forthexp_profile_card', 'forthexp_render_profile');
function forthexp_render_profile($atts) {
    $attributes = shortcode_atts(array(
        'theme' => 'dark',
        'show_badges' => 'true'
    ), $atts);

    ob_start();
    ?>
    <div class="forthexp-wp-card <?php echo esc_attr($attributes['theme']); ?>">
        <!-- Renders profile structures mimicking the HTML of our showcase layout -->
        <h3>User Stats Dashboard</h3>
    </div>
    <?php
    return ob_get_clean();
}`;

      default:
        return '';
    }
  };

  const handleCopy = (fileId: string) => {
    const code = getCodeString(fileId);
    navigator.clipboard.writeText(code);
    setCopied(fileId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto border-t border-white/10" id="wp-guide">
      
      {/* Title */}
      <div className="mb-12 text-center md:text-left">
        <h2 className="font-display font-bold text-3xl text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
          <Globe className="h-6 w-6 text-indigo-400" />
          WordPress Theme Conversion Blueprint
        </h2>
        <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
          Ready to export your design? Use the dynamic file structure guide below to see exactly how this template matches standard WordPress Theme PHP requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FILE STRUCTURE VISUALIZER MAP */}
        <div className="lg:col-span-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <FolderTree className="h-4.5 w-4.5 text-indigo-400" />
            <span className="font-display font-semibold text-sm text-white font-sans">WordPress Theme Folder Tree</span>
          </div>

          <div className="font-mono text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-1.5 text-indigo-400">
              <span>📁</span>
              <span className="font-bold">forthexp-wordpress-theme/</span>
            </div>
            
            <div className="pl-5 border-l border-white/10 space-y-2">
              <div 
                onClick={() => setActiveFile('style-css')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  activeFile === 'style-css' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <span>📄 style.css</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-slate-500">Headers</span>
              </div>

              <div 
                onClick={() => setActiveFile('header-php')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  activeFile === 'header-php' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <span>📄 header.php</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-indigo-400">Layout</span>
              </div>

              <div 
                onClick={() => setActiveFile('index-php')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  activeFile === 'index-php' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <span>📄 index.php</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-indigo-400 font-bold">Main Loop</span>
              </div>

              <div 
                onClick={() => setActiveFile('footer-php')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  activeFile === 'footer-php' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <span>📄 footer.php</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-indigo-400">Scripts</span>
              </div>

              <div 
                onClick={() => setActiveFile('functions-php')}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  activeFile === 'functions-php' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'
                }`}
              >
                <span>📄 functions.php</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 border border-white/10 text-purple-400">Settings</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-indigo-500/5 rounded-xl border border-indigo-500/10 flex gap-2 items-start text-left font-sans">
            <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-normal">
              Click any PHP or CSS template file inside the workspace folder tree above to load its WordPress structural blueprint code inside the viewer!
            </p>
          </div>
        </div>

        {/* CODE BLUEPRINT VIEWER */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-3 px-5">
            <span className="font-mono text-xs text-slate-300 font-bold">
              📂 Theme Template Blueprint: <span className="text-indigo-400">{activeFile.replace('-', '.')}</span>
            </span>
            <button
              onClick={() => handleCopy(activeFile)}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors flex items-center gap-1 font-sans text-xs cursor-pointer"
              id={`copy-blueprint-${activeFile}`}
            >
              {copied === activeFile ? (
                <>
                  <Check className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="text-indigo-400">Copied!</span>
                </>
              ) : (
                <span>Copy Code</span>
              )}
            </button>
          </div>

          <div className="flex-1 p-5 overflow-auto bg-slate-950/60 max-h-[360px] text-left border-b border-white/10 scrollbar-none transition-colors duration-500">
            {langsLoaded ? (
              <Highlight
                theme={themes.dracula}
                code={getCodeString(activeFile)}
                language={activeFile === 'style-css' ? 'css' : 'php'}
              >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                  <pre className={`font-mono text-[13px] leading-relaxed selection:bg-indigo-500/30 whitespace-pre ${className}`} style={{ ...style, backgroundColor: 'transparent' }}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            ) : (
              <pre className="font-mono text-[13px] text-slate-300 leading-relaxed whitespace-pre">
                <code>{getCodeString(activeFile)}</code>
              </pre>
            )}
          </div>

          <div className="p-3 bg-white/5 px-5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>WordPress Theme Engine Template File mapping</span>
            <span>UTF-8 • PHP Core v8.1+</span>
          </div>

        </div>

      </div>

    </section>
  );
}
