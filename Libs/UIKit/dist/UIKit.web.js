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
var mio_foundation_web_1 = require("mio-foundation-web");
var mio_foundation_web_2 = require("mio-foundation-web");
var mio_foundation_web_3 = require("mio-foundation-web");
var mio_foundation_web_4 = require("mio-foundation-web");
var mio_foundation_web_5 = require("mio-foundation-web");
var mio_foundation_web_6 = require("mio-foundation-web");
var mio_foundation_web_7 = require("mio-foundation-web");
var mio_foundation_web_8 = require("mio-foundation-web");
var mio_foundation_web_9 = require("mio-foundation-web");
var mio_foundation_web_10 = require("mio-foundation-web");
var mio_foundation_web_11 = require("mio-foundation-web");
var mio_foundation_web_12 = require("mio-foundation-web");
var mio_foundation_web_13 = require("mio-foundation-web");
var mio_foundation_web_14 = require("mio-foundation-web");
var mio_foundation_web_15 = require("mio-foundation-web");
var mio_foundation_web_16 = require("mio-foundation-web");
var mio_foundation_web_17 = require("mio-foundation-web");
var mio_foundation_web_18 = require("mio-foundation-web");
var mio_foundation_web_19 = require("mio-foundation-web");
exports._MUICoreLayerIDCount = 0;
function MUICoreLayerIDFromObject(object) {
    var classname = object.constructor.name.substring(3);
    return MUICoreLayerIDFromClassname(classname);
}
exports.MUICoreLayerIDFromObject = MUICoreLayerIDFromObject;
function MUICoreLayerIDFromClassname(classname) {
    var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var random = "";
    for (var count = 0; count < 4; count++) {
        var randomNumber = Math.floor(Math.random() * 16);
        var randomDigit = digits[randomNumber];
        random += randomDigit;
    }
    var layerID = classname.toLowerCase() + "_" + random;
    exports._MUICoreLayerIDCount++;
    return layerID;
}
exports.MUICoreLayerIDFromClassname = MUICoreLayerIDFromClassname;
function MUICoreLayerCreate(layerID) {
    var layer = document.createElement("DIV");
    if (layerID != null)
        layer.setAttribute("id", layerID);
    //layer.style.position = "absolute";
    return layer;
}
exports.MUICoreLayerCreate = MUICoreLayerCreate;
function MUICoreLayerAddSublayer(layer, subLayer) {
    layer.appendChild(subLayer);
}
exports.MUICoreLayerAddSublayer = MUICoreLayerAddSublayer;
function MUICoreLayerRemoveSublayer(layer, subLayer) {
    layer.removeChild(subLayer);
}
exports.MUICoreLayerRemoveSublayer = MUICoreLayerRemoveSublayer;
function MUICoreLayerCreateWithStyle(style, layerID) {
    var layer = MUICoreLayerCreate(layerID);
    MUICoreLayerAddStyle(layer, style);
    return layer;
}
exports.MUICoreLayerCreateWithStyle = MUICoreLayerCreateWithStyle;
function MUICoreLayerAddStyle(layer, style) {
    layer.classList.add(style);
}
exports.MUICoreLayerAddStyle = MUICoreLayerAddStyle;
function MUICoreLayerRemoveStyle(layer, style) {
    layer.classList.remove(style);
}
exports.MUICoreLayerRemoveStyle = MUICoreLayerRemoveStyle;
function MUICoreLayerSearchElementByAttribute(layer, key) {
    if (layer.tagName != "DIV" && layer.tagName != "INPUT" && layer.tagName != "SECTION")
        return null;
    if (layer.getAttribute(key) == "true")
        return layer;
    var elementFound = null;
    for (var count = 0; count < layer.childNodes.length; count++) {
        var l = layer.childNodes[count];
        elementFound = MUICoreLayerSearchElementByAttribute(l, key);
        if (elementFound != null)
            return elementFound;
    }
    return null;
}
exports.MUICoreLayerSearchElementByAttribute = MUICoreLayerSearchElementByAttribute;
function MUICoreLayerSearchElementByID(layer, elementID) {
    if (layer.tagName != "DIV" && layer.tagName != "INPUT" && layer.tagName != "SECTION")
        return null;
    if (layer.getAttribute("data-outlet") == elementID)
        return layer;
    // Deprecated. For old code we still mantein
    if (layer.getAttribute("id") == elementID)
        return layer;
    var elementFound = null;
    for (var count = 0; count < layer.childNodes.length; count++) {
        var l = layer.childNodes[count];
        elementFound = MUICoreLayerSearchElementByID(l, elementID);
        if (elementFound != null)
            return elementFound;
    }
    return null;
}
exports.MUICoreLayerSearchElementByID = MUICoreLayerSearchElementByID;
function MUICoreLayerGetFirstElementWithTag(layer, tag) {
    var foundLayer = null;
    if (layer.childNodes.length > 0) {
        var index = 0;
        foundLayer = layer.childNodes[index];
        while (foundLayer.tagName != tag) {
            index++;
            if (index >= layer.childNodes.length) {
                foundLayer = null;
                break;
            }
            foundLayer = layer.childNodes[index];
        }
    }
    return foundLayer;
}
exports.MUICoreLayerGetFirstElementWithTag = MUICoreLayerGetFirstElementWithTag;
/*
    ANIMATIONS
 */
