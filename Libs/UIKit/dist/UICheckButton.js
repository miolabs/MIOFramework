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
var UIControl_1 = require("./UIControl");
var MUICoreLayer_1 = require("./core/MUICoreLayer");
/**
 * Created by godshadow on 12/3/16.
 */
var UICheckButton = /** @class */ (function (_super) {
    __extends(UICheckButton, _super);
    function UICheckButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.action = null;
        _this._on = false;
        return _this;
    }
    UICheckButton.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayer_1.MUICoreLayerAddStyle(this.layer, "checkbox");
    };
    UICheckButton.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.layer.addEventListener("click", this._on_click.bind(this), false);
    };
    UICheckButton.prototype._on_click = function (ev) {
        if (this.enabled) {
            this.toggleValue();
        }
    };
    UICheckButton.prototype.setOnChangeValue = function (target, action) {
        this.target = target;
        this.action = action;
    };
    Object.defineProperty(UICheckButton.prototype, "on", {
        get: function () {
            return this._on;
        },
        set: function (value) {
            this.setOn(value);
        },
        enumerable: true,
        configurable: true
    });
    UICheckButton.prototype.setOn = function (on) {
        this._on = on;
        if (on == true) {
            MUICoreLayer_1.MUICoreLayerAddStyle(this.layer, "selected");
        }
        else {
            MUICoreLayer_1.MUICoreLayerRemoveStyle(this.layer, "selected");
        }
    };
    UICheckButton.prototype.toggleValue = function () {
        this.setOn(!this._on);
        if (this.target != null && this.action != null)
            this.action.call(this.target, this, this._on);
    };
    return UICheckButton;
}(UIControl_1.UIControl));
exports.UICheckButton = UICheckButton;
//# sourceMappingURL=UICheckButton.js.map