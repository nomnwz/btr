<?php
/**
 * OTP Setup
 */

defined( 'ABSPATH' ) || exit( 'Direct access not allowed!' ); // Terminate if accessed directly

/**
 * Create custom tables if not exist
 */
add_action( 'after_switch_theme', 'btr_create_tables' );
function btr_create_tables() {
    global $wpdb;

    $table_name = $wpdb->prefix . 'otps';

    $charset_collate = $wpdb->get_charset_collate();

    if ( $wpdb->get_var( "SHOW tables LIKE '$table_name'" ) != $table_name ) {
        $sql = "CREATE TABLE $table_name (
            ID mediumint(9) NOT NULL AUTO_INCREMENT,
            otp bigint(20) NOT NULL,
            user_ip varchar(255) NOT NULL,
            visits bigint(20) NOT NULL,
            is_accessed boolean NOT NULL,
            is_expired boolean NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
            accessed_at datetime NOT NULL,
            expires_at datetime NOT NULL,
            PRIMARY KEY (ID)
        ) $charset_collate;";
    
        require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    
        dbDelta( $sql );
    }
}