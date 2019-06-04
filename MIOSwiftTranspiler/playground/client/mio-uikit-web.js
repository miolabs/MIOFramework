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
 


























 
function MUICoreLayerIDFromObject(object) {
    var classname = object.constructor.name;
    return MUICoreLayerIDFromClassname(classname);
}
 
function MUICoreLayerIDFromClassname(classname) {
    var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var random = "";
    for (var count = 0; count < 4; count++) {
        var randomNumber = Math.floor(Math.random() * 16);
        var randomDigit = digits[randomNumber];
        random += randomDigit;
    }
    var layerID = classname.toLowerCase() + "_" + random;
     
    return layerID;
}
 
function MUICoreLayerCreate(layerID) {
    var layer = document.createElement("DIV");
    if (layerID != null)
        layer.setAttribute("id", layerID);
    //layer.style.position = "absolute";
    return layer;
}
 
function MUICoreLayerAddSublayer(layer, subLayer) {
    layer.appendChild(subLayer);
}
 
function MUICoreLayerRemoveSublayer(layer, subLayer) {
    layer.removeChild(subLayer);
}
 
function MUICoreLayerCreateWithStyle(style, layerID) {
    var layer = MUICoreLayerCreate(layerID);
    MUICoreLayerAddStyle(layer, style);
    return layer;
}
 
function MUICoreLayerAddStyle(layer, style) {
    layer.classList.add(style);
}
 
function MUICoreLayerRemoveStyle(layer, style) {
    layer.classList.remove(style);
}
 
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
})(MUIAnimationType || (MUIAnimationType = {}));
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
 
function _MUIAddAnimations(layer, animations) {
    var w = layer.offsetWidth;
    for (var index = 0; index < animations.length; index++)
        layer.classList.add(animations[index]);
    w++;
}
 
function _MUIRemoveAnimations(layer, animations) {
    for (var index = 0; index < animations.length; index++)
        layer.classList.remove(animations[index]);
}
 
function _MUIAnimationStart(layer, animationController, animationContext, completion) {
    if (animationController == null) {
        if (completion != null)
            completion();
        return;
    }
    var duration = animationController.transitionDuration(animationContext);
    var animations = animationController.animations(animationContext);
    animationController.animateTransition(animationContext);
    if (duration == 0 || animations == null) {
        // NO animation
        animationController.animationEnded(true);
        if (completion != null)
            completion();
        return;
    }
    layer.style.animationDuration = duration + "s";
    _MUIAddAnimations(layer, animations);
    layer.animationParams = {};
    layer.animationParams["animationController"] = animationController;
    layer.animationParams["animations"] = animations;
    if (completion != null)
        layer.animationParams["completion"] = completion;
    layer.addEventListener("animationend", _UIAnimationDidFinish);
}
 
function _UIAnimationDidFinish(event) {
    var animationController = event.target.animationParams["animationController"];
    var animations = event.target.animationParams["animations"];
    var completion = event.target.animationParams["completion"];
    var layer = event.target;
    _MUIRemoveAnimations(layer, animations);
    layer.removeEventListener("animationend", _UIAnimationDidFinish);
    animationController.animationEnded(true);
    if (completion != null)
        completion();
}
 
window.onload = function (e) {
    var url = MIOCoreBundleGetMainURLString();
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
var _MIOCoreBundleClassesByDestination = {};
function MUICoreBundleSetClassesByDestination(classes) {
    _MIOCoreBundleClassesByDestination = classes;
}
 
function MUICoreBundleGetClassesByDestination(resource) {
    return _MIOCoreBundleClassesByDestination[resource];
}
 
function MUICoreBundleLoadNibName(name, target, completion) {
    var parser = new MUICoreNibParser();
    parser.target = target;
    parser.completion = completion;
    MIOCoreBundleGetContentsFromURLString(name, this, function (code, data) {
        if (code == 200)
            parser.parseString(data);
        else
            throw new Error("MUICoreBundleLoadNibName: Couldn't download resource " + name);
    });
}
 
var MUICoreNibParser = /** @class */ (function (_super) {
    __extends(MUICoreNibParser, _super);
    function MUICoreNibParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.completion = null;
        _this.owner = null;
        _this.result = "";
        _this.isCapturing = false;
        _this.elementCapturingCount = 0;
        _this.layerID = null;
        _this.rootClassname = null;
        _this.currentString = null;
        _this.currentStringLocalizedKey = null;
        return _this;
    }
    MUICoreNibParser.prototype.parseString = function (data) {
        var parser = new MIOCoreHTMLParser();
        parser.initWithString(data, this);
        parser.parse();
        var domParser = new DOMParser();
        var items = domParser.parseFromString(this.result, "text/html");
        var layer = items.getElementById(this.layerID);
        this.completion.call(this.target, layer);
    };
    MUICoreNibParser.prototype.parserDidStartDocument = function (parser) {
        console.log("parser started");
    };
    // HTML Parser delegate
    MUICoreNibParser.prototype.parserDidStartElement = function (parser, element, attributes) {
        if (element.toLocaleLowerCase() == "div") {
            if (attributes["data-root-view-controller"] == "true") {
                // Start capturing   
                this.isCapturing = true;
                this.layerID = attributes["id"];
                this.rootClassname = attributes["data-class"];
            }
        }
        if (this.isCapturing == true) {
            this.openTag(element, attributes);
            this.elementCapturingCount++;
        }
    };
    MUICoreNibParser.prototype.parserFoundCharacters = function (parser, characters) {
        if (this.isCapturing == true) {
            if (this.currentString == null) {
                this.currentString = characters;
            }
            else
                this.currentString += " " + characters;
            //this.result += " " + characters;
        }
    };
    MUICoreNibParser.prototype.parserFoundComment = function (parser, comment) {
        if (this.isCapturing == true) {
            this.result += "<!-- " + comment + "-->";
        }
    };
    MUICoreNibParser.prototype.parserDidEndElement = function (parser, element) {
        if (this.isCapturing == true) {
            this.closeTag(element);
            this.elementCapturingCount--;
        }
        if (this.elementCapturingCount == 0)
            this.isCapturing = false;
        this.currentString = null;
    };
    MUICoreNibParser.prototype.parserDidEndDocument = function (parser) {
        console.log("html parser finished");
        console.log(this.result);
    };
    MUICoreNibParser.prototype.openTag = function (element, attributes) {
        this.translateCharacters();
        this.result += "<" + element;
        for (var key in attributes) {
            var value = attributes[key];
            if (value != null) {
                this.result += " " + key + "='" + value + "'";
            }
            else {
                this.result += " " + key;
            }
        }
        this.result += ">";
        if (element == "span") {
            this.currentStringLocalizedKey = attributes["localized-key"] || attributes["data-localized-key"];
        }
    };
    MUICoreNibParser.prototype.closeTag = function (element) {
        this.translateCharacters();
        this.result += "</" + element + ">";
    };
    MUICoreNibParser.prototype.translateCharacters = function () {
        if (this.currentString != null) {
            if (this.currentStringLocalizedKey == null) {
                this.result += this.currentString;
            }
            else {
                this.result += NSLocalizeString(this.currentStringLocalizedKey, this.currentString);
            }
        }
        this.currentString = null;
        this.currentStringLocalizedKey = null;
    };
    return MUICoreNibParser;
}(NSObject));
var MUICoreEventKeyCode;
(function (MUICoreEventKeyCode) {
    MUICoreEventKeyCode[MUICoreEventKeyCode["Enter"] = 13] = "Enter";
    MUICoreEventKeyCode[MUICoreEventKeyCode["Escape"] = 27] = "Escape";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowLeft"] = 37] = "ArrowLeft";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowUp"] = 38] = "ArrowUp";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowRight"] = 39] = "ArrowRight";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowDown"] = 40] = "ArrowDown";
})(MUICoreEventKeyCode || (MUICoreEventKeyCode = {}));
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
})(MUICoreEventType || (MUICoreEventType = {}));
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
 
var MUICoreEventMouseButtonType;
(function (MUICoreEventMouseButtonType) {
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["None"] = 0] = "None";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Left"] = 1] = "Left";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Right"] = 2] = "Right";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Middle"] = 3] = "Middle";
})(MUICoreEventMouseButtonType || (MUICoreEventMouseButtonType = {}));
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
 
var UIGestureRecognizerState;
(function (UIGestureRecognizerState) {
    UIGestureRecognizerState[UIGestureRecognizerState["Possible"] = 0] = "Possible";
    UIGestureRecognizerState[UIGestureRecognizerState["Began"] = 1] = "Began";
    UIGestureRecognizerState[UIGestureRecognizerState["Changed"] = 2] = "Changed";
    UIGestureRecognizerState[UIGestureRecognizerState["Ended"] = 3] = "Ended";
    UIGestureRecognizerState[UIGestureRecognizerState["Cancelled"] = 4] = "Cancelled";
    UIGestureRecognizerState[UIGestureRecognizerState["Failed"] = 5] = "Failed";
    UIGestureRecognizerState[UIGestureRecognizerState["Recognized"] = 6] = "Recognized";
})(UIGestureRecognizerState || (UIGestureRecognizerState = {}));
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
        get: function () { return _injectIntoOptional(this._view); },
        set: function (v) {
            v = v[0];
            this.setView(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGestureRecognizer.prototype, "state", {
        get: function () { return this._state; },
        set: function (value) { this.setState(value); },
        enumerable: true,
        configurable: true
    });
    UIGestureRecognizer.prototype.initTargetOptionalActionOptional = function (target, block) {
        _super.prototype.init.call(this);
        this.target = target[0];
        this.block = block[0];
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
}(NSObject));
 
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
        return new NSPoint(this.deltaX, this.deltaY);
    };
    return UIPanGestureRecognizer;
}(UIGestureRecognizer));
 
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
function MUICoreViewCreateView(layer, owner) {
    var className = layer.getAttribute("data-class");
    if (className == null || className.length == 0)
        className = "UIView";
    var sv = NSClassFromString(className);
    sv.initWithLayer(layer, owner);
    sv.awakeFromHTML();
    sv._checkSegues();
    var id = layer.getAttribute("id");
    if (id != null)
        owner._outlets[id] = sv;
    return sv;
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
        _this.owner = null;
        _this._parent = null;
        _this._viewIsVisible = false;
        _this._needDisplay = true;
        _this._isLayerInDOM = false;
        _this._subviews = [];
        _this._window = null;
        _this._outlets = {};
        _this._segues = [];
        _this._hidden = false;
        _this.x = 0;
        _this.y = 0;
        _this.width = 0;
        _this.height = 0;
        _this._userInteraction = false;
        _this.isMouseDown = false;
        _this.gestureRecognizers = _injectIntoOptional([]);
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
    UIView.prototype._checkSegues = function () {
    };
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
    UIView.prototype.initFrameCGRect = function (frame) {
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
        this.owner = owner;
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
                if (className == "UIBarItem" || className == "UIBarButtonItem" || className == "UINavigationItem")
                    continue;
                var sv = MUICoreViewCreateView(subLayer, owner);
                this._linkViewToSubview(sv);
                var id = subLayer.getAttribute("id");
                if (id != null)
                    owner._outlets[id] = sv;
            }
        }
        MUICoreStoryboardParseLayer(layer, this, owner);
    };
    UIView.prototype.copy = function () {
        var objLayer = this.layer.cloneNode(true);
        var className = this.getClassName();
        if (className == null)
            throw Error("UIView:copy: Error classname is null");
        var view = NSClassFromString(className);
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
    Object.defineProperty(UIView.prototype, "backgroundColor", {
        set: function (color) {
            color = color[0];
            this.layer.style.backgroundColor = "#" + color.hex;
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
            var animation = { "View": this, "Key": "x", "EndValue": x + "px" };
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
            var animation = { "View": this, "Key": "y", "EndValue": y + "px" };
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
            return _create(CGRect, 'initXIntYIntWidthIntHeightInt', this.getX(), this.getY(), this.getWidth(), this.getHeight());
        },
        set: function (frame) {
            this.setFrame(frame);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "bounds", {
        get: function () {
            return _create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, this.getWidth(), this.getHeight());
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
        for (var index = 0; index < this.gestureRecognizers[0].length; index++) {
            var gr = this.gestureRecognizers[0][index];
            gr._viewTouchesBeganWithEvent(touches, ev);
        }
    };
    UIView.prototype.touchesMovedWithEvent = function (touches, ev) {
        for (var index = 0; index < this.gestureRecognizers[0].length; index++) {
            var gr = this.gestureRecognizers[0][index];
            gr._viewTouchesMovedWithEvent(touches, ev);
        }
    };
    UIView.prototype.touchesEndedWithEvent = function (touches, ev) {
        for (var index = 0; index < this.gestureRecognizers[0].length; index++) {
            var gr = this.gestureRecognizers[0][index];
            gr._viewTouchesEndedWithEvent(touches, ev);
        }
    };
    UIView.prototype.addGestureRecognizer = function (gesture) {
        if (this.gestureRecognizers[0].containsObject(gesture))
            return;
        gesture.view = _injectIntoOptional(this);
        this.gestureRecognizers[0].addObject(gesture);
        this.userInteraction = true;
    };
    UIView.prototype.removeGestureRecognizer = function (gesture) {
        gesture.view = _injectIntoOptional(null);
        this.gestureRecognizers[0].removeObject(gesture);
    };
    UIView.animateWithDurationAnimations = function (duration, animations, completion) {
        UIView.animationsChanges = [];
        UIView.animationsViews = [];
        //UIView.animationTarget = target;
        UIView.animationCompletion = completion;
        //animations.call(target);
        animations();
        var _loop_1 = function (index) {
            var anim = UIView.animationsChanges[index];
            var view = anim["View"];
            var key = anim["Key"];
            var value = anim["EndValue"];
            var cssProp = key === 'x' ? 'left' :
                key === 'y' ? 'top' :
                    key;
            view.layer.style.transition = (view.layer.style.transition ? view.layer.style.transition + ", " : "") + cssProp + " " + duration + "s";
            setTimeout(function () { return view.layer.style[cssProp] = value; });
            UIView.addTrackingAnimationView(view);
        };
        for (var index = 0; index < UIView.animationsChanges.length; index++) {
            _loop_1(index);
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
}(NSObject));
 
/**
 * Created by godshadow on 11/3/16.
 */
var UILabel = /** @class */ (function (_super) {
    __extends(UILabel, _super);
    function UILabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._textLayer = null;
        _this.autoAdjustFontSize = "none";
        _this.autoAdjustFontSizeValue = 4;
        return _this;
    }
    UILabel.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayerAddStyle(this.layer, "label");
        this.setupLayers();
    };
    UILabel.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._textLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "SPAN");
        this.setupLayers();
    };
    UILabel.prototype.setupLayers = function () {
        //UICoreLayerAddStyle(this.layer, "lbl");
        if (this._textLayer == null) {
            this.layer.innerHTML = "";
            this._textLayer = document.createElement("span");
            this._textLayer.style.top = "3px";
            this._textLayer.style.left = "3px";
            this._textLayer.style.right = "3px";
            this._textLayer.style.bottom = "3px";
            //this._textLayer.style.font = "inherit";
            //this._textLayer.style.fontSize = "inherit";
            this.layer.appendChild(this._textLayer);
        }
    };
    UILabel.prototype.setText = function (text) {
        this.text = _injectIntoOptional(text);
    };
    Object.defineProperty(UILabel.prototype, "text", {
        get: function () {
            return _injectIntoOptional(this._textLayer.innerHTML);
        },
        set: function (text) {
            text = text[0];
            this._textLayer.innerHTML = text != null ? text : "";
        },
        enumerable: true,
        configurable: true
    });
    UILabel.prototype.setTextAlignment = function (alignment) {
        this.layer.style.textAlign = alignment;
    };
    UILabel.prototype.setHightlighted = function (value) {
        if (value == true) {
            this._textLayer.classList.add("label_highlighted_color");
        }
        else {
            this._textLayer.classList.remove("label_highlighted_color");
        }
    };
    UILabel.prototype.setTextRGBColor = function (r, g, b) {
        var value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._textLayer.style.color = value;
    };
    UILabel.prototype.setFontSize = function (size) {
        this._textLayer.style.fontSize = size + "px";
    };
    UILabel.prototype.setFontStyle = function (style) {
        this._textLayer.style.fontWeight = style;
    };
    UILabel.prototype.setFontFamily = function (fontFamily) {
        this._textLayer.style.fontFamily = fontFamily;
    };
    return UILabel;
}(UIView));
 
