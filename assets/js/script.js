jQuery(document).ready(function($) {
    /**
     * Loader
     */
    $(function() {
        var loader      = $("#loader")
        var duration    = 3000

        if (loader.length) {
            setTimeout(() => {
                if (loader.hasClass("d-md-block")) {
                    loader.removeClass("d-md-block")
                }
            }, duration + 500)
        }

        var slides = $(".slide")
        if (slides.length) {
            for (let i = 0; i < slides.length; i++) {
                const slide     = $(slides[i])
                var direction   = slide.hasClass("slide-vertical") ? "vertical" : "horizontal"
                var isReverse   = slide.hasClass("slide-reverse") ? true : false
                if (direction == "vertical") {
                    var height      = slide.outerHeight()
                    var translate   = height - loader.height()
                    var translateY  = `-${translate+"px"}`
                    if (isReverse) {
                        slide.animate({
                            top: translateY
                        }, duration)
                    } else {
                        slide.animate({
                            bottom: translateY
                        }, duration)
                    }
                }   
            }
        }
    })

    /**
     * Sticky Top
     */
    $(function() {
        stickyTopPosFix()
        $(window).resize(function(e) { 
            stickyTopPosFix()
        })
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
        })
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
            var target  = btn.attr("data-target")
            // var target = $(this).attr("href")
            if ($(target).length) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(target).offset().top
                }, ms)
            }
        })

        if (btn.length) {
            var target  = btn.attr("data-target")
            // var target = btn.attr("href")
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
     * Fixed background
     */
    $(function() {
        var el = $(".fixed-background")
        if (el.length) {
            for (let i = 0; i < el.length; i++) {
                const element = el[i]
                var bgSrc = $(element).attr("data-background-src")
                if (bgSrc) {
                    $(element).css({
                        "background-image": "url("+bgSrc+")"
                    })
                }   
            }
        }
    })

    /**
     * Section 1
     */
    $(function() {
        var container   = $(".section-1")
        if (container.length) {
            var stickyItem      = container.find(".section-intro")
            var stickyBottom    = parseInt(stickyItem.css("top").replace("px", "")) + stickyItem.outerHeight() + 60
            var content         = container.find(".section-content")
            content.css({
                "margin-top": stickyBottom
            })
        }
    })

    /**
     * Section 3
     */
    $(function() {
        var container   = $(".section-3")
        if (container.length) {
            var stickyItem      = container.find(".section-intro")
            var stickyBottom    = parseInt(stickyItem.css("top").replace("px", "")) + stickyItem.outerHeight() + 60
            var content         = container.find(".section-content")
            content.css({
                "margin-top": stickyBottom
            })
        }
    })

    /**
     * All scroll effects
     */
    $(function() {
        $(window).scroll(function(e) {
            /**
             * Header Transparency
             */
            $(function() {
                var header = $("header")
                if (header.length) {
                    if ($(window).scrollTop() > $("#main").offset().top) {
                        header.css({
                            "height": "59px",
                            "--bs-bg-opacity": 1
                        })
                        header.addClass("border-bottom border-light")
                    } else {
                        header.css({
                            "height": "60px",
                            "--bs-bg-opacity": 0.5
                        })
                        header.removeClass("border-bottom border-light")
                    }
                }
            })

            /**
             * Scroll to effects
             */
            $(function() {
                var btn     = $(".scroll-to")
                var target  = btn.attr("data-target")
                // var target  = btn.attr("href")
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

            /**
             * Section 1
             */
            $(function() {
                var container   = $(".section-1")
                if (container.length) {
                    var containerTop    = container.offset().top
                    var stickyItem      = container.find(".section-intro")
                    if ($(window).scrollTop() > (containerTop + container.outerHeight())) {
                        stickyItem.removeClass("sticky-top")
                    } else {
                        stickyItem.addClass("sticky-top")
                    }
                }
            })

            /**
             * Section 3
             */
            $(function() {
                var container   = $(".section-3")
                if (container.length) {
                    var containerTop    = container.offset().top
                    var stickyItem      = container.find(".section-intro")
                    if ($(window).scrollTop() > (containerTop + container.outerHeight())) {
                        stickyItem.removeClass("sticky-top")
                    } else {
                        stickyItem.addClass("sticky-top")
                    }
                }
            })
        })
    })

    function stickyTopPosFix() {
        var stickys = $(".sticky-top")
        for (let i = 0; i < stickys.length; i++) {
            const stickyTop = stickys[i]
            if ($(stickyTop).length) {
                var initTop = 0

                if ($(stickyTop).attr("sticky-top")) {
                    initTop = parseInt($(stickyTop).attr("sticky-top"))
                }

                $(stickyTop).css({
                    top: initTop + $("body").offset().top
                })
            }
        }
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
        $("#videoAutoplay").css({
            height: "calc(100vh - "+topOffset+"px)"
        })
        $(".top-video .elementor-container").css({
            "height": "calc(100vh - "+topOffset+"px)",
            "min-height": "calc(100vh - "+topOffset+"px"
        })
    }

    function animation1() {
        var animation_1     = $(".animation-1")
        var scrollTop       = $(window).scrollTop()
        var offsetTop       = animation_1.parent().offset().top
        var totalHeight     = animation_1.parent().outerHeight()
        var offsetBottom    = totalHeight + offsetTop
        var totalWidth      = animation_1.outerWidth()
        if (scrollTop > offsetTop && scrollTop < offsetBottom) {
            if (scrollTop > offsetTop) {
                var a   = scrollTop - offsetTop
                var m   = (a / totalHeight) * totalWidth
                animation_1.css({
                    left: "-"+(totalWidth - m)/2+"px",
                    opacity: 1
                })
            } else if (scrollTop < offsetBottom) {
                var a   = offsetBottom - scrollTop
                var m   = (a / totalHeight) * totalWidth
                animation_1.css({
                    left: "-"+(totalWidth - m)/2+"px",
                    opacity: 1
                })
            }
        } else {
            if (scrollTop < offsetTop) {
                animation_1.css({
                    left: "-"+totalWidth+"px",
                    opacity: 1
                })
            } else if (scrollTop > offsetBottom) {
                animation_1.css({
                    left: totalWidth+"px",
                    opacity: 1
                })
            }
        }
    }
})

const observer = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
        // If the element is visible
        if (entry.isIntersecting) {
            // Add the animation class
            entry.target.classList.remove('animation-wipe-out')
            entry.target.classList.add('animation-wipe-in')
        } else {
            entry.target.classList.remove('animation-wipe-in')
            entry.target.classList.add('animation-wipe-out')
        }
    })
})
  
observer.observe(document.querySelector('.section-5 .section-content'))