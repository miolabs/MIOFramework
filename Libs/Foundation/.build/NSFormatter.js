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
var NSFormatter = (function (_super) {
    __extends(NSFormatter, _super);
    function NSFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NSFormatter.prototype.stringForObjectValue = function (value) {
        return value;
    };
    NSFormatter.prototype.getObjectValueForString = function (str) {
    };
    NSFormatter.prototype.editingStringForObjectValue = function (value) {
    };
    NSFormatter.prototype.isPartialStringValid = function (str) {
        var newStr = "";
        return [false, newStr];
    };
    return NSFormatter;
}(NSObject_1.NSObject));
exports.NSFormatter = NSFormatter;
//# sourceMappingURL=NSFormatter.js.map