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
 * Created by godshadow on 15/3/16.
 */
var UITextArea = /** @class */ (function (_super) {
    __extends(UITextArea, _super);
    function UITextArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textareaLayer = null;
        _this.textChangeTarget = null;
        _this.textChangeAction = null;
        return _this;
    }
    UITextArea.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.textareaLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "TEXTAREA");
        this.setupLayer();
    };
    UITextArea.prototype.setupLayer = function () {
        if (this.textareaLayer == null) {
            this.textareaLayer = document.createElement("textarea");
            this.textareaLayer.style.width = "98%";
            this.textareaLayer.style.height = "90%";
            //this.textareaLayer.backgroundColor = "transparent";
            this.textareaLayer.style.resize = "none";
            this.textareaLayer.style.borderStyle = "none";
            this.textareaLayer.style.borderColor = "transparent";
            this.textareaLayer.style.outline = "none";
            this.textareaLayer.overflow = "auto";
            this.layer.appendChild(this.textareaLayer);
        }
    };
    Object.defineProperty(UITextArea.prototype, "text", {
        get: function () {
            return this.getText();
        },
        set: function (text) {
            this.setText(text);
        },
        enumerable: true,
        configurable: true
    });
    UITextArea.prototype.setText = function (text) {
        if (text == null)
            this.textareaLayer.value = "";
        else
            this.textareaLayer.value = text;
    };
    UITextArea.prototype.getText = function () {
        return this.textareaLayer.value;
    };
    UITextArea.prototype.setEditMode = function (value) {
        this.textareaLayer.disabled = !value;
    };
    UITextArea.prototype.setOnChangeText = function (target, action) {
        this.textChangeTarget = target;
        this.textChangeAction = action;
        var instance = this;
        this.textareaLayer.addEventListener("input", function (e) {
            if (instance.enabled) {
                var value = instance.textareaLayer.value;
                instance.textChangeAction.call(target, instance, value);
            }
        });
    };
    return UITextArea;
}(UIControl_1.UIControl));
exports.UITextArea = UITextArea;
//# sourceMappingURL=UITextArea.js.map