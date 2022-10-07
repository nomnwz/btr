jQuery(document).ready(function($) {
    /**
     * OTP
     */
    $(function() {
        otpInput()
        $(".otp-container .validate").on("click", function(e) {
            var inputs      = $("#otp > *[id]")
            var inputName   = $(inputs).attr("name").replace("[]", "")
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
                        }, 500);
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
     * Loader
     */
    $(function() {
        var loader      = $("#loader")
        var slides      = $(".slide")
        var duration    = 3500

        loadVideo("#videoPopup", true, 3500)
        removeEl("#loader", 3500)
        
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
                        slide.stop().animate({
                            top: translateY
                        }, duration)
                    } else {
                        slide.stop().animate({
                            bottom: translateY
                        }, duration)
                    }
                }   
            }
        }
    })

    /**
     * Video Popup
     */
    $(function() {
        $("#videoPopup video").on("ended", function(e) {
            $("#videoPopup .popup-action").css({
                display: "flex"
            })
        })

        $("#videoPopup").on("click", '.popup-action[data-action="close"]', function(e) {
            e.preventDefault()

            $.ajax({
                type: "post",
                dataType: "json",
                url: wp_obj.ajax_url,
                data: {
                    action: "btr_increase_visits"
                },
                success: (res) => {
                    console.log(res)
                },
                error: (err) => {
                    console.log(err)
                }
            })

            removeEl("#videoPopup", 500)
            loadVideo("#videoAutoplay", true, 500)

            setTimeout(() => {
                $(".scroll-to").trigger("click")
            }, 500)
        })

        if (!$("#videoPopup").length) {
            loadVideo("#videoAutoplay", true, 3500)

            setTimeout(() => {
                $(".scroll-to").trigger("click")
            }, 3500)
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
     * Section 1
     */
    $(function() {
        var container   = $(".section-1")
        if (container.length && $(window).width() > 767) {
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
        if (container.length && $(window).width() > 767) {
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

                    $(inputs[i + 1]).focus();
                    e.preventDefault();
                }
            })
        }
    }

    const removeEl = (el, delay = 3000) => {
        if (jQuery(el).length) {
            if (delay) {
                setTimeout(() => {
                    jQuery(el).remove()
                }, delay)
            } else {
                jQuery(el).remove()
            }
        }
    }

    const loadVideo = (el, play = true, delay = 3000) => {
        const load = () => {
            jQuery(el+" video source").attr("src", jQuery(el+" video source").attr("data-src"))
            jQuery(el+" video").get(0).load()
            if (play) {
                jQuery(el+" video").get(0).play()
            }
        }
        if (jQuery(el).length) {
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

                if ($("#wpadminbar").length) {
                    if ($(window).width() > 600) {
                        top = top + $("#wpadminbar").outerHeight()
                    }

                    if ($(stickyTop).attr("sticky-top")) {
                        top = top + parseInt($(stickyTop).attr("sticky-top"))
                    }
                }

                $(stickyTop).css({
                    top: top
                })
            }
        }
    }

    const menuPosFix = () => {
        var that        = "header"
        var netOffset   = $(that).offset().top + $(that).height()
        $(".menu-wrap").css({
            top: netOffset+1
        })
    }

    const videoAutoplayHeight = () => {
        var topOffset   = parseInt($("header").css("top").replace("px", "")) + $("header").height()
        $("#videoAutoplay").css({
            height: "calc(100vh - "+topOffset+"px)"
        })
        $(".top-video .elementor-container").css({
            "height": "calc(100vh - "+topOffset+"px)",
            "min-height": "calc(100vh - "+topOffset+"px"
        })
    }

    const animation1 = () => {
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