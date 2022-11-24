<?php
/**
 * Admin Functions
 */

defined( 'ABSPATH' ) || exit( 'Direct access not allowed!' ); // Terminate if accessed directly

/**
 * Enqueue scripts
 */
add_action( 'admin_enqueue_scripts', 'btr_admin_enqueue_scripts' );
function btr_admin_enqueue_scripts() {
    wp_enqueue_style( 'admin-btr-style', get_stylesheet_directory_uri() . '/assets/admin/style.css', array(), BTR_VERSION );
    wp_enqueue_script( 'admin-btr-script', get_stylesheet_directory_uri() . '/assets/admin/script.js', array( 'jquery' ), BTR_VERSION, true );
    
    wp_localize_script( 'admin-btr-script', 'wp_obj', array(
        'ajax_url'  => admin_url( 'admin-ajax.php' )
    ) );
}

/**
 * Register OTP Settings
 */
add_action( 'admin_init', 'btr_admin_register_otp_settings' );
function btr_admin_register_otp_settings() {
    register_setting(
        'otp_options',
        'otp_options',
        array(
            'show_in_rest' => true
        )
    );

    add_settings_section(
        'otp_general_options',
        'General Settings',
        'btr_admin_otp_general_settings_section_callback',
        'otp_options'
    );

    $fields = array(
        array(
            'id'        => 'active',
            'title'     => 'Enable OTP',
            'callback'  => 'btr_admin_switch_field',
            'page'      => 'otp_options',
            'section'   => 'otp_general_options',
            'args'		=> array(
                'label_for'     => 'active',
                'option_name'   => 'otp_options'
            )
        ),
        array(
            'id'        => 'access_period',
            'title'     => 'Access Period (in Days)',
            'callback'  => 'btr_admin_number_field',
            'page'      => 'otp_options',
            'section'   => 'otp_general_options',
            'args'		=> array(
                'label_for'     => 'access_period',
                'option_name'   => 'otp_options'
            )
        ),
        array(
            'id'        => 'email',
            'title'     => 'OTP Receiver Email',
            'callback'  => 'btr_admin_email_field',
            'page'      => 'otp_options',
            'section'   => 'otp_general_options',
            'args'		=> array(
                'label_for'     => 'email',
                'option_name'   => 'otp_options'
            )
        ),
        array(
            'id'        => 'contact_email',
            'title'     => 'Contact Email',
            'callback'  => 'btr_admin_email_field',
            'page'      => 'otp_options',
            'section'   => 'otp_general_options',
            'args'		=> array(
                'label_for'     => 'contact_email',
                'option_name'   => 'otp_options'
            )
        )
    );

    foreach ( $fields as $field ) {
        add_settings_field(
            $field['id'],
            $field['title'],
            $field['callback'],
            $field['page'],
            $field['section'],
            $field['args']
        );
    }
}

/**
 * Add menu pages
 */
add_action( 'admin_menu', 'btr_admin_add_menu_pages' );
function btr_admin_add_menu_pages() {
    add_menu_page(
        'OTP Settings',
		'OTP',
		'manage_options',
		'otp_options',
		'btr_admin_otp_settings_page_callback',
		'dashicons-lock'
    );

    add_submenu_page(
        'otp_options',
        'OTP Settings',
		'Settings',
		'manage_options',
		'otp_options',
		'btr_admin_otp_settings_page_callback'
    );

    add_submenu_page(
        'otp_options',
        'OTP History',
		'History',
		'manage_options',
		'otp_history',
		'btr_admin_otp_history_page_callback'
    );
}

/**
 * General Settings Section
 */
function btr_admin_otp_general_settings_section_callback( $arg ) {

}

function btr_admin_otp_settings_page_callback() {
    if ( !current_user_can( 'manage_options' ) ) return;
    ?>
    <div class="wrap">
        <h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
        <form action="options.php" method="post">
            <?php
            settings_fields( 'otp_options' );
            do_settings_sections( 'otp_options' );
            submit_button( 'Save' );
            ?>
        </form>
    </div>
    <?php
}

