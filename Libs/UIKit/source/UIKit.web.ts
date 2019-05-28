import { NSObject } from "mio-foundation-web";
import { MIOCoreBundleGetMainURLString } from "mio-foundation-web"
import { MIOCoreHTMLParser } from "mio-foundation-web";
import { MIOCoreHTMLParserDelegate } from "mio-foundation-web";
import { NSLocalizeString } from "mio-foundation-web";
import { MIOCoreBundleGetContentsFromURLString } from "mio-foundation-web";
import { NSClassFromString } from "mio-foundation-web";
import { NSPoint } from "mio-foundation-web";
import { NSRect } from "mio-foundation-web";
import "mio-foundation-web/extensions"
import { NSFormatter } from "mio-foundation-web";
import { NSSize } from "mio-foundation-web";
import { MIOCoreIsPhone } from "mio-foundation-web";
import { NSBundle } from "mio-foundation-web";
import { NSCoder } from "mio-foundation-web";
import { MIOCoreIsMobile } from "mio-foundation-web";
import { NSTimer } from "mio-foundation-web";
import { NSLog } from "mio-foundation-web";
import { MIOCoreBundleGetAppResource } from "mio-foundation-web";
import { NSURLRequest } from "mio-foundation-web";
import { MIOCoreBundleDownloadResource } from "mio-foundation-web";
import { NSURLConnection } from "mio-foundation-web";
import { NSPropertyListSerialization } from "mio-foundation-web";
import { NSURL } from "mio-foundation-web";
import { MIOCoreGetLanguages } from "mio-foundation-web";
import { MIOCoreAddLanguage } from "mio-foundation-web";
import { MIOCoreGetPlatformLanguage } from "mio-foundation-web";
import { MIOCoreStringSetLocalizedStrings } from "mio-foundation-web";

export var _MUICoreLayerIDCount = 0;

export function MUICoreLayerIDFromObject(object): string {

    var classname = object.constructor.name.substring(3);
    return MUICoreLayerIDFromClassname(classname);
}

export function MUICoreLayerIDFromClassname(classname:string): string {

    var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    var random = "";
    for (var count = 0; count < 4; count++) {
        var randomNumber = Math.floor(Math.random() * 16);
        var randomDigit = digits[randomNumber];
        random += randomDigit;
    }

    var layerID = classname.toLowerCase() + "_" + random;
    _MUICoreLayerIDCount++;

    return layerID;
}

export function MUICoreLayerCreate(layerID?) {
    var layer = document.createElement("DIV");
    if (layerID != null)
        layer.setAttribute("id", layerID);

    //layer.style.position = "absolute";

    return layer;
}

export function MUICoreLayerAddSublayer(layer, subLayer){    
    layer.appendChild(subLayer);
}

export function MUICoreLayerRemoveSublayer(layer, subLayer){    
    layer.removeChild(subLayer);
}

export function MUICoreLayerCreateWithStyle(style, layerID?) {
    var layer = MUICoreLayerCreate(layerID);
    MUICoreLayerAddStyle(layer, style);

    return layer;
}

export function MUICoreLayerAddStyle(layer, style) {
    layer.classList.add(style);
}

export function MUICoreLayerRemoveStyle(layer, style) {
    layer.classList.remove(style);
}

export function MUICoreLayerSearchElementByAttribute(layer, key)
{
    if (layer.tagName != "DIV" && layer.tagName != "INPUT" && layer.tagName != "SECTION")
            return null;

    if (layer.getAttribute(key) == "true") return layer;
    
    let elementFound = null;

    for (let count = 0; count < layer.childNodes.length; count++){
        let l = layer.childNodes[count];
        elementFound = MUICoreLayerSearchElementByAttribute(l, key);
        if (elementFound != null) return elementFound;
    }

    return null;
}



export function MUICoreLayerSearchElementByID(layer, elementID)
{
    if (layer.tagName != "DIV" && layer.tagName != "INPUT" && layer.tagName != "SECTION")
            return null;

    if (layer.getAttribute("data-outlet") == elementID)
        return layer;
    
    // Deprecated. For old code we still mantein
    if (layer.getAttribute("id") == elementID)
        return layer;

    let elementFound = null;

    for (let count = 0; count < layer.childNodes.length; count++){
        let l = layer.childNodes[count];
        elementFound = MUICoreLayerSearchElementByID(l, elementID);
        if (elementFound != null)
            return elementFound;

    }

    return null;
}

