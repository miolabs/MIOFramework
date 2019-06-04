import { NSObject } from "mio-foundation-web";
import { CGSize } from "mio-foundation-web";
import { NSLocalizeString } from "mio-foundation-web";
import { MIOCoreIsPhone } from "mio-foundation-web";
import { NSCoder } from "mio-foundation-web";

import { UIView } from "./UIView";
import { UINavigationItem } from "./UINavigationItem";
import { UINavigationController } from "./UINavigationController";
import { UIPresentationController } from "./UIViewController_PresentationController";
import { UIModalPresentationStyle } from "./UIViewController_PresentationController";
import { UIModalTransitionStyle } from "./UIViewController_PresentationController";
import { UIPopoverPresentationController } from "./UIViewController_PopoverPresentationController";
import { MUICoreLayerIDFromObject } from "./core/MUICoreLayer";
import { MUICoreLayerAddStyle } from "./core/MUICoreLayer";
import { MUICoreLayerSearchElementByID } from "./core/MUICoreLayer";
import { _MUIShowViewController } from "./core/MUICore";
import { _MUIHideViewController } from "./core/MUICore";
import { UIWindow } from "./UIWindow";
import { UISplitViewController } from "./UISplitViewController";
import { MUICoreBundleLoadNibName } from "./core/MUICoreNibParser";
import { UIStoryboard } from "./UIStoryboard";
import { MUICoreStoryboardParseLayer } from "./UIStoryboard";
import { UIStoryboardSegue } from "./UIStoryboardSegue";
import { UIAlertController } from "./UIAlertController";


/**
 * Created by godshadow on 11/3/16.
 */

export class UIViewController extends NSObject {
    layerID: string = null;
    private layer = null;

    view: UIView = null;

    private _htmlResourcePath = null;

    private _onViewLoadedTarget = null;
    private _onViewLoadedAction = null;

    private _onLoadLayerTarget = null;
    private _onLoadLayerAction = null;

    private _viewIsLoaded = false;
    private _layerIsReady = false;

    private _childViewControllers: UIViewController[] = [];
    parentViewController: UIViewController = null;

    presentingViewController: UIViewController = null;
    presentedViewController: UIView = null;
    navigationController: UINavigationController = null;
    navigationItem: UINavigationItem = null;
    splitViewController: UISplitViewController = null;
    tabBarController/*TODO: UITabBarController*/ = null;

    modalPresentationStyle = MIOCoreIsPhone() == true ? UIModalPresentationStyle.FullScreen : UIModalPresentationStyle.PageSheet;
    modalTransitionStyle = UIModalTransitionStyle.CoverVertical;
    transitioningDelegate = null;

    protected _contentSize = new CGSize(320, 200);
    protected _preferredContentSize = null;

    constructor(layerID?) {
        super();
        this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(this);
    }

    init() {
        super.init();
        this.loadView();
    }

    initWithCoder(coder: NSCoder) {

    }

    initWithLayer(layer, owner, options?) {
        super.init();

        // this.view = MUICoreViewCreateView(layer, owner);
        // this.view._checkSegues();

        // Search for navigation item
        //this.navigationItem = UINavItemSearchInLayer(layer);        

        this.loadView();
    }

    initWithResource(path) {
        if (path == null) throw new Error("UIViewController:initWithResource can't be null");

        super.init();

        this._htmlResourcePath = path;
        this.loadView();
    }

    localizeSubLayers(layers) {
        if (layers.length == 0)
            return;

        for (let index = 0; index < layers.length; index++) {
            let layer = layers[index];

            if (layer.tagName != "DIV") continue;

            var key = layer.getAttribute("data-localize-key");
            if (key != null)
                layer.innerHTML = NSLocalizeString(key, key);

            this.localizeSubLayers(layer.childNodes);
        }
    }

