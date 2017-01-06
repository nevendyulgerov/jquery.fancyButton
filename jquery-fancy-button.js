var fancyButton = (function($) {
    var createInstance = function() {
        var selector    = null;
        var $selector   = null;
        var $style      = null;
        var hoverColor  = null;
        var slidesCount = 0;
        var duration    = 0;
        var timeOffset  = 0;

        var init = function(options) {
            var isValid =
                typeof options              === 'object' &&
                typeof options.selector     === 'string' &&
                typeof options.slidesCount  === 'number' &&
                typeof options.hoverColor   === 'string';

            if ( ! isValid ) {
                console.warn('Invalid initialization for fancyButton! Make sure to define a valid options object on initialization. Options object must include selector, slidesCount and hoverColor.');
                return false;
            }

            // set global variables
            selector    = options.selector;
            $selector   = $(selector);
            $style      = $selector[0].style;
            slidesCount = options.slidesCount;
            hoverColor  = options.hoverColor;
            duration    = typeof options.duration === 'number' ? options.duration : 0;
            timeOffset  = typeof options.timeOffset === 'number' ? options.timeOffset : 100;

            // ensure selector has position 'relative'
            $style.position = 'relative';

            // ensure selector has overflow 'hidden'
            $style.overflow = 'hidden';

            var width       = $selector.width();
            var slideWidth  = Math.floor(width / slidesCount);

            var html        = '';
            var dataContent = $selector.data('content');
            var content     = typeof dataContent !== 'undefined' ? '<span style="display:block; position:absolute; z-index: 100;">' + $selector.data('content') + '</span>' : '';

            for ( var i = 0, j = slidesCount; i < j; i++ ) {
                var style = 'position: absolute;width:' + slideWidth + 'px;top: 0px; left:' + (slideWidth * i) + 'px; height: 100%;background-color: ' + hoverColor + ';';
                html += '<div class="slide" style="' + style + '"></div>';
            }

            $selector.append(html);
            $selector.append(content);
            initEventHandler();
        };

        var initEventHandler = function() {
            $selector.hover(function() {
                moveSlides('up', timeOffset);
            }, function() {
                moveSlides('down', timeOffset);
            });
        };

        var moveSlideItem = function(index, direction, delay) {
            var $slides      = $selector.find('.slide');
            var $slide       = $slides.eq(index);
            var offset       = 20;
            var actualOffset = ($selector.height() + offset) * 3;
            var top          = direction === 'up' ? '-' + actualOffset + 'px' : '0px';

            setTimeout(function() {
                $slide.velocity({
                    top: top
                }, {
                    duration: duration,
                    complete: function() {}
                });
            }, delay);
        };

        var moveSlides = function(direction, timeOffset) {
            var $slides = $selector.find('.slide');
            var index   = 0;
            var delay   = 0;
            var i, j;

            if ( direction === 'up' ) {
                for ( i = 0, j = $slides.length; i < j; i++ ) {
                    index = i + 1;
                    delay = timeOffset * index;
                    moveSlideItem(i, direction, delay);
                }
            } else {
                index = 1;
                for ( i = $slides.length - 1, j = 0; i >= j; i-- ) {
                    delay = timeOffset * index;
                    moveSlideItem(i, direction, delay);
                    index++;
                }
            }
        };

        return {
            init: init
        }
    };

    return {
        createInstance: createInstance
    };
})( jQuery );