
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

export enum UIAnimationType
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

export function _UIAddAnimations(layer, animations)
{
    let w = layer.offsetWidth;
    for (var index = 0; index < animations.length; index++)
        layer.classList.add(animations[index]);
    w++;
}

export function _UIRemoveAnimations(layer, animations)
{
    for (var index = 0; index < animations.length; index++)
        layer.classList.remove(animations[index]);
}

export function _UIAnimationStart(layer, animationController, animationContext, target?, completion?)
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

export function _UIAnimationDidFinish(event)
{
    let animationController = event.target.animationParams["animationController"];
    let animations = event.target.animationParams["animations"];
    let target = event.target.animationParams["target"];
    let completion = event.target.animationParams["completion"];
    let layer = event.target;

    _UIRemoveAnimations(layer, animations);
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




export function MUICoreBundleLoadNibName(name:string, target, completion){

}








export interface Window {
    prototype;
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

export function UIWindowSize()
{
    var w = document.body.clientWidth;
    //var h = document.body.clientHeight;window.innerHeight
    var h = window.innerHeight;

    return new NSSize(w, h);
}

export function _MIUShowViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, animated:boolean, target?, completion?)
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
        _UIAnimationDidStart(fromVC, toVC, pc, target, completion);
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
            
    _UIAnimationStart(layer, ac, animationContext, this, function () {
        _UIAnimationDidStart(fromVC, toVC, pc, target, completion);
    });

}
export function _UIAnimationDidStart(fromVC:UIViewController, toVC:UIViewController, pc:UIPresentationController, target?, completion?){
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

export function _UIHideViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, target?, completion?)
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

    _UIAnimationStart(layer, ac, animationContext, this, function () {

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

export function _UITransitionFromViewControllerToViewController(fromVC, toVC, sourceVC, target?, completion?)
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

    _UIAnimationStart(layer, ac, animationContext, this, function () {

        toVC.viewDidAppear();
        //toVC._childControllersDidAppear();

        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();

        if (target != null && completion != null)
            completion.call(target);
    });
}




/**
 * Created by godshadow on 21/5/16.
 */

 export enum UIActivityIndicatorViewStyle {
    White,
    WhiteLarge,
    Gray
 }

export class UIActivityIndicatorView extends UIView
{    
    initWithLayer(layer, owner, options){
        super.initWithLayer(layer, owner, options);
        this.setHidden(true);
    }

    startAnimating(){
        this.setHidden(false);
    }

    stopAnimating(){
        this.setHidden(true);
    }
    
    private _hidesWhenStopped = true;
    set hidesWhenStopped(value:boolean){
        this._hidesWhenStopped = value;
    }

    get hidesWhenStopped():boolean{
        return this._hidesWhenStopped;
    }

    private isAnimating = false;
    get animating():boolean{
        return this.isAnimating;
    }

    private _activityIndicatorViewStyle = UIActivityIndicatorViewStyle.White;
    set activityIndicatorViewStyle(value:UIActivityIndicatorViewStyle){

    }

    get activityIndicatorViewStyle(){
        return this._activityIndicatorViewStyle;
    }
}




export function MIOEdgeInsetsMake(top, left, bottom, rigth){

    let ei = new UIEdgeInsets();
    ei.initWithValues(top, left, bottom, rigth);

    return ei;
}

export class UIEdgeInsets extends MIOObject
{
    top = 0;
    left = 0;
    bottom = 0;
    right = 0;
    
    static Zero():UIEdgeInsets {
        let ei = new UIEdgeInsets();
        ei.init();

        return ei;
    }

    initWithValues(top, left, bottom, right){
        
        super.init();

        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
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
    sourceRect = MIORect.Zero();

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
        UICoreLayerAddStyle(this.presentedView.layer, "popover_window");                
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

        view.setFrame(MIORect.rectWithValues(0, 0, w, h));
        this.window.setFrame(MIORect.rectWithValues(x, y, w, h))
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

export class MIOModalPopOverTransitioningDelegate extends MIOObject
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

export class MIOPopOverPresentAnimationController extends MIOObject
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
        let animations = UIClassListForAnimationType(UIAnimationType.FadeIn);
        return animations;
    }

}

export class MIOPopOverDismissAnimationController extends MIOObject
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
        let animations = UIClassListForAnimationType(UIAnimationType.FadeOut);
        return animations;
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

export class UIPresentationController extends MIOObject
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
            this._transitioningDelegate = new MIOModalTransitioningDelegate();
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
            UICoreLayerAddStyle(view.layer, "modal_window");
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

            view.setFrame(MIORect.rectWithValues(0, 0, w, h));
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet)
        {
            // Present like desktop sheet window
            let ws = UIWindowSize();

            let size = toVC.preferredContentSize;
            if (size == null) size = new MIOSize(320, 200);

            let w = size.width;
            let h = size.height;
            let x = (ws.width - w) / 2;

            view.setFrame(MIORect.rectWithValues(0, 0, w, h));
            this.window.setFrame(MIORect.rectWithValues(x, 0, w, h))

            view.layer.classList.add("modal");
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet)
        {
            // Present at the center of the screen
            let ws = UIWindowSize();

            let size = toVC.preferredContentSize;
            if (size == null) size = new MIOSize(320, 200);

            let w = size.width;
            let h = size.height;
            let x = (ws.width - w) / 2;
            let y = (ws.height - h) / 2;

            view.setFrame(MIORect.rectWithValues(0, 0, w, h));
            this.window.setFrame(MIORect.rectWithValues(x, y, w, h))

            view.layer.classList.add("modal");
        }
        else
        {
            let size = toVC.preferredContentSize;
            if (size == null) size = new MIOSize(320, 200);
            let w = size.width;
            let h = size.height;

            view.setFrame(MIORect.rectWithValues(0, 0, w, h));
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

export class MIOModalTransitioningDelegate extends MIOObject
{
    modalTransitionStyle = null;

    private _presentAnimationController = null;
    private _dissmissAnimationController = null;

    animationControllerForPresentedController(presentedViewController, presentingViewController, sourceController){
        if (this._presentAnimationController == null) {
            this._presentAnimationController = new MIOModalPresentAnimationController();
            this._presentAnimationController.init();
        }

        return this._presentAnimationController
    }

    animationControllerForDismissedController(dismissedController){
        if (this._dissmissAnimationController == null) {

            this._dissmissAnimationController = new MIOModalDismissAnimationController();
            this._dissmissAnimationController.init();
        }

        return this._dissmissAnimationController;
    }
}

export class MIOAnimationController extends MIOObject
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

export class MIOModalPresentAnimationController extends MIOObject
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
                animations = UIClassListForAnimationType(UIAnimationType.SlideInUp);
            else 
                animations = UIClassListForAnimationType(UIAnimationType.BeginSheet);
        }                            

        return animations;
    }
}

