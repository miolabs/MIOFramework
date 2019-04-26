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
var MIOUI_CoreLayer_1 = require("./MIOUI_CoreLayer");
var platform_1 = require("../MIOCore/platform");
var _1 = require(".");
var mio_foundation_web_1 = require("mio-foundation-web");
/**
 * Created by godshadow on 11/3/16.
 */
function MUICoreViewSearchViewTag(view, tag) {
    if (view.tag == tag)
        return view;
    for (var index = 0; index < view.subviews.length; index++) {
        var v = view.subviews[index];
        v = MUICoreViewSearchViewTag(v, tag);
        if (v != null)
            return v;
    }
    return null;
}
var UIView = /** @class */ (function (_super) {
    __extends(UIView, _super);
    function UIView(layerID) {
        var _this = _super.call(this) || this;
        _this.layerID = null;
        _this.layer = null;
        _this.layerOptions = null;
        _this.alpha = 1;
        _this.tag = 0;
        _this._parent = null;
        _this._viewIsVisible = false;
        _this._needDisplay = true;
        _this._isLayerInDOM = false;
        _this._subviews = [];
        _this._window = null;
        _this._outlets = {};
        _this._hidden = false;
        _this.x = 0;
        _this.y = 0;
        _this.width = 0;
        _this.height = 0;
        _this._userInteraction = false;
        _this.isMouseDown = false;
        _this.gestureRecognizers = [];
        _this.layerID = layerID ? layerID : MIOUI_CoreLayer_1.UICoreLayerIDFromObject(_this);
        return _this;
    }
    Object.defineProperty(UIView.prototype, "parent", {
        get: function () { return this._parent; },
        set: function (view) { this.setParent(view); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "subviews", {
        get: function () {
            return this._subviews;
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.init = function () {
        this.layer = MIOUI_CoreLayer_1.UICoreLayerCreate(this.layerID);
        //UICoreLayerAddStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "view");
        //this.layer.style.position = "absolute";
        // this.layer.style.top = "0px";
        // this.layer.style.left = "0px";
        //this.layer.style.width = "100%";
        //this.layer.style.height = "100%";
        //this.layer.style.background = "rgb(255, 255, 255)";                
    };
    UIView.prototype.initWithFrame = function (frame) {
        this.layer = MIOUI_CoreLayer_1.UICoreLayerCreate(this.layerID);
        this.layer.style.position = "absolute";
        this.setX(frame.origin.x);
        this.setY(frame.origin.y);
        this.setWidth(frame.size.width);
        this.setHeight(frame.size.height);
    };
    UIView.prototype.initWithLayer = function (layer, owner, options) {
        this.layer = layer;
        this.layerOptions = options;
        var layerID = this.layer.getAttribute("id");
        if (layerID != null)
            this.layerID = layerID;
        var tag = this.layer.getAttribute("data-tag");
        this.tag = tag || 0;
        this._addLayerToDOM();
        // Add subviews
        if (this.layer.childNodes.length > 0) {
            for (var index = 0; index < this.layer.childNodes.length; index++) {
                var subLayer = this.layer.childNodes[index];
                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION")
                    continue;
                var className = subLayer.getAttribute("data-class");
                if (className == null || className.length == 0)
                    className = "UIView";
                var sv = platform_1.MIOClassFromString(className);
                sv.initWithLayer(subLayer, this);
                this._linkViewToSubview(sv);
            }
        }
    };
    UIView.prototype.copy = function () {
        var objLayer = this.layer.cloneNode(true);
        var className = this.getClassName();
        MIOLog("UIView:copy:Copying class name " + className);
        if (className == null)
            throw Error("UIView:copy: Error classname is null");
        var view = platform_1.MIOClassFromString(className);
        view.initWithLayer(objLayer, null);
        return view;
    };
    UIView.prototype.awakeFromHTML = function () { };
    UIView.prototype.setParent = function (view) {
        this.willChangeValue("parent");
        this._parent = view;
        this.didChangeValue("parent");
    };
    UIView.prototype.addSubLayer = function (layer) {
        this.layer.innerHTML = layer.innerHTML;
    };
    UIView.prototype._linkViewToSubview = function (view) {
        if ((view instanceof UIView) == false)
            throw new Error("_linkViewToSubview: Trying to add an object that is not a view");
        this.subviews.push(view);
    };
    UIView.prototype.addSubview = function (view, index) {
        if ((view instanceof UIView) == false)
            throw new Error("addSubview: Trying to add an object that is not a view");
        view.setParent(this);
        if (index == null)
            this.subviews.push(view);
        else
            this.subviews.splice(index, 0, view);
        view._addLayerToDOM(index);
        view.setNeedsDisplay();
    };
    UIView.prototype.insertSubviewAboveSubview = function (view, siblingSubview) {
        view.setParent(this);
        var index = this.subviews.indexOf(siblingSubview);
        this.subviews.splice(index, 0, view);
        this.addLayerBeforeLayer(view.layer, siblingSubview.layer);
        view.setNeedsDisplay();
    };
    UIView.prototype.addLayerBeforeLayer = function (newLayer, layer) {
        if (newLayer._isLayerInDOM == true)
            return;
        if (layer == null || newLayer == null)
            return;
        this.layer.insertBefore(newLayer, layer);
        newLayer._isLayerInDOM = true;
    };
    UIView.prototype._addLayerToDOM = function (index) {
        if (this._isLayerInDOM == true)
            return;
        if (this.layer == null || this.parent == null)
            return;
        if (index == null)
            this.parent.layer.appendChild(this.layer);
        else
            this.parent.layer.insertBefore(this.layer, this.parent.layer.children[0]);
        this._isLayerInDOM = true;
    };
    UIView.prototype.removeFromSuperview = function () {
        if (this.parent == null)
            return;
        var subviews = this.parent._subviews;
        var index = subviews.indexOf(this);
        subviews.splice(index, 1);
        if (this._isLayerInDOM == false)
            return;
        this.parent.layer.removeChild(this.layer);
        this._isLayerInDOM = false;
    };
    UIView.prototype._removeLayerFromDOM = function () {
        if (this._isLayerInDOM == false)
            return;
        this.layer.removeChild(this.layer);
        this._isLayerInDOM = false;
    };
    UIView.prototype._removeAllSubviews = function () {
        var node = this.layer;
        while (this.layer.hasChildNodes()) { // selected elem has children
            if (node.hasChildNodes()) { // current node has children
                node = node.lastChild; // set current node to child
            }
            else { // last child found
                node = node.parentNode; // set node to parent
                node.removeChild(node.lastChild); // remove last node
            }
        }
    };
    UIView.prototype.setViewIsVisible = function (value) {
        this._viewIsVisible = true;
        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            v.setViewIsVisible(value);
        }
    };
    UIView.prototype.viewWithTag = function (tag) {
        // TODO: Use also the view tag component
        var view = MIOViewSearchViewTag(this, tag);
        return view;
    };
    UIView.prototype.layoutSubviews = function () {
        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            if ((v instanceof UIView) == false)
                throw new Error("layout: Trying to layout an object that is not a view");
            v.setNeedsDisplay();
        }
    };
    UIView.prototype.setNeedsDisplay = function () {
        this._needDisplay = true;
        if (this._viewIsVisible == false)
            return;
        if (this.hidden == true)
            return;
        this._needDisplay = false;
        this.layoutSubviews();
        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            if (!(v instanceof UIView)) {
                console.log("ERROR: trying to call setNeedsDisplay: in object that it's not a view");
            }
            else
                v.setNeedsDisplay();
        }
    };
    UIView.prototype.layerWithItemID = function (itemID) {
        return UILayerSearchElementByID(this.layer, itemID);
    };
    UIView.prototype.setHidden = function (hidden) {
        this._hidden = hidden;
        if (this.layer == null)
            return;
        if (hidden)
            this.layer.style.display = "none";
        else
            this.layer.style.display = "";
    };
    Object.defineProperty(UIView.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
            this.setHidden(value);
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.setBackgroundColor = function (color) {
        this.layer.style.backgroundColor = "#" + color;
    };
    UIView.prototype.setBackgroundRGBColor = function (r, g, b, a) {
        if (a == null) {
            var value = "rgb(" + r + ", " + g + ", " + b + ")";
            this.layer.style.backgroundColor = value;
        }
        else {
            var value = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
            this.layer.style.backgroundColor = value;
        }
    };
    UIView.prototype.getBackgroundColor = function () {
        var cs = document.defaultView.getComputedStyle(this.layer, null);
        var bg = cs.getPropertyValue('background-color');
        return bg;
    };
    UIView.prototype.setAlpha = function (alpha) {
        this.willChangeValue("alpha");
        this.alpha = alpha;
        this.didChangeValue("alpha");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "opacity", "EndValue": alpha };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.opacity = alpha;
        }
    };
    UIView.prototype.setX = function (x) {
        this.willChangeValue("frame");
        this.x = x;
        this.didChangeValue("frame");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "left", "EndValue": x + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.left = x + "px";
        }
    };
    UIView.prototype.getX = function () {
        var x = this._getIntValueFromCSSProperty("left");
        return x;
    };
    UIView.prototype.setY = function (y) {
        this.willChangeValue("frame");
        this.y = y;
        this.didChangeValue("frame");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "top", "EndValue": y + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.top = y + "px";
        }
    };
    UIView.prototype.getY = function () {
        var y = this._getIntValueFromCSSProperty("top");
        return y;
    };
    UIView.prototype.setWidth = function (w) {
        this.willChangeValue("frame");
        this.width = w;
        this.didChangeValue("frame");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "width", "EndValue": w + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.width = w + "px";
        }
    };
    UIView.prototype.getWidth = function () {
        var w1 = this.layer.clientWidth;
        var w2 = this._getIntValueFromCSSProperty("width");
        var w = Math.max(w1, w2);
        if (isNaN(w))
            w = 0;
        return w;
    };
    UIView.prototype.setHeight = function (height) {
        this.willChangeValue("height");
        this.height = height;
        this.didChangeValue("height");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "height", "EndValue": height + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.height = height + "px";
        }
    };
    UIView.prototype.getHeight = function () {
        var h = this.height;
        if (h == 0)
            h = this.layer.clientHeight;
        else {
            if (h == 0)
                h = this.layer.height;
            else if (h == 0)
                h = this._getIntValueFromCSSProperty("height");
        }
        return h;
    };
    UIView.prototype.setFrameComponents = function (x, y, w, h) {
        this.setX(x);
        this.setY(y);
        this.setWidth(w);
        this.setHeight(h);
    };
    UIView.prototype.setFrame = function (frame) {
        this.willChangeValue("frame");
        this.setFrameComponents(frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
        this.didChangeValue("frame");
    };
    Object.defineProperty(UIView.prototype, "frame", {
        get: function () {
            return MIORect.rectWithValues(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "bounds", {
        get: function () {
            return MIORect.rectWithValues(0, 0, this.getWidth(), this.getHeight());
        },
        enumerable: true,
        configurable: true
    });
    //
    // CSS Subsystem
    //
    UIView.prototype._getValueFromCSSProperty = function (property) {
        var v = window.getComputedStyle(this.layer, null).getPropertyValue(property);
        return v;
    };
    UIView.prototype._getIntValueFromCSSProperty = function (property) {
        var v = this._getValueFromCSSProperty(property);
        var r = v.hasSuffix("px");
        if (r == true)
            v = v.substring(0, v.length - 2);
        else {
            var r2 = v.hasSuffix("%");
            if (r2 == true)
                v = v.substring(0, v.length - 1);
        }
        return parseInt(v);
    };
    Object.defineProperty(UIView.prototype, "userInteraction", {
        set: function (value) {
            if (value == this._userInteraction)
                return;
            if (value == true) {
                this.layer.addEventListener("mousedown", this.mouseDownEvent.bind(this));
                this.layer.addEventListener("mouseup", this.mouseUpEvent.bind(this));
            }
            else {
                this.layer.removeEventListener("mousedown", this.mouseDownEvent);
                this.layer.removeEventListener("mouseup", this.mouseUpEvent);
            }
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.mouseDownEvent = function (ev) {
        var e = _1.UIEvent.eventWithSysEvent(ev);
        this.touchesBeganWithEvent(null, e);
        this.isMouseDown = true;
        window.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
        ev.preventDefault(); // Prevent selection
    };
    UIView.prototype.mouseUpEvent = function (ev) {
        this.isMouseDown = false;
        var e = _1.UIEvent.eventWithSysEvent(ev);
        this.touchesEndedWithEvent(null, e);
    };
    UIView.prototype.mouseMoveEvent = function (ev) {
        if (this.isMouseDown == false)
            return;
        if (ev.buttons == 0) {
            window.removeEventListener("mousemove", this.mouseMoveEvent);
            this.isMouseDown = false;
            var e = _1.UIEvent.eventWithSysEvent(ev);
            this.touchesEndedWithEvent(null, e);
        }
        else {
            var e = _1.UIEvent.eventWithSysEvent(ev);
            this.touchesMovedWithEvent(null, e);
        }
    };
    UIView.prototype.touchesBeganWithEvent = function (touches, ev) {
        for (var index = 0; index < this.gestureRecognizers.length; index++) {
            var gr = this.gestureRecognizers[index];
            gr._viewTouchesBeganWithEvent(touches, ev);
        }
    };
    UIView.prototype.touchesMovedWithEvent = function (touches, ev) {
        for (var index = 0; index < this.gestureRecognizers.length; index++) {
            var gr = this.gestureRecognizers[index];
            gr._viewTouchesMovedWithEvent(touches, ev);
        }
    };
    UIView.prototype.touchesEndedWithEvent = function (touches, ev) {
        for (var index = 0; index < this.gestureRecognizers.length; index++) {
            var gr = this.gestureRecognizers[index];
            gr._viewTouchesEndedWithEvent(touches, ev);
        }
    };
    UIView.prototype.addGestureRecognizer = function (gesture) {
        if (this.gestureRecognizers.containsObject(gesture))
            return;
        gesture.view = this;
        this.gestureRecognizers.addObject(gesture);
        this.userInteraction = true;
    };
    UIView.prototype.removeGestureRecognizer = function (gesture) {
        gesture.view = null;
        this.gestureRecognizers.removeObject(gesture);
    };
    UIView.animateWithDuration = function (duration, target, animations, completion) {
        UIView.animationsChanges = [];
        UIView.animationsViews = [];
        UIView.animationTarget = target;
        UIView.animationCompletion = completion;
        animations.call(target);
        for (var index = 0; index < UIView.animationsChanges.length; index++) {
            var anim = UIView.animationsChanges[index];
            var view = anim["View"];
            var key = anim["Key"];
            var value = anim["EndValue"];
            view.layer.style.transition = key + " " + duration + "s";
            switch (key) {
                case "opacity":
                    view.layer.style.opacity = value;
                    break;
                case "x":
                    view.layer.style.left = value;
                    break;
                case "y":
                    view.layer.style.top = value;
                    break;
                case "width":
                    view.layer.style.width = value;
                    break;
                case "height":
                    view.layer.style.height = value;
                    break;
            }
            UIView.addTrackingAnimationView(view);
        }
        UIView.animationsChanges = null;
    };
    UIView.addTrackingAnimationView = function (view) {
        var index = UIView.animationsViews.indexOf(view);
        if (index > -1)
            return;
        UIView.animationsViews.addObject(view);
        view.layer.animationParams = { "View": view };
        view.layer.addEventListener("webkitTransitionEnd", UIView.animationDidFinish);
    };
    UIView.removeTrackingAnimationView = function (view) {
        var index = UIView.animationsViews.indexOf(view);
        if (index == -1)
            return;
        UIView.animationsViews.removeObject(view);
        view.layer.removeEventListener("webkitTransitionEnd", UIView.animationDidFinish);
        view.layer.style.transition = "none";
        view.setNeedsDisplay();
    };
    UIView.animationDidFinish = function (event) {
        var view = event.target.animationParams["View"];
        UIView.removeTrackingAnimationView(view);
        if (UIView.animationsViews.length > 0)
            return;
        UIView.animationsChanges = null;
        UIView.animationsViews = null;
        if (UIView.animationTarget != null && UIView.animationCompletion != null)
            UIView.animationCompletion.call(UIView.animationTarget);
        UIView.animationTarget = null;
        UIView.animationCompletion = null;
    };
    //
    // Animations
    //
    UIView.animationsChanges = null;
    UIView.animationsViews = null;
    UIView.animationTarget = null;
    UIView.animationCompletion = null;
    return UIView;
}(mio_foundation_web_1.NSObject));
exports.UIView = UIView;
//# sourceMappingURL=UIView.js.map