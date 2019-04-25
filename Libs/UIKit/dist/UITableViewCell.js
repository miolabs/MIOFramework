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
var UILabel_1 = require("./UILabel");
var _1 = require(".");
var UITableViewCellStyle;
(function (UITableViewCellStyle) {
    UITableViewCellStyle[UITableViewCellStyle["Custom"] = 0] = "Custom";
    UITableViewCellStyle[UITableViewCellStyle["Default"] = 1] = "Default";
})(UITableViewCellStyle = exports.UITableViewCellStyle || (exports.UITableViewCellStyle = {}));
var UITableViewCellAccessoryType;
(function (UITableViewCellAccessoryType) {
    UITableViewCellAccessoryType[UITableViewCellAccessoryType["None"] = 0] = "None";
    UITableViewCellAccessoryType[UITableViewCellAccessoryType["DisclosureIndicator"] = 1] = "DisclosureIndicator";
    UITableViewCellAccessoryType[UITableViewCellAccessoryType["DetailDisclosureButton"] = 2] = "DetailDisclosureButton";
    UITableViewCellAccessoryType[UITableViewCellAccessoryType["Checkmark"] = 3] = "Checkmark";
})(UITableViewCellAccessoryType = exports.UITableViewCellAccessoryType || (exports.UITableViewCellAccessoryType = {}));
var UITableViewCellEditingStyle;
(function (UITableViewCellEditingStyle) {
    UITableViewCellEditingStyle[UITableViewCellEditingStyle["None"] = 0] = "None";
    UITableViewCellEditingStyle[UITableViewCellEditingStyle["Delete"] = 1] = "Delete";
    UITableViewCellEditingStyle[UITableViewCellEditingStyle["Insert"] = 2] = "Insert";
})(UITableViewCellEditingStyle = exports.UITableViewCellEditingStyle || (exports.UITableViewCellEditingStyle = {}));
var UITableViewCellSeparatorStyle;
(function (UITableViewCellSeparatorStyle) {
    UITableViewCellSeparatorStyle[UITableViewCellSeparatorStyle["None"] = 0] = "None";
    UITableViewCellSeparatorStyle[UITableViewCellSeparatorStyle["SingleLine"] = 1] = "SingleLine";
    UITableViewCellSeparatorStyle[UITableViewCellSeparatorStyle["SingleLineEtched"] = 2] = "SingleLineEtched"; // TODO 
})(UITableViewCellSeparatorStyle = exports.UITableViewCellSeparatorStyle || (exports.UITableViewCellSeparatorStyle = {}));
var UITableViewCellSelectionStyle;
(function (UITableViewCellSelectionStyle) {
    UITableViewCellSelectionStyle[UITableViewCellSelectionStyle["None"] = 0] = "None";
    UITableViewCellSelectionStyle[UITableViewCellSelectionStyle["Default"] = 1] = "Default";
})(UITableViewCellSelectionStyle = exports.UITableViewCellSelectionStyle || (exports.UITableViewCellSelectionStyle = {}));
var UITableViewCell = /** @class */ (function (_super) {
    __extends(UITableViewCell, _super);
    function UITableViewCell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reuseIdentifier = null;
        _this.nodeID = null;
        _this.contentView = null;
        _this.style = UITableViewCellStyle.Custom;
        _this.textLabel = null;
        _this.accessoryView = null;
        _this.separatorStyle = UITableViewCellSeparatorStyle.SingleLine;
        _this._editing = false;
        _this.editingAccessoryView = null;
        _this.selectionStyle = UITableViewCellSelectionStyle.Default;
        _this._selected = false;
        _this._target = null;
        _this._onClickFn = null;
        _this._onDblClickFn = null;
        _this._onAccessoryClickFn = null;
        _this._onEditingAccessoryClickFn = null;
        _this._section = null;
        _this.editingAccessoryInsertView = null;
        _this.editingAccessoryDeleteView = null;
        _this._editingAccessoryType = UITableViewCellEditingStyle.None;
        _this._accessoryType = UITableViewCellAccessoryType.None;
        return _this;
    }
    UITableViewCell.prototype.initWithStyle = function (style) {
        _super.prototype.init.call(this);
        this.style = style;
        if (style == UITableViewCellStyle.Default) {
            this.textLabel = new UILabel_1.UILabel();
            this.textLabel.init();
            this.textLabel.layer.style.top = "";
            this.textLabel.layer.style.left = "";
            this.textLabel.layer.style.width = "";
            this.textLabel.layer.style.height = "";
            this.textLabel.layer.classList.add("tableviewcell_default_textlabel");
            this.addSubview(this.textLabel);
            this.layer.style.height = "44px";
            _1.UICoreLayerAddStyle(this.layer, "cell");
        }
        this._setupLayer();
    };
    UITableViewCell.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.scanLayerNodes(layer, owner);
        this._setupLayer();
    };
    UITableViewCell.prototype.scanLayerNodes = function (layer, owner) {
        if (layer.childNodes.length == 0)
            return;
        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                this.scanLayerNodes(subLayer, owner);
                if (subLayer.getAttribute("data-accessory-type") != null) {
                    this.addAccessoryView(subLayer, owner);
                }
                if (subLayer.getAttribute("data-editing-accessory-view") != null) {
                    this.addEditingAccessoryView(subLayer, owner);
                }
            }
        }
    };
    //data-accessory-type="checkmark"
    UITableViewCell.prototype.addAccessoryView = function (layer, owner) {
        var type = layer.getAttribute("data-accessory-type");
        this.accessoryView = new UIView_1.UIView();
        this.accessoryView.initWithLayer(layer, owner);
        if (type == "checkmark")
            this.accessoryType = UITableViewCellAccessoryType.Checkmark;
        else
            this.accessoryType = UITableViewCellAccessoryType.None;
        if (this.accessoryType != UITableViewCellAccessoryType.None)
            return;
        this.accessoryView.layer.addEventListener("click", this.accessoryViewDidClick.bind(this));
    };
    UITableViewCell.prototype.accessoryViewDidClick = function (e) {
        e.stopPropagation();
        this._onAccessoryClickFn.call(this._target, this);
    };
    UITableViewCell.prototype.addEditingAccessoryView = function (layer, owner) {
        var type = layer.getAttribute("data-editing-accessory-view");
        if (type == "insert") {
            this.editingAccessoryInsertView = new UIView_1.UIView();
            this.editingAccessoryInsertView.initWithLayer(layer, owner);
            this.editingAccessoryInsertView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }
        else if (type == "delete") {
            this.editingAccessoryDeleteView = new UIView_1.UIView();
            this.editingAccessoryDeleteView.initWithLayer(layer, owner);
            this.editingAccessoryDeleteView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }
        else {
            this.editingAccessoryView = new UIView_1.UIView();
            this.editingAccessoryView.initWithLayer(layer, owner);
            this.editingAccessoryView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }
        // // TODO: Change for a gesuture recongnizer or something independent of the html
        // let instance = this;
        // this.editingAccessoryView.layer.onclick = function (e) {
        //     if (instance._onAccessoryClickFn != null) {
        //         e.stopPropagation();
        //         instance._onAccessoryClickFn.call(instance._target, instance);
        //     }
        // };
    };
    Object.defineProperty(UITableViewCell.prototype, "editingAccessoryType", {
        get: function () { return this._editingAccessoryType; },
        set: function (value) {
            this.setEditingAccessoryType(value);
        },
        enumerable: true,
        configurable: true
    });
    UITableViewCell.prototype.setEditingAccessoryType = function (value) {
        this._editingAccessoryType = value;
        // Reset
        if (this.editingAccessoryDeleteView != null)
            this.editingAccessoryDeleteView.setHidden(true);
        if (this.editingAccessoryInsertView != null)
            this.editingAccessoryInsertView.setHidden(true);
        if (this.editingAccessoryView != null)
            this.editingAccessoryView.setHidden(true);
        // Set the view type
        if (value == UITableViewCellEditingStyle.Insert && this.editingAccessoryInsertView != null) {
            this.editingAccessoryView = this.editingAccessoryInsertView;
            this.editingAccessoryInsertView.setHidden(false);
        }
        else if (value == UITableViewCellEditingStyle.Delete && this.editingAccessoryDeleteView != null) {
            this.editingAccessoryView = this.editingAccessoryDeleteView;
            this.editingAccessoryDeleteView.setHidden(false);
        }
    };
    UITableViewCell.prototype.editingAccessoryViewDidClick = function (e) {
        e.stopPropagation();
        this._onEditingAccessoryClickFn.call(this._target, this);
    };
    UITableViewCell.prototype._setupLayer = function () {
        //this.layer.style.position = "absolute";        
        var instance = this;
        this.layer.onclick = function (e) {
            if (instance._onClickFn != null) {
                e.stopPropagation();
                instance._onClickFn.call(instance._target, instance);
            }
        };
        this.layer.ondblclick = function (e) {
            if (instance._onDblClickFn != null) {
                e.stopPropagation();
                instance._onDblClickFn.call(instance._target, instance);
            }
        };
    };
    Object.defineProperty(UITableViewCell.prototype, "accessoryType", {
        get: function () { return this._accessoryType; },
        set: function (value) {
            this.setAccessoryType(value);
        },
        enumerable: true,
        configurable: true
    });
    UITableViewCell.prototype.setAccessoryType = function (type) {
        if (type == this._accessoryType)
            return;
        if (this.accessoryView == null) {
            if (this.style == UITableViewCellStyle.Default)
                this.textLabel.layer.style.right = "25px";
            var layer = document.createElement("div");
            layer.style.position = "absolute";
            layer.style.top = "15px";
            layer.style.right = "5px";
            layer.style.width = "15px";
            layer.style.height = "15px";
            this.accessoryView = new UIView_1.UIView("accessory_view");
            this.accessoryView.initWithLayer(layer, null);
            this.addSubview(this.accessoryView);
        }
        // if (type == UITableViewCellAccessoryType.None) this.accessoryView.setHidden(true);
        // else this.accessoryView.setHidden(false);
        if (type == UITableViewCellAccessoryType.None)
            _1.UICoreLayerRemoveStyle(this.layer, "checked");
        else
            _1.UICoreLayerAddStyle(this.layer, "checked");
        this._accessoryType = type;
    };
    UITableViewCell.prototype.setPaddingIndex = function (value) {
        var offset = (value + 1) * 10;
        if (this.style == UITableViewCellStyle.Default)
            this.textLabel.setX(offset);
    };
    UITableViewCell.prototype.setHeight = function (h) {
        _super.prototype.setHeight.call(this, h);
        var offsetY = (h - 15) / 2;
        if (this.accessoryView != null) {
            this.accessoryView.layer.style.top = offsetY + "px";
        }
    };
    UITableViewCell.prototype.setSelected = function (value) {
        if (this._selected == value)
            return;
        // WORKAORUND
        //let fix = this.layer.getClientRects();
        // WORKAORUND
        this.willChangeValue("selected");
        this._selected = value;
        if (this.selectionStyle == UITableViewCellSelectionStyle.Default) {
            if (value == true)
                _1.UICoreLayerAddStyle(this.layer, "selected");
            else
                _1.UICoreLayerRemoveStyle(this.layer, "selected");
        }
        this.didChangeValue("selected");
    };
    Object.defineProperty(UITableViewCell.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this.setSelected(value);
        },
        enumerable: true,
        configurable: true
    });
    UITableViewCell.prototype._setHightlightedSubviews = function (value) {
        for (var count = 0; count < this.subviews.length; count++) {
            var v = this.subviews[count];
            if (v instanceof UILabel_1.UILabel)
                v.setHightlighted(value);
        }
        if (this.accessoryView == null)
            return;
        if (value == true) {
            switch (this.accessoryType) {
                case UITableViewCellAccessoryType.DisclosureIndicator:
                    //this.accessoryView.layer.classList.remove("tableviewcell_accessory_disclosure_indicator");
                    //this.accessoryView.layer.classList.add("tableviewcell_accessory_disclosure_indicator_highlighted");
                    break;
            }
        }
        else {
            switch (this.accessoryType) {
                case UITableViewCellAccessoryType.DisclosureIndicator:
                    //this.accessoryView.layer.classList.remove("tableviewcell_accessory_disclosure_indicator_highlighted");
                    //this.accessoryView.layer.classList.add("tableviewcell_accessory_disclosure_indicator");
                    break;
            }
        }
    };
    UITableViewCell.prototype.setEditing = function (editing, animated) {
        if (editing == this._editing)
            return;
        this._editing = editing;
        if (this.editingAccessoryView != null) {
            this.editingAccessoryView.setHidden(!editing);
        }
    };
    Object.defineProperty(UITableViewCell.prototype, "editing", {
        set: function (value) {
            this.setEditing(value, false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UITableViewCell.prototype, "isEditing", {
        get: function () {
            return this._editing;
        },
        enumerable: true,
        configurable: true
    });
    return UITableViewCell;
}(UIView_1.UIView));
exports.UITableViewCell = UITableViewCell;
//# sourceMappingURL=UITableViewCell.js.map