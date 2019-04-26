import { MIOCoreIsPhone } from "mio-foundation-web";
import { NSObject } from "mio-foundation-web";
import { _MUIShowViewController, _MUIHideViewController } from "./core/MUICore";
import { UIView } from "./UIView";
import { UIViewController } from "./UIViewController";
import { MUICoreLayerAddStyle } from ".";
import { UIButton } from "./UIButton";
import { MUIPushAnimationController } from "./UINavigationController";
import { MUIPopAnimationController } from "./UINavigationController";

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

        this._displayModeButtonItem = new UIButton();
        this._displayModeButtonItem.initWithAction(this, this.displayModeButtonItemAction);        

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