/**
 * Created by godshadow on 12/3/16.
 */
function MUICoreControlParseEventTypeString(eventTypeString) {
    if (eventTypeString == null)
        return UIControl.Event.allEvents;
    var value = eventTypeString[0].toUpperCase() + eventTypeString.substr(1);
    return UIControl.Event[value];
}
var UIControl = /** @class */ (function (_super) {
    __extends(UIControl, _super);
    function UIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionSegue = null;
        _this.actions = [];
        _this._enabled = true;
        _this._selected = false;
        // TODO: Make delegation of the methods above
        _this.mouseOverTarget = null;
        _this.mouseOverAction = null;
        _this.mouseOutTarget = null;
        _this.mouseOutAction = null;
        return _this;
    }
    UIControl.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        // Check for actions
        if (this.layer.childNodes.length > 0) {
            for (var index = 0; index < this.layer.childNodes.length; index++) {
                var subLayer = this.layer.childNodes[index];
                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION")
                    continue;
                var actionSelector = subLayer.getAttribute("data-action-selector");
                var eventType = MUICoreControlParseEventTypeString(subLayer.getAttribute("data-event-type"));
                if (actionSelector != null) {
                    this.addTargetActionFor(_injectIntoOptional(owner), owner[actionSelector], eventType);
                }
            }
        }
    };
    UIControl.prototype._checkSegues = function () {
        _super.prototype._checkSegues.call(this);
        for (var index = 0; index < this._segues.length; index++) {
            var s = this._segues[index];
            var kind = s["Kind"];
            if (kind == "show") {
                if ((this.owner instanceof UIViewController) == false)
                    continue;
                this.actionSegue = {};
                this.actionSegue["VC"] = this.owner;
                this.actionSegue["Destination"] = s["Destination"];
                var identifier = s["Identifier"];
                if (identifier != null)
                    this.actionSegue["Identifier"] = identifier;
                this.addTargetActionFor(_injectIntoOptional(this), function () {
                    var fromVC = this.actionSegue["VC"];
                    var destination = this.actionSegue["Destination"];
                    var identifier = this.actionSegue["Identifier"];
                    var toVC = fromVC.storyboard[0]._instantiateViewControllerWithDestination(destination);
                    var segue = new UIStoryboardSegue();
                    segue.initIdentifierOptionalSourceUIViewControllerDestinationUIViewControllerPerformHandlerfunction_type(_injectIntoOptional(identifier), fromVC, toVC, function () {
                        fromVC.navigationController[0].pushViewControllerAnimated(toVC);
                    });
                    segue._sender = this;
                    segue.perform();
                }, UIControl.Event.allEvents);
            }
        }
    };
    UIControl.prototype.addTargetActionFor = function (target, action, controlEvents /*UIControl.Event*/) {
        if (action == null)
            throw new Error("UIControl: Can't add null action");
        var item = {};
        item["Target"] = target[0];
        item["Action"] = action;
        item["EventType"] = controlEvents;
        this.actions.push(item);
    };
    UIControl.prototype._performActionsForEvents = function (events /*UIControl.Event*/) {
        for (var index = 0; index < this.actions.length; index++) {
            var action = this.actions[index];
            var target = action["Target"];
            var block = action["Action"];
            if (block != null && target != null)
                block.call(target, this);
        }
    };
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
    Object.defineProperty(UIControl.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this.setSelected(value);
        },
        enumerable: true,
        configurable: true
    });
    UIControl.prototype.setSelected = function (value) {
        if (this._selected == value)
            return;
        this.willChangeValue("selected");
        if (value == true) {
            MUICoreLayerAddStyle(this.layer, "selected");
        }
        else {
            MUICoreLayerRemoveStyle(this.layer, "selected");
        }
        this._selected = value;
        this.didChangeValue("selected");
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
    var _a, _b;
    UIControl.State = (_a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.normal = 0,
        _a.highlighted = 1,
        _a.disabled = 2,
        _a.selected = 3,
        _a.focused = 4,
        _a.application = 5,
        _a.reserved = 6,
        _a);
    UIControl.Event = (_b = /** @class */ (function () {
            function class_2() {
            }
            return class_2;
        }()),
        _b.touchDown = 1 << 0,
        _b.touchDownRepeat = 1 << 1,
        _b.touchDragInside = 1 << 2,
        _b.touchDragOutside = 1 << 3,
        _b.touchDragEnter = 1 << 4,
        _b.touchDragExit = 1 << 5,
        _b.touchUpInside = 1 << 6,
        _b.touchUpOutside = 1 << 7,
        _b.touchCancel = 1 << 8,
        _b.valueChanged = 1 << 12,
        _b.primaryActionTriggered = 1 << 13,
        _b.editingDidBegin = 1 << 16,
        _b.editingChanged = 1 << 17,
        _b.editingDidEnd = 1 << 18,
        _b.editingDidEndOnExit = 1 << 19,
        _b.allTouchEvents = 0x00000FFF,
        _b.editingEvents = 0x000F0000,
        _b.applicationReserved = 0x0F000000,
        _b.systemReserved = 0xF0000000,
        _b.allEvents = 0xFFFFFFFF,
        _b);
    return UIControl;
}(UIView));
 
/**
 * Created by godshadow on 12/3/16.
 */
