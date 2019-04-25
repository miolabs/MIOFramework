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
var MIOFoundation_1 = require("../MIOFoundation");
var platform_1 = require("../MIOCore/platform");
var MUICore_1 = require("./core/MUICore");
var MIOUI_CoreAnimation_1 = require("./MIOUI_CoreAnimation");
var _1 = require(".");
/**
 * Created by godshadow on 06/12/2016.
 */
var UIModalPresentationStyle;
(function (UIModalPresentationStyle) {
    UIModalPresentationStyle[UIModalPresentationStyle["FullScreen"] = 0] = "FullScreen";
    UIModalPresentationStyle[UIModalPresentationStyle["PageSheet"] = 1] = "PageSheet";
    UIModalPresentationStyle[UIModalPresentationStyle["FormSheet"] = 2] = "FormSheet";
    UIModalPresentationStyle[UIModalPresentationStyle["CurrentContext"] = 3] = "CurrentContext";
    UIModalPresentationStyle[UIModalPresentationStyle["Custom"] = 4] = "Custom";
    UIModalPresentationStyle[UIModalPresentationStyle["OverFullScreen"] = 5] = "OverFullScreen";
    UIModalPresentationStyle[UIModalPresentationStyle["OverCurrentContext"] = 6] = "OverCurrentContext";
    UIModalPresentationStyle[UIModalPresentationStyle["Popover"] = 7] = "Popover";
    UIModalPresentationStyle[UIModalPresentationStyle["None"] = 8] = "None";
})(UIModalPresentationStyle = exports.UIModalPresentationStyle || (exports.UIModalPresentationStyle = {}));
var UIModalTransitionStyle;
(function (UIModalTransitionStyle) {
    UIModalTransitionStyle[UIModalTransitionStyle["CoverVertical"] = 0] = "CoverVertical";
    UIModalTransitionStyle[UIModalTransitionStyle["FlipHorizontal"] = 1] = "FlipHorizontal";
    UIModalTransitionStyle[UIModalTransitionStyle["CrossDisolve"] = 2] = "CrossDisolve";
})(UIModalTransitionStyle = exports.UIModalTransitionStyle || (exports.UIModalTransitionStyle = {}));
var UIPresentationController = /** @class */ (function (_super) {
    __extends(UIPresentationController, _super);
    function UIPresentationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.presentationStyle = UIModalPresentationStyle.PageSheet;
        _this.shouldPresentInFullscreen = false;
        _this._presentedViewController = null; //ToVC
        _this.presentingViewController = null; //FromVC
        _this.presentedView = null;
        _this._transitioningDelegate = null;
        _this._window = null;
        _this._isPresented = false;
        return _this;
    }
    UIPresentationController.prototype.initWithPresentedViewControllerAndPresentingViewController = function (presentedViewController, presentingViewController) {
        _super.prototype.init.call(this);
        this.presentedViewController = presentedViewController;
        this.presentingViewController = presentingViewController;
    };
    UIPresentationController.prototype.setPresentedViewController = function (vc) {
        this._presentedViewController = vc;
        this.presentedView = vc.view;
    };
    Object.defineProperty(UIPresentationController.prototype, "presentedViewController", {
        get: function () {
            return this._presentedViewController;
        },
        set: function (vc) {
            this.setPresentedViewController(vc);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIPresentationController.prototype, "transitioningDelegate", {
        get: function () {
            if (this._transitioningDelegate == null) {
                this._transitioningDelegate = new MIOModalTransitioningDelegate();
                this._transitioningDelegate.init();
            }
            return this._transitioningDelegate;
        },
        enumerable: true,
        configurable: true
    });
    UIPresentationController.prototype.presentationTransitionWillBegin = function () {
        var toVC = this.presentedViewController;
        var view = this.presentedView;
        this._calculateFrame();
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
            || platform_1.MIOCoreIsPhone() == true) {
            _1.UICoreLayerAddStyle(view.layer, "modal_window");
        }
    };
    UIPresentationController.prototype.presentationTransitionDidEnd = function (completed) {
    };
    UIPresentationController.prototype.dismissalTransitionWillBegin = function () {
    };
    UIPresentationController.prototype.dismissalTransitionDidEnd = function (completed) {
    };
    UIPresentationController.prototype._calculateFrame = function () {
        var fromVC = this.presentingViewController;
        var toVC = this.presentedViewController;
        var view = this.presentedView;
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            view.layer.style.left = "0px";
            view.layer.style.top = "0px";
            view.layer.style.width = "100%";
            view.layer.style.height = "100%";
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
            var w = fromVC.view.getWidth();
            var h = fromVC.view.getHeight();
            view.setFrame(MIOFoundation_1.MIORect.rectWithValues(0, 0, w, h));
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet) {
            // Present like desktop sheet window
            var ws = MUICore_1.UIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new MIOFoundation_1.MIOSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            view.setFrame(MIOFoundation_1.MIORect.rectWithValues(0, 0, w, h));
            this.window.setFrame(MIOFoundation_1.MIORect.rectWithValues(x, 0, w, h));
            view.layer.classList.add("modal");
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet) {
            // Present at the center of the screen
            var ws = MUICore_1.UIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new MIOFoundation_1.MIOSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            var y = (ws.height - h) / 2;
            view.setFrame(MIOFoundation_1.MIORect.rectWithValues(0, 0, w, h));
            this.window.setFrame(MIOFoundation_1.MIORect.rectWithValues(x, y, w, h));
            view.layer.classList.add("modal");
        }
        else {
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new MIOFoundation_1.MIOSize(320, 200);
            var w = size.width;
            var h = size.height;
            view.setFrame(MIOFoundation_1.MIORect.rectWithValues(0, 0, w, h));
        }
    };
    Object.defineProperty(UIPresentationController.prototype, "window", {
        get: function () {
            return this._window;
        },
        set: function (window) {
            var vc = this.presentedViewController;
            this._window = window;
            // Track view frame changes
            if (platform_1.MIOCoreIsMobile() == false && vc.modalPresentationStyle != UIModalPresentationStyle.CurrentContext) {
                vc.addObserver(this, "preferredContentSize");
            }
        },
        enumerable: true,
        configurable: true
    });
    UIPresentationController.prototype.observeValueForKeyPath = function (key, type, object) {
        if (key == "preferredContentSize" && type == "did") {
            var vc = this.presentedView;
            //this.window.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            vc.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            this._calculateFrame();
        }
    };
    return UIPresentationController;
}(MIOFoundation_1.MIOObject));
exports.UIPresentationController = UIPresentationController;
var MIOModalTransitioningDelegate = /** @class */ (function (_super) {
    __extends(MIOModalTransitioningDelegate, _super);
    function MIOModalTransitioningDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modalTransitionStyle = null;
        _this._presentAnimationController = null;
        _this._dissmissAnimationController = null;
        return _this;
    }
    MIOModalTransitioningDelegate.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._presentAnimationController == null) {
            this._presentAnimationController = new MIOModalPresentAnimationController();
            this._presentAnimationController.init();
        }
        return this._presentAnimationController;
    };
    MIOModalTransitioningDelegate.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._dissmissAnimationController == null) {
            this._dissmissAnimationController = new MIOModalDismissAnimationController();
            this._dissmissAnimationController.init();
        }
        return this._dissmissAnimationController;
    };
    return MIOModalTransitioningDelegate;
}(MIOFoundation_1.MIOObject));
exports.MIOModalTransitioningDelegate = MIOModalTransitioningDelegate;
var MIOAnimationController = /** @class */ (function (_super) {
    __extends(MIOAnimationController, _super);
    function MIOAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0;
    };
    MIOAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions        
    };
    MIOAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOAnimationController.prototype.animations = function (transitionContext) {
        return null;
    };
    return MIOAnimationController;
}(MIOFoundation_1.MIOObject));
exports.MIOAnimationController = MIOAnimationController;
var MIOModalPresentAnimationController = /** @class */ (function (_super) {
    __extends(MIOModalPresentAnimationController, _super);
    function MIOModalPresentAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOModalPresentAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.15;
    };
    MIOModalPresentAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions
    };
    MIOModalPresentAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOModalPresentAnimationController.prototype.animations = function (transitionContext) {
        var animations = null;
        var toVC = transitionContext.presentedViewController;
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            if (platform_1.MIOCoreIsPhone() == true)
                animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.SlideInUp);
            else
                animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.BeginSheet);
        }
        return animations;
    };
    return MIOModalPresentAnimationController;
}(MIOFoundation_1.MIOObject));
exports.MIOModalPresentAnimationController = MIOModalPresentAnimationController;
var MIOModalDismissAnimationController = /** @class */ (function (_super) {
    __extends(MIOModalDismissAnimationController, _super);
    function MIOModalDismissAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOModalDismissAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MIOModalDismissAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    MIOModalDismissAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOModalDismissAnimationController.prototype.animations = function (transitionContext) {
        var animations = null;
        var fromVC = transitionContext.presentingViewController;
        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            if (platform_1.MIOCoreIsPhone() == true)
                animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.SlideOutDown);
            else
                animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.EndSheet);
        }
        return animations;
    };
    return MIOModalDismissAnimationController;
}(MIOFoundation_1.MIOObject));
exports.MIOModalDismissAnimationController = MIOModalDismissAnimationController;
//# sourceMappingURL=UIViewController_PresentationController.js.map