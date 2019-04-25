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
var MUICore_1 = require("./core/MUICore");
/**
 * Created by godshadow on 29/08/16.
 */
var UISegmentedControl = /** @class */ (function (_super) {
    __extends(UISegmentedControl, _super);
    function UISegmentedControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.segmentedItems = [];
        _this.selectedSegmentedIndex = -1;
        return _this;
    }
    UISegmentedControl.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        for (var index = 0; index < this.layer.childNodes.length; index++) {
            var itemLayer = this.layer.childNodes[index];
            if (itemLayer.tagName == "DIV") {
                var si = new UIButton_1.UIButton();
                si.initWithLayer(itemLayer, owner);
                si.type = UIButton_1.UIButtonType.PushIn;
                this._addSegmentedItem(si);
                MUICore_1.UIOutletRegister(owner, si.layerID, si);
            }
        }
        if (this.segmentedItems.length > 0) {
            var item = this.segmentedItems[0];
            item.setSelected(true);
            this.selectedSegmentedIndex = 0;
        }
    };
    UISegmentedControl.prototype._addSegmentedItem = function (item) {
        this.segmentedItems.push(item);
        item.setAction(this, this._didClickSegmentedButton);
    };
    UISegmentedControl.prototype._didClickSegmentedButton = function (button) {
        var index = this.segmentedItems.indexOf(button);
        this.selectSegmentedAtIndex(index);
        if (this.mouseOutTarget != null)
            this.mouseOutAction.call(this.mouseOutTarget, this, index);
    };
    UISegmentedControl.prototype.setAction = function (target, action) {
        this.mouseOutTarget = target;
        this.mouseOutAction = action;
    };
    UISegmentedControl.prototype.selectSegmentedAtIndex = function (index) {
        if (this.selectedSegmentedIndex == index)
            return;
        if (this.selectedSegmentedIndex > -1) {
            var lastItem = this.segmentedItems[this.selectedSegmentedIndex];
            lastItem.setSelected(false);
        }
        this.selectedSegmentedIndex = index;
        var item = this.segmentedItems[this.selectedSegmentedIndex];
        item.setSelected(true);
    };
    return UISegmentedControl;
}(UIControl_1.UIControl));
exports.UISegmentedControl = UISegmentedControl;
//# sourceMappingURL=UISegmentedControl.js.map