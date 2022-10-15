jQuery(document).ready(function($) {
    $(function() {
        $(window).scrollTop(0)
    })

    /**
     * Splash
     */
    $(function() {
        var splash          = $("#splash")
        var enterSiteBtn    = splash.find("#enterSite")
        enterSiteBtn.on("click", function(e) {
            e.preventDefault()
            splash.hide("slow", function() {
                splash.remove()
                $(document).trigger("strictload")
            })
        })
    })

    /**
     * OTP
     */
    $(function() {
        otpInput()
        $(".otp-container .validate").on("click", function(e) {
            var inputs      = $("#otp > *[id]")
            var otp         = []

            for (let i = 0; i < inputs.length; i++) {
                const input     = inputs[i]
                var inputValue  = $(input).val()
                otp.push(inputValue)
            }

            otp = parseInt(otp.join(""))

            $(".otp-container .spinner").removeClass("d-none")

            $.ajax({
                type: "post",
                dataType: "json",
                url: wp_obj.ajax_url,
                data: {
                    action: "btr_validate_otp",
                    otp: otp
                },
                success: (res) => {
                    if (res.success) {
                        if ($(".otp-container .message").hasClass("text-danger")) {
                            $(".otp-container .message").removeClass("text-danger")

                            $(".otp-container .message").text("Validation error!")
                        }

                        if (!$(".otp-container .message").hasClass("text-success")) {
                            $(".otp-container .message").addClass("text-success")

                            $(".otp-container .message").text("Successfully validated!")
                        }

                        setTimeout(() => {
                            location.reload()
                        }, 500)
                    } else {
                        if ($(".otp-container .message").hasClass("text-success")) {
                            $(".otp-container .message").removeClass("text-success")
                        }

                        if (!$(".otp-container .message").hasClass("text-danger")) {
                            $(".otp-container .message").addClass("text-danger")
                        }

                        $(".otp-container .message").text("Validation error!")
                    }
                    $(".otp-container .spinner").addClass("d-none")
                },
                error: (err) => {
                    $(".otp-container .spinner").addClass("d-none")
                }
            })
        })
    })

    /**
     * On strict load
     */
    $(function() {
        $(document).on("strictload", function(e) {
            if ($("#videoAutoplay").length) {
                loadVideo("#videoAutoplay", true, 0)
            }
        })
    })

    /**
     * Fixed Top
     */
    $(function() {
        fixedTopPosFix()
        $(window).resize(function(e) { 
            fixedTopPosFix()
        })
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
     * Video
     */
    $(function() {
        videoAutoplayHeight()
        $(window).resize(function(e) {
            videoAutoplayHeight()
        })

        $("#videoAutoplay video").on("ended", function(e) {
            $("#videoAutoplay .video-reloader").show("slow")
        })

        $(".video-reloader").on("click", function(e) {
            var targetVideo = $(this).attr("data-video-target")
            $("#"+targetVideo+" video").get(0).pause()
            $("#"+targetVideo+" video").get(0).currentTime = 0
            $("#"+targetVideo+" video").get(0).play()
            $(this).hide("slow")
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
            if ($(target).length) {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(target).offset().top
                }, ms)
            }
        })

        if (btn.length) {
            var target  = btn.attr("data-target")
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
     * Image background
     */
    $(function() {
        var el = $(".image-background")
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
     * Sections
     */
    $(function() {
        var $elements   = $(".section-container")
        if ($elements.length && $(window).width() > 767) {
            $.each($elements, function() {
                var $element = $(this)
                if ($element.hasClass("section-animate-it")) {
                    createSectionAnimation(this)
                }
            })
        }
    })

    /**
     * Section Sticky
     */
    $(function() {
        var $elements   = $(".section-sticky")
        if ($elements.length && $(window).width() > 767) {
            $.each($elements, function() {
                var $element        = $(this)
                var stickyItem      = $element.find(".section-intro")
                var stickyBottom    = parseInt(stickyItem.css("top")) + stickyItem.outerHeight() + 0
                var content         = $element.find(".section-content")
                content.css({
                    "margin-top": stickyBottom
                })  
            })
        }
    })

    /**
     * All scroll effects
     */
    $(function() {
        var lastScrollTop   = 0
        var section1GL      = 0
        $(window).scroll(function(e) {
            var scrollTop   = $(this).scrollTop()
            var scrollDir   = ""
            var scrolledBy  = 0

            if (scrollTop < lastScrollTop) {
                scrollDir = "up"
            } else {
                scrollDir = "down"
            }

            scrolledBy      = lastScrollTop - scrollTop
            lastScrollTop   = scrollTop

            // /**
            //  * Header Transparency
            //  */
            // $(function() {
            //     var header = $("header")
            //     if (header.length) {
            //         if ($(window).scrollTop() > $("#main").offset().top) {
            //             header.css({
            //                 "height": "119px",
            //                 "--bs-bg-opacity": 1
            //             })
            //             header.addClass("border-bottom border-light")
            //         } else {
            //             header.css({
            //                 "height": "120px",
            //                 "--bs-bg-opacity": 0.5
            //             })
            //             header.removeClass("border-bottom border-light")
            //         }
            //     }
            // })

            /**
             * Video Autplay
             */
            $(function() {
                var target = "#videoAutoplay video"
                if ($(window).scrollTop() > $(window).height()) {
                    $(target).get(0).pause()
                } else {
                    if ($(target).get(0).currentTime != 0 && $(target).get(0).currentTime != $(target).get(0).duration) {
                        $(target).get(0).play()
                    }
                }
            })

            /**
             * Scroll to effects
             */
            $(function() {
                var btn     = $(".scroll-to")
                var target  = btn.attr("data-target")
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

            /**
             * Section Sticky
             */
            $(function() {
                var $elements   = $(".section-sticky")
                if ($elements.length && $(window).width() > 767) {
                    $.each($elements, function() {
                        var $element        = $(this)
                        var containerTop    = $element.offset().top
                        var stickyItem      = $element.find(".section-intro")
                        if ($(window).scrollTop() > (containerTop + $element.outerHeight())) {
                            stickyItem.removeClass("sticky-top")
                        } else {
                            stickyItem.addClass("sticky-top")
                        }
                    })
                }
            })
        })
    })

    const otpInput = () => {
        var inputs = $("#otp > *[id]")
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]
            $(input).on("keydown", function(e) {
                if (e.key === "Backspace" ) {
                    $(input).val("")
                    if (i !== 0) {
                        $(inputs[i - 1]).focus()
                    }
                } else {
                    if (e.keyCode > 64 && e.keyCode < 91) {
                        $(input).val(String.fromCharCode(e.keyCode))
                    } else {
                        $(input).val(e.key)
                    }

                    $(inputs[i + 1]).focus()
                    e.preventDefault()
                }
            })
        }
    }

    const removeEl = (el, delay = 3000) => {
        if ($(el).length) {
            if (delay) {
                setTimeout(() => {
                    $(el).remove()
                }, delay)
            } else {
                $(el).remove()
            }
        }
    }

    const loadVideo = (el, play = true, delay = 3000) => {
        const load = () => {
            $(el+" video source").attr("src", $(el+" video source").attr("data-src"))
            $(el+" video").get(0).load()
            if (play) {
                $(el+" video").get(0).play()
            }
        }
        if ($(el).length) {
            if (delay) {
                setTimeout(() => {
                    load()
                }, delay)
            } else {
                load()
            }
        }
    }

    const fixedTopPosFix = () => {
        var fixed = $("*").filter(function() { 
            return $(this).attr("id") !== "wpadminbar" && $(this).attr("id") !== "splash" && $(this).css("position") == "fixed"
        })
        for (let i = 0; i < fixed.length; i++) {
            const fixedTop = fixed[i]
            if ($(fixedTop).length) {
                var top = parseInt($(fixedTop).css("top"))

                if ($("#wpadminbar").length && $(window).width() > 600) {
                    top = top + $("#wpadminbar").outerHeight()
                }

                $(fixedTop).css({
                    top: top
                })
            }
        }
    }

    const stickyTopPosFix = () => {
        var stickys = $(".sticky-top")
        for (let i = 0; i < stickys.length; i++) {
            const stickyTop = stickys[i]
            if ($(stickyTop).length) {
                var top = 0

                if ($("#wpadminbar").length && $(window).width() > 600) {
                    top = top + $("#wpadminbar").outerHeight()
                }

                if ($(stickyTop).attr("sticky-top")) {
                    top = top + parseInt($(stickyTop).attr("sticky-top"))
                }

                $(stickyTop).css({
                    top: top
                })
            }
        }
    }

    const videoAutoplayHeight = () => {
        var topOffset   = parseInt($("header").css("top")) + $("header").height()
        $("#videoAutoplay").css({
            height: "calc(100vh - "+topOffset+"px)"
        })
        $(".top-video .elementor-container").css({
            "height": "calc(100vh - "+topOffset+"px)",
            "min-height": "calc(100vh - "+topOffset+"px"
        })
    }

    const isInView = (el) => {
        var $window                  = $(window)
        var windowHeight            = $window.height()
        var windowTop               = $window.scrollTop()
        var windowBottom            = (windowTop + windowHeight)

        $.each($(el), function() {
            var $element        = $(this)
            var elementHeight   = $element.outerHeight()
            var elementTop      = $element.offset().top
            var elementBottom   = (elementTop + elementHeight)
        
            // Check to see if this current container is within viewport
            if ((windowTop >= elementTop) &&
                (windowTop <= elementBottom)) {
                $element.addClass("in-view")
            } else {
                $element.removeClass("in-view")
            }
        })
    }

    const createSectionAnimation = (element) => {
        var $window             = $(window)
        var windowWidth         = $window.width()
        var windowHeight        = $window.height()
        var $element            = $(element)
        var elementHeight       = $element.outerHeight()
        var elementColor        = $element.css("color")
        var elementBGColor      = $element.css("background-color")
        var $intro              = $element.find(".section-intro")
        var introWidth          = $intro.outerWidth()
        var introHeight         = $intro.outerHeight()
        var introOffsetTop      = $intro.offset().top
        var introOffsetLeft     = $intro.offset().left
        var $content            = $element.find(".section-content")
        var contentOffsetTop    = $content.offset().top
        var animationScroll     = (windowWidth - introOffsetLeft - windowHeight)
        var isAnimationReverse  = $element.hasClass("section-animate-it-reverse")
        var $animation          = $('<div id="'+$element.attr('id')+'-animation" class="section-animation"></div>')

        if (isAnimationReverse) {
            animationScroll = (windowWidth + introOffsetLeft - introWidth - windowHeight)
        }

        $animation.css({
            width: "100%",
            height: animationScroll,
            backgroundColor: elementBGColor,
            color: elementColor
        })

        $animation.append('<div class="animator"></div>').html($intro)
        
        if (isAnimationReverse) {
            $intro.css({
                width: introWidth,
                position: "absolute",
                left: introWidth * (-1)
            })
        } else {
            $intro.css({
                width: introWidth,
                position: "absolute",
                left: windowWidth
            })
        }

        $animation.insertBefore(element)

        $animation                  = $("#"+$animation.attr("id"))
        $intro                      = $animation.find(".section-intro")
        var animationOffsetTop      = $animation.offset().top
        var animationHeight         = $animation.outerHeight()
        var animationOffsetBottom   = (animationOffsetTop + animationHeight + elementHeight)
        var animationBreakpoint     = 0
        var lastScrollTop           = 0

        $window.scroll(function() {
            var scrollTop   = $(this).scrollTop()
            var scrolledBy  = lastScrollTop - scrollTop
            var scrollDir   = "down"

            if (scrollTop < lastScrollTop) {
                scrollDir = "up"
            }

            if (isAnimationReverse) {
                scrolledBy = scrolledBy * (-1)
            }

            lastScrollTop   = scrollTop

            if (scrollTop < animationOffsetTop) {
                if (isAnimationReverse) {
                    $intro.css({
                        position: "absolute",
                        left: introWidth * (-1)
                    })
                } else {
                    $intro.css({
                        position: "absolute",
                        left: windowWidth
                    })
                }

                $animation.insertBefore(element)
            } else if ((scrollTop >= animationOffsetTop) && (scrollTop <= animationOffsetBottom)) {
                if (scrollDir == "down") {
                    if (isAnimationReverse) {
                        if ($intro.offset().left < introOffsetLeft) {
                            $intro.css({
                                position: "fixed",
                                left: parseInt($intro.css("left")) + scrolledBy
                            })
                        } else {
                            $intro.css({
                                position: ""
                            })

                            $($element.find("> div").get(1)).append($intro)
                        }
                    } else {
                        if ($intro.offset().left > introOffsetLeft) {
                            $intro.css({
                                position: "fixed",
                                left: parseInt($intro.css("left")) + scrolledBy
                            })
                        } else {
                            $intro.css({
                                position: ""
                            })
                            
                            $element.find("> div").first().append($intro)
                        }
                    }
                } else {
                    if (scrollTop <= animationBreakpoint) {
                        $intro.css({
                            position: "fixed",
                            left: parseInt($intro.css("left")) + scrolledBy
                        })
                    } else {
                        $intro.css({
                            position: ""
                        })
                        
                        if (isAnimationReverse) {
                            $($element.find("> div").get(1)).append($intro)
                        } else {
                            $element.find("> div").first().append($intro)
                        }
                    }
                }

                if (isAnimationReverse) {
                    if ($intro.offset().left >= introOffsetLeft) {
                        $intro.css({
                            left: introOffsetLeft
                        })
                    } else {
                        animationBreakpoint = scrollTop
                    }
                } else {
                    if ($intro.offset().left <= introOffsetLeft) {
                        $intro.css({
                            left: introOffsetLeft
                        })
                    } else {
                        animationBreakpoint = scrollTop
                    }
                }
            }
        })
        
        return $animation
    }

    // const createSectionAnimation1 = (element) => {
    //     var $window             = $(window)
    //     var windowWidth         = $window.width()
    //     var windowHeight        = $window.height()
    //     var $element            = $(element)
    //     var elementHeight       = $element.outerHeight()
    //     var elementColor        = $element.css("color")
    //     var elementBGColor      = $element.css("background-color")
    //     var $heading            = $element.find(".section-heading")
    //     var headingWidth        = $heading.outerWidth()
    //     var headingHeight       = $heading.outerHeight()
    //     var headingOffsetTop    = $heading.offset().top
    //     var headingOffsetLeft   = $heading.offset().left
    //     var $content            = $element.find(".section-content")
    //     var contentWidth        = $content.outerWidth()
    //     var contentOffsetTop    = $content.offset().top
    //     var animationScroll     = (windowWidth - headingOffsetLeft - windowHeight)
    //     var $animation          = $('<div id="animation1" class="animation-container animation-1 position-relative bg-transparent text-light w-100 d-flex flex-row align-items-center"></div>')

    //     $animation.append('<div class="animation-content"><h2>'+$heading.text()+'</h2></div>')
        
    //     $animation.insertBefore(element)

    //     $animation                  = $("#"+$animation.attr("id"))
    //     var $animationContent       = $animation.find(".animation-content")
    //     var animationContentLeft    = $animationContent.css("left")
    //     var $animationHeading       = $animationContent.find("h2")
    //     var animationHeadingFS      = parseInt($animationHeading.css("font-size"))
    //     var animationContentWidth   = $animationContent.outerWidth()

    //     $animation.css({
    //         height: (windowWidth + (animationContentWidth / 2))
    //     })

    //     var animationOffsetTop      = $animation.offset().top
    //     var animationBreakpoint     = 0
    //     var animationFSBreakpoint   = 0
    //     var animationVisBreakpoint  = 0
    //     var lastScrollTop           = 0

    //     $heading.css({
    //         visibility: "hidden"
    //     })

    //     $window.scroll(function() {
    //         var scrollTop   = $(this).scrollTop()
    //         var scrolledBy  = lastScrollTop - scrollTop
    //         var scrollDir   = "down"

    //         if (scrollTop < lastScrollTop) {
    //             scrollDir = "up"
    //         }

    //         lastScrollTop   = scrollTop

    //         $animation.css({
    //             height: (windowWidth + ($animationHeading.outerWidth() / 2))
    //         })

    //         var animationHeight         = $animation.outerHeight()
    //         var animationOffsetBottom   = (animationOffsetTop + animationHeight)

    //         if (scrollTop < animationOffsetTop) {
    //             $animationContent.css({
    //                 position: "absolute",
    //                 left: animationContentLeft,
    //                 zIndex: 999999
    //             })
    //         } else if ((scrollTop >= animationOffsetTop) && (scrollTop <= animationOffsetBottom)) {
    //             if (scrollDir == "down") {
    //                 if (parseInt($animationContent.css("left")) > 72) {
    //                     $animationContent.css({
    //                         position: "fixed",
    //                         left: parseInt($animationContent.css("left")) + (scrolledBy * 2)
    //                     })

    //                     animationBreakpoint = scrollTop
    //                 } else {
    //                     $animationContent.css({
    //                         position: "fixed",
    //                         left: 72
    //                     })

    //                     if (parseInt($animationHeading.css("font-size")) > parseInt($heading.css("font-size"))) {
    //                         $animationHeading.css({
    //                             fontSize: parseInt($animationHeading.css("font-size")) + (scrolledBy * 2)
    //                         })

    //                         animationFSBreakpoint = scrollTop
    //                     } else {
    //                         $animationHeading.css({
    //                             maxWidth: headingWidth,
    //                             fontSize: parseInt($heading.css("font-size"))
    //                         })
    //                     }
    //                 }
    //             } else {
    //                 if (scrollTop < animationBreakpoint) {
    //                     $animationContent.css({
    //                         position: "fixed",
    //                         left: parseInt($animationContent.css("left")) + (scrolledBy * 2)
    //                     })
    //                 } else {
    //                     if (scrollTop < animationFSBreakpoint) {
    //                         if (parseInt($animationHeading.css("font-size")) > animationHeadingFS) {
    //                             $animationHeading.css({
    //                                 fontSize: animationHeadingFS
    //                             })
    //                         } else {
    //                             $animationHeading.css({
    //                                 fontSize: parseInt($animationHeading.css("font-size")) + (scrolledBy * 2)
    //                             })
    //                         }
    //                     }
    //                 }
    //             }
    //         } else if ((scrollTop >= (animationOffsetBottom - $animationHeading.outerHeight())) && scrollTop <= animationVisBreakpoint) {
    //             $animationContent.css({
    //                 position: ""
    //             })

    //             animationVisBreakpoint = scrollTop
    //         }

    //         if (scrollTop >= headingOffsetTop) {
    //             $heading.css({
    //                 visibility: "visible"
    //             })
    //         } else {
    //             $heading.css({
    //                 visibility: "hidden"
    //             })
    //         }
    //     })
    // }
})

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!entry.target.classList.contains("animation-wipe-in")) {
                entry.target.classList.add("animation-wipe-in")
            }
        } else {
            if (entry.target.classList.contains("animation-wipe-in")) {
                entry.target.classList.remove("animation-wipe-in")
            }
        }
    })
})

document.querySelectorAll(".section-content.animate-it").forEach(element => {
    observer.observe(element)
})