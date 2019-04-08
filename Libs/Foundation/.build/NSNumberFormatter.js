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
var NSFormatter_1 = require("./NSFormatter");
var NSLocale_1 = require("./NSLocale");
var NSNumberFormatterStyle;
(function (NSNumberFormatterStyle) {
    NSNumberFormatterStyle[NSNumberFormatterStyle["NoStyle"] = 0] = "NoStyle";
    NSNumberFormatterStyle[NSNumberFormatterStyle["DecimalStyle"] = 1] = "DecimalStyle";
    NSNumberFormatterStyle[NSNumberFormatterStyle["CurrencyStyle"] = 2] = "CurrencyStyle";
    NSNumberFormatterStyle[NSNumberFormatterStyle["CurrencyISOCodeStyle"] = 3] = "CurrencyISOCodeStyle";
    NSNumberFormatterStyle[NSNumberFormatterStyle["PercentStyle"] = 4] = "PercentStyle";
})(NSNumberFormatterStyle = exports.NSNumberFormatterStyle || (exports.NSNumberFormatterStyle = {}));
var _NSNumberFormatterType;
(function (_NSNumberFormatterType) {
    _NSNumberFormatterType[_NSNumberFormatterType["Int"] = 0] = "Int";
    _NSNumberFormatterType[_NSNumberFormatterType["Decimal"] = 1] = "Decimal";
})(_NSNumberFormatterType = exports._NSNumberFormatterType || (exports._NSNumberFormatterType = {}));
var NSNumberFormatter = (function (_super) {
    __extends(NSNumberFormatter, _super);
    function NSNumberFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberStyle = NSNumberFormatterStyle.NoStyle;
        _this.locale = null;
        _this.minimumFractionDigits = 0;
        _this.maximumFractionDigits = 0;
        _this.groupingSeparator = null;
        _this.currencySymbol = null;
        _this.currencyCode = null;
        _this.currencyHasSpaces = true;
        _this.currencyIsRight = true;
        return _this;
    }
    NSNumberFormatter.prototype.init = function () {
        _super.prototype.init.call(this);
        this.locale = NSLocale_1.NSLocale.currentLocale();
        this.groupingSeparator = this.locale.groupingSeparator;
        this.currencySymbol = this.locale.currencySymbol;
        this.currencyCode = this.locale.currencyCode;
        switch (this.locale.countryIdentifier) {
            case "US":
                this.currencyHasSpaces = false;
                this.currencyIsRight = false;
                break;
        }
    };
    NSNumberFormatter.prototype.numberFromString = function (str) {
        var _a;
        if (str === null)
            return null;
        var result, parseString, numberString, type;
        _a = this._parse(str), result = _a[0], parseString = _a[1], numberString = _a[2], type = _a[3];
        if (result == true) {
            var value = null;
            if (type == _NSNumberFormatterType.Int) {
                value = parseInt(numberString);
            }
            else if (type == _NSNumberFormatterType.Decimal) {
                value = parseFloat(numberString);
            }
            return isNaN(value) ? null : value;
        }
        return null;
    };
    NSNumberFormatter.prototype.stringFromNumber = function (number) {
        return this.stringForObjectValue(number);
    };
    NSNumberFormatter.prototype.stringForObjectValue = function (value) {
        var _a;
        var number = value;
        if (!number)
            number = 0;
        var str = number.toString();
        var intValue = null;
        var floatValue = null;
        var array = str.split(".");
        if (array.length == 1) {
            intValue = array[0];
        }
        else if (array.length == 2) {
            intValue = array[0];
            floatValue = array[1];
        }
        if (floatValue != null) {
            _a = this.round(intValue, floatValue), intValue = _a[0], floatValue = _a[1];
        }
        var res = "";
        var minusOffset = intValue.charAt(0) == "-" ? 1 : 0;
        if (intValue.length > (3 + minusOffset)) {
            var offset = Math.floor((intValue.length - minusOffset) / 3);
            if (((intValue.length - minusOffset) % 3) == 0)
                offset--;
            var posArray = [];
            var intLen = intValue.length;
            for (var index = offset; index > 0; index--) {
                posArray.push(intLen - (index * 3));
            }
            var posArrayIndex = 0;
            var groupPos = posArray[0];
            for (var index = 0; index < intLen; index++) {
                if (index == groupPos) {
                    res += this.groupingSeparator;
                    posArrayIndex++;
                    groupPos = posArrayIndex < posArray.length ? posArray[posArrayIndex] : -1;
                }
                var ch = intValue[index];
                res += ch;
            }
        }
        else {
            res = intValue;
        }
        if (this.minimumFractionDigits > 0 && floatValue == null)
            floatValue = "";
        if (floatValue != null) {
            res += this.locale.decimalSeparator;
            if (this.minimumFractionDigits > 0 && floatValue.length < this.minimumFractionDigits) {
                for (var index = 0; index < this.minimumFractionDigits; index++) {
                    if (index < floatValue.length)
                        res += floatValue[index];
                    else
                        res += "0";
                }
            }
            else {
                res += floatValue;
            }
        }
        if (this.numberStyle == NSNumberFormatterStyle.PercentStyle)
            res += "%";
        res = this.stringByAppendingCurrencyString(res);
        return res;
    };
    NSNumberFormatter.prototype.round = function (intValue, floatValue) {
        if (floatValue.length <= this.maximumFractionDigits)
            return [intValue, floatValue];
        var roundedFloat = "";
        var d = parseInt(floatValue.substr(this.maximumFractionDigits, 1));
        var inc = d < 5 ? 0 : 1;
        for (var index = this.maximumFractionDigits - 1; index >= 0; index--) {
            if (inc == 0) {
                roundedFloat = floatValue.substring(0, index + 1) + roundedFloat;
                break;
            }
            var digit = parseInt(floatValue.substr(index, 1));
            if (digit == 9) {
                inc = 1;
                roundedFloat = "0" + roundedFloat;
            }
            else {
                inc = 0;
                var newDigit = digit + 1;
                roundedFloat = newDigit + roundedFloat;
            }
        }
        var removeIndex = null;
        for (var index = roundedFloat.length - 1; index >= this.minimumFractionDigits; index--) {
            var digit = roundedFloat.substr(index, 1);
            if (digit != "0")
                break;
            removeIndex = index;
        }
        if (removeIndex != null)
            roundedFloat = roundedFloat.substring(0, removeIndex);
        if (inc == 0)
            return [intValue, roundedFloat];
        var roundedInt = "";
        for (var index = intValue.length - 1; index >= 0; index--) {
            var digit = parseInt(intValue.substr(index, 1));
            var newDigit = digit + inc;
            if (newDigit == 10) {
                inc = 1;
                roundedInt = "0" + roundedInt;
            }
            else {
                inc = 0;
                roundedInt = intValue.substring(0, index) + newDigit.toString() + roundedInt;
                break;
            }
        }
        return [roundedInt, roundedFloat];
    };
    NSNumberFormatter.prototype.stringByAppendingCurrencyString = function (text) {
        var currency = "";
        if (this.numberStyle == NSNumberFormatterStyle.CurrencyStyle) {
            currency = this.currencySymbol;
            if (currency.length == 0)
                currency = this.currencyCode;
        }
        else if (this.numberStyle == NSNumberFormatterStyle.CurrencyISOCodeStyle)
            currency = this.currencyCode;
        else {
            return text;
        }
        if (currency.length == 0)
            return text;
        var result = "";
        if (this.currencyIsRight == true) {
            result = text + (this.currencyHasSpaces ? " " : "") + currency;
        }
        else {
            result = currency + (this.currencyHasSpaces ? " " : "") + text;
        }
        return result;
    };
    NSNumberFormatter.prototype.isPartialStringValid = function (str) {
        var _a;
        if (str.length == 0)
            return [true, str];
        var result, newStr;
        _a = this._parse(str), result = _a[0], newStr = _a[1];
        return [result, newStr];
    };
    NSNumberFormatter.prototype._parse = function (str) {
        var number = 0;
        var parseString = "";
        var numberString = "";
        var type = _NSNumberFormatterType.Int;
        var minusSymbol = false;
        var percentSymbol = false;
        for (var index = 0; index < str.length; index++) {
            var ch = str[index];
            if (ch == this.locale.decimalSeparator && type != _NSNumberFormatterType.Decimal) {
                parseString += ch;
                numberString += ".";
                type = _NSNumberFormatterType.Decimal;
            }
            else if (ch == "-" && minusSymbol == false) {
                parseString += ch;
                numberString += ch;
                minusSymbol = true;
            }
            else if (ch == "%"
                && this.numberStyle == NSNumberFormatterStyle.PercentStyle
                && percentSymbol == false) {
                percentSymbol = true;
                parseString += ch;
            }
            else if (ch == " ") {
                continue;
            }
            else if (!isNaN(parseInt(ch))) {
                parseString += ch;
                numberString += ch;
            }
            else
                return [(parseString.length > 0 ? true : false), parseString, numberString, type];
        }
        return [true, parseString, numberString, type];
    };
    return NSNumberFormatter;
}(NSFormatter_1.NSFormatter));
exports.NSNumberFormatter = NSNumberFormatter;
//# sourceMappingURL=NSNumberFormatter.js.map