var MUIAnimationType;
(function (MUIAnimationType) {
    MUIAnimationType[MUIAnimationType["None"] = 0] = "None";
    MUIAnimationType[MUIAnimationType["BeginSheet"] = 1] = "BeginSheet";
    MUIAnimationType[MUIAnimationType["EndSheet"] = 2] = "EndSheet";
    MUIAnimationType[MUIAnimationType["Push"] = 3] = "Push";
    MUIAnimationType[MUIAnimationType["Pop"] = 4] = "Pop";
    MUIAnimationType[MUIAnimationType["FlipLeft"] = 5] = "FlipLeft";
    MUIAnimationType[MUIAnimationType["FlipRight"] = 6] = "FlipRight";
    MUIAnimationType[MUIAnimationType["FadeIn"] = 7] = "FadeIn";
    MUIAnimationType[MUIAnimationType["FadeOut"] = 8] = "FadeOut";
    MUIAnimationType[MUIAnimationType["LightSpeedIn"] = 9] = "LightSpeedIn";
    MUIAnimationType[MUIAnimationType["LightSpeedOut"] = 10] = "LightSpeedOut";
    MUIAnimationType[MUIAnimationType["Hinge"] = 11] = "Hinge";
    MUIAnimationType[MUIAnimationType["SlideInUp"] = 12] = "SlideInUp";
    MUIAnimationType[MUIAnimationType["SlideOutDown"] = 13] = "SlideOutDown";
    MUIAnimationType[MUIAnimationType["SlideInRight"] = 14] = "SlideInRight";
    MUIAnimationType[MUIAnimationType["SlideOutRight"] = 15] = "SlideOutRight";
    MUIAnimationType[MUIAnimationType["SlideInLeft"] = 16] = "SlideInLeft";
    MUIAnimationType[MUIAnimationType["SlideOutLeft"] = 17] = "SlideOutLeft";
    MUIAnimationType[MUIAnimationType["HorizontalOutFlip"] = 18] = "HorizontalOutFlip";
    MUIAnimationType[MUIAnimationType["HorizontalInFlip"] = 19] = "HorizontalInFlip";
    MUIAnimationType[MUIAnimationType["ZoomIn"] = 20] = "ZoomIn";
    MUIAnimationType[MUIAnimationType["ZoomOut"] = 21] = "ZoomOut";
})(MUIAnimationType = exports.MUIAnimationType || (exports.MUIAnimationType = {}));
// ANIMATION TYPES
function MUIClassListForAnimationType(type) {
    var array = [];
    array.push("animated");
    switch (type) {
        case MUIAnimationType.BeginSheet:
            array.push("slideInDown");
            break;
        case MUIAnimationType.EndSheet:
            array.push("slideOutUp");
            break;
        case MUIAnimationType.Push:
            array.push("slideInRight");
            break;
        case MUIAnimationType.Pop:
            array.push("slideOutRight");
            break;
        case MUIAnimationType.FadeIn:
            array.push("fadeIn");
            break;
        case MUIAnimationType.FadeOut:
            array.push("fadeOut");
            break;
        case MUIAnimationType.LightSpeedOut:
            array.push("lightSpeedOut");
            break;
        case MUIAnimationType.Hinge:
            array.push("hinge");
            break;
        case MUIAnimationType.SlideInUp:
            array.push("slideInUp");
            break;
        case MUIAnimationType.SlideOutDown:
            array.push("slideOutDown");
            break;
        case MUIAnimationType.SlideInRight:
            array.push("slideInRight");
            break;
        case MUIAnimationType.SlideOutRight:
            array.push("slideOutRight");
            break;
        case MUIAnimationType.SlideInLeft:
            array.push("slideInLeft");
            break;
        case MUIAnimationType.SlideOutLeft:
            array.push("slideOutLeft");
            break;
        case MUIAnimationType.HorizontalOutFlip:
            array.push("flipOutY");
            break;
        case MUIAnimationType.HorizontalInFlip:
            array.push("flipInY");
            break;
        case MUIAnimationType.ZoomIn:
            array.push("zoomIn");
            break;
        case MUIAnimationType.ZoomOut:
            array.push("zoomOut");
            break;
    }
    return array;
}
exports.MUIClassListForAnimationType = MUIClassListForAnimationType;
function _MUIAddAnimations(layer, animations) {
    var w = layer.offsetWidth;
    for (var index = 0; index < animations.length; index++)
        layer.classList.add(animations[index]);
    w++;
}
exports._MUIAddAnimations = _MUIAddAnimations;
function _MUIRemoveAnimations(layer, animations) {
    for (var index = 0; index < animations.length; index++)
        layer.classList.remove(animations[index]);
}
exports._MUIRemoveAnimations = _MUIRemoveAnimations;
function _MUIAnimationStart(layer, animationController, animationContext, target, completion) {
    if (animationController == null) {
        if (target != null && completion != null)
            completion.call(target);
        return;
    }
    var duration = animationController.transitionDuration(animationContext);
    var animations = animationController.animations(animationContext);
    animationController.animateTransition(animationContext);
    if (duration == 0 || animations == null) {
        // NO animation
        animationController.animationEnded(true);
        if (target != null && completion != null)
            completion.call(target);
        return;
    }
    layer.style.animationDuration = duration + "s";
    _MUIAddAnimations(layer, animations);
    layer.animationParams = {};
    layer.animationParams["animationController"] = animationController;
    layer.animationParams["animations"] = animations;
    if (target != null)
        layer.animationParams["target"] = target;
    if (completion != null)
        layer.animationParams["completion"] = completion;
    layer.addEventListener("animationend", _UIAnimationDidFinish);
}
exports._MUIAnimationStart = _MUIAnimationStart;
function _UIAnimationDidFinish(event) {
    var animationController = event.target.animationParams["animationController"];
    var animations = event.target.animationParams["animations"];
    var target = event.target.animationParams["target"];
    var completion = event.target.animationParams["completion"];
    var layer = event.target;
    _MUIRemoveAnimations(layer, animations);
    layer.removeEventListener("animationend", _UIAnimationDidFinish);
    animationController.animationEnded(true);
    if (target != null && completion != null)
        completion.call(target);
}
exports._UIAnimationDidFinish = _UIAnimationDidFinish;
window.onload = function (e) {
    var url = mio_foundation_web_2.MIOCoreBundleGetMainURLString();
    console.log("Main URL: " + url);
    var args = url; // Todo get only the query string
    main(args);
};
// output errors to console log
window.onerror = function (e) {
    console.log("window.onerror ::" + JSON.stringify(e));
};
var _miocore_events_event_observers = {};
function MUICoreEventRegisterObserverForType(eventType, observer, completion) {
    var item = { "Target": observer, "Completion": completion };
    var array = _miocore_events_event_observers[eventType];
    if (array == null) {
        array = [];
        _miocore_events_event_observers[eventType] = array;
    }
    array.push(item);
}
exports.MUICoreEventRegisterObserverForType = MUICoreEventRegisterObserverForType;
function MUICoreEventUnregisterObserverForType(eventType, observer) {
    var obs = _miocore_events_event_observers[eventType];
    if (obs == null)
        return;
    var index = -1;
    for (var count = 0; count < obs.length; count++) {
        var item = obs[count];
        var target = item["Target"];
        if (target === observer) {
            index = count;
            break;
        }
    }
    if (index > -1) {
        console.log("removing event observer: " + obs.length);
        obs.splice(index, 1);
        console.log("removing event observer: " + obs.length);
        console.log("removing event observer: " + _miocore_events_event_observers[eventType].length);
    }
}
exports.MUICoreEventUnregisterObserverForType = MUICoreEventUnregisterObserverForType;
function _MUICoreEventSendToObservers(obs, event) {
    if (obs != null) {
        for (var index = 0; index < obs.length; index++) {
            var o = obs[index];
            var target = o["Target"];
            var completion = o["Completion"];
            completion.call(target, event);
        }
    }
}
/*
    EVENTS
*/
// Keyboard events
window.addEventListener("keydown", function (e) {
    // Create event
    var event = new MUICoreKeyEvent();
    event.initWithKeyCode(MUICoreEventType.KeyDown, e.keyCode, e);
    var observers = _miocore_events_event_observers[MUICoreEventType.KeyDown];
    _MUICoreEventSendToObservers(observers, event);
}, false);
window.addEventListener('keyup', function (e) {
    // Create event
    var event = new MUICoreKeyEvent();
    event.initWithKeyCode(MUICoreEventType.KeyUp, e.keyCode, e);
    var observers = _miocore_events_event_observers[MUICoreEventType.KeyUp];
    _MUICoreEventSendToObservers(observers, event);
}, false);
// Mouse and touch events
window.addEventListener('mousedown', function (e) {
    // Create event
    var event = new MUICoreKeyEvent();
    event.initWithType(MUICoreEventType.MouseDown, e);
    var observers = _miocore_events_event_observers[MUICoreEventType.MouseDown];
    _MUICoreEventSendToObservers(observers, event);
}, false);
window.addEventListener('mouseup', function (e) {
    // Create event
    var event = new MUICoreEventMouse();
    event.initWithType(MUICoreEventType.MouseUp, e);
    var observers_mouseup = _miocore_events_event_observers[MUICoreEventType.MouseUp];
    _MUICoreEventSendToObservers(observers_mouseup, event);
    // Send click event
    var observers_click = _miocore_events_event_observers[MUICoreEventType.Click];
    _MUICoreEventSendToObservers(observers_click, event);
}, false);
window.addEventListener('touchend', function (e) {
    // Create event
    var event = new MUICoreEventTouch();
    event.initWithType(MUICoreEventType.TouchEnd, e);
    var observers_touchend = _miocore_events_event_observers[MUICoreEventType.TouchEnd];
    _MUICoreEventSendToObservers(observers_touchend, event);
    // Send click event
    var observers_click = _miocore_events_event_observers[MUICoreEventType.Click];
    _MUICoreEventSendToObservers(observers_click, event);
}, false);
// UI events
window.addEventListener("resize", function (e) {
    var event = new MUICoreEvent();
    event.initWithType(MUICoreEventType.Resize, e);
    var observers = _miocore_events_event_observers[MUICoreEventType.Resize];
    _MUICoreEventSendToObservers(observers, event);
}, false);
function MUICoreBundleLoadNibName(name, target, completion) {
}
exports.MUICoreBundleLoadNibName = MUICoreBundleLoadNibName;
var MUICoreEventKeyCode;
(function (MUICoreEventKeyCode) {
    MUICoreEventKeyCode[MUICoreEventKeyCode["Enter"] = 13] = "Enter";
    MUICoreEventKeyCode[MUICoreEventKeyCode["Escape"] = 27] = "Escape";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowLeft"] = 37] = "ArrowLeft";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowUp"] = 38] = "ArrowUp";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowRight"] = 39] = "ArrowRight";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowDown"] = 40] = "ArrowDown";
})(MUICoreEventKeyCode = exports.MUICoreEventKeyCode || (exports.MUICoreEventKeyCode = {}));
var MUICoreEventType;
(function (MUICoreEventType) {
    MUICoreEventType[MUICoreEventType["KeyUp"] = 0] = "KeyUp";
    MUICoreEventType[MUICoreEventType["KeyDown"] = 1] = "KeyDown";
    MUICoreEventType[MUICoreEventType["MouseUp"] = 2] = "MouseUp";
    MUICoreEventType[MUICoreEventType["MouseDown"] = 3] = "MouseDown";
    MUICoreEventType[MUICoreEventType["TouchStart"] = 4] = "TouchStart";
    MUICoreEventType[MUICoreEventType["TouchEnd"] = 5] = "TouchEnd";
    MUICoreEventType[MUICoreEventType["Click"] = 6] = "Click";
    MUICoreEventType[MUICoreEventType["Resize"] = 7] = "Resize";
})(MUICoreEventType = exports.MUICoreEventType || (exports.MUICoreEventType = {}));
var MUICoreEvent = /** @class */ (function () {
    function MUICoreEvent() {
        this.eventType = null;
        this.target = null;
        this.completion = null;
    }
    MUICoreEvent.prototype.initWithType = function (eventType, coreEvent) {
        this.coreEvent = coreEvent;
        this.eventType = eventType;
    };
    MUICoreEvent.prototype.cancel = function () {
        this.coreEvent.preventDefault();
    };
    return MUICoreEvent;
}());
exports.MUICoreEvent = MUICoreEvent;
var MUICoreKeyEvent = /** @class */ (function (_super) {
    __extends(MUICoreKeyEvent, _super);
    function MUICoreKeyEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keyCode = null;
        return _this;
    }
    MUICoreKeyEvent.prototype.initWithKeyCode = function (eventType, eventKeyCode, event) {
        _super.prototype.initWithType.call(this, eventType, event);
        this.keyCode = eventKeyCode;
    };
    return MUICoreKeyEvent;
}(MUICoreEvent));
exports.MUICoreKeyEvent = MUICoreKeyEvent;
var MUICoreEventInput = /** @class */ (function (_super) {
    __extends(MUICoreEventInput, _super);
    function MUICoreEventInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.x = 0;
        _this.y = 0;
        _this.deltaX = 0;
        _this.deltaY = 0;
        return _this;
    }
    return MUICoreEventInput;
}(MUICoreEvent));
exports.MUICoreEventInput = MUICoreEventInput;
var MUICoreEventMouseButtonType;
(function (MUICoreEventMouseButtonType) {
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["None"] = 0] = "None";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Left"] = 1] = "Left";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Right"] = 2] = "Right";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Middle"] = 3] = "Middle";
})(MUICoreEventMouseButtonType = exports.MUICoreEventMouseButtonType || (exports.MUICoreEventMouseButtonType = {}));
var MUICoreEventMouse = /** @class */ (function (_super) {
    __extends(MUICoreEventMouse, _super);
    function MUICoreEventMouse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.button = MUICoreEventMouseButtonType.None;
        return _this;
    }
    MUICoreEventMouse.prototype.initWithType = function (eventType, coreEvent) {
        _super.prototype.initWithType.call(this, eventType, event);
        //Get the button clicked
        this.button = MUICoreEventMouseButtonType.Left;
        this.target = coreEvent.target;
        this.x = coreEvent.clientX;
        this.y = coreEvent.clientY;
    };
    return MUICoreEventMouse;
}(MUICoreEventInput));
exports.MUICoreEventMouse = MUICoreEventMouse;
// Declare changedTouches interface for typescript
// interface Event {
//     touches:TouchList;
//     targetTouches:TouchList;
//     changedTouches:TouchList;
// };
var MUICoreEventTouch = /** @class */ (function (_super) {
    __extends(MUICoreEventTouch, _super);
    function MUICoreEventTouch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MUICoreEventTouch.prototype.initWithType = function (eventType, coreEvent) {
        _super.prototype.initWithType.call(this, eventType, event);
        var touch = coreEvent.changedTouches[0]; // reference first touch point for this event
        this.target = coreEvent.target;
        this.x = touch.clientX;
        this.y = touch.clientY;
    };
    return MUICoreEventTouch;
}(MUICoreEventInput));
exports.MUICoreEventTouch = MUICoreEventTouch;
var UIEvent = /** @class */ (function (_super) {
    __extends(UIEvent, _super);
    function UIEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    UIEvent.eventWithSysEvent = function (sysEvent) {
        var ev = new UIEvent();
        ev.initWithSysEvent(sysEvent);
        return ev;
    };
    UIEvent.prototype.initWithSysEvent = function (e) {
        _super.prototype.init.call(this);
        this.x = e.clientX;
        this.y = e.clientY;
    };
    return UIEvent;
}(mio_foundation_web_1.NSObject));
exports.UIEvent = UIEvent;
var UIGestureRecognizerState;
(function (UIGestureRecognizerState) {
    UIGestureRecognizerState[UIGestureRecognizerState["Possible"] = 0] = "Possible";
    UIGestureRecognizerState[UIGestureRecognizerState["Began"] = 1] = "Began";
    UIGestureRecognizerState[UIGestureRecognizerState["Changed"] = 2] = "Changed";
    UIGestureRecognizerState[UIGestureRecognizerState["Ended"] = 3] = "Ended";
    UIGestureRecognizerState[UIGestureRecognizerState["Cancelled"] = 4] = "Cancelled";
    UIGestureRecognizerState[UIGestureRecognizerState["Failed"] = 5] = "Failed";
    UIGestureRecognizerState[UIGestureRecognizerState["Recognized"] = 6] = "Recognized";
})(UIGestureRecognizerState = exports.UIGestureRecognizerState || (exports.UIGestureRecognizerState = {}));
var UIGestureRecognizer = /** @class */ (function (_super) {
    __extends(UIGestureRecognizer, _super);
    function UIGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delegate = null;
        _this.isEnabled = true;
        _this.name = null;
        _this.target = null;
        _this.block = null;
        _this._view = null;
        _this._state = UIGestureRecognizerState.Possible;
        return _this;
    }
    Object.defineProperty(UIGestureRecognizer.prototype, "view", {
        get: function () { return this._view; },
        set: function (v) { this.setView(v); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGestureRecognizer.prototype, "state", {
        get: function () { return this._state; },
        set: function (value) { this.setState(value); },
        enumerable: true,
        configurable: true
    });
    UIGestureRecognizer.prototype.initWithTarget = function (target, block) {
        _super.prototype.init.call(this);
        this.target = target;
        this.block = block;
    };
    UIGestureRecognizer.prototype.setView = function (view) {
        this._view = view;
    };
    UIGestureRecognizer.prototype.setState = function (state) {
        if (this.isEnabled == false)
            return;
        if (this._state == state && state != UIGestureRecognizerState.Changed)
            return;
        this._state = state;
        this.block.call(this.target, this);
    };
    UIGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Began;
    };
    UIGestureRecognizer.prototype.touchesMovedWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Changed;
    };
    UIGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Ended;
    };
    UIGestureRecognizer.prototype.reset = function () {
        this.state = UIGestureRecognizerState.Possible;
    };
    // To call from UIView. Only for internal use
    UIGestureRecognizer.prototype._viewTouchesBeganWithEvent = function (touches, ev) {
        this.reset();
        this.touchesBeganWithEvent(touches, ev);
    };
    UIGestureRecognizer.prototype._viewTouchesMovedWithEvent = function (touches, ev) {
        this.touchesMovedWithEvent(touches, ev);
    };
    UIGestureRecognizer.prototype._viewTouchesEndedWithEvent = function (touches, ev) {
        this.touchesEndedWithEvent(touches, ev);
    };
    return UIGestureRecognizer;
}(mio_foundation_web_1.NSObject));
exports.UIGestureRecognizer = UIGestureRecognizer;
var UITapGestureRecognizer = /** @class */ (function (_super) {
    __extends(UITapGestureRecognizer, _super);
    function UITapGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberOfTapsRequired = 1;
        return _this;
    }
    UITapGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        _super.prototype.touchesBeganWithEvent.call(this, touches, ev);
        this.state = UIGestureRecognizerState.Began;
    };
    UITapGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        _super.prototype.touchesEndedWithEvent.call(this, touches, ev);
        this.state = UIGestureRecognizerState.Ended;
    };
    return UITapGestureRecognizer;
}(UIGestureRecognizer));
exports.UITapGestureRecognizer = UITapGestureRecognizer;
var UIPanGestureRecognizer = /** @class */ (function (_super) {
    __extends(UIPanGestureRecognizer, _super);
    function UIPanGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minimumNumberOfTouches = 1;
        _this.maximumNumberOfTouches = 0;
        _this.initialX = null;
        _this.initialY = null;
        _this.touchDown = false;
        _this.hasStarted = false;
        _this.deltaX = 0;
        _this.deltaY = 0;
        return _this;
    }
    UIPanGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        this.initialX = ev.x;
        this.initialY = ev.y;
        this.touchDown = true;
    };
    UIPanGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        _super.prototype.touchesEndedWithEvent.call(this, touches, ev);
        this.initialX = null;
        this.initialY = null;
        this.hasStarted = false;
        this.touchDown = false;
    };
    UIPanGestureRecognizer.prototype.touchesMovedWithEvent = function (touches, ev) {
        if (this.touchDown == false)
            return;
        if (this.hasStarted == false)
            this.state = UIGestureRecognizerState.Began;
        this.hasStarted = true;
        this.deltaX = this.initialX - ev.x;
        this.deltaY = this.initialY - ev.y;
        this.state = UIGestureRecognizerState.Changed;
    };
    UIPanGestureRecognizer.prototype.translationInView = function (view) {
        return new mio_foundation_web_3.NSPoint(this.deltaX, this.deltaY);
    };
    return UIPanGestureRecognizer;
}(UIGestureRecognizer));
exports.UIPanGestureRecognizer = UIPanGestureRecognizer;
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
        _this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(_this);
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
        this.layer = MUICoreLayerCreate(this.layerID);
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
        this.layer = MUICoreLayerCreate(this.layerID);
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
                var sv = mio_foundation_web_5.NSClassFromString(className);
                sv.initWithLayer(subLayer, this);
                this._linkViewToSubview(sv);
            }
        }
    };
    UIView.prototype.copy = function () {
        var objLayer = this.layer.cloneNode(true);
        var className = this.getClassName();
        if (className == null)
            throw Error("UIView:copy: Error classname is null");
        var view = mio_foundation_web_5.NSClassFromString(className);
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
        var view = MUICoreViewSearchViewTag(this, tag);
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
        return MUICoreLayerSearchElementByID(this.layer, itemID);
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
            return mio_foundation_web_4.NSRect.rectWithValues(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "bounds", {
        get: function () {
            return mio_foundation_web_4.NSRect.rectWithValues(0, 0, this.getWidth(), this.getHeight());
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
        var e = UIEvent.eventWithSysEvent(ev);
        this.touchesBeganWithEvent(null, e);
        this.isMouseDown = true;
        window.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
        ev.preventDefault(); // Prevent selection
    };
    UIView.prototype.mouseUpEvent = function (ev) {
        this.isMouseDown = false;
        var e = UIEvent.eventWithSysEvent(ev);
        this.touchesEndedWithEvent(null, e);
    };
    UIView.prototype.mouseMoveEvent = function (ev) {
        if (this.isMouseDown == false)
            return;
        if (ev.buttons == 0) {
            window.removeEventListener("mousemove", this.mouseMoveEvent);
            this.isMouseDown = false;
            var e = UIEvent.eventWithSysEvent(ev);
            this.touchesEndedWithEvent(null, e);
        }
        else {
            var e = UIEvent.eventWithSysEvent(ev);
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
/**
 * Created by godshadow on 12/3/16.
 */
var UIControl = /** @class */ (function (_super) {
    __extends(UIControl, _super);
    function UIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // TODO: Make delegation of the methods above
        _this.mouseOverTarget = null;
        _this.mouseOverAction = null;
        _this.mouseOutTarget = null;
        _this.mouseOutAction = null;
        _this._enabled = true;
        return _this;
    }
    Object.defineProperty(UIControl.prototype, "enabled", {
        get: function () { return this._enabled; },
        set: function (value) { this.setEnabled(value); },
        enumerable: true,
        configurable: true
    });
    UIControl.prototype.setEnabled = function (enabled) {
        this._enabled = enabled;
        if (enabled == true)
            this.layer.style.opacity = "1.0";
        else
            this.layer.style.opacity = "0.10";
    };
    UIControl.prototype.setOnMouseOverAction = function (target, action) {
        this.mouseOverTarget = target;
        this.mouseOverAction = action;
        var instance = this;
        this.layer.onmouseover = function () {
            if (instance.enabled)
                instance.mouseOverAction.call(target);
        };
    };
    UIControl.prototype.setOnMouseOutAction = function (target, action) {
        this.mouseOutTarget = target;
        this.mouseOutAction = action;
        var instance = this;
        this.layer.onmouseout = function () {
            if (instance.enabled)
                instance.mouseOutAction.call(target);
        };
    };
    return UIControl;
}(UIView));
exports.UIControl = UIControl;
/**
 * Created by godshadow on 12/3/16.
 */
var UIButtonType;
(function (UIButtonType) {
    UIButtonType[UIButtonType["MomentaryPushIn"] = 0] = "MomentaryPushIn";
    UIButtonType[UIButtonType["PushOnPushOff"] = 1] = "PushOnPushOff";
    UIButtonType[UIButtonType["PushIn"] = 2] = "PushIn";
})(UIButtonType = exports.UIButtonType || (exports.UIButtonType = {}));
var UIButton = /** @class */ (function (_super) {
    __extends(UIButton, _super);
    function UIButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._statusStyle = null;
        _this._titleStatusStyle = null;
        _this._titleLayer = null;
        _this._imageStatusStyle = null;
        _this._imageLayer = null;
        _this.target = null;
        _this.action = null;
        _this._selected = false;
        _this.type = UIButtonType.MomentaryPushIn;
        return _this;
    }
    UIButton.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayerAddStyle(this.layer, "btn");
        this.setupLayers();
    };
    UIButton.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        var type = this.layer.getAttribute("data-type");
        if (type == "MomentaryPushIn")
            this.type = UIButtonType.MomentaryPushIn;
        else if (type == "PushOnPushOff")
            this.type = UIButtonType.PushOnPushOff;
        else if (type == "PushIn")
            this.type = UIButtonType.PushIn;
        // Check for title layer
        this._titleLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "SPAN");
        // Check for img layer
        this._imageLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "IMG");
        if (this._imageLayer == null)
            this._imageLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "DIV");
        // Check for status
        var status = this.layer.getAttribute("data-status");
        if (status == "selected")
            this.setSelected(true);
        this.setupLayers();
    };
    UIButton.prototype.setupLayers = function () {
        //UICoreLayerRemoveStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "btn");
        if (this._titleLayer == null) {
            this._titleLayer = document.createElement("span");
            this.layer.appendChild(this._titleLayer);
        }
        var key = this.layer.getAttribute("data-title");
        if (key != null)
            this.setTitle(mio_foundation_web_6.NSLocalizeString(key, key));
        // Prevent click
        this.layer.addEventListener("click", function (e) {
            e.stopPropagation();
        });
        this.layer.addEventListener("mousedown", function (e) {
            e.stopPropagation();
            if (this.enabled == false)
                return;
            switch (this.type) {
                case UIButtonType.MomentaryPushIn:
                case UIButtonType.PushIn:
                    this.setSelected(true);
                    break;
                case UIButtonType.PushOnPushOff:
                    this.setSelected(!this.selected);
                    break;
            }
        }.bind(this));
        this.layer.addEventListener("mouseup", function (e) {
            e.stopPropagation();
            if (this.enabled == false)
                return;
            if (this.type == UIButtonType.MomentaryPushIn)
                this.setSelected(false);
            if (this.action != null && this.target != null)
                this.action.call(this.target, this);
        }.bind(this));
    };
    UIButton.prototype.initWithAction = function (target, action) {
        this.init();
        this.setAction(target, action);
    };
    UIButton.prototype.setAction = function (target, action) {
        this.target = target;
        this.action = action;
    };
    UIButton.prototype.setTitle = function (title) {
        this._titleLayer.innerHTML = title;
    };
    Object.defineProperty(UIButton.prototype, "title", {
        get: function () {
            return this._titleLayer.innerHTML;
        },
        set: function (title) {
            this.setTitle(title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIButton.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this.setSelected(value);
        },
        enumerable: true,
        configurable: true
    });
    UIButton.prototype.setSelected = function (value) {
        if (this._selected == value)
            return;
        if (value == true) {
            MUICoreLayerAddStyle(this.layer, "selected");
            //UICoreLayerRemoveStyle(this.layer, "deselected");
        }
        else {
            //UICoreLayerAddStyle(this.layer, "deselected");
            MUICoreLayerRemoveStyle(this.layer, "selected");
        }
        this._selected = value;
    };
    UIButton.prototype.setImageURL = function (urlString) {
        if (urlString != null) {
            this._imageLayer.setAttribute("src", urlString);
        }
        else {
            this._imageLayer.removeAttribute("src");
        }
    };
    return UIButton;
}(UIControl));
exports.UIButton = UIButton;
/**
 * Created by godshadow on 11/3/16.
 */