var UIButtonType;
(function (UIButtonType) {
    UIButtonType[UIButtonType["MomentaryPushIn"] = 0] = "MomentaryPushIn";
    UIButtonType[UIButtonType["PushOnPushOff"] = 1] = "PushOnPushOff";
    UIButtonType[UIButtonType["PushIn"] = 2] = "PushIn";
})(UIButtonType || (UIButtonType = {}));
var UIButton = /** @class */ (function (_super) {
    __extends(UIButton, _super);
    function UIButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._statusStyle = null;
        _this._titleStatusStyle = null;
        _this._titleLayer = null;
        _this._imageStatusStyle = null;
        _this._imageLayer = null;
        _this.type = UIButtonType.MomentaryPushIn;
        return _this;
    }
    UIButton.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayerAddStyle(this.layer, "btn");
        this.setupLayers();
    };
    UIButton.prototype.initFrameCGRect = function (frame) {
        _super.prototype.initFrameCGRect.call(this, frame);
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
            this.setTitleFor(_injectIntoOptional(NSLocalizeString(key, key)));
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
            this._performActionsForEvents(UIControl.Event.touchUpInside);
            // if (this.action != null && this.target != null)
            //     this.action.call(this.target, this);
        }.bind(this));
    };
    UIButton.prototype.setTitleFor = function (title) {
        this._titleLayer.innerHTML = title[0];
    };
    Object.defineProperty(UIButton.prototype, "title", {
        get: function () {
            return this._titleLayer.innerHTML;
        },
        set: function (title) {
            this.setTitleFor(_injectIntoOptional(title));
        },
        enumerable: true,
        configurable: true
    });
    UIButton.prototype.setTitleColorFor = function (color) {
        this._titleLayer.style.color = "#" + color[0].hex;
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
 
/**
 * Created by godshadow on 12/3/16.
 */
var UITextFieldType;
(function (UITextFieldType) {
    UITextFieldType[UITextFieldType["NormalType"] = 0] = "NormalType";
    UITextFieldType[UITextFieldType["PasswordType"] = 1] = "PasswordType";
    UITextFieldType[UITextFieldType["SearchType"] = 2] = "SearchType";
})(UITextFieldType || (UITextFieldType = {}));
var UITextField = /** @class */ (function (_super) {
    __extends(UITextField, _super);
    function UITextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeHolder = null;
        _this._inputLayer = null;
        _this.type = UITextFieldType.NormalType;
        _this.textChangeTarget = null;
        _this.textChangeAction = null;
        _this._textChangeFn = null;
        _this.enterPressTarget = null;
        _this.enterPressAction = null;
        _this.keyPressTarget = null;
        _this.keyPressAction = null;
        _this.formatter = null;
        _this._textStopPropagationFn = null;
        _this.didBeginEditingAction = null;
        _this.didBeginEditingTarget = null;
        _this._textDidBeginEditingFn = null;
        _this.didEndEditingAction = null;
        _this.didEndEditingTarget = null;
        _this._textDidEndEditingFn = null;
        return _this;
    }
    UITextField.prototype.init = function () {
        _super.prototype.init.call(this);
        this._setupLayer();
    };
    UITextField.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._inputLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "INPUT");
        this._setupLayer();
    };
    UITextField.prototype._setupLayer = function () {
        if (this._inputLayer == null) {
            this._inputLayer = document.createElement("input");
            switch (this.type) {
                case UITextFieldType.SearchType:
                    this._inputLayer.setAttribute("type", "search");
                    break;
                default:
                    this._inputLayer.setAttribute("type", "text");
                    break;
            }
            this.layer.appendChild(this._inputLayer);
        }
        var placeholderKey = this._inputLayer.getAttribute("data-placeholder");
        if (placeholderKey != null)
            this._inputLayer.setAttribute("placeholder", NSLocalizeString(placeholderKey, placeholderKey));
        this._registerInputEvent();
    };
    // layoutSubviews(){
    //     super.layoutSubviews();
    // var w = this.getWidth();
    // var h = this.getHeight();
    // this._inputLayer.style.marginLeft = "4px";
    // this._inputLayer.style.width = (w - 8) + "px";
    // this._inputLayer.style.marginTop = "4px";
    // this._inputLayer.style.height = (h - 8) + "px";
    //    }
    UITextField.prototype.setText = function (text) {
        this.text = _injectIntoOptional(text);
    };
    Object.defineProperty(UITextField.prototype, "text", {
        get: function () {
            return _injectIntoOptional(this._inputLayer.value);
        },
        set: function (text) {
            text = text[0];
            var newValue = text != null ? text : "";
            this._inputLayer.value = newValue;
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setPlaceholderText = function (text) {
        this.placeHolder = text;
        this._inputLayer.setAttribute("placeholder", text);
    };
    Object.defineProperty(UITextField.prototype, "placeholderText", {
        set: function (text) {
            this.setPlaceholderText(text);
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setOnChangeText = function (target, action) {
        this.textChangeTarget = target;
        this.textChangeAction = action;
    };
    UITextField.prototype._registerInputEvent = function () {
        var instance = this;
        this._textChangeFn = function () {
            if (instance.enabled)
                instance._textDidChange.call(instance);
        };
        this._textStopPropagationFn = function (e) {
            //instance._textDidBeginEditing();
            e.stopPropagation();
        };
        this._textDidBeginEditingFn = this._textDidBeginEditing.bind(this);
        this._textDidEndEditingFn = this._textDidEndEditing.bind(this);
        this.layer.addEventListener("input", this._textChangeFn);
        this.layer.addEventListener("click", this._textStopPropagationFn);
        this._inputLayer.addEventListener("focus", this._textDidBeginEditingFn);
        this._inputLayer.addEventListener("blur", this._textDidEndEditingFn);
    };
    UITextField.prototype._unregisterInputEvent = function () {
        this.layer.removeEventListener("input", this._textChangeFn);
        this.layer.removeEventListener("click", this._textStopPropagationFn);
        this._inputLayer.removeEventListener("focus", this._textDidBeginEditingFn);
        this._inputLayer.removeEventListener("blur", this._textDidEndEditingFn);
    };
    UITextField.prototype._textDidChange = function () {
        var _a;
        if (this.enabled == false)
            return;
        // Check the formater
        var value = this._inputLayer.value;
        if (this.formatter == null) {
            this._textDidChangeDelegate(value);
        }
        else {
            var result = void 0, newStr = void 0;
            _a = this.formatter.isPartialStringValid(value), result = _a[0], newStr = _a[1];
            this._unregisterInputEvent();
            this._inputLayer.value = newStr;
            this._registerInputEvent();
            if (result == true) {
                this._textDidChangeDelegate(value);
            }
        }
    };
    UITextField.prototype._textDidChangeDelegate = function (value) {
        if (this.textChangeAction != null && this.textChangeTarget != null)
            this.textChangeAction.call(this.textChangeTarget, this, value);
    };
    UITextField.prototype.setOnBeginEditing = function (target, action) {
        this.didBeginEditingTarget = target;
        this.didBeginEditingAction = action;
    };
    UITextField.prototype._textDidBeginEditing = function () {
        if (this.enabled == false)
            return;
        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);
        if (this.didBeginEditingTarget == null || this.didBeginEditingAction == null)
            return;
        this.didBeginEditingAction.call(this.didBeginEditingTarget, this, this.text[0]);
    };
    UITextField.prototype.setOnDidEndEditing = function (target, action) {
        this.didEndEditingTarget = target;
        this.didEndEditingAction = action;
    };
    UITextField.prototype._textDidEndEditing = function () {
        if (this.enabled == false)
            return;
        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);
        if (this.didEndEditingTarget == null || this.didEndEditingAction == null)
            return;
        this.didEndEditingAction.call(this.didEndEditingTarget, this, this.text[0]);
    };
    UITextField.prototype.setOnEnterPress = function (target, action) {
        this.enterPressTarget = target;
        this.enterPressAction = action;
        var instance = this;
        this.layer.onkeyup = function (e) {
            if (instance.enabled) {
                if (e.keyCode == 13)
                    instance.enterPressAction.call(target, instance, instance._inputLayer.value);
            }
        };
    };
    UITextField.prototype.setOnKeyPress = function (target, action) {
        this.keyPressTarget = target;
        this.keyPressAction = action;
        var instance = this;
        this.layer.onkeydown = function (e) {
            if (instance.enabled) {
                instance.keyPressAction.call(target, instance, e.keyCode);
            }
        };
    };
    UITextField.prototype.setTextRGBColor = function (r, g, b) {
        var value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._inputLayer.style.color = value;
    };
    Object.defineProperty(UITextField.prototype, "textColor", {
        get: function () {
            var color = this._getValueFromCSSProperty("color");
            return _injectIntoOptional(color);
        },
        set: function (color) {
            color = color[0];
            this._inputLayer.style.color = color;
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setEnabled = function (value) {
        _super.prototype.setEnabled.call(this, value);
        this._inputLayer.readOnly = !value;
    };
    UITextField.prototype.becomeFirstResponder = function () {
        this._inputLayer.focus();
    };
    UITextField.prototype.resignFirstResponder = function () {
        this._inputLayer.blur();
    };
    UITextField.prototype.selectAll = function (control) {
        this._inputLayer.select();
    };
    return UITextField;
}(UIControl));
 
/**
 * Created by godshadow on 29/08/16.
 */
var UISegmentedControl = /** @class */ (function (_super) {
    __extends(UISegmentedControl, _super);
    function UISegmentedControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.segmentedItems = [];
        _this.selectedSegmentIndex = -1;
        return _this;
    }
    UISegmentedControl.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        for (var index = 0; index < this.layer.childNodes.length; index++) {
            var itemLayer = this.layer.childNodes[index];
            if (itemLayer.tagName == "DIV") {
                var si = new UIButton();
                si.initWithLayer(itemLayer, owner);
                si.type = UIButtonType.PushIn;
                this._addSegmentedItem(si);
                MUIOutletRegister(owner, si.layerID, si);
            }
        }
        if (this.segmentedItems.length > 0) {
            var item = this.segmentedItems[0];
            item.setSelected(true);
            this.selectedSegmentIndex = 0;
        }
    };
    UISegmentedControl.prototype._addSegmentedItem = function (item) {
        this.segmentedItems.push(item);
        item.addTargetActionFor(_injectIntoOptional(this), this._didClickSegmentedButton, UIControl.Event.allTouchEvents);
    };
    UISegmentedControl.prototype._didClickSegmentedButton = function (button) {
        var index = this.segmentedItems.indexOf(button);
        this.selectedSegmentIndex(index);
        if (this.mouseOutTarget != null)
            this.mouseOutAction.call(this.mouseOutTarget, this, index);
    };
    UISegmentedControl.prototype.selectedSegmentIndex = function (index) {
        if (this.selectedSegmentIndex == index)
            return;
        if (this.selectedSegmentIndex > -1) {
            var lastItem = this.segmentedItems[this.selectedSegmentIndex];
            lastItem.setSelected(false);
        }
        this.selectedSegmentIndex = index;
        var item = this.segmentedItems[this.selectedSegmentIndex];
        item.setSelected(true);
        this._performActionsForEvents(UIControl.Event.valueChanged);
    };
    return UISegmentedControl;
}(UIControl));
 
/**
 * Created by godshadow on 12/3/16.
 */
var UISwitch = /** @class */ (function (_super) {
    __extends(UISwitch, _super);
    function UISwitch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._inputLayer = null;
        _this._labelLayer = null;
        _this._on = false;
        return _this;
    }
    UISwitch.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.layer.classList.add("switch_button");
        this._inputLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "INPUT");
        if (this._inputLayer == null) {
            this._inputLayer = document.createElement("input");
            this._inputLayer.setAttribute("type", "checkbox");
            this._inputLayer.setAttribute("id", this.layerID + "_input");
            this._inputLayer.classList.add("switch_button_input");
            layer.appendChild(this._inputLayer);
        }
        var instance = this;
        this.layer.onclick = function () {
            if (instance.enabled) {
                instance._toggleValue.call(instance);
            }
        };
    };
    Object.defineProperty(UISwitch.prototype, "isOn", {
        get: function () { return this._on; },
        set: function (value) { this.setOn(value); },
        enumerable: true,
        configurable: true
    });
    UISwitch.prototype.setOn = function (value) {
        if (value == this._on)
            return;
        this._inputLayer.checked = value;
        this._on = value;
        this._performActionsForEvents(UIControl.Event.valueChanged);
    };
    UISwitch.prototype._toggleValue = function () {
        this.isOn = !this.isOn;
    };
    return UISwitch;
}(UIControl));
 
/**
 * Created by godshadow on 11/3/16.
 */
var UIViewController = /** @class */ (function (_super) {
    __extends(UIViewController, _super);
    function UIViewController(layerID) {
        var _this = _super.call(this) || this;
        _this.layerID = null;
        _this.layer = null;
        _this.view = _injectIntoOptional(null);
        _this._htmlResourcePath = null;
        _this._onViewLoadedTarget = null;
        _this._onViewLoadedAction = null;
        _this._onLoadLayerTarget = null;
        _this._onLoadLayerAction = null;
        _this._viewIsLoaded = false;
        _this._layerIsReady = false;
        _this._childViewControllers = [];
        _this.parentViewController = null;
        _this.presentingViewController = _injectIntoOptional(null);
        _this.presentedViewController = _injectIntoOptional(null);
        _this.navigationController = _injectIntoOptional(null);
        _this.navigationItem = null;
        _this.splitViewController = _injectIntoOptional(null);
        _this.tabBarController /*TODO: UITabBarController*/ = _injectIntoOptional(null);
        _this.modalPresentationStyle = MIOCoreIsPhone() == true ? UIModalPresentationStyle.FullScreen : UIModalPresentationStyle.PageSheet;
        _this.modalTransitionStyle = UIModalTransitionStyle.CoverVertical;
        _this.transitioningDelegate = null;
        _this._contentSize = new CGSize(320, 200);
        _this._preferredContentSize = null;
        // removeFromParentViewController()
        // {
        //     this.parent.removeChildViewController(this);
        //     this.parent = null;
        //     this.view.removeFromSuperview();
        //     //this.didMoveToParentViewController(null);
        // }
        _this._presentationController = null;
        _this._popoverPresentationController = null;
        // Storyboard
        _this.storyboard = _injectIntoOptional(null);
        _this._outlets = {};
        _this._segues = [];
        _this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(_this);
        return _this;
    }
    UIViewController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.loadView();
    };
    UIViewController.prototype.initCoderNSCoder = function (coder) {
    };
    UIViewController.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.init.call(this);
        // this.view = MUICoreViewCreateView(layer, owner);
        // this.view._checkSegues();
        // Search for navigation item
        //this.navigationItem = UINavItemSearchInLayer(layer);        
        this.loadView();
    };
    UIViewController.prototype.initWithResource = function (path) {
        if (path == null)
            throw new Error("UIViewController:initWithResource can't be null");
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
                layer.innerHTML = NSLocalizeString(key, key);
            this.localizeSubLayers(layer.childNodes);
        }
    };
    UIViewController.prototype.localizeLayerIDWithKey = function (layerID, key) {
        var layer = MUICoreLayerSearchElementByID(this.view[0].layer, layerID);
        layer.innerHTML = NSLocalizeString(key, key);
    };
    UIViewController.prototype.loadView = function () {
        if (this.view[0] != null) {
            this._didLoadView();
            return;
        }
        this.view = _injectIntoOptional(new UIView(this.layerID));
        if (this._htmlResourcePath == null) {
            this.view[0].init();
            MUICoreLayerAddStyle(this.view[0].layer, "view-controller");
            this._didLoadView();
            return;
        }
        MUICoreBundleLoadNibName(this._htmlResourcePath, this, function (layer) {
            this.view[0].initWithLayer(layer, this);
            this.view[0].awakeFromHTML();
            this._didLoadView();
        });
        // let mainBundle = NSBundle.mainBundle();
        // mainBundle.loadNibNamed(this._htmlResourcePath, this, null);
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
        this.view[0].initWithLayer(layer, this);
        this.view[0].awakeFromHTML();
        this._didLoadView();
    };
    UIViewController.prototype._didLoadView = function () {
        this._layerIsReady = true;
        if (MIOCoreIsPhone() == true)
            MUICoreLayerAddStyle(this.view[0].layer, "phone");
        MUICoreStoryboardParseLayer(this.view[0].layer, this, this);
        this._checkSegues();
        if (this._onLoadLayerTarget != null && this._onViewLoadedAction != null) {
            this._onLoadLayerAction.call(this._onLoadLayerTarget);
            this._onLoadLayerTarget = null;
            this._onLoadLayerAction = null;
        }
        if (this._onViewLoadedAction != null && this._onViewLoadedTarget != null) {
            this.viewDidLoad();
            this._loadChildControllers();
        }
        else if (this._htmlResourcePath == null) {
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
        this.view[0].setNeedsDisplay();
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
            return _injectIntoOptional(this._presentationController);
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
            return _injectIntoOptional(this._popoverPresentationController);
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
    UIViewController.prototype.presentAnimatedCompletion = function (vc, animated) {
        var pc = vc.presentationController[0];
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
                this.view.addSubview(vc.presentationController[0].presentedView[0]);
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
                    w_1.rootViewController = _injectIntoOptional(vc);
                    w_1.addSubview(pc.presentedView[0]);
                    pc.window = w_1;
                }
                w_1.setHidden(false);
                if (vc instanceof UIAlertController)
                    MUICoreLayerAddStyle(w_1.layer, "alert");
                _MUIShowViewController(this, vc, null, animated, this, function () {
                    w_1.makeKey();
                });
            }
        });
    };
    UIViewController.prototype.dismissViewControllerAnimatedCompletion = function (animate) {
        var pc = this._presentationController;
        var vc = this;
        while (pc == null) {
            vc = vc.parentViewController;
            pc = vc._presentationController;
        }
        var toVC = pc.presentingViewController;
        var fromVC = pc.presentedViewController;
        var fromView = pc.presentedView[0];
        _MUIHideViewController(fromVC, toVC, null, this, function () {
            if (fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
                toVC.removeChildViewController(fromVC);
                var pc1 = fromVC.presentationController[0];
                var view = pc1.presentedView[0];
                view.removeFromSuperview();
            }
            else {
                // It's a window instead of a view
                var pc1 = fromVC.presentationController[0];
                var w = pc1.window;
                w.setHidden(true);
            }
        });
    };
    UIViewController.prototype.transitionFromViewControllerToViewControllerDurationOptionsAnimationsCompletion = function (fromVC, toVC, duration, options, animations, completion) {
        //TODO
    };
    UIViewController.prototype.viewDidLoad = function () { };
    UIViewController.prototype.viewWillAppear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillAppear(animated);
        }
        this.view[0].setViewIsVisible(true);
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
        this.view[0].setViewIsVisible(false);
    };
    UIViewController.prototype.viewDidDisappear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidDisappear(animated);
        }
    };
    UIViewController.prototype.contentHeight = function () {
        return this.view[0].getHeight();
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
    UIViewController.prototype._checkSegues = function () {
    };
    UIViewController.prototype.shouldPerformSegueWithIdentifierSender = function (identifier, sender) {
        return true;
    };
    UIViewController.prototype.prepareForSegueSender = function (segue, sender) {
    };
    UIViewController.prototype.performSegueWithIdentifierSender = function (identifier, sender) {
    };
    return UIViewController;
}(NSObject));
 
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
})(UIModalPresentationStyle || (UIModalPresentationStyle = {}));
var UIModalTransitionStyle;
(function (UIModalTransitionStyle) {
    UIModalTransitionStyle[UIModalTransitionStyle["CoverVertical"] = 0] = "CoverVertical";
    UIModalTransitionStyle[UIModalTransitionStyle["FlipHorizontal"] = 1] = "FlipHorizontal";
    UIModalTransitionStyle[UIModalTransitionStyle["CrossDisolve"] = 2] = "CrossDisolve";
})(UIModalTransitionStyle || (UIModalTransitionStyle = {}));
var UIPresentationController = /** @class */ (function (_super) {
    __extends(UIPresentationController, _super);
    function UIPresentationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.presentationStyle = UIModalPresentationStyle.PageSheet;
        _this.shouldPresentInFullscreen = false;
        _this._presentedViewController = null; //ToVC
        _this.presentingViewController = null; //FromVC
        _this.presentedView = _injectIntoOptional(null);
        _this._transitioningDelegate = null;
        _this._window = null;
        _this._isPresented = false;
        return _this;
    }
    UIPresentationController.prototype.initPresentedViewControllerUIViewControllerPresentingViewControllerOptional = function (presentedViewController, presentingViewController) {
        _super.prototype.init.call(this);
        this.presentedViewController = presentedViewController;
        this.presentingViewController = presentingViewController[0];
    };
    UIPresentationController.prototype.setPresentedViewController = function (vc) {
        this._presentedViewController = vc;
        this.presentedView = _injectIntoOptional(vc.view[0]);
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
        var view = this.presentedView[0];
        this._calculateFrame();
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
            || MIOCoreIsPhone() == true) {
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
        var view = this.presentedView[0];
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            view.layer.style.left = "0px";
            view.layer.style.top = "0px";
            view.layer.style.width = "100%";
            view.layer.style.height = "100%";
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
            var w = fromVC.view.getWidth();
            var h = fromVC.view.getHeight();
            view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet) {
            // Present like desktop sheet window
            var ws = MUIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new CGSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
            this.window.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', x, 0, w, h));
            view.layer.classList.add("modal");
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet) {
            // Present at the center of the screen
            var ws = MUIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new CGSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            var y = (ws.height - h) / 2;
            view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
            this.window.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', x, y, w, h));
            view.layer.classList.add("modal");
        }
        else {
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new CGSize(320, 200);
            var w = size.width;
            var h = size.height;
            view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
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
            var vc = this.presentedView[0];
            //this.window.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            vc.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            this._calculateFrame();
        }
    };
    return UIPresentationController;
}(NSObject));
 
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
}(NSObject));
 
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
}(NSObject));
 
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
            if (MIOCoreIsPhone() == true)
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideInUp);
            else
                animations = MUIClassListForAnimationType(MUIAnimationType.BeginSheet);
        }
        return animations;
    };
    return UIModalPresentAnimationController;
}(NSObject));
 
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
            if (MIOCoreIsPhone() == true)
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideOutDown);
            else
                animations = MUIClassListForAnimationType(MUIAnimationType.EndSheet);
        }
        return animations;
    };
    return UIModalDismissAnimationController;
}(NSObject));
 
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
})(UIPopoverArrowDirection || (UIPopoverArrowDirection = {}));
var UIPopoverPresentationController = /** @class */ (function (_super) {
    __extends(UIPopoverPresentationController, _super);
    function UIPopoverPresentationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.permittedArrowDirections = UIPopoverArrowDirection.Any;
        _this.sourceView = _injectIntoOptional(null);
        _this.sourceRect = CGRect.Zero();
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
        MUICoreLayerAddStyle(this.presentedView[0].layer, "popover_window");
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
        var view = this.presentedView[0];
        var w = vc.preferredContentSize.width;
        var h = vc.preferredContentSize.height;
        var v = vc.popoverPresentationController[0].sourceView[0];
        var f = vc.popoverPresentationController[0].sourceRect;
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
        view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
        this.window.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', x, y, w, h));
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
}(NSObject));
 
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
}(NSObject));
 
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
}(NSObject));
 
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
        if (MIOCoreGetPlatform() == MIOCorePlatformType.Safari)
            this.layer.style["-webkit-overflow-scrolling"] = "touch";
        var contentLayer = MUICoreLayerCreate();
        MUICoreLayerAddStyle(contentLayer, "content-view");
        // contentLayer.style.position = "absolute";
        // contentLayer.style.width = "100%";
        // contentLayer.style.height = "100%";
        // contentLayer.style.overflow = "hidden";
        this.contentView = new UIView();
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
        this.scrollTimer = NSTimer.scheduledTimerWithTimeInterval(150, false, this, this.scrollEventStopCallback);
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
            var p = new NSPoint(this.layer.scrollLeft, this.layer.scrollTop);
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
            return _create(CGRect, 'initXIntYIntWidthIntHeightInt', p.x, p.y, this.getWidth(), this.getHeight());
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
}(UIView));
 
