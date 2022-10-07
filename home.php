<?php
/**
 * Home page
 */

get_header();
    if ( btr_is_otp_active() ) {
        if ( btr_has_current_user_access() ) {
            $user_ip    = btr_get_current_user_ip();
            $otp_id     = ( new OTP() )->exist( $user_ip, 'user_ip' );
        
            if ( $otp_id ) {
                $object         = ( new OTP( array( 'ID' => $otp_id ) ) )->get();
                if ( $object->visits > 1 ) {
                    btr_increase_visits();
                }
            }

            get_template_part( 'template-parts/page', 'home' );
        }   
    } else {
        get_template_part( 'template-parts/page', 'home' );
    }
get_footer();