var UIViewController = /** @class */ (function (_super) {
    __extends(UIViewController, _super);
    function UIViewController(layerID) {
        var _this = _super.call(this) || this;
        _this.layerID = null;
        _this.view = null;
        _this._htmlResourcePath = null;
        _this._onViewLoadedTarget = null;
        _this._onViewLoadedAction = null;
        _this._onLoadLayerTarget = null;
        _this._onLoadLayerAction = null;
        _this._viewIsLoaded = false;
        _this._layerIsReady = false;
        _this._childViewControllers = [];
        _this.parentViewController = null;
        _this.presentingViewController = null;
        _this.presentedViewController = null;
        _this.navigationController = null;
        _this.navigationItem = null;
        _this.splitViewController = null;
        _this.tabBarController = null;
        _this.modalPresentationStyle = mio_foundation_web_8.MIOCoreIsPhone() == true ? UIModalPresentationStyle.FullScreen : UIModalPresentationStyle.PageSheet;
        _this.modalTransitionStyle = UIModalTransitionStyle.CoverVertical;
        _this.transitioningDelegate = null;
        _this._contentSize = new mio_foundation_web_7.NSSize(320, 200);
        _this._preferredContentSize = null;
        _this._outlets = {};
        // removeFromParentViewController()
        // {
        //     this.parent.removeChildViewController(this);
        //     this.parent = null;
        //     this.view.removeFromSuperview();
        //     //this.didMoveToParentViewController(null);
        // }
        _this._presentationController = null;
        _this._popoverPresentationController = null;
        _this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(_this);
        return _this;
    }
    UIViewController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.loadView();
    };
    UIViewController.prototype.initWithCoder = function (coder) {
    };
    UIViewController.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.init.call(this);
        this.view = new UIView(this.layerID);
        this.view.initWithLayer(layer, owner, options);
        // Search for navigation item
        //this.navigationItem = UINavItemSearchInLayer(layer);
        this.loadView();
    };
    UIViewController.prototype.initWithResource = function (path) {
        if (path == null)
            throw new Error("MIOViewController:initWithResource can't be null");
        _super.prototype.init.call(this);
        this._htmlResourcePath = path;
        this.loadView();
    };
    UIViewController.prototype.localizeSubLayers = function (layers) {
        if (layers.length == 0)
            return;
        for (var index = 0; index < layers.length; index++) {
            var layer = layers[index];
            if (layer.tagName != "DIV")
                continue;
            var key = layer.getAttribute("data-localize-key");
            if (key != null)
                layer.innerHTML = mio_foundation_web_6.NSLocalizeString(key, key);
            this.localizeSubLayers(layer.childNodes);
        }
    };
    UIViewController.prototype.localizeLayerIDWithKey = function (layerID, key) {
        var layer = MUICoreLayerSearchElementByID(this.view.layer, layerID);
        layer.innerHTML = mio_foundation_web_6.NSLocalizeString(key, key);
    };
    UIViewController.prototype.loadView = function () {
        if (this.view != null) {
            this._didLoadView();
            return;
        }
        this.view = new UIView(this.layerID);
        if (this._htmlResourcePath == null) {
            this.view.init();
            MUICoreLayerAddStyle(this.view.layer, "page");
            this._didLoadView();
            return;
        }
        var mainBundle = mio_foundation_web_9.NSBundle.mainBundle();
        mainBundle.loadNibNamed(this._htmlResourcePath, this, null);
        // mainBundle.loadHTMLNamed(this._htmlResourcePath, this.layerID, this, function (layer) {            
        //     let domParser = new DOMParser();
        //     let items = domParser.parseFromString(layerData, "text/html");
        //     let layer = items.getElementById(layerID);
        //     if (target != null && completion != null)
        //         completion.call(target, layer);
        //     // Search for navigation item
        //     this.navigationItem = UINavItemSearchInLayer(layer);
        //     this.view.initWithLayer(layer);
        //     this.view.awakeFromHTML();
        //     this._didLoadView();
        // });        
    };
    UIViewController.prototype._didLoadNibWithLayer = function (layerData) {
        var domParser = new DOMParser();
        var items = domParser.parseFromString(layerData, "text/html");
        var layer = items.getElementById("kk");
        //this.navigationItem = UINavItemSearchInLayer(layer);
        this.view.initWithLayer(layer, this);
        this.view.awakeFromHTML();
        this._didLoadView();
    };
    UIViewController.prototype._didLoadView = function () {
        this._layerIsReady = true;
        if (mio_foundation_web_8.MIOCoreIsPhone() == true)
            MUICoreLayerAddStyle(this.view.layer, "phone");
        if (this._onLoadLayerTarget != null && this._onViewLoadedAction != null) {
            this._onLoadLayerAction.call(this._onLoadLayerTarget);
            this._onLoadLayerTarget = null;
            this._onLoadLayerAction = null;
        }
        if (this._onViewLoadedAction != null && this._onViewLoadedTarget != null) {
            this.viewDidLoad();
            this._loadChildControllers();
        }
    };
    UIViewController.prototype._loadChildControllers = function () {
        var count = this._childViewControllers.length;
        if (count > 0)
            this._loadChildViewController(0, count);
        else
            this._setViewLoaded(true);
    };
    UIViewController.prototype._loadChildViewController = function (index, max) {
        if (index < max) {
            var vc = this._childViewControllers[index];
            vc.onLoadView(this, function () {
                var newIndex = index + 1;
                this._loadChildViewController(newIndex, max);
            });
        }
        else {
            this._setViewLoaded(true);
        }
    };
    UIViewController.prototype._setViewLoaded = function (value) {
        this.willChangeValue("viewLoaded");
        this._viewIsLoaded = value;
        this.didChangeValue("viewLoaded");
        if (value == true && this._onViewLoadedAction != null) {
            this._onViewLoadedAction.call(this._onViewLoadedTarget);
        }
        this._onViewLoadedTarget = null;
        this._onViewLoadedAction = null;
        this.view.setNeedsDisplay();
    };
    UIViewController.prototype.onLoadView = function (target, action) {
        this._onViewLoadedTarget = target;
        this._onViewLoadedAction = action;
        if (this._viewIsLoaded == true) {
            action.call(target);
            //this.view.setNeedsDisplay();
        }
        else if (this._layerIsReady == true) {
            this.viewDidLoad();
            this._loadChildControllers();
            //this.view.setNeedsDisplay();
        }
    };
    UIViewController.prototype.onLoadLayer = function (target, action) {
        if (this._layerIsReady == true) {
            action.call(target);
        }
        else {
            this._onLoadLayerTarget = action;
            this._onLoadLayerAction = target;
        }
    };
    Object.defineProperty(UIViewController.prototype, "viewIsLoaded", {
        get: function () {
            return this._viewIsLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "childViewControllers", {
        get: function () {
            return this._childViewControllers;
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.addChildViewController = function (vc) {
        vc.parentViewController = this;
        this._childViewControllers.push(vc);
        //vc.willMoveToParentViewController(this);
    };
    UIViewController.prototype.removeChildViewController = function (vc) {
        var index = this._childViewControllers.indexOf(vc);
        if (index != -1) {
            this._childViewControllers.splice(index, 1);
            vc.parentViewController = null;
        }
    };
    Object.defineProperty(UIViewController.prototype, "isPresented", {
        get: function () {
            if (this._presentationController != null)
                return this._presentationController._isPresented;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "presentationController", {
        get: function () {
            // if (this._presentationController == null && this.parentViewController != null)
            //     return this.parentViewController.presentationController;
            return this._presentationController;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "popoverPresentationController", {
        get: function () {
            if (this._popoverPresentationController == null) {
                this._popoverPresentationController = new UIPopoverPresentationController();
                this._popoverPresentationController.init();
                this._popoverPresentationController.presentedViewController = this;
                this._presentationController = this._popoverPresentationController;
            }
            return this._popoverPresentationController;
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.showViewController = function (vc, animated) {
        vc.onLoadView(this, function () {
            this.view.addSubview(vc.view);
            this.addChildViewController(vc);
            _MUIShowViewController(this, vc, this, animated);
        });
    };
    UIViewController.prototype.presentViewController = function (vc, animated) {
        var pc = vc.presentationController;
        if (pc == null) {
            pc = new UIPresentationController();
            pc.init();
            pc.presentedViewController = vc;
            pc.presentingViewController = this;
            vc._presentationController = pc;
        }
        if (pc.presentingViewController == null) {
            pc.presentingViewController = this;
        }
        if (pc._isPresented == true) {
            throw new Error("You try to present a view controller that is already presented");
        }
        // if (vc.modalPresentationStyle == UIModalPresentationStyle.CurrentContext){            
        //     vc.modalPresentationStyle = MIOCoreIsPhone() == true ? UIModalPresentationStyle.FullScreen : UIModalPresentationStyle.PageSheet;
        // }
        // if (vc.modalPresentationStyle != UIModalPresentationStyle.FullScreen 
        //     && vc.modalPresentationStyle != UIModalPresentationStyle.FormSheet
        //     && vc.modalPresentationStyle != UIModalPresentationStyle.PageSheet
        //     && vc.modalPresentationStyle != UIModalPresentationStyle.Popover
        //     && vc.modalPresentationStyle != UIModalPresentationStyle.Custom)
        //     vc.modalPresentationStyle = UIModalPresentationStyle.PageSheet;
        vc.onLoadView(this, function () {
            if (vc.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
                this.view.addSubview(vc.presentationController.presentedView);
                this.addChildViewController(vc);
                _MUIShowViewController(this, vc, null, animated, this, function () {
                });
            }
            else {
                // It's a window instead of a view
                var w_1 = pc.window;
                if (w_1 == null) {
                    w_1 = new UIWindow();
                    w_1.init();
                    w_1.layer.style.background = "";
                    w_1.rootViewController = vc;
                    w_1.addSubview(pc.presentedView);
                    pc.window = w_1;
                }
                w_1.setHidden(false);
                _MUIShowViewController(this, vc, null, animated, this, function () {
                    w_1.makeKey();
                });
            }
        });
    };
    UIViewController.prototype.dismissViewController = function (animate) {
        var pc = this._presentationController;
        var vc = this;
        while (pc == null) {
            vc = vc.parentViewController;
            pc = vc._presentationController;
        }
        var toVC = pc.presentingViewController;
        var fromVC = pc.presentedViewController;
        var fromView = pc.presentedView;
        _MUIHideViewController(fromVC, toVC, null, this, function () {
            if (fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
                toVC.removeChildViewController(fromVC);
                var pc1 = fromVC.presentationController;
                var view = pc1.presentedView;
                view.removeFromSuperview();
            }
            else {
                // It's a window instead of a view
                var pc1 = fromVC.presentationController;
                var w = pc1.window;
                w.setHidden(true);
            }
        });
    };
    UIViewController.prototype.transitionFromViewControllerToViewController = function (fromVC, toVC, duration, animationType, target, completion) {
        //TODO
    };
    UIViewController.prototype.viewDidLoad = function () { };
    UIViewController.prototype.viewWillAppear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillAppear(animated);
        }
        this.view.setViewIsVisible(true);
    };
    UIViewController.prototype.viewDidAppear = function (animated) {
        //this.view.setNeedsDisplay();
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidAppear(animated);
        }
    };
    UIViewController.prototype.viewWillDisappear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillDisappear(animated);
        }
        this.view.setViewIsVisible(false);
    };
    UIViewController.prototype.viewDidDisappear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidDisappear(animated);
        }
    };
    UIViewController.prototype.contentHeight = function () {
        return this.view.getHeight();
    };
    UIViewController.prototype.setContentSize = function (size) {
        this.willChangeValue("contentSize");
        this._contentSize = size;
        this.didChangeValue("contentSize");
    };
    Object.defineProperty(UIViewController.prototype, "contentSize", {
        get: function () {
            return this._contentSize;
        },
        set: function (size) {
            this.setContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "preferredContentSize", {
        get: function () {
            return this._preferredContentSize;
        },
        set: function (size) {
            this.setPreferredContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.setPreferredContentSize = function (size) {
        this.willChangeValue("preferredContentSize");
        this._preferredContentSize = size;
        this.didChangeValue("preferredContentSize");
    };
    return UIViewController;
}(mio_foundation_web_1.NSObject));
exports.UIViewController = UIViewController;
/**
 * Created by godshadow on 06/12/2016.
 */
var UIModalPresentationStyle;
(function (UIModalPresentationStyle) {
    UIModalPresentationStyle[UIModalPresentationStyle["FullScreen"] = 0] = "FullScreen";
    UIModalPresentationStyle[UIModalPresentationStyle["PageSheet"] = 1] = "PageSheet";
    UIModalPresentationStyle[UIModalPresentationStyle["FormSheet"] = 2] = "FormSheet";
    UIModalPresentationStyle[UIModalPresentationStyle["CurrentContext"] = 3] = "CurrentContext";
    UIModalPresentationStyle[UIModalPresentationStyle["Custom"] = 4] = "Custom";
    UIModalPresentationStyle[UIModalPresentationStyle["OverFullScreen"] = 5] = "OverFullScreen";
    UIModalPresentationStyle[UIModalPresentationStyle["OverCurrentContext"] = 6] = "OverCurrentContext";
    UIModalPresentationStyle[UIModalPresentationStyle["Popover"] = 7] = "Popover";
    UIModalPresentationStyle[UIModalPresentationStyle["None"] = 8] = "None";
})(UIModalPresentationStyle = exports.UIModalPresentationStyle || (exports.UIModalPresentationStyle = {}));
var UIModalTransitionStyle;
(function (UIModalTransitionStyle) {
    UIModalTransitionStyle[UIModalTransitionStyle["CoverVertical"] = 0] = "CoverVertical";
    UIModalTransitionStyle[UIModalTransitionStyle["FlipHorizontal"] = 1] = "FlipHorizontal";
    UIModalTransitionStyle[UIModalTransitionStyle["CrossDisolve"] = 2] = "CrossDisolve";
})(UIModalTransitionStyle = exports.UIModalTransitionStyle || (exports.UIModalTransitionStyle = {}));
var UIPresentationController = /** @class */ (function (_super) {
    __extends(UIPresentationController, _super);
    function UIPresentationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.presentationStyle = UIModalPresentationStyle.PageSheet;
        _this.shouldPresentInFullscreen = false;
        _this._presentedViewController = null; //ToVC
        _this.presentingViewController = null; //FromVC
        _this.presentedView = null;
        _this._transitioningDelegate = null;
        _this._window = null;
        _this._isPresented = false;
        return _this;
    }
    UIPresentationController.prototype.initWithPresentedViewControllerAndPresentingViewController = function (presentedViewController, presentingViewController) {
        _super.prototype.init.call(this);
        this.presentedViewController = presentedViewController;
        this.presentingViewController = presentingViewController;
    };
    UIPresentationController.prototype.setPresentedViewController = function (vc) {
        this._presentedViewController = vc;
        this.presentedView = vc.view;
    };
    Object.defineProperty(UIPresentationController.prototype, "presentedViewController", {
        get: function () {
            return this._presentedViewController;
        },
        set: function (vc) {
            this.setPresentedViewController(vc);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIPresentationController.prototype, "transitioningDelegate", {
        get: function () {
            if (this._transitioningDelegate == null) {
                this._transitioningDelegate = new MUIModalTransitioningDelegate();
                this._transitioningDelegate.init();
            }
            return this._transitioningDelegate;
        },
        enumerable: true,
        configurable: true
    });
    UIPresentationController.prototype.presentationTransitionWillBegin = function () {
        var toVC = this.presentedViewController;
        var view = this.presentedView;
        this._calculateFrame();
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
            || mio_foundation_web_8.MIOCoreIsPhone() == true) {
            MUICoreLayerAddStyle(view.layer, "modal_window");
        }
    };
    UIPresentationController.prototype.presentationTransitionDidEnd = function (completed) {
    };
    UIPresentationController.prototype.dismissalTransitionWillBegin = function () {
    };
    UIPresentationController.prototype.dismissalTransitionDidEnd = function (completed) {
    };
    UIPresentationController.prototype._calculateFrame = function () {
        var fromVC = this.presentingViewController;
        var toVC = this.presentedViewController;
        var view = this.presentedView;
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            view.layer.style.left = "0px";
            view.layer.style.top = "0px";
            view.layer.style.width = "100%";
            view.layer.style.height = "100%";
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
            var w = fromVC.view.getWidth();
            var h = fromVC.view.getHeight();
            view.setFrame(mio_foundation_web_4.NSRect.rectWithValues(0, 0, w, h));
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet) {
            // Present like desktop sheet window
            var ws = MUIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new mio_foundation_web_7.NSSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            view.setFrame(mio_foundation_web_4.NSRect.rectWithValues(0, 0, w, h));
            this.window.setFrame(mio_foundation_web_4.NSRect.rectWithValues(x, 0, w, h));
            view.layer.classList.add("modal");
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet) {
            // Present at the center of the screen
            var ws = MUIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new mio_foundation_web_7.NSSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            var y = (ws.height - h) / 2;
            view.setFrame(mio_foundation_web_4.NSRect.rectWithValues(0, 0, w, h));
            this.window.setFrame(mio_foundation_web_4.NSRect.rectWithValues(x, y, w, h));
            view.layer.classList.add("modal");
        }
        else {
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new mio_foundation_web_7.NSSize(320, 200);
            var w = size.width;
            var h = size.height;
            view.setFrame(mio_foundation_web_4.NSRect.rectWithValues(0, 0, w, h));
        }
    };
    Object.defineProperty(UIPresentationController.prototype, "window", {
        get: function () {
            return this._window;
        },
        set: function (window) {
            var vc = this.presentedViewController;
            this._window = window;
            // Track view frame changes
            if (mio_foundation_web_10.MIOCoreIsMobile() == false && vc.modalPresentationStyle != UIModalPresentationStyle.CurrentContext) {
                vc.addObserver(this, "preferredContentSize");
            }
        },
        enumerable: true,
        configurable: true
    });
    UIPresentationController.prototype.observeValueForKeyPath = function (key, type, object) {
        if (key == "preferredContentSize" && type == "did") {
            var vc = this.presentedView;
            //this.window.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            vc.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            this._calculateFrame();
        }
    };
    return UIPresentationController;
}(mio_foundation_web_1.NSObject));
exports.UIPresentationController = UIPresentationController;
var MUIModalTransitioningDelegate = /** @class */ (function (_super) {
    __extends(MUIModalTransitioningDelegate, _super);
    function MUIModalTransitioningDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modalTransitionStyle = null;
        _this._presentAnimationController = null;
        _this._dissmissAnimationController = null;
        return _this;
    }
    MUIModalTransitioningDelegate.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._presentAnimationController == null) {
            this._presentAnimationController = new UIModalPresentAnimationController();
            this._presentAnimationController.init();
        }
        return this._presentAnimationController;
    };
    MUIModalTransitioningDelegate.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._dissmissAnimationController == null) {
            this._dissmissAnimationController = new UIModalDismissAnimationController();
            this._dissmissAnimationController.init();
        }
        return this._dissmissAnimationController;
    };
    return MUIModalTransitioningDelegate;
}(mio_foundation_web_1.NSObject));
exports.MUIModalTransitioningDelegate = MUIModalTransitioningDelegate;
var MUIAnimationController = /** @class */ (function (_super) {
    __extends(MUIAnimationController, _super);
    function MUIAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MUIAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0;
    };
    MUIAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions        
    };
    MUIAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MUIAnimationController.prototype.animations = function (transitionContext) {
        return null;
    };
    return MUIAnimationController;
}(mio_foundation_web_1.NSObject));
exports.MUIAnimationController = MUIAnimationController;
var UIModalPresentAnimationController = /** @class */ (function (_super) {
    __extends(UIModalPresentAnimationController, _super);
    function UIModalPresentAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIModalPresentAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.15;
    };
    UIModalPresentAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions
    };
    UIModalPresentAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIModalPresentAnimationController.prototype.animations = function (transitionContext) {
        var animations = null;
        var toVC = transitionContext.presentedViewController;
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            if (mio_foundation_web_8.MIOCoreIsPhone() == true)
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideInUp);
            else
                animations = MUIClassListForAnimationType(MUIAnimationType.BeginSheet);
        }
        return animations;
    };
    return UIModalPresentAnimationController;
}(mio_foundation_web_1.NSObject));
exports.UIModalPresentAnimationController = UIModalPresentAnimationController;
var UIModalDismissAnimationController = /** @class */ (function (_super) {
    __extends(UIModalDismissAnimationController, _super);
    function UIModalDismissAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIModalDismissAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    UIModalDismissAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    UIModalDismissAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIModalDismissAnimationController.prototype.animations = function (transitionContext) {
        var animations = null;
        var fromVC = transitionContext.presentingViewController;
        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            if (mio_foundation_web_8.MIOCoreIsPhone() == true)
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideOutDown);
            else
                animations = MUIClassListForAnimationType(MUIAnimationType.EndSheet);
        }
        return animations;
    };
    return UIModalDismissAnimationController;
}(mio_foundation_web_1.NSObject));
exports.UIModalDismissAnimationController = UIModalDismissAnimationController;
/**
 * Created by godshadow on 11/11/2016.
 */
