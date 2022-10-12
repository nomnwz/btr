jQuery(document).ready(function($) {
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
        var container   = $(".section-1, .section-3")
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
     * Animation
     */
    $(function() {
        /**
         * #1
         */
        $(function() {
            if (!$("#animation1").length) return;

            var windowWidth     = $(window).width()
            var windowHeight    = $(window).height()
            var animation       = $("#animation1")
            var content         = animation.find(".animation-content")
            var contentWidth    = content.width()
            var contentOT       = content.offset().top
            var contentFS       = parseInt(content.css("font-size"))
            var contentH2       = content.find("h2")
            var contentH2FS     = parseInt(contentH2.css("font-size"))
            var contentH2FSTemp = 0
            var lastScrollTop   = 0

            animation.css({
                height: contentWidth + windowWidth - windowHeight
            })

            var contentH2FSPStop = 0

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

                $(function() {
                    if (scrolledBy < 0) {
                        scrolledBy = scrolledBy * (-1)
                    }

                    var animationHeight     = animation.height()
                    var contentLeft         = parseInt(content.css("left"))
                    var contentH2FSTemp2    = parseInt(contentH2.css("font-size"))
                    var modifyFont          = scrolledBy / windowHeight * contentH2FSTemp2

                    if ((scrollTop >= contentOT) && (scrollTop <= (contentOT + animationHeight))) {
                        if ((scrollTop >= contentOT / 2) && (scrollTop <= (contentOT + animationHeight) / 2)) {
                            if (scrollDir == "up") {
                                content.css({
                                    position: "fixed",
                                    width: "",
                                    left: contentLeft+scrolledBy
                                })
                            } else {
                                content.css({
                                    position: "fixed",
                                    width: "",
                                    left: contentLeft-scrolledBy
                                })
                            }

                            contentH2.css({
                                fontSize: contentH2FS
                            })
                        } else {
                            if (scrollDir == "up") {
                                content.css({
                                    width: "100%"
                                })

                                if (scrollTop < contentH2FSPStop) {
                                    content.css({
                                        left: (contentLeft+scrolledBy) / 2 * (-1)
                                    })
    
                                    contentH2.css({
                                        fontSize: contentH2FSTemp2+modifyFont
                                    })
                                }
                            } else {
                                content.css({
                                    width: "100%"
                                })

                                if (contentH2FSTemp2-modifyFont > 72) {
                                    contentH2FSPStop = scrollTop
                                    content.css({
                                        left: (contentLeft-scrolledBy) / 2 * (-1)
                                    })

                                    contentH2.css({
                                        fontSize: contentH2FSTemp2-modifyFont
                                    })
                                }
                            }
                        }
                    } else if (scrollTop < contentOT) {
                        content.css({
                            position: "absolute",
                            left: "100vw"
                        })

                        contentH2.css({
                            fontSize: contentH2FS
                        })
                    } else if (scrollTop > (contentOT + animationHeight)) {
                        content.css({
                            position: "sticky",
                            top: "0"
                        })

                        contentH2.css({
                            fontSize: contentH2FSTemp2
                        })
                    }

                    if (scrollTop <= (contentOT + animationHeight)) {
                        content.css({
                            position: "fixed",
                            top: "0"
                        })
                    }
                })
            })
        })
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
             * Section 1
             */
            $(function() {
                // $(function() {
                //     var section1    = $(".section-1")
                //     var sectContent = section1.find(".section-intro")
                //     var sectionPL   = sectContent.css("left")
                //     var offsetLeft  = parseInt(sectContent.parent().css("padding-left")) + parseInt(sectContent.parent().parent().css("padding-left"))
                //     var sectionW    = sectContent.outerWidth()
                //     var animDiff    = parseInt(sectionW) - parseInt(sectionPL)
                //     if (((sectContent.offset().top - sectContent.outerHeight()) < $(window).scrollTop()) && ($(window).scrollTop() < (sectContent.offset().top + sectContent.outerHeight()))) {
                //         if (scrolledBy < 0) {
                //             scrolledBy = scrolledBy * (-1)
                //         }
    
                //         if ($(window).scrollTop() < (sectContent.offset().top + (sectContent.outerHeight() / 2))) {
                //             var scrollLeft = scrolledBy / $(window).height() * parseInt(sectionW) * 2
                //             if (scrollDir == "up") {
                //                 if (parseInt($(window).scrollTop()+(sectContent.outerHeight() / 2)) < section1GL) {
                //                     sectContent.css({
                //                         position: "fixed",
                //                         width: sectionW,
                //                         left: parseInt(sectionPL)+scrollLeft
                //                     })
                //                 } else {
                //                     sectContent.css({
                //                         position: "sticky",
                //                         width: sectionW,
                //                         left: "calc(100vw - 60px - calc(var(--bs-gutter-x) * .5))"
                //                     })
                //                 }
                //             } else {
                //                 if (parseInt(sectionPL) > offsetLeft) {
                //                     sectContent.css({
                //                         position: "fixed",
                //                         width: sectionW,
                //                         left: parseInt(sectionPL)-scrollLeft
                //                     })
                //                 } else {
                //                     if (parseInt(sectionPL) == offsetLeft) {
                //                         section1GL = $(window).scrollTop()
                //                     }
                //                     sectContent.css({
                //                         position: "sticky",
                //                         width: sectionW,
                //                         left: offsetLeft
                //                     })
                //                 }
                //             }
                //         } else {
                            
                //         }
                //     }
                // })
                
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