export function MUICoreLayerGetFirstElementWithTag(layer, tag)
{
    let foundLayer = null;

    if (layer.childNodes.length > 0) {
        let index = 0;
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

export enum MUIAnimationType
{
    None,
    BeginSheet,
    EndSheet,
    Push,
    Pop,
    FlipLeft,
    FlipRight,
    FadeIn,
    FadeOut,
    LightSpeedIn,
    LightSpeedOut,
    Hinge,
    SlideInUp,
    SlideOutDown,
    SlideInRight,
    SlideOutRight,
    SlideInLeft,
    SlideOutLeft,
    HorizontalOutFlip,
    HorizontalInFlip,   
    ZoomIn,
    ZoomOut 
}

export interface UIViewControllerAnimatedTransitioning extends NSObject
{    
    animationControllerForPresentedController();
}


export interface UIViewControllerAnimatedTransitioning extends NSObject
{    
    transitionDuration(transitionContext):number;
    animateTransition(transitionContext):void;
    animationEnded(transitionCompleted):void;
    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext);
}

// ANIMATION TYPES
export function MUIClassListForAnimationType(type)
{
    var array = [];
    array.push("animated");

    switch (type)
    {
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

export function _MUIAddAnimations(layer, animations)
{
    let w = layer.offsetWidth;
    for (var index = 0; index < animations.length; index++)
        layer.classList.add(animations[index]);
    w++;
}

export function _MUIRemoveAnimations(layer, animations)
{
    for (var index = 0; index < animations.length; index++)
        layer.classList.remove(animations[index]);
}

export function _MUIAnimationStart(layer, animationController, animationContext, target?, completion?)
{
    if (animationController == null)
    {
        if (target != null && completion != null)
                completion.call(target);        
        return;
    }

    let duration = animationController.transitionDuration(animationContext);
    let animations = animationController.animations(animationContext);

    animationController.animateTransition(animationContext);

    if (duration == 0 || animations == null)
    {
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

export function _UIAnimationDidFinish(event)
{
    let animationController = event.target.animationParams["animationController"];
    let animations = event.target.animationParams["animations"];
    let target = event.target.animationParams["target"];
    let completion = event.target.animationParams["completion"];
    let layer = event.target;

    _MUIRemoveAnimations(layer, animations);
    layer.removeEventListener("animationend", _UIAnimationDidFinish);
    animationController.animationEnded(true);

    if (target != null && completion != null)
        completion.call(target);
}



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

export function MUICoreEventRegisterObserverForType(eventType:MUICoreEventType, observer, completion)
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

export function MUICoreEventUnregisterObserverForType(eventType:MUICoreEventType, observer)
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

function _MUICoreEventSendToObservers(obs, event:MUICoreEvent){

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











var _MIOCoreBundleClassesByDestination = {}
export function MUICoreBundleSetClassesByDestination(classes){
    _MIOCoreBundleClassesByDestination = classes;
}

export function MUICoreBundleGetClassesByDestination(resource:string){    
    return _MIOCoreBundleClassesByDestination[resource];
}

export function MUICoreBundleLoadNibName(name:string, target:any, completion:any){

    let parser = new MUICoreNibParser();
    parser.target = target;
    parser.completion = completion;                   

    MIOCoreBundleGetContentsFromURLString(name, this, function(code, data){
        if (code == 200) parser.parseString(data);
        else throw new Error("MUICoreBundleLoadNibName: Couldn't download resource " + name);
    });    
}

class MUICoreNibParser extends NSObject implements MIOCoreHTMLParserDelegate
{
    target = null;
    completion = null;    
    owner = null;  

    private result = "";
    private isCapturing = false;    
    private elementCapturingCount = 0;

    private layerID = null;
    private rootClassname = null;

    parseString(data:string){
        let parser = new MIOCoreHTMLParser();
        parser.initWithString(data, this);

        parser.parse();

        let domParser = new DOMParser();
        let items = domParser.parseFromString(this.result, "text/html");
        let layer = items.getElementById(this.layerID);

        this.completion.call(this.target, layer);
    }

    parserDidStartDocument(parser:MIOCoreHTMLParser){
        console.log("parser started");
    }

    // HTML Parser delegate
    parserDidStartElement(parser:MIOCoreHTMLParser, element:string, attributes){
        
        if (element.toLocaleLowerCase() == "div"){
            
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
    }

    private currentString = null;
    private currentStringLocalizedKey = null;
    parserFoundCharacters(parser:MIOCoreHTMLParser, characters:string){
        if (this.isCapturing == true) {
            if (this.currentString == null) {
                this.currentString = characters;
            }
            else 
                this.currentString += " " + characters;
            
            //this.result += " " + characters;
        }
    }

    parserFoundComment(parser:MIOCoreHTMLParser, comment:string) {
        if (this.isCapturing == true) {
            this.result += "<!-- " + comment + "-->";
        }
    }

    parserDidEndElement(parser:MIOCoreHTMLParser, element:string){        

        if (this.isCapturing == true) {            
                this.closeTag(element);                
                this.elementCapturingCount--;            
        }

        if (this.elementCapturingCount == 0) this.isCapturing = false;

        this.currentString = null;        
    }

    parserDidEndDocument(parser:MIOCoreHTMLParser){
        console.log("html parser finished");
        console.log(this.result);        
    }

    private openTag(element, attributes){

        this.translateCharacters();

        this.result += "<" + element;        

        for (let key in attributes){            
            let value = attributes[key];
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
    }

    private closeTag(element){
        this.translateCharacters();
        this.result += "</" + element + ">";        
    }

    private translateCharacters(){
        if (this.currentString != null) {
            if (this.currentStringLocalizedKey == null) {
                this.result += this.currentString;
            }else {
                this.result += NSLocalizeString(this.currentStringLocalizedKey, this.currentString);
            }
        }
        this.currentString = null;
        this.currentStringLocalizedKey = null;        
    }

}

export enum MUICoreEventKeyCode
{    
    Enter = 13,
    Escape = 27,
    ArrowLeft = 37,
    ArrowUp = 38,
    ArrowRight = 39,
    ArrowDown = 40
}

export enum MUICoreEventType
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

export class MUICoreEvent
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

export class MUICoreKeyEvent extends MUICoreEvent 
{
    keyCode = null;

    initWithKeyCode(eventType:MUICoreEventType,  eventKeyCode:MUICoreEventKeyCode, event:Event){

        super.initWithType(eventType, event);
        this.keyCode = eventKeyCode;
    }
}

export class MUICoreEventInput extends MUICoreEvent
{
    target = null;
    x = 0;
    y = 0;
    deltaX = 0;
    deltaY = 0;
}

export enum MUICoreEventMouseButtonType{
    
    None,
    Left,
    Right,
    Middle
}

export class MUICoreEventMouse extends MUICoreEventInput
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

export class MUICoreEventTouch extends MUICoreEventInput
{
    initWithType(eventType:MUICoreEventType, coreEvent:TouchEvent) {   
        super.initWithType(eventType, event);
        let touch = coreEvent.changedTouches[0] // reference first touch point for this event
        this.target = coreEvent.target;
        this.x = touch.clientX;
        this.y = touch.clientY;
    }
}



export class UIEvent extends NSObject
{
    static eventWithSysEvent(sysEvent){
        let ev = new UIEvent();
        ev.initWithSysEvent(sysEvent);
        return ev;
    }

    x = 0;
    y = 0;
    initWithSysEvent(e){
        super.init();

        this.x = e.clientX;
        this.y = e.clientY;
    }
}



export enum UIGestureRecognizerState {
    Possible,
    Began,
    Changed,
    Ended,
    Cancelled,
    Failed,
    Recognized
}

export class UIGestureRecognizer extends NSObject
{
    delegate = null;

    set view(v:UIView){this.setView(v);}
    get view(){ return this._view;}
    
    set state(value:UIGestureRecognizerState) {this.setState(value);}
    get state() {return this._state;}
    isEnabled = true;

    name:string = null;
    
    private target = null;
    private block = null;
    initWithTarget(target, block){
        super.init();

        this.target = target;
        this.block = block;
    }

    private _view:UIView = null;        
    setView(view:UIView){                
        this._view = view;
    }
    
    private _state:UIGestureRecognizerState = UIGestureRecognizerState.Possible;
    private setState(state:UIGestureRecognizerState){
        if (this.isEnabled == false) return;
        if (this._state == state && state != UIGestureRecognizerState.Changed) return;
        this._state = state;
        this.block.call(this.target, this);
    }
    
    
    touchesBeganWithEvent(touches, ev:UIEvent){
        this.state = UIGestureRecognizerState.Began;
    }    

    touchesMovedWithEvent(touches, ev:UIEvent){
        this.state = UIGestureRecognizerState.Changed;
    }

    touchesEndedWithEvent(touches, ev:UIEvent){
        this.state = UIGestureRecognizerState.Ended;
    }

    reset(){
        this.state = UIGestureRecognizerState.Possible;
    }

    // To call from UIView. Only for internal use
    _viewTouchesBeganWithEvent(touches, ev:UIEvent){
        this.reset();
        this.touchesBeganWithEvent(touches, ev);
    }

    _viewTouchesMovedWithEvent(touches, ev:UIEvent){
        this.touchesMovedWithEvent(touches, ev);
    }

    _viewTouchesEndedWithEvent(touches, ev:UIEvent){
        this.touchesEndedWithEvent(touches, ev);
    }

}



export class UITapGestureRecognizer extends UIGestureRecognizer
{
    numberOfTapsRequired = 1;
    
    touchesBeganWithEvent(touches, ev:UIEvent){
        super.touchesBeganWithEvent(touches, ev);
        this.state = UIGestureRecognizerState.Began;
    }

    touchesEndedWithEvent(touches, ev:UIEvent){
        super.touchesEndedWithEvent(touches, ev);
        this.state = UIGestureRecognizerState.Ended;
    }

}





export class UIPanGestureRecognizer extends UIGestureRecognizer
{
    minimumNumberOfTouches = 1;
    maximumNumberOfTouches = 0;
    
    private initialX = null;
    private initialY = null;

    private touchDown = false;
    touchesBeganWithEvent(touches, ev:UIEvent){        
        this.initialX = ev.x;
        this.initialY = ev.y;
        this.touchDown = true;
    }

    touchesEndedWithEvent(touches, ev:UIEvent){
        super.touchesEndedWithEvent(touches, ev);
        this.initialX = null;
        this.initialY = null;
        this.hasStarted = false;
        this.touchDown = false;
    }

    private hasStarted = false;
    touchesMovedWithEvent(touches, ev:UIEvent){
        if (this.touchDown == false) return;
        if (this.hasStarted == false) this.state = UIGestureRecognizerState.Began;

        this.hasStarted = true;
        this.deltaX = this.initialX - ev.x;
        this.deltaY = this.initialY - ev.y;

        this.state = UIGestureRecognizerState.Changed;
    }

    private deltaX = 0;
    private deltaY = 0;
    translationInView(view:UIView):NSPoint {
        return new NSPoint(this.deltaX, this.deltaY);
    }

}















/**
 * Created by godshadow on 11/3/16.
 */


function MUICoreViewSearchViewTag(view, tag) {
    if (view.tag == tag) return view;

    for (let index = 0; index < view.subviews.length; index++) {
        let v: UIView = view.subviews[index];
        v = MUICoreViewSearchViewTag(v, tag);
        if (v != null) return v;
    }

    return null;
}

export class UIView extends NSObject {
    layerID = null;
    layer = null;
    layerOptions = null;
    alpha = 1;
    tag: number = 0;
    owner = null;

    private _parent: UIView = null;
    set parent(view) { this.setParent(view); }
    get parent(): UIView { return this._parent; }


    protected _viewIsVisible = false;
    protected _needDisplay = true;
    _isLayerInDOM = false;

    protected _subviews = [];
    get subviews() {
        return this._subviews;
    }

    _window: UIWindow = null;

    _outlets = {};
    _segues = [];

    _checkSegues() {
    }

    constructor(layerID?) {
        super();
        this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(this);
    }

    init() {
        this.layer = MUICoreLayerCreate(this.layerID);
        //UICoreLayerAddStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "view");
        //this.layer.style.position = "absolute";
        // this.layer.style.top = "0px";
        // this.layer.style.left = "0px";
        //this.layer.style.width = "100%";
        //this.layer.style.height = "100%";
        //this.layer.style.background = "rgb(255, 255, 255)";                
    }

    initWithFrame(frame: NSRect) {
        this.layer = MUICoreLayerCreate(this.layerID);
        this.layer.style.position = "absolute";
        this.setX(frame.origin.x);
        this.setY(frame.origin.y);
        this.setWidth(frame.size.width);
        this.setHeight(frame.size.height);
    }

    initWithLayer(layer, owner, options?) {
        this.layer = layer;
        this.layerOptions = options;
        this.owner = owner;

        let layerID = this.layer.getAttribute("id");
        if (layerID != null) this.layerID = layerID;

        let tag = this.layer.getAttribute("data-tag");
        this.tag = tag || 0;

        this._addLayerToDOM();

        // Add subviews
        if (this.layer.childNodes.length > 0) {
            for (let index = 0; index < this.layer.childNodes.length; index++) {
                let subLayer = this.layer.childNodes[index];

                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

                let className = subLayer.getAttribute("data-class");
                if (className == null || className.length == 0) className = "UIView";

                let sv = NSClassFromString(className);
                sv.initWithLayer(subLayer, owner);
                sv._checkSegues();
                this._linkViewToSubview(sv);

                let id = subLayer.getAttribute("id");
                if (id != null) owner._outlets[id] = sv;
            }
        }

        MUICoreStoryboardParseLayer(layer, this, owner);
    }

    copy() {
        let objLayer = this.layer.cloneNode(true);

        let className = this.getClassName();
        if (className == null) throw Error("UIView:copy: Error classname is null");

        let view = NSClassFromString(className);
        view.initWithLayer(objLayer, null);

        return view;
    }

    awakeFromHTML() { }

    setParent(view: UIView) {
        this.willChangeValue("parent");
        this._parent = view;
        this.didChangeValue("parent");
    }

    addSubLayer(layer) {
        this.layer.innerHTML = layer.innerHTML;
    }

    _linkViewToSubview(view) {
        if ((view instanceof UIView) == false) throw new Error("_linkViewToSubview: Trying to add an object that is not a view");

        this.subviews.push(view);
    }

    addSubview(view, index?) {
        if ((view instanceof UIView) == false) throw new Error("addSubview: Trying to add an object that is not a view");

        view.setParent(this);

        if (index == null)
            this.subviews.push(view);
        else
            this.subviews.splice(index, 0, view);

        view._addLayerToDOM(index);
        view.setNeedsDisplay();
    }

    insertSubviewAboveSubview(view: UIView, siblingSubview: UIView) {
        view.setParent(this);
        let index = this.subviews.indexOf(siblingSubview);
        this.subviews.splice(index, 0, view);
        this.addLayerBeforeLayer(view.layer, siblingSubview.layer);
        view.setNeedsDisplay();
    }

    private addLayerBeforeLayer(newLayer, layer) {
        if (newLayer._isLayerInDOM == true) return;
        if (layer == null || newLayer == null) return;
        this.layer.insertBefore(newLayer, layer);
        newLayer._isLayerInDOM = true;
    }

    protected _addLayerToDOM(index?) {
        if (this._isLayerInDOM == true)
            return;

        if (this.layer == null || this.parent == null)
            return;

        if (index == null)
            this.parent.layer.appendChild(this.layer);
        else
            this.parent.layer.insertBefore(this.layer, this.parent.layer.children[0])

        this._isLayerInDOM = true;
    }

    removeFromSuperview() {
        if (this.parent == null) return;

        let subviews = this.parent._subviews;
        var index = subviews.indexOf(this);
        subviews.splice(index, 1);

        if (this._isLayerInDOM == false) return;

        this.parent.layer.removeChild(this.layer);
        this._isLayerInDOM = false;
    }

    protected _removeLayerFromDOM() {
        if (this._isLayerInDOM == false)
            return;

        this.layer.removeChild(this.layer);
        this._isLayerInDOM = false;
    }

    private _removeAllSubviews() {

        var node = this.layer;

        while (this.layer.hasChildNodes()) {              // selected elem has children

            if (node.hasChildNodes()) {                // current node has children
                node = node.lastChild;                 // set current node to child
            }
            else {                                     // last child found
                node = node.parentNode;                // set node to parent
                node.removeChild(node.lastChild);      // remove last node
            }
        }
    }

    setViewIsVisible(value: boolean) {

        this._viewIsVisible = true;
        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            v.setViewIsVisible(value);
        }
    }

    viewWithTag(tag): UIView {
        // TODO: Use also the view tag component
        let view = MUICoreViewSearchViewTag(this, tag);
        return view;
    }

    layoutSubviews() {

        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            if ((v instanceof UIView) == false) throw new Error("layout: Trying to layout an object that is not a view");
            v.setNeedsDisplay();
        }
    }

    setNeedsDisplay() {
        this._needDisplay = true;

        if (this._viewIsVisible == false) return;
        if (this.hidden == true) return;

        this._needDisplay = false;
        this.layoutSubviews();

        for (var index = 0; index < this.subviews.length; index++) {
            let v = this.subviews[index];
            if (!(v instanceof UIView)) {
                console.log("ERROR: trying to call setNeedsDisplay: in object that it's not a view");
            }
            else
                v.setNeedsDisplay();
        }
    }

    layerWithItemID(itemID) {
        return MUICoreLayerSearchElementByID(this.layer, itemID);
    }

    private _hidden: boolean = false;
    setHidden(hidden: boolean) {
        this._hidden = hidden;

        if (this.layer == null)
            return;

        if (hidden)
            this.layer.style.display = "none";
        else
            this.layer.style.display = "";
    }

    get hidden(): boolean {
        return this._hidden;
    }

    set hidden(value: boolean) {
        this.setHidden(value);
    }

    setBackgroundColor(color) {
        this.layer.style.backgroundColor = "#" + color;
    }

    setBackgroundRGBColor(r, g, b, a?) {
        if (a == null) {
            let value = "rgb(" + r + ", " + g + ", " + b + ")";
            this.layer.style.backgroundColor = value;
        }
        else {
            let value = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
            this.layer.style.backgroundColor = value;
        }
    }

    getBackgroundColor() {
        var cs = document.defaultView.getComputedStyle(this.layer, null);
        var bg = cs.getPropertyValue('background-color');

        return bg;
    }

    setAlpha(alpha) {
        this.willChangeValue("alpha");
        this.alpha = alpha;
        this.didChangeValue("alpha");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "opacity", "EndValue": alpha };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.opacity = alpha;
        }
    }

    private x = 0;
    setX(x) {
        this.willChangeValue("frame");
        this.x = x;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "left", "EndValue": x + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.left = x + "px";
        }
    }

    getX() {
        let x = this._getIntValueFromCSSProperty("left");
        return x;
    }

    private y = 0;
    setY(y) {
        this.willChangeValue("frame");
        this.y = y;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "top", "EndValue": y + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.top = y + "px";
        }
    }

    getY() {
        let y = this._getIntValueFromCSSProperty("top");
        return y;
    }

    private width = 0;
    setWidth(w) {
        this.willChangeValue("frame");
        this.width = w;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "width", "EndValue": w + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.width = w + "px";
        }
    }

    getWidth() {
        let w1 = this.layer.clientWidth;
        let w2 = this._getIntValueFromCSSProperty("width");
        let w = Math.max(w1, w2);
        if (isNaN(w)) w = 0;
        return w;
    }

    private height = 0;
    setHeight(height) {
        this.willChangeValue("height");
        this.height = height;
        this.didChangeValue("height");

        if (UIView.animationsChanges != null) {
            let animation = { "View": this, "Key": "height", "EndValue": height + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.height = height + "px";
        }
    }

    getHeight() {
        let h = this.height;
        if (h == 0) h = this.layer.clientHeight;
        else {
            if (h == 0) h = this.layer.height;
            else if (h == 0) h = this._getIntValueFromCSSProperty("height");
        }
        return h;
    }

    setFrameComponents(x, y, w, h) {
        this.setX(x);
        this.setY(y);
        this.setWidth(w);
        this.setHeight(h);
    }

    setFrame(frame) {
        this.willChangeValue("frame");
        this.setFrameComponents(frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
        this.didChangeValue("frame");
    }

    get frame() {
        return NSRect.rectWithValues(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    public get bounds() {
        return NSRect.rectWithValues(0, 0, this.getWidth(), this.getHeight());
    }

    //
    // CSS Subsystem
    //

    protected _getValueFromCSSProperty(property) {
        var v = window.getComputedStyle(this.layer, null).getPropertyValue(property);
        return v;
    }

    protected _getIntValueFromCSSProperty(property) {
        var v = this._getValueFromCSSProperty(property);
        var r = v.hasSuffix("px");
        if (r == true) v = v.substring(0, v.length - 2);
        else {
            var r2 = v.hasSuffix("%");
            if (r2 == true) v = v.substring(0, v.length - 1);
        }

        return parseInt(v);
    }

    private _userInteraction = false;
    set userInteraction(value) {
        if (value == this._userInteraction) return;

        if (value == true) {
            this.layer.addEventListener("mousedown", this.mouseDownEvent.bind(this));
            this.layer.addEventListener("mouseup", this.mouseUpEvent.bind(this));
        }
        else {
            this.layer.removeEventListener("mousedown", this.mouseDownEvent);
            this.layer.removeEventListener("mouseup", this.mouseUpEvent);
        }
    }

    private isMouseDown = false;
    private mouseDownEvent(ev) {
        let e = UIEvent.eventWithSysEvent(ev);
        this.touchesBeganWithEvent(null, e);
        this.isMouseDown = true;
        window.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
        ev.preventDefault(); // Prevent selection
    }

    private mouseUpEvent(ev) {
        this.isMouseDown = false;
        let e = UIEvent.eventWithSysEvent(ev);
        this.touchesEndedWithEvent(null, e);
    }

    private mouseMoveEvent(ev) {
        if (this.isMouseDown == false) return;
        if (ev.buttons == 0) {
            window.removeEventListener("mousemove", this.mouseMoveEvent);
            this.isMouseDown = false;
            let e = UIEvent.eventWithSysEvent(ev);
            this.touchesEndedWithEvent(null, e);
        }
        else {
            let e = UIEvent.eventWithSysEvent(ev);
            this.touchesMovedWithEvent(null, e);
        }
    }

    touchesBeganWithEvent(touches, ev: UIEvent) {
        for (let index = 0; index < this.gestureRecognizers.length; index++) {
            let gr: UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesBeganWithEvent(touches, ev);
        }
    }

    touchesMovedWithEvent(touches, ev: UIEvent) {
        for (let index = 0; index < this.gestureRecognizers.length; index++) {
            let gr: UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesMovedWithEvent(touches, ev);
        }
    }

    touchesEndedWithEvent(touches, ev: UIEvent) {
        for (let index = 0; index < this.gestureRecognizers.length; index++) {
            let gr: UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesEndedWithEvent(touches, ev);
        }
    }

    private gestureRecognizers = [];
    addGestureRecognizer(gesture: UIGestureRecognizer) {
        if (this.gestureRecognizers.containsObject(gesture)) return;

        gesture.view = this;
        this.gestureRecognizers.addObject(gesture);
        this.userInteraction = true;
    }

    removeGestureRecognizer(gesture: UIGestureRecognizer) {
        gesture.view = null;
        this.gestureRecognizers.removeObject(gesture);
    }

    //
    // Animations
    //

    private static animationsChanges = null;
    private static animationsViews = null;
    private static animationTarget = null;
    private static animationCompletion = null;
    static animateWithDuration(duration: number, target, animations, completion?) {
        UIView.animationsChanges = [];
        UIView.animationsViews = [];
        UIView.animationTarget = target;
        UIView.animationCompletion = completion;
        animations.call(target);

        for (let index = 0; index < UIView.animationsChanges.length; index++) {
            let anim = UIView.animationsChanges[index];
            let view = anim["View"];
            let key = anim["Key"];
            let value = anim["EndValue"];

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
    }

    private static addTrackingAnimationView(view: UIView) {
        let index = UIView.animationsViews.indexOf(view);
        if (index > -1) return;
        UIView.animationsViews.addObject(view);
        view.layer.animationParams = { "View": view };
        view.layer.addEventListener("webkitTransitionEnd", UIView.animationDidFinish);
    }

    private static removeTrackingAnimationView(view: UIView) {
        let index = UIView.animationsViews.indexOf(view);
        if (index == -1) return;
        UIView.animationsViews.removeObject(view);
        view.layer.removeEventListener("webkitTransitionEnd", UIView.animationDidFinish);
        view.layer.style.transition = "none";
        view.setNeedsDisplay();
    }

    private static animationDidFinish(event) {
        let view = event.target.animationParams["View"];
        UIView.removeTrackingAnimationView(view);
        if (UIView.animationsViews.length > 0) return;
        UIView.animationsChanges = null;
        UIView.animationsViews = null;
        if (UIView.animationTarget != null && UIView.animationCompletion != null) UIView.animationCompletion.call(UIView.animationTarget);
        UIView.animationTarget = null;
        UIView.animationCompletion = null;
    }

}







/**
 * Created by godshadow on 11/3/16.
 */


export class UILabel extends UIView
{
    private _textLayer = null;
    autoAdjustFontSize = "none";
    autoAdjustFontSizeValue = 4;

    init(){
        super.init();
        MUICoreLayerAddStyle(this.layer, "label");
        this.setupLayers();
    }

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);
        this._textLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "SPAN");
        this.setupLayers();
    }

    private setupLayers(){
        //UICoreLayerAddStyle(this.layer, "lbl");
    
        if (this._textLayer == null){
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
    }

    setText(text){
        this.text = text;
    }
    
    get text(){
        return this._textLayer.innerHTML;
    }

    set text(text){
        this._textLayer.innerHTML = text != null ? text : "";
    }

    setTextAlignment(alignment){
        this.layer.style.textAlign = alignment;
    }

    setHightlighted(value){
        if (value == true){
            this._textLayer.classList.add("label_highlighted_color");
        }
        else{
            this._textLayer.classList.remove("label_highlighted_color");
        }
    }

    setTextRGBColor(r, g, b){
        var value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._textLayer.style.color = value;
    }

    setFontSize(size){
        this._textLayer.style.fontSize = size + "px";
    }

    setFontStyle(style){
        this._textLayer.style.fontWeight = style;
    }

    setFontFamily(fontFamily){
        this._textLayer.style.fontFamily = fontFamily;
    }
}






/**
 * Created by godshadow on 12/3/16.
 */

 export enum UIControlEvents
 {
     TouchDown = 1 <<  0,
     TouchDownRepeat = 1 <<  1,
     TouchDragInside = 1 <<  2,
     TouchDragOutside = 1 <<  3,
     TouchDragEnter = 1 <<  4,
     TouchDragExit = 1 <<  5,
     TouchUpInside = 1 <<  6,
     TouchUpOutside = 1 <<  7,
     TouchCancel = 1 <<  8,
     ValueChanged = 1 << 12,
     PrimaryActionTriggered = 1 << 13,
     EditingDidBegin = 1 << 16,
     EditingChanged = 1 << 17,
     EditingDidEnd = 1 << 18,
     EditingDidEndOnExit = 1 << 19,
     AllTouchEvents = 0x00000FFF,
     EditingEvents = 0x000F0000,
     ApplicationReserved = 0x0F000000,
     SystemReserved = 0xF0000000,
     AllEvents = 0xFFFFFFFF
 }

export class UIControl extends UIView
{

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);
    
        // Check for actions
        if (this.layer.childNodes.length > 0) {
            for (let index = 0; index < this.layer.childNodes.length; index++) {
                let subLayer = this.layer.childNodes[index];

                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

                let actionSelector = subLayer.getAttribute("data-action-selector");
                if (actionSelector != null) {                    
                    this.addTarget(this, function(){
                        owner[actionSelector](this);
                    }, UIControlEvents.AllEvents);
                    break;                    
                }
            }
        }
    }

    private actionSegue = null;
    _checkSegues() {
        super._checkSegues();

        for (let index = 0; index < this._segues.length; index++) {

            let s = this._segues[index];
            let kind = s["Kind"];
            
            if (kind == "show") {
                if ((this.owner instanceof UIViewController) == false) continue;
                
                this.actionSegue = {};
                this.actionSegue["VC"] = this.owner;
                this.actionSegue["Destination"] = s["Destination"];
                let identifier = s["Identifier"];
                if (identifier != null) this.actionSegue["Identifier"] = identifier;
                
                this.addTarget(this, function(){

                    let fromVC = this.actionSegue["VC"] as UIViewController;
                    let destination = this.actionSegue["Destination"];                    
                    let identifier = this.actionSegue["Identifier"];

                    let toVC = fromVC.storyboard._instantiateViewControllerWithDestination(destination);

                    let segue = new UIStoryboardSegue();                
                    segue.initWithIdentifierAndPerformHandler(identifier, fromVC, toVC, function(){
                        fromVC.navigationController.pushViewController(toVC);
                    });           
                    
                    segue._sender = this;
                    segue.perform();

                }, UIControlEvents.AllEvents);                
            }    
        }        
    }

    target = null;
    action = null;
    addTarget(target, action, controlEvents:UIControlEvents){
        this.target = target;
        this.action = action;
    }

    private _enabled = true;
    get enabled(){return this._enabled;}
    set enabled(value:boolean){this.setEnabled(value);}

    setEnabled(enabled:boolean){
        this._enabled = enabled;
        if (enabled == true)
            this.layer.style.opacity = "1.0";
        else
            this.layer.style.opacity = "0.10";
    }

    private _selected = false;
    set selected(value){
        this.setSelected(value);
    }

    get selected(){
        return this._selected;
    }
    
    setSelected(value){
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
    }

     // TODO: Make delegation of the methods above
     mouseOverTarget = null;
     mouseOverAction = null;
     mouseOutTarget = null;
     mouseOutAction = null;
 
    setOnMouseOverAction(target, action){
         this.mouseOverTarget = target;
         this.mouseOverAction = action;
         var instance = this;

         this.layer.onmouseover = function()
         {
             if (instance.enabled)
                 instance.mouseOverAction.call(target);
         }
    }

    setOnMouseOutAction(target, action){
         this.mouseOutTarget = target;
         this.mouseOutAction = action;
         var instance = this;

         this.layer.onmouseout = function()
         {
             if (instance.enabled)
                 instance.mouseOutAction.call(target);
         }
    }
}











/**
 * Created by godshadow on 12/3/16.
 */

export enum UIButtonType
{
    MomentaryPushIn,
    PushOnPushOff,
    PushIn
}

export class UIButton extends UIControl
{
    private _statusStyle = null;

    private _titleStatusStyle = null;
    private _titleLayer = null;

    private _imageStatusStyle = null;
    private _imageLayer = null;
    
    type = UIButtonType.MomentaryPushIn;

    init(){
        super.init();
        MUICoreLayerAddStyle(this.layer, "btn");
        this.setupLayers();
    }

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);

        let type = this.layer.getAttribute("data-type");
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
        if (this._imageLayer == null) this._imageLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "DIV");

        // Check for status
        let status = this.layer.getAttribute("data-status");
        if (status == "selected")
            this.setSelected(true);

        this.setupLayers();
    }

    private setupLayers(){
        //UICoreLayerRemoveStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "btn");

        if (this._titleLayer == null) {
            this._titleLayer = document.createElement("span");
            this.layer.appendChild(this._titleLayer);
        }

        let key = this.layer.getAttribute("data-title");
        if (key != null) this.setTitle(NSLocalizeString(key, key));
        
        // Prevent click
        this.layer.addEventListener("click", function(e) {
            e.stopPropagation();
        });
        
        this.layer.addEventListener("mousedown", function(e) {
            e.stopPropagation();
            if (this.enabled == false) return;

            switch (this.type){
                case UIButtonType.MomentaryPushIn:
                case UIButtonType.PushIn:
                this.setSelected(true);
                break;

                case UIButtonType.PushOnPushOff:
                this.setSelected(!this.selected);
                break;
            }
            
        }.bind(this));

        this.layer.addEventListener("mouseup", function(e) {
            e.stopPropagation();
            if (this.enabled == false) return;            
            if (this.type == UIButtonType.MomentaryPushIn) this.setSelected(false);

            if (this.action != null && this.target != null)
                this.action.call(this.target, this);
            
        }.bind(this));
    }

    setTitle(title){
        this._titleLayer.innerHTML = title;
    }

    set title(title){
        this.setTitle(title);
    }

    get title(){
        return this._titleLayer.innerHTML;
    }

    setImageURL(urlString:string){
        if (urlString != null){
            this._imageLayer.setAttribute("src", urlString);
        }
        else {
            this._imageLayer.removeAttribute("src");
        }
    }

}












