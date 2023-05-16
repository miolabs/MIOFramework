/**
 * Created by godshadow on 11/3/16.
 */

import { Bundle, NSCoder, NSObject } from "foundation";
import { MIOCoreIsPhone } from "mio-core";
import { UICoreLoadNibName, UICoreNibCoder } from "./core/UICoreNibParser";
import { CGSize } from "./CoreGraphics/CGSize";
import { UINavigationController } from "./UINavigationController";
import { UINavigationItem } from "./UINavigationItem";
import { UIPopoverPresentationController } from "./UIPopoverPresentationController";
import { UIModalPresentationStyle, UIModalTransitionStyle, UIPresentationController } from "./UIPresentationController";
import { UISplitViewController } from "./UISplitViewController";
import { UIStoryboard } from "./UIStoryboard";
import { UIStoryboardSegue } from "./UIStoryboardSegue";
import { UITabBarController } from "./UITabBarController";
import { UIView } from "./UIView";
import { UIWindow, _UIModalWindow } from "./UIWindow";
import { _UICoreHideViewController, _UIShowViewController } from "./core/UICore";


export class UIViewController extends NSObject
{
    view: UIView = null;
    private _nibName:string|null;

    // private _onViewLoadedTarget = null;
    private _onViewLoadCompletion = null;

    // private _onLoadLayerTarget = null;
    // private _onLoadLayerAction = null;

    private _viewIsLoaded = false;
    private _layerIsReady = false;

    private _childViewControllers: UIViewController[] = [];
    parentViewController: UIViewController = null;

    presentingViewController: UIViewController = null;
    presentedViewController: UIView = null;
    navigationController: UINavigationController = null;
    navigationItem: UINavigationItem = null;
    splitViewController: UISplitViewController = null;
    tabBarController: UITabBarController = null;

    modalPresentationStyle = MIOCoreIsPhone() == true ? UIModalPresentationStyle.fullScreen : UIModalPresentationStyle.pageSheet;
    modalTransitionStyle = UIModalTransitionStyle.coverVertical;
    transitioningDelegate = null;

    protected _contentSize = new CGSize(320, 200);
    protected _preferredContentSize = null;

    init() {
        super.init();
        this.loadView();
    }

    initWithCoder(coder: NSCoder) {
        if (coder instanceof UICoreNibCoder) {
            if ( this.view == null ) {
                this.view = coder.decodeContentView();
            } else {
                let cv = coder.decodeContentView();
                this.view.addSubview( cv );
            }
            this._assign_outlets( coder );
        }
        this._didLoadView();
    }

    private _assign_outlets( coder: UICoreNibCoder ){
        for (let key in this._outlets) {
            let obj = coder.outlets[ key ];
            let prop = this._outlets[ key ];
            this[ prop ] = obj;
        }
    }

    // initWithLayer(layer, owner, options?) {
    //     super.init();

    //     // this.view = MUICoreViewCreateView(layer, owner);
    //     // this.view._checkSegues();

    //     // Search for navigation item
    //     //this.navigationItem = UINavItemSearchInLayer(layer);        

    //     this.loadView();
    // }

    initWithNibName(nibName:string, bundle?:Bundle) {
        if (nibName == null) throw new Error("UIViewController:initWithNibName can't be null");
        super.init();

        this._nibName = nibName;
        this.loadView();
    }

    // localizeSubLayers(layers) {
    //     if (layers.length == 0)
    //         return;

    //     for (let index = 0; index < layers.length; index++) {
    //         let layer = layers[index];

    //         if (layer.tagName != "DIV") continue;

    //         let key = layer.getAttribute("data-localize-key");
    //         if (key != null)
    //             layer.innerHTML = NSLocalizeString(key, key);

    //         this.localizeSubLayers(layer.childNodes);
    //     }
    // }

    // localizeLayerIDWithKey(layerID, key) {
    //     let layer = MUICoreLayerSearchElementByID(this.view.layer, layerID);
    //     layer.innerHTML = NSLocalizeString(key, key);
    // }

