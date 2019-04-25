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
var MIOCore_1 = require("../MIOCore");
/**
 * Created by godshadow on 12/3/16.
 */
var UITextFieldType;
(function (UITextFieldType) {
    UITextFieldType[UITextFieldType["NormalType"] = 0] = "NormalType";
    UITextFieldType[UITextFieldType["PasswordType"] = 1] = "PasswordType";
    UITextFieldType[UITextFieldType["SearchType"] = 2] = "SearchType";
})(UITextFieldType = exports.UITextFieldType || (exports.UITextFieldType = {}));
var UITextField = /** @class */ (function (_super) {
    __extends(UITextField, _super);
    function UITextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeHolder = null;
        _this._inputLayer = null;
        _this.type = UITextFieldType.NormalType;
        _this.textChangeTarget = null;
        _this.textChangeAction = null;
        _this._textChangeFn = null;
        _this.enterPressTarget = null;
        _this.enterPressAction = null;
        _this.keyPressTarget = null;
        _this.keyPressAction = null;
        _this.formatter = null;
        _this._textStopPropagationFn = null;
        _this.didBeginEditingAction = null;
        _this.didBeginEditingTarget = null;
        _this._textDidBeginEditingFn = null;
        _this.didEndEditingAction = null;
        _this.didEndEditingTarget = null;
        _this._textDidEndEditingFn = null;
        return _this;
    }
    UITextField.prototype.init = function () {
        _super.prototype.init.call(this);
        this._setupLayer();
    };
    UITextField.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._inputLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "INPUT");
        this._setupLayer();
    };
    UITextField.prototype._setupLayer = function () {
        if (this._inputLayer == null) {
            this._inputLayer = document.createElement("input");
            switch (this.type) {
                case UITextFieldType.SearchType:
                    this._inputLayer.setAttribute("type", "search");
                    break;
                default:
                    this._inputLayer.setAttribute("type", "text");
                    break;
            }
            this.layer.appendChild(this._inputLayer);
        }
        var placeholderKey = this._inputLayer.getAttribute("data-placeholder");
        if (placeholderKey != null)
            this._inputLayer.setAttribute("placeholder", MIOCore_1.MIOLocalizeString(placeholderKey, placeholderKey));
        this._registerInputEvent();
    };
    // layoutSubviews(){
    //     super.layoutSubviews();
    // var w = this.getWidth();
    // var h = this.getHeight();
    // this._inputLayer.style.marginLeft = "4px";
    // this._inputLayer.style.width = (w - 8) + "px";
    // this._inputLayer.style.marginTop = "4px";
    // this._inputLayer.style.height = (h - 8) + "px";
    //    }
    UITextField.prototype.setText = function (text) {
        this.text = text;
    };
    Object.defineProperty(UITextField.prototype, "text", {
        get: function () {
            return this._inputLayer.value;
        },
        set: function (text) {
            var newValue = text != null ? text : "";
            this._inputLayer.value = newValue;
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setPlaceholderText = function (text) {
        this.placeHolder = text;
        this._inputLayer.setAttribute("placeholder", text);
    };
    Object.defineProperty(UITextField.prototype, "placeholderText", {
        set: function (text) {
            this.setPlaceholderText(text);
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setOnChangeText = function (target, action) {
        this.textChangeTarget = target;
        this.textChangeAction = action;
    };
    UITextField.prototype._registerInputEvent = function () {
        var instance = this;
        this._textChangeFn = function () {
            if (instance.enabled)
                instance._textDidChange.call(instance);
        };
        this._textStopPropagationFn = function (e) {
            //instance._textDidBeginEditing();
            e.stopPropagation();
        };
        this._textDidBeginEditingFn = this._textDidBeginEditing.bind(this);
        this._textDidEndEditingFn = this._textDidEndEditing.bind(this);
        this.layer.addEventListener("input", this._textChangeFn);
        this.layer.addEventListener("click", this._textStopPropagationFn);
        this._inputLayer.addEventListener("focus", this._textDidBeginEditingFn);
        this._inputLayer.addEventListener("blur", this._textDidEndEditingFn);
    };
    UITextField.prototype._unregisterInputEvent = function () {
        this.layer.removeEventListener("input", this._textChangeFn);
        this.layer.removeEventListener("click", this._textStopPropagationFn);
        this._inputLayer.removeEventListener("focus", this._textDidBeginEditingFn);
        this._inputLayer.removeEventListener("blur", this._textDidEndEditingFn);
    };
    UITextField.prototype._textDidChange = function () {
        var _a;
        if (this.enabled == false)
            return;
        // Check the formater
        var value = this._inputLayer.value;
        if (this.formatter == null) {
            this._textDidChangeDelegate(value);
        }
        else {
            var result = void 0, newStr = void 0;
            _a = this.formatter.isPartialStringValid(value), result = _a[0], newStr = _a[1];
            this._unregisterInputEvent();
            this._inputLayer.value = newStr;
            this._registerInputEvent();
            if (result == true) {
                this._textDidChangeDelegate(value);
            }
        }
    };
    UITextField.prototype._textDidChangeDelegate = function (value) {
        if (this.textChangeAction != null && this.textChangeTarget != null)
            this.textChangeAction.call(this.textChangeTarget, this, value);
    };
    UITextField.prototype.setOnBeginEditing = function (target, action) {
        this.didBeginEditingTarget = target;
        this.didBeginEditingAction = action;
    };
    UITextField.prototype._textDidBeginEditing = function () {
        if (this.enabled == false)
            return;
        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);
        if (this.didBeginEditingTarget == null || this.didBeginEditingAction == null)
            return;
        this.didBeginEditingAction.call(this.didBeginEditingTarget, this, this.text);
    };
    UITextField.prototype.setOnDidEndEditing = function (target, action) {
        this.didEndEditingTarget = target;
        this.didEndEditingAction = action;
    };
    UITextField.prototype._textDidEndEditing = function () {
        if (this.enabled == false)
            return;
        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);
        if (this.didEndEditingTarget == null || this.didEndEditingAction == null)
            return;
        this.didEndEditingAction.call(this.didEndEditingTarget, this, this.text);
    };
    UITextField.prototype.setOnEnterPress = function (target, action) {
        this.enterPressTarget = target;
        this.enterPressAction = action;
        var instance = this;
        this.layer.onkeyup = function (e) {
            if (instance.enabled) {
                if (e.keyCode == 13)
                    instance.enterPressAction.call(target, instance, instance._inputLayer.value);
            }
        };
    };
    UITextField.prototype.setOnKeyPress = function (target, action) {
        this.keyPressTarget = target;
        this.keyPressAction = action;
        var instance = this;
        this.layer.onkeydown = function (e) {
            if (instance.enabled) {
                instance.keyPressAction.call(target, instance, e.keyCode);
            }
        };
    };
    UITextField.prototype.setTextRGBColor = function (r, g, b) {
        var value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._inputLayer.style.color = value;
    };
    Object.defineProperty(UITextField.prototype, "textColor", {
        get: function () {
            var color = this._getValueFromCSSProperty("color");
            return color;
        },
        set: function (color) {
            this._inputLayer.style.color = color;
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setEnabled = function (value) {
        _super.prototype.setEnabled.call(this, value);
        this._inputLayer.readOnly = !value;
    };
    UITextField.prototype.becomeFirstResponder = function () {
        this._inputLayer.focus();
    };
    UITextField.prototype.resignFirstResponder = function () {
        this._inputLayer.blur();
    };
    UITextField.prototype.selectAll = function (control) {
        this._inputLayer.select();
    };
    return UITextField;
}(UIControl_1.UIControl));
exports.UITextField = UITextField;
//# sourceMappingURL=UITextField.js.map