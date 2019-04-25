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
 * Created by godshadow on 12/3/16.
 */
var UIControl = /** @class */ (function (_super) {
    __extends(UIControl, _super);
    function UIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // TODO: Make delegation of the methods above
        _this.mouseOverTarget = null;
        _this.mouseOverAction = null;
        _this.mouseOutTarget = null;
        _this.mouseOutAction = null;
        _this._enabled = true;
        return _this;
    }
    Object.defineProperty(UIControl.prototype, "enabled", {
        get: function () { return this._enabled; },
        set: function (value) { this.setEnabled(value); },
        enumerable: true,
        configurable: true
    });
    UIControl.prototype.setEnabled = function (enabled) {
        this._enabled = enabled;
        if (enabled == true)
            this.layer.style.opacity = "1.0";
        else
            this.layer.style.opacity = "0.10";
    };
    UIControl.prototype.setOnMouseOverAction = function (target, action) {
        this.mouseOverTarget = target;
        this.mouseOverAction = action;
        var instance = this;
        this.layer.onmouseover = function () {
            if (instance.enabled)
                instance.mouseOverAction.call(target);
        };
    };
    UIControl.prototype.setOnMouseOutAction = function (target, action) {
        this.mouseOutTarget = target;
        this.mouseOutAction = action;
        var instance = this;
        this.layer.onmouseout = function () {
            if (instance.enabled)
                instance.mouseOutAction.call(target);
        };
    };
    return UIControl;
}(UIView_1.UIView));
exports.UIControl = UIControl;
//# sourceMappingURL=UIControl.js.map