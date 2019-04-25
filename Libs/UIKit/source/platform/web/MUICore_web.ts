import { MIOCoreBundleGetMainURLString } from "mio-foundation-web"

// Declare main funciton so we can call after intizalization
declare function main(args);

window.onload = function(e) {
    
    let url = MIOCoreBundleGetMainURLString();
    console.log("Main URL: " + url);
    let args = url; // Todo get only the query string

    main(args);
};

// output errors to console log
window.onerror = function (e) {
    console.log("window.onerror ::" + JSON.stringify(e));
};

var _miocore_events_event_observers = {};

export function MIOCoreEventRegisterObserverForType(eventType:MIOCoreEventType, observer, completion)
{
    let item = {"Target" : observer, "Completion" : completion};

    let array = _miocore_events_event_observers[eventType];
    if (array == null)
    {
        array = [];
        _miocore_events_event_observers[eventType] = array;
    }

    array.push(item);
}

export function MIOCoreEventUnregisterObserverForType(eventType:MIOCoreEventType, observer)
{    
    let obs = _miocore_events_event_observers[eventType];
    if (obs == null) return;

    let index = -1;
    for (let count = 0; count < obs.length; count++){
    
        let item = obs[count];
        let target = item["Target"];        
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

function _MIOCoreEventSendToObservers(obs, event:MIOCoreEvent){

    if (obs != null)
    {
        for (let index = 0; index < obs.length; index++) {
            
            let o = obs[index];
            let target = o["Target"];
            let completion = o["Completion"];

            completion.call(target, event);
        }
    }        
}

/* 
    EVENTS
*/

// Keyboard events

window.addEventListener("keydown", function(e){
        
        // Create event
        let event = new MIOCoreKeyEvent();
        event.initWithKeyCode(MIOCoreEventType.KeyDown, e.keyCode, e);

        let observers = _miocore_events_event_observers[MIOCoreEventType.KeyDown];
        _MIOCoreEventSendToObservers(observers, event);
    },
false);

window.addEventListener('keyup', function(e){
        
        // Create event
        let event = new MIOCoreKeyEvent();
        event.initWithKeyCode(MIOCoreEventType.KeyUp, e.keyCode, e);

        let observers = _miocore_events_event_observers[MIOCoreEventType.KeyUp];
        _MIOCoreEventSendToObservers(observers, event);
    },
false);

// Mouse and touch events

window.addEventListener('mousedown', function(e){
        
        // Create event
        let event = new MIOCoreKeyEvent();
        event.initWithType(MIOCoreEventType.MouseDown, e);

        let observers = _miocore_events_event_observers[MIOCoreEventType.MouseDown];
        _MIOCoreEventSendToObservers(observers, event);        
    },
false);

window.addEventListener('mouseup', function(e){
        
        // Create event
        var event = new MIOCoreEventMouse();
        event.initWithType(MIOCoreEventType.MouseUp, e);

        let observers_mouseup = _miocore_events_event_observers[MIOCoreEventType.MouseUp];
        _MIOCoreEventSendToObservers(observers_mouseup, event);

        // Send click event
        let observers_click = _miocore_events_event_observers[MIOCoreEventType.Click];
        _MIOCoreEventSendToObservers(observers_click, event);
    },
false);

window.addEventListener('touchend', function(e:TouchEvent){
    
        // Create event
        let event = new MIOCoreEventTouch();
        event.initWithType(MIOCoreEventType.TouchEnd, e);

        let observers_touchend = _miocore_events_event_observers[MIOCoreEventType.TouchEnd];
        _MIOCoreEventSendToObservers(observers_touchend, event);

        // Send click event
        let observers_click = _miocore_events_event_observers[MIOCoreEventType.Click];
        _MIOCoreEventSendToObservers(observers_click, event);

}, false);

// UI events
window.addEventListener("resize", function(e) {
        
        let event = new MIOCoreEvent();
        event.initWithType(MIOCoreEventType.Resize, e);

        let observers = _miocore_events_event_observers[MIOCoreEventType.Resize];
        _MIOCoreEventSendToObservers(observers, event);

}, false);


