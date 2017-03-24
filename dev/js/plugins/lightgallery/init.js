/*
 1 - Gallery with custom transitions. The full list of available transition you can check here: http://sachinchoolur.github.io/lightGallery/demos/transitions.html
 2 - Type of easing to be used for css animations
 3 - Type of easing to be used for jquery animations
 4 - Transition duration (in ms).
 5 - Height of the gallery. ex: '100%' , '300px'
 6 - Width of the gallery. ex: '100%' , '300px'
 7 - Add custom class for gallery, can be used to set different style for different gallery
 8 - Starting animation class for the gallery.
 9 - Lightgallery backdrop transtion duration. Do not change the value of backdrop via css.
 10 - Delay for hiding gallery controls in ms
 11 - force lightgallery to use css left property instead of transform.
 12 - allows clicks on dimmer to close gallery.
 13 - If false, will disable the ability to loop back to the beginning of the gallery when on the last element.
 14 - Whether the LightGallery could be closed by pressing the "Esc" key.
 15 - Enable keyboard navigation
 16 - If false, prev/next buttons will not be displayed.
 17 - Enable slideEnd animation
 18 - If true, prev/next button will be hidden on first/last image.
 19 - Chane slide on mousewheel
 20 - You can specify where the sub-html should be appended. '.lg-sub-html' or '.lg-item'
 21 - number of preload slides. will exicute only after the current slide is fully loaded.
 ex:// you clicked on 4th image and if preload = 1 then 3rd slide and 5th slide will be loaded in the background after the 4th slide is fully loaded..
 if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded
 22 - Show Content once it is fully loaded
 23 - Custom selector property instead of just child. pass this to select same element ex : .class #id
 24 - custom html for next control
 25 - custom html for prev control
 26 - Allows to set which image/video should load initially
 27 - Set maximum width for iframe.
 28 - Enable download button. By default download url will be taken from data-src/href attribute but it supports only for modern browsers.
 If you want you can provide another url for download via data-download-url
 29 - Whether to show total number of images and index number of currently displayed image.
 30 - Where the counter should be appended
 31 - By setting the swipeThreshold (in px) you can set how far the user must swipe for the next/prev image.
 32 - Enables desktop mouse drag support
 33 - Enables touch support
 34 - LightGallery can be instantiated and launched programmatically by setting this option to true and populating dynamicEl option (see below) with the definitions of images.

 ===

 1a - Enable thumbnails for the gallery
 2a - Enable thumbnail animation.
 3a - Position of selected thumbnail. 'left' or 'middle' or 'right'
 4a - Width of each thumbnails.
 5a - Height of the thumbnail container including padding and border
 6a - Spacing between each thumbnails
 7a - Whether to display thumbnail toggle button.
 8a - Enables desktop mouse drag support for thumbnails.
 9a - Enables thumbnail touch/swipe support for touch devices
 10a - You can automatically load thumbnails for youtube videos from youtube by setting loadYoutubeThumbnail true
 11a - You can specify the thumbnail size by setting respective number.
 0 - 480x360 pixels -> Player Background Thumbnail
 1 - 120x90 pixels -> Start Thumbnail
 2 - 120x90 pixels -> Middle Thumbnail
 3 - 120x90 pixels -> End Thumbnail
 hqdefault - 480x360 pixels -> High Quality Thumbnail
 mqdefault - 320x180 pixels -> Medium Quality Thumbnail
 default - 120x90 pixels -> Normal Quality Thumbnail
 sddefault - 640x480 pixels -> Standard Definition Thumbnail
 maxresdefault - 1920x1080 pixels -> Maximum Resolution Thumbnail

 -- sddefault and maxresdefault are optional. which may or may not exist. --
 12a - You can automatically load thumbnails for vimeo videos from vimeo by setting loadYoutubeThumbnail true.
 13a - Thumbnail size for vimeo videos: 'thumbnail_large' or 'thumbnail_medium' or 'thumbnail_small'
 thumbnail_small - 100x75 pixels -> Samll size Thumbnail
 thumbnail_medium - 200x150 pixels -> Medium size Thumbnail
 thumbnail_large - 640x360 pixels -> Large size Thumbnail
 14a - You can automatically load thumbnails for dailymotion videos from dailymotion by setting loadYoutubeThumbnail true.

 ===

 1b - Enable gallery autoplay
 2b - The time (in ms) between each auto transition.
 3b - Enable autoplay progress bar
 4b - If false autoplay will be stopped after first user action
 5b - Show/hide autoplay controls.
 6b - Where the autoply controls should be appended.

 ===

 1c - Set limit for video maximal width.

 ===

 1d - Enable/Disable fullscreen mode

 ===

 1e - Enable/Disable zoom option
 2e - Value of zoom should be incremented/decremented
 3e - Some css styles will be added to the images if zoom is enabled. So it might conflict if you add some custom styles to the images such as the initial transition
 while opening the gallery. So you can delay adding zoom related styles to the images by changing the value of enableZoomAfter.


 ===

 HTML markup ex.

 <div class="_js-lightGallery">
 <a href="http://sachinchoolur.github.io/lightGallery/static/img/1.jpg" data-sub-html="Place for title">
 <img src="http://sachinchoolur.github.io/lightGallery/static/img/thumb-1.jpg" />
 </a>
 </div>

 ===

 For more info follow this url: http://sachinchoolur.github.io/lightGallery/

 */


