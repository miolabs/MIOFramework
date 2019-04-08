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
var NSURLTokenType;
(function (NSURLTokenType) {
    NSURLTokenType[NSURLTokenType["Protocol"] = 0] = "Protocol";
    NSURLTokenType[NSURLTokenType["Host"] = 1] = "Host";
    NSURLTokenType[NSURLTokenType["Path"] = 2] = "Path";
    NSURLTokenType[NSURLTokenType["Param"] = 3] = "Param";
    NSURLTokenType[NSURLTokenType["Value"] = 4] = "Value";
})(NSURLTokenType = exports.NSURLTokenType || (exports.NSURLTokenType = {}));
var NSURL = (function (_super) {
    __extends(NSURL, _super);
    function NSURL() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseURL = null;
        _this.absoluteString = null;
        _this.scheme = null;
        _this.user = null;
        _this.password = null;
        _this.host = null;
        _this.port = 0;
        _this.hostname = null;
        _this.path = "/";
        _this.file = null;
        _this.pathExtension = null;
        _this.params = [];
        return _this;
    }
    NSURL.urlWithString = function (urlString) {
        var url = new NSURL();
        url.initWithURLString(urlString);
        return url;
    };
    NSURL.prototype.initWithScheme = function (scheme, host, path) {
        _super.prototype.init.call(this);
        this.scheme = scheme;
        this.host = host;
        this.path = path;
        this.absoluteString = "";
        if (scheme.length > 0)
            this.absoluteString += scheme + "://";
        if (host.length > 0)
            this.absoluteString += host + "/";
        if (path.length > 0)
            this.absoluteString += path;
    };
    NSURL.prototype.initWithURLString = function (urlString) {
        _super.prototype.init.call(this);
        this.absoluteString = urlString;
        this._parseURLString(urlString);
    };
    NSURL.prototype._parseURLString = function (urlString) {
        var param = "";
        var value = "";
        var token = "";
        var step = NSURLTokenType.Protocol;
        var foundPort = false;
        var foundExt = false;
        for (var index = 0; index < urlString.length; index++) {
            var ch = urlString.charAt(index);
            if (ch == ":") {
                if (step == NSURLTokenType.Protocol) {
                    this.scheme = token;
                    token = "";
                    index += 2;
                    step = NSURLTokenType.Host;
                }
                else if (step == NSURLTokenType.Host) {
                    this.hostname = token;
                    token = "";
                    foundPort = true;
                }
            }
            else if (ch == "/") {
                if (step == NSURLTokenType.Host) {
                    if (foundPort == true) {
                        this.host = this.hostname + ":" + token;
                        this.port = parseInt(token);
                    }
                    else {
                        this.host = token;
                        this.hostname = token;
                    }
                    step = NSURLTokenType.Path;
                }
                else {
                    this.path += token + ch;
                }
                token = "";
            }
            else if (ch == "." && step == NSURLTokenType.Path) {
                this.file = token;
                foundExt = true;
                token = "";
            }
            else if (ch == "?") {
                if (foundExt == true) {
                    this.file += "." + token;
                    this.pathExtension = token;
                }
                else
                    this.file = token;
                token = "";
                step = NSURLTokenType.Param;
            }
            else if (ch == "&") {
                var item = { "Key": param, "Value": value };
                this.params.push(item);
                step = NSURLTokenType.Param;
                param = "";
                value = "";
            }
            else if (ch == "=") {
                param = token;
                step = NSURLTokenType.Value;
                token = "";
            }
            else {
                token += ch;
            }
        }
        if (token.length > 0) {
            if (step == NSURLTokenType.Path) {
                if (foundExt == true) {
                    this.file += "." + token;
                    this.pathExtension = token;
                }
                else
                    this.path += token;
            }
            else if (step == NSURLTokenType.Param) {
                var i = { "key": token };
                this.params.push(i);
            }
            else if (step == NSURLTokenType.Value) {
                var item = { "Key": param, "Value": token };
                this.params.push(item);
            }
        }
    };
    NSURL.prototype.urlByAppendingPathComponent = function (path) {
        var urlString = this.scheme + "://" + this.host + this.path;
        if (urlString.charAt(urlString.length - 1) != "/")
            urlString += "/";
        if (path.charAt(0) != "/")
            urlString += path;
        else
            urlString += path.substr(1);
        var newURL = NSURL.urlWithString(urlString);
        return newURL;
    };
    NSURL.prototype.standardizedURL = function () {
        return null;
    };
    return NSURL;
}(NSObject_1.NSObject));
exports.NSURL = NSURL;
//# sourceMappingURL=NSURL.js.map