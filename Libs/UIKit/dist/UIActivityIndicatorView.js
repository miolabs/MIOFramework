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
var UIView_1 = require("./UIView");
/**
 * Created by godshadow on 21/5/16.
 */
var UIActivityIndicatorViewStyle;
(function (UIActivityIndicatorViewStyle) {
    UIActivityIndicatorViewStyle[UIActivityIndicatorViewStyle["White"] = 0] = "White";
    UIActivityIndicatorViewStyle[UIActivityIndicatorViewStyle["WhiteLarge"] = 1] = "WhiteLarge";
    UIActivityIndicatorViewStyle[UIActivityIndicatorViewStyle["Gray"] = 2] = "Gray";
})(UIActivityIndicatorViewStyle = exports.UIActivityIndicatorViewStyle || (exports.UIActivityIndicatorViewStyle = {}));
var UIActivityIndicatorView = /** @class */ (function (_super) {
    __extends(UIActivityIndicatorView, _super);
    function UIActivityIndicatorView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._hidesWhenStopped = true;
        _this.isAnimating = false;
        _this._activityIndicatorViewStyle = UIActivityIndicatorViewStyle.White;
        return _this;
    }
    UIActivityIndicatorView.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.setHidden(true);
    };
    UIActivityIndicatorView.prototype.startAnimating = function () {
        this.setHidden(false);
    };
    UIActivityIndicatorView.prototype.stopAnimating = function () {
        this.setHidden(true);
    };
    Object.defineProperty(UIActivityIndicatorView.prototype, "hidesWhenStopped", {
        get: function () {
            return this._hidesWhenStopped;
        },
        set: function (value) {
            this._hidesWhenStopped = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIActivityIndicatorView.prototype, "animating", {
        get: function () {
            return this.isAnimating;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIActivityIndicatorView.prototype, "activityIndicatorViewStyle", {
        get: function () {
            return this._activityIndicatorViewStyle;
        },
        set: function (value) {
        },
        enumerable: true,
        configurable: true
    });
    return UIActivityIndicatorView;
}(UIView_1.UIView));
exports.UIActivityIndicatorView = UIActivityIndicatorView;
//# sourceMappingURL=UIActivityIndicatorView.js.map