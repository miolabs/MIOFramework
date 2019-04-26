import { NSObject } from "mio-foundation-web";
import { MIOCoreBundleGetMainURLString } from "mio-foundation-web"
import { NSObject, NSSize, NSLocalizeString, MIOCoreIsPhone } from "mio-foundation-web";
import { NSBundle } from "mio-foundation-web";
import { NSCoder } from "mio-foundation-web";
import { NSClassFromString, NSSize, MIOCoreIsPhone } from "mio-foundation-web";
import { NSURLRequest } from "mio-foundation-web";
import { NSURLConnection } from "mio-foundation-web";
import { NSPropertyListSerialization } from "mio-foundation-web";
import { NSURL } from "mio-foundation-web";
import { MIOCoreGetLanguages } from "mio-foundation-web";
import { MIOCoreAddLanguage } from "mio-foundation-web";
import { MIOCoreGetPlatformLanguage } from "mio-foundation-web";
import { MIOCoreBundleSetAppResource } from "mio-foundation-web";
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
export function UIClassListForAnimationType(type)
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




export function MUICoreBundleLoadNibName(name:string, target, completion){

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







/**
 * Created by godshadow on 11/3/16.
 */


function MUICoreViewSearchViewTag(view, tag){
    if (view.tag == tag) return view;

    for (let index = 0; index < view.subviews.length; index++){
        let v:UIView = view.subviews[index];
        v = MUICoreViewSearchViewTag(v, tag);
        if (v != null) return v;        
    }

    return null;
}


export class UIView extends NSObject
{
    layerID = null;
    layer = null;
    layerOptions = null;    
    alpha = 1;
    tag:number = 0;

    private _parent:UIView = null;
    set parent(view){this.setParent(view);}
    get parent():UIView {return this._parent;}


    protected _viewIsVisible = false;
    protected _needDisplay = true;
    _isLayerInDOM = false;

    protected _subviews = [];
    get subviews(){
        return this._subviews;
    }

    _window:UIWindow = null;

    _outlets = {};

    constructor(layerID?){
        super();
        this.layerID = layerID ? layerID : UICoreLayerIDFromObject(this);
    }

    init(){
        this.layer = UICoreLayerCreate(this.layerID);        
        //UICoreLayerAddStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "view");
        //this.layer.style.position = "absolute";
        // this.layer.style.top = "0px";
        // this.layer.style.left = "0px";
        //this.layer.style.width = "100%";
        //this.layer.style.height = "100%";
        //this.layer.style.background = "rgb(255, 255, 255)";                
    }

    initWithFrame(frame:MIORect){
        this.layer = UICoreLayerCreate(this.layerID);
        this.layer.style.position = "absolute";
        this.setX(frame.origin.x);
        this.setY(frame.origin.y);
        this.setWidth(frame.size.width);
        this.setHeight(frame.size.height);
    }

    initWithLayer(layer, owner, options?){
        this.layer = layer;
        this.layerOptions = options;
        
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
                
                let sv = MIOClassFromString(className);
                sv.initWithLayer(subLayer, this); 
                this._linkViewToSubview(sv);            
            }
        }

    }

    copy() {
        let objLayer = this.layer.cloneNode(true);
        
        let className = this.getClassName();
        MIOLog("UIView:copy:Copying class name " + className);
        if (className == null) throw Error("UIView:copy: Error classname is null");
        
        let view = MIOClassFromString(className);
        view.initWithLayer(objLayer, null);   

        return view;
    }

    awakeFromHTML(){}

    setParent(view:UIView){
        this.willChangeValue("parent");
        this._parent = view;
        this.didChangeValue("parent");
    }

    addSubLayer(layer){
        this.layer.innerHTML = layer.innerHTML;
    }

    _linkViewToSubview(view)
    {
        if ((view instanceof UIView) == false) throw new Error("_linkViewToSubview: Trying to add an object that is not a view");
        
        this.subviews.push(view);
    }

    addSubview(view, index?)
    {
        if ((view instanceof UIView) == false) throw new Error("addSubview: Trying to add an object that is not a view");

        view.setParent(this);

        if (index == null)
            this.subviews.push(view);
        else 
            this.subviews.splice(index, 0, view);

        view._addLayerToDOM(index);
        view.setNeedsDisplay();
    }

    insertSubviewAboveSubview(view:UIView, siblingSubview:UIView){
        view.setParent(this);
        let index = this.subviews.indexOf(siblingSubview);        
        this.subviews.splice(index, 0, view);
        this.addLayerBeforeLayer(view.layer, siblingSubview.layer);
        view.setNeedsDisplay();
    }

    private addLayerBeforeLayer(newLayer, layer){
        if (newLayer._isLayerInDOM == true) return;
        if (layer == null || newLayer == null) return;
        this.layer.insertBefore(newLayer, layer);
        newLayer._isLayerInDOM = true;
    }

    protected _addLayerToDOM(index?){
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

    removeFromSuperview(){
        if (this.parent == null) return;

        let subviews = this.parent._subviews;
        var index = subviews.indexOf(this);
        subviews.splice(index, 1);

        if (this._isLayerInDOM == false) return;

        this.parent.layer.removeChild(this.layer);
        this._isLayerInDOM = false;
    }

    protected _removeLayerFromDOM(){
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

    setViewIsVisible(value:boolean){

        this._viewIsVisible = true;
        for(var index = 0; index < this.subviews.length; index++){
            var v = this.subviews[index];
            v.setViewIsVisible(value);
        }
    }

    viewWithTag(tag):UIView{
        // TODO: Use also the view tag component
        let view = MIOViewSearchViewTag(this, tag);
        return view;
    }

    layoutSubviews(){
                
        for(var index = 0; index < this.subviews.length; index++)
        {
            var v = this.subviews[index];
            if ((v instanceof UIView) == false) throw new Error("layout: Trying to layout an object that is not a view");
            v.setNeedsDisplay();
        }
    }

    setNeedsDisplay(){
        this._needDisplay = true;

        if (this._viewIsVisible == false) return;
        if (this.hidden == true) return;
        
        this._needDisplay = false;
        this.layoutSubviews();

        for(var index = 0; index < this.subviews.length; index++){
            let v = this.subviews[index];
            if (!(v instanceof UIView)){
                console.log("ERROR: trying to call setNeedsDisplay: in object that it's not a view");
            }
            else
                v.setNeedsDisplay();
        }        
    }

    layerWithItemID(itemID){
        return UILayerSearchElementByID(this.layer, itemID);
    }

    private _hidden:boolean = false;
    setHidden(hidden:boolean){
        this._hidden = hidden;

        if (this.layer == null)
            return;

        if (hidden)
            this.layer.style.display = "none";
        else
            this.layer.style.display = "";
    }

    get hidden():boolean{
        return this._hidden;
    }

    set hidden(value:boolean){
        this.setHidden(value);
    }

    setBackgroundColor(color){
        this.layer.style.backgroundColor = "#" + color;
    }

    setBackgroundRGBColor(r, g, b, a?){
        if (a == null)
        {
            let value = "rgb(" + r + ", " + g + ", " + b + ")";
            this.layer.style.backgroundColor = value;
        }
        else
        {
            let value = "rgba(" + r + ", " + g + ", " + b + ", " + a +")";
            this.layer.style.backgroundColor = value;
        }
    }

    getBackgroundColor()
    {
        var cs = document.defaultView.getComputedStyle(this.layer, null);
        var bg = cs.getPropertyValue('background-color');

        return bg;
    }

    setAlpha(alpha){
        this.willChangeValue("alpha");
        this.alpha = alpha;
        this.didChangeValue("alpha");
        
        if (UIView.animationsChanges != null) {
            let animation = {"View" : this, "Key" : "opacity", "EndValue": alpha};
            UIView.animationsChanges.addObject(animation);
        }        
        else {            
            this.layer.style.opacity = alpha;
        }        
    }

    private x = 0;
    setX(x){
        this.willChangeValue("frame");
        this.x = x;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = {"View" : this, "Key" : "left", "EndValue": x + "px"};
            UIView.animationsChanges.addObject(animation);
        }        
        else {            
            this.layer.style.left = x + "px";
        }        
    }

    getX(){        
        let x = this._getIntValueFromCSSProperty("left");
        return x;
    }

    private y = 0;
    setY(y){
        this.willChangeValue("frame");
        this.y = y;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = {"View" : this, "Key" : "top", "EndValue": y + "px"};
            UIView.animationsChanges.addObject(animation);
        }        
        else {            
            this.layer.style.top = y + "px";
        }                
    }

    getY(){        
        let y = this._getIntValueFromCSSProperty("top");
        return y;
    }

    private width = 0;
    setWidth(w){
        this.willChangeValue("frame");
        this.width = w;
        this.didChangeValue("frame");

        if (UIView.animationsChanges != null) {
            let animation = {"View" : this, "Key" : "width", "EndValue": w + "px"};
            UIView.animationsChanges.addObject(animation);
        }        
        else {            
            this.layer.style.width = w + "px";
        }                        
    }

    getWidth(){        
        let w1 = this.layer.clientWidth;
        let w2 = this._getIntValueFromCSSProperty("width");
        let w = Math.max(w1, w2);
        if (isNaN(w)) w = 0;
        return w;
    }
    
    private height = 0;
    setHeight(height){
        this.willChangeValue("height");        
        this.height = height;
        this.didChangeValue("height");

        if (UIView.animationsChanges != null) {
            let animation = {"View" : this, "Key" : "height", "EndValue": height + "px"};
            UIView.animationsChanges.addObject(animation);
        }        
        else {            
            this.layer.style.height = height + "px";
        }        
    }
    
    getHeight(){
        let h = this.height;
        if (h == 0) h = this.layer.clientHeight;
        else {
            if (h == 0) h = this.layer.height;
            else if (h == 0) h = this._getIntValueFromCSSProperty("height");        
        }
        return h;
    }

    setFrameComponents(x, y, w, h)
    {
        this.setX(x);
        this.setY(y);
        this.setWidth(w);
        this.setHeight(h);
    }

    setFrame(frame)
    {
        this.willChangeValue("frame");
        this.setFrameComponents(frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
        this.didChangeValue("frame");
    }
    
    get frame() {        
        return MIORect.rectWithValues(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    public get bounds(){
        return MIORect.rectWithValues(0, 0, this.getWidth(), this.getHeight());
    }

    //
    // CSS Subsystem
    //

    protected _getValueFromCSSProperty(property)
    {
        var v = window.getComputedStyle(this.layer, null).getPropertyValue(property);
        return v;
    }

    protected _getIntValueFromCSSProperty(property)
    {
        var v = this._getValueFromCSSProperty(property);
        var r = v.hasSuffix("px");
        if (r == true) v = v.substring(0, v.length - 2);
        else
        {
            var r2 = v.hasSuffix("%");
            if (r2 == true) v = v.substring(0, v.length - 1);
        }

        return parseInt(v);
    }

    private _userInteraction = false;
    set userInteraction(value){
        if (value == this._userInteraction) return;

        if (value == true){
            this.layer.addEventListener("mousedown", this.mouseDownEvent.bind(this));
            this.layer.addEventListener("mouseup", this.mouseUpEvent.bind(this));
        }
        else {
            this.layer.removeEventListener("mousedown", this.mouseDownEvent);
            this.layer.removeEventListener("mouseup", this.mouseUpEvent);             
        }
    }

    private isMouseDown = false;
    private mouseDownEvent(ev){   
        let e = UIEvent.eventWithSysEvent(ev);                 
        this.touchesBeganWithEvent(null, e);
        this.isMouseDown = true;
        window.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
        ev.preventDefault(); // Prevent selection
    }

    private mouseUpEvent(ev){   
        this.isMouseDown = false; 
        let e = UIEvent.eventWithSysEvent(ev);                
        this.touchesEndedWithEvent(null, e);
    }

    private mouseMoveEvent(ev){   
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

    touchesBeganWithEvent(touches, ev:UIEvent){
        for (let index = 0; index < this.gestureRecognizers.length; index++){
            let gr:UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesBeganWithEvent(touches, ev);
        }
    }

    touchesMovedWithEvent(touches, ev:UIEvent){        
        for (let index = 0; index < this.gestureRecognizers.length; index++){
            let gr:UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesMovedWithEvent(touches, ev);
        }
    }

    touchesEndedWithEvent(touches, ev:UIEvent){
        for (let index = 0; index < this.gestureRecognizers.length; index++){
            let gr:UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesEndedWithEvent(touches, ev);
        }
    }

    private gestureRecognizers = [];
    addGestureRecognizer(gesture:UIGestureRecognizer){
        if (this.gestureRecognizers.containsObject(gesture)) return;
        
        gesture.view = this;
        this.gestureRecognizers.addObject(gesture);
        this.userInteraction = true;
    }

    removeGestureRecognizer(gesture:UIGestureRecognizer){        
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
    static animateWithDuration(duration:number, target, animations, completion?){
        UIView.animationsChanges = [];
        UIView.animationsViews = [];
        UIView.animationTarget = target;
        UIView.animationCompletion = completion;
        animations.call(target);                

        for (let index = 0; index < UIView.animationsChanges.length; index++){
            let anim = UIView.animationsChanges[index];
            let view = anim["View"];
            let key = anim["Key"];
            let value = anim["EndValue"];            
            
            view.layer.style.transition = key + " " + duration + "s";
            switch(key){
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

    private static addTrackingAnimationView(view:UIView){
        let index = UIView.animationsViews.indexOf(view);
        if (index > -1) return;
        UIView.animationsViews.addObject(view);
        view.layer.animationParams = {"View" : view};
        view.layer.addEventListener("webkitTransitionEnd", UIView.animationDidFinish);
    }

    private static removeTrackingAnimationView(view:UIView){
        let index = UIView.animationsViews.indexOf(view);
        if (index == -1) return;
        UIView.animationsViews.removeObject(view);                
        view.layer.removeEventListener("webkitTransitionEnd", UIView.animationDidFinish);            
        view.layer.style.transition = "none";
        view.setNeedsDisplay();
    }

    private static animationDidFinish(event){
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

export class UIViewController extends NSObject
{
    layerID:string = null;

    view:UIView = null;

    private _htmlResourcePath = null;

    private _onViewLoadedTarget = null;
    private _onViewLoadedAction = null;

    private _onLoadLayerTarget = null;
    private _onLoadLayerAction = null;

    private _viewIsLoaded = false;
    private _layerIsReady = false;

    private _childViewControllers = [];
    parentViewController:UIViewController = null;

    presentingViewController:UIViewController = null;
    presentedViewController:UIView = null;
    navigationController:UINavigationController = null;
    navigationItem:UINavigationItem = null;
    splitViewController:UISplitViewController = null;
    tabBarController = null;

    modalPresentationStyle = MIOCoreIsPhone() == true ? UIModalPresentationStyle.FullScreen : UIModalPresentationStyle.PageSheet;
    modalTransitionStyle = UIModalTransitionStyle.CoverVertical;
    transitioningDelegate = null;

    protected _contentSize = new NSSize(320, 200);
    protected _preferredContentSize = null;

    _outlets = {};

    constructor(layerID?){
        super();
        this.layerID = layerID ? layerID : UICoreLayerIDFromObject(this);
    }

    init(){
        super.init();        
        this.loadView();        
    }

    initWithCoder(coder:NSCoder){

    }

    initWithLayer(layer, owner, options?){
        super.init();

        this.view = new UIView(this.layerID);
        this.view.initWithLayer(layer, owner, options);
        
        // Search for navigation item
        this.navigationItem = UINavItemSearchInLayer(layer);
        
        this.loadView();        
    }

    initWithResource(path){
        if (path == null) throw new Error("MIOViewController:initWithResource can't be null");

        super.init();        

        this._htmlResourcePath = path;
        this.loadView();
    }

    localizeSubLayers(layers){
        if (layers.length == 0)
            return;

        for (let index = 0; index < layers.length; index++){
            let layer = layers[index];

            if (layer.tagName != "DIV") continue;

            var key = layer.getAttribute("data-localize-key");
            if (key != null)
                layer.innerHTML = NSLocalizeString(key, key);

            this.localizeSubLayers(layer.childNodes);
        }
    }

    localizeLayerIDWithKey(layerID, key){
        let layer = UILayerSearchElementByID(this.view.layer, layerID);
        layer.innerHTML = NSLocalizeString(key, key);
    }

    loadView(){
        if (this.view != null) {
            this._didLoadView();
            return;
        }

        this.view = new UIView(this.layerID);
        
        if (this._htmlResourcePath == null) {
            this.view.init();            
            UICoreLayerAddStyle(this.view.layer, "page");
            this._didLoadView();
            return;
        }
        
        let mainBundle = NSBundle.mainBundle();
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
    }

    _didLoadNibWithLayer(layerData){
        let domParser = new DOMParser();
        let items = domParser.parseFromString(layerData, "text/html");
        let layer = items.getElementById("kk");

        this.navigationItem = UINavItemSearchInLayer(layer);

        this.view.initWithLayer(layer, this);
        this.view.awakeFromHTML();
        this._didLoadView();
    }

    _didLoadView(){
        this._layerIsReady = true;        
        if (MIOCoreIsPhone() == true) UICoreLayerAddStyle(this.view.layer, "phone");
        
        if (this._onLoadLayerTarget != null && this._onViewLoadedAction != null){
            this._onLoadLayerAction.call(this._onLoadLayerTarget);
            this._onLoadLayerTarget = null;
            this._onLoadLayerAction = null;
        }

        if (this._onViewLoadedAction != null && this._onViewLoadedTarget != null){
            this.viewDidLoad();
            this._loadChildControllers();
        }
    }

    protected _loadChildControllers(){
        let count = this._childViewControllers.length;

        if (count > 0)
            this._loadChildViewController(0, count);
        else
            this._setViewLoaded(true);
    }

    protected _loadChildViewController(index, max){
        if (index < max) {
            let vc = this._childViewControllers[index];
            vc.onLoadView(this, function () {

                let newIndex = index + 1;
                this._loadChildViewController(newIndex, max);
            });
        }
        else
        {
            this._setViewLoaded(true);
        }
    }

    protected _setViewLoaded(value){
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

    onLoadView(target, action){
        this._onViewLoadedTarget = target;
        this._onViewLoadedAction = action;

        if (this._viewIsLoaded == true) {
            action.call(target);
            //this.view.setNeedsDisplay();
        }
        else if (this._layerIsReady == true)
        {
            this.viewDidLoad();            
            this._loadChildControllers();
            //this.view.setNeedsDisplay();
        }
    }

    onLoadLayer(target, action){
        if (this._layerIsReady == true)
        {
            action.call(target);
        }
        else
        {
            this._onLoadLayerTarget = action;
            this._onLoadLayerAction= target;
        }
    }

    get viewIsLoaded()
    {
        return this._viewIsLoaded;
    }

    get childViewControllers()
    {
        return this._childViewControllers;
    }

    addChildViewController(vc)
    {
        vc.parentViewController = this;
        this._childViewControllers.push(vc);
        //vc.willMoveToParentViewController(this);
    }

    removeChildViewController(vc)
    {
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

    private _presentationController:UIPresentationController = null;
    get isPresented(){
        if (this._presentationController != null)
            return this._presentationController._isPresented;
    }

    get presentationController():UIPresentationController {
        // if (this._presentationController == null && this.parentViewController != null)
        //     return this.parentViewController.presentationController;

        return this._presentationController;
    }       
    
    private _popoverPresentationController:UIPopoverPresentationController = null;
    get popoverPresentationController():UIPopoverPresentationController{
        if (this._popoverPresentationController == null){
            this._popoverPresentationController = new UIPopoverPresentationController();
            this._popoverPresentationController.init();
            this._popoverPresentationController.presentedViewController = this;
            this._presentationController = this._popoverPresentationController;
        }        
        
        return this._popoverPresentationController;
    }

    showViewController(vc, animated){
        vc.onLoadView(this, function () {

            this.view.addSubview(vc.view);
            this.addChildViewController(vc);

            _MIUShowViewController(this, vc, this, animated);
        });
    }

    presentViewController(vc:UIViewController, animated:boolean){           
        
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
        
        if (pc._isPresented == true){
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

            if (vc.modalPresentationStyle == UIModalPresentationStyle.CurrentContext){
                this.view.addSubview(vc.presentationController.presentedView);
                this.addChildViewController(vc);
                _MIUShowViewController(this, vc, null, animated, this, function () {
                });    
            }
            else{
                // It's a window instead of a view
                let w:UIWindow = pc.window;
                if (w == null)
                {
                    w = new UIWindow();
                    w.init();
                    w.layer.style.background = "";
                    w.rootViewController = vc;
                    w.addSubview(pc.presentedView);
                    pc.window = w;                                        
                }
                w.setHidden(false);

                _MIUShowViewController(this, vc, null, animated, this, function () {
                    w.makeKey();
                });    
            }
        });
    }

    dismissViewController(animate){
        let pc = this._presentationController;
        let vc = this as UIViewController;
        while(pc == null) {
            vc = vc.parentViewController;
            pc = vc._presentationController;
        }
        let toVC = pc.presentingViewController;
        let fromVC = pc.presentedViewController;
        let fromView = pc.presentedView;

        _UIHideViewController(fromVC, toVC, null, this, function () {

            if (fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext){
                toVC.removeChildViewController(fromVC);
                let pc1 = fromVC.presentationController;
                let view = pc1.presentedView;
                view.removeFromSuperview();
            }
            else{
                // It's a window instead of a view
                let pc1 = fromVC.presentationController;
                let w = pc1.window as UIWindow;
                w.setHidden(true);
            }
        });
    }
 
    transitionFromViewControllerToViewController(fromVC, toVC, duration, animationType, target?, completion?)
    {
        //TODO
    }

    viewDidLoad(){}

    viewWillAppear(animated?)
    {
        for (var index = 0; index < this._childViewControllers.length; index++)
        {
            var vc = this._childViewControllers[index];
            vc.viewWillAppear(animated);
        }
        
        this.view.setViewIsVisible(true);
    }

    viewDidAppear(animated?)
    {
        //this.view.setNeedsDisplay();
        
        for (var index = 0; index < this._childViewControllers.length; index++)
        {
            var vc = this._childViewControllers[index];
            vc.viewDidAppear(animated);
        }
    }

    viewWillDisappear(animated?)
    {
        for (var index = 0; index < this._childViewControllers.length; index++)
        {
            var vc = this._childViewControllers[index];
            vc.viewWillDisappear(animated);
        }
        
        this.view.setViewIsVisible(false);
    }

    viewDidDisappear(animated?)
    {
        for (var index = 0; index < this._childViewControllers.length; index++)
        {
            var vc = this._childViewControllers[index];
            vc.viewDidDisappear(animated);
        }
    }

    contentHeight()
    {
        return this.view.getHeight();
    }

    setContentSize(size)
    {
        this.willChangeValue("contentSize");
        this._contentSize = size;
        this.didChangeValue("contentSize");
    }

    public set contentSize(size)
    {
        this.setContentSize(size);
    }

    public get contentSize()
    {
        return this._contentSize;
    }

    public set preferredContentSize(size){
        this.setPreferredContentSize(size);
    }

    public get preferredContentSize(){
        return this._preferredContentSize;
    }

    setPreferredContentSize(size){
        this.willChangeValue("preferredContentSize");
        this._preferredContentSize = size;
        this.didChangeValue("preferredContentSize");
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
        UICoreLayerAddStyle(this.layer, "view");
    }

    initWithRootViewController(vc){
        this.init();        

        this.rootViewController = vc;
        this.addSubview(vc.view);        
    }

    makeKey(){
        UIWebApplication.sharedInstance().makeKeyWindow(this);
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

    delegate = null;

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

    private downloadAppPlist(target, completion){        
        let request = NSURLRequest.requestWithURL(NSURL.urlWithString("app.plist"));
        let con = new NSURLConnection();
        con.initWithRequestBlock(request, this, function(code, data){
            if (code == 200) {                
                MIOCoreBundleSetAppResource("app", "plist", data);
            }
            completion.call(target, data);
        });        

    }

    run(){
        this.downloadAppPlist(this, function(data){
            if (data == null) throw new Error("We couldn't download the app.plist");
                        
            // Get Languages from the app.plist
            let config = NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);            
            this.mainResourceURLString = config["UIMainStoryboardFile"];

            let langs = config["Languages"];
            if (langs == null) this._run();

            for (let key in langs) {
                let url = langs[key];
                MIOCoreAddLanguage(key, url);
            }
            let lang = MIOCoreGetPlatformLanguage();
            this.setLanguage(lang, this, function(){
                this._run();
            });            
        });
    }

    private mainResourceURLString:string = null;
    private _run() {        

        this.delegate.didFinishLaunching();        
        this._mainWindow = this.delegate.window;

        if (this._mainWindow == null) {
            MUICoreBundleLoadNibName(this.mainResourceURLString, this, function(vc:UIViewController){
                this.delegate.window = new UIWindow();
                this.delegate.window.initWithRootViewController(vc);
                this._launchApp()
            });
        }
        else this._launchApp();         
    }

    private _launchApp(){
        this.delegate.window.makeKeyAndVisible();

        this.delegate.window.rootViewController.onLoadView(this, function () {
            
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
