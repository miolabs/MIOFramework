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
var NSError = (function (_super) {
    __extends(NSError, _super);
    function NSError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorCode = 0;
        return _this;
    }
    return NSError;
}(NSObject_1.NSObject));
exports.NSError = NSError;
//# sourceMappingURL=NSError.js.map