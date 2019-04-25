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
 * Created by godshadow on 04/08/16.
 */
var UIWebView = /** @class */ (function (_super) {
    __extends(UIWebView, _super);
    function UIWebView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._iframeLayer = null;
        return _this;
    }
    UIWebView.prototype.init = function () {
        _super.prototype.init.call(this);
        this._setupLayer();
    };
    UIWebView.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._iframeLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "IFRAME");
        this._setupLayer();
    };
    UIWebView.prototype._setupLayer = function () {
        if (this._iframeLayer == null) {
            this._iframeLayer = document.createElement("iframe");
            this._iframeLayer.setAttribute("scrolling", "auto");
            this._iframeLayer.setAttribute("frameborder", "0");
            this._iframeLayer.setAttribute("width", "100%");
            this._iframeLayer.setAttribute("height", "100%");
            this.layer.appendChild(this._iframeLayer);
        }
    };
    UIWebView.prototype.setURL = function (url) {
        this._iframeLayer.setAttribute("src", url);
    };
    UIWebView.prototype.setHTML = function (html) {
        var iframe = this._iframeLayer.contentWindow || (this._iframeLayer.contentDocument.document || this._iframeLayer.contentDocument);
        iframe.document.open();
        iframe.document.write(html);
        iframe.document.close();
    };
    return UIWebView;
}(UIView_1.UIView));
exports.UIWebView = UIWebView;
//# sourceMappingURL=UIWebView.js.map