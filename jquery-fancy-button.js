;(function($) {

    $.fn.fancyButton = function() {

        var base = {
            selector: null,
            $selector: null,
            style: null,
            hoverColor: null,
            slidesCount: 0,
            duration: 0,
            timeOffset: 0,
            slideSelector: 'slide',

            init: function(args) {

                var isValid =
                    typeof args              === 'object' &&
                    typeof args.selector     === 'string' &&
                    typeof args.slidesCount  === 'number' &&
                    typeof args.hoverColor   === 'string';

                // validate
                if ( ! isValid ) {
                    console.warn('Invalid initialization for fancyButton! Make sure to define a valid options object on initialization. Options object must include selector, slidesCount and hoverColor.');
                    return false;
                }

                var selector     = args.selector;
                var $selector    = $(selector);
                var style        = $selector[0].style;
                var slidesCount  = args.slidesCount;

                // set global variables
                this.selector    = selector;
                this.$selector   = $selector;
                this.style       = style;
                this.slidesCount = slidesCount;
                this.hoverColor  = args.hoverColor;
                this.duration    = typeof args.duration === 'number' ? args.duration : 0;
                this.timeOffset  = typeof args.timeOffset === 'number' ? args.timeOffset : 100;

                // ensure selector has position 'relative'
                style.position = 'relative';

                // ensure selector has overflow 'hidden'
                style.overflow = 'hidden';

                // insert slides
                this.insertSlides();

                // init event handler
                this.initEventHandler();
            },
            getSlideWidth: function() {
                return Math.floor(this.$selector.width() / this.slidesCount);
            },
            insertSlides: function() {
                var $selector      = this.$selector;
                var slidesCount    = this.slidesCount;
                var slideWidth     = this.getSlideWidth();
                var hoverColor     = this.hoverColor;
                var slideSelector  = this.slideSelector;

                var html        = '';
                var dataContent = $selector.data('content');
                var slideStyle  = 'display:block; position:absolute; z-index:100;';
                var content     = typeof dataContent !== 'undefined' ? '<span style="' + slideStyle + '">' + $selector.data('content') + '</span>' : '';

                for ( var i = 0, j = slidesCount; i < j; i++ ) {
                    var styleAttrs = 'position: absolute;width:' + slideWidth + 'px;top: 0px; left:' + (slideWidth * i) + 'px; height: 100%;background-color: ' + hoverColor + ';';
                    html += '<div class="' + slideSelector + '" style="' + styleAttrs + '"></div>';
                }

                $selector.append(html);
                $selector.append(content);
            },
            initEventHandler: function() {
                var that       = this;
                var timeOffset = that.timeOffset;

                that.$selector.hover(function() {
                    that.moveSlides({
                        direction: 'up',
                        timeOffset: timeOffset
                    });
                }, function() {
                    that.moveSlides({
                        direction: 'down',
                        timeOffset: timeOffset
                    });
                });
            },
            moveSlides: function(args) {
                var that          = this;
                var direction     = args.direction;
                var timeOffset    = args.timeOffset;
                var $selector     = this.$selector;
                var slideSelector = '.' + this.slideSelector;
                var $slides       = $selector.find(slideSelector);
                var index         = 0;
                var delay         = 0;
                var i, j;

                if ( direction === 'up' ) {
                    for ( i = 0, j = $slides.length; i < j; i++ ) {
                        index = i + 1;
                        delay = timeOffset * index;
                        that.moveSlideItem({
                            index: i,
                            direction: direction,
                            delay: delay
                        });
                    }
                } else {
                    index = 1;
                    for ( i = $slides.length - 1, j = 0; i >= j; i-- ) {
                        delay = timeOffset * index;
                        that.moveSlideItem({
                            index: i,
                            direction: direction,
                            delay: delay
                        });
                        index++;
                    }
                }
            },
            moveSlideItem: function(args) {
                var $selector     = this.$selector;
                var duration      = this.duration;
                var index         = args.index;
                var direction     = args.direction;
                var delay         = args.delay;
                var slideSelector = '.' + this.slideSelector;

                var $slides      = $selector.find(slideSelector);
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
            },
            getCopy: function() {
                return $.extend({}, this);
            }
        };

        var createButton = function(args) {
            var instance = base.getCopy();

            instance.init(args);
        };

        return {
            createButton: createButton
        };
    };

})( jQuery );