    localizeLayerIDWithKey(layerID, key) {
        let layer = MUICoreLayerSearchElementByID(this.view.layer, layerID);
        layer.innerHTML = NSLocalizeString(key, key);
    }

    loadView() {
        if (this.view != null) {
            this._didLoadView();
            return;
        }

        this.view = new UIView(this.layerID);

        if (this._htmlResourcePath == null) {
            this.view.init();
            MUICoreLayerAddStyle(this.view.layer, "view-controller");
            this._didLoadView();
            return;
        }

        MUICoreBundleLoadNibName(this._htmlResourcePath, this, function (this: UIViewController, layer) {
            this.view.initWithLayer(layer, this);
            this.view.awakeFromHTML();
            this._didLoadView();
        });

        // let mainBundle = NSBundle.mainBundle();
        // mainBundle.loadNibNamed(this._htmlResourcePath, this, null);

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

    _didLoadNibWithLayer(layerData) {
        let domParser = new DOMParser();
        let items = domParser.parseFromString(layerData, "text/html");
        let layer = items.getElementById("kk");

        //this.navigationItem = UINavItemSearchInLayer(layer);

        this.view.initWithLayer(layer, this);
        this.view.awakeFromHTML();

        this._didLoadView();
    }

    _didLoadView() {
        this._layerIsReady = true;
        if (MIOCoreIsPhone() == true) MUICoreLayerAddStyle(this.view.layer, "phone");
        MUICoreStoryboardParseLayer(this.view.layer, this, this);
        this._checkSegues();

        if (this._onLoadLayerTarget != null && this._onViewLoadedAction != null) {
            this._onLoadLayerAction.call(this._onLoadLayerTarget);
            this._onLoadLayerTarget = null;
            this._onLoadLayerAction = null;
        }

        if (this._onViewLoadedAction != null && this._onViewLoadedTarget != null) {
            this.viewDidLoad();
            this._loadChildControllers();
        }
        else if (this._htmlResourcePath == null){
            this.viewDidLoad();
            this._loadChildControllers();
        }
    }

    protected _loadChildControllers() {
        let count = this._childViewControllers.length;

        if (count > 0)
            this._loadChildViewController(0, count);
        else
            this._setViewLoaded(true);
    }

    protected _loadChildViewController(index, max) {
        if (index < max) {
            let vc = this._childViewControllers[index];
            vc.onLoadView(this, function () {

                let newIndex = index + 1;
                this._loadChildViewController(newIndex, max);
            });
        }
        else {
            this._setViewLoaded(true);
        }
    }

    protected _setViewLoaded(value) {
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

    onLoadView(target, action) {
        this._onViewLoadedTarget = target;
        this._onViewLoadedAction = action;

        if (this._viewIsLoaded == true) {
            action.call(target);
            //this.view.setNeedsDisplay();
        }
        else if (this._layerIsReady == true) {
            this.viewDidLoad();
            this._loadChildControllers();
            //this.view.setNeedsDisplay();
        }
    }

    onLoadLayer(target, action) {
        if (this._layerIsReady == true) {
            action.call(target);
        }
        else {
            this._onLoadLayerTarget = action;
            this._onLoadLayerAction = target;
        }
    }

    get viewIsLoaded() {
        return this._viewIsLoaded;
    }

    get childViewControllers() {
        return this._childViewControllers;
    }

    addChildViewController(vc: UIViewController) {
        vc.parentViewController = this;
        this._childViewControllers.push(vc);
        //vc.willMoveToParentViewController(this);
    }

    removeChildViewController(vc: UIViewController) {
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

    private _presentationController: UIPresentationController = null;
    get isPresented() {
        if (this._presentationController != null)
            return this._presentationController._isPresented;
    }

    get presentationController(): UIPresentationController {
        // if (this._presentationController == null && this.parentViewController != null)
        //     return this.parentViewController.presentationController;

        return this._presentationController;
    }

    private _popoverPresentationController: UIPopoverPresentationController = null;
    get popoverPresentationController(): UIPopoverPresentationController {
        if (this._popoverPresentationController == null) {
            this._popoverPresentationController = new UIPopoverPresentationController();
            this._popoverPresentationController.init();
            this._popoverPresentationController.presentedViewController = this;
            this._presentationController = this._popoverPresentationController;
        }

        return this._popoverPresentationController;
    }

    showViewController(vc, animated) {
        vc.onLoadView(this, function () {

            this.view.addSubview(vc.view);
            this.addChildViewController(vc);

            _MUIShowViewController(this, vc, this, animated);
        });
    }

    presentViewController(vc: UIViewController, animated: boolean) {

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

        if (pc._isPresented == true) {
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

            if (vc.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
                this.view.addSubview(vc.presentationController.presentedView);
                this.addChildViewController(vc);
                _MUIShowViewController(this, vc, null, animated, this, function () {
                });
            }
            else {
                // It's a window instead of a view
                let w: UIWindow = pc.window;
                if (w == null) {
                    w = new UIWindow();
                    w.init();
                    w.layer.style.background = "";
                    w.rootViewController = vc;
                    w.addSubview(pc.presentedView);
                    pc.window = w;
                }
				w.setHidden(false);
				if (vc instanceof UIAlertController) MUICoreLayerAddStyle(w.layer, "alert");

                _MUIShowViewController(this, vc, null, animated, this, function () {
                    w.makeKey();
                });
            }
        });
    }

    dismissViewController(animate) {
        let pc = this._presentationController;
        let vc = this as UIViewController;
        while (pc == null) {
            vc = vc.parentViewController;
            pc = vc._presentationController;
        }
        let toVC = pc.presentingViewController;
        let fromVC = pc.presentedViewController;
        let fromView = pc.presentedView;

        _MUIHideViewController(fromVC, toVC, null, this, function () {

            if (fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
                toVC.removeChildViewController(fromVC);
                let pc1 = fromVC.presentationController;
                let view = pc1.presentedView;
                view.removeFromSuperview();
            }
            else {
                // It's a window instead of a view
                let pc1 = fromVC.presentationController;
                let w = pc1.window as UIWindow;
                w.setHidden(true);
            }
        });
    }

    transitionFromViewControllerToViewController(fromVC, toVC, duration, options, animations?, completion?) {
        //TODO
    }

    viewDidLoad() { }

    viewWillAppear(animated?) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillAppear(animated);
        }

        this.view.setViewIsVisible(true);
    }

