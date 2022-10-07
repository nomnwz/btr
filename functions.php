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
    if( array_key_exists( 'HTTP_X_FORWARDED_FOR', $_SERVER ) && !empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
        if ( strpos( $_SERVER['HTTP_X_FORWARDED_FOR'], ',' ) > 0 ) {
            $addr = explode( ",", $_SERVER['HTTP_X_FORWARDED_FOR'] );
            return trim( $addr[0] );
        } else {
            return $_SERVER['HTTP_X_FORWARDED_FOR'];
        }
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}

/**
 * Check if OTP is active
 */
function btr_is_otp_active() {
    $options = get_option( 'otp_options' );
    $default = false;
    return ( isset( $options['active'] ) ? ( $options['active'] ?: $default ) : $default );
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
 * Includes
 */
require_once get_template_directory() . '/inc/otp-setup.php';
require_once get_template_directory() . '/inc/class-otp.php';

if ( is_admin() ) {
    require_once get_template_directory() . '/inc/admin/functions.php';
}

/**
 * OTP Functions
 */
function btr_has_current_user_access() {
    if ( is_user_logged_in() ) return true;

    $user_ip    = btr_get_current_user_ip();
    $otp_id     = ( new OTP() )->exist( $user_ip, 'user_ip' );
    $has_access = false;
    
    if ( $otp_id ) {
        $object = ( new OTP( array( 'ID' => $otp_id ) ) )->get();
        if ( $object->visits > 0 ) {
            if ( time() <= strtotime( $object->expires_at ) ) {
                $has_access = true;
            }
        }
    }

    return $has_access;
}

function btr_increase_visits() {
    $user_ip    = btr_get_current_user_ip();
    $otp_id     = ( new OTP() )->exist( $user_ip, 'user_ip' );

    if ( $otp_id ) {
        $object         = ( new OTP( array( 'ID' => $otp_id ) ) )->get();
        $object->visits = $object->visits + 1;
        $args           = (array) $object;

        ( new OTP( $args ) )->update();
    }
}

add_action( 'init', 'btr_create_otp' );
function btr_create_otp() {
    if ( is_user_logged_in() ) return;

    if ( !btr_is_otp_active() ) return;

    $user_ip    = btr_get_current_user_ip();
    $otp_id     = ( new OTP() )->exist( $user_ip, 'user_ip' );
    $send_email = false;

    if ( !$otp_id ) {
        $otp_id     = ( new OTP() )->create();
        $send_email = true;
    } else {
        $object = ( new OTP( array( 'ID' => $otp_id ) ) )->get();
        if ( time() > strtotime( $object->expires_at ) ) {
            $object->otp        = ( new OTP() )->generate_otp();
            $object->visits     = 0;
            $object->expires_at = date( 'Y-m-d H:i:s', strtotime( '+' . btr_get_otp_access_period() . ' days' ) );
            $args               = (array) $object;

            ( new OTP( $args ) )->update();
            $send_email         = true;
        }
    }

    $object = ( new OTP( array( 'ID' => $otp_id ) ) )->get();

    if ( $object && $send_email ) {
        $subject    = 'New OTP generated against the IP ' . $object->user_ip;
        $message    = 'User IP: ' . $object->user_ip;
        $message    .= "\n";
        $message    .= 'OTP: ' . $object->otp;
        wp_mail( btr_get_otp_email(), $subject, $message );
    }
}

add_action( 'otp_setup', 'btr_otp_form' );
function btr_otp_form() {
    ?>
    <div class="otp-container bg-dark text-light w-100 vh-100 d-flex justify-content-center align-items-center">
        <div class="position-relative">
            <div class="card p-2 text-center text-dark">
                <h6>Please enter the OTP <br> to verify your access</h6>
                <div>
                    <span>Note: Contact us at <small><a href="mailto:<?php echo btr_get_otp_email(); ?>"><?php echo btr_get_otp_email(); ?></a></small></span>
                    <span> to get your OTP by mentioning your IP Address.</span>
                </div>
                <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
                    <input class="m-2 text-center form-control rounded" type="text" id="first" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="second" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="third" name="otp[]" maxlength="1" />
                    <input class="m-2 text-center form-control rounded" type="text" id="fourth" name="otp[]" maxlength="1" />
                </div> 
                <div class="mt-4">
                    <button class="btn btn-danger px-4 validate">Validate</button> <span class="spinner ms-2 d-none"><i class="fas fa-spinner fa-spin"></i></span>
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
        $user_ip    = btr_get_current_user_ip();
        $otp_id     = ( new OTP() )->exist( $user_ip, 'user_ip' );

        if ( $otp_id ) {
            $object = ( new OTP( array( 'ID' => $otp_id ) ) )->get();
            if ( ( $object->otp == $otp ) && ( time() <= strtotime( $object->expires_at ) ) ) {
                $valid          = true;
                $object->visits = $object->visits + 1;
                $args           = (array) $object;

                ( new OTP( $args ) )->update();
            }
        }
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