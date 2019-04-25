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
var UITabBar_1 = require("./UITabBar");
var UIViewController_1 = require("./UIViewController");
/**
 * Created by godshadow on 24/08/16.
 */
var MIOTabBarController = /** @class */ (function (_super) {
    __extends(MIOTabBarController, _super);
    function MIOTabBarController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tabBar = null;
        _this.pageController = null;
        return _this;
    }
    MIOTabBarController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        this.tabBar = new UITabBar_1.UITabBar(this.layerID + "tabbar");
        this.view.addSubview(this.tabBar);
    };
    MIOTabBarController.prototype.addTabBarViewController = function (vc) {
        this.addChildViewController(vc);
        vc.onLoadLayer(this, function () {
            this.tabBar.addTabBarItem(vc.tabBarItem);
            this.pageController.addPageViewController(vc);
        });
    };
    return MIOTabBarController;
}(UIViewController_1.UIViewController));
exports.MIOTabBarController = MIOTabBarController;
//# sourceMappingURL=UITabBarController.js.map