(function ($) {
    "use strict";

    function validatedata($attr, $defaultValue) {
        "use strict";
        if ($attr !== undefined) {
            return $attr
        }
        return $defaultValue;
    }

    function parseBoolean(str, $defaultValue) {
        "use strict";
        if (str == 'true') {
            return true;
        } else if (str == "false") {
            return false;
        }
        return $defaultValue;
    }

    $(document).on('ready', function(){
        if ($().lightGallery){
            if ($('._js-lightGallery').length > 0){
                var $lightGallery = $('._js-lightGallery');
                $lightGallery.each(function(){
                    var $this = $(this);

                    // Lightgallery core

                    var _mode = validatedata($this.attr("data-mode"), 'lg-slide'), // *1
                        _cssEasing = validatedata($this.attr("data-cssEasing"), 'ease'), // *2
                        _jQueryEasing = validatedata($this.attr("data-jqEasing"), 'linear'), // *3
                        _speed = parseInt(validatedata($this.attr("data-speed"), 600), 0), // *4
                        _height = validatedata($this.attr("data-height"), '100%'), // *5
                        _width = validatedata($this.attr('data-width'), '100%'), // *6
                        _addClass = validatedata($this.attr('data-class'), ''), // *7
                        _startClass = validatedata($this.attr('data-startClass'), 'lg-start-zoom'), // *8
                        _backdropDuration = parseInt(validatedata($this.attr("data-backdropDuration"), 150), 0), // *9
                        _hideBarsDelay = parseInt(validatedata($this.attr("data-hideBarsDelay"), 6000), 0), // *10
                        _useLeft = parseBoolean($this.attr("data-useLeft"), false), // *11
                        _closable = parseBoolean($this.attr("data-closable"), true), // *12
                        _loop = parseBoolean($this.attr("data-loop"), true), // *13
                        _escKey = parseBoolean($this.attr("data-escKey"), true), // *14
                        _keyPress = parseBoolean($this.attr("data-keyPress"), true), // *15
                        _controls = parseBoolean($this.attr("data-controls"), true), // *16
                        _slideEndAnimatoin = parseBoolean($this.attr("data-slideEndAnimation"), true), // *17
                        _hideControlOnEnd = parseBoolean($this.attr("data-controlsStartEnd"), false), // *18
                        _mousewheel = parseBoolean($this.attr("data-mousewheel"), true), // *19
                        _appendSubHtmlTo = validatedata($this.attr('data-appendSubHtmlTo'), '.lg-sub-html'), // *20
                        _preload = parseInt(validatedata($this.attr("data-preload"), 1), 0), // *21
                        _showAfterLoad = parseBoolean($this.attr("data-showAfterLoad"), true), // *22
                        _selector = validatedata($this.attr('data-selector'), ''), // *23
                        _nextHTML = validatedata($this.attr('data-nextHTML'), ''), // *24
                        _prevHTML = validatedata($this.attr('data-prevHTML'), ''), // *25
                        _index = parseInt(validatedata($this.attr("data-index"), 0), 0), // *26
                        _iframeMaxWidth = validatedata($this.attr('data-iframeMaxWidth'), '100%'), // *27
                        _download = parseBoolean($this.attr("data-download"), true), // *28
                        _counter = parseBoolean($this.attr("data-counter"), true), // *29
                        _appendCounterTo = validatedata($this.attr('data-appendCounterTo'), '.lg-toolbar'), // *30
                        _swipeThreshold = parseInt(validatedata($this.attr("data-swipeThreshold"), 50), 0), // *31
                        _enableDrag = parseBoolean($this.attr("data-drag"), true), // *32
                        _enableTouch = parseBoolean($this.attr("data-touch"), true), // *33
                        _dynamic = parseBoolean($this.attr("data-dynamic"), false); // *34

                    // Thumbnail plugin

                    var _thumbnail = parseBoolean($this.attr("data-thumbnail"), true), // *1a
                        _animateThumb = parseBoolean($this.attr("data-animateThumb"), true), // *2a
                        _currentPagerPosition =  validatedata($this.attr('data-currentPagerPosition'), 'middle'), // *3a
                        _thumbWidth = parseInt(validatedata($this.attr("data-thumbWidth"), 100), 0), // *4a
                        _thumbContHeight = parseInt(validatedata($this.attr("data-thumbContHeight"), 100), 0), // *5a
                        _thumbMargin = parseInt(validatedata($this.attr("data-thumbMargin"), 5), 0), // *6a
                        _toogleThumb = parseBoolean($this.attr("data-toogleThumb"), true), // *7a
                        _enableThumbDrag = parseBoolean($this.attr("data-enableThumbDrag"), true), // *8a
                        _enableThumbSwipe = parseBoolean($this.attr("data-enableThumbSwipe"), true), // *9a
                        _loadYoutubeThumbnail = parseBoolean($this.attr("data-loadYoutubeThumbnail"), true),// *10a,
                        _youtubeThumbSize = parseInt(validatedata($this.attr("data-youtubeThumbSize"), 1), 0),// *11a,
                        _loadVimeoThumbnail = parseBoolean($this.attr("data-loadVimeoThumbnail"), true), // *12a
                        _vimeoThumbSize = validatedata($this.attr('data-vimeoThumbSize'), 'thumbnail_small'), // *13a
                        _loadDailymotionThumbnail = parseBoolean($this.attr("data-loadDailymotionThumbnail"), true); // *14a

                    // Autoplay plugin

                    var _autoplay = parseBoolean($this.attr("data-autoplay"), true), // *1b
                        _pause = parseInt(validatedata($this.attr("data-pause"), 5000), 0),// *2b
                        _progressBar = parseBoolean($this.attr("data-progressBar"), true), // *3b
                        _fourceAutoplay = parseBoolean($this.attr("data-fourceAutoplay"), false), // *4b
                        _autoplayControls = parseBoolean($this.attr("data-autoplayControls"), true), // *5b
                        _appendAutoplayControlsTo = validatedata($this.attr('data-appendAutoplayControlsTo'), '.lg-toolbar'); // *6b


                    // Video plugin

                    var _videoMaxWidth = validatedata($this.attr('data-videoMaxWidth'), '855'); // *1c

                    // Fullscreen plugin

                    var _fullScreen = parseBoolean($this.attr("data-fullScreen"), true); // *1d

                    // Zoom plugin

                    var _zoom = parseBoolean($this.attr("data-zoom"), true), // *1e
                        _scale = parseInt(validatedata($this.attr("data-scale"), 1), 0),// *2e
                        _enableZoomAfter = parseInt(validatedata($this.attr("data-enableZoomAfter"), 50), 0);// *3e


                    // Hash plugin

                    var _hash = parseBoolean($this.attr("data-hash"), false), // *1f
                        _galleryId = parseInt(validatedata($this.attr("data-galleryId"), 1), 0);// *3e


                    // Attributes

                    // Light Gallery init with default options

                    $this.lightGallery({
                        mode: _mode,
                        cssEasing : _cssEasing,
                        easing: _jQueryEasing,
                        speed: _speed,
                        height: _height,
                        width: _width,
                        addClass: _addClass,
                        startClass: _startClass,
                        backdropDuration: _backdropDuration,
                        hideBarsDelay: _hideBarsDelay,
                        useLeft: _useLeft,
                        closable: _closable,
                        loop: _loop,
                        escKey: _escKey,
                        keyPress: _keyPress,
                        controls: _controls,
                        slideEndAnimatoin: _slideEndAnimatoin,
                        hideControlOnEnd: _hideControlOnEnd,
                        mousewheel: _mousewheel,
                        appendSubHtmlTo: _appendSubHtmlTo,
                        preload: _preload,
                        showAfterLoad: _showAfterLoad,
                        selector: _selector,
                        nextHTML: _nextHTML,
                        prevHTML: _prevHTML,
                        index: _index,
                        iframeMaxWidth: _iframeMaxWidth,
                        download: _download,
                        counter: _counter,
                        appendCounterTo: _appendCounterTo,
                        swipeThreshold: _swipeThreshold,
                        enableDrag: _enableDrag,
                        enableTouch: _enableTouch,
                        dynamic: _dynamic,
                        thumbnail: _thumbnail,
                        animateThumb: _animateThumb,
                        currentPagerPosition: _currentPagerPosition,
                        thumbWidth: _thumbWidth,
                        thumbContHeight: _thumbContHeight,
                        thumbMargin: _thumbMargin,
                        toogleThumb: _toogleThumb,
                        enableThumbDrag: _enableThumbDrag,
                        enableThumbSwipe: _enableThumbSwipe,
                        loadYoutubeThumbnail: _loadYoutubeThumbnail,
                        youtubeThumbSize: _youtubeThumbSize,
                        loadVimeoThumbnail: _loadVimeoThumbnail,
                        vimeoThumbSize: _vimeoThumbSize,
                        loadDailymotionThumbnail: _loadDailymotionThumbnail,
                        autoplay: _autoplay,
                        pause: _pause,
                        progressBar: _progressBar,
                        fourceAutoplay: _fourceAutoplay,
                        autoplayControls: _autoplayControls,
                        appendAutoplayControlsTo: _appendAutoplayControlsTo,
                        videoMaxWidth: _videoMaxWidth,
                        fullScreen: _fullScreen,
                        zoom: _zoom,
                        scale: _scale,
                        enableZoomAfter: _enableZoomAfter,
                        hash: _hash,
                        galleryId: _galleryId
                    });
                });
            }
        }
    });

}(jQuery));
