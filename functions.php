<?php
/**
 * ForTheXP Theme Functions, Hooks, Shortcodes, and API Routes
 * 
 * This file serves as the core SDK and engine initialization inside your WordPress
 * site. It manages user metadata for tracking level metrics, rendering interactive 
 * visual SVG dashboards, and exposing REST routes.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

/**
 * 1. CORE THEME SETUP & NAVIGATION
 */
function forthexp_theme_setup() {
    // Register standard WordPress features
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption'));

    // Register primary header navigation
    register_nav_menus(array(
        'primary-menu' => esc_html__('Primary Navigation Menu', 'forthexp-theme'),
    ));
}
add_action('after_setup_theme', 'forthexp_theme_setup');

/**
 * 2. ENQUEUE STYLESHEETS & SCRIPTS
 */
function forthexp_enqueue_scripts() {
    // Enqueue main theme style.css
    wp_enqueue_style('forthexp-core-style', get_stylesheet_uri(), array(), '1.0.0');

    // Enqueue Custom interactive scripting asset (handles clicks, sounds, local state)
    wp_enqueue_script('forthexp-scripts', get_template_directory_uri() . '/js/scripts.js', array(), '1.0.0', true);

    // Pass custom localization options to JS
    wp_localize_script('forthexp-scripts', 'forthexp_opts', array(
        'rest_url' => esc_url_raw(rest_url('xp/v1')),
        'nonce'    => wp_create_nonce('wp_rest'),
        'is_logged_in' => is_user_logged_in(),
    ));

    // Enqueue built React App assets
    // The CSS is enqueued globally so the WP header/footer match the React styling.
    $css_path = get_template_directory() . '/react-dist/assets/index.css';
    $css_ver = file_exists($css_path) ? filemtime($css_path) : '1.0.0';
    wp_enqueue_style('forthexp-react-styles', get_template_directory_uri() . '/react-dist/assets/index.css', array(), $css_ver);

    // Enqueue React JS only on the front page/home where the app mounts.
    if (is_front_page() || is_home()) {
        $js_path = get_template_directory() . '/react-dist/assets/index.js';
        $js_ver = file_exists($js_path) ? filemtime($js_path) : '1.0.0';
        wp_enqueue_script('forthexp-react-app', get_template_directory_uri() . '/react-dist/assets/index.js', array(), $js_ver, true);
        // Ensure it's loaded as a module
        add_filter('script_loader_tag', function($tag, $handle, $src) {
            if ('forthexp-react-app' === $handle) {
                return '<script type="module" src="' . esc_url($src) . '"></script>';
            }
            return $tag;
        }, 10, 3);
    }
}
add_action('wp_enqueue_scripts', 'forthexp_enqueue_scripts');

// Gamification engine migrated to xophz-compass-xp plugin classes.
