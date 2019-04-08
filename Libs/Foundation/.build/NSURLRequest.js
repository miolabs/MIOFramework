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
var NSURLRequest = (function (_super) {
    __extends(NSURLRequest, _super);
    function NSURLRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = null;
        _this.httpMethod = "GET";
        _this.httpBody = null;
        _this.headers = [];
        _this.binary = false;
        _this.download = false;
        return _this;
    }
    NSURLRequest.requestWithURL = function (url) {
        var request = new NSURLRequest();
        request.initWithURL(url);
        return request;
    };
    NSURLRequest.prototype.initWithURL = function (url) {
        this.url = url;
    };
    NSURLRequest.prototype.setHeaderField = function (field, value) {
        this.headers.push({ "Field": field, "Value": value });
    };
    return NSURLRequest;
}(NSObject_1.NSObject));
exports.NSURLRequest = NSURLRequest;
//# sourceMappingURL=NSURLRequest.js.map