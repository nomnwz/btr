<?php
/**
 * Header
 */

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php echo get_bloginfo( 'charset' ); ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-black' ); ?>>
    <?php
    if ( btr_is_otp_active() && !btr_has_current_user_otp_access() ) {
        do_action( 'otp_setup' );
    } else {
        ?>
        <div id="splash" class="bg-black text-light w-100 vh-100 position-fixed top-0 left-0 image-background fixed-background">
            <div class="position-relative h-100 w-100">
                <button id="enterSite" class="btn btn-lg px-5 rounded-0 text-uppercase"><?php _e( 'Enter', 'btr' ); ?></button>
            </div>
        </div>
        <div id="root">
            <?php get_template_part( 'template-parts/home/video' ); ?>
            <header class="text-light">
                <div class="header-wrap">
                    <div class="site-branding ps-site" style="z-index:1;"></div>
                    <div class="site-menu site-menu h-100 d-grid" style="z-index:1;">
                        <div class="language text-black" role="radiogroup" aria-labelledby="languageSwitcher">
                            <p class="d-none" id="languageSwitcher">Choose a language for this website</p>
                            <div class="language-container language-container-left language-container-en">
                                <input class="language-control" type="radio" id="language1" name="language-switch" checked>
                                <label class="language-label" for="language1">
                                    EN<span class="d-none"> English</span>
                                </label>
                            </div>
                            <div class="language-container language-container-right language-container-ar">
                                <input class="language-control" type="radio" id="language2" name="language-switch">
                                <label class="language-label" for="language2">
                                    AR<span class="d-none"> العربية</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        <?php
    }
    ?>