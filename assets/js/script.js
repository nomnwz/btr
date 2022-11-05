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
        otpInput(".otp-container .validate")
        $(".otp-container .validate").on("click", function(e) {
            var inputs      = $("#otp > *[id]")
            var otp         = []

            for (let i = 0; i < inputs.length; i++) {
                const input     = inputs[i]
                var inputValue  = $(input).val()
                otp.push(inputValue)
            }

            otp = otp.join("")

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

                            if ($("body").hasClass("rtl")) {
                                $(".otp-container .message").text("خطئ في التحقق!")
                            } else {
                                $(".otp-container .message").text("Validation error!")
                            }
                        }

                        if (!$(".otp-container .message").hasClass("text-success")) {
                            $(".otp-container .message").addClass("text-success")

                            if ($("body").hasClass("rtl")) {
                                $(".otp-container .message").text("تم التحقق بنجاح!")
                            } else {
                                $(".otp-container .message").text("Successfully validated!")
                            }
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

                        if ($("body").hasClass("rtl")) {
                            $(".otp-container .message").text("خطئ في التحقق!")
                        } else {
                            $(".otp-container .message").text("Validation error!")
                        }
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

        $("#videoAutoplay video").on("timeupdate", function(e) {
            if (this.currentTime > 145) {
                this.pause()
                this.currentTime = 0
                $(this).trigger("ended")
            }
        })

        $("#videoAutoplay video").on("ended", function(e) {
            $("#videoAutoplay .video-reloader").show("slow")
        })

        $(".video-reloader").on("click", function(e) {
            var targetVideo = $(this).attr("data-video-target")
            $("#"+targetVideo+" video").get(0).pause()
            $("#"+targetVideo+" video").get(0).currentTime = 0
            $("#"+targetVideo+" video").get(0).play()
            if (!$("#"+targetVideo+" video").is(":visible")) {
                $("#"+targetVideo+" video").css({
                    display: "block"
                })
            }
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
                var heading           = $element.find(".section-heading")
                var content         = $element.find(".section-content")
                content.css({
                    marginTop: heading.outerHeight()
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

    const copyPasteCallback = (e, element, callback) => {
        if (navigator.clipboard && navigator.clipboard.readText) { // Modern approach with Clipboard API
            navigator.clipboard.readText().then(callback)
        } else if (e.originalEvent && e.originalEvent.clipboardData) { // OriginalEvent is a property from jQuery, normalizing the event object
            callback(e.originalEvent.clipboardData.getData("text"))
        } else if (e.clipboardData) { // Used in some browsers for clipboardData
            callback(e.clipboardData.getData("text/plain"))
        } else if (window.clipboardData) { // Older clipboardData version for Internet Explorer only
            callback(window.clipboardData.getData("Text"))
        } else { // Last resort fallback, using a timer
            setTimeout(() => {
                callback($(element).val())                                    
            }, 0)
        }
    }

    const otpInput = (submitBtn) => {
        var inputs = $("#otp > *[id]")
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i]
            var oldValue, newValue

            $(input).on("keydown", function(e) {
                oldValue = $(input).val()

                if (e.key === "Backspace" ) {
                    $(input).val("")
                    if (i !== 0) {
                        $(inputs[i - 1]).focus()
                    }
                } else {
                    e           = e || window.event
                    var keyCode = e.which || e.keyCode

                    if ((i == (inputs.length - 1)) && keyCode == 13) { // Enter
                        $(submitBtn).trigger("click")
                    }
                }
            })

            $(input).on("paste", function(e) {
                copyPasteCallback(e, input, (clipText) => {
                    var textStrCount    = clipText.length
                    var i2              = 0
                    
                    for (let x = 0; x < textStrCount; x++) {
                        $(inputs[i + x]).val(clipText.charAt(x))

                        i2 = x
                    }
                    
                    if ($(inputs[i + i2]).length) {
                        $(inputs[i + i2]).focus()
                    } else {
                        $(inputs[inputs.length - 1]).focus()
                    }
                })
            })

            $(input).on("propertychange input", function(e) {
                newValue        = $(input).val()
                var alphabets   = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                var numbers     = "123456789"
                var specials    = "!@#$%&"

                if (numbers.includes(newValue)) { // Numbers [1-9]
                    $(input).val(newValue)
                } else if (alphabets.includes(newValue)) { // Alphabets [A-Z]
                    $(input).val(newValue.toUpperCase())
                } else if (specials.includes(newValue)) { // Special Characters [! @ # $ % &]
                    $(input).val(newValue)
                } else {
                    $(input).val("")
                }

                if ($(input).val()) {
                    $(inputs[i + 1]).focus()
                    e.preventDefault()
                }
            })
        }
    }

    const loadVideo = (el, play = true, delay = 3000) => {
        const load = () => {
            $(el+" video").prop("muted", false)
            $(el+" video").prop("loop", false)
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

    const createSectionAnimation = (element) => {
        var $window             = $(window)
        var windowWidth         = $window.width()
        var windowHeight        = $window.height()
        var $element            = $(element)
        var elementHeight       = $element.outerHeight()
        var elementColor        = $element.css("color")
        var elementBGColor      = $element.css("background-color")
        var elementBG           = $element.css("background")
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
            animationScroll = (windowWidth - introOffsetLeft + introWidth - windowHeight)
        }

        $animation.css({
            width: "100%",
            height: animationScroll,
            backgroundColor: elementBGColor,
            background: elementBG,
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
})

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting || (entry.intersectionRatio > 1)) {
                if (!entry.target.classList.contains("animation-wipe-in")) {
                    entry.target.classList.add("animation-wipe-in")
                }
            } else {
                if (entry.target.classList.contains("animation-wipe-in")) {
                    entry.target.classList.remove("animation-wipe-in")
                }
            }
        })
    }
)

document.querySelectorAll(".section-content.animate-it").forEach(element => {
    observer.observe(element)
})