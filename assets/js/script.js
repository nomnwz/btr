jQuery(document).ready(function($) {
    /**
     * Menu toggle
     */
    $(function() {
        $(".menu-toggle").on("click", function(e) {
            e.preventDefault()
            var that    = this
            var ms      = 300
            $(that).find(".toggle-icon.closed").animate({
                width: "34px"
            }, ms)
            $(that).find(".toggle-icon.opened").animate({
                width: "44px"
            }, ms)
            setTimeout(() => {
                $(this).find(".toggle-icon").toggleClass("closed opened")
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
        $(window).resize(function (e) { 
            menuPosFix()
        });
    })

    function menuPosFix() {
        var that = "header"
        var netOffset = $(that).offset().top + $(that).height()
        $(".menu-wrap").css({
            top: netOffset+1
        })
    }
})