/**
 * Created by godshadow on 12/3/16.
 */



export enum UITextFieldType {
    NormalType,
    PasswordType,
    SearchType,    
}

export class UITextField extends UIControl
{
    placeHolder = null;
    private _inputLayer = null;
    type = UITextFieldType.NormalType;

    textChangeTarget = null;
    textChangeAction = null;
    private _textChangeFn = null;

    enterPressTarget = null;
    enterPressAction = null;

    keyPressTarget   = null;
    keyPressAction   = null;

    formatter:NSFormatter = null;

    init(){
        super.init();
        this._setupLayer();
    }

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);
        this._inputLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "INPUT");
        this._setupLayer();
    }

    private _setupLayer(){
        if (this._inputLayer == null){
            this._inputLayer = document.createElement("input");

            switch(this.type){
                case UITextFieldType.SearchType:
                this._inputLayer.setAttribute("type", "search");
                break;

                default:
                this._inputLayer.setAttribute("type", "text");
                break;
            }

            this.layer.appendChild(this._inputLayer);
        }

        const placeholderKey = this._inputLayer.getAttribute("data-placeholder");
        if (placeholderKey != null)
            this._inputLayer.setAttribute("placeholder", NSLocalizeString(placeholderKey, placeholderKey));

        this._registerInputEvent();            
    }
    // layoutSubviews(){
    //     super.layoutSubviews();

        // var w = this.getWidth();
        // var h = this.getHeight();

        // this._inputLayer.style.marginLeft = "4px";
        // this._inputLayer.style.width = (w - 8) + "px";
        // this._inputLayer.style.marginTop = "4px";
        // this._inputLayer.style.height = (h - 8) + "px";
//    }

    setText(text){
        this.text = text;
    }

    set text(text){        
        let newValue = text != null ? text : "";        
        this._inputLayer.value = newValue;
    }

    get text(){
        return this._inputLayer.value;
    }

    setPlaceholderText(text){
        this.placeHolder = text;
        this._inputLayer.setAttribute("placeholder", text);
    }

    set placeholderText(text:string){
        this.setPlaceholderText(text);
    }

    setOnChangeText(target, action){
        this.textChangeTarget = target;
        this.textChangeAction = action;
    }    

    private _textStopPropagationFn = null;
    private _registerInputEvent(){
        let instance = this;
        this._textChangeFn = function() {
            if (instance.enabled)
                instance._textDidChange.call(instance);
        }

        this._textStopPropagationFn = function(e){
            //instance._textDidBeginEditing();
            e.stopPropagation();
        };

        this._textDidBeginEditingFn = this._textDidBeginEditing.bind(this);
        this._textDidEndEditingFn = this._textDidEndEditing.bind(this);
        
        this.layer.addEventListener("input", this._textChangeFn);        
        this.layer.addEventListener("click", this._textStopPropagationFn);
        this._inputLayer.addEventListener("focus", this._textDidBeginEditingFn);
        this._inputLayer.addEventListener("blur", this._textDidEndEditingFn);
    }

    private _unregisterInputEvent(){
        this.layer.removeEventListener("input", this._textChangeFn);
        this.layer.removeEventListener("click", this._textStopPropagationFn);
        this._inputLayer.removeEventListener("focus", this._textDidBeginEditingFn);
        this._inputLayer.removeEventListener("blur", this._textDidEndEditingFn);

    }

    private _textDidChange(){
        if (this.enabled == false) return;

        // Check the formater
        let value = this._inputLayer.value;
        if (this.formatter == null) {
            this._textDidChangeDelegate(value);
        }
        else {
            let result, newStr;
            [result, newStr] = this.formatter.isPartialStringValid(value);

            this._unregisterInputEvent();
            this._inputLayer.value = newStr;
            this._registerInputEvent();

            if (result == true) {
                this._textDidChangeDelegate(value);
            }
        }
    }

    private _textDidChangeDelegate(value){
        if (this.textChangeAction != null && this.textChangeTarget != null)
            this.textChangeAction.call(this.textChangeTarget, this, value);
    }    

    private didBeginEditingAction = null;
    private didBeginEditingTarget = null;    
    setOnBeginEditing(target, action) {
        this.didBeginEditingTarget = target;
        this.didBeginEditingAction = action;        
    }    

    private _textDidBeginEditingFn = null;
    private _textDidBeginEditing(){
        if (this.enabled == false)  return;

        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);

        if (this.didBeginEditingTarget == null || this.didBeginEditingAction == null) return;
        this.didBeginEditingAction.call(this.didBeginEditingTarget, this, this.text);
    }

    private didEndEditingAction = null;
    private didEndEditingTarget = null;    
    setOnDidEndEditing(target, action) {
        this.didEndEditingTarget = target;
        this.didEndEditingAction = action;        
    }    

    private _textDidEndEditingFn = null;
    private _textDidEndEditing(){
        if (this.enabled == false)  return;

        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);

        if (this.didEndEditingTarget == null || this.didEndEditingAction == null) return;
        this.didEndEditingAction.call(this.didEndEditingTarget, this, this.text);
    }

    setOnEnterPress(target, action){
        this.enterPressTarget = target;
        this.enterPressAction = action;
        var instance = this;

        this.layer.onkeyup = function(e){
            if (instance.enabled) {
                if (e.keyCode == 13)
                    instance.enterPressAction.call(target, instance, instance._inputLayer.value);
            }
        }
    }

    setOnKeyPress(target, action){
        this.keyPressTarget = target;
        this.keyPressAction = action;
        var instance = this;

        this.layer.onkeydown = function(e){
            if (instance.enabled) {
                instance.keyPressAction.call(target, instance, e.keyCode);
            }
        }
    }

    setTextRGBColor(r, g, b){
        let value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._inputLayer.style.color = value;
    }

    set textColor(color){
        this._inputLayer.style.color = color;
    }

    get textColor(){
        let color = this._getValueFromCSSProperty("color");
        return color;        
    }

    setEnabled(value){
        super.setEnabled(value);
        this._inputLayer.readOnly = !value;
    }

    becomeFirstResponder(){
        this._inputLayer.focus();
    }

    resignFirstResponder(){
        this._inputLayer.blur();
    }

    selectAll(control:UITextField){
        this._inputLayer.select();
    }

}






/**
 * Created by godshadow on 29/08/16.
 */

export class UISegmentedControl extends UIControl
{
    segmentedItems = [];
    selectedSegmentedIndex = -1;

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);

        for (let index = 0; index < this.layer.childNodes.length; index++){
            let itemLayer = this.layer.childNodes[index];
            if (itemLayer.tagName == "DIV"){
                let si = new UIButton();
                si.initWithLayer(itemLayer, owner);
                si.type = UIButtonType.PushIn;
                this._addSegmentedItem(si);
                MUIOutletRegister(owner, si.layerID, si);
            }
        }

        if (this.segmentedItems.length > 0){
            let item = this.segmentedItems[0];
            item.setSelected(true);
            this.selectedSegmentedIndex = 0;
        }
    }

    private _addSegmentedItem(item:UIButton){
        this.segmentedItems.push(item);
        item.addTarget(this, this._didClickSegmentedButton, UIControlEvents.AllTouchEvents);
    }

    private _didClickSegmentedButton(button){
        let index = this.segmentedItems.indexOf(button);
        this.selectSegmentedAtIndex(index);

        if (this.mouseOutTarget != null)
            this.mouseOutAction.call(this.mouseOutTarget, this, index);
    }

    selectSegmentedAtIndex(index){
        if (this.selectedSegmentedIndex == index)
            return;

        if (this.selectedSegmentedIndex > -1){
            let lastItem = this.segmentedItems[this.selectedSegmentedIndex];
            lastItem.setSelected(false);
        }

        this.selectedSegmentedIndex = index;
        
        let item = this.segmentedItems[this.selectedSegmentedIndex];
        item.setSelected(true);
    }
}



/**
 * Created by godshadow on 12/3/16.
 */

export class UISwitch extends UIControl
{
    private _inputLayer = null;
    private _labelLayer = null;

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);

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
        this.layer.onclick = function() {

            if (instance.enabled) {
                instance._toggleValue.call(instance);
            }
        }
    }

    setOnChangeValue(target, action){
        this.target = target;
        this.action = action;
    }


    private _on = false;
    get isOn() {return this._on;}
    set isOn(value){this.setOn(value);}
    setOn(value){
        if (value == this._on) return;
        this._inputLayer.checked = value;
        this._on = value;
    }

    private _toggleValue(){
        this.isOn = !this.isOn;

        if (this.target != null && this.action != null)
            this.action.call(this.target, this, this.isOn);
    }
}





























/**
 * Created by godshadow on 11/3/16.
 */

export class UIViewController extends NSObject {
    layerID: string = null;

    view: UIView = null;

    private _htmlResourcePath = null;

    private _onViewLoadedTarget = null;
    private _onViewLoadedAction = null;

    private _onLoadLayerTarget = null;
    private _onLoadLayerAction = null;

    private _viewIsLoaded = false;
    private _layerIsReady = false;

    private _childViewControllers: UIViewController[] = [];
    parentViewController: UIViewController = null;

    presentingViewController: UIViewController = null;
    presentedViewController: UIView = null;
    navigationController: UINavigationController = null;
    navigationItem: UINavigationItem = null;
    splitViewController: UISplitViewController = null;
    tabBarController/*TODO: UITabBarController*/ = null;

    modalPresentationStyle = MIOCoreIsPhone() == true ? UIModalPresentationStyle.FullScreen : UIModalPresentationStyle.PageSheet;
    modalTransitionStyle = UIModalTransitionStyle.CoverVertical;
    transitioningDelegate = null;

    protected _contentSize = new NSSize(320, 200);
    protected _preferredContentSize = null;

    constructor(layerID?) {
        super();
        this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(this);
    }

    init() {
        super.init();
        this.loadView();
    }

    initWithCoder(coder: NSCoder) {

    }

    initWithLayer(layer, owner, options?) {
        super.init();

        let viewLayer = MUICoreLayerGetFirstElementWithTag(layer, "DIV");

        this.view = new UIView();
        this.view.initWithLayer(viewLayer, owner, options);
        this.view._checkSegues();

        // Search for navigation item
        //this.navigationItem = UINavItemSearchInLayer(layer);        

        this.loadView();
    }

    initWithResource(path) {
        if (path == null) throw new Error("UIViewController:initWithResource can't be null");

        super.init();

        this._htmlResourcePath = path;
        this.loadView();
    }

    localizeSubLayers(layers) {
        if (layers.length == 0)
            return;

        for (let index = 0; index < layers.length; index++) {
            let layer = layers[index];

            if (layer.tagName != "DIV") continue;

            var key = layer.getAttribute("data-localize-key");
            if (key != null)
                layer.innerHTML = NSLocalizeString(key, key);

            this.localizeSubLayers(layer.childNodes);
        }
    }

    localizeLayerIDWithKey(layerID, key) {
        let layer = MUICoreLayerSearchElementByID(this.view.layer, layerID);
        layer.innerHTML = NSLocalizeString(key, key);
    }

    loadView() {
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

        MUICoreBundleLoadNibName(this._htmlResourcePath, this, function (this: UIViewController, layer) {
            this.view.initWithLayer(layer, this);
            this.view.awakeFromHTML();
            this.view._checkSegues();
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
    }

    _didLoadNibWithLayer(layerData) {
        let domParser = new DOMParser();
        let items = domParser.parseFromString(layerData, "text/html");
        let layer = items.getElementById("kk");

        //this.navigationItem = UINavItemSearchInLayer(layer);

        this.view.initWithLayer(layer, this);
        this.view.awakeFromHTML();

        this._didLoadView();
    }

    _didLoadView() {
        this._layerIsReady = true;
        if (MIOCoreIsPhone() == true) MUICoreLayerAddStyle(this.view.layer, "phone");
        MUICoreStoryboardParseLayer(this.view.layer, this, this);
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
    }

    protected _loadChildControllers() {
        let count = this._childViewControllers.length;

        if (count > 0)
            this._loadChildViewController(0, count);
        else
            this._setViewLoaded(true);
    }

    protected _loadChildViewController(index, max) {
        if (index < max) {
            let vc = this._childViewControllers[index];
            vc.onLoadView(this, function () {

                let newIndex = index + 1;
                this._loadChildViewController(newIndex, max);
            });
        }
        else {
            this._setViewLoaded(true);
        }
    }

    protected _setViewLoaded(value) {
        this.willChangeValue("viewLoaded");
        this._viewIsLoaded = value;
        this.didChangeValue("viewLoaded");

        if (value == true && this._onViewLoadedAction != null) {
            this._onViewLoadedAction.call(this._onViewLoadedTarget);
        }

        this._onViewLoadedTarget = null;
        this._onViewLoadedAction = null;
        this.view.setNeedsDisplay();
    }

    onLoadView(target, action) {
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
    }

    onLoadLayer(target, action) {
        if (this._layerIsReady == true) {
            action.call(target);
        }
        else {
            this._onLoadLayerTarget = action;
            this._onLoadLayerAction = target;
        }
    }

    get viewIsLoaded() {
        return this._viewIsLoaded;
    }

    get childViewControllers() {
        return this._childViewControllers;
    }

    addChildViewController(vc: UIViewController) {
        vc.parentViewController = this;
        this._childViewControllers.push(vc);
        //vc.willMoveToParentViewController(this);
    }

    removeChildViewController(vc: UIViewController) {
        var index = this._childViewControllers.indexOf(vc);
        if (index != -1) {
            this._childViewControllers.splice(index, 1);
            vc.parentViewController = null;
        }
    }

    // removeFromParentViewController()
    // {
    //     this.parent.removeChildViewController(this);
    //     this.parent = null;
    //     this.view.removeFromSuperview();
    //     //this.didMoveToParentViewController(null);
    // }

    private _presentationController: UIPresentationController = null;
    get isPresented() {
        if (this._presentationController != null)
            return this._presentationController._isPresented;
    }

    get presentationController(): UIPresentationController {
        // if (this._presentationController == null && this.parentViewController != null)
        //     return this.parentViewController.presentationController;

        return this._presentationController;
    }

    private _popoverPresentationController: UIPopoverPresentationController = null;
    get popoverPresentationController(): UIPopoverPresentationController {
        if (this._popoverPresentationController == null) {
            this._popoverPresentationController = new UIPopoverPresentationController();
            this._popoverPresentationController.init();
            this._popoverPresentationController.presentedViewController = this;
            this._presentationController = this._popoverPresentationController;
        }

        return this._popoverPresentationController;
    }

    showViewController(vc, animated) {
        vc.onLoadView(this, function () {

            this.view.addSubview(vc.view);
            this.addChildViewController(vc);

            _MUIShowViewController(this, vc, this, animated);
        });
    }

    presentViewController(vc: UIViewController, animated: boolean) {

        let pc = vc.presentationController as UIPresentationController;
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
                let w: UIWindow = pc.window;
                if (w == null) {
                    w = new UIWindow();
                    w.init();
                    w.layer.style.background = "";
                    w.rootViewController = vc;
                    w.addSubview(pc.presentedView);
                    pc.window = w;
                }
                w.setHidden(false);

                _MUIShowViewController(this, vc, null, animated, this, function () {
                    w.makeKey();
                });
            }
        });
    }

    dismissViewController(animate) {
        let pc = this._presentationController;
        let vc = this as UIViewController;
        while (pc == null) {
            vc = vc.parentViewController;
            pc = vc._presentationController;
        }
        let toVC = pc.presentingViewController;
        let fromVC = pc.presentedViewController;
        let fromView = pc.presentedView;

        _MUIHideViewController(fromVC, toVC, null, this, function () {

            if (fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
                toVC.removeChildViewController(fromVC);
                let pc1 = fromVC.presentationController;
                let view = pc1.presentedView;
                view.removeFromSuperview();
            }
            else {
                // It's a window instead of a view
                let pc1 = fromVC.presentationController;
                let w = pc1.window as UIWindow;
                w.setHidden(true);
            }
        });
    }

    transitionFromViewControllerToViewController(fromVC, toVC, duration, animationType, target?, completion?) {
        //TODO
    }

    viewDidLoad() { }

    viewWillAppear(animated?) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillAppear(animated);
        }

        this.view.setViewIsVisible(true);
    }

    viewDidAppear(animated?) {
        //this.view.setNeedsDisplay();

        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidAppear(animated);
        }
    }

    viewWillDisappear(animated?) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillDisappear(animated);
        }

        this.view.setViewIsVisible(false);
    }

    viewDidDisappear(animated?) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidDisappear(animated);
        }
    }

    contentHeight() {
        return this.view.getHeight();
    }

    setContentSize(size) {
        this.willChangeValue("contentSize");
        this._contentSize = size;
        this.didChangeValue("contentSize");
    }

    public set contentSize(size) {
        this.setContentSize(size);
    }

    public get contentSize() {
        return this._contentSize;
    }

    public set preferredContentSize(size) {
        this.setPreferredContentSize(size);
    }

    public get preferredContentSize() {
        return this._preferredContentSize;
    }

    setPreferredContentSize(size) {
        this.willChangeValue("preferredContentSize");
        this._preferredContentSize = size;
        this.didChangeValue("preferredContentSize");
    }

    // Storyboard
    storyboard:UIStoryboard = null;
    _outlets = {};
    _segues = [];

    _checkSegues() {

    }

    shouldPerformSegueWithIdentifier(identifier:string, sender:any):Boolean{
        return true;
    }

    prepareForSegue(segue:UIStoryboardSegue, sender:any){

    }

    performSegueWithIdentifier(identifier:string, sender:any){

    }
}














