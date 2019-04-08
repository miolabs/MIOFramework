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
var NSCoreUUID_1 = require("../NSCore/NSCoreUUID");
var NSObject_1 = require("./NSObject");
var NSUUID = (function (_super) {
    __extends(NSUUID, _super);
    function NSUUID() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uuid = null;
        return _this;
    }
    NSUUID.UUID = function () {
        var uuid = new NSUUID();
        uuid.init();
        return uuid;
    };
    NSUUID.prototype.init = function () {
        this._uuid = NSCoreUUID_1.NSCoreUUIDcreate();
    };
    Object.defineProperty(NSUUID.prototype, "UUIDString", {
        get: function () {
            return this._uuid;
        },
        enumerable: true,
        configurable: true
    });
    return NSUUID;
}(NSObject_1.NSObject));
exports.NSUUID = NSUUID;
//# sourceMappingURL=NSUUID.js.map