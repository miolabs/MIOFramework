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
var UIViewController_PresentationController_1 = require("./UIViewController_PresentationController");
var MIOFoundation_1 = require("../MIOFoundation");
var MIOUI_CoreAnimation_1 = require("./MIOUI_CoreAnimation");
var _1 = require(".");
/**
 * Created by godshadow on 11/11/2016.
 */
var UIPopoverArrowDirection;
(function (UIPopoverArrowDirection) {
    UIPopoverArrowDirection[UIPopoverArrowDirection["Any"] = 0] = "Any";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Up"] = 1] = "Up";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Down"] = 2] = "Down";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Left"] = 3] = "Left";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Right"] = 4] = "Right";
})(UIPopoverArrowDirection = exports.UIPopoverArrowDirection || (exports.UIPopoverArrowDirection = {}));
var UIPopoverPresentationController = /** @class */ (function (_super) {
    __extends(UIPopoverPresentationController, _super);
    function UIPopoverPresentationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.permittedArrowDirections = UIPopoverArrowDirection.Any;
        _this.sourceView = null;
        _this.sourceRect = MIOFoundation_1.MIORect.Zero();
        _this.delegate = null;
        _this._contentSize = null;
        _this._canvasLayer = null;
        _this._contentView = null;
        return _this;
    }
    Object.defineProperty(UIPopoverPresentationController.prototype, "transitioningDelegate", {
        get: function () {
            if (this._transitioningDelegate == null) {
                this._transitioningDelegate = new MIOModalPopOverTransitioningDelegate();
                this._transitioningDelegate.init();
            }
            return this._transitioningDelegate;
        },
        enumerable: true,
        configurable: true
    });
    UIPopoverPresentationController.prototype.presentationTransitionWillBegin = function () {
        //if (MIOCoreIsPhone() == true) return;
        this._calculateFrame();
        _1.UICoreLayerAddStyle(this.presentedView.layer, "popover_window");
    };
    UIPopoverPresentationController.prototype.dismissalTransitionDidEnd = function (completed) {
        if (completed == false)
            return;
        if (this.delegate != null && (typeof this.delegate.popoverPresentationControllerDidDismissPopover === "function")) {
            this.delegate.popoverPresentationControllerDidDismissPopover(this);
        }
    };
    UIPopoverPresentationController.prototype._calculateFrame = function () {
        var vc = this.presentedViewController;
        var view = this.presentedView;
        var w = vc.preferredContentSize.width;
        var h = vc.preferredContentSize.height;
        var v = vc.popoverPresentationController.sourceView;
        var f = vc.popoverPresentationController.sourceRect;
        var xShift = false;
        // Below
        var y = v.layer.getBoundingClientRect().top + f.size.height + 10;
        if ((y + h) > window.innerHeight) // Below no, Up?
            y = v.layer.getBoundingClientRect().top - h - 10;
        if (y < 0) // Up no, horizonal shift
         {
            xShift = true;
            y = (window.innerHeight - h) / 2;
        }
        var x = 0;
        if (xShift == false) {
            x = v.layer.getBoundingClientRect().left + 10;
            if ((x + w) > window.innerWidth)
                x = v.layer.getBoundingClientRect().left + f.size.width - w + 10;
        }
        else {
            x = v.layer.getBoundingClientRect().left + f.size.width + 10;
            if ((x + w) > window.innerWidth)
                x = v.layer.getBoundingClientRect().left - w - 10;
        }
        view.setFrame(MIOFoundation_1.MIORect.rectWithValues(0, 0, w, h));
        this.window.setFrame(MIOFoundation_1.MIORect.rectWithValues(x, y, w, h));
    };
    UIPopoverPresentationController.prototype._drawRoundRect = function (x, y, width, height, radius) {
        var ctx = this._canvasLayer.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        var color = 'rgba(208, 208, 219, 1)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
    };
    return UIPopoverPresentationController;
}(UIViewController_PresentationController_1.UIPresentationController));
exports.UIPopoverPresentationController = UIPopoverPresentationController;
var MIOModalPopOverTransitioningDelegate = /** @class */ (function (_super) {
    __extends(MIOModalPopOverTransitioningDelegate, _super);
    function MIOModalPopOverTransitioningDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modalTransitionStyle = null;
        _this._showAnimationController = null;
        _this._dissmissAnimationController = null;
        return _this;
    }
    MIOModalPopOverTransitioningDelegate.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._showAnimationController == null) {
            // if (MIOCoreIsPhone() == false) {
            this._showAnimationController = new MIOPopOverPresentAnimationController();
            this._showAnimationController.init();
            // }
            // else {
            //     this._showAnimationController = new MIOModalPresentAnimationController();
            //     this._showAnimationController.init();
            // }
        }
        return this._showAnimationController;
    };
    MIOModalPopOverTransitioningDelegate.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._dissmissAnimationController == null) {
            //            if (MIOCoreIsPhone() == false) {
            this._dissmissAnimationController = new MIOPopOverDismissAnimationController();
            this._dissmissAnimationController.init();
            // }
            // else {
            //     this._dissmissAnimationController = new MIOModalDismissAnimationController();
            //     this._dissmissAnimationController.init();    
            // }
        }
        return this._dissmissAnimationController;
    };
    return MIOModalPopOverTransitioningDelegate;
}(MIOFoundation_1.MIOObject));
exports.MIOModalPopOverTransitioningDelegate = MIOModalPopOverTransitioningDelegate;
var MIOPopOverPresentAnimationController = /** @class */ (function (_super) {
    __extends(MIOPopOverPresentAnimationController, _super);
    function MIOPopOverPresentAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOPopOverPresentAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MIOPopOverPresentAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions
    };
    MIOPopOverPresentAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOPopOverPresentAnimationController.prototype.animations = function (transitionContext) {
        var animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.FadeIn);
        return animations;
    };
    return MIOPopOverPresentAnimationController;
}(MIOFoundation_1.MIOObject));
exports.MIOPopOverPresentAnimationController = MIOPopOverPresentAnimationController;
var MIOPopOverDismissAnimationController = /** @class */ (function (_super) {
    __extends(MIOPopOverDismissAnimationController, _super);
    function MIOPopOverDismissAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOPopOverDismissAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MIOPopOverDismissAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    MIOPopOverDismissAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOPopOverDismissAnimationController.prototype.animations = function (transitionContext) {
        var animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.FadeOut);
        return animations;
    };
    return MIOPopOverDismissAnimationController;
}(MIOFoundation_1.MIOObject));
exports.MIOPopOverDismissAnimationController = MIOPopOverDismissAnimationController;
//# sourceMappingURL=UIViewController_PopoverPresentationController.js.map