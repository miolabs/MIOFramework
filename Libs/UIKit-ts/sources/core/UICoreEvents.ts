
enum MUICoreEventKeyCode
{    
    Enter = 13,
    Escape = 27,
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowRight = 39,
    ArrowDown = 40
}

enum MUICoreEventType
{
    KeyUp,
    KeyDown,
    
    MouseUp,
    MouseDown,
    TouchStart,
    TouchEnd,
    Click,
    
    Resize
}

class MUICoreEvent
{
    coreEvent:Event;
    eventType = null;
    target = null;
    completion = null;

    initWithType(eventType:MUICoreEventType, coreEvent:Event) {

        this.coreEvent = coreEvent;
        this.eventType = eventType;
    }

    cancel(){        
        this.coreEvent.preventDefault();
    }
}

class MUICoreKeyEvent extends MUICoreEvent 
{
    keyCode = null;

    initWithKeyCode(eventType:MUICoreEventType,  eventKeyCode:MUICoreEventKeyCode, event:Event){

        super.initWithType(eventType, event);
        this.keyCode = eventKeyCode;
    }
}

class MUICoreEventInput extends MUICoreEvent
{
    target = null;
    x = 0;
    y = 0;
    deltaX = 0;
    deltaY = 0;
}

enum MUICoreEventMouseButtonType
{    
    None,
    Left,
    Right,
    Middle
}

class MUICoreEventMouse extends MUICoreEventInput
{
    button = MUICoreEventMouseButtonType.None;

    initWithType(eventType:MUICoreEventType, coreEvent:MouseEvent) {

        super.initWithType(eventType, event);
        //Get the button clicked
        this.button = MUICoreEventMouseButtonType.Left;
        this.target = coreEvent.target;
        this.x = coreEvent.clientX;
        this.y = coreEvent.clientY;
    }
}

// Declare changedTouches interface for typescript
// interface Event {
//     touches:TouchList;
//     targetTouches:TouchList;
//     changedTouches:TouchList;
// };

class MUICoreEventTouch extends MUICoreEventInput
{
    initWithType(eventType:MUICoreEventType, coreEvent:TouchEvent) {   
        super.initWithType(eventType, event);
        let touch = coreEvent.changedTouches[0] // reference first touch point for this event
        this.target = coreEvent.target;
        this.x = touch.clientX;
        this.y = touch.clientY;
    }
}

/* 
    EVENTS
*/

// Keyboard events

window.addEventListener("keydown", function(e){
        
    // Create event
    let event = new MUICoreKeyEvent();
    event.initWithKeyCode(MUICoreEventType.KeyDown, e.keyCode, e);

    let observers = _miocore_events_event_observers[MUICoreEventType.KeyDown];
    _MUICoreEventSendToObservers(observers, event);
},
false);

window.addEventListener('keyup', function(e){
    
    // Create event
    let event = new MUICoreKeyEvent();
    event.initWithKeyCode(MUICoreEventType.KeyUp, e.keyCode, e);

    let observers = _miocore_events_event_observers[MUICoreEventType.KeyUp];
    _MUICoreEventSendToObservers(observers, event);
},
false);

// Mouse and touch events

window.addEventListener('mousedown', function(e){
    
    // Create event
    let event = new MUICoreKeyEvent();
    event.initWithType(MUICoreEventType.MouseDown, e);

    let observers = _miocore_events_event_observers[MUICoreEventType.MouseDown];
    _MUICoreEventSendToObservers(observers, event);        
},
false);

window.addEventListener('mouseup', function(e){
    
    // Create event
    var event = new MUICoreEventMouse();
    event.initWithType(MUICoreEventType.MouseUp, e);

    let observers_mouseup = _miocore_events_event_observers[MUICoreEventType.MouseUp];
    _MUICoreEventSendToObservers(observers_mouseup, event);

    // Send click event
    let observers_click = _miocore_events_event_observers[MUICoreEventType.Click];
    _MUICoreEventSendToObservers(observers_click, event);
},
false);

window.addEventListener('touchend', function(e:TouchEvent){

    // Create event
    let event = new MUICoreEventTouch();
    event.initWithType(MUICoreEventType.TouchEnd, e);

    let observers_touchend = _miocore_events_event_observers[MUICoreEventType.TouchEnd];
    _MUICoreEventSendToObservers(observers_touchend, event);

    // Send click event
    let observers_click = _miocore_events_event_observers[MUICoreEventType.Click];
    _MUICoreEventSendToObservers(observers_click, event);

}, false);

// UI events
window.addEventListener("resize", function(e) {
    
    let event = new MUICoreEvent();
    event.initWithType(MUICoreEventType.Resize, e);

    let observers = _miocore_events_event_observers[MUICoreEventType.Resize];
    _MUICoreEventSendToObservers(observers, event);

}, false);


