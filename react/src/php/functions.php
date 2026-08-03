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

    // Enqueue CDN compiled Tailwind CSS for rich modern layout utility rendering
    wp_enqueue_style('forthexp-tailwind', 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4', array(), '4.0.0');

    // Enqueue Custom interactive scripting asset (handles clicks, sounds, local state)
    wp_enqueue_script('forthexp-scripts', get_template_directory_uri() . '/js/scripts.js', array(), '1.0.0', true);

    // Pass custom localization options to JS
    wp_localize_script('forthexp-scripts', 'forthexp_opts', array(
        'rest_url' => esc_url_raw(rest_url('forthexp/v1')),
        'nonce'    => wp_create_nonce('wp_rest')
    ));
}
add_action('wp_enqueue_scripts', 'forthexp_enqueue_scripts');

/**
 * 3. THE MATHEMATICAL LEVEL-SCALING ENGINE
 * 
 * Computes required cumulative experience points (XP) for any given level ($L)
 * Formula: Required_XP(L) = Base_XP * (L-1)^1.5 + Offset_XP
 */
function forthexp_get_required_xp_for_level($level) {
    if ($level <= 1) {
        return 0;
    }
    
    // Apply filters so developers can easily tune milestones
    $base_multiplier = apply_filters('forthexp_xp_base_multiplier', 150);
    $offset_xp       = apply_filters('forthexp_xp_offset', 100);

    return round($base_multiplier * pow($level - 1, 1.5) + $offset_xp);
}

/**
 * 4. DATABASE / USER METADATA CONTROLLER
 * Fetch current gamified status of any user.
 */
function forthexp_get_user_stats($user_id) {
    if (!$user_id) {
        // Fallback mock guest stats
        return array(
            'level'      => 1,
            'current_xp' => 45,
            'target_xp'  => forthexp_get_required_xp_for_level(2),
            'total_xp'   => 45,
            'title'      => esc_html__('Novice Scripter', 'forthexp-theme'),
            'badges'     => array('First Step')
        );
    }

    $total_xp = (int) get_user_meta($user_id, 'forthexp_total_xp', true);
    if (!$total_xp) {
        $total_xp = 0;
    }

    // Determine level based on cumulative XP
    $level = 1;
    while ($total_xp >= forthexp_get_required_xp_for_level($level + 1)) {
        $level++;
    }

    $xp_floorForCurrentLevel = forthexp_get_required_xp_for_level($level);
    $xp_ceilForNextLevel     = forthexp_get_required_xp_for_level($level + 1);
    
    $current_xp_in_level = $total_xp - $xp_floorForCurrentLevel;
    $target_xp_for_level = $xp_ceilForNextLevel - $xp_floorForCurrentLevel;

    // Define Titles based on levels
    $titles = array(
        1 => esc_html__('Novice Scripter', 'forthexp-theme'),
        2 => esc_html__('Theme Tinkerer', 'forthexp-theme'),
        3 => esc_html__('Action hooker', 'forthexp-theme'),
        4 => esc_html__('Stack Overseer', 'forthexp-theme'),
        5 => esc_html__('Database Overlord', 'forthexp-theme'),
    );
    $title = isset($titles[$level]) ? $titles[$level] : esc_html__('Cubic Wizard', 'forthexp-theme');

    // Fetch earned badges (WordPress array storage)
    $badges = get_user_meta($user_id, 'forthexp_badges', true);
    if (!is_array($badges)) {
        $badges = array('First Step');
    }

    return array(
        'level'      => $level,
        'current_xp' => $current_xp_in_level,
        'target_xp'  => $target_xp_for_level,
        'total_xp'   => $total_xp,
        'title'      => $title,
        'badges'     => $badges
    );
}

/**
 * 5. AWARD XP API FUNCTION
 * Increments XP, checks for level up hooks, and assigns milestone badges.
 */
function forthexp_add_xp($user_id, $args = array()) {
    if (!$user_id) {
        return false;
    }

    $xp_to_add = isset($args['xp']) ? (int) $args['xp'] : 0;
    if ($xp_to_add <= 0) {
        return false;
    }

    $current_stats = forthexp_get_user_stats($user_id);
    $old_level     = $current_stats['level'];
    $new_total_xp  = $current_stats['total_xp'] + $xp_to_add;

    update_user_meta($user_id, 'forthexp_total_xp', $new_total_xp);

    // Re-evaluate stats to check for Level Up
    $new_stats = forthexp_get_user_stats($user_id);
    $new_level = $new_stats['level'];

    $leveled_up = ($new_level > $old_level);

    if ($leveled_up) {
        do_action('forthexp_on_level_up', $user_id, $new_level, $old_level);
        
        // Auto grant Level Badge
        $badges = $new_stats['badges'];
        $badge_granted = 'Level ' . $new_level . ' Badge';
        if (!in_array($badge_granted, $badges)) {
            $badges[] = $badge_granted;
            update_user_meta($user_id, 'forthexp_badges', $badges);
        }
    }

    // Log the transaction in custom WordPress logs option
    $logs = get_option('forthexp_action_logs', array());
    array_unshift($logs, array(
        'timestamp' => current_time('mysql'),
        'user_id'   => $user_id,
        'action'    => isset($args['action']) ? sanitize_text_field($args['action']) : 'api_award',
        'xp_added'  => $xp_to_add,
        'level'     => $new_level
    ));
    // Keep logs small
    if (count($logs) > 50) {
        array_pop($logs);
    }
    update_option('forthexp_action_logs', $logs);

    return array(
        'success'    => true,
        'old_level'  => $old_level,
        'new_level'  => $new_level,
        'total_xp'   => $new_total_xp,
        'leveled_up' => $leveled_up
    );
}