function btr_admin_otp_history_page_callback() {
    $otps = ( new OTP() )->get_all();

    ?>
    <div class="wrap">
        <div class="btr-head">
            <h2 class="btr-page-title"><?php echo esc_html( get_admin_page_title() ); ?></h2>
            <div class="btr-actions">
                <a href="#TB_inline?&width=500&inlineId=btr-otp-generator" class="thickbox button button-primary" title="Generate new OTPs">Generate new OTPs</a>
                <?php add_thickbox(); ?>
                <div id="btr-otp-generator" style="display:none;">
                    <div class="btr-modal">
                        <label for="otp-count">Number of OTPs:</label> <input type="number" id="otp-count" name="otp-count" class="regular-text">
                        <div class="btr-submit">
                            <button class="button button-primary" data-action="generate-otp">Generate</button>
                            <span class="btr-spinner"></span>
                        </div>
                        <p class="btr-message"></p>
                    </div>
                </div>
            </div>
            <div class="btr-table-hints">
                <span class="accessed">
                    <span class="color"></span>
                    <span class="label">Accessed</span>
                </span>
                <span class="expired">
                    <span class="color"></span>
                    <span class="label">Expired</span>
                </span>
            </div>
        </div>
        <table class="btr-table" style="margin-top: 20px">
            <tr>
                <th>ID</th>
                <th>User IP</th>
                <th>OTP</th>
                <th>Visits</th>
                <th>Is Accessed</th>
                <th>Is Expired</th>
                <th>Created at</th>
                <th>Accessed at</th>
                <th>Expires at</th>
            </tr>
            <?php
            if ( $otps ) {
                foreach ( $otps as $obj ) {
                    ?>
                    <tr class="<?php echo $obj->is_accessed ? ( $obj->is_expired ? 'expired' : 'accessed' ) : ''; ?>">
                        <td><?php echo $obj->ID; ?></td>
                        <td>
                            <?php
                            $uips = maybe_unserialize( $obj->user_ip );
                            if ( is_array( $uips ) ) {
                                if ( count( $uips ) ) {
                                    echo implode( ', ', $uips );
                                } else {
                                    echo '-';
                                }
                            } else {
                                echo $uips;
                            }
                            ?>
                        </td>
                        <td><?php echo $obj->otp; ?></td>
                        <td><?php echo $obj->visits; ?></td>
                        <td><?php echo $obj->is_accessed ? 'Yes' : 'No'; ?></td>
                        <td><?php echo $obj->is_expired ? 'Yes' : 'No'; ?></td>
                        <td><?php echo $obj->created_at; ?></td>
                        <td><?php echo $obj->accessed_at; ?></td>
                        <td><?php echo $obj->expires_at; ?></td>
                    </tr>
                    <?php
                }
            }
            ?>
        </table>
        <?php
        if ( !$otps ) {
            ?>
            <p class="btr-message btr-error">No OTP generated yet!</p>
            <?php
        }
        ?>
    </div>
    <?php
}

function btr_admin_switch_field( $args ) {
    $options    = get_option( $args['option_name'] );
    $id         = $args['option_name'] . '_' . $args['label_for'];
    $name       = $args['option_name'] . '[' . $args['label_for'] . ']';
    $checked    = isset( $options[$args['label_for']] ) ? $options[$args['label_for']] : '';
    ?>
    <label class="btr-switch">
        <input id="<?php echo $id; ?>" name="<?php echo $name; ?>" type="checkbox" value="1" <?php checked( $checked, 1, true ); ?> />
        <span class="btr-slider"></span>
    </label>
    <?php
}

function btr_admin_number_field( $args ) {
    $options    = get_option( $args['option_name'] );
    $id         = $args['option_name'] . '_' . $args['label_for'];
    $name       = $args['option_name'] . '[' . $args['label_for'] . ']';
    $value      = isset( $options[$args['label_for']] ) ? $options[$args['label_for']] : '';
    ?>
    <input id="<?php echo $id; ?>" name="<?php echo $name; ?>" type="number" min="1" value="<?php echo $value; ?>" />
    <?php
}

function btr_admin_email_field( $args ) {
    $options    = get_option( $args['option_name'] );
    $id         = $args['option_name'] . '_' . $args['label_for'];
    $name       = $args['option_name'] . '[' . $args['label_for'] . ']';
    $value      = isset( $options[$args['label_for']] ) ? $options[$args['label_for']] : '';
    ?>
    <input id="<?php echo $id; ?>" name="<?php echo $name; ?>" type="email" class="regular-text" value="<?php echo $value; ?>" />
    <?php
}

function btr_admin_textarea_field( $args ) {
    $options    = get_option( $args['option_name'] );
    $id         = $args['option_name'] . '_' . $args['label_for'];
    $name       = $args['option_name'] . '[' . $args['label_for'] . ']';
    $value      = isset( $options[$args['label_for']] ) ? $options[$args['label_for']] : '';
    ?>
    <textarea id="<?php echo $id; ?>" name="<?php echo $name; ?>" class="regular-text" rows="2"><?php echo $value; ?></textarea>
    <?php
}

function btr_admin_tel_field( $args ) {
    $options    = get_option( $args['option_name'] );
    $id         = $args['option_name'] . '_' . $args['label_for'];
    $name       = $args['option_name'] . '[' . $args['label_for'] . ']';
    $value      = isset( $options[$args['label_for']] ) ? $options[$args['label_for']] : '';
    ?>
    <input id="<?php echo $id; ?>" name="<?php echo $name; ?>" type="tel" class="regular-text" value="<?php echo $value; ?>" />
    <?php
}

function btr_admin_generate_otps() {
    $otp    = ( new OTP() )->generate_otp();
    $otp_id = ( new OTP() )->exist( $otp, 'otp' );

    if ( !$otp_id ) {
        $otp_id = ( new OTP( array(
            'otp'       => $otp,
            'user_ip'   => serialize( array() )
        ) ) )->create();
    
        return $otp_id;
    } else {
        return null;
    }
}

add_action( 'wp_ajax_btr_generate_otps', 'btr_admin_ajax_generate_otps' );
function btr_admin_ajax_generate_otps() {
    $otp_count  = isset( $_POST['otp_count'] ) ? (int) $_POST['otp_count'] : 0;
    if ( $otp_count ) {
        $otp_ids    = array();
        $i          = 1;

        while ( $i <= $otp_count ) { 
            $otp_id = btr_admin_generate_otps();
            
            if ( !$otp_id ) continue;

            $otp_ids[] = $otp_id;

            $i++;
        }
    }

    if ( count( $otp_ids ) > 0 ) {
        wp_send_json_success( array(
            'opts'  => $otp_ids
        ) );
    } else {
        wp_send_json_error( array(
            'opts'  => $otp_ids
        ) );
    }

    wp_die();
} 