<div id="section7" class="section-container section-7 position-relative bg-black text-light w-100 min-vh-100 px-site py-5 d-flex flex-column justify-content-center align-items-start">
    <div class="section-intro mb-5">
        <h2 class="section-heading"><?php _e( 'Contact Us', 'btr' ); ?></h2>
    </div>
    <div class="section-content animate-it w-100">
        <div class="row">
            <div class="col-md-9 mb-md-0 mb-5">
                <?php
                $form_id = function_exists( 'pll_home_url' ) ? ( pll_current_language() == 'ar' ? '132' : '122' ) : '122';
                echo do_shortcode( '[contact-form-7 id="' . $form_id . '" title="Contact Us"]' );
                ?>
            </div>
            <div class="col-md-3 text-center">
                <ul class="list-unstyled mb-0 px-0">
                    <li>
                        <i class="fas fa-envelope mt-4 fa-2x"></i>
                        <p><?php echo btr_get_contact_email(); ?></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>