var UITableView = /** @class */ (function (_super) {
    __extends(UITableView, _super);
    function UITableView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSource = null;
        _this.delegate = null;
        _this.allowsMultipleSelection = false;
        _this.headerLayer = null;
        _this.cellPrototypes = {};
        _this.footerLayer = null;
        _this.rows = [];
        _this.sections = [];
        _this.cells = [];
        return _this;
    }
    UITableView.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        // Check if we have prototypes
        if (this.layer.childNodes.length > 0) {
            for (var index = 0; index < this.layer.childNodes.length; index++) {
                var subLayer = this.layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                if (subLayer.getAttribute("data-cell-identifier") != null) {
                    this.addCellPrototypeWithLayer(subLayer);
                }
                else if (subLayer.getAttribute("data-tableview-header") != null) {
                    this.addHeaderWithLayer(subLayer);
                }
                else if (subLayer.getAttribute("data-tableview-footer") != null) {
                    this.addFooterWithLayer(subLayer);
                }
            }
        }
    };
    UITableView.prototype.addHeaderWithLayer = function (layer) {
        layer.style.display = "none";
        var cellClassname = layer.getAttribute("data-class");
        if (cellClassname == null)
            cellClassname = "MUIView";
        var item = {};
        item["class"] = cellClassname;
        item["layer"] = layer;
        this.headerLayer = item;
    };
    UITableView.prototype.addCellPrototypeWithLayer = function (layer) {
        layer.style.display = "none";
        var cellIdentifier = layer.getAttribute("data-cell-identifier");
        var cellClassname = layer.getAttribute("data-class");
        if (cellClassname == null)
            cellClassname = "MUITableViewCell";
        var item = {};
        item["class"] = cellClassname;
        item["layer"] = layer;
        this.cellPrototypes[cellIdentifier] = item;
    };
    UITableView.prototype.addFooterWithLayer = function (layer) {
        layer.style.display = "none";
        var cellClassname = layer.getAttribute("data-class");
        if (cellClassname == null)
            cellClassname = "MUIView";
        var item = {};
        item["class"] = cellClassname;
        item["layer"] = layer;
        this.footerLayer = item;
    };
    UITableView.prototype.dequeueReusableCellWithIdentifierFor = function (identifier, indexPath) {
        var item = this.cellPrototypes[identifier];
        var cell = null;
        var className = item["class"];
        cell = NSClassFromString(className);
        //cell.reuseIdentifier = identifier;
        var layer = item["layer"];
        if (layer != null) {
            var newLayer = layer.cloneNode(true);
            newLayer.style.display = "";
            cell.initWithLayer(newLayer, this);
            cell.awakeFromHTML();
        }
        // let tapGesture = new MUITapGestureRecognizer();
        // tapGesture.initWithTarget(this, this.cellDidTap);
        // cell.addGestureRecognizer(tapGesture);
        cell._target = this;
        cell._onClickFn = this.cellOnClickFn;
        //cell._onDblClickFn = this.cellOnDblClickFn;
        //cell._onAccessoryClickFn = this.cellOnAccessoryClickFn;
        cell._onEditingAccessoryClickFn = this.cellOnEditingAccessoryClickFn;
        return cell;
    };
    UITableView.prototype.addSectionHeader = function (section) {
        var header = null;
        if (typeof this.dataSource.viewForHeaderInSection === "function")
            header = this.dataSource.viewForHeaderInSection(this, section);
        if (header == null)
            return;
        header.hidden = false;
        this.addSubview(header);
    };
    UITableView.prototype.addCell = function (indexPath) {
        var cell = this.dataSource.tableViewCellForRowAt(this, indexPath);
        var section = this.sections[indexPath.section];
        var nextIP = this.nextIndexPath(indexPath);
        var currentCell = this.cellForRowAtIndexPath(indexPath);
        if (currentCell != null) {
            var index = this.rows.indexOf(currentCell);
            this.insertSubviewAboveSubview(cell, currentCell);
            this.rows.splice(index, 0, cell);
        }
        else if (nextIP != null) {
            var nextCell = this.cellForRowAtIndexPath(nextIP);
            var index = this.rows.indexOf(nextCell);
            this.insertSubviewAboveSubview(cell, nextCell);
            this.rows.splice(index, 0, cell);
        }
        else {
            this.addSubview(cell);
            this.rows.push(cell);
        }
        // Update section
        cell._section = section;
        if (indexPath.row < section.length - 1) {
            section.splice(indexPath.row, 0, cell);
        }
        else {
            section.addObject(cell);
        }
    };
    UITableView.prototype.removeCell = function (indexPath) {
        var section = this.sections[indexPath.section];
        var cell = section[indexPath.row];
        section.removeObjectAtIndex(indexPath.row);
        this.rows.removeObject(cell);
        cell.removeFromSuperview();
    };
    UITableView.prototype.nextIndexPath = function (indexPath) {
        var sectionIndex = indexPath.section;
        var rowIndex = indexPath.row + 1;
        if (sectionIndex >= this.sections.length)
            return null;
        var section = this.sections[sectionIndex];
        if (rowIndex < section.length)
            return NSIndexPath.indexForRowInSection(rowIndex, sectionIndex);
        sectionIndex++;
        if (sectionIndex >= this.sections.length)
            return null;
        section = this.sections[sectionIndex];
        if (section.length == 0)
            return null;
        return NSIndexPath.indexForRowInSection(0, sectionIndex);
    };
    UITableView.prototype.addSectionFooter = function (section) {
    };
    UITableView.prototype.reloadData = function () {
        // Remove all subviews
        for (var index = 0; index < this.rows.length; index++) {
            var row = this.rows[index];
            row.removeFromSuperview();
        }
        this.rows = [];
        this.sections = [];
        this.cells = [];
        if (this.dataSource == null)
            return;
        var sections = 1;
        if (typeof this.dataSource.numberOfSectionsIn === "function")
            sections = this.dataSource.numberOfSectionsIn(this);
        for (var sectionIndex = 0; sectionIndex < sections; sectionIndex++) {
            var section = [];
            this.sections.push(section);
            var rows = this.dataSource.tableViewNumberOfRowsInSection(this, sectionIndex);
            if (rows == 0)
                continue;
            this.addSectionHeader(sectionIndex);
            for (var cellIndex = 0; cellIndex < rows; cellIndex++) {
                var ip = NSIndexPath.indexForRowInSection(cellIndex, sectionIndex);
                this.addCell(ip);
            }
            this.addSectionFooter(sectionIndex);
        }
    };
    UITableView.prototype.insertRowsAtIndexPathsWithRowAnimation = function (indexPaths, rowAnimation) {
        for (var index = 0; index < indexPaths.length; index++) {
            var ip = indexPaths[index];
            this.addCell(ip);
        }
    };
    UITableView.prototype.deleteRowsAtIndexPathsWithRowAnimation = function (indexPaths, rowAnimation) {
        for (var index = 0; index < indexPaths.length; index++) {
            var ip = indexPaths[index];
            this.removeCell(ip);
        }
    };
    UITableView.prototype.cellForRowAtIndexPath = function (indexPath) {
        if (indexPath.section >= this.sections.length)
            return null;
        var section = this.sections[indexPath.section];
        if (indexPath.row >= section.length)
            return null;
        return section[indexPath.row];
    };
    UITableView.prototype.indexPathForCell = function (cell) {
        var section = cell._section;
        var sectionIndex = this.sections.indexOf(section);
        var rowIndex = section.indexOf(cell);
        return NSIndexPath.indexForRowInSection(rowIndex, sectionIndex);
    };
    UITableView.prototype.cellDidTap = function (gesture) {
        if (gesture.state != UIGestureRecognizerState.Ended)
            return;
        var cell = gesture.view[0];
        var section = cell._section;
        var sectionIndex = this.sections.indexOf(section);
        var rowIndex = section.indexOfObject(cell);
        if (this.delegate != null && typeof this.delegate.didSelectCellAtIndexPath === "function") {
            this.delegate.didSelectCellAtIndexPath(this, NSIndexPath.indexForRowInSection(rowIndex, sectionIndex));
        }
    };
    UITableView.prototype.cellOnClickFn = function (cell) {
        var indexPath = this.indexPathForCell(cell);
        var canSelectCell = true;
        if (this.delegate != null) {
            if (typeof this.delegate.canSelectCellAtIndexPath === "function")
                canSelectCell = this.delegate.canSelectCellAtIndexPath(this, indexPath);
        }
        if (canSelectCell == false)
            return;
        if (this.allowsMultipleSelection == false) {
            cell.selected = true;
            if (this.delegate != null && typeof this.delegate.didSelectCellAtIndexPath === "function") {
                this.delegate.didSelectCellAtIndexPath(this, indexPath);
            }
        }
        else {
            //TODO:
        }
    };
    UITableView.prototype.cellOnEditingAccessoryClickFn = function (cell) {
        var indexPath = this.indexPathForCell(cell);
        if (this.delegate != null && typeof this.delegate.editingStyleForRowAtIndexPath === "function") {
            var editingStyle = this.delegate.editingStyleForRowAtIndexPath(this, indexPath);
            if (this.delegate != null && typeof this.delegate.commitEditingStyleForRowAtIndexPath === "function") {
                this.delegate.commitEditingStyleForRowAtIndexPath(this, editingStyle, indexPath);
            }
        }
    };
    return UITableView;
}(UIView));
 
