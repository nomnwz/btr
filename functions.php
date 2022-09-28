<?php
/**
 * Functions
 */

defined( 'ABSPATH' ) || exit( 'Direct access not allowed!' ); // Terminate if accessed directly

if ( !defined( 'BTR_VERSION' ) ) {
    define( 'BTR_VERSION', wp_get_theme()->Version );
}

/**
 * Setup
 */
add_action( 'after_setup_theme', 'btr_setup' );
function btr_setup() {
    $supports = array(
        'title-tag',
        'custom-logo',
        'post-thumbnails',
        'menus',
        'widgets'
    );

    foreach ( $supports as $support ) {
        add_theme_support( $support );
    }
}

/**
 * Enqueue scripts
 */
add_action( 'wp_enqueue_scripts', 'btr_enqueue_scripts' );
function btr_enqueue_scripts() {
    wp_enqueue_style( 'bootstrap-css', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.1/css/bootstrap.min.css', array(), BTR_VERSION );
    wp_enqueue_style( 'fontawesome-css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css', array(), BTR_VERSION );
    wp_enqueue_style( 'custom-css', get_stylesheet_directory_uri() . '/style.css', array(), BTR_VERSION );
    
    wp_enqueue_script( 'bootstrap-js', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.1/js/bootstrap.min.js', array( 'jquery' ), BTR_VERSION, true );
    wp_enqueue_script( 'fontawesome-js', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js', array( 'jquery' ), BTR_VERSION, true );
    wp_enqueue_script( 'custom-js', get_stylesheet_directory_uri() . '/assets/js/script.js', array( 'jquery' ), BTR_VERSION, true );
}

/**
 * Register theme menu locations
 */
add_action( 'init', 'btr_register_menus' );
function btr_register_menus() {
    register_nav_menus(
        array(
            'primary-menu' => __( 'Primary Menu' )
        )
    );
}