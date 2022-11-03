<div id="section2" class="section-container section-2 section-sticky position-relative text-light w-100 min-vh-100 px-site py-5 d-flex flex-column flex-md-row row mx-0">
    <div class="col-12 h-100 position-absolute top-0 start-0 px-0">
        <?php echo do_shortcode( '[nk_awb awb_type="image" awb_image="' . get_stylesheet_directory_uri() . '/assets/img/section-2.png' . '" awb_parallax="scroll" awb_parallax_mobile="true" awb_styles="width:100%; height:100%;"]' ); ?>
    </div>
    <div class="col-12 col-md-6 mt-5 px-0 position-relative">
        <div class="section-intro sticky-top" sticky-top="30">
            <h2 class="section-heading me-md-5"><?php _e( 'The Team', 'btr' ); ?></h2>
        </div>
    </div>
    <div class="col-12 col-md-6 d-flex px-0 position-relative">
        <div class="section-content">
            <ul class="content-list list-group <?php echo ( is_rtl() ? 'pe-0' : 'ps-0' ); ?>">
                <li class="content list-group-item bg-transparent text-light px-0 py-3 rounded-0 border-0 border-bottom border-light">
                    <p><?php _e( 'CIA and other global intelligence operatives leverage their experience, training and global networks to create missions in which only the extraordinary succeed.', 'btr' ); ?></p>
                </li>
                <li class="content list-group-item bg-transparent text-light px-0 py-3 rounded-0 border-0 border-bottom border-light">
                    <p><?php _e( 'We know all the right people, in all the right places, all over the world to create a once-in-a-lifetime experience - twice if you dare.', 'btr' ); ?></p>
                </li>
                <li class="content list-group-item bg-transparent text-light px-0 py-3 rounded-0 border-0">
                    <p><?php _e( 'BTR is supported by a global team of security, medical and technical professionals.', 'btr' ); ?></p>
                </li>
            </ul>
        </div>
    </div>
</div>
