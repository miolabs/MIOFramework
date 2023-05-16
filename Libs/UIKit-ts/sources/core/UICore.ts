import { MIOCoreIsPhone } from "mio-core";
import { CGSize } from "../CoreGraphics/CGSize";
import { UIModalPresentationStyle, UIPresentationController } from "../UIPresentationController";
import { UIViewController } from "../UIViewController";
import { _CAAnimationStart } from "../CoreAnimation/CoreAnimation+ViewController";
import { MUICoreEvent, MUICoreEventType } from "./UICoreEvents"
import { UIViewControllerTransitioningDelegate } from "../CoreAnimation/CoreAnimation";

export function MUIWindowSize()
{
    let w = document.body.clientWidth;    
    let h = window.innerHeight;

    return new CGSize(w, h);
}

export function _UIShowViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, animated:boolean, completion?:any)
{
    toVC.viewWillAppear( false );
    //toVC._childControllersWillAppear();

    if (toVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.currentContext) {

        fromVC.viewWillDisappear( false );
        //fromVC._childControllersWillDisappear();
    }

    let view = null;
    let pc = toVC.presentationController as UIPresentationController;

    if (pc != null) 
        view = pc.presentedView;
    else
        view = toVC.view;

    if (animated == false) {
        _UICoreAnimationDidStart( fromVC, toVC, pc, completion );
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
            
    _CAAnimationStart( view.layer, ac, animationContext, () => {
        _UICoreAnimationDidStart( fromVC, toVC, pc, completion );
    } );

}
export function _UICoreAnimationDidStart(fromVC:UIViewController, toVC:UIViewController, pc:UIPresentationController, completion?:any){
    toVC.viewDidAppear( true );
    //toVC._childControllersDidAppear();

    if (toVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.currentContext) {

        fromVC.viewDidDisappear( true );
        //fromVC._childControllersDidDisappear();
    }
    if (pc != null) {
        pc.presentationTransitionDidEnd(true);
        pc._isPresented = true;
    }

    if ( completion != null ) completion();
}

export function _UICoreHideViewController( fromVC:UIViewController, toVC:UIViewController, sourceVC:UIViewControllerTransitioningDelegate, completion?:any )
{
    if (fromVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen
        || fromVC.modalPresentationStyle == UIModalPresentationStyle.currentContext
        || MIOCoreIsPhone() == true) {

        toVC.viewWillAppear( false );
        //toVC._childControllersWillAppear();

        //toVC.view.layout();
    }

    fromVC.viewWillDisappear( false );
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

            toVC.viewDidAppear( false );
            //toVC._childControllersDidAppear();
        }

        fromVC.viewDidDisappear( false );
        //fromVC._childControllersDidDisappear();

        if ( pc != null ){
            pc.dismissalTransitionDidEnd( true );
            pc._isPresented = false;
        }

        if ( completion != null ) completion();
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