var UIPopoverArrowDirection;
(function (UIPopoverArrowDirection) {
    UIPopoverArrowDirection[UIPopoverArrowDirection["Any"] = 0] = "Any";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Up"] = 1] = "Up";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Down"] = 2] = "Down";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Left"] = 3] = "Left";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Right"] = 4] = "Right";
})(UIPopoverArrowDirection = exports.UIPopoverArrowDirection || (exports.UIPopoverArrowDirection = {}));
var UIPopoverPresentationController = /** @class */ (function (_super) {
    __extends(UIPopoverPresentationController, _super);
    function UIPopoverPresentationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.permittedArrowDirections = UIPopoverArrowDirection.Any;
        _this.sourceView = null;
        _this.sourceRect = mio_foundation_web_4.NSRect.Zero();
        _this.delegate = null;
        _this._contentSize = null;
        _this._canvasLayer = null;
        _this._contentView = null;
        return _this;
    }
    Object.defineProperty(UIPopoverPresentationController.prototype, "transitioningDelegate", {
        get: function () {
            if (this._transitioningDelegate == null) {
                this._transitioningDelegate = new MIOModalPopOverTransitioningDelegate();
                this._transitioningDelegate.init();
            }
            return this._transitioningDelegate;
        },
        enumerable: true,
        configurable: true
    });
    UIPopoverPresentationController.prototype.presentationTransitionWillBegin = function () {
        //if (MIOCoreIsPhone() == true) return;
        this._calculateFrame();
        MUICoreLayerAddStyle(this.presentedView.layer, "popover_window");
    };
    UIPopoverPresentationController.prototype.dismissalTransitionDidEnd = function (completed) {
        if (completed == false)
            return;
        if (this.delegate != null && (typeof this.delegate.popoverPresentationControllerDidDismissPopover === "function")) {
            this.delegate.popoverPresentationControllerDidDismissPopover(this);
        }
    };
    UIPopoverPresentationController.prototype._calculateFrame = function () {
        var vc = this.presentedViewController;
        var view = this.presentedView;
        var w = vc.preferredContentSize.width;
        var h = vc.preferredContentSize.height;
        var v = vc.popoverPresentationController.sourceView;
        var f = vc.popoverPresentationController.sourceRect;
        var xShift = false;
        // Below
        var y = v.layer.getBoundingClientRect().top + f.size.height + 10;
        if ((y + h) > window.innerHeight) // Below no, Up?
            y = v.layer.getBoundingClientRect().top - h - 10;
        if (y < 0) // Up no, horizonal shift
         {
            xShift = true;
            y = (window.innerHeight - h) / 2;
        }
        var x = 0;
        if (xShift == false) {
            x = v.layer.getBoundingClientRect().left + 10;
            if ((x + w) > window.innerWidth)
                x = v.layer.getBoundingClientRect().left + f.size.width - w + 10;
        }
        else {
            x = v.layer.getBoundingClientRect().left + f.size.width + 10;
            if ((x + w) > window.innerWidth)
                x = v.layer.getBoundingClientRect().left - w - 10;
        }
        view.setFrame(mio_foundation_web_4.NSRect.rectWithValues(0, 0, w, h));
        this.window.setFrame(mio_foundation_web_4.NSRect.rectWithValues(x, y, w, h));
    };
    UIPopoverPresentationController.prototype._drawRoundRect = function (x, y, width, height, radius) {
        var ctx = this._canvasLayer.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        var color = 'rgba(208, 208, 219, 1)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
    };
    return UIPopoverPresentationController;
}(UIPresentationController));
exports.UIPopoverPresentationController = UIPopoverPresentationController;
var MIOModalPopOverTransitioningDelegate = /** @class */ (function (_super) {
    __extends(MIOModalPopOverTransitioningDelegate, _super);
    function MIOModalPopOverTransitioningDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modalTransitionStyle = null;
        _this._showAnimationController = null;
        _this._dissmissAnimationController = null;
        return _this;
    }
    MIOModalPopOverTransitioningDelegate.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._showAnimationController == null) {
            // if (MIOCoreIsPhone() == false) {
            this._showAnimationController = new MIOPopOverPresentAnimationController();
            this._showAnimationController.init();
            // }
            // else {
            //     this._showAnimationController = new MIOModalPresentAnimationController();
            //     this._showAnimationController.init();
            // }
        }
        return this._showAnimationController;
    };
    MIOModalPopOverTransitioningDelegate.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._dissmissAnimationController == null) {
            //            if (MIOCoreIsPhone() == false) {
            this._dissmissAnimationController = new MIOPopOverDismissAnimationController();
            this._dissmissAnimationController.init();
            // }
            // else {
            //     this._dissmissAnimationController = new MIOModalDismissAnimationController();
            //     this._dissmissAnimationController.init();    
            // }
        }
        return this._dissmissAnimationController;
    };
    return MIOModalPopOverTransitioningDelegate;
}(mio_foundation_web_1.NSObject));
exports.MIOModalPopOverTransitioningDelegate = MIOModalPopOverTransitioningDelegate;
var MIOPopOverPresentAnimationController = /** @class */ (function (_super) {
    __extends(MIOPopOverPresentAnimationController, _super);
    function MIOPopOverPresentAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOPopOverPresentAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MIOPopOverPresentAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions
    };
    MIOPopOverPresentAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOPopOverPresentAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.FadeIn);
        return animations;
    };
    return MIOPopOverPresentAnimationController;
}(mio_foundation_web_1.NSObject));
exports.MIOPopOverPresentAnimationController = MIOPopOverPresentAnimationController;
var MIOPopOverDismissAnimationController = /** @class */ (function (_super) {
    __extends(MIOPopOverDismissAnimationController, _super);
    function MIOPopOverDismissAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOPopOverDismissAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MIOPopOverDismissAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    MIOPopOverDismissAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOPopOverDismissAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.FadeOut);
        return animations;
    };
    return MIOPopOverDismissAnimationController;
}(mio_foundation_web_1.NSObject));
exports.MIOPopOverDismissAnimationController = MIOPopOverDismissAnimationController;
var UINavigationItem = /** @class */ (function (_super) {
    __extends(UINavigationItem, _super);
    function UINavigationItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backBarButtonItem = null;
        _this.titleView = null;
        _this.title = null;
        _this.leftView = null;
        _this.rightView = null;
        return _this;
    }
    UINavigationItem.prototype.initWithLayer = function (layer) {
        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                if (subLayer.getAttribute("data-nav-item-left") != null) {
                    var v = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.leftView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-center") != null) {
                    var v = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.titleView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-right") != null) {
                    var v = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.rightView = v;
                }
            }
            var backButtonLayer = MUICoreLayerSearchElementByAttribute(layer, "data-nav-item-back");
            if (backButtonLayer != null) {
                this.backBarButtonItem = new UIButton();
                this.backBarButtonItem.initWithLayer(backButtonLayer, this);
            }
        }
    };
    return UINavigationItem;
}(mio_foundation_web_1.NSObject));
exports.UINavigationItem = UINavigationItem;
function UINavItemSearchInLayer(layer) {
    if (layer.childNodes.length > 0) {
        for (var index = 0; index < layer.childNodes.length; index++) {
            var subLayer = layer.childNodes[index];
            if (subLayer.tagName != "DIV")
                continue;
            if (subLayer.getAttribute("data-nav-item") != null) {
                var ni = new UINavigationItem();
                ni.initWithLayer(subLayer);
                // Check for tittle if center view doesn't exists
                if (ni.titleView == null) {
                    var title = subLayer.getAttribute("data-nav-item-title");
                    if (title != null)
                        ni.title = title;
                }
                return ni;
            }
        }
    }
    return null;
}
exports.UINavItemSearchInLayer = UINavItemSearchInLayer;
/**
 * Created by godshadow on 9/4/16.
 */