var UITableViewSection = /** @class */ (function (_super) {
    __extends(UITableViewSection, _super);
    function UITableViewSection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UITableViewSection.section = function () {
    };
    return UITableViewSection;
}(UIView));
var UITableViewRow = /** @class */ (function (_super) {
    __extends(UITableViewRow, _super);
    function UITableViewRow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.section = null;
        _this.cell = null;
        return _this;
    }
    UITableViewRow.rowWithSectionAndCell = function (section, cell) {
        var row = new UITableViewRow();
        row.init();
        row.section = section;
        row.cell = cell;
    };
    return UITableViewRow;
}(UIView));
var UITableViewCellContentView = /** @class */ (function (_super) {
    __extends(UITableViewCellContentView, _super);
    function UITableViewCellContentView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UITableViewCellContentView;
}(UIView));
 
var UITableViewController = /** @class */ (function (_super) {
    __extends(UITableViewController, _super);
    function UITableViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tableView = _injectIntoOptional(null);
        return _this;
    }
    UITableViewController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        this.tableView = _injectIntoOptional(this.view[0].subviews[0]);
        this.tableView[0].dataSource = this;
        this.tableView[0].delegate = this;
    };
    UITableViewController.prototype.viewWillAppear = function (animated) {
        _super.prototype.viewWillAppear.call(this, animated);
        this.tableView[0].reloadData();
    };
    return UITableViewController;
}(UIViewController));
 
var UITableViewCellStyle;
(function (UITableViewCellStyle) {
    UITableViewCellStyle[UITableViewCellStyle["Custom"] = 0] = "Custom";
    UITableViewCellStyle[UITableViewCellStyle["Default"] = 1] = "Default";
})(UITableViewCellStyle || (UITableViewCellStyle = {}));
var UITableViewCellAccessoryType;
(function (UITableViewCellAccessoryType) {
    UITableViewCellAccessoryType[UITableViewCellAccessoryType["None"] = 0] = "None";
    UITableViewCellAccessoryType[UITableViewCellAccessoryType["DisclosureIndicator"] = 1] = "DisclosureIndicator";
    UITableViewCellAccessoryType[UITableViewCellAccessoryType["DetailDisclosureButton"] = 2] = "DetailDisclosureButton";
    UITableViewCellAccessoryType[UITableViewCellAccessoryType["Checkmark"] = 3] = "Checkmark";
})(UITableViewCellAccessoryType || (UITableViewCellAccessoryType = {}));
var UITableViewCellEditingStyle;
(function (UITableViewCellEditingStyle) {
    UITableViewCellEditingStyle[UITableViewCellEditingStyle["None"] = 0] = "None";
    UITableViewCellEditingStyle[UITableViewCellEditingStyle["Delete"] = 1] = "Delete";
    UITableViewCellEditingStyle[UITableViewCellEditingStyle["Insert"] = 2] = "Insert";
})(UITableViewCellEditingStyle || (UITableViewCellEditingStyle = {}));
var UITableViewCellSeparatorStyle;
(function (UITableViewCellSeparatorStyle) {
    UITableViewCellSeparatorStyle[UITableViewCellSeparatorStyle["None"] = 0] = "None";
    UITableViewCellSeparatorStyle[UITableViewCellSeparatorStyle["SingleLine"] = 1] = "SingleLine";
    UITableViewCellSeparatorStyle[UITableViewCellSeparatorStyle["SingleLineEtched"] = 2] = "SingleLineEtched"; // TODO 
})(UITableViewCellSeparatorStyle || (UITableViewCellSeparatorStyle = {}));
var UITableViewCellSelectionStyle;
(function (UITableViewCellSelectionStyle) {
    UITableViewCellSelectionStyle[UITableViewCellSelectionStyle["None"] = 0] = "None";
    UITableViewCellSelectionStyle[UITableViewCellSelectionStyle["Default"] = 1] = "Default";
})(UITableViewCellSelectionStyle || (UITableViewCellSelectionStyle = {}));
var UITableViewCell = /** @class */ (function (_super) {
    __extends(UITableViewCell, _super);
    function UITableViewCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reuseIdentifier = _injectIntoOptional(null);
        _this.nodeID = null;
        _this.contentView = null;
        _this.style = UITableViewCellStyle.Custom;
        _this.textLabel = _injectIntoOptional(null);
        _this.accessoryView = _injectIntoOptional(null);
        _this.separatorStyle = UITableViewCellSeparatorStyle.SingleLine;
        _this._editing = false;
        _this.editingAccessoryView = _injectIntoOptional(null);
        _this.selectionStyle = UITableViewCellSelectionStyle.Default;
        _this._selected = false;
        _this._target = null;
        _this._onClickFn = null;
        _this._onDblClickFn = null;
        _this._onAccessoryClickFn = null;
        _this._onEditingAccessoryClickFn = null;
        _this._section = null;
        _this.editingAccessoryInsertView = null;
        _this.editingAccessoryDeleteView = null;
        _this._editingAccessoryType = UITableViewCellEditingStyle.None;
        _this._accessoryType = UITableViewCellAccessoryType.None;
        return _this;
    }
    UITableViewCell.prototype.initStyleUITableViewCellCellStyleReuseIdentifierOptional = function (style) {
        _super.prototype.init.call(this);
        this.style = style;
        if (style == UITableViewCellStyle.Default) {
            this.textLabel = _injectIntoOptional(new UILabel());
            this.textLabel[0].init();
            this.textLabel[0].layer.style.top = "";
            this.textLabel[0].layer.style.left = "";
            this.textLabel[0].layer.style.width = "";
            this.textLabel[0].layer.style.height = "";
            this.textLabel[0].layer.classList.add("tableviewcell_default_textlabel");
            this.addSubview(this.textLabel[0]);
            this.layer.style.height = "44px";
            MUICoreLayerAddStyle(this.layer, "cell");
        }
        this._setupLayer();
    };
    UITableViewCell.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        var outletIDs = {};
        this.scanLayerNodes(layer, owner, outletIDs);
        var style = layer.getAttribute("data-cell-style");
        if (style == "IBUITableViewCellStyleDefault") {
            this.style = UITableViewCellStyle.Default;
            var propertyID = layer.getAttribute("data-cell-textlabel-id");
            var item = outletIDs[propertyID];
            this.textLabel = _injectIntoOptional(item);
        }
        this._setupLayer();
    };
    UITableViewCell.prototype.scanLayerNodes = function (layer, owner, outlets) {
        if (layer.childNodes.length == 0)
            return;
        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                this.scanLayerNodes(subLayer, owner, outlets);
                if (subLayer.getAttribute("data-accessory-type") != null) {
                    this.addAccessoryView(subLayer, owner);
                }
                if (subLayer.getAttribute("data-editing-accessory-view") != null) {
                    this.addEditingAccessoryView(subLayer, owner);
                }
            }
        }
    };
    //data-accessory-type="checkmark"
    UITableViewCell.prototype.addAccessoryView = function (layer, owner) {
        var type = layer.getAttribute("data-accessory-type");
        this.accessoryView = _injectIntoOptional(new UIView());
        this.accessoryView[0].initWithLayer(layer, owner);
        if (type == "checkmark")
            this.accessoryType = UITableViewCellAccessoryType.Checkmark;
        else
            this.accessoryType = UITableViewCellAccessoryType.None;
        if (this.accessoryType != UITableViewCellAccessoryType.None)
            return;
        this.accessoryView[0].layer.addEventListener("click", this.accessoryViewDidClick.bind(this));
    };
    UITableViewCell.prototype.accessoryViewDidClick = function (e) {
        e.stopPropagation();
        this._onAccessoryClickFn.call(this._target, this);
    };
    UITableViewCell.prototype.addEditingAccessoryView = function (layer, owner) {
        var type = layer.getAttribute("data-editing-accessory-view");
        if (type == "insert") {
            this.editingAccessoryInsertView = new UIView();
            this.editingAccessoryInsertView.initWithLayer(layer, owner);
            this.editingAccessoryInsertView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }
        else if (type == "delete") {
            this.editingAccessoryDeleteView = new UIView();
            this.editingAccessoryDeleteView.initWithLayer(layer, owner);
            this.editingAccessoryDeleteView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }
        else {
            this.editingAccessoryView = _injectIntoOptional(new UIView());
            this.editingAccessoryView[0].initWithLayer(layer, owner);
            this.editingAccessoryView[0].layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }
        // // TODO: Change for a gesuture recongnizer or something independent of the html
        // let instance = this;
        // this.editingAccessoryView.layer.onclick = function (e) {
        //     if (instance._onAccessoryClickFn != null) {
        //         e.stopPropagation();
        //         instance._onAccessoryClickFn.call(instance._target, instance);
        //     }
        // };
    };
    Object.defineProperty(UITableViewCell.prototype, "editingAccessoryType", {
        get: function () { return this._editingAccessoryType; },
        set: function (value) {
            this.setEditingAccessoryType(value);
        },
        enumerable: true,
        configurable: true
    });
    UITableViewCell.prototype.setEditingAccessoryType = function (value) {
        this._editingAccessoryType = value;
        // Reset
        if (this.editingAccessoryDeleteView != null)
            this.editingAccessoryDeleteView.setHidden(true);
        if (this.editingAccessoryInsertView != null)
            this.editingAccessoryInsertView.setHidden(true);
        if (this.editingAccessoryView[0] != null)
            this.editingAccessoryView[0].setHidden(true);
        // Set the view type
        if (value == UITableViewCellEditingStyle.Insert && this.editingAccessoryInsertView != null) {
            this.editingAccessoryView = _injectIntoOptional(this.editingAccessoryInsertView);
            this.editingAccessoryInsertView.setHidden(false);
        }
        else if (value == UITableViewCellEditingStyle.Delete && this.editingAccessoryDeleteView != null) {
            this.editingAccessoryView = _injectIntoOptional(this.editingAccessoryDeleteView);
            this.editingAccessoryDeleteView.setHidden(false);
        }
    };
    UITableViewCell.prototype.editingAccessoryViewDidClick = function (e) {
        e.stopPropagation();
        this._onEditingAccessoryClickFn.call(this._target, this);
    };
    UITableViewCell.prototype._setupLayer = function () {
        //this.layer.style.position = "absolute";        
        var instance = this;
        this.layer.onclick = function (e) {
            if (instance._onClickFn != null) {
                e.stopPropagation();
                instance._onClickFn.call(instance._target, instance);
            }
        };
        this.layer.ondblclick = function (e) {
            if (instance._onDblClickFn != null) {
                e.stopPropagation();
                instance._onDblClickFn.call(instance._target, instance);
            }
        };
    };
    Object.defineProperty(UITableViewCell.prototype, "accessoryType", {
        get: function () { return this._accessoryType; },
        set: function (value) {
            this.setAccessoryType(value);
        },
        enumerable: true,
        configurable: true
    });
    UITableViewCell.prototype.setAccessoryType = function (type) {
        if (type == this._accessoryType)
            return;
        if (this.accessoryView[0] == null) {
            if (this.style == UITableViewCellStyle.Default)
                this.textLabel[0].layer.style.right = "25px";
            var layer = document.createElement("div");
            layer.style.position = "absolute";
            layer.style.top = "15px";
            layer.style.right = "5px";
            layer.style.width = "15px";
            layer.style.height = "15px";
            this.accessoryView = _injectIntoOptional(new UIView("accessory_view"));
            this.accessoryView[0].initWithLayer(layer, null);
            this.addSubview(this.accessoryView[0]);
        }
        // if (type == UITableViewCellAccessoryType.None) this.accessoryView.setHidden(true);
        // else this.accessoryView.setHidden(false);
        if (type == UITableViewCellAccessoryType.None)
            MUICoreLayerRemoveStyle(this.layer, "checked");
        else
            MUICoreLayerAddStyle(this.layer, "checked");
        this._accessoryType = type;
    };
    UITableViewCell.prototype.setPaddingIndex = function (value) {
        var offset = (value + 1) * 10;
        if (this.style == UITableViewCellStyle.Default)
            this.textLabel[0].setX(offset);
    };
    UITableViewCell.prototype.setHeight = function (h) {
        _super.prototype.setHeight.call(this, h);
        var offsetY = (h - 15) / 2;
        if (this.accessoryView[0] != null) {
            this.accessoryView[0].layer.style.top = offsetY + "px";
        }
    };
    UITableViewCell.prototype.setSelected = function (value) {
        if (this._selected == value)
            return;
        // WORKAORUND
        //let fix = this.layer.getClientRects();
        // WORKAORUND
        this.willChangeValue("selected");
        this._selected = value;
        if (this.selectionStyle == UITableViewCellSelectionStyle.Default) {
            if (value == true)
                MUICoreLayerAddStyle(this.layer, "selected");
            else
                MUICoreLayerRemoveStyle(this.layer, "selected");
        }
        this.didChangeValue("selected");
    };
    Object.defineProperty(UITableViewCell.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this.setSelected(value);
        },
        enumerable: true,
        configurable: true
    });
    UITableViewCell.prototype._setHightlightedSubviews = function (value) {
        for (var count = 0; count < this.subviews.length; count++) {
            var v = this.subviews[count];
            if (v instanceof UILabel)
                v.setHightlighted(value);
        }
        if (this.accessoryView[0] == null)
            return;
        if (value == true) {
            switch (this.accessoryType) {
                case UITableViewCellAccessoryType.DisclosureIndicator:
                    //this.accessoryView.layer.classList.remove("tableviewcell_accessory_disclosure_indicator");
                    //this.accessoryView.layer.classList.add("tableviewcell_accessory_disclosure_indicator_highlighted");
                    break;
            }
        }
        else {
            switch (this.accessoryType) {
                case UITableViewCellAccessoryType.DisclosureIndicator:
                    //this.accessoryView.layer.classList.remove("tableviewcell_accessory_disclosure_indicator_highlighted");
                    //this.accessoryView.layer.classList.add("tableviewcell_accessory_disclosure_indicator");
                    break;
            }
        }
    };
    UITableViewCell.prototype.setEditingAnimated = function (editing, animated) {
        if (editing == this._editing)
            return;
        this._editing = editing;
        if (this.editingAccessoryView[0] != null) {
            this.editingAccessoryView[0].setHidden(!editing);
        }
    };
    Object.defineProperty(UITableViewCell.prototype, "editing", {
        set: function (value) {
            this.setEditingAnimated(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UITableViewCell.prototype, "isEditing", {
        get: function () {
            return this._editing;
        },
        enumerable: true,
        configurable: true
    });
    return UITableViewCell;
}(UIView));
 
var UIAlertViewStyle;
(function (UIAlertViewStyle) {
    UIAlertViewStyle[UIAlertViewStyle["Default"] = 0] = "Default";
})(UIAlertViewStyle || (UIAlertViewStyle = {}));
var UIAlertItemType;
(function (UIAlertItemType) {
    UIAlertItemType[UIAlertItemType["None"] = 0] = "None";
    UIAlertItemType[UIAlertItemType["Action"] = 1] = "Action";
    UIAlertItemType[UIAlertItemType["TextField"] = 2] = "TextField";
    UIAlertItemType[UIAlertItemType["ComboBox"] = 3] = "ComboBox";
})(UIAlertItemType || (UIAlertItemType = {}));
var UIAlertItem = /** @class */ (function (_super) {
    __extends(UIAlertItem, _super);
    function UIAlertItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = UIAlertItemType.None;
        return _this;
    }
    UIAlertItem.prototype.initWithType = function (type) {
        this.type = type;
    };
    return UIAlertItem;
}(NSObject));
 
