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
var UIViewController_1 = require("./UIViewController");
var MIOFoundation_1 = require("../MIOFoundation");
var MUICore_1 = require("./core/MUICore");
var MIOUI_CoreAnimation_1 = require("./MIOUI_CoreAnimation");
/**
 * Created by godshadow on 9/4/16.
 */
var UINavigationController = /** @class */ (function (_super) {
    __extends(UINavigationController, _super);
    function UINavigationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootViewController = null;
        _this.viewControllersStack = [];
        _this.currentViewControllerIndex = -1;
        // Transitioning delegate
        _this._pushAnimationController = null;
        _this._popAnimationController = null;
        return _this;
    }
    UINavigationController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.view.layer.style.overflow = "hidden";
    };
    UINavigationController.prototype.initWithRootViewController = function (vc) {
        this.init();
        this.setRootViewController(vc);
    };
    UINavigationController.prototype.setRootViewController = function (vc) {
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
    };
    UINavigationController.prototype.viewWillAppear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewWillAppear(animated);
    };
    UINavigationController.prototype.viewDidAppear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewDidAppear(animated);
    };
    UINavigationController.prototype.viewWillDisappear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewWillDisappear(animated);
    };
    UINavigationController.prototype.viewDidDisappear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewDidDisappear(animated);
    };
    UINavigationController.prototype.pushViewController = function (vc, animated) {
        var lastVC = this.viewControllersStack[this.currentViewControllerIndex];
        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex++;
        vc.navigationController = this;
        vc.onLoadView(this, function () {
            if (vc.navigationItem != null && vc.navigationItem.backBarButtonItem != null) {
                vc.navigationItem.backBarButtonItem.setAction(this, function () {
                    vc.navigationController.popViewController();
                });
            }
            this.view.addSubview(vc.view);
            this.addChildViewController(vc);
            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;
            MUICore_1._MIUShowViewController(lastVC, vc, this, animated);
        });
    };
    UINavigationController.prototype.popViewController = function (animated) {
        if (this.currentViewControllerIndex == 0)
            return;
        var fromVC = this.viewControllersStack[this.currentViewControllerIndex];
        this.currentViewControllerIndex--;
        this.viewControllersStack.pop();
        var toVC = this.viewControllersStack[this.currentViewControllerIndex];
        // if (toVC.transitioningDelegate == null)
        //     toVC.transitioningDelegate = this;
        if (toVC.preferredContentSize != null)
            this.contentSize = toVC.preferredContentSize;
        MUICore_1._UIHideViewController(fromVC, toVC, this, this, function () {
            fromVC.removeChildViewController(this);
            fromVC.view.removeFromSuperview();
        });
    };
    UINavigationController.prototype.popToRootViewController = function (animated) {
        if (this.viewControllersStack.length == 1)
            return;
        var currentVC = this.viewControllersStack.pop();
        for (var index = this.currentViewControllerIndex - 1; index > 0; index--) {
            var vc = this.viewControllersStack.pop();
            vc.view.removeFromSuperview();
            this.removeChildViewController(vc);
        }
        this.currentViewControllerIndex = 0;
        var rootVC = this.viewControllersStack[0];
        this.contentSize = rootVC.preferredContentSize;
        MUICore_1._UIHideViewController(currentVC, rootVC, this, this, function () {
            currentVC.view.removeFromSuperview();
            this.removeChildViewController(currentVC);
        });
    };
    Object.defineProperty(UINavigationController.prototype, "preferredContentSize", {
        get: function () {
            if (this.currentViewControllerIndex < 0)
                return this._preferredContentSize;
            var vc = this.viewControllersStack[this.currentViewControllerIndex];
            return vc.preferredContentSize;
        },
        set: function (size) {
            this.setPreferredContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    UINavigationController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._pushAnimationController == null) {
            this._pushAnimationController = new UIPushAnimationController();
            this._pushAnimationController.init();
        }
        return this._pushAnimationController;
    };
    UINavigationController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._popAnimationController == null) {
            this._popAnimationController = new UIPopAnimationController();
            this._popAnimationController.init();
        }
        return this._popAnimationController;
    };
    return UINavigationController;
}(UIViewController_1.UIViewController));
exports.UINavigationController = UINavigationController;
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
        var animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.Push);
        return animations;
    };
    return UIPushAnimationController;
}(MIOFoundation_1.MIOObject));
exports.UIPushAnimationController = UIPushAnimationController;
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
        var animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.Pop);
        return animations;
    };
    return UIPopAnimationController;
}(MIOFoundation_1.MIOObject));
exports.UIPopAnimationController = UIPopAnimationController;
//# sourceMappingURL=UINavigationController.js.map