var UINavigationController = /** @class */ (function (_super) {
    __extends(UINavigationController, _super);
    function UINavigationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootViewController = null;
        _this.viewControllersStack = [];
        _this.currentViewControllerIndex = -1;
        // Transitioning delegate
        _this._pushAnimationController = null;
        _this._popAnimationController = null;
        return _this;
    }
    UINavigationController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.view.layer.style.overflow = "hidden";
    };
    UINavigationController.prototype.initWithRootViewController = function (vc) {
        this.init();
        this.setRootViewController(vc);
    };
    UINavigationController.prototype.setRootViewController = function (vc) {
        //this.transitioningDelegate = this;
        this.rootViewController = vc;
        this.view.addSubview(vc.view);
        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex = 0;
        this.rootViewController.navigationController = this;
        this.addChildViewController(vc);
        // if (this.presentationController != null) {
        //     var size = vc.preferredContentSize;
        //     this.contentSize = size;
        // }
    };
    UINavigationController.prototype.viewWillAppear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewWillAppear(animated);
    };
    UINavigationController.prototype.viewDidAppear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewDidAppear(animated);
    };
    UINavigationController.prototype.viewWillDisappear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewWillDisappear(animated);
    };
    UINavigationController.prototype.viewDidDisappear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewDidDisappear(animated);
    };
    UINavigationController.prototype.pushViewController = function (vc, animated) {
        var lastVC = this.viewControllersStack[this.currentViewControllerIndex];
        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex++;
        vc.navigationController = this;
        vc.onLoadView(this, function () {
            if (vc.navigationItem != null && vc.navigationItem.backBarButtonItem != null) {
                vc.navigationItem.backBarButtonItem.setAction(this, function () {
                    vc.navigationController.popViewController();
                });
            }
            this.view.addSubview(vc.view);
            this.addChildViewController(vc);
            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;
            _MUIShowViewController(lastVC, vc, this, animated);
        });
    };
    UINavigationController.prototype.popViewController = function (animated) {
        if (this.currentViewControllerIndex == 0)
            return;
        var fromVC = this.viewControllersStack[this.currentViewControllerIndex];
        this.currentViewControllerIndex--;
        this.viewControllersStack.pop();
        var toVC = this.viewControllersStack[this.currentViewControllerIndex];
        // if (toVC.transitioningDelegate == null)
        //     toVC.transitioningDelegate = this;
        if (toVC.preferredContentSize != null)
            this.contentSize = toVC.preferredContentSize;
        _MUIHideViewController(fromVC, toVC, this, this, function () {
            fromVC.removeChildViewController(this);
            fromVC.view.removeFromSuperview();
        });
    };
    UINavigationController.prototype.popToRootViewController = function (animated) {
        if (this.viewControllersStack.length == 1)
            return;
        var currentVC = this.viewControllersStack.pop();
        for (var index = this.currentViewControllerIndex - 1; index > 0; index--) {
            var vc = this.viewControllersStack.pop();
            vc.view.removeFromSuperview();
            this.removeChildViewController(vc);
        }
        this.currentViewControllerIndex = 0;
        var rootVC = this.viewControllersStack[0];
        this.contentSize = rootVC.preferredContentSize;
        _MUIHideViewController(currentVC, rootVC, this, this, function () {
            currentVC.view.removeFromSuperview();
            this.removeChildViewController(currentVC);
        });
    };
    Object.defineProperty(UINavigationController.prototype, "preferredContentSize", {
        get: function () {
            if (this.currentViewControllerIndex < 0)
                return this._preferredContentSize;
            var vc = this.viewControllersStack[this.currentViewControllerIndex];
            return vc.preferredContentSize;
        },
        set: function (size) {
            this.setPreferredContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    UINavigationController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._pushAnimationController == null) {
            this._pushAnimationController = new MUIPushAnimationController();
            this._pushAnimationController.init();
        }
        return this._pushAnimationController;
    };
    UINavigationController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._popAnimationController == null) {
            this._popAnimationController = new MUIPopAnimationController();
            this._popAnimationController.init();
        }
        return this._popAnimationController;
    };
    return UINavigationController;
}(UIViewController));
exports.UINavigationController = UINavigationController;
/*
    ANIMATIONS
 */
