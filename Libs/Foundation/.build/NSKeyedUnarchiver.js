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
var NSCoder_1 = require("./NSCoder");
var NSPropertyListSerialization_1 = require("./NSPropertyListSerialization");
var NSCore_Web_1 = require("../NSCore/platform/Web/NSCore_Web");
var NSKeyedUnarchiver = (function (_super) {
    __extends(NSKeyedUnarchiver, _super);
    function NSKeyedUnarchiver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.objects = null;
        _this.currentInfo = null;
        return _this;
    }
    NSKeyedUnarchiver.unarchiveTopLevelObjectWithData = function (data) {
        var coder = new NSKeyedUnarchiver();
        coder.init();
        return coder._parseData(data, null);
    };
    NSKeyedUnarchiver.prototype._parseData = function (data, error) {
        var items = NSPropertyListSerialization_1.NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);
        this.objects = items["$objects"];
        var rootIndex = items["$top"]["$0"]["CF$UID"];
        var rootInfo = this.objects[rootIndex];
        var obj = this.createObjectFromInfo(rootInfo);
        return obj;
    };
    NSKeyedUnarchiver.prototype.classFromInfo = function (info) {
        var name = info["$classname"];
        if (name == null) {
            var index = info["$class"]["CF$UID"];
            var objInfo = this.objects[index];
            name = this.classFromInfo(objInfo);
        }
        return name;
    };
    NSKeyedUnarchiver.prototype.createObjectFromInfo = function (info) {
        var classname = this.classFromInfo(info);
        switch (classname) {
            case "NSMutableArray":
            case "NSArray":
                return this.createArray(info);
            case "NSMutableDictionary":
            case "NSDictionary":
                return this.createDictionary(info);
            default:
                return this.createObject(classname, info);
        }
    };
    NSKeyedUnarchiver.prototype.createObject = function (classname, info) {
        var obj = NSCore_Web_1.NSClassFromString(classname);
        this.currentInfo = info;
        obj.initWithCoder(this);
        this.currentInfo = null;
        return obj;
    };
    NSKeyedUnarchiver.prototype.decodeObjectForKey = function (key) {
        var obj = this.valueFromInfo(this.currentInfo[key]);
        return obj;
    };
    NSKeyedUnarchiver.prototype.createArray = function (info) {
        var objects = info["NS.objects"];
        var array = [];
        for (var index = 0; index < objects.length; index++) {
            var value = this.valueFromInfo(objects[index]);
            array.push(value);
        }
        return array;
    };
    NSKeyedUnarchiver.prototype.createDictionary = function (info) {
        var keys = info["NS.keys"];
        var objects = info["NS.objects"];
        var dict = {};
        for (var index = 0; index < keys.length; index++) {
            var k = this.valueFromInfo(keys[index]);
            var v = this.valueFromInfo(objects[index]);
            dict[k] = v;
        }
        return dict;
    };
    NSKeyedUnarchiver.prototype.valueFromInfo = function (info) {
        var index = info["CF$UID"];
        var value = this.objects[index];
        if (typeof value === "boolean")
            return value;
        if (typeof value === "number")
            return value;
        if (typeof value === "string" && value != "$null")
            return value;
        if (typeof value === "string" && value == "$null")
            return null;
        return this.createObjectFromInfo(value);
    };
    return NSKeyedUnarchiver;
}(NSCoder_1.NSCoder));
exports.NSKeyedUnarchiver = NSKeyedUnarchiver;
//# sourceMappingURL=NSKeyedUnarchiver.js.map