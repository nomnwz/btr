<?php
/**
 * OTP Class
 */

defined( 'ABSPATH' ) || exit( 'Direct access not allowed!' ); // Terminate if accessed directly

/**
 * OTP
 */
class OTP
{
    /**
     * Arguments
     * 
     * @var array
     */
    public $args = array();

    /**
     * Constructor
     *
     * @param array $args
     */
    public function __construct( array $args = array() ) {
        $this->args = $args;
    }

    /**
     * Check if record exists
     * 
     * @param mixed     $val
     * @param string    $key
     * 
     * @return bool
     */
    public function exist( $val, $key = 'ID' ) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'otps';
        $results    = $wpdb->get_results( "SELECT * FROM $table_name WHERE $key = '$val'" );

        if ( is_array( $results ) && count( $results ) ) return true;

        return false;
    }

    /**
     * Get OTP
     * 
     * @return null|object
     */
    public function get() {
        global $wpdb;

        if ( !isset( $this->args['ID'] ) ) return;

        $table_name = $wpdb->prefix . 'otps';
        $otp_id     = $this->args['ID'];
        $results    = $wpdb->get_results( "SELECT * FROM $table_name WHERE ID = '$otp_id'" );

        if ( !count( $results ) ) return;

        return $results[0];
    }

    /**
     * Get OTP by specific column
     * 
     * @param string    $key
     * 
     * @return null|object|array
     */
    public function get_by( $key = 'ID' ) {
        if ( $key == 'ID' ) return $this->get();

        global $wpdb;

        $table_name = $wpdb->prefix . 'otps';
        $val        = $this->args[$key];
        $results    = $wpdb->get_results( "SELECT * FROM $table_name WHERE $key = '$val'" );

        if ( !count( $results ) ) return;

        return $results;
    }

    /**
     * Get all OTPs
     * 
     * @return null|array
     */
    public function get_all() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'otps';
        $results    = $wpdb->get_results( "SELECT * FROM $table_name" );

        if ( !count( $results ) ) return;

        return $results;
    }

    /**
     * Create OTP
     * 
     * Note: This method only creates an OTP if it doesn't exist in database
     *
     * @return null|false|int
     */
    public function create() {
        global $wpdb;

        if ( $this->exist( $this->args['otp'], 'otp' ) ) return;

        $table_name = $wpdb->prefix . 'otps';

        return $wpdb->insert( $table_name, array(
            'otp'           => $this->generate_otp(),
            'user_ip'       => '-',
            'visits'        => (int) '0',
            'is_accessed'   => false,
            'is_expired'    => false
        ) );
    }

    /**
     * Update OTP
     * 
     * Note: This method creates a new OTP if it doesn't exist already otherwise will update it
     *
     * @return null|false|int
     */
    public function update() {
        global $wpdb;

        if ( !isset( $this->args['ID'] ) ) return;

        if ( !$this->exist( $this->args['ID'] ) ) return;
        
        $table_name = $wpdb->prefix . 'otps';
        $object     = $this->get();

        return $wpdb->update( $table_name, array(
            'otp'           => $object->otp,
            'user_ip'       => isset( $this->args['user_ip'] ) ? $this->args['user_ip'] : $object->user_ip,
            'visits'        => isset( $this->args['visits'] ) ? $this->args['visits'] : $object->visits,
            'is_accessed'   => isset( $this->args['is_accessed'] ) ? $this->args['is_accessed'] : $object->is_accessed,
            'is_expired'    => isset( $this->args['is_expired'] ) ? $this->args['is_expired'] : $object->is_expired,
            'accessed_at'   => isset( $this->args['accessed_at'] ) ? $this->args['accessed_at'] : $object->accessed_at,
            'expires_at'    => isset( $this->args['expires_at'] ) ? $this->args['expires_at'] : $object->expires_at
        ), array( 'ID' => $this->args['ID'] ) );
    }

    /**
     * Delete OTP
     * 
     * @return null|false|int
     */
    public function delete() {
        global $wpdb;

        if ( !isset( $this->args['ID'] ) ) return;

        if ( !$this->exist( $this->args['ID'] ) ) return;

        $table_name = $wpdb->prefix . 'otps';

        return $wpdb->delete( $table_name, array(
            'ID' => $this->args['ID']
        ) );
    }

    /**
     * Generate OTP
     *
     * @param int $digits
     * 
     * @return string|int
     */
    public function generate_otp( $digits = 8 ) {
        $generator  = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&';
        $result     = '';

        for ( $i=1; $i <= $digits; $i++ ) {
            $result .= substr( $generator, ( rand()%( strlen( $generator ) ) ), 1 );
        }

        return $result;
    }
}