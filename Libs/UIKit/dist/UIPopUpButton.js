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
var UIMenu_1 = require("./UIMenu");
/**
 * Created by godshadow on 12/3/16.
 */
var UIPopUpButton = /** @class */ (function (_super) {
    __extends(UIPopUpButton, _super);
    function UIPopUpButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._menu = null;
        _this._isVisible = false;
        return _this;
    }
    UIPopUpButton.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        // Check if we have a menu
        /*if (this.layer.childNodes.length > 0)
         {
         // Get the first div element. We don't support more than one element
         var index = 0;
         var menuLayer = this.layer.childNodes[index];
         while(menuLayer.tagName != "DIV")
         {
         index++;
         if (index >= this.layer.childNodes.length) {
         menuLayer = null;
         break;
         }

         menuLayer = this.layer.childNodes[index];
         }

         if (menuLayer != null) {
         var layerID = menuLayer.getAttribute("id");
         this._menu = new MIOMenu(layerID);
         this._menu.initWithLayer(menuLayer);

         var x = 10;
         var y = this.getHeight();
         this._menu.setX(x);
         this._menu.setY(y);

         this._linkViewToSubview(this._menu);
         }*/
        // Set action
        this.setAction(this, function () {
            if (this._menu == null)
                return;
            if (this._menu.isVisible == false) {
                this._menu.showFromControl(this);
            }
            else {
                this._menu.hide();
            }
        });
    };
    UIPopUpButton.prototype.setMenuAction = function (target, action) {
        if (this._menu != null) {
            this._menu.target = target;
            this._menu.action = action;
        }
    };
    UIPopUpButton.prototype.addMenuItemWithTitle = function (title) {
        if (this._menu == null) {
            this._menu = new UIMenu_1.UIMenu();
            this._menu.init();
        }
        this._menu.addMenuItem(UIMenu_1.UIMenuItem.itemWithTitle(title));
    };
    return UIPopUpButton;
}(UIButton_1.UIButton));
exports.UIPopUpButton = UIPopUpButton;
//# sourceMappingURL=UIPopUpButton.js.map