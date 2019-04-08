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
var platform_1 = require("../NSCore/platform");
var NSDateFormatterStyle;
(function (NSDateFormatterStyle) {
    NSDateFormatterStyle[NSDateFormatterStyle["NoStyle"] = 0] = "NoStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["ShortStyle"] = 1] = "ShortStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["MediumStyle"] = 2] = "MediumStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["LongStyle"] = 3] = "LongStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["FullStyle"] = 4] = "FullStyle";
})(NSDateFormatterStyle = exports.NSDateFormatterStyle || (exports.NSDateFormatterStyle = {}));
var NSDateFormatter = (function (_super) {
    __extends(NSDateFormatter, _super);
    function NSDateFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateStyle = NSDateFormatterStyle.ShortStyle;
        _this.timeStyle = NSDateFormatterStyle.ShortStyle;
        _this.browserDateSeparatorSymbol = null;
        return _this;
    }
    NSDateFormatter.prototype.init = function () {
        _super.prototype.init.call(this);
        var browser = platform_1.NSCoreGetBrowser();
        if (browser == platform_1.NSCoreBrowserType.Safari)
            this.browserDateSeparatorSymbol = "/";
        else
            this.browserDateSeparatorSymbol = "-";
    };
    NSDateFormatter.prototype.dateFromString = function (str) {
        var _a;
        var result, value, dateString;
        if (!str || str.length <= 0)
            return null;
        _a = this._parse(str), result = _a[0], value = _a[1], dateString = _a[2];
        if (result == true) {
            var date = Date.parse(dateString);
            return isNaN(date) == false ? new Date(dateString) : null;
        }
        return null;
    };
    NSDateFormatter.prototype.stringFromDate = function (date) {
        return this.stringForObjectValue(date);
    };
    NSDateFormatter.prototype.stringForObjectValue = function (value) {
        var date = value;
        if (date == null)
            return null;
        var str = "";
        switch (this.dateStyle) {
            case NSDateFormatterStyle.ShortStyle:
                str = this._shortDateStyle(date);
                break;
            case NSDateFormatterStyle.FullStyle:
                str = this._fullDateStyle(date);
                break;
        }
        if (this.dateStyle != NSDateFormatterStyle.NoStyle && this.timeStyle != NSDateFormatterStyle.NoStyle)
            str += " ";
        switch (this.timeStyle) {
            case NSDateFormatterStyle.ShortStyle:
                str += this._shortTimeStyle(date);
                break;
        }
        return str;
    };
    NSDateFormatter.prototype.isPartialStringValid = function (str) {
        var _a;
        if (str.length == 0)
            return [true, str];
        var result, newStr;
        _a = this._parse(str), result = _a[0], newStr = _a[1];
        return [result, newStr];
    };
    NSDateFormatter.prototype._parse = function (str) {
        var _a, _b;
        var result, newStr, value, offset;
        var dateString = "";
        if (this.dateStyle != NSDateFormatterStyle.NoStyle) {
            _a = this._parseDate(str), result = _a[0], newStr = _a[1], value = _a[2], offset = _a[3];
            if (result == false)
                return [result, newStr, value];
            dateString = value;
        }
        else {
            var today = new Date();
            dateString = this.iso8601DateStyle(today);
        }
        if (this.timeStyle != NSDateFormatterStyle.NoStyle) {
            var timeString = str;
            if (offset > 0)
                timeString = str.substr(offset, str.length - offset);
            _b = this._parseTime(timeString), result = _b[0], newStr = _b[1], value = _b[2];
            if (result == false) {
                return [result, newStr, value];
            }
            dateString += " " + value;
        }
        return [result, newStr, dateString];
    };
    NSDateFormatter.prototype._parseDate = function (str) {
        var _a, _b, _c;
        var chIndex = 0;
        var parseString = "";
        var step = 0;
        var dd = "";
        var mm = "";
        var yy = "";
        for (var index = 0; index < str.length; index++) {
            var ch = str[index];
            chIndex++;
            if (ch == "-" || ch == "." || ch == "/") {
                if (parseString.length == 0)
                    return [false, parseString, "", chIndex];
                parseString += "/";
                step++;
            }
            else if (ch == " ") {
                break;
            }
            else {
                var r = void 0, value = void 0;
                switch (step) {
                    case 0:
                        _a = this._parseDay(ch, dd), r = _a[0], dd = _a[1];
                        break;
                    case 1:
                        _b = this._parseMonth(ch, mm), r = _b[0], mm = _b[1];
                        break;
                    case 2:
                        _c = this._parseYear(ch, yy), r = _c[0], yy = _c[1];
                        break;
                }
                if (r == true)
                    parseString += ch;
                else
                    return [false, parseString, "", chIndex];
            }
        }
        var result = true;
        if (dd.length > 0)
            result = result && this._validateDay(dd);
        if (mm.length > 0)
            result = result && this._validateMonth(mm);
        if (yy.length > 0)
            result = result && this._validateYear(yy);
        if (result == false)
            return [false, parseString, null, chIndex];
        var dateString = (yy[3] ? yy : ("20" + yy)) + this.browserDateSeparatorSymbol + (mm[1] ? mm : "0" + mm) + this.browserDateSeparatorSymbol + (dd[1] ? dd : "0" + dd);
        return [true, parseString, dateString, chIndex];
    };
    NSDateFormatter.prototype._parseDay = function (ch, dd) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, dd];
        var v = parseInt(dd + ch);
        return [true, dd + ch];
    };
    NSDateFormatter.prototype._validateDay = function (dd) {
        var v = parseInt(dd);
        if (isNaN(v))
            return false;
        if (dd < 1 || dd > 31)
            return false;
        return true;
    };
    NSDateFormatter.prototype._parseMonth = function (ch, mm) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, mm];
        var v = parseInt(mm + ch);
        return [true, mm + ch];
    };
    NSDateFormatter.prototype._validateMonth = function (mm) {
        var v = parseInt(mm);
        if (isNaN(v))
            return false;
        if (v < 1 || v > 12)
            return false;
        return true;
    };
    NSDateFormatter.prototype._parseYear = function (ch, yy) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, yy];
        var v = parseInt(yy + ch);
        return [true, yy + ch];
    };
    NSDateFormatter.prototype._validateYear = function (yy) {
        var v = parseInt(yy);
        if (isNaN(yy) == true)
            return false;
        if (v > 3000)
            return false;
        return true;
    };
    NSDateFormatter.prototype.iso8601DateStyle = function (date) {
        var dd = date.getDate().toString();
        var mm = (date.getMonth() + 1).toString();
        var yy = date.getFullYear().toString();
        return yy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
    };
    NSDateFormatter.prototype._shortDateStyle = function (date, separatorString) {
        var separator = separatorString ? separatorString : "/";
        var d = date.getDate().toString();
        var m = (date.getMonth() + 1).toString();
        var y = date.getFullYear().toString();
        return (d[1] ? d : 0 + d) + separator + (m[1] ? m : "0" + m) + separator + y;
    };
    NSDateFormatter.prototype._fullDateStyle = function (date) {
        var day = _NSDateFormatterStringDays[date.getDay()];
        var month = _NSDateFormatterStringMonths[date.getMonth()];
        return day + ", " + month + " " + date.getDate() + ", " + date.getFullYear();
    };
    NSDateFormatter.prototype._parseTime = function (str) {
        var _a, _b, _c;
        var parseString = "";
        var step = 0;
        var hh = "";
        var mm = "";
        var ss = "";
        for (var index = 0; index < str.length; index++) {
            var ch = str[index];
            if (ch == ":" || ch == ".") {
                if (parseString.length == 0)
                    return [false, parseString, ""];
                parseString += ":";
                step++;
            }
            else {
                var result = void 0, value = void 0;
                switch (step) {
                    case 0:
                        _a = this._parseHour(ch, hh), result = _a[0], hh = _a[1];
                        break;
                    case 1:
                        _b = this._parseMinute(ch, mm), result = _b[0], mm = _b[1];
                        break;
                    case 2:
                        _c = this._parseSecond(ch, ss), result = _c[0], ss = _c[1];
                        break;
                }
                if (result == true)
                    parseString += ch;
                else
                    return [false, parseString, ""];
            }
        }
        var hourString = (hh[1] ? hh : ("0" + hh));
        if (mm.length > 0)
            hourString += ":" + (mm[1] ? mm : ("0" + mm));
        else
            hourString += ":00";
        if (ss.length > 0)
            hourString += ":" + (ss[1] ? ss : ("0" + ss));
        else
            hourString += ":00";
        return [true, parseString, hourString];
    };
    NSDateFormatter.prototype._parseHour = function (ch, hh) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, hh];
        var v = parseInt(hh + ch);
        if (v < 0 || v > 23)
            return [false, hh];
        return [true, hh + ch];
    };
    NSDateFormatter.prototype._parseMinute = function (ch, mm) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, mm];
        var v = parseInt(mm + ch);
        if (v < 0 || v > 59)
            return [false, mm];
        return [true, mm + ch];
    };
    NSDateFormatter.prototype._parseSecond = function (ch, ss) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, ss];
        var v = parseInt(ss + ch);
        if (v < 0 || v > 59)
            return [false, ss];
        return [true, ss + ch];
    };
    NSDateFormatter.prototype.iso8601TimeStyle = function (date) {
        var hh = date.getHours().toString();
        var mm = date.getMinutes().toString();
        var ss = date.getSeconds().toString();
        return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);
    };
    NSDateFormatter.prototype._shortTimeStyle = function (date) {
        var h = date.getHours().toString();
        var m = date.getMinutes().toString();
        return (h[1] ? h : "0" + h) + ":" + (m[1] ? m : "0" + m);
    };
    return NSDateFormatter;
}(NSFormatter_1.NSFormatter));
exports.NSDateFormatter = NSDateFormatter;
var _NSDateFormatterStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var _NSDateFormatterStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//# sourceMappingURL=NSDateFormatter.js.map