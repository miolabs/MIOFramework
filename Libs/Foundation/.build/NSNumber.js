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
var NSObject_1 = require("./NSObject");
var NSNumber = (function (_super) {
    __extends(NSNumber, _super);
    function NSNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.storeValue = null;
        return _this;
    }
    NSNumber.numberWithBool = function (value) {
        var n = new NSNumber();
        n.initWithBool(value);
        return n;
    };
    NSNumber.numberWithInteger = function (value) {
        var n = new NSNumber();
        n.initWithInteger(value);
        return n;
    };
    NSNumber.numberWithFloat = function (value) {
        var n = new NSNumber();
        n.initWithFloat(value);
        return n;
    };
    NSNumber.prototype.initWithBool = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 1;
        }
        else {
            this.storeValue = value ? 0 : 1;
        }
    };
    NSNumber.prototype.initWithInteger = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 0;
        }
        else {
            this.storeValue = value;
        }
    };
    NSNumber.prototype.initWithFloat = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 0.0;
        }
        else {
            this.storeValue = value;
        }
    };
    return NSNumber;
}(NSObject_1.NSObject));
exports.NSNumber = NSNumber;
//# sourceMappingURL=NSNumber.js.map