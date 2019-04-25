"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UIView_1 = require("./UIView");
var MIOFoundation_1 = require("../MIOFoundation");
var MIOUI_CoreLayer_1 = require("./MIOUI_CoreLayer");
var platform_1 = require("../MIOCore/platform");
/**
 * Created by godshadow on 01/09/16.
 */
var UIScrollView = /** @class */ (function (_super) {
    __extends(UIScrollView, _super);
    function UIScrollView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pagingEnabled = false;
        _this.delegate = null;
        _this.scrolling = false;
        _this._showsVerticalScrollIndicator = true;
        _this._scrollEnable = true;
        _this.scrollTimer = null;
        _this.lastOffsetY = 0;
        _this.contentView = null;
        return _this;
    }
    Object.defineProperty(UIScrollView.prototype, "showsVerticalScrollIndicator", {
        get: function () { return this._showsVerticalScrollIndicator; },
        set: function (value) { this.setShowsVerticalScrollIndicator(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIScrollView.prototype, "scrollEnable", {
        get: function () { return this._scrollEnable; },
        set: function (value) { this.setScrollEnable(value); },
        enumerable: true,
        configurable: true
    });
    UIScrollView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setupLayer();
    };
    UIScrollView.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.setupLayer();
    };
    UIScrollView.prototype.setupLayer = function () {
        if (platform_1.MIOCoreDeviceOSString() == "ios")
            this.layer.style["-webkit-overflow-scrolling"] = "touch";
        var contentLayer = MIOUI_CoreLayer_1.UICoreLayerCreate();
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(contentLayer, "content-view");
        // contentLayer.style.position = "absolute";
        // contentLayer.style.width = "100%";
        // contentLayer.style.height = "100%";
        // contentLayer.style.overflow = "hidden";
        this.contentView = new UIView_1.UIView();
        this.contentView.initWithLayer(contentLayer, this);
        _super.prototype.addSubview.call(this, this.contentView);
        this.contentView.layer.addEventListener("wheel", this.scrollEventCallback.bind(this), true);
        this.layer.addEventListener("scroll", this.scrollEventCallback.bind(this), true);
        // if (MIOCoreDeviceOSString() == 'ios'){
        //     this.contentView.layer.addEventListener("touchstart", function(e){
        //     }, false);
        // }
        // FIX: Scroll event don't get fire when you scroll with a scrollbar because the system thinks that
        //      has to take care by himself to scroll a "prerender" page so if you have a dynamic page that 
        //      has to be notify when the user scrolls to load more content, you're out of luck. You code doesn't get call.
        //      The onwheel event, instead, fire an event becuase it's a hardware thing, not like the scrollbar...
        //
        // NOTE: Really, who the hell make this kind of crap implementation in the html???
    };
    UIScrollView.prototype.scrollEventCallback = function () {
        var offsetY = this.contentOffset.y;
        var deltaY = 0;
        if (offsetY < this.lastOffsetY)
            deltaY = offsetY - this.lastOffsetY;
        else if (offsetY > this.lastOffsetY)
            deltaY = this.lastOffsetY + offsetY;
        else
            return;
        console.log("Content Offset y: " + offsetY + " - delta y: " + deltaY);
        this.setNeedsDisplay();
        if (this.scrolling == false) {
            this.scrolling = true;
            this.didStartScroll();
        }
        if (this.scrollTimer != null)
            this.scrollTimer.invalidate();
        this.scrollTimer = MIOFoundation_1.MIOTimer.scheduledTimerWithTimeInterval(150, false, this, this.scrollEventStopCallback);
        this.didScroll(0, deltaY);
        this.lastOffsetY = this.contentOffset.y;
        if (this.delegate != null && typeof this.delegate.scrollViewDidScroll === "function")
            this.delegate.scrollViewDidScroll.call(this.delegate, this);
    };
    UIScrollView.prototype.scrollEventStopCallback = function (timer) {
        this.scrolling = false;
        this.didStopScroll();
    };
    UIScrollView.prototype.didStartScroll = function () {
        //console.log("START SCROLL");
    };
    UIScrollView.prototype.didScroll = function (deltaX, deltaY) {
        //console.log("DID SCROLL");
    };
    UIScrollView.prototype.didStopScroll = function () {
        //console.log("STOP SCROLL");
    };
    UIScrollView.prototype.setScrollEnable = function (value) {
        if (this._scrollEnable == value)
            return;
        this._scrollEnable = value;
        if (value == true) {
            this.contentView.layer.style.overflow = "scroll";
        }
        else {
            this.contentView.layer.style.overflow = "hidden";
        }
    };
    UIScrollView.prototype.setShowsVerticalScrollIndicator = function (value) {
        if (value == this._showsVerticalScrollIndicator)
            return;
        this._showsVerticalScrollIndicator = value;
        if (value == false) {
            this.layer.style.paddingRight = "20px";
        }
        else {
            this.layer.style.paddingRight = "";
        }
    };
    Object.defineProperty(UIScrollView.prototype, "contentOffset", {
        get: function () {
            var p = new MIOFoundation_1.MIOPoint(this.layer.scrollLeft, this.layer.scrollTop);
            return p;
        },
        set: function (point) {
            if (point.x > 0)
                this.layer.scrollLeft = point.x;
            if (point.y > 0)
                this.layer.scrollTop = point.y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIScrollView.prototype, "bounds", {
        get: function () {
            var p = this.contentOffset;
            return MIOFoundation_1.MIORect.rectWithValues(p.x, p.y, this.getWidth(), this.getHeight());
        },
        enumerable: true,
        configurable: true
    });
    UIScrollView.prototype.addSubview = function (view, index) {
        this.contentView.addSubview(view, index);
    };
    Object.defineProperty(UIScrollView.prototype, "contentSize", {
        set: function (size) {
            if (size.width > 0) {
                this.contentView.setWidth(size.width);
            }
            if (size.height > 0) {
                this.contentView.setHeight(size.height);
                // create markers for intersection observer (see fix note below)
                //this.createIntersectionObserverMarkers(size.height);
            }
        },
        enumerable: true,
        configurable: true
    });
    UIScrollView.prototype.layoutSubviews = function () {
        this.contentView.layoutSubviews();
    };
    UIScrollView.prototype.scrollToTop = function (animate) {
        // if (true)
        //     this.layer.style.transition = "scrollTop 0.25s";
        this.layer.scrollTop = 0;
    };
    UIScrollView.prototype.scrollToBottom = function (animate) {
        // if (true)
        //     this.layer.style.transition = "scrollTop 0.25s";
        this.layer.scrollTop = this.layer.scrollHeight;
    };
    UIScrollView.prototype.scrollToPoint = function (x, y, animate) {
        this.layer.scrollTop = y;
        this.lastOffsetY = y;
    };
    UIScrollView.prototype.scrollRectToVisible = function (rect, animate) {
        //TODO: Implement this
    };
    return UIScrollView;
}(UIView_1.UIView));
exports.UIScrollView = UIScrollView;
//# sourceMappingURL=UIScrollView.js.map