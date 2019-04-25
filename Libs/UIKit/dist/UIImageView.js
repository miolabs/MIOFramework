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
var UIImageView = /** @class */ (function (_super) {
    __extends(UIImageView, _super);
    function UIImageView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._imageLayer = null;
        return _this;
    }
    UIImageView.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setupLayers();
    };
    UIImageView.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._imageLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "IMG");
        this.setupLayers();
    };
    UIImageView.prototype.setupLayers = function () {
        if (this._imageLayer == null) {
            this._imageLayer = document.createElement("img");
            this._imageLayer.style.width = "100%";
            this._imageLayer.style.height = "100%";
            this.layer.appendChild(this._imageLayer);
        }
    };
    UIImageView.prototype.setImage = function (imageURL) {
        if (imageURL != null) {
            this._imageLayer.setAttribute("src", imageURL);
        }
        else {
            this._imageLayer.removeAttribute("src");
        }
    };
    UIImageView.prototype.setHeight = function (h) {
        _super.prototype.setHeight.call(this, h);
        this._imageLayer.setAttribute("height", h);
    };
    UIImageView.prototype.setWidth = function (w) {
        _super.prototype.setWidth.call(this, w);
        this._imageLayer.setAttribute("width", w);
    };
    return UIImageView;
}(UIView_1.UIView));
exports.UIImageView = UIImageView;
//# sourceMappingURL=UIImageView.js.map