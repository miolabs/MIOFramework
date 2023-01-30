import { MIOCoreIsPhone, NSClassFromString } from "mio-core";
import { CGSize } from "../CoreGraphics/CGSize";
import { UIModalPresentationStyle, UIPresentationController } from "../UIPresentationController";
import { UIView } from "../UIView";
import { UIViewController } from "../UIViewController";
import { _CAAnimationStart } from "../_index";



function MUIOutletRegister(owner, layerID, c)
{
    owner._outlets[layerID] = c;
}

function MUIOutletQuery(owner, layerID)
{
    return owner._outlets[layerID];
}

function MUIOutlet(owner, elementID, className?, options?)
{
    // //var layer = document.getElementById(elementID);
    // let query = MUIOutletQuery(owner, elementID);
    // if (query != null) return query;

    // let layer = null;

    // if (owner instanceof UIView)
    //     layer = MUICoreLayerSearchElementByID(owner.layer, elementID);
    // else if (owner instanceof UIViewController)
    //     layer = MUICoreLayerSearchElementByID(owner.view.layer, elementID);

    // if (layer == null) return null; // Element not found
    //     //throw new Error(`DIV identifier specified is not valid (${elementID})`);
        
    // if (className == null)
    //     className = layer.getAttribute("data-class");

    // if (className == null)
    //     className = "UIView";

    // let classInstance = NSClassFromString(className);
    // classInstance.initWithLayer(layer, owner, options);
    // // Track outlets inside view controller (owner)
    // MUIOutletRegister(owner, elementID, classInstance);

    // if (owner instanceof UIView)
    //     owner._linkViewToSubview(classInstance);
    // else if (owner instanceof UIViewController){

    //     if (classInstance instanceof UIView){
    //         owner.view._linkViewToSubview(classInstance);
    //     }
    //     else if (classInstance instanceof UIViewController)
    //         owner.addChildViewController(classInstance);
    //     else throw new Error("UIOutlet: Wrong type");        
    // }

    // if (classInstance instanceof UIView)
    //     classInstance.awakeFromHTML();

    // return classInstance;
}

export function MUIWindowSize()
{
    let w = document.body.clientWidth;
    //var h = document.body.clientHeight;window.innerHeight
    let h = window.innerHeight;

    return new CGSize(w, h);
}

export function _UIShowViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, animated:boolean, target?, completion?)
{
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();

    if (toVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.currentContext) {

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
        _UICoreAnimationDidStart(fromVC, toVC, pc, target, completion);
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
            
    _CAAnimationStart(layer, ac, animationContext, function () {
        _UICoreAnimationDidStart(fromVC, toVC, pc, target, completion);
    });

}
export function _UICoreAnimationDidStart(fromVC:UIViewController, toVC:UIViewController, pc:UIPresentationController, target?, completion?){
    toVC.viewDidAppear();
    //toVC._childControllersDidAppear();

    if (toVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.currentContext) {

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

export function _UICoreHideViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, target?, completion?)
{
    if (fromVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen
        || fromVC.modalPresentationStyle == UIModalPresentationStyle.currentContext
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

    _CAAnimationStart(layer, ac, animationContext, function () {

        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.currentContext) {

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

function _UICoreTransitionFromViewControllerToViewController(fromVC, toVC, sourceVC, target?, completion?)
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

    _CAAnimationStart(layer, ac, animationContext, () => {

        toVC.viewDidAppear();
        //toVC._childControllersDidAppear();

        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();

        if (target != null && completion != null)
            completion.call(target);
    });
}

var _miocore_events_event_observers = {};

function UICoreEventRegisterObserverForType(eventType:MUICoreEventType, observer, completion)
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

function UICoreEventUnregisterObserverForType(eventType:MUICoreEventType, observer)
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

function _UICoreEventSendToObservers(obs, event:MUICoreEvent){

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
