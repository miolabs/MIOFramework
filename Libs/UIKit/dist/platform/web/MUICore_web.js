"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=MUICore_web.js.map