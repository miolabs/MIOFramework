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
var UIButton_1 = require("./UIButton");
/**
 * Created by godshadow on 31/08/16.
 */
var UIPageControl = /** @class */ (function (_super) {
    __extends(UIPageControl, _super);
    function UIPageControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberOfPages = 0;
        _this._items = [];
        _this._currentPage = -1;
        return _this;
    }
    UIPageControl.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, options);
        // Check for page items
        for (var index = 0; index < this.layer.childNodes.length; index++) {
            var itemLayer = this.layer.childNodes[index];
            if (itemLayer.tagName == "DIV") {
                var i = new UIButton_1.UIButton();
                i.initWithLayer(itemLayer, owner, options);
                this._items.push(i);
            }
        }
        if (this._items.length > 0)
            this.currentPage = 0;
    };
    Object.defineProperty(UIPageControl.prototype, "currentPage", {
        get: function () {
            return this._currentPage;
        },
        set: function (index) {
            if (this._currentPage == index)
                return;
            if (this._currentPage > -1) {
                var i_1 = this._items[this._currentPage];
                i_1.setSelected(false);
            }
            var i = this._items[index];
            i.setSelected(true);
            this._currentPage = index;
        },
        enumerable: true,
        configurable: true
    });
    return UIPageControl;
}(UIControl_1.UIControl));
exports.UIPageControl = UIPageControl;
//# sourceMappingURL=UIPageControl.js.map