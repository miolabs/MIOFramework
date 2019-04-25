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
var mio_foundation_web_1 = require("mio-foundation-web");
var UIControl_1 = require("./UIControl");
var UIView_1 = require("./UIView");
var MUICoreLayer_1 = require("./core/MUICoreLayer");
/**
 * Created by godshadow on 12/3/16.
 */
var UIButtonType;
(function (UIButtonType) {
    UIButtonType[UIButtonType["MomentaryPushIn"] = 0] = "MomentaryPushIn";
    UIButtonType[UIButtonType["PushOnPushOff"] = 1] = "PushOnPushOff";
    UIButtonType[UIButtonType["PushIn"] = 2] = "PushIn";
})(UIButtonType = exports.UIButtonType || (exports.UIButtonType = {}));
var UIButton = /** @class */ (function (_super) {
    __extends(UIButton, _super);
    function UIButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._statusStyle = null;
        _this._titleStatusStyle = null;
        _this._titleLayer = null;
        _this._imageStatusStyle = null;
        _this._imageLayer = null;
        _this.target = null;
        _this.action = null;
        _this._selected = false;
        _this.type = UIButtonType.MomentaryPushIn;
        return _this;
    }
    UIButton.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayer_1.MUICoreLayerAddStyle(this.layer, "btn");
        this.setupLayers();
    };
    UIButton.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        var type = this.layer.getAttribute("data-type");
        if (type == "MomentaryPushIn")
            this.type = UIButtonType.MomentaryPushIn;
        else if (type == "PushOnPushOff")
            this.type = UIButtonType.PushOnPushOff;
        else if (type == "PushIn")
            this.type = UIButtonType.PushIn;
        // Check for title layer
        this._titleLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "SPAN");
        // Check for img layer
        this._imageLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "IMG");
        if (this._imageLayer == null)
            this._imageLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "DIV");
        // Check for status
        var status = this.layer.getAttribute("data-status");
        if (status == "selected")
            this.setSelected(true);
        this.setupLayers();
    };
    UIButton.prototype.setupLayers = function () {
        //UICoreLayerRemoveStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "btn");
        if (this._titleLayer == null) {
            this._titleLayer = document.createElement("span");
            this.layer.appendChild(this._titleLayer);
        }
        var key = this.layer.getAttribute("data-title");
        if (key != null)
            this.setTitle(mio_foundation_web_1.NSLocalizeString(key, key));
        // Prevent click
        this.layer.addEventListener("click", function (e) {
            e.stopPropagation();
        });
        this.layer.addEventListener("mousedown", function (e) {
            e.stopPropagation();
            if (this.enabled == false)
                return;
            switch (this.type) {
                case UIButtonType.MomentaryPushIn:
                case UIButtonType.PushIn:
                    this.setSelected(true);
                    break;
                case UIButtonType.PushOnPushOff:
                    this.setSelected(!this.selected);
                    break;
            }
        }.bind(this));
        this.layer.addEventListener("mouseup", function (e) {
            e.stopPropagation();
            if (this.enabled == false)
                return;
            if (this.type == UIButtonType.MomentaryPushIn)
                this.setSelected(false);
            if (this.action != null && this.target != null)
                this.action.call(this.target, this);
        }.bind(this));
    };
    UIButton.prototype.initWithAction = function (target, action) {
        this.init();
        this.setAction(target, action);
    };
    UIButton.prototype.setAction = function (target, action) {
        this.target = target;
        this.action = action;
    };
    UIButton.prototype.setTitle = function (title) {
        this._titleLayer.innerHTML = title;
    };
    Object.defineProperty(UIButton.prototype, "title", {
        get: function () {
            return this._titleLayer.innerHTML;
        },
        set: function (title) {
            this.setTitle(title);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIButton.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this.setSelected(value);
        },
        enumerable: true,
        configurable: true
    });
    UIButton.prototype.setSelected = function (value) {
        if (this._selected == value)
            return;
        if (value == true) {
            MUICoreLayer_1.MUICoreLayerAddStyle(this.layer, "selected");
            //UICoreLayerRemoveStyle(this.layer, "deselected");
        }
        else {
            //UICoreLayerAddStyle(this.layer, "deselected");
            MUICoreLayer_1.MUICoreLayerRemoveStyle(this.layer, "selected");
        }
        this._selected = value;
    };
    UIButton.prototype.setImageURL = function (urlString) {
        if (urlString != null) {
            this._imageLayer.setAttribute("src", urlString);
        }
        else {
            this._imageLayer.removeAttribute("src");
        }
    };
    return UIButton;
}(UIControl_1.UIControl));
exports.UIButton = UIButton;
//# sourceMappingURL=UIButton.js.map