var UIAlertTextField = /** @class */ (function (_super) {
    __extends(UIAlertTextField, _super);
    function UIAlertTextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textField = null;
        return _this;
    }
    UIAlertTextField.prototype.initWithConfigurationHandler = function (target, handler) {
        _super.prototype.initWithType.call(this, UIAlertItemType.TextField);
        this.textField = new UITextField();
        this.textField.init();
        if (target != null && handler != null) {
            handler.call(target, this.textField);
        }
    };
    return UIAlertTextField;
}(UIAlertItem));
 
var UIAlertAction = /** @class */ (function (_super) {
    __extends(UIAlertAction, _super);
    function UIAlertAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = _injectIntoOptional(null);
        _this.style = UIAlertAction.Style._default;
        _this.target = null;
        _this.completion = null;
        return _this;
    }
    UIAlertAction.alertActionWithTitle = function (title, style /*UIAlertAction.Style*/, target, completion) {
        var action = new UIAlertAction();
        action.initTitleOptionalStyleUIAlertActionStyleHandlerOptional(_injectIntoOptional(title), style);
        action.target = target;
        action.completion = completion;
        return action;
    };
    UIAlertAction.prototype.initTitleOptionalStyleUIAlertActionStyleHandlerOptional = function (title, style) {
        _super.prototype.initWithType.call(this, UIAlertItemType.Action);
        this.title = _injectIntoOptional(title[0]);
        this.style = style;
    };
    UIAlertAction.Style = /** @class */ (function () {
        function class_3() {
        }
        Object.defineProperty(class_3, "_default", {
            get: function () { return Object.assign(new UIAlertAction.Style(), { rawValue: 0 }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_3, "cancel", {
            get: function () { return Object.assign(new UIAlertAction.Style(), { rawValue: 1 }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_3, "destructive", {
            get: function () { return Object.assign(new UIAlertAction.Style(), { rawValue: 2 }); },
            enumerable: true,
            configurable: true
        });
        return class_3;
    }());
    return UIAlertAction;
}(UIAlertItem));
 
var UIAlertController = /** @class */ (function (_super) {
    __extends(UIAlertController, _super);
    function UIAlertController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textFields = _injectIntoOptional([]);
        _this.comboBoxes = [];
        _this.target = null;
        _this.completion = null;
        _this._items = [];
        _this._title = null;
        _this._message = null;
        _this._style = UIAlertViewStyle.Default;
        _this._backgroundView = null;
        _this.tableView = null;
        _this._headerCell = null;
        _this._alertViewSize = new CGSize(320, 50);
        // Transitioning delegate
        _this._fadeInAnimationController = null;
        _this._fadeOutAnimationController = null;
        return _this;
    }
    UIAlertController.prototype.initTitleOptionalMessageOptionalPreferredStyleUIAlertControllerStyle = function (title, message, style) {
        _super.prototype.init.call(this);
        this.modalPresentationStyle = UIModalPresentationStyle.FormSheet;
        this._title = title[0];
        this._message = message[0];
        this._style = style;
        this.transitioningDelegate = this;
    };
    UIAlertController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        //UICoreLayerRemoveStyle(this.view.layer, "page");
        this.view[0].layer.style.background = "";
        this.view[0].layer.style.backgroundColor = "";
        //this.view.layer.classList.add("alert-container");
        this._backgroundView = new UIView();
        this._backgroundView.init();
        MUICoreLayerAddStyle(this._backgroundView.layer, "alert-container");
        this.view[0].addSubview(this._backgroundView);
        this.tableView = new UITableView();
        this.tableView.init();
        this.tableView.dataSource = this;
        this.tableView.delegate = this;
        this.tableView.layer.style.background = "";
        this.tableView.layer.style.position = "";
        this.tableView.layer.style.width = "";
        this.tableView.layer.style.height = "";
        MUICoreLayerAddStyle(this.tableView.layer, "alert-table");
        this._backgroundView.addSubview(this.tableView);
    };
    UIAlertController.prototype.viewDidAppear = function (animated) {
        _super.prototype.viewDidAppear.call(this, animated);
        this.tableView.reloadData();
        if (this.textFields[0].length > 0) {
            var tf = this.textFields[0][0];
            tf.becomeFirstResponder();
        }
    };
    UIAlertController.prototype.viewWillDisappear = function (animated) {
        _super.prototype.viewWillDisappear.call(this, animated);
        if (this.target != null && this.completion != null) {
            this.completion.call(this.target);
        }
    };
    Object.defineProperty(UIAlertController.prototype, "preferredContentSize", {
        get: function () {
            return this._alertViewSize;
        },
        enumerable: true,
        configurable: true
    });
    UIAlertController.prototype._addItem = function (item) {
        this._items.push(item);
        this._calculateContentSize();
    };
    UIAlertController.prototype.addAction = function (action) {
        this._addItem(action);
    };
    UIAlertController.prototype.addTextFieldConfigurationHandler = function (target, handler) {
        var ai = new UIAlertTextField();
        ai.initWithConfigurationHandler(target[0], handler);
        this.textFields[0].push(ai.textField);
        this._addItem(ai);
    };
    UIAlertController.prototype.addCompletionHandler = function (target, handler) {
        this.target = target;
        this.completion = handler;
    };
    UIAlertController.prototype._calculateContentSize = function () {
        var h = 80 + (this._items.length * 50) + 1;
        this._alertViewSize = new CGSize(320, h);
    };
    UIAlertController.prototype.numberOfSectionsIn = function (tableview) {
        return 1;
    };
    UIAlertController.prototype.tableViewNumberOfRowsInSection = function (tableview, section) {
        return this._items.length + 1;
    };
    UIAlertController.prototype.tableViewCellForRowAt = function (tableview, indexPath) {
        var cell = null;
        if (indexPath.row == 0) {
            cell = this._createHeaderCell();
        }
        else {
            var item = this._items[indexPath.row - 1];
            if (item.type == UIAlertItemType.Action) {
                cell = this._createActionCellWithTitle(item.title, item.style);
            }
            else if (item.type == UIAlertItemType.TextField) {
                cell = this._createTextFieldCell(item.textField);
            }
        }
        cell.separatorStyle = UITableViewCellSeparatorStyle.None;
        return cell;
    };
    UIAlertController.prototype.heightForRowAtIndexPath = function (tableView, indexPath) {
        var h = 50;
        if (indexPath.row == 0)
            h = 80;
        return h;
    };
    UIAlertController.prototype.canSelectCellAtIndexPath = function (tableview, indexPath) {
        if (indexPath.row == 0)
            return false;
        var item = this._items[indexPath.row - 1];
        if (item.type == UIAlertItemType.Action)
            return true;
        return false;
    };
    UIAlertController.prototype.didSelectCellAtIndexPath = function (tableView, indexPath) {
        var item = this._items[indexPath.row - 1];
        if (item.type == UIAlertItemType.Action) {
            if (item.target != null && item.completion != null)
                item.completion.call(item.target);
            this.dismissViewControllerAnimatedCompletion(true);
        }
    };
    // Private methods
    UIAlertController.prototype._createHeaderCell = function () {
        var cell = new UITableViewCell();
        cell.initStyleUITableViewCellCellStyleReuseIdentifierOptional(UITableViewCellStyle.Custom);
        MUICoreLayerAddStyle(cell.layer, "alert-header");
        var titleLabel = new UILabel();
        titleLabel.init();
        titleLabel.text = _injectIntoOptional(this._title);
        titleLabel.layer.style.left = "";
        titleLabel.layer.style.top = "";
        titleLabel.layer.style.right = "";
        titleLabel.layer.style.height = "";
        titleLabel.layer.style.width = "";
        titleLabel.layer.style.background = "";
        MUICoreLayerAddStyle(titleLabel.layer, "large");
        MUICoreLayerAddStyle(titleLabel.layer, "strong");
        cell.addSubview(titleLabel);
        var messageLabel = new UILabel();
        messageLabel.init();
        messageLabel.text = _injectIntoOptional(this._message);
        messageLabel.layer.style.left = "";
        messageLabel.layer.style.top = "";
        messageLabel.layer.style.right = "";
        messageLabel.layer.style.height = "";
        messageLabel.layer.style.width = "";
        messageLabel.layer.style.background = "";
        MUICoreLayerAddStyle(messageLabel.layer, "light");
        cell.addSubview(messageLabel);
        //cell.layer.style.background = "transparent";
        return cell;
    };
    UIAlertController.prototype._createActionCellWithTitle = function (title, style /*UIAlertAction.Style*/) {
        var cell = new UITableViewCell();
        cell.initStyleUITableViewCellCellStyleReuseIdentifierOptional(UITableViewCellStyle.Custom);
        MUICoreLayerAddStyle(cell.layer, "alert-cell");
        var buttonLabel = new UILabel();
        buttonLabel.init();
        //UICoreLayerRemoveStyle(buttonLabel.layer, "label");
        buttonLabel.text = _injectIntoOptional(title);
        buttonLabel.layer.style.left = "";
        buttonLabel.layer.style.top = "";
        buttonLabel.layer.style.right = "";
        buttonLabel.layer.style.height = "";
        buttonLabel.layer.style.width = "";
        buttonLabel.layer.style.background = "";
        cell.addSubview(buttonLabel);
        //cell.layer.style.background = "transparent";
        MUICoreLayerAddStyle(buttonLabel.layer, "btn");
        //MUICoreLayerAddStyle(buttonLabel.layer, "label");                
        switch (style.rawValue) {
            case UIAlertAction.Style._default.rawValue:
                MUICoreLayerAddStyle(buttonLabel.layer, "default");
                break;
            case UIAlertAction.Style.cancel.rawValue:
                MUICoreLayerAddStyle(buttonLabel.layer, "cancel");
                break;
            case UIAlertAction.Style.destructive.rawValue:
                MUICoreLayerAddStyle(buttonLabel.layer, "destructive");
                break;
        }
        return cell;
    };
    UIAlertController.prototype._createTextFieldCell = function (textField) {
        var cell = new UITableViewCell();
        cell.initStyleUITableViewCellCellStyleReuseIdentifierOptional(UITableViewCellStyle.Custom);
        MUICoreLayerAddStyle(cell.layer, "alert-cell");
        textField.layer.style.left = "";
        textField.layer.style.top = "";
        textField.layer.style.right = "";
        textField.layer.style.height = "";
        textField.layer.style.width = "";
        textField.layer.style.background = "";
        MUICoreLayerAddStyle(textField.layer, "input-text");
        cell.addSubview(textField);
        return cell;
    };
    UIAlertController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._fadeInAnimationController == null) {
            this._fadeInAnimationController = new UIAlertFadeInAnimationController();
            this._fadeInAnimationController.init();
        }
        return this._fadeInAnimationController;
    };
    UIAlertController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._fadeOutAnimationController == null) {
            this._fadeOutAnimationController = new UIAlertFadeOutAnimationController();
            this._fadeOutAnimationController.init();
        }
        return this._fadeOutAnimationController;
    };
    UIAlertController.Style = /** @class */ (function () {
        function class_4() {
        }
        Object.defineProperty(class_4, "actionSheet", {
            get: function () { return Object.assign(new UIAlertController.Style(), { rawValue: 0 }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_4, "alert", {
            get: function () { return Object.assign(new UIAlertController.Style(), { rawValue: 1 }); },
            enumerable: true,
            configurable: true
        });
        return class_4;
    }());
    return UIAlertController;
}(UIViewController));
 
var UIAlertFadeInAnimationController = /** @class */ (function (_super) {
    __extends(UIAlertFadeInAnimationController, _super);
    function UIAlertFadeInAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIAlertFadeInAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    UIAlertFadeInAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions       
    };
    UIAlertFadeInAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIAlertFadeInAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.FadeIn);
        return animations;
    };
    return UIAlertFadeInAnimationController;
}(NSObject));
 