export class MIOModalDismissAnimationController extends MIOObject
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
                animations = UIClassListForAnimationType(UIAnimationType.SlideOutDown);
            else 
                animations = UIClassListForAnimationType(UIAnimationType.EndSheet);
        }          
                  
        return animations;
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

export class UIGestureRecognizer extends MIOObject
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
    translationInView(view:UIView):MIOPoint {
        return new MIOPoint(this.deltaX, this.deltaY);
    }

}



export enum MIOFileHandlingPanel
{
    OKButton
}

export class UIOpenPanel extends UIWindow
{
    files = [];

    static openPanel():UIOpenPanel {
        let op = new UIOpenPanel();
        op.init();

        return op;
    }

    private panelTarget = null;
    private panelCompletion = null;
    private _inputLayer = null;
    beginSheetModalForWindow(window:UIWindow, target, completion){
        this.panelTarget = target;
        this.panelCompletion = completion;

        //Web hack to open dialog
        let instance = this;

        this._inputLayer = document.createElement("INPUT");
        this._inputLayer.setAttribute("type", "file");
        this._inputLayer.style.display = "none";        
        this._inputLayer.addEventListener('change', function(ev){
            let files = ev.target.files; // FileList object
            instance.filesDidSelect(files);
        }, false);
        
        UICoreLayerAddSublayer(window.layer, this._inputLayer);

        this._inputLayer.click();
    }
    
    private filesDidSelect(files){
        this.files = files;

        if (this.panelTarget != null && this.panelCompletion != null) {
            this.panelCompletion.call(this.panelTarget, MIOFileHandlingPanel.OKButton);
        }
    }

}