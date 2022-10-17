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
     * @return false|int
     */
    public function exist( $val, $key = 'ID' ) {
        global $wpdb;

        $table_name = $wpdb->prefix . 'otps';
        $results    = $wpdb->get_results( "SELECT * FROM $table_name WHERE $key = '$val'" );

        if ( count( $results ) ) return (int) $results[0]->ID;

        return false;
    }

    /**
     * Get OTP
     * 
     * @return object|null
     */
    public function get() {
        global $wpdb;

        if ( !isset( $this->args['ID'] ) ) return null;

        $table_name = $wpdb->prefix . 'otps';
        $otp_id     = $this->args['ID'];
        $results    = $wpdb->get_results( "SELECT * FROM $table_name WHERE ID = '$otp_id'" );

        if ( !count( $results ) ) return null;

        return $results[0];
    }

    /**
     * Get all OTPs
     * 
     * @return array
     */
    public function get_all() {
        global $wpdb;

        $table_name = $wpdb->prefix . 'otps';
        $results    = $wpdb->get_results( "SELECT * FROM $table_name" );

        if ( !count( $results ) ) return null;

        return $results;
    }

    /**
     * Create OTP
     *
     * @return int
     */
    public function create() {
        global $wpdb;

        if ( !isset( $this->args['user_ip'] ) ) {
            $this->args['user_ip'] = btr_get_current_user_ip();
        }

        if ( $this->args['user_ip'] != '-' && $this->exist( $this->args['user_ip'], 'user_ip' ) ) {
            $otp_id = $this->update( $this->args );
        } else {
            $table_name = $wpdb->prefix . 'otps';

            $wpdb->insert( $table_name, array(
                'otp'           => isset( $this->args['otp'] ) ? $this->args['otp'] : $this->generate_otp(),
                'user_ip'       => $this->args['user_ip'],
                'visits'        => (int) '0',
                'is_accessed'   => false,
                'is_expired'    => false,
                'expires_at'    => date( 'Y-m-d H:i:s', strtotime( '+' . btr_get_otp_access_period() . ' days' ) )
            ) );

            $insert_id  = $wpdb->insert_id;
            $otp_id     = $insert_id;
        }

        return $otp_id;
    }

    /**
     * Update OTP
     *
     * @return int
     */
    public function update() {
        global $wpdb;

        if ( !isset( $this->args['ID'] ) ) return;

        if ( !isset( $this->args['user_ip'] ) ) {
            $this->args['user_ip'] = btr_get_current_user_ip();
        }

        if ( !$this->exist( $this->args['ID'] ) ) {
            $otp_id = $this->create();
        } else {
            $table_name = $wpdb->prefix . 'otps';
            $object     = ( new OTP( array( 'ID' => $this->args['ID'] ) ) )->get();

            $wpdb->update( $table_name, array(
                'otp'           => isset( $this->args['otp'] ) ? $this->args['otp'] : $object->otp,
                'user_ip'       => isset( $this->args['user_ip'] ) ? $this->args['user_ip'] : $object->user_ip,
                'visits'        => isset( $this->args['visits'] ) ? $this->args['visits'] : $object->visits,
                'is_accessed'   => isset( $this->args['is_accessed'] ) ? $this->args['is_accessed'] : $object->is_accessed,
                'is_expired'    => isset( $this->args['is_expired'] ) ? $this->args['is_expired'] : $object->is_expired,
                'created_at'    => isset( $this->args['created_at'] ) ? $this->args['created_at'] : $object->created_at,
                'accessed_at'   => isset( $this->args['accessed_at'] ) ? $this->args['accessed_at'] : $object->accessed_at,
                'expires_at'    => isset( $this->args['expires_at'] ) ? $this->args['expires_at'] : $object->expires_at
            ), array( 'ID' => $this->args['ID'] ) );

            $update_id  = $this->args['ID'];
            $otp_id     = $update_id;
        }

        return $otp_id;
    }

    /**
     * Delete OTP
     */
    public function delete() {
        global $wpdb;

        if ( !isset( $this->args['ID'] ) ) return;

        if ( !$this->exist( $this->args['ID'] ) ) return;

        $table_name = $wpdb->prefix . 'otps';

        $wpdb->delete( $table_name, array(
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