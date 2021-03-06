
import { NSClassFromString } from "mio-foundation-web";
import { CGSize } from "mio-foundation-web";
import { MIOCoreIsPhone } from "mio-foundation-web";
import { UIView } from "../UIView";
import { UIViewController } from "../UIViewController";
import { UIModalPresentationStyle } from "../UIViewController_PresentationController";
import { UIPresentationController } from "../UIViewController_PresentationController";
import { _MUIAnimationStart } from "./MUICoreAnimation";
import { MUICoreLayerSearchElementByID } from "./MUICoreLayer";

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

    return new CGSize(w, h);
}

export function _MUIShowViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, animated:boolean, target?, completion?)
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
            
    _MUIAnimationStart(layer, ac, animationContext, function () {
        _MUIAnimationDidStart(fromVC, toVC, pc, target, completion);
    });

}
export function _MUIAnimationDidStart(fromVC:UIViewController, toVC:UIViewController, pc:UIPresentationController, target?, completion?){
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

export function _MUIHideViewController(fromVC:UIViewController, toVC:UIViewController, sourceVC, target?, completion?)
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

    _MUIAnimationStart(layer, ac, animationContext, function () {

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

