<?php
/**
 * Home page
 */

get_header();
    if ( btr_is_otp_active() ) {
        if ( btr_has_current_user_access() ) {
            btr_increase_visits();
            get_template_part( 'template-parts/page', 'home' );
        }
    } else {
        get_template_part( 'template-parts/page', 'home' );
    }
get_footer();