/**
 * Created by godshadow on 9/4/16.
 */

import { NSLocalizeString, NSObject } from "foundation";
import { _UICoreHideViewController, _UIShowViewController } from "./core/UICore";
import { UIBarButtonItem } from "./UIBarButtonItem";
import { UIButton } from "./UIButton";
import { UIControl } from "./UIControl";
import { UINavigationBar } from "./UINavigationBar";
import { UINavigationItem } from "./UINavigationItem";
import { UIView } from "./UIView";
import { UIViewController } from "./UIViewController";
import { UIViewControllerTransitioningDelegate } from "./CoreAnimation/CoreAnimation";


export class UINavigationController extends UIViewController implements UIViewControllerTransitioningDelegate
{
    rootViewController:UIViewController = null;
    viewControllersStack = [];
    currentViewControllerIndex = -1;
    
    private _navigationBar:UINavigationBar = null;
    get navigationBar():UINavigationBar {
        return this._navigationBar;
    }

    init(){
        super.init();
        // this.view.layer.style.overflow = "hidden";        
    }

    initWithRootViewController(vc:UIViewController){        
        this.init();
        this.setRootViewController(vc);        
    }

    setRootViewController(vc:UIViewController){
        //this.transitioningDelegate = this;                

        this.rootViewController = vc;
        //this.view.addSubview(vc.view);

        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex = 0;

        this.rootViewController.navigationController = this;

        this.addChildViewController(vc);

        // if (this.presentationController != null) {
        //     var size = vc.preferredContentSize;
        //     this.contentSize = size;
        // }
    }

    protected _loadViewFromNib(layer, classname:string){
        this._contentView = new UIView();
        // this._contentView.initWithLayer(layer, this);
        
        this._navigationBar = this._contentView.subviews[0];
        this._segues = this._contentView._segues;        
        
        this.view = new UIView();
        this.view.init();
        this.view.addSubview(this._navigationBar);

        this._checkSegues();
        this._didLoadView();
    }

    protected _setViewLoaded(value) {                
        // this.rootViewController.view.layer.style.left = "0px";
        // this.rootViewController.view.layer.style.top = "44px";
        // this.rootViewController.view.layer.style.width = "100%";
        // this.rootViewController.view.layer.style.botton = "0px";
        this.view.addSubview(this.rootViewController.view);
        
        let navItems = [this.rootViewController.navigationItem];
        this._navigationBar.setItems(navItems, false);

        super._setViewLoaded(value);
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

        vc.onLoadView( () => {

            if (vc.navigationItem == null) {
                vc.navigationItem = new UINavigationItem();
                vc.navigationItem.init();
            }

            let backButton = new UIButton();
            backButton.init();    
            backButton.setTitle(NSLocalizeString("Back", "BACK"));
            // MUICoreLayerAddStyle(backButton.layer, "system-back-icon");
            backButton.addTarget(vc, function(this:UIViewController){
                this.navigationController.popViewController(true);
            }, UIControl.Event.touchUpInside);

            let backBarButtonItem = new UIBarButtonItem();
            backBarButtonItem.initWithCustomView(backButton);
            backBarButtonItem.target = vc;
            backBarButtonItem.action = function(this:UIViewController){
                this.navigationController.popViewController(true);
            }

            this.view.addSubview(vc.view);
            this.addChildViewController(vc);

            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;

            _UIShowViewController(lastVC, vc, this, animated);
        } );
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

        _UICoreHideViewController(fromVC, toVC, this, ()=> {
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

        _UICoreHideViewController(currentVC, rootVC, this, () => {
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

    animationControllerForPresentedController( presentedViewController:UIViewController, presentingViewController: UIViewController, sourceController: UIViewController ){
        if (this._pushAnimationController == null) {

            this._pushAnimationController = new MUIPushAnimationController();
            this._pushAnimationController.init();
        }

        return this._pushAnimationController;
    }

    animationControllerForDismissedController( dismissedController: UIViewController )
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
        // let animations = MUIClassListForAnimationType(MUIAnimationType.Push);
        // return animations;
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
        // let animations = MUIClassListForAnimationType(MUIAnimationType.Pop);
        // return animations;
    }

}