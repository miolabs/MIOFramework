import { UIViewController } from "./UIViewController";
import { MIOObject } from "../MIOFoundation";
import { _UIHideViewController, _MIUShowViewController } from "./core/MUICore";
import { UIClassListForAnimationType, UIAnimationType } from "./MIOUI_CoreAnimation";
import { UIView } from "./UIView";

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
                vc.navigationItem.backBarButtonItem.setAction(this, function(){
                    vc.navigationController.popViewController();
                });
            }

            this.view.addSubview(vc.view);
            this.addChildViewController(vc);

            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;

            _MIUShowViewController(lastVC, vc, this, animated);
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

        _UIHideViewController(fromVC, toVC, this, this, function () {
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

        _UIHideViewController(currentVC, rootVC, this, this, function () {
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

    // Transitioning delegate
    private _pushAnimationController = null;
    private _popAnimationController = null;

    animationControllerForPresentedController(presentedViewController, presentingViewController, sourceController){
        if (this._pushAnimationController == null) {

            this._pushAnimationController = new UIPushAnimationController();
            this._pushAnimationController.init();
        }

        return this._pushAnimationController;
    }

    animationControllerForDismissedController(dismissedController)
    {
        if (this._popAnimationController == null) {

            this._popAnimationController = new UIPopAnimationController();
            this._popAnimationController.init();
        }

        return this._popAnimationController;
    }
}

/*
    ANIMATIONS
 */

export class UIPushAnimationController extends MIOObject
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
        let animations = UIClassListForAnimationType(UIAnimationType.Push);
        return animations;
    }

}

export class UIPopAnimationController extends MIOObject
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
        let animations = UIClassListForAnimationType(UIAnimationType.Pop);
        return animations;
    }

}