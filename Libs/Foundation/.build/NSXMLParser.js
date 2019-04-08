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
var NSLog_1 = require("./NSLog");
var NSObject_1 = require("./NSObject");
var NSXMLTokenType;
(function (NSXMLTokenType) {
    NSXMLTokenType[NSXMLTokenType["Identifier"] = 0] = "Identifier";
    NSXMLTokenType[NSXMLTokenType["QuestionMark"] = 1] = "QuestionMark";
    NSXMLTokenType[NSXMLTokenType["ExclamationMark"] = 2] = "ExclamationMark";
    NSXMLTokenType[NSXMLTokenType["OpenTag"] = 3] = "OpenTag";
    NSXMLTokenType[NSXMLTokenType["CloseTag"] = 4] = "CloseTag";
    NSXMLTokenType[NSXMLTokenType["Slash"] = 5] = "Slash";
    NSXMLTokenType[NSXMLTokenType["Quote"] = 6] = "Quote";
    NSXMLTokenType[NSXMLTokenType["WhiteSpace"] = 7] = "WhiteSpace";
    NSXMLTokenType[NSXMLTokenType["End"] = 8] = "End";
})(NSXMLTokenType = exports.NSXMLTokenType || (exports.NSXMLTokenType = {}));
var NSXMLParser = (function (_super) {
    __extends(NSXMLParser, _super);
    function NSXMLParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.str = null;
        _this.delegate = null;
        _this.strIndex = 0;
        _this.elements = [];
        _this.attributes = null;
        _this.currentElement = null;
        _this.currentTokenValue = null;
        _this.lastTokenValue = null;
        _this.ignoreWhiteSpace = false;
        return _this;
    }
    NSXMLParser.prototype.initWithString = function (str, delegate) {
        this.str = str;
        this.delegate = delegate;
    };
    NSXMLParser.prototype.nextChar = function () {
        if (this.strIndex >= this.str.length)
            return null;
        var ch = this.str.charAt(this.strIndex);
        this.strIndex++;
        return ch;
    };
    NSXMLParser.prototype.prevChar = function () {
        this.strIndex--;
        return this.str.charAt(this.strIndex);
    };
    NSXMLParser.prototype.readToken = function () {
        var exit = false;
        var value = "";
        while (exit == false) {
            var ch = this.nextChar();
            if (ch == null)
                return null;
            if (ch == "<" || ch == ">" || ch == "/" || ch == "?" || ch == "!") {
                if (value.length > 0)
                    this.prevChar();
                else
                    value = ch;
                exit = true;
            }
            else if (ch == "\"" || ch == "'") {
                value += ch;
                var ch2 = this.nextChar();
                while (ch2 != ch && ch2 != "<") {
                    value += ch2;
                    ch2 = this.nextChar();
                }
                if (ch2 != "<")
                    value += ch2;
                else
                    this.prevChar();
            }
            else if (ch == " ") {
                if (this.ignoreWhiteSpace == false) {
                    if (value != "")
                        this.prevChar();
                    else
                        value = " ";
                }
                exit = true;
            }
            else
                value += ch;
        }
        return value;
    };
    NSXMLParser.prototype.nextToken = function () {
        this.lastTokenValue = this.currentTokenValue;
        var exit = false;
        var token = NSXMLTokenType.Identifier;
        var value = this.readToken();
        if (value == null)
            return [NSXMLTokenType.End, null];
        switch (value) {
            case "<":
                token = NSXMLTokenType.OpenTag;
                break;
            case ">":
                token = NSXMLTokenType.CloseTag;
                break;
            case "/":
                token = NSXMLTokenType.Slash;
                break;
            case "?":
                token = NSXMLTokenType.QuestionMark;
                break;
            case "!":
                token = NSXMLTokenType.ExclamationMark;
                break;
            case " ":
                token = NSXMLTokenType.WhiteSpace;
                break;
            default:
                break;
        }
        this.currentTokenValue = token;
        return [token, value];
    };
    NSXMLParser.prototype.prevToken = function () {
        return this.lastTokenValue;
    };
    NSXMLParser.prototype.parse = function () {
        var _a, _b;
        if (typeof this.delegate.parserDidStartDocument === "function")
            this.delegate.parserDidStartDocument(this);
        var token, value;
        _a = this.nextToken(), token = _a[0], value = _a[1];
        while (token != NSXMLTokenType.End) {
            switch (token) {
                case NSXMLTokenType.OpenTag:
                    this.ignoreWhiteSpace = true;
                    this.openTag();
                    this.ignoreWhiteSpace = false;
                    break;
                case NSXMLTokenType.Identifier:
                case NSXMLTokenType.Slash:
                case NSXMLTokenType.WhiteSpace:
                    this.text(value);
                    break;
                default:
                    break;
            }
            _b = this.nextToken(), token = _b[0], value = _b[1];
        }
        if (typeof this.delegate.parserDidEndDocument === "function")
            this.delegate.parserDidEndDocument(this);
    };
    NSXMLParser.prototype.openTag = function () {
        var _a;
        this.attributes = {};
        var token, value;
        _a = this.nextToken(), token = _a[0], value = _a[1];
        switch (token) {
            case NSXMLTokenType.Identifier:
                this.beginElement(value);
                break;
            case NSXMLTokenType.QuestionMark:
                this.questionMark();
                break;
            case NSXMLTokenType.ExclamationMark:
                this.exclamationMark();
                break;
            case NSXMLTokenType.Slash:
                this.slash();
                break;
            default:
                this.error("Expected: element");
                break;
        }
    };
    NSXMLParser.prototype.questionMark = function () {
        var _a;
        var token, val;
        _a = this.nextToken(), token = _a[0], val = _a[1];
        switch (token) {
            case NSXMLTokenType.Identifier:
                this.xmlOpenTag(val);
                break;
            case NSXMLTokenType.CloseTag:
                this.xmlCloseTag();
                break;
            default:
                break;
        }
    };
    NSXMLParser.prototype.exclamationMark = function () {
        var ch = this.nextChar();
        var foundMark = 0;
        if (ch == "-") {
            foundMark++;
            ch = this.nextChar();
            if (ch == "-") {
                foundMark++;
            }
        }
        if (foundMark < 2) {
            for (var i = 0; i < foundMark; i++) {
                this.prevChar();
            }
        }
        else {
            var comments = "";
            var exit = false;
            while (exit == false) {
                var ch2 = this.nextChar();
                if (ch2 == null)
                    throw new Error("NSXMLParser: Unexpected end of file!");
                comments += ch2;
                if (comments.length >= 3 && comments.substr(-3) == "-->")
                    exit = true;
            }
            this.comments(comments.substr(0, comments.length - 3));
        }
    };
    NSXMLParser.prototype.xmlOpenTag = function (value) {
        var _a;
        var token, val;
        _a = this.nextToken(), token = _a[0], val = _a[1];
        switch (token) {
            case NSXMLTokenType.Identifier:
                this.attribute(val);
                break;
            case NSXMLTokenType.QuestionMark:
                this.questionMark();
                break;
            default:
                break;
        }
    };
    NSXMLParser.prototype.xmlCloseTag = function () {
    };
    NSXMLParser.prototype.beginElement = function (value) {
        var _a;
        this.elements.push(value);
        this.currentElement = value;
        this.attributes = {};
        var token, val;
        _a = this.nextToken(), token = _a[0], val = _a[1];
        switch (token) {
            case NSXMLTokenType.Identifier:
                this.attribute(val);
                break;
            case NSXMLTokenType.Slash:
                this.slash();
                break;
            case NSXMLTokenType.CloseTag:
                this.closeTag();
                this.didStartElement();
                break;
            default:
                break;
        }
    };
    NSXMLParser.prototype.endElement = function (value) {
        var _a;
        this.attributes = {};
        this.currentElement = null;
        var token, val;
        _a = this.nextToken(), token = _a[0], val = _a[1];
        switch (token) {
            case NSXMLTokenType.CloseTag:
                this.closeTag();
                this.didEndElement();
                break;
            default:
                this.error("Expected: close token");
                break;
        }
    };
    NSXMLParser.prototype.attribute = function (attr) {
        var _a;
        this.decodeAttribute(attr);
        var token, value;
        _a = this.nextToken(), token = _a[0], value = _a[1];
        switch (token) {
            case NSXMLTokenType.Identifier:
                this.attribute(value);
                break;
            case NSXMLTokenType.Slash:
                this.slash();
                break;
            case NSXMLTokenType.QuestionMark:
                this.questionMark();
                break;
            case NSXMLTokenType.CloseTag:
                this.closeTag();
                this.didStartElement();
                break;
            default:
                break;
        }
    };
    NSXMLParser.prototype.decodeAttribute = function (attr) {
        var key = null;
        var value = null;
        var token = "";
        for (var index = 0; index < attr.length; index++) {
            var ch = attr[index];
            if (ch == "=") {
                key = token;
                token = "";
            }
            else if (ch == "\"" || ch == "'") {
                index++;
                var ch2 = attr[index];
                while (ch2 != ch) {
                    token += ch2;
                    index++;
                    ch2 = attr[index];
                }
            }
            else {
                token += ch;
            }
        }
        if (key != null && token.length > 0)
            value = token;
        else if (key == null && token.length > 0)
            key = token;
        this.attributes[key] = value;
    };
    NSXMLParser.prototype.slash = function () {
        var _a;
        var token, value;
        _a = this.nextToken(), token = _a[0], value = _a[1];
        switch (token) {
            case NSXMLTokenType.CloseTag:
                this.closeTag();
                this.didStartElement();
                this.didEndElement();
                break;
            case NSXMLTokenType.Identifier:
                this.endElement(value);
                break;
            default:
                break;
        }
    };
    NSXMLParser.prototype.closeTag = function () {
    };
    NSXMLParser.prototype.didStartElement = function () {
        var element = this.currentElement;
        if (typeof this.delegate.parserDidStartElement === "function")
            this.delegate.parserDidStartElement(this, element, this.attributes);
        this.currentElement = null;
        this.attributes = {};
    };
    NSXMLParser.prototype.didEndElement = function () {
        var element = this.elements.pop();
        if (typeof this.delegate.parserDidEndElement === "function")
            this.delegate.parserDidEndElement(this, element);
    };
    NSXMLParser.prototype.text = function (value) {
        if (typeof this.delegate.parserFoundCharacters === "function")
            this.delegate.parserFoundCharacters(this, value);
    };
    NSXMLParser.prototype.comments = function (comment) {
        if (typeof this.delegate.parserFoundComment === "function")
            this.delegate.parserFoundComment(this, comment);
    };
    NSXMLParser.prototype.error = function (expected) {
        NSLog_1.NSLog("Error: Unexpected token. " + expected);
    };
    return NSXMLParser;
}(NSObject_1.NSObject));
exports.NSXMLParser = NSXMLParser;
//# sourceMappingURL=NSXMLParser.js.map