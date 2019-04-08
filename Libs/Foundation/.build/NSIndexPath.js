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
function NSIndexPathEqual(indexPath1, indexPath2) {
    if (indexPath1 == null || indexPath2 == null)
        return false;
    if (indexPath1.section == indexPath2.section
        && indexPath1.row == indexPath2.row) {
        return true;
    }
    return false;
}
exports.NSIndexPathEqual = NSIndexPathEqual;
var NSIndexPath = (function (_super) {
    __extends(NSIndexPath, _super);
    function NSIndexPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.indexes = [];
        return _this;
    }
    NSIndexPath.indexForRowInSection = function (row, section) {
        var ip = new NSIndexPath();
        ip.add(section);
        ip.add(row);
        return ip;
    };
    NSIndexPath.indexForColumnInRowAndSection = function (column, row, section) {
        var ip = NSIndexPath.indexForRowInSection(row, section);
        ip.add(column);
        return ip;
    };
    NSIndexPath.prototype.add = function (value) {
        this.indexes.push(value);
    };
    Object.defineProperty(NSIndexPath.prototype, "section", {
        get: function () {
            return this.indexes[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSIndexPath.prototype, "row", {
        get: function () {
            return this.indexes[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSIndexPath.prototype, "item", {
        get: function () {
            return this.indexes[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSIndexPath.prototype, "column", {
        get: function () {
            return this.indexes[2];
        },
        enumerable: true,
        configurable: true
    });
    NSIndexPath.prototype.isEqualToIndexPath = function (indexPath) {
        return NSIndexPathEqual(this, indexPath);
    };
    return NSIndexPath;
}(NSObject_1.NSObject));
exports.NSIndexPath = NSIndexPath;
//# sourceMappingURL=NSIndexPath.js.map