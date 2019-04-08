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
var NSXMLParser_1 = require("./NSXMLParser");
var NSPropertyListReadOptions;
(function (NSPropertyListReadOptions) {
    NSPropertyListReadOptions[NSPropertyListReadOptions["None"] = 0] = "None";
})(NSPropertyListReadOptions = exports.NSPropertyListReadOptions || (exports.NSPropertyListReadOptions = {}));
var NSPropertyListFormatformat;
(function (NSPropertyListFormatformat) {
    NSPropertyListFormatformat[NSPropertyListFormatformat["None"] = 0] = "None";
})(NSPropertyListFormatformat = exports.NSPropertyListFormatformat || (exports.NSPropertyListFormatformat = {}));
var NSPropertyListSerialization = (function (_super) {
    __extends(NSPropertyListSerialization, _super);
    function NSPropertyListSerialization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        _this.rootItem = null;
        _this.currentElement = null;
        _this.currentElementType = null;
        _this.currentValue = null;
        _this.currentKey = null;
        _this.currentString = null;
        _this.itemStack = [];
        return _this;
    }
    NSPropertyListSerialization.propertyListWithData = function (data, options, format, error) {
        var pl = new NSPropertyListSerialization();
        pl.initWithData(data, options, format);
        var item = pl._parse(error);
        return item;
    };
    NSPropertyListSerialization.prototype.initWithData = function (data, options, format) {
        _super.prototype.init.call(this);
        this.data = data;
    };
    NSPropertyListSerialization.prototype._parse = function (error) {
        this.currentElement = null;
        var parser = new NSXMLParser_1.NSXMLParser();
        parser.initWithString(this.data, this);
        parser.parse();
        return this.rootItem;
    };
    NSPropertyListSerialization.prototype.parserDidStartElement = function (parser, element, attributes) {
        if (element == "dict") {
            var item = {};
            if (this.currentElement != null && this.currentElementType == 0) {
                var key = this.currentKey;
                this.currentElement[key] = item;
            }
            else if (this.currentElement != null && this.currentElementType == 1) {
                this.currentElement.push(item);
            }
            this.currentElement = item;
            this.currentElementType = 0;
            this.itemStack.push({ "Element": item, "Type": 0 });
            if (this.rootItem == null)
                this.rootItem = item;
        }
        else if (element == "array") {
            var item = [];
            if (this.currentElement != null && this.currentElementType == 0) {
                var key = this.currentKey;
                this.currentElement[key] = item;
            }
            else if (this.currentElement != null && this.currentElementType == 1) {
                this.currentElement.push(item);
            }
            this.currentElement = item;
            this.currentElementType = 1;
            this.itemStack.push({ "Element": item, "Type": 1 });
            if (this.rootItem == null)
                this.rootItem = item;
        }
        this.currentString = "";
    };
    NSPropertyListSerialization.prototype.parserFoundCharacters = function (parser, characters) {
        this.currentString += characters;
    };
    NSPropertyListSerialization.prototype.parserDidEndElement = function (parser, element) {
        if (element == "key") {
            this.currentKey = this.currentString;
        }
        else if (element == "string" || element == "integer" || element == "data") {
            this.currentValue = this.currentString;
            if (element == "integer")
                this.currentValue = parseInt(this.currentString);
            if (this.currentElementType == 1)
                this.currentElement.push(this.currentValue);
            else if (this.currentElementType == 0 && this.currentKey != null) {
                var key = this.currentKey;
                var value = this.currentValue;
                this.currentElement[key] = value;
            }
        }
        else if (element == "dict" || element == "array") {
            if (this.itemStack.length > 1) {
                var lastItem = this.itemStack[this.itemStack.length - 2];
                this.currentElement = lastItem["Element"];
                this.currentElementType = lastItem["Type"];
            }
            else {
                this.currentElement = null;
                this.currentElementType = null;
            }
            this.itemStack.splice(-1, 1);
        }
    };
    NSPropertyListSerialization.prototype.parserDidEndDocument = function (parser) {
    };
    return NSPropertyListSerialization;
}(NSObject_1.NSObject));
exports.NSPropertyListSerialization = NSPropertyListSerialization;
//# sourceMappingURL=NSPropertyListSerialization.js.map