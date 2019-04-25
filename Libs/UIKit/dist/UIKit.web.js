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
function UIOutletRegister(owner, layerID, c) {
    owner._outlets[layerID] = c;
}
exports.UIOutletRegister = UIOutletRegister;
function UIOutletQuery(owner, layerID) {
    return owner._outlets[layerID];
}
exports.UIOutletQuery = UIOutletQuery;
function UIOutlet(owner, elementID, className, options) {
    //var layer = document.getElementById(elementID);
    var query = UIOutletQuery(owner, elementID);
    if (query != null)
        return query;
    var layer = null;
    if (owner instanceof UIView)
        layer = UILayerSearchElementByID(owner.layer, elementID);
    else if (owner instanceof UIViewController)
        layer = UILayerSearchElementByID(owner.view.layer, elementID);
    if (layer == null)
        return null; // Element not found
    //throw new Error(`DIV identifier specified is not valid (${elementID})`);
    if (className == null)
        className = layer.getAttribute("data-class");
    if (className == null)
        className = "UIView";
    var classInstance = NSClassFromString(className);
    classInstance.initWithLayer(layer, owner, options);
    // Track outlets inside view controller (owner)
    UIOutletRegister(owner, elementID, classInstance);
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
exports.UIOutlet = UIOutlet;
function UIWindowSize() {
    var w = document.body.clientWidth;
    //var h = document.body.clientHeight;window.innerHeight
    var h = window.innerHeight;
    return new NSSize(w, h);
}
exports.UIWindowSize = UIWindowSize;
function _MIUShowViewController(fromVC, toVC, sourceVC, animated, target, completion) {
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
        _UIAnimationDidStart(fromVC, toVC, pc, target, completion);
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
    _UIAnimationStart(layer, ac, animationContext, this, function () {
        _UIAnimationDidStart(fromVC, toVC, pc, target, completion);
    });
}
exports._MIUShowViewController = _MIUShowViewController;
function _UIAnimationDidStart(fromVC, toVC, pc, target, completion) {
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
exports._UIAnimationDidStart = _UIAnimationDidStart;
function _UIHideViewController(fromVC, toVC, sourceVC, target, completion) {
    if (fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext
        || MIOCoreIsPhone() == true) {
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
    _UIAnimationStart(layer, ac, animationContext, this, function () {
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
exports._UIHideViewController = _UIHideViewController;
function _UITransitionFromViewControllerToViewController(fromVC, toVC, sourceVC, target, completion) {
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
    _UIAnimationStart(layer, ac, animationContext, this, function () {
        toVC.viewDidAppear();
        //toVC._childControllersDidAppear();
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
        if (target != null && completion != null)
            completion.call(target);
    });
}
exports._UITransitionFromViewControllerToViewController = _UITransitionFromViewControllerToViewController;
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
/*
    ANIMATIONS
 */
var UIAnimationType;
(function (UIAnimationType) {
    UIAnimationType[UIAnimationType["None"] = 0] = "None";
    UIAnimationType[UIAnimationType["BeginSheet"] = 1] = "BeginSheet";
    UIAnimationType[UIAnimationType["EndSheet"] = 2] = "EndSheet";
    UIAnimationType[UIAnimationType["Push"] = 3] = "Push";
    UIAnimationType[UIAnimationType["Pop"] = 4] = "Pop";
    UIAnimationType[UIAnimationType["FlipLeft"] = 5] = "FlipLeft";
    UIAnimationType[UIAnimationType["FlipRight"] = 6] = "FlipRight";
    UIAnimationType[UIAnimationType["FadeIn"] = 7] = "FadeIn";
    UIAnimationType[UIAnimationType["FadeOut"] = 8] = "FadeOut";
    UIAnimationType[UIAnimationType["LightSpeedIn"] = 9] = "LightSpeedIn";
    UIAnimationType[UIAnimationType["LightSpeedOut"] = 10] = "LightSpeedOut";
    UIAnimationType[UIAnimationType["Hinge"] = 11] = "Hinge";
    UIAnimationType[UIAnimationType["SlideInUp"] = 12] = "SlideInUp";
    UIAnimationType[UIAnimationType["SlideOutDown"] = 13] = "SlideOutDown";
    UIAnimationType[UIAnimationType["SlideInRight"] = 14] = "SlideInRight";
    UIAnimationType[UIAnimationType["SlideOutRight"] = 15] = "SlideOutRight";
    UIAnimationType[UIAnimationType["SlideInLeft"] = 16] = "SlideInLeft";
    UIAnimationType[UIAnimationType["SlideOutLeft"] = 17] = "SlideOutLeft";
    UIAnimationType[UIAnimationType["HorizontalOutFlip"] = 18] = "HorizontalOutFlip";
    UIAnimationType[UIAnimationType["HorizontalInFlip"] = 19] = "HorizontalInFlip";
    UIAnimationType[UIAnimationType["ZoomIn"] = 20] = "ZoomIn";
    UIAnimationType[UIAnimationType["ZoomOut"] = 21] = "ZoomOut";
})(UIAnimationType = exports.UIAnimationType || (exports.UIAnimationType = {}));
// ANIMATION TYPES
function UIClassListForAnimationType(type) {
    var array = [];
    array.push("animated");
    switch (type) {
        case UIAnimationType.BeginSheet:
            array.push("slideInDown");
            break;
        case UIAnimationType.EndSheet:
            array.push("slideOutUp");
            break;
        case UIAnimationType.Push:
            array.push("slideInRight");
            break;
        case UIAnimationType.Pop:
            array.push("slideOutRight");
            break;
        case UIAnimationType.FadeIn:
            array.push("fadeIn");
            break;
        case UIAnimationType.FadeOut:
            array.push("fadeOut");
            break;
        case UIAnimationType.LightSpeedOut:
            array.push("lightSpeedOut");
            break;
        case UIAnimationType.Hinge:
            array.push("hinge");
            break;
        case UIAnimationType.SlideInUp:
            array.push("slideInUp");
            break;
        case UIAnimationType.SlideOutDown:
            array.push("slideOutDown");
            break;
        case UIAnimationType.SlideInRight:
            array.push("slideInRight");
            break;
        case UIAnimationType.SlideOutRight:
            array.push("slideOutRight");
            break;
        case UIAnimationType.SlideInLeft:
            array.push("slideInLeft");
            break;
        case UIAnimationType.SlideOutLeft:
            array.push("slideOutLeft");
            break;
        case UIAnimationType.HorizontalOutFlip:
            array.push("flipOutY");
            break;
        case UIAnimationType.HorizontalInFlip:
            array.push("flipInY");
            break;
        case UIAnimationType.ZoomIn:
            array.push("zoomIn");
            break;
        case UIAnimationType.ZoomOut:
            array.push("zoomOut");
            break;
    }
    return array;
}
exports.UIClassListForAnimationType = UIClassListForAnimationType;
function _UIAddAnimations(layer, animations) {
    var w = layer.offsetWidth;
    for (var index = 0; index < animations.length; index++)
        layer.classList.add(animations[index]);
    w++;
}
exports._UIAddAnimations = _UIAddAnimations;
function _UIRemoveAnimations(layer, animations) {
    for (var index = 0; index < animations.length; index++)
        layer.classList.remove(animations[index]);
}
exports._UIRemoveAnimations = _UIRemoveAnimations;
function _UIAnimationStart(layer, animationController, animationContext, target, completion) {
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
    _UIAddAnimations(layer, animations);
    layer.animationParams = {};
    layer.animationParams["animationController"] = animationController;
    layer.animationParams["animations"] = animations;
    if (target != null)
        layer.animationParams["target"] = target;
    if (completion != null)
        layer.animationParams["completion"] = completion;
    layer.addEventListener("animationend", _UIAnimationDidFinish);
}
exports._UIAnimationStart = _UIAnimationStart;
function _UIAnimationDidFinish(event) {
    var animationController = event.target.animationParams["animationController"];
    var animations = event.target.animationParams["animations"];
    var target = event.target.animationParams["target"];
    var completion = event.target.animationParams["completion"];
    var layer = event.target;
    _UIRemoveAnimations(layer, animations);
    layer.removeEventListener("animationend", _UIAnimationDidFinish);
    animationController.animationEnded(true);
    if (target != null && completion != null)
        completion.call(target);
}
exports._UIAnimationDidFinish = _UIAnimationDidFinish;
function MUICoreBundleLoadNibName(name, target, completion) {
}
exports.MUICoreBundleLoadNibName = MUICoreBundleLoadNibName;
window.onload = function (e) {
    var url = MIOCoreGetMainBundleURLString();
    console.log("Main URL: " + url);
    var args = url; // Todo get only the query string
    main(args);
};
// output errors to console log
window.onerror = function (e) {
    console.log("window.onerror ::" + JSON.stringify(e));
};
var _miocore_events_event_observers = {};
function MIOCoreEventRegisterObserverForType(eventType, observer, completion) {
    var item = { "Target": observer, "Completion": completion };
    var array = _miocore_events_event_observers[eventType];
    if (array == null) {
        array = [];
        _miocore_events_event_observers[eventType] = array;
    }
    array.push(item);
}
exports.MIOCoreEventRegisterObserverForType = MIOCoreEventRegisterObserverForType;
function MIOCoreEventUnregisterObserverForType(eventType, observer) {
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
exports.MIOCoreEventUnregisterObserverForType = MIOCoreEventUnregisterObserverForType;
function _MIOCoreEventSendToObservers(obs, event) {
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
    var event = new MIOCoreKeyEvent();
    event.initWithKeyCode(MIOCoreEventType.KeyDown, e.keyCode, e);
    var observers = _miocore_events_event_observers[MIOCoreEventType.KeyDown];
    _MIOCoreEventSendToObservers(observers, event);
}, false);
window.addEventListener('keyup', function (e) {
    // Create event
    var event = new MIOCoreKeyEvent();
    event.initWithKeyCode(MIOCoreEventType.KeyUp, e.keyCode, e);
    var observers = _miocore_events_event_observers[MIOCoreEventType.KeyUp];
    _MIOCoreEventSendToObservers(observers, event);
}, false);
// Mouse and touch events
window.addEventListener('mousedown', function (e) {
    // Create event
    var event = new MIOCoreKeyEvent();
    event.initWithType(MIOCoreEventType.MouseDown, e);
    var observers = _miocore_events_event_observers[MIOCoreEventType.MouseDown];
    _MIOCoreEventSendToObservers(observers, event);
}, false);
window.addEventListener('mouseup', function (e) {
    // Create event
    var event = new MIOCoreEventMouse();
    event.initWithType(MIOCoreEventType.MouseUp, e);
    var observers_mouseup = _miocore_events_event_observers[MIOCoreEventType.MouseUp];
    _MIOCoreEventSendToObservers(observers_mouseup, event);
    // Send click event
    var observers_click = _miocore_events_event_observers[MIOCoreEventType.Click];
    _MIOCoreEventSendToObservers(observers_click, event);
}, false);
window.addEventListener('touchend', function (e) {
    // Create event
    var event = new MIOCoreEventTouch();
    event.initWithType(MIOCoreEventType.TouchEnd, e);
    var observers_touchend = _miocore_events_event_observers[MIOCoreEventType.TouchEnd];
    _MIOCoreEventSendToObservers(observers_touchend, event);
    // Send click event
    var observers_click = _miocore_events_event_observers[MIOCoreEventType.Click];
    _MIOCoreEventSendToObservers(observers_click, event);
}, false);
// UI events
window.addEventListener("resize", function (e) {
    var event = new MIOCoreEvent();
    event.initWithType(MIOCoreEventType.Resize, e);
    var observers = _miocore_events_event_observers[MIOCoreEventType.Resize];
    _MIOCoreEventSendToObservers(observers, event);
}, false);
/**
 * Created by godshadow on 21/5/16.
 */
var UIActivityIndicatorViewStyle;
(function (UIActivityIndicatorViewStyle) {
    UIActivityIndicatorViewStyle[UIActivityIndicatorViewStyle["White"] = 0] = "White";
    UIActivityIndicatorViewStyle[UIActivityIndicatorViewStyle["WhiteLarge"] = 1] = "WhiteLarge";
    UIActivityIndicatorViewStyle[UIActivityIndicatorViewStyle["Gray"] = 2] = "Gray";
})(UIActivityIndicatorViewStyle = exports.UIActivityIndicatorViewStyle || (exports.UIActivityIndicatorViewStyle = {}));
var UIActivityIndicatorView = /** @class */ (function (_super) {
    __extends(UIActivityIndicatorView, _super);
    function UIActivityIndicatorView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._hidesWhenStopped = true;
        _this.isAnimating = false;
        _this._activityIndicatorViewStyle = UIActivityIndicatorViewStyle.White;
        return _this;
    }
    UIActivityIndicatorView.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.setHidden(true);
    };
    UIActivityIndicatorView.prototype.startAnimating = function () {
        this.setHidden(false);
    };
    UIActivityIndicatorView.prototype.stopAnimating = function () {
        this.setHidden(true);
    };
    Object.defineProperty(UIActivityIndicatorView.prototype, "hidesWhenStopped", {
        get: function () {
            return this._hidesWhenStopped;
        },
        set: function (value) {
            this._hidesWhenStopped = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIActivityIndicatorView.prototype, "animating", {
        get: function () {
            return this.isAnimating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIActivityIndicatorView.prototype, "activityIndicatorViewStyle", {
        get: function () {
            return this._activityIndicatorViewStyle;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return UIActivityIndicatorView;
}(UIView));
exports.UIActivityIndicatorView = UIActivityIndicatorView;
function MIOEdgeInsetsMake(top, left, bottom, rigth) {
    var ei = new UIEdgeInsets();
    ei.initWithValues(top, left, bottom, rigth);
    return ei;
}
exports.MIOEdgeInsetsMake = MIOEdgeInsetsMake;
var UIEdgeInsets = /** @class */ (function (_super) {
    __extends(UIEdgeInsets, _super);
    function UIEdgeInsets() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.top = 0;
        _this.left = 0;
        _this.bottom = 0;
        _this.right = 0;
        return _this;
    }
    UIEdgeInsets.Zero = function () {
        var ei = new UIEdgeInsets();
        ei.init();
        return ei;
    };
    UIEdgeInsets.prototype.initWithValues = function (top, left, bottom, right) {
        _super.prototype.init.call(this);
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
    };
    return UIEdgeInsets;
}(MIOObject));
exports.UIEdgeInsets = UIEdgeInsets;
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
        _this.sourceRect = MIORect.Zero();
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
        UICoreLayerAddStyle(this.presentedView.layer, "popover_window");
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
        view.setFrame(MIORect.rectWithValues(0, 0, w, h));
        this.window.setFrame(MIORect.rectWithValues(x, y, w, h));
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
}(MIOObject));
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
        var animations = UIClassListForAnimationType(UIAnimationType.FadeIn);
        return animations;
    };
    return MIOPopOverPresentAnimationController;
}(MIOObject));
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
        var animations = UIClassListForAnimationType(UIAnimationType.FadeOut);
        return animations;
    };
    return MIOPopOverDismissAnimationController;
}(MIOObject));
exports.MIOPopOverDismissAnimationController = MIOPopOverDismissAnimationController;
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
                this._transitioningDelegate = new MIOModalTransitioningDelegate();
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
            || MIOCoreIsPhone() == true) {
            UICoreLayerAddStyle(view.layer, "modal_window");
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
            view.setFrame(MIORect.rectWithValues(0, 0, w, h));
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet) {
            // Present like desktop sheet window
            var ws = UIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new MIOSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            view.setFrame(MIORect.rectWithValues(0, 0, w, h));
            this.window.setFrame(MIORect.rectWithValues(x, 0, w, h));
            view.layer.classList.add("modal");
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet) {
            // Present at the center of the screen
            var ws = UIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new MIOSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            var y = (ws.height - h) / 2;
            view.setFrame(MIORect.rectWithValues(0, 0, w, h));
            this.window.setFrame(MIORect.rectWithValues(x, y, w, h));
            view.layer.classList.add("modal");
        }
        else {
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new MIOSize(320, 200);
            var w = size.width;
            var h = size.height;
            view.setFrame(MIORect.rectWithValues(0, 0, w, h));
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
            if (MIOCoreIsMobile() == false && vc.modalPresentationStyle != UIModalPresentationStyle.CurrentContext) {
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
}(MIOObject));
exports.UIPresentationController = UIPresentationController;
var MIOModalTransitioningDelegate = /** @class */ (function (_super) {
    __extends(MIOModalTransitioningDelegate, _super);
    function MIOModalTransitioningDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modalTransitionStyle = null;
        _this._presentAnimationController = null;
        _this._dissmissAnimationController = null;
        return _this;
    }
    MIOModalTransitioningDelegate.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._presentAnimationController == null) {
            this._presentAnimationController = new MIOModalPresentAnimationController();
            this._presentAnimationController.init();
        }
        return this._presentAnimationController;
    };
    MIOModalTransitioningDelegate.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._dissmissAnimationController == null) {
            this._dissmissAnimationController = new MIOModalDismissAnimationController();
            this._dissmissAnimationController.init();
        }
        return this._dissmissAnimationController;
    };
    return MIOModalTransitioningDelegate;
}(MIOObject));
exports.MIOModalTransitioningDelegate = MIOModalTransitioningDelegate;
var MIOAnimationController = /** @class */ (function (_super) {
    __extends(MIOAnimationController, _super);
    function MIOAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0;
    };
    MIOAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions        
    };
    MIOAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOAnimationController.prototype.animations = function (transitionContext) {
        return null;
    };
    return MIOAnimationController;
}(MIOObject));
exports.MIOAnimationController = MIOAnimationController;
var MIOModalPresentAnimationController = /** @class */ (function (_super) {
    __extends(MIOModalPresentAnimationController, _super);
    function MIOModalPresentAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOModalPresentAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.15;
    };
    MIOModalPresentAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions
    };
    MIOModalPresentAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOModalPresentAnimationController.prototype.animations = function (transitionContext) {
        var animations = null;
        var toVC = transitionContext.presentedViewController;
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            if (MIOCoreIsPhone() == true)
                animations = UIClassListForAnimationType(UIAnimationType.SlideInUp);
            else
                animations = UIClassListForAnimationType(UIAnimationType.BeginSheet);
        }
        return animations;
    };
    return MIOModalPresentAnimationController;
}(MIOObject));
exports.MIOModalPresentAnimationController = MIOModalPresentAnimationController;
var MIOModalDismissAnimationController = /** @class */ (function (_super) {
    __extends(MIOModalDismissAnimationController, _super);
    function MIOModalDismissAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOModalDismissAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MIOModalDismissAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    MIOModalDismissAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOModalDismissAnimationController.prototype.animations = function (transitionContext) {
        var animations = null;
        var fromVC = transitionContext.presentingViewController;
        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            if (MIOCoreIsPhone() == true)
                animations = UIClassListForAnimationType(UIAnimationType.SlideOutDown);
            else
                animations = UIClassListForAnimationType(UIAnimationType.EndSheet);
        }
        return animations;
    };
    return MIOModalDismissAnimationController;
}(MIOObject));
exports.MIOModalDismissAnimationController = MIOModalDismissAnimationController;
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
}(NSObject));
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
}(MIOObject));
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
        return new MIOPoint(this.deltaX, this.deltaY);
    };
    return UIPanGestureRecognizer;
}(UIGestureRecognizer));
exports.UIPanGestureRecognizer = UIPanGestureRecognizer;
var MIOFileHandlingPanel;
(function (MIOFileHandlingPanel) {
    MIOFileHandlingPanel[MIOFileHandlingPanel["OKButton"] = 0] = "OKButton";
})(MIOFileHandlingPanel = exports.MIOFileHandlingPanel || (exports.MIOFileHandlingPanel = {}));
var UIOpenPanel = /** @class */ (function (_super) {
    __extends(UIOpenPanel, _super);
    function UIOpenPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.files = [];
        _this.panelTarget = null;
        _this.panelCompletion = null;
        _this._inputLayer = null;
        return _this;
    }
    UIOpenPanel.openPanel = function () {
        var op = new UIOpenPanel();
        op.init();
        return op;
    };
    UIOpenPanel.prototype.beginSheetModalForWindow = function (window, target, completion) {
        this.panelTarget = target;
        this.panelCompletion = completion;
        //Web hack to open dialog
        var instance = this;
        this._inputLayer = document.createElement("INPUT");
        this._inputLayer.setAttribute("type", "file");
        this._inputLayer.style.display = "none";
        this._inputLayer.addEventListener('change', function (ev) {
            var files = ev.target.files; // FileList object
            instance.filesDidSelect(files);
        }, false);
        UICoreLayerAddSublayer(window.layer, this._inputLayer);
        this._inputLayer.click();
    };
    UIOpenPanel.prototype.filesDidSelect = function (files) {
        this.files = files;
        if (this.panelTarget != null && this.panelCompletion != null) {
            this.panelCompletion.call(this.panelTarget, MIOFileHandlingPanel.OKButton);
        }
    };
    return UIOpenPanel;
}(UIWindow));
exports.UIOpenPanel = UIOpenPanel;
//# sourceMappingURL=UIKit.web.js.map