var UIAlertFadeOutAnimationController = /** @class */ (function (_super) {
    __extends(UIAlertFadeOutAnimationController, _super);
    function UIAlertFadeOutAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIAlertFadeOutAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    UIAlertFadeOutAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions       
    };
    UIAlertFadeOutAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIAlertFadeOutAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.FadeOut);
        return animations;
    };
    return UIAlertFadeOutAnimationController;
}(NSObject));
 
var UIBarItem = /** @class */ (function (_super) {
    __extends(UIBarItem, _super);
    function UIBarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIBarItem;
}(NSObject));
 
var UIBarButtonSystemItem;
(function (UIBarButtonSystemItem) {
    UIBarButtonSystemItem[UIBarButtonSystemItem["Done"] = 0] = "Done";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Cancel"] = 1] = "Cancel";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Edit"] = 2] = "Edit";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Save"] = 3] = "Save";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Add"] = 4] = "Add";
    UIBarButtonSystemItem[UIBarButtonSystemItem["FlexibleSpace"] = 5] = "FlexibleSpace";
    UIBarButtonSystemItem[UIBarButtonSystemItem["FixedSpace"] = 6] = "FixedSpace";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Compose"] = 7] = "Compose";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Reply"] = 8] = "Reply";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Action"] = 9] = "Action";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Organize"] = 10] = "Organize";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Bookmarks"] = 11] = "Bookmarks";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Search"] = 12] = "Search";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Refresh"] = 13] = "Refresh";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Stop"] = 14] = "Stop";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Camera"] = 15] = "Camera";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Trash"] = 16] = "Trash";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Play"] = 17] = "Play";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Pause"] = 18] = "Pause";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Rewind"] = 19] = "Rewind";
    UIBarButtonSystemItem[UIBarButtonSystemItem["FastForward"] = 20] = "FastForward";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Undo"] = 21] = "Undo";
    UIBarButtonSystemItem[UIBarButtonSystemItem["Redo"] = 22] = "Redo";
})(UIBarButtonSystemItem || (UIBarButtonSystemItem = {}));
var UIBarButtonItem = /** @class */ (function (_super) {
    __extends(UIBarButtonItem, _super);
    function UIBarButtonItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.layer = null;
        _this.owner = null;
        _this.customView = _injectIntoOptional(null);
        return _this;
    }
    UIBarButtonItem.prototype.initWithCustomView = function (view) {
        _super.prototype.init.call(this);
        this.customView = _injectIntoOptional(view);
    };
    UIBarButtonItem.prototype.initWithBarButtonSystemItem = function (systemItem, target, action) {
        _super.prototype.init.call(this);
        var button = new UIButton();
        button.init();
        MUICoreLayerAddStyle(button.layer, "system-" + UIBarButtonSystemItem[systemItem] + "-icon");
        this.customView = _injectIntoOptional(button);
    };
    UIBarButtonItem.prototype.initWithLayer = function (layer, owner) {
        _super.prototype.init.call(this);
        this.layer = layer;
        this.owner = owner;
        var button = new UIButton();
        button.init();
        var systemStyle = layer.getAttribute("data-bar-button-item-system");
        if (systemStyle != null)
            MUICoreLayerAddStyle(button.layer, "system-" + systemStyle + "-icon");
        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];
                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION")
                    continue;
                if (subLayer.getAttribute("data-action-selector")) {
                    var action = subLayer.getAttribute("data-action-selector");
                    this.target = owner;
                    this.action = _injectIntoOptional(owner[action]);
                    button.addTargetActionFor(_injectIntoOptional(this.target), this.action[0], UIControl.Event.TouchUpInside);
                }
            }
        }
        this.customView = _injectIntoOptional(button);
    };
    return UIBarButtonItem;
}(UIBarItem));
 
var UINavigationBar = /** @class */ (function (_super) {
    __extends(UINavigationBar, _super);
    function UINavigationBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.leftView = null;
        _this.titleView = null;
        _this.rigthView = null;
        _this._items = [];
        return _this;
    }
    UINavigationBar.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setup();
    };
    UINavigationBar.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.setup();
    };
    UINavigationBar.prototype.setup = function () {
        MUICoreLayerAddStyle(this.layer, "navigation-bar");
        this.layer.style.width = "100%";
        this.leftView = new UIView();
        this.leftView.init();
        this.addSubview(this.leftView);
        this.titleView = new UIView();
        this.titleView.init();
        this.addSubview(this.titleView);
        this.rigthView = new UIView();
        this.rigthView.init();
        this.addSubview(this.rigthView);
    };
    Object.defineProperty(UINavigationBar.prototype, "items", {
        get: function () { return _injectIntoOptional(this._items); },
        enumerable: true,
        configurable: true
    });
    UINavigationBar.prototype.setItemsAnimated = function (items, animated) {
        this._items = items[0];
        //TODO: Animate!!!
        for (var index = 0; index < items[0].length; index++) {
            var ni = items[0][index];
            // Add title
            if (ni.titleView[0] != null) {
                this.titleView.addSubview(ni.titleView[0]);
            }
            // Add right button
            if (ni.rightBarButtonItem[0] != null) {
                this.rigthView.addSubview(ni.rightBarButtonItem[0].customView[0]);
            }
        }
    };
    UINavigationBar.prototype.pushNavigationItemAnimated = function (item, animated) {
        this.items[0].addObject(item);
        // TODO: Make the animation and change the items
    };
    UINavigationBar.prototype.popNavigationItemAnimated = function (item, animated) {
        this.items[0].removeObject(item);
        // TODO: Make the animation and change the items
    };
    Object.defineProperty(UINavigationBar.prototype, "topItem", {
        get: function () {
            if (this.items[0].length == 0)
                return null;
            return _injectIntoOptional(this.items[0][this.items[0].length - 1]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UINavigationBar.prototype, "backItem", {
        get: function () {
            if (this.items[0].length < 2)
                return null;
            return _injectIntoOptional(this.items[0][this.items[0].length - 2]);
        },
        enumerable: true,
        configurable: true
    });
    return UINavigationBar;
}(UIView));
 
var UINavigationItem = /** @class */ (function (_super) {
    __extends(UINavigationItem, _super);
    function UINavigationItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backBarButtonItem = _injectIntoOptional(null);
        _this.titleView = _injectIntoOptional(null);
        _this.title = _injectIntoOptional(null);
        return _this;
    }
    UINavigationItem.prototype.initTitleString = function (title) {
        _super.prototype.init.call(this);
        this.title = _injectIntoOptional(title);
        var titleLabel = new UILabel();
        titleLabel.init();
        titleLabel.text = _injectIntoOptional(title);
        this.titleView = _injectIntoOptional(titleLabel);
    };
    UINavigationItem.prototype.initWithLayer = function (layer, owner) {
        var title = layer.getAttribute("data-navigation-title");
        this.title = _injectIntoOptional(title);
        var titleLabel = new UILabel();
        titleLabel.init();
        titleLabel.text = _injectIntoOptional(title);
        this.titleView = _injectIntoOptional(titleLabel);
        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                var key = subLayer.getAttribute("data-bar-button-item-key");
                var button = new UIBarButtonItem();
                button.initWithLayer(subLayer, owner);
                if (key == "rightBarButtonItem") {
                    owner.navigationItem.rightBarButtonItem = _injectIntoOptional(button);
                }
                // if (subLayer.getAttribute("data-nav-item-left") != null) {
                //     let v:UIView = new UIView();
                //     v.initWithLayer(subLayer, this);
                //     this.leftView = v;
                // }
                // else if (subLayer.getAttribute("data-nav-item-center") != null) {
                //     let v:UIView = new UIView();
                //     v.initWithLayer(subLayer, this);
                //     this.titleView = v;
                // }
                // else if (subLayer.getAttribute("data-nav-item-right") != null) {
                //     let v:UIView = new UIView();
                //     v.initWithLayer(subLayer, this);
                //     this.rightView = v;
                // }
            }
            // let backButtonLayer = MUICoreLayerSearchElementByAttribute(layer, "data-nav-item-back");
            // if (backButtonLayer != null) {
            //     this.backBarButtonItem = new UIButton();
            //     this.backBarButtonItem.initWithLayer(backButtonLayer, this);
            // }
        }
    };
    return UINavigationItem;
}(NSObject));
 
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
        _this._navigationBar = null;
        // Transitioning delegate
        _this._pushAnimationController = null;
        _this._popAnimationController = null;
        return _this;
    }
    Object.defineProperty(UINavigationController.prototype, "navigationBar", {
        get: function () {
            return this._navigationBar;
        },
        enumerable: true,
        configurable: true
    });
    UINavigationController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.view[0].layer.style.overflow = "hidden";
    };
    UINavigationController.prototype.initRootViewControllerUIViewController = function (vc) {
        this.init();
        this.setRootViewController(vc);
    };
    UINavigationController.prototype.setRootViewController = function (vc) {
        //this.transitioningDelegate = this;                
        this.rootViewController = vc;
        this.view[0].addSubview(vc.view[0]);
        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex = 0;
        this.rootViewController.navigationController = _injectIntoOptional(this);
        this.addChildViewController(vc);
        // if (this.presentationController != null) {
        //     var size = vc.preferredContentSize;
        //     this.contentSize = size;
        // }
    };
    UINavigationController.prototype._setViewLoaded = function (value) {
        _super.prototype._setViewLoaded.call(this, value);
        this._navigationBar = this.view[0].subviews[0];
        var navItems = [this.rootViewController.navigationItem];
        this._navigationBar.setItemsAnimated(_injectIntoOptional(navItems), false);
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
    UINavigationController.prototype.pushViewControllerAnimated = function (vc, animated) {
        var lastVC = this.viewControllersStack[this.currentViewControllerIndex];
        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex++;
        vc.navigationController = _injectIntoOptional(this);
        vc.onLoadView(this, function () {
            if (vc.navigationItem == null) {
                vc.navigationItem = new UINavigationItem();
                vc.navigationItem.init();
            }
            var backButton = new UIButton();
            backButton.init();
            backButton.setTitleFor(_injectIntoOptional(NSLocalizeString("Back", "BACK")));
            MUICoreLayerAddStyle(backButton.layer, "system-back-icon");
            backButton.addTargetActionFor(_injectIntoOptional(vc), function () {
                this.navigationController[0].popViewControllerAnimated(true);
            }, UIControl.Event.touchUpInside);
            var backBarButtonItem = new UIBarButtonItem();
            backBarButtonItem.initWithCustomView(backButton);
            backBarButtonItem.target = vc;
            backBarButtonItem.action = _injectIntoOptional(vc.navigationController[0].popViewControllerAnimated());
            this.view[0].addSubview(vc.view[0]);
            this.addChildViewController(vc);
            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;
            _MUIShowViewController(lastVC, vc, this, animated);
        });
    };
    UINavigationController.prototype.popViewControllerAnimated = function (animated) {
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
    UINavigationController.prototype.popToRootViewControllerAnimated = function (animated) {
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
    // Segues
    UINavigationController.prototype._checkSegues = function () {
        _super.prototype._checkSegues.call(this);
        for (var index = 0; index < this._segues.length; index++) {
            var s = this._segues[index];
            var kind = s["Kind"];
            if (kind == "relationship") {
                var destination = s["Destination"];
                var relationship = s["Relationship"];
                if (relationship == "rootViewController") {
                    var vc = this.storyboard[0]._instantiateViewControllerWithDestination(destination);
                    this.setRootViewController(vc);
                }
            }
        }
    };
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
}(NSObject));
 
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
}(NSObject));
 
/**
 * Created by godshadow on 05/08/16.
 */
var UISplitViewControllerDisplayMode;
(function (UISplitViewControllerDisplayMode) {
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["Automatic"] = 0] = "Automatic";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["PrimaryHidden"] = 1] = "PrimaryHidden";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["AllVisible"] = 2] = "AllVisible";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["PrimaryOverlay"] = 3] = "PrimaryOverlay";
})(UISplitViewControllerDisplayMode || (UISplitViewControllerDisplayMode = {}));
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
        if (MIOCoreIsPhone() == false)
            MUICoreLayerAddStyle(this.masterView.layer, "master-view");
        this.view[0].addSubview(this.masterView);
        if (MIOCoreIsPhone() == false) {
            this.detailView = new UIView();
            this.detailView.init();
            MUICoreLayerAddStyle(this.detailView.layer, "detail-view");
            this.view[0].addSubview(this.detailView);
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
            // this._displayModeButtonItem = new UIButton();
            // this._displayModeButtonItem.initWithAction(this, this.displayModeButtonItemAction);        
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
        if (MIOCoreIsPhone() == true)
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
    UISplitViewController.prototype.showDetailViewControllerSender = function (vc) {
        vc.splitViewController = _injectIntoOptional(this);
        if (MIOCoreIsPhone() == true) {
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
            this.detailView.addSubview(newVC.view[0]);
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
            this.view.addSubview(vc.view[0]);
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
            fromVC.view[0].removeFromSuperview();
        });
    };
    UISplitViewController.prototype.displayModeButtonItemAction = function () {
        if (MIOCoreIsPhone() == true)
            this._popViewController();
    };
    UISplitViewController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (MIOCoreIsPhone() == false)
            return;
        if (this._pushAnimationController == null) {
            this._pushAnimationController = new MUIPushAnimationController();
            this._pushAnimationController.init();
        }
        return this._pushAnimationController;
    };
    UISplitViewController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (MIOCoreIsPhone() == false)
            return;
        if (this._popAnimationController == null) {
            this._popAnimationController = new MUIPopAnimationController();
            this._popAnimationController.init();
        }
        return this._popAnimationController;
    };
    return UISplitViewController;
}(UIViewController));
 
