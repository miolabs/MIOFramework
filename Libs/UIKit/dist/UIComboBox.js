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
var UIView_1 = require("./UIView");
var _1 = require(".");
/**
 * Created by godshadow on 2/5/16.
 */
var UIComboBox = /** @class */ (function (_super) {
    __extends(UIComboBox, _super);
    function UIComboBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._selectLayer = null;
        _this.target = null;
        _this.action = null;
        return _this;
    }
    UIComboBox.prototype.init = function () {
        _super.prototype.init.call(this);
        _1.UICoreLayerRemoveStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "combobox");
        this._setup_layers();
    };
    UIComboBox.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._selectLayer = UIView_1.UILayerGetFirstElementWithTag(this.layer, "SELECT");
        this._setup_layers();
    };
    UIComboBox.prototype._setup_layers = function () {
        if (this._selectLayer == null) {
            this._selectLayer = document.createElement("select");
            this.layer.appendChild(this._selectLayer);
            _1.UICoreLayerAddStyle(this._selectLayer, "default");
        }
    };
    UIComboBox.prototype.setAllowMultipleSelection = function (value) {
        if (value == true)
            this._selectLayer.setAttribute("multiple", "multiple");
        else
            this._selectLayer.removeAttribute("multiple");
    };
    /*
    layoutSubviews()
    {
        super.layoutSubviews();

        var w = this.getWidth();
        var h = this.getHeight();

        this._selectLayer.style.marginLeft = "8px";
        this._selectLayer.style.width = (w - 16) + "px";
        this._selectLayer.style.marginTop = "4px";
        this._selectLayer.style.height = (h - 8) + "px";

        //var color = this.getBackgroundColor();
        //this._selectLayer.style.backgroundColor = color;

        // this._selectLayer.style.backgroundColor = "rgb(255, 255, 255)"
    }*/
    UIComboBox.prototype.addItem = function (text, value) {
        var option = document.createElement("option");
        option.innerHTML = text;
        if (value != null)
            option.value = value;
        this._selectLayer.appendChild(option);
    };
    UIComboBox.prototype.addItems = function (items) {
        for (var count = 0; count < items.length; count++) {
            var text = items[count];
            this.addItem(text);
        }
    };
    UIComboBox.prototype.removeAllItems = function () {
        var node = this._selectLayer;
        while (this._selectLayer.hasChildNodes()) { // selected elem has children
            if (node.hasChildNodes()) { // current node has children
                node = node.lastChild; // set current node to child
            }
            else { // last child found
                node = node.parentNode; // set node to parent
                node.removeChild(node.lastChild); // remove last node
            }
        }
    };
    UIComboBox.prototype.getItemAtIndex = function (index) {
        if (this._selectLayer.childNodes.length == 0)
            return null;
        var option = this._selectLayer.childNodes[index];
        return option.innerHTML;
    };
    UIComboBox.prototype.getSelectedItem = function () {
        return this._selectLayer.value;
    };
    UIComboBox.prototype.getSelectedItemText = function () {
        for (var index = 0; index < this._selectLayer.childNodes.length; index++) {
            var option = this._selectLayer.childNodes[index];
            if (this._selectLayer.value == option.value)
                return option.innerHTML;
        }
    };
    UIComboBox.prototype.selectItem = function (item) {
        this._selectLayer.value = item;
    };
    UIComboBox.prototype.setOnChangeAction = function (target, action) {
        this.target = target;
        this.action = action;
        var instance = this;
        this._selectLayer.onchange = function () {
            if (instance.enabled)
                instance.action.call(target, instance, instance._selectLayer.value);
        };
    };
    return UIComboBox;
}(UIControl_1.UIControl));
exports.UIComboBox = UIComboBox;
//# sourceMappingURL=UIComboBox.js.map