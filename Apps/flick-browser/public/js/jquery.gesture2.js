/*!
* jQueryTouch v0.0.6
* https://github.com/a-fung/jQueryTouch
*
* Copyright 2012 Man Kwan Liu
* Released under the Apache License Version 2.0
* http://www.apache.org/licenses/
*
* Date: Wed Oct 2012 23:14:09 GMT-0700 (Pacific Daylight Time)
*/
(function($) {
    $.fn.gesture = function(c) {
        if (!c || typeof(c) != "object") {
            c = {}
        }
        c = $.extend({
            drag: true,
            scale: true,
            rotate: true,
            touchtarget: null
        }, c);
        var d = c.touchtarget ? $(c.touchtarget): this, _this = this, in_drag = false, in_gesture = false, original_x = 0, original_y = 0, original_css = "", __getvalue__ = function(a) {
            return (typeof(a) == "function") ? a() : a
        };
        var e = function(a) {
            if (in_gesture ||!__getvalue__(c.drag))
                return;
            if (in_drag) {
                var b = ((a.touches.length == 0) ? a.pageX : a.touches[0].pageX) - original_x, dy = ((a.touches.length == 0) ? a.pageY : a.touches[0].pageY) - original_y, new_css = "translate(" + b + "px," + dy + "px) " + original_css;
                _this.__transform__(new_css)
            } else {
                if (in_drag = a.type == "_gesture2_touch_start") {
                    original_x = a.touches[0].pageX;
                    original_y = a.touches[0].pageY;
                    original_css = _this.__transform__();
                    if (!original_css || original_css == "none")
                        original_css = ""
                }
            }
            if (a.type == "_gesture2_touch_end") {
                in_drag = false
            }
        };
        var f = function(a) {
            in_drag = false;
            if (!__getvalue__(c.scale)&&!__getvalue__(c.rotate))
                return;
            if (in_gesture) {
                var b = a.pageX - original_x, dy = a.pageY - original_y, new_css = (__getvalue__(c.drag) ? ("translate(" + a.pageX + "px," + a.pageY + "px) ") : ("translate(" + original_x + "px," + original_y + "px) ")) + (__getvalue__(c.scale) ? ("scale(" + a.scale + ")") : "") + (__getvalue__(c.rotate) ? ("rotate(" + a.rotation + "rad) ") : "") + "translate(" + ( - original_x) + "px," + ( - original_y) + "px) " + original_css;
                _this.__transform__(new_css)
            } else {
                in_gesture = true;
                original_css = _this.__transform__();
                original_x = a.pageX;
                original_y = a.pageY;
                if (!original_css || original_css == "none")
                    original_css = ""
            }
            if (a.type == "_gesture2_gesture_end") {
                in_gesture = false
            }
        };
        d.gestureInit({
            prefix: "_gesture2_",
            gesture_prefix: "_gesture2_"
        });
        d.on("_gesture2_touch_start", e);
        d.on("_gesture2_touch_move", e);
        d.on("_gesture2_touch_end", e);
        d.on("_gesture2_gesture_start", f);
        d.on("_gesture2_gesture_move", f);
        d.on("_gesture2_gesture_end", f);
        return this
    };
    $.fn.__transform__ = function(a) {
        if (typeof(a) == "undefined")
            return this.css("transform");
        if (typeof(a) == "string") {
            if (!this.data("__offset__")) {
                this.css("transform", "");
                this.css("-moz-transform", "");
                this.css("-ms-transform", "");
                this.css("-o-transform", "");
                this.css("-webkit-transform", "");
                var b = ( - this.offset().left) + "px " + ( - this.offset().top) + "px";
                this.css("transform-origin", b);
                this.css("-moz-transform-origin", b);
                this.css("-ms-transform-origin", b);
                this.css("-o-transform-origin", b);
                this.css("-webkit-transform-origin", b);
                this.data("__offset__", b)
            }
            this.css("transform", a);
            this.css("-moz-transform", a);
            this.css("-ms-transform", a);
            this.css("-o-transform", a);
            this.css("-webkit-transform", a)
        }
        return this
    }
})(jQuery);