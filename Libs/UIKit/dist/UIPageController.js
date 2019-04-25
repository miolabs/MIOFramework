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
/**
 * Created by godshadow on 11/3/16.
 */
var UIPageController = /** @class */ (function (_super) {
    __extends(UIPageController, _super);
    function UIPageController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedViewControllerIndex = 0;
        _this.pageControllersCount = 0;
        // Transitioning delegate
        _this._pageAnimationController = null;
        return _this;
    }
    UIPageController.prototype.addPageViewController = function (vc) {
        this.addChildViewController(vc);
        if (vc.transitioningDelegate == null)
            vc.transitioningDelegate = this;
        this.pageControllersCount++;
    };
    UIPageController.prototype._loadChildControllers = function () {
        if (this.childViewControllers.length == 0) {
            this._setViewLoaded(true);
        }
        else {
            var vc = this.childViewControllers[0];
            this.view.addSubview(vc.view);
            vc.onLoadView(this, function () {
                this._setViewLoaded(true);
            });
        }
    };
    UIPageController.prototype.viewWillAppear = function (animated) {
        var vc = this.childViewControllers[this.selectedViewControllerIndex];
        vc.viewWillAppear(animated);
        //vc._childControllersWillAppear();
    };
    UIPageController.prototype.viewDidAppear = function (animated) {
        var vc = this.childViewControllers[this.selectedViewControllerIndex];
        vc.viewDidAppear(animated);
        //vc._childControllersDidAppear();
    };
    UIPageController.prototype.viewWillDisappear = function (animated) {
        var vc = this.childViewControllers[this.selectedViewControllerIndex];
        vc.viewWillDisappear(animated);
        //vc._childControllersWillDisappear();
    };
    UIPageController.prototype.viewDidDisappear = function (animated) {
        var vc = this.childViewControllers[this.selectedViewControllerIndex];
        vc.viewDidDisappear(animated);
        //vc._childControllersDidDisappear();
    };
    UIPageController.prototype.showPageAtIndex = function (index) {
        if (this.selectedViewControllerIndex == -1)
            return;
        if (index == this.selectedViewControllerIndex)
            return;
        if (index < 0)
            return;
        if (index >= this.childViewControllers.length)
            return;
        var oldVC = this.childViewControllers[this.selectedViewControllerIndex];
        var newVC = this.childViewControllers[index];
        this.selectedViewControllerIndex = index;
        newVC.onLoadView(this, function () {
            this.view.addSubview(newVC.view);
            this.addChildViewController(newVC);
            MUICore_1._MIUShowViewController(oldVC, newVC, this, false, this, function () {
                oldVC.view.removeFromSuperview();
            });
        });
    };
    UIPageController.prototype.showNextPage = function () {
        this.showPageAtIndex(this.selectedViewControllerIndex + 1);
    };
    UIPageController.prototype.showPrevPage = function () {
        this.showPageAtIndex(this.selectedViewControllerIndex - 1);
    };
    UIPageController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._pageAnimationController == null) {
            this._pageAnimationController = new MIOPageAnimationController();
            this._pageAnimationController.init();
        }
        return this._pageAnimationController;
    };
    UIPageController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._pageAnimationController == null) {
            this._pageAnimationController = new MIOPageAnimationController();
            this._pageAnimationController.init();
        }
        return this._pageAnimationController;
    };
    return UIPageController;
}(UIViewController_1.UIViewController));
exports.UIPageController = UIPageController;
/*
 ANIMATIONS
 */
var MIOPageAnimationController = /** @class */ (function (_super) {
    __extends(MIOPageAnimationController, _super);
    function MIOPageAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOPageAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0;
    };
    MIOPageAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions
    };
    MIOPageAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOPageAnimationController.prototype.animations = function (transitionContext) {
        return null;
    };
    return MIOPageAnimationController;
}(MIOFoundation_1.MIOObject));
exports.MIOPageAnimationController = MIOPageAnimationController;
//# sourceMappingURL=UIPageController.js.map