    protected _contentView:UIView = null;
    loadView() {
        if (this.view != null) {
            this._didLoadView();
            return;
        }        

        if (this._nibName == null) {
            this.view = new UIView();
            this.view.init();
            // MUICoreLayerAddStyle(this.view.layer, "view-controller");
            //this.view.layer.style.height = "100%";
            this._didLoadView();
            return;
        }

        this.view = new UIView();
        this.view.init();                

        UICoreLoadNibName(this._nibName, this );
        // UICoreLoadNibName(this._nibName, this, (view:UIView, classname:string) => {
        //     this._loadViewFromNib(view, classname);
        // });

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
/*
    protected _loadViewFromNib(view:UIView, classname:string){
        // let layerID = layer.getAttribute("id");
        // if (layerID != null) this._outlets[layerID] = this;

        // this._contentView = new UIView();
        // this._contentView.initWithLayer(layer, this, {"Object": this});        
        // this.view.addSubview( view );

        // TODO: merge contents from dymmy view to loaded view
        // this.view = view;
        this.view.addSubview( view );
        
        // this._segues = this._contentView._segues;        
        this._checkSegues();
        this._didLoadView();
    }
*/
    // _didLoadNibWithLayer(layerData) {
    //     let domParser = new DOMParser();
    //     let items = domParser.parseFromString(layerData, "text/html");
    //     let layer = items.getElementById("kk");

    //     //this.navigationItem = UINavItemSearchInLayer(layer);

    //     // this.view.initWithLayer(layer, this);
    //     this.view.awakeFromHTML();

    //     this._didLoadView();
    // }

    _didLoadView() {
        this._layerIsReady = true;
        // if (MIOCoreIsPhone() == true) MUICoreLayerAddStyle(this.view.layer, "phone");

        // if (this._onLoadLayerTarget != null && this._onViewLoadedAction != null) {
        //     this._onLoadLayerAction.call( this._onLoadLayerTarget );
        //     this._onLoadLayerTarget = null;
        //     this._onLoadLayerAction = null;
        // }

        if ( this._onViewLoadCompletion != null ) {
            this.viewDidLoad();
            this._loadChildControllers();
        }
        else if ( this._nibName == null ) {
            this.viewDidLoad();
            this._loadChildControllers();
        }
    }

    protected _loadChildControllers() {
        let count = this._childViewControllers.length;

        if (count > 0)
            this._loadChildViewController( 0, count );
        else
            this._setViewLoaded( true );
    }

    protected _loadChildViewController( index:number, max:number ) {
        if (index < max) {
            let vc = this._childViewControllers[index];
            vc.onLoadView( () => {
                let newIndex = index + 1;
                this._loadChildViewController(newIndex, max);
            } );
        }
        else {
            this._setViewLoaded(true);
        }
    }

    protected _setViewLoaded( value:boolean ) {
        this.willChangeValue("viewLoaded");
        this._viewIsLoaded = value;
        this.didChangeValue("viewLoaded");

        if (value == true && this._onViewLoadCompletion != null) {
            this._onViewLoadCompletion();
        }
        
        this._onViewLoadCompletion = null;
        this.view.setNeedsDisplay();
    }

    onLoadView( completion:any ) {
        // this._onViewLoadedTarget = target;
        this._onViewLoadCompletion = completion;

        if (this._viewIsLoaded == true) {
            // action.call(target);
            completion();
            //this.view.setNeedsDisplay();
        }
        else if (this._layerIsReady == true) {
            this.viewDidLoad();
            this._loadChildControllers();
            //this.view.setNeedsDisplay();
        }
    }

    // onLoadLayer(target, action) {
    //     if (this._layerIsReady == true) {
    //         action.call(target);
    //     }
    //     else {
    //         this._onLoadLayerAction = target;
    //     }
    // }

    get viewLoaded() {
        return this._viewIsLoaded;
    }

    get childViewControllers() {
        return this._childViewControllers;
    }

    addChildViewController(vc: UIViewController) {
        vc.parentViewController = this;
        this._childViewControllers.addObject(vc);
        //vc.willMoveToParentViewController(this);
    }

    removeChildViewController(vc: UIViewController) {
        this._childViewControllers.removeObject( vc );
        vc.parentViewController = null;
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
        if (this._presentationController == null && this.parentViewController != null)
            return this.parentViewController.presentationController;

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

    showViewController( vc:UIViewController, animated:boolean ) {
        vc.onLoadView( () => {

            this.view.addSubview(vc.view);
            this.addChildViewController(vc);

            _UIShowViewController(this, vc, this, animated);
        });
    }

    presentViewController(vc: UIViewController, animated: boolean) {

        let pc = vc.presentationController as UIPresentationController;
        if (pc == null) {
            pc = new UIPresentationController();
            // pc.init();
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

        vc.onLoadView( () => {

            if (vc.modalPresentationStyle == UIModalPresentationStyle.currentContext) {
                let wv = new UIView();
                wv.init();
                // MUICoreLayerAddStyle(wv.layer, "window");
                // MUICoreLayerAddStyle(wv.layer, "alert");
                this.view.addSubview(wv);
                wv.addSubview(vc.presentationController.presentedView);
                this.addChildViewController(vc);
                // _MUIShowViewController(this, vc, null, animated, this, function () {
                // });
            }
            else {
                // It's a window instead of a view
                let w: UIWindow = vc.presentationController.window;
                if (w == null) {
                    w = new _UIModalWindow();
                    w.init();
                    // w.layer.style.background = "";
                    // w.layer.style.width = "100%";
                    // w.layer.style.height = "100%";
                    w.rootViewController = vc;
                    vc.presentationController.presentedView = vc.view;
                    // vc.view.layer.style.width = "100%";
                    // vc.view.layer.style.height = "100%";
                    w.addSubview(vc.presentationController.presentedView);
                    vc.presentationController.window = w;
                }
				w.setHidden(false);
				// if (vc instanceof UIAlertController) MUICoreLayerAddStyle(w.layer, "alert");

                _UIShowViewController(this, vc, null, animated, () => {
                    w.makeKey();
                } );
            }
        });
    }

    dismissViewController( animate:boolean ) {
        let pc = this._presentationController;
        let vc = this as UIViewController;
        while (pc == null) {
            vc = vc.parentViewController;
            pc = vc._presentationController;
        }
        let toVC = pc.presentingViewController;
        let fromVC = pc.presentedViewController;
        let fromView = pc.presentedView;

        _UICoreHideViewController(fromVC, toVC, null, () => {

            if (fromVC.modalPresentationStyle == UIModalPresentationStyle.currentContext) {
                toVC.removeChildViewController(fromVC);
                let pc1 = fromVC.presentationController;
                let view = pc1.presentedView;
                view.removeFromSuperview();
            }
            else {
                // It's a window instead of a view
                let pc1 = fromVC.presentationController;
                let w = pc1.window as UIWindow;
                // w.setHidden(true);
                w.removeFromSuperview();
            }
        } );
    }

    transitionFromViewControllerToViewController(fromVC:UIViewController, toVC:UIViewController, duration:number, options:any, animations?:any, completion?:any) {
        //TODO
    }

    viewDidLoad() { }

    viewWillAppear( animated:boolean ) {
        for (let index = 0; index < this._childViewControllers.length; index++) {
            let vc = this._childViewControllers[index];
            vc.viewWillAppear( animated );
        }

        this.view.setViewIsVisible(true);
    }

    viewDidAppear( animated:boolean ) {
        //this.view.setNeedsDisplay();

        for (let index = 0; index < this._childViewControllers.length; index++) {
            let vc = this._childViewControllers[index];
            vc.viewDidAppear( animated );
        }
    }

    viewWillDisappear( animated:boolean ) {
        for (let index = 0; index < this._childViewControllers.length; index++) {
            let vc = this._childViewControllers[index];
            vc.viewWillDisappear( animated );
        }

        this.view.setViewIsVisible(false);
    }

    viewDidDisappear( animated:boolean ) {
        for (let index = 0; index < this._childViewControllers.length; index++) {
            let vc = this._childViewControllers[index];
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
    storyboard:UIStoryboard|null = null;
    _outlets = {};
    _segues = [];

    _checkSegues() {

    }

    shouldPerformSegueWithIdentifier(identifier:string, sender:any):boolean{
        return true;
    }

    prepareForSegue(segue:UIStoryboardSegue, sender:any){

    }

    performSegueWithIdentifier(identifier:string, sender:any){

    }
}