/**
 * 6. CORE SHORTCODE: RENDER PLAYER CARD
 * Syntax: [forthexp_profile_card theme="dark" show_badges="true"]
 */
function forthexp_render_profile_shortcode($atts) {
    $attributes = shortcode_atts(array(
        'theme'       => 'dark',
        'show_badges' => 'true'
    ), $atts);

    $current_user_id = get_current_user_id();
    $stats = forthexp_get_user_stats($current_user_id);

    // Calculate percentage width for visual progress indicator
    $percent = $stats['target_xp'] > 0 ? ($stats['current_xp'] / $stats['target_xp']) * 100 : 0;
    $percent = min(100, max(0, $percent));

    ob_start();
    ?>
    <div class="forthexp-wp-card bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
        <!-- Glowing Ambient Lighting Background -->
        <div class="absolute -right-16 -top-16 w-32 h-32 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/25 transition-colors"></div>
        
        <div class="flex items-center gap-4 relative z-10">
            <!-- SVG Avatar -->
            <div class="relative">
                <div class="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-display font-black text-xl text-white shadow-lg shadow-indigo-600/30">
                    <?php echo esc_html(substr(get_the_author_meta('display_name', $current_user_id ? $current_user_id : 1), 0, 1)); ?>
                </div>
                <div class="absolute -bottom-1 -right-1 bg-indigo-500 border-2 border-slate-900 text-[10px] font-mono font-bold text-white h-5 w-5 rounded-full flex items-center justify-center shadow">
                    Lvl<?php echo esc_html($stats['level']); ?>
                </div>
            </div>

            <!-- Profile Details -->
            <div class="text-left">
                <span class="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider block">
                    <?php echo esc_html($stats['title']); ?>
                </span>
                <h4 class="font-display font-bold text-base text-white">
                    <?php echo esc_html($current_user_id ? wp_get_current_user()->display_name : 'Guest Developer'); ?>
                </h4>
            </div>
        </div>

        <!-- Progress Indicator -->
        <div class="mt-6 space-y-1.5 relative z-10">
            <div class="flex justify-between text-[11px] font-mono text-slate-400">
                <span>XP Progress</span>
                <span class="text-indigo-400 font-bold"><?php echo esc_html($stats['current_xp']); ?> / <?php echo esc_html($stats['target_xp']); ?> XP</span>
            </div>
            <div class="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                <div class="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-700" style="width: <?php echo esc_attr($percent); ?>%;"></div>
            </div>
        </div>

        <!-- Badges Deck -->
        <?php if ($attributes['show_badges'] === 'true' && !empty($stats['badges'])) : ?>
            <div class="mt-6 pt-5 border-t border-white/5 relative z-10">
                <span class="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2.5">Credentials Deck</span>
                <div class="flex flex-wrap gap-1.5">
                    <?php foreach ($stats['badges'] as $badge) : ?>
                        <span class="text-[10px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-950 text-indigo-300 border border-indigo-500/10 flex items-center gap-1 hover:border-indigo-500/20 transition-colors">
                            🌟 <?php echo esc_html($badge); ?>
                        </span>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('forthexp_profile_card', 'forthexp_render_profile_shortcode');

/**
 * 7. WORDPRESS REST API ENDPOINT INTEGRATION
 * Exposes: POST /wp-json/forthexp/v1/award
 * Allows testing live simulator values directly via WordPress REST API!
 */
function forthexp_register_rest_routes() {
    register_rest_route('forthexp/v1', '/award', array(
        'methods'             => 'POST',
        'callback'            => 'forthexp_rest_award_xp_callback',
        'permission_callback' => 'forthexp_rest_permission_check',
    ));
}
add_action('rest_api_init', 'forthexp_register_rest_routes');

function forthexp_rest_permission_check() {
    // For local development test loops, allow anonymous access.
    // In production, guard with current_user_can('edit_posts') or API key tokens.
    return true;
}

function forthexp_rest_award_xp_callback($request) {
    $params = $request->get_json_params();
    
    $user_id   = isset($params['user_id']) ? (int) $params['user_id'] : get_current_user_id();
    $xp_amount = isset($params['xp']) ? (int) $params['xp'] : 25;
    $action    = isset($params['action']) ? sanitize_text_field($params['action']) : 'rest_api_trigger';

    // Default to admin or active user if Guest ID is submitted
    if (!$user_id) {
        $user_id = 1; 
    }

    $result = forthexp_add_xp($user_id, array(
        'xp'     => $xp_amount,
        'action' => $action
    ));

    if (!$result) {
        return new WP_Error('invalid_args', esc_html__('Failed to award XP. Check parameters.', 'forthexp-theme'), array('status' => 400));
    }

    $updated_stats = forthexp_get_user_stats($user_id);

    return rest_ensure_response(array(
        'status'         => 'success',
        'message'        => sprintf(esc_html__('Awarded %s XP to User #%s', 'forthexp-theme'), $xp_amount, $user_id),
        'transaction'    => $result,
        'current_profile'=> $updated_stats
    ));
}
