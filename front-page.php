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
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-slate-950 text-slate-300 font-sans min-h-screen antialiased selection:bg-indigo-500/20 selection:text-white'); ?> style="background-color: #020617;">
    <div id="root"></div>
    <?php wp_footer(); ?>
</body>
</html>
