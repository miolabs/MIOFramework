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
var platform_1 = require("../NSCore/platform");
var NSDateFormatter_1 = require("./NSDateFormatter");
var NSISO8601DateFormatter = (function (_super) {
    __extends(NSISO8601DateFormatter, _super);
    function NSISO8601DateFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeZone = null;
        return _this;
    }
    NSISO8601DateFormatter.iso8601DateFormatter = function () {
        var df = new NSISO8601DateFormatter();
        df.init();
        return df;
    };
    NSISO8601DateFormatter.prototype.dateFromString = function (str) {
        if (str == null)
            return null;
        var dateString = null;
        if (platform_1.NSCoreGetBrowser() == platform_1.NSCoreBrowserType.Safari) {
            dateString = str.split('-').join("/");
            if (dateString.length > 19)
                dateString = dateString.substr(0, 19);
        }
        else
            dateString = str;
        var timestamp = Date.parse(dateString);
        var d = null;
        if (isNaN(timestamp) == false) {
            d = new Date(dateString);
        }
        else {
            console.log("DATE FORMATTER: Error, invalid date");
        }
        return d;
    };
    NSISO8601DateFormatter.prototype.stringFromDate = function (date) {
        var str = "";
        if (date == null)
            return null;
        if (this.dateStyle != NSDateFormatter_1.NSDateFormatterStyle.NoStyle) {
            str += this.iso8601DateStyle(date);
        }
        if (this.timeStyle != NSDateFormatter_1.NSDateFormatterStyle.NoStyle) {
            if (str.length > 0)
                str += " ";
            str += this.iso8601TimeStyle(date);
        }
        return str;
    };
    return NSISO8601DateFormatter;
}(NSDateFormatter_1.NSDateFormatter));
exports.NSISO8601DateFormatter = NSISO8601DateFormatter;
//# sourceMappingURL=NSISO8601DateFormatter.js.map