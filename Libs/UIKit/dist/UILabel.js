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
var _1 = require(".");
/**
 * Created by godshadow on 11/3/16.
 */
var UILabel = /** @class */ (function (_super) {
    __extends(UILabel, _super);
    function UILabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._textLayer = null;
        _this.autoAdjustFontSize = "none";
        _this.autoAdjustFontSizeValue = 4;
        return _this;
    }
    UILabel.prototype.init = function () {
        _super.prototype.init.call(this);
        _1.UICoreLayerAddStyle(this.layer, "label");
        this.setupLayers();
    };
    UILabel.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._textLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "SPAN");
        this.setupLayers();
    };
    UILabel.prototype.setupLayers = function () {
        //UICoreLayerAddStyle(this.layer, "lbl");
        if (this._textLayer == null) {
            this.layer.innerHTML = "";
            this._textLayer = document.createElement("span");
            this._textLayer.style.top = "3px";
            this._textLayer.style.left = "3px";
            this._textLayer.style.right = "3px";
            this._textLayer.style.bottom = "3px";
            //this._textLayer.style.font = "inherit";
            //this._textLayer.style.fontSize = "inherit";
            this.layer.appendChild(this._textLayer);
        }
    };
    /*
        layout()
        {
            super.layout();
    
            //var h = this.getHeight();
            //this.textLayer.style.lineHeight = h + "px";
    
            if (this.autoAdjustFontSize == "width")
            {
                var w = this.getWidth();
                var size = w / this.autoAdjustFontSizeValue;
                this.layer.style.fontSize = size + 'px';
                var maxSize = this.getHeight();
                if (size > maxSize)
                    this.layer.style.fontSize = maxSize + 'px';
                else
                    this.layer.style.fontSize = size + 'px';
            }
            else if (this.autoAdjustFontSize == "height")
            {
                var h = this.getHeight();
                var size = h / this.autoAdjustFontSizeValue;
                this.layer.style.fontSize = size + 'px';
                var maxSize = this.getHeight();
                if (size > maxSize)
                    this.layer.style.fontSize = maxSize + 'px';
                else
                    this.layer.style.fontSize = size + 'px';
            }
        }
    */
    UILabel.prototype.setText = function (text) {
        this.text = text;
    };
    Object.defineProperty(UILabel.prototype, "text", {
        get: function () {
            return this._textLayer.innerHTML;
        },
        set: function (text) {
            this._textLayer.innerHTML = text != null ? text : "";
        },
        enumerable: true,
        configurable: true
    });
    UILabel.prototype.setTextAlignment = function (alignment) {
        this.layer.style.textAlign = alignment;
    };
    UILabel.prototype.setHightlighted = function (value) {
        if (value == true) {
            this._textLayer.classList.add("label_highlighted_color");
        }
        else {
            this._textLayer.classList.remove("label_highlighted_color");
        }
    };
    UILabel.prototype.setTextRGBColor = function (r, g, b) {
        var value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._textLayer.style.color = value;
    };
    UILabel.prototype.setFontSize = function (size) {
        this._textLayer.style.fontSize = size + "px";
    };
    UILabel.prototype.setFontStyle = function (style) {
        this._textLayer.style.fontWeight = style;
    };
    UILabel.prototype.setFontFamily = function (fontFamily) {
        this._textLayer.style.fontFamily = fontFamily;
    };
    return UILabel;
}(UIView_1.UIView));
exports.UILabel = UILabel;
//# sourceMappingURL=UILabel.js.map