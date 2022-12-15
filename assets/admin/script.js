jQuery(document).ready(function($) {
    /**
     * OTP Generator
     */
    $(function() {
        var genOtp = $(".btr-modal [data-action='generate-otp']")
        genOtp.on("click", function(e) {
            e.preventDefault()
            var numOtps = parseInt($("#otp-count").val())
            if (numOtps) {
                $(".btr-modal .btr-spinner").show()
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: wp_obj.ajax_url,
                    data: {
                        action: "btr_generate_otps",
                        otp_count: numOtps
                    },
                    success: (res) => {
                        console.log(res)
                        if (res.success) {
                            if ($(".btr-modal .btr-message").hasClass("btr-error")) {
                                $(".btr-modal .btr-message").removeClass("btr-error")
                            }
    
                            if (!$(".btr-modal .btr-message").hasClass("btr-success")) {
                                $(".btr-modal .btr-message").addClass("btr-success")
                            }
    
                            $(".btr-modal .btr-message").text("Successfully Generated!")
    
                            setTimeout(() => {
                                location.reload()
                            }, 500)
                        } else {
                            if ($(".btr-modal .btr-message").hasClass("btr-success")) {
                                $(".btr-modal .btr-message").removeClass("btr-success")
                            }
    
                            if (!$(".btr-modal .btr-message").hasClass("btr-error")) {
                                $(".btr-modal .btr-message").addClass("btr-error")
                            }
    
                            $(".btr-modal .btr-message").text("Generation Error!")
                        }
                        $(".btr-modal .btr-spinner").hide()
                    },
                    error: (err) => {
                        $(".btr-modal .btr-spinner").hide()
                    }
                })
            } else {
                if ($(".btr-modal .btr-message").hasClass("btr-success")) {
                    $(".btr-modal .btr-message").removeClass("btr-success")
                }

                if (!$(".btr-modal .btr-message").hasClass("btr-error")) {
                    $(".btr-modal .btr-message").addClass("btr-error")
                }

                $(".btr-modal .btr-message").text("Error: Insert number of OTPs to generate!")
            }
        })
    })

    /**
     * OTP Expire
     */
    $(function() {
        var otpExp = $(".btr-expire-otp")
        otpExp.on("click", function(e) {
            let confirmed = confirm("Do you really want to delete the otp?")
            if (!confirmed) return
            
            e.preventDefault()
            var otpId = parseInt($(this).attr("data-id"))
            if (otpId) {
                $("<div class='btr-spinner'></div>").insertAfter(this)
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: wp_obj.ajax_url,
                    data: {
                        action: "btr_otp_expire",
                        otp_id: otpId
                    },
                    success: (res) => {
                        console.log(res)
                        if (res.success) {
                            setTimeout(() => {
                                location.reload()
                            }, 500)
                        }
                        $(this).parent().children(".btr-spinner").remove()
                    },
                    error: (err) => {
                        $(this).parent().children(".btr-spinner").remove()
                    }
                })
            }
        })
    })
})