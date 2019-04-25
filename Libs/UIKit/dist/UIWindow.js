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
var UIWebApplication_1 = require("./UIWebApplication");
var UIView_1 = require("./UIView");
var UIViewController_PopoverPresentationController_1 = require("./UIViewController_PopoverPresentationController");
var _1 = require(".");
/**
 * Created by godshadow on 11/3/16.
 */
var UIWindow = /** @class */ (function (_super) {
    __extends(UIWindow, _super);
    function UIWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootViewController = null;
        _this._resizeWindow = false;
        return _this;
    }
    UIWindow.prototype.init = function () {
        _super.prototype.init.call(this);
        _1.UICoreLayerAddStyle(this.layer, "view");
    };
    UIWindow.prototype.initWithRootViewController = function (vc) {
        this.init();
        this.rootViewController = vc;
        this.addSubview(vc.view);
    };
    UIWindow.prototype.makeKey = function () {
        UIWebApplication_1.UIWebApplication.sharedInstance().makeKeyWindow(this);
    };
    UIWindow.prototype.makeKeyAndVisible = function () {
        this.makeKey();
        this.setHidden(false);
    };
    UIWindow.prototype.layoutSubviews = function () {
        if (this.rootViewController != null)
            this.rootViewController.view.layoutSubviews();
        else
            _super.prototype.layoutSubviews.call(this);
    };
    UIWindow.prototype.addSubview = function (view) {
        view._window = this;
        _super.prototype.addSubview.call(this, view);
    };
    UIWindow.prototype._addLayerToDOM = function () {
        if (this._isLayerInDOM == true)
            return;
        if (this.layer == null)
            return;
        document.body.appendChild(this.layer);
        this._isLayerInDOM = true;
    };
    UIWindow.prototype.removeFromSuperview = function () {
        this._removeLayerFromDOM();
    };
    UIWindow.prototype._removeLayerFromDOM = function () {
        if (this._isLayerInDOM == false)
            return;
        document.body.removeChild(this.layer);
        this._isLayerInDOM = false;
    };
    UIWindow.prototype.setHidden = function (hidden) {
        if (hidden == false) {
            this._addLayerToDOM();
        }
        else {
            this._removeLayerFromDOM();
        }
    };
    UIWindow.prototype._eventHappendOutsideWindow = function () {
        this._dismissRootViewController();
    };
    UIWindow.prototype._becameKeyWindow = function () {
    };
    UIWindow.prototype._resignKeyWindow = function () {
        this._dismissRootViewController();
    };
    UIWindow.prototype._dismissRootViewController = function () {
        if (this.rootViewController.isPresented == true) {
            var pc = this.rootViewController.presentationController;
            if (pc instanceof UIViewController_PopoverPresentationController_1.UIPopoverPresentationController)
                this.rootViewController.dismissViewController(true);
        }
    };
    return UIWindow;
}(UIView_1.UIView));
exports.UIWindow = UIWindow;
//# sourceMappingURL=UIWindow.js.map