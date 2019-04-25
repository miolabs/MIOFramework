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
var MUICore_1 = require("./core/MUICore");
var MIOFoundation_1 = require("../MIOFoundation");
/**
 * Created by godshadow on 25/08/16.
 */
var UITabBarItem = /** @class */ (function (_super) {
    __extends(UITabBarItem, _super);
    function UITabBarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // TODO: Add more extra features. Comming soon
    UITabBarItem.prototype.init = function () {
        _super.prototype.init.call(this);
        this.type = UIButton_1.UIButtonType.PushIn;
    };
    UITabBarItem.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.type = UIButton_1.UIButtonType.PushIn;
    };
    return UITabBarItem;
}(UIButton_1.UIButton));
exports.UITabBarItem = UITabBarItem;
var UITabBar = /** @class */ (function (_super) {
    __extends(UITabBar, _super);
    function UITabBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.selectedTabBarItemIndex = -1;
        _this._itemsByIdentifier = {};
        return _this;
    }
    UITabBar.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        // Check for tab items
        var opts = {};
        var sp = layer.getAttribute("data-status-style-prefix");
        if (sp != null)
            opts["status-style-prefix"] = sp;
        for (var index = 0; index < this.layer.childNodes.length; index++) {
            var tabItemLayer = this.layer.childNodes[index];
            if (tabItemLayer.tagName == "DIV") {
                var ti = new UITabBarItem();
                ti.initWithLayer(tabItemLayer, owner, opts);
                ti.type = UIButton_1.UIButtonType.PushIn;
                this._addTabBarItem(ti);
                MUICore_1.UIOutletRegister(owner, ti.layerID, ti);
            }
        }
        if (this.items.length > 0)
            this.selectTabBarItemAtIndex(0);
    };
    UITabBar.prototype._addTabBarItem = function (item) {
        this.items.push(item);
        item.setAction(this, function () {
            this.selectTabBarItem(item);
        });
    };
    UITabBar.prototype.addTabBarItem = function (item) {
        this._addTabBarItem(item);
        this.addSubview(item);
    };
    UITabBar.prototype.selectTabBarItem = function (item) {
        var index = this.items.indexOf(item);
        if (index == this.selectedTabBarItemIndex)
            return;
        if (this.selectedTabBarItemIndex > -1) {
            // Deselect
            var lastItem = this.items[this.selectedTabBarItemIndex];
            lastItem.setSelected(false);
        }
        this.willChangeValue("selectedTabBarItemIndex");
        this.selectedTabBarItemIndex = index;
        this.didChangeValue("selectedTabBarItemIndex");
    };
    UITabBar.prototype.selectTabBarItemAtIndex = function (index) {
        var item = this.items[index];
        this.selectTabBarItem(item);
    };
    UITabBar.prototype.layout = function () {
        var len = this.items.length;
        var width = this.getWidth();
        var w = width / len;
        var x = 0;
        for (var index = 0; index < this.items.length; index++) {
            var item = this.items[index];
            if (item.hidden == true)
                continue;
            item.setFrame(MIOFoundation_1.MIORect.rectWithValues(x, 0, w, this.getHeight()));
            x += w;
        }
    };
    return UITabBar;
}(UIView_1.UIView));
exports.UITabBar = UITabBar;
//# sourceMappingURL=UITabBar.js.map