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
        <h2><?php echo esc_html( get_admin_page_title() ); ?></h2>
        <table class="btr-table" style="margin-top: 20px">
            <tr>
                <th>ID</th>
                <th>User IP</th>
                <th>OTP</th>
                <th>Visits</th>
                <th>Created at</th>
                <th>Expires at</th>
            </tr>
            <?php
            foreach ( $otps as $obj ) {
                ?>
                <tr>
                    <td><?php echo $obj->ID; ?></td>
                    <td><?php echo $obj->user_ip; ?></td>
                    <td><?php echo $obj->otp; ?></td>
                    <td><?php echo $obj->visits; ?></td>
                    <td><?php echo $obj->created_at; ?></td>
                    <td><?php echo $obj->expires_at; ?></td>
                </tr>
                <?php
            }
            ?>
        </table>
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
    <input id="<?php echo $id; ?>" name="<?php echo $name; ?>" type="number" min="1" max="6" value="<?php echo $value; ?>" />
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