/**
 * Created by godshadow on 06/12/2016.
 */

export enum UIModalPresentationStyle
{
    FullScreen,
    PageSheet, // normal modal sheet in osx
    FormSheet, // normal modal like floating window but horizontal and vertically centered
    CurrentContext,
    Custom,
    OverFullScreen,     // Similar to FullScreen but the view beneath doesnpt dissappear
    OverCurrentContext, // Similuar like previus, but in current context
    Popover, // the popover, almost like FormSheet but no centered
    None
}

export enum UIModalTransitionStyle
{
    CoverVertical,
    FlipHorizontal,
    CrossDisolve
}

export class UIPresentationController extends NSObject
{
    presentationStyle = UIModalPresentationStyle.PageSheet;
    shouldPresentInFullscreen = false;

    protected _presentedViewController:UIViewController = null; //ToVC
    presentingViewController = null; //FromVC
    presentedView = null;

    protected _transitioningDelegate = null;
    private _window = null;

    _isPresented:boolean = false;

    initWithPresentedViewControllerAndPresentingViewController(presentedViewController, presentingViewController){
        super.init();

        this.presentedViewController = presentedViewController;
        this.presentingViewController = presentingViewController;        
    }

    setPresentedViewController(vc:UIViewController){
        this._presentedViewController = vc;
        this.presentedView = vc.view;
    }

    set presentedViewController(vc:UIViewController){
        this.setPresentedViewController(vc);
    }

    get presentedViewController():UIViewController{
        return this._presentedViewController;
    }

    get transitioningDelegate(){
        if (this._transitioningDelegate == null){
            this._transitioningDelegate = new MUIModalTransitioningDelegate();
            this._transitioningDelegate.init();
        }

        return this._transitioningDelegate;
    }

    presentationTransitionWillBegin(){
        let toVC = this.presentedViewController;
        let view = this.presentedView;

        this._calculateFrame();

        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet 
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
            || MIOCoreIsPhone() == true){
            MUICoreLayerAddStyle(view.layer, "modal_window");
        }       
    }

    presentationTransitionDidEnd(completed){        
    }

    dismissalTransitionWillBegin(){
    }

    dismissalTransitionDidEnd(completed){        
    }

    _calculateFrame(){
        let fromVC = this.presentingViewController;
        let toVC = this.presentedViewController;
        let view = this.presentedView;

        if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen){
            view.layer.style.left = "0px";
            view.layer.style.top = "0px";
            view.layer.style.width = "100%";
            view.layer.style.height = "100%";
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext)
        {
            let w = fromVC.view.getWidth();
            let h = fromVC.view.getHeight();

            view.setFrame(NSRect.rectWithValues(0, 0, w, h));
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet)
        {
            // Present like desktop sheet window
            let ws = MUIWindowSize();

            let size = toVC.preferredContentSize;
            if (size == null) size = new NSSize(320, 200);

            let w = size.width;
            let h = size.height;
            let x = (ws.width - w) / 2;

            view.setFrame(NSRect.rectWithValues(0, 0, w, h));
            this.window.setFrame(NSRect.rectWithValues(x, 0, w, h))

            view.layer.classList.add("modal");
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet)
        {
            // Present at the center of the screen
            let ws = MUIWindowSize();

            let size = toVC.preferredContentSize;
            if (size == null) size = new NSSize(320, 200);

            let w = size.width;
            let h = size.height;
            let x = (ws.width - w) / 2;
            let y = (ws.height - h) / 2;

            view.setFrame(NSRect.rectWithValues(0, 0, w, h));
            this.window.setFrame(NSRect.rectWithValues(x, y, w, h))

            view.layer.classList.add("modal");
        }
        else
        {
            let size = toVC.preferredContentSize;
            if (size == null) size = new NSSize(320, 200);
            let w = size.width;
            let h = size.height;

            view.setFrame(NSRect.rectWithValues(0, 0, w, h));
        }        
    }

    get window(){
        return this._window;
    }
    
    set window(window:UIWindow){
        let vc = this.presentedViewController;
        this._window = window;
        
        // Track view frame changes
        if (MIOCoreIsMobile() == false && vc.modalPresentationStyle != UIModalPresentationStyle.CurrentContext){
            vc.addObserver(this, "preferredContentSize");
        }
    }

    observeValueForKeyPath(key, type, object) {

        if (key == "preferredContentSize" && type == "did")
        {
            let vc = this.presentedView;
            //this.window.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            vc.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            this._calculateFrame();            
        }
    }

}

export class MUIModalTransitioningDelegate extends NSObject
{
    modalTransitionStyle = null;

    private _presentAnimationController = null;
    private _dissmissAnimationController = null;

    animationControllerForPresentedController(presentedViewController, presentingViewController, sourceController){
        if (this._presentAnimationController == null) {
            this._presentAnimationController = new UIModalPresentAnimationController();
            this._presentAnimationController.init();
        }

        return this._presentAnimationController
    }

    animationControllerForDismissedController(dismissedController){
        if (this._dissmissAnimationController == null) {

            this._dissmissAnimationController = new UIModalDismissAnimationController();
            this._dissmissAnimationController.init();
        }

        return this._dissmissAnimationController;
    }
}

export class MUIAnimationController extends NSObject
{
    transitionDuration(transitionContext){
        return 0;
    }

    animateTransition(transitionContext){
        // make view configurations before transitions        
    }

    animationEnded(transitionCompleted){
        // make view configurations after transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        return null;
    }

}

export class UIModalPresentAnimationController extends NSObject
{
    transitionDuration(transitionContext){
        return 0.15;
    }

    animateTransition(transitionContext){
        // make view configurations before transitions
    }

    animationEnded(transitionCompleted){
        // make view configurations after transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        let animations = null;

        let toVC = transitionContext.presentedViewController;

        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet 
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen){
            
            if (MIOCoreIsPhone() == true)
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideInUp);
            else 
                animations = MUIClassListForAnimationType(MUIAnimationType.BeginSheet);
        }                            

        return animations;
    }
}

export class UIModalDismissAnimationController extends NSObject
{
    transitionDuration(transitionContext){
        return 0.25;
    }

    animateTransition(transitionContext){
        // make view configurations after transitions
    }

    animationEnded(transitionCompleted){
        // make view configurations before transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        let animations = null;

        let fromVC = transitionContext.presentingViewController;

        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet 
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen){
            
            if (MIOCoreIsPhone() == true)                        
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideOutDown);
            else 
                animations = MUIClassListForAnimationType(MUIAnimationType.EndSheet);
        }          
                  
        return animations;
    }

}








/**
 * Created by godshadow on 11/11/2016.
 */

export enum UIPopoverArrowDirection
{
    Any,
    Up,
    Down,
    Left,
    Right
}

export interface UIPopoverPresentationControllerDelegate {
    popoverPresentationControllerDidDismissPopover?(popoverPresentationController:UIPopoverPresentationController);
}

export class UIPopoverPresentationController extends UIPresentationController
{
    permittedArrowDirections = UIPopoverArrowDirection.Any;

    sourceView = null;
    sourceRect = NSRect.Zero();

    delegate = null;

    private _contentSize = null;
    private _canvasLayer = null;
    private _contentView = null;

    get transitioningDelegate(){
        if (this._transitioningDelegate == null){
            this._transitioningDelegate = new MIOModalPopOverTransitioningDelegate();
            this._transitioningDelegate.init();
        }

        return this._transitioningDelegate;
    }

    presentationTransitionWillBegin(){
        //if (MIOCoreIsPhone() == true) return;
        
        this._calculateFrame();
        MUICoreLayerAddStyle(this.presentedView.layer, "popover_window");                
    }

    dismissalTransitionDidEnd(completed){     
        if (completed == false) return;   
        if (this.delegate != null && (typeof this.delegate.popoverPresentationControllerDidDismissPopover === "function")){
            this.delegate.popoverPresentationControllerDidDismissPopover(this);
        } 
    }

    _calculateFrame(){
        let vc = this.presentedViewController;
        let view = this.presentedView;

        let w = vc.preferredContentSize.width;
        let h = vc.preferredContentSize.height;
        let v = vc.popoverPresentationController.sourceView;
        let f = vc.popoverPresentationController.sourceRect;

        let xShift = false;

        // Below
        let y = v.layer.getBoundingClientRect().top + f.size.height + 10;
        if ((y + h) > window.innerHeight) // Below no, Up?
            y = v.layer.getBoundingClientRect().top - h - 10;
        if (y < 0) // Up no, horizonal shift
        {
            xShift = true;
            y = (window.innerHeight - h) / 2;
        }

        let x = 0;

        if (xShift == false)
        {
            x = v.layer.getBoundingClientRect().left + 10;
            if ((x + w) > window.innerWidth)
                x = v.layer.getBoundingClientRect().left +f.size.width - w + 10;
        }
        else
        {
            x = v.layer.getBoundingClientRect().left + f.size.width + 10;
            if ((x + w) > window.innerWidth)
                x = v.layer.getBoundingClientRect().left - w - 10;
        }

        view.setFrame(NSRect.rectWithValues(0, 0, w, h));
        this.window.setFrame(NSRect.rectWithValues(x, y, w, h))
    }

    private _drawRoundRect(x, y, width, height, radius) {

        let ctx = this._canvasLayer.getContext('2d');

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

        let color = 'rgba(208, 208, 219, 1)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
    }

}

export class MIOModalPopOverTransitioningDelegate extends NSObject
{
    modalTransitionStyle = null;

    private _showAnimationController = null;
    private _dissmissAnimationController = null;

    animationControllerForPresentedController(presentedViewController, presentingViewController, sourceController){
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
    }

    animationControllerForDismissedController(dismissedController){
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
    }
}

export class MIOPopOverPresentAnimationController extends NSObject
{
    transitionDuration(transitionContext)
    {
        return 0.25;
    }

    animateTransition(transitionContext)
    {
        // make view configurations before transitions
    }

    animationEnded(transitionCompleted)
    {
        // make view configurations after transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        let animations = MUIClassListForAnimationType(MUIAnimationType.FadeIn);
        return animations;
    }

}

export class MIOPopOverDismissAnimationController extends NSObject
{
    transitionDuration(transitionContext){
        return 0.25;
    }

    animateTransition(transitionContext){
        // make view configurations after transitions
    }

    animationEnded(transitionCompleted){
        // make view configurations before transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        let animations = MUIClassListForAnimationType(MUIAnimationType.FadeOut);
        return animations;
    }

}







/**
 * Created by godshadow on 01/09/16.
 */


export class UIScrollView extends UIView {
    pagingEnabled = false;
    delegate = null;
    scrolling = false;

    private _showsVerticalScrollIndicator: boolean = true;
    set showsVerticalScrollIndicator(value: boolean) { this.setShowsVerticalScrollIndicator(value); }
    get showsVerticalScrollIndicator(): boolean { return this._showsVerticalScrollIndicator; }

    private _scrollEnable = true;
    set scrollEnable(value: boolean) { this.setScrollEnable(value); }
    get scrollEnable(): boolean { return this._scrollEnable; }

    private scrollTimer = null;
    private lastOffsetY = 0;

    protected contentView:UIView = null;

    init() {
        super.init();
        this.setupLayer();
    }

    initWithLayer(layer, owner, options?) {
        super.initWithLayer(layer, owner, options);
        this.setupLayer();
    }

    private setupLayer() {        
        if (MIOCoreDeviceOSString() == "ios") this.layer.style["-webkit-overflow-scrolling"] = "touch"; 

        let contentLayer = MUICoreLayerCreate();
        MUICoreLayerAddStyle(contentLayer, "content-view");
        // contentLayer.style.position = "absolute";
        // contentLayer.style.width = "100%";
        // contentLayer.style.height = "100%";
        // contentLayer.style.overflow = "hidden";

        this.contentView = new UIView();
        this.contentView.initWithLayer(contentLayer, this);
        super.addSubview(this.contentView);
        
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

    }

    private scrollEventCallback() {

        let offsetY = this.contentOffset.y;
        let deltaY = 0;
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

        if (this.scrollTimer != null) this.scrollTimer.invalidate();
        this.scrollTimer = MIOTimer.scheduledTimerWithTimeInterval(150, false, this, this.scrollEventStopCallback);        

        this.didScroll(0, deltaY);
        this.lastOffsetY = this.contentOffset.y;

        if (this.delegate != null && typeof this.delegate.scrollViewDidScroll === "function")
            this.delegate.scrollViewDidScroll.call(this.delegate, this);
    }

    private scrollEventStopCallback(timer) {
        this.scrolling = false;

        this.didStopScroll();
    }

    protected didStartScroll() {
        //console.log("START SCROLL");
    }

    protected didScroll(deltaX, deltaY) {
        //console.log("DID SCROLL");
    }

    protected didStopScroll() {
        //console.log("STOP SCROLL");
    }

    public setScrollEnable(value: boolean) {

        if (this._scrollEnable == value) return;
        this._scrollEnable = value;


        if (value == true) {
            this.contentView.layer.style.overflow = "scroll";
        }
        else {
            this.contentView.layer.style.overflow = "hidden";
        }
    }

    public setShowsVerticalScrollIndicator(value: boolean) {
        if (value == this._showsVerticalScrollIndicator) return;

        this._showsVerticalScrollIndicator = value;

        if (value == false) {
            this.layer.style.paddingRight = "20px";
        }
        else {
            this.layer.style.paddingRight = "";
        }
    }

    set contentOffset(point: MIOPoint) {
        if (point.x > 0) this.layer.scrollLeft = point.x;
        if (point.y > 0) this.layer.scrollTop = point.y;
    }

    get contentOffset(): MIOPoint {
        let p = new MIOPoint(this.layer.scrollLeft, this.layer.scrollTop);
        return p;
    }

    get bounds():MIORect{
        let p = this.contentOffset;
        return MIORect.rectWithValues(p.x, p.y, this.getWidth(), this.getHeight());
    }

    addSubview(view:UIView, index?) {
        this.contentView.addSubview(view, index);
    }

    set contentSize(size: MIOSize) {
        if (size.width > 0) {
            this.contentView.setWidth(size.width);
        }
        if (size.height > 0) {
            this.contentView.setHeight(size.height);
            // create markers for intersection observer (see fix note below)
            //this.createIntersectionObserverMarkers(size.height);
        }
    }

    layoutSubviews() {
        this.contentView.layoutSubviews();
    }