var MUIPushAnimationController = /** @class */ (function (_super) {
    __extends(MUIPushAnimationController, _super);
    function MUIPushAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MUIPushAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MUIPushAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions       
    };
    MUIPushAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MUIPushAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.Push);
        return animations;
    };
    return MUIPushAnimationController;
}(mio_foundation_web_1.NSObject));
exports.MUIPushAnimationController = MUIPushAnimationController;
var MUIPopAnimationController = /** @class */ (function (_super) {
    __extends(MUIPopAnimationController, _super);
    function MUIPopAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MUIPopAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MUIPopAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    MUIPopAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MUIPopAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.Pop);
        return animations;
    };
    return MUIPopAnimationController;
}(mio_foundation_web_1.NSObject));
exports.MUIPopAnimationController = MUIPopAnimationController;
/**
 * Created by godshadow on 05/08/16.
 */
var UISplitViewControllerDisplayMode;
(function (UISplitViewControllerDisplayMode) {
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["Automatic"] = 0] = "Automatic";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["PrimaryHidden"] = 1] = "PrimaryHidden";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["AllVisible"] = 2] = "AllVisible";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["PrimaryOverlay"] = 3] = "PrimaryOverlay";
})(UISplitViewControllerDisplayMode = exports.UISplitViewControllerDisplayMode || (exports.UISplitViewControllerDisplayMode = {}));
var UISplitViewController = /** @class */ (function (_super) {
    __extends(UISplitViewController, _super);
    function UISplitViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.masterView = null;
        _this.detailView = null;
        _this.preferredDisplayMode = UISplitViewControllerDisplayMode.Automatic;
        _this._displayModeButtonItem = null;
        _this._collapsed = false;
        _this._masterViewController = null;
        _this._detailViewController = null;
        // Transitioning delegate
        _this._pushAnimationController = null;
        _this._popAnimationController = null;
        return _this;
    }
    UISplitViewController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.masterView = new UIView();
        this.masterView.init();
        if (mio_foundation_web_8.MIOCoreIsPhone() == false)
            MUICoreLayerAddStyle(this.masterView.layer, "master-view");
        this.view.addSubview(this.masterView);
        if (mio_foundation_web_8.MIOCoreIsPhone() == false) {
            this.detailView = new UIView();
            this.detailView.init();
            MUICoreLayerAddStyle(this.detailView.layer, "detail-view");
            this.view.addSubview(this.detailView);
        }
    };
    Object.defineProperty(UISplitViewController.prototype, "displayMode", {
        get: function () {
            return UISplitViewControllerDisplayMode.Automatic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "displayModeButtonItem", {
        get: function () {
            if (this._displayModeButtonItem != null)
                return this._displayModeButtonItem;
            this._displayModeButtonItem = new UIButton();
            this._displayModeButtonItem.initWithAction(this, this.displayModeButtonItemAction);
            return this._displayModeButtonItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "collapsed", {
        get: function () {
            return this._collapsed;
        },
        enumerable: true,
        configurable: true
    });
    UISplitViewController.prototype.setCollapsed = function (value) {
        this.willChangeValue("collapsed");
        this._collapsed = value;
        this.didChangeValue("collapsed");
    };
    UISplitViewController.prototype.setMasterViewController = function (vc) {
        if (this._masterViewController != null) {
            this._masterViewController.view.removeFromSuperview();
            this.removeChildViewController(this._masterViewController);
            this._masterViewController = null;
        }
        if (vc != null) {
            vc.parent = this;
            vc.splitViewController = this;
            this.masterView.addSubview(vc.view);
            this.addChildViewController(vc);
            this._masterViewController = vc;
        }
    };
    UISplitViewController.prototype.setDetailViewController = function (vc) {
        if (mio_foundation_web_8.MIOCoreIsPhone() == true)
            return;
        if (this._detailViewController != null) {
            this._detailViewController.view.removeFromSuperview();
            this.removeChildViewController(this._detailViewController);
            this._detailViewController = null;
        }
        if (vc != null) {
            vc.parent = this;
            vc.splitViewController = this;
            this.detailView.addSubview(vc.view);
            this.addChildViewController(vc);
            this._detailViewController = vc;
        }
    };
    UISplitViewController.prototype.showDetailViewController = function (vc) {
        vc.splitViewController = this;
        if (mio_foundation_web_8.MIOCoreIsPhone() == true) {
            this._pushDetailViewController(vc);
        }
        else {
            this._showDetailViewController(vc);
        }
    };
    Object.defineProperty(UISplitViewController.prototype, "masterViewController", {
        get: function () {
            return this._masterViewController;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "detailViewController", {
        get: function () {
            return this._detailViewController;
        },
        enumerable: true,
        configurable: true
    });
    UISplitViewController.prototype._showDetailViewController = function (vc) {
        var oldVC = this._detailViewController;
        var newVC = vc;
        if (oldVC == newVC)
            return;
        newVC.onLoadView(this, function () {
            this.detailView.addSubview(newVC.view);
            this.addChildViewController(newVC);
            this._detailViewController = vc;
            _MUIShowViewController(oldVC, newVC, this, false, this, function () {
                oldVC.view.removeFromSuperview();
                this.removeChildViewController(oldVC);
            });
        });
    };
    UISplitViewController.prototype._pushDetailViewController = function (vc) {
        var oldVC = this._masterViewController;
        //if (vc.transitioningDelegate == null) vc.transitioningDelegate = this;
        vc.onLoadView(this, function () {
            this.view.addSubview(vc.view);
            this.addChildViewController(vc);
            this._detailViewController = vc;
            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;
            _MUIShowViewController(oldVC, vc, this, true, this, function () {
                this.setCollapsed(true);
            });
        });
    };
    UISplitViewController.prototype._popViewController = function () {
        var fromVC = this.detailViewController;
        var toVC = this.masterViewController;
        // if (toVC.transitioningDelegate == null)
        //     toVC.transitioningDelegate = this;
        if (toVC.preferredContentSize != null)
            this.contentSize = toVC.preferredContentSize;
        _MUIHideViewController(fromVC, toVC, this, this, function () {
            fromVC.removeChildViewController(this);
            fromVC.view.removeFromSuperview();
        });
    };
    UISplitViewController.prototype.displayModeButtonItemAction = function () {
        if (mio_foundation_web_8.MIOCoreIsPhone() == true)
            this._popViewController();
    };
    UISplitViewController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (mio_foundation_web_8.MIOCoreIsPhone() == false)
            return;
        if (this._pushAnimationController == null) {
            this._pushAnimationController = new MUIPushAnimationController();
            this._pushAnimationController.init();
        }
        return this._pushAnimationController;
    };
    UISplitViewController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (mio_foundation_web_8.MIOCoreIsPhone() == false)
            return;
        if (this._popAnimationController == null) {
            this._popAnimationController = new MUIPopAnimationController();
            this._popAnimationController.init();
        }
        return this._popAnimationController;
    };
    return UISplitViewController;
}(UIViewController));
exports.UISplitViewController = UISplitViewController;
function MUIOutletRegister(owner, layerID, c) {
    owner._outlets[layerID] = c;
}
exports.MUIOutletRegister = MUIOutletRegister;
function MUIOutletQuery(owner, layerID) {
    return owner._outlets[layerID];
}
exports.MUIOutletQuery = MUIOutletQuery;
function MUIOutlet(owner, elementID, className, options) {
    //var layer = document.getElementById(elementID);
    var query = MUIOutletQuery(owner, elementID);
    if (query != null)
        return query;
    var layer = null;
    if (owner instanceof UIView)
        layer = MUICoreLayerSearchElementByID(owner.layer, elementID);
    else if (owner instanceof UIViewController)
        layer = MUICoreLayerSearchElementByID(owner.view.layer, elementID);
    if (layer == null)
        return null; // Element not found
    //throw new Error(`DIV identifier specified is not valid (${elementID})`);
    if (className == null)
        className = layer.getAttribute("data-class");
    if (className == null)
        className = "UIView";
    var classInstance = mio_foundation_web_5.NSClassFromString(className);
    classInstance.initWithLayer(layer, owner, options);
    // Track outlets inside view controller (owner)
    MUIOutletRegister(owner, elementID, classInstance);
    if (owner instanceof UIView)
        owner._linkViewToSubview(classInstance);
    else if (owner instanceof UIViewController) {
        if (classInstance instanceof UIView) {
            owner.view._linkViewToSubview(classInstance);
        }
        else if (classInstance instanceof UIViewController)
            owner.addChildViewController(classInstance);
        else
            throw new Error("UIOutlet: Wrong type");
    }
    if (classInstance instanceof UIView)
        classInstance.awakeFromHTML();
    return classInstance;
}
exports.MUIOutlet = MUIOutlet;
function MUIWindowSize() {
    var w = document.body.clientWidth;
    //var h = document.body.clientHeight;window.innerHeight
    var h = window.innerHeight;
    return new mio_foundation_web_7.NSSize(w, h);
}
exports.MUIWindowSize = MUIWindowSize;
function _MUIShowViewController(fromVC, toVC, sourceVC, animated, target, completion) {
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();
    if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
        fromVC.viewWillDisappear();
        //fromVC._childControllersWillDisappear();
    }
    var view = null;
    var pc = toVC.presentationController;
    if (pc != null)
        view = pc.presentedView;
    else
        view = toVC.view;
    if (animated == false) {
        _MUIAnimationDidStart(fromVC, toVC, pc, target, completion);
        return;
    }
    // Let's go for the animations!!
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = view;
    if (pc != null)
        pc.presentationTransitionWillBegin();
    var ac = null;
    if (toVC.transitioningDelegate != null) {
        ac = toVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (sourceVC != null && typeof sourceVC.animationControllerForPresentedController === "function") {
        ac = sourceVC.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (pc != null) {
        ac = pc.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    //view.setNeedsDisplay();
    var layer = view.layer;
    _MUIAnimationStart(layer, ac, animationContext, this, function () {
        _MUIAnimationDidStart(fromVC, toVC, pc, target, completion);
    });
}
exports._MUIShowViewController = _MUIShowViewController;
function _MUIAnimationDidStart(fromVC, toVC, pc, target, completion) {
    toVC.viewDidAppear();
    //toVC._childControllersDidAppear();
    if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
    }
    if (pc != null) {
        pc.presentationTransitionDidEnd(true);
        pc._isPresented = true;
    }
    if (target != null && completion != null)
        completion.call(target);
}
exports._MUIAnimationDidStart = _MUIAnimationDidStart;
function _MUIHideViewController(fromVC, toVC, sourceVC, target, completion) {
    if (fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext
        || mio_foundation_web_8.MIOCoreIsPhone() == true) {
        toVC.viewWillAppear();
        //toVC._childControllersWillAppear();
        //toVC.view.layout();
    }
    fromVC.viewWillDisappear();
    //fromVC._childControllersWillDisappear();
    var view = null;
    var pc = fromVC.presentationController;
    if (pc != null)
        view = pc.presentedView;
    else
        view = fromVC.view;
    var ac = null;
    if (fromVC.transitioningDelegate != null) {
        ac = fromVC.transitioningDelegate.animationControllerForDismissedController(fromVC);
    }
    else if (sourceVC != null && typeof sourceVC.animationControllerForDismissedController === "function") {
        ac = sourceVC.animationControllerForDismissedController(fromVC);
    }
    else if (pc != null) {
        ac = pc.transitioningDelegate.animationControllerForDismissedController(fromVC);
    }
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = view;
    var layer = view.layer;
    if (pc != null)
        pc.dismissalTransitionWillBegin();
    _MUIAnimationStart(layer, ac, animationContext, this, function () {
        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
            toVC.viewDidAppear();
            //toVC._childControllersDidAppear();
        }
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
        if (pc != null) {
            pc.dismissalTransitionDidEnd(true);
            pc._isPresented = false;
        }
        if (target != null && completion != null)
            completion.call(target);
    });
}
exports._MUIHideViewController = _MUIHideViewController;
function _MUITransitionFromViewControllerToViewController(fromVC, toVC, sourceVC, target, completion) {
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();
    fromVC.viewWillDisappear();
    //fromVC._childControllersWillDisappear();
    //toVC.view.layout();
    var ac = null;
    if (toVC.transitioningDelegate != null) {
        ac = toVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (sourceVC != null && sourceVC.transitioningDelegate != null) {
        ac = sourceVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = toVC;
    var layer = toVC.view.layer;
    _MUIAnimationStart(layer, ac, animationContext, this, function () {
        toVC.viewDidAppear();
        //toVC._childControllersDidAppear();
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
        if (target != null && completion != null)
            completion.call(target);
    });
}
exports._MUITransitionFromViewControllerToViewController = _MUITransitionFromViewControllerToViewController;
/**
 * Created by godshadow on 11/3/16.
 */
var UIWindow = /** @class */ (function (_super) {
    __extends(UIWindow, _super);
    function UIWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootViewController = null;
        _this._resizeWindow = false;
        return _this;
    }
    UIWindow.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayerAddStyle(this.layer, "view");
    };
    UIWindow.prototype.initWithRootViewController = function (vc) {
        this.init();
        this.rootViewController = vc;
        this.addSubview(vc.view);
    };
    UIWindow.prototype.makeKey = function () {
        UIApplication.sharedInstance().makeKeyWindow(this);
    };
    UIWindow.prototype.makeKeyAndVisible = function () {
        this.makeKey();
        this.setHidden(false);
    };
    UIWindow.prototype.layoutSubviews = function () {
        if (this.rootViewController != null)
            this.rootViewController.view.layoutSubviews();
        else
            _super.prototype.layoutSubviews.call(this);
    };
    UIWindow.prototype.addSubview = function (view) {
        view._window = this;
        _super.prototype.addSubview.call(this, view);
    };
    UIWindow.prototype._addLayerToDOM = function () {
        if (this._isLayerInDOM == true)
            return;
        if (this.layer == null)
            return;
        document.body.appendChild(this.layer);
        this._isLayerInDOM = true;
    };
    UIWindow.prototype.removeFromSuperview = function () {
        this._removeLayerFromDOM();
    };
    UIWindow.prototype._removeLayerFromDOM = function () {
        if (this._isLayerInDOM == false)
            return;
        document.body.removeChild(this.layer);
        this._isLayerInDOM = false;
    };
    UIWindow.prototype.setHidden = function (hidden) {
        if (hidden == false) {
            this._addLayerToDOM();
        }
        else {
            this._removeLayerFromDOM();
        }
    };
    UIWindow.prototype._eventHappendOutsideWindow = function () {
        this._dismissRootViewController();
    };
    UIWindow.prototype._becameKeyWindow = function () {
    };
    UIWindow.prototype._resignKeyWindow = function () {
        this._dismissRootViewController();
    };
    UIWindow.prototype._dismissRootViewController = function () {
        if (this.rootViewController.isPresented == true) {
            var pc = this.rootViewController.presentationController;
            if (pc instanceof UIPopoverPresentationController)
                this.rootViewController.dismissViewController(true);
        }
    };
    return UIWindow;
}(UIView));
exports.UIWindow = UIWindow;
/**
 * Created by godshadow on 11/3/16.
 */
var UIApplication = /** @class */ (function () {
    function UIApplication() {
        this.delegate = null;
        this.isMobile = false;
        this.defaultLanguage = null;
        this.currentLanguage = null;
        this.languages = null;
        this.ready = false;
        this.downloadCoreFileCount = 0;
        this._sheetViewController = null;
        this._sheetSize = null;
        //private _popUpMenuView = null;
        this._popUpMenu = null;
        this._popUpMenuControl = null;
        this._popOverWindow = null;
        this._popOverWindowFirstClick = false;
        this._popOverViewController = null;
        this._windows = [];
        this._keyWindow = null;
        this._mainWindow = null;
        this.mainResourceURLString = null;
        // addWindow(window:UIWindow){
        //     this._windows.push(window);
        // }
        this.windowZIndexOffset = 0;
        if (UIApplication._sharedInstance != null) {
            throw new Error("UIWebApplication: Instantiation failed: Use sharedInstance() instead of new.");
        }
    }
    UIApplication.sharedInstance = function () {
        if (UIApplication._sharedInstance == null) {
            UIApplication._sharedInstance = new UIApplication();
        }
        return UIApplication._sharedInstance;
    };
    //TODO: Set language in the webworker also.
    UIApplication.prototype.setLanguage = function (lang, target, completion) {
        var languages = mio_foundation_web_15.MIOCoreGetLanguages();
        if (languages == null) {
            completion.call(target);
        }
        var url = languages[lang];
        if (url == null) {
            completion.call(target);
        }
        var request = mio_foundation_web_11.NSURLRequest.requestWithURL(mio_foundation_web_14.NSURL.urlWithString(url));
        var con = new mio_foundation_web_12.NSURLConnection();
        con.initWithRequestBlock(request, this, function (code, data) {
            if (code == 200) {
                mio_foundation_web_19.MIOCoreStringSetLocalizedStrings(JSON.parse(data.replace(/(\r\n|\n|\r)/gm, "")));
            }
            completion.call(target);
        });
    };
    UIApplication.prototype.downloadAppPlist = function (target, completion) {
        var request = mio_foundation_web_11.NSURLRequest.requestWithURL(mio_foundation_web_14.NSURL.urlWithString("app.plist"));
        var con = new mio_foundation_web_12.NSURLConnection();
        con.initWithRequestBlock(request, this, function (code, data) {
            if (code == 200) {
                mio_foundation_web_18.MIOCoreBundleSetAppResource("app", "plist", data);
            }
            completion.call(target, data);
        });
    };
    UIApplication.prototype.run = function () {
        this.downloadAppPlist(this, function (data) {
            if (data == null)
                throw new Error("We couldn't download the app.plist");
            // Get Languages from the app.plist
            var config = mio_foundation_web_13.NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);
            this.mainResourceURLString = config["UIMainStoryboardFile"];
            var langs = config["Languages"];
            if (langs == null)
                this._run();
            for (var key in langs) {
                var url = langs[key];
                mio_foundation_web_16.MIOCoreAddLanguage(key, url);
            }
            var lang = mio_foundation_web_17.MIOCoreGetPlatformLanguage();
            this.setLanguage(lang, this, function () {
                this._run();
            });
        });
    };
    UIApplication.prototype._run = function () {
        this.delegate.didFinishLaunching();
        this._mainWindow = this.delegate.window;
        if (this._mainWindow == null) {
            MUICoreBundleLoadNibName(this.mainResourceURLString, this, function (vc) {
                this.delegate.window = new UIWindow();
                this.delegate.window.initWithRootViewController(vc);
                this._launchApp();
            });
        }
        else
            this._launchApp();
    };
    UIApplication.prototype._launchApp = function () {
        this.delegate.window.makeKeyAndVisible();
        this.delegate.window.rootViewController.onLoadView(this, function () {
            this.delegate.window.rootViewController.viewWillAppear(false);
            this.delegate.window.rootViewController.viewDidAppear(false);
            this.ready = true;
            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Click, this, this._clickEvent);
            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Resize, this, this._resizeEvent);
        });
    };
    UIApplication.prototype.setLanguageURL = function (key, url) {
        if (this.languages == null)
            this.languages = {};
        this.languages[key] = url;
    };
    UIApplication.prototype.setDefaultLanguage = function (key) {
        this.defaultLanguage = key;
    };
    UIApplication.prototype.downloadLanguage = function (key, fn) {
        var url = this.languages[key];
        // Download
        var conn = new mio_foundation_web_12.NSURLConnection();
        conn.initWithRequestBlock(mio_foundation_web_11.NSURLRequest.requestWithURL(url), this, function (error, data) {
            if (data != null) {
                var json = JSON.parse(data.replace(/(\r\n|\n|\r)/gm, ""));
                mio_foundation_web_19.MIOCoreStringSetLocalizedStrings(json);
            }
            fn.call(this);
        });
    };
    UIApplication.prototype.showModalViewContoller = function (vc) {
        var w = new UIWindow();
        w.initWithRootViewController(vc);
        // Add new window
        document.body.appendChild(vc.view.layer);
        //this.addWindow(w);
    };
    UIApplication.prototype.showMenuFromControl = function (control, menu) {
        if (this._popUpMenu != null) {
            if (menu.layerID != this._popUpMenu.layerID)
                this._popUpMenu.hide();
        }
        this._popUpMenuControl = control;
        this._popUpMenu = menu;
        this.delegate.window.addSubview(this._popUpMenu);
        var x = control.layer.getBoundingClientRect().left;
        var y = control.layer.getBoundingClientRect().top + control.layer.getBoundingClientRect().height;
        this._popUpMenu.setX(x);
        this._popUpMenu.setY(y);
        this._popUpMenu.layer.style.zIndex = 200;
        this._popUpMenu.layout();
    };
    UIApplication.prototype.hideMenu = function () {
        if (this._popUpMenu != null) {
            this._popUpMenu.removeFromSuperview();
            this._popUpMenu = null;
        }
    };
    UIApplication.prototype._resizeEvent = function (event) {
        this.delegate.window.layoutSubviews();
    };
    UIApplication.prototype._clickEvent = function (event) {
        var target = event.coreEvent.target;
        var x = event.x;
        var y = event.y;
        // Checking popup menus
        if (this._popUpMenu != null) {
            var controlRect = this._popUpMenuControl.layer.getBoundingClientRect();
            if ((x > controlRect.left && x < controlRect.right)
                && (y > controlRect.top && y < controlRect.bottom)) {
                // Nothing
            }
            else {
                this._popUpMenu.hide();
            }
        }
        // Checking windows
        if (this._keyWindow != null) {
            var controlRect = this._keyWindow.layer.getBoundingClientRect();
            //console.log("x: " + controlRect.left + " mx: " + x);
            if ((x > controlRect.left && x < controlRect.right)
                && (y > controlRect.top && y < controlRect.bottom)) {
                //Nothing. Forward the event
            }
            else
                this._keyWindow._eventHappendOutsideWindow();
        }
    };
    UIApplication.prototype.setPopOverViewController = function (vc) {
        if (this._popOverViewController != null)
            this._popOverViewController.dismissViewController(true);
        this._popOverViewController = vc;
    };
    UIApplication.prototype.showPopOverControllerFromRect = function (vc, frame) {
        if (this._popOverWindow != null) {
            this.hidePopOverController();
        }
        if (this._popOverWindow == null) {
            this._popOverWindow = new UIWindow("popover_window");
            this._popOverWindow.initWithRootViewController(vc.popoverPresentationController());
            //this._popOverWindow.layer.style.border = "2px solid rgb(170, 170, 170)";
            this._popOverWindow.setFrame(vc.popoverPresentationController().frame);
            //this.addWindow(this._popOverWindow);
        }
        this._popOverWindow.rootViewController.onLoadView(this, function () {
            this._popOverWindow.rootViewController.viewWillAppear(true);
            this._popOverWindow.rootViewController.viewDidAppear(true);
        });
        this._popOverWindowFirstClick = true;
    };
    UIApplication.prototype.hidePopOverController = function () {
        this._popOverWindow.rootViewController.viewWillDisappear(true);
        this._popOverWindow.removeFromSuperview();
        this._popOverWindow.rootViewController.viewDidDisappear(true);
        this._popOverWindow = null;
    };
    UIApplication.prototype.makeKeyWindow = function (window) {
        if (this._keyWindow === window)
            return;
        if (this._keyWindow != null) {
            this._keyWindow._resignKeyWindow();
            //this.windowZIndexOffset -= 10;
        }
        //this.addWindow(window);
        this._keyWindow = window;
        //window.layer.style.zIndex = this.windowZIndexOffset;
        //this.windowZIndexOffset += 10;
    };
    return UIApplication;
}());
exports.UIApplication = UIApplication;
//# sourceMappingURL=UIKit.web.js.map