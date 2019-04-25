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
var UIWebApplication_1 = require("./UIWebApplication");
/**
 * Created by godshadow on 5/5/16.
 */
var UIMenuItem = /** @class */ (function (_super) {
    __extends(UIMenuItem, _super);
    function UIMenuItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.checked = false;
        _this.title = null;
        _this._titleLayer = null;
        _this.target = null;
        _this.action = null;
        return _this;
    }
    /*  public static itemWithLayer(layer)
        {
            var layerID = layer.getAttribute("id");
            var mi = new MIOMenuItem(layerID);
            mi.initWithLayer(layer);
            mi.title = layer.innerHTML;
    
            return mi;
        }
    
        initWithLayer(layer, options?)
        {
            super.initWithLayer(layer, options);
    
            this.layer.classList.add("menu_item");
    
            var instance = this;
            this.layer.onclick = function()
            {
                if (instance.parent != null) {
                    var index = instance.parent.items.indexOf(instance);
                    instance.parent.action.call(instance.parent.target, instance, index);
                }
            }
        }*/
    UIMenuItem.itemWithTitle = function (title) {
        var mi = new UIMenuItem();
        mi.initWithTitle(title);
        return mi;
    };
    UIMenuItem.prototype.initWithTitle = function (title) {
        this.init();
        this._setupLayer();
        this.layer.style.width = "100%";
        this.layer.style.height = "";
        this._titleLayer = document.createElement("span");
        this._titleLayer.classList.add("menu_item");
        this._titleLayer.style.color = "inherit";
        this._titleLayer.innerHTML = title;
        this.layer.appendChild(this._titleLayer);
        this.title = title;
    };
    UIMenuItem.prototype._setupLayer = function () {
        var instance = this;
        this.layer.onmouseenter = function (e) {
            e.stopPropagation();
            instance.layer.classList.add("menu_item_on_hover");
        };
        this.layer.onmouseleave = function (e) {
            e.stopPropagation();
            instance.layer.classList.remove("menu_item_on_hover");
        };
        this.layer.ontouchend = function (e) {
            e.stopPropagation();
            if (instance.action != null && instance.target != null) {
                instance.layer.classList.remove("menu_item_on_hover");
                instance.action.call(instance.target, instance);
            }
        };
        this.layer.onmouseup = function (e) {
            e.stopPropagation();
            if (instance.action != null && instance.target != null) {
                instance.layer.classList.remove("menu_item_on_hover");
                instance.action.call(instance.target, instance);
            }
        };
    };
    UIMenuItem.prototype.getWidth = function () {
        //return this.layer.style.innerWidth;
        return this._titleLayer.getBoundingClientRect().width;
    };
    UIMenuItem.prototype.getHeight = function () {
        return this.layer.getBoundingClientRect().height;
    };
    return UIMenuItem;
}(UIView_1.UIView));
exports.UIMenuItem = UIMenuItem;
var UIMenu = /** @class */ (function (_super) {
    __extends(UIMenu, _super);
    function UIMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        _this._isVisible = false;
        _this._updateWidth = true;
        _this.target = null;
        _this.action = null;
        _this._menuLayer = null;
        return _this;
    }
    UIMenu.prototype.init = function () {
        _super.prototype.init.call(this);
        this._setupLayer();
    };
    /*  initWithLayer(layer, options?)
      {
          super.initWithLayer(layer, options);
  
          // Check if we have a menu
          if (this.layer.childNodes.length > 0)
          {
              for (var index = 0; index < this.layer.childNodes.length; index++)
              {
                  var layer = this.layer.childNodes[index];
                  if (layer.tagName == "DIV")
                  {
                      var item = MIOMenuItem.itemWithLayer(layer);
                      item.parent = this;
  
                      this._linkViewToSubview(item);
                      this._addMenuItem(item);
                  }
              }
          }
  
          this._setupLayer();
          this.setAlpha(0);
      }*/
    UIMenu.prototype._setupLayer = function () {
        this.layer.classList.add("menu");
        this.layer.style.zIndex = 100;
    };
    UIMenu.prototype._addMenuItem = function (menuItem) {
        this.items.push(menuItem);
    };
    UIMenu.prototype.addMenuItem = function (menuItem) {
        menuItem.action = this._menuItemDidClick;
        menuItem.target = this;
        this.items.push(menuItem);
        this.addSubview(menuItem);
        this._updateWidth = true;
    };
    UIMenu.prototype.removeMenuItem = function (menuItem) {
        //TODO: Implement this!!!
    };
    UIMenu.prototype._menuItemDidClick = function (menuItem) {
        if (this.action != null && this.target != null) {
            var index = this.items.indexOf(menuItem);
            this.action.call(this.target, this, index);
        }
        this.hide();
    };
    UIMenu.prototype.showFromControl = function (control) {
        this._isVisible = true;
        UIWebApplication_1.UIWebApplication.sharedInstance().showMenuFromControl(control, this);
    };
    UIMenu.prototype.hide = function () {
        this._isVisible = false;
        UIWebApplication_1.UIWebApplication.sharedInstance().hideMenu();
    };
    Object.defineProperty(UIMenu.prototype, "isVisible", {
        get: function () {
            return this._isVisible;
        },
        enumerable: true,
        configurable: true
    });
    UIMenu.prototype.layout = function () {
        if (this._updateWidth == true) {
            var width = 0;
            var y = 5;
            for (var index = 0; index < this.items.length; index++) {
                var item = this.items[index];
                item.setX(0);
                item.setY(y);
                var w = item.getWidth();
                if (w > width)
                    width = w;
                y += item.getHeight();
            }
        }
        if (width < 40)
            width = 40;
        this.setWidth(width + 10);
        this.setHeight(y + 5);
    };
    return UIMenu;
}(UIView_1.UIView));
exports.UIMenu = UIMenu;
//# sourceMappingURL=UIMenu.js.map