    scrollToTop(animate?) {
        // if (true)
        //     this.layer.style.transition = "scrollTop 0.25s";

        this.layer.scrollTop = 0;
    }

    scrollToBottom(animate?) {
        // if (true)
        //     this.layer.style.transition = "scrollTop 0.25s";

        this.layer.scrollTop = this.layer.scrollHeight;
    }

    scrollToPoint(x, y, animate?) {
        this.layer.scrollTop = y;
        this.lastOffsetY = y;
    }

    scrollRectToVisible(rect, animate?) {
        //TODO: Implement this
    }
}









/**
 * Created by godshadow on 22/3/16.
 */

export interface UITableViewDataSource {
    
    viewForHeaderInSection?(tableView:UITableView, section):UIView;
    titleForHeaderInSection?(tableView:UITableView, section):string;
}

export enum UITableViewRowAnimation
{
    None,
    Automatic,
    Fade,
    Right,
    Left,
    Top,
    Bottom,
    Middle
}

export class UITableViewSection extends MIOObject {
    header: UIView = null;
    title: string = null;
    footer: UIView = null;

    rowCount = 0;
    cells = [];
    rows = [];

    static headerWithTitle(title, height) {

        let header = new UIView();
        header.init();
        header.setHeight(height);
        //header.layer.style.background = "";
        //header.layer.style.margin = "4px 8px";
        UICoreLayerRemoveStyle(header.layer, "view");
        UICoreLayerAddStyle(header.layer, "header");

        let titleLabel = new UILabel();
        titleLabel.init();
        // titleLabel.layer.style.background = "";
        UICoreLayerRemoveStyle(titleLabel.layer, "lbl");
        UICoreLayerAddStyle(titleLabel.layer, "title");
        titleLabel.text = title;
        header.addSubview(titleLabel);

        return header;
    }
}

export enum UITableViewRowType {
    Header,
    SectionHeader,
    Cell,
    SectionFooter,
    Footer
}

export class UITableViewRow extends MIOObject {
    type: UITableViewRowType;
    view: UIView = null;
    height = 0;

    prevRow:UITableViewRow = null;
    nextRow:UITableViewRow = null;

    initWithType(type: UITableViewRowType) {
        this.type = type;
    }
}

export class UITableViewCellNode extends MIOObject {

    identifier: string = null;
    section: UITableViewSection = null;
}

export class UITableView extends UIScrollView {
    dataSource = null;
    delegate = null;

    headerView: UIView = null;
    footerView: UIView = null;

    headerHeight = 0;
    footerHeight = 0;

    sectionHeaderHeight = 23;
    sectionFooterHeight = 23;

    rowHeight = 0;
    private defaultRowHeight = 44;

    allowsMultipleSelection = false;
    
    private selectedIndexPath: MIOIndexPath = null;

    private _indexPathsForSelectedRows = [];

    private _cellPrototypesCount = 0;
    private _cellPrototypesDownloadedCount = 0;
    private _isDownloadingCells = false;
    private _needReloadData = false;
    private _cellPrototypes = {};

    visibleCells = [];
    private reusableCellsByID = {};    
    private cellNodesByID = {};

    private visibleRange: MIORange = new MIORange(-1, -1);

    private sections = [];
    private rows = [];
    private cellRows = [];
    private rowsCount = 0;

    private contentHeight = 0;
    private lastContentOffsetY = -this.defaultRowHeight;

    private firstVisibleHeader:UIView = null;
    private reloadingData = false;
    private selectedCellWhileReloadingData:UITableViewCell = null;

    initWithLayer(layer, owner, options?) {
        super.initWithLayer(layer, owner, options);

        // Check if we have prototypes
        if (this.layer.childNodes.length > 0) {
            for (let index = 0; index < this.layer.childNodes.length; index++) {
                let subLayer = this.layer.childNodes[index];

                if (subLayer.tagName != "DIV")
                    continue;

                if (subLayer.getAttribute("data-cell-identifier") != null) {
                    this._addCellPrototypeWithLayer(subLayer, owner);
                    subLayer.style.display = "none";
                }
                else if (subLayer.getAttribute("data-tableview-header") != null) {
                    this._addHeaderWithLayer(subLayer, owner);
                }
                else if (subLayer.getAttribute("data-tableview-footer") != null) {
                    this._addFooterWithLayer(subLayer, owner);
                }
            }
        }
    }

    private _addHeaderWithLayer(subLayer, owner) {
        this.headerView = new UIView();
        this.headerView.initWithLayer(subLayer, owner);
        // var h = this.headerView.getHeight();
        // var size = new MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        // this.headerView.setFrame(MIOFrame.frameWithRect(0, 0, size.width, size.height));
    }

    private _addFooterWithLayer(subLayer, owner) {
        this.footerView = new UIView();
        this.footerView.initWithLayer(subLayer, owner);
        // var size = new MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        // this.footerView.setFrame(MIOFrame.frameWithRect(0, 0, size.width, size.height));
    }

    private _addCellPrototypeWithLayer(subLayer, owner) {
        let cellIdentifier = subLayer.getAttribute("data-cell-identifier");
        let cellClassname = subLayer.getAttribute("data-class");
        if (cellClassname == null) cellClassname = "UITableViewCell";

        let item = {};
        item["class"] = cellClassname;
        item["layer"] = subLayer;
        let size = new MIOSize(subLayer.clientWidth, subLayer.clientHeight);
        if (size != null) item["size"] = size;
        // var bg = window.getComputedStyle( subLayer ,null).getPropertyValue('background-color');
        // if (bg != null) item["bg"] = bg;

        this._cellPrototypes[cellIdentifier] = item;
    }

    addCellPrototypeWithIdentifier(identifier, elementID, url, classname?) {

        let item = {};

        this._isDownloadingCells = true;
        this._cellPrototypesCount++;

        item["url"] = url;
        item["id"] = elementID;
        if (classname != null)
            item["class"] = classname;

        this._cellPrototypes[identifier] = item;
        let mainBundle = MIOBundle.mainBundle();
        mainBundle.loadHTMLNamed(url, elementID, this, function (layer) {

            item["layer"] = layer;
            this._cellPrototypes[identifier] = item;

            this._cellPrototypesDownloadedCount++;
            if (this._cellPrototypesDownloadedCount == this._cellPrototypesCount) {
                this._isDownloadingCells = false;
                if (this._needReloadData)
                    this.reloadData();
            }
        });
    }

    dequeueReusableCellWithIdentifier(identifier:string): UITableViewCell {

        let cell: UITableViewCell = null;

        let array = this.reusableCellsByID[identifier];
        if (array != null) {
            if (array.length > 0) {
                cell = array[0];
                array.splice(0, 1);
                cell.addObserver(this, "selected");
                return cell;
            }
        }

        let item = this._cellPrototypes[identifier];

        //instance creation here
        let className = item["class"];
        cell = MIOClassFromString(className);
        cell.nodeID = MIOUUID.UUID().UUIDString;
        cell.reuseIdentifier = identifier;

        let layer = item["layer"];
        if (layer != null) {
            let newLayer = layer.cloneNode(true);
            newLayer.style.display = "";            
            cell.initWithLayer(newLayer, this);
            cell.awakeFromHTML();
        }
        // else {
        //     let cells = item["cells"];
        //     if (cells == null) {
        //         cells = [];
        //         item["cells"] = cells;
        //     }
        //     cells.push(cell);
        // }        

        cell.addObserver(this, "selected");
        return cell;
    }

    setHeaderView(view) {
        this.headerView = view;
        this.addSubview(this.headerView);
    }

    reloadData() {

        this.reloadingData = true;
        // Remove all subviews
        for (let index = 0; index < this.rows.length; index++) {
            let row = this.rows[index];
            if (row.view != null) {
                switch (row.type) {

                    case UITableViewRowType.Header:
                    case UITableViewRowType.Footer:                    
                        break;

                    case UITableViewRowType.Cell:
                        this.recycleCell(row.view);
                        row.view.removeFromSuperview();                        
                        break;

                    default:
                        row.view.removeFromSuperview();
                }                
            }
        }

        this.rows = [];
        this.sections = [];
        this.rowsCount = 0;
        this.selectedIndexPath = null;
        this.visibleRange = new MIORange(-1, -1);
        //this.lastContentOffsetY = -this.defaultRowHeight;
        this.lastContentOffsetY = 0;
        this.contentHeight = 0;

        // Is ready to reaload or the are still donwloading
        if (this._isDownloadingCells == true) {
            this._needReloadData = true;
            return;
        }

        if (this.dataSource == null) return;

        let sections = 1;
        if (typeof this.dataSource.numberOfSections === "function") sections = this.dataSource.numberOfSections(this);
        for (let sectionIndex = 0; sectionIndex < sections; sectionIndex++) {
            let section = new UITableViewSection();
            section.init();
            this.sections.push(section);

            let rows = this.dataSource.numberOfRowsInSection(this, sectionIndex);
            section.rowCount = rows;
            this.rowsCount += rows;
            this.contentHeight += rows * this.defaultRowHeight;
        }

        let size = new MIOSize(0, this.contentHeight);
        this.contentSize = size;        
        this.scrollToTop();

        this.reloadLayoutSubviews = true;

        if (this.rowsCount > 0) this.setNeedsDisplay();

        this.reloadingData = false;
        if (this.selectedCellWhileReloadingData != null) {
            let ip = this.indexPathForCell(this.selectedCellWhileReloadingData);
            this.selectedIndexPath = ip;
            this.selectedCellWhileReloadingData = null;
        }
        
    }

    private reloadLayoutSubviews = false;

    layoutSubviews() {

        if (this.reloadLayoutSubviews == true) {
            this.reloadLayoutSubviews = false;
            this.initialLayoutSubviews();
        }
        else {
            this.scrollLayoutSubviews();
        }
    }

    private lastIndexPath: MIOIndexPath = null;

    private initialLayoutSubviews() {
        
        // Add Header
        let posY = this.addHeader();
        
        let maxY = this.getHeight() + (this.defaultRowHeight * 4);
        let exit = false;

        let lastRow = null;
        for (let sectionIndex = 0; sectionIndex < this.sections.length; sectionIndex++) {

            if (exit == true) break;            

            let section = this.sections[sectionIndex] as UITableViewSection;
            if (section.rowCount > 0) posY += this.addSectionHeader(section, posY, null);           

            for (let cellIndex = 0; cellIndex < section.rowCount; cellIndex++) {
                let ip = MIOIndexPath.indexForRowInSection(cellIndex, sectionIndex);
                posY += this.addCell(ip, posY, null, lastRow);

                lastRow = this.rows[this.rows.length - 1];
                this.lastIndexPath = ip;

                if (cellIndex == section.rowCount - 1) posY += this.addSectionFooter(section, posY, null);

                if (posY >= maxY) {
                    exit = true;
                    break;
                }
            }            
        }

        // Add Footer
        if (posY < maxY) posY += this.addFooter();        

        this.visibleRange = new MIORange(0, this.rows.length);
        
        let size = new MIOSize(0, this.contentHeight);
        this.contentSize = size;
        this.lastContentOffsetY = 0;
    }

    private scrollLayoutSubviews() {

        if (this.rowsCount == 0) return;

        let scrollDown = false;
        let offsetY = 0;
        if (this.contentOffset.y == this.lastContentOffsetY) return;
        if (this.contentOffset.y > this.lastContentOffsetY) {
            offsetY = this.contentOffset.y - this.lastContentOffsetY;
            scrollDown = true;
        }
        else if (this.contentOffset.y < this.lastContentOffsetY) {
            offsetY = this.lastContentOffsetY - this.contentOffset.y;
            scrollDown = false;
        }

        if (offsetY < (this.defaultRowHeight / 2)) return;
        this.lastContentOffsetY = this.contentOffset.y;

        if (scrollDown == true) {

            let start = this.visibleRange.location;
            let end = this.visibleRange.location + this.visibleRange.length - 1;
            let row = this.rows[end];
            let posY = row.view.getY() + row.height;
            let maxY = this.contentOffset.y + this.getHeight() + (this.defaultRowHeight * 4);
            let startSectionIndex = this.lastIndexPath.section;
            let startRowIndex = this.lastIndexPath.row + 1;

            let lastRow = row;
            let nextRow = end + 1;
            let h = 0;
            let exit = false;

            for (let sectionIndex = startSectionIndex; sectionIndex < this.sections.length; sectionIndex++) {

                if (exit == true) break;

                let section: UITableViewSection = this.sections[sectionIndex];
                
                for (let cellIndex = startRowIndex; cellIndex < section.rowCount; cellIndex++) {

                    if (cellIndex == 0) {
                        h = this.addSectionHeader(section, posY, this.rows[nextRow]);
                        posY += h;
                        if (h > 0) {
                            nextRow++;
                            start++;
                        }
                    }

                    let ip = MIOIndexPath.indexForRowInSection(cellIndex, sectionIndex);
                    posY += this.addCell(ip, posY, this.rows[nextRow], lastRow);
                    lastRow = this.rows[nextRow];
                    nextRow++;
                    start++;                    

                    // let recycleRow:UITableViewRow = this.rows[start];
                    // if (recycleRow.type == UITableViewRowType.Cell) {
                    //     this.recycleCell(recycleRow.view as UITableViewCell);                            
                    // }                        

                    this.lastIndexPath = ip;

                    if (section.rowCount - 1 == cellIndex) {
                        h = this.addSectionFooter(section, posY, this.rows[nextRow]);
                        posY += h;
                        if (h > 0) {
                            nextRow++;
                            start++;
                        } 
                    }

                    if (posY >= maxY) {
                        exit = true;
                        break;
                    }
                    
                }
                startRowIndex = 0;
                
            }

            // Add Footer
            // if (posY < maxY) {
            //     posY += this.addFooter();
            // }

            this.visibleRange = new MIORange(start, nextRow - start);
        }

        let size = new MIOSize(0, this.contentHeight);
        this.contentSize = size;
    }

    private recycleCell(cell: UITableViewCell) {

        if (cell == null) return;

        let ip = this.indexPathForCell(cell);

        if (ip.row == -1) return;

        let section = this.sections[ip.section];
        section.cells[ip.row] = null;

        //cell.selected = false;
        cell.removeObserver(this, "selected");        

        let array = this.reusableCellsByID[cell.reuseIdentifier];
        if (array == null) {
            array = [];
            this.reusableCellsByID[cell.reuseIdentifier] = array;
        }
        array.push(cell);

        if (this.delegate != null) {
            if (typeof this.delegate.didEndDisplayingCellAtIndexPath === "function")
                this.delegate.didEndDisplayingCellAtIndexPath(this, cell, ip);
        }
    }

    private indexPathForRowIndex(index, sectionIndex) {

        let section = this.sections[sectionIndex];

        if (index < section.rows) {
            return MIOIndexPath.indexForRowInSection(index, sectionIndex);
        }
        else {
            let nextIndex = index - section.rows;
            return this.indexPathForRowIndex(nextIndex, sectionIndex + 1);
        }
    }

    private addRowsForNewVisibleRange(range: MIORange, scrollDown: boolean) {

        let row: UITableViewRow;
        let start;
        let end;
        let posY = 0;

        if (this.visibleRange.location == -1) {
            start = range.location;
            end = range.length;
            posY = 0;
        }
        else if (scrollDown == true) {
            start = this.visibleRange.location + this.visibleRange.length - 1;
            end = range.location + range.length;
        }
        else {
            start = range.location;
            end = this.visibleRange.location;
            row = this.rows[end];
            posY = row.view.getY();
        }

        if (scrollDown == true) {

            row = this.rows[start];
            posY = row.view.getY();

            for (let index = start; index < end; index++) {

                row = this.rows[index];
                if (MIOLocationInRange(index, this.visibleRange) == true) {
                    posY += row.height;
                }
                else {
                    // if (ip.row == 0) {
                    //     let section = this.sections[ip.section];
                    //     posY += this.addSectionHeader(section, posY, index);
                    // }

                    let ip = this.indexPathForRowIndex(index, 0);
                    posY += this.addCell(ip, posY, index, null);
                }
            }
        }
        else {

            for (let index = end; index >= start; index--) {

                if (MIOLocationInRange(index, this.visibleRange) == false) {

                    // if (rowIndex == section.rows - 1) {
                    //     section.header = this.addSectionHeader(sectionIndex);
                    // }
                    row = this.rows[index];
                    let h = row.height;
                    row = this.rows[index + 1];
                    posY = row.view.getY() - h;
                    let ip = this.indexPathForRowIndex(index, 0);
                    this.addCell(ip, posY, index, null, row);
                }
            }
        }
    }

    private addRowWithType(type: UITableViewRowType, view: UIView): UITableViewRow {

        let row = new UITableViewRow();
        row.initWithType(type);
        this.rows.push(row);
        this.cellRows.addObject(row);
        row.view = view;

        return row;
    }

    private addHeader() {

        let header:UIView = null;
        if (this.headerView != null) header = this.headerView;
        if (header == null) return 0;

        header.setX(0);
        header.setY(0);
        header.setWidth(this.getWidth());

        this.addSubview(header);
        let row = this.addRowWithType(UITableViewRowType.Header, header);

        if (row.height == 0) {
            row.height = header.getHeight() + 1;
            this.contentHeight += row.height;
        }

        return row.height;
    }

