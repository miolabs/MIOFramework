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
function MIOEdgeInsetsMake(top, left, bottom, rigth) {
    var ei = new UIEdgeInsets();
    ei.initWithValues(top, left, bottom, rigth);
    return ei;
}
exports.MIOEdgeInsetsMake = MIOEdgeInsetsMake;
var UIEdgeInsets = /** @class */ (function (_super) {
    __extends(UIEdgeInsets, _super);
    function UIEdgeInsets() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.top = 0;
        _this.left = 0;
        _this.bottom = 0;
        _this.right = 0;
        return _this;
    }
    UIEdgeInsets.Zero = function () {
        var ei = new UIEdgeInsets();
        ei.init();
        return ei;
    };
    UIEdgeInsets.prototype.initWithValues = function (top, left, bottom, right) {
        _super.prototype.init.call(this);
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;
    };
    return UIEdgeInsets;
}(MIOFoundation_1.MIOObject));
exports.UIEdgeInsets = UIEdgeInsets;
//# sourceMappingURL=UIEdgeInsets.js.map