function MUIOutletRegister(owner, layerID, c) {
    owner._outlets[layerID] = c;
}
 
function MUIOutletQuery(owner, layerID) {
    return owner._outlets[layerID];
}
 
function MUIOutlet(owner, elementID, className, options) {
    //var layer = document.getElementById(elementID);
    var query = MUIOutletQuery(owner, elementID);
    if (query != null)
        return query;
    var layer = null;
    if (owner instanceof UIView)
        layer = MUICoreLayerSearchElementByID(owner.layer, elementID);
    else if (owner instanceof UIViewController)
        layer = MUICoreLayerSearchElementByID(owner.view[0].layer, elementID);
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
    MUIOutletRegister(owner, elementID, classInstance);
    if (owner instanceof UIView)
        owner._linkViewToSubview(classInstance);
    else if (owner instanceof UIViewController) {
        if (classInstance instanceof UIView) {
            owner.view[0]._linkViewToSubview(classInstance);
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
 
function MUIWindowSize() {
    var w = document.body.clientWidth;
    //var h = document.body.clientHeight;window.innerHeight
    var h = window.innerHeight;
    return new CGSize(w, h);
}
 
function _MUIShowViewController(fromVC, toVC, sourceVC, animated, target, completion) {
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();
    if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
        fromVC.viewWillDisappear();
        //fromVC._childControllersWillDisappear();
    }
    var view = null;
    var pc = toVC.presentationController[0];
    if (pc != null)
        view = pc.presentedView[0];
    else
        view = toVC.view[0];
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
    _MUIAnimationStart(layer, ac, animationContext, function () {
        _MUIAnimationDidStart(fromVC, toVC, pc, target, completion);
    });
}
 
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
 
function _MUIHideViewController(fromVC, toVC, sourceVC, target, completion) {
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
    var pc = fromVC.presentationController[0];
    if (pc != null)
        view = pc.presentedView[0];
    else
        view = fromVC.view[0];
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
    _MUIAnimationStart(layer, ac, animationContext, function () {
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
 
/**
 * Created by godshadow on 11/3/16.
 */
var UIWindow = /** @class */ (function (_super) {
    __extends(UIWindow, _super);
    function UIWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootViewController = _injectIntoOptional(null);
        _this._resizeWindow = false;
        return _this;
    }
    UIWindow.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayerAddStyle(this.layer, "window");
    };
    UIWindow.prototype.initWithRootViewController = function (vc) {
        this.init();
        this.rootViewController = _injectIntoOptional(vc);
        this.addSubview(vc.view[0]);
    };
    UIWindow.prototype.makeKey = function () {
        UIApplication.shared.makeKeyWindow(this);
    };
    UIWindow.prototype.makeKeyAndVisible = function () {
        this.makeKey();
        this.setHidden(false);
    };
    UIWindow.prototype.layoutSubviews = function () {
        if (this.rootViewController[0] != null)
            this.rootViewController[0].view[0].layoutSubviews();
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
        if (this.rootViewController[0].isPresented == true) {
            var pc = this.rootViewController[0].presentationController[0];
            if (pc instanceof UIPopoverPresentationController)
                this.rootViewController[0].dismissViewControllerAnimatedCompletion(true);
        }
    };
    return UIWindow;
}(UIView));
 
var UIStoryboard = /** @class */ (function (_super) {
    __extends(UIStoryboard, _super);
    function UIStoryboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = null;
        _this.bundle = null;
        _this.items = null;
        return _this;
    }
    UIStoryboard.prototype.initWithName = function (name, bundle) {
        _super.prototype.init.call(this);
        this.name = name;
        this.bundle = bundle;
        var content = MIOCoreBundleGetAppResource(this.name, "json");
        this.items = JSON.parse(content);
    };
    UIStoryboard.prototype.instantiateInitialViewController = function () {
        var resource = this.items["InitialViewControllerID"];
        if (resource == null)
            return;
        return this._instantiateViewControllerWithDestination(resource);
    };
    UIStoryboard.prototype.instantiateViewControllerWithIdentifier = function (identifier) {
        var resource = null; //TODO: Get from main.json
        return this._instantiateViewControllerWithDestination(resource);
    };
    UIStoryboard.prototype._instantiateViewControllerWithDestination = function (resource) {
        var classname = this.items["ClassByID"][resource];
        if (classname == null)
            return null;
        var vc = NSClassFromString(classname);
        vc.initWithResource("layout/" + resource + ".html");
        vc.storyboard = _injectIntoOptional(this);
        return vc;
    };
    return UIStoryboard;
}(NSObject));
 
function MUICoreStoryboardParseLayer(layer, object, owner) {
    // Check outlets and segues
    if (layer.childNodes.length > 0) {
        for (var index = 0; index < layer.childNodes.length; index++) {
            var subLayer = layer.childNodes[index];
            if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION")
                continue;
            if (subLayer.getAttribute("data-connections") == "true") {
                for (var index2 = 0; index2 < subLayer.childNodes.length; index2++) {
                    var d = subLayer.childNodes[index2];
                    if (d.tagName != "DIV")
                        continue;
                    var type = d.getAttribute("data-connection-type");
                    if (type == "outlet") {
                        var prop = d.getAttribute("data-property");
                        var outlet = d.getAttribute("data-outlet");
                        MUICoreStoryboardConnectOutlet(owner, prop, outlet);
                    }
                    else if (type == "segue") {
                        var destination = d.getAttribute("data-segue-destination");
                        var kind = d.getAttribute("data-segue-kind");
                        var relationship = d.getAttribute("data-segue-relationship");
                        var identifier = d.getAttribute("data-segue-identifier");
                        MUICoreStoryboardAddSegue(object, destination, kind, relationship, identifier);
                    }
                }
            }
            else if (subLayer.getAttribute("data-navigation-key") == "navigationItem") {
                owner.navigationItem = new UINavigationItem();
                owner.navigationItem.initWithLayer(subLayer, owner);
            }
        }
    }
}
 
function MUICoreStoryboardConnectOutlet(owner, property, outletID) {
    console.log("prop: " + property + " - outluet: " + outletID);
    var obj = owner._outlets[outletID];
    owner[property] = _injectIntoOptional(obj);
}
 
function MUICoreStoryboardAddSegue(owner, destination, kind, relationship, identifier) {
    var s = {};
    s["Destination"] = destination;
    s["Kind"] = kind;
    if (identifier != null)
        s["Identifier"] = identifier;
    if (relationship != null)
        s["Relationship"] = relationship;
    owner._segues.push(s);
}
 
var UIStoryboardSegue = /** @class */ (function (_super) {
    __extends(UIStoryboardSegue, _super);
    function UIStoryboardSegue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.identifier = _injectIntoOptional(null);
        _this.source = null;
        _this.destination = null;
        _this.performHandler = null;
        _this._sender = null;
        return _this;
    }
    UIStoryboardSegue.prototype.initWithIdentifier = function (identifier, source, destination) {
        _super.prototype.init.call(this);
        this.identifier = _injectIntoOptional(identifier);
        this.source = source = source;
        this.destination = destination;
    };
    UIStoryboardSegue.prototype.initIdentifierOptionalSourceUIViewControllerDestinationUIViewControllerPerformHandlerfunction_type = function (identifier, source, destination, performHandler) {
        this.initWithIdentifier(identifier[0], source, destination);
        this.performHandler = performHandler;
    };
    UIStoryboardSegue.prototype.perform = function () {
        var canPerfom = this.source.shouldPerformSegueWithIdentifierSender(this.identifier[0], _injectIntoOptional(this._sender));
        if (canPerfom == false)
            return;
        this.source.prepareForSegueSender(this, _injectIntoOptional(this._sender));
        if (this.performHandler != null)
            this.performHandler.call(this.source);
    };
    return UIStoryboardSegue;
}(NSObject));
 
var UIResponder = /** @class */ (function (_super) {
    __extends(UIResponder, _super);
    function UIResponder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIResponder;
}(NSObject));
 
/**
 * Created by godshadow on 11/3/16.
 */
var UIApplication = /** @class */ (function () {
    function UIApplication() {
        this.delegate = _injectIntoOptional(null);
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
        this.mainStoryboard = null;
        // addWindow(window:UIWindow){
        //     this._windows.push(window);
        // }
        this.windowZIndexOffset = 0;
        if (UIApplication._sharedInstance != null) {
            throw new Error("UIWebApplication: Instantiation failed: Use sharedInstance() instead of new.");
        }
    }
    Object.defineProperty(UIApplication, "shared", {
        get: function () {
            if (UIApplication._sharedInstance == null) {
                UIApplication._sharedInstance = new UIApplication();
            }
            return UIApplication._sharedInstance;
        },
        enumerable: true,
        configurable: true
    });
    //TODO: Set language in the webworker also.
    UIApplication.prototype.setLanguage = function (lang, target, completion) {
        var languages = MIOCoreGetLanguages();
        if (languages == null) {
            completion.call(target);
        }
        var url = languages[lang];
        if (url == null) {
            completion.call(target);
        }
        var request = NSURLRequest.requestWithURL(NSURL.urlWithString(url));
        var con = new NSURLConnection();
        con.initWithRequestBlock(request, this, function (code, data) {
            if (code == 200) {
                MIOCoreStringSetLocalizedStrings(JSON.parse(data.replace(/(\r\n|\n|\r)/gm, "")));
            }
            completion.call(target);
        });
    };
    // Get Languages from the app.plist
    UIApplication.prototype.downloadLanguages = function (config) {
        var langs = config["Languages"];
        if (langs == null) {
            this._run();
        }
        else {
            for (var key in langs) {
                var url = langs[key];
                MIOCoreAddLanguage(key, url);
            }
            var lang = MIOCoreGetPlatformLanguage();
            this.setLanguage(lang, this, function () {
                this._run();
            });
        }
    };
    UIApplication.prototype.run = function () {
        // Get App.plist
        MIOCoreBundleDownloadResource("app", "plist", this, function (data) {
            if (data == null)
                throw new Error("We couldn't download the app.plist");
            var config = PropertyListSerialization.propertyListWithData(data, 0, 0, null);
            var mainStoryBoardFile = "layout/" + config["UIMainStoryboardFile"];
            // Get Main story board
            if (mainStoryBoardFile != null) {
                MIOCoreBundleDownloadResource(mainStoryBoardFile, "json", this, function (data) {
                    this.mainStoryboard = new UIStoryboard();
                    this.mainStoryboard.initWithName(mainStoryBoardFile, null);
                    this.downloadLanguages(config);
                });
            }
            else {
                this.downloadLanguages(config);
            }
        });
    };
    UIApplication.prototype._run = function () {
        this.delegate[0].applicationDidFinishLaunchingWithOptions();
        this._mainWindow = this.delegate[0].window[0];
        if (this._mainWindow == null) {
            var vc = this.mainStoryboard.instantiateInitialViewController();
            this.delegate[0].window = _injectIntoOptional(new UIWindow());
            this.delegate[0].window[0].initWithRootViewController(vc);
            this._launchApp();
            // MUICoreBundleLoadNibName( this.initialResourceURLString, this, function(vc:UIViewController){
            //     this.delegate.window = new UIWindow();
            //     this.delegate.window.initWithRootViewController(vc);
            //     this._launchApp()
            // });
        }
        else
            this._launchApp();
    };
    UIApplication.prototype._launchApp = function () {
        this.delegate[0].window[0].makeKeyAndVisible();
        this.delegate[0].window[0].rootViewController[0].onLoadView(this, function () {
            this.delegate[0].window[0].rootViewController[0].viewWillAppear(false);
            this.delegate[0].window[0].rootViewController[0].viewDidAppear(false);
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
        var conn = new NSURLConnection();
        conn.initWithRequestBlock(NSURLRequest.requestWithURL(url), this, function (error, data) {
            if (data != null) {
                var json = JSON.parse(data.replace(/(\r\n|\n|\r)/gm, ""));
                MIOCoreStringSetLocalizedStrings(json);
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
        this.delegate[0].window[0].addSubview(this._popUpMenu);
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
        this.delegate[0].window[0].layoutSubviews();
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
 
/**
 * Created by godshadow on 11/3/16.
 */
var UIColor = /** @class */ (function (_super) {
    __extends(UIColor, _super);
    function UIColor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIColor.prototype.initDisplayP3RedCGFloatGreenCGFloatBlueCGFloatAlphaCGFloat = function (r, g, b, a) {
        var rS = r.toString(16);
        if (rS.length < 2)
            rS = '0' + rS;
        var gS = g.toString(16);
        if (gS.length < 2)
            gS = '0' + gS;
        var bS = b.toString(16);
        if (bS.length < 2)
            bS = '0' + bS;
        var aS = Math.floor(a * 255).toString(16);
        if (aS.length < 2)
            aS = '0' + aS;
        this.hex = rS + gS + bS + aS;
    };
    return UIColor;
}(NSObject));
 
//# sourceMappingURL=UIKit.web.js.map