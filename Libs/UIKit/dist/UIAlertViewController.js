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
var UITextField_1 = require("./UITextField");
var UIComboBox_1 = require("./UIComboBox");
var UIViewController_1 = require("./UIViewController");
var UIView_1 = require("./UIView");
var UITableView_1 = require("./UITableView");
var UIViewController_PresentationController_1 = require("./UIViewController_PresentationController");
var UITableViewCell_1 = require("./UITableViewCell");
var UILabel_1 = require("./UILabel");
var MIOUI_CoreAnimation_1 = require("./MIOUI_CoreAnimation");
var MIOUI_CoreLayer_1 = require("./MIOUI_CoreLayer");
var UIAlertViewStyle;
(function (UIAlertViewStyle) {
    UIAlertViewStyle[UIAlertViewStyle["Default"] = 0] = "Default";
})(UIAlertViewStyle = exports.UIAlertViewStyle || (exports.UIAlertViewStyle = {}));
var UIAlertActionStyle;
(function (UIAlertActionStyle) {
    UIAlertActionStyle[UIAlertActionStyle["Default"] = 0] = "Default";
    UIAlertActionStyle[UIAlertActionStyle["Cancel"] = 1] = "Cancel";
    UIAlertActionStyle[UIAlertActionStyle["Destructive"] = 2] = "Destructive";
})(UIAlertActionStyle = exports.UIAlertActionStyle || (exports.UIAlertActionStyle = {}));
var UIAlertItemType;
(function (UIAlertItemType) {
    UIAlertItemType[UIAlertItemType["None"] = 0] = "None";
    UIAlertItemType[UIAlertItemType["Action"] = 1] = "Action";
    UIAlertItemType[UIAlertItemType["TextField"] = 2] = "TextField";
    UIAlertItemType[UIAlertItemType["ComboBox"] = 3] = "ComboBox";
})(UIAlertItemType = exports.UIAlertItemType || (exports.UIAlertItemType = {}));
var UIAlertItem = /** @class */ (function (_super) {
    __extends(UIAlertItem, _super);
    function UIAlertItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = UIAlertItemType.None;
        return _this;
    }
    UIAlertItem.prototype.initWithType = function (type) {
        this.type = type;
    };
    return UIAlertItem;
}(MIOFoundation_1.MIOObject));
exports.UIAlertItem = UIAlertItem;
var UIAlertTextField = /** @class */ (function (_super) {
    __extends(UIAlertTextField, _super);
    function UIAlertTextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textField = null;
        return _this;
    }
    UIAlertTextField.prototype.initWithConfigurationHandler = function (target, handler) {
        _super.prototype.initWithType.call(this, UIAlertItemType.TextField);
        this.textField = new UITextField_1.UITextField();
        this.textField.init();
        if (target != null && handler != null) {
            handler.call(target, this.textField);
        }
    };
    return UIAlertTextField;
}(UIAlertItem));
exports.UIAlertTextField = UIAlertTextField;
var UIAlertComboBox = /** @class */ (function (_super) {
    __extends(UIAlertComboBox, _super);
    function UIAlertComboBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.comboBox = null;
        return _this;
    }
    UIAlertComboBox.prototype.initWithConfigurationHandler = function (target, handler) {
        _super.prototype.initWithType.call(this, UIAlertItemType.ComboBox);
        this.comboBox = new UIComboBox_1.UIComboBox();
        this.comboBox.init();
        if (target != null && handler != null) {
            handler.call(target, this.comboBox);
        }
    };
    return UIAlertComboBox;
}(UIAlertItem));
exports.UIAlertComboBox = UIAlertComboBox;
var UIAlertAction = /** @class */ (function (_super) {
    __extends(UIAlertAction, _super);
    function UIAlertAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = null;
        _this.style = UIAlertActionStyle.Default;
        _this.target = null;
        _this.completion = null;
        return _this;
    }
    UIAlertAction.alertActionWithTitle = function (title, style, target, completion) {
        var action = new UIAlertAction();
        action.initWithTitle(title, style);
        action.target = target;
        action.completion = completion;
        return action;
    };
    UIAlertAction.prototype.initWithTitle = function (title, style) {
        _super.prototype.initWithType.call(this, UIAlertItemType.Action);
        this.title = title;
        this.style = style;
    };
    return UIAlertAction;
}(UIAlertItem));
exports.UIAlertAction = UIAlertAction;
var UIAlertViewController = /** @class */ (function (_super) {
    __extends(UIAlertViewController, _super);
    function UIAlertViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textFields = [];
        _this.comboBoxes = [];
        _this.target = null;
        _this.completion = null;
        _this._items = [];
        _this._title = null;
        _this._message = null;
        _this._style = UIAlertViewStyle.Default;
        _this._backgroundView = null;
        _this.tableView = null;
        _this._headerCell = null;
        _this._alertViewSize = new MIOFoundation_1.MIOSize(320, 50);
        // Transitioning delegate
        _this._fadeInAnimationController = null;
        _this._fadeOutAnimationController = null;
        return _this;
    }
    UIAlertViewController.prototype.initWithTitle = function (title, message, style) {
        _super.prototype.init.call(this);
        this.modalPresentationStyle = UIViewController_PresentationController_1.UIModalPresentationStyle.FormSheet;
        this._title = title;
        this._message = message;
        this._style = style;
        this.transitioningDelegate = this;
    };
    UIAlertViewController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        //UICoreLayerRemoveStyle(this.view.layer, "page");
        this.view.layer.style.background = "";
        this.view.layer.style.backgroundColor = "";
        //this.view.layer.classList.add("alert-container");
        this._backgroundView = new UIView_1.UIView();
        this._backgroundView.init();
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(this._backgroundView.layer, "alert-container");
        this.view.addSubview(this._backgroundView);
        this.tableView = new UITableView_1.UITableView();
        this.tableView.init();
        this.tableView.dataSource = this;
        this.tableView.delegate = this;
        this.tableView.layer.style.background = "";
        this.tableView.layer.style.position = "";
        this.tableView.layer.style.width = "";
        this.tableView.layer.style.height = "";
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(this.tableView.layer, "alert-table");
        this._backgroundView.addSubview(this.tableView);
    };
    UIAlertViewController.prototype.viewDidAppear = function (animated) {
        _super.prototype.viewDidAppear.call(this, animated);
        this.tableView.reloadData();
        if (this.textFields.length > 0) {
            var tf = this.textFields[0];
            tf.becomeFirstResponder();
        }
    };
    UIAlertViewController.prototype.viewWillDisappear = function (animated) {
        _super.prototype.viewWillDisappear.call(this, animated);
        if (this.target != null && this.completion != null) {
            this.completion.call(this.target);
        }
    };
    Object.defineProperty(UIAlertViewController.prototype, "preferredContentSize", {
        get: function () {
            return this._alertViewSize;
        },
        enumerable: true,
        configurable: true
    });
    UIAlertViewController.prototype._addItem = function (item) {
        this._items.push(item);
        this._calculateContentSize();
    };
    UIAlertViewController.prototype.addAction = function (action) {
        this._addItem(action);
    };
    UIAlertViewController.prototype.addTextFieldWithConfigurationHandler = function (target, handler) {
        var ai = new UIAlertTextField();
        ai.initWithConfigurationHandler(target, handler);
        this.textFields.push(ai.textField);
        this._addItem(ai);
    };
    UIAlertViewController.prototype.addComboBoxWithConfigurationHandler = function (target, handler) {
        var ac = new UIAlertComboBox();
        ac.initWithConfigurationHandler(target, handler);
        this.comboBoxes.push(ac.comboBox);
        this._addItem(ac);
    };
    UIAlertViewController.prototype.addCompletionHandler = function (target, handler) {
        this.target = target;
        this.completion = handler;
    };
    UIAlertViewController.prototype._calculateContentSize = function () {
        var h = 80 + (this._items.length * 50) + 1;
        this._alertViewSize = new MIOFoundation_1.MIOSize(320, h);
    };
    UIAlertViewController.prototype.numberOfSections = function (tableview) {
        return 1;
    };
    UIAlertViewController.prototype.numberOfRowsInSection = function (tableview, section) {
        return this._items.length + 1;
    };
    UIAlertViewController.prototype.cellAtIndexPath = function (tableview, indexPath) {
        var cell = null;
        if (indexPath.row == 0) {
            cell = this._createHeaderCell();
        }
        else {
            var item = this._items[indexPath.row - 1];
            if (item.type == UIAlertItemType.Action) {
                cell = this._createActionCellWithTitle(item.title, item.style);
            }
            else if (item.type == UIAlertItemType.TextField) {
                cell = this._createTextFieldCell(item.textField);
            }
            else if (item.type == UIAlertItemType.ComboBox) {
                cell = this._createComboBoxCell(item.comboBox);
            }
        }
        cell.separatorStyle = UITableViewCell_1.UITableViewCellSeparatorStyle.None;
        return cell;
    };
    UIAlertViewController.prototype.heightForRowAtIndexPath = function (tableView, indexPath) {
        var h = 50;
        if (indexPath.row == 0)
            h = 80;
        return h;
    };
    UIAlertViewController.prototype.canSelectCellAtIndexPath = function (tableview, indexPath) {
        if (indexPath.row == 0)
            return false;
        var item = this._items[indexPath.row - 1];
        if (item.type == UIAlertItemType.Action)
            return true;
        return false;
    };
    UIAlertViewController.prototype.didSelectCellAtIndexPath = function (tableView, indexPath) {
        var item = this._items[indexPath.row - 1];
        if (item.type == UIAlertItemType.Action) {
            if (item.target != null && item.completion != null)
                item.completion.call(item.target);
            this.dismissViewController(true);
        }
    };
    // Private methods
    UIAlertViewController.prototype._createHeaderCell = function () {
        var cell = new UITableViewCell_1.UITableViewCell();
        cell.initWithStyle(UITableViewCell_1.UITableViewCellStyle.Custom);
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(cell.layer, "alert-header");
        var titleLabel = new UILabel_1.UILabel();
        titleLabel.init();
        titleLabel.text = this._title;
        titleLabel.layer.style.left = "";
        titleLabel.layer.style.top = "";
        titleLabel.layer.style.right = "";
        titleLabel.layer.style.height = "";
        titleLabel.layer.style.width = "";
        titleLabel.layer.style.background = "";
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(titleLabel.layer, "large");
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(titleLabel.layer, "strong");
        cell.addSubview(titleLabel);
        var messageLabel = new UILabel_1.UILabel();
        messageLabel.init();
        messageLabel.text = this._message;
        messageLabel.layer.style.left = "";
        messageLabel.layer.style.top = "";
        messageLabel.layer.style.right = "";
        messageLabel.layer.style.height = "";
        messageLabel.layer.style.width = "";
        messageLabel.layer.style.background = "";
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(messageLabel.layer, "light");
        cell.addSubview(messageLabel);
        //cell.layer.style.background = "transparent";
        return cell;
    };
    UIAlertViewController.prototype._createActionCellWithTitle = function (title, style) {
        var cell = new UITableViewCell_1.UITableViewCell();
        cell.initWithStyle(UITableViewCell_1.UITableViewCellStyle.Custom);
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(cell.layer, "alert-cell");
        var buttonLabel = new UILabel_1.UILabel();
        buttonLabel.init();
        //UICoreLayerRemoveStyle(buttonLabel.layer, "label");
        buttonLabel.text = title;
        buttonLabel.layer.style.left = "";
        buttonLabel.layer.style.top = "";
        buttonLabel.layer.style.right = "";
        buttonLabel.layer.style.height = "";
        buttonLabel.layer.style.width = "";
        buttonLabel.layer.style.background = "";
        cell.addSubview(buttonLabel);
        //cell.layer.style.background = "transparent";
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(buttonLabel.layer, "btn");
        //UICoreLayerAddStyle(buttonLabel.layer, "label");                
        switch (style) {
            case UIAlertActionStyle.Default:
                break;
            case UIAlertActionStyle.Cancel:
                buttonLabel.layer.classList.add("alert");
                break;
            case UIAlertActionStyle.Destructive:
                buttonLabel.layer.classList.add("alert");
                break;
        }
        return cell;
    };
    UIAlertViewController.prototype._createTextFieldCell = function (textField) {
        var cell = new UITableViewCell_1.UITableViewCell();
        cell.initWithStyle(UITableViewCell_1.UITableViewCellStyle.Custom);
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(cell.layer, "alert-cell");
        textField.layer.style.left = "";
        textField.layer.style.top = "";
        textField.layer.style.right = "";
        textField.layer.style.height = "";
        textField.layer.style.width = "";
        textField.layer.style.background = "";
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(textField.layer, "input-text");
        cell.addSubview(textField);
        return cell;
    };
    UIAlertViewController.prototype._createComboBoxCell = function (comboBox) {
        var cell = new UITableViewCell_1.UITableViewCell();
        cell.initWithStyle(UITableViewCell_1.UITableViewCellStyle.Custom);
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(cell.layer, "alert-cell");
        // comboBox.layer.style.left = "";
        // comboBox.layer.style.top = "";
        // comboBox.layer.style.right = "";
        // comboBox.layer.style.height = "";
        // comboBox.layer.style.width = "";
        //comboBox.layer.style.background = "";
        MIOUI_CoreLayer_1.UICoreLayerAddStyle(comboBox.layer, "input-combobox");
        cell.addSubview(comboBox);
        return cell;
    };
    UIAlertViewController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._fadeInAnimationController == null) {
            this._fadeInAnimationController = new UIAlertFadeInAnimationController();
            this._fadeInAnimationController.init();
        }
        return this._fadeInAnimationController;
    };
    UIAlertViewController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._fadeOutAnimationController == null) {
            this._fadeOutAnimationController = new UIAlertFadeOutAnimationController();
            this._fadeOutAnimationController.init();
        }
        return this._fadeOutAnimationController;
    };
    return UIAlertViewController;
}(UIViewController_1.UIViewController));
exports.UIAlertViewController = UIAlertViewController;
var UIAlertFadeInAnimationController = /** @class */ (function (_super) {
    __extends(UIAlertFadeInAnimationController, _super);
    function UIAlertFadeInAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIAlertFadeInAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    UIAlertFadeInAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions       
    };
    UIAlertFadeInAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIAlertFadeInAnimationController.prototype.animations = function (transitionContext) {
        var animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.FadeIn);
        return animations;
    };
    return UIAlertFadeInAnimationController;
}(MIOFoundation_1.MIOObject));
exports.UIAlertFadeInAnimationController = UIAlertFadeInAnimationController;
var UIAlertFadeOutAnimationController = /** @class */ (function (_super) {
    __extends(UIAlertFadeOutAnimationController, _super);
    function UIAlertFadeOutAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIAlertFadeOutAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    UIAlertFadeOutAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions       
    };
    UIAlertFadeOutAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIAlertFadeOutAnimationController.prototype.animations = function (transitionContext) {
        var animations = MIOUI_CoreAnimation_1.UIClassListForAnimationType(MIOUI_CoreAnimation_1.UIAnimationType.FadeOut);
        return animations;
    };
    return UIAlertFadeOutAnimationController;
}(MIOFoundation_1.MIOObject));
exports.UIAlertFadeOutAnimationController = UIAlertFadeOutAnimationController;
//# sourceMappingURL=UIAlertViewController.js.map