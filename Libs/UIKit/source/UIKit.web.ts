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

    let obj = this._outlets[outletID];
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
