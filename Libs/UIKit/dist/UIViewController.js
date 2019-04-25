"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mio_foundation_web_1 = require("mio-foundation-web");
var UIView_1 = require("./UIView");
var UINavigationItem_1 = require("./UINavigationItem");
var UIViewController_PresentationController_1 = require("./UIViewController_PresentationController");
var UIViewController_PopoverPresentationController_1 = require("./UIViewController_PopoverPresentationController");
var MIOUI_CoreLayer_1 = require("./MIOUI_CoreLayer");
var MUICore_1 = require("./core/MUICore");
var UIWindow_1 = require("./UIWindow");
var mio_foundation_web_2 = require("mio-foundation-web");
/**
 * Created by godshadow on 11/3/16.
 */
var UIViewController = /** @class */ (function (_super) {
    __extends(UIViewController, _super);
    function UIViewController(layerID) {
        var _this = _super.call(this) || this;
        _this.layerID = null;
        _this.view = null;
        _this._htmlResourcePath = null;
        _this._onViewLoadedTarget = null;
        _this._onViewLoadedAction = null;
        _this._onLoadLayerTarget = null;
        _this._onLoadLayerAction = null;
        _this._viewIsLoaded = false;
        _this._layerIsReady = false;
        _this._childViewControllers = [];
        _this.parentViewController = null;
        _this.presentingViewController = null;
        _this.presentedViewController = null;
        _this.navigationController = null;
        _this.navigationItem = null;
        _this.splitViewController = null;
        _this.tabBarController = null;
        _this.modalPresentationStyle = mio_foundation_web_1.MIOCoreIsPhone() == true ? UIViewController_PresentationController_1.UIModalPresentationStyle.FullScreen : UIViewController_PresentationController_1.UIModalPresentationStyle.PageSheet;
        _this.modalTransitionStyle = UIViewController_PresentationController_1.UIModalTransitionStyle.CoverVertical;
        _this.transitioningDelegate = null;
        _this._contentSize = new mio_foundation_web_1.NSSize(320, 200);
        _this._preferredContentSize = null;
        _this._outlets = {};
        // removeFromParentViewController()
        // {
        //     this.parent.removeChildViewController(this);
        //     this.parent = null;
        //     this.view.removeFromSuperview();
        //     //this.didMoveToParentViewController(null);
        // }
        _this._presentationController = null;
        _this._popoverPresentationController = null;
        _this.layerID = layerID ? layerID : MIOUI_CoreLayer_1.UICoreLayerIDFromObject(_this);
        return _this;
    }
    UIViewController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.loadView();
    };
    UIViewController.prototype.initWithCoder = function (coder) {
    };
    UIViewController.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.init.call(this);
        this.view = new UIView_1.UIView(this.layerID);
        this.view.initWithLayer(layer, owner, options);
        // Search for navigation item
        this.navigationItem = UINavigationItem_1.UINavItemSearchInLayer(layer);
        this.loadView();
    };
    UIViewController.prototype.initWithResource = function (path) {
        if (path == null)
            throw new Error("MIOViewController:initWithResource can't be null");
        _super.prototype.init.call(this);
        this._htmlResourcePath = path;
        this.loadView();
    };
    UIViewController.prototype.localizeSubLayers = function (layers) {
        if (layers.length == 0)
            return;
        for (var index = 0; index < layers.length; index++) {
            var layer = layers[index];
            if (layer.tagName != "DIV")
                continue;
            var key = layer.getAttribute("data-localize-key");
            if (key != null)
                layer.innerHTML = mio_foundation_web_1.NSLocalizeString(key, key);
            this.localizeSubLayers(layer.childNodes);
        }
    };
    UIViewController.prototype.localizeLayerIDWithKey = function (layerID, key) {
        var layer = UIView_1.UILayerSearchElementByID(this.view.layer, layerID);
        layer.innerHTML = mio_foundation_web_1.NSLocalizeString(key, key);
    };
    UIViewController.prototype.loadView = function () {
        if (this.view != null) {
            this._didLoadView();
            return;
        }
        this.view = new UIView_1.UIView(this.layerID);
        if (this._htmlResourcePath == null) {
            this.view.init();
            MIOUI_CoreLayer_1.UICoreLayerAddStyle(this.view.layer, "page");
            this._didLoadView();
            return;
        }
        var mainBundle = mio_foundation_web_2.NSBundle.mainBundle();
        mainBundle.loadNibNamed(this._htmlResourcePath, this, null);
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
    };
    UIViewController.prototype._didLoadNibWithLayer = function (layerData) {
        var domParser = new DOMParser();
        var items = domParser.parseFromString(layerData, "text/html");
        var layer = items.getElementById("kk");
        this.navigationItem = UINavigationItem_1.UINavItemSearchInLayer(layer);
        this.view.initWithLayer(layer, this);
        this.view.awakeFromHTML();
        this._didLoadView();
    };
    UIViewController.prototype._didLoadView = function () {
        this._layerIsReady = true;
        if (mio_foundation_web_1.MIOCoreIsPhone() == true)
            MIOUI_CoreLayer_1.UICoreLayerAddStyle(this.view.layer, "phone");
        if (this._onLoadLayerTarget != null && this._onViewLoadedAction != null) {
            this._onLoadLayerAction.call(this._onLoadLayerTarget);
            this._onLoadLayerTarget = null;
            this._onLoadLayerAction = null;
        }
        if (this._onViewLoadedAction != null && this._onViewLoadedTarget != null) {
            this.viewDidLoad();
            this._loadChildControllers();
        }
    };
    UIViewController.prototype._loadChildControllers = function () {
        var count = this._childViewControllers.length;
        if (count > 0)
            this._loadChildViewController(0, count);
        else
            this._setViewLoaded(true);
    };
    UIViewController.prototype._loadChildViewController = function (index, max) {
        if (index < max) {
            var vc = this._childViewControllers[index];
            vc.onLoadView(this, function () {
                var newIndex = index + 1;
                this._loadChildViewController(newIndex, max);
            });
        }
        else {
            this._setViewLoaded(true);
        }
    };
    UIViewController.prototype._setViewLoaded = function (value) {
        this.willChangeValue("viewLoaded");
        this._viewIsLoaded = value;
        this.didChangeValue("viewLoaded");
        if (value == true && this._onViewLoadedAction != null) {
            this._onViewLoadedAction.call(this._onViewLoadedTarget);
        }
        this._onViewLoadedTarget = null;
        this._onViewLoadedAction = null;
        this.view.setNeedsDisplay();
    };
    UIViewController.prototype.onLoadView = function (target, action) {
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
    };
    UIViewController.prototype.onLoadLayer = function (target, action) {
        if (this._layerIsReady == true) {
            action.call(target);
        }
        else {
            this._onLoadLayerTarget = action;
            this._onLoadLayerAction = target;
        }
    };
    Object.defineProperty(UIViewController.prototype, "viewIsLoaded", {
        get: function () {
            return this._viewIsLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "childViewControllers", {
        get: function () {
            return this._childViewControllers;
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.addChildViewController = function (vc) {
        vc.parentViewController = this;
        this._childViewControllers.push(vc);
        //vc.willMoveToParentViewController(this);
    };
    UIViewController.prototype.removeChildViewController = function (vc) {
        var index = this._childViewControllers.indexOf(vc);
        if (index != -1) {
            this._childViewControllers.splice(index, 1);
            vc.parentViewController = null;
        }
    };
    Object.defineProperty(UIViewController.prototype, "isPresented", {
        get: function () {
            if (this._presentationController != null)
                return this._presentationController._isPresented;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "presentationController", {
        get: function () {
            // if (this._presentationController == null && this.parentViewController != null)
            //     return this.parentViewController.presentationController;
            return this._presentationController;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "popoverPresentationController", {
        get: function () {
            if (this._popoverPresentationController == null) {
                this._popoverPresentationController = new UIViewController_PopoverPresentationController_1.UIPopoverPresentationController();
                this._popoverPresentationController.init();
                this._popoverPresentationController.presentedViewController = this;
                this._presentationController = this._popoverPresentationController;
            }
            return this._popoverPresentationController;
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.showViewController = function (vc, animated) {
        vc.onLoadView(this, function () {
            this.view.addSubview(vc.view);
            this.addChildViewController(vc);
            MUICore_1._MIUShowViewController(this, vc, this, animated);
        });
    };
    UIViewController.prototype.presentViewController = function (vc, animated) {
        var pc = vc.presentationController;
        if (pc == null) {
            pc = new UIViewController_PresentationController_1.UIPresentationController();
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
            if (vc.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.CurrentContext) {
                this.view.addSubview(vc.presentationController.presentedView);
                this.addChildViewController(vc);
                MUICore_1._MIUShowViewController(this, vc, null, animated, this, function () {
                });
            }
            else {
                // It's a window instead of a view
                var w_1 = pc.window;
                if (w_1 == null) {
                    w_1 = new UIWindow_1.UIWindow();
                    w_1.init();
                    w_1.layer.style.background = "";
                    w_1.rootViewController = vc;
                    w_1.addSubview(pc.presentedView);
                    pc.window = w_1;
                }
                w_1.setHidden(false);
                MUICore_1._MIUShowViewController(this, vc, null, animated, this, function () {
                    w_1.makeKey();
                });
            }
        });
    };
    UIViewController.prototype.dismissViewController = function (animate) {
        var pc = this._presentationController;
        var vc = this;
        while (pc == null) {
            vc = vc.parentViewController;
            pc = vc._presentationController;
        }
        var toVC = pc.presentingViewController;
        var fromVC = pc.presentedViewController;
        var fromView = pc.presentedView;
        MUICore_1._UIHideViewController(fromVC, toVC, null, this, function () {
            if (fromVC.modalPresentationStyle == UIViewController_PresentationController_1.UIModalPresentationStyle.CurrentContext) {
                toVC.removeChildViewController(fromVC);
                var pc1 = fromVC.presentationController;
                var view = pc1.presentedView;
                view.removeFromSuperview();
            }
            else {
                // It's a window instead of a view
                var pc1 = fromVC.presentationController;
                var w = pc1.window;
                w.setHidden(true);
            }
        });
    };
    UIViewController.prototype.transitionFromViewControllerToViewController = function (fromVC, toVC, duration, animationType, target, completion) {
        //TODO
    };
    UIViewController.prototype.viewDidLoad = function () { };
    UIViewController.prototype.viewWillAppear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillAppear(animated);
        }
        this.view.setViewIsVisible(true);
    };
    UIViewController.prototype.viewDidAppear = function (animated) {
        //this.view.setNeedsDisplay();
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidAppear(animated);
        }
    };
    UIViewController.prototype.viewWillDisappear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillDisappear(animated);
        }
        this.view.setViewIsVisible(false);
    };
    UIViewController.prototype.viewDidDisappear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidDisappear(animated);
        }
    };
    UIViewController.prototype.contentHeight = function () {
        return this.view.getHeight();
    };
    UIViewController.prototype.setContentSize = function (size) {
        this.willChangeValue("contentSize");
        this._contentSize = size;
        this.didChangeValue("contentSize");
    };
    Object.defineProperty(UIViewController.prototype, "contentSize", {
        get: function () {
            return this._contentSize;
        },
        set: function (size) {
            this.setContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "preferredContentSize", {
        get: function () {
            return this._preferredContentSize;
        },
        set: function (size) {
            this.setPreferredContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.setPreferredContentSize = function (size) {
        this.willChangeValue("preferredContentSize");
        this._preferredContentSize = size;
        this.didChangeValue("preferredContentSize");
    };
    return UIViewController;
}(mio_foundation_web_1.NSObject));
exports.UIViewController = UIViewController;
//# sourceMappingURL=UIViewController.js.map