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

    wp_localize_script( 'custom-js', 'wp_obj', array(
        'ajax_url'  => admin_url( 'admin-ajax.php' )
    ) );
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

/**
 * Gets the current user's IP.
 *
 * @since 1.0
 *
 * @return string The current user's IP, or 'UNKNOWN' if not a valid client
 */
function btr_get_current_user_ip() {
    if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ) {
        $_SERVER['REMOTE_ADDR']     = $_SERVER['HTTP_CF_CONNECTING_IP'];
        $_SERVER['HTTP_CLIENT_IP']  = $_SERVER['HTTP_CF_CONNECTING_IP'];
    }

    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if ( filter_var( $client, FILTER_VALIDATE_IP ) ) {
        $ip = $client;
    } elseif ( filter_var( $forward, FILTER_VALIDATE_IP ) ) {
        $ip = $forward;
    } else {
        $ip = $remote;
    }

    return $ip;
}

/**
 * Check if OTP is active
 */
function btr_is_otp_active() {
    $options = get_option( 'otp_options' );
    $default = false;
    return ( isset( $options['active'] ) ? ( (bool) $options['active'] ? (bool) $options['active'] : $default ) : $default );
}

/**
 * Get OTP period access
 */
function btr_get_otp_access_period() {
    $options = get_option( 'otp_options' );
    $default = '3';
    return ( isset( $options['access_period'] ) ? ( $options['access_period'] ?: $default ) : $default );
}

/**
 * Get OTP email
 */
function btr_get_otp_email() {
    $options = get_option( 'otp_options' );
    $default = get_bloginfo( 'admin_email' );
    return ( isset( $options['email'] ) ? ( $options['email'] ?: $default ) : $default );
}

/**
 * Get Contact email
 */
function btr_get_contact_email() {
    $options = get_option( 'otp_options' );
    $default = get_bloginfo( 'admin_email' );
    return ( isset( $options['contact_email'] ) ? ( $options['contact_email'] ?: $default ) : $default );
}

/**
 * Includes
 */
require_once get_template_directory() . '/inc/otp-setup.php';
require_once get_template_directory() . '/inc/class-otp.php';

if ( is_admin() ) {
    require_once get_template_directory() . '/inc/admin/functions.php';
}

/**
 * OTP Functions
 * 
 * @return bool
 */
function btr_has_current_user_otp_access() {
    if ( is_user_logged_in() ) return true;

    $user_ip    = btr_get_current_user_ip();
    $otp_exist  = ( new OTP() )->exist( $user_ip, 'user_ip' );
    $has_access = false;
    
    if ( $otp_exist ) {
        $otps = ( new OTP( array( 'user_ip' => $user_ip ) ) )->get_by( 'user_ip' );
        
        foreach ( $otps as $object ) {
            if ( $object->is_accessed && !$object->is_expired ) {
                return true;
            }
        }
    }

    return $has_access;
}

function btr_give_otp_access( $otp ) {
    $user_ip    = btr_get_current_user_ip();
    $otp_exist  = ( new OTP() )->exist( $otp, 'otp' );
    $given      = false;

    if ( $otp_exist ) {
        $otps = ( new OTP( array( 'otp' => $otp ) ) )->get_by( 'otp' );

        foreach ( $otps as $object ) {
            if ( !$object->is_accessed && !$object->is_expired ) {
                $object->user_ip        = $user_ip;
                $object->is_accessed    = true;
                $object->accessed_at    = date( 'Y-m-d H:i:s' );
                $object->expires_at     = date( 'Y-m-d H:i:s', strtotime( '+' . btr_get_otp_access_period() . ' days' ) );
                $args                   = (array) $object;
                $otp_id                 = ( new OTP( $args ) )->update();
        
                if ( $otp_id ) {
                    $given      = true;
                    $subject    = 'OTP ' . $object->otp . ' accessed';
                    $message    = 'OTP ' . $object->otp . ' was accessed at ' . $object->accessed_at . '. Access details are below:';
                    $message    .= "\n";
                    $message    .= "\n";
                    $message    .= 'User IP: ' . $object->user_ip;
                    $message    .= "\n";
                    $message    .= 'Expiring at: ' . $object->expires_at;
                    
                    wp_mail( btr_get_otp_email(), $subject, $message );
    
                    do_action( 'btr_otp_access_given', $object );
                }
            }
        }
    }

    return $given;
}

function btr_increase_visits() {
    $user_ip    = btr_get_current_user_ip();
    $otp_exist  = ( new OTP() )->exist( $user_ip, 'user_ip' );

    if ( $otp_exist ) {
        $otps   = ( new OTP( array( 'user_ip' => $user_ip ) ) )->get_by( 'user_ip' );

        foreach ( $otps as $object ) {
            if ( $object->is_accessed && !$object->is_expired ) {
                $object->visits = $object->visits + 1;
                $args           = (array) $object;
        
                ( new OTP( $args ) )->update();

                return;
            }
        }
    }
}

add_action( 'otp_setup', 'btr_otp_form' );
function btr_otp_form() {
    ?>
    <div class="otp-container bg-black text-light w-100 vh-100 d-flex justify-content-center align-items-center">
        <div class="position-relative">
            <div class="p-2 text-center bg-transparent text-white">
                <h6 class="text-uppercase"><?php _e( 'Please enter temporary access code', 'btr' ); ?></h6>
                <div id="otp" class="inputs d-flex flex-row flex-wrap justify-content-center mt-2">
                    <input class="m-2 text-center form-control rounded" type="text" id="first" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="second" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="third" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="fourth" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="fifth" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="sixth" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="seventh" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="eighth" name="otp[]" maxlength="1" />
                </div>
                <div class="mt-4">
                    <button class="btn btn-danger px-4 validate"><?php _e( 'Continue', 'btr' ); ?></button> <span class="spinner ms-2 d-none"><i class="fas fa-spinner fa-spin"></i></span>
                    <p class="mt-2 message"></p>
                </div>
            </div>
        </div>
    </div>
    <?php
}

/**
 * OTP Validation
 */
add_action( 'wp_ajax_nopriv_btr_validate_otp', 'btr_ajax_validate_otp' );
function btr_ajax_validate_otp() {
    if ( !btr_is_otp_active() ) wp_die();

    $otp    = isset( $_POST['otp'] ) ? $_POST['otp'] : null;
    $valid  = false;

    if ( $otp ) {
        $valid = btr_give_otp_access( $otp );
    }

    if ( $valid ) {
        wp_send_json_success( array(
            'otp_obj'   => $object
        ) );
    } else {
        wp_send_json_error();
    }

    wp_die();
}

add_action( 'btr_otp_access_given', 'btr_schedule_otp_expiry' );
function btr_schedule_otp_expiry( $object ) {
    wp_schedule_single_event( strtotime( $object->expires_at ), 'btr_otp_expire', array( $object ) );
}

add_action( 'btr_otp_expire', 'btr_otp_expire' );
function btr_otp_expire( $object ) {
    $object->is_expired = true;
    $args               = (array) $object;

    ( new OTP( $args ) )->update();
}

/**
 * Increase OTP visits
 */
add_action( 'wp_ajax_nopriv_btr_increase_visits', 'btr_ajax_increase_visits' );
function btr_ajax_increase_visits() {
    if ( !btr_is_otp_active() ) wp_die();
    btr_increase_visits();
    wp_send_json_success();
    wp_die();
}