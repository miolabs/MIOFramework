"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mio_foundation_web_1 = require("mio-foundation-web");
var UIView_1 = require("../UIView");
var UIViewController_1 = require("../UIViewController");
var UIViewController_PresentationController_1 = require("../UIViewController_PresentationController");
var MUICoreAnimation_1 = require("./MUICoreAnimation");
var MUICoreLayer_1 = require("./MUICoreLayer");
function MUIOutletRegister(owner, layerID, c) {
    owner._outlets[layerID] = c;
}
exports.MUIOutletRegister = MUIOutletRegister;
function MUIOutletQuery(owner, layerID) {
    return owner._outlets[layerID];
}
exports.MUIOutletQuery = MUIOutletQuery;
function MUIOutlet(owner, elementID, className, options) {
    //var layer = document.getElementById(elementID);
    var query = MUIOutletQuery(owner, elementID);
    if (query != null)
        return query;
    var layer = null;
    if (owner instanceof UIView_1.UIView)
        layer = MUICoreLayer_1.MUICoreLayerSearchElementByID(owner.layer, elementID);
    else if (owner instanceof UIViewController_1.UIViewController)
        layer = MUICoreLayer_1.MUICoreLayerSearchElementByID(owner.view.layer, elementID);
    if (layer == null)
        return null; // Element not found
    //throw new Error(`DIV identifier specified is not valid (${elementID})`);
    if (className == null)
        className = layer.getAttribute("data-class");
    if (className == null)
        className = "UIView";
    var classInstance = mio_foundation_web_1.NSClassFromString(className);
    classInstance.initWithLayer(layer, owner, options);
    // Track outlets inside view controller (owner)
    MUIOutletRegister(owner, elementID, classInstance);
    if (owner instanceof UIView_1.UIView)
        owner._linkViewToSubview(classInstance);
    else if (owner instanceof UIViewController_1.UIViewController) {
        if (classInstance instanceof UIView_1.UIView) {
            owner.view._linkViewToSubview(classInstance);
        }
        else if (classInstance instanceof UIViewController_1.UIViewController)
            owner.addChildViewController(classInstance);
        else
            throw new Error("UIOutlet: Wrong type");
    }
    if (classInstance instanceof UIView_1.UIView)
        classInstance.awakeFromHTML();
    return classInstance;
}
exports.MUIOutlet = MUIOutlet;
function UIWindowSize() {
    var w = document.body.clientWidth;
    //var h = document.body.clientHeight;window.innerHeight
    var h = window.innerHeight;
    return new mio_foundation_web_1.NSSize(w, h);
}
exports.UIWindowSize = UIWindowSize;
function _MIUShowViewController(fromVC, toVC, sourceVC, animated, target, completion) {
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();
    if (toVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.FullScreen
        || toVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.CurrentContext) {
        fromVC.viewWillDisappear();
        //fromVC._childControllersWillDisappear();
    }
    var view = null;
    var pc = toVC.presentationController;
    if (pc != null)
        view = pc.presentedView;
    else
        view = toVC.view;
    if (animated == false) {
        _UIAnimationDidStart(fromVC, toVC, pc, target, completion);
        return;
    }
    // Let's go for the animations!!
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = view;
    if (pc != null)
        pc.presentationTransitionWillBegin();
    var ac = null;
    if (toVC.transitioningDelegate != null) {
        ac = toVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (sourceVC != null && typeof sourceVC.animationControllerForPresentedController === "function") {
        ac = sourceVC.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (pc != null) {
        ac = pc.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    //view.setNeedsDisplay();
    var layer = view.layer;
    MUICoreAnimation_1._UIAnimationStart(layer, ac, animationContext, this, function () {
        _UIAnimationDidStart(fromVC, toVC, pc, target, completion);
    });
}
exports._MIUShowViewController = _MIUShowViewController;
function _UIAnimationDidStart(fromVC, toVC, pc, target, completion) {
    toVC.viewDidAppear();
    //toVC._childControllersDidAppear();
    if (toVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.FullScreen
        || toVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.CurrentContext) {
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
exports._UIAnimationDidStart = _UIAnimationDidStart;
function _UIHideViewController(fromVC, toVC, sourceVC, target, completion) {
    if (fromVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.FullScreen
        || fromVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.CurrentContext
        || mio_foundation_web_1.MIOCoreIsPhone() == true) {
        toVC.viewWillAppear();
        //toVC._childControllersWillAppear();
        //toVC.view.layout();
    }
    fromVC.viewWillDisappear();
    //fromVC._childControllersWillDisappear();
    var view = null;
    var pc = fromVC.presentationController;
    if (pc != null)
        view = pc.presentedView;
    else
        view = fromVC.view;
    var ac = null;
    if (fromVC.transitioningDelegate != null) {
        ac = fromVC.transitioningDelegate.animationControllerForDismissedController(fromVC);
    }
    else if (sourceVC != null && typeof sourceVC.animationControllerForDismissedController === "function") {
        ac = sourceVC.animationControllerForDismissedController(fromVC);
    }
    else if (pc != null) {
        ac = pc.transitioningDelegate.animationControllerForDismissedController(fromVC);
    }
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = view;
    var layer = view.layer;
    if (pc != null)
        pc.dismissalTransitionWillBegin();
    MUICoreAnimation_1._UIAnimationStart(layer, ac, animationContext, this, function () {
        if (fromVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.FullScreen
            || fromVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.CurrentContext) {
            toVC.viewDidAppear();
            //toVC._childControllersDidAppear();
        }
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
        if (pc != null) {
            pc.dismissalTransitionDidEnd(true);
            pc._isPresented = false;
        }
        if (target != null && completion != null)
            completion.call(target);
    });
}
exports._UIHideViewController = _UIHideViewController;
function _UITransitionFromViewControllerToViewController(fromVC, toVC, sourceVC, target, completion) {
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();
    fromVC.viewWillDisappear();
    //fromVC._childControllersWillDisappear();
    //toVC.view.layout();
    var ac = null;
    if (toVC.transitioningDelegate != null) {
        ac = toVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (sourceVC != null && sourceVC.transitioningDelegate != null) {
        ac = sourceVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = toVC;
    var layer = toVC.view.layer;
    MUICoreAnimation_1._UIAnimationStart(layer, ac, animationContext, this, function () {
        toVC.viewDidAppear();
        //toVC._childControllersDidAppear();
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
        if (target != null && completion != null)
            completion.call(target);
    });
}
exports._UITransitionFromViewControllerToViewController = _UITransitionFromViewControllerToViewController;
//# sourceMappingURL=MUICore.js.map