(function ($) {
    "use strict";

    /** Global variables **/
    var $html         = $('html'),
        $body         = $('body'),
        $deviceWidth  = (window.innerWidth > 0) ? window.innerWidth : screen.width,
        $deviceHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

	/** Get location and set data-location **/
    var $windowLocation = window.location.pathname;
        $html.attr('data-location', $windowLocation);

    /** Get browser language **/
    var browserLanguage = window.navigator.userLanguage || window.navigator.language;
    	$html.attr('data-browser-language', browserLanguage);

    /** DeviceJS no conflict **/
    var devicejs = device.noConflict();

    /** Function for css animate **/
        function cssAnimate() {
            if (!$html.hasClass('mobile') && !$html.hasClass('tablet') && $deviceWidth > 991){
                $('.css-animate .animated').each(function(){
                    var that = $(this);
                    if (that.data('time') != undefined){
                        var delay = that.attr('data-time');
                        if(that.visible(true)){
                            setTimeout(function(){
                                that.addClass('activate');
                                that.addClass(that.data('fx'));
                            }, delay)
                        }
                    }
                    else{
                        if(that.visible(true)){
                            that.addClass('activate');
                            that.addClass(that.data('fx'));
                        }
                    }
                });
            } else {
                $body.removeClass('css-animate');
            }
        }
    /* Window on resize with delay */
    var TIMEOUT   = $html.attr('data-resized'),
        EVENT_KEY = 'resizeend',
        $window = $(window),
        timer;

        window.addEventListener('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {
                $window.trigger(EVENT_KEY);
            }, TIMEOUT);
        });

    $(document).on('ready', function() {

        /** jQuery browser / device **/
            $html.addClass('ver-' + $.browser.versionNumber);
            $html.addClass('device_width-' + $deviceWidth);
            $html.addClass('device_height-' +$deviceHeight);
            if ($.browser.webkit) {
                $html.addClass('browser-webkit');
            } else if ($.browser.msie) {
                $html.addClass('browser-msie');
            } else if ($.browser.mozilla) {
                $html.addClass('browser-mozilla');
            }

        /** Placeholder **/
            $('input, textarea').placeholder({
                customClass: "js-placeholder"
            });

        /** Tooltipster **/
            $('.tooltipster').tooltipster({
                delay: 50
            });

        /** Page scroller **/
            if ($('[data-scroll]').length > 0) {
                $('[data-scroll]').on('click', function(e) {
                    var $scroll;
                    e.preventDefault();
                    $scroll = $(this).attr('data-scroll');
                    if ($scroll === 'up') {
                        $('html, body').animate({
                            scrollTop: $($scroll).offset().top
                        }, 900, 'swing');
                    } else if ($scroll.charAt(0) === '#') {
                        if ($html.hasClass('mobile')) {
                            $('html, body').animate({
                                scrollTop: $($scroll).offset().top
                            }, 900, 'swing');
                        } else {
                            $('html, body').animate({
                                scrollTop: $($scoll).offset().top
                            }, 900, 'swing');
                        }
                    }
                    return false;
                });
            }

        /** Parallax Skrollr **/
            if (!$html.hasClass('mobile') && !$html.hasClass('tablet') && $deviceWidth > 991) {
                $('[data-parallax]').each(function() {
                    var $this = $(this),
                        $item = $this.attr('data-parallax');

                    $this.attr('data-top-bottom', 'background-position: 50% -' + $item + 'px');
                    $this.attr('data-bottom-top', 'background-position: 50% ' + $item + 'px');
                    $this.attr('data-center', 'background-position: 50% 0px');
                })
            } else {
                $('[data-parallax]').each(function() {
                    var $this = $(this);

                    $this.addClass('js-parallax-disabled');
                })
            }
        /** Helpers **/

            // Min height
                if ($('[data-height]').length > 0) {
                    $('[data-height]').each(function() {
                        var $height, $this;
                        $this = $(this);
                        $height = $this.attr('data-height');
                        if ($height.indexOf('%') > -1) {
                            $this.css('min-height', $deviceHeight * parseInt($height, 10) / 100);
                        } else {
                            $this.css('min-height', parseInt($height, 10) + 'px');
                        }
                    });
                }

            // Background color for desktop and mobile
                if ($('[data-background]').length > 0) {
                    $('[data-background]').each(function() {
                        var $background, $backgroundmobile, $this;
                        $this = $(this);
                        $background = $(this).attr('data-background');
                        $backgroundmobile = $(this).attr('data-background-mobile');
                        if ($this.attr('data-background').substr(0, 1) === '#') {
                            $this.css('background-color', $background);
                        } else if ($html.hasClass('mobile')) {
                            $this.css('background-image', 'url(' + $backgroundmobile + ')');
                        } else {
                            $this.css('background-image', 'url(' + $background + ')');
                        }
                    });
                }

            // Background position
                if ($('[data-background-position]').length > 0) {
                    $('[data-background-position]').each(function() {
                        var $bgPosition, $this;
                        $this = $(this);
                        $bgPosition = $(this).attr('data-background-position');
                        if ($this.attr('data-background-position') == '') {
                            $this.css('background-position', '50% 50%');
                        }
                        else if ($this.attr('data-background-position')) {
                            $this.css('background-position', $bgPosition);
                        }
                    });
                }

            // Background size
                if ($('[data-background-size]').length > 0) {
                    $('[data-background-size]').each(function() {
                        var $bgSize, $this;
                        $this = $(this);
                        $bgSize = $(this).attr('data-background-size');
                        if ($this.attr('data-background-size') == '') {
                            $this.css('background-size', 'cover');
                        }
                        else if ($this.attr('data-background-position')) {
                            $this.css('background-size', $bgSize);
                        }
                    });
                }

            // Color
                if ($('[data-color]').length > 0) {
                    $('[data-color]').each(function() {
                        var $this = $(this),
                            $color = $this.attr('data-color');
                        $this.css('color', $color);
                    });
                }

        // Code for mode-rewrite data-attributes
        if ($('[data-mode-rewrite="on"]').length > 0) {
            $('a[href]').each(function() {
                var $this    = $(this),
                    attrHref = $this.attr('href');

                if ($this.attr('data-rewrite-mode-disabled') === undefined) {

                    $this.attr('data-rewrite-mode', attrHref + ".html");
                    var modeRewiteText = $this.attr('data-rewrite-mode');
                    $this.attr('href', modeRewiteText);
                    $this.attr('data-rewrite-mode', attrHref);
                    
                }

            });
        }
	}); //- Document on ready [end]

	$(window).on('load', function() {

		$body.addClass('window-loaded');

        /* Parallax Skrollr - init */
            var skroll;
            if (!$html.hasClass('mobile') && !$html.hasClass('tablet') && $deviceWidth > 991) {
                skroll = skrollr.init({
                    forceHeight: false
                });
            }

        /* Execute function for css animate */
        cssAnimate();

	});//- Window on load [end]

    $(window).on('scroll', function() {

        /* Execute function for css animate */
        cssAnimate();

    }); //- Window on scroll [end]

    $(window).on('resizeend', function() {

    }); //- window on resize [end]

}(jQuery))
