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
    <div id="loader" class="row d-none d-md-block mx-0 w-100 vh-100 position-fixed bg-dark text-light">
        <?php
        $slides = array(
            array(
                'is_reverse' => true
            ),
            array(
                'is_reverse' => false
            ),
            array(
                'is_reverse' => true
            )
            );

            foreach ( $slides as $i => $slide ) {
                $slide_id = $i + 1;
                ?>
                <div class="slide slide-<?php echo $slide_id; ?> auto-slide slide-vertical col-4 px-0 d-flex flex-column<?php echo $slide['is_reverse'] ? ' slide-reverse' : ''; ?>">
                    <?php
                    for ( $x=1; $x < 7; $x++ ) { 
                        ?>
                        <img src="<?php echo get_stylesheet_directory_uri() . "/assets/img/slide-{$slide_id}-img-{$x}.png"; ?>">
                        <?php
                    }
                    ?>
                </div>
                <?php
            }
        ?>
    </div>
    <div id="root">
        <header class="bg-dark text-light sticky-top">
            <div class="header-wrap">
                <div class="site-branding ps-site">
                    <?php
                    if ( has_custom_logo() ) {
                        echo '<div class="site-logo">' . get_custom_logo() . '</div>';
                    } else {
                        echo '<h2 class="site-title">' . get_bloginfo( 'name' ) . '</h2>';
                    }
                    ?>
                </div>
                <div class="site-menu site-menu bg-light text-dark h-100 d-grid">
                    <div class="menu-toggle">
                        <span class="toggle-icon closed"></span>
                        <span class="toggle-icon closed"></span>
                    </div>
                    <div class="menu-wrap w-100 bg-dark text-white position-fixed closed px-site">
                        <?php
                        wp_nav_menu( array(
                            'theme_location'    => 'primary-menu',
                            'container'         => false
                        ) );
                        ?>
                    </div>
                </div>
            </div>
        </header>