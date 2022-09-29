jQuery(document).ready(function($) {
    /**
     * Menu toggle
     */
    $(function() {
        $(".menu-toggle").on("click", function(e) {
            e.preventDefault()
            var that    = this
            var ms      = 300
            setTimeout(() => {
                $(that).find(".toggle-icon").toggleClass("closed opened")
                $(".menu-wrap").toggleClass("closed opened")
                $(".menu-wrap").animate({
                    height: "toggle"
                }, ms)
            }, ms)
        })
    })

    /**
     * Menu
     */
    $(function() {
        menuPosFix()
        $(window).resize(function(e) { 
            menuPosFix()
        });
    })

    /**
     * Video Autoplay
     */
    $(function() {
        videoAutoplayHeight()
        $(window).resize(function(e) {
            videoAutoplayHeight()
        })
    })

    /**
     * Scroll to
     */
    $(function() {
        var btn = $(".scroll-to")
        var ms  = 100
        btn.on("click", function(e) {
            var target = $(this).attr("data-target")
            $([document.documentElement, document.body]).animate({
                scrollTop: $(target).offset().top
            }, ms)
        })

        if (btn.length) {
            var target = btn.attr("data-target")
            if ($(window).scrollTop() > $(target).offset().top) {
                btn.css({
                    opacity: 0
                })
            }
        }
    })

    /**
     * Animation
     */
    $(function() {
        var animation_1 = $(".animation-1")
        // var offset   = ($(window).scrollTop() - animation_1.offset().top)
        var offset      = $(window).scrollTop()
        var left        = animation_1.parent().outerWidth() + offset
        animation_1.css({
            left: left+"px",
            opacity: "1"
        })
    })

    /**
     * All scroll effects
     */
    $(function() {
        $(window).scroll(function(e) {
            /**
             * Scroll to effects
             */
            $(function() {
                var btn     = $(".scroll-to")
                var target  = btn.attr("data-target")
                if ($(window).scrollTop() > $(target).offset().top) {
                    btn.css({
                        opacity: 0
                    })
                } else {
                    btn.css({
                        opacity: 1
                    })
                }
            })

            /**
             * Animation
             */
            $(function() {
                var animation_1 = $(".animation-1")
                // var offset   = ($(window).scrollTop() - animation_1.offset().top)
                var offset      = $(window).scrollTop()
                var left        = animation_1.parent().outerWidth() + offset
                console.log(left)
                animation_1.css({
                    left: left+"px",
                    opacity: "1"
                })
            })
        })
    })

    function menuPosFix() {
        var that        = "header"
        var netOffset   = $(that).offset().top + $(that).height()
        $(".menu-wrap").css({
            top: netOffset+1
        })
    }

    function videoAutoplayHeight() {
        var that        = "header"
        var topOffset   = $(that).offset().top + $(that).height()
        $("#videoAutoplay").css({
            height: "calc(100vh - "+topOffset+"px)"
        })
    }
})