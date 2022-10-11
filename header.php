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
<body <?php body_class(); ?>>
    <div id="splash" class="bg-dark text-light w-100 vh-100 position-fixed top-0 left-0">
        <div class="splash-container d-flex flex-column justify-content-between">
            <div class="d-flex flex-column justify-content-start align-items-center">
                <h1 class="title">BTR</h1>
                <h5 class="subtitle">Better Than Reality</h5>
            </div>
            <div class="d-flex flex-column justify-content-end align-items-center">
                <div class="content">
                    <p><span>Where only</span> extraordinary people succeed...<p>
                </div>
                <button id="enterSite" class="btn btn-lg px-5 rounded-0">ENTER</button>
            </div>
        </div>
    </div>
    <?php
    if ( btr_is_otp_active() && !btr_has_current_user_access() ) {
        do_action( 'otp_setup' );
    } else {
        ?>
        <div id="root">
            <header class="bg-dark text-light sticky-top">
                <div class="header-wrap">
                    <div class="site-branding ps-site">
                        <?php
                        if ( has_custom_logo() ) {
                            echo '<div class="site-logo">' . get_custom_logo() . '</div>';
                        } elseif ( file_exists( get_stylesheet_directory() . '/assets/img/logo.png' ) ) {
                            echo '<div class="site-logo"><img class="custom-logo" src="' . get_stylesheet_directory_uri() . '/assets/img/logo.png' . '"></div>';
                        } else {
                            echo '<h2 class="site-title">' . get_bloginfo( 'name' ) . '</h2>';
                        }
                        ?>
                    </div>
                    <div class="site-menu site-menu h-100 d-grid">
                        <div class="language text-dark" role="radiogroup" aria-labelledby="languageSwitcher">
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