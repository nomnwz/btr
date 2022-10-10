jQuery(document).ready(function($) {
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
     * Loader
     */
    $(function() {
        var loader      = $("#loader")
        var slides      = $(".slide")
        var duration    = 3500

        // loadVideo("#videoPopup", true, 3500)
        loadVideo("#videoPopup", true, 0)
        // removeEl("#loader", 3500)
        
        // if (slides.length) {
        //     for (let i = 0; i < slides.length; i++) {
        //         const slide     = $(slides[i])
        //         var direction   = slide.hasClass("slide-vertical") ? "vertical" : "horizontal"
        //         var isReverse   = slide.hasClass("slide-reverse") ? true : false
        //         if (direction == "vertical") {
        //             var height      = slide.outerHeight()
        //             var translate   = height - loader.height()
        //             var translateY  = `-${translate+"px"}`
        //             if (isReverse) {
        //                 slide.stop().animate({
        //                     top: translateY
        //                 }, duration)
        //             } else {
        //                 slide.stop().animate({
        //                     bottom: translateY
        //                 }, duration)
        //             }
        //         }   
        //     }
        // }
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
            var stickyBottom    = parseInt(stickyItem.css("top")) + stickyItem.outerHeight() + 60
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
            var stickyBottom    = parseInt(stickyItem.css("top")) + stickyItem.outerHeight() + 60
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
        var lastScrollTop   = 0
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

                menuPosFix()
            })

            // /**
            //  * Video Autplay
            //  */
            // $(function() {
            //     var target      = "#videoAutoplay video"
            //     var videoPos    = $(target).outerHeight()
            //     if ($(window).scrollTop() > videoPos) {
            //         $(target).get(0).pause()
            //     } else {
            //         $(target).get(0).play()
            //     }
            // })

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
             * Animation
             */
            $(function() {
                var animation1  = $("#animation1")
                var animContent = animation1.find(".animation-content")
                var animationPL = animContent.css("left")
                var animationW  = animContent.outerWidth()
                var animDiff    = parseInt(animationW) - parseInt(animationPL)
                if (($(window).scrollTop() > (animContent.offset().top - animContent.outerHeight())) && ($(window).scrollTop() < (animContent.offset().top + animContent.outerHeight()))) {
                    if (scrolledBy < 0) {
                        scrolledBy = scrolledBy * (-1)
                    }

                    var scrollLeft = scrolledBy / $(window).height() * parseInt(animationW)

                    if (scrollDir == "up") {
                        animContent.css({left: parseInt(animationPL)+scrollLeft})
                    } else {
                        animContent.css({left: parseInt(animationPL)-scrollLeft})
                    }
                }
            })

            /**
             * Section 1
             */
            $(function() {
                $(function() {
                    var section1    = $(".section-1")
                    var sectContent = section1.find(".section-intro")
                    var sectionPL   = sectContent.css("left")
                    var offsetLeft  = parseInt(sectContent.parent().css("padding-left")) + parseInt(sectContent.parent().parent().css("padding-left"))
                    var sectionW    = sectContent.outerWidth()
                    var animDiff    = parseInt(sectionW) - parseInt(sectionPL)
                    if (((sectContent.offset().top - sectContent.outerHeight()) < $(window).scrollTop()) && ($(window).scrollTop() < (sectContent.offset().top + sectContent.outerHeight()))) {
                        if (scrolledBy < 0) {
                            scrolledBy = scrolledBy * (-1)
                        }
    
                        if ($(window).scrollTop() < (sectContent.offset().top + (sectContent.outerHeight() / 2))) {
                            var scrollLeft = scrolledBy / $(window).height() * parseInt(sectionW) * 2
                            if (scrollDir == "up") {
                                console.log((sectContent.offset().top))
                                console.log((sectContent.outerHeight() / 2))
                                console.log((sectContent.offset().top - (sectContent.outerHeight() / 2)))
                                if ($(window).scrollTop() < (sectContent.offset().top - (sectContent.outerHeight() / 2))) {
                                    sectContent.css({
                                        position: "fixed",
                                        width: sectionW,
                                        left: parseInt(sectionPL)+scrollLeft
                                    })
                                } else {
                                    sectContent.css({
                                        position: "absolute",
                                        width: sectionW,
                                        left: "calc(100vw - 60px - calc(var(--bs-gutter-x) * .5))"
                                    })
                                }
                            } else {
                                if (parseInt(sectionPL) > offsetLeft) {
                                    sectContent.css({
                                        position: "fixed",
                                        width: sectionW,
                                        left: parseInt(sectionPL)-scrollLeft
                                    })
                                } else {
                                    sectContent.css({
                                        position: "sticky",
                                        width: sectionW,
                                        left: offsetLeft
                                    })
                                }
                            }
                        } else {
                            
                        }
                    }
                    // } else if ($(window).scrollTop() < (sectContent.offset().top - sectContent.outerHeight())) {
                    //     sectContent.css({
                    //         position: "absolute",
                    //         left: "calc(100vw - 60px - calc(var(--bs-gutter-x) * .5))"
                    //     })
                    // } else if ($(window).scrollTop() > (sectContent.offset().top + sectContent.outerHeight())) {
                    //     sectContent.css({
                    //         position: "absolute",
                    //         left: offsetLeft
                    //     })
                    // }
                })
                
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

    const menuPosFix = () => {
        var that        = "header"
        var netOffset   = parseInt($(that).css("top")) + $(that).outerHeight()
        $(".menu-wrap").css({
            top: netOffset
        })
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
})

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove("animation-wipe-out")
            entry.target.classList.add("animation-wipe-in")
        } else {
            entry.target.classList.remove("animation-wipe-in")
            entry.target.classList.add("animation-wipe-out")
        }
    })
})
  
observer.observe(document.querySelector(".section-5 .section-content"))