    viewDidAppear(animated?) {
        //this.view.setNeedsDisplay();

        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidAppear(animated);
        }
    }

    viewWillDisappear(animated?) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillDisappear(animated);
        }

        this.view.setViewIsVisible(false);
    }

    viewDidDisappear(animated?) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidDisappear(animated);
        }
    }

    contentHeight() {
        return this.view.getHeight();
    }

    setContentSize(size) {
        this.willChangeValue("contentSize");
        this._contentSize = size;
        this.didChangeValue("contentSize");
    }

    public set contentSize(size) {
        this.setContentSize(size);
    }

    public get contentSize() {
        return this._contentSize;
    }

    public set preferredContentSize(size) {
        this.setPreferredContentSize(size);
    }

    public get preferredContentSize() {
        return this._preferredContentSize;
    }

    setPreferredContentSize(size) {
        this.willChangeValue("preferredContentSize");
        this._preferredContentSize = size;
        this.didChangeValue("preferredContentSize");
    }

    // Storyboard
    storyboard:UIStoryboard = null;
    _outlets = {};
    _segues = [];

    _checkSegues() {

    }

    shouldPerformSegueWithIdentifier(identifier:string, sender:any):Boolean{
        return true;
    }

    prepareForSegue(segue:UIStoryboardSegue, sender:any){

    }

    performSegueWithIdentifier(identifier:string, sender:any){

    }
}

