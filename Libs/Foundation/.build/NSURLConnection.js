"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("../NSCore/platform");
var NSURLConnection = (function () {
    function NSURLConnection() {
        this.request = null;
        this.delegate = null;
        this.blockFN = null;
        this.blockTarget = null;
        this.xmlHttpRequest = null;
    }
    NSURLConnection.prototype.initWithRequest = function (request, delegate) {
        this.request = request;
        this.delegate = delegate;
        this.start();
    };
    NSURLConnection.prototype.initWithRequestBlock = function (request, blockTarget, blockFN) {
        this.request = request;
        this.blockFN = blockFN;
        this.blockTarget = blockTarget;
        this.start();
    };
    NSURLConnection.prototype.start = function () {
        platform_1.NSHTTPRequest(this, this.request.url.absoluteString, this.request.headers, this.request.httpMethod, this.request.httpBody, this.request.binary, this.delegate, this.blockTarget, this.blockFN, this.request.download);
    };
    return NSURLConnection;
}());
exports.NSURLConnection = NSURLConnection;
//# sourceMappingURL=NSURLConnection.js.map