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
var UIView_1 = require("./UIView");
/**
 * Created by godshadow on 12/3/16.
 */
var UISwitchButton = /** @class */ (function (_super) {
    __extends(UISwitchButton, _super);
    function UISwitchButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.action = null;
        _this._inputLayer = null;
        _this._labelLayer = null;
        _this._on = false;
        return _this;
    }
    UISwitchButton.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.layer.classList.add("switch_button");
        this._inputLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "INPUT");
        if (this._inputLayer == null) {
            this._inputLayer = document.createElement("input");
            this._inputLayer.setAttribute("type", "checkbox");
            this._inputLayer.setAttribute("id", this.layerID + "_input");
            this._inputLayer.classList.add("switch_button_input");
            layer.appendChild(this._inputLayer);
        }
        // var div1 = document.createElement("div");
        // this.layer.appendChild(div1);
        // var div2 = document.createElement("div");
        // div1.appendChild(div2); 
        /*
                this._labelLayer = UILayerGetFirstElementWithTag(this.layer, "LABEL");
                if (this._labelLayer == null) {
                    this._labelLayer = document.createElement("label");
                    this._labelLayer.setAttribute("for", this.layerID + "_input");
                    //this._labelLayer.classList.add("switch_button_label");
                    layer.appendChild(this._labelLayer);
                }
        
                */
        var instance = this;
        this.layer.onclick = function () {
            if (instance.enabled) {
                instance._toggleValue.call(instance);
            }
        };
    };
    UISwitchButton.prototype.setOnChangeValue = function (target, action) {
        this.target = target;
        this.action = action;
    };
    Object.defineProperty(UISwitchButton.prototype, "on", {
        get: function () { return this._on; },
        set: function (value) { this.setOn(value); },
        enumerable: true,
        configurable: true
    });
    UISwitchButton.prototype.setOn = function (on) {
        if (on == this.on)
            return;
        this._inputLayer.checked = on;
        this._on = on;
    };
    UISwitchButton.prototype._toggleValue = function () {
        this.on = !this.on;
        if (this.target != null && this.action != null)
            this.action.call(this.target, this, this.on);
    };
    return UISwitchButton;
}(UIControl_1.UIControl));
exports.UISwitchButton = UISwitchButton;
//# sourceMappingURL=UISwitchButton.js.map