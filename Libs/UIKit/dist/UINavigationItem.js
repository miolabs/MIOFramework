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
var MIOFoundation_1 = require("../MIOFoundation");
var UIView_1 = require("./UIView");
var UIButton_1 = require("./UIButton");
var UINavigationItem = /** @class */ (function (_super) {
    __extends(UINavigationItem, _super);
    function UINavigationItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backBarButtonItem = null;
        _this.titleView = null;
        _this.title = null;
        _this.leftView = null;
        _this.rightView = null;
        return _this;
    }
    UINavigationItem.prototype.initWithLayer = function (layer) {
        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                if (subLayer.getAttribute("data-nav-item-left") != null) {
                    var v = new UIView_1.UIView();
                    v.initWithLayer(subLayer, this);
                    this.leftView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-center") != null) {
                    var v = new UIView_1.UIView();
                    v.initWithLayer(subLayer, this);
                    this.titleView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-right") != null) {
                    var v = new UIView_1.UIView();
                    v.initWithLayer(subLayer, this);
                    this.rightView = v;
                }
            }
            var backButtonLayer = UIView_1.UILayerSearchElementByAttribute(layer, "data-nav-item-back");
            if (backButtonLayer != null) {
                this.backBarButtonItem = new UIButton_1.UIButton();
                this.backBarButtonItem.initWithLayer(backButtonLayer, this);
            }
        }
    };
    return UINavigationItem;
}(MIOFoundation_1.MIOObject));
exports.UINavigationItem = UINavigationItem;
function UINavItemSearchInLayer(layer) {
    if (layer.childNodes.length > 0) {
        for (var index = 0; index < layer.childNodes.length; index++) {
            var subLayer = layer.childNodes[index];
            if (subLayer.tagName != "DIV")
                continue;
            if (subLayer.getAttribute("data-nav-item") != null) {
                var ni = new UINavigationItem();
                ni.initWithLayer(subLayer);
                // Check for tittle if center view doesn't exists
                if (ni.titleView == null) {
                    var title = subLayer.getAttribute("data-nav-item-title");
                    if (title != null)
                        ni.title = title;
                }
                return ni;
            }
        }
    }
    return null;
}
exports.UINavItemSearchInLayer = UINavItemSearchInLayer;
//# sourceMappingURL=UINavigationItem.js.map