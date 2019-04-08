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
var NSNumber_1 = require("./NSNumber");
var decimal_js_1 = require("decimal.js");
var NSDecimalNumber = (function (_super) {
    __extends(NSDecimalNumber, _super);
    function NSDecimalNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NSDecimalNumber.decimalNumberWithString = function (str) {
        var dn = new NSDecimalNumber();
        dn.initWithString(str);
        return dn;
    };
    NSDecimalNumber.one = function () {
        return NSDecimalNumber.numberWithInteger(1);
    };
    NSDecimalNumber.zero = function () {
        return NSDecimalNumber.numberWithInteger(0);
    };
    NSDecimalNumber.numberWithBool = function (value) {
        var n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;
    };
    NSDecimalNumber.numberWithInteger = function (value) {
        var n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;
    };
    NSDecimalNumber.numberWithFloat = function (value) {
        var n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;
    };
    NSDecimalNumber.prototype.initWithString = function (str) {
        this._initWithValue(str);
    };
    NSDecimalNumber.prototype.initWithDecimal = function (value) {
        _super.prototype.init.call(this);
        if (isNaN(value) || value == null) {
            this.storeValue = new decimal_js_1.Decimal(0);
        }
        else {
            this.storeValue = value;
        }
    };
    NSDecimalNumber.prototype._initWithValue = function (value) {
        _super.prototype.init.call(this);
        this.storeValue = new decimal_js_1.Decimal(value || 0);
    };
    NSDecimalNumber.prototype.decimalNumberByAdding = function (value) {
        var dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.add(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberBySubtracting = function (value) {
        var dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.sub(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberByMultiplyingBy = function (value) {
        var dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.mul(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberByDividingBy = function (value) {
        var dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.div(value.storeValue));
        return dv;
    };
    Object.defineProperty(NSDecimalNumber.prototype, "decimalValue", {
        get: function () {
            return this.storeValue.toNumber();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSDecimalNumber.prototype, "floatValue", {
        get: function () {
            return this.storeValue.toNumber();
        },
        enumerable: true,
        configurable: true
    });
    return NSDecimalNumber;
}(NSNumber_1.NSNumber));
exports.NSDecimalNumber = NSDecimalNumber;
//# sourceMappingURL=NSDecimalNumber.js.map