    private addSectionHeader(section: UITableViewSection, posY, row: UITableViewRow) {

        if (row != null && row.view != null) return row.height;

        let sectionIndex = this.sections.indexOf(section);

        if (typeof this.dataSource.viewForHeaderInSection === "function") {
            let view: UIView = this.dataSource.viewForHeaderInSection(this, sectionIndex);
            if (view == null) return 0;

            view.setX(0);
            view.setY(posY);

            section.header = view;
            this.addSubview(view);
            if (row == null) {
                row = this.addRowWithType(UITableViewRowType.SectionHeader, section.header);
            }
            row.view = view;

            if (row.height == 0) {
                row.height = view.getHeight();;
                this.contentHeight += row.height;
            }

            return row.height;
        }
        else if (typeof this.dataSource.titleForHeaderInSection === "function") {
            let title = this.dataSource.titleForHeaderInSection(this, sectionIndex);
            if (title == null) return null;

            let header = UITableViewSection.headerWithTitle(title, this.sectionHeaderHeight);

            header.setX(0);
            header.setY(posY);

            section.header = header;
            this.addSubview(header);

            if (row == null) {
                row = this.addRowWithType(UITableViewRowType.SectionHeader, section.header);
            }
            row.view = header;

            if (row.height == 0) {
                row.height = header.getHeight();;
                this.contentHeight += row.height;
            }

            return row.height;
        }

        return 0;
    }

    private addCell(indexPath: MIOIndexPath, posY, row: UITableViewRow, prevRow:UITableViewRow, currentRow?:UITableViewRow) {

        let cell: UITableViewCell = this.dataSource.cellAtIndexPath(this, indexPath);

        if (row != null && row.view != null) return row.height;
        let r = row;
        if (r == null) {
            r = this.addRowWithType(UITableViewRowType.Cell, cell);
        }

        if (currentRow != null && prevRow != null){
            prevRow.nextRow = r;
            currentRow.prevRow = r;
            r.prevRow = prevRow;
            r.nextRow = currentRow;
        }
        else if (currentRow != null){
            r.nextRow = currentRow;
            r.prevRow = currentRow.prevRow;
            currentRow.prevRow = r;
        }
        else if (prevRow != null) {
            r.prevRow = prevRow;
            prevRow.nextRow = r;
        }

        let nodeID = cell.nodeID;
        let node: UITableViewCellNode = this.cellNodesByID[nodeID];
        if (node == null) {
            node = new UITableViewCellNode();
            node.identifier = nodeID;
            this.cellNodesByID[nodeID] = node;
        }

        let section = this.sections[indexPath.section];
        node.section = section;
        section.cells[indexPath.row] = cell;
        section.rows[indexPath.row] = r;

        cell.setX(0);
        cell.setY(posY);
        // TODO: Here we don't have to use the css. Encapsulate that in a Core Layer funciton
        //cell.layer.style.width = "100%";

        if (this.delegate != null && typeof this.delegate.willDisplayCellAtIndexPath === "function") {
            this.delegate.willDisplayCellAtIndexPath(this, cell, indexPath);
        }
        
        if (prevRow == null) {
            this.addSubview(cell);
        }
        else {
            let index = this.contentView.subviews.indexOf(prevRow.view);
            this.addSubview(cell, index)
        }

        r.view = cell;

        cell.setNeedsDisplay();

        //TODO: these are private properties, can not be used from outside
        cell._target = this;
        cell._onClickFn = this.cellOnClickFn;
        cell._onDblClickFn = this.cellOnDblClickFn;
        cell._onAccessoryClickFn = this.cellOnAccessoryClickFn;
        cell._onEditingAccessoryClickFn = this.cellOnEditingAccessoryClickFn;

        let h = this.rowHeight;
        if (this.delegate != null && typeof this.delegate.heightForRowAtIndexPath === "function") {
            h = this.delegate.heightForRowAtIndexPath(this, indexPath);
            if (r.height != h) {
                if (r.height == 0) {
                    this.contentHeight -= this.defaultRowHeight;
                    this.contentHeight += h; 
                }
                else {
                    this.contentHeight -= r.height;
                    this.contentHeight += h;                     
                }
                r.height = h;
            }
        }
        
        if (h > 0) {
            cell.setHeight(h);
        }
        else {
            h = cell.getHeight();
            if (r.height == 0) {
                r.height = h;
                this.contentHeight -= this.defaultRowHeight;
                this.contentHeight += h;
            }
        }

        if (this.delegate != null && typeof this.delegate.editingStyleForRowAtIndexPath === "function") {
            let editingStyle = this.delegate.editingStyleForRowAtIndexPath(this, indexPath);
            cell.setEditingAccessoryType(editingStyle);
        }

        return r.height;
    }

    private addSectionFooter(section: UITableViewSection, posY, row:UITableViewRow) {
        
        if (row != null && row.type != UITableViewRowType.SectionFooter) return 0;
        if (row != null && row.view != null) return row.height;

        let sectionIndex = this.sections.indexOf(section);

        if (typeof this.dataSource.viewForFooterInSection === "function") {
            let view: UIView = this.dataSource.viewForFooterInSection(this, sectionIndex);
            if (view == null) return 0;

            view.setX(0);
            view.setY(posY);

            section.footer = view;
            this.addSubview(view);
            if (row == null) {
                row = this.addRowWithType(UITableViewRowType.SectionFooter, section.footer);
            }
            row.view = view;

            if (row.height == 0) {
                row.height = view.getHeight();
                this.contentHeight += row.height;
            }

            return row.height;
        }

        return 0;
    }

    private addFooter() {
        return 0;
    }

    cellOnClickFn(cell: UITableViewCell) {

        let indexPath: MIOIndexPath = this.indexPathForCell(cell);

        let canSelectCell = true;

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

    }

    cellOnDblClickFn(cell) {

/*        let indexPath: MIOIndexPath = this.indexPathForCell(cell);

        let canSelectCell = true;

        if (this.delegate != null) {
            if (typeof this.delegate.canSelectCellAtIndexPath === "function")
                canSelectCell = this.delegate.canSelectCellAtIndexPath(this, indexPath);
        }

        if (canSelectCell == false)
            return;

        if (this.delegate != null) {
            if (typeof this.delegate.didMakeDoubleClick === "function")
                this.delegate.didMakeDoubleClick(this, indexPath);
        }

        if (this.selectedIndexPath.isEqualToIndexPath(indexPath) == false) {

            if (this.allowsMultipleSelection == false) {
                if (this.selectedIndexPath != null)
                    this.deselectCellAtIndexPath(this.selectedIndexPath);
            }

            this.selectedIndexPath = indexPath;
            cell.selected = true;            
        }

        if (this.delegate != null) {
            if (typeof this.delegate.didSelectCellAtIndexPath === "function")
                this.delegate.didSelectCellAtIndexPath(this, indexPath);
        }*/
    }

    cellOnAccessoryClickFn(cell:UITableViewCell) {
        if (cell.accessoryType != UITableViewCellAccessoryType.None) return;

        let indexPath: MIOIndexPath = this.indexPathForCell(cell);
        if (this.delegate != null && typeof this.delegate.accessoryButtonTappedForRowWithIndexPath === "function") {
            this.delegate.accessoryButtonTappedForRowWithIndexPath(this, indexPath);
        }
    }

    cellOnEditingAccessoryClickFn(cell:UITableViewCell) {
        let indexPath: MIOIndexPath = this.indexPathForCell(cell);

        if (this.delegate != null && typeof this.delegate.editingStyleForRowAtIndexPath === "function") {
            let editingStyle = this.delegate.editingStyleForRowAtIndexPath(this, indexPath);
        
            if (this.delegate != null && typeof this.delegate.commitEditingStyleForRowAtIndexPath === "function") {
                this.delegate.commitEditingStyleForRowAtIndexPath(this, editingStyle, indexPath);
            }
        }
    }


    cellAtIndexPath(indexPath: MIOIndexPath) {

        let s = this.sections[indexPath.section];
        let c = s.cells[indexPath.row];

        return c;
    }

    indexPathForCell(cell: UITableViewCell): MIOIndexPath {

        let node: UITableViewCellNode = this.cellNodesByID[cell.nodeID];
        if (node == null) return null;

        let section = node.section;
        let sectionIndex = this.sections.indexOf(section);

        let rowIndex = section.cells.indexOf(cell);

        return MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
    }

    selectCellAtIndexPath(indexPath: MIOIndexPath) {

        if (this.selectedIndexPath != null && this.selectedIndexPath.isEqualToIndexPath(indexPath) == true) return;

        //if (this.selectedIndexPath != null) this.deselectCellAtIndexPath(this.selectedIndexPath);
        //this.selectedIndexPath = indexPath;

        let cell = this.sections[indexPath.section].cells[indexPath.row];
        if (cell != null) cell.selected = true;
    }

    deselectCellAtIndexPath(indexPath: MIOIndexPath) {

        if (this.selectedIndexPath == null) return;
        if (this.selectedIndexPath.isEqualToIndexPath(indexPath) == false) return;

        //this.selectedIndexPath = null;
        let cell = this.sections[indexPath.section].cells[indexPath.row];
        if (cell != null) cell.selected = false;
    }

    observeValueForKeyPath(keyPath:string, type:string, object, ctx) {
        if (type != "did") return;
        if (keyPath == "selected") {
            let cell = object as UITableViewCell;
            let indexPath = this.indexPathForCell(object);
            if (cell.selected == false && this.selectedIndexPath != null && this.selectedIndexPath.isEqualToIndexPath(indexPath) == true) {                
                this.selectedIndexPath = null;
            }
            else if (cell.selected == true){
                //TODO: Support multiple selection
                if (this.selectedIndexPath != null && this.selectedIndexPath.isEqualToIndexPath(indexPath) == false){
                    let oldCell = this.cellAtIndexPath(this.selectedIndexPath);
                    if (oldCell != null) oldCell.selected = false;
                }
                if (this.reloadingData == true) this.selectedCellWhileReloadingData = cell;
                this.selectedIndexPath = indexPath;
            }                                            
        }
    }


    insertRowsAtIndexPaths(indexPaths, animation:UITableViewRowAnimation){
               
        let rows = indexPaths.count;
        this.rowsCount += rows;
        this.contentHeight += rows * this.defaultRowHeight;

        let maxY = this.contentOffset.y + this.getHeight() + (this.defaultRowHeight * 4);

        for (let index = 0; index < rows; index++){
            let ip = indexPaths[index];

            this.insertCellWithIndexPath(ip);

            // if (posY >= maxY) {
            //     break;
            // }      
            
            this.lastIndexPath = ip;
        }

        //this.visibleRange = new MIORange(start, nextRow - start);
                
        let size = new MIOSize(0, this.contentHeight);
        this.contentSize = size;
    }

    private insertCellWithIndexPath(indexPath:MIOIndexPath){
        let section = this.sections[indexPath.section];        
        let prevRow = this.prevCellRowAtIndexPath(indexPath);

        let posY = 0;
        if (prevRow == null) {
            this.addCell(indexPath, posY, null, null);
        }
        else {            
            posY = prevRow.view.getY() + prevRow.view.getHeight();
            posY += this.addCell(indexPath, posY, null, prevRow, prevRow.nextRow);
        }

        // recalculate top of the cells
        if (prevRow == null) return;

        let nextRow = prevRow.nextRow.nextRow;
        while(nextRow != null) {
            nextRow.view.setY(posY);
            posY += nextRow.view.getHeight();
            nextRow = nextRow.nextRow;
        }
    }

    private prevIndexPath(indexPath:MIOIndexPath){
        let sectionIndex = indexPath.section;
        let rowIndex = indexPath.row - 1;

        if (rowIndex > -1) {
            return MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);            
        }
        else {
            sectionIndex--;
            if (sectionIndex > -1) {
                let section = this.sections[sectionIndex];
                rowIndex = section.cells.length - 1;

                return MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
            }
        }

        return null;
    }

    private prevCellRowAtIndexPath(indexPath:MIOIndexPath){
        if (indexPath == null) return null;

        let ip = this.prevIndexPath(indexPath);
        if (ip == null) return null;

        let section = this.sections[ip.section];
        let row = section.rows[ip.row];

        return row;
    }

    deleteRowsAtIndexPaths(indexPaths, animation:UITableViewRowAnimation){

    }

    moveRowAtIndexPathToIndexPath(indexPath:MIOIndexPath, newIndexPat:MIOIndexPath){

    }

    selectNextIndexPath() {

        var sectionIndex = 0;
        var rowIndex = 0;

        if (this.selectedIndexPath != null) {
            sectionIndex = this.selectedIndexPath.section;
            rowIndex = this.selectedIndexPath.row;    

            let ip = MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
            this.deselectCellAtIndexPath(ip);
            rowIndex++;                
        }

        if (this.sections.length == 0) return;

        var section = this.sections[sectionIndex];
        if (rowIndex < section.cells.length) {
            let ip = MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
            this.selectCellAtIndexPath(ip);
        }
        else {
            rowIndex = 0;
            sectionIndex++;
            if (sectionIndex < this.sections.length) {
                let ip = MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
                this.selectCellAtIndexPath(ip);
            }
        }
    }

    selectPrevIndexPath() {

        if (this.selectedIndexPath == null) return;

        var sectionIndex = this.selectedIndexPath.section;
        var rowIndex = this.selectedIndexPath.row - 1;

        if (rowIndex > -1) {
            let ip = MIOIndexPath.indexForRowInSection(rowIndex + 1, sectionIndex);
            this.deselectCellAtIndexPath(ip);
            let ip2 = MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
            this.selectCellAtIndexPath(ip2);
        }
        else {
            sectionIndex--;
            if (sectionIndex > -1) {
                let ip = MIOIndexPath.indexForRowInSection(rowIndex + 1, sectionIndex + 1);
                this.deselectCellAtIndexPath(ip);

                var section = this.sections[sectionIndex];
                rowIndex = section.cells.length - 1;

                let ip2 = MIOIndexPath.indexForRowInSection(rowIndex, sectionIndex);
                this.selectCellAtIndexPath(ip2);
            }
        }
    }

}





export enum UITableViewCellStyle {

    Custom,
    Default
}

export enum UITableViewCellAccessoryType {

    None,
    DisclosureIndicator,
    DetailDisclosureButton,
    Checkmark
}

export enum UITableViewCellEditingStyle {

    None,
    Delete,
    Insert
}

export enum UITableViewCellSeparatorStyle {

    None,
    SingleLine,
    SingleLineEtched // TODO 
}

export enum UITableViewCellSelectionStyle {

    None,
    Default
}

export class UITableViewCell extends UIView {

    reuseIdentifier: string = null;

    nodeID: string = null;

    contentView: UIView = null;
    style = UITableViewCellStyle.Custom;

    textLabel = null;
    
    accessoryView:UIView = null;
    separatorStyle = UITableViewCellSeparatorStyle.SingleLine;

    private _editing = false;
    editingAccessoryView: UIView = null;

    selectionStyle = UITableViewCellSelectionStyle.Default;
    private _selected = false;

    _target = null;
    _onClickFn = null;
    _onDblClickFn = null;
    _onAccessoryClickFn = null;
    _onEditingAccessoryClickFn = null;

    _section = null;

    initWithStyle(style: UITableViewCellStyle) {

        super.init();
        this.style = style;

        if (style == UITableViewCellStyle.Default) {
            this.textLabel = new UILabel();
            this.textLabel.init();
            this.textLabel.layer.style.top = "";
            this.textLabel.layer.style.left = "";
            this.textLabel.layer.style.width = "";
            this.textLabel.layer.style.height = "";
            this.textLabel.layer.classList.add("tableviewcell_default_textlabel");
            this.addSubview(this.textLabel);
            this.layer.style.height = "44px";

            UICoreLayerAddStyle(this.layer, "cell");
        }

        this._setupLayer();
    }

    initWithLayer(layer, owner, options?) {
        super.initWithLayer(layer, owner, options);

        this.scanLayerNodes(layer, owner);

        this._setupLayer();
    }

    private scanLayerNodes(layer, owner) {

        if (layer.childNodes.length == 0) return;

        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];

                if (subLayer.tagName != "DIV")
                    continue;

                this.scanLayerNodes(subLayer, owner);

                if (subLayer.getAttribute("data-accessory-type") != null) {
                    this.addAccessoryView(subLayer, owner);
                }

