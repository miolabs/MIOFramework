import { NSObject } from "mio-foundation-web";
import { CGRect } from "mio-foundation-web";
import { CGSize } from "mio-foundation-web";
import { MIOCoreIsPhone } from "mio-foundation-web";
import { MIOCoreIsMobile } from "mio-foundation-web";

import { UIViewController } from "./UIViewController";
import { MUIWindowSize } from "./core/MUICore";
import { UIWindow } from "./UIWindow";
import { MUIClassListForAnimationType } from "./core/MUICoreAnimation";
import { MUIAnimationType } from "./core/MUICoreAnimation";
import { MUICoreLayerAddStyle } from ".";
import { UIView } from "./UIView";

/**
 * Created by godshadow on 06/12/2016.
 */

export enum UIModalPresentationStyle
{
    fullScreen,
    pageSheet, // normal modal sheet in osx
    formSheet, // normal modal like floating window but horizontal and vertically centered
    currentContext,
    custom,
    overFullScreen,     // Similar to FullScreen but the view beneath doesnpt dissappear
    overCurrentContext, // Similuar like previus, but in current context
    popover, // the popover, almost like FormSheet but no centered
    none
}

export enum UIModalTransitionStyle
{
    CoverVertical,
    FlipHorizontal,
    CrossDisolve
}

export class UIPresentationController extends NSObject
{
    presentationStyle = UIModalPresentationStyle.pageSheet;
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

        if (toVC.modalPresentationStyle == UIModalPresentationStyle.pageSheet 
            || toVC.modalPresentationStyle == UIModalPresentationStyle.formSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen
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
        let fromVC: UIViewController = this.presentingViewController;
        let toVC: UIViewController = this.presentedViewController;
        let view: UIView = this.presentedView;

        if (toVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen){
            view.layer.style.left = "0px";
            view.layer.style.top = "0px";
            view.layer.style.width = "100%";
            view.layer.style.height = "100%";
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.currentContext)
        {
            let w = fromVC.view.getWidth();
            let h = fromVC.view.getHeight();

            view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.pageSheet)
        {
            // Present like desktop sheet window
            let ws = MUIWindowSize();

            let size = toVC.preferredContentSize;
            if (size == null) size = new CGSize(320, 200);

            let w = size.width;
            let h = size.height;
            let x = (ws.width - w) / 2;

            view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
            this.window.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', x, 0, w, h))

            view.layer.classList.add("modal");
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.formSheet)
        {
            // Present at the center of the screen
            let ws = MUIWindowSize();

            let size = toVC.preferredContentSize;
            if (size == null) size = new CGSize(320, 200);

            let w = size.width;
            let h = size.height;
            let x = (ws.width - w) / 2;
            let y = (ws.height - h) / 2;

            view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
            this.window.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', x, y, w, h))

            view.layer.classList.add("modal");
        }
        else
        {
            let size = toVC.preferredContentSize;
            if (size == null) size = new CGSize(320, 200);
            let w = size.width;
            let h = size.height;

            view.setFrame(_create(CGRect, 'initXIntYIntWidthIntHeightInt', 0, 0, w, h));
        }        
    }

    get window(){
        return this._window;
    }
    
    set window(window:UIWindow){
        let vc = this.presentedViewController;
        this._window = window;
        
        // Track view frame changes
        if (MIOCoreIsMobile() == false && vc.modalPresentationStyle != UIModalPresentationStyle.currentContext){
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

        if (toVC.modalPresentationStyle == UIModalPresentationStyle.pageSheet 
            || toVC.modalPresentationStyle == UIModalPresentationStyle.formSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen){
            
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

        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.pageSheet 
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.formSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.fullScreen){
            
            if (MIOCoreIsPhone() == true)                        
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideOutDown);
            else 
                animations = MUIClassListForAnimationType(MUIAnimationType.EndSheet);
        }          
                  
        return animations;
    }

}