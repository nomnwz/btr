jQuery(document).ready(function($) {

    /**
     * Header
     */
    $(function() {
        headerPosFix()
        $(window).resize(function(e) { 
            headerPosFix()
        });
    })

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
            e.preventDefault()
            // var target  = btn.attr("data-target")
            var target = $(this).attr("href")
            if ($(target).length) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(target).offset().top
                }, ms)
            }
        })

        if (btn.length) {
            // var target  = btn.attr("data-target")
            var target = btn.attr("href")
            if ($(target).length) {
                if ($(window).scrollTop() > $(target).offset().top) {
                    btn.css({
                        opacity: 0
                    })
                }
            }
        }
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
                // var target  = btn.attr("data-target")
                var target  = btn.attr("href")
                if ($(target).length) {
                    if ($(window).scrollTop() > $(target).offset().top) {
                        btn.css({
                            opacity: 0
                        })
                    } else {
                        btn.css({
                            opacity: 1
                        })
                    }
                }
            })

            // /**
            //  * Animation
            //  */
            // $(function() {
            //     animation1()
            // })
        })
    })

    function headerPosFix() {
        $("header").css({
            top: $("body").offset().top
        })
    }

    function menuPosFix() {
        var that        = "header"
        var netOffset   = $(that).offset().top + $(that).height()
        $(".menu-wrap").css({
            top: netOffset+1
        })
    }

    function videoAutoplayHeight() {
        var topOffset   = parseInt($("header").css("top").replace("px", "")) + $("header").height()
        // $("#videoAutoplay").css({
        //     height: "calc(100vh - "+topOffset+"px)"
        // })
        $(".top-video .elementor-container").css({
            "height": "calc(100vh - "+topOffset+"px)",
            "min-height": "calc(100vh - "+topOffset+"px"
        })
    }

    // function animation1() {
    //     var animation_1     = $(".animation-1")
    //     var scrollTop       = $(window).scrollTop()
    //     var offsetTop       = animation_1.parent().offset().top
    //     var totalHeight     = animation_1.parent().outerHeight()
    //     var offsetBottom    = totalHeight + offsetTop
    //     var totalWidth      = animation_1.outerWidth()
    //     if (scrollTop > offsetTop && scrollTop < offsetBottom) {
    //         if (scrollTop > offsetTop) {
    //             var a   = scrollTop - offsetTop
    //             var m   = (a / totalHeight) * totalWidth
    //             animation_1.css({
    //                 left: "-"+(totalWidth - m)/2+"px",
    //                 opacity: 1
    //             })
    //         } else if (scrollTop < offsetBottom) {
    //             var a   = offsetBottom - scrollTop
    //             var m   = (a / totalHeight) * totalWidth
    //             animation_1.css({
    //                 left: "-"+(totalWidth - m)/2+"px",
    //                 opacity: 1
    //             })
    //         }
    //     } else {
    //         if (scrollTop < offsetTop) {
    //             animation_1.css({
    //                 left: "-"+totalWidth+"px",
    //                 opacity: 1
    //             })
    //         } else if (scrollTop > offsetBottom) {
    //             animation_1.css({
    //                 left: totalWidth+"px",
    //                 opacity: 1
    //             })
    //         }
    //     }
    // }
})