                if (subLayer.getAttribute("data-editing-accessory-view") != null) {
                    this.addEditingAccessoryView(subLayer, owner);
                }
            }
        }

    }

    //data-accessory-type="checkmark"

    private addAccessoryView(layer, owner) {

        let type = layer.getAttribute("data-accessory-type");

        this.accessoryView = new UIView();
        this.accessoryView.initWithLayer(layer, owner);

        if (type == "checkmark") this.accessoryType = UITableViewCellAccessoryType.Checkmark;
        else this.accessoryType = UITableViewCellAccessoryType.None;

        if (this.accessoryType != UITableViewCellAccessoryType.None) return;
        
        this.accessoryView.layer.addEventListener("click", this.accessoryViewDidClick.bind(this));
    }

    private accessoryViewDidClick(e:Event){
        e.stopPropagation();
        this._onAccessoryClickFn.call(this._target, this);
    }

    private editingAccessoryInsertView:UIView = null;
    private editingAccessoryDeleteView:UIView = null;
    private addEditingAccessoryView(layer, owner) {

        let type = layer.getAttribute("data-editing-accessory-view");
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
            this.editingAccessoryView = new UIView();
            this.editingAccessoryView.initWithLayer(layer, owner);    

            this.editingAccessoryView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }

        // // TODO: Change for a gesuture recongnizer or something independent of the html
        // let instance = this;
        // this.editingAccessoryView.layer.onclick = function (e) {
        //     if (instance._onAccessoryClickFn != null) {
        //         e.stopPropagation();
        //         instance._onAccessoryClickFn.call(instance._target, instance);
        //     }
        // };
    }

    private _editingAccessoryType = UITableViewCellEditingStyle.None;

    get editingAccessoryType(){ return this._editingAccessoryType;}
    set editingAccessoryType(value:UITableViewCellEditingStyle){
        this.setEditingAccessoryType(value);
    }

    setEditingAccessoryType(value:UITableViewCellEditingStyle){
        this._editingAccessoryType = value;

        // Reset
        if (this.editingAccessoryDeleteView != null) this.editingAccessoryDeleteView.setHidden(true);
        if (this.editingAccessoryInsertView != null) this.editingAccessoryInsertView.setHidden(true);
        if (this.editingAccessoryView != null) this.editingAccessoryView.setHidden(true);

        // Set the view type
        if (value == UITableViewCellEditingStyle.Insert && this.editingAccessoryInsertView != null) {
            this.editingAccessoryView = this.editingAccessoryInsertView;
            this.editingAccessoryInsertView.setHidden(false);            
        } 
        else if (value == UITableViewCellEditingStyle.Delete && this.editingAccessoryDeleteView != null) {
            this.editingAccessoryView = this.editingAccessoryDeleteView;
            this.editingAccessoryDeleteView.setHidden(false);            
        } 
    }

    private editingAccessoryViewDidClick(e:Event){
        e.stopPropagation();
        this._onEditingAccessoryClickFn.call(this._target, this);
    }

    private _setupLayer() {
        //this.layer.style.position = "absolute";        

        let instance = this;
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
    }

    private _accessoryType:UITableViewCellAccessoryType = UITableViewCellAccessoryType.None;
    get accessoryType() {return this._accessoryType;}
    set accessoryType(value:UITableViewCellAccessoryType){
        this.setAccessoryType(value);
    }

    setAccessoryType(type) {
        if (type == this._accessoryType)
            return;

        if (this.accessoryView == null) {
            if (this.style == UITableViewCellStyle.Default) this.textLabel.layer.style.right = "25px";

            let layer = document.createElement("div");
            layer.style.position = "absolute";
            layer.style.top = "15px";
            layer.style.right = "5px";
            layer.style.width = "15px";
            layer.style.height = "15px";

            this.accessoryView = new UIView("accessory_view");
            this.accessoryView.initWithLayer(layer, null);

            this.addSubview(this.accessoryView);
        }

        // if (type == UITableViewCellAccessoryType.None) this.accessoryView.setHidden(true);
        // else this.accessoryView.setHidden(false);

        if (type == UITableViewCellAccessoryType.None) UICoreLayerRemoveStyle(this.layer, "checked");
        else UICoreLayerAddStyle(this.layer, "checked");

        this._accessoryType = type;
    }

    setPaddingIndex(value) {

        var offset = (value + 1) * 10;
        if (this.style == UITableViewCellStyle.Default) this.textLabel.setX(offset);
    }

    setHeight(h) {
        super.setHeight(h);

        var offsetY = (h - 15) / 2;

        if (this.accessoryView != null) {
            this.accessoryView.layer.style.top = offsetY + "px";
        }
    }

    setSelected(value) {
        if (this._selected == value) return;

        // WORKAORUND
        //let fix = this.layer.getClientRects();
        // WORKAORUND

        this.willChangeValue("selected");
        this._selected = value;
        if (this.selectionStyle == UITableViewCellSelectionStyle.Default) {
            if (value == true)
                UICoreLayerAddStyle(this.layer, "selected");
            else 
                UICoreLayerRemoveStyle(this.layer, "selected");
        }
        
        this.didChangeValue("selected"); 
    }

    set selected(value) {
        this.setSelected(value);
    }

    get selected() {
        return this._selected;
    }

    _setHightlightedSubviews(value) {
        for (var count = 0; count < this.subviews.length; count++) {
            var v = this.subviews[count];
            if (v instanceof UILabel)
                v.setHightlighted(value);
        }
        if (this.accessoryView == null) return;

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
    }

    setEditing(editing, animated?) {

        if (editing == this._editing) return;

        this._editing = editing;

        if (this.editingAccessoryView != null) {
            this.editingAccessoryView.setHidden(!editing);
        }
    }

    set editing(value: boolean) {
        this.setEditing(value, false);
    }

    get isEditing(): boolean {
        return this._editing;
    }
}


export class UITableViewController extends UIViewController
{

}





export class UINavigationBar extends UIView
{
    init(){
        super.init();
        this.setup();
    }

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);
        this.setup();
    }

    private setup(){
        MUICoreLayerAddStyle(this.layer, "navbar");
    }

    private _items = [];
    get items(){return this._items;}
    setItems(items, animated){        
        this._items = items;

        //TODO: Animate!!!
    }    
    
    pushNavigationItem(item:UINavigationItem, animated){
        this.items.addObject(item);
        // TODO: Make the animation and change the items
    }

    popNavigationItem(item:UINavigationItem, animated) {
        this.items.removeObject(item);
        // TODO: Make the animation and change the items
    }

    get topItem(){
        if (this.items.length == 0) return null;
        return this.items[this.items.length - 1];
    }

    get backItem(){
        if (this.items.length < 2) return null;
        return this.items[this.items.length - 2];
    }
}





export class UINavigationItem extends NSObject
{    
    backBarButtonItem:UIButton = null;
    titleView:UIView = null;
    title:string = null;

    private leftView:UIView = null;    
    private rightView:UIView = null;
    
    initWithLayer(layer){
        if (layer.childNodes.length > 0) {
            for (let index = 0; index < layer.childNodes.length; index++) {
                let subLayer = layer.childNodes[index];
        
                if (subLayer.tagName != "DIV") continue;
    
                if (subLayer.getAttribute("data-nav-item-left") != null) {
                    let v:UIView = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.leftView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-center") != null) {
                    let v:UIView = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.titleView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-right") != null) {
                    let v:UIView = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.rightView = v;
                }
            }

            let backButtonLayer = MUICoreLayerSearchElementByAttribute(layer, "data-nav-item-back");
            if (backButtonLayer != null) {
                this.backBarButtonItem = new UIButton();
                this.backBarButtonItem.initWithLayer(backButtonLayer, this);
            }
        }
    }
}

export function UINavItemSearchInLayer(layer)
{
    if (layer.childNodes.length > 0) {
        for (let index = 0; index < layer.childNodes.length; index++) {
            let subLayer = layer.childNodes[index];
    
            if (subLayer.tagName != "DIV") continue;

            if (subLayer.getAttribute("data-nav-item") != null) {
                let ni = new UINavigationItem();
                ni.initWithLayer(subLayer);  
                
                // Check for tittle if center view doesn't exists
                if (ni.titleView == null) {
                    let title = subLayer.getAttribute("data-nav-item-title");
                    if (title != null) ni.title = title;
                }

                return ni;             
            }
        }
    }

    return null;
 }












/**
 * Created by godshadow on 9/4/16.
 */

export class UINavigationController extends UIViewController
{
    rootViewController = null;
    viewControllersStack = [];
    currentViewControllerIndex = -1;

    init(){
        super.init();
        this.view.layer.style.overflow = "hidden";        
    }

    initWithRootViewController(vc:UIViewController){
        this.init();
        this.setRootViewController(vc);
    }

    setRootViewController(vc:UIViewController){
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
    }

    viewWillAppear(animated?:boolean){
        if (this.currentViewControllerIndex < 0) return;
        let vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewWillAppear(animated);
    }

    viewDidAppear(animated?){
        if (this.currentViewControllerIndex < 0) return;
        let vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewDidAppear(animated);
    }

    viewWillDisappear(animated?){
        if (this.currentViewControllerIndex < 0) return;
        let vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewWillDisappear(animated);
    }

    viewDidDisappear(animated?){
        if (this.currentViewControllerIndex < 0) return;
        let vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewDidDisappear(animated);
    }

    pushViewController(vc:UIViewController, animated?:boolean){
        let lastVC = this.viewControllersStack[this.currentViewControllerIndex];

        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex++;

        vc.navigationController = this;

        vc.onLoadView(this, function () {

            if (vc.navigationItem != null && vc.navigationItem.backBarButtonItem != null) {
                vc.navigationItem.backBarButtonItem.addTarget(this, function(){
                    vc.navigationController.popViewController();
                }, UIControlEvents.AllTouchEvents);
            }

            this.view.addSubview(vc.view);
            this.addChildViewController(vc);

            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;

            _MUIShowViewController(lastVC, vc, this, animated);
        });
    }

    popViewController(animated?:boolean){
        if (this.currentViewControllerIndex == 0)
            return;

        let fromVC = this.viewControllersStack[this.currentViewControllerIndex];

        this.currentViewControllerIndex--;
        this.viewControllersStack.pop();

        let toVC = this.viewControllersStack[this.currentViewControllerIndex];

        // if (toVC.transitioningDelegate == null)
        //     toVC.transitioningDelegate = this;

        if (toVC.preferredContentSize != null)
            this.contentSize = toVC.preferredContentSize;

        _MUIHideViewController(fromVC, toVC, this, this, function () {
            fromVC.removeChildViewController(this);
            fromVC.view.removeFromSuperview();
        });
    }

    popToRootViewController(animated?:boolean){
        if(this.viewControllersStack.length == 1) return;
        
        let currentVC = this.viewControllersStack.pop();

        for(let index = this.currentViewControllerIndex - 1; index > 0; index--){
            let vc = this.viewControllersStack.pop();
            vc.view.removeFromSuperview();
            this.removeChildViewController(vc);
        }

        this.currentViewControllerIndex = 0;
        let rootVC = this.viewControllersStack[0];

        this.contentSize = rootVC.preferredContentSize;

        _MUIHideViewController(currentVC, rootVC, this, this, function () {
            currentVC.view.removeFromSuperview();
            this.removeChildViewController(currentVC);
        });
    }

    public set preferredContentSize(size) {
        this.setPreferredContentSize(size);
    }

    public get preferredContentSize(){
        if (this.currentViewControllerIndex < 0) return this._preferredContentSize;
        let vc = this.viewControllersStack[this.currentViewControllerIndex];
        return vc.preferredContentSize;
    }


    // Segues

    _checkSegues() {
        super._checkSegues();

        for (let index = 0; index < this._segues.length; index++) {

            let s = this._segues[index];
            let kind = s["Kind"];
            
            if (kind == "relationship") {
                let destination = s["Destination"];
                let relationship = s["Relationship"];

                if (relationship == "rootViewController") {                                    
                    let vc = this.storyboard._instantiateViewControllerWithDestination(destination);
                    this.setRootViewController(vc);
                }
            }    
        }

    }

    // Transitioning delegate
    private _pushAnimationController = null;
    private _popAnimationController = null;

    animationControllerForPresentedController(presentedViewController, presentingViewController, sourceController){
        if (this._pushAnimationController == null) {

            this._pushAnimationController = new MUIPushAnimationController();
            this._pushAnimationController.init();
        }

        return this._pushAnimationController;
    }

    animationControllerForDismissedController(dismissedController)
    {
        if (this._popAnimationController == null) {

            this._popAnimationController = new MUIPopAnimationController();
            this._popAnimationController.init();
        }

        return this._popAnimationController;
    }
}

/*
    ANIMATIONS
 */

export class MUIPushAnimationController extends NSObject
{
    transitionDuration(transitionContext){
        return 0.25;
    }

    animateTransition(transitionContext){
        // make view configurations before transitions       
    }

    animationEnded(transitionCompleted){
        // make view configurations after transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        let animations = MUIClassListForAnimationType(MUIAnimationType.Push);
        return animations;
    }

}

export class MUIPopAnimationController extends NSObject
{
    transitionDuration(transitionContext){
        return 0.25;
    }

    animateTransition(transitionContext){
        // make view configurations after transitions
    }

    animationEnded(transitionCompleted){
        // make view configurations before transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        let animations = MUIClassListForAnimationType(MUIAnimationType.Pop);
        return animations;
    }

}










/**
 * Created by godshadow on 05/08/16.
 */

export enum UISplitViewControllerDisplayMode
{
    Automatic,
    PrimaryHidden,
    AllVisible,
    PrimaryOverlay
}

export class UISplitViewController extends UIViewController
{
    private masterView:UIView = null;
    private detailView:UIView = null;

    preferredDisplayMode = UISplitViewControllerDisplayMode.Automatic;
    
    init(){
        super.init();

        this.masterView = new UIView();
        this.masterView.init();
        if (MIOCoreIsPhone() == false) MUICoreLayerAddStyle(this.masterView.layer, "master-view");
        this.view.addSubview(this.masterView);

        if (MIOCoreIsPhone() == false) {
            this.detailView = new UIView();
            this.detailView.init();
            MUICoreLayerAddStyle(this.detailView.layer, "detail-view");        
            this.view.addSubview(this.detailView);
        }
    }
    
    get displayMode():UISplitViewControllerDisplayMode{
        return UISplitViewControllerDisplayMode.Automatic;
    }

    private _displayModeButtonItem:UIButton = null;
    get displayModeButtonItem():UIButton {
        if (this._displayModeButtonItem != null) return this._displayModeButtonItem;

        // this._displayModeButtonItem = new UIButton();
        // this._displayModeButtonItem.initWithAction(this, this.displayModeButtonItemAction);        

        return this._displayModeButtonItem;
    }

    private _collapsed = false;
    get collapsed():boolean{
        return this._collapsed;
    }
    private setCollapsed(value:boolean){
        this.willChangeValue("collapsed");
        this._collapsed = value;
        this.didChangeValue("collapsed");
    }

    private _masterViewController = null;    
    setMasterViewController(vc){
        if (this._masterViewController != null){
            this._masterViewController.view.removeFromSuperview();
            this.removeChildViewController(this._masterViewController);
            this._masterViewController = null;
        }

        if (vc != null){
            vc.parent = this;
            vc.splitViewController = this;

            this.masterView.addSubview(vc.view);
            this.addChildViewController(vc);
            this._masterViewController = vc;
        }
    }

    private _detailViewController = null;
    setDetailViewController(vc){
        if (MIOCoreIsPhone() == true) return;

        if (this._detailViewController != null){
            this._detailViewController.view.removeFromSuperview();
            this.removeChildViewController(this._detailViewController);
            this._detailViewController = null;
        }

        if (vc != null){
            vc.parent = this;
            vc.splitViewController = this;

            this.detailView.addSubview(vc.view);
            this.addChildViewController(vc);
            this._detailViewController = vc;
        }
    }

    showDetailViewController(vc:UIViewController){
        vc.splitViewController = this;
        if (MIOCoreIsPhone() == true) {
            this._pushDetailViewController(vc);
        }
        else {
            this._showDetailViewController(vc);
        }
    }

    get masterViewController():UIViewController{
        return this._masterViewController;
    }

    get detailViewController():UIViewController{
        return this._detailViewController;
    }

    private _showDetailViewController(vc:UIViewController){
        let oldVC = this._detailViewController;
        let newVC = vc;

        if (oldVC == newVC) return;

        newVC.onLoadView(this, function () {

            this.detailView.addSubview(newVC.view);
            this.addChildViewController(newVC);
            this._detailViewController = vc;

            _MUIShowViewController(oldVC, newVC, this, false, this, function () {

                oldVC.view.removeFromSuperview();
                this.removeChildViewController(oldVC);
            });
        });
    }

    private _pushDetailViewController(vc:UIViewController){
        let oldVC = this._masterViewController;

        //if (vc.transitioningDelegate == null) vc.transitioningDelegate = this;

        vc.onLoadView(this, function () {

            this.view.addSubview(vc.view);
            this.addChildViewController(vc);
            this._detailViewController = vc;

            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;

            _MUIShowViewController(oldVC, vc, this, true, this, function(){
                this.setCollapsed(true);
            });
        });
    }

    private _popViewController(){
        let fromVC = this.detailViewController;
        let toVC = this.masterViewController;

        // if (toVC.transitioningDelegate == null)
        //     toVC.transitioningDelegate = this;

        if (toVC.preferredContentSize != null)
            this.contentSize = toVC.preferredContentSize;

        _MUIHideViewController(fromVC, toVC, this, this, function () {
            fromVC.removeChildViewController(this);
            fromVC.view.removeFromSuperview();
        });
    }

    private displayModeButtonItemAction(){
        if (MIOCoreIsPhone() == true) this._popViewController();
    }

    // Transitioning delegate
    private _pushAnimationController = null;
    private _popAnimationController = null;

    animationControllerForPresentedController(presentedViewController, presentingViewController, sourceController){
        if (MIOCoreIsPhone() == false) return;

        if (this._pushAnimationController == null) {
            this._pushAnimationController = new MUIPushAnimationController();
            this._pushAnimationController.init();
        }

        return this._pushAnimationController;
    }

