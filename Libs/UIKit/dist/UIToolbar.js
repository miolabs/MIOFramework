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
var UIButton_1 = require("./UIButton");
var UIView_1 = require("./UIView");
/**
 * Created by godshadow on 22/5/16.
 */
var UIToolbarButton = /** @class */ (function (_super) {
    __extends(UIToolbarButton, _super);
    function UIToolbarButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIToolbarButton.buttonWithLayer = function (layer, owner) {
        var lid = layer.getAttribute("id");
        var tb = new UIToolbarButton(lid);
        tb.initWithLayer(layer, owner);
        return tb;
    };
    return UIToolbarButton;
}(UIButton_1.UIButton));
exports.UIToolbarButton = UIToolbarButton;
var UIToolbar = /** @class */ (function (_super) {
    __extends(UIToolbar, _super);
    function UIToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.buttons = [];
        return _this;
    }
    UIToolbar.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        // Check if we have sub nodes
        if (this.layer.childNodes.length > 0) {
            for (var index = 0; index < this.layer.childNodes.length; index++) {
                var layer_1 = this.layer.childNodes[index]; // TODO: variablename shadows parameter
                if (layer_1.tagName == "DIV") {
                    var lid = layer_1.getAttribute("id");
                    var tb = new UIToolbarButton(lid);
                    var button = UIToolbarButton.buttonWithLayer(layer_1, owner);
                    button.parent = this;
                    this._linkViewToSubview(button);
                    this.addToolbarButton(button);
                }
            }
        }
    };
    UIToolbar.prototype.addToolbarButton = function (button) {
        this.buttons.push(button);
    };
    return UIToolbar;
}(UIView_1.UIView));
exports.UIToolbar = UIToolbar;
//# sourceMappingURL=UIToolbar.js.map