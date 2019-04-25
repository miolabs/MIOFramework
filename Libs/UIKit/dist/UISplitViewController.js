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
var MUICore_1 = require("./core/MUICore");
var UIView_1 = require("./UIView");
var UIViewController_1 = require("./UIViewController");
var _1 = require(".");
var platform_1 = require("../MIOCore/platform");
var MIOFoundation_1 = require("../MIOFoundation");
var MIOUI_1 = require("../MIOUI");
var MIOUI_CoreAnimation_1 = require("./MIOUI_CoreAnimation");
var UIButton_1 = require("./UIButton");
/**
 * Created by godshadow on 05/08/16.
 */
var UISplitViewControllerDisplayMode;
(function (UISplitViewControllerDisplayMode) {
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["Automatic"] = 0] = "Automatic";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["PrimaryHidden"] = 1] = "PrimaryHidden";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["AllVisible"] = 2] = "AllVisible";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["PrimaryOverlay"] = 3] = "PrimaryOverlay";
})(UISplitViewControllerDisplayMode = exports.UISplitViewControllerDisplayMode || (exports.UISplitViewControllerDisplayMode = {}));
var UISplitViewController = /** @class */ (function (_super) {
    __extends(UISplitViewController, _super);
    function UISplitViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.masterView = null;
        _this.detailView = null;
        _this.preferredDisplayMode = UISplitViewControllerDisplayMode.Automatic;
        _this._displayModeButtonItem = null;
        _this._collapsed = false;
        _this._masterViewController = null;
        _this._detailViewController = null;
        // Transitioning delegate
        _this._pushAnimationController = null;
        _this._popAnimationController = null;
        return _this;
    }
    UISplitViewController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.masterView = new UIView_1.UIView();
        this.masterView.init();
        if (platform_1.MIOCoreIsPhone() == false)
            _1.UICoreLayerAddStyle(this.masterView.layer, "master-view");
        this.view.addSubview(this.masterView);
        if (platform_1.MIOCoreIsPhone() == false) {
            this.detailView = new UIView_1.UIView();
            this.detailView.init();
            _1.UICoreLayerAddStyle(this.detailView.layer, "detail-view");
            this.view.addSubview(this.detailView);
        }
    };
    Object.defineProperty(UISplitViewController.prototype, "displayMode", {
        get: function () {
            return UISplitViewControllerDisplayMode.Automatic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "displayModeButtonItem", {
        get: function () {
            if (this._displayModeButtonItem != null)
                return this._displayModeButtonItem;
            this._displayModeButtonItem = new UIButton_1.UIButton();
            this._displayModeButtonItem.initWithAction(this, this.displayModeButtonItemAction);
            return this._displayModeButtonItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "collapsed", {
        get: function () {
            return this._collapsed;
        },
        enumerable: true,
        configurable: true
    });
    UISplitViewController.prototype.setCollapsed = function (value) {
        this.willChangeValue("collapsed");
        this._collapsed = value;
        this.didChangeValue("collapsed");
    };
    UISplitViewController.prototype.setMasterViewController = function (vc) {
        if (this._masterViewController != null) {
            this._masterViewController.view.removeFromSuperview();
            this.removeChildViewController(this._masterViewController);
            this._masterViewController = null;
        }
        if (vc != null) {
            vc.parent = this;
            vc.splitViewController = this;
            this.masterView.addSubview(vc.view);
            this.addChildViewController(vc);
            this._masterViewController = vc;
        }
    };
    UISplitViewController.prototype.setDetailViewController = function (vc) {
        if (platform_1.MIOCoreIsPhone() == true)
            return;
        if (this._detailViewController != null) {
            this._detailViewController.view.removeFromSuperview();
            this.removeChildViewController(this._detailViewController);
            this._detailViewController = null;
        }
        if (vc != null) {
            vc.parent = this;
            vc.splitViewController = this;
            this.detailView.addSubview(vc.view);
            this.addChildViewController(vc);
            this._detailViewController = vc;
        }
    };
    UISplitViewController.prototype.showDetailViewController = function (vc) {
        vc.splitViewController = this;
        if (platform_1.MIOCoreIsPhone() == true) {
            this._pushDetailViewController(vc);
        }
        else {
            this._showDetailViewController(vc);
        }
    };
    Object.defineProperty(UISplitViewController.prototype, "masterViewController", {
        get: function () {
            return this._masterViewController;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "detailViewController", {
        get: function () {
            return this._detailViewController;
        },
        enumerable: true,
        configurable: true
    });
    UISplitViewController.prototype._showDetailViewController = function (vc) {
        var oldVC = this._detailViewController;
        var newVC = vc;
        if (oldVC == newVC)
            return;
        newVC.onLoadView(this, function () {
            this.detailView.addSubview(newVC.view);
            this.addChildViewController(newVC);
            this._detailViewController = vc;
            MUICore_1._MIUShowViewController(oldVC, newVC, this, false, this, function () {
                oldVC.view.removeFromSuperview();
                this.removeChildViewController(oldVC);
            });
        });
    };
    UISplitViewController.prototype._pushDetailViewController = function (vc) {
        var oldVC = this._masterViewController;
        //if (vc.transitioningDelegate == null) vc.transitioningDelegate = this;
        vc.onLoadView(this, function () {
            this.view.addSubview(vc.view);
            this.addChildViewController(vc);
            this._detailViewController = vc;
            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;
            MUICore_1._MIUShowViewController(oldVC, vc, this, true, this, function () {
                this.setCollapsed(true);
            });
        });
    };
    UISplitViewController.prototype._popViewController = function () {
        var fromVC = this.detailViewController;
        var toVC = this.masterViewController;
        // if (toVC.transitioningDelegate == null)
        //     toVC.transitioningDelegate = this;
        if (toVC.preferredContentSize != null)
            this.contentSize = toVC.preferredContentSize;
        MUICore_1._UIHideViewController(fromVC, toVC, this, this, function () {
            fromVC.removeChildViewController(this);
            fromVC.view.removeFromSuperview();
        });
    };
    UISplitViewController.prototype.displayModeButtonItemAction = function () {
        if (platform_1.MIOCoreIsPhone() == true)
            this._popViewController();
    };
    UISplitViewController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (platform_1.MIOCoreIsPhone() == false)
            return;
        if (this._pushAnimationController == null) {
            this._pushAnimationController = new UIPushAnimationController();
            this._pushAnimationController.init();
        }
        return this._pushAnimationController;
    };
    UISplitViewController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (platform_1.MIOCoreIsPhone() == false)
            return;
        if (this._popAnimationController == null) {
            this._popAnimationController = new UIPopAnimationController();
            this._popAnimationController.init();
        }
        return this._popAnimationController;
    };
    return UISplitViewController;
}(UIViewController_1.UIViewController));
exports.UISplitViewController = UISplitViewController;
/*
    ANIMATIONS
 */
var UIPushAnimationController = /** @class */ (function (_super) {
    __extends(UIPushAnimationController, _super);
    function UIPushAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIPushAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    UIPushAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions       
    };
    UIPushAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIPushAnimationController.prototype.animations = function (transitionContext) {
        var animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_1.UIAnimationType.Push);
        return animations;
    };
    return UIPushAnimationController;
}(MIOFoundation_1.MIOObject));
var UIPopAnimationController = /** @class */ (function (_super) {
    __extends(UIPopAnimationController, _super);
    function UIPopAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIPopAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    UIPopAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    UIPopAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIPopAnimationController.prototype.animations = function (transitionContext) {
        var animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_1.UIAnimationType.Pop);
        return animations;
    };
    return UIPopAnimationController;
}(MIOFoundation_1.MIOObject));
//# sourceMappingURL=UISplitViewController.js.map