<?php
/**
 * Home page
 */

get_header();
    if ( btr_has_current_user_access() ) {
        get_template_part( 'template-parts/page', 'home' );
    }
get_footer();