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
var _NS_currentLocale;
var NSLocale = (function (_super) {
    __extends(NSLocale, _super);
    function NSLocale() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.languageIdentifier = "es";
        _this.countryIdentifier = "ES";
        return _this;
    }
    NSLocale.currentLocale = function () {
        if (_NS_currentLocale == null) {
            _NS_currentLocale = new NSLocale();
            _NS_currentLocale.initWithLocaleIdentifier("es_ES");
        }
        return _NS_currentLocale;
    };
    NSLocale._setCurrentLocale = function (localeIdentifier) {
        _NS_currentLocale = new NSLocale();
        _NS_currentLocale.initWithLocaleIdentifier(localeIdentifier);
    };
    NSLocale.prototype.initWithLocaleIdentifier = function (identifer) {
        var array = identifer.split("_");
        if (array.length == 1) {
            this.languageIdentifier = array[0];
        }
        else if (array.length == 2) {
            this.languageIdentifier = array[0];
            this.countryIdentifier = array[1];
        }
    };
    Object.defineProperty(NSLocale.prototype, "decimalSeparator", {
        get: function () {
            var ds = "";
            switch (this.countryIdentifier) {
                case "ES":
                    ds = ",";
                    break;
                case "US":
                    ds = ".";
                    break;
                case "UK":
                    ds = ".";
                    break;
                case "AE":
                    ds = ".";
                    break;
            }
            return ds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSLocale.prototype, "currencySymbol", {
        get: function () {
            var cs = "";
            switch (this.countryIdentifier) {
                case "ES":
                case "DE":
                case "FR":
                case "IT":
                case "NL":
                    cs = "€";
                    break;
                case "US":
                    cs = "$";
                    break;
                case "UK":
                    cs = "£";
                    break;
            }
            return cs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSLocale.prototype, "currencyCode", {
        get: function () {
            var cc = "";
            switch (this.countryIdentifier) {
                case "ES":
                case "DE":
                case "FR":
                case "IT":
                case "NL":
                    cc = "EUR";
                    break;
                case "US":
                    cc = "USD";
                    break;
                case "UK":
                    cc = "GBP";
                    break;
                case "AE":
                    cc = "AED";
            }
            return cc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSLocale.prototype, "groupingSeparator", {
        get: function () {
            var gs = "";
            switch (this.countryIdentifier) {
                case "ES":
                    gs = ".";
                    break;
                case "US":
                    gs = ",";
                    break;
                case "UK":
                    gs = ",";
                    break;
                case "AE":
                    gs = ",";
                    break;
            }
            return gs;
        },
        enumerable: true,
        configurable: true
    });
    return NSLocale;
}(NSObject_1.NSObject));
exports.NSLocale = NSLocale;
//# sourceMappingURL=NSLocale.js.map