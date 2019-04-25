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
var _1 = require(".");
var UINavigationBar = /** @class */ (function (_super) {
    __extends(UINavigationBar, _super);
    function UINavigationBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._items = [];
        return _this;
    }
    UINavigationBar.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setup();
    };
    UINavigationBar.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.setup();
    };
    UINavigationBar.prototype.setup = function () {
        _1.UICoreLayerAddStyle(this.layer, "navbar");
    };
    Object.defineProperty(UINavigationBar.prototype, "items", {
        get: function () { return this._items; },
        enumerable: true,
        configurable: true
    });
    UINavigationBar.prototype.setItems = function (items, animated) {
        this._items = items;
        //TODO: Animate!!!
    };
    UINavigationBar.prototype.pushNavigationItem = function (item, animated) {
        this.items.addObject(item);
        // TODO: Make the animation and change the items
    };
    UINavigationBar.prototype.popNavigationItem = function (item, animated) {
        this.items.removeObject(item);
        // TODO: Make the animation and change the items
    };
    Object.defineProperty(UINavigationBar.prototype, "topItem", {
        get: function () {
            if (this.items.length == 0)
                return null;
            return this.items[this.items.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UINavigationBar.prototype, "backItem", {
        get: function () {
            if (this.items.length < 2)
                return null;
            return this.items[this.items.length - 2];
        },
        enumerable: true,
        configurable: true
    });
    return UINavigationBar;
}(_1.UIView));
exports.UINavigationBar = UINavigationBar;
//# sourceMappingURL=UINavigationBar.js.map