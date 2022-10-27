<!-- <div id="videoAutoplay">
    <video playsinline>
        <source src="" data-src="<?php echo get_stylesheet_directory_uri() . '/assets/video.webm'; ?>" type="video/webm">
    </video>
    <div class="video-reloader" data-video-target="videoAutoplay" style="display: none;">
        <span><i class="fas fa-rotate-right"></i></span>
    </div>
    <div class="scroll-to" data-target="#main">
        <span><i class="fas fa-chevron-down"></i></span>
    </div>
</div> -->
<div id="videoAutoplay">
    <?php echo do_shortcode( '[nk_awb awb_type="video" awb_video_webm="' . get_stylesheet_directory_uri() . '/assets/video.webm' . '" awb_video_volume="100" awb_video_always_play="true" awb_video_mobile="true" awb_parallax="scroll" awb_styles="width:100%; height:100%; z-index:-1;"]' ); ?>
    <div class="video-reloader" data-video-target="videoAutoplay" style="display: none;">
        <span><i class="fas fa-rotate-right"></i></span>
    </div>
    <div class="scroll-to" data-target="header">
        <span><i class="fas fa-chevron-down"></i></span>
    </div>
</div>