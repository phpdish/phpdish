"use_strict";

var Shira;
(function (Shira, $) {
    (function (ScrollFix) {
        /**
         * @constructor
         *
         * @param {HTMLElement} element DOM element that is going to be fixed
         * @param {Object}      options option map
         */
        ScrollFix.Watcher = function (element, options) {
            this.element = element;
            this.options = $.extend({}, ScrollFix.Watcher.defaults, options);

            $(element).data('shira.scrollfix', this);
        };

        ScrollFix.Watcher.defaults = {
            fixClass: 'scroll-fix',
            fixTop: 0,
            fixOffset: 0,
            unfixOffset: 0,
            onUpdateFixed: null,
            syncSize: true,
            syncPosition: true,
            style: true
        };

        ScrollFix.Watcher.prototype = {
            element: null,
            substitute: null,
            options: null,
            fixed: false,
            attached: false,

            /**
             * Get absolute X position of the given element
             *
             * @private
             *
             * @param {HTMLElement} elem
             * @returns {Number}
             */
            getElementX: function (elem) {
                var x = 0;
                do x += elem.offsetLeft;
                while (elem = elem.offsetParent);

                return x;
            },

            /**
             * Get absolute Y position of the given element
             *
             * @private
             *
             * @param {HTMLElement} elem
             * @returns {Number}
             */
            getElementY: function (elem) {
                var y = 0;
                do y += elem.offsetTop;
                while (elem = elem.offsetParent);

                return y;
            },

            /**
             * Fix the element
             */
            fix: function () {
                if (!this.fixed) {
                    // create the substitute
                    this.substitute = $(this.element.cloneNode(false))
                        .css('visibility', 'hidden')
                        .height($(this.element).height())
                        .insertAfter(this.element)[0]
                    ;

                    // add class and styles
                    if (this.options.style) {
                        $(this.element)
                            .css('position', 'fixed')
                            .css('top', this.options.fixTop + 'px')
                        ;
                    }
                    $(this.element).addClass(this.options.fixClass);
                    
                    // update state
                    this.fixed = true;

                    // dispatch event
                    this.dispatchEvent('fixed');
                }
            },

            /**
             * Update the fixed element
             *
             * @private
             */
            updateFixed: function () {
                // size
                if (this.options.syncSize) {
                    $(this.element)
                        .width($(this.substitute).width())
                    ;
                }

                // position
                if (this.options.syncPosition) {
                    var currentScrollLeft = $(window).scrollLeft();
                    var substituteLeftOffset = this.getElementX(this.substitute);

                    $(this.element).css('left', (substituteLeftOffset - currentScrollLeft) + 'px');
                }

                // callback (deprecated)
                if (null !== this.options.onUpdateFixed) {
                    this.options.onUpdateFixed(this);
                }

                // dispatch event
                this.dispatchEvent('update');
            },

            /**
             * Unfix the element
             */
            unfix: function () {
                if (this.fixed) {
                    // remove the substitute
                    $(this.substitute).remove();
                    this.substitute = null;

                    // reset applied styles and remove class
                    var cssReset = {};
                    if (this.options.syncPosition) {
                        cssReset.left = '';
                    }
                    if (this.options.syncSize) {
                        cssReset.width = '';
                    }
                    if (this.options.style) {
                        cssReset.position = '';
                        cssReset.top = '';
                    }
                    $(this.element)
                        .css(cssReset)
                        .removeClass(this.options.fixClass)
                    ;
                    
                    // update state
                    this.fixed = false;

                    // dispatch event
                    this.dispatchEvent('unfixed');
                }
            },

            /**
             * Attach the watcher
             */
            attach: function () {
                if (!this.attached) {
                    var that = this;

                    this.updateEventHandler = function () {
                        that.pulse();
                    };

                    $(window)
                        .scroll(this.updateEventHandler)
                        .resize(this.updateEventHandler)
                    ;

                    this.attached = true;
                    this.pulse();
                }
            },

            /**
             * Detach the watcher
             */
            detach: function () {
                if (this.attached) {
                    this.unfix();

                    $(window)
                        .unbind('scroll', this.updateEventHandler)
                        .unbind('resize', this.updateEventHandler)
                    ;

                    this.attached = false;
                }
            },

            /**
             * Pulse the watcher
             */
            pulse: function () {
                var currentScroll = $(window).scrollTop();

                if (this.fixed) {
                    if (
                        currentScroll <= this.getElementY(this.substitute) + this.options.unfixOffset
                        && !this.dispatchEvent('unfix').isDefaultPrevented()
                    ) {
                        this.unfix();
                    } else {
                        this.updateFixed();
                    }
                } else {
                    if (
                        currentScroll >= this.getElementY(this.element) + this.options.fixOffset
                        && !this.dispatchEvent('fix').isDefaultPrevented()
                    ) {
                        this.fix();
                        this.updateFixed();
                    }
                }
            },

            /**
             * Dispatch an event
             *
             * @private
             *
             * @param {String} type
             * @returns {jQuery.Event}
             */
            dispatchEvent: function (type) {
                var event = new $.Event(type + '.shira.scrollfix', {
                    watcher: this
                });

                $(this.element).trigger(event);

                return event;
            }
        };

        // jQuery methods

        /**
         * Attach a watcher to the matched element
         *
         * @param {Object} options watcher option map
         * @returns {jQuery}
         */
        $.fn.scrollFix = function (options) {
            if (this.length > 0) {
                new ScrollFix.Watcher(this[0], options).attach();
            }

            return this;
        };
    })(Shira.ScrollFix || (Shira.ScrollFix = {}));
})(Shira || (Shira = {}), jQuery);
