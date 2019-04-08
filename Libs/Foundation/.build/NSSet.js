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
var NSPredicate_1 = require("./NSPredicate");
var NSSet = (function (_super) {
    __extends(NSSet, _super);
    function NSSet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._objects = [];
        return _this;
    }
    NSSet.set = function () {
        var s = new NSSet();
        s.init();
        return s;
    };
    NSSet.prototype.addObject = function (object) {
        if (this._objects.containsObject(object) == true)
            return;
        this._objects.addObject(object);
    };
    NSSet.prototype.removeObject = function (object) {
        if (this._objects.containsObject(object) == false)
            return;
        this._objects.removeObject(object);
    };
    NSSet.prototype.removeAllObjects = function () {
        this._objects = [];
    };
    NSSet.prototype.indexOfObject = function (object) {
        return this._objects.indexOf(object);
    };
    NSSet.prototype.containsObject = function (object) {
        return this._objects.indexOfObject(object) > -1 ? true : false;
    };
    NSSet.prototype.objectAtIndex = function (index) {
        return this._objects[index];
    };
    Object.defineProperty(NSSet.prototype, "allObjects", {
        get: function () {
            return this._objects;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSSet.prototype, "count", {
        get: function () {
            return this._objects.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSSet.prototype, "length", {
        get: function () {
            return this._objects.length;
        },
        enumerable: true,
        configurable: true
    });
    NSSet.prototype.copy = function () {
        var set = new NSSet();
        set.init();
        for (var index = 0; index < this._objects.length; index++) {
            var obj = this._objects[index];
            set.addObject(obj);
        }
        return set;
    };
    NSSet.prototype.filterWithPredicate = function (predicate) {
        var objs = NSPredicate_1._NSPredicateFilterObjects(this._objects, predicate);
        return objs;
    };
    NSSet.prototype.addObserver = function (obs, keypath, context) {
        if (keypath == "count" || keypath == "length")
            throw new Error("NSSet: Can't observe count. It's not KVO Compilant");
        _super.prototype.addObserver.call(this, obs, keypath, context);
    };
    return NSSet;
}(NSObject_1.NSObject));
exports.NSSet = NSSet;
//# sourceMappingURL=NSSet.js.map