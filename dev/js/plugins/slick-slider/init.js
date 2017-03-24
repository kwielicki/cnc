(function($){
    "use strict";

    var validatedata = function(attr, def) {
        if (attr !== void 0) {
            return attr;
        }
        return def;
    };

    var parseBoolean = function(attr, def) {
        if (attr === 'true') {
            return true;
        } else if (attr === 'false') {
            return false;
        }
        return def;
    };

    var $slick = $(".ct-js-slick"),
    $html      = $('html');
    $(document).on('ready', function(){

        // Main slider Height

        var $topBarHeight = $('._topBar').innerHeight(),
            $navBarHeight = 96;

        var $device_width       = (window.innerWidth > 0) ? window.innerWidth : screen.width,
            $device_height      = (window.innerHeight > 0) ? window.innerHeight : screen.height;

        // Background Image // -------------------------------
        $slick.find(".item").each(function () {
            var $slide_item = $(this),
                bg = validatedata($slide_item.attr('data-bg'), false);
            if (bg) {
                $slide_item.css('background-image', 'url("' + bg + '")');
            }
        });
        $('.ct-js-slick.is-loading').each(function () {
            var $slickitemheight = $(this).find('.item').first().height();
            $(this).css('height', $slickitemheight + 'px');
        });

// Responsive Breakpoins
        var $widthLG = 1200;
        var $widthMD = 992;
        var $widthSM = 768;
        var $widthXS = 480;


        if ($().slick){
            if ($slick.length > 0) {
                $slick.each(function(){
                    var $this = $(this);

                    // Slider height
                    if ($this.attr('data-height')) {
                        var $slickheight = $this.attr("data-height") + "px";

                        if ($slickheight.indexOf("%") > -1) {
                            $this.css('min-height', $device_height * (parseInt($slickheight, 10) / 100));
                            $this.find('.slick-list').css('min-height', $device_height * (parseInt($slickheight, 10) / 100));
                            $this.find('.slick-track').css('min-height', $device_height * (parseInt($slickheight, 10) / 100));
                            $this.find('.item').each(function () {
                                $(this).css('min-height', $device_height * (parseInt($slickheight, 10) / 100));
                            });
                        } else {
                            $this.css('min-height', parseInt($slickheight, 10) + "px");
                            $this.find('.slick-list').css('min-height', parseInt($slickheight, 10) + "px");
                            $this.find('.slick-track').css('min-height', parseInt($slickheight, 10) + "px");
                            $this.find('.item').each(function () {
                                $(this).css('min-height', parseInt($slickheight, 10) + "px");
                            });
                        }
                    }
                    if ($this.attr('data-height-main')) {
                        var $slickheightMain = $this.attr("data-height-main") + "px";
                        if ($device_width > 768) {
                            if ($slickheightMain.indexOf("%") > -1) {
                                $this.css('min-height', ($device_height  - $topBarHeight - $navBarHeight) * (parseInt($slickheightMain, 10) / 100));
                                $this.find('.slick-list').css('min-height', ($device_height  - $topBarHeight - $navBarHeight) * (parseInt($slickheightMain, 10) / 100));
                                $this.find('.slick-track').css('min-height', ($device_height  - $topBarHeight - $navBarHeight) * (parseInt($slickheightMain, 10) / 100));
                                $this.find('.item').each(function () {
                                    $(this).css('min-height', ($device_height  - $topBarHeight - $navBarHeight) * (parseInt($slickheightMain, 10) / 100));
                                });
                            }
                        } else {
                            if ($slickheightMain.indexOf("%") > -1) {
                                $this.css('min-height', $device_height * (parseInt($slickheightMain, 10) / 100));
                                $this.find('.slick-list').css('min-height', $device_height * (parseInt($slickheightMain, 10) / 100));
                                $this.find('.slick-track').css('min-height', $device_height * (parseInt($slickheightMain, 10) / 100));
                                $this.find('.item').each(function () {
                                    $(this).css('min-height', $device_height * (parseInt($slickheightMain, 10) / 100));
                                });
                            }
                        }
                    }



                    // Background Image // -------------------------------
                    $this.find(".item").each(function () {
                        var $slide_item = $(this);
                        var bg = validatedata($slide_item.attr('data-bg'), false);
                        if (bg) {
                            $slide_item.css('background-image', 'url("' + bg + '")');
                        }
                    });
                    // Items Settings
                    var ctslidesToShow =  parseInt(validatedata($this.attr("data-items"), 1), 10); // Non Responsive
                    var slidesXS = parseInt(validatedata($this.attr("data-XSitems"), ctslidesToShow), 10);
                    var slidesSM = parseInt(validatedata($this.attr("data-SMitems"), slidesXS), 10); // Default Item from smaller Device;
                    var slidesMD = parseInt(validatedata($this.attr("data-MDitems"), slidesSM), 10); // Default Item from smaller Device;
                    var slidesLG = parseInt(validatedata($this.attr("data-LGitems"), slidesMD), 10); // Default Item from smaller Device;

                    var ctaccessibility = parseBoolean($this.attr("data-accessibility"), true);
                    var ctadaptiveHeight = parseBoolean($this.attr("data-adaptiveHeight"), false);
                    var ctautoplay = parseBoolean($this.attr("data-autoplay"), false);
                    var ctautoplaySpeed = parseInt(validatedata($this.attr("data-autoplaySpeed"), 3000), 10);
                    var ctarrows = parseBoolean($this.attr("data-arrows"), true);
                    var ctasNavFor = validatedata($this.attr("data-asNavFor"));
                    var ctappendArrows = validatedata($this.attr("data-appendArrows"));
                    var ctprevArrow = validatedata($this.attr("data-prevArrow"), '<button type="button" class="slick-prev"></button>');
                    var ctnextArrow = validatedata($this.attr("data-nextArrow"), '<button type="button" class="slick-next"></button>');
                    var ctcenterMode = parseBoolean($this.attr("data-centerMode"), false);
                    var ctcenterPadding = validatedata($this.attr("data-centerPadding"), '50px');
                    var ctcssEase = validatedata($this.attr("data-cssEase"), 'ease');
                    var ctdots = parseBoolean($this.attr("data-dots"), false);
                    var ctdraggable = parseBoolean($this.attr("data-draggable"), true);
                    var ctfade = parseBoolean($this.attr("data-fade"), false);
                    var ctfocusOnSelect = parseBoolean($this.attr("data-focusOnSelect"), false);
                    var cteasing = validatedata($this.attr("data-easing"), 'linear');
                    var ctedgeFriction = parseInt(validatedata($this.attr("data-edgeFriction"), 0.15), 10);
                    var ctinfinite = parseBoolean($this.attr("data-infinite"), true);
                    var ctinitialSlide = parseInt(validatedata($this.attr("data-initialSlide"), 0), 10);
                    var ctlazyLoad = validatedata($this.attr("data-lazyLoad"), 'ondemand');
                    var ctmobileFirst = parseBoolean($this.attr("data-mobileFirst"), true);
                    var ctpauseOnHover = parseBoolean($this.attr("data-pauseOnHover"), true);
                    var ctpauseOnDotsHover = parseBoolean($this.attr("data-pauseOnDotsHover"), false);
                    var ctrespondTo = validatedata($this.attr("data-respondTo"), 'window');
                    var ctslide = validatedata($this.attr("data-slide"));
                    var ctslidesToScroll = parseInt(validatedata($this.attr("data-slidesToScroll"), 1), 10);
                    var ctspeed = parseInt(validatedata($this.attr("data-speed"), 300), 10);
                    var ctswipe = parseBoolean($this.attr("data-swipe"), true);
                    var ctswipeToSlide =  parseBoolean($this.attr("data-swipeToSlide"), false);
                    var cttouchMove = parseBoolean($this.attr("data-touchMove"), true);
                    var cttouchThreshold = parseInt(validatedata($this.attr("data-touchThreshold"), 5), 10);
                    var ctuseCSS = parseBoolean($this.attr("data-useCSS"), true);
                    var ctvariableWidth = parseBoolean($this.attr("data-variableWidth"), false);
                    var ctvertical = parseBoolean($this.attr("data-vertical"), false);
                    var ctrtl = parseBoolean($this.attr("data-rtl"), false);


                    $this.on('init', function () {
                        $slick.removeClass('is-loading');
                        $slick.css('height', 'auto');
                    });

                    // Slick Init
                    $this.slick({
                        slidesToShow: ctslidesToShow,
                        accessibility: ctaccessibility,      // Enables tabbing and arrow key navigation
                        adaptiveHeight: ctadaptiveHeight,    // Enables adaptive height for single slide horizontal carousels.
                        autoplay: ctautoplay,                // Enables Autoplay
                        autoplaySpeed: ctautoplaySpeed,      // Autoplay Speed in milliseconds
                        arrows: ctarrows,                    // Prev/Next Arrows
                        asNavFor: ctasNavFor,                // Set the slider to be the navigation of other slider (Class or ID Name)
                        appendArrows: ctappendArrows,        // Change where the navigation arrows are attached (Selector, htmlString, Array, Element, jQuery object)
                        prevArrow: ctprevArrow,              // Allows you to select a node or customize the HTML for the "Previous" arrow.
                        nextArrow: ctnextArrow,              // Allows you to select a node or customize the HTML for the "Next" arrow.
                        centerMode: ctcenterMode,            // Enables centered view with partial prev/next slides. Use with odd numbered slidesToShow counts.
                        centerPadding: ctcenterPadding,      // Side padding when in center mode (px or %)
                        cssEase: ctcssEase,                  // CSS3 Animation Easing
                        dots: ctdots,                        // Show dot indicators
                        draggable: ctdraggable,              // Enable mouse dragging
                        fade: ctfade,                        // Enable fade
                        focusOnSelect: ctfocusOnSelect,      // Enable focus on selected element (click)
                        easing: cteasing,                    // Add easing for jQuery animate. Use with easing libraries or default easing methods
                        edgeFriction: ctedgeFriction,        // Resistance when swiping edges of non-infinite carousels
                        infinite: ctinfinite,                // Infinite loop sliding
                        initialSlide: ctinitialSlide,        // Slide to start on
                        lazyLoad: ctlazyLoad,                // Set lazy loading technique. Accepts 'ondemand' or 'progressive'
                        mobileFirst: ctmobileFirst,          // Responsive settings use mobile first calculation
                        pauseOnHover: ctpauseOnHover,        // Pause Autoplay On Hover
                        pauseOnDotsHover: ctpauseOnDotsHover,// Pause Autoplay when a dot is hovered
                        respondTo: ctrespondTo,              // Width that responsive object responds to. Can be 'window', 'slider' or 'min' (the smaller of the two)
                        slide: ctslide,                      // Element query to use as slide
                        slidesToScroll: ctslidesToScroll,    // Number of slides to scroll
                        speed: ctspeed,                      // Slide/Fade animation speed
                        swipe: ctswipe,                      // Enable swiping
                        swipeToSlide: ctswipeToSlide,        // Allow users to drag or swipe directly to a slide irrespective of slidesToScroll
                        touchMove: cttouchMove,              // Enable slide motion with touch
                        touchThreshold: cttouchThreshold,    // To advance slides, the user must swipe a length of (1/touchThreshold) * the width of the slide
                        useCSS: ctuseCSS,                    // Enable/Disable CSS Transitions
                        variableWidth: ctvariableWidth,      // Variable width slides
                        vertical: ctvertical,                // Vertical slide mode
                        rtl: ctrtl,                           // Change the slider's direction to become right-to-left
                        responsive: [ // Responsive Breakpoints
                            {
                                breakpoint: $widthLG, // Desktop
                                settings: {
                                    slidesToShow: slidesLG
                                }
                            },
                            {
                                breakpoint: $widthMD,  // Laptop
                                settings:{
                                    slidesToShow: slidesMD
                                }
                            },
                            {
                                breakpoint: $widthSM, // Tablet
                                settings: {
                                    slidesToShow: slidesSM
                                }
                            },
                            {
                                breakpoint: $widthXS, // Mobile
                                settings: {
                                    slidesToShow: slidesXS
                                }
                            }
                        ] // end Responsive Breakpoints
                    }); //end $this.slick

                    $this.on('beforeChange', function(){
                        $this.find(".slick-slide [data-fx]").each(function () {
                                var $content = $(this);
                                $content.removeClass($content.data('fx')).removeClass("activate");
                            });
                            setTimeout(function () {
                                $this.find(".slick-active [data-fx]").each(function () {
                                    var $content = $(this);
                                    if ($content.data('time') != undefined) {
                                        setTimeout(function () {
                                            $content.addClass($content.data('fx')).addClass("activate");
                                        }, $content.data('time'));
                                    } else{
                                        $content.addClass($content.data('fx')).addClass("activate");
                                    }
                                })
                            }, 150);
                    });
                    if ($('[data-space]').length > 0) {
                        $('[data-space]').each(function () {
                            var $this = $(this),
                                $space = $this.attr('data-space');

                            $('.slick-slide').css({
                                marginLeft: $space + 'px',
                                marginRight: $space + 'px'
                            });

                            $('.slick-list').css({
                                marginLeft: -$space + 'px',
                                marginRight: -$space + 1 + 'px'
                            })
                        });
                    }
                }); // end each functions
            } // end length if
        } // end Slick
    }); // end Doc Ready

})(jQuery);