    animationControllerForDismissedController(dismissedController:UIViewController){
        if (MIOCoreIsPhone() == false) return;

        if (this._popAnimationController == null) {
            this._popAnimationController = new MUIPopAnimationController();
            this._popAnimationController.init();
        }

        return this._popAnimationController;
    }
    
}











export function MUIOutletRegister(owner, layerID, c)
{
    owner._outlets[layerID] = c;
}

export function MUIOutletQuery(owner, layerID)
{
    return owner._outlets[layerID];
}

export function MUIOutlet(owner, elementID, className?, options?)
{
    //var layer = document.getElementById(elementID);
    let query = MUIOutletQuery(owner, elementID);
    if (query != null) return query;

    let layer = null;

    if (owner instanceof UIView)
        layer = MUICoreLayerSearchElementByID(owner.layer, elementID);
    else if (owner instanceof UIViewController)
        layer = MUICoreLayerSearchElementByID(owner.view.layer, elementID);

    if (layer == null) return null; // Element not found
        //throw new Error(`DIV identifier specified is not valid (${elementID})`);
        
    if (className == null)
        className = layer.getAttribute("data-class");

    if (className == null)
        className = "UIView";

    let classInstance = NSClassFromString(className);
    classInstance.initWithLayer(layer, owner, options);
    // Track outlets inside view controller (owner)
    MUIOutletRegister(owner, elementID, classInstance);

    if (owner instanceof UIView)
        owner._linkViewToSubview(classInstance);
    else if (owner instanceof UIViewController){

        if (classInstance instanceof UIView){
            owner.view._linkViewToSubview(classInstance);
        }
        else if (classInstance instanceof UIViewController)
            owner.addChildViewController(classInstance);
        else throw new Error("UIOutlet: Wrong type");        
    }

    if (classInstance instanceof UIView)
        classInstance.awakeFromHTML();

    return classInstance;
}

export function MUIWindowSize()
{
    var w = document.body.clientWidth;
    //var h = document.body.clientHeight;window.innerHeight
    var h = window.innerHeight;

    return new NSSize(w, h);
}

export function _MUIShowViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, animated:boolean, target?, completion?)
{
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();

    if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {

        fromVC.viewWillDisappear();
        //fromVC._childControllersWillDisappear();
    }

    let view = null;
    let pc = toVC.presentationController as UIPresentationController;

    if (pc != null) 
        view = pc.presentedView;
    else
        view = toVC.view;

    if (animated == false) {
        _MUIAnimationDidStart(fromVC, toVC, pc, target, completion);
        return;
    }
    
    // Let's go for the animations!!

    let animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = view;
    
    if (pc != null)
        pc.presentationTransitionWillBegin();

    let ac = null;
    if (toVC.transitioningDelegate != null){
        ac = toVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (sourceVC != null && typeof sourceVC.animationControllerForPresentedController === "function"){
        ac = sourceVC.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (pc != null){
        ac = pc.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }

    //view.setNeedsDisplay();

    let layer = view.layer;
            
    _MUIAnimationStart(layer, ac, animationContext, this, function () {
        _MUIAnimationDidStart(fromVC, toVC, pc, target, completion);
    });

}
export function _MUIAnimationDidStart(fromVC:UIViewController, toVC:UIViewController, pc:UIPresentationController, target?, completion?){
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

export function _MUIHideViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, target?, completion?)
{
    if (fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext
        || MIOCoreIsPhone() == true) {

        toVC.viewWillAppear();
        //toVC._childControllersWillAppear();

        //toVC.view.layout();
    }

    fromVC.viewWillDisappear();
    //fromVC._childControllersWillDisappear();

    let view = null;
    let pc = fromVC.presentationController as UIPresentationController;

    if (pc != null)
        view = pc.presentedView;
    else
        view = fromVC.view;

    let ac = null;
    if (fromVC.transitioningDelegate != null){
        ac = fromVC.transitioningDelegate.animationControllerForDismissedController(fromVC);
    }
    else if (sourceVC != null && typeof sourceVC.animationControllerForDismissedController === "function"){
        ac = sourceVC.animationControllerForDismissedController(fromVC);
    }
    else if (pc != null){
        ac = pc.transitioningDelegate.animationControllerForDismissedController(fromVC);
    }

    let animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = view;

    let layer = view.layer;

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

        if (pc != null){
            pc.dismissalTransitionDidEnd(true);
            pc._isPresented = false;
        }

        if (target != null && completion != null)
            completion.call(target);
    });
}

export function _MUITransitionFromViewControllerToViewController(fromVC, toVC, sourceVC, target?, completion?)
{
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();

    fromVC.viewWillDisappear();                
    //fromVC._childControllersWillDisappear();
    
    //toVC.view.layout();

    let ac = null;
    if (toVC.transitioningDelegate != null)
    {
        ac = toVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (sourceVC != null && sourceVC.transitioningDelegate != null)
    {
        ac = sourceVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }

    let animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = toVC;

    let layer = toVC.view.layer;

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

export class UIWindow extends UIView
{
    rootViewController:UIViewController = null;

    private _resizeWindow = false;

    init(){
        super.init();
        MUICoreLayerAddStyle(this.layer, "view");
    }

    initWithRootViewController(vc: UIViewController){
        this.init();        

        this.rootViewController = vc;
        this.addSubview(vc.view);        
    }

    makeKey(){
        UIApplication.sharedInstance().makeKeyWindow(this);
    }

    makeKeyAndVisible(){
        this.makeKey();
        this.setHidden(false);
    }

    layoutSubviews(){
        if (this.rootViewController != null)
            this.rootViewController.view.layoutSubviews();
        else
            super.layoutSubviews();                
    }

    addSubview(view:UIView){
        view._window = this;
        super.addSubview(view);
    }

    protected _addLayerToDOM(){
        if (this._isLayerInDOM == true)
            return;

        if (this.layer == null)
            return;

        document.body.appendChild(this.layer);

        this._isLayerInDOM = true;
    }

    removeFromSuperview(){                
        this._removeLayerFromDOM();
    }

    protected _removeLayerFromDOM(){
        if (this._isLayerInDOM == false)
            return;

        document.body.removeChild(this.layer);
        this._isLayerInDOM = false;
    }

    setHidden(hidden){
        if (hidden == false){
            this._addLayerToDOM();
        }
        else{
            this._removeLayerFromDOM();
        }
    }

    _eventHappendOutsideWindow(){
        this._dismissRootViewController();        
    }

    _becameKeyWindow(){
        
    }

    _resignKeyWindow(){
        this._dismissRootViewController();
    }

    private _dismissRootViewController(){
        if (this.rootViewController.isPresented == true){
            let pc = this.rootViewController.presentationController;
            if (pc instanceof UIPopoverPresentationController)
                this.rootViewController.dismissViewController(true);
        }
    }
}








export class UIStoryboard extends NSObject
{
    private name:string = null;
    private bundle:NSBundle = null;

    private items = null;
    initWithName(name:string, bundle:NSBundle) {
        super.init();
        this.name = name;
        this.bundle = bundle;

        let content = MIOCoreBundleGetAppResource(this.name, "json");
        this.items = JSON.parse(content);
    }

    instantiateInitialViewController():UIViewController {
        let resource = this.items["InitialViewControllerID"];
        if (resource == null) return;

        return this._instantiateViewControllerWithDestination(resource);        
    }

    instantiateViewControllerWithIdentifier(identifier:string):UIViewController {        
        let resource = null; //TODO: Get from main.json
        return this._instantiateViewControllerWithDestination(resource);
    }

    _instantiateViewControllerWithDestination(resource:string):UIViewController {
        let classname = this.items["ClassByID"][resource];
        if (classname == null) return null;

        let vc = NSClassFromString(classname) as UIViewController;        
        vc.initWithResource("layout/" + resource + ".html");
        vc.storyboard = this;

        return vc;
    }
}

export function MUICoreStoryboardParseLayer(layer, object, owner){
    
    // Check outlets and segues
    if (layer.childNodes.length > 0) {
        for (let index = 0; index < layer.childNodes.length; index++) {
            let subLayer = layer.childNodes[index] as HTMLElement;

            if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

            if (subLayer.getAttribute("data-connections") == "true") {
                for (let index2 = 0; index2 < subLayer.childNodes.length; index2++) {
                    let d = subLayer.childNodes[index2] as HTMLElement;
                    if (d.tagName != "DIV") continue;

                    let type = d.getAttribute("data-connection-type");

                    if (type == "outlet") {
                        let prop = d.getAttribute("data-property");
                        let outlet = d.getAttribute("data-outlet");

                        MUICoreStoryboardConnectOutlet(owner, prop, outlet);
                    }
                    else if (type == "segue") {
                        let destination = d.getAttribute("data-segue-destination");
                        let kind = d.getAttribute("data-segue-kind");
                        let relationship = d.getAttribute("data-segue-relationship");
                        let identifier = d.getAttribute("data-segue-identifier");

                        MUICoreStoryboardAddSegue(object, destination, kind, relationship, identifier);
                    }
                }
            }
        }
    }
}

declare function _injectIntoOptional(value:any);

export function MUICoreStoryboardConnectOutlet(owner, property, outletID){
    console.log("prop: " + property + " - outluet: " + outletID);

    let obj = owner._outlets[outletID];
    owner[property] = _injectIntoOptional(obj);
}


export function MUICoreStoryboardAddSegue(owner, destination:string, kind:string, relationship:string, identifier:string) {        
    let s = {};
    s["Destination"] = destination;
    s["Kind"] = kind;
    if (identifier != null) s["Identifier"] = identifier;
    if (relationship != null) s["Relationship"] = relationship;
    owner._segues.push(s);
}



export class UIStoryboardSegue extends NSObject
{
    identifier:string = null;
    source:UIViewController = null;
    destination:UIViewController = null;

    initWithIdentifier(identifier:string, source:UIViewController, destination:UIViewController){
        super.init();

        this.identifier = identifier;
        this.source = source = source;
        this.destination = destination;        
    }

    private performHandler = null;
    initWithIdentifierAndPerformHandler(identifier:string, source:UIViewController, destination:UIViewController, performHandler:any){
        this.initWithIdentifier(identifier, source, destination);
        this.performHandler = performHandler;
    }

    _sender = null;
    perform(){
        let canPerfom = this.source.shouldPerformSegueWithIdentifier(this.identifier, this._sender);
        if (canPerfom == false) return;

        this.source.prepareForSegue(this, this._sender);
        if (this.performHandler != null) this.performHandler.call(this.source);
    }
}



export class UIResponder extends NSObject
{

}



export interface UIApplicationDelegate {

  window: UIWindow
  applicationDidFinishLaunchingWithOptions(): void
}
















/**
 * Created by godshadow on 11/3/16.
 */


export class UIApplication {

    private static _sharedInstance: UIApplication;

    static sharedInstance(): UIApplication {

        if (UIApplication._sharedInstance == null) {
            UIApplication._sharedInstance = new UIApplication();
        }

        return UIApplication._sharedInstance;
    }

    private constructor() {
        if (UIApplication._sharedInstance != null) {
            throw new Error("UIWebApplication: Instantiation failed: Use sharedInstance() instead of new.");
        }
    }

    delegate: UIApplicationDelegate = null;

    isMobile = false;
    defaultLanguage = null;
    currentLanguage = null;
    languages = null;
    ready = false;

    private downloadCoreFileCount = 0;

    private _sheetViewController = null;
    private _sheetSize = null;
    //private _popUpMenuView = null;
    private _popUpMenu = null;
    private _popUpMenuControl = null;

    private _popOverWindow = null;
    private _popOverWindowFirstClick = false;

    private _popOverViewController = null;

    private _windows = [];
    private _keyWindow:UIWindow = null;
    private _mainWindow = null;

    //TODO: Set language in the webworker also.
    private setLanguage(lang, target, completion){
        let languages = MIOCoreGetLanguages();
        if (languages == null) {
            completion.call(target);
        }

        let url = languages[lang];
        if (url == null){
            completion.call(target);
        }
        
        let request = NSURLRequest.requestWithURL(NSURL.urlWithString(url));
        let con = new NSURLConnection();
        con.initWithRequestBlock(request, this, function(code, data){
            if (code == 200) {
                MIOCoreStringSetLocalizedStrings(JSON.parse(data.replace(/(\r\n|\n|\r)/gm, "")));
            }
            completion.call(target);
        });        
    }

    // Get Languages from the app.plist
    private downloadLanguages(config){
        let langs = config["Languages"];
        if (langs == null) {
            this._run();
        }
        else {
            for (let key in langs) {
                let url = langs[key];
                MIOCoreAddLanguage(key, url);
            }
            let lang = MIOCoreGetPlatformLanguage();
            this.setLanguage(lang, this, function(){
                this._run();
            });                
        }
    }

    run(){
        // Get App.plist
        MIOCoreBundleDownloadResource("app", "plist", this, function(data){
            if (data == null) throw new Error("We couldn't download the app.plist");
                                    
            let config = NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);
            let mainStoryBoardFile = "layout/" + config["UIMainStoryboardFile"];

            // Get Main story board
            if (mainStoryBoardFile != null) {
                MIOCoreBundleDownloadResource(mainStoryBoardFile, "json", this, function(data){
                    this.mainStoryboard = new UIStoryboard();
                    this.mainStoryboard.initWithName(mainStoryBoardFile, null);

                    this.downloadLanguages(config);
                });
            }
            else {
                this.downloadLanguages(config);
            }
        });
    }
    
    private mainStoryboard:UIStoryboard = null;
    private _run() {        

        this.delegate.applicationDidFinishLaunchingWithOptions();        
        this._mainWindow = this.delegate.window;

        if (this._mainWindow == null) {
            let vc = this.mainStoryboard.instantiateInitialViewController();
            this.delegate.window = new UIWindow();
            this.delegate.window.initWithRootViewController(vc);

            this._launchApp()            
            // MUICoreBundleLoadNibName( this.initialResourceURLString, this, function(vc:UIViewController){
            //     this.delegate.window = new UIWindow();
            //     this.delegate.window.initWithRootViewController(vc);
            //     this._launchApp()
            // });
        }
        else this._launchApp();         
    }

    private _launchApp(){
        this.delegate.window.makeKeyAndVisible();

        this.delegate.window.rootViewController.onLoadView(this, function (this: UIApplication) {
            
            this.delegate.window.rootViewController.viewWillAppear(false);
            this.delegate.window.rootViewController.viewDidAppear(false);

            this.ready = true;

            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Click, this, this._clickEvent);
            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Resize, this, this._resizeEvent);
        });

    }

    setLanguageURL(key, url) {
        if (this.languages == null)
            this.languages = {};

        this.languages[key] = url;
    }

    setDefaultLanguage(key) {
        this.defaultLanguage = key;
    }

    downloadLanguage(key, fn) {        
        let url = this.languages[key];

        // Download
        let conn = new NSURLConnection();
        conn.initWithRequestBlock(NSURLRequest.requestWithURL(url), this, function (error, data) {

            if (data != null) {
                let json = JSON.parse(data.replace(/(\r\n|\n|\r)/gm, ""));
                MIOCoreStringSetLocalizedStrings(json);
            }

            fn.call(this);
        });
    }

    showModalViewContoller(vc) {
        let w = new UIWindow();
        w.initWithRootViewController(vc);        

        // Add new window
        document.body.appendChild(vc.view.layer);

        //this.addWindow(w);
    }

    showMenuFromControl(control, menu) {
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
    }

    hideMenu() {
        if (this._popUpMenu != null) {
            this._popUpMenu.removeFromSuperview();
            this._popUpMenu = null;
        }
    }

    private _resizeEvent(event:MUICoreEvent) {        
        this.delegate.window.layoutSubviews();
    }

    private _clickEvent(event:MUICoreEventInput){
        var target = event.coreEvent.target;
        var x = event.x;
        var y = event.y;
    
        // Checking popup menus
        if (this._popUpMenu != null) {
            let controlRect = this._popUpMenuControl.layer.getBoundingClientRect();

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
            let controlRect = this._keyWindow.layer.getBoundingClientRect();

            //console.log("x: " + controlRect.left + " mx: " + x);

            if ((x > controlRect.left && x < controlRect.right)
                && (y > controlRect.top && y < controlRect.bottom)) {
                //Nothing. Forward the event
            }
            else
                this._keyWindow._eventHappendOutsideWindow();
        }
    }

    setPopOverViewController(vc) {
        if (this._popOverViewController != null)
            this._popOverViewController.dismissViewController(true);

        this._popOverViewController = vc;
    }

    showPopOverControllerFromRect(vc, frame) {
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
    }

    hidePopOverController() {
        this._popOverWindow.rootViewController.viewWillDisappear(true);
        this._popOverWindow.removeFromSuperview();
        this._popOverWindow.rootViewController.viewDidDisappear(true);

        this._popOverWindow = null;
    }
    
    // addWindow(window:UIWindow){
    //     this._windows.push(window);
    // }

    private windowZIndexOffset = 0;
    makeKeyWindow(window:UIWindow){
        if (this._keyWindow === window) return;

        if (this._keyWindow != null) {
            this._keyWindow._resignKeyWindow();
            //this.windowZIndexOffset -= 10;
        }                    

        //this.addWindow(window);
        this._keyWindow = window;

        //window.layer.style.zIndex = this.windowZIndexOffset;
        //this.windowZIndexOffset += 10;

    }
}
