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
var NSSortDescriptor = (function (_super) {
    __extends(NSSortDescriptor, _super);
    function NSSortDescriptor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.key = null;
        _this.ascending = false;
        return _this;
    }
    NSSortDescriptor.sortDescriptorWithKey = function (key, ascending) {
        var sd = new NSSortDescriptor();
        sd.initWithKey(key, ascending);
        return sd;
    };
    NSSortDescriptor.prototype.initWithKey = function (key, ascending) {
        this.key = key;
        this.ascending = ascending;
    };
    return NSSortDescriptor;
}(NSObject_1.NSObject));
exports.NSSortDescriptor = NSSortDescriptor;
function _NSSortDescriptorSortObjects(objs, sortDescriptors) {
    var resultObjects = null;
    if (objs.length == 0 || sortDescriptors == null) {
        resultObjects = objs.slice(0);
    }
    else {
        if (sortDescriptors == null)
            return objs;
        if (objs.length == 0)
            return objs;
        resultObjects = objs.sort(function (a, b) {
            return _NSSortDescriptorSortObjects2(a, b, sortDescriptors, 0);
        });
    }
    return resultObjects;
}
exports._NSSortDescriptorSortObjects = _NSSortDescriptorSortObjects;
function _NSSortDescriptorSortObjects2(a, b, sortDescriptors, index) {
    if (index >= sortDescriptors.length)
        return 0;
    var sd = sortDescriptors[index];
    var key = sd.key;
    var lv = a[key];
    var rv = b[key];
    if (typeof lv === "string") {
        lv = lv.toLocaleLowerCase();
    }
    if (typeof rv === "string") {
        rv = rv.toLocaleLowerCase();
    }
    if (typeof lv === "string" && typeof rv === "string" && lv.length != rv.length) {
        var lv2 = lv;
        var rv2 = rv;
        var sortValue = 0;
        if (lv.length > rv.length) {
            lv2 = lv.substr(0, rv.length);
            sortValue = sd.ascending ? 1 : -1;
        }
        else if (lv.length < rv.length) {
            rv2 = rv.substr(0, lv.length);
            sortValue = sd.ascending ? -1 : 1;
        }
        if (lv2 == rv2)
            return sortValue;
        else if (lv2 < rv2)
            return sd.ascending ? -1 : 1;
        else
            return sd.ascending ? 1 : -1;
    }
    else if (lv == rv)
        return _NSSortDescriptorSortObjects2(a, b, sortDescriptors, ++index);
    else if (lv < rv)
        return sd.ascending ? -1 : 1;
    else
        return sd.ascending ? 1 : -1;
}
//# sourceMappingURL=NSSortDescriptor.js.map