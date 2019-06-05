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
 
var MIOCorePlatformType;
(function (MIOCorePlatformType) {
    MIOCorePlatformType[MIOCorePlatformType["Unknown"] = 0] = "Unknown";
    MIOCorePlatformType[MIOCorePlatformType["Node"] = 1] = "Node";
    MIOCorePlatformType[MIOCorePlatformType["Safari"] = 2] = "Safari";
    MIOCorePlatformType[MIOCorePlatformType["Chrome"] = 3] = "Chrome";
})(MIOCorePlatformType || (MIOCorePlatformType = {}));
function NSClassFromString(className) {
    var classObject = window[className];
    //if (classObject == null) classObject = MIOCoreClassByName(className);
    if (classObject == null)
        throw new Error("NSClassFromString: class '" + className + "' didn't register.");
    var newClass = new classObject();
    return newClass;
}
 
function MIOCoreGetPlatform() {
    var agent = navigator.userAgent.toLowerCase();
    var browserType = MIOCorePlatformType.Unknown;
    if (agent.indexOf("chrome") != -1)
        browserType = MIOCorePlatformType.Chrome;
    else if (agent.indexOf("safari") != -1)
        browserType = MIOCorePlatformType.Safari;
    return browserType;
}
 
function MIOCoreGetPlatformLocale() {
    // navigator.languages:    Chrome & FF
    // navigator.language:     Safari & Others
    // navigator.userLanguage: IE & Others
    return navigator.languages || navigator.language || navigator['userLanguage'];
}
 
function MIOCoreGetPlatformLanguage() {
    var locale = MIOCoreGetPlatformLocale();
    if (typeof (locale) == "string")
        return locale.substring(0, 2);
    else {
        var l = locale[0];
        return l.substring(0, 2);
    }
}
 
function MIOCoreIsPhone() {
    var phone = ['iphone', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
    for (var index = 0; index < phone.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(phone[index].toLowerCase()) > 0) {
            return true;
        }
    }
    return false;
}
 
function MIOCoreIsPad() {
    var pad = ['ipad'];
    for (var index = 0; index < pad.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(pad[index].toLowerCase()) > 0) {
            return true;
        }
    }
    return false;
}
 
function MIOCoreIsMobile() {
    //var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
    var mobile = ['iphone', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
    for (var index = 0; index < mobile.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(mobile[index].toLowerCase()) > 0)
            return true;
    }
    // nothing found.. assume desktop
    return false;
}
 
function MIOCoreBundleGetMainURLString() {
    return window.location.href;
}
 
function MIOCoreBundleGetContentsFromURLString(path, target, completion) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        completion.call(target, this.status, this.responseText);
    };
    xhr.open("GET", path);
    xhr.send();
}
 
function MIOCoreCreateMD5(s) { function L(k, d) { return (k << d) | (k >>> (32 - d)); } function K(G, k) { var I, d, F, H, x; F = (G & 2147483648); H = (k & 2147483648); I = (G & 1073741824); d = (k & 1073741824); x = (G & 1073741823) + (k & 1073741823); if (I & d) {
    return (x ^ 2147483648 ^ F ^ H);
} if (I | d) {
    if (x & 1073741824) {
        return (x ^ 3221225472 ^ F ^ H);
    }
    else {
        return (x ^ 1073741824 ^ F ^ H);
    }
}
else {
    return (x ^ F ^ H);
} } function r(d, F, k) { return (d & F) | ((~d) & k); } function q(d, F, k) { return (d & k) | (F & (~k)); } function p(d, F, k) { return (d ^ F ^ k); } function n(d, F, k) { return (F ^ (d | (~k))); } function u(G, F, aa, Z, k, H, I) { G = K(G, K(K(r(F, aa, Z), k), I)); return K(L(G, H), F); } function f(G, F, aa, Z, k, H, I) { G = K(G, K(K(q(F, aa, Z), k), I)); return K(L(G, H), F); } function D(G, F, aa, Z, k, H, I) { G = K(G, K(K(p(F, aa, Z), k), I)); return K(L(G, H), F); } function t(G, F, aa, Z, k, H, I) { G = K(G, K(K(n(F, aa, Z), k), I)); return K(L(G, H), F); } function e(G) { var Z; var F = G.length; var x = F + 8; var k = (x - (x % 64)) / 64; var I = (k + 1) * 16; var aa = Array(I - 1); var d = 0; var H = 0; while (H < F) {
    Z = (H - (H % 4)) / 4;
    d = (H % 4) * 8;
    aa[Z] = (aa[Z] | (G.charCodeAt(H) << d));
    H++;
} Z = (H - (H % 4)) / 4; d = (H % 4) * 8; aa[Z] = aa[Z] | (128 << d); aa[I - 2] = F << 3; aa[I - 1] = F >>> 29; return aa; } function B(x) { var k = "", F = "", G, d; for (d = 0; d <= 3; d++) {
    G = (x >>> (d * 8)) & 255;
    F = "0" + G.toString(16);
    k = k + F.substr(F.length - 2, 2);
} return k; } function J(k) { k = k.replace(/rn/g, "n"); var d = ""; for (var F = 0; F < k.length; F++) {
    var x = k.charCodeAt(F);
    if (x < 128) {
        d += String.fromCharCode(x);
    }
    else {
        if ((x > 127) && (x < 2048)) {
            d += String.fromCharCode((x >> 6) | 192);
            d += String.fromCharCode((x & 63) | 128);
        }
        else {
            d += String.fromCharCode((x >> 12) | 224);
            d += String.fromCharCode(((x >> 6) & 63) | 128);
            d += String.fromCharCode((x & 63) | 128);
        }
    }
} return d; } var C = Array(); var P, h, E, v, g, Y, X, W, V; var S = 7, Q = 12, N = 17, M = 22; var A = 5, z = 9, y = 14, w = 20; var o = 4, m = 11, l = 16, j = 23; var U = 6, T = 10, R = 15, O = 21; s = J(s); C = e(s); Y = 1732584193; X = 4023233417; W = 2562383102; V = 271733878; for (P = 0; P < C.length; P += 16) {
    h = Y;
    E = X;
    v = W;
    g = V;
    Y = u(Y, X, W, V, C[P + 0], S, 3614090360);
    V = u(V, Y, X, W, C[P + 1], Q, 3905402710);
    W = u(W, V, Y, X, C[P + 2], N, 606105819);
    X = u(X, W, V, Y, C[P + 3], M, 3250441966);
    Y = u(Y, X, W, V, C[P + 4], S, 4118548399);
    V = u(V, Y, X, W, C[P + 5], Q, 1200080426);
    W = u(W, V, Y, X, C[P + 6], N, 2821735955);
    X = u(X, W, V, Y, C[P + 7], M, 4249261313);
    Y = u(Y, X, W, V, C[P + 8], S, 1770035416);
    V = u(V, Y, X, W, C[P + 9], Q, 2336552879);
    W = u(W, V, Y, X, C[P + 10], N, 4294925233);
    X = u(X, W, V, Y, C[P + 11], M, 2304563134);
    Y = u(Y, X, W, V, C[P + 12], S, 1804603682);
    V = u(V, Y, X, W, C[P + 13], Q, 4254626195);
    W = u(W, V, Y, X, C[P + 14], N, 2792965006);
    X = u(X, W, V, Y, C[P + 15], M, 1236535329);
    Y = f(Y, X, W, V, C[P + 1], A, 4129170786);
    V = f(V, Y, X, W, C[P + 6], z, 3225465664);
    W = f(W, V, Y, X, C[P + 11], y, 643717713);
    X = f(X, W, V, Y, C[P + 0], w, 3921069994);
    Y = f(Y, X, W, V, C[P + 5], A, 3593408605);
    V = f(V, Y, X, W, C[P + 10], z, 38016083);
    W = f(W, V, Y, X, C[P + 15], y, 3634488961);
    X = f(X, W, V, Y, C[P + 4], w, 3889429448);
    Y = f(Y, X, W, V, C[P + 9], A, 568446438);
    V = f(V, Y, X, W, C[P + 14], z, 3275163606);
    W = f(W, V, Y, X, C[P + 3], y, 4107603335);
    X = f(X, W, V, Y, C[P + 8], w, 1163531501);
    Y = f(Y, X, W, V, C[P + 13], A, 2850285829);
    V = f(V, Y, X, W, C[P + 2], z, 4243563512);
    W = f(W, V, Y, X, C[P + 7], y, 1735328473);
    X = f(X, W, V, Y, C[P + 12], w, 2368359562);
    Y = D(Y, X, W, V, C[P + 5], o, 4294588738);
    V = D(V, Y, X, W, C[P + 8], m, 2272392833);
    W = D(W, V, Y, X, C[P + 11], l, 1839030562);
    X = D(X, W, V, Y, C[P + 14], j, 4259657740);
    Y = D(Y, X, W, V, C[P + 1], o, 2763975236);
    V = D(V, Y, X, W, C[P + 4], m, 1272893353);
    W = D(W, V, Y, X, C[P + 7], l, 4139469664);
    X = D(X, W, V, Y, C[P + 10], j, 3200236656);
    Y = D(Y, X, W, V, C[P + 13], o, 681279174);
    V = D(V, Y, X, W, C[P + 0], m, 3936430074);
    W = D(W, V, Y, X, C[P + 3], l, 3572445317);
    X = D(X, W, V, Y, C[P + 6], j, 76029189);
    Y = D(Y, X, W, V, C[P + 9], o, 3654602809);
    V = D(V, Y, X, W, C[P + 12], m, 3873151461);
    W = D(W, V, Y, X, C[P + 15], l, 530742520);
    X = D(X, W, V, Y, C[P + 2], j, 3299628645);
    Y = t(Y, X, W, V, C[P + 0], U, 4096336452);
    V = t(V, Y, X, W, C[P + 7], T, 1126891415);
    W = t(W, V, Y, X, C[P + 14], R, 2878612391);
    X = t(X, W, V, Y, C[P + 5], O, 4237533241);
    Y = t(Y, X, W, V, C[P + 12], U, 1700485571);
    V = t(V, Y, X, W, C[P + 3], T, 2399980690);
    W = t(W, V, Y, X, C[P + 10], R, 4293915773);
    X = t(X, W, V, Y, C[P + 1], O, 2240044497);
    Y = t(Y, X, W, V, C[P + 8], U, 1873313359);
    V = t(V, Y, X, W, C[P + 15], T, 4264355552);
    W = t(W, V, Y, X, C[P + 6], R, 2734768916);
    X = t(X, W, V, Y, C[P + 13], O, 1309151649);
    Y = t(Y, X, W, V, C[P + 4], U, 4149444226);
    V = t(V, Y, X, W, C[P + 11], T, 3174756917);
    W = t(W, V, Y, X, C[P + 2], R, 718787259);
    X = t(X, W, V, Y, C[P + 9], O, 3951481745);
    Y = K(Y, h);
    X = K(X, E);
    W = K(W, v);
    V = K(V, g);
} var i = B(Y) + B(X) + B(W) + B(V); return i.toLowerCase(); }
 
;
function MIOCoreStringHasPreffix(str, preffix) {
    return str.substring(0, preffix.length) === preffix;
}
 
function MIOCoreStringHasSuffix(str, suffix) {
    var s = str.substr(str.length - suffix.length);
    return s == suffix;
}
 
function MIOCoreStringAppendPathComponent(string, path) {
    var str = string;
    if (string.charAt(string.length - 1) == "/" && path.charAt(0) == "/") {
        str += path.substr(1);
    }
    else if (string.charAt(string.length - 1) != "/" && path.charAt(0) != "/") {
        str += "/" + path;
    }
    else {
        str += path;
    }
    return str;
}
 
function MIOCoreStringLastPathComponent(string) {
    var index = string.lastIndexOf("/");
    if (index == -1)
        return string;
    var len = string.length - index;
    var str = string.substr(index, len);
    return str;
}
 
function MIOCoreStringPathExtension(string) {
    var lastPathComponent = MIOCoreStringLastPathComponent(string);
    var items = lastPathComponent.split(".");
    if (items.length == 1)
        return "";
    var ext = items[items.length - 1];
    return ext;
}
 
function MIOCoreStringDeletingLastPathComponent(string) {
    var index = string.lastIndexOf("/");
    var str = string.substr(0, index);
    return str;
}
 
function MIOCoreStringStandardizingPath(string) {
    var array = string.split("/");
    var newArray = [];
    var index = 0;
    for (var count = 0; count < array.length; count++) {
        var component = array[count];
        if (component.substr(0, 2) == "..")
            index--;
        else {
            newArray[index] = component;
            index++;
        }
    }
    var str = "";
    if (index > 0)
        str = newArray[0];
    for (var count = 1; count < index; count++) {
        str += "/" + newArray[count];
    }
    return str;
}
 
var _MIOLocalizedStrings = null;
function MIOCoreStringSetLocalizedStrings(data) {
    _MIOLocalizedStrings = data;
}
 
function MIOCoreStringGetLocalizedStrings() {
    return _MIOLocalizedStrings;
}
 
function MIOCoreStringLocalizeString(key, defaultValue) {
    var strings = MIOCoreStringGetLocalizedStrings;
    if (strings == null)
        return defaultValue;
    var value = strings[key];
    if (value == null)
        return defaultValue;
    return value;
}
 
var MIOCoreLexer = /** @class */ (function () {
    function MIOCoreLexer(string) {
        this.input = null;
        this.tokenTypes = [];
        this.tokens = null;
        this.tokenIndex = -1;
        this.ignoreTokenTypes = [];
        this.input = string;
    }
    MIOCoreLexer.prototype.addTokenType = function (type, regex) {
        this.tokenTypes.push({ "regex": regex, "type": type });
    };
    MIOCoreLexer.prototype.ignoreTokenType = function (type) {
        this.ignoreTokenTypes.push(type);
    };
    MIOCoreLexer.prototype.tokenize = function () {
        this.tokens = this._tokenize();
        this.tokenIndex = 0;
    };
    MIOCoreLexer.prototype._tokenize = function () {
        var tokens = [];
        var foundToken = false;
        var matches;
        var i;
        var numTokenTypes = this.tokenTypes.length;
        do {
            foundToken = false;
            for (i = 0; i < numTokenTypes; i++) {
                var regex = this.tokenTypes[i].regex;
                var type = this.tokenTypes[i].type;
                matches = regex.exec(this.input);
                if (matches) {
                    if (this.ignoreTokenTypes.indexOf(type) == -1) {
                        tokens.push({ type: type, value: matches[0], matches: matches });
                    }
                    this.input = this.input.substring(matches[0].length);
                    foundToken = true;
                    break;
                }
            }
            if (foundToken == false) {
                throw new Error("MIOCoreLexer: Token doesn't match any pattern. (" + this.input + ")");
            }
        } while (this.input.length > 0);
        return tokens;
    };
    MIOCoreLexer.prototype.nextToken = function () {
        if (this.tokenIndex >= this.tokens.length) {
            return null;
        }
        var token = this.tokens[this.tokenIndex];
        this.tokenIndex++;
        // Check if we have to ignore
        var index = this.ignoreTokenTypes.indexOf(token.type);
        return index == -1 ? token : this.nextToken();
    };
    MIOCoreLexer.prototype.prevToken = function () {
        this.tokenIndex--;
        if (this.tokenIndex < 0) {
            return null;
        }
        var token = this.tokens[this.tokenIndex];
        // Check if we have to ignore
        var index = this.ignoreTokenTypes.indexOf(token.type);
        return index == -1 ? token : this.prevToken();
    };
    return MIOCoreLexer;
}());
 
var _miocore_languages = null;
function MIOCoreAddLanguage(lang, url) {
    if (_miocore_languages == null)
        _miocore_languages = {};
    _miocore_languages[lang] = url;
}
 
function MIOCoreGetLanguages() {
    return _miocore_languages;
}
 
var MIOCoreHTMLParserTokenType;
(function (MIOCoreHTMLParserTokenType) {
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["Identifier"] = 0] = "Identifier";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["OpenTag"] = 1] = "OpenTag";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["CloseTag"] = 2] = "CloseTag";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["OpenCloseTag"] = 3] = "OpenCloseTag";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["InlineCloseTag"] = 4] = "InlineCloseTag";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["Question"] = 5] = "Question";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["Exclamation"] = 6] = "Exclamation";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["Equal"] = 7] = "Equal";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["Quote"] = 8] = "Quote";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["Commentary"] = 9] = "Commentary";
    MIOCoreHTMLParserTokenType[MIOCoreHTMLParserTokenType["End"] = 10] = "End";
})(MIOCoreHTMLParserTokenType || (MIOCoreHTMLParserTokenType = {}));
var MIOCoreHTMLParser = /** @class */ (function () {
    function MIOCoreHTMLParser() {
        this.string = null;
        this.stringIndex = 0;
        this.delegate = null;
        this.exceptionsTags = ["!DOCTYPE", "area", "base", "br", "col", "hr", "img", "input", "link", "meta", "param", "keygen", "source"];
        this.lastTokenIndex = -1;
        this.lastTokenValue = null;
    }
    MIOCoreHTMLParser.prototype.initWithString = function (string, delegate) {
        this.string = string;
        this.delegate = delegate;
    };
    MIOCoreHTMLParser.prototype.nextChar = function () {
        if (this.stringIndex >= this.string.length)
            return null;
        var ch = this.string.charAt(this.stringIndex);
        this.stringIndex++;
        return ch;
    };
    MIOCoreHTMLParser.prototype.prevChar = function () {
        this.stringIndex--;
        return this.string.charAt(this.stringIndex);
    };
    MIOCoreHTMLParser.prototype.getChars = function (stopChars) {
        var chs = "";
        var exit = false;
        while (exit == false) {
            chs += this.nextChar();
            if (MIOCoreStringHasSuffix(chs, stopChars) == true)
                exit = true;
        }
        // Remove the stop chars
        return chs.substr(0, chs.length - stopChars.length);
    };
    /*
    STREAM TOKENIZER
    */
    MIOCoreHTMLParser.prototype.readToken = function () {
        var value = "";
        this.lastTokenIndex = this.stringIndex;
        var ch = this.nextChar();
        if (ch == null)
            return null;
        while (ch == " ")
            ch = this.nextChar();
        var exit = false;
        while (exit == false) {
            switch (ch) {
                case "<":
                    if (value.length == 0)
                        value = this.minor();
                    else
                        this.prevChar();
                    exit = true;
                    break;
                // case "!":
                //     if (value.length == 0) value = this.exclamation();
                //     else this.prevChar();
                //     exit = true;
                //     break;
                case ">":
                    if (value.length == 0)
                        value = this.major();
                    else
                        this.prevChar();
                    exit = true;
                    break;
                // case "/":
                //     if (value.length == 0) value = this.slash();
                //     else this.prevChar();                    
                //     exit = true;
                //     break;
                case "=":
                    if (value.length == 0)
                        value = ch;
                    else
                        this.prevChar();
                    exit = true;
                case " ":
                    exit = true;
                    break;
                case "\"":
                case "'":
                    if (value.length == 0)
                        value = ch;
                    exit = true;
                    break;
                default:
                    value += ch;
                    ch = this.nextChar();
                    if (ch == null)
                        exit = true;
                    break;
            }
        }
        return value;
    };
    MIOCoreHTMLParser.prototype.minor = function () {
        var ch = this.nextChar();
        var value = "";
        switch (ch) {
            case "/":
                value = "</";
                break;
            case "!":
                value = this.exclamation();
                break;
            default:
                value = "<";
                this.prevChar();
                break;
        }
        return value;
    };
    MIOCoreHTMLParser.prototype.major = function () {
        this.prevChar(); // Major symbol
        var ch = this.prevChar();
        var value = ">";
        if (ch == "/") {
            value = "/>";
        }
        value = this.nextChar();
        value = this.nextChar();
        return value;
    };
    // private slash(){
    //     let ch = this.nextChar();
    //     if (ch == ">") return "/>";
    //     this.unexpectedToken();
    // }
    MIOCoreHTMLParser.prototype.exclamation = function () {
        var ch = this.nextChar();
        if (ch == "-") {
            var ch2 = this.nextChar();
            if (ch2 == "-") {
                return "<!--";
            }
            else
                this.unexpectedToken(ch + ch2);
        }
        this.prevChar();
        this.prevChar();
        return "<";
    };
    MIOCoreHTMLParser.prototype.prevToken = function () {
        this.stringIndex = this.lastTokenIndex;
        this.lastTokenIndex = -1;
        var value = this.lastTokenValue;
        this.lastTokenValue = null;
        return value;
    };
    MIOCoreHTMLParser.prototype.nextToken = function () {
        var type = MIOCoreHTMLParserTokenType.Identifier;
        var value = this.readToken();
        if (value == null)
            return [MIOCoreHTMLParserTokenType.End, value];
        switch (value) {
            case "<":
                type = MIOCoreHTMLParserTokenType.OpenTag;
                break;
            case ">":
                type = MIOCoreHTMLParserTokenType.CloseTag;
                break;
            case "</":
                type = MIOCoreHTMLParserTokenType.OpenCloseTag;
                break;
            case "/>":
                type = MIOCoreHTMLParserTokenType.InlineCloseTag;
                break;
            case "<!--":
                type = MIOCoreHTMLParserTokenType.Commentary;
                break;
            case "=":
                type = MIOCoreHTMLParserTokenType.Equal;
                break;
            case "\"":
            case "'":
                type = MIOCoreHTMLParserTokenType.Quote;
                break;
        }
        this.lastTokenValue = value;
        return [type, value];
    };
    /*
        PARSER
    */
    MIOCoreHTMLParser.prototype.parse = function () {
        if (this.string == null)
            return;
        if (typeof this.delegate.parserDidStartDocument === "function") {
            this.delegate.parserDidStartDocument(this);
        }
        var exit = false;
        do {
            var _a = this.nextToken(), type = _a[0], value = _a[1];
            switch (type) {
                case MIOCoreHTMLParserTokenType.OpenTag:
                    this.openTag();
                    break;
                case MIOCoreHTMLParserTokenType.OpenCloseTag:
                    this.closeElement();
                    break;
                case MIOCoreHTMLParserTokenType.Commentary:
                    this.comment();
                    break;
                case MIOCoreHTMLParserTokenType.Identifier:
                    this.foundChars(value);
                    break;
                case MIOCoreHTMLParserTokenType.End:
                    exit = true;
                    break;
                default:
                    this.unexpectedToken(value);
                    break;
            }
        } while (exit == false);
        if (typeof this.delegate.parserDidEndDocument === "function") {
            this.delegate.parserDidEndDocument(this);
        }
    };
    MIOCoreHTMLParser.prototype.unexpectedToken = function (value) {
        throw new Error("Unexpected token: " + value);
    };
    MIOCoreHTMLParser.prototype.openTag = function () {
        var _a = this.nextToken(), type = _a[0], value = _a[1];
        switch (type) {
            case MIOCoreHTMLParserTokenType.Identifier:
                this.openElement(value);
                break;
            case MIOCoreHTMLParserTokenType.Exclamation:
                this.exclamation();
                break;
        }
    };
    MIOCoreHTMLParser.prototype.openElement = function (element) {
        var attributes = this.attributes();
        this.closeTag(element, attributes);
    };
    MIOCoreHTMLParser.prototype.attributes = function () {
        var attributes = {};
        var exit = false;
        var attrKey = null;
        var isKey = true;
        while (exit == false) {
            var _a = this.nextToken(), type = _a[0], value = _a[1];
            switch (type) {
                case MIOCoreHTMLParserTokenType.Identifier:
                    if (isKey) {
                        attrKey = value;
                        attributes[attrKey] = null;
                    }
                    else {
                        attributes[attrKey] = value;
                        isKey = true;
                    }
                    break;
                case MIOCoreHTMLParserTokenType.Equal:
                    isKey = false;
                    break;
                case MIOCoreHTMLParserTokenType.Quote:
                    attributes[attrKey] = this.getChars(value);
                    isKey = true;
                    break;
                case MIOCoreHTMLParserTokenType.CloseTag:
                case MIOCoreHTMLParserTokenType.InlineCloseTag:
                    this.prevToken();
                    exit = true;
                    break;
            }
        }
        return attributes;
    };
    MIOCoreHTMLParser.prototype.closeTag = function (element, attributes) {
        var _a = this.nextToken(), type = _a[0], value = _a[1];
        switch (type) {
            case MIOCoreHTMLParserTokenType.CloseTag:
                if (typeof this.delegate.parserDidStartElement === "function") {
                    this.delegate.parserDidStartElement(this, element, attributes);
                }
                // Only call close element for the execeptions tags            
                if ((this.exceptionsTags.indexOf(element) > -1) && (typeof this.delegate.parserDidEndElement === "function")) {
                    this.delegate.parserDidEndElement(this, element);
                }
                // Special cases like <style></style> or <script></script>
                // We need to read everything 'til the next close tag
                if (element == "style" || element == "script") {
                    var chars = this.readToNextString("</" + element + ">");
                    this.foundChars(chars);
                    if (typeof this.delegate.parserDidEndElement === "function") {
                        this.delegate.parserDidEndElement(this, element);
                    }
                }
                break;
            case MIOCoreHTMLParserTokenType.InlineCloseTag:
                if (typeof this.delegate.parserDidEndElement === "function") {
                    this.delegate.parserDidEndElement(this, element);
                }
                break;
            default:
                this.unexpectedToken(value);
                break;
        }
    };
    MIOCoreHTMLParser.prototype.closeElement = function () {
        var _a;
        var _b = this.nextToken(), type = _b[0], value = _b[1];
        if (type != MIOCoreHTMLParserTokenType.Identifier)
            this.unexpectedToken(value);
        var element = value;
        _a = this.nextToken(), type = _a[0], value = _a[1];
        if (type != MIOCoreHTMLParserTokenType.CloseTag)
            this.unexpectedToken(value);
        if (typeof this.delegate.parserDidEndElement === "function") {
            this.delegate.parserDidEndElement(this, element);
        }
    };
    MIOCoreHTMLParser.prototype.comment = function () {
        var cmt = this.getChars("-->");
        if (typeof this.delegate.parserFoundComment === "function") {
            this.delegate.parserFoundComment(this, cmt);
        }
    };
    MIOCoreHTMLParser.prototype.foundChars = function (chars) {
        if (chars == null)
            return;
        if (typeof this.delegate.parserFoundCharacters === "function") {
            this.delegate.parserFoundCharacters(this, chars);
        }
    };
    MIOCoreHTMLParser.prototype.readToNextString = function (element) {
        var str = "";
        for (var index = 0; index < element.length; index++) {
            var ch = this.nextChar();
            if (ch == null)
                throw Error("Unexpected end of string: " + str);
            str += ch;
        }
        if (str == element)
            return null;
        var exit = false;
        while (exit == false) {
            var ch = this.nextChar();
            if (ch == null)
                throw Error("Unexpected end of string: " + str);
            str += ch;
            var cmp = str.substr(-element.length);
            if (cmp == element)
                exit = true;
        }
        var chars = str.substr(0, str.length - element.length);
        console.log("*****\n" + chars + "\n*****\n");
        return chars;
    };
    return MIOCoreHTMLParser;
}());
 
var MIOCoreBundle = /** @class */ (function () {
    function MIOCoreBundle() {
    }
    return MIOCoreBundle;
}());
 
var _MIOAppBundleResources = {};
function MIOCoreBundleSetAppResource(resource, type, content) {
    var files = _MIOAppBundleResources[type];
    if (files == null) {
        files = {};
        _MIOAppBundleResources[type] = files;
    }
    files[resource] = content;
}
 
function MIOCoreBundleGetAppResource(resource, type) {
    var files = _MIOAppBundleResources[type];
    if (files == null)
        return null;
    var content = files[resource];
    return content;
}
 
var MIOCoreBundleHTMLParser = /** @class */ (function () {
    function MIOCoreBundleHTMLParser(text) {
        this.text = null;
        this.result = "";
        this.isCapturing = false;
        this.elementCapturingCount = 0;
        this.currentString = null;
        this.currentStringLocalizedKey = null;
        this.text = text;
    }
    MIOCoreBundleHTMLParser.prototype.parse = function () {
        var parser = new MIOCoreHTMLParser();
        parser.initWithString(this.text, this);
        parser.parse();
        return this.result;
    };
    // HTML Parser delegate
    MIOCoreBundleHTMLParser.prototype.parserDidStartElement = function (parser, element, attributes) {
        if (element.toLocaleLowerCase() == "div") {
            if (attributes["data-main-view-controller"] == true) {
                // Start capturing   
                this.isCapturing = true;
            }
        }
        if (this.isCapturing == true) {
            this.openTag(element, attributes);
            this.elementCapturingCount++;
        }
    };
    MIOCoreBundleHTMLParser.prototype.parserFoundCharacters = function (parser, characters) {
        if (this.isCapturing == true) {
            if (this.currentString == null) {
                this.currentString = characters;
            }
            else
                this.currentString += " " + characters;
            //this.result += " " + characters;
        }
    };
    MIOCoreBundleHTMLParser.prototype.parserFoundComment = function (parser, comment) {
        if (this.isCapturing == true) {
            this.result += "<!-- " + comment + "-->";
        }
    };
    MIOCoreBundleHTMLParser.prototype.parserDidEndElement = function (parser, element) {
        if (this.isCapturing == true) {
            this.closeTag(element);
            this.elementCapturingCount--;
        }
        if (this.elementCapturingCount == 0)
            this.isCapturing = false;
        this.currentString = null;
    };
    MIOCoreBundleHTMLParser.prototype.parserDidStartDocument = function (parser) {
        console.log("parser started");
    };
    MIOCoreBundleHTMLParser.prototype.parserDidEndDocument = function (parser) {
        console.log("datamodel.xml parser finished");
        console.log(this.result);
    };
    MIOCoreBundleHTMLParser.prototype.openTag = function (element, attributes) {
        this.translateCharacters();
        this.result += "<" + element;
        for (var key in attributes) {
            var value = attributes[key];
            if (value != null) {
                this.result += " " + key + "='" + value + "'";
            }
            else {
                this.result += " " + key;
            }
        }
        this.result += ">";
        if (element == "span") {
            this.currentStringLocalizedKey = attributes["localized-key"] || attributes["data-localized-key"];
        }
    };
    MIOCoreBundleHTMLParser.prototype.closeTag = function (element) {
        this.translateCharacters();
        this.result += "</" + element + ">";
    };
    MIOCoreBundleHTMLParser.prototype.translateCharacters = function () {
        if (this.currentString != null) {
            if (this.currentStringLocalizedKey == null) {
                this.result += this.currentString;
            }
            else {
                this.result += MIOCoreStringLocalizeString(this.currentStringLocalizedKey, this.currentString);
            }
        }
        this.currentString = null;
        this.currentStringLocalizedKey = null;
    };
    return MIOCoreBundleHTMLParser;
}());
 
var MIOCoreBundle_web = /** @class */ (function (_super) {
    __extends(MIOCoreBundle_web, _super);
    function MIOCoreBundle_web() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseURL = null;
        _this._layoutWorker = null;
        _this._layoutQueue = null;
        _this._layoutCache = null;
        _this._isDownloadingResource = false;
        return _this;
    }
    MIOCoreBundle_web.prototype.loadHTMLFromPath = function (path, target, completion) {
        MIOCoreBundleGetContentsFromURLString(path, this, function (code, data) {
            var parser = new MIOCoreBundleHTMLParser(data);
            var contents = parser.parse();
            completion.call(target, contents);
        });
    };
    // loadHMTLFromPath(path, layerID, target, completion)
    // {
    //     if (this._layoutWorker == null)
    //     {
    //         this._layoutWorker = new Worker("libs/miojslibs/webworkers/Bundle_WebWorker.js");
    //         this._layoutWorker.postMessage({"CMD" : "SetLanguageStrings", "LanguageStrings" : MIOCoreStringGetLocalizedStrings()});
    //         let instance = this;
    //         this._layoutWorker.onmessage = function (event) {
    //             let item = event.data;
    //             if (item["Type"] == "HTML"){
    //                 let result = item["Result"];
    //                 let layerID = item["LayerID"];
    //                 console.log(" <- layerid: " + layerID);                    
    //                 instance.layerDidDownload(result);
    //             }     
    //             else if (item["Error"] != null) {
    //                 throw new Error(`MIOBundle: ${item["Error"]}`);
    //             }           
    //         }
    //     }
    //     if (this._layoutQueue == null)
    //         this._layoutQueue = [];
    //     if (this._layoutCache == null)
    //         this._layoutCache = {};
    //     if (this._layoutCache[path] != null)
    //     {
    //         let i = this._layoutCache[path];
    //         let layout = i["Layer"];
    //         completion.call(target, layout);
    //     }
    //     else
    //     {
    //         let url = MIOCoreStringAppendPathComponent(this.baseURL, path);
    //         let item = {"Key" : path, "Path" : MIOCoreStringDeletingLastPathComponent(path), "URL": url, "LayerID": layerID, "Target" : target, "Completion" : completion};
    //         this._layoutQueue.push(item);
    //         this.checkQueue();        
    //     }
    // }
    MIOCoreBundle_web.prototype.checkQueue = function () {
        if (this._isDownloadingResource == true)
            return;
        if (this._layoutQueue.length == 0)
            return;
        this._isDownloadingResource = true;
        var item = this._layoutQueue[0];
        // Send only the information need
        console.log("Download resource: " + item["URL"]);
        var msg = { "CMD": "DownloadHTML", "URL": item["URL"], "Path": item["Path"], "LayerID": item["LayerID"] };
        console.log(" -> layerid: " + item["LayerID"]);
        this._layoutWorker.postMessage(msg);
    };
    MIOCoreBundle_web.prototype.layerDidDownload = function (layer) {
        var item = this._layoutQueue[0];
        console.log("Downloaded resource: " + item["URL"]);
        this._isDownloadingResource = false;
        item["Layer"] = layer;
        var key = item["Key"];
        this._layoutCache[key] = item;
        this._checkDownloadCount();
    };
    MIOCoreBundle_web.prototype._checkDownloadCount = function () {
        if (this._isDownloadingResource == true)
            return;
        var item = this._layoutQueue[0];
        this._layoutQueue.splice(0, 1);
        var target = item["Target"];
        var completion = item["Completion"];
        var layer = item["Layer"];
        completion.call(target, layer);
        delete item["Target"];
        delete item["Completion"];
        this.checkQueue();
    };
    return MIOCoreBundle_web;
}(MIOCoreBundle));
 
var NSPoint = /** @class */ (function () {
    function NSPoint(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    NSPoint.Zero = function () {
        var p = new NSPoint(0, 0);
        return p;
    };
    return NSPoint;
}());
 
var NSRange = /** @class */ (function () {
    function NSRange(location, length) {
        this.location = 0;
        this.length = 0;
        this.location = location;
        this.length = length;
    }
    return NSRange;
}());
 
function NSMaxRange(range) {
    return range.location + range.length;
}
 
function NSEqualRanges(range1, range2) {
    return (range1.location == range2.location && range1.length == range2.length);
}
 
function NSLocationInRange(location, range) {
    if (range == null)
        return false;
    return (location >= range.location && location < NSMaxRange(range)) ? true : false;
}
 
function NSIntersectionRange(range1, range2) {
    var max1 = NSMaxRange(range1);
    var max2 = NSMaxRange(range2);
    var min, loc;
    var result;
    min = (max1 < max2) ? max1 : max2;
    loc = (range1.location > range2.location) ? range1.location : range2.location;
    if (min < loc) {
        result.location = result.length = 0;
    }
    else {
        result.location = loc;
        result.length = min - loc;
    }
    return result;
}
 
function NSUnionRange(range1, range2) {
    var max1 = NSMaxRange(range1);
    var max2 = NSMaxRange(range2);
    var max, loc;
    var result;
    max = (max1 > max2) ? max1 : max2;
    loc = (range1.location < range2.location) ? range1.location : range2.location;
    result.location = loc;
    result.length = max - result.location;
    return result;
}
 
var NSRect = /** @class */ (function () {
    function NSRect(p, s) {
        this.origin = null;
        this.size = null;
        this.origin = p;
        this.size = s;
    }
    NSRect.Zero = function () {
        var f = new NSRect(NSPoint.Zero(), NSSize.Zero());
        return f;
    };
    NSRect.rectWithValues = function (x, y, w, h) {
        var p = new NSPoint(x, y);
        var s = new NSSize(w, h);
        var f = new NSRect(p, s);
        return f;
    };
    return NSRect;
}());
 
function NSRectMaxY(rect) {
    return rect.origin.y;
}
function NSRectMinY(rect) {
    return rect.origin.y + rect.size.height;
}
var NSSize = /** @class */ (function () {
    function NSSize(w, h) {
        this.width = 0;
        this.height = 0;
        this.width = w;
        this.height = h;
    }
    NSSize.Zero = function () {
        var s = new NSSize(0, 0);
        return s;
    };
    NSSize.prototype.isEqualTo = function (size) {
        if (this.width == size.width
            && this.height == size.height)
            return true;
        return false;
    };
    return NSSize;
}());
 
/**
 * Created by godshadow on 26/3/16.
 */
var NSObject = /** @class */ (function () {
    function NSObject() {
        this._className = null;
        this.keyPaths = {};
    }
    NSObject.prototype.getClassName = function () {
        if (this._className != null)
            return this._className;
        this._className = this.constructor["name"];
        // let funcNameRegex = /function (.{1,})\(/;
        // let results = (funcNameRegex).exec((this).constructor.toString());        
        // this._className = (results && results.length > 1) ? results[1] : null;
        return this._className;
    };
    Object.defineProperty(NSObject.prototype, "className", {
        get: function () {
            return this.getClassName();
        },
        enumerable: true,
        configurable: true
    });
    NSObject.prototype.init = function () { };
    NSObject.prototype._notifyValueChange = function (key, type) {
        var observers = this.keyPaths[key];
        if (observers == null)
            return;
        // copy the array so we can iterating safetly
        var obs = [];
        for (var count = 0; count < observers.length; count++) {
            var item = observers[count];
            obs.push(item);
        }
        for (var count = 0; count < obs.length; count++) {
            var item = obs[count];
            var o = item["OBS"];
            if (typeof o.observeValueForKeyPath === "function") {
                var keyPath = item["KP"] != null ? item["KP"] : key;
                var ctx = item["CTX"];
                o.observeValueForKeyPath.call(o, keyPath, type, this, ctx);
            }
        }
    };
    NSObject.prototype.willChangeValueForKey = function (key) {
        this.willChangeValue(key);
    };
    NSObject.prototype.didChangeValueForKey = function (key) {
        this.didChangeValue(key);
    };
    //TODO: Remove below method
    NSObject.prototype.willChangeValue = function (key) {
        this._notifyValueChange(key, "will");
    };
    NSObject.prototype.didChangeValue = function (key) {
        this._notifyValueChange(key, "did");
    };
    NSObject.prototype._addObserver = function (obs, key, context, keyPath) {
        var observers = this.keyPaths[key];
        if (observers == null) {
            observers = [];
            this.keyPaths[key] = observers;
        }
        var item = { "OBS": obs };
        if (context != null)
            item["CTX"] = context;
        if (keyPath != null)
            item["KP"] = keyPath;
        observers.push(item);
    };
    NSObject.prototype._keyFromKeypath = function (keypath) {
        var index = keypath.indexOf('.');
        if (index == -1) {
            return [keypath, null];
        }
        var key = keypath.substring(0, index);
        var offset = keypath.substring(index + 1);
        return [key, offset];
    };
    NSObject.prototype.addObserver = function (obs, keypath, context) {
        var _a;
        var _b = this._keyFromKeypath(keypath), key = _b[0], offset = _b[1];
        if (offset == null) {
            this._addObserver(obs, key, context);
        }
        else {
            var obj = this;
            var exit = false;
            while (exit == false) {
                if (offset == null) {
                    obj._addObserver(obs, key, context, keypath);
                    exit = true;
                }
                else {
                    obj = this.valueForKey(key);
                    _a = this._keyFromKeypath(offset), key = _a[0], offset = _a[1];
                }
                if (obj == null)
                    throw new Error("ERROR: Registering observer to null object");
            }
        }
    };
    NSObject.prototype.removeObserver = function (obs, keypath) {
        var observers = this.keyPaths[keypath];
        if (observers == null)
            return;
        var index = observers.indexOf(obs);
        observers.splice(index, 1);
    };
    NSObject.prototype.setValueForKey = function (value, key) {
        this.willChangeValue(key);
        this[key] = value;
        this.didChangeValue(value);
    };
    NSObject.prototype.valueForKey = function (key) {
        return this[key];
    };
    NSObject.prototype.valueForKeyPath = function (keyPath) {
        var _a;
        var _b = this._keyFromKeypath(keyPath), key = _b[0], offset = _b[1];
        var value = null;
        var obj = this;
        var exit = false;
        while (exit == false) {
            if (offset == null) {
                value = obj.valueForKey(key);
                exit = true;
            }
            else {
                obj = obj.valueForKey(key);
                _a = this._keyFromKeypath(offset), key = _a[0], offset = _a[1];
                if (obj == null)
                    exit = true;
            }
        }
        return value;
    };
    NSObject.prototype.copy = function () {
        var obj = NSClassFromString(this.className);
        obj.init();
        return obj;
    };
    NSObject.prototype.performSelector = function (selector) {
        return this[selector]();
    };
    NSObject.prototype.performSelectorOnMainThread = function (selector, arg, waitUntilDone) {
        this[selector](arg);
    };
    return NSObject;
}());
 
var NSNull = /** @class */ (function (_super) {
    __extends(NSNull, _super);
    function NSNull() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NSNull.nullValue = function () {
        var n = new NSNull();
        n.init();
        return n;
    };
    return NSNull;
}(NSObject));
 
var NSError = /** @class */ (function (_super) {
    __extends(NSError, _super);
    function NSError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorCode = 0;
        return _this;
    }
    return NSError;
}(NSObject));
 
/**
 * Created by godshadow on 9/4/16.
 */
var NSBundle = /** @class */ (function (_super) {
    __extends(NSBundle, _super);
    function NSBundle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = null;
        return _this;
    }
    NSBundle.mainBundle = function () {
        if (this._mainBundle == null) {
            var urlString = MIOCoreBundleGetMainURLString();
            this._mainBundle = new NSBundle();
            this._mainBundle.initWithURL(NSURL.urlWithString(urlString));
        }
        return this._mainBundle;
    };
    NSBundle.prototype.initWithURL = function (url) {
        this.url = url;
    };
    NSBundle.prototype.loadNibNamed = function (name, owner, options) {
        var path = MIOCoreBundleGetMainURLString() + "/" + name;
        MIOCoreBundleGetContentsFromURLString(path, this, function (code, data) {
            owner._didLoadNibWithLayerData(data);
        });
    };
    NSBundle.prototype.pathForResourceOfType = function (resource, type) {
        return MIOCoreBundleGetAppResource(resource, type);
    };
    NSBundle._mainBundle = null;
    return NSBundle;
}(NSObject));
 
function MIOCoreBundleDownloadResource(name, extension, target, completion) {
    var resource = name + "." + extension;
    var request = NSURLRequest.requestWithURL(NSURL.urlWithString(resource));
    var con = new NSURLConnection();
    con.initWithRequestBlock(request, target, function (code, data) {
        if (code == 200) {
            MIOCoreBundleSetAppResource(name, extension, data);
        }
        completion.call(target, data);
    });
}
 
var NSCoder = /** @class */ (function (_super) {
    __extends(NSCoder, _super);
    function NSCoder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NSCoder.prototype.decodeIntegerForKey = function (key) {
    };
    NSCoder.prototype.decodeObjectForKey = function (key) {
    };
    return NSCoder;
}(NSObject));
 
var NSKeyedUnarchiver = /** @class */ (function (_super) {
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
        var items = NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);
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
        var obj = NSClassFromString(classname);
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
        //TODO: Check for date
        return this.createObjectFromInfo(value);
    };
    return NSKeyedUnarchiver;
}(NSCoder));
 
var NSNumber = /** @class */ (function (_super) {
    __extends(NSNumber, _super);
    function NSNumber() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.storeValue = null;
        return _this;
    }
    NSNumber.numberWithBool = function (value) {
        var n = new NSNumber();
        n.initWithBool(value);
        return n;
    };
    NSNumber.numberWithInteger = function (value) {
        var n = new NSNumber();
        n.initWithInteger(value);
        return n;
    };
    NSNumber.numberWithFloat = function (value) {
        var n = new NSNumber();
        n.initWithFloat(value);
        return n;
    };
    NSNumber.prototype.initWithBool = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 1;
        }
        else {
            this.storeValue = value ? 0 : 1;
        }
    };
    NSNumber.prototype.initWithInteger = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 0;
        }
        else {
            this.storeValue = value;
        }
    };
    NSNumber.prototype.initWithFloat = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 0.0;
        }
        else {
            this.storeValue = value;
        }
    };
    return NSNumber;
}(NSObject));
 

var NSDecimalNumber = /** @class */ (function (_super) {
    __extends(NSDecimalNumber, _super);
    function NSDecimalNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NSDecimalNumber.decimalNumberWithString = function (str) {
        var dn = new NSDecimalNumber();
        dn.initWithString(str);
        return dn;
    };
    NSDecimalNumber.one = function () {
        return NSDecimalNumber.numberWithInteger(1);
    };
    NSDecimalNumber.zero = function () {
        return NSDecimalNumber.numberWithInteger(0);
    };
    // static subclasses from NSnumber
    NSDecimalNumber.numberWithBool = function (value) {
        var n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;
    };
    NSDecimalNumber.numberWithInteger = function (value) {
        var n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;
    };
    NSDecimalNumber.numberWithFloat = function (value) {
        var n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;
    };
    NSDecimalNumber.prototype.initWithString = function (str) {
        this._initWithValue(str);
    };
    NSDecimalNumber.prototype.initWithDecimal = function (value) {
        _super.prototype.init.call(this);
        if (isNaN(value) || value == null) {
            this.storeValue = new decimal_js_1.Decimal(0);
        }
        else {
            this.storeValue = value;
        }
    };
    NSDecimalNumber.prototype._initWithValue = function (value) {
        _super.prototype.init.call(this);
        this.storeValue = new decimal_js_1.Decimal(value || 0);
    };
    NSDecimalNumber.prototype.decimalNumberByAdding = function (value) {
        var dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.add(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberBySubtracting = function (value) {
        var dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.sub(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberByMultiplyingBy = function (value) {
        var dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.mul(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberByDividingBy = function (value) {
        var dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.div(value.storeValue));
        return dv;
    };
    Object.defineProperty(NSDecimalNumber.prototype, "decimalValue", {
        get: function () {
            return this.storeValue.toNumber();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSDecimalNumber.prototype, "floatValue", {
        get: function () {
            return this.storeValue.toNumber();
        },
        enumerable: true,
        configurable: true
    });
    return NSDecimalNumber;
}(NSNumber));
 
String.prototype.lastPathComponent = function () {
    return MIOCoreStringLastPathComponent(this);
};
String.prototype.pathExtension = function () {
    return MIOCoreStringPathExtension(this);
};
String.prototype.stringByAppendingPathComponent = function (path) {
    return MIOCoreStringAppendPathComponent(this, path);
};
String.prototype.stringByDeletingLastPathComponent = function () {
    return MIOCoreStringDeletingLastPathComponent(this);
};
String.prototype.hasPreffix = function (preffix) {
    return MIOCoreStringHasPreffix(this, preffix);
};
String.prototype.hasSuffix = function (suffix) {
    return MIOCoreStringHasSuffix(this, suffix);
};
function NSLocalizeString(key, defaultValue) {
    return MIOCoreStringLocalizeString(key, defaultValue);
}
 
/**
 * Created by godshadow on 11/3/16.
 */
var NSDateFirstWeekDay;
(function (NSDateFirstWeekDay) {
    NSDateFirstWeekDay[NSDateFirstWeekDay["Sunday"] = 0] = "Sunday";
    NSDateFirstWeekDay[NSDateFirstWeekDay["Monday"] = 1] = "Monday";
})(NSDateFirstWeekDay || (NSDateFirstWeekDay = {}));
var _NSDateFirstWeekDay = NSDateFirstWeekDay.Monday;
var _NSDateStringDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var _NSDateStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function NSDateSetFirstWeekDay(day) {
    _NSDateFirstWeekDay = day;
    if (day == NSDateFirstWeekDay.Sunday)
        _NSDateStringDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    else
        _NSDateStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}
 
function NSDateGetStringForMonth(month) {
    return _NSDateStringMonths[month];
}
 
function NSDateGetStringForDay(day) {
    return _NSDateStringDays[day];
}
 
function NSDateGetDayFromDate(date) {
    if (_NSDateFirstWeekDay == NSDateFirstWeekDay.Sunday)
        return date.getDay();
    // Transform to start on Monday instead of Sunday
    // 0 - Mon, 1 - Tue, 2 - Wed, 3 - Thu, 4 - Fri, 5 - Sat, 6 - Sun
    var day = date.getDay();
    if (day == 0)
        day = 6;
    else
        day--;
    return day;
}
 
function NSDateGetMonthFromDate(date) {
    return date.getMonth();
}
 
function NSDateGetYearFromDate(date) {
    return date.getFullYear();
}
 
function NSDateGetDayStringFromDate(date) {
    var day = NSDateGetDayFromDate(date);
    return NSDateGetStringForDay(day);
}
 
function NSDateGetString(date) {
    var d = NSDateGetDateString(date);
    var t = NSDateGetTimeString(date);
    return d + " " + t;
}
 
function NSDateGetDateString(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = date.getDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
}
 
function NSDateGetTimeString(date) {
    var hh = date.getHours().toString();
    var mm = date.getMinutes().toString();
    return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]);
}
 
function NSDateGetUTCString(date) {
    var d = NSDateGetUTCDateString(date);
    var t = NSDateGetUTCTimeString(date);
    return d + " " + t;
}
 
function NSDateGetUTCDateString(date) {
    var yyyy = date.getUTCFullYear().toString();
    var mm = (date.getUTCMonth() + 1).toString(); // getMonth() is zero-based
    var dd = date.getUTCDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
}
 
function NSDateGetUTCTimeString(date) {
    var hh = date.getUTCHours().toString();
    var mm = date.getUTCMinutes().toString();
    var ss = date.getUTCSeconds().toString();
    return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);
}
 
function NSDateFromString(string) {
    var lexer = new MIOCoreLexer(string);
    // Values    
    // lexer.addTokenType(0, /^([0-9]{2,4})-/i); // Year
    // lexer.addTokenType(1, /^[0-9]{1,2}-/i); // Month
    // lexer.addTokenType(2, /^[0-9]{1,2} /i); // day
    // lexer.addTokenType(3, /^[0-9]{1,2}:/i); // hh // mm
    // lexer.addTokenType(4, /^[0-9]{1,2}/i); // ss
    lexer.addTokenType(0, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/i); // yyyy-MM-dd hh:mm:ss
    lexer.addTokenType(1, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2})/i); // yyyy-MM-dd hh:mm 
    lexer.addTokenType(2, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2})/i); // yyyy-MM-dd    
    lexer.tokenize();
    var y = -1;
    var m = -1;
    var d = -1;
    var h = -1;
    var mm = -1;
    var s = -1;
    var token = lexer.nextToken();
    while (token != null) {
        switch (token.type) {
            case 0:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                h = token.matches[4];
                mm = token.matches[5];
                s = token.matches[6];
                break;
            case 1:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                h = token.matches[4];
                mm = token.matches[5];
                break;
            case 2:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                break;
            default:
                return null;
        }
        token = lexer.nextToken();
    }
    if (h == -1)
        h = 0;
    if (mm == -1)
        mm = 0;
    if (s == -1)
        s = 0;
    var date = new Date(y, m, d, h, mm, s);
    return date;
}
 
function NSDateToUTC(date) {
    var dif = date.getTimezoneOffset();
    var d = new Date();
    d.setTime(date.getTime() + (dif * 60 * 1000));
    return d;
}
 
function NSDateAddDaysToDateString(dateString, days) {
    var d = NSDateFromString(dateString);
    d.setDate(d.getDate() + parseInt(days));
    var ds = NSDateGetDateString(d);
    return ds;
}
 
function NSDateRemoveDaysToDateString(dateString, days) {
    var d = NSDateFromString(dateString);
    d.setDate(d.getDate() - parseInt(days));
    var ds = NSDateGetDateString(d);
    return ds;
}
 
function NSDateFromMiliseconds(miliseconds) {
    var mEpoch = parseInt(miliseconds);
    if (mEpoch < 10000000000)
        mEpoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
    var ds = new Date();
    ds.setTime(mEpoch);
    return ds;
}
 
function isDate(x) {
    return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate);
}
 
function NSDateToday() {
    var d = new Date();
    d.setHours(0, 0, 0);
    return d;
}
 
function NSDateNow() {
    return new Date();
}
 
function NSDateTodayString() {
    var d = NSDateToday();
    return NSDateGetString(d);
}
 
function NSDateYesterday() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0, 0, 0);
    return d;
}
 
function NSDateTomorrow() {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0);
    return d;
}
 
function NSDateGetFirstDayOfTheWeek(date) {
    var dayString = NSDateGetDateString(date);
    // TODO: Check sunday start or monday start
    var firstDayString = NSDateRemoveDaysToDateString(dayString, date.getDay() - 1);
    var first = NSDateFromString(firstDayString);
    return first;
}
 
function NSDateGetLastDayOfTheWeek(date) {
    var dayString = NSDateGetDateString(date);
    // TODO: Check sunday start or monday start
    var lastDayString = NSDateAddDaysToDateString(dayString, (7 - date.getDay()));
    var last = NSDateFromString(lastDayString);
    return last;
}
 
function NSDateGetFirstDateOfTheMonth(month, year) {
    return new Date(year, month, 1);
}
 
function NSDateGetFirstDayOfTheMonth(month, year) {
    var d = NSDateGetFirstDateOfTheMonth(month, year);
    return d.getDate();
}
 
function NSDateGetLastDateOfTheMonth(month, year) {
    return new Date(year, month + 1, 0);
}
 
function NSDateGetLastDayOfTheMonth(month, year) {
    var d = NSDateGetLastDateOfTheMonth(month, year);
    return d.getDate();
}
 
function NSDateCopy(date) {
    return new Date(date.getTime());
}
 
/**
 * Created by godshadow on 15/3/16.
 */
var NSUUID = /** @class */ (function (_super) {
    __extends(NSUUID, _super);
    function NSUUID() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._uuid = null;
        return _this;
    }
    // Deprecated
    NSUUID.UUID = function () {
        var uuid = new NSUUID();
        uuid.init();
        return uuid;
    };
    NSUUID.prototype.init = function () {
        this._uuid = _create_UUID();
    };
    Object.defineProperty(NSUUID.prototype, "UUIDString", {
        get: function () {
            return this._uuid;
        },
        enumerable: true,
        configurable: true
    });
    return NSUUID;
}(NSObject));
 
function _create_UUID() {
    var d = new Date().getTime();
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid.toUpperCase();
}
/**
 * Created by godshadow on 1/5/16.
 */
var NSPredicateComparatorType;
(function (NSPredicateComparatorType) {
    NSPredicateComparatorType[NSPredicateComparatorType["Equal"] = 0] = "Equal";
    NSPredicateComparatorType[NSPredicateComparatorType["Less"] = 1] = "Less";
    NSPredicateComparatorType[NSPredicateComparatorType["LessOrEqual"] = 2] = "LessOrEqual";
    NSPredicateComparatorType[NSPredicateComparatorType["Greater"] = 3] = "Greater";
    NSPredicateComparatorType[NSPredicateComparatorType["GreaterOrEqual"] = 4] = "GreaterOrEqual";
    NSPredicateComparatorType[NSPredicateComparatorType["Distinct"] = 5] = "Distinct";
    NSPredicateComparatorType[NSPredicateComparatorType["Contains"] = 6] = "Contains";
    NSPredicateComparatorType[NSPredicateComparatorType["NotContains"] = 7] = "NotContains";
    NSPredicateComparatorType[NSPredicateComparatorType["In"] = 8] = "In";
    NSPredicateComparatorType[NSPredicateComparatorType["NotIn"] = 9] = "NotIn";
})(NSPredicateComparatorType || (NSPredicateComparatorType = {}));
var NSPredicateRelationshipOperatorType;
(function (NSPredicateRelationshipOperatorType) {
    NSPredicateRelationshipOperatorType[NSPredicateRelationshipOperatorType["ANY"] = 0] = "ANY";
    NSPredicateRelationshipOperatorType[NSPredicateRelationshipOperatorType["ALL"] = 1] = "ALL";
})(NSPredicateRelationshipOperatorType || (NSPredicateRelationshipOperatorType = {}));
var NSPredicateOperatorType;
(function (NSPredicateOperatorType) {
    NSPredicateOperatorType[NSPredicateOperatorType["OR"] = 0] = "OR";
    NSPredicateOperatorType[NSPredicateOperatorType["AND"] = 1] = "AND";
})(NSPredicateOperatorType || (NSPredicateOperatorType = {}));
var NSPredicateBitwiseOperatorType;
(function (NSPredicateBitwiseOperatorType) {
    NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["OR"] = 0] = "OR";
    NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["AND"] = 1] = "AND";
    NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["XOR"] = 2] = "XOR";
})(NSPredicateBitwiseOperatorType || (NSPredicateBitwiseOperatorType = {}));
var NSPredicateType;
(function (NSPredicateType) {
    NSPredicateType[NSPredicateType["Predicate"] = 0] = "Predicate";
    NSPredicateType[NSPredicateType["Item"] = 1] = "Item";
    NSPredicateType[NSPredicateType["Operation"] = 2] = "Operation";
})(NSPredicateType || (NSPredicateType = {}));
var NSPredicateOperator = /** @class */ (function () {
    function NSPredicateOperator(type) {
        this.type = null;
        this.type = type;
    }
    NSPredicateOperator.andPredicateOperatorType = function () {
        var op = new NSPredicateOperator(NSPredicateOperatorType.AND);
        return op;
    };
    NSPredicateOperator.orPredicateOperatorType = function () {
        var op = new NSPredicateOperator(NSPredicateOperatorType.OR);
        return op;
    };
    return NSPredicateOperator;
}());
 
var NSPredicateItemValueType;
(function (NSPredicateItemValueType) {
    NSPredicateItemValueType[NSPredicateItemValueType["Undefined"] = 0] = "Undefined";
    NSPredicateItemValueType[NSPredicateItemValueType["UUID"] = 1] = "UUID";
    NSPredicateItemValueType[NSPredicateItemValueType["String"] = 2] = "String";
    NSPredicateItemValueType[NSPredicateItemValueType["Number"] = 3] = "Number";
    NSPredicateItemValueType[NSPredicateItemValueType["Boolean"] = 4] = "Boolean";
    NSPredicateItemValueType[NSPredicateItemValueType["Null"] = 5] = "Null";
    NSPredicateItemValueType[NSPredicateItemValueType["Property"] = 6] = "Property";
})(NSPredicateItemValueType || (NSPredicateItemValueType = {}));
var NSPredicateItem = /** @class */ (function () {
    function NSPredicateItem() {
        this.relationshipOperation = null;
        this.bitwiseOperation = null;
        this.bitwiseKey = null;
        this.bitwiseValue = null;
        this.key = null;
        this.comparator = null;
        this.value = null;
        this.valueType = NSPredicateItemValueType.Undefined;
    }
    NSPredicateItem.prototype.evaluateObject = function (object, key, lvalue) {
        var lValue = lvalue;
        if (lvalue == null) {
            var k = key != null ? key : this.key;
            if (object instanceof NSObject) {
                lValue = object.valueForKeyPath(k);
            }
            else {
                lValue = object[k];
            }
            if (lValue instanceof Date) {
                var sdf = new NSISO8601DateFormatter();
                sdf.init();
                lValue = sdf.stringFromDate(lValue);
            }
            else if (typeof lValue === "string") {
                lValue = lValue.toLocaleLowerCase();
            }
        }
        var rValue = this.value;
        if (this.valueType == NSPredicateItemValueType.Property) {
            rValue = object.valueForKeyPath(rValue);
        }
        if (typeof rValue === "string") {
            rValue = rValue.toLocaleLowerCase();
        }
        if (this.comparator == NSPredicateComparatorType.Equal)
            return (lValue == rValue);
        else if (this.comparator == NSPredicateComparatorType.Distinct)
            return (lValue != rValue);
        else if (this.comparator == NSPredicateComparatorType.Less)
            return (lValue < rValue);
        else if (this.comparator == NSPredicateComparatorType.LessOrEqual)
            return (lValue <= rValue);
        else if (this.comparator == NSPredicateComparatorType.Greater)
            return (lValue > rValue);
        else if (this.comparator == NSPredicateComparatorType.GreaterOrEqual)
            return (lValue >= rValue);
        else if (this.comparator == NSPredicateComparatorType.Contains) {
            if (lValue == null)
                return false;
            if (lValue.indexOf(rValue) > -1)
                return true;
            return false;
        }
        else if (this.comparator == NSPredicateComparatorType.NotContains) {
            if (lValue == null)
                return true;
            if (lValue.indexOf(rValue) > -1)
                return false;
            return true;
        }
    };
    NSPredicateItem.prototype.evaluateRelationshipObject = function (object) {
        var relObjs = null;
        var keys = this.key.split('.');
        var lastKey = keys[keys.length - 1];
        if (keys.length > 1) {
            var relKey = this.key.substring(0, this.key.length - lastKey.length - 1);
            relObjs = object.valueForKeyPath(relKey);
        }
        else {
            relObjs = object.valueForKeyPath(this.key);
        }
        for (var index = 0; index < relObjs.count; index++) {
            var o = relObjs.objectAtIndex(index);
            var result = this.evaluateObject(o, lastKey);
            if (result == true && this.relationshipOperation == NSPredicateRelationshipOperatorType.ANY) {
                return true;
            }
            else if (result == false && this.relationshipOperation == NSPredicateRelationshipOperatorType.ALL) {
                return false;
            }
        }
        return false;
    };
    // HACK: Dirty hack to bitwaire comparate more than 32bits    
    NSPredicateItem.prototype.evaluateBitwaseOperatorObject = function (object) {
        var lvalue = object.valueForKeyPath(this.bitwiseKey);
        var rvalue = parseInt(this.bitwiseValue);
        var value = 0;
        if (this.bitwiseOperation == NSPredicateBitwiseOperatorType.AND) {
            value = lvalue & rvalue;
        }
        else if (this.bitwiseOperation == NSPredicateBitwiseOperatorType.OR) {
            value = lvalue | rvalue;
        }
        return this.evaluateObject(object, null, value);
    };
    return NSPredicateItem;
}());
 
var NSPredicateGroup = /** @class */ (function () {
    function NSPredicateGroup() {
        this.predicates = [];
    }
    NSPredicateGroup.prototype.evaluateObject = function (object) {
        var result = false;
        var op = null;
        var lastResult = null;
        for (var count = 0; count < this.predicates.length; count++) {
            var o = this.predicates[count];
            if (o instanceof NSPredicateGroup) {
                result = o.evaluateObject(object);
            }
            else if (o instanceof NSPredicateItem) {
                if (o.relationshipOperation != null) {
                    result = o.evaluateRelationshipObject(object);
                }
                else if (o.bitwiseOperation != null) {
                    result = o.evaluateBitwaseOperatorObject(object);
                }
                else {
                    result = o.evaluateObject(object);
                }
            }
            else if (o instanceof NSPredicateOperator) {
                op = o.type;
                lastResult = result;
                result = null;
            }
            else {
                throw new Error("NSPredicate: Error. Predicate class type invalid. (" + o + ")");
            }
            if (op != null && result != null) {
                if (op == NSPredicateOperatorType.AND) {
                    result = result && lastResult;
                    op = null;
                    if (result == false)
                        break;
                }
                else if (op == NSPredicateOperatorType.OR) {
                    result = result || lastResult;
                    op = null;
                }
            }
        }
        return result;
    };
    return NSPredicateGroup;
}());
 
var NSPredicateTokenType;
(function (NSPredicateTokenType) {
    NSPredicateTokenType[NSPredicateTokenType["Identifier"] = 0] = "Identifier";
    NSPredicateTokenType[NSPredicateTokenType["UUIDValue"] = 1] = "UUIDValue";
    NSPredicateTokenType[NSPredicateTokenType["StringValue"] = 2] = "StringValue";
    NSPredicateTokenType[NSPredicateTokenType["NumberValue"] = 3] = "NumberValue";
    NSPredicateTokenType[NSPredicateTokenType["BooleanValue"] = 4] = "BooleanValue";
    NSPredicateTokenType[NSPredicateTokenType["NullValue"] = 5] = "NullValue";
    NSPredicateTokenType[NSPredicateTokenType["PropertyValue"] = 6] = "PropertyValue";
    NSPredicateTokenType[NSPredicateTokenType["MinorOrEqualComparator"] = 7] = "MinorOrEqualComparator";
    NSPredicateTokenType[NSPredicateTokenType["MinorComparator"] = 8] = "MinorComparator";
    NSPredicateTokenType[NSPredicateTokenType["MajorOrEqualComparator"] = 9] = "MajorOrEqualComparator";
    NSPredicateTokenType[NSPredicateTokenType["MajorComparator"] = 10] = "MajorComparator";
    NSPredicateTokenType[NSPredicateTokenType["EqualComparator"] = 11] = "EqualComparator";
    NSPredicateTokenType[NSPredicateTokenType["DistinctComparator"] = 12] = "DistinctComparator";
    NSPredicateTokenType[NSPredicateTokenType["ContainsComparator"] = 13] = "ContainsComparator";
    NSPredicateTokenType[NSPredicateTokenType["NotContainsComparator"] = 14] = "NotContainsComparator";
    NSPredicateTokenType[NSPredicateTokenType["InComparator"] = 15] = "InComparator";
    NSPredicateTokenType[NSPredicateTokenType["NotIntComparator"] = 16] = "NotIntComparator";
    NSPredicateTokenType[NSPredicateTokenType["BitwiseAND"] = 17] = "BitwiseAND";
    NSPredicateTokenType[NSPredicateTokenType["BitwiseOR"] = 18] = "BitwiseOR";
    NSPredicateTokenType[NSPredicateTokenType["OpenParenthesisSymbol"] = 19] = "OpenParenthesisSymbol";
    NSPredicateTokenType[NSPredicateTokenType["CloseParenthesisSymbol"] = 20] = "CloseParenthesisSymbol";
    NSPredicateTokenType[NSPredicateTokenType["Whitespace"] = 21] = "Whitespace";
    NSPredicateTokenType[NSPredicateTokenType["AND"] = 22] = "AND";
    NSPredicateTokenType[NSPredicateTokenType["OR"] = 23] = "OR";
    NSPredicateTokenType[NSPredicateTokenType["ANY"] = 24] = "ANY";
    NSPredicateTokenType[NSPredicateTokenType["ALL"] = 25] = "ALL";
})(NSPredicateTokenType || (NSPredicateTokenType = {}));
var NSPredicate = /** @class */ (function (_super) {
    __extends(NSPredicate, _super);
    function NSPredicate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.predicateGroup = null;
        _this.lexer = null;
        _this._predicateFormat = null;
        return _this;
    }
    NSPredicate.predicateWithFormat = function (format) {
        var p = new NSPredicate();
        p.initWithFormat(format);
        return p;
    };
    NSPredicate.prototype.initWithFormat = function (format) {
        this._predicateFormat = format;
        this.parse(format);
    };
    Object.defineProperty(NSPredicate.prototype, "predicateFormat", {
        get: function () {
            return this._predicateFormat;
        },
        enumerable: true,
        configurable: true
    });
    NSPredicate.prototype.evaluateObject = function (object) {
        return this.predicateGroup.evaluateObject(object);
    };
    // 
    // Parse format string
    //
    NSPredicate.prototype.tokenizeWithFormat = function (format) {
        this.lexer = new MIOCoreLexer(format);
        // Values
        this.lexer.addTokenType(NSPredicateTokenType.UUIDValue, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
        this.lexer.addTokenType(NSPredicateTokenType.StringValue, /^"([^"]*)"|^'([^']*)'/);
        this.lexer.addTokenType(NSPredicateTokenType.NumberValue, /^-?\d+(?:\.\d+)?(?:e[+\-]?\d+)?/i);
        this.lexer.addTokenType(NSPredicateTokenType.BooleanValue, /^(true|false)/i);
        this.lexer.addTokenType(NSPredicateTokenType.NullValue, /^(null|nil)/i);
        // Symbols
        this.lexer.addTokenType(NSPredicateTokenType.OpenParenthesisSymbol, /^\(/);
        this.lexer.addTokenType(NSPredicateTokenType.CloseParenthesisSymbol, /^\)/);
        // Comparators
        this.lexer.addTokenType(NSPredicateTokenType.MinorOrEqualComparator, /^<=/);
        this.lexer.addTokenType(NSPredicateTokenType.MinorComparator, /^</);
        this.lexer.addTokenType(NSPredicateTokenType.MajorOrEqualComparator, /^>=/);
        this.lexer.addTokenType(NSPredicateTokenType.MajorComparator, /^>/);
        this.lexer.addTokenType(NSPredicateTokenType.EqualComparator, /^==?/);
        this.lexer.addTokenType(NSPredicateTokenType.DistinctComparator, /^!=/);
        this.lexer.addTokenType(NSPredicateTokenType.NotContainsComparator, /^not contains /i);
        this.lexer.addTokenType(NSPredicateTokenType.ContainsComparator, /^contains /i);
        this.lexer.addTokenType(NSPredicateTokenType.InComparator, /^in /i);
        // Bitwise operators
        this.lexer.addTokenType(NSPredicateTokenType.BitwiseAND, /^& /i);
        this.lexer.addTokenType(NSPredicateTokenType.BitwiseOR, /^\| /i);
        // Join operators
        this.lexer.addTokenType(NSPredicateTokenType.AND, /^(and|&&) /i);
        this.lexer.addTokenType(NSPredicateTokenType.OR, /^(or|\|\|) /i);
        // Relationship operators
        this.lexer.addTokenType(NSPredicateTokenType.ANY, /^any /i);
        this.lexer.addTokenType(NSPredicateTokenType.ALL, /^all /i);
        // Extra
        this.lexer.addTokenType(NSPredicateTokenType.Whitespace, /^\s+/);
        this.lexer.ignoreTokenType(NSPredicateTokenType.Whitespace);
        // Identifiers - Has to be the last one
        this.lexer.addTokenType(NSPredicateTokenType.Identifier, /^[a-zA-Z-_][a-zA-Z0-9-_\.]*/);
        this.lexer.tokenize();
    };
    NSPredicate.prototype.parse = function (format) {
        console.log("**** Start predicate format parser");
        console.log(format);
        console.log("****");
        this.tokenizeWithFormat(format);
        this.predicateGroup = new NSPredicateGroup();
        this.predicateGroup.predicates = this.parsePredicates();
        console.log("**** End predicate format parser");
    };
    NSPredicate.prototype.parsePredicates = function () {
        var token = this.lexer.nextToken();
        var predicates = [];
        var exit = false;
        while (token != null && exit == false) {
            switch (token.type) {
                case NSPredicateTokenType.Identifier:
                    var pi = this.nextPredicateItem();
                    predicates.push(pi);
                    break;
                case NSPredicateTokenType.AND:
                    predicates.push(NSPredicateOperator.andPredicateOperatorType());
                    break;
                case NSPredicateTokenType.OR:
                    predicates.push(NSPredicateOperator.orPredicateOperatorType());
                    break;
                case NSPredicateTokenType.ANY:
                    this.lexer.nextToken();
                    var anyPI = this.nextPredicateItem();
                    anyPI.relationshipOperation = NSPredicateRelationshipOperatorType.ANY;
                    predicates.push(anyPI);
                    break;
                case NSPredicateTokenType.ALL:
                    this.lexer.nextToken();
                    var allPI = this.nextPredicateItem();
                    anyPI.relationshipOperation = NSPredicateRelationshipOperatorType.ALL;
                    predicates.push(anyPI);
                    break;
                case NSPredicateTokenType.OpenParenthesisSymbol:
                    var pg = new NSPredicateGroup();
                    pg.predicates = this.parsePredicates();
                    predicates.push(pg);
                    break;
                case NSPredicateTokenType.CloseParenthesisSymbol:
                    exit = true;
                    break;
                default:
                    throw new Error("NSPredicate: Error. Unexpected token. (" + token.value + ")");
            }
            if (exit != true) {
                token = this.lexer.nextToken();
            }
        }
        return predicates;
    };
    NSPredicate.prototype.nextPredicateItem = function () {
        var pi = new NSPredicateItem();
        this.lexer.prevToken();
        this.property(pi);
        this.comparator(pi);
        this.value(pi);
        return pi;
    };
    NSPredicate.prototype.property = function (item) {
        var token = this.lexer.nextToken();
        switch (token.type) {
            case NSPredicateTokenType.Identifier:
                item.key = token.value;
                break;
            default:
                throw new Error("NSPredicate: Error. Unexpected identifier key. (" + token.value + ")");
        }
    };
    NSPredicate.prototype.comparator = function (item) {
        var token = this.lexer.nextToken();
        switch (token.type) {
            case NSPredicateTokenType.EqualComparator:
                item.comparator = NSPredicateComparatorType.Equal;
                break;
            case NSPredicateTokenType.MajorComparator:
                item.comparator = NSPredicateComparatorType.Greater;
                break;
            case NSPredicateTokenType.MajorOrEqualComparator:
                item.comparator = NSPredicateComparatorType.GreaterOrEqual;
                break;
            case NSPredicateTokenType.MinorComparator:
                item.comparator = NSPredicateComparatorType.Less;
                break;
            case NSPredicateTokenType.MinorOrEqualComparator:
                item.comparator = NSPredicateComparatorType.LessOrEqual;
                break;
            case NSPredicateTokenType.DistinctComparator:
                item.comparator = NSPredicateComparatorType.Distinct;
                break;
            case NSPredicateTokenType.ContainsComparator:
                item.comparator = NSPredicateComparatorType.Contains;
                break;
            case NSPredicateTokenType.NotContainsComparator:
                item.comparator = NSPredicateComparatorType.NotContains;
                break;
            case NSPredicateTokenType.InComparator:
                item.comparator = NSPredicateComparatorType.In;
                break;
            case NSPredicateTokenType.BitwiseAND:
                item.bitwiseOperation = NSPredicateBitwiseOperatorType.AND;
                item.bitwiseKey = item.key;
                item.key += " & ";
                token = this.lexer.nextToken();
                item.bitwiseValue = token.value;
                item.key += token.value;
                this.comparator(item);
                break;
            case NSPredicateTokenType.BitwiseOR:
                item.bitwiseOperation = NSPredicateBitwiseOperatorType.OR;
                item.bitwiseKey = item.key;
                item.key += " & ";
                token = this.lexer.nextToken();
                item.bitwiseValue = token.value;
                item.key += token.value;
                this.comparator(item);
                break;
            default:
                throw new Error("NSPredicate: Error. Unexpected comparator. (" + token.value + ")");
        }
    };
    NSPredicate.prototype.value = function (item) {
        var token = this.lexer.nextToken();
        switch (token.type) {
            case NSPredicateTokenType.UUIDValue:
                item.value = token.value;
                item.valueType = NSPredicateItemValueType.UUID;
                break;
            case NSPredicateTokenType.StringValue:
                item.value = token.value.substring(1, token.value.length - 1);
                item.valueType = NSPredicateItemValueType.String;
                break;
            case NSPredicateTokenType.NumberValue:
                item.value = token.value;
                item.valueType = NSPredicateItemValueType.Number;
                break;
            case NSPredicateTokenType.BooleanValue:
                item.value = this.booleanFromString(token.value);
                item.valueType = NSPredicateItemValueType.Boolean;
                break;
            case NSPredicateTokenType.NullValue:
                item.value = this.nullFromString(token.value);
                item.valueType = NSPredicateItemValueType.Null;
                break;
            case NSPredicateTokenType.Identifier:
                item.value = token.value;
                item.valueType = NSPredicateItemValueType.Property;
                break;
            default:
                throw new Error("NSPredicate: Error. Unexpected comparator. (" + token.value + ")");
        }
    };
    NSPredicate.prototype.booleanFromString = function (value) {
        var v = value.toLocaleLowerCase();
        var bv = false;
        switch (v) {
            case "yes":
            case "true":
                bv = true;
                break;
            case "no":
            case "false":
                bv = false;
                break;
            default:
                throw new Error("NSPredicate: Error. Can't convert '" + value + "' to boolean");
        }
        return bv;
    };
    NSPredicate.prototype.nullFromString = function (value) {
        var v = value.toLocaleLowerCase();
        var nv = null;
        switch (v) {
            case "nil":
            case "null":
                nv = null;
                break;
            default:
                throw new Error("NSPredicate: Error. Can't convert '" + value + "' to null");
        }
        return nv;
    };
    return NSPredicate;
}(NSObject));
 
//
// For internal purposes: Don't use it, could change
//
function _NSPredicateFilterObjects(objs, predicate) {
    if (objs == null)
        return [];
    var resultObjects = null;
    if (objs.length == 0 || predicate == null) {
        resultObjects = objs.slice(0);
    }
    else {
        resultObjects = objs.filter(function (obj) {
            var result = predicate.evaluateObject(obj);
            if (result)
                return obj;
        });
    }
    return resultObjects;
}
 
var NSSet = /** @class */ (function (_super) {
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
        var objs = _NSPredicateFilterObjects(this._objects, predicate);
        return objs;
    };
    // Prevent KVO on special properties
    NSSet.prototype.addObserver = function (obs, keypath, context) {
        if (keypath == "count" || keypath == "length")
            throw new Error("NSSet: Can't observe count. It's not KVO Compilant");
        _super.prototype.addObserver.call(this, obs, keypath, context);
    };
    return NSSet;
}(NSObject));
 
function NSIndexPathEqual(indexPath1, indexPath2) {
    //TODO: CHECK REAL INDEX PATH
    if (indexPath1 == null || indexPath2 == null)
        return false;
    if (indexPath1.section == indexPath2.section
        && indexPath1.row == indexPath2.row) {
        return true;
    }
    return false;
}
 
var NSIndexPath = /** @class */ (function (_super) {
    __extends(NSIndexPath, _super);
    function NSIndexPath() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.indexes = [];
        return _this;
    }
    NSIndexPath.indexForRowInSection = function (row, section) {
        var ip = new NSIndexPath();
        ip.add(section);
        ip.add(row);
        return ip;
    };
    NSIndexPath.indexForColumnInRowAndSection = function (column, row, section) {
        var ip = NSIndexPath.indexForRowInSection(row, section);
        ip.add(column);
        return ip;
    };
    NSIndexPath.prototype.add = function (value) {
        this.indexes.push(value);
    };
    Object.defineProperty(NSIndexPath.prototype, "section", {
        get: function () {
            return this.indexes[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSIndexPath.prototype, "row", {
        get: function () {
            return this.indexes[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSIndexPath.prototype, "item", {
        get: function () {
            return this.indexes[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSIndexPath.prototype, "column", {
        get: function () {
            return this.indexes[2];
        },
        enumerable: true,
        configurable: true
    });
    NSIndexPath.prototype.isEqualToIndexPath = function (indexPath) {
        return NSIndexPathEqual(this, indexPath);
    };
    return NSIndexPath;
}(NSObject));
 
/**
 * Created by godshadow on 30/3/16.
 */
var _NS_currentLocale;
var NSLocale = /** @class */ (function (_super) {
    __extends(NSLocale, _super);
    function NSLocale() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.languageIdentifier = "es";
        _this.countryIdentifier = "ES";
        return _this;
    }
    NSLocale.currentLocale = function () {
        if (_NS_currentLocale == null) {
            _NS_currentLocale = new NSLocale();
            _NS_currentLocale.initWithLocaleIdentifier("es_ES");
        }
        //return NSWebApplication.sharedInstance().currentLanguage;
        return _NS_currentLocale;
    };
    NSLocale._setCurrentLocale = function (localeIdentifier) {
        _NS_currentLocale = new NSLocale();
        _NS_currentLocale.initWithLocaleIdentifier(localeIdentifier);
    };
    NSLocale.prototype.initWithLocaleIdentifier = function (identifer) {
        var array = identifer.split("_");
        if (array.length == 1) {
            this.languageIdentifier = array[0];
        }
        else if (array.length == 2) {
            this.languageIdentifier = array[0];
            this.countryIdentifier = array[1];
        }
    };
    Object.defineProperty(NSLocale.prototype, "decimalSeparator", {
        get: function () {
            var ds = "";
            switch (this.countryIdentifier) {
                case "ES":
                    ds = ",";
                    break;
                case "US":
                    ds = ".";
                    break;
                case "UK":
                    ds = ".";
                    break;
                case "AE":
                    ds = ".";
                    break;
            }
            return ds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSLocale.prototype, "currencySymbol", {
        get: function () {
            var cs = "";
            switch (this.countryIdentifier) {
                case "ES":
                case "DE":
                case "FR":
                case "IT":
                case "NL":
                    cs = "€";
                    break;
                case "US":
                    cs = "$";
                    break;
                case "UK":
                    cs = "£";
                    break;
            }
            return cs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSLocale.prototype, "currencyCode", {
        get: function () {
            var cc = "";
            switch (this.countryIdentifier) {
                case "ES":
                case "DE":
                case "FR":
                case "IT":
                case "NL":
                    cc = "EUR";
                    break;
                case "US":
                    cc = "USD";
                    break;
                case "UK":
                    cc = "GBP";
                    break;
                case "AE":
                    cc = "AED";
            }
            return cc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSLocale.prototype, "groupingSeparator", {
        get: function () {
            var gs = "";
            switch (this.countryIdentifier) {
                case "ES":
                    gs = ".";
                    break;
                case "US":
                    gs = ",";
                    break;
                case "UK":
                    gs = ",";
                    break;
                case "AE":
                    gs = ",";
                    break;
            }
            return gs;
        },
        enumerable: true,
        configurable: true
    });
    return NSLocale;
}(NSObject));
 
var NSFormatter = /** @class */ (function (_super) {
    __extends(NSFormatter, _super);
    function NSFormatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NSFormatter.prototype.stringForObjectValue = function (value) {
        return value;
    };
    NSFormatter.prototype.getObjectValueForString = function (str) {
    };
    NSFormatter.prototype.editingStringForObjectValue = function (value) {
    };
    NSFormatter.prototype.isPartialStringValid = function (str) {
        var newStr = "";
        return [false, newStr];
    };
    return NSFormatter;
}(NSObject));
 
var NSDateFormatterStyle;
(function (NSDateFormatterStyle) {
    NSDateFormatterStyle[NSDateFormatterStyle["NoStyle"] = 0] = "NoStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["ShortStyle"] = 1] = "ShortStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["MediumStyle"] = 2] = "MediumStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["LongStyle"] = 3] = "LongStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["FullStyle"] = 4] = "FullStyle";
})(NSDateFormatterStyle || (NSDateFormatterStyle = {}));
var NSDateFormatter = /** @class */ (function (_super) {
    __extends(NSDateFormatter, _super);
    function NSDateFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateStyle = NSDateFormatterStyle.ShortStyle;
        _this.timeStyle = NSDateFormatterStyle.ShortStyle;
        _this.browserDateSeparatorSymbol = null;
        return _this;
    }
    NSDateFormatter.prototype.init = function () {
        _super.prototype.init.call(this);
        var browser = MIOCoreGetPlatform();
        if (browser == MIOCorePlatformType.Safari)
            this.browserDateSeparatorSymbol = "/";
        else
            this.browserDateSeparatorSymbol = "-";
    };
    NSDateFormatter.prototype.dateFromString = function (str) {
        var _a;
        var result, value, dateString;
        if (!str || str.length <= 0)
            return null;
        _a = this._parse(str), result = _a[0], value = _a[1], dateString = _a[2];
        if (result == true) {
            var date = Date.parse(dateString);
            return isNaN(date) == false ? new Date(dateString) : null;
        }
        return null;
    };
    NSDateFormatter.prototype.stringFromDate = function (date) {
        return this.stringForObjectValue(date);
    };
    NSDateFormatter.prototype.stringForObjectValue = function (value) {
        var date = value;
        if (date == null)
            return null;
        var str = "";
        switch (this.dateStyle) {
            case NSDateFormatterStyle.ShortStyle:
                str = this._shortDateStyle(date);
                break;
            case NSDateFormatterStyle.FullStyle:
                str = this._fullDateStyle(date);
                break;
        }
        if (this.dateStyle != NSDateFormatterStyle.NoStyle && this.timeStyle != NSDateFormatterStyle.NoStyle)
            str += " ";
        switch (this.timeStyle) {
            case NSDateFormatterStyle.ShortStyle:
                str += this._shortTimeStyle(date);
                break;
        }
        return str;
    };
    NSDateFormatter.prototype.isPartialStringValid = function (str) {
        var _a;
        if (str.length == 0)
            return [true, str];
        var result, newStr;
        _a = this._parse(str), result = _a[0], newStr = _a[1];
        return [result, newStr];
    };
    NSDateFormatter.prototype._parse = function (str) {
        var _a, _b;
        var result, newStr, value, offset;
        var dateString = "";
        if (this.dateStyle != NSDateFormatterStyle.NoStyle) {
            _a = this._parseDate(str), result = _a[0], newStr = _a[1], value = _a[2], offset = _a[3];
            if (result == false)
                return [result, newStr, value];
            dateString = value;
        }
        else {
            var today = new Date();
            dateString = this.iso8601DateStyle(today);
        }
        if (this.timeStyle != NSDateFormatterStyle.NoStyle) {
            var timeString = str;
            if (offset > 0)
                timeString = str.substr(offset, str.length - offset);
            _b = this._parseTime(timeString), result = _b[0], newStr = _b[1], value = _b[2];
            if (result == false) {
                return [result, newStr, value];
            }
            dateString += " " + value;
        }
        return [result, newStr, dateString];
    };
    NSDateFormatter.prototype._parseDate = function (str) {
        var _a, _b, _c;
        var chIndex = 0;
        var parseString = "";
        var step = 0;
        var dd = "";
        var mm = "";
        var yy = "";
        // Check dd-mm-yy or dd-mm-yyyy
        for (var index = 0; index < str.length; index++) {
            var ch = str[index];
            chIndex++;
            if (ch == "-" || ch == "." || ch == "/") {
                // Next step
                if (parseString.length == 0)
                    return [false, parseString, "", chIndex];
                parseString += "/";
                step++;
            }
            else if (ch == " ") {
                break;
            }
            else {
                var r = void 0, value = void 0;
                switch (step) {
                    case 0: //dd
                        _a = this._parseDay(ch, dd), r = _a[0], dd = _a[1];
                        break;
                    case 1: // mm                        
                        _b = this._parseMonth(ch, mm), r = _b[0], mm = _b[1];
                        break;
                    case 2: // yy or yyyy
                        _c = this._parseYear(ch, yy), r = _c[0], yy = _c[1];
                        break;
                }
                if (r == true)
                    parseString += ch;
                else
                    return [false, parseString, "", chIndex];
            }
        }
        var result = true;
        if (dd.length > 0)
            result = result && this._validateDay(dd);
        if (mm.length > 0)
            result = result && this._validateMonth(mm);
        if (yy.length > 0)
            result = result && this._validateYear(yy);
        if (result == false)
            return [false, parseString, null, chIndex];
        var dateString = (yy[3] ? yy : ("20" + yy)) + this.browserDateSeparatorSymbol + (mm[1] ? mm : "0" + mm) + this.browserDateSeparatorSymbol + (dd[1] ? dd : "0" + dd);
        return [true, parseString, dateString, chIndex];
    };
    NSDateFormatter.prototype._parseDay = function (ch, dd) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, dd];
        var v = parseInt(dd + ch);
        return [true, dd + ch];
    };
    NSDateFormatter.prototype._validateDay = function (dd) {
        var v = parseInt(dd);
        if (isNaN(v))
            return false;
        if (dd < 1 || dd > 31)
            return false;
        return true;
    };
    NSDateFormatter.prototype._parseMonth = function (ch, mm) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, mm];
        var v = parseInt(mm + ch);
        return [true, mm + ch];
    };
    NSDateFormatter.prototype._validateMonth = function (mm) {
        var v = parseInt(mm);
        if (isNaN(v))
            return false;
        if (v < 1 || v > 12)
            return false;
        return true;
    };
    NSDateFormatter.prototype._parseYear = function (ch, yy) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, yy];
        var v = parseInt(yy + ch);
        return [true, yy + ch];
    };
    NSDateFormatter.prototype._validateYear = function (yy) {
        var v = parseInt(yy);
        if (isNaN(yy) == true)
            return false;
        if (v > 3000)
            return false;
        return true;
    };
    NSDateFormatter.prototype.iso8601DateStyle = function (date) {
        var dd = date.getDate().toString();
        var mm = (date.getMonth() + 1).toString();
        var yy = date.getFullYear().toString();
        return yy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
    };
    NSDateFormatter.prototype._shortDateStyle = function (date, separatorString) {
        var separator = separatorString ? separatorString : "/";
        var d = date.getDate().toString();
        var m = (date.getMonth() + 1).toString();
        var y = date.getFullYear().toString();
        return (d[1] ? d : 0 + d) + separator + (m[1] ? m : "0" + m) + separator + y;
    };
    NSDateFormatter.prototype._fullDateStyle = function (date) {
        var day = _NSDateFormatterStringDays[date.getDay()];
        var month = _NSDateFormatterStringMonths[date.getMonth()];
        return day + ", " + month + " " + date.getDate() + ", " + date.getFullYear();
    };
    NSDateFormatter.prototype._parseTime = function (str) {
        var _a, _b, _c;
        var parseString = "";
        var step = 0;
        var hh = "";
        var mm = "";
        var ss = "";
        // Check dd-mm-yy or dd-mm-yyyy
        for (var index = 0; index < str.length; index++) {
            var ch = str[index];
            if (ch == ":" || ch == ".") {
                // Next step
                if (parseString.length == 0)
                    return [false, parseString, ""];
                parseString += ":";
                step++;
            }
            else {
                var result = void 0, value = void 0;
                switch (step) {
                    case 0: //hh
                        _a = this._parseHour(ch, hh), result = _a[0], hh = _a[1];
                        break;
                    case 1: // mm
                        _b = this._parseMinute(ch, mm), result = _b[0], mm = _b[1];
                        break;
                    case 2: // ss
                        _c = this._parseSecond(ch, ss), result = _c[0], ss = _c[1];
                        break;
                }
                if (result == true)
                    parseString += ch;
                else
                    return [false, parseString, ""];
            }
        }
        var hourString = (hh[1] ? hh : ("0" + hh));
        if (mm.length > 0)
            hourString += ":" + (mm[1] ? mm : ("0" + mm));
        else
            hourString += ":00";
        if (ss.length > 0)
            hourString += ":" + (ss[1] ? ss : ("0" + ss));
        else
            hourString += ":00";
        return [true, parseString, hourString];
    };
    NSDateFormatter.prototype._parseHour = function (ch, hh) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, hh];
        var v = parseInt(hh + ch);
        if (v < 0 || v > 23)
            return [false, hh];
        return [true, hh + ch];
    };
    NSDateFormatter.prototype._parseMinute = function (ch, mm) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, mm];
        var v = parseInt(mm + ch);
        if (v < 0 || v > 59)
            return [false, mm];
        return [true, mm + ch];
    };
    NSDateFormatter.prototype._parseSecond = function (ch, ss) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, ss];
        var v = parseInt(ss + ch);
        if (v < 0 || v > 59)
            return [false, ss];
        return [true, ss + ch];
    };
    NSDateFormatter.prototype.iso8601TimeStyle = function (date) {
        var hh = date.getHours().toString();
        var mm = date.getMinutes().toString();
        var ss = date.getSeconds().toString();
        return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);
    };
    NSDateFormatter.prototype._shortTimeStyle = function (date) {
        var h = date.getHours().toString();
        var m = date.getMinutes().toString();
        return (h[1] ? h : "0" + h) + ":" + (m[1] ? m : "0" + m);
    };
    return NSDateFormatter;
}(NSFormatter));
 
var _NSDateFormatterStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var _NSDateFormatterStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var NSISO8601DateFormatter = /** @class */ (function (_super) {
    __extends(NSISO8601DateFormatter, _super);
    function NSISO8601DateFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeZone = null;
        return _this;
    }
    NSISO8601DateFormatter.iso8601DateFormatter = function () {
        var df = new NSISO8601DateFormatter();
        df.init();
        return df;
    };
    NSISO8601DateFormatter.prototype.dateFromString = function (str) {
        if (str == null)
            return null;
        var dateString = null;
        if (MIOCoreGetPlatform() == MIOCorePlatformType.Safari) {
            dateString = str.split('-').join("/");
            if (dateString.length > 19)
                dateString = dateString.substr(0, 19);
        }
        else
            dateString = str;
        var timestamp = Date.parse(dateString);
        var d = null;
        if (isNaN(timestamp) == false) {
            d = new Date(dateString);
        }
        else {
            console.log("DATE FORMATTER: Error, invalid date");
        }
        return d;
    };
    NSISO8601DateFormatter.prototype.stringFromDate = function (date) {
        var str = "";
        if (date == null)
            return null;
        if (this.dateStyle != NSDateFormatterStyle.NoStyle) {
            str += this.iso8601DateStyle(date);
        }
        if (this.timeStyle != NSDateFormatterStyle.NoStyle) {
            if (str.length > 0)
                str += " ";
            str += this.iso8601TimeStyle(date);
        }
        return str;
    };
    return NSISO8601DateFormatter;
}(NSDateFormatter));
 
var NSNumberFormatterStyle;
(function (NSNumberFormatterStyle) {
    NSNumberFormatterStyle[NSNumberFormatterStyle["NoStyle"] = 0] = "NoStyle";
    NSNumberFormatterStyle[NSNumberFormatterStyle["DecimalStyle"] = 1] = "DecimalStyle";
    NSNumberFormatterStyle[NSNumberFormatterStyle["CurrencyStyle"] = 2] = "CurrencyStyle";
    NSNumberFormatterStyle[NSNumberFormatterStyle["CurrencyISOCodeStyle"] = 3] = "CurrencyISOCodeStyle";
    NSNumberFormatterStyle[NSNumberFormatterStyle["PercentStyle"] = 4] = "PercentStyle";
})(NSNumberFormatterStyle || (NSNumberFormatterStyle = {}));
var _NSNumberFormatterType;
(function (_NSNumberFormatterType) {
    _NSNumberFormatterType[_NSNumberFormatterType["Int"] = 0] = "Int";
    _NSNumberFormatterType[_NSNumberFormatterType["Decimal"] = 1] = "Decimal";
})(_NSNumberFormatterType || (_NSNumberFormatterType = {}));
var NSNumberFormatter = /** @class */ (function (_super) {
    __extends(NSNumberFormatter, _super);
    function NSNumberFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberStyle = NSNumberFormatterStyle.NoStyle;
        _this.locale = null;
        _this.minimumFractionDigits = 0;
        _this.maximumFractionDigits = 0;
        _this.groupingSeparator = null;
        _this.currencySymbol = null;
        _this.currencyCode = null;
        _this.currencyHasSpaces = true;
        _this.currencyIsRight = true;
        return _this;
    }
    NSNumberFormatter.prototype.init = function () {
        _super.prototype.init.call(this);
        this.locale = NSLocale.currentLocale();
        this.groupingSeparator = this.locale.groupingSeparator;
        this.currencySymbol = this.locale.currencySymbol;
        this.currencyCode = this.locale.currencyCode;
        switch (this.locale.countryIdentifier) {
            case "US":
                this.currencyHasSpaces = false;
                this.currencyIsRight = false;
                break;
        }
    };
    NSNumberFormatter.prototype.numberFromString = function (str) {
        var _a;
        if (str === null)
            return null;
        var result, parseString, numberString, type;
        _a = this._parse(str), result = _a[0], parseString = _a[1], numberString = _a[2], type = _a[3];
        if (result == true) {
            var value = null;
            if (type == _NSNumberFormatterType.Int) {
                value = parseInt(numberString);
            }
            else if (type == _NSNumberFormatterType.Decimal) {
                value = parseFloat(numberString);
            }
            return isNaN(value) ? null : value;
        }
        return null;
    };
    NSNumberFormatter.prototype.stringFromNumber = function (number) {
        return this.stringForObjectValue(number);
    };
    NSNumberFormatter.prototype.stringForObjectValue = function (value) {
        var _a;
        var number = value;
        if (!number)
            number = 0;
        var str = number.toString();
        var intValue = null;
        var floatValue = null;
        var array = str.split(".");
        if (array.length == 1) {
            // Only int
            intValue = array[0];
        }
        else if (array.length == 2) {
            intValue = array[0];
            floatValue = array[1];
        }
        // Check the round rules
        if (floatValue != null) {
            _a = this.round(intValue, floatValue), intValue = _a[0], floatValue = _a[1];
        }
        var res = "";
        var minusOffset = intValue.charAt(0) == "-" ? 1 : 0;
        if (intValue.length > (3 + minusOffset)) {
            var offset = Math.floor((intValue.length - minusOffset) / 3);
            if (((intValue.length - minusOffset) % 3) == 0)
                offset--;
            var posArray = [];
            var intLen = intValue.length;
            for (var index = offset; index > 0; index--) {
                posArray.push(intLen - (index * 3));
            }
            var posArrayIndex = 0;
            var groupPos = posArray[0];
            for (var index = 0; index < intLen; index++) {
                if (index == groupPos) {
                    res += this.groupingSeparator;
                    posArrayIndex++;
                    groupPos = posArrayIndex < posArray.length ? posArray[posArrayIndex] : -1;
                }
                var ch = intValue[index];
                res += ch;
            }
        }
        else {
            res = intValue;
        }
        if (this.minimumFractionDigits > 0 && floatValue == null)
            floatValue = "";
        if (floatValue != null) {
            res += this.locale.decimalSeparator;
            if (this.minimumFractionDigits > 0 && floatValue.length < this.minimumFractionDigits) {
                for (var index = 0; index < this.minimumFractionDigits; index++) {
                    if (index < floatValue.length)
                        res += floatValue[index];
                    else
                        res += "0";
                }
            }
            else {
                res += floatValue;
            }
        }
        if (this.numberStyle == NSNumberFormatterStyle.PercentStyle)
            res += "%";
        res = this.stringByAppendingCurrencyString(res);
        return res;
    };
    NSNumberFormatter.prototype.round = function (intValue, floatValue) {
        if (floatValue.length <= this.maximumFractionDigits)
            return [intValue, floatValue];
        // Check float first        
        var roundedFloat = "";
        var d = parseInt(floatValue.substr(this.maximumFractionDigits, 1));
        var inc = d < 5 ? 0 : 1;
        for (var index = this.maximumFractionDigits - 1; index >= 0; index--) {
            if (inc == 0) {
                roundedFloat = floatValue.substring(0, index + 1) + roundedFloat;
                break;
            }
            var digit = parseInt(floatValue.substr(index, 1));
            if (digit == 9) {
                inc = 1;
                roundedFloat = "0" + roundedFloat;
            }
            else {
                inc = 0;
                var newDigit = digit + 1;
                roundedFloat = newDigit + roundedFloat;
            }
        }
        // Removes Zeros
        var removeIndex = null;
        for (var index = roundedFloat.length - 1; index >= this.minimumFractionDigits; index--) {
            var digit = roundedFloat.substr(index, 1);
            if (digit != "0")
                break;
            removeIndex = index;
        }
        if (removeIndex != null)
            roundedFloat = roundedFloat.substring(0, removeIndex);
        if (inc == 0)
            return [intValue, roundedFloat];
        var roundedInt = "";
        for (var index = intValue.length - 1; index >= 0; index--) {
            var digit = parseInt(intValue.substr(index, 1));
            var newDigit = digit + inc;
            if (newDigit == 10) {
                inc = 1;
                roundedInt = "0" + roundedInt;
            }
            else {
                inc = 0;
                roundedInt = intValue.substring(0, index) + newDigit.toString() + roundedInt;
                break;
            }
        }
        return [roundedInt, roundedFloat];
    };
    NSNumberFormatter.prototype.stringByAppendingCurrencyString = function (text) {
        var currency = "";
        if (this.numberStyle == NSNumberFormatterStyle.CurrencyStyle) {
            currency = this.currencySymbol;
            if (currency.length == 0)
                currency = this.currencyCode; // If there's no symbol, add the code instead.
        }
        else if (this.numberStyle == NSNumberFormatterStyle.CurrencyISOCodeStyle)
            currency = this.currencyCode;
        else {
            return text;
        }
        if (currency.length == 0)
            return text;
        var result = "";
        if (this.currencyIsRight == true) {
            result = text + (this.currencyHasSpaces ? " " : "") + currency;
        }
        else {
            result = currency + (this.currencyHasSpaces ? " " : "") + text;
        }
        return result;
    };
    NSNumberFormatter.prototype.isPartialStringValid = function (str) {
        var _a;
        if (str.length == 0)
            return [true, str];
        var result, newStr;
        _a = this._parse(str), result = _a[0], newStr = _a[1];
        return [result, newStr];
    };
    NSNumberFormatter.prototype._parse = function (str) {
        var number = 0;
        var parseString = "";
        var numberString = "";
        var type = _NSNumberFormatterType.Int;
        var minusSymbol = false;
        var percentSymbol = false;
        for (var index = 0; index < str.length; index++) {
            var ch = str[index];
            if (ch == this.locale.decimalSeparator && type != _NSNumberFormatterType.Decimal) {
                parseString += ch;
                numberString += ".";
                type = _NSNumberFormatterType.Decimal;
            }
            else if (ch == "-" && minusSymbol == false) {
                parseString += ch;
                numberString += ch;
                minusSymbol = true;
            }
            else if (ch == "%"
                && this.numberStyle == NSNumberFormatterStyle.PercentStyle
                && percentSymbol == false) {
                percentSymbol = true;
                parseString += ch;
            }
            else if (ch == " ") {
                continue;
            }
            else if (!isNaN(parseInt(ch))) {
                parseString += ch;
                numberString += ch;
            }
            else
                return [(parseString.length > 0 ? true : false), parseString, numberString, type];
        }
        return [true, parseString, numberString, type];
    };
    return NSNumberFormatter;
}(NSFormatter));
 
/**
 * Created by godshadow on 21/3/16.
 */
var NSTimer = /** @class */ (function (_super) {
    __extends(NSTimer, _super);
    function NSTimer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timerInterval = 0;
        _this._repeat = false;
        _this._target = null;
        _this._completion = null;
        _this._coreTimer = null;
        return _this;
    }
    NSTimer.scheduledTimerWithTimeInterval = function (timeInterval, repeat, target, completion) {
        var timer = new NSTimer();
        timer.initWithTimeInterval(timeInterval, repeat, target, completion);
        timer.fire();
        return timer;
    };
    NSTimer.prototype.initWithTimeInterval = function (timeInterval, repeat, target, completion) {
        this._timerInterval = timeInterval;
        this._repeat = repeat;
        this._target = target;
        this._completion = completion;
    };
    NSTimer.prototype.fire = function () {
        var instance = this;
        if (this._repeat) {
            this._coreTimer = setInterval(function () {
                instance._timerCallback.call(instance);
            }, this._timerInterval);
        }
        else {
            this._coreTimer = setTimeout(function () {
                instance._timerCallback.call(instance);
            }, this._timerInterval);
        }
    };
    NSTimer.prototype.invalidate = function () {
        if (this._repeat)
            clearInterval(this._coreTimer);
        else
            clearTimeout(this._coreTimer);
    };
    NSTimer.prototype._timerCallback = function () {
        if (this._target != null && this._completion != null)
            this._completion.call(this._target, this);
        if (this._repeat == true)
            this.invalidate();
    };
    return NSTimer;
}(NSObject));
 
/**
 * Created by godshadow on 11/3/16.
 */
var NSNotification = /** @class */ (function () {
    function NSNotification(name, object, userInfo) {
        this.name = null;
        this.object = null;
        this.userInfo = null;
        this.name = name;
        this.object = object;
        this.userInfo = userInfo;
    }
    return NSNotification;
}());
 
var NSNotificationCenter = /** @class */ (function () {
    function NSNotificationCenter() {
        this.notificationNames = {};
        if (NSNotificationCenter._sharedInstance) {
            throw new Error("Error: Instantiation failed: Use defaultCenter() instead of new.");
        }
        NSNotificationCenter._sharedInstance = this;
    }
    NSNotificationCenter.defaultCenter = function () {
        return NSNotificationCenter._sharedInstance;
    };
    NSNotificationCenter.prototype.addObserver = function (obs, name, fn) {
        var notes = this.notificationNames[name];
        if (notes == null) {
            notes = [];
        }
        var item = { "observer": obs, "function": fn };
        notes.push(item);
        this.notificationNames[name] = notes;
    };
    ;
    NSNotificationCenter.prototype.removeObserver = function (obs, name) {
        var notes = this.notificationNames[name];
        if (notes == null)
            return;
        var index = -1;
        for (var count = 0; count < notes.length; count++) {
            var item = notes[count];
            var obsAux = item["observer"];
            if (obsAux === obs) {
                index = count;
                break;
            }
        }
        if (index > -1) {
            notes.splice(index, 1);
        }
    };
    NSNotificationCenter.prototype.postNotification = function (name, object, userInfo) {
        var notes = this.notificationNames[name];
        if (notes == null)
            return;
        var n = new NSNotification(name, object, userInfo);
        for (var count = 0; count < notes.length; count++) {
            var item = notes[count];
            var obs = item["observer"];
            var fn = item["function"];
            fn.call(obs, n);
        }
    };
    NSNotificationCenter._sharedInstance = new NSNotificationCenter();
    return NSNotificationCenter;
}());
 
/**
 * Created by godshadow on 29/09/2016.
 */
var NSUserDefaults = /** @class */ (function () {
    function NSUserDefaults() {
        if (NSUserDefaults._sharedInstance) {
            throw new Error("Error: Instantiation failed: Use standardUserDefaults() instead of new.");
        }
        NSUserDefaults._sharedInstance = this;
    }
    NSUserDefaults.standardUserDefaults = function () {
        return NSUserDefaults._sharedInstance;
    };
    NSUserDefaults.prototype.setBooleanForKey = function (key, value) {
        var v = value ? "1" : "0";
        this.setValueForKey(key, v);
    };
    NSUserDefaults.prototype.booleanForKey = function (key) {
        var v = this.valueForKey(key);
        return v == "1" ? true : false;
    };
    NSUserDefaults.prototype.setValueForKey = function (key, value) {
        localStorage.setItem(key, value);
    };
    NSUserDefaults.prototype.valueForKey = function (key) {
        return localStorage.getItem(key);
    };
    NSUserDefaults.prototype.removeValueForKey = function (key) {
        localStorage.removeItem(key);
    };
    NSUserDefaults._sharedInstance = new NSUserDefaults();
    return NSUserDefaults;
}());
 
var NSURLTokenType;
(function (NSURLTokenType) {
    NSURLTokenType[NSURLTokenType["Protocol"] = 0] = "Protocol";
    NSURLTokenType[NSURLTokenType["Host"] = 1] = "Host";
    NSURLTokenType[NSURLTokenType["Path"] = 2] = "Path";
    NSURLTokenType[NSURLTokenType["Param"] = 3] = "Param";
    NSURLTokenType[NSURLTokenType["Value"] = 4] = "Value";
})(NSURLTokenType || (NSURLTokenType = {}));
var NSURL = /** @class */ (function (_super) {
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
                    index += 2; //Igonring the double slash // from the protocol (http://)
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
}(NSObject));
 
var NSURLRequest = /** @class */ (function (_super) {
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
}(NSObject));
 
/**
 * Created by godshadow on 14/3/16.
 */
var NSURLConnection = /** @class */ (function () {
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
        _http_request(this, this.request.url.absoluteString, this.request.headers, this.request.httpMethod, this.request.httpBody, this.request.binary, this.delegate, this.blockTarget, this.blockFN, this.request.download);
    };
    return NSURLConnection;
}());
 
function _http_request(instance, urlString, headers, method, body, binary, delegate, target, completion, download) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        var body = this.responseText;
        if (this.status < 300 && body != null) {
            // Success!
            if (delegate != null) {
                delegate.connectionDidReceiveText(instance, body);
            }
            else if (target != null) {
                completion.call(target, this.status, body);
            }
        }
        else {
            // something went wrong
            if (delegate != null) {
                delegate.connectionDidFail(instance);
            }
            else if (target != null) {
                completion.call(target, this.status, body);
            }
        }
    };
    xhr.open(method, urlString);
    // Add headers
    for (var count = 0; count < headers.length; count++) {
        var item = headers[count];
        xhr.setRequestHeader(item["Field"], item["Value"]);
    }
    if (binary == true) {
        xhr.responseType = "arraybuffer";
    }
    if (method == "GET" || body == null) {
        xhr.send();
    }
    else {
        xhr.send(body);
    }
}
function _http_request_sync(urlString, headers, method, body, binary) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, urlString, false);
    // Add headers
    for (var count = 0; count < headers.length; count++) {
        var item = headers[count];
        xhr.setRequestHeader(item["Field"], item["Value"]);
    }
    if (binary == true) {
        xhr.responseType = "arraybuffer";
    }
    if (method == "GET" || body == null) {
        xhr.send();
    }
    else {
        xhr.send(body);
    }
    return xhr.responseText;
}
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
})(NSXMLTokenType || (NSXMLTokenType = {}));
var NSXMLParser = /** @class */ (function (_super) {
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
    // LEXER / TOKENIZER
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
    //
    // Parser
    //
    NSXMLParser.prototype.parse = function () {
        //console.log("**** Start parser")
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
        //console.log("**** End parser")
        if (typeof this.delegate.parserDidEndDocument === "function")
            this.delegate.parserDidEndDocument(this);
    };
    NSXMLParser.prototype.openTag = function () {
        //console.log("Open Tag");
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
        //console.log("Question mark");
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
        //console.log("XML open tag");
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
        //console.log("XML close tag");
    };
    NSXMLParser.prototype.beginElement = function (value) {
        //console.log("Begin Element: " + value);
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
        //console.log("End Element: " + value);
        var _a;
        //this.elements.push(value);
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
        //console.log("Attribute: " + attr);
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
        //console.log("Close Tag");
    };
    NSXMLParser.prototype.didStartElement = function () {
        var element = this.currentElement;
        //console.log("Start Element: " + element);
        if (typeof this.delegate.parserDidStartElement === "function")
            this.delegate.parserDidStartElement(this, element, this.attributes);
        this.currentElement = null;
        this.attributes = {};
    };
    NSXMLParser.prototype.didEndElement = function () {
        var element = this.elements.pop();
        //console.log("End Element " + element);        
        if (typeof this.delegate.parserDidEndElement === "function")
            this.delegate.parserDidEndElement(this, element);
    };
    NSXMLParser.prototype.text = function (value) {
        //console.log("Text: " + value);
        if (typeof this.delegate.parserFoundCharacters === "function")
            this.delegate.parserFoundCharacters(this, value);
    };
    NSXMLParser.prototype.comments = function (comment) {
        if (typeof this.delegate.parserFoundComment === "function")
            this.delegate.parserFoundComment(this, comment);
    };
    NSXMLParser.prototype.error = function (expected) {
        NSLog("Error: Unexpected token. " + expected);
    };
    return NSXMLParser;
}(NSObject));
 
var NSOperation = /** @class */ (function (_super) {
    __extends(NSOperation, _super);
    function NSOperation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = null;
        _this.target = null;
        _this.completion = null;
        _this._dependencies = [];
        _this._isExecuting = false;
        _this._isFinished = false;
        _this._ready = true;
        return _this;
    }
    Object.defineProperty(NSOperation.prototype, "dependencies", {
        get: function () { return this._dependencies; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSOperation.prototype, "isExecuting", {
        get: function () { return this.executing(); },
        enumerable: true,
        configurable: true
    });
    NSOperation.prototype.setExecuting = function (value) {
        if (value == this._isExecuting)
            return;
        this.willChangeValue("isExecuting");
        this._isExecuting = value;
        this.didChangeValue("isExecuting");
    };
    Object.defineProperty(NSOperation.prototype, "isFinished", {
        get: function () { return this.finished(); },
        enumerable: true,
        configurable: true
    });
    NSOperation.prototype.setFinished = function (value) {
        if (value == this._isFinished)
            return;
        this.willChangeValue("isFinished");
        this._isFinished = value;
        this.didChangeValue("isFinished");
    };
    NSOperation.prototype.setReady = function (value) {
        if (value == this._ready)
            return;
        this.willChangeValue("ready");
        this._ready = value;
        this.didChangeValue("ready");
    };
    Object.defineProperty(NSOperation.prototype, "ready", {
        get: function () {
            return this._ready;
        },
        enumerable: true,
        configurable: true
    });
    NSOperation.prototype.addDependency = function (operation) {
        this._dependencies.push(operation);
        if (operation.isFinished == false) {
            operation.addObserver(this, "isFinished");
            this.setReady(false);
        }
    };
    // Non concurrent task
    NSOperation.prototype.main = function () { };
    // Concurrent task
    NSOperation.prototype.start = function () {
        this.setExecuting(true);
        this.main();
        this.setExecuting(false);
        this.setFinished(true);
    };
    NSOperation.prototype.executing = function () {
        return this._isExecuting;
    };
    NSOperation.prototype.finished = function () {
        return this._isFinished;
    };
    NSOperation.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
        if (type != "did")
            return;
        if (keyPath == "isFinished") {
            var op = object;
            if (op.isFinished == true) {
                object.removeObserver(this, "isFinished");
                this.checkDependecies();
            }
        }
    };
    NSOperation.prototype.checkDependecies = function () {
        for (var index = 0; index < this._dependencies.length; index++) {
            var op = this._dependencies[index];
            if (op.isFinished == false)
                return;
        }
        // So if we are in this point, means every dependecy is finished
        // and we can start our own task
        this.setReady(true);
    };
    return NSOperation;
}(NSObject));
 
var NSBlockOperation = /** @class */ (function (_super) {
    __extends(NSBlockOperation, _super);
    function NSBlockOperation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.executionBlocks = [];
        return _this;
    }
    NSBlockOperation.operationWithBlock = function (target, block) {
        var op = new NSBlockOperation();
        op.init();
    };
    NSBlockOperation.prototype.addExecutionBlock = function (target, block) {
        var item = {};
        item["Target"] = target;
        item["Block"] = block;
        this.executionBlocks.push(item);
    };
    NSBlockOperation.prototype.main = function () {
        for (var index = 0; index < this.executionBlocks.length; index++) {
            var item = this.executionBlocks[index];
            var target = item["Target"];
            var block = item["Block"];
            block.call(target);
        }
    };
    return NSBlockOperation;
}(NSOperation));
var NSOperationQueue = /** @class */ (function (_super) {
    __extends(NSOperationQueue, _super);
    function NSOperationQueue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._operations = [];
        _this._suspended = false;
        return _this;
    }
    NSOperationQueue.prototype.addOperation = function (operation) {
        if (operation.isFinished == true) {
            throw new Error("NSOperationQueue: Tying to add an operation already finished");
        }
        this.willChangeValue("operationCount");
        this.willChangeValue("operations");
        this._operations.addObject(operation);
        this.didChangeValue("operationCount");
        this.didChangeValue("operations");
        if (operation.ready == false) {
            operation.addObserver(this, "ready", null);
        }
        else {
            operation.addObserver(this, "isFinished", null);
            if (this.suspended == false)
                operation.start();
        }
    };
    NSOperationQueue.prototype.removeOperation = function (operation) {
        var index = this._operations.indexOf(operation);
        if (index == -1)
            return;
        this.willChangeValue("operationCount");
        this.willChangeValue("operations");
        this._operations.splice(index, 1);
        this.didChangeValue("operationCount");
        this.didChangeValue("operations");
    };
    Object.defineProperty(NSOperationQueue.prototype, "operations", {
        get: function () {
            return this._operations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSOperationQueue.prototype, "operationCount", {
        get: function () {
            return this._operations.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NSOperationQueue.prototype, "suspended", {
        get: function () {
            return this._suspended;
        },
        set: function (value) {
            this.setSupended(value);
        },
        enumerable: true,
        configurable: true
    });
    NSOperationQueue.prototype.setSupended = function (value) {
        if (this._suspended == value)
            return;
        this._suspended = value;
        // if the value is false, we don't need to do anything
        if (value == true)
            return;
        // This means we need to re-active every operation
        for (var index = 0; index < this.operations.length; index++) {
            var op = this.operations[index];
            if (op.ready == true)
                op.start();
        }
    };
    NSOperationQueue.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
        if (type != "did")
            return;
        if (keyPath == "ready") {
            var op = object;
            if (op.ready == true) {
                op.removeObserver(this, "ready");
                op.addObserver(this, "isFinished", null);
                if (this.suspended == false)
                    op.start();
            }
        }
        else if (keyPath == "isFinished") {
            var op = object;
            if (op.isFinished == true) {
                op.removeObserver(this, "isFinished");
                this.removeOperation(op);
                if (op.target != null && op.completion != null)
                    op.completion.call(op.target);
            }
        }
    };
    return NSOperationQueue;
}(NSObject));
 
function NSLog(format) {
    console.log(format);
}
 
/**
 * Created by godshadow on 28/09/2016.
 */
var NSSortDescriptor = /** @class */ (function (_super) {
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
}(NSObject));
 
//
// For internal purposes: Don't use it, could change
//
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
            //return instance._NSSortDescriptorSortObjects2(a, b, sortDescriptors, 0);
        });
    }
    return resultObjects;
}
 
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
        // Check the length
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
var NSPropertyListFormat;
(function (NSPropertyListFormat) {
    NSPropertyListFormat[NSPropertyListFormat["OpenStepFormat"] = 0] = "OpenStepFormat";
    NSPropertyListFormat[NSPropertyListFormat["XMLFormat_v1_0"] = 1] = "XMLFormat_v1_0";
    NSPropertyListFormat[NSPropertyListFormat["BinaryFormat_v1_0"] = 2] = "BinaryFormat_v1_0";
})(NSPropertyListFormat || (NSPropertyListFormat = {}));
var NSPropertyListReadOptions;
(function (NSPropertyListReadOptions) {
    NSPropertyListReadOptions[NSPropertyListReadOptions["None"] = 0] = "None";
})(NSPropertyListReadOptions || (NSPropertyListReadOptions = {}));
var NSPropertyListWriteOptions;
(function (NSPropertyListWriteOptions) {
    NSPropertyListWriteOptions[NSPropertyListWriteOptions["None"] = 0] = "None";
})(NSPropertyListWriteOptions || (NSPropertyListWriteOptions = {}));
var NSPropertyListSerialization = /** @class */ (function (_super) {
    __extends(NSPropertyListSerialization, _super);
    function NSPropertyListSerialization() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = null;
        _this.plist = null;
        _this.rootItem = null;
        // #region XML Parser delegate 
        _this.currentElement = null;
        _this.currentElementType = null;
        _this.currentValue = null;
        _this.currentKey = null;
        _this.currentString = null;
        _this.itemStack = [];
        _this.contentString = null;
        return _this;
    }
    NSPropertyListSerialization.propertyListWithData = function (data, options, format, error) {
        var pl = new NSPropertyListSerialization();
        pl.initWithData(data, options, format);
        var item = pl.parseData(error);
        return item;
    };
    NSPropertyListSerialization.dataWithpropertyList = function (plist, format, options, error) {
        var pl = new NSPropertyListSerialization();
        pl.initWithObject(plist, options, format);
        var data = pl.parsePList(error);
        return data;
    };
    NSPropertyListSerialization.prototype.initWithData = function (data, options, format) {
        _super.prototype.init.call(this);
        this.data = data;
    };
    NSPropertyListSerialization.prototype.initWithObject = function (plist, options, format) {
        _super.prototype.init.call(this);
        this.plist = plist;
    };
    NSPropertyListSerialization.prototype.parseData = function (error) {
        this.currentElement = null;
        var parser = new NSXMLParser();
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
        else if (element == "string" || element == "integer" || element == "real" || element == "data") {
            this.currentValue = this.currentString;
            if (element == "integer")
                this.currentValue = parseInt(this.currentString);
            if (element == "real")
                this.currentValue = parseFloat(this.currentString);
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
    NSPropertyListSerialization.prototype.parsePList = function (error) {
        this.contentString = '<?xml version="1.0" encoding="UTF-8"?>';
        this.contentString += '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">';
        this.contentString += '<plist version="1.0">';
        this.parseObject(this.plist);
        this.contentString += '</plist>';
        return this.contentString;
    };
    NSPropertyListSerialization.prototype.parseObject = function (object) {
        if (typeof object === "string")
            this.parseString(object);
        else if (typeof object === "number")
            this.parseNumber(object);
        //else if (typeof object === "Date") this.parseDate(object);
        else if (object instanceof Array)
            this.parseArray(object);
        else
            this.parseDictionary(object);
    };
    NSPropertyListSerialization.prototype.parseString = function (object) {
        this.contentString += "<string>";
        this.contentString += object;
        this.contentString += "</string>";
    };
    NSPropertyListSerialization.prototype.parseNumber = function (object) {
        if (object % 1 === 0) {
            this.contentString += "<integer>";
            this.contentString += object;
            this.contentString += "</integer>";
        }
        else {
            this.contentString += "<real>";
            this.contentString += object;
            this.contentString += "</real>";
        }
    };
    NSPropertyListSerialization.prototype.parseArray = function (objects) {
        this.contentString += "<array>";
        for (var index = 0; index < objects.length; index++) {
            var obj = objects[index];
            this.parseObject(obj);
        }
        this.contentString += "</array>";
    };
    NSPropertyListSerialization.prototype.parseDictionary = function (objects) {
        this.contentString += "<dict>";
        for (var key in objects) {
            this.contentString += "<key>";
            this.contentString += key;
            this.contentString += "</key>";
            var obj = objects[key];
            this.parseObject(obj);
        }
        this.contentString += "</dict>";
    };
    return NSPropertyListSerialization;
}(NSObject));
 
//# sourceMappingURL=foundation.web.js.map"use strict";
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
 






















 
function MUICoreLayerIDFromObject(object) {
    var classname = object.constructor.name.substring(3);
    return MUICoreLayerIDFromClassname(classname);
}
 
function MUICoreLayerIDFromClassname(classname) {
    var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var random = "";
    for (var count = 0; count < 4; count++) {
        var randomNumber = Math.floor(Math.random() * 16);
        var randomDigit = digits[randomNumber];
        random += randomDigit;
    }
    var layerID = classname.toLowerCase() + "_" + random;
     
    return layerID;
}
 
function MUICoreLayerCreate(layerID) {
    var layer = document.createElement("DIV");
    if (layerID != null)
        layer.setAttribute("id", layerID);
    //layer.style.position = "absolute";
    return layer;
}
 
function MUICoreLayerAddSublayer(layer, subLayer) {
    layer.appendChild(subLayer);
}
 
function MUICoreLayerRemoveSublayer(layer, subLayer) {
    layer.removeChild(subLayer);
}
 
function MUICoreLayerCreateWithStyle(style, layerID) {
    var layer = MUICoreLayerCreate(layerID);
    MUICoreLayerAddStyle(layer, style);
    return layer;
}
 
function MUICoreLayerAddStyle(layer, style) {
    layer.classList.add(style);
}
 
function MUICoreLayerRemoveStyle(layer, style) {
    layer.classList.remove(style);
}
 
function MUICoreLayerSearchElementByAttribute(layer, key) {
    if (layer.tagName != "DIV" && layer.tagName != "INPUT" && layer.tagName != "SECTION")
        return null;
    if (layer.getAttribute(key) == "true")
        return layer;
    var elementFound = null;
    for (var count = 0; count < layer.childNodes.length; count++) {
        var l = layer.childNodes[count];
        elementFound = MUICoreLayerSearchElementByAttribute(l, key);
        if (elementFound != null)
            return elementFound;
    }
    return null;
}
 
function MUICoreLayerSearchElementByID(layer, elementID) {
    if (layer.tagName != "DIV" && layer.tagName != "INPUT" && layer.tagName != "SECTION")
        return null;
    if (layer.getAttribute("data-outlet") == elementID)
        return layer;
    // Deprecated. For old code we still mantein
    if (layer.getAttribute("id") == elementID)
        return layer;
    var elementFound = null;
    for (var count = 0; count < layer.childNodes.length; count++) {
        var l = layer.childNodes[count];
        elementFound = MUICoreLayerSearchElementByID(l, elementID);
        if (elementFound != null)
            return elementFound;
    }
    return null;
}
 
function MUICoreLayerGetFirstElementWithTag(layer, tag) {
    var foundLayer = null;
    if (layer.childNodes.length > 0) {
        var index = 0;
        foundLayer = layer.childNodes[index];
        while (foundLayer.tagName != tag) {
            index++;
            if (index >= layer.childNodes.length) {
                foundLayer = null;
                break;
            }
            foundLayer = layer.childNodes[index];
        }
    }
    return foundLayer;
}
 
/*
    ANIMATIONS
 */
var MUIAnimationType;
(function (MUIAnimationType) {
    MUIAnimationType[MUIAnimationType["None"] = 0] = "None";
    MUIAnimationType[MUIAnimationType["BeginSheet"] = 1] = "BeginSheet";
    MUIAnimationType[MUIAnimationType["EndSheet"] = 2] = "EndSheet";
    MUIAnimationType[MUIAnimationType["Push"] = 3] = "Push";
    MUIAnimationType[MUIAnimationType["Pop"] = 4] = "Pop";
    MUIAnimationType[MUIAnimationType["FlipLeft"] = 5] = "FlipLeft";
    MUIAnimationType[MUIAnimationType["FlipRight"] = 6] = "FlipRight";
    MUIAnimationType[MUIAnimationType["FadeIn"] = 7] = "FadeIn";
    MUIAnimationType[MUIAnimationType["FadeOut"] = 8] = "FadeOut";
    MUIAnimationType[MUIAnimationType["LightSpeedIn"] = 9] = "LightSpeedIn";
    MUIAnimationType[MUIAnimationType["LightSpeedOut"] = 10] = "LightSpeedOut";
    MUIAnimationType[MUIAnimationType["Hinge"] = 11] = "Hinge";
    MUIAnimationType[MUIAnimationType["SlideInUp"] = 12] = "SlideInUp";
    MUIAnimationType[MUIAnimationType["SlideOutDown"] = 13] = "SlideOutDown";
    MUIAnimationType[MUIAnimationType["SlideInRight"] = 14] = "SlideInRight";
    MUIAnimationType[MUIAnimationType["SlideOutRight"] = 15] = "SlideOutRight";
    MUIAnimationType[MUIAnimationType["SlideInLeft"] = 16] = "SlideInLeft";
    MUIAnimationType[MUIAnimationType["SlideOutLeft"] = 17] = "SlideOutLeft";
    MUIAnimationType[MUIAnimationType["HorizontalOutFlip"] = 18] = "HorizontalOutFlip";
    MUIAnimationType[MUIAnimationType["HorizontalInFlip"] = 19] = "HorizontalInFlip";
    MUIAnimationType[MUIAnimationType["ZoomIn"] = 20] = "ZoomIn";
    MUIAnimationType[MUIAnimationType["ZoomOut"] = 21] = "ZoomOut";
})(MUIAnimationType || (MUIAnimationType = {}));
// ANIMATION TYPES
function MUIClassListForAnimationType(type) {
    var array = [];
    array.push("animated");
    switch (type) {
        case MUIAnimationType.BeginSheet:
            array.push("slideInDown");
            break;
        case MUIAnimationType.EndSheet:
            array.push("slideOutUp");
            break;
        case MUIAnimationType.Push:
            array.push("slideInRight");
            break;
        case MUIAnimationType.Pop:
            array.push("slideOutRight");
            break;
        case MUIAnimationType.FadeIn:
            array.push("fadeIn");
            break;
        case MUIAnimationType.FadeOut:
            array.push("fadeOut");
            break;
        case MUIAnimationType.LightSpeedOut:
            array.push("lightSpeedOut");
            break;
        case MUIAnimationType.Hinge:
            array.push("hinge");
            break;
        case MUIAnimationType.SlideInUp:
            array.push("slideInUp");
            break;
        case MUIAnimationType.SlideOutDown:
            array.push("slideOutDown");
            break;
        case MUIAnimationType.SlideInRight:
            array.push("slideInRight");
            break;
        case MUIAnimationType.SlideOutRight:
            array.push("slideOutRight");
            break;
        case MUIAnimationType.SlideInLeft:
            array.push("slideInLeft");
            break;
        case MUIAnimationType.SlideOutLeft:
            array.push("slideOutLeft");
            break;
        case MUIAnimationType.HorizontalOutFlip:
            array.push("flipOutY");
            break;
        case MUIAnimationType.HorizontalInFlip:
            array.push("flipInY");
            break;
        case MUIAnimationType.ZoomIn:
            array.push("zoomIn");
            break;
        case MUIAnimationType.ZoomOut:
            array.push("zoomOut");
            break;
    }
    return array;
}
 
function _MUIAddAnimations(layer, animations) {
    var w = layer.offsetWidth;
    for (var index = 0; index < animations.length; index++)
        layer.classList.add(animations[index]);
    w++;
}
 
function _MUIRemoveAnimations(layer, animations) {
    for (var index = 0; index < animations.length; index++)
        layer.classList.remove(animations[index]);
}
 
function _MUIAnimationStart(layer, animationController, animationContext, target, completion) {
    if (animationController == null) {
        if (target != null && completion != null)
            completion.call(target);
        return;
    }
    var duration = animationController.transitionDuration(animationContext);
    var animations = animationController.animations(animationContext);
    animationController.animateTransition(animationContext);
    if (duration == 0 || animations == null) {
        // NO animation
        animationController.animationEnded(true);
        if (target != null && completion != null)
            completion.call(target);
        return;
    }
    layer.style.animationDuration = duration + "s";
    _MUIAddAnimations(layer, animations);
    layer.animationParams = {};
    layer.animationParams["animationController"] = animationController;
    layer.animationParams["animations"] = animations;
    if (target != null)
        layer.animationParams["target"] = target;
    if (completion != null)
        layer.animationParams["completion"] = completion;
    layer.addEventListener("animationend", _UIAnimationDidFinish);
}
 
function _UIAnimationDidFinish(event) {
    var animationController = event.target.animationParams["animationController"];
    var animations = event.target.animationParams["animations"];
    var target = event.target.animationParams["target"];
    var completion = event.target.animationParams["completion"];
    var layer = event.target;
    _MUIRemoveAnimations(layer, animations);
    layer.removeEventListener("animationend", _UIAnimationDidFinish);
    animationController.animationEnded(true);
    if (target != null && completion != null)
        completion.call(target);
}
 
window.onload = function (e) {
    var url = MIOCoreBundleGetMainURLString();
    console.log("Main URL: " + url);
    var args = url; // Todo get only the query string
    main(args);
};
// output errors to console log
window.onerror = function (e) {
    console.log("window.onerror ::" + JSON.stringify(e));
};
var _miocore_events_event_observers = {};
function MUICoreEventRegisterObserverForType(eventType, observer, completion) {
    var item = { "Target": observer, "Completion": completion };
    var array = _miocore_events_event_observers[eventType];
    if (array == null) {
        array = [];
        _miocore_events_event_observers[eventType] = array;
    }
    array.push(item);
}
 
function MUICoreEventUnregisterObserverForType(eventType, observer) {
    var obs = _miocore_events_event_observers[eventType];
    if (obs == null)
        return;
    var index = -1;
    for (var count = 0; count < obs.length; count++) {
        var item = obs[count];
        var target = item["Target"];
        if (target === observer) {
            index = count;
            break;
        }
    }
    if (index > -1) {
        console.log("removing event observer: " + obs.length);
        obs.splice(index, 1);
        console.log("removing event observer: " + obs.length);
        console.log("removing event observer: " + _miocore_events_event_observers[eventType].length);
    }
}
 
function _MUICoreEventSendToObservers(obs, event) {
    if (obs != null) {
        for (var index = 0; index < obs.length; index++) {
            var o = obs[index];
            var target = o["Target"];
            var completion = o["Completion"];
            completion.call(target, event);
        }
    }
}
/*
    EVENTS
*/
// Keyboard events
window.addEventListener("keydown", function (e) {
    // Create event
    var event = new MUICoreKeyEvent();
    event.initWithKeyCode(MUICoreEventType.KeyDown, e.keyCode, e);
    var observers = _miocore_events_event_observers[MUICoreEventType.KeyDown];
    _MUICoreEventSendToObservers(observers, event);
}, false);
window.addEventListener('keyup', function (e) {
    // Create event
    var event = new MUICoreKeyEvent();
    event.initWithKeyCode(MUICoreEventType.KeyUp, e.keyCode, e);
    var observers = _miocore_events_event_observers[MUICoreEventType.KeyUp];
    _MUICoreEventSendToObservers(observers, event);
}, false);
// Mouse and touch events
window.addEventListener('mousedown', function (e) {
    // Create event
    var event = new MUICoreKeyEvent();
    event.initWithType(MUICoreEventType.MouseDown, e);
    var observers = _miocore_events_event_observers[MUICoreEventType.MouseDown];
    _MUICoreEventSendToObservers(observers, event);
}, false);
window.addEventListener('mouseup', function (e) {
    // Create event
    var event = new MUICoreEventMouse();
    event.initWithType(MUICoreEventType.MouseUp, e);
    var observers_mouseup = _miocore_events_event_observers[MUICoreEventType.MouseUp];
    _MUICoreEventSendToObservers(observers_mouseup, event);
    // Send click event
    var observers_click = _miocore_events_event_observers[MUICoreEventType.Click];
    _MUICoreEventSendToObservers(observers_click, event);
}, false);
window.addEventListener('touchend', function (e) {
    // Create event
    var event = new MUICoreEventTouch();
    event.initWithType(MUICoreEventType.TouchEnd, e);
    var observers_touchend = _miocore_events_event_observers[MUICoreEventType.TouchEnd];
    _MUICoreEventSendToObservers(observers_touchend, event);
    // Send click event
    var observers_click = _miocore_events_event_observers[MUICoreEventType.Click];
    _MUICoreEventSendToObservers(observers_click, event);
}, false);
// UI events
window.addEventListener("resize", function (e) {
    var event = new MUICoreEvent();
    event.initWithType(MUICoreEventType.Resize, e);
    var observers = _miocore_events_event_observers[MUICoreEventType.Resize];
    _MUICoreEventSendToObservers(observers, event);
}, false);
var _MIOCoreBundleClassesByDestination = {};
function MUICoreBundleSetClassesByDestination(classes) {
    _MIOCoreBundleClassesByDestination = classes;
}
 
function MUICoreBundleGetClassesByDestination(resource) {
    return _MIOCoreBundleClassesByDestination[resource];
}
 
function MUICoreBundleLoadNibName(name, target, completion) {
    var parser = new MUICoreNibParser();
    parser.target = target;
    parser.completion = completion;
    MIOCoreBundleGetContentsFromURLString(name, this, function (code, data) {
        if (code == 200)
            parser.parseString(data);
        else
            throw new Error("MUICoreBundleLoadNibName: Couldn't download resource " + name);
    });
}
 
var MUICoreNibParser = /** @class */ (function (_super) {
    __extends(MUICoreNibParser, _super);
    function MUICoreNibParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.completion = null;
        _this.owner = null;
        _this.result = "";
        _this.isCapturing = false;
        _this.elementCapturingCount = 0;
        _this.layerID = null;
        _this.rootClassname = null;
        _this.currentString = null;
        _this.currentStringLocalizedKey = null;
        return _this;
    }
    MUICoreNibParser.prototype.parseString = function (data) {
        var parser = new MIOCoreHTMLParser();
        parser.initWithString(data, this);
        parser.parse();
        var domParser = new DOMParser();
        var items = domParser.parseFromString(this.result, "text/html");
        var layer = items.getElementById(this.layerID);
        this.completion.call(this.target, layer);
    };
    MUICoreNibParser.prototype.parserDidStartDocument = function (parser) {
        console.log("parser started");
    };
    // HTML Parser delegate
    MUICoreNibParser.prototype.parserDidStartElement = function (parser, element, attributes) {
        if (element.toLocaleLowerCase() == "div") {
            if (attributes["data-root-view-controller"] == "true") {
                // Start capturing   
                this.isCapturing = true;
                this.layerID = attributes["id"];
                this.rootClassname = attributes["data-class"];
            }
        }
        if (this.isCapturing == true) {
            this.openTag(element, attributes);
            this.elementCapturingCount++;
        }
    };
    MUICoreNibParser.prototype.parserFoundCharacters = function (parser, characters) {
        if (this.isCapturing == true) {
            if (this.currentString == null) {
                this.currentString = characters;
            }
            else
                this.currentString += " " + characters;
            //this.result += " " + characters;
        }
    };
    MUICoreNibParser.prototype.parserFoundComment = function (parser, comment) {
        if (this.isCapturing == true) {
            this.result += "<!-- " + comment + "-->";
        }
    };
    MUICoreNibParser.prototype.parserDidEndElement = function (parser, element) {
        if (this.isCapturing == true) {
            this.closeTag(element);
            this.elementCapturingCount--;
        }
        if (this.elementCapturingCount == 0)
            this.isCapturing = false;
        this.currentString = null;
    };
    MUICoreNibParser.prototype.parserDidEndDocument = function (parser) {
        console.log("html parser finished");
        console.log(this.result);
    };
    MUICoreNibParser.prototype.openTag = function (element, attributes) {
        this.translateCharacters();
        this.result += "<" + element;
        for (var key in attributes) {
            var value = attributes[key];
            if (value != null) {
                this.result += " " + key + "='" + value + "'";
            }
            else {
                this.result += " " + key;
            }
        }
        this.result += ">";
        if (element == "span") {
            this.currentStringLocalizedKey = attributes["localized-key"] || attributes["data-localized-key"];
        }
    };
    MUICoreNibParser.prototype.closeTag = function (element) {
        this.translateCharacters();
        this.result += "</" + element + ">";
    };
    MUICoreNibParser.prototype.translateCharacters = function () {
        if (this.currentString != null) {
            if (this.currentStringLocalizedKey == null) {
                this.result += this.currentString;
            }
            else {
                this.result += NSLocalizeString(this.currentStringLocalizedKey, this.currentString);
            }
        }
        this.currentString = null;
        this.currentStringLocalizedKey = null;
    };
    return MUICoreNibParser;
}(NSObject));
var MUICoreEventKeyCode;
(function (MUICoreEventKeyCode) {
    MUICoreEventKeyCode[MUICoreEventKeyCode["Enter"] = 13] = "Enter";
    MUICoreEventKeyCode[MUICoreEventKeyCode["Escape"] = 27] = "Escape";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowLeft"] = 37] = "ArrowLeft";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowUp"] = 38] = "ArrowUp";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowRight"] = 39] = "ArrowRight";
    MUICoreEventKeyCode[MUICoreEventKeyCode["ArrowDown"] = 40] = "ArrowDown";
})(MUICoreEventKeyCode || (MUICoreEventKeyCode = {}));
var MUICoreEventType;
(function (MUICoreEventType) {
    MUICoreEventType[MUICoreEventType["KeyUp"] = 0] = "KeyUp";
    MUICoreEventType[MUICoreEventType["KeyDown"] = 1] = "KeyDown";
    MUICoreEventType[MUICoreEventType["MouseUp"] = 2] = "MouseUp";
    MUICoreEventType[MUICoreEventType["MouseDown"] = 3] = "MouseDown";
    MUICoreEventType[MUICoreEventType["TouchStart"] = 4] = "TouchStart";
    MUICoreEventType[MUICoreEventType["TouchEnd"] = 5] = "TouchEnd";
    MUICoreEventType[MUICoreEventType["Click"] = 6] = "Click";
    MUICoreEventType[MUICoreEventType["Resize"] = 7] = "Resize";
})(MUICoreEventType || (MUICoreEventType = {}));
var MUICoreEvent = /** @class */ (function () {
    function MUICoreEvent() {
        this.eventType = null;
        this.target = null;
        this.completion = null;
    }
    MUICoreEvent.prototype.initWithType = function (eventType, coreEvent) {
        this.coreEvent = coreEvent;
        this.eventType = eventType;
    };
    MUICoreEvent.prototype.cancel = function () {
        this.coreEvent.preventDefault();
    };
    return MUICoreEvent;
}());
 
var MUICoreKeyEvent = /** @class */ (function (_super) {
    __extends(MUICoreKeyEvent, _super);
    function MUICoreKeyEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keyCode = null;
        return _this;
    }
    MUICoreKeyEvent.prototype.initWithKeyCode = function (eventType, eventKeyCode, event) {
        _super.prototype.initWithType.call(this, eventType, event);
        this.keyCode = eventKeyCode;
    };
    return MUICoreKeyEvent;
}(MUICoreEvent));
 
var MUICoreEventInput = /** @class */ (function (_super) {
    __extends(MUICoreEventInput, _super);
    function MUICoreEventInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.x = 0;
        _this.y = 0;
        _this.deltaX = 0;
        _this.deltaY = 0;
        return _this;
    }
    return MUICoreEventInput;
}(MUICoreEvent));
 
var MUICoreEventMouseButtonType;
(function (MUICoreEventMouseButtonType) {
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["None"] = 0] = "None";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Left"] = 1] = "Left";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Right"] = 2] = "Right";
    MUICoreEventMouseButtonType[MUICoreEventMouseButtonType["Middle"] = 3] = "Middle";
})(MUICoreEventMouseButtonType || (MUICoreEventMouseButtonType = {}));
var MUICoreEventMouse = /** @class */ (function (_super) {
    __extends(MUICoreEventMouse, _super);
    function MUICoreEventMouse() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.button = MUICoreEventMouseButtonType.None;
        return _this;
    }
    MUICoreEventMouse.prototype.initWithType = function (eventType, coreEvent) {
        _super.prototype.initWithType.call(this, eventType, event);
        //Get the button clicked
        this.button = MUICoreEventMouseButtonType.Left;
        this.target = coreEvent.target;
        this.x = coreEvent.clientX;
        this.y = coreEvent.clientY;
    };
    return MUICoreEventMouse;
}(MUICoreEventInput));
 
// Declare changedTouches interface for typescript
// interface Event {
//     touches:TouchList;
//     targetTouches:TouchList;
//     changedTouches:TouchList;
// };
var MUICoreEventTouch = /** @class */ (function (_super) {
    __extends(MUICoreEventTouch, _super);
    function MUICoreEventTouch() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MUICoreEventTouch.prototype.initWithType = function (eventType, coreEvent) {
        _super.prototype.initWithType.call(this, eventType, event);
        var touch = coreEvent.changedTouches[0]; // reference first touch point for this event
        this.target = coreEvent.target;
        this.x = touch.clientX;
        this.y = touch.clientY;
    };
    return MUICoreEventTouch;
}(MUICoreEventInput));
 
var UIEvent = /** @class */ (function (_super) {
    __extends(UIEvent, _super);
    function UIEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    UIEvent.eventWithSysEvent = function (sysEvent) {
        var ev = new UIEvent();
        ev.initWithSysEvent(sysEvent);
        return ev;
    };
    UIEvent.prototype.initWithSysEvent = function (e) {
        _super.prototype.init.call(this);
        this.x = e.clientX;
        this.y = e.clientY;
    };
    return UIEvent;
}(NSObject));
 
var UIGestureRecognizerState;
(function (UIGestureRecognizerState) {
    UIGestureRecognizerState[UIGestureRecognizerState["Possible"] = 0] = "Possible";
    UIGestureRecognizerState[UIGestureRecognizerState["Began"] = 1] = "Began";
    UIGestureRecognizerState[UIGestureRecognizerState["Changed"] = 2] = "Changed";
    UIGestureRecognizerState[UIGestureRecognizerState["Ended"] = 3] = "Ended";
    UIGestureRecognizerState[UIGestureRecognizerState["Cancelled"] = 4] = "Cancelled";
    UIGestureRecognizerState[UIGestureRecognizerState["Failed"] = 5] = "Failed";
    UIGestureRecognizerState[UIGestureRecognizerState["Recognized"] = 6] = "Recognized";
})(UIGestureRecognizerState || (UIGestureRecognizerState = {}));
var UIGestureRecognizer = /** @class */ (function (_super) {
    __extends(UIGestureRecognizer, _super);
    function UIGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delegate = null;
        _this.isEnabled = true;
        _this.name = null;
        _this.target = null;
        _this.block = null;
        _this._view = null;
        _this._state = UIGestureRecognizerState.Possible;
        return _this;
    }
    Object.defineProperty(UIGestureRecognizer.prototype, "view", {
        get: function () { return _injectIntoOptional(this._view); },
        set: function (v) {
            v:  
            UIView[0];
            this.setView(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGestureRecognizer.prototype, "state", {
        get: function () { return this._state; },
        set: function (value) { this.setState(value); },
        enumerable: true,
        configurable: true
    });
    UIGestureRecognizer.prototype.initWithTarget = function (target, block) {
        _super.prototype.init.call(this);
        this.target = target;
        this.block = block;
    };
    UIGestureRecognizer.prototype.setView = function (view) {
        this._view = view;
    };
    UIGestureRecognizer.prototype.setState = function (state) {
        if (this.isEnabled == false)
            return;
        if (this._state == state && state != UIGestureRecognizerState.Changed)
            return;
        this._state = state;
        this.block.call(this.target, this);
    };
    UIGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Began;
    };
    UIGestureRecognizer.prototype.touchesMovedWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Changed;
    };
    UIGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Ended;
    };
    UIGestureRecognizer.prototype.reset = function () {
        this.state = UIGestureRecognizerState.Possible;
    };
    // To call from UIView. Only for internal use
    UIGestureRecognizer.prototype._viewTouchesBeganWithEvent = function (touches, ev) {
        this.reset();
        this.touchesBeganWithEvent(touches, ev);
    };
    UIGestureRecognizer.prototype._viewTouchesMovedWithEvent = function (touches, ev) {
        this.touchesMovedWithEvent(touches, ev);
    };
    UIGestureRecognizer.prototype._viewTouchesEndedWithEvent = function (touches, ev) {
        this.touchesEndedWithEvent(touches, ev);
    };
    return UIGestureRecognizer;
}(NSObject));
 
var UITapGestureRecognizer = /** @class */ (function (_super) {
    __extends(UITapGestureRecognizer, _super);
    function UITapGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberOfTapsRequired = 1;
        return _this;
    }
    UITapGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        _super.prototype.touchesBeganWithEvent.call(this, touches, ev);
        this.state = UIGestureRecognizerState.Began;
    };
    UITapGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        _super.prototype.touchesEndedWithEvent.call(this, touches, ev);
        this.state = UIGestureRecognizerState.Ended;
    };
    return UITapGestureRecognizer;
}(UIGestureRecognizer));
 
var UIPanGestureRecognizer = /** @class */ (function (_super) {
    __extends(UIPanGestureRecognizer, _super);
    function UIPanGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minimumNumberOfTouches = 1;
        _this.maximumNumberOfTouches = 0;
        _this.initialX = null;
        _this.initialY = null;
        _this.touchDown = false;
        _this.hasStarted = false;
        _this.deltaX = 0;
        _this.deltaY = 0;
        return _this;
    }
    UIPanGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        this.initialX = ev.x;
        this.initialY = ev.y;
        this.touchDown = true;
    };
    UIPanGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        _super.prototype.touchesEndedWithEvent.call(this, touches, ev);
        this.initialX = null;
        this.initialY = null;
        this.hasStarted = false;
        this.touchDown = false;
    };
    UIPanGestureRecognizer.prototype.touchesMovedWithEvent = function (touches, ev) {
        if (this.touchDown == false)
            return;
        if (this.hasStarted == false)
            this.state = UIGestureRecognizerState.Began;
        this.hasStarted = true;
        this.deltaX = this.initialX - ev.x;
        this.deltaY = this.initialY - ev.y;
        this.state = UIGestureRecognizerState.Changed;
    };
    UIPanGestureRecognizer.prototype.translationInView = function (view) {
        return new NSPoint(this.deltaX, this.deltaY);
    };
    return UIPanGestureRecognizer;
}(UIGestureRecognizer));
 
/**
 * Created by godshadow on 11/3/16.
 */
function MUICoreViewSearchViewTag(view, tag) {
    if (view.tag == tag)
        return view;
    for (var index = 0; index < view.subviews.length; index++) {
        var v = view.subviews[index];
        v = MUICoreViewSearchViewTag(v, tag);
        if (v != null)
            return v;
    }
    return null;
}
var UIView = /** @class */ (function (_super) {
    __extends(UIView, _super);
    function UIView(layerID) {
        var _this = _super.call(this) || this;
        _this.layerID = null;
        _this.layer = null;
        _this.layerOptions = null;
        _this.alpha = 1;
        _this.tag = 0;
        _this.owner = null;
        _this._parent = null;
        _this._viewIsVisible = false;
        _this._needDisplay = true;
        _this._isLayerInDOM = false;
        _this._subviews = [];
        _this._window = null;
        _this._outlets = {};
        _this._segues = [];
        _this._hidden = false;
        _this.x = 0;
        _this.y = 0;
        _this.width = 0;
        _this.height = 0;
        _this._userInteraction = false;
        _this.isMouseDown = false;
        _this.gestureRecognizers = _injectIntoOptional([]);
        _this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(_this);
        return _this;
    }
    Object.defineProperty(UIView.prototype, "parent", {
        get: function () { return this._parent; },
        set: function (view) { this.setParent(view); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "subviews", {
        get: function () {
            return this._subviews;
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype._checkSegues = function () {
    };
    UIView.prototype.init = function () {
        this.layer = MUICoreLayerCreate(this.layerID);
        //UICoreLayerAddStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "view");
        //this.layer.style.position = "absolute";
        // this.layer.style.top = "0px";
        // this.layer.style.left = "0px";
        //this.layer.style.width = "100%";
        //this.layer.style.height = "100%";
        //this.layer.style.background = "rgb(255, 255, 255)";                
    };
    UIView.prototype.initWithFrame = function (frame) {
        this.layer = MUICoreLayerCreate(this.layerID);
        this.layer.style.position = "absolute";
        this.setX(frame.origin.x);
        this.setY(frame.origin.y);
        this.setWidth(frame.size.width);
        this.setHeight(frame.size.height);
    };
    UIView.prototype.initWithLayer = function (layer, owner, options) {
        this.layer = layer;
        this.layerOptions = options;
        this.owner = owner;
        var layerID = this.layer.getAttribute("id");
        if (layerID != null)
            this.layerID = layerID;
        var tag = this.layer.getAttribute("data-tag");
        this.tag = tag || 0;
        this._addLayerToDOM();
        // Add subviews
        if (this.layer.childNodes.length > 0) {
            for (var index = 0; index < this.layer.childNodes.length; index++) {
                var subLayer = this.layer.childNodes[index];
                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION")
                    continue;
                var className = subLayer.getAttribute("data-class");
                if (className == null || className.length == 0)
                    className = "UIView";
                var sv = NSClassFromString(className);
                sv.initWithLayer(subLayer, owner);
                sv._checkSegues();
                this._linkViewToSubview(sv);
                var id = subLayer.getAttribute("id");
                if (id != null)
                    owner._outlets[id] = sv;
            }
        }
        MUICoreStoryboardParseLayer(layer, this);
    };
    UIView.prototype.copy = function () {
        var objLayer = this.layer.cloneNode(true);
        var className = this.getClassName();
        if (className == null)
            throw Error("UIView:copy: Error classname is null");
        var view = NSClassFromString(className);
        view.initWithLayer(objLayer, null);
        return view;
    };
    UIView.prototype.awakeFromHTML = function () { };
    UIView.prototype.setParent = function (view) {
        this.willChangeValue("parent");
        this._parent = view;
        this.didChangeValue("parent");
    };
    UIView.prototype.addSubLayer = function (layer) {
        this.layer.innerHTML = layer.innerHTML;
    };
    UIView.prototype._linkViewToSubview = function (view) {
        if ((view instanceof UIView) == false)
            throw new Error("_linkViewToSubview: Trying to add an object that is not a view");
        this.subviews.push(view);
    };
    UIView.prototype.addSubview = function (view, index) {
        if ((view instanceof UIView) == false)
            throw new Error("addSubview: Trying to add an object that is not a view");
        view.setParent(this);
        if (index == null)
            this.subviews.push(view);
        else
            this.subviews.splice(index, 0, view);
        view._addLayerToDOM(index);
        view.setNeedsDisplay();
    };
    UIView.prototype.insertSubviewAboveSubview = function (view, siblingSubview) {
        view.setParent(this);
        var index = this.subviews.indexOf(siblingSubview);
        this.subviews.splice(index, 0, view);
        this.addLayerBeforeLayer(view.layer, siblingSubview.layer);
        view.setNeedsDisplay();
    };
    UIView.prototype.addLayerBeforeLayer = function (newLayer, layer) {
        if (newLayer._isLayerInDOM == true)
            return;
        if (layer == null || newLayer == null)
            return;
        this.layer.insertBefore(newLayer, layer);
        newLayer._isLayerInDOM = true;
    };
    UIView.prototype._addLayerToDOM = function (index) {
        if (this._isLayerInDOM == true)
            return;
        if (this.layer == null || this.parent == null)
            return;
        if (index == null)
            this.parent.layer.appendChild(this.layer);
        else
            this.parent.layer.insertBefore(this.layer, this.parent.layer.children[0]);
        this._isLayerInDOM = true;
    };
    UIView.prototype.removeFromSuperview = function () {
        if (this.parent == null)
            return;
        var subviews = this.parent._subviews;
        var index = subviews.indexOf(this);
        subviews.splice(index, 1);
        if (this._isLayerInDOM == false)
            return;
        this.parent.layer.removeChild(this.layer);
        this._isLayerInDOM = false;
    };
    UIView.prototype._removeLayerFromDOM = function () {
        if (this._isLayerInDOM == false)
            return;
        this.layer.removeChild(this.layer);
        this._isLayerInDOM = false;
    };
    UIView.prototype._removeAllSubviews = function () {
        var node = this.layer;
        while (this.layer.hasChildNodes()) { // selected elem has children
            if (node.hasChildNodes()) { // current node has children
                node = node.lastChild; // set current node to child
            }
            else { // last child found
                node = node.parentNode; // set node to parent
                node.removeChild(node.lastChild); // remove last node
            }
        }
    };
    UIView.prototype.setViewIsVisible = function (value) {
        this._viewIsVisible = true;
        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            v.setViewIsVisible(value);
        }
    };
    UIView.prototype.viewWithTag = function (tag) {
        // TODO: Use also the view tag component
        var view = MUICoreViewSearchViewTag(this, tag);
        return view;
    };
    UIView.prototype.layoutSubviews = function () {
        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            if ((v instanceof UIView) == false)
                throw new Error("layout: Trying to layout an object that is not a view");
            v.setNeedsDisplay();
        }
    };
    UIView.prototype.setNeedsDisplay = function () {
        this._needDisplay = true;
        if (this._viewIsVisible == false)
            return;
        if (this.hidden == true)
            return;
        this._needDisplay = false;
        this.layoutSubviews();
        for (var index = 0; index < this.subviews.length; index++) {
            var v = this.subviews[index];
            if (!(v instanceof UIView)) {
                console.log("ERROR: trying to call setNeedsDisplay: in object that it's not a view");
            }
            else
                v.setNeedsDisplay();
        }
    };
    UIView.prototype.layerWithItemID = function (itemID) {
        return MUICoreLayerSearchElementByID(this.layer, itemID);
    };
    UIView.prototype.setHidden = function (hidden) {
        this._hidden = hidden;
        if (this.layer == null)
            return;
        if (hidden)
            this.layer.style.display = "none";
        else
            this.layer.style.display = "";
    };
    Object.defineProperty(UIView.prototype, "hidden", {
        get: function () {
            return this._hidden;
        },
        set: function (value) {
            this.setHidden(value);
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.setBackgroundColor = function (color) {
        this.layer.style.backgroundColor = "#" + color;
    };
    UIView.prototype.setBackgroundRGBColor = function (r, g, b, a) {
        if (a == null) {
            var value = "rgb(" + r + ", " + g + ", " + b + ")";
            this.layer.style.backgroundColor = value;
        }
        else {
            var value = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
            this.layer.style.backgroundColor = value;
        }
    };
    UIView.prototype.getBackgroundColor = function () {
        var cs = document.defaultView.getComputedStyle(this.layer, null);
        var bg = cs.getPropertyValue('background-color');
        return bg;
    };
    UIView.prototype.setAlpha = function (alpha) {
        this.willChangeValue("alpha");
        this.alpha = alpha;
        this.didChangeValue("alpha");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "opacity", "EndValue": alpha };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.opacity = alpha;
        }
    };
    UIView.prototype.setX = function (x) {
        this.willChangeValue("frame");
        this.x = x;
        this.didChangeValue("frame");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "left", "EndValue": x + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.left = x + "px";
        }
    };
    UIView.prototype.getX = function () {
        var x = this._getIntValueFromCSSProperty("left");
        return x;
    };
    UIView.prototype.setY = function (y) {
        this.willChangeValue("frame");
        this.y = y;
        this.didChangeValue("frame");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "top", "EndValue": y + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.top = y + "px";
        }
    };
    UIView.prototype.getY = function () {
        var y = this._getIntValueFromCSSProperty("top");
        return y;
    };
    UIView.prototype.setWidth = function (w) {
        this.willChangeValue("frame");
        this.width = w;
        this.didChangeValue("frame");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "width", "EndValue": w + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.width = w + "px";
        }
    };
    UIView.prototype.getWidth = function () {
        var w1 = this.layer.clientWidth;
        var w2 = this._getIntValueFromCSSProperty("width");
        var w = Math.max(w1, w2);
        if (isNaN(w))
            w = 0;
        return w;
    };
    UIView.prototype.setHeight = function (height) {
        this.willChangeValue("height");
        this.height = height;
        this.didChangeValue("height");
        if (UIView.animationsChanges != null) {
            var animation = { "View": this, "Key": "height", "EndValue": height + "px" };
            UIView.animationsChanges.addObject(animation);
        }
        else {
            this.layer.style.height = height + "px";
        }
    };
    UIView.prototype.getHeight = function () {
        var h = this.height;
        if (h == 0)
            h = this.layer.clientHeight;
        else {
            if (h == 0)
                h = this.layer.height;
            else if (h == 0)
                h = this._getIntValueFromCSSProperty("height");
        }
        return h;
    };
    UIView.prototype.setFrameComponents = function (x, y, w, h) {
        this.setX(x);
        this.setY(y);
        this.setWidth(w);
        this.setHeight(h);
    };
    UIView.prototype.setFrame = function (frame) {
        this.willChangeValue("frame");
        this.setFrameComponents(frame.origin.x, frame.origin.y, frame.size.width, frame.size.height);
        this.didChangeValue("frame");
    };
    Object.defineProperty(UIView.prototype, "frame", {
        get: function () {
            return NSRect.rectWithValues(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIView.prototype, "bounds", {
        get: function () {
            return NSRect.rectWithValues(0, 0, this.getWidth(), this.getHeight());
        },
        enumerable: true,
        configurable: true
    });
    //
    // CSS Subsystem
    //
    UIView.prototype._getValueFromCSSProperty = function (property) {
        var v = window.getComputedStyle(this.layer, null).getPropertyValue(property);
        return v;
    };
    UIView.prototype._getIntValueFromCSSProperty = function (property) {
        var v = this._getValueFromCSSProperty(property);
        var r = v.hasSuffix("px");
        if (r == true)
            v = v.substring(0, v.length - 2);
        else {
            var r2 = v.hasSuffix("%");
            if (r2 == true)
                v = v.substring(0, v.length - 1);
        }
        return parseInt(v);
    };
    Object.defineProperty(UIView.prototype, "userInteraction", {
        set: function (value) {
            if (value == this._userInteraction)
                return;
            if (value == true) {
                this.layer.addEventListener("mousedown", this.mouseDownEvent.bind(this));
                this.layer.addEventListener("mouseup", this.mouseUpEvent.bind(this));
            }
            else {
                this.layer.removeEventListener("mousedown", this.mouseDownEvent);
                this.layer.removeEventListener("mouseup", this.mouseUpEvent);
            }
        },
        enumerable: true,
        configurable: true
    });
    UIView.prototype.mouseDownEvent = function (ev) {
        var e = UIEvent.eventWithSysEvent(ev);
        this.touchesBeganWithEvent(null, e);
        this.isMouseDown = true;
        window.addEventListener("mousemove", this.mouseMoveEvent.bind(this));
        ev.preventDefault(); // Prevent selection
    };
    UIView.prototype.mouseUpEvent = function (ev) {
        this.isMouseDown = false;
        var e = UIEvent.eventWithSysEvent(ev);
        this.touchesEndedWithEvent(null, e);
    };
    UIView.prototype.mouseMoveEvent = function (ev) {
        if (this.isMouseDown == false)
            return;
        if (ev.buttons == 0) {
            window.removeEventListener("mousemove", this.mouseMoveEvent);
            this.isMouseDown = false;
            var e = UIEvent.eventWithSysEvent(ev);
            this.touchesEndedWithEvent(null, e);
        }
        else {
            var e = UIEvent.eventWithSysEvent(ev);
            this.touchesMovedWithEvent(null, e);
        }
    };
    UIView.prototype.touchesBeganWithEvent = function (touches, ev) {
        for (var index = 0; index < this.gestureRecognizers[0].length; index++) {
            var gr = this.gestureRecognizers[0][index];
            gr._viewTouchesBeganWithEvent(touches, ev);
        }
    };
    UIView.prototype.touchesMovedWithEvent = function (touches, ev) {
        for (var index = 0; index < this.gestureRecognizers[0].length; index++) {
            var gr = this.gestureRecognizers[0][index];
            gr._viewTouchesMovedWithEvent(touches, ev);
        }
    };
    UIView.prototype.touchesEndedWithEvent = function (touches, ev) {
        for (var index = 0; index < this.gestureRecognizers[0].length; index++) {
            var gr = this.gestureRecognizers[0][index];
            gr._viewTouchesEndedWithEvent(touches, ev);
        }
    };
    UIView.prototype.addGestureRecognizer = function (gesture) {
        if (this.gestureRecognizers[0].containsObject(gesture))
            return;
        gesture.view = _injectIntoOptional(this);
        this.gestureRecognizers[0].addObject(gesture);
        this.userInteraction = true;
    };
    UIView.prototype.removeGestureRecognizer = function (gesture) {
        gesture.view = _injectIntoOptional(null);
        this.gestureRecognizers[0].removeObject(gesture);
    };
    UIView.animateWithDuration = function (duration, target, animations, completion) {
        UIView.animationsChanges = [];
        UIView.animationsViews = [];
        UIView.animationTarget = target;
        UIView.animationCompletion = completion;
        animations.call(target);
        for (var index = 0; index < UIView.animationsChanges.length; index++) {
            var anim = UIView.animationsChanges[index];
            var view = anim["View"];
            var key = anim["Key"];
            var value = anim["EndValue"];
            view.layer.style.transition = key + " " + duration + "s";
            switch (key) {
                case "opacity":
                    view.layer.style.opacity = value;
                    break;
                case "x":
                    view.layer.style.left = value;
                    break;
                case "y":
                    view.layer.style.top = value;
                    break;
                case "width":
                    view.layer.style.width = value;
                    break;
                case "height":
                    view.layer.style.height = value;
                    break;
            }
            UIView.addTrackingAnimationView(view);
        }
        UIView.animationsChanges = null;
    };
    UIView.addTrackingAnimationView = function (view) {
        var index = UIView.animationsViews.indexOf(view);
        if (index > -1)
            return;
        UIView.animationsViews.addObject(view);
        view.layer.animationParams = { "View": view };
        view.layer.addEventListener("webkitTransitionEnd", UIView.animationDidFinish);
    };
    UIView.removeTrackingAnimationView = function (view) {
        var index = UIView.animationsViews.indexOf(view);
        if (index == -1)
            return;
        UIView.animationsViews.removeObject(view);
        view.layer.removeEventListener("webkitTransitionEnd", UIView.animationDidFinish);
        view.layer.style.transition = "none";
        view.setNeedsDisplay();
    };
    UIView.animationDidFinish = function (event) {
        var view = event.target.animationParams["View"];
        UIView.removeTrackingAnimationView(view);
        if (UIView.animationsViews.length > 0)
            return;
        UIView.animationsChanges = null;
        UIView.animationsViews = null;
        if (UIView.animationTarget != null && UIView.animationCompletion != null)
            UIView.animationCompletion.call(UIView.animationTarget);
        UIView.animationTarget = null;
        UIView.animationCompletion = null;
    };
    //
    // Animations
    //
    UIView.animationsChanges = null;
    UIView.animationsViews = null;
    UIView.animationTarget = null;
    UIView.animationCompletion = null;
    return UIView;
}(NSObject));
 
/**
 * Created by godshadow on 11/3/16.
 */
var UILabel = /** @class */ (function (_super) {
    __extends(UILabel, _super);
    function UILabel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._textLayer = null;
        _this.autoAdjustFontSize = "none";
        _this.autoAdjustFontSizeValue = 4;
        return _this;
    }
    UILabel.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayerAddStyle(this.layer, "label");
        this.setupLayers();
    };
    UILabel.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._textLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "SPAN");
        this.setupLayers();
    };
    UILabel.prototype.setupLayers = function () {
        //UICoreLayerAddStyle(this.layer, "lbl");
        if (this._textLayer == null) {
            this.layer.innerHTML = "";
            this._textLayer = document.createElement("span");
            this._textLayer.style.top = "3px";
            this._textLayer.style.left = "3px";
            this._textLayer.style.right = "3px";
            this._textLayer.style.bottom = "3px";
            //this._textLayer.style.font = "inherit";
            //this._textLayer.style.fontSize = "inherit";
            this.layer.appendChild(this._textLayer);
        }
    };
    UILabel.prototype.setText = function (text) {
        this.text = _injectIntoOptional(text);
    };
    Object.defineProperty(UILabel.prototype, "text", {
        get: function () {
            return _injectIntoOptional(this._textLayer.innerHTML);
        },
        set: function (text) {
            text = text[0];
            this._textLayer.innerHTML = text != null ? text : "";
        },
        enumerable: true,
        configurable: true
    });
    UILabel.prototype.setTextAlignment = function (alignment) {
        this.layer.style.textAlign = alignment;
    };
    UILabel.prototype.setHightlighted = function (value) {
        if (value == true) {
            this._textLayer.classList.add("label_highlighted_color");
        }
        else {
            this._textLayer.classList.remove("label_highlighted_color");
        }
    };
    UILabel.prototype.setTextRGBColor = function (r, g, b) {
        var value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._textLayer.style.color = value;
    };
    UILabel.prototype.setFontSize = function (size) {
        this._textLayer.style.fontSize = size + "px";
    };
    UILabel.prototype.setFontStyle = function (style) {
        this._textLayer.style.fontWeight = style;
    };
    UILabel.prototype.setFontFamily = function (fontFamily) {
        this._textLayer.style.fontFamily = fontFamily;
    };
    return UILabel;
}(UIView));
 
/**
 * Created by godshadow on 12/3/16.
 */
var UIControl.Event;
(function (UIControl.Event) {
    UIControl.Event[UIControl.Event["TouchDown"] = 1] = "TouchDown";
    UIControl.Event[UIControl.Event["TouchDownRepeat"] = 2] = "TouchDownRepeat";
    UIControl.Event[UIControl.Event["TouchDragInside"] = 4] = "TouchDragInside";
    UIControl.Event[UIControl.Event["TouchDragOutside"] = 8] = "TouchDragOutside";
    UIControl.Event[UIControl.Event["TouchDragEnter"] = 16] = "TouchDragEnter";
    UIControl.Event[UIControl.Event["TouchDragExit"] = 32] = "TouchDragExit";
    UIControl.Event[UIControl.Event["TouchUpInside"] = 64] = "TouchUpInside";
    UIControl.Event[UIControl.Event["TouchUpOutside"] = 128] = "TouchUpOutside";
    UIControl.Event[UIControl.Event["TouchCancel"] = 256] = "TouchCancel";
    UIControl.Event[UIControl.Event["ValueChanged"] = 4096] = "ValueChanged";
    UIControl.Event[UIControl.Event["PrimaryActionTriggered"] = 8192] = "PrimaryActionTriggered";
    UIControl.Event[UIControl.Event["EditingDidBegin"] = 65536] = "EditingDidBegin";
    UIControl.Event[UIControl.Event["EditingChanged"] = 131072] = "EditingChanged";
    UIControl.Event[UIControl.Event["EditingDidEnd"] = 262144] = "EditingDidEnd";
    UIControl.Event[UIControl.Event["EditingDidEndOnExit"] = 524288] = "EditingDidEndOnExit";
    UIControl.Event[UIControl.Event["AllTouchEvents"] = 4095] = "AllTouchEvents";
    UIControl.Event[UIControl.Event["EditingEvents"] = 983040] = "EditingEvents";
    UIControl.Event[UIControl.Event["ApplicationReserved"] = 251658240] = "ApplicationReserved";
    UIControl.Event[UIControl.Event["SystemReserved"] = 4026531840] = "SystemReserved";
    UIControl.Event[UIControl.Event["AllEvents"] = 4294967295] = "AllEvents";
})(UIControl.Event || (UIControl.Event = {}));
var UIControl = /** @class */ (function (_super) {
    __extends(UIControl, _super);
    function UIControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionSegue = null;
        _this.target = null;
        _this.action = null;
        _this._enabled = true;
        _this._selected = false;
        // TODO: Make delegation of the methods above
        _this.mouseOverTarget = null;
        _this.mouseOverAction = null;
        _this.mouseOutTarget = null;
        _this.mouseOutAction = null;
        return _this;
    }
    UIControl.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        // Check for actions
        if (this.layer.childNodes.length > 0) {
            var _loop_1 = function (index) {
                var subLayer = this_1.layer.childNodes[index];
                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION")
                    return "continue";
                var actionSelector = subLayer.getAttribute("data-action-selector");
                if (actionSelector != null) {
                    this_1.addTarget(this_1, function () {
                        owner[actionSelector](this);
                    }, UIControl.Event.AllEvents);
                    return "break";
                }
            };
            var this_1 = this;
            for (var index = 0; index < this.layer.childNodes.length; index++) {
                var state_1 = _loop_1(index);
                if (state_1 === "break")
                    break;
            }
        }
    };
    UIControl.prototype._checkSegues = function () {
        _super.prototype._checkSegues.call(this);
        for (var index = 0; index < this._segues.length; index++) {
            var s = this._segues[index];
            var kind = s["Kind"];
            if (kind == "show") {
                if ((this.owner instanceof UIViewController) == false)
                    continue;
                this.actionSegue = {};
                this.actionSegue["VC"] = this.owner;
                this.actionSegue["Destination"] = s["Destination"];
                var identifier = s["Identifier"];
                if (identifier != null)
                    this.actionSegue["Identifier"] = identifier;
                this.addTarget(this, function () {
                    var fromVC = this.actionSegue["VC"];
                    var destination = this.actionSegue["Destination"];
                    var identifier = this.actionSegue["Identifier"];
                    var toVC = fromVC.storyboard._instantiateViewControllerWithDestination(destination);
                    var segue = new UIStoryboardSegue();
                    segue.initWithIdentifierAndPerformHandler(identifier, fromVC, toVC, function () {
                        fromVC.navigationController[0].pushViewController(toVC);
                    });
                    segue._sender = this;
                    segue.perform();
                }, UIControl.Event.AllEvents);
            }
        }
    };
    UIControl.prototype.addTarget = function (target, action, controlEvents) {
        this.target = target;
        this.action = action;
    };
    Object.defineProperty(UIControl.prototype, "enabled", {
        get: function () { return this._enabled; },
        set: function (value) { this.setEnabled(value); },
        enumerable: true,
        configurable: true
    });
    UIControl.prototype.setEnabled = function (enabled) {
        this._enabled = enabled;
        if (enabled == true)
            this.layer.style.opacity = "1.0";
        else
            this.layer.style.opacity = "0.10";
    };
    Object.defineProperty(UIControl.prototype, "selected", {
        get: function () {
            return this._selected;
        },
        set: function (value) {
            this.setSelected(value);
        },
        enumerable: true,
        configurable: true
    });
    UIControl.prototype.setSelected = function (value) {
        if (this._selected == value)
            return;
        this.willChangeValue("selected");
        if (value == true) {
            MUICoreLayerAddStyle(this.layer, "selected");
        }
        else {
            MUICoreLayerRemoveStyle(this.layer, "selected");
        }
        this._selected = value;
        this.didChangeValue("selected");
    };
    UIControl.prototype.setOnMouseOverAction = function (target, action) {
        this.mouseOverTarget = target;
        this.mouseOverAction = action;
        var instance = this;
        this.layer.onmouseover = function () {
            if (instance.enabled)
                instance.mouseOverAction.call(target);
        };
    };
    UIControl.prototype.setOnMouseOutAction = function (target, action) {
        this.mouseOutTarget = target;
        this.mouseOutAction = action;
        var instance = this;
        this.layer.onmouseout = function () {
            if (instance.enabled)
                instance.mouseOutAction.call(target);
        };
    };
    return UIControl;
}(UIView));
 
/**
 * Created by godshadow on 12/3/16.
 */
var UIButtonType;
(function (UIButtonType) {
    UIButtonType[UIButtonType["MomentaryPushIn"] = 0] = "MomentaryPushIn";
    UIButtonType[UIButtonType["PushOnPushOff"] = 1] = "PushOnPushOff";
    UIButtonType[UIButtonType["PushIn"] = 2] = "PushIn";
})(UIButtonType || (UIButtonType = {}));
var UIButton = /** @class */ (function (_super) {
    __extends(UIButton, _super);
    function UIButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._statusStyle = null;
        _this._titleStatusStyle = null;
        _this._titleLayer = null;
        _this._imageStatusStyle = null;
        _this._imageLayer = null;
        _this.type = UIButtonType.MomentaryPushIn;
        return _this;
    }
    UIButton.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayerAddStyle(this.layer, "btn");
        this.setupLayers();
    };
    UIButton.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        var type = this.layer.getAttribute("data-type");
        if (type == "MomentaryPushIn")
            this.type = UIButtonType.MomentaryPushIn;
        else if (type == "PushOnPushOff")
            this.type = UIButtonType.PushOnPushOff;
        else if (type == "PushIn")
            this.type = UIButtonType.PushIn;
        // Check for title layer
        this._titleLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "SPAN");
        // Check for img layer
        this._imageLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "IMG");
        if (this._imageLayer == null)
            this._imageLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "DIV");
        // Check for status
        var status = this.layer.getAttribute("data-status");
        if (status == "selected")
            this.setSelected(true);
        this.setupLayers();
    };
    UIButton.prototype.setupLayers = function () {
        //UICoreLayerRemoveStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "btn");
        if (this._titleLayer == null) {
            this._titleLayer = document.createElement("span");
            this.layer.appendChild(this._titleLayer);
        }
        var key = this.layer.getAttribute("data-title");
        if (key != null)
            this.setTitle(NSLocalizeString(key, key));
        // Prevent click
        this.layer.addEventListener("click", function (e) {
            e.stopPropagation();
        });
        this.layer.addEventListener("mousedown", function (e) {
            e.stopPropagation();
            if (this.enabled == false)
                return;
            switch (this.type) {
                case UIButtonType.MomentaryPushIn:
                case UIButtonType.PushIn:
                    this.setSelected(true);
                    break;
                case UIButtonType.PushOnPushOff:
                    this.setSelected(!this.selected);
                    break;
            }
        }.bind(this));
        this.layer.addEventListener("mouseup", function (e) {
            e.stopPropagation();
            if (this.enabled == false)
                return;
            if (this.type == UIButtonType.MomentaryPushIn)
                this.setSelected(false);
            if (this.action != null && this.target != null)
                this.action.call(this.target, this);
        }.bind(this));
    };
    UIButton.prototype.setTitle = function (title) {
        this._titleLayer.innerHTML = title;
    };
    Object.defineProperty(UIButton.prototype, "title", {
        get: function () {
            return this._titleLayer.innerHTML;
        },
        set: function (title) {
            this.setTitle(title);
        },
        enumerable: true,
        configurable: true
    });
    UIButton.prototype.setImageURL = function (urlString) {
        if (urlString != null) {
            this._imageLayer.setAttribute("src", urlString);
        }
        else {
            this._imageLayer.removeAttribute("src");
        }
    };
    return UIButton;
}(UIControl));
 
/**
 * Created by godshadow on 12/3/16.
 */
var UITextFieldType;
(function (UITextFieldType) {
    UITextFieldType[UITextFieldType["NormalType"] = 0] = "NormalType";
    UITextFieldType[UITextFieldType["PasswordType"] = 1] = "PasswordType";
    UITextFieldType[UITextFieldType["SearchType"] = 2] = "SearchType";
})(UITextFieldType || (UITextFieldType = {}));
var UITextField = /** @class */ (function (_super) {
    __extends(UITextField, _super);
    function UITextField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.placeHolder = null;
        _this._inputLayer = null;
        _this.type = UITextFieldType.NormalType;
        _this.textChangeTarget = null;
        _this.textChangeAction = null;
        _this._textChangeFn = null;
        _this.enterPressTarget = null;
        _this.enterPressAction = null;
        _this.keyPressTarget = null;
        _this.keyPressAction = null;
        _this.formatter = null;
        _this._textStopPropagationFn = null;
        _this.didBeginEditingAction = null;
        _this.didBeginEditingTarget = null;
        _this._textDidBeginEditingFn = null;
        _this.didEndEditingAction = null;
        _this.didEndEditingTarget = null;
        _this._textDidEndEditingFn = null;
        return _this;
    }
    UITextField.prototype.init = function () {
        _super.prototype.init.call(this);
        this._setupLayer();
    };
    UITextField.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this._inputLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "INPUT");
        this._setupLayer();
    };
    UITextField.prototype._setupLayer = function () {
        if (this._inputLayer == null) {
            this._inputLayer = document.createElement("input");
            switch (this.type) {
                case UITextFieldType.SearchType:
                    this._inputLayer.setAttribute("type", "search");
                    break;
                default:
                    this._inputLayer.setAttribute("type", "text");
                    break;
            }
            this.layer.appendChild(this._inputLayer);
        }
        var placeholderKey = this._inputLayer.getAttribute("data-placeholder");
        if (placeholderKey != null)
            this._inputLayer.setAttribute("placeholder", NSLocalizeString(placeholderKey, placeholderKey));
        this._registerInputEvent();
    };
    // layoutSubviews(){
    //     super.layoutSubviews();
    // var w = this.getWidth();
    // var h = this.getHeight();
    // this._inputLayer.style.marginLeft = "4px";
    // this._inputLayer.style.width = (w - 8) + "px";
    // this._inputLayer.style.marginTop = "4px";
    // this._inputLayer.style.height = (h - 8) + "px";
    //    }
    UITextField.prototype.setText = function (text) {
        this.text = _injectIntoOptional(text);
    };
    Object.defineProperty(UITextField.prototype, "text", {
        get: function () {
            return _injectIntoOptional(this._inputLayer.value);
        },
        set: function (text) {
            text = text[0];
            var newValue = text != null ? text : "";
            this._inputLayer.value = newValue;
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setPlaceholderText = function (text) {
        this.placeHolder = text;
        this._inputLayer.setAttribute("placeholder", text);
    };
    Object.defineProperty(UITextField.prototype, "placeholderText", {
        set: function (text) {
            this.setPlaceholderText(text);
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setOnChangeText = function (target, action) {
        this.textChangeTarget = target;
        this.textChangeAction = action;
    };
    UITextField.prototype._registerInputEvent = function () {
        var instance = this;
        this._textChangeFn = function () {
            if (instance.enabled)
                instance._textDidChange.call(instance);
        };
        this._textStopPropagationFn = function (e) {
            //instance._textDidBeginEditing();
            e.stopPropagation();
        };
        this._textDidBeginEditingFn = this._textDidBeginEditing.bind(this);
        this._textDidEndEditingFn = this._textDidEndEditing.bind(this);
        this.layer.addEventListener("input", this._textChangeFn);
        this.layer.addEventListener("click", this._textStopPropagationFn);
        this._inputLayer.addEventListener("focus", this._textDidBeginEditingFn);
        this._inputLayer.addEventListener("blur", this._textDidEndEditingFn);
    };
    UITextField.prototype._unregisterInputEvent = function () {
        this.layer.removeEventListener("input", this._textChangeFn);
        this.layer.removeEventListener("click", this._textStopPropagationFn);
        this._inputLayer.removeEventListener("focus", this._textDidBeginEditingFn);
        this._inputLayer.removeEventListener("blur", this._textDidEndEditingFn);
    };
    UITextField.prototype._textDidChange = function () {
        var _a;
        if (this.enabled == false)
            return;
        // Check the formater
        var value = this._inputLayer.value;
        if (this.formatter == null) {
            this._textDidChangeDelegate(value);
        }
        else {
            var result = void 0, newStr = void 0;
            _a = this.formatter.isPartialStringValid(value), result = _a[0], newStr = _a[1];
            this._unregisterInputEvent();
            this._inputLayer.value = newStr;
            this._registerInputEvent();
            if (result == true) {
                this._textDidChangeDelegate(value);
            }
        }
    };
    UITextField.prototype._textDidChangeDelegate = function (value) {
        if (this.textChangeAction != null && this.textChangeTarget != null)
            this.textChangeAction.call(this.textChangeTarget, this, value);
    };
    UITextField.prototype.setOnBeginEditing = function (target, action) {
        this.didBeginEditingTarget = target;
        this.didBeginEditingAction = action;
    };
    UITextField.prototype._textDidBeginEditing = function () {
        if (this.enabled == false)
            return;
        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);
        if (this.didBeginEditingTarget == null || this.didBeginEditingAction == null)
            return;
        this.didBeginEditingAction.call(this.didBeginEditingTarget, this, this.text[0]);
    };
    UITextField.prototype.setOnDidEndEditing = function (target, action) {
        this.didEndEditingTarget = target;
        this.didEndEditingAction = action;
    };
    UITextField.prototype._textDidEndEditing = function () {
        if (this.enabled == false)
            return;
        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);
        if (this.didEndEditingTarget == null || this.didEndEditingAction == null)
            return;
        this.didEndEditingAction.call(this.didEndEditingTarget, this, this.text[0]);
    };
    UITextField.prototype.setOnEnterPress = function (target, action) {
        this.enterPressTarget = target;
        this.enterPressAction = action;
        var instance = this;
        this.layer.onkeyup = function (e) {
            if (instance.enabled) {
                if (e.keyCode == 13)
                    instance.enterPressAction.call(target, instance, instance._inputLayer.value);
            }
        };
    };
    UITextField.prototype.setOnKeyPress = function (target, action) {
        this.keyPressTarget = target;
        this.keyPressAction = action;
        var instance = this;
        this.layer.onkeydown = function (e) {
            if (instance.enabled) {
                instance.keyPressAction.call(target, instance, e.keyCode);
            }
        };
    };
    UITextField.prototype.setTextRGBColor = function (r, g, b) {
        var value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._inputLayer.style.color = value;
    };
    Object.defineProperty(UITextField.prototype, "textColor", {
        get: function () {
            var color = this._getValueFromCSSProperty("color");
            return _injectIntoOptional(color);
        },
        set: function (color) {
            color = color[0];
            this._inputLayer.style.color = color;
        },
        enumerable: true,
        configurable: true
    });
    UITextField.prototype.setEnabled = function (value) {
        _super.prototype.setEnabled.call(this, value);
        this._inputLayer.readOnly = !value;
    };
    UITextField.prototype.becomeFirstResponder = function () {
        this._inputLayer.focus();
    };
    UITextField.prototype.resignFirstResponder = function () {
        this._inputLayer.blur();
    };
    UITextField.prototype.selectAll = function (control) {
        this._inputLayer.select();
    };
    return UITextField;
}(UIControl));
 
/**
 * Created by godshadow on 29/08/16.
 */
var UISegmentedControl = /** @class */ (function (_super) {
    __extends(UISegmentedControl, _super);
    function UISegmentedControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.segmentedItems = [];
        _this.selectedSegmentedIndex = -1;
        return _this;
    }
    UISegmentedControl.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        for (var index = 0; index < this.layer.childNodes.length; index++) {
            var itemLayer = this.layer.childNodes[index];
            if (itemLayer.tagName == "DIV") {
                var si = new UIButton();
                si.initWithLayer(itemLayer, owner);
                si.type = UIButtonType.PushIn;
                this._addSegmentedItem(si);
                MUIOutletRegister(owner, si.layerID, si);
            }
        }
        if (this.segmentedItems.length > 0) {
            var item = this.segmentedItems[0];
            item.setSelected(true);
            this.selectedSegmentedIndex = 0;
        }
    };
    UISegmentedControl.prototype._addSegmentedItem = function (item) {
        this.segmentedItems.push(item);
        item.setAction(this, this._didClickSegmentedButton);
    };
    UISegmentedControl.prototype._didClickSegmentedButton = function (button) {
        var index = this.segmentedItems.indexOf(button);
        this.selectSegmentedAtIndex(index);
        if (this.mouseOutTarget != null)
            this.mouseOutAction.call(this.mouseOutTarget, this, index);
    };
    UISegmentedControl.prototype.setAction = function (target, action) {
        this.mouseOutTarget = target;
        this.mouseOutAction = action;
    };
    UISegmentedControl.prototype.selectSegmentedAtIndex = function (index) {
        if (this.selectedSegmentedIndex == index)
            return;
        if (this.selectedSegmentedIndex > -1) {
            var lastItem = this.segmentedItems[this.selectedSegmentedIndex];
            lastItem.setSelected(false);
        }
        this.selectedSegmentedIndex = index;
        var item = this.segmentedItems[this.selectedSegmentedIndex];
        item.setSelected(true);
    };
    return UISegmentedControl;
}(UIControl));
 
/**
 * Created by godshadow on 12/3/16.
 */
var UISwitch = /** @class */ (function (_super) {
    __extends(UISwitch, _super);
    function UISwitch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._inputLayer = null;
        _this._labelLayer = null;
        _this._on = false;
        return _this;
    }
    UISwitch.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.layer.classList.add("switch_button");
        this._inputLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "INPUT");
        if (this._inputLayer == null) {
            this._inputLayer = document.createElement("input");
            this._inputLayer.setAttribute("type", "checkbox");
            this._inputLayer.setAttribute("id", this.layerID + "_input");
            this._inputLayer.classList.add("switch_button_input");
            layer.appendChild(this._inputLayer);
        }
        var instance = this;
        this.layer.onclick = function () {
            if (instance.enabled) {
                instance._toggleValue.call(instance);
            }
        };
    };
    UISwitch.prototype.setOnChangeValue = function (target, action) {
        this.target = target;
        this.action = action;
    };
    Object.defineProperty(UISwitch.prototype, "isOn", {
        get: function () { return this._on; },
        set: function (value) { this.setOn(value); },
        enumerable: true,
        configurable: true
    });
    UISwitch.prototype.setOn = function (value) {
        if (value == this._on)
            return;
        this._inputLayer.checked = value;
        this._on = value;
    };
    UISwitch.prototype._toggleValue = function () {
        this.isOn = !this.isOn;
        if (this.target != null && this.action != null)
            this.action.call(this.target, this, this.isOn);
    };
    return UISwitch;
}(UIControl));
 
var UIViewController = /** @class */ (function (_super) {
    __extends(UIViewController, _super);
    function UIViewController(layerID) {
        var _this = _super.call(this) || this;
        _this.layerID = null;
        _this.view = _injectIntoOptional(null);
        _this._htmlResourcePath = null;
        _this._onViewLoadedTarget = null;
        _this._onViewLoadedAction = null;
        _this._onLoadLayerTarget = null;
        _this._onLoadLayerAction = null;
        _this._viewIsLoaded = false;
        _this._layerIsReady = false;
        _this._childViewControllers = [];
        _this.parentViewController = null;
        _this.presentingViewController = _injectIntoOptional(null);
        _this.presentedViewController = _injectIntoOptional(null);
        _this.navigationController = _injectIntoOptional(null);
        _this.navigationItem = null;
        _this.splitViewController = _injectIntoOptional(null);
        _this.tabBarController = _injectIntoOptional(null);
        _this.modalPresentationStyle = MIOCoreIsPhone() == true ? UIModalPresentationStyle.FullScreen : UIModalPresentationStyle.PageSheet;
        _this.modalTransitionStyle = UIModalTransitionStyle.CoverVertical;
        _this.transitioningDelegate = null;
        _this._contentSize = new NSSize(320, 200);
        _this._preferredContentSize = null;
        // removeFromParentViewController()
        // {
        //     this.parent.removeChildViewController(this);
        //     this.parent = null;
        //     this.view.removeFromSuperview();
        //     //this.didMoveToParentViewController(null);
        // }
        _this._presentationController = null;
        _this._popoverPresentationController = null;
        // Storyboard
        _this.storyboard = null;
        _this._outlets = {};
        _this._segues = [];
        _this.layerID = layerID ? layerID : MUICoreLayerIDFromObject(_this);
        return _this;
    }
    UIViewController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.loadView();
    };
    UIViewController.prototype.initWithCoder = function (coder) {
    };
    UIViewController.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.init.call(this);
        var viewLayer = MUICoreLayerGetFirstElementWithTag(layer, "DIV");
        this.view = _injectIntoOptional(new UIView());
        this.view[0].initWithLayer(viewLayer, owner, options);
        this.view[0]._checkSegues();
        // Search for navigation item
        //this.navigationItem = UINavItemSearchInLayer(layer);        
        this.loadView();
    };
    UIViewController.prototype.initWithResource = function (path) {
        if (path == null)
            throw new Error("UIViewController:initWithResource can't be null");
        _super.prototype.init.call(this);
        this._htmlResourcePath = path;
        this.loadView();
    };
    UIViewController.prototype.localizeSubLayers = function (layers) {
        if (layers.length == 0)
            return;
        for (var index = 0; index < layers.length; index++) {
            var layer = layers[index];
            if (layer.tagName != "DIV")
                continue;
            var key = layer.getAttribute("data-localize-key");
            if (key != null)
                layer.innerHTML = NSLocalizeString(key, key);
            this.localizeSubLayers(layer.childNodes);
        }
    };
    UIViewController.prototype.localizeLayerIDWithKey = function (layerID, key) {
        var layer = MUICoreLayerSearchElementByID(this.view[0].layer, layerID);
        layer.innerHTML = NSLocalizeString(key, key);
    };
    UIViewController.prototype.loadView = function () {
        if (this.view[0] != null) {
            this._didLoadView();
            return;
        }
        this.view = _injectIntoOptional(new UIView(this.layerID));
        if (this._htmlResourcePath == null) {
            this.view[0].init();
            MUICoreLayerAddStyle(this.view[0].layer, "page");
            this._didLoadView();
            return;
        }
        MUICoreBundleLoadNibName(this._htmlResourcePath, this, function (layer) {
            this.view[0].initWithLayer(layer, this);
            this.view[0].awakeFromHTML();
            this.view[0]._checkSegues();
            this._didLoadView();
        });
        // let mainBundle = NSBundle.mainBundle();
        // mainBundle.loadNibNamed(this._htmlResourcePath, this, null);
        // mainBundle.loadHTMLNamed(this._htmlResourcePath, this.layerID, this, function (layer) {            
        //     let domParser = new DOMParser();
        //     let items = domParser.parseFromString(layerData, "text/html");
        //     let layer = items.getElementById(layerID);
        //     if (target != null && completion != null)
        //         completion.call(target, layer);
        //     // Search for navigation item
        //     this.navigationItem = UINavItemSearchInLayer(layer);
        //     this.view.initWithLayer(layer);
        //     this.view.awakeFromHTML();
        //     this._didLoadView();
        // });        
    };
    UIViewController.prototype._didLoadNibWithLayer = function (layerData) {
        var domParser = new DOMParser();
        var items = domParser.parseFromString(layerData, "text/html");
        var layer = items.getElementById("kk");
        //this.navigationItem = UINavItemSearchInLayer(layer);
        this.view[0].initWithLayer(layer, this);
        this.view[0].awakeFromHTML();
        this._didLoadView();
    };
    UIViewController.prototype._didLoadView = function () {
        this._layerIsReady = true;
        if (MIOCoreIsPhone() == true)
            MUICoreLayerAddStyle(this.view[0].layer, "phone");
        MUICoreStoryboardParseLayer(this.view[0].layer, this);
        this._checkSegues();
        if (this._onLoadLayerTarget != null && this._onViewLoadedAction != null) {
            this._onLoadLayerAction.call(this._onLoadLayerTarget);
            this._onLoadLayerTarget = null;
            this._onLoadLayerAction = null;
        }
        if (this._onViewLoadedAction != null && this._onViewLoadedTarget != null) {
            this.viewDidLoad();
            this._loadChildControllers();
        }
    };
    UIViewController.prototype._loadChildControllers = function () {
        var count = this._childViewControllers.length;
        if (count > 0)
            this._loadChildViewController(0, count);
        else
            this._setViewLoaded(true);
    };
    UIViewController.prototype._loadChildViewController = function (index, max) {
        if (index < max) {
            var vc = this._childViewControllers[index];
            vc.onLoadView(this, function () {
                var newIndex = index + 1;
                this._loadChildViewController(newIndex, max);
            });
        }
        else {
            this._setViewLoaded(true);
        }
    };
    UIViewController.prototype._setViewLoaded = function (value) {
        this.willChangeValue("viewLoaded");
        this._viewIsLoaded = value;
        this.didChangeValue("viewLoaded");
        if (value == true && this._onViewLoadedAction != null) {
            this._onViewLoadedAction.call(this._onViewLoadedTarget);
        }
        this._onViewLoadedTarget = null;
        this._onViewLoadedAction = null;
        this.view[0].setNeedsDisplay();
    };
    UIViewController.prototype.onLoadView = function (target, action) {
        this._onViewLoadedTarget = target;
        this._onViewLoadedAction = action;
        if (this._viewIsLoaded == true) {
            action.call(target);
            //this.view.setNeedsDisplay();
        }
        else if (this._layerIsReady == true) {
            this.viewDidLoad();
            this._loadChildControllers();
            //this.view.setNeedsDisplay();
        }
    };
    UIViewController.prototype.onLoadLayer = function (target, action) {
        if (this._layerIsReady == true) {
            action.call(target);
        }
        else {
            this._onLoadLayerTarget = action;
            this._onLoadLayerAction = target;
        }
    };
    Object.defineProperty(UIViewController.prototype, "viewIsLoaded", {
        get: function () {
            return this._viewIsLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "childViewControllers", {
        get: function () {
            return this._childViewControllers;
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.addChildViewController = function (vc) {
        vc.parentViewController = this;
        this._childViewControllers.push(vc);
        //vc.willMoveToParentViewController(this);
    };
    UIViewController.prototype.removeChildViewController = function (vc) {
        var index = this._childViewControllers.indexOf(vc);
        if (index != -1) {
            this._childViewControllers.splice(index, 1);
            vc.parentViewController = null;
        }
    };
    Object.defineProperty(UIViewController.prototype, "isPresented", {
        get: function () {
            if (this._presentationController != null)
                return this._presentationController._isPresented;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "presentationController", {
        get: function () {
            // if (this._presentationController == null && this.parentViewController != null)
            //     return this.parentViewController.presentationController;
            return _injectIntoOptional(this._presentationController);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "popoverPresentationController", {
        get: function () {
            if (this._popoverPresentationController == null) {
                this._popoverPresentationController = new UIPopoverPresentationController();
                this._popoverPresentationController.init();
                this._popoverPresentationController.presentedViewController = this;
                this._presentationController = this._popoverPresentationController;
            }
            return _injectIntoOptional(this._popoverPresentationController);
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.showViewController = function (vc, animated) {
        vc.onLoadView(this, function () {
            this.view.addSubview(vc.view);
            this.addChildViewController(vc);
            _MUIShowViewController(this, vc, this, animated);
        });
    };
    UIViewController.prototype.presentViewController = function (vc, animated) {
        var pc = vc.presentationController[0];
        if (pc == null) {
            pc = new UIPresentationController();
            pc.init();
            pc.presentedViewController = vc;
            pc.presentingViewController = this;
            vc._presentationController = pc;
        }
        if (pc.presentingViewController == null) {
            pc.presentingViewController = this;
        }
        if (pc._isPresented == true) {
            throw new Error("You try to present a view controller that is already presented");
        }
        // if (vc.modalPresentationStyle == UIModalPresentationStyle.CurrentContext){            
        //     vc.modalPresentationStyle = MIOCoreIsPhone() == true ? UIModalPresentationStyle.FullScreen : UIModalPresentationStyle.PageSheet;
        // }
        // if (vc.modalPresentationStyle != UIModalPresentationStyle.FullScreen 
        //     && vc.modalPresentationStyle != UIModalPresentationStyle.FormSheet
        //     && vc.modalPresentationStyle != UIModalPresentationStyle.PageSheet
        //     && vc.modalPresentationStyle != UIModalPresentationStyle.Popover
        //     && vc.modalPresentationStyle != UIModalPresentationStyle.Custom)
        //     vc.modalPresentationStyle = UIModalPresentationStyle.PageSheet;
        vc.onLoadView(this, function () {
            if (vc.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
                this.view.addSubview(vc.presentationController[0].presentedView[0]);
                this.addChildViewController(vc);
                _MUIShowViewController(this, vc, null, animated, this, function () {
                });
            }
            else {
                // It's a window instead of a view
                var w_1 = pc.window;
                if (w_1 == null) {
                    w_1 = new UIWindow();
                    w_1.init();
                    w_1.layer.style.background = "";
                    w_1.rootViewController = _injectIntoOptional(vc);
                    w_1.addSubview(pc.presentedView[0]);
                    pc.window = w_1;
                }
                w_1.setHidden(false);
                _MUIShowViewController(this, vc, null, animated, this, function () {
                    w_1.makeKey();
                });
            }
        });
    };
    UIViewController.prototype.dismissViewController = function (animate) {
        var pc = this._presentationController;
        var vc = this;
        while (pc == null) {
            vc = vc.parentViewController;
            pc = vc._presentationController;
        }
        var toVC = pc.presentingViewController;
        var fromVC = pc.presentedViewController;
        var fromView = pc.presentedView[0];
        _MUIHideViewController(fromVC, toVC, null, this, function () {
            if (fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
                toVC.removeChildViewController(fromVC);
                var pc1 = fromVC.presentationController[0];
                var view = pc1.presentedView[0];
                view.removeFromSuperview();
            }
            else {
                // It's a window instead of a view
                var pc1 = fromVC.presentationController[0];
                var w = pc1.window;
                w.setHidden(true);
            }
        });
    };
    UIViewController.prototype.transitionFromViewControllerToViewController = function (fromVC, toVC, duration, animationType, target, completion) {
        //TODO
    };
    UIViewController.prototype.viewDidLoad = function () { };
    UIViewController.prototype.viewWillAppear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillAppear(animated);
        }
        this.view[0].setViewIsVisible(true);
    };
    UIViewController.prototype.viewDidAppear = function (animated) {
        //this.view.setNeedsDisplay();
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidAppear(animated);
        }
    };
    UIViewController.prototype.viewWillDisappear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewWillDisappear(animated);
        }
        this.view[0].setViewIsVisible(false);
    };
    UIViewController.prototype.viewDidDisappear = function (animated) {
        for (var index = 0; index < this._childViewControllers.length; index++) {
            var vc = this._childViewControllers[index];
            vc.viewDidDisappear(animated);
        }
    };
    UIViewController.prototype.contentHeight = function () {
        return this.view[0].getHeight();
    };
    UIViewController.prototype.setContentSize = function (size) {
        this.willChangeValue("contentSize");
        this._contentSize = size;
        this.didChangeValue("contentSize");
    };
    Object.defineProperty(UIViewController.prototype, "contentSize", {
        get: function () {
            return this._contentSize;
        },
        set: function (size) {
            this.setContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIViewController.prototype, "preferredContentSize", {
        get: function () {
            return this._preferredContentSize;
        },
        set: function (size) {
            this.setPreferredContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    UIViewController.prototype.setPreferredContentSize = function (size) {
        this.willChangeValue("preferredContentSize");
        this._preferredContentSize = size;
        this.didChangeValue("preferredContentSize");
    };
    UIViewController.prototype._checkSegues = function () {
    };
    UIViewController.prototype.shouldPerformSegueWithIdentifier = function (identifier, sender) {
        return true;
    };
    UIViewController.prototype.prepareForSegue = function (segue, sender) {
    };
    UIViewController.prototype.performSegueWithIdentifier = function (identifier, sender) {
    };
    return UIViewController;
}(NSObject));
 
/**
 * Created by godshadow on 06/12/2016.
 */
var UIModalPresentationStyle;
(function (UIModalPresentationStyle) {
    UIModalPresentationStyle[UIModalPresentationStyle["FullScreen"] = 0] = "FullScreen";
    UIModalPresentationStyle[UIModalPresentationStyle["PageSheet"] = 1] = "PageSheet";
    UIModalPresentationStyle[UIModalPresentationStyle["FormSheet"] = 2] = "FormSheet";
    UIModalPresentationStyle[UIModalPresentationStyle["CurrentContext"] = 3] = "CurrentContext";
    UIModalPresentationStyle[UIModalPresentationStyle["Custom"] = 4] = "Custom";
    UIModalPresentationStyle[UIModalPresentationStyle["OverFullScreen"] = 5] = "OverFullScreen";
    UIModalPresentationStyle[UIModalPresentationStyle["OverCurrentContext"] = 6] = "OverCurrentContext";
    UIModalPresentationStyle[UIModalPresentationStyle["Popover"] = 7] = "Popover";
    UIModalPresentationStyle[UIModalPresentationStyle["None"] = 8] = "None";
})(UIModalPresentationStyle || (UIModalPresentationStyle = {}));
var UIModalTransitionStyle;
(function (UIModalTransitionStyle) {
    UIModalTransitionStyle[UIModalTransitionStyle["CoverVertical"] = 0] = "CoverVertical";
    UIModalTransitionStyle[UIModalTransitionStyle["FlipHorizontal"] = 1] = "FlipHorizontal";
    UIModalTransitionStyle[UIModalTransitionStyle["CrossDisolve"] = 2] = "CrossDisolve";
})(UIModalTransitionStyle || (UIModalTransitionStyle = {}));
var UIPresentationController = /** @class */ (function (_super) {
    __extends(UIPresentationController, _super);
    function UIPresentationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.presentationStyle = UIModalPresentationStyle.PageSheet;
        _this.shouldPresentInFullscreen = false;
        _this._presentedViewController = null; //ToVC
        _this.presentingViewController = null; //FromVC
        _this.presentedView = _injectIntoOptional(null);
        _this._transitioningDelegate = null;
        _this._window = null;
        _this._isPresented = false;
        return _this;
    }
    UIPresentationController.prototype.initWithPresentedViewControllerAndPresentingViewController = function (presentedViewController, presentingViewController) {
        _super.prototype.init.call(this);
        this.presentedViewController = presentedViewController;
        this.presentingViewController = presentingViewController;
    };
    UIPresentationController.prototype.setPresentedViewController = function (vc) {
        this._presentedViewController = vc;
        this.presentedView = _inview[0];
        IntoOptional(vc.view);
    };
    Object.defineProperty(UIPresentationController.prototype, "presentedViewController", {
        get: function () {
            return this._presentedViewController;
        },
        set: function (vc) {
            this.setPresentedViewController(vc);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIPresentationController.prototype, "transitioningDelegate", {
        get: function () {
            if (this._transitioningDelegate == null) {
                this._transitioningDelegate = new MUIModalTransitioningDelegate();
                this._transitioningDelegate.init();
            }
            return this._transitioningDelegate;
        },
        enumerable: true,
        configurable: true
    });
    UIPresentationController.prototype.presentationTransitionWillBegin = function () {
        var toVC = this.presentedViewController;
        var view = this.presentedView[0];
        this._calculateFrame();
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
            || MIOCoreIsPhone() == true) {
            MUICoreLayerAddStyle(view.layer, "modal_window");
        }
    };
    UIPresentationController.prototype.presentationTransitionDidEnd = function (completed) {
    };
    UIPresentationController.prototype.dismissalTransitionWillBegin = function () {
    };
    UIPresentationController.prototype.dismissalTransitionDidEnd = function (completed) {
    };
    UIPresentationController.prototype._calculateFrame = function () {
        var fromVC = this.presentingViewController;
        var toVC = this.presentedViewController;
        var view = this.presentedView[0];
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            view.layer.style.left = "0px";
            view.layer.style.top = "0px";
            view.layer.style.width = "100%";
            view.layer.style.height = "100%";
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
            var w = fromVC.view.getWidth();
            var h = fromVC.view.getHeight();
            view.setFrame(NSRect.rectWithValues(0, 0, w, h));
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet) {
            // Present like desktop sheet window
            var ws = MUIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new NSSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            view.setFrame(NSRect.rectWithValues(0, 0, w, h));
            this.window.setFrame(NSRect.rectWithValues(x, 0, w, h));
            view.layer.classList.add("modal");
        }
        else if (toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet) {
            // Present at the center of the screen
            var ws = MUIWindowSize();
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new NSSize(320, 200);
            var w = size.width;
            var h = size.height;
            var x = (ws.width - w) / 2;
            var y = (ws.height - h) / 2;
            view.setFrame(NSRect.rectWithValues(0, 0, w, h));
            this.window.setFrame(NSRect.rectWithValues(x, y, w, h));
            view.layer.classList.add("modal");
        }
        else {
            var size = toVC.preferredContentSize;
            if (size == null)
                size = new NSSize(320, 200);
            var w = size.width;
            var h = size.height;
            view.setFrame(NSRect.rectWithValues(0, 0, w, h));
        }
    };
    Object.defineProperty(UIPresentationController.prototype, "window", {
        get: function () {
            return this._window;
        },
        set: function (window) {
            var vc = this.presentedViewController;
            this._window = window;
            // Track view frame changes
            if (MIOCoreIsMobile() == false && vc.modalPresentationStyle != UIModalPresentationStyle.CurrentContext) {
                vc.addObserver(this, "preferredContentSize");
            }
        },
        enumerable: true,
        configurable: true
    });
    UIPresentationController.prototype.observeValueForKeyPath = function (key, type, object) {
        if (key == "preferredContentSize" && type == "did") {
            var vc = this.presentedView[0];
            //this.window.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            vc.layer.style.transition = "left 0.25s, width 0.25s, height 0.25s";
            this._calculateFrame();
        }
    };
    return UIPresentationController;
}(NSObject));
 
var MUIModalTransitioningDelegate = /** @class */ (function (_super) {
    __extends(MUIModalTransitioningDelegate, _super);
    function MUIModalTransitioningDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modalTransitionStyle = null;
        _this._presentAnimationController = null;
        _this._dissmissAnimationController = null;
        return _this;
    }
    MUIModalTransitioningDelegate.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._presentAnimationController == null) {
            this._presentAnimationController = new UIModalPresentAnimationController();
            this._presentAnimationController.init();
        }
        return this._presentAnimationController;
    };
    MUIModalTransitioningDelegate.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._dissmissAnimationController == null) {
            this._dissmissAnimationController = new UIModalDismissAnimationController();
            this._dissmissAnimationController.init();
        }
        return this._dissmissAnimationController;
    };
    return MUIModalTransitioningDelegate;
}(NSObject));
 
var MUIAnimationController = /** @class */ (function (_super) {
    __extends(MUIAnimationController, _super);
    function MUIAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MUIAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0;
    };
    MUIAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions        
    };
    MUIAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MUIAnimationController.prototype.animations = function (transitionContext) {
        return null;
    };
    return MUIAnimationController;
}(NSObject));
 
var UIModalPresentAnimationController = /** @class */ (function (_super) {
    __extends(UIModalPresentAnimationController, _super);
    function UIModalPresentAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIModalPresentAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.15;
    };
    UIModalPresentAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions
    };
    UIModalPresentAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIModalPresentAnimationController.prototype.animations = function (transitionContext) {
        var animations = null;
        var toVC = transitionContext.presentedViewController;
        if (toVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            if (MIOCoreIsPhone() == true)
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideInUp);
            else
                animations = MUIClassListForAnimationType(MUIAnimationType.BeginSheet);
        }
        return animations;
    };
    return UIModalPresentAnimationController;
}(NSObject));
 
var UIModalDismissAnimationController = /** @class */ (function (_super) {
    __extends(UIModalDismissAnimationController, _super);
    function UIModalDismissAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIModalDismissAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    UIModalDismissAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    UIModalDismissAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    UIModalDismissAnimationController.prototype.animations = function (transitionContext) {
        var animations = null;
        var fromVC = transitionContext.presentingViewController;
        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.PageSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FormSheet
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen) {
            if (MIOCoreIsPhone() == true)
                animations = MUIClassListForAnimationType(MUIAnimationType.SlideOutDown);
            else
                animations = MUIClassListForAnimationType(MUIAnimationType.EndSheet);
        }
        return animations;
    };
    return UIModalDismissAnimationController;
}(NSObject));
 
/**
 * Created by godshadow on 11/11/2016.
 */
var UIPopoverArrowDirection;
(function (UIPopoverArrowDirection) {
    UIPopoverArrowDirection[UIPopoverArrowDirection["Any"] = 0] = "Any";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Up"] = 1] = "Up";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Down"] = 2] = "Down";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Left"] = 3] = "Left";
    UIPopoverArrowDirection[UIPopoverArrowDirection["Right"] = 4] = "Right";
})(UIPopoverArrowDirection || (UIPopoverArrowDirection = {}));
var UIPopoverPresentationController = /** @class */ (function (_super) {
    __extends(UIPopoverPresentationController, _super);
    function UIPopoverPresentationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.permittedArrowDirections = UIPopoverArrowDirection.Any;
        _this.sourceView = _injectIntoOptional(null);
        _this.sourceRect = NSRect.Zero();
        _this.delegate = null;
        _this._contentSize = null;
        _this._canvasLayer = null;
        _this._contentView = null;
        return _this;
    }
    Object.defineProperty(UIPopoverPresentationController.prototype, "transitioningDelegate", {
        get: function () {
            if (this._transitioningDelegate == null) {
                this._transitioningDelegate = new MIOModalPopOverTransitioningDelegate();
                this._transitioningDelegate.init();
            }
            return this._transitioningDelegate;
        },
        enumerable: true,
        configurable: true
    });
    UIPopoverPresentationController.prototype.presentationTransitionWillBegin = function () {
        //if (MIOCoreIsPhone() == true) return;
        this._calculateFrame();
        MUICoreLayerAddStyle(this.presentedView[0].layer, "popover_window");
    };
    UIPopoverPresentationController.prototype.dismissalTransitionDidEnd = function (completed) {
        if (completed == false)
            return;
        if (this.delegate != null && (typeof this.delegate.popoverPresentationControllerDidDismissPopover === "function")) {
            this.delegate.popoverPresentationControllerDidDismissPopover(this);
        }
    };
    UIPopoverPresentationController.prototype._calculateFrame = function () {
        var vc = this.presentedViewController;
        var view = this.presentedView[0];
        var w = vc.preferredContentSize.width;
        var h = vc.preferredContentSize.height;
        var v = vc.popoverPresentationController[0].sourceView[0];
        var f = vc.popoverPresentationController[0].sourceRect;
        var xShift = false;
        // Below
        var y = v.layer.getBoundingClientRect().top + f.size.height + 10;
        if ((y + h) > window.innerHeight) // Below no, Up?
            y = v.layer.getBoundingClientRect().top - h - 10;
        if (y < 0) // Up no, horizonal shift
         {
            xShift = true;
            y = (window.innerHeight - h) / 2;
        }
        var x = 0;
        if (xShift == false) {
            x = v.layer.getBoundingClientRect().left + 10;
            if ((x + w) > window.innerWidth)
                x = v.layer.getBoundingClientRect().left + f.size.width - w + 10;
        }
        else {
            x = v.layer.getBoundingClientRect().left + f.size.width + 10;
            if ((x + w) > window.innerWidth)
                x = v.layer.getBoundingClientRect().left - w - 10;
        }
        view.setFrame(NSRect.rectWithValues(0, 0, w, h));
        this.window.setFrame(NSRect.rectWithValues(x, y, w, h));
    };
    UIPopoverPresentationController.prototype._drawRoundRect = function (x, y, width, height, radius) {
        var ctx = this._canvasLayer.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        var color = 'rgba(208, 208, 219, 1)';
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
    };
    return UIPopoverPresentationController;
}(UIPresentationController));
 
var MIOModalPopOverTransitioningDelegate = /** @class */ (function (_super) {
    __extends(MIOModalPopOverTransitioningDelegate, _super);
    function MIOModalPopOverTransitioningDelegate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modalTransitionStyle = null;
        _this._showAnimationController = null;
        _this._dissmissAnimationController = null;
        return _this;
    }
    MIOModalPopOverTransitioningDelegate.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._showAnimationController == null) {
            // if (MIOCoreIsPhone() == false) {
            this._showAnimationController = new MIOPopOverPresentAnimationController();
            this._showAnimationController.init();
            // }
            // else {
            //     this._showAnimationController = new MIOModalPresentAnimationController();
            //     this._showAnimationController.init();
            // }
        }
        return this._showAnimationController;
    };
    MIOModalPopOverTransitioningDelegate.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._dissmissAnimationController == null) {
            //            if (MIOCoreIsPhone() == false) {
            this._dissmissAnimationController = new MIOPopOverDismissAnimationController();
            this._dissmissAnimationController.init();
            // }
            // else {
            //     this._dissmissAnimationController = new MIOModalDismissAnimationController();
            //     this._dissmissAnimationController.init();    
            // }
        }
        return this._dissmissAnimationController;
    };
    return MIOModalPopOverTransitioningDelegate;
}(NSObject));
 
var MIOPopOverPresentAnimationController = /** @class */ (function (_super) {
    __extends(MIOPopOverPresentAnimationController, _super);
    function MIOPopOverPresentAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOPopOverPresentAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MIOPopOverPresentAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions
    };
    MIOPopOverPresentAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOPopOverPresentAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.FadeIn);
        return animations;
    };
    return MIOPopOverPresentAnimationController;
}(NSObject));
 
var MIOPopOverDismissAnimationController = /** @class */ (function (_super) {
    __extends(MIOPopOverDismissAnimationController, _super);
    function MIOPopOverDismissAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MIOPopOverDismissAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MIOPopOverDismissAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    MIOPopOverDismissAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MIOPopOverDismissAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.FadeOut);
        return animations;
    };
    return MIOPopOverDismissAnimationController;
}(NSObject));
 
var UINavigationBar = /** @class */ (function (_super) {
    __extends(UINavigationBar, _super);
    function UINavigationBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._items = [];
        return _this;
    }
    UINavigationBar.prototype.init = function () {
        _super.prototype.init.call(this);
        this.setup();
    };
    UINavigationBar.prototype.initWithLayer = function (layer, owner, options) {
        _super.prototype.initWithLayer.call(this, layer, owner, options);
        this.setup();
    };
    UINavigationBar.prototype.setup = function () {
        MUICoreLayerAddStyle(this.layer, "navbar");
    };
    Object.defineProperty(UINavigationBar.prototype, "items", {
        get: function () { return _injectIntoOptional(this._items); },
        enumerable: true,
        configurable: true
    });
    UINavigationBar.prototype.setItems = function (items, animated) {
        this._items = items;
        //TODO: Animate!!!
    };
    UINavigationBar.prototype.pushNavigationItem = function (item, animated) {
        this.items[0].addObject(item);
        // TODO: Make the animation and change the items
    };
    UINavigationBar.prototype.popNavigationItem = function (item, animated) {
        this.items[0].removeObject(item);
        // TODO: Make the animation and change the items
    };
    Object.defineProperty(UINavigationBar.prototype, "topItem", {
        get: function () {
            if (this.items[0].length == 0)
                return null;
            return _injeitems[0];
            oOptioitems[0];
            his.items[this.items.length - 1];
            ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UINavigationBar.prototype, "backItem", {
        get: function () {
            if (this.items[0].length < 2)
                return null;
            return _injectIntoOptional(this.items[this.items.length - 2]);
            h - 2;
            ;
        },
        enumerable: true,
        configurable: true
    });
    return UINavigationBar;
}(UIView));
 
var UINavigationItem = /** @class */ (function (_super) {
    __extends(UINavigationItem, _super);
    function UINavigationItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.backBarButtonItem = _injectIntoOptional(null);
        _this.titleView = _injectIntoOptional(null);
        _this.title = _injectIntoOptional(null);
        _this.leftView = null;
        _this.rightView = null;
        return _this;
    }
    UINavigationItem.prototype.initWithLayer = function (layer) {
        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];
                if (subLayer.tagName != "DIV")
                    continue;
                if (subLayer.getAttribute("data-nav-item-left") != null) {
                    var v = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.leftView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-center") != null) {
                    var v = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.titleView = _injectIntoOptional(v);
                }
                else if (subLayer.getAttribute("data-nav-item-right") != null) {
                    var v = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.rightView = v;
                }
            }
            var backButtonLayer = MUICoreLayerSearchElementByAttribute(layer, "data-nav-item-back");
            if (backButtonLayer != null) {
                this.backBarButtonItem = _injectIntoOptional(new UIButton());
                this.backBarButtonItem[0].initWithLayer(backButtonLayer, this);
            }
        }
    };
    return UINavigationItem;
}(NSObject));
 
function UINavItemSearchInLayer(layer) {
    if (layer.childNodes.length > 0) {
        for (var index = 0; index < layer.childNodes.length; index++) {
            var subLayer = layer.childNodes[index];
            if (subLayer.tagName != "DIV")
                continue;
            if (subLayer.getAttribute("data-nav-item") != null) {
                var ni = new UINavigationItem();
                ni.initWithLayer(subLayer);
                // Check for tittle if center view doesn't exists
                if (ni.titleView[0] == null) {
                    var title = subLayer.getAttribute("data-nav-item-title");
                    if (title != null)
                        ni.title = _injectIntoOptional(title);
                }
                return ni;
            }
        }
    }
    return null;
}
 
/**
 * Created by godshadow on 9/4/16.
 */
var UINavigationController = /** @class */ (function (_super) {
    __extends(UINavigationController, _super);
    function UINavigationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootViewController = null;
        _this.viewControllersStack = [];
        _this.currentViewControllerIndex = -1;
        // Transitioning delegate
        _this._pushAnimationController = null;
        _this._popAnimationController = null;
        return _this;
    }
    UINavigationController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.view[0].layer.style.overflow = "hidden";
    };
    UINavigationController.prototype.initWithRootViewController = function (vc) {
        this.init();
        this.setRootViewController(vc);
    };
    UINavigationController.prototype.setRootViewController = function (vc) {
        //this.transitioningDelegate = this;
        this.rootViewController = vc;
        this.view[0].addSubview(vc.view[0]);
        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex = 0;
        this.rootViewController.navigationController = this;
        this.addChildViewController(vc);
        // if (this.presentationController != null) {
        //     var size = vc.preferredContentSize;
        //     this.contentSize = size;
        // }
    };
    UINavigationController.prototype.viewWillAppear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewWillAppear(animated);
    };
    UINavigationController.prototype.viewDidAppear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewDidAppear(animated);
    };
    UINavigationController.prototype.viewWillDisappear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewWillDisappear(animated);
    };
    UINavigationController.prototype.viewDidDisappear = function (animated) {
        if (this.currentViewControllerIndex < 0)
            return;
        var vc = this.viewControllersStack[this.currentViewControllerIndex];
        vc.viewDidDisappear(animated);
    };
    UINavigationController.prototype.pushViewController = function (vc, animated) {
        var lastVC = this.viewControllersStack[this.currentViewControllerIndex];
        this.viewControllersStack.push(vc);
        this.currentViewControllerIndex++;
        vc.navigationController = _injectIntoOptional(this);
        vc.onLoadView(this, function () {
            if (vc.navigationItem != null && vc.navigationItem.backBarButtonItem[0] != null) {
                vc.navigationItem.backBarButtonItem[0].addTarget(this, function () {
                    vc.navigationController[0].popViewController();
                }, UIControl.Event.AllTouchEvents);
            }
            this.view.addSubview(vc.view[0]);
            this.addChildViewController(vc);
            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;
            _MUIShowViewController(lastVC, vc, this, animated);
        });
    };
    UINavigationController.prototype.popViewController = function (animated) {
        if (this.currentViewControllerIndex == 0)
            return;
        var fromVC = this.viewControllersStack[this.currentViewControllerIndex];
        this.currentViewControllerIndex--;
        this.viewControllersStack.pop();
        var toVC = this.viewControllersStack[this.currentViewControllerIndex];
        // if (toVC.transitioningDelegate == null)
        //     toVC.transitioningDelegate = this;
        if (toVC.preferredContentSize != null)
            this.contentSize = toVC.preferredContentSize;
        _MUIHideViewController(fromVC, toVC, this, this, function () {
            fromVC.removeChildViewController(this);
            fromVC.view.removeFromSuperview();
        });
    };
    UINavigationController.prototype.popToRootViewController = function (animated) {
        if (this.viewControllersStack.length == 1)
            return;
        var currentVC = this.viewControllersStack.pop();
        for (var index = this.currentViewControllerIndex - 1; index > 0; index--) {
            var vc = this.viewControllersStack.pop();
            vc.view.removeFromSuperview();
            this.removeChildViewController(vc);
        }
        this.currentViewControllerIndex = 0;
        var rootVC = this.viewControllersStack[0];
        this.contentSize = rootVC.preferredContentSize;
        _MUIHideViewController(currentVC, rootVC, this, this, function () {
            currentVC.view.removeFromSuperview();
            this.removeChildViewController(currentVC);
        });
    };
    Object.defineProperty(UINavigationController.prototype, "preferredContentSize", {
        get: function () {
            if (this.currentViewControllerIndex < 0)
                return this._preferredContentSize;
            var vc = this.viewControllersStack[this.currentViewControllerIndex];
            return vc.preferredContentSize;
        },
        set: function (size) {
            this.setPreferredContentSize(size);
        },
        enumerable: true,
        configurable: true
    });
    // Segues
    UINavigationController.prototype._checkSegues = function () {
        _super.prototype._checkSegues.call(this);
        for (var index = 0; index < this._segues.length; index++) {
            var s = this._segues[index];
            var kind = s["Kind"];
            if (kind == "relationship") {
                var destination = s["Destination"];
                var relationship = s["Relationship"];
                if (relationship == "rootViewController") {
                    var vc = this.storyboard._instantiateViewControllerWithDestination(destination);
                    this.setRootViewController(vc);
                }
            }
        }
    };
    UINavigationController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (this._pushAnimationController == null) {
            this._pushAnimationController = new MUIPushAnimationController();
            this._pushAnimationController.init();
        }
        return this._pushAnimationController;
    };
    UINavigationController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (this._popAnimationController == null) {
            this._popAnimationController = new MUIPopAnimationController();
            this._popAnimationController.init();
        }
        return this._popAnimationController;
    };
    return UINavigationController;
}(UIViewController));
 
/*
    ANIMATIONS
 */
var MUIPushAnimationController = /** @class */ (function (_super) {
    __extends(MUIPushAnimationController, _super);
    function MUIPushAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MUIPushAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MUIPushAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations before transitions       
    };
    MUIPushAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations after transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MUIPushAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.Push);
        return animations;
    };
    return MUIPushAnimationController;
}(NSObject));
 
var MUIPopAnimationController = /** @class */ (function (_super) {
    __extends(MUIPopAnimationController, _super);
    function MUIPopAnimationController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MUIPopAnimationController.prototype.transitionDuration = function (transitionContext) {
        return 0.25;
    };
    MUIPopAnimationController.prototype.animateTransition = function (transitionContext) {
        // make view configurations after transitions
    };
    MUIPopAnimationController.prototype.animationEnded = function (transitionCompleted) {
        // make view configurations before transitions
    };
    // TODO: Not iOS like transitions. For now we use css animations
    MUIPopAnimationController.prototype.animations = function (transitionContext) {
        var animations = MUIClassListForAnimationType(MUIAnimationType.Pop);
        return animations;
    };
    return MUIPopAnimationController;
}(NSObject));
 
/**
 * Created by godshadow on 05/08/16.
 */
var UISplitViewControllerDisplayMode;
(function (UISplitViewControllerDisplayMode) {
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["Automatic"] = 0] = "Automatic";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["PrimaryHidden"] = 1] = "PrimaryHidden";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["AllVisible"] = 2] = "AllVisible";
    UISplitViewControllerDisplayMode[UISplitViewControllerDisplayMode["PrimaryOverlay"] = 3] = "PrimaryOverlay";
})(UISplitViewControllerDisplayMode || (UISplitViewControllerDisplayMode = {}));
var UISplitViewController = /** @class */ (function (_super) {
    __extends(UISplitViewController, _super);
    function UISplitViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.masterView = null;
        _this.detailView = null;
        _this.preferredDisplayMode = UISplitViewControllerDisplayMode.Automatic;
        _this._displayModeButtonItem = null;
        _this._collapsed = false;
        _this._masterViewController = null;
        _this._detailViewController = null;
        // Transitioning delegate
        _this._pushAnimationController = null;
        _this._popAnimationController = null;
        return _this;
    }
    UISplitViewController.prototype.init = function () {
        _super.prototype.init.call(this);
        this.masterView = new UIView();
        this.masterView.init();
        if (MIOCoreIsPhone() == false)
            MUICoreLayerAddStyle(this.masterView.layer, "master-view");
        this.view[0].addSubview(this.masterView);
        if (MIOCoreIsPhone() == false) {
            this.detailView = new UIView();
            this.detailView.init();
            MUICoreLayerAddStyle(this.detailView.layer, "detail-view");
            this.view[0].addSubview(this.detailView);
        }
    };
    Object.defineProperty(UISplitViewController.prototype, "displayMode", {
        get: function () {
            return UISplitViewControllerDisplayMode.Automatic;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "displayModeButtonItem", {
        get: function () {
            if (this._displayModeButtonItem != null)
                return this._displayModeButtonItem;
            // this._displayModeButtonItem = new UIButton();
            // this._displayModeButtonItem.initWithAction(this, this.displayModeButtonItemAction);        
            return this._displayModeButtonItem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "collapsed", {
        get: function () {
            return this._collapsed;
        },
        enumerable: true,
        configurable: true
    });
    UISplitViewController.prototype.setCollapsed = function (value) {
        this.willChangeValue("collapsed");
        this._collapsed = value;
        this.didChangeValue("collapsed");
    };
    UISplitViewController.prototype.setMasterViewController = function (vc) {
        if (this._masterViewController != null) {
            this._masterViewController.view.removeFromSuperview();
            this.removeChildViewController(this._masterViewController);
            this._masterViewController = null;
        }
        if (vc != null) {
            vc.parent = this;
            vc.splitViewController = this;
            this.masterView.addSubview(vc.view);
            this.addChildViewController(vc);
            this._masterViewController = vc;
        }
    };
    UISplitViewController.prototype.setDetailViewController = function (vc) {
        if (MIOCoreIsPhone() == true)
            return;
        if (this._detailViewController != null) {
            this._detailViewController.view.removeFromSuperview();
            this.removeChildViewController(this._detailViewController);
            this._detailViewController = null;
        }
        if (vc != null) {
            vc.parent = this;
            vc.splitViewController = this;
            this.detailView.addSubview(vc.view);
            this.addChildViewController(vc);
            this._detailViewController = vc;
        }
    };
    UISplitViewController.prototype.showDetailViewController = function (vc) {
        vc.splitViewController = _injectIntoOptional(this);
        if (MIOCoreIsPhone() == true) {
            this._pushDetailViewController(vc);
        }
        else {
            this._showDetailViewController(vc);
        }
    };
    Object.defineProperty(UISplitViewController.prototype, "masterViewController", {
        get: function () {
            return this._masterViewController;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UISplitViewController.prototype, "detailViewController", {
        get: function () {
            return this._detailViewController;
        },
        enumerable: true,
        configurable: true
    });
    UISplitViewController.prototype._showDetailViewController = function (vc) {
        var oldVC = this._detailViewController;
        var newVC = vc;
        if (oldVC == newVC)
            return;
        newVC.onLoadView(this, function () {
            this.detailView.addSubview(newVC.view[0]);
            this.addChildViewController(newVC);
            this._detailViewController = vc;
            _MUIShowViewController(oldVC, newVC, this, false, this, function () {
                oldVC.view.removeFromSuperview();
                this.removeChildViewController(oldVC);
            });
        });
    };
    UISplitViewController.prototype._pushDetailViewController = function (vc) {
        var oldVC = this._masterViewController;
        //if (vc.transitioningDelegate == null) vc.transitioningDelegate = this;
        vc.onLoadView(this, function () {
            this.view.addSubview(vc.view[0]);
            this.addChildViewController(vc);
            this._detailViewController = vc;
            if (vc.preferredContentSize != null)
                this.preferredContentSize = vc.preferredContentSize;
            _MUIShowViewController(oldVC, vc, this, true, this, function () {
                this.setCollapsed(true);
            });
        });
    };
    UISplitViewController.prototype._popViewController = function () {
        var fromVC = this.detailViewController;
        var toVC = this.masterViewController;
        // if (toVC.transitioningDelegate == null)
        //     toVC.transitioningDelegate = this;
        if (toVC.preferredContentSize != null)
            this.contentSize = toVC.preferredContentSize;
        _MUIHideViewController(fromVC, toVC, this, this, function () {
            fromVC.removeChildViewController(this);
            fromVC.view[0].removeFromSuperview();
        });
    };
    UISplitViewController.prototype.displayModeButtonItemAction = function () {
        if (MIOCoreIsPhone() == true)
            this._popViewController();
    };
    UISplitViewController.prototype.animationControllerForPresentedController = function (presentedViewController, presentingViewController, sourceController) {
        if (MIOCoreIsPhone() == false)
            return;
        if (this._pushAnimationController == null) {
            this._pushAnimationController = new MUIPushAnimationController();
            this._pushAnimationController.init();
        }
        return this._pushAnimationController;
    };
    UISplitViewController.prototype.animationControllerForDismissedController = function (dismissedController) {
        if (MIOCoreIsPhone() == false)
            return;
        if (this._popAnimationController == null) {
            this._popAnimationController = new MUIPopAnimationController();
            this._popAnimationController.init();
        }
        return this._popAnimationController;
    };
    return UISplitViewController;
}(UIViewController));
 
function MUIOutletRegister(owner, layerID, c) {
    owner._outlets[layerID] = c;
}
 
function MUIOutletQuery(owner, layerID) {
    return owner._outlets[layerID];
}
 
function MUIOutlet(owner, elementID, className, options) {
    //var layer = document.getElementById(elementID);
    var query = MUIOutletQuery(owner, elementID);
    if (query != null)
        return query;
    var layer = null;
    if (owner instanceof UIView)
        layer = MUICoreLayerSearchElementByID(owner.layer, elementID);
    else if (owner instanceof UIViewController)
        layer = MUICoreLayerSearchElementByID(owner.view[0].layer, elementID);
    if (layer == null)
        return null; // Element not found
    //throw new Error(`DIV identifier specified is not valid (${elementID})`);
    if (className == null)
        className = layer.getAttribute("data-class");
    if (className == null)
        className = "UIView";
    var classInstance = NSClassFromString(className);
    classInstance.initWithLayer(layer, owner, options);
    // Track outlets inside view controller (owner)
    MUIOutletRegister(owner, elementID, classInstance);
    if (owner instanceof UIView)
        owner._linkViewToSubview(classInstance);
    else if (owner instanceof UIViewController) {
        if (classInstance instanceof UIView) {
            owner.view[0]._linkViewToSubview(classInstance);
        }
        else if (classInstance instanceof UIViewController)
            owner.addChildViewController(classInstance);
        else
            throw new Error("UIOutlet: Wrong type");
    }
    if (classInstance instanceof UIView)
        classInstance.awakeFromHTML();
    return classInstance;
}
 
function MUIWindowSize() {
    var w = document.body.clientWidth;
    //var h = document.body.clientHeight;window.innerHeight
    var h = window.innerHeight;
    return new NSSize(w, h);
}
 
function _MUIShowViewController(fromVC, toVC, sourceVC, animated, target, completion) {
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();
    if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
        fromVC.viewWillDisappear();
        //fromVC._childControllersWillDisappear();
    }
    var view = null;
    var pc = toVC.presentationController[0];
    if (pc != null)
        view = pc.presentedView[0];
    else
        view = toVC.view[0];
    if (animated == false) {
        _MUIAnimationDidStart(fromVC, toVC, pc, target, completion);
        return;
    }
    // Let's go for the animations!!
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = view;
    if (pc != null)
        pc.presentationTransitionWillBegin();
    var ac = null;
    if (toVC.transitioningDelegate != null) {
        ac = toVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (sourceVC != null && typeof sourceVC.animationControllerForPresentedController === "function") {
        ac = sourceVC.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (pc != null) {
        ac = pc.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    //view.setNeedsDisplay();
    var layer = view.layer;
    _MUIAnimationStart(layer, ac, animationContext, this, function () {
        _MUIAnimationDidStart(fromVC, toVC, pc, target, completion);
    });
}
 
function _MUIAnimationDidStart(fromVC, toVC, pc, target, completion) {
    toVC.viewDidAppear();
    //toVC._childControllersDidAppear();
    if (toVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || toVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
    }
    if (pc != null) {
        pc.presentationTransitionDidEnd(true);
        pc._isPresented = true;
    }
    if (target != null && completion != null)
        completion.call(target);
}
 
function _MUIHideViewController(fromVC, toVC, sourceVC, target, completion) {
    if (fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
        || fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext
        || MIOCoreIsPhone() == true) {
        toVC.viewWillAppear();
        //toVC._childControllersWillAppear();
        //toVC.view.layout();
    }
    fromVC.viewWillDisappear();
    //fromVC._childControllersWillDisappear();
    var view = null;
    var pc = fromVC.presentationController[0];
    if (pc != null)
        view = pc.presentedView[0];
    else
        view = fromVC.view[0];
    var ac = null;
    if (fromVC.transitioningDelegate != null) {
        ac = fromVC.transitioningDelegate.animationControllerForDismissedController(fromVC);
    }
    else if (sourceVC != null && typeof sourceVC.animationControllerForDismissedController === "function") {
        ac = sourceVC.animationControllerForDismissedController(fromVC);
    }
    else if (pc != null) {
        ac = pc.transitioningDelegate.animationControllerForDismissedController(fromVC);
    }
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = view;
    var layer = view.layer;
    if (pc != null)
        pc.dismissalTransitionWillBegin();
    _MUIAnimationStart(layer, ac, animationContext, this, function () {
        if (fromVC.modalPresentationStyle == UIModalPresentationStyle.FullScreen
            || fromVC.modalPresentationStyle == UIModalPresentationStyle.CurrentContext) {
            toVC.viewDidAppear();
            //toVC._childControllersDidAppear();
        }
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
        if (pc != null) {
            pc.dismissalTransitionDidEnd(true);
            pc._isPresented = false;
        }
        if (target != null && completion != null)
            completion.call(target);
    });
}
 
function _MUITransitionFromViewControllerToViewController(fromVC, toVC, sourceVC, target, completion) {
    toVC.viewWillAppear();
    //toVC._childControllersWillAppear();
    fromVC.viewWillDisappear();
    //fromVC._childControllersWillDisappear();
    //toVC.view.layout();
    var ac = null;
    if (toVC.transitioningDelegate != null) {
        ac = toVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    else if (sourceVC != null && sourceVC.transitioningDelegate != null) {
        ac = sourceVC.transitioningDelegate.animationControllerForPresentedController(toVC, fromVC, sourceVC);
    }
    var animationContext = {};
    animationContext["presentingViewController"] = fromVC;
    animationContext["presentedViewController"] = toVC;
    animationContext["presentedView"] = toVC;
    var layer = toVC.view.layer;
    _MUIAnimationStart(layer, ac, animationContext, this, function () {
        toVC.viewDidAppear();
        //toVC._childControllersDidAppear();
        fromVC.viewDidDisappear();
        //fromVC._childControllersDidDisappear();
        if (target != null && completion != null)
            completion.call(target);
    });
}
 
/**
 * Created by godshadow on 11/3/16.
 */
var UIWindow = /** @class */ (function (_super) {
    __extends(UIWindow, _super);
    function UIWindow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rootViewController = _injectIntoOptional(null);
        _this._resizeWindow = false;
        return _this;
    }
    UIWindow.prototype.init = function () {
        _super.prototype.init.call(this);
        MUICoreLayerAddStyle(this.layer, "view");
    };
    UIWindow.prototype.initWithRootViewController = function (vc) {
        this.init();
        this.rootViewController = _injectIntoOptional(vc);
        this.addSubview(vc.view[0]);
    };
    UIWindow.prototype.makeKey = function () {
        UIApplication.sharedInstance().makeKeyWindow(this);
    };
    UIWindow.prototype.makeKeyAndVisible = function () {
        this.makeKey();
        this.setHidden(false);
    };
    UIWindow.prototype.layoutSubviews = function () {
        if (this.rootViewController[0] != null)
            this.rootViewController[0].view[0].layoutSubviews();
        else
            _super.prototype.layoutSubviews.call(this);
    };
    UIWindow.prototype.addSubview = function (view) {
        view._window = this;
        _super.prototype.addSubview.call(this, view);
    };
    UIWindow.prototype._addLayerToDOM = function () {
        if (this._isLayerInDOM == true)
            return;
        if (this.layer == null)
            return;
        document.body.appendChild(this.layer);
        this._isLayerInDOM = true;
    };
    UIWindow.prototype.removeFromSuperview = function () {
        this._removeLayerFromDOM();
    };
    UIWindow.prototype._removeLayerFromDOM = function () {
        if (this._isLayerInDOM == false)
            return;
        document.body.removeChild(this.layer);
        this._isLayerInDOM = false;
    };
    UIWindow.prototype.setHidden = function (hidden) {
        if (hidden == false) {
            this._addLayerToDOM();
        }
        else {
            this._removeLayerFromDOM();
        }
    };
    UIWindow.prototype._eventHappendOutsideWindow = function () {
        this._dismissRootViewController();
    };
    UIWindow.prototype._becameKeyWindow = function () {
    };
    UIWindow.prototype._resignKeyWindow = function () {
        this._dismissRootViewController();
    };
    UIWindow.prototype._dismissRootViewController = function () {
        if (this.rootViewController[0].isPresented == true) {
            var pc = this.rootViewController[0].presentationController[0];
            if (pc instanceof UIPopoverPresentationController)
                this.rootViewController[0].dismissViewController(true);
        }
    };
    return UIWindow;
}(UIView));
 
var UIStoryboard = /** @class */ (function (_super) {
    __extends(UIStoryboard, _super);
    function UIStoryboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = null;
        _this.bundle = null;
        _this.items = null;
        return _this;
    }
    UIStoryboard.prototype.initWithName = function (name, bundle) {
        _super.prototype.init.call(this);
        this.name = name;
        this.bundle = bundle;
        var content = MIOCoreBundleGetAppResource(this.name, "json");
        this.items = JSON.parse(content);
    };
    UIStoryboard.prototype.instantiateInitialViewController = function () {
        var resource = this.items["InitialViewControllerID"];
        if (resource == null)
            return;
        return this._instantiateViewControllerWithDestination(resource);
    };
    UIStoryboard.prototype.instantiateViewControllerWithIdentifier = function (identifier) {
        var resource = null; //TODO: Get from main.json
        return this._instantiateViewControllerWithDestination(resource);
    };
    UIStoryboard.prototype._instantiateViewControllerWithDestination = function (resource) {
        var classname = this.items["ClassByID"][resource];
        if (classname == null)
            return null;
        var vc = NSClassFromString(classname);
        vc.initWithResource("layout/" + resource + ".html");
        vc.storyboard = this;
        return vc;
    };
    return UIStoryboard;
}(NSObject));
 
function MUICoreStoryboardParseLayer(layer, owner) {
    // Check outlets and segues
    if (layer.childNodes.length > 0) {
        for (var index = 0; index < layer.childNodes.length; index++) {
            var subLayer = layer.childNodes[index];
            if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION")
                continue;
            if (subLayer.getAttribute("data-connections") == "true") {
                for (var index2 = 0; index2 < subLayer.childNodes.length; index2++) {
                    var d = subLayer.childNodes[index2];
                    if (d.tagName != "DIV")
                        continue;
                    var type = d.getAttribute("data-connection-type");
                    if (type == "outlet") {
                        var prop = d.getAttribute("data-property");
                        var outlet = d.getAttribute("data-outlet");
                        MUICoreStoryboardConnectOutlet(owner, prop, outlet);
                    }
                    else if (type == "segue") {
                        var destination = d.getAttribute("data-segue-destination");
                        var kind = d.getAttribute("data-segue-kind");
                        var relationship = d.getAttribute("data-segue-relationship");
                        var identifier = d.getAttribute("data-segue-identifier");
                        MUICoreStoryboardAddSegue(owner, destination, kind, relationship, identifier);
                    }
                }
            }
        }
    }
}
 
function MUICoreStoryboardConnectOutlet(owner, property, outletID) {
    console.log("prop: " + property + " - outluet: " + outletID);
    var obj = this._outlets[outletID];
    owner[property] = _injectIntoOptional(obj);
}
 
function MUICoreStoryboardAddSegue(owner, destination, kind, relationship, identifier) {
    var s = {};
    s["Destination"] = destination;
    s["Kind"] = kind;
    if (identifier != null)
        s["Identifier"] = identifier;
    if (relationship != null)
        s["Relationship"] = relationship;
    owner._segues.push(s);
}
 
var UIStoryboardSegue = /** @class */ (function (_super) {
    __extends(UIStoryboardSegue, _super);
    function UIStoryboardSegue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.identifier = null;
        _this.source = null;
        _this.destination = null;
        _this.performHandler = null;
        _this._sender = null;
        return _this;
    }
    UIStoryboardSegue.prototype.initWithIdentifier = function (identifier, source, destination) {
        _super.prototype.init.call(this);
        this.identifier = identifier;
        this.source = source = source;
        this.destination = destination;
    };
    UIStoryboardSegue.prototype.initWithIdentifierAndPerformHandler = function (identifier, source, destination, performHandler) {
        this.initWithIdentifier(identifier, source, destination);
        this.performHandler = performHandler;
    };
    UIStoryboardSegue.prototype.perform = function () {
        var canPerfom = this.source.shouldPerformSegueWithIdentifier(this.identifier, this._sender);
        if (canPerfom == false)
            return;
        this.source.prepareForSegue(this, this._sender);
        if (this.performHandler != null)
            this.performHandler.call(this.source);
    };
    return UIStoryboardSegue;
}(NSObject));
 
var UIResponder = /** @class */ (function (_super) {
    __extends(UIResponder, _super);
    function UIResponder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIResponder;
}(NSObject));
 
var UIApplicationDelegate = /** @class */ (function () {
    function UIApplicationDelegate() {
    }
    UIApplicationDelegate.prototype.applicationDidFinishLaunchingWithOptions = function () { };
    ;
    return UIApplicationDelegate;
}());
 
/**
 * Created by godshadow on 11/3/16.
 */
var UIApplication = /** @class */ (function () {
    function UIApplication() {
        this.delegate = null;
        this.isMobile = false;
        this.defaultLanguage = null;
        this.currentLanguage = null;
        this.languages = null;
        this.ready = false;
        this.downloadCoreFileCount = 0;
        this._sheetViewController = null;
        this._sheetSize = null;
        //private _popUpMenuView = null;
        this._popUpMenu = null;
        this._popUpMenuControl = null;
        this._popOverWindow = null;
        this._popOverWindowFirstClick = false;
        this._popOverViewController = null;
        this._windows = [];
        this._keyWindow = null;
        this._mainWindow = null;
        this.mainStoryboard = null;
        // addWindow(window:UIWindow){
        //     this._windows.push(window);
        // }
        this.windowZIndexOffset = 0;
        if (UIApplication._sharedInstance != null) {
            throw new Error("UIWebApplication: Instantiation failed: Use sharedInstance() instead of new.");
        }
    }
    UIApplication.sharedInstance = function () {
        if (UIApplication._sharedInstance == null) {
            UIApplication._sharedInstance = new UIApplication();
        }
        return UIApplication._sharedInstance;
    };
    //TODO: Set language in the webworker also.
    UIApplication.prototype.setLanguage = function (lang, target, completion) {
        var languages = MIOCoreGetLanguages();
        if (languages == null) {
            completion.call(target);
        }
        var url = languages[lang];
        if (url == null) {
            completion.call(target);
        }
        var request = NSURLRequest.requestWithURL(NSURL.urlWithString(url));
        var con = new NSURLConnection();
        con.initWithRequestBlock(request, this, function (code, data) {
            if (code == 200) {
                MIOCoreStringSetLocalizedStrings(JSON.parse(data.replace(/(\r\n|\n|\r)/gm, "")));
            }
            completion.call(target);
        });
    };
    // Get Languages from the app.plist
    UIApplication.prototype.downloadLanguages = function (config) {
        var langs = config["Languages"];
        if (langs == null) {
            this._run();
        }
        else {
            for (var key in langs) {
                var url = langs[key];
                MIOCoreAddLanguage(key, url);
            }
            var lang = MIOCoreGetPlatformLanguage();
            this.setLanguage(lang, this, function () {
                this._run();
            });
        }
    };
    UIApplication.prototype.run = function () {
        // Get App.plist
        MIOCoreBundleDownloadResource("app", "plist", this, function (data) {
            if (data == null)
                throw new Error("We couldn't download the app.plist");
            var config = NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);
            var mainStoryBoardFile = "layout/" + config["UIMainStoryboardFile"];
            // Get Main story board
            if (mainStoryBoardFile != null) {
                MIOCoreBundleDownloadResource(mainStoryBoardFile, "json", this, function (data) {
                    this.mainStoryboard = new UIStoryboard();
                    this.mainStoryboard.initWithName(mainStoryBoardFile, null);
                    this.downloadLanguages(config);
                });
            }
            else {
                this.downloadLanguages(config);
            }
        });
    };
    UIApplication.prototype._run = function () {
        this.delegate.applicationDidFinishLaunchingWithOptions();
        this._mainWindow = this.delegate.window;
        if (this._mainWindow == null) {
            var vc = this.mainStoryboard.instantiateInitialViewController();
            this.delegate.window = new UIWindow();
            this.delegate.window.initWithRootViewController(vc);
            this._launchApp();
            // MUICoreBundleLoadNibName( this.initialResourceURLString, this, function(vc:UIViewController){
            //     this.delegate.window = new UIWindow();
            //     this.delegate.window.initWithRootViewController(vc);
            //     this._launchApp()
            // });
        }
        else
            this._launchApp();
    };
    UIApplication.prototype._launchApp = function () {
        this.delegate.window.makeKeyAndVisible();
        this.delegate.window.rootViewController[0].onLoadView(this, function () {
            this.delegate.window.rootViewController[0].viewWillAppear(false);
            this.delegate.window.rootViewController[0].viewDidAppear(false);
            this.ready = true;
            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Click, this, this._clickEvent);
            // MIOCoreEventRegisterObserverForType(MIOCoreEventType.Resize, this, this._resizeEvent);
        });
    };
    UIApplication.prototype.setLanguageURL = function (key, url) {
        if (this.languages == null)
            this.languages = {};
        this.languages[key] = url;
    };
    UIApplication.prototype.setDefaultLanguage = function (key) {
        this.defaultLanguage = key;
    };
    UIApplication.prototype.downloadLanguage = function (key, fn) {
        var url = this.languages[key];
        // Download
        var conn = new NSURLConnection();
        conn.initWithRequestBlock(NSURLRequest.requestWithURL(url), this, function (error, data) {
            if (data != null) {
                var json = JSON.parse(data.replace(/(\r\n|\n|\r)/gm, ""));
                MIOCoreStringSetLocalizedStrings(json);
            }
            fn.call(this);
        });
    };
    UIApplication.prototype.showModalViewContoller = function (vc) {
        var w = new UIWindow();
        w.initWithRootViewController(vc);
        // Add new window
        document.body.appendChild(vc.view.layer);
        //this.addWindow(w);
    };
    UIApplication.prototype.showMenuFromControl = function (control, menu) {
        if (this._popUpMenu != null) {
            if (menu.layerID != this._popUpMenu.layerID)
                this._popUpMenu.hide();
        }
        this._popUpMenuControl = control;
        this._popUpMenu = menu;
        this.delegate.window.addSubview(this._popUpMenu);
        var x = control.layer.getBoundingClientRect().left;
        var y = control.layer.getBoundingClientRect().top + control.layer.getBoundingClientRect().height;
        this._popUpMenu.setX(x);
        this._popUpMenu.setY(y);
        this._popUpMenu.layer.style.zIndex = 200;
        this._popUpMenu.layout();
    };
    UIApplication.prototype.hideMenu = function () {
        if (this._popUpMenu != null) {
            this._popUpMenu.removeFromSuperview();
            this._popUpMenu = null;
        }
    };
    UIApplication.prototype._resizeEvent = function (event) {
        this.delegate.window.layoutSubviews();
    };
    UIApplication.prototype._clickEvent = function (event) {
        var target = event.coreEvent.target;
        var x = event.x;
        var y = event.y;
        // Checking popup menus
        if (this._popUpMenu != null) {
            var controlRect = this._popUpMenuControl.layer.getBoundingClientRect();
            if ((x > controlRect.left && x < controlRect.right)
                && (y > controlRect.top && y < controlRect.bottom)) {
                // Nothing
            }
            else {
                this._popUpMenu.hide();
            }
        }
        // Checking windows
        if (this._keyWindow != null) {
            var controlRect = this._keyWindow.layer.getBoundingClientRect();
            //console.log("x: " + controlRect.left + " mx: " + x);
            if ((x > controlRect.left && x < controlRect.right)
                && (y > controlRect.top && y < controlRect.bottom)) {
                //Nothing. Forward the event
            }
            else
                this._keyWindow._eventHappendOutsideWindow();
        }
    };
    UIApplication.prototype.setPopOverViewController = function (vc) {
        if (this._popOverViewController != null)
            this._popOverViewController.dismissViewController(true);
        this._popOverViewController = vc;
    };
    UIApplication.prototype.showPopOverControllerFromRect = function (vc, frame) {
        if (this._popOverWindow != null) {
            this.hidePopOverController();
        }
        if (this._popOverWindow == null) {
            this._popOverWindow = new UIWindow("popover_window");
            this._popOverWindow.initWithRootViewController(vc.popoverPresentationController());
            //this._popOverWindow.layer.style.border = "2px solid rgb(170, 170, 170)";
            this._popOverWindow.setFrame(vc.popoverPresentationController().frame);
            //this.addWindow(this._popOverWindow);
        }
        this._popOverWindow.rootViewController.onLoadView(this, function () {
            this._popOverWindow.rootViewController.viewWillAppear(true);
            this._popOverWindow.rootViewController.viewDidAppear(true);
        });
        this._popOverWindowFirstClick = true;
    };
    UIApplication.prototype.hidePopOverController = function () {
        this._popOverWindow.rootViewController.viewWillDisappear(true);
        this._popOverWindow.removeFromSuperview();
        this._popOverWindow.rootViewController.viewDidDisappear(true);
        this._popOverWindow = null;
    };
    UIApplication.prototype.makeKeyWindow = function (window) {
        if (this._keyWindow === window)
            return;
        if (this._keyWindow != null) {
            this._keyWindow._resignKeyWindow();
            //this.windowZIndexOffset -= 10;
        }
        //this.addWindow(window);
        this._keyWindow = window;
        //window.layer.style.zIndex = this.windowZIndexOffset;
        //this.windowZIndexOffset += 10;
    };
    return UIApplication;
}());
 
//# sourceMappingURL=UIKit.web.js.map
let UIKitMembers = {

NSDataAsset:["deinit",0,[],"init",0,[],"initNameString",0,[0,],"initNameStringBundleBundle",0,[0,0,],"_name",0,[],"data",0,[],"typeIdentifier",0,[],"copyWith",0,[1,],],
NSDirectionalEdgeInsets:["_top",0,[],"leading",0,[],"bottom",0,[],"trailing",0,[],"init",0,[],"initTopCGFloatLeadingCGFloatBottomCGFloatTrailingCGFloat",0,[0,0,0,0,],"initTopCGFloatLeadingCGFloatBottomCGFloatTrailingCGFloat",0,[0,0,0,0,],"zero",0,[],"infix_61_61",0,[0,0,],"initFromDecoder",0,[0,],"encodeTo",0,[0,],"_bridgeToObjectiveC",0,[],"_forceBridgeFromObjectiveCResult",0,[0,1,],"_conditionallyBridgeFromObjectiveCResult",0,[0,1,],"_unconditionallyBridgeFromObjectiveC",0,[1,],"_ObjectiveCType",0,[],],
NSLayoutAnchor:["deinit",0,[],"constraintEqualTo",0,[0,],"constraintEqualToAnchor",0,[0,],"constraintGreaterThanOrEqualTo",0,[0,],"constraintGreaterThanOrEqualToAnchor",0,[0,],"constraintLessThanOrEqualTo",0,[0,],"constraintLessThanOrEqualToAnchor",0,[0,],"constraintEqualToConstant",0,[0,0,],"constraintEqualToAnchorConstant",0,[0,0,],"constraintGreaterThanOrEqualToConstant",0,[0,0,],"constraintGreaterThanOrEqualToAnchorConstant",0,[0,0,],"constraintLessThanOrEqualToConstant",0,[0,0,],"constraintLessThanOrEqualToAnchorConstant",0,[0,0,],"init",0,[],],
NSLayoutConstraint:["deinit",0,[],"constraintsWithVisualFormatOptionsMetricsViews",0,[0,0,1,0,],"constraintsWithVisualFormatOptionsMetricsViews",0,[0,0,1,0,],"initItemprotocol_composition_typeAttributeNSLayoutConstraintAttributeRelatedByNSLayoutConstraintRelationToItemOptionalAttributeNSLayoutConstraintAttributeMultiplierCGFloatConstantCGFloat",0,[0,0,0,1,0,0,0,],"constraintWithItemAttributeRelatedByToItemAttributeMultiplierConstant",0,[0,0,0,1,0,0,0,],"priority",0,[],"shouldBeArchived",0,[],"firstItem",0,[],"firstAttribute",0,[],"secondItem",0,[],"secondAttribute",0,[],"firstAnchor",0,[],"secondAnchor",1,[],"relation",0,[],"multiplier",0,[],"constant",0,[],"isActive",0,[],"active",0,[],"activate",0,[0,],"activateConstraints",0,[0,],"deactivate",0,[0,],"deactivateConstraints",0,[0,],"init",0,[],"Relation",0,[],"Attribute",0,[],"FormatOptions",0,[],"Axis",0,[],"identifier",1,[],],
NSLayoutDimension:["deinit",0,[],"constraintEqualToConstant",0,[0,],"constraintEqualToConstant",0,[0,],"constraintGreaterThanOrEqualToConstant",0,[0,],"constraintGreaterThanOrEqualToConstant",0,[0,],"constraintLessThanOrEqualToConstant",0,[0,],"constraintLessThanOrEqualToConstant",0,[0,],"constraintEqualToMultiplier",0,[0,0,],"constraintEqualToAnchorMultiplier",0,[0,0,],"constraintGreaterThanOrEqualToMultiplier",0,[0,0,],"constraintGreaterThanOrEqualToAnchorMultiplier",0,[0,0,],"constraintLessThanOrEqualToMultiplier",0,[0,0,],"constraintLessThanOrEqualToAnchorMultiplier",0,[0,0,],"constraintEqualToMultiplierConstant",0,[0,0,0,],"constraintEqualToAnchorMultiplierConstant",0,[0,0,0,],"constraintGreaterThanOrEqualToMultiplierConstant",0,[0,0,0,],"constraintGreaterThanOrEqualToAnchorMultiplierConstant",0,[0,0,0,],"constraintLessThanOrEqualToMultiplierConstant",0,[0,0,0,],"constraintLessThanOrEqualToAnchorMultiplierConstant",0,[0,0,0,],"init",0,[],],
NSLayoutManager:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"textStorage",0,[],"textContainers",0,[],"addTextContainer",0,[0,],"insertTextContainerAt",0,[0,0,],"insertTextContainerAtIndex",0,[0,0,],"removeTextContainerAt",0,[0,],"removeTextContainerAtIndex",0,[0,],"textContainerChangedGeometry",0,[0,],"delegate",0,[],"showsInvisibleCharacters",0,[],"showsControlCharacters",0,[],"hyphenationFactor",0,[],"usesFontLeading",0,[],"allowsNonContiguousLayout",0,[],"hasNonContiguousLayout",0,[],"limitsLayoutForSuspiciousContents",0,[],"invalidateGlyphsForCharacterRangeChangeInLengthActualCharacterRange",0,[0,0,1,],"invalidateGlyphsForCharacterRangeChangeInLengthActualCharacterRange",0,[0,0,1,],"invalidateLayoutForCharacterRangeActualCharacterRange",0,[0,1,],"invalidateLayoutForCharacterRangeActualCharacterRange",0,[0,1,],"invalidateDisplayForCharacterRange",0,[0,],"invalidateDisplayForCharacterRange",0,[0,],"invalidateDisplayForGlyphRange",0,[0,],"invalidateDisplayForGlyphRange",0,[0,],"processEditingForEditedRangeChangeInLengthInvalidatedRange",0,[0,0,0,0,0,],"processEditingForTextStorageEditedRangeChangeInLengthInvalidatedRange",0,[0,0,0,0,0,],"ensureGlyphsForCharacterRange",0,[0,],"ensureGlyphsForCharacterRange",0,[0,],"ensureGlyphsForGlyphRange",0,[0,],"ensureGlyphsForGlyphRange",0,[0,],"ensureLayoutForCharacterRange",0,[0,],"ensureLayoutForCharacterRange",0,[0,],"ensureLayoutForGlyphRange",0,[0,],"ensureLayoutForGlyphRange",0,[0,],"ensureLayoutFor",0,[0,],"ensureLayoutForTextContainer",0,[0,],"ensureLayoutForBoundingRectIn",0,[0,0,],"ensureLayoutForBoundingRectInTextContainer",0,[0,0,],"setGlyphsPropertiesCharacterIndexesFontForGlyphRange",0,[0,0,0,0,0,],"numberOfGlyphs",0,[],"cgGlyphAtIsValidIndex",0,[0,1,],"CGGlyphAtIndexIsValidIndex",0,[0,1,],"cgGlyphAt",0,[0,],"CGGlyphAtIndex",0,[0,],"isValidGlyphIndex",0,[0,],"propertyForGlyphAt",0,[0,],"propertyForGlyphAtIndex",0,[0,],"characterIndexForGlyphAt",0,[0,],"characterIndexForGlyphAtIndex",0,[0,],"glyphIndexForCharacterAt",0,[0,],"glyphIndexForCharacterAtIndex",0,[0,],"getGlyphsInGlyphsPropertiesCharacterIndexesBidiLevels",0,[0,1,1,1,1,],"getGlyphsInRangeGlyphsPropertiesCharacterIndexesBidiLevels",0,[0,1,1,1,1,],"setTextContainerForGlyphRange",0,[0,0,],"setLineFragmentRectForGlyphRangeUsedRect",0,[0,0,0,],"setExtraLineFragmentRectUsedRectTextContainer",0,[0,0,0,],"setLocationForStartOfGlyphRange",0,[0,0,],"setNotShownAttributeForGlyphAt",0,[0,0,],"setNotShownAttributeForGlyphAtIndex",0,[0,0,],"setDrawsOutsideLineFragmentForGlyphAt",0,[0,0,],"setDrawsOutsideLineFragmentForGlyphAtIndex",0,[0,0,],"setAttachmentSizeForGlyphRange",0,[0,0,],"getFirstUnlaidCharacterIndexGlyphIndex",0,[1,1,],"firstUnlaidCharacterIndex",0,[],"firstUnlaidGlyphIndex",0,[],"textContainerForGlyphAtEffectiveRange",0,[0,1,],"textContainerForGlyphAtIndexEffectiveRange",0,[0,1,],"textContainerForGlyphAtEffectiveRangeWithoutAdditionalLayout",0,[0,1,0,],"textContainerForGlyphAtIndexEffectiveRangeWithoutAdditionalLayout",0,[0,1,0,],"usedRectFor",0,[0,],"usedRectForTextContainer",0,[0,],"lineFragmentRectForGlyphAtEffectiveRange",0,[0,1,],"lineFragmentRectForGlyphAtIndexEffectiveRange",0,[0,1,],"lineFragmentRectForGlyphAtEffectiveRangeWithoutAdditionalLayout",0,[0,1,0,],"lineFragmentRectForGlyphAtIndexEffectiveRangeWithoutAdditionalLayout",0,[0,1,0,],"lineFragmentUsedRectForGlyphAtEffectiveRange",0,[0,1,],"lineFragmentUsedRectForGlyphAtIndexEffectiveRange",0,[0,1,],"lineFragmentUsedRectForGlyphAtEffectiveRangeWithoutAdditionalLayout",0,[0,1,0,],"lineFragmentUsedRectForGlyphAtIndexEffectiveRangeWithoutAdditionalLayout",0,[0,1,0,],"extraLineFragmentRect",0,[],"extraLineFragmentUsedRect",0,[],"extraLineFragmentTextContainer",1,[],"locationForGlyphAt",0,[0,],"locationForGlyphAtIndex",0,[0,],"notShownAttributeForGlyphAt",0,[0,],"notShownAttributeForGlyphAtIndex",0,[0,],"drawsOutsideLineFragmentForGlyphAt",0,[0,],"drawsOutsideLineFragmentForGlyphAtIndex",0,[0,],"attachmentSizeForGlyphAt",0,[0,],"attachmentSizeForGlyphAtIndex",0,[0,],"truncatedGlyphRangeInLineFragmentForGlyphAt",0,[0,],"truncatedGlyphRangeInLineFragmentForGlyphAtIndex",0,[0,],"glyphRangeForCharacterRangeActualCharacterRange",0,[0,1,],"glyphRangeForCharacterRangeActualCharacterRange",0,[0,1,],"characterRangeForGlyphRangeActualGlyphRange",0,[0,1,],"characterRangeForGlyphRangeActualGlyphRange",0,[0,1,],"glyphRangeFor",0,[0,],"glyphRangeForTextContainer",0,[0,],"rangeOfNominallySpacedGlyphsContaining",0,[0,],"rangeOfNominallySpacedGlyphsContainingIndex",0,[0,],"boundingRectForGlyphRangeIn",0,[0,0,],"boundingRectForGlyphRangeInTextContainer",0,[0,0,],"glyphRangeForBoundingRectIn",0,[0,0,],"glyphRangeForBoundingRectInTextContainer",0,[0,0,],"glyphRangeForBoundingRectWithoutAdditionalLayoutIn",0,[0,0,],"glyphRangeForBoundingRectWithoutAdditionalLayoutInTextContainer",0,[0,0,],"glyphIndexForInFractionOfDistanceThroughGlyph",0,[0,0,1,],"glyphIndexForPointInTextContainerFractionOfDistanceThroughGlyph",0,[0,0,1,],"glyphIndexForIn",0,[0,0,],"glyphIndexForPointInTextContainer",0,[0,0,],"fractionOfDistanceThroughGlyphForIn",0,[0,0,],"fractionOfDistanceThroughGlyphForPointInTextContainer",0,[0,0,],"characterIndexForInFractionOfDistanceBetweenInsertionPoints",0,[0,0,1,],"characterIndexForPointInTextContainerFractionOfDistanceBetweenInsertionPoints",0,[0,0,1,],"getLineFragmentInsertionPointsForCharacterAtAlternatePositionsInDisplayOrderPositionsCharacterIndexes",0,[0,0,0,1,1,],"getLineFragmentInsertionPointsForCharacterAtIndexAlternatePositionsInDisplayOrderPositionsCharacterIndexes",0,[0,0,0,1,1,],"enumerateLineFragmentsForGlyphRangeUsing",0,[0,0,],"enumerateLineFragmentsForGlyphRangeUsingBlock",0,[0,0,],"enumerateEnclosingRectsForGlyphRangeWithinSelectedGlyphRangeInUsing",0,[0,0,0,0,],"enumerateEnclosingRectsForGlyphRangeWithinSelectedGlyphRangeInTextContainerUsingBlock",0,[0,0,0,0,],"drawBackgroundForGlyphRangeAt",0,[0,0,],"drawBackgroundForGlyphRangeAtPoint",0,[0,0,],"drawGlyphsForGlyphRangeAt",0,[0,0,],"drawGlyphsForGlyphRangeAtPoint",0,[0,0,],"showCGGlyphsPositionsCountFontMatrixAttributesIn",0,[0,0,0,0,0,0,0,],"showCGGlyphsPositionsCountFontMatrixAttributesInContext",0,[0,0,0,0,0,0,0,],"fillBackgroundRectArrayCountForCharacterRangeColor",0,[0,0,0,0,],"drawUnderlineForGlyphRangeUnderlineTypeBaselineOffsetLineFragmentRectLineFragmentGlyphRangeContainerOrigin",0,[0,0,0,0,0,0,],"drawUnderlineForGlyphRangeUnderlineTypeBaselineOffsetLineFragmentRectLineFragmentGlyphRangeContainerOrigin",0,[0,0,0,0,0,0,],"underlineGlyphRangeUnderlineTypeLineFragmentRectLineFragmentGlyphRangeContainerOrigin",0,[0,0,0,0,0,],"drawStrikethroughForGlyphRangeStrikethroughTypeBaselineOffsetLineFragmentRectLineFragmentGlyphRangeContainerOrigin",0,[0,0,0,0,0,0,],"drawStrikethroughForGlyphRangeStrikethroughTypeBaselineOffsetLineFragmentRectLineFragmentGlyphRangeContainerOrigin",0,[0,0,0,0,0,0,],"strikethroughGlyphRangeStrikethroughTypeLineFragmentRectLineFragmentGlyphRangeContainerOrigin",0,[0,0,0,0,0,],"encodeWith",0,[0,],"TextLayoutOrientation",0,[],"GlyphProperty",0,[],"ControlCharacterAction",0,[],"glyphAtIsValidIndex",0,[0,1,],"glyphAtIndexIsValidIndex",0,[0,1,],"glyphAt",0,[0,],"glyphAtIndex",0,[0,],],
NSLayoutManagerDelegate:["layoutManagerShouldGenerateGlyphsPropertiesCharacterIndexesFontForGlyphRange",0,[0,0,0,0,0,0,],"layoutManagerLineSpacingAfterGlyphAtWithProposedLineFragmentRect",0,[0,0,0,],"layoutManagerLineSpacingAfterGlyphAtIndexWithProposedLineFragmentRect",0,[0,0,0,],"layoutManagerParagraphSpacingBeforeGlyphAtWithProposedLineFragmentRect",0,[0,0,0,],"layoutManagerParagraphSpacingBeforeGlyphAtIndexWithProposedLineFragmentRect",0,[0,0,0,],"layoutManagerParagraphSpacingAfterGlyphAtWithProposedLineFragmentRect",0,[0,0,0,],"layoutManagerParagraphSpacingAfterGlyphAtIndexWithProposedLineFragmentRect",0,[0,0,0,],"layoutManagerShouldUseForControlCharacterAt",0,[0,0,0,],"layoutManagerShouldUseActionForControlCharacterAtIndex",0,[0,0,0,],"layoutManagerShouldBreakLineByWordBeforeCharacterAt",0,[0,0,],"layoutManagerShouldBreakLineByWordBeforeCharacterAtIndex",0,[0,0,],"layoutManagerShouldBreakLineByHyphenatingBeforeCharacterAt",0,[0,0,],"layoutManagerShouldBreakLineByHyphenatingBeforeCharacterAtIndex",0,[0,0,],"layoutManagerBoundingBoxForControlGlyphAtForProposedLineFragmentGlyphPositionCharacterIndex",0,[0,0,0,0,0,0,],"layoutManagerBoundingBoxForControlGlyphAtIndexForTextContainerProposedLineFragmentGlyphPositionCharacterIndex",0,[0,0,0,0,0,0,],"layoutManagerShouldSetLineFragmentRectLineFragmentUsedRectBaselineOffsetInForGlyphRange",0,[0,0,0,0,0,0,],"layoutManagerShouldSetLineFragmentRectLineFragmentUsedRectBaselineOffsetInTextContainerForGlyphRange",0,[0,0,0,0,0,0,],"layoutManagerDidInvalidateLayout",0,[0,],"layoutManagerDidCompleteLayoutForAtEnd",0,[0,1,0,],"layoutManagerDidCompleteLayoutForTextContainerAtEnd",0,[0,1,0,],"layoutManagerTextContainerDidChangeGeometryFrom",0,[0,0,0,],"layoutManagerTextContainerDidChangeGeometryFromSize",0,[0,0,0,],],
NSLayoutXAxisAnchor:["deinit",0,[],"anchorWithOffsetTo",0,[0,],"anchorWithOffsetToAnchor",0,[0,],"init",0,[],"constraintEqualToSystemSpacingAfterMultiplier",0,[0,0,],"constraintEqualToSystemSpacingAfterMultiplier",0,[0,0,],"constraintEqualToSystemSpacingAfterAnchorMultiplier",0,[0,0,],"constraintGreaterThanOrEqualToSystemSpacingAfterMultiplier",0,[0,0,],"constraintGreaterThanOrEqualToSystemSpacingAfterMultiplier",0,[0,0,],"constraintGreaterThanOrEqualToSystemSpacingAfterAnchorMultiplier",0,[0,0,],"constraintLessThanOrEqualToSystemSpacingAfterMultiplier",0,[0,0,],"constraintLessThanOrEqualToSystemSpacingAfterMultiplier",0,[0,0,],"constraintLessThanOrEqualToSystemSpacingAfterAnchorMultiplier",0,[0,0,],],
NSLayoutYAxisAnchor:["deinit",0,[],"anchorWithOffsetTo",0,[0,],"anchorWithOffsetToAnchor",0,[0,],"init",0,[],"constraintEqualToSystemSpacingBelowMultiplier",0,[0,0,],"constraintEqualToSystemSpacingBelowMultiplier",0,[0,0,],"constraintEqualToSystemSpacingBelowAnchorMultiplier",0,[0,0,],"constraintGreaterThanOrEqualToSystemSpacingBelowMultiplier",0,[0,0,],"constraintGreaterThanOrEqualToSystemSpacingBelowMultiplier",0,[0,0,],"constraintGreaterThanOrEqualToSystemSpacingBelowAnchorMultiplier",0,[0,0,],"constraintLessThanOrEqualToSystemSpacingBelowMultiplier",0,[0,0,],"constraintLessThanOrEqualToSystemSpacingBelowMultiplier",0,[0,0,],"constraintLessThanOrEqualToSystemSpacingBelowAnchorMultiplier",0,[0,0,],],
NSLineBreakMode:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"byWordWrapping",0,[],"ByWordWrapping",0,[],"_",0,[],"byCharWrapping",0,[],"ByCharWrapping",0,[],"_",0,[],"byClipping",0,[],"ByClipping",0,[],"_",0,[],"byTruncatingHead",0,[],"ByTruncatingHead",0,[],"_",0,[],"byTruncatingTail",0,[],"ByTruncatingTail",0,[],"_",0,[],"byTruncatingMiddle",0,[],"ByTruncatingMiddle",0,[],"_",0,[],],
NSMutableParagraphStyle:["deinit",0,[],"lineSpacing",0,[],"paragraphSpacing",0,[],"alignment",0,[],"firstLineHeadIndent",0,[],"headIndent",0,[],"tailIndent",0,[],"lineBreakMode",0,[],"minimumLineHeight",0,[],"maximumLineHeight",0,[],"baseWritingDirection",0,[],"lineHeightMultiple",0,[],"paragraphSpacingBefore",0,[],"hyphenationFactor",0,[],"tabStops",1,[],"defaultTabInterval",0,[],"allowsDefaultTighteningForTruncation",0,[],"addTabStop",0,[0,],"removeTabStop",0,[0,],"setParagraphStyle",0,[0,],"init",0,[],"initCoderNSCoder",0,[0,],],
NSParagraphStyle:["deinit",0,[],"_default",0,[],"defaultParagraphStyle",0,[],"defaultWritingDirectionForLanguage",0,[1,],"defaultWritingDirectionForLanguage",0,[1,],"lineSpacing",0,[],"paragraphSpacing",0,[],"alignment",0,[],"headIndent",0,[],"tailIndent",0,[],"firstLineHeadIndent",0,[],"minimumLineHeight",0,[],"maximumLineHeight",0,[],"lineBreakMode",0,[],"baseWritingDirection",0,[],"lineHeightMultiple",0,[],"paragraphSpacingBefore",0,[],"hyphenationFactor",0,[],"tabStops",0,[],"defaultTabInterval",0,[],"allowsDefaultTighteningForTruncation",0,[],"init",0,[],"supportsSecureCoding",0,[],"copyWith",0,[1,],"mutableCopyWith",0,[1,],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],],
NSShadow:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"shadowOffset",0,[],"shadowBlurRadius",0,[],"shadowColor",1,[],"supportsSecureCoding",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],],
NSStringDrawingContext:["deinit",0,[],"minimumScaleFactor",0,[],"actualScaleFactor",0,[],"totalBounds",0,[],"init",0,[],"minimumTrackingAdjustment",0,[],"actualTrackingAdjustment",0,[],],
NSStringDrawingOptions:["initRawValueInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"usesLineFragmentOrigin",0,[],"_",0,[],"UsesLineFragmentOrigin",0,[],"_",0,[],"usesFontLeading",0,[],"_",0,[],"UsesFontLeading",0,[],"_",0,[],"usesDeviceMetrics",0,[],"_",0,[],"UsesDeviceMetrics",0,[],"_",0,[],"truncatesLastVisibleLine",0,[],"_",0,[],"TruncatesLastVisibleLine",0,[],"_",0,[],],
NSTextAlignment:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"left",0,[],"Left",0,[],"_",0,[],"center",0,[],"Center",0,[],"_",0,[],"right",0,[],"Right",0,[],"_",0,[],"justified",0,[],"Justified",0,[],"_",0,[],"natural",0,[],"Natural",0,[],"_",0,[],"initCTTextAlignment",0,[0,],],
NSTextAttachment:["deinit",0,[],"initDataOptionalOfTypeOptional",0,[1,1,],"contents",1,[],"fileType",1,[],"_image",1,[],"bounds",0,[],"fileWrapper",1,[],"init",0,[],"imageForBoundsTextContainerCharacterIndex",0,[0,1,0,],"attachmentBoundsForProposedLineFragmentGlyphPositionCharacterIndex",0,[1,0,0,0,],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],"character",0,[],"adjustsImageSizeForAccessibilityContentSizeCategory",0,[],],
NSTextAttachmentContainer:["imageForBoundsTextContainerCharacterIndex",0,[0,1,0,],"imageForBoundsTextContainerCharacterIndex",0,[0,1,0,],"attachmentBoundsForProposedLineFragmentGlyphPositionCharacterIndex",0,[1,0,0,0,],"attachmentBoundsForTextContainerProposedLineFragmentGlyphPositionCharacterIndex",0,[1,0,0,0,],],
NSTextContainer:["deinit",0,[],"initSizeCGSize",0,[0,],"initCoderNSCoder",0,[0,],"layoutManager",0,[],"replaceLayoutManager",0,[0,],"size",0,[],"exclusionPaths",0,[],"lineBreakMode",0,[],"lineFragmentPadding",0,[],"maximumNumberOfLines",0,[],"lineFragmentRectForProposedRectAtWritingDirectionRemaining",0,[0,0,0,1,],"lineFragmentRectForProposedRectAtIndexWritingDirectionRemainingRect",0,[0,0,0,1,],"isSimpleRectangularTextContainer",0,[],"simpleRectangularTextContainer",0,[],"widthTracksTextView",0,[],"heightTracksTextView",0,[],"init",0,[],"layoutOrientation",0,[],"encodeWith",0,[0,],],
NSTextLayoutOrientationProvider:["layoutOrientation",0,[],],
NSTextStorage:["deinit",0,[],"layoutManagers",0,[],"addLayoutManager",0,[0,],"removeLayoutManager",0,[0,],"editedMask",0,[],"editedRange",0,[],"changeInLength",0,[],"delegate",0,[],"editedRangeChangeInLength",0,[0,0,0,],"processEditing",0,[],"fixesAttributesLazily",0,[],"invalidateAttributesIn",0,[0,],"invalidateAttributesInRange",0,[0,],"ensureAttributesAreFixedIn",0,[0,],"ensureAttributesAreFixedInRange",0,[0,],"init",0,[],"initCoderNSCoder",0,[0,],"initStringString",0,[0,],"initStringStringAttributesOptional",0,[0,1,],"initAttributedStringNSAttributedString",0,[0,],"initFileURLURLOptionsDictionaryDocumentAttributesOptional",0,[0,0,1,],"initUrlURLOptionsDictionaryDocumentAttributesOptional",0,[0,0,1,],"initDataDataOptionsDictionaryDocumentAttributesOptional",0,[0,0,1,],"EditActions",0,[],"willProcessEditingNotification",0,[],"didProcessEditingNotification",0,[],],
NSTextStorageDelegate:["textStorageWillProcessEditingRangeChangeInLength",0,[0,0,0,0,],"textStorageDidProcessEditingRangeChangeInLength",0,[0,0,0,0,],],
NSTextTab:["deinit",0,[],"columnTerminatorsFor",0,[1,],"columnTerminatorsForLocale",0,[1,],"initTextAlignmentNSTextAlignmentLocationCGFloatOptionsDictionary",0,[0,0,0,],"alignment",0,[],"_location",0,[],"options",0,[],"init",0,[],"supportsSecureCoding",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],"OptionKey",0,[],],
NSTextWritingDirection:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"embedding",0,[],"Embedding",0,[],"_",0,[],"override",0,[],"Override",0,[],"_",0,[],],
NSUnderlineStyle:["initRawValueInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"none",0,[],"_",0,[],"styleNone",0,[],"_",0,[],"None",0,[],"_",0,[],"single",0,[],"_",0,[],"styleSingle",0,[],"_",0,[],"Single",0,[],"_",0,[],"thick",0,[],"_",0,[],"styleThick",0,[],"_",0,[],"Thick",0,[],"_",0,[],"double",0,[],"_",0,[],"styleDouble",0,[],"_",0,[],"Double",0,[],"_",0,[],"patternSolid",0,[],"_",0,[],"PatternSolid",0,[],"_",0,[],"patternDot",0,[],"_",0,[],"PatternDot",0,[],"_",0,[],"patternDash",0,[],"_",0,[],"PatternDash",0,[],"_",0,[],"patternDashDot",0,[],"_",0,[],"PatternDashDot",0,[],"_",0,[],"patternDashDotDot",0,[],"_",0,[],"PatternDashDotDot",0,[],"_",0,[],"byWord",0,[],"_",0,[],"ByWord",0,[],"_",0,[],],
NSWritingDirection:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"natural",0,[],"Natural",0,[],"_",0,[],"leftToRight",0,[],"LeftToRight",0,[],"_",0,[],"rightToLeft",0,[],"RightToLeft",0,[],"_",0,[],],
NSWritingDirectionFormatType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"embedding",0,[],"Embedding",0,[],"_",0,[],"override",0,[],"Override",0,[],"_",0,[],],
UIAcceleration:["deinit",0,[],"timestamp",0,[],"x",0,[],"y",0,[],"z",0,[],"init",0,[],],
UIAccelerometer:["deinit",0,[],"shared",0,[],"sharedAccelerometer",0,[],"updateInterval",0,[],"delegate",0,[],"init",0,[],],
UIAccelerometerDelegate:["accelerometerDidAccelerate",0,[0,0,],],
UIAccessibility:["_reserved",0,[],"init_reservedUnsafeMutableRawPointer",0,[0,],"Notification",0,[],"announcementDidFinishNotification",0,[],"announcementStringValueUserInfoKey",0,[],"announcementWasSuccessfulUserInfoKey",0,[],"elementFocusedNotification",0,[],"focusedElementUserInfoKey",0,[],"unfocusedElementUserInfoKey",0,[],"assistiveTechnologyUserInfoKey",0,[],"AssistiveTechnologyIdentifier",0,[],"convertToScreenCoordinatesIn",0,[0,0,],"convertToScreenCoordinatesIn",0,[0,0,],"focusedElementUsing",0,[1,],"postNotificationArgument",0,[0,1,],"_",0,[],"isVoiceOverRunning",0,[],"voiceOverStatusDidChangeNotification",0,[],"_",0,[],"isMonoAudioEnabled",0,[],"monoAudioStatusDidChangeNotification",0,[],"_",0,[],"isClosedCaptioningEnabled",0,[],"closedCaptioningStatusDidChangeNotification",0,[],"_",0,[],"isInvertColorsEnabled",0,[],"invertColorsStatusDidChangeNotification",0,[],"_",0,[],"isGuidedAccessEnabled",0,[],"guidedAccessStatusDidChangeNotification",0,[],"_",0,[],"isBoldTextEnabled",0,[],"boldTextStatusDidChangeNotification",0,[],"_",0,[],"isGrayscaleEnabled",0,[],"grayscaleStatusDidChangeNotification",0,[],"_",0,[],"isReduceTransparencyEnabled",0,[],"reduceTransparencyStatusDidChangeNotification",0,[],"_",0,[],"isReduceMotionEnabled",0,[],"reduceMotionStatusDidChangeNotification",0,[],"_",0,[],"isDarkerSystemColorsEnabled",0,[],"darkerSystemColorsStatusDidChangeNotification",0,[],"_",0,[],"isSwitchControlRunning",0,[],"switchControlStatusDidChangeNotification",0,[],"_",0,[],"isSpeakSelectionEnabled",0,[],"speakSelectionStatusDidChangeNotification",0,[],"_",0,[],"isSpeakScreenEnabled",0,[],"speakScreenStatusDidChangeNotification",0,[],"_",0,[],"isShakeToUndoEnabled",0,[],"shakeToUndoDidChangeNotification",0,[],"_",0,[],"isAssistiveTouchRunning",0,[],"assistiveTouchStatusDidChangeNotification",0,[],"requestGuidedAccessSessionEnabledCompletionHandler",0,[0,0,],"HearingDeviceEar",0,[],"_",0,[],"hearingDevicePairedEar",0,[],"hearingDevicePairedEarDidChangeNotification",0,[],"ZoomType",0,[],"zoomFocusChangedZoomTypeToFrameIn",0,[0,0,0,],"registerGestureConflictWithZoom",0,[],"guidedAccessErrorDomain",0,[],"GuidedAccessError",0,[],"GuidedAccessRestrictionState",0,[],"guidedAccessRestrictionStateForIdentifier",0,[0,],"configureForGuidedAccessFeaturesEnabledCompletionHandler",0,[0,0,0,],],
UIAccessibilityContainerDataTable:["accessibilityDataTableCellElementForRowColumn",0,[0,0,],"accessibilityDataTableCellElementForRowColumn",0,[0,0,],"accessibilityRowCount",0,[],"accessibilityColumnCount",0,[],"accessibilityHeaderElementsForRow",0,[0,],"accessibilityHeaderElementsForRow",0,[0,],"accessibilityHeaderElementsForColumn",0,[0,],"accessibilityHeaderElementsForColumn",0,[0,],],
UIAccessibilityContainerDataTableCell:["accessibilityRowRange",0,[],"accessibilityColumnRange",0,[],],
UIAccessibilityContainerType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"none",0,[],"None",0,[],"_",0,[],"dataTable",0,[],"DataTable",0,[],"_",0,[],"list",0,[],"List",0,[],"_",0,[],"landmark",0,[],"Landmark",0,[],"_",0,[],],
UIAccessibilityContentSizeCategoryImageAdjusting:["adjustsImageSizeForAccessibilityContentSizeCategory",0,[],],
UIAccessibilityCustomAction:["deinit",0,[],"initNameStringTargetOptionalSelectorSelector",0,[0,1,0,],"initAttributedNameNSAttributedStringTargetOptionalSelectorSelector",0,[0,1,0,],"_name",0,[],"attributedName",0,[],"target",0,[],"selector",0,[],"init",0,[],],
UIAccessibilityCustomRotor:["deinit",0,[],"initNameStringItemSearchUIAccessibilityCustomRotorSearch",0,[0,0,],"initNameStringItemSearchBlockUIAccessibilityCustomRotorSearch",0,[0,0,],"initAttributedNameNSAttributedStringItemSearchUIAccessibilityCustomRotorSearch",0,[0,0,],"initAttributedNameNSAttributedStringItemSearchBlockUIAccessibilityCustomRotorSearch",0,[0,0,],"initSystemTypeUIAccessibilityCustomRotorSystemRotorTypeItemSearchUIAccessibilityCustomRotorSearch",0,[0,0,],"initSystemTypeUIAccessibilityCustomRotorSystemRotorTypeItemSearchBlockUIAccessibilityCustomRotorSearch",0,[0,0,],"_name",0,[],"attributedName",0,[],"itemSearchBlock",0,[],"systemRotorType",0,[],"init",0,[],"Direction",0,[],"SystemRotorType",0,[],"Search",0,[],],
UIAccessibilityCustomRotorItemResult:["deinit",0,[],"initTargetElementNSObjectProtocolTargetRangeOptional",0,[0,1,],"targetElement",0,[],"targetRange",1,[],"init",0,[],],
UIAccessibilityCustomRotorSearchPredicate:["deinit",0,[],"currentItem",0,[],"searchDirection",0,[],"init",0,[],],
UIAccessibilityElement:["deinit",0,[],"initAccessibilityContainerprotocol_composition_type",0,[0,],"accessibilityContainer",0,[],"isAccessibilityElement",0,[],"accessibilityLabel",1,[],"accessibilityHint",1,[],"accessibilityValue",1,[],"accessibilityFrame",0,[],"accessibilityTraits",0,[],"accessibilityFrameInContainerSpace",0,[],"init",0,[],"accessibilityIdentifier",1,[],],
UIAccessibilityIdentification:["accessibilityIdentifier",1,[],],
UIAccessibilityLocationDescriptor:["deinit",0,[],"init",0,[],"_new",0,[],"initNameStringViewUIView",0,[0,0,],"initNameStringPointCGPointInUIView",0,[0,0,0,],"initNameStringPointCGPointInViewUIView",0,[0,0,0,],"initAttributedNameNSAttributedStringPointCGPointInUIView",0,[0,0,0,],"initAttributedNameNSAttributedStringPointCGPointInViewUIView",0,[0,0,0,],"view",0,[],"point",0,[],"_name",0,[],"attributedName",0,[],],
UIAccessibilityNavigationStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"automatic",0,[],"Automatic",0,[],"_",0,[],"separate",0,[],"Separate",0,[],"_",0,[],"combined",0,[],"Combined",0,[],"_",0,[],],
UIAccessibilityReadingContent:["accessibilityLineNumberFor",0,[0,],"accessibilityLineNumberForPoint",0,[0,],"accessibilityContentForLineNumber",0,[0,],"accessibilityContentForLineNumber",0,[0,],"accessibilityFrameForLineNumber",0,[0,],"accessibilityFrameForLineNumber",0,[0,],"accessibilityPageContent",0,[],"accessibilityAttributedContentForLineNumber",0,[0,],"accessibilityAttributedContentForLineNumber",0,[0,],"accessibilityAttributedPageContent",0,[],],
UIAccessibilityScrollDirection:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"right",0,[],"Right",0,[],"_",0,[],"left",0,[],"Left",0,[],"_",0,[],"up",0,[],"Up",0,[],"_",0,[],"down",0,[],"Down",0,[],"_",0,[],"next",0,[],"Next",0,[],"_",0,[],"previous",0,[],"Previous",0,[],"_",0,[],],
UIAccessibilityTraits:["initRawValue",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"none",0,[],"UIAccessibilityTraitNone",0,[],"_button",0,[],"UIAccessibilityTraitButton",0,[],"_link",0,[],"UIAccessibilityTraitLink",0,[],"header",0,[],"UIAccessibilityTraitHeader",0,[],"searchField",0,[],"UIAccessibilityTraitSearchField",0,[],"_image",0,[],"UIAccessibilityTraitImage",0,[],"selected",0,[],"UIAccessibilityTraitSelected",0,[],"playsSound",0,[],"UIAccessibilityTraitPlaysSound",0,[],"keyboardKey",0,[],"UIAccessibilityTraitKeyboardKey",0,[],"staticText",0,[],"UIAccessibilityTraitStaticText",0,[],"summaryElement",0,[],"UIAccessibilityTraitSummaryElement",0,[],"notEnabled",0,[],"UIAccessibilityTraitNotEnabled",0,[],"updatesFrequently",0,[],"UIAccessibilityTraitUpdatesFrequently",0,[],"startsMediaSession",0,[],"UIAccessibilityTraitStartsMediaSession",0,[],"adjustable",0,[],"UIAccessibilityTraitAdjustable",0,[],"allowsDirectInteraction",0,[],"UIAccessibilityTraitAllowsDirectInteraction",0,[],"causesPageTurn",0,[],"UIAccessibilityTraitCausesPageTurn",0,[],"tabBar",0,[],"UIAccessibilityTraitTabBar",0,[],"Element",0,[],"ArrayLiteralElement",0,[],],
UIActionSheet:["deinit",0,[],"initTitleOptionalDelegateOptionalCancelButtonTitleOptionalDestructiveButtonTitleOptional",0,[1,1,1,1,],"delegate",0,[],"title",0,[],"actionSheetStyle",0,[],"addButtonWithTitle",0,[1,],"addButtonWithTitle",0,[1,],"buttonTitleAt",0,[0,],"buttonTitleAtIndex",0,[0,],"numberOfButtons",0,[],"cancelButtonIndex",0,[],"destructiveButtonIndex",0,[],"firstOtherButtonIndex",0,[],"isVisible",0,[],"visible",0,[],"showFrom",0,[0,],"showFromToolbar",0,[0,],"showFrom",0,[0,],"showFromTabBar",0,[0,],"showFromAnimated",0,[0,0,],"showFromBarButtonItemAnimated",0,[0,0,],"showFromInAnimated",0,[0,0,0,],"showFromRectInViewAnimated",0,[0,0,0,],"showIn",0,[0,],"showInView",0,[0,],"dismissWithClickedButtonIndexAnimated",0,[0,0,],"dismissWithClickedButtonIndexAnimated",0,[0,0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"initTitleOptionalDelegateOptionalCancelButtonTitleOptionalDestructiveButtonTitleOptionalOtherButtonTitlesStringArray",0,[1,1,1,1,0,0,],],
UIActionSheetDelegate:["actionSheetClickedButtonAt",0,[0,0,],"actionSheetClickedButtonAtIndex",0,[0,0,],"actionSheetCancel",0,[0,],"willPresent",0,[0,],"willPresentActionSheet",0,[0,],"didPresent",0,[0,],"didPresentActionSheet",0,[0,],"actionSheetWillDismissWithButtonIndex",0,[0,0,],"actionSheetDidDismissWithButtonIndex",0,[0,0,],],
UIActionSheetStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"automatic",0,[],"Automatic",0,[],"_",0,[],"_default",0,[],"Default",0,[],"_",0,[],"blackTranslucent",0,[],"BlackTranslucent",0,[],"_",0,[],"blackOpaque",0,[],"BlackOpaque",0,[],"_",0,[],],
UIActivity:["deinit",0,[],"activityCategory",0,[],"activityType",1,[],"activityTitle",1,[],"activityImage",1,[],"canPerformWithActivityItems",0,[0,],"canPerformWithActivityItems",0,[0,],"prepareWithActivityItems",0,[0,],"prepareWithActivityItems",0,[0,],"activityViewController",1,[],"perform",0,[],"performActivity",0,[],"activityDidFinish",0,[0,],"init",0,[],"ActivityType",0,[],"Category",0,[],],
UIActivityIndicatorView:["deinit",0,[],"initStyleUIActivityIndicatorViewStyle",0,[0,],"initActivityIndicatorStyleUIActivityIndicatorViewStyle",0,[0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"style",0,[],"activityIndicatorViewStyle",0,[],"hidesWhenStopped",0,[],"color",1,[],"startAnimating",0,[],"stopAnimating",0,[],"isAnimating",0,[],"animating",0,[],"init",0,[],"Style",0,[],],
UIActivityItemProvider:["deinit",0,[],"init",0,[],"initPlaceholderItemprotocol_composition_type",0,[0,],"placeholderItem",1,[],"activityType",1,[],"item",0,[],"activityViewControllerPlaceholderItem",0,[0,],"activityViewControllerItemForActivityType",0,[0,1,],"activityViewControllerSubjectForActivityType",0,[0,1,],"activityViewControllerDataTypeIdentifierForActivityType",0,[0,1,],"activityViewControllerThumbnailImageForActivityTypeSuggestedSize",0,[0,1,0,],],
UIActivityItemSource:["activityViewControllerPlaceholderItem",0,[0,],"activityViewControllerItemForActivityType",0,[0,1,],"activityViewControllerSubjectForActivityType",0,[0,1,],"activityViewControllerDataTypeIdentifierForActivityType",0,[0,1,],"activityViewControllerThumbnailImageForActivityTypeSuggestedSize",0,[0,1,0,],],
UIActivityViewController:["deinit",0,[],"init",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"initActivityItemsArrayApplicationActivitiesOptional",0,[0,1,],"completionHandler",1,[],"completionWithItemsHandler",1,[],"excludedActivityTypes",1,[],"CompletionHandler",0,[],"CompletionWithItemsHandler",0,[],],
UIAdaptivePresentationControllerDelegate:["adaptivePresentationStyleFor",0,[0,],"adaptivePresentationStyleForPresentationController",0,[0,],"adaptivePresentationStyleForTraitCollection",0,[0,0,],"adaptivePresentationStyleForPresentationControllerTraitCollection",0,[0,0,],"presentationControllerViewControllerForAdaptivePresentationStyle",0,[0,0,],"presentationControllerWillPresentWithAdaptiveStyleTransitionCoordinator",0,[0,0,1,],],
UIAlertAction:["deinit",0,[],"initTitleOptionalStyleUIAlertActionStyleHandlerOptional",0,[1,0,1,],"actionWithTitleStyleHandler",0,[1,0,1,],"title",1,[],"style",0,[],"isEnabled",0,[],"enabled",0,[],"init",0,[],"copyWith",0,[1,],"Style",0,[],],
UIAlertController:["deinit",0,[],"initTitleOptionalMessageOptionalPreferredStyleUIAlertControllerStyle",0,[1,1,0,],"alertControllerWithTitleMessagePreferredStyle",0,[1,1,0,],"addAction",0,[0,],"actions",0,[],"preferredAction",1,[],"addTextFieldConfigurationHandler",0,[1,],"addTextFieldWithConfigurationHandler",0,[1,],"textFields",1,[],"title",1,[],"message",1,[],"preferredStyle",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],"Style",0,[],"isSpringLoaded",0,[],],
UIAlertView:["deinit",0,[],"initTitleOptionalMessageOptionalDelegateOptionalCancelButtonTitleOptional",0,[1,1,1,1,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"delegate",0,[],"title",0,[],"message",1,[],"addButtonWithTitle",0,[1,],"addButtonWithTitle",0,[1,],"buttonTitleAt",0,[0,],"buttonTitleAtIndex",0,[0,],"numberOfButtons",0,[],"cancelButtonIndex",0,[],"firstOtherButtonIndex",0,[],"isVisible",0,[],"visible",0,[],"show",0,[],"dismissWithClickedButtonIndexAnimated",0,[0,0,],"dismissWithClickedButtonIndexAnimated",0,[0,0,],"alertViewStyle",0,[],"textFieldAt",0,[0,],"textFieldAtIndex",0,[0,],"init",0,[],"initTitleStringMessageStringDelegateOptionalCancelButtonTitleOptionalOtherButtonTitlesStringArray",0,[0,0,1,1,0,0,],],
UIAlertViewDelegate:["alertViewClickedButtonAt",0,[0,0,],"alertViewClickedButtonAtIndex",0,[0,0,],"alertViewCancel",0,[0,],"willPresent",0,[0,],"willPresentAlertView",0,[0,],"didPresent",0,[0,],"didPresentAlertView",0,[0,],"alertViewWillDismissWithButtonIndex",0,[0,0,],"alertViewDidDismissWithButtonIndex",0,[0,0,],"alertViewShouldEnableFirstOtherButton",0,[0,],],
UIAlertViewStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"secureTextInput",0,[],"SecureTextInput",0,[],"_",0,[],"plainTextInput",0,[],"PlainTextInput",0,[],"_",0,[],"loginAndPasswordInput",0,[],"LoginAndPasswordInput",0,[],"_",0,[],],
UIAppearance:["appearance",0,[],"appearanceWhenContainedInInstancesOf",0,[0,],"appearanceWhenContainedInInstancesOfClasses",0,[0,],"appearanceFor",0,[0,],"appearanceForTraitCollection",0,[0,],"appearanceForWhenContainedInInstancesOf",0,[0,0,],"appearanceForTraitCollectionWhenContainedInInstancesOfClasses",0,[0,0,],],
UIAppearanceContainer:[],
UIApplication:["deinit",0,[],"shared",0,[],"sharedApplication",0,[],"delegate",0,[],"beginIgnoringInteractionEvents",0,[],"endIgnoringInteractionEvents",0,[],"isIgnoringInteractionEvents",0,[],"ignoringInteractionEvents",0,[],"isIdleTimerDisabled",0,[],"idleTimerDisabled",0,[],"openURL",0,[0,],"canOpenURL",0,[0,],"openOptionsCompletionHandler",0,[0,0,1,],"openURLOptionsCompletionHandler",0,[0,0,1,],"sendEvent",0,[0,],"keyWindow",1,[],"windows",0,[],"sendActionToFromFor",0,[0,1,1,1,],"sendActionToFromForEvent",0,[0,1,1,1,],"isNetworkActivityIndicatorVisible",0,[],"networkActivityIndicatorVisible",0,[],"statusBarStyle",0,[],"isStatusBarHidden",0,[],"statusBarHidden",0,[],"statusBarOrientation",0,[],"supportedInterfaceOrientationsFor",0,[1,],"supportedInterfaceOrientationsForWindow",0,[1,],"statusBarOrientationAnimationDuration",0,[],"statusBarFrame",0,[],"applicationIconBadgeNumber",0,[],"applicationSupportsShakeToEdit",0,[],"applicationState",0,[],"backgroundTimeRemaining",0,[],"beginBackgroundTaskExpirationHandler",0,[1,],"beginBackgroundTaskWithExpirationHandler",0,[1,],"beginBackgroundTaskWithNameExpirationHandler",0,[1,1,],"beginBackgroundTaskWithNameExpirationHandler",0,[1,1,],"endBackgroundTask",0,[0,],"setMinimumBackgroundFetchInterval",0,[0,],"backgroundRefreshStatus",0,[],"isProtectedDataAvailable",0,[],"protectedDataAvailable",0,[],"userInterfaceLayoutDirection",0,[],"preferredContentSizeCategory",0,[],"init",0,[],"LaunchOptionsKey",0,[],"OpenURLOptionsKey",0,[],"ExtensionPointIdentifier",0,[],"didEnterBackgroundNotification",0,[],"willEnterForegroundNotification",0,[],"didFinishLaunchingNotification",0,[],"didBecomeActiveNotification",0,[],"willResignActiveNotification",0,[],"didReceiveMemoryWarningNotification",0,[],"willTerminateNotification",0,[],"significantTimeChangeNotification",0,[],"willChangeStatusBarOrientationNotification",0,[],"didChangeStatusBarOrientationNotification",0,[],"statusBarOrientationUserInfoKey",0,[],"willChangeStatusBarFrameNotification",0,[],"didChangeStatusBarFrameNotification",0,[],"statusBarFrameUserInfoKey",0,[],"backgroundRefreshStatusDidChangeNotification",0,[],"protectedDataWillBecomeUnavailableNotification",0,[],"protectedDataDidBecomeAvailableNotification",0,[],"openSettingsURLString",0,[],"userDidTakeScreenshotNotification",0,[],"invalidInterfaceOrientationException",0,[],"State",0,[],"backgroundFetchIntervalMinimum",0,[],"backgroundFetchIntervalNever",0,[],"OpenExternalURLOptionsKey",0,[],"stateRestorationViewControllerStoryboardKey",0,[],"stateRestorationBundleVersionKey",0,[],"stateRestorationUserInterfaceIdiomKey",0,[],"stateRestorationTimestampKey",0,[],"stateRestorationSystemVersionKey",0,[],"registerForRemoteNotifications",0,[],"unregisterForRemoteNotifications",0,[],"isRegisteredForRemoteNotifications",0,[],"registeredForRemoteNotifications",0,[],"registerForRemoteNotificationsMatching",0,[0,],"registerForRemoteNotificationTypes",0,[0,],"enabledRemoteNotificationTypes",0,[],"presentLocalNotificationNow",0,[0,],"scheduleLocalNotification",0,[0,],"cancelLocalNotification",0,[0,],"cancelAllLocalNotifications",0,[],"scheduledLocalNotifications",1,[],"registerUserNotificationSettings",0,[0,],"currentUserNotificationSettings",1,[],"beginReceivingRemoteControlEvents",0,[],"endReceivingRemoteControlEvents",0,[],"setNewsstandIconImage",0,[1,],"shortcutItems",1,[],"supportsAlternateIcons",0,[],"setAlternateIconNameCompletionHandler",0,[1,1,],"alternateIconName",1,[],"extendStateRestoration",0,[],"completeStateRestoration",0,[],"ignoreSnapshotOnNextApplicationLaunch",0,[],"registerObjectForStateRestorationRestorationIdentifier",0,[0,0,],"registerObjectForStateRestorationRestorationIdentifier",0,[0,0,],"isProximitySensingEnabled",0,[],"proximitySensingEnabled",0,[],"setStatusBarHiddenAnimated",0,[0,0,],"setStatusBarOrientationAnimated",0,[0,0,],"setStatusBarStyleAnimated",0,[0,0,],"setStatusBarHiddenWith",0,[0,0,],"setStatusBarHiddenWithAnimation",0,[0,0,],"setKeepAliveTimeoutHandler",0,[0,1,],"clearKeepAliveTimeout",0,[],],
UIApplicationDelegate:["applicationDidFinishLaunching",0,[0,],"applicationWillFinishLaunchingWithOptions",0,[0,1,],"applicationDidFinishLaunchingWithOptions",0,[0,1,],"applicationDidBecomeActive",0,[0,],"applicationWillResignActive",0,[0,],"applicationHandleOpen",0,[0,0,],"applicationHandleOpenURL",0,[0,0,],"applicationOpenSourceApplicationAnnotation",0,[0,0,1,0,],"applicationOpenURLSourceApplicationAnnotation",0,[0,0,1,0,],"applicationOpenOptions",0,[0,0,0,],"applicationOpenURLOptions",0,[0,0,0,],"applicationDidReceiveMemoryWarning",0,[0,],"applicationWillTerminate",0,[0,],"applicationSignificantTimeChange",0,[0,],"applicationWillChangeStatusBarOrientationDuration",0,[0,0,0,],"applicationDidChangeStatusBarOrientation",0,[0,0,],"applicationWillChangeStatusBarFrame",0,[0,0,],"applicationDidChangeStatusBarFrame",0,[0,0,],"applicationDidRegister",0,[0,0,],"applicationDidRegisterUserNotificationSettings",0,[0,0,],"applicationDidRegisterForRemoteNotificationsWithDeviceToken",0,[0,0,],"applicationDidFailToRegisterForRemoteNotificationsWithError",0,[0,0,],"applicationDidReceiveRemoteNotification",0,[0,0,],"applicationDidReceive",0,[0,0,],"applicationDidReceiveLocalNotification",0,[0,0,],"applicationHandleActionWithIdentifierForCompletionHandler",0,[0,1,0,0,],"applicationHandleActionWithIdentifierForLocalNotificationCompletionHandler",0,[0,1,0,0,],"applicationHandleActionWithIdentifierForRemoteNotificationWithResponseInfoCompletionHandler",0,[0,1,0,0,0,],"applicationHandleActionWithIdentifierForRemoteNotificationCompletionHandler",0,[0,1,0,0,],"applicationHandleActionWithIdentifierForWithResponseInfoCompletionHandler",0,[0,1,0,0,0,],"applicationHandleActionWithIdentifierForLocalNotificationWithResponseInfoCompletionHandler",0,[0,1,0,0,0,],"applicationDidReceiveRemoteNotificationFetchCompletionHandler",0,[0,0,0,],"applicationPerformFetchWithCompletionHandler",0,[0,0,],"applicationPerformActionForCompletionHandler",0,[0,0,0,],"applicationPerformActionForShortcutItemCompletionHandler",0,[0,0,0,],"applicationHandleEventsForBackgroundURLSessionCompletionHandler",0,[0,0,0,],"applicationHandleWatchKitExtensionRequestReply",0,[0,1,0,],"applicationShouldRequestHealthAuthorization",0,[0,],"applicationDidEnterBackground",0,[0,],"applicationWillEnterForeground",0,[0,],"applicationProtectedDataWillBecomeUnavailable",0,[0,],"applicationProtectedDataDidBecomeAvailable",0,[0,],"window",1,[],"applicationSupportedInterfaceOrientationsFor",0,[0,1,],"applicationSupportedInterfaceOrientationsForWindow",0,[0,1,],"applicationShouldAllowExtensionPointIdentifier",0,[0,0,],"applicationViewControllerWithRestorationIdentifierPathCoder",0,[0,0,0,],"applicationShouldSaveApplicationState",0,[0,0,],"applicationShouldRestoreApplicationState",0,[0,0,],"applicationWillEncodeRestorableStateWith",0,[0,0,],"applicationWillEncodeRestorableStateWithCoder",0,[0,0,],"applicationDidDecodeRestorableStateWith",0,[0,0,],"applicationDidDecodeRestorableStateWithCoder",0,[0,0,],"applicationWillContinueUserActivityWithType",0,[0,0,],"applicationContinueRestorationHandler",0,[0,0,0,],"applicationContinueUserActivityRestorationHandler",0,[0,0,0,],"applicationDidFailToContinueUserActivityWithTypeError",0,[0,0,0,],"applicationDidUpdate",0,[0,0,],"applicationDidUpdateUserActivity",0,[0,0,],],
UIApplicationShortcutIcon:["deinit",0,[],"initTypeUIApplicationShortcutIconIconType",0,[0,],"iconWithType",0,[0,],"initTemplateImageNameString",0,[0,],"iconWithTemplateImageName",0,[0,],"init",0,[],"copyWith",0,[1,],"IconType",0,[],],
UIApplicationShortcutItem:["deinit",0,[],"init",0,[],"initTypeStringLocalizedTitleStringLocalizedSubtitleOptionalIconOptionalUserInfoOptional",0,[0,0,1,1,1,],"initTypeStringLocalizedTitleString",0,[0,0,],"type",0,[],"localizedTitle",0,[],"localizedSubtitle",1,[],"icon",1,[],"userInfo",1,[],"copyWith",0,[1,],"mutableCopyWith",0,[1,],],
UIAttachmentBehavior:["deinit",0,[],"initItemUIDynamicItemAttachedToAnchorCGPoint",0,[0,0,],"initItemUIDynamicItemOffsetFromCenterUIOffsetAttachedToAnchorCGPoint",0,[0,0,0,],"initItemUIDynamicItemAttachedToUIDynamicItem",0,[0,0,],"initItemUIDynamicItemAttachedToItemUIDynamicItem",0,[0,0,],"initItemUIDynamicItemOffsetFromCenterUIOffsetAttachedToUIDynamicItemOffsetFromCenterUIOffset",0,[0,0,0,0,],"initItemUIDynamicItemOffsetFromCenterUIOffsetAttachedToItemUIDynamicItemOffsetFromCenterUIOffset",0,[0,0,0,0,],"slidingAttachmentWithAttachedToAttachmentAnchorAxisOfTranslation",0,[0,0,0,0,],"slidingAttachmentWithItemAttachedToItemAttachmentAnchorAxisOfTranslation",0,[0,0,0,0,],"slidingAttachmentWithAttachmentAnchorAxisOfTranslation",0,[0,0,0,],"slidingAttachmentWithItemAttachmentAnchorAxisOfTranslation",0,[0,0,0,],"limitAttachmentWithOffsetFromCenterAttachedToOffsetFromCenter",0,[0,0,0,0,],"limitAttachmentWithItemOffsetFromCenterAttachedToItemOffsetFromCenter",0,[0,0,0,0,],"fixedAttachmentWithAttachedToAttachmentAnchor",0,[0,0,0,],"fixedAttachmentWithItemAttachedToItemAttachmentAnchor",0,[0,0,0,],"pinAttachmentWithAttachedToAttachmentAnchor",0,[0,0,0,],"pinAttachmentWithItemAttachedToItemAttachmentAnchor",0,[0,0,0,],"items",0,[],"attachedBehaviorType",0,[],"anchorPoint",0,[],"_length",0,[],"damping",0,[],"frequency",0,[],"frictionTorque",0,[],"attachmentRange",0,[],"init",0,[],"AttachmentType",0,[],],
UIBackgroundFetchResult:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"newData",0,[],"NewData",0,[],"_",0,[],"noData",0,[],"NoData",0,[],"_",0,[],"failed",0,[],"Failed",0,[],"_",0,[],],
UIBackgroundRefreshStatus:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"restricted",0,[],"Restricted",0,[],"_",0,[],"denied",0,[],"Denied",0,[],"_",0,[],"available",0,[],"Available",0,[],"_",0,[],],
UIBackgroundTaskIdentifier:["initRawValueInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"invalid",0,[],],
UIBarButtonItem:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"initImageOptionalStyleUIBarButtonItemStyleTargetOptionalActionOptional",0,[1,0,1,1,],"initImageOptionalLandscapeImagePhoneOptionalStyleUIBarButtonItemStyleTargetOptionalActionOptional",0,[1,1,0,1,1,],"initTitleOptionalStyleUIBarButtonItemStyleTargetOptionalActionOptional",0,[1,0,1,1,],"initBarButtonSystemItemUIBarButtonItemSystemItemTargetOptionalActionOptional",0,[0,1,1,],"initCustomViewUIView",0,[0,],"style",0,[],"width",0,[],"possibleTitles",1,[],"customView",1,[],"action",1,[],"target",0,[],"setBackgroundImageForBarMetrics",0,[1,0,0,],"setBackgroundImageForStateBarMetrics",0,[1,0,0,],"backgroundImageForBarMetrics",0,[0,0,],"backgroundImageForStateBarMetrics",0,[0,0,],"setBackgroundImageForStyleBarMetrics",0,[1,0,0,0,],"setBackgroundImageForStateStyleBarMetrics",0,[1,0,0,0,],"backgroundImageForStyleBarMetrics",0,[0,0,0,],"backgroundImageForStateStyleBarMetrics",0,[0,0,0,],"tintColor",1,[],"setBackgroundVerticalPositionAdjustmentFor",0,[0,0,],"setBackgroundVerticalPositionAdjustmentForBarMetrics",0,[0,0,],"backgroundVerticalPositionAdjustmentFor",0,[0,],"backgroundVerticalPositionAdjustmentForBarMetrics",0,[0,],"setTitlePositionAdjustmentFor",0,[0,0,],"setTitlePositionAdjustmentForBarMetrics",0,[0,0,],"titlePositionAdjustmentFor",0,[0,],"titlePositionAdjustmentForBarMetrics",0,[0,],"setBackButtonBackgroundImageForBarMetrics",0,[1,0,0,],"setBackButtonBackgroundImageForStateBarMetrics",0,[1,0,0,],"backButtonBackgroundImageForBarMetrics",0,[0,0,],"backButtonBackgroundImageForStateBarMetrics",0,[0,0,],"setBackButtonTitlePositionAdjustmentFor",0,[0,0,],"setBackButtonTitlePositionAdjustmentForBarMetrics",0,[0,0,],"backButtonTitlePositionAdjustmentFor",0,[0,],"backButtonTitlePositionAdjustmentForBarMetrics",0,[0,],"setBackButtonBackgroundVerticalPositionAdjustmentFor",0,[0,0,],"setBackButtonBackgroundVerticalPositionAdjustmentForBarMetrics",0,[0,0,],"backButtonBackgroundVerticalPositionAdjustmentFor",0,[0,],"backButtonBackgroundVerticalPositionAdjustmentForBarMetrics",0,[0,],"Style",0,[],"SystemItem",0,[],"isSpringLoaded",0,[],"buttonGroup",0,[],],
UIBarButtonItemGroup:["deinit",0,[],"initBarButtonItemsArrayRepresentativeItemOptional",0,[0,1,],"initCoderNSCoder",0,[0,],"barButtonItems",0,[],"representativeItem",1,[],"isDisplayingRepresentativeItem",0,[],"displayingRepresentativeItem",0,[],"init",0,[],"encodeWith",0,[0,],],
UIBarItem:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"isEnabled",0,[],"enabled",0,[],"title",1,[],"_image",1,[],"landscapeImagePhone",1,[],"largeContentSizeImage",1,[],"imageInsets",0,[],"landscapeImagePhoneInsets",0,[],"largeContentSizeImageInsets",0,[],"tag",0,[],"setTitleTextAttributesFor",0,[1,0,],"setTitleTextAttributesForState",0,[1,0,],"titleTextAttributesFor",0,[0,],"titleTextAttributesForState",0,[0,],"encodeWith",0,[0,],"appearance",0,[],"appearanceWhenContainedInInstancesOf",0,[0,],"appearanceFor",0,[0,],"appearanceForWhenContainedInInstancesOf",0,[0,0,],"accessibilityIdentifier",1,[],],
UIBarMetrics:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"compact",0,[],"Compact",0,[],"_",0,[],"defaultPrompt",0,[],"DefaultPrompt",0,[],"_",0,[],"compactPrompt",0,[],"CompactPrompt",0,[],"_",0,[],"landscapePhone",0,[],"_",0,[],"landscapePhonePrompt",0,[],"_",0,[],],
UIBarPosition:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"any",0,[],"Any",0,[],"_",0,[],"bottom",0,[],"Bottom",0,[],"_",0,[],"_top",0,[],"Top",0,[],"_",0,[],"topAttached",0,[],"TopAttached",0,[],"_",0,[],],
UIBarPositioning:["barPosition",0,[],],
UIBarPositioningDelegate:["positionFor",0,[0,],"positionForBar",0,[0,],],
UIBarStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"black",0,[],"Black",0,[],"_",0,[],"blackOpaque",0,[],"_",0,[],"blackTranslucent",0,[],"BlackTranslucent",0,[],"_",0,[],],
UIBaselineAdjustment:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"alignBaselines",0,[],"AlignBaselines",0,[],"_",0,[],"alignCenters",0,[],"AlignCenters",0,[],"_",0,[],"none",0,[],"None",0,[],"_",0,[],],
UIBezierPath:["deinit",0,[],"init",0,[],"bezierPath",0,[],"initRectCGRect",0,[0,],"bezierPathWithRect",0,[0,],"initOvalInCGRect",0,[0,],"initOvalInRectCGRect",0,[0,],"bezierPathWithOvalInRect",0,[0,],"initRoundedRectCGRectCornerRadiusCGFloat",0,[0,0,],"bezierPathWithRoundedRectCornerRadius",0,[0,0,],"initRoundedRectCGRectByRoundingCornersUIRectCornerCornerRadiiCGSize",0,[0,0,0,],"bezierPathWithRoundedRectByRoundingCornersCornerRadii",0,[0,0,0,],"initArcCenterCGPointRadiusCGFloatStartAngleCGFloatEndAngleCGFloatClockwiseBool",0,[0,0,0,0,0,],"bezierPathWithArcCenterRadiusStartAngleEndAngleClockwise",0,[0,0,0,0,0,],"initCgPathCGPath",0,[0,],"initCGPathCGPath",0,[0,],"bezierPathWithCGPath",0,[0,],"init",0,[],"initCoderNSCoder",0,[0,],"cgPath",0,[],"CGPath",0,[],"moveTo",0,[0,],"moveToPoint",0,[0,],"addLineTo",0,[0,],"addLineToPoint",0,[0,],"addCurveToControlPoint1ControlPoint2",0,[0,0,0,],"addCurveToPointControlPoint1ControlPoint2",0,[0,0,0,],"addQuadCurveToControlPoint",0,[0,0,],"addQuadCurveToPointControlPoint",0,[0,0,],"addArcWithCenterRadiusStartAngleEndAngleClockwise",0,[0,0,0,0,0,],"addArcWithCenterRadiusStartAngleEndAngleClockwise",0,[0,0,0,0,0,],"_close",0,[],"closePath",0,[],"removeAllPoints",0,[],"append",0,[0,],"appendPath",0,[0,],"reversing",0,[],"bezierPathByReversingPath",0,[],"apply",0,[0,],"applyTransform",0,[0,],"isEmpty",0,[],"empty",0,[],"bounds",0,[],"currentPoint",0,[],"contains",0,[0,],"containsPoint",0,[0,],"lineWidth",0,[],"lineCapStyle",0,[],"lineJoinStyle",0,[],"miterLimit",0,[],"flatness",0,[],"usesEvenOddFillRule",0,[],"setLineDashCountPhase",0,[1,0,0,],"getLineDashCountPhase",0,[1,1,1,],"fill",0,[],"stroke",0,[],"fillWithAlpha",0,[0,0,],"fillWithBlendModeAlpha",0,[0,0,],"strokeWithAlpha",0,[0,0,],"strokeWithBlendModeAlpha",0,[0,0,],"addClip",0,[],"supportsSecureCoding",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],],
UIBlurEffect:["deinit",0,[],"initStyleUIBlurEffectStyle",0,[0,],"effectWithStyle",0,[0,],"init",0,[],"initCoderNSCoder",0,[0,],"Style",0,[],],
UIButton:["deinit",0,[],"initTypeUIButtonButtonType",0,[0,],"buttonWithType",0,[0,],"contentEdgeInsets",0,[],"titleEdgeInsets",0,[],"reversesTitleShadowWhenHighlighted",0,[],"imageEdgeInsets",0,[],"adjustsImageWhenHighlighted",0,[],"adjustsImageWhenDisabled",0,[],"showsTouchWhenHighlighted",0,[],"tintColor",1,[],"buttonType",0,[],"setTitleFor",0,[1,0,],"setTitleForState",0,[1,0,],"setTitleColorFor",0,[1,0,],"setTitleColorForState",0,[1,0,],"setTitleShadowColorFor",0,[1,0,],"setTitleShadowColorForState",0,[1,0,],"setImageFor",0,[1,0,],"setImageForState",0,[1,0,],"setBackgroundImageFor",0,[1,0,],"setBackgroundImageForState",0,[1,0,],"setAttributedTitleFor",0,[1,0,],"setAttributedTitleForState",0,[1,0,],"titleFor",0,[0,],"titleForState",0,[0,],"titleColorFor",0,[0,],"titleColorForState",0,[0,],"titleShadowColorFor",0,[0,],"titleShadowColorForState",0,[0,],"imageFor",0,[0,],"imageForState",0,[0,],"backgroundImageFor",0,[0,],"backgroundImageForState",0,[0,],"attributedTitleFor",0,[0,],"attributedTitleForState",0,[0,],"currentTitle",1,[],"currentTitleColor",0,[],"currentTitleShadowColor",1,[],"currentImage",1,[],"currentBackgroundImage",1,[],"currentAttributedTitle",1,[],"titleLabel",1,[],"imageView",1,[],"backgroundRectForBounds",0,[0,],"backgroundRectForBounds",0,[0,],"contentRectForBounds",0,[0,],"contentRectForBounds",0,[0,],"titleRectForContentRect",0,[0,],"titleRectForContentRect",0,[0,],"imageRectForContentRect",0,[0,],"imageRectForContentRect",0,[0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"ButtonType",0,[],"font",0,[],"lineBreakMode",0,[],"titleShadowOffset",0,[],"isSpringLoaded",0,[],"adjustsImageSizeForAccessibilityContentSizeCategory",0,[],],
UICloudSharingController:["deinit",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"delegate",0,[],"availablePermissions",0,[],"activityItemSource",0,[],"init",0,[],"PermissionOptions",0,[],],
UICloudSharingControllerDelegate:["cloudSharingControllerFailedToSaveShareWithError",0,[0,0,],"itemTitleFor",0,[0,],"itemTitleForCloudSharingController",0,[0,],"itemThumbnailDataFor",0,[0,],"itemThumbnailDataForCloudSharingController",0,[0,],"itemTypeFor",0,[0,],"itemTypeForCloudSharingController",0,[0,],"cloudSharingControllerDidSaveShare",0,[0,],"cloudSharingControllerDidStopSharing",0,[0,],],
UICollectionReusableView:["deinit",0,[],"reuseIdentifier",1,[],"prepareForReuse",0,[],"apply",0,[0,],"applyLayoutAttributes",0,[0,],"willTransitionFromTo",0,[0,0,],"willTransitionFromLayoutToLayout",0,[0,0,],"didTransitionFromTo",0,[0,0,],"didTransitionFromLayoutToLayout",0,[0,0,],"preferredLayoutAttributesFitting",0,[0,],"preferredLayoutAttributesFittingAttributes",0,[0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],],
UICollectionView:["deinit",0,[],"initFrameCGRectCollectionViewLayoutUICollectionViewLayout",0,[0,0,],"initCoderNSCoder",0,[0,],"collectionViewLayout",0,[],"delegate",0,[],"dataSource",0,[],"prefetchDataSource",0,[],"isPrefetchingEnabled",0,[],"prefetchingEnabled",0,[],"dragDelegate",0,[],"dropDelegate",0,[],"dragInteractionEnabled",0,[],"reorderingCadence",0,[],"backgroundView",1,[],"registerForCellWithReuseIdentifier",0,[1,0,],"registerClassForCellWithReuseIdentifier",0,[1,0,],"registerForCellWithReuseIdentifier",0,[1,0,],"registerNibForCellWithReuseIdentifier",0,[1,0,],"registerForSupplementaryViewOfKindWithReuseIdentifier",0,[1,0,0,],"registerClassForSupplementaryViewOfKindWithReuseIdentifier",0,[1,0,0,],"registerForSupplementaryViewOfKindWithReuseIdentifier",0,[1,0,0,],"registerNibForSupplementaryViewOfKindWithReuseIdentifier",0,[1,0,0,],"dequeueReusableCellWithReuseIdentifierFor",0,[0,0,],"dequeueReusableCellWithReuseIdentifierForIndexPath",0,[0,0,],"dequeueReusableSupplementaryViewOfKindWithReuseIdentifierFor",0,[0,0,0,],"dequeueReusableSupplementaryViewOfKindWithReuseIdentifierForIndexPath",0,[0,0,0,],"allowsSelection",0,[],"allowsMultipleSelection",0,[],"indexPathsForSelectedItems",1,[],"selectItemAtAnimatedScrollPosition",0,[1,0,0,],"selectItemAtIndexPathAnimatedScrollPosition",0,[1,0,0,],"deselectItemAtAnimated",0,[0,0,],"deselectItemAtIndexPathAnimated",0,[0,0,],"hasUncommittedUpdates",0,[],"reloadData",0,[],"setCollectionViewLayoutAnimated",0,[0,0,],"setCollectionViewLayoutAnimatedCompletion",0,[0,0,1,],"startInteractiveTransitionToCompletion",0,[0,1,],"startInteractiveTransitionToCollectionViewLayoutCompletion",0,[0,1,],"finishInteractiveTransition",0,[],"cancelInteractiveTransition",0,[],"numberOfSections",0,[],"numberOfItemsInSection",0,[0,],"numberOfItemsInSection",0,[0,],"layoutAttributesForItemAt",0,[0,],"layoutAttributesForItemAtIndexPath",0,[0,],"layoutAttributesForSupplementaryElementOfKindAt",0,[0,0,],"layoutAttributesForSupplementaryElementOfKindAtIndexPath",0,[0,0,],"indexPathForItemAt",0,[0,],"indexPathForItemAtPoint",0,[0,],"indexPathFor",0,[0,],"indexPathForCell",0,[0,],"cellForItemAt",0,[0,],"cellForItemAtIndexPath",0,[0,],"visibleCells",0,[],"indexPathsForVisibleItems",0,[],"supplementaryViewForElementKindAt",0,[0,0,],"supplementaryViewForElementKindAtIndexPath",0,[0,0,],"visibleSupplementaryViewsOfKind",0,[0,],"visibleSupplementaryViewsOfKind",0,[0,],"indexPathsForVisibleSupplementaryElementsOfKind",0,[0,],"indexPathsForVisibleSupplementaryElementsOfKind",0,[0,],"scrollToItemAtAtAnimated",0,[0,0,0,],"scrollToItemAtIndexPathAtScrollPositionAnimated",0,[0,0,0,],"insertSections",0,[0,],"deleteSections",0,[0,],"reloadSections",0,[0,],"moveSectionToSection",0,[0,0,],"insertItemsAt",0,[0,],"insertItemsAtIndexPaths",0,[0,],"deleteItemsAt",0,[0,],"deleteItemsAtIndexPaths",0,[0,],"reloadItemsAt",0,[0,],"reloadItemsAtIndexPaths",0,[0,],"moveItemAtTo",0,[0,0,],"moveItemAtIndexPathToIndexPath",0,[0,0,],"performBatchUpdatesCompletion",0,[1,1,],"beginInteractiveMovementForItemAt",0,[0,],"beginInteractiveMovementForItemAtIndexPath",0,[0,],"updateInteractiveMovementTargetPosition",0,[0,],"endInteractiveMovement",0,[],"cancelInteractiveMovement",0,[],"remembersLastFocusedIndexPath",0,[],"hasActiveDrag",0,[],"hasActiveDrop",0,[],"initFrameCGRect",0,[0,],"init",0,[],"presentationSectionIndexForDataSourceSectionIndex",0,[0,],"dataSourceSectionIndexForPresentationSectionIndex",0,[0,],"presentationIndexPathForDataSourceIndexPath",0,[1,],"dataSourceIndexPathForPresentationIndexPath",0,[1,],"performUsingPresentationValues",0,[0,],"ElementCategory",0,[],"elementKindSectionHeader",0,[],"elementKindSectionFooter",0,[],"ScrollDirection",0,[],"LayoutInteractiveTransitionCompletion",0,[],"ScrollPosition",0,[],"ReorderingCadence",0,[],"isSpringLoaded",0,[],],
UICollectionViewCell:["deinit",0,[],"contentView",0,[],"isSelected",0,[],"selected",0,[],"isHighlighted",0,[],"highlighted",0,[],"dragStateDidChange",0,[0,],"backgroundView",1,[],"selectedBackgroundView",1,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"DragState",0,[],],
UICollectionViewController:["deinit",0,[],"initCollectionViewLayoutUICollectionViewLayout",0,[0,],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"collectionView",1,[],"clearsSelectionOnViewWillAppear",0,[],"useLayoutToLayoutNavigationTransitions",0,[],"collectionViewLayout",0,[],"installsStandardGestureForInteractiveMovement",0,[],"init",0,[],"collectionViewShouldHighlightItemAt",0,[0,0,],"collectionViewDidHighlightItemAt",0,[0,0,],"collectionViewDidUnhighlightItemAt",0,[0,0,],"collectionViewShouldSelectItemAt",0,[0,0,],"collectionViewShouldDeselectItemAt",0,[0,0,],"collectionViewDidSelectItemAt",0,[0,0,],"collectionViewDidDeselectItemAt",0,[0,0,],"collectionViewWillDisplayForItemAt",0,[0,0,0,],"collectionViewWillDisplaySupplementaryViewForElementKindAt",0,[0,0,0,0,],"collectionViewDidEndDisplayingForItemAt",0,[0,0,0,],"collectionViewDidEndDisplayingSupplementaryViewForElementOfKindAt",0,[0,0,0,0,],"collectionViewShouldShowMenuForItemAt",0,[0,0,],"collectionViewCanPerformActionForItemAtWithSender",0,[0,0,0,1,],"collectionViewPerformActionForItemAtWithSender",0,[0,0,0,1,],"collectionViewTransitionLayoutForOldLayoutNewLayout",0,[0,0,0,],"collectionViewCanFocusItemAt",0,[0,0,],"collectionViewShouldUpdateFocusIn",0,[0,0,],"collectionViewDidUpdateFocusInWith",0,[0,0,0,],"indexPathForPreferredFocusedViewIn",0,[0,],"collectionViewTargetIndexPathForMoveFromItemAtToProposedIndexPath",0,[0,0,0,],"collectionViewTargetContentOffsetForProposedContentOffset",0,[0,0,],"collectionViewShouldSpringLoadItemAtWith",0,[0,0,0,],"scrollViewDidScroll",0,[0,],"scrollViewDidZoom",0,[0,],"scrollViewWillBeginDragging",0,[0,],"scrollViewWillEndDraggingWithVelocityTargetContentOffset",0,[0,0,0,],"scrollViewDidEndDraggingWillDecelerate",0,[0,0,],"scrollViewWillBeginDecelerating",0,[0,],"scrollViewDidEndDecelerating",0,[0,],"scrollViewDidEndScrollingAnimation",0,[0,],"viewForZoomingIn",0,[0,],"scrollViewWillBeginZoomingWith",0,[0,1,],"scrollViewDidEndZoomingWithAtScale",0,[0,1,0,],"scrollViewShouldScrollToTop",0,[0,],"scrollViewDidScrollToTop",0,[0,],"scrollViewDidChangeAdjustedContentInset",0,[0,],"collectionViewNumberOfItemsInSection",0,[0,0,],"collectionViewCellForItemAt",0,[0,0,],"numberOfSectionsIn",0,[0,],"collectionViewViewForSupplementaryElementOfKindAt",0,[0,0,0,],"collectionViewCanMoveItemAt",0,[0,0,],"collectionViewMoveItemAtTo",0,[0,0,0,],"indexTitlesFor",0,[0,],"collectionViewIndexPathForIndexTitleAt",0,[0,0,0,],],
UICollectionViewDataSource:["collectionViewNumberOfItemsInSection",0,[0,0,],"collectionViewCellForItemAt",0,[0,0,],"collectionViewCellForItemAtIndexPath",0,[0,0,],"numberOfSectionsIn",0,[0,],"numberOfSectionsInCollectionView",0,[0,],"collectionViewViewForSupplementaryElementOfKindAt",0,[0,0,0,],"collectionViewViewForSupplementaryElementOfKindAtIndexPath",0,[0,0,0,],"collectionViewCanMoveItemAt",0,[0,0,],"collectionViewCanMoveItemAtIndexPath",0,[0,0,],"collectionViewMoveItemAtTo",0,[0,0,0,],"collectionViewMoveItemAtIndexPathToIndexPath",0,[0,0,0,],"indexTitlesFor",0,[0,],"indexTitlesForCollectionView",0,[0,],"collectionViewIndexPathForIndexTitleAt",0,[0,0,0,],"collectionViewIndexPathForIndexTitleAtIndex",0,[0,0,0,],],
UICollectionViewDataSourcePrefetching:["collectionViewPrefetchItemsAt",0,[0,0,],"collectionViewPrefetchItemsAtIndexPaths",0,[0,0,],"collectionViewCancelPrefetchingForItemsAt",0,[0,0,],"collectionViewCancelPrefetchingForItemsAtIndexPaths",0,[0,0,],],
UICollectionViewDelegate:["collectionViewShouldHighlightItemAt",0,[0,0,],"collectionViewShouldHighlightItemAtIndexPath",0,[0,0,],"collectionViewDidHighlightItemAt",0,[0,0,],"collectionViewDidHighlightItemAtIndexPath",0,[0,0,],"collectionViewDidUnhighlightItemAt",0,[0,0,],"collectionViewDidUnhighlightItemAtIndexPath",0,[0,0,],"collectionViewShouldSelectItemAt",0,[0,0,],"collectionViewShouldSelectItemAtIndexPath",0,[0,0,],"collectionViewShouldDeselectItemAt",0,[0,0,],"collectionViewShouldDeselectItemAtIndexPath",0,[0,0,],"collectionViewDidSelectItemAt",0,[0,0,],"collectionViewDidSelectItemAtIndexPath",0,[0,0,],"collectionViewDidDeselectItemAt",0,[0,0,],"collectionViewDidDeselectItemAtIndexPath",0,[0,0,],"collectionViewWillDisplayForItemAt",0,[0,0,0,],"collectionViewWillDisplayCellForItemAtIndexPath",0,[0,0,0,],"collectionViewWillDisplaySupplementaryViewForElementKindAt",0,[0,0,0,0,],"collectionViewWillDisplaySupplementaryViewForElementKindAtIndexPath",0,[0,0,0,0,],"collectionViewDidEndDisplayingForItemAt",0,[0,0,0,],"collectionViewDidEndDisplayingCellForItemAtIndexPath",0,[0,0,0,],"collectionViewDidEndDisplayingSupplementaryViewForElementOfKindAt",0,[0,0,0,0,],"collectionViewDidEndDisplayingSupplementaryViewForElementOfKindAtIndexPath",0,[0,0,0,0,],"collectionViewShouldShowMenuForItemAt",0,[0,0,],"collectionViewShouldShowMenuForItemAtIndexPath",0,[0,0,],"collectionViewCanPerformActionForItemAtWithSender",0,[0,0,0,1,],"collectionViewCanPerformActionForItemAtIndexPathWithSender",0,[0,0,0,1,],"collectionViewPerformActionForItemAtWithSender",0,[0,0,0,1,],"collectionViewPerformActionForItemAtIndexPathWithSender",0,[0,0,0,1,],"collectionViewTransitionLayoutForOldLayoutNewLayout",0,[0,0,0,],"collectionViewCanFocusItemAt",0,[0,0,],"collectionViewCanFocusItemAtIndexPath",0,[0,0,],"collectionViewShouldUpdateFocusIn",0,[0,0,],"collectionViewShouldUpdateFocusInContext",0,[0,0,],"collectionViewDidUpdateFocusInWith",0,[0,0,0,],"collectionViewDidUpdateFocusInContextWithAnimationCoordinator",0,[0,0,0,],"indexPathForPreferredFocusedViewIn",0,[0,],"indexPathForPreferredFocusedViewInCollectionView",0,[0,],"collectionViewTargetIndexPathForMoveFromItemAtToProposedIndexPath",0,[0,0,0,],"collectionViewTargetIndexPathForMoveFromItemAtIndexPathToProposedIndexPath",0,[0,0,0,],"collectionViewTargetContentOffsetForProposedContentOffset",0,[0,0,],"collectionViewShouldSpringLoadItemAtWith",0,[0,0,0,],"collectionViewShouldSpringLoadItemAtIndexPathWithContext",0,[0,0,0,],],
UICollectionViewDelegateFlowLayout:["collectionViewLayoutSizeForItemAt",0,[0,0,0,],"collectionViewLayoutSizeForItemAtIndexPath",0,[0,0,0,],"collectionViewLayoutInsetForSectionAt",0,[0,0,0,],"collectionViewLayoutInsetForSectionAtIndex",0,[0,0,0,],"collectionViewLayoutMinimumLineSpacingForSectionAt",0,[0,0,0,],"collectionViewLayoutMinimumLineSpacingForSectionAtIndex",0,[0,0,0,],"collectionViewLayoutMinimumInteritemSpacingForSectionAt",0,[0,0,0,],"collectionViewLayoutMinimumInteritemSpacingForSectionAtIndex",0,[0,0,0,],"collectionViewLayoutReferenceSizeForHeaderInSection",0,[0,0,0,],"collectionViewLayoutReferenceSizeForFooterInSection",0,[0,0,0,],],
UICollectionViewDragDelegate:["collectionViewItemsForBeginningAt",0,[0,0,0,],"collectionViewItemsForBeginningDragSessionAtIndexPath",0,[0,0,0,],"collectionViewItemsForAddingToAtPoint",0,[0,0,0,0,],"collectionViewItemsForAddingToDragSessionAtIndexPathPoint",0,[0,0,0,0,],"collectionViewDragPreviewParametersForItemAt",0,[0,0,],"collectionViewDragPreviewParametersForItemAtIndexPath",0,[0,0,],"collectionViewDragSessionWillBegin",0,[0,0,],"collectionViewDragSessionDidEnd",0,[0,0,],"collectionViewDragSessionAllowsMoveOperation",0,[0,0,],"collectionViewDragSessionIsRestrictedToDraggingApplication",0,[0,0,],],
UICollectionViewDropCoordinator:["items",0,[],"destinationIndexPath",1,[],"proposal",0,[],"session",0,[],"dropTo",0,[0,0,],"dropItemToPlaceholder",0,[0,0,],"dropToItemAt",0,[0,0,],"dropItemToItemAtIndexPath",0,[0,0,],"dropIntoItemAtRect",0,[0,0,0,],"dropItemIntoItemAtIndexPathRect",0,[0,0,0,],"dropTo",0,[0,0,],"dropItemToTarget",0,[0,0,],],
UICollectionViewDropDelegate:["collectionViewPerformDropWith",0,[0,0,],"collectionViewPerformDropWithCoordinator",0,[0,0,],"collectionViewCanHandle",0,[0,0,],"collectionViewCanHandleDropSession",0,[0,0,],"collectionViewDropSessionDidEnter",0,[0,0,],"collectionViewDropSessionDidUpdateWithDestinationIndexPath",0,[0,0,1,],"collectionViewDropSessionDidExit",0,[0,0,],"collectionViewDropSessionDidEnd",0,[0,0,],"collectionViewDropPreviewParametersForItemAt",0,[0,0,],"collectionViewDropPreviewParametersForItemAtIndexPath",0,[0,0,],],
UICollectionViewDropItem:["dragItem",0,[],"sourceIndexPath",1,[],"previewSize",0,[],],
UICollectionViewDropPlaceholder:["deinit",0,[],"previewParametersProvider",1,[],"initInsertionIndexPathIndexPathReuseIdentifierString",0,[0,0,],"init",0,[],],
UICollectionViewDropPlaceholderContext:["dragItem",0,[],"commitInsertionDataSourceUpdates",0,[0,],"commitInsertionWithDataSourceUpdates",0,[0,],"deletePlaceholder",0,[],"setNeedsCellUpdate",0,[],],
UICollectionViewDropProposal:["deinit",0,[],"initOperationUIDropOperationIntentUICollectionViewDropProposalIntent",0,[0,0,],"initDropOperationUIDropOperationIntentUICollectionViewDropProposalIntent",0,[0,0,],"intent",0,[],"initOperationUIDropOperation",0,[0,],"init",0,[],"Intent",0,[],],
UICollectionViewFlowLayout:["deinit",0,[],"minimumLineSpacing",0,[],"minimumInteritemSpacing",0,[],"itemSize",0,[],"estimatedItemSize",0,[],"scrollDirection",0,[],"headerReferenceSize",0,[],"footerReferenceSize",0,[],"sectionInset",0,[],"sectionInsetReference",0,[],"sectionHeadersPinToVisibleBounds",0,[],"sectionFootersPinToVisibleBounds",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"automaticSize",0,[],"SectionInsetReference",0,[],],
UICollectionViewFlowLayoutInvalidationContext:["deinit",0,[],"invalidateFlowLayoutDelegateMetrics",0,[],"invalidateFlowLayoutAttributes",0,[],"init",0,[],],
UICollectionViewFocusUpdateContext:["deinit",0,[],"previouslyFocusedIndexPath",1,[],"nextFocusedIndexPath",1,[],"init",0,[],],
UICollectionViewLayout:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"collectionView",1,[],"invalidateLayout",0,[],"invalidateLayoutWith",0,[0,],"invalidateLayoutWithContext",0,[0,],"registerForDecorationViewOfKind",0,[1,0,],"registerClassForDecorationViewOfKind",0,[1,0,],"registerForDecorationViewOfKind",0,[1,0,],"registerNibForDecorationViewOfKind",0,[1,0,],"encodeWith",0,[0,],"layoutAttributesClass",0,[],"invalidationContextClass",0,[],"prepare",0,[],"prepareLayout",0,[],"layoutAttributesForElementsIn",0,[0,],"layoutAttributesForElementsInRect",0,[0,],"layoutAttributesForItemAt",0,[0,],"layoutAttributesForItemAtIndexPath",0,[0,],"layoutAttributesForSupplementaryViewOfKindAt",0,[0,0,],"layoutAttributesForSupplementaryViewOfKindAtIndexPath",0,[0,0,],"layoutAttributesForDecorationViewOfKindAt",0,[0,0,],"layoutAttributesForDecorationViewOfKindAtIndexPath",0,[0,0,],"shouldInvalidateLayoutForBoundsChange",0,[0,],"shouldInvalidateLayoutForBoundsChange",0,[0,],"invalidationContextForBoundsChange",0,[0,],"invalidationContextForBoundsChange",0,[0,],"shouldInvalidateLayoutForPreferredLayoutAttributesWithOriginalAttributes",0,[0,0,],"shouldInvalidateLayoutForPreferredLayoutAttributesWithOriginalAttributes",0,[0,0,],"invalidationContextForPreferredLayoutAttributesWithOriginalAttributes",0,[0,0,],"invalidationContextForPreferredLayoutAttributesWithOriginalAttributes",0,[0,0,],"targetContentOffsetForProposedContentOffsetWithScrollingVelocity",0,[0,0,],"targetContentOffsetForProposedContentOffsetWithScrollingVelocity",0,[0,0,],"targetContentOffsetForProposedContentOffset",0,[0,],"targetContentOffsetForProposedContentOffset",0,[0,],"collectionViewContentSize",0,[],"developmentLayoutDirection",0,[],"flipsHorizontallyInOppositeLayoutDirection",0,[],"prepareForCollectionViewUpdates",0,[0,],"prepareForCollectionViewUpdates",0,[0,],"finalizeCollectionViewUpdates",0,[],"prepareForAnimatedBoundsChange",0,[0,],"prepareForAnimatedBoundsChange",0,[0,],"finalizeAnimatedBoundsChange",0,[],"prepareForTransitionTo",0,[0,],"prepareForTransitionToLayout",0,[0,],"prepareForTransitionFrom",0,[0,],"prepareForTransitionFromLayout",0,[0,],"finalizeLayoutTransition",0,[],"initialLayoutAttributesForAppearingItemAt",0,[0,],"initialLayoutAttributesForAppearingItemAtIndexPath",0,[0,],"finalLayoutAttributesForDisappearingItemAt",0,[0,],"finalLayoutAttributesForDisappearingItemAtIndexPath",0,[0,],"initialLayoutAttributesForAppearingSupplementaryElementOfKindAt",0,[0,0,],"initialLayoutAttributesForAppearingSupplementaryElementOfKindAtIndexPath",0,[0,0,],"finalLayoutAttributesForDisappearingSupplementaryElementOfKindAt",0,[0,0,],"finalLayoutAttributesForDisappearingSupplementaryElementOfKindAtIndexPath",0,[0,0,],"initialLayoutAttributesForAppearingDecorationElementOfKindAt",0,[0,0,],"initialLayoutAttributesForAppearingDecorationElementOfKindAtIndexPath",0,[0,0,],"finalLayoutAttributesForDisappearingDecorationElementOfKindAt",0,[0,0,],"finalLayoutAttributesForDisappearingDecorationElementOfKindAtIndexPath",0,[0,0,],"indexPathsToDeleteForSupplementaryViewOfKind",0,[0,],"indexPathsToDeleteForSupplementaryViewOfKind",0,[0,],"indexPathsToDeleteForDecorationViewOfKind",0,[0,],"indexPathsToDeleteForDecorationViewOfKind",0,[0,],"indexPathsToInsertForSupplementaryViewOfKind",0,[0,],"indexPathsToInsertForSupplementaryViewOfKind",0,[0,],"indexPathsToInsertForDecorationViewOfKind",0,[0,],"indexPathsToInsertForDecorationViewOfKind",0,[0,],"targetIndexPathForInteractivelyMovingItemWithPosition",0,[0,0,],"targetIndexPathForInteractivelyMovingItemWithPosition",0,[0,0,],"layoutAttributesForInteractivelyMovingItemAtWithTargetPosition",0,[0,0,],"layoutAttributesForInteractivelyMovingItemAtIndexPathWithTargetPosition",0,[0,0,],"invalidationContextForInteractivelyMovingItemsWithTargetPositionPreviousIndexPathsPreviousPosition",0,[0,0,0,0,],"invalidationContextForInteractivelyMovingItemsWithTargetPositionPreviousIndexPathsPreviousPosition",0,[0,0,0,0,],"invalidationContextForEndingInteractiveMovementOfItemsToFinalIndexPathsPreviousIndexPathsMovementCancelled",0,[0,0,0,],"invalidationContextForEndingInteractiveMovementOfItemsToFinalIndexPathsPreviousIndexPathsMovementCancelled",0,[0,0,0,],],
UICollectionViewLayoutAttributes:["deinit",0,[],"_frame",0,[],"center",0,[],"size",0,[],"transform3D",0,[],"bounds",0,[],"transform",0,[],"alpha",0,[],"zIndex",0,[],"isHidden",0,[],"_hidden",0,[],"indexPath",0,[],"representedElementCategory",0,[],"representedElementKind",1,[],"initForCellWithIndexPath",0,[0,],"initForCellWithIndexPathIndexPath",0,[0,],"layoutAttributesForCellWithIndexPath",0,[0,],"initForSupplementaryViewOfKindStringWithIndexPath",0,[0,0,],"initForSupplementaryViewOfKindStringWithIndexPathIndexPath",0,[0,0,],"layoutAttributesForSupplementaryViewOfKindWithIndexPath",0,[0,0,],"initForDecorationViewOfKindStringWithIndexPath",0,[0,0,],"initForDecorationViewOfKindStringWithIndexPathIndexPath",0,[0,0,],"layoutAttributesForDecorationViewOfKindWithIndexPath",0,[0,0,],"init",0,[],"collisionBoundsType",0,[],"collisionBoundingPath",0,[],"copyWith",0,[1,],],
UICollectionViewLayoutInvalidationContext:["deinit",0,[],"invalidateEverything",0,[],"invalidateDataSourceCounts",0,[],"invalidateItemsAt",0,[0,],"invalidateItemsAtIndexPaths",0,[0,],"invalidateSupplementaryElementsOfKindAt",0,[0,0,],"invalidateSupplementaryElementsOfKindAtIndexPaths",0,[0,0,],"invalidateDecorationElementsOfKindAt",0,[0,0,],"invalidateDecorationElementsOfKindAtIndexPaths",0,[0,0,],"invalidatedItemIndexPaths",1,[],"invalidatedSupplementaryIndexPaths",1,[],"invalidatedDecorationIndexPaths",1,[],"contentOffsetAdjustment",0,[],"contentSizeAdjustment",0,[],"previousIndexPathsForInteractivelyMovingItems",1,[],"targetIndexPathsForInteractivelyMovingItems",1,[],"interactiveMovementTarget",0,[],"init",0,[],],
UICollectionViewPlaceholder:["deinit",0,[],"initInsertionIndexPathIndexPathReuseIdentifierString",0,[0,0,],"init",0,[],"_new",0,[],"cellUpdateHandler",1,[],],
UICollectionViewTransitionLayout:["deinit",0,[],"transitionProgress",0,[],"currentLayout",0,[],"nextLayout",0,[],"initCurrentLayoutUICollectionViewLayoutNextLayoutUICollectionViewLayout",0,[0,0,],"initCoderNSCoder",0,[0,],"init",0,[],"updateValueForAnimatedKey",0,[0,0,],"valueForAnimatedKey",0,[0,],"valueForAnimatedKey",0,[0,],],
UICollectionViewUpdateItem:["deinit",0,[],"indexPathBeforeUpdate",1,[],"indexPathAfterUpdate",1,[],"updateAction",0,[],"init",0,[],"Action",0,[],],
UICollisionBehavior:["deinit",0,[],"initItemsArray",0,[0,],"addItem",0,[0,],"removeItem",0,[0,],"items",0,[],"collisionMode",0,[],"translatesReferenceBoundsIntoBoundary",0,[],"setTranslatesReferenceBoundsIntoBoundaryWith",0,[0,],"setTranslatesReferenceBoundsIntoBoundaryWithInsets",0,[0,],"addBoundaryWithIdentifierFor",0,[0,0,],"addBoundaryWithIdentifierForPath",0,[0,0,],"addBoundaryWithIdentifierFromTo",0,[0,0,0,],"addBoundaryWithIdentifierFromPointToPoint",0,[0,0,0,],"boundaryWithIdentifier",0,[0,],"boundaryWithIdentifier",0,[0,],"removeBoundaryWithIdentifier",0,[0,],"removeBoundaryWithIdentifier",0,[0,],"boundaryIdentifiers",1,[],"removeAllBoundaries",0,[],"collisionDelegate",0,[],"init",0,[],"Mode",0,[],],
UICollisionBehaviorDelegate:["collisionBehaviorBeganContactForWithAt",0,[0,0,0,0,],"collisionBehaviorBeganContactForItemWithItemAtPoint",0,[0,0,0,0,],"collisionBehaviorEndedContactForWith",0,[0,0,0,],"collisionBehaviorEndedContactForItemWithItem",0,[0,0,0,],"collisionBehaviorBeganContactForWithBoundaryIdentifierAt",0,[0,0,1,0,],"collisionBehaviorBeganContactForItemWithBoundaryIdentifierAtPoint",0,[0,0,1,0,],"collisionBehaviorEndedContactForWithBoundaryIdentifier",0,[0,0,1,],"collisionBehaviorEndedContactForItemWithBoundaryIdentifier",0,[0,0,1,],],
UIColor:["deinit",0,[],"initWhiteCGFloatAlphaCGFloat",0,[0,0,],"colorWithWhiteAlpha",0,[0,0,],"initHueCGFloatSaturationCGFloatBrightnessCGFloatAlphaCGFloat",0,[0,0,0,0,],"colorWithHueSaturationBrightnessAlpha",0,[0,0,0,0,],"initRedCGFloatGreenCGFloatBlueCGFloatAlphaCGFloat",0,[0,0,0,0,],"colorWithRedGreenBlueAlpha",0,[0,0,0,0,],"initDisplayP3RedCGFloatGreenCGFloatBlueCGFloatAlphaCGFloat",0,[0,0,0,0,],"colorWithDisplayP3RedGreenBlueAlpha",0,[0,0,0,0,],"initCgColorCGColor",0,[0,],"initCGColorCGColor",0,[0,],"colorWithCGColor",0,[0,],"initPatternImageUIImage",0,[0,],"colorWithPatternImage",0,[0,],"initCiColorCIColor",0,[0,],"initCIColorCIColor",0,[0,],"colorWithCIColor",0,[0,],"initWhiteCGFloatAlphaCGFloat",0,[0,0,],"initHueCGFloatSaturationCGFloatBrightnessCGFloatAlphaCGFloat",0,[0,0,0,0,],"initRedCGFloatGreenCGFloatBlueCGFloatAlphaCGFloat",0,[0,0,0,0,],"initDisplayP3RedCGFloatGreenCGFloatBlueCGFloatAlphaCGFloat",0,[0,0,0,0,],"initCgColorCGColor",0,[0,],"initCGColorCGColor",0,[0,],"initPatternImageUIImage",0,[0,],"initCiColorCIColor",0,[0,],"initCIColorCIColor",0,[0,],"black",0,[],"blackColor",0,[],"darkGray",0,[],"darkGrayColor",0,[],"lightGray",0,[],"lightGrayColor",0,[],"white",0,[],"whiteColor",0,[],"gray",0,[],"grayColor",0,[],"red",0,[],"redColor",0,[],"green",0,[],"greenColor",0,[],"blue",0,[],"blueColor",0,[],"cyan",0,[],"cyanColor",0,[],"yellow",0,[],"yellowColor",0,[],"magenta",0,[],"magentaColor",0,[],"orange",0,[],"orangeColor",0,[],"purple",0,[],"purpleColor",0,[],"brown",0,[],"brownColor",0,[],"clear",0,[],"clearColor",0,[],"set",0,[],"setFill",0,[],"setStroke",0,[],"getWhiteAlpha",0,[1,1,],"getHueSaturationBrightnessAlpha",0,[1,1,1,1,],"getRedGreenBlueAlpha",0,[1,1,1,1,],"withAlphaComponent",0,[0,],"colorWithAlphaComponent",0,[0,],"cgColor",0,[],"CGColor",0,[],"ciColor",0,[],"CIColor",0,[],"init",0,[],"supportsSecureCoding",0,[],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],"copyWith",0,[1,],"readableTypeIdentifiersForItemProvider",0,[],"writableTypeIdentifiersForItemProvider",0,[],"writableTypeIdentifiersForItemProvider",0,[],"objectWithItemProviderDataTypeIdentifier",0,[0,0,],"itemProviderVisibilityForRepresentationWithTypeIdentifier",0,[0,],"itemProviderVisibilityForRepresentationWithTypeIdentifier",0,[0,],"loadDataWithTypeIdentifierForItemProviderCompletionHandler",0,[0,0,],"initNamedString",0,[0,],"colorNamed",0,[0,],"initNamedStringInOptionalCompatibleWithOptional",0,[0,1,1,],"initNamedStringInBundleOptionalCompatibleWithTraitCollectionOptional",0,[0,1,1,],"colorNamedInBundleCompatibleWithTraitCollection",0,[0,1,1,],"lightText",0,[],"lightTextColor",0,[],"darkText",0,[],"darkTextColor",0,[],"groupTableViewBackground",0,[],"groupTableViewBackgroundColor",0,[],"viewFlipsideBackground",0,[],"viewFlipsideBackgroundColor",0,[],"scrollViewTexturedBackground",0,[],"scrollViewTexturedBackgroundColor",0,[],"underPageBackground",0,[],"underPageBackgroundColor",0,[],"init_colorLiteralRedFloatGreenFloatBlueFloatAlphaFloat",0,[0,0,0,0,],],
UIContentContainer:["preferredContentSize",0,[],"preferredContentSizeDidChangeForChildContentContainer",0,[0,],"preferredContentSizeDidChangeForChildContentContainer",0,[0,],"systemLayoutFittingSizeDidChangeForChildContentContainer",0,[0,],"systemLayoutFittingSizeDidChangeForChildContentContainer",0,[0,],"sizeForChildContentContainerWithParentContainerSize",0,[0,0,],"sizeForChildContentContainerWithParentContainerSize",0,[0,0,],"viewWillTransitionToWith",0,[0,0,],"viewWillTransitionToSizeWithTransitionCoordinator",0,[0,0,],"willTransitionToWith",0,[0,0,],"willTransitionToTraitCollectionWithTransitionCoordinator",0,[0,0,],],
UIContentSizeCategory:["initRawValueString",0,[0,],"_rawValue",0,[],"rawValue",0,[],"_",0,[],"RawValue",0,[],"_ObjectiveCType",0,[],"unspecified",0,[],"extraSmall",0,[],"small",0,[],"medium",0,[],"large",0,[],"extraLarge",0,[],"extraExtraLarge",0,[],"extraExtraExtraLarge",0,[],"accessibilityMedium",0,[],"accessibilityLarge",0,[],"accessibilityExtraLarge",0,[],"accessibilityExtraExtraLarge",0,[],"accessibilityExtraExtraExtraLarge",0,[],"didChangeNotification",0,[],"newValueUserInfoKey",0,[],"isAccessibilityCategory",0,[],"_",0,[],"infix_60",0,[0,0,],"infix_60_61",0,[0,0,],"infix_62",0,[0,0,],"infix_62_61",0,[0,0,],],
UIContentSizeCategoryAdjusting:["adjustsFontForContentSizeCategory",0,[],],
UIContextualAction:["deinit",0,[],"initStyleUIContextualActionStyleTitleOptionalHandlerUIContextualActionHandler",0,[0,1,0,],"contextualActionWithStyleTitleHandler",0,[0,1,0,],"style",0,[],"handler",0,[],"title",1,[],"backgroundColor",1,[],"_image",1,[],"init",0,[],"Handler",0,[],"Style",0,[],],
UIControl:["deinit",0,[],"isEnabled",0,[],"enabled",0,[],"isSelected",0,[],"selected",0,[],"isHighlighted",0,[],"highlighted",0,[],"contentVerticalAlignment",0,[],"contentHorizontalAlignment",0,[],"effectiveContentHorizontalAlignment",0,[],"state",0,[],"isTracking",0,[],"tracking",0,[],"isTouchInside",0,[],"touchInside",0,[],"beginTrackingWith",0,[0,1,],"beginTrackingWithTouchWithEvent",0,[0,1,],"continueTrackingWith",0,[0,1,],"continueTrackingWithTouchWithEvent",0,[0,1,],"endTrackingWith",0,[1,1,],"endTrackingWithTouchWithEvent",0,[1,1,],"cancelTrackingWith",0,[1,],"cancelTrackingWithEvent",0,[1,],"addTargetActionFor",0,[1,0,0,],"addTargetActionForControlEvents",0,[1,0,0,],"removeTargetActionFor",0,[1,1,0,],"removeTargetActionForControlEvents",0,[1,1,0,],"allTargets",0,[],"allControlEvents",0,[],"actionsForTargetForControlEvent",0,[1,0,],"actionsForTargetForControlEvent",0,[1,0,],"sendActionToFor",0,[0,1,1,],"sendActionToForEvent",0,[0,1,1,],"sendActionsFor",0,[0,],"sendActionsForControlEvents",0,[0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"Event",0,[],"ContentVerticalAlignment",0,[],"ContentHorizontalAlignment",0,[],"State",0,[],],
UICoordinateSpace:["convertTo",0,[0,0,],"convertPointToCoordinateSpace",0,[0,0,],"convertFrom",0,[0,0,],"convertPointFromCoordinateSpace",0,[0,0,],"convertTo",0,[0,0,],"convertRectToCoordinateSpace",0,[0,0,],"convertFrom",0,[0,0,],"convertRectFromCoordinateSpace",0,[0,0,],"bounds",0,[],],
UICubicTimingParameters:["deinit",0,[],"animationCurve",0,[],"controlPoint1",0,[],"controlPoint2",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"initAnimationCurveUIViewAnimationCurve",0,[0,],"initControlPoint1CGPointControlPoint2CGPoint",0,[0,0,],"timingCurveType",0,[],"cubicTimingParameters",1,[],"springTimingParameters",1,[],"encodeWith",0,[0,],"copyWith",0,[1,],],
UIDataDetectorTypes:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"phoneNumber",0,[],"_",0,[],"PhoneNumber",0,[],"_",0,[],"_link",0,[],"_",0,[],"Link",0,[],"_",0,[],"address",0,[],"_",0,[],"Address",0,[],"_",0,[],"calendarEvent",0,[],"_",0,[],"CalendarEvent",0,[],"_",0,[],"shipmentTrackingNumber",0,[],"_",0,[],"ShipmentTrackingNumber",0,[],"_",0,[],"flightNumber",0,[],"_",0,[],"FlightNumber",0,[],"_",0,[],"lookupSuggestion",0,[],"_",0,[],"LookupSuggestion",0,[],"_",0,[],"none",0,[],"_",0,[],"None",0,[],"_",0,[],"_all",0,[],"_",0,[],"All",0,[],"_",0,[],],
UIDataSourceModelAssociation:["modelIdentifierForElementAtIn",0,[0,0,],"modelIdentifierForElementAtIndexPathInView",0,[0,0,],"indexPathForElementWithModelIdentifierIn",0,[0,0,],"indexPathForElementWithModelIdentifierInView",0,[0,0,],],
UIDataSourceTranslating:["presentationSectionIndexForDataSourceSectionIndex",0,[0,],"presentationSectionIndexForDataSourceSectionIndex",0,[0,],"dataSourceSectionIndexForPresentationSectionIndex",0,[0,],"dataSourceSectionIndexForPresentationSectionIndex",0,[0,],"presentationIndexPathForDataSourceIndexPath",0,[1,],"presentationIndexPathForDataSourceIndexPath",0,[1,],"dataSourceIndexPathForPresentationIndexPath",0,[1,],"dataSourceIndexPathForPresentationIndexPath",0,[1,],"performUsingPresentationValues",0,[0,],],
UIDatePicker:["deinit",0,[],"datePickerMode",0,[],"locale",1,[],"calendar",1,[],"timeZone",1,[],"date",0,[],"minimumDate",1,[],"maximumDate",1,[],"countDownDuration",0,[],"minuteInterval",0,[],"setDateAnimated",0,[0,0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"Mode",0,[],],
UIDevice:["deinit",0,[],"current",0,[],"currentDevice",0,[],"_name",0,[],"model",0,[],"localizedModel",0,[],"systemName",0,[],"systemVersion",0,[],"orientation",0,[],"identifierForVendor",1,[],"isGeneratingDeviceOrientationNotifications",0,[],"generatesDeviceOrientationNotifications",0,[],"beginGeneratingDeviceOrientationNotifications",0,[],"endGeneratingDeviceOrientationNotifications",0,[],"isBatteryMonitoringEnabled",0,[],"batteryMonitoringEnabled",0,[],"batteryState",0,[],"batteryLevel",0,[],"isProximityMonitoringEnabled",0,[],"proximityMonitoringEnabled",0,[],"proximityState",0,[],"isMultitaskingSupported",0,[],"multitaskingSupported",0,[],"userInterfaceIdiom",0,[],"playInputClick",0,[],"init",0,[],"orientationDidChangeNotification",0,[],"batteryStateDidChangeNotification",0,[],"batteryLevelDidChangeNotification",0,[],"proximityStateDidChangeNotification",0,[],"BatteryState",0,[],],
UIDeviceOrientation:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unknown",0,[],"Unknown",0,[],"_",0,[],"portrait",0,[],"Portrait",0,[],"_",0,[],"portraitUpsideDown",0,[],"PortraitUpsideDown",0,[],"_",0,[],"landscapeLeft",0,[],"LandscapeLeft",0,[],"_",0,[],"landscapeRight",0,[],"LandscapeRight",0,[],"_",0,[],"faceUp",0,[],"FaceUp",0,[],"_",0,[],"faceDown",0,[],"FaceDown",0,[],"_",0,[],"_",0,[],"isPortrait",0,[],"_",0,[],"isLandscape",0,[],"_",0,[],"isFlat",0,[],"_",0,[],"isValidInterfaceOrientation",0,[],],
UIDictationPhrase:["deinit",0,[],"text",0,[],"alternativeInterpretations",1,[],"init",0,[],],
UIDisplayGamut:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unspecified",0,[],"Unspecified",0,[],"_",0,[],"SRGB",0,[],"P3",0,[],],
UIDocument:["deinit",0,[],"initFileURLURL",0,[0,],"fileURL",0,[],"localizedName",0,[],"fileType",1,[],"fileModificationDate",1,[],"documentState",0,[],"progress",1,[],"openCompletionHandler",0,[1,],"openWithCompletionHandler",0,[1,],"closeCompletionHandler",0,[1,],"closeWithCompletionHandler",0,[1,],"loadFromContentsOfType",0,[0,1,],"loadFromContentsOfType",0,[0,1,],"contentsForType",0,[0,],"contentsForType",0,[0,],"disableEditing",0,[],"enableEditing",0,[],"undoManager",1,[],"hasUnsavedChanges",0,[],"updateChangeCount",0,[0,],"changeCountTokenFor",0,[0,],"changeCountTokenForSaveOperation",0,[0,],"updateChangeCountWithTokenFor",0,[0,0,],"updateChangeCountWithTokenForSaveOperation",0,[0,0,],"saveToForCompletionHandler",0,[0,0,1,],"saveToURLForSaveOperationCompletionHandler",0,[0,0,1,],"autosaveCompletionHandler",0,[1,],"autosaveWithCompletionHandler",0,[1,],"savingFileType",1,[],"fileNameExtensionForTypeSaveOperation",0,[1,0,],"fileNameExtensionForTypeSaveOperation",0,[1,0,],"writeContentsAndAttributesSafelyToFor",0,[0,1,0,0,],"writeContentsAndAttributesSafelyToURLForSaveOperation",0,[0,1,0,0,],"writeContentsToForOriginalContentsURL",0,[0,0,0,1,],"writeContentsToURLForSaveOperationOriginalContentsURL",0,[0,0,0,1,],"fileAttributesToWriteToFor",0,[0,0,],"fileAttributesToWriteToURLForSaveOperation",0,[0,0,],"readFrom",0,[0,],"readFromURL",0,[0,],"performAsynchronousFileAccess",0,[0,],"performAsynchronousFileAccessUsingBlock",0,[0,],"handleErrorUserInteractionPermitted",0,[0,0,],"finishedHandlingErrorRecovered",0,[0,0,],"userInteractionNoLongerPermittedForError",0,[0,],"userInteractionNoLongerPermittedForError",0,[0,],"revertToContentsOfCompletionHandler",0,[0,1,],"revertToContentsOfURLCompletionHandler",0,[0,1,],"init",0,[],"presentedItemURL",1,[],"presentedItemOperationQueue",0,[],"primaryPresentedItemURL",1,[],"observedPresentedItemUbiquityAttributes",0,[],"relinquishPresentedItemToReader",0,[0,],"relinquishPresentedItemToWriter",0,[0,],"savePresentedItemChangesCompletionHandler",0,[0,],"accommodatePresentedItemDeletionCompletionHandler",0,[0,],"presentedItemDidMoveTo",0,[0,],"presentedItemDidChange",0,[],"presentedItemDidChangeUbiquityAttributes",0,[0,],"presentedItemDidGain",0,[0,],"presentedItemDidLose",0,[0,],"presentedItemDidResolveConflict",0,[0,],"accommodatePresentedSubitemDeletionAtCompletionHandler",0,[0,0,],"presentedSubitemDidAppearAt",0,[0,],"presentedSubitemAtDidMoveTo",0,[0,0,],"presentedSubitemDidChangeAt",0,[0,],"presentedSubitemAtDidGain",0,[0,0,],"presentedSubitemAtDidLose",0,[0,0,],"presentedSubitemAtDidResolve",0,[0,0,],"userActivityURLKey",0,[],"ChangeKind",0,[],"SaveOperation",0,[],"State",0,[],"stateChangedNotification",0,[],"userActivity",1,[],"updateUserActivityState",0,[0,],"restoreUserActivityState",0,[0,],],
UIDocumentBrowserAction:["deinit",0,[],"init",0,[],"initIdentifierStringLocalizedTitleStringAvailabilityUIDocumentBrowserActionAvailabilityHandlerfunction_type",0,[0,0,0,0,],"identifier",0,[],"localizedTitle",0,[],"availability",0,[],"_image",1,[],"supportedContentTypes",0,[],"supportsMultipleItems",0,[],"Availability",0,[],],
UIDocumentBrowserError:["_nsError",0,[],"init_nsErrorNSError",0,[0,],"errorDomain",0,[],"_",0,[],"Code",0,[],"generic",0,[],"_",0,[],"noLocationAvailable",0,[],"_",0,[],],
UIDocumentBrowserTransitionController:["deinit",0,[],"init",0,[],"loadingProgress",1,[],"targetView",0,[],"transitionDurationUsing",0,[1,],"animateTransitionUsing",0,[0,],"interruptibleAnimatorUsing",0,[0,],"animationEnded",0,[0,],],
UIDocumentBrowserViewController:["deinit",0,[],"initForOpeningFilesWithContentTypesOptional",0,[1,],"initNibNameOptionalBundleOptional",0,[1,1,],"delegate",0,[],"allowsDocumentCreation",0,[],"allowsPickingMultipleItems",0,[],"allowedContentTypes",0,[],"additionalLeadingNavigationBarButtonItems",0,[],"additionalTrailingNavigationBarButtonItems",0,[],"revealDocumentAtImportIfNeededCompletion",0,[0,0,1,],"revealDocumentAtURLImportIfNeededCompletion",0,[0,0,1,],"importDocumentAtNextToDocumentAtModeCompletionHandler",0,[0,0,0,0,],"importDocumentAtURLNextToDocumentAtURLModeCompletionHandler",0,[0,0,0,0,],"transitionControllerForDocumentAt",0,[0,],"transitionControllerForDocumentAtURL",0,[0,],"transitionControllerForDocumentURL",0,[0,],"transitionControllerForDocumentURL",0,[0,],"customActions",0,[],"browserUserInterfaceStyle",0,[],"initCoderNSCoder",0,[0,],"init",0,[],"ImportMode",0,[],"BrowserUserInterfaceStyle",0,[],],
UIDocumentBrowserViewControllerDelegate:["documentBrowserDidPickDocumentURLs",0,[0,0,],"documentBrowserDidPickDocumentsAt",0,[0,0,],"documentBrowserDidPickDocumentsAtURLs",0,[0,0,],"documentBrowserDidRequestDocumentCreationWithHandler",0,[0,0,],"documentBrowserDidImportDocumentAtToDestinationURL",0,[0,0,0,],"documentBrowserDidImportDocumentAtURLToDestinationURL",0,[0,0,0,],"documentBrowserFailedToImportDocumentAtError",0,[0,0,1,],"documentBrowserFailedToImportDocumentAtURLError",0,[0,0,1,],"documentBrowserApplicationActivitiesForDocumentURLs",0,[0,0,],"documentBrowserWillPresent",0,[0,0,],"documentBrowserWillPresentActivityViewController",0,[0,0,],],
UIDocumentInteractionController:["deinit",0,[],"initUrlURL",0,[0,],"initURLURL",0,[0,],"interactionControllerWithURL",0,[0,],"delegate",0,[],"url",1,[],"URL",1,[],"uti",1,[],"UTI",1,[],"_name",1,[],"icons",0,[],"annotation",1,[],"presentOptionsMenuFromInAnimated",0,[0,0,0,],"presentOptionsMenuFromRectInViewAnimated",0,[0,0,0,],"presentOptionsMenuFromAnimated",0,[0,0,],"presentOptionsMenuFromBarButtonItemAnimated",0,[0,0,],"presentPreviewAnimated",0,[0,],"presentPreviewAnimated",0,[0,],"presentOpenInMenuFromInAnimated",0,[0,0,0,],"presentOpenInMenuFromRectInViewAnimated",0,[0,0,0,],"presentOpenInMenuFromAnimated",0,[0,0,],"presentOpenInMenuFromBarButtonItemAnimated",0,[0,0,],"dismissPreviewAnimated",0,[0,],"dismissPreviewAnimated",0,[0,],"dismissMenuAnimated",0,[0,],"dismissMenuAnimated",0,[0,],"gestureRecognizers",0,[],"init",0,[],"actionSheetClickedButtonAt",0,[0,0,],"actionSheetCancel",0,[0,],"willPresent",0,[0,],"didPresent",0,[0,],"actionSheetWillDismissWithButtonIndex",0,[0,0,],"actionSheetDidDismissWithButtonIndex",0,[0,0,],],
UIDocumentInteractionControllerDelegate:["documentInteractionControllerViewControllerForPreview",0,[0,],"documentInteractionControllerRectForPreview",0,[0,],"documentInteractionControllerViewForPreview",0,[0,],"documentInteractionControllerWillBeginPreview",0,[0,],"documentInteractionControllerDidEndPreview",0,[0,],"documentInteractionControllerWillPresentOptionsMenu",0,[0,],"documentInteractionControllerDidDismissOptionsMenu",0,[0,],"documentInteractionControllerWillPresentOpenInMenu",0,[0,],"documentInteractionControllerDidDismissOpenInMenu",0,[0,],"documentInteractionControllerWillBeginSendingToApplication",0,[0,1,],"documentInteractionControllerDidEndSendingToApplication",0,[0,1,],"documentInteractionControllerCanPerformAction",0,[0,1,],"documentInteractionControllerPerformAction",0,[0,1,],],
UIDocumentMenuDelegate:["documentMenuDidPickDocumentPicker",0,[0,0,],"documentMenuWasCancelled",0,[0,],],
UIDocumentMenuOrder:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"first",0,[],"First",0,[],"_",0,[],"last",0,[],"Last",0,[],"_",0,[],],
UIDocumentMenuViewController:["deinit",0,[],"initDocumentTypesArrayInUIDocumentPickerMode",0,[0,0,],"initDocumentTypesArrayInModeUIDocumentPickerMode",0,[0,0,],"initUrlURLInUIDocumentPickerMode",0,[0,0,],"initURLURLInModeUIDocumentPickerMode",0,[0,0,],"initCoderNSCoder",0,[0,],"addOptionWithTitleImageOrderHandler",0,[0,1,0,0,],"addOptionWithTitleImageOrderHandler",0,[0,1,0,0,],"delegate",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"init",0,[],],
UIDocumentPickerDelegate:["documentPickerDidPickDocumentsAt",0,[0,0,],"documentPickerDidPickDocumentsAtURLs",0,[0,0,],"documentPickerWasCancelled",0,[0,],"documentPickerDidPickDocumentAt",0,[0,0,],"documentPickerDidPickDocumentAtURL",0,[0,0,],],
UIDocumentPickerExtensionViewController:["deinit",0,[],"dismissGrantingAccessTo",0,[1,],"dismissGrantingAccessToURL",0,[1,],"prepareForPresentationIn",0,[0,],"prepareForPresentationInMode",0,[0,],"documentPickerMode",0,[],"originalURL",1,[],"validTypes",1,[],"providerIdentifier",0,[],"documentStorageURL",1,[],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],],
UIDocumentPickerMode:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_import",0,[],"Import",0,[],"_",0,[],"_open",0,[],"Open",0,[],"_",0,[],"exportToService",0,[],"ExportToService",0,[],"_",0,[],"moveToService",0,[],"MoveToService",0,[],"_",0,[],],
UIDocumentPickerViewController:["deinit",0,[],"initDocumentTypesArrayInUIDocumentPickerMode",0,[0,0,],"initDocumentTypesArrayInModeUIDocumentPickerMode",0,[0,0,],"initCoderNSCoder",0,[0,],"initUrlURLInUIDocumentPickerMode",0,[0,0,],"initURLURLInModeUIDocumentPickerMode",0,[0,0,],"initUrlsArrayInUIDocumentPickerMode",0,[0,0,],"initURLsArrayInModeUIDocumentPickerMode",0,[0,0,],"delegate",0,[],"documentPickerMode",0,[],"allowsMultipleSelection",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"init",0,[],],
UIDragAnimating:["addAnimations",0,[0,],"addCompletion",0,[0,],],
UIDragDropSession:["items",0,[],"locationIn",0,[0,],"locationInView",0,[0,],"allowsMoveOperation",0,[],"isRestrictedToDraggingApplication",0,[],"restrictedToDraggingApplication",0,[],"hasItemsConformingToTypeIdentifiers",0,[0,],"hasItemsConformingToTypeIdentifiers",0,[0,],"canLoadObjectsOfClass",0,[0,],"canLoadObjectsOfClass",0,[0,],"canLoadObjectsOfClass",0,[0,],],
UIDragInteraction:["deinit",0,[],"initDelegateUIDragInteractionDelegate",0,[0,],"init",0,[],"_new",0,[],"delegate",0,[],"allowsSimultaneousRecognitionDuringLift",0,[],"isEnabled",0,[],"enabled",0,[],"isEnabledByDefault",0,[],"enabledByDefault",0,[],"view",0,[],"willMoveTo",0,[1,],"didMoveTo",0,[1,],],
UIDragInteractionDelegate:["dragInteractionItemsForBeginning",0,[0,0,],"dragInteractionItemsForBeginningSession",0,[0,0,],"dragInteractionPreviewForLiftingSession",0,[0,0,0,],"dragInteractionPreviewForLiftingItemSession",0,[0,0,0,],"dragInteractionWillAnimateLiftWithSession",0,[0,0,0,],"dragInteractionWillAnimateLiftWithAnimatorSession",0,[0,0,0,],"dragInteractionSessionWillBegin",0,[0,0,],"dragInteractionSessionAllowsMoveOperation",0,[0,0,],"dragInteractionSessionIsRestrictedToDraggingApplication",0,[0,0,],"dragInteractionPrefersFullSizePreviewsFor",0,[0,0,],"dragInteractionPrefersFullSizePreviewsForSession",0,[0,0,],"dragInteractionSessionDidMove",0,[0,0,],"dragInteractionSessionWillEndWith",0,[0,0,0,],"dragInteractionSessionWillEndWithOperation",0,[0,0,0,],"dragInteractionSessionDidEndWith",0,[0,0,0,],"dragInteractionSessionDidEndWithOperation",0,[0,0,0,],"dragInteractionSessionDidTransferItems",0,[0,0,],"dragInteractionItemsForAddingToWithTouchAt",0,[0,0,0,],"dragInteractionItemsForAddingToSessionWithTouchAtPoint",0,[0,0,0,],"dragInteractionSessionForAddingItemsWithTouchAt",0,[0,0,0,],"dragInteractionSessionForAddingItemsWithTouchAtPoint",0,[0,0,0,],"dragInteractionSessionWillAddFor",0,[0,0,0,0,],"dragInteractionSessionWillAddItemsForInteraction",0,[0,0,0,0,],"dragInteractionPreviewForCancellingWithDefault",0,[0,0,0,],"dragInteractionPreviewForCancellingItemWithDefault",0,[0,0,0,],"dragInteractionItemWillAnimateCancelWith",0,[0,0,0,],"dragInteractionItemWillAnimateCancelWithAnimator",0,[0,0,0,],],
UIDragItem:["deinit",0,[],"initItemProviderNSItemProvider",0,[0,],"init",0,[],"_new",0,[],"itemProvider",0,[],"localObject",1,[],"previewProvider",1,[],],
UIDragPreview:["deinit",0,[],"initViewUIViewParametersUIDragPreviewParameters",0,[0,0,],"initViewUIView",0,[0,],"init",0,[],"_new",0,[],"view",0,[],"parameters",0,[],"copyWith",0,[1,],"initForURL",0,[0,],"initForURLURL",0,[0,],"previewForURL",0,[0,],"initForURLTitleOptional",0,[0,1,],"initForURLURLTitleOptional",0,[0,1,],"previewForURLTitle",0,[0,1,],],
UIDragPreviewParameters:["deinit",0,[],"init",0,[],"initTextLineRectsArray",0,[0,],"visiblePath",1,[],"backgroundColor",1,[],"copyWith",0,[1,],],
UIDragPreviewTarget:["deinit",0,[],"initContainerUIViewCenterCGPointTransformCGAffineTransform",0,[0,0,0,],"initContainerUIViewCenterCGPoint",0,[0,0,],"init",0,[],"_new",0,[],"container",0,[],"center",0,[],"transform",0,[],"copyWith",0,[1,],],
UIDragSession:["localContext",1,[],],
UIDropInteraction:["deinit",0,[],"initDelegateUIDropInteractionDelegate",0,[0,],"init",0,[],"_new",0,[],"delegate",0,[],"allowsSimultaneousDropSessions",0,[],"view",0,[],"willMoveTo",0,[1,],"didMoveTo",0,[1,],],
UIDropInteractionDelegate:["dropInteractionCanHandle",0,[0,0,],"dropInteractionCanHandleSession",0,[0,0,],"dropInteractionSessionDidEnter",0,[0,0,],"dropInteractionSessionDidUpdate",0,[0,0,],"dropInteractionSessionDidExit",0,[0,0,],"dropInteractionPerformDrop",0,[0,0,],"dropInteractionConcludeDrop",0,[0,0,],"dropInteractionSessionDidEnd",0,[0,0,],"dropInteractionPreviewForDroppingWithDefault",0,[0,0,0,],"dropInteractionPreviewForDroppingItemWithDefault",0,[0,0,0,],"dropInteractionItemWillAnimateDropWith",0,[0,0,0,],"dropInteractionItemWillAnimateDropWithAnimator",0,[0,0,0,],],
UIDropOperation:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"cancel",0,[],"Cancel",0,[],"_",0,[],"forbidden",0,[],"Forbidden",0,[],"_",0,[],"copy",0,[],"Copy",0,[],"_",0,[],"move",0,[],"Move",0,[],"_",0,[],],
UIDropProposal:["deinit",0,[],"initOperationUIDropOperation",0,[0,],"initDropOperationUIDropOperation",0,[0,],"init",0,[],"_new",0,[],"operation",0,[],"isPrecise",0,[],"precise",0,[],"prefersFullSizePreview",0,[],"copyWith",0,[1,],],
UIDropSession:["localDragSession",1,[],"progressIndicatorStyle",0,[],"loadObjectsOfClassCompletion",0,[0,0,],"loadObjectsOfClassCompletion",0,[0,0,],"loadObjectsOfClassCompletion",0,[0,0,],],
UIDropSessionProgressIndicatorStyle:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"none",0,[],"None",0,[],"_",0,[],"_default",0,[],"Default",0,[],"_",0,[],],
UIDynamicAnimator:["deinit",0,[],"initReferenceViewUIView",0,[0,],"addBehavior",0,[0,],"removeBehavior",0,[0,],"removeAllBehaviors",0,[],"referenceView",1,[],"behaviors",0,[],"itemsIn",0,[0,],"itemsInRect",0,[0,],"updateItemUsingCurrentState",0,[0,],"updateItemUsingCurrentState",0,[0,],"isRunning",0,[],"running",0,[],"elapsedTime",0,[],"delegate",0,[],"init",0,[],"initCollectionViewLayoutUICollectionViewLayout",0,[0,],"layoutAttributesForCellAt",0,[0,],"layoutAttributesForCellAtIndexPath",0,[0,],"layoutAttributesForSupplementaryViewOfKindAt",0,[0,0,],"layoutAttributesForSupplementaryViewOfKindAtIndexPath",0,[0,0,],"layoutAttributesForDecorationViewOfKindAt",0,[0,0,],"layoutAttributesForDecorationViewOfKindAtIndexPath",0,[0,0,],],
UIDynamicAnimatorDelegate:["dynamicAnimatorWillResume",0,[0,],"dynamicAnimatorDidPause",0,[0,],],
UIDynamicBehavior:["deinit",0,[],"addChildBehavior",0,[0,],"removeChildBehavior",0,[0,],"childBehaviors",0,[],"action",1,[],"willMoveTo",0,[1,],"willMoveToAnimator",0,[1,],"dynamicAnimator",1,[],"init",0,[],],
UIDynamicItem:["center",0,[],"bounds",0,[],"transform",0,[],"collisionBoundsType",0,[],"collisionBoundingPath",0,[],],
UIDynamicItemBehavior:["deinit",0,[],"initItemsArray",0,[0,],"addItem",0,[0,],"removeItem",0,[0,],"items",0,[],"elasticity",0,[],"friction",0,[],"density",0,[],"resistance",0,[],"angularResistance",0,[],"charge",0,[],"isAnchored",0,[],"anchored",0,[],"allowsRotation",0,[],"addLinearVelocityFor",0,[0,0,],"addLinearVelocityForItem",0,[0,0,],"linearVelocityFor",0,[0,],"linearVelocityForItem",0,[0,],"addAngularVelocityFor",0,[0,0,],"addAngularVelocityForItem",0,[0,0,],"angularVelocityFor",0,[0,],"angularVelocityForItem",0,[0,],"init",0,[],],
UIDynamicItemCollisionBoundsType:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"rectangle",0,[],"Rectangle",0,[],"_",0,[],"ellipse",0,[],"Ellipse",0,[],"_",0,[],"path",0,[],"Path",0,[],"_",0,[],],
UIDynamicItemGroup:["deinit",0,[],"initItemsArray",0,[0,],"items",0,[],"init",0,[],"center",0,[],"bounds",0,[],"transform",0,[],"collisionBoundsType",0,[],"collisionBoundingPath",0,[],],
UIEdgeInsets:["_top",0,[],"left",0,[],"bottom",0,[],"right",0,[],"init",0,[],"initTopCGFloatLeftCGFloatBottomCGFloatRightCGFloat",0,[0,0,0,0,],"initTopCGFloatLeftCGFloatBottomCGFloatRightCGFloat",0,[0,0,0,0,],"zero",0,[],"infix_61_61",0,[0,0,],"initFromDecoder",0,[0,],"encodeTo",0,[0,],"_bridgeToObjectiveC",0,[],"_forceBridgeFromObjectiveCResult",0,[0,1,],"_conditionallyBridgeFromObjectiveCResult",0,[0,1,],"_unconditionallyBridgeFromObjectiveC",0,[1,],"_ObjectiveCType",0,[],],
UIEvent:["deinit",0,[],"type",0,[],"subtype",0,[],"timestamp",0,[],"allTouches",1,[],"touchesFor",0,[0,],"touchesForWindow",0,[0,],"touchesFor",0,[0,],"touchesForView",0,[0,],"touchesFor",0,[0,],"touchesForGestureRecognizer",0,[0,],"coalescedTouchesFor",0,[0,],"coalescedTouchesForTouch",0,[0,],"predictedTouchesFor",0,[0,],"predictedTouchesForTouch",0,[0,],"init",0,[],"EventType",0,[],"EventSubtype",0,[],],
UIFeedbackGenerator:["deinit",0,[],"prepare",0,[],"init",0,[],],
UIFieldBehavior:["deinit",0,[],"init",0,[],"addItem",0,[0,],"removeItem",0,[0,],"items",0,[],"position",0,[],"region",0,[],"strength",0,[],"falloff",0,[],"minimumRadius",0,[],"direction",0,[],"smoothness",0,[],"animationSpeed",0,[],"dragField",0,[],"vortexField",0,[],"radialGravityFieldPosition",0,[0,],"radialGravityFieldWithPosition",0,[0,],"linearGravityFieldDirection",0,[0,],"linearGravityFieldWithVector",0,[0,],"velocityFieldDirection",0,[0,],"velocityFieldWithVector",0,[0,],"noiseFieldSmoothnessAnimationSpeed",0,[0,0,],"noiseFieldWithSmoothnessAnimationSpeed",0,[0,0,],"turbulenceFieldSmoothnessAnimationSpeed",0,[0,0,],"turbulenceFieldWithSmoothnessAnimationSpeed",0,[0,0,],"springField",0,[],"electricField",0,[],"magneticField",0,[],"fieldEvaluationBlock",0,[0,],"fieldWithEvaluationBlock",0,[0,],],
UIFloatRange:["minimum",0,[],"maximum",0,[],"init",0,[],"initMinimumCGFloatMaximumCGFloat",0,[0,0,],"zero",0,[],"infinite",0,[],"_",0,[],"isInfinite",0,[],"initMinimumCGFloatMaximumCGFloat",0,[0,0,],"infix_61_61",0,[0,0,],"initFromDecoder",0,[0,],"encodeTo",0,[0,],],
UIFocusAnimationContext:["duration",0,[],],
UIFocusAnimationCoordinator:["deinit",0,[],"addCoordinatedAnimationsCompletion",0,[1,1,],"addCoordinatedFocusingAnimationsCompletion",0,[1,1,],"addCoordinatedUnfocusingAnimationsCompletion",0,[1,1,],"init",0,[],],
UIFocusDebugger:["deinit",0,[],"help",0,[],"_status",0,[],"checkFocusabilityFor",0,[0,],"checkFocusabilityForItem",0,[0,],"simulateFocusUpdateRequestFrom",0,[0,],"simulateFocusUpdateRequestFromEnvironment",0,[0,],"init",0,[],],
UIFocusDebuggerOutput:[],
UIFocusEnvironment:["preferredFocusEnvironments",0,[],"parentFocusEnvironment",0,[],"focusItemContainer",1,[],"setNeedsFocusUpdate",0,[],"updateFocusIfNeeded",0,[],"shouldUpdateFocusIn",0,[0,],"shouldUpdateFocusInContext",0,[0,],"didUpdateFocusInWith",0,[0,0,],"didUpdateFocusInContextWithAnimationCoordinator",0,[0,0,],"soundIdentifierForFocusUpdateIn",0,[0,],"soundIdentifierForFocusUpdateInContext",0,[0,],"preferredFocusedView",0,[],"contains",0,[0,],],
UIFocusGuide:["deinit",0,[],"isEnabled",0,[],"enabled",0,[],"preferredFocusEnvironments",1,[],"preferredFocusedView",0,[],"init",0,[],"initCoderNSCoder",0,[0,],],
UIFocusHeading:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"none",0,[],"_",0,[],"None",0,[],"_",0,[],"up",0,[],"_",0,[],"Up",0,[],"_",0,[],"down",0,[],"_",0,[],"Down",0,[],"_",0,[],"left",0,[],"_",0,[],"Left",0,[],"_",0,[],"right",0,[],"_",0,[],"Right",0,[],"_",0,[],"next",0,[],"_",0,[],"Next",0,[],"_",0,[],"previous",0,[],"_",0,[],"Previous",0,[],"_",0,[],],
UIFocusItem:["canBecomeFocused",0,[],"_frame",0,[],"didHintFocusMovement",0,[0,],"isFocused",0,[],"_",0,[],],
UIFocusItemContainer:["coordinateSpace",0,[],"focusItemsIn",0,[0,],"focusItemsInRect",0,[0,],],
UIFocusItemScrollableContainer:["contentOffset",0,[],"contentSize",0,[],"visibleSize",0,[],],
UIFocusMovementHint:["deinit",0,[],"movementDirection",0,[],"perspectiveTransform",0,[],"rotation",0,[],"translation",0,[],"interactionTransform",0,[],"init",0,[],"_new",0,[],"copyWith",0,[1,],],
UIFocusSoundIdentifier:["initString",0,[0,],"initRawValueString",0,[0,],"_rawValue",0,[],"rawValue",0,[],"_",0,[],"RawValue",0,[],"_ObjectiveCType",0,[],"none",0,[],"_default",0,[],],
UIFocusSystem:["deinit",0,[],"focusedItem",0,[],"_new",0,[],"init",0,[],"initForUIFocusEnvironment",0,[0,],"initForEnvironmentUIFocusEnvironment",0,[0,],"focusSystemForEnvironment",0,[0,],"requestFocusUpdateTo",0,[0,],"requestFocusUpdateToEnvironment",0,[0,],"updateFocusIfNeeded",0,[],"environmentContains",0,[0,0,],"environmentContainsEnvironment",0,[0,0,],"registerForSoundIdentifier",0,[0,0,],"registerURLForSoundIdentifier",0,[0,0,],"didUpdateNotification",0,[],"movementDidFailNotification",0,[],"focusUpdateContextUserInfoKey",0,[],"animationCoordinatorUserInfoKey",0,[],],
UIFocusUpdateContext:["deinit",0,[],"previouslyFocusedItem",0,[],"nextFocusedItem",0,[],"previouslyFocusedView",0,[],"nextFocusedView",0,[],"focusHeading",0,[],"init",0,[],],
UIFont:["deinit",0,[],"preferredFontForTextStyle",0,[0,],"preferredFontForTextStyle",0,[0,],"preferredFontForTextStyleCompatibleWith",0,[0,1,],"preferredFontForTextStyleCompatibleWithTraitCollection",0,[0,1,],"initNameStringSizeCGFloat",0,[0,0,],"fontWithNameSize",0,[0,0,],"familyNames",0,[],"fontNamesForFamilyName",0,[0,],"fontNamesForFamilyName",0,[0,],"systemFontOfSize",0,[0,],"systemFontOfSize",0,[0,],"boldSystemFontOfSize",0,[0,],"boldSystemFontOfSize",0,[0,],"italicSystemFontOfSize",0,[0,],"italicSystemFontOfSize",0,[0,],"systemFontOfSizeWeight",0,[0,0,],"systemFontOfSizeWeight",0,[0,0,],"monospacedDigitSystemFontOfSizeWeight",0,[0,0,],"monospacedDigitSystemFontOfSizeWeight",0,[0,0,],"familyName",0,[],"fontName",0,[],"pointSize",0,[],"ascender",0,[],"descender",0,[],"capHeight",0,[],"xHeight",0,[],"lineHeight",0,[],"leading",0,[],"withSize",0,[0,],"fontWithSize",0,[0,],"initDescriptorUIFontDescriptorSizeCGFloat",0,[0,0,],"fontWithDescriptorSize",0,[0,0,],"fontDescriptor",0,[],"init",0,[],"copyWith",0,[1,],"TextStyle",0,[],"Weight",0,[],"labelFontSize",0,[],"buttonFontSize",0,[],"smallSystemFontSize",0,[],"systemFontSize",0,[],],
UIFontDescriptor:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"postscriptName",0,[],"pointSize",0,[],"matrix",0,[],"symbolicTraits",0,[],"objectForKey",0,[0,],"objectForKey",0,[0,],"fontAttributes",0,[],"matchingFontDescriptorsWithMandatoryKeys",0,[1,],"matchingFontDescriptorsWithMandatoryKeys",0,[1,],"initFontAttributesDictionary",0,[0,],"fontDescriptorWithFontAttributes",0,[0,],"initNameStringSizeCGFloat",0,[0,0,],"fontDescriptorWithNameSize",0,[0,0,],"initNameStringMatrixCGAffineTransform",0,[0,0,],"fontDescriptorWithNameMatrix",0,[0,0,],"preferredFontDescriptorWithTextStyle",0,[0,],"preferredFontDescriptorWithTextStyle",0,[0,],"preferredFontDescriptorWithTextStyleCompatibleWith",0,[0,1,],"preferredFontDescriptorWithTextStyleCompatibleWithTraitCollection",0,[0,1,],"initFontAttributesDictionary",0,[0,],"addingAttributes",0,[0,],"fontDescriptorByAddingAttributes",0,[0,],"withSize",0,[0,],"fontDescriptorWithSize",0,[0,],"withMatrix",0,[0,],"fontDescriptorWithMatrix",0,[0,],"withFace",0,[0,],"fontDescriptorWithFace",0,[0,],"withFamily",0,[0,],"fontDescriptorWithFamily",0,[0,],"withSymbolicTraits",0,[0,],"fontDescriptorWithSymbolicTraits",0,[0,],"withDesign",0,[0,],"fontDescriptorWithDesign",0,[0,],"supportsSecureCoding",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],"SymbolicTraits",0,[],"Class",0,[],"AttributeName",0,[],"TraitKey",0,[],"FeatureKey",0,[],"SystemDesign",0,[],],
UIFontMetrics:["deinit",0,[],"_default",0,[],"defaultMetrics",0,[],"initForTextStyleUIFontTextStyle",0,[0,],"metricsForTextStyle",0,[0,],"init",0,[],"initForTextStyleUIFontTextStyle",0,[0,],"scaledFontFor",0,[0,],"scaledFontForFont",0,[0,],"scaledFontForMaximumPointSize",0,[0,0,],"scaledFontForFontMaximumPointSize",0,[0,0,],"scaledFontForCompatibleWith",0,[0,1,],"scaledFontForFontCompatibleWithTraitCollection",0,[0,1,],"scaledFontForMaximumPointSizeCompatibleWith",0,[0,0,1,],"scaledFontForFontMaximumPointSizeCompatibleWithTraitCollection",0,[0,0,1,],"scaledValueFor",0,[0,],"scaledValueForValue",0,[0,],"scaledValueForCompatibleWith",0,[0,1,],"scaledValueForValueCompatibleWithTraitCollection",0,[0,1,],],
UIForceTouchCapability:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unknown",0,[],"Unknown",0,[],"_",0,[],"unavailable",0,[],"Unavailable",0,[],"_",0,[],"available",0,[],"Available",0,[],"_",0,[],],
UIGestureRecognizer:["deinit",0,[],"initTargetOptionalActionOptional",0,[1,1,],"addTargetAction",0,[0,0,],"removeTargetAction",0,[1,1,],"state",0,[],"delegate",0,[],"isEnabled",0,[],"enabled",0,[],"view",1,[],"cancelsTouchesInView",0,[],"delaysTouchesBegan",0,[],"delaysTouchesEnded",0,[],"allowedTouchTypes",0,[],"allowedPressTypes",0,[],"requiresExclusiveTouchType",0,[],"requireToFail",0,[0,],"requireGestureRecognizerToFail",0,[0,],"locationIn",0,[1,],"locationInView",0,[1,],"numberOfTouches",0,[],"locationOfTouchIn",0,[0,1,],"locationOfTouchInView",0,[0,1,],"_name",1,[],"init",0,[],"State",0,[],"ignoreFor",0,[0,0,],"ignoreTouchForEvent",0,[0,0,],"ignoreFor",0,[0,0,],"ignorePressForEvent",0,[0,0,],"_reset",0,[],"canPrevent",0,[0,],"canPreventGestureRecognizer",0,[0,],"canBePreventedBy",0,[0,],"canBePreventedByGestureRecognizer",0,[0,],"shouldRequireFailureOf",0,[0,],"shouldRequireFailureOfGestureRecognizer",0,[0,],"shouldBeRequiredToFailBy",0,[0,],"shouldBeRequiredToFailByGestureRecognizer",0,[0,],"touchesBeganWith",0,[0,0,],"touchesBeganWithEvent",0,[0,0,],"touchesMovedWith",0,[0,0,],"touchesMovedWithEvent",0,[0,0,],"touchesEndedWith",0,[0,0,],"touchesEndedWithEvent",0,[0,0,],"touchesCancelledWith",0,[0,0,],"touchesCancelledWithEvent",0,[0,0,],"touchesEstimatedPropertiesUpdated",0,[0,],"pressesBeganWith",0,[0,0,],"pressesBeganWithEvent",0,[0,0,],"pressesChangedWith",0,[0,0,],"pressesChangedWithEvent",0,[0,0,],"pressesEndedWith",0,[0,0,],"pressesEndedWithEvent",0,[0,0,],"pressesCancelledWith",0,[0,0,],"pressesCancelledWithEvent",0,[0,0,],],
UIGestureRecognizerDelegate:["gestureRecognizerShouldBegin",0,[0,],"gestureRecognizerShouldRecognizeSimultaneouslyWith",0,[0,0,],"gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer",0,[0,0,],"gestureRecognizerShouldRequireFailureOf",0,[0,0,],"gestureRecognizerShouldRequireFailureOfGestureRecognizer",0,[0,0,],"gestureRecognizerShouldBeRequiredToFailBy",0,[0,0,],"gestureRecognizerShouldBeRequiredToFailByGestureRecognizer",0,[0,0,],"gestureRecognizerShouldReceive",0,[0,0,],"gestureRecognizerShouldReceiveTouch",0,[0,0,],"gestureRecognizerShouldReceive",0,[0,0,],"gestureRecognizerShouldReceivePress",0,[0,0,],],
UIGraphicsImageRenderer:["deinit",0,[],"initSizeCGSize",0,[0,],"initSizeCGSizeFormatUIGraphicsImageRendererFormat",0,[0,0,],"initBoundsCGRectFormatUIGraphicsRendererFormat",0,[0,0,],"imageActions",0,[0,],"imageWithActions",0,[0,],"pngDataActions",0,[0,],"PNGDataWithActions",0,[0,],"jpegDataWithCompressionQualityActions",0,[0,0,],"JPEGDataWithCompressionQualityActions",0,[0,0,],"initBoundsCGRect",0,[0,],"init",0,[],"DrawingActions",0,[],],
UIGraphicsImageRendererContext:["deinit",0,[],"currentImage",0,[],"init",0,[],],
UIGraphicsImageRendererFormat:["deinit",0,[],"scale",0,[],"opaque",0,[],"prefersExtendedRange",0,[],"preferredRange",0,[],"initForUITraitCollection",0,[0,],"initForTraitCollectionUITraitCollection",0,[0,],"formatForTraitCollection",0,[0,],"init",0,[],"Range",0,[],],
UIGraphicsPDFRenderer:["deinit",0,[],"initBoundsCGRectFormatUIGraphicsRendererFormat",0,[0,0,],"writePDFToWithActions",0,[0,0,],"writePDFToURLWithActions",0,[0,0,],"pdfDataActions",0,[0,],"PDFDataWithActions",0,[0,],"initBoundsCGRect",0,[0,],"init",0,[],"DrawingActions",0,[],],
UIGraphicsPDFRendererContext:["deinit",0,[],"pdfContextBounds",0,[],"beginPage",0,[],"beginPageWithBoundsPageInfo",0,[0,0,],"beginPageWithBoundsPageInfo",0,[0,0,],"setURLFor",0,[0,0,],"setURLForRect",0,[0,0,],"addDestinationWithNameAt",0,[0,0,],"addDestinationWithNameAtPoint",0,[0,0,],"setDestinationWithNameFor",0,[0,0,],"setDestinationWithNameForRect",0,[0,0,],"init",0,[],],
UIGraphicsPDFRendererFormat:["deinit",0,[],"documentInfo",0,[],"init",0,[],],
UIGraphicsRenderer:["deinit",0,[],"initBoundsCGRect",0,[0,],"initBoundsCGRectFormatUIGraphicsRendererFormat",0,[0,0,],"format",0,[],"allowsImageOutput",0,[],"init",0,[],"rendererContextClass",0,[],"contextWith",0,[0,],"contextWithFormat",0,[0,],"prepareWith",0,[0,0,],"prepareCGContextWithRendererContext",0,[0,0,],"runDrawingActionsCompletionActions",0,[0,1,],],
UIGraphicsRendererContext:["deinit",0,[],"cgContext",0,[],"CGContext",0,[],"format",0,[],"fill",0,[0,],"fillRect",0,[0,],"fillBlendMode",0,[0,0,],"fillRectBlendMode",0,[0,0,],"stroke",0,[0,],"strokeRect",0,[0,],"strokeBlendMode",0,[0,0,],"strokeRectBlendMode",0,[0,0,],"clipTo",0,[0,],"clipToRect",0,[0,],"init",0,[],],
UIGraphicsRendererFormat:["deinit",0,[],"_default",0,[],"defaultFormat",0,[],"preferred",0,[],"preferredFormat",0,[],"bounds",0,[],"init",0,[],"copyWith",0,[1,],],
UIGravityBehavior:["deinit",0,[],"initItemsArray",0,[0,],"addItem",0,[0,],"removeItem",0,[0,],"items",0,[],"gravityDirection",0,[],"angle",0,[],"magnitude",0,[],"setAngleMagnitude",0,[0,0,],"init",0,[],],
UIGuidedAccessAccessibilityFeature:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"voiceOver",0,[],"_",0,[],"VoiceOver",0,[],"_",0,[],"zoom",0,[],"_",0,[],"Zoom",0,[],"_",0,[],"assistiveTouch",0,[],"_",0,[],"AssistiveTouch",0,[],"_",0,[],"invertColors",0,[],"_",0,[],"InvertColors",0,[],"_",0,[],"grayscaleDisplay",0,[],"_",0,[],"GrayscaleDisplay",0,[],"_",0,[],],
UIGuidedAccessRestrictionDelegate:["guidedAccessRestrictionIdentifiers",1,[],"guidedAccessRestrictionWithIdentifierDidChange",0,[0,0,],"guidedAccessRestrictionWithIdentifierDidChangeState",0,[0,0,],"textForGuidedAccessRestrictionWithIdentifier",0,[0,],"textForGuidedAccessRestrictionWithIdentifier",0,[0,],"detailTextForGuidedAccessRestrictionWithIdentifier",0,[0,],"detailTextForGuidedAccessRestrictionWithIdentifier",0,[0,],],
UIImage:["deinit",0,[],"initNamedString",0,[0,],"imageNamed",0,[0,],"initNamedStringInOptionalCompatibleWithOptional",0,[0,1,1,],"initNamedStringInBundleOptionalCompatibleWithTraitCollectionOptional",0,[0,1,1,],"imageNamedInBundleCompatibleWithTraitCollection",0,[0,1,1,],"initContentsOfFileString",0,[0,],"imageWithContentsOfFile",0,[0,],"initDataData",0,[0,],"imageWithData",0,[0,],"initDataDataScaleCGFloat",0,[0,0,],"imageWithDataScale",0,[0,0,],"initCgImageCGImage",0,[0,],"initCGImageCGImage",0,[0,],"imageWithCGImage",0,[0,],"initCgImageCGImageScaleCGFloatOrientationUIImageOrientation",0,[0,0,0,],"initCGImageCGImageScaleCGFloatOrientationUIImageOrientation",0,[0,0,0,],"imageWithCGImageScaleOrientation",0,[0,0,0,],"initCiImageCIImage",0,[0,],"initCIImageCIImage",0,[0,],"imageWithCIImage",0,[0,],"initCiImageCIImageScaleCGFloatOrientationUIImageOrientation",0,[0,0,0,],"initCIImageCIImageScaleCGFloatOrientationUIImageOrientation",0,[0,0,0,],"imageWithCIImageScaleOrientation",0,[0,0,0,],"initContentsOfFileString",0,[0,],"initDataData",0,[0,],"initDataDataScaleCGFloat",0,[0,0,],"initCgImageCGImage",0,[0,],"initCGImageCGImage",0,[0,],"initCgImageCGImageScaleCGFloatOrientationUIImageOrientation",0,[0,0,0,],"initCGImageCGImageScaleCGFloatOrientationUIImageOrientation",0,[0,0,0,],"initCiImageCIImage",0,[0,],"initCIImageCIImage",0,[0,],"initCiImageCIImageScaleCGFloatOrientationUIImageOrientation",0,[0,0,0,],"initCIImageCIImageScaleCGFloatOrientationUIImageOrientation",0,[0,0,0,],"size",0,[],"cgImage",1,[],"CGImage",1,[],"ciImage",1,[],"CIImage",1,[],"imageOrientation",0,[],"scale",0,[],"animatedImageNamedDuration",0,[0,0,],"animatedResizableImageNamedCapInsetsDuration",0,[0,0,0,],"animatedResizableImageNamedCapInsetsResizingModeDuration",0,[0,0,0,0,],"animatedImageWithDuration",0,[0,0,],"animatedImageWithImagesDuration",0,[0,0,],"_images",1,[],"duration",0,[],"drawAt",0,[0,],"drawAtPoint",0,[0,],"drawAtBlendModeAlpha",0,[0,0,0,],"drawAtPointBlendModeAlpha",0,[0,0,0,],"drawIn",0,[0,],"drawInRect",0,[0,],"drawInBlendModeAlpha",0,[0,0,0,],"drawInRectBlendModeAlpha",0,[0,0,0,],"drawAsPatternIn",0,[0,],"drawAsPatternInRect",0,[0,],"resizableImageWithCapInsets",0,[0,],"resizableImageWithCapInsets",0,[0,],"resizableImageWithCapInsetsResizingMode",0,[0,0,],"resizableImageWithCapInsetsResizingMode",0,[0,0,],"capInsets",0,[],"resizingMode",0,[],"withAlignmentRectInsets",0,[0,],"imageWithAlignmentRectInsets",0,[0,],"alignmentRectInsets",0,[],"withRenderingMode",0,[0,],"imageWithRenderingMode",0,[0,],"renderingMode",0,[],"imageRendererFormat",0,[],"traitCollection",0,[],"imageAsset",1,[],"imageFlippedForRightToLeftLayoutDirection",0,[],"flipsForRightToLeftLayoutDirection",0,[],"withHorizontallyFlippedOrientation",0,[],"imageWithHorizontallyFlippedOrientation",0,[],"init",0,[],"supportsSecureCoding",0,[],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],"Orientation",0,[],"ResizingMode",0,[],"RenderingMode",0,[],"pngData",0,[],"jpegDataCompressionQuality",0,[0,],"readableTypeIdentifiersForItemProvider",0,[],"writableTypeIdentifiersForItemProvider",0,[],"writableTypeIdentifiersForItemProvider",0,[],"preferredPresentationSizeForItemProvider",0,[],"objectWithItemProviderDataTypeIdentifier",0,[0,0,],"itemProviderVisibilityForRepresentationWithTypeIdentifier",0,[0,],"itemProviderVisibilityForRepresentationWithTypeIdentifier",0,[0,],"loadDataWithTypeIdentifierForItemProviderCompletionHandler",0,[0,0,],"stretchableImageWithLeftCapWidthTopCapHeight",0,[0,0,],"stretchableImageWithLeftCapWidthTopCapHeight",0,[0,0,],"leftCapWidth",0,[],"topCapHeight",0,[],"accessibilityIdentifier",1,[],"initFailableImageLiteralString",0,[0,],"initImageLiteralResourceNameString",0,[0,],],
UIImageAsset:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"imageWith",0,[0,],"imageWithTraitCollection",0,[0,],"registerWith",0,[0,0,],"registerImageWithTraitCollection",0,[0,0,],"unregisterImageWith",0,[0,],"unregisterImageWithTraitCollection",0,[0,],"supportsSecureCoding",0,[],"encodeWith",0,[0,],],
UIImagePickerController:["deinit",0,[],"isSourceTypeAvailable",0,[0,],"availableMediaTypesFor",0,[0,],"availableMediaTypesForSourceType",0,[0,],"isCameraDeviceAvailable",0,[0,],"isFlashAvailableFor",0,[0,],"isFlashAvailableForCameraDevice",0,[0,],"availableCaptureModesFor",0,[0,],"availableCaptureModesForCameraDevice",0,[0,],"delegate",0,[],"sourceType",0,[],"mediaTypes",0,[],"allowsEditing",0,[],"allowsImageEditing",0,[],"imageExportPreset",0,[],"videoMaximumDuration",0,[],"videoQuality",0,[],"videoExportPreset",0,[],"showsCameraControls",0,[],"cameraOverlayView",1,[],"cameraViewTransform",0,[],"takePicture",0,[],"startVideoCapture",0,[],"stopVideoCapture",0,[],"cameraCaptureMode",0,[],"cameraDevice",0,[],"cameraFlashMode",0,[],"initNavigationBarClassOptionalToolbarClassOptional",0,[1,1,],"initRootViewControllerUIViewController",0,[0,],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],"SourceType",0,[],"QualityType",0,[],"CameraCaptureMode",0,[],"CameraDevice",0,[],"CameraFlashMode",0,[],"ImageURLExportPreset",0,[],"InfoKey",0,[],],
UIImagePickerControllerDelegate:["imagePickerControllerDidFinishPickingEditingInfo",0,[0,0,1,],"imagePickerControllerDidFinishPickingImageEditingInfo",0,[0,0,1,],"imagePickerControllerDidFinishPickingMediaWithInfo",0,[0,0,],"imagePickerControllerDidCancel",0,[0,],],
UIImageView:["deinit",0,[],"initImageOptional",0,[1,],"initImageOptionalHighlightedImageOptional",0,[1,1,],"_image",1,[],"highlightedImage",1,[],"isUserInteractionEnabled",0,[],"userInteractionEnabled",0,[],"isHighlighted",0,[],"highlighted",0,[],"animationImages",1,[],"highlightedAnimationImages",1,[],"animationDuration",0,[],"animationRepeatCount",0,[],"tintColor",1,[],"startAnimating",0,[],"stopAnimating",0,[],"isAnimating",0,[],"animating",0,[],"adjustsImageWhenAncestorFocused",0,[],"focusedFrameGuide",0,[],"overlayContentView",0,[],"masksFocusEffectToContents",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"adjustsImageSizeForAccessibilityContentSizeCategory",0,[],],
UIImpactFeedbackGenerator:["deinit",0,[],"initStyleUIImpactFeedbackGeneratorFeedbackStyle",0,[0,],"impactOccurred",0,[],"init",0,[],"FeedbackStyle",0,[],],
UIInputView:["deinit",0,[],"inputViewStyle",0,[],"allowsSelfSizing",0,[],"initFrameCGRectInputViewStyleUIInputViewStyle",0,[0,0,],"initCoderNSCoder",0,[0,],"initFrameCGRect",0,[0,],"init",0,[],"Style",0,[],],
UIInputViewAudioFeedback:["enableInputClicksWhenVisible",0,[],],
UIInputViewController:["deinit",0,[],"inputView",1,[],"textDocumentProxy",0,[],"primaryLanguage",1,[],"hasDictationKey",0,[],"hasFullAccess",0,[],"needsInputModeSwitchKey",0,[],"dismissKeyboard",0,[],"advanceToNextInputMode",0,[],"handleInputModeListFromWith",0,[0,0,],"handleInputModeListFromViewWithEvent",0,[0,0,],"requestSupplementaryLexiconCompletion",0,[0,],"requestSupplementaryLexiconWithCompletion",0,[0,],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],"selectionWillChange",0,[1,],"selectionDidChange",0,[1,],"textWillChange",0,[1,],"textDidChange",0,[1,],],
UIInteraction:["view",0,[],"willMoveTo",0,[1,],"willMoveToView",0,[1,],"didMoveTo",0,[1,],"didMoveToView",0,[1,],],
UIInterfaceOrientation:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unknown",0,[],"Unknown",0,[],"_",0,[],"portrait",0,[],"Portrait",0,[],"_",0,[],"portraitUpsideDown",0,[],"PortraitUpsideDown",0,[],"_",0,[],"landscapeLeft",0,[],"LandscapeLeft",0,[],"_",0,[],"landscapeRight",0,[],"LandscapeRight",0,[],"_",0,[],"_",0,[],"isPortrait",0,[],"_",0,[],"isLandscape",0,[],],
UIInterfaceOrientationMask:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"portrait",0,[],"_",0,[],"Portrait",0,[],"_",0,[],"landscapeLeft",0,[],"_",0,[],"LandscapeLeft",0,[],"_",0,[],"landscapeRight",0,[],"_",0,[],"LandscapeRight",0,[],"_",0,[],"portraitUpsideDown",0,[],"_",0,[],"PortraitUpsideDown",0,[],"_",0,[],"landscape",0,[],"_",0,[],"Landscape",0,[],"_",0,[],"_all",0,[],"_",0,[],"All",0,[],"_",0,[],"allButUpsideDown",0,[],"_",0,[],"AllButUpsideDown",0,[],"_",0,[],],
UIInterpolatingMotionEffect:["deinit",0,[],"initKeyPathStringTypeUIInterpolatingMotionEffectEffectType",0,[0,0,],"initCoderNSCoder",0,[0,],"keyPath",0,[],"type",0,[],"minimumRelativeValue",1,[],"maximumRelativeValue",1,[],"init",0,[],"EffectType",0,[],],
UIItemProviderPresentationSizeProviding:["preferredPresentationSizeForItemProvider",0,[],],
UIKeyCommand:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"input",1,[],"modifierFlags",0,[],"discoverabilityTitle",1,[],"initInputStringModifierFlagsUIKeyModifierFlagsActionSelector",0,[0,0,0,],"keyCommandWithInputModifierFlagsAction",0,[0,0,0,],"initInputStringModifierFlagsUIKeyModifierFlagsActionSelectorDiscoverabilityTitleString",0,[0,0,0,0,],"keyCommandWithInputModifierFlagsActionDiscoverabilityTitle",0,[0,0,0,0,],"supportsSecureCoding",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],"inputUpArrow",0,[],"inputDownArrow",0,[],"inputLeftArrow",0,[],"inputRightArrow",0,[],"inputEscape",0,[],],
UIKeyInput:["hasText",0,[],"insertText",0,[0,],"deleteBackward",0,[],],
UIKeyModifierFlags:["initRawValueInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"alphaShift",0,[],"_",0,[],"AlphaShift",0,[],"_",0,[],"shift",0,[],"_",0,[],"Shift",0,[],"_",0,[],"control",0,[],"_",0,[],"Control",0,[],"_",0,[],"alternate",0,[],"_",0,[],"Alternate",0,[],"_",0,[],"command",0,[],"_",0,[],"Command",0,[],"_",0,[],"numericPad",0,[],"_",0,[],"NumericPad",0,[],"_",0,[],],
UIKeyboardAppearance:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"dark",0,[],"Dark",0,[],"_",0,[],"light",0,[],"Light",0,[],"_",0,[],"_alert",0,[],"_",0,[],],
UIKeyboardType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"asciiCapable",0,[],"ASCIICapable",0,[],"_",0,[],"numbersAndPunctuation",0,[],"NumbersAndPunctuation",0,[],"_",0,[],"URL",0,[],"numberPad",0,[],"NumberPad",0,[],"_",0,[],"phonePad",0,[],"PhonePad",0,[],"_",0,[],"namePhonePad",0,[],"NamePhonePad",0,[],"_",0,[],"emailAddress",0,[],"EmailAddress",0,[],"_",0,[],"decimalPad",0,[],"DecimalPad",0,[],"_",0,[],"twitter",0,[],"Twitter",0,[],"_",0,[],"webSearch",0,[],"WebSearch",0,[],"_",0,[],"asciiCapableNumberPad",0,[],"ASCIICapableNumberPad",0,[],"_",0,[],"alphabet",0,[],"_",0,[],],
UILabel:["deinit",0,[],"text",1,[],"font",1,[],"textColor",1,[],"shadowColor",1,[],"shadowOffset",0,[],"textAlignment",0,[],"lineBreakMode",0,[],"attributedText",1,[],"highlightedTextColor",1,[],"isHighlighted",0,[],"highlighted",0,[],"isUserInteractionEnabled",0,[],"userInteractionEnabled",0,[],"isEnabled",0,[],"enabled",0,[],"numberOfLines",0,[],"adjustsFontSizeToFitWidth",0,[],"baselineAdjustment",0,[],"minimumScaleFactor",0,[],"allowsDefaultTighteningForTruncation",0,[],"textRectForBoundsLimitedToNumberOfLines",0,[0,0,],"textRectForBoundsLimitedToNumberOfLines",0,[0,0,],"drawTextIn",0,[0,],"drawTextInRect",0,[0,],"preferredMaxLayoutWidth",0,[],"enablesMarqueeWhenAncestorFocused",0,[],"minimumFontSize",0,[],"adjustsLetterSpacingToFitWidth",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"adjustsFontForContentSizeCategory",0,[],],
UILayoutGuide:["deinit",0,[],"layoutFrame",0,[],"owningView",0,[],"identifier",0,[],"leadingAnchor",0,[],"trailingAnchor",0,[],"leftAnchor",0,[],"rightAnchor",0,[],"topAnchor",0,[],"bottomAnchor",0,[],"widthAnchor",0,[],"heightAnchor",0,[],"centerXAnchor",0,[],"centerYAnchor",0,[],"init",0,[],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],"constraintsAffectingLayoutFor",0,[0,],"constraintsAffectingLayoutForAxis",0,[0,],"hasAmbiguousLayout",0,[],],
UILayoutPriority:["initFloat",0,[0,],"initRawValueFloat",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"required",0,[],"defaultHigh",0,[],"defaultLow",0,[],"fittingSizeLevel",0,[],],
UILayoutSupport:["_length",0,[],"topAnchor",0,[],"bottomAnchor",0,[],"heightAnchor",0,[],],
UILexicon:["deinit",0,[],"entries",0,[],"init",0,[],"copyWith",0,[1,],],
UILexiconEntry:["deinit",0,[],"documentText",0,[],"userInput",0,[],"init",0,[],"copyWith",0,[1,],],
UILineBreakMode:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"wordWrap",0,[],"WordWrap",0,[],"_",0,[],"characterWrap",0,[],"CharacterWrap",0,[],"_",0,[],"clip",0,[],"Clip",0,[],"_",0,[],"headTruncation",0,[],"HeadTruncation",0,[],"_",0,[],"tailTruncation",0,[],"TailTruncation",0,[],"_",0,[],"middleTruncation",0,[],"MiddleTruncation",0,[],"_",0,[],],
UILocalNotification:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"fireDate",1,[],"timeZone",1,[],"repeatInterval",0,[],"repeatCalendar",1,[],"regionTriggersOnce",0,[],"alertBody",1,[],"hasAction",0,[],"alertAction",1,[],"alertLaunchImage",1,[],"alertTitle",1,[],"soundName",1,[],"applicationIconBadgeNumber",0,[],"userInfo",1,[],"category",1,[],"copyWith",0,[1,],"encodeWith",0,[0,],],
UILocalizedIndexedCollation:["deinit",0,[],"current",0,[],"currentCollation",0,[],"sectionTitles",0,[],"sectionIndexTitles",0,[],"sectionForSectionIndexTitle",0,[0,],"sectionForSectionIndexTitleAtIndex",0,[0,],"sectionForCollationStringSelector",0,[0,0,],"sectionForObjectCollationStringSelector",0,[0,0,],"sortedArrayFromCollationStringSelector",0,[0,0,],"sortedArrayFromArrayCollationStringSelector",0,[0,0,],"init",0,[],],
UILongPressGestureRecognizer:["deinit",0,[],"numberOfTapsRequired",0,[],"numberOfTouchesRequired",0,[],"minimumPressDuration",0,[],"allowableMovement",0,[],"initTargetOptionalActionOptional",0,[1,1,],"init",0,[],],
UIManagedDocument:["deinit",0,[],"persistentStoreName",0,[],"persistentStoreOptions",1,[],"modelConfiguration",1,[],"configurePersistentStoreCoordinatorForOfTypeModelConfigurationStoreOptions",0,[0,0,1,1,],"configurePersistentStoreCoordinatorForURLOfTypeModelConfigurationStoreOptions",0,[0,0,1,1,],"persistentStoreTypeForFileType",0,[0,],"persistentStoreTypeForFileType",0,[0,],"readAdditionalContentFrom",0,[0,],"readAdditionalContentFromURL",0,[0,],"additionalContentFor",0,[0,],"additionalContentForURL",0,[0,],"writeAdditionalContentToOriginalContentsURL",0,[0,0,1,],"writeAdditionalContentToURLOriginalContentsURL",0,[0,0,1,],"initFileURLURL",0,[0,],"init",0,[],],
UIMarkupTextPrintFormatter:["deinit",0,[],"initMarkupTextString",0,[0,],"markupText",1,[],"init",0,[],],
UIMenuController:["deinit",0,[],"shared",0,[],"sharedMenuController",0,[],"isMenuVisible",0,[],"menuVisible",0,[],"setMenuVisibleAnimated",0,[0,0,],"setTargetRectIn",0,[0,0,],"setTargetRectInView",0,[0,0,],"arrowDirection",0,[],"menuItems",1,[],"update",0,[],"menuFrame",0,[],"init",0,[],"willShowMenuNotification",0,[],"didShowMenuNotification",0,[],"willHideMenuNotification",0,[],"didHideMenuNotification",0,[],"menuFrameDidChangeNotification",0,[],"ArrowDirection",0,[],],
UIMenuItem:["deinit",0,[],"initTitleStringActionSelector",0,[0,0,],"title",0,[],"action",0,[],"init",0,[],],
UIModalPresentationStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"fullScreen",0,[],"FullScreen",0,[],"_",0,[],"pageSheet",0,[],"PageSheet",0,[],"_",0,[],"formSheet",0,[],"FormSheet",0,[],"_",0,[],"currentContext",0,[],"CurrentContext",0,[],"_",0,[],"custom",0,[],"Custom",0,[],"_",0,[],"overFullScreen",0,[],"OverFullScreen",0,[],"_",0,[],"overCurrentContext",0,[],"OverCurrentContext",0,[],"_",0,[],"popover",0,[],"Popover",0,[],"_",0,[],"blurOverFullScreen",0,[],"none",0,[],"None",0,[],"_",0,[],],
UIModalTransitionStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"coverVertical",0,[],"CoverVertical",0,[],"_",0,[],"flipHorizontal",0,[],"FlipHorizontal",0,[],"_",0,[],"crossDissolve",0,[],"CrossDissolve",0,[],"_",0,[],"partialCurl",0,[],"PartialCurl",0,[],"_",0,[],],
UIMotionEffect:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"keyPathsAndRelativeValuesForViewerOffset",0,[0,],"keyPathsAndRelativeValuesForViewerOffset",0,[0,],"copyWith",0,[1,],"encodeWith",0,[0,],],
UIMotionEffectGroup:["deinit",0,[],"motionEffects",1,[],"init",0,[],"initCoderNSCoder",0,[0,],],
UIMutableApplicationShortcutItem:["deinit",0,[],"type",0,[],"localizedTitle",0,[],"localizedSubtitle",1,[],"icon",1,[],"userInfo",1,[],"init",0,[],"initTypeStringLocalizedTitleStringLocalizedSubtitleOptionalIconOptionalUserInfoOptional",0,[0,0,1,1,1,],"initTypeStringLocalizedTitleString",0,[0,0,],],
UIMutableUserNotificationAction:["deinit",0,[],"identifier",1,[],"title",1,[],"behavior",0,[],"parameters",0,[],"activationMode",0,[],"isAuthenticationRequired",0,[],"authenticationRequired",0,[],"isDestructive",0,[],"destructive",0,[],"init",0,[],"initCoderNSCoder",0,[0,],],
UIMutableUserNotificationCategory:["deinit",0,[],"identifier",1,[],"setActionsFor",0,[1,0,],"setActionsForContext",0,[1,0,],"init",0,[],"initCoderNSCoder",0,[0,],],
UINavigationBar:["deinit",0,[],"barStyle",0,[],"delegate",0,[],"isTranslucent",0,[],"translucent",0,[],"pushItemAnimated",0,[0,0,],"pushNavigationItemAnimated",0,[0,0,],"popItemAnimated",0,[0,],"popNavigationItemAnimated",0,[0,],"topItem",1,[],"backItem",1,[],"items",1,[],"setItemsAnimated",0,[1,0,],"prefersLargeTitles",0,[],"tintColor",1,[],"barTintColor",1,[],"setBackgroundImageForBarMetrics",0,[1,0,0,],"setBackgroundImageForBarPositionBarMetrics",0,[1,0,0,],"backgroundImageForBarMetrics",0,[0,0,],"backgroundImageForBarPositionBarMetrics",0,[0,0,],"setBackgroundImageFor",0,[1,0,],"setBackgroundImageForBarMetrics",0,[1,0,],"backgroundImageFor",0,[0,],"backgroundImageForBarMetrics",0,[0,],"shadowImage",1,[],"titleTextAttributes",1,[],"largeTitleTextAttributes",1,[],"setTitleVerticalPositionAdjustmentFor",0,[0,0,],"setTitleVerticalPositionAdjustmentForBarMetrics",0,[0,0,],"titleVerticalPositionAdjustmentFor",0,[0,],"titleVerticalPositionAdjustmentForBarMetrics",0,[0,],"backIndicatorImage",1,[],"backIndicatorTransitionMaskImage",1,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"barPosition",0,[],],
UINavigationBarDelegate:["navigationBarShouldPush",0,[0,0,],"navigationBarShouldPushItem",0,[0,0,],"navigationBarDidPush",0,[0,0,],"navigationBarDidPushItem",0,[0,0,],"navigationBarShouldPop",0,[0,0,],"navigationBarShouldPopItem",0,[0,0,],"navigationBarDidPop",0,[0,0,],"navigationBarDidPopItem",0,[0,0,],],
UINavigationController:["deinit",0,[],"initNavigationBarClassOptionalToolbarClassOptional",0,[1,1,],"initRootViewControllerUIViewController",0,[0,],"pushViewControllerAnimated",0,[0,0,],"popViewControllerAnimated",0,[0,],"popViewControllerAnimated",0,[0,],"popToViewControllerAnimated",0,[0,0,],"popToRootViewControllerAnimated",0,[0,],"popToRootViewControllerAnimated",0,[0,],"topViewController",1,[],"visibleViewController",1,[],"viewControllers",0,[],"setViewControllersAnimated",0,[0,0,],"isNavigationBarHidden",0,[],"navigationBarHidden",0,[],"setNavigationBarHiddenAnimated",0,[0,0,],"navigationBar",0,[],"isToolbarHidden",0,[],"toolbarHidden",0,[],"setToolbarHiddenAnimated",0,[0,0,],"toolbar",1,[],"delegate",0,[],"interactivePopGestureRecognizer",1,[],"showSender",0,[0,1,],"showViewControllerSender",0,[0,1,],"hidesBarsWhenKeyboardAppears",0,[],"hidesBarsOnSwipe",0,[],"barHideOnSwipeGestureRecognizer",0,[],"hidesBarsWhenVerticallyCompact",0,[],"hidesBarsOnTap",0,[],"barHideOnTapGestureRecognizer",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],"Operation",0,[],"hideShowBarDuration",0,[],],
UINavigationControllerDelegate:["navigationControllerWillShowAnimated",0,[0,0,0,],"navigationControllerWillShowViewControllerAnimated",0,[0,0,0,],"navigationControllerDidShowAnimated",0,[0,0,0,],"navigationControllerDidShowViewControllerAnimated",0,[0,0,0,],"navigationControllerSupportedInterfaceOrientations",0,[0,],"navigationControllerPreferredInterfaceOrientationForPresentation",0,[0,],"navigationControllerInteractionControllerFor",0,[0,0,],"navigationControllerInteractionControllerForAnimationController",0,[0,0,],"navigationControllerAnimationControllerForFromTo",0,[0,0,0,0,],"navigationControllerAnimationControllerForOperationFromViewControllerToViewController",0,[0,0,0,0,],],
UINavigationItem:["deinit",0,[],"initTitleString",0,[0,],"initCoderNSCoder",0,[0,],"title",1,[],"titleView",1,[],"_prompt",1,[],"backBarButtonItem",1,[],"hidesBackButton",0,[],"setHidesBackButtonAnimated",0,[0,0,],"leftBarButtonItems",1,[],"rightBarButtonItems",1,[],"setLeftBarButtonItemsAnimated",0,[1,0,],"setRightBarButtonItemsAnimated",0,[1,0,],"leftItemsSupplementBackButton",0,[],"leftBarButtonItem",1,[],"rightBarButtonItem",1,[],"setLeftBarButtonAnimated",0,[1,0,],"setLeftBarButtonItemAnimated",0,[1,0,],"setRightBarButtonAnimated",0,[1,0,],"setRightBarButtonItemAnimated",0,[1,0,],"largeTitleDisplayMode",0,[],"searchController",1,[],"hidesSearchBarWhenScrolling",0,[],"init",0,[],"encodeWith",0,[0,],"LargeTitleDisplayMode",0,[],],
UINib:["deinit",0,[],"initNibNameStringBundleOptional",0,[0,1,],"nibWithNibNameBundle",0,[0,1,],"initDataDataBundleOptional",0,[0,1,],"nibWithDataBundle",0,[0,1,],"instantiateWithOwnerOptions",0,[1,1,],"instantiateWithOwnerOptions",0,[1,1,],"init",0,[],"OptionsKey",0,[],],
UINotificationFeedbackGenerator:["deinit",0,[],"notificationOccurred",0,[0,],"init",0,[],"FeedbackType",0,[],],
UIObjectRestoration:["objectWithRestorationIdentifierPathCoder",0,[0,0,],"objectWithRestorationIdentifierPathCoder",0,[0,0,],],
UIOffset:["horizontal",0,[],"vertical",0,[],"init",0,[],"initHorizontalCGFloatVerticalCGFloat",0,[0,0,],"initHorizontalCGFloatVerticalCGFloat",0,[0,0,],"zero",0,[],"infix_61_61",0,[0,0,],"initFromDecoder",0,[0,],"encodeTo",0,[0,],"_bridgeToObjectiveC",0,[],"_forceBridgeFromObjectiveCResult",0,[0,1,],"_conditionallyBridgeFromObjectiveCResult",0,[0,1,],"_unconditionallyBridgeFromObjectiveC",0,[1,],"_ObjectiveCType",0,[],],
UIPageControl:["deinit",0,[],"numberOfPages",0,[],"currentPage",0,[],"hidesForSinglePage",0,[],"defersCurrentPageDisplay",0,[],"updateCurrentPageDisplay",0,[],"sizeForNumberOfPages",0,[0,],"sizeForNumberOfPages",0,[0,],"pageIndicatorTintColor",1,[],"currentPageIndicatorTintColor",1,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],],
UIPageViewController:["deinit",0,[],"initTransitionStyleUIPageViewControllerTransitionStyleNavigationOrientationUIPageViewControllerNavigationOrientationOptionsOptional",0,[0,0,1,],"initCoderNSCoder",0,[0,],"delegate",0,[],"dataSource",0,[],"transitionStyle",0,[],"navigationOrientation",0,[],"spineLocation",0,[],"isDoubleSided",0,[],"doubleSided",0,[],"gestureRecognizers",0,[],"viewControllers",1,[],"setViewControllersDirectionAnimatedCompletion",0,[1,0,0,1,],"initNibNameOptionalBundleOptional",0,[1,1,],"init",0,[],"NavigationOrientation",0,[],"SpineLocation",0,[],"NavigationDirection",0,[],"TransitionStyle",0,[],"OptionsKey",0,[],],
UIPageViewControllerDataSource:["pageViewControllerViewControllerBefore",0,[0,0,],"pageViewControllerViewControllerBeforeViewController",0,[0,0,],"pageViewControllerViewControllerAfter",0,[0,0,],"pageViewControllerViewControllerAfterViewController",0,[0,0,],"presentationCountFor",0,[0,],"presentationCountForPageViewController",0,[0,],"presentationIndexFor",0,[0,],"presentationIndexForPageViewController",0,[0,],],
UIPageViewControllerDelegate:["pageViewControllerWillTransitionTo",0,[0,0,],"pageViewControllerWillTransitionToViewControllers",0,[0,0,],"pageViewControllerDidFinishAnimatingPreviousViewControllersTransitionCompleted",0,[0,0,0,0,],"pageViewControllerSpineLocationFor",0,[0,0,],"pageViewControllerSpineLocationForInterfaceOrientation",0,[0,0,],"pageViewControllerSupportedInterfaceOrientations",0,[0,],"pageViewControllerPreferredInterfaceOrientationForPresentation",0,[0,],],
UIPanGestureRecognizer:["deinit",0,[],"minimumNumberOfTouches",0,[],"maximumNumberOfTouches",0,[],"translationIn",0,[1,],"translationInView",0,[1,],"setTranslationIn",0,[0,1,],"setTranslationInView",0,[0,1,],"velocityIn",0,[1,],"velocityInView",0,[1,],"initTargetOptionalActionOptional",0,[1,1,],"init",0,[],],
UIPasteConfiguration:["deinit",0,[],"acceptableTypeIdentifiers",0,[],"init",0,[],"initAcceptableTypeIdentifiersArray",0,[0,],"addAcceptableTypeIdentifiers",0,[0,],"initForAcceptingNSItemProviderReading",0,[0,],"initTypeIdentifiersForAcceptingClassNSItemProviderReading",0,[0,],"addTypeIdentifiersForAccepting",0,[0,],"addTypeIdentifiersForAcceptingClass",0,[0,],"supportsSecureCoding",0,[],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],"copyWith",0,[1,],"initForAcceptingfunctionthrowunclarifiedGenericT",0,[0,],"addTypeIdentifiersForAccepting",0,[0,],],
UIPasteConfigurationSupporting:["pasteConfiguration",1,[],"pasteItemProviders",0,[0,],"pasteItemProviders",0,[0,],"canPaste",0,[0,],"canPasteItemProviders",0,[0,],],
UIPasteboard:["deinit",0,[],"general",0,[],"generalPasteboard",0,[],"initNameUIPasteboardNameCreateBool",0,[0,0,],"pasteboardWithNameCreate",0,[0,0,],"withUniqueName",0,[],"pasteboardWithUniqueName",0,[],"_name",0,[],"removeWithName",0,[0,],"removePasteboardWithName",0,[0,],"isPersistent",0,[],"persistent",0,[],"setPersistent",0,[0,],"changeCount",0,[],"itemProviders",0,[],"setItemProvidersLocalOnlyExpirationDate",0,[0,0,1,],"setObjects",0,[0,],"setObjectsLocalOnlyExpirationDate",0,[0,0,1,],"types",0,[],"pasteboardTypes",0,[],"containsPasteboardTypes",0,[0,],"containsPasteboardTypes",0,[0,],"dataForPasteboardType",0,[0,],"dataForPasteboardType",0,[0,],"valueForPasteboardType",0,[0,],"valueForPasteboardType",0,[0,],"setValueForPasteboardType",0,[0,0,],"setDataForPasteboardType",0,[0,0,],"numberOfItems",0,[],"typesForItemSet",0,[1,],"pasteboardTypesForItemSet",0,[1,],"containsPasteboardTypesInItemSet",0,[0,1,],"containsPasteboardTypesInItemSet",0,[0,1,],"itemSetWithPasteboardTypes",0,[0,],"itemSetWithPasteboardTypes",0,[0,],"valuesForPasteboardTypeInItemSet",0,[0,1,],"valuesForPasteboardTypeInItemSet",0,[0,1,],"dataForPasteboardTypeInItemSet",0,[0,1,],"dataForPasteboardTypeInItemSet",0,[0,1,],"items",0,[],"addItems",0,[0,],"setItemsOptions",0,[0,0,],"string",1,[],"strings",1,[],"url",1,[],"URL",1,[],"urls",1,[],"URLs",1,[],"_image",1,[],"_images",1,[],"color",1,[],"colors",1,[],"hasStrings",0,[],"hasURLs",0,[],"hasImages",0,[],"hasColors",0,[],"init",0,[],"OptionsKey",0,[],"changedNotification",0,[],"changedTypesAddedUserInfoKey",0,[],"changedTypesRemovedUserInfoKey",0,[],"removedNotification",0,[],"typeListString",0,[],"typeListURL",0,[],"typeListImage",0,[],"typeListColor",0,[],"typeAutomatic",0,[],"Name",0,[],"setObjects",0,[0,],"setObjectsLocalOnlyExpirationDate",0,[0,0,1,],],
UIPencilInteraction:["deinit",0,[],"preferredTapAction",0,[],"delegate",0,[],"isEnabled",0,[],"enabled",0,[],"init",0,[],"view",0,[],"willMoveTo",0,[1,],"didMoveTo",0,[1,],],
UIPencilInteractionDelegate:["pencilInteractionDidTap",0,[0,],],
UIPencilPreferredAction:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"ignore",0,[],"Ignore",0,[],"_",0,[],"switchEraser",0,[],"SwitchEraser",0,[],"_",0,[],"switchPrevious",0,[],"SwitchPrevious",0,[],"_",0,[],"showColorPalette",0,[],"ShowColorPalette",0,[],"_",0,[],],
UIPercentDrivenInteractiveTransition:["deinit",0,[],"duration",0,[],"percentComplete",0,[],"completionSpeed",0,[],"completionCurve",0,[],"timingCurve",1,[],"wantsInteractiveStart",0,[],"pause",0,[],"pauseInteractiveTransition",0,[],"update",0,[0,],"updateInteractiveTransition",0,[0,],"cancel",0,[],"cancelInteractiveTransition",0,[],"finish",0,[],"finishInteractiveTransition",0,[],"init",0,[],"startInteractiveTransition",0,[0,],],
UIPickerView:["deinit",0,[],"dataSource",0,[],"delegate",0,[],"showsSelectionIndicator",0,[],"numberOfComponents",0,[],"numberOfRowsInComponent",0,[0,],"numberOfRowsInComponent",0,[0,],"rowSizeForComponent",0,[0,],"rowSizeForComponent",0,[0,],"viewForRowForComponent",0,[0,0,],"viewForRowForComponent",0,[0,0,],"reloadAllComponents",0,[],"reloadComponent",0,[0,],"selectRowInComponentAnimated",0,[0,0,0,],"selectedRowInComponent",0,[0,],"selectedRowInComponent",0,[0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],],
UIPickerViewAccessibilityDelegate:["pickerViewAccessibilityLabelForComponent",0,[0,0,],"pickerViewAccessibilityHintForComponent",0,[0,0,],"pickerViewAccessibilityAttributedLabelForComponent",0,[0,0,],"pickerViewAccessibilityAttributedHintForComponent",0,[0,0,],],
UIPickerViewDataSource:["numberOfComponentsIn",0,[0,],"numberOfComponentsInPickerView",0,[0,],"pickerViewNumberOfRowsInComponent",0,[0,0,],],
UIPickerViewDelegate:["pickerViewWidthForComponent",0,[0,0,],"pickerViewRowHeightForComponent",0,[0,0,],"pickerViewTitleForRowForComponent",0,[0,0,0,],"pickerViewAttributedTitleForRowForComponent",0,[0,0,0,],"pickerViewViewForRowForComponentReusing",0,[0,0,0,1,],"pickerViewViewForRowForComponentReusingView",0,[0,0,0,1,],"pickerViewDidSelectRowInComponent",0,[0,0,0,],],
UIPinchGestureRecognizer:["deinit",0,[],"scale",0,[],"velocity",0,[],"initTargetOptionalActionOptional",0,[1,1,],"init",0,[],],
UIPopoverArrowDirection:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"up",0,[],"_",0,[],"Up",0,[],"_",0,[],"down",0,[],"_",0,[],"Down",0,[],"_",0,[],"left",0,[],"_",0,[],"Left",0,[],"_",0,[],"right",0,[],"_",0,[],"Right",0,[],"_",0,[],"any",0,[],"_",0,[],"Any",0,[],"_",0,[],"unknown",0,[],"_",0,[],"Unknown",0,[],"_",0,[],],
UIPopoverBackgroundView:["deinit",0,[],"arrowOffset",0,[],"arrowDirection",0,[],"wantsDefaultContentAppearance",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"arrowBase",0,[],"contentViewInsets",0,[],"arrowHeight",0,[],],
UIPopoverBackgroundViewMethods:["arrowBase",0,[],"contentViewInsets",0,[],"arrowHeight",0,[],],
UIPopoverController:["deinit",0,[],"initContentViewControllerUIViewController",0,[0,],"delegate",0,[],"contentViewController",0,[],"setContentViewAnimated",0,[0,0,],"setContentViewControllerAnimated",0,[0,0,],"contentSize",0,[],"popoverContentSize",0,[],"setContentSizeAnimated",0,[0,0,],"setPopoverContentSizeAnimated",0,[0,0,],"isPopoverVisible",0,[],"popoverVisible",0,[],"arrowDirection",0,[],"popoverArrowDirection",0,[],"passthroughViews",1,[],"presentFromInPermittedArrowDirectionsAnimated",0,[0,0,0,0,],"presentPopoverFromRectInViewPermittedArrowDirectionsAnimated",0,[0,0,0,0,],"presentFromPermittedArrowDirectionsAnimated",0,[0,0,0,],"presentPopoverFromBarButtonItemPermittedArrowDirectionsAnimated",0,[0,0,0,],"dismissAnimated",0,[0,],"dismissPopoverAnimated",0,[0,],"backgroundColor",1,[],"layoutMargins",0,[],"popoverLayoutMargins",0,[],"backgroundViewClass",1,[],"popoverBackgroundViewClass",1,[],"init",0,[],],
UIPopoverControllerDelegate:["popoverControllerShouldDismissPopover",0,[0,],"popoverControllerDidDismissPopover",0,[0,],"popoverControllerWillRepositionPopoverToIn",0,[0,0,0,],"popoverControllerWillRepositionPopoverToRectInView",0,[0,0,0,],],
UIPopoverPresentationController:["deinit",0,[],"delegate",0,[],"permittedArrowDirections",0,[],"sourceView",1,[],"sourceRect",0,[],"canOverlapSourceViewRect",0,[],"barButtonItem",1,[],"arrowDirection",0,[],"passthroughViews",1,[],"backgroundColor",1,[],"popoverLayoutMargins",0,[],"popoverBackgroundViewClass",1,[],"initPresentedViewControllerUIViewControllerPresentingOptional",0,[0,1,],"init",0,[],],
UIPopoverPresentationControllerDelegate:["prepareForPopoverPresentation",0,[0,],"popoverPresentationControllerShouldDismissPopover",0,[0,],"popoverPresentationControllerDidDismissPopover",0,[0,],"popoverPresentationControllerWillRepositionPopoverToIn",0,[0,0,0,],"popoverPresentationControllerWillRepositionPopoverToRectInView",0,[0,0,0,],],
UIPresentationController:["deinit",0,[],"presentingViewController",0,[],"presentedViewController",0,[],"presentationStyle",0,[],"containerView",1,[],"delegate",0,[],"initPresentedViewControllerUIViewControllerPresentingOptional",0,[0,1,],"initPresentedViewControllerUIViewControllerPresentingViewControllerOptional",0,[0,1,],"init",0,[],"adaptivePresentationStyle",0,[],"adaptivePresentationStyleFor",0,[0,],"adaptivePresentationStyleForTraitCollection",0,[0,],"containerViewWillLayoutSubviews",0,[],"containerViewDidLayoutSubviews",0,[],"presentedView",1,[],"frameOfPresentedViewInContainerView",0,[],"shouldPresentInFullscreen",0,[],"shouldRemovePresentersView",0,[],"presentationTransitionWillBegin",0,[],"presentationTransitionDidEnd",0,[0,],"dismissalTransitionWillBegin",0,[],"dismissalTransitionDidEnd",0,[0,],"overrideTraitCollection",1,[],"traitCollection",0,[],"preferredContentSize",0,[],"preferredFocusEnvironments",0,[],"parentFocusEnvironment",0,[],"focusItemContainer",1,[],"preferredFocusedView",0,[],"traitCollectionDidChange",0,[1,],"preferredContentSizeDidChangeForChildContentContainer",0,[0,],"systemLayoutFittingSizeDidChangeForChildContentContainer",0,[0,],"sizeForChildContentContainerWithParentContainerSize",0,[0,0,],"viewWillTransitionToWith",0,[0,0,],"willTransitionToWith",0,[0,0,],"setNeedsFocusUpdate",0,[],"updateFocusIfNeeded",0,[],"shouldUpdateFocusIn",0,[0,],"didUpdateFocusInWith",0,[0,0,],"soundIdentifierForFocusUpdateIn",0,[0,],],
UIPress:["deinit",0,[],"timestamp",0,[],"phase",0,[],"type",0,[],"window",1,[],"responder",1,[],"gestureRecognizers",1,[],"force",0,[],"init",0,[],"Phase",0,[],"PressType",0,[],],
UIPressesEvent:["deinit",0,[],"allPresses",0,[],"pressesFor",0,[0,],"pressesForGestureRecognizer",0,[0,],"init",0,[],],
UIPreviewAction:["deinit",0,[],"handler",0,[],"initTitleStringStyleUIPreviewActionStyleHandlerfunction_type",0,[0,0,0,],"actionWithTitleStyleHandler",0,[0,0,0,],"init",0,[],"title",0,[],"copyWith",0,[1,],"Style",0,[],],
UIPreviewActionGroup:["deinit",0,[],"initTitleStringStyleUIPreviewActionStyleActionsArray",0,[0,0,0,],"actionGroupWithTitleStyleActions",0,[0,0,0,],"init",0,[],"title",0,[],"copyWith",0,[1,],],
UIPreviewActionItem:["title",0,[],],
UIPreviewInteraction:["deinit",0,[],"initViewUIView",0,[0,],"view",0,[],"init",0,[],"delegate",0,[],"locationIn",0,[1,],"locationInCoordinateSpace",0,[1,],"cancel",0,[],"cancelInteraction",0,[],],
UIPreviewInteractionDelegate:["previewInteractionDidUpdatePreviewTransitionEnded",0,[0,0,0,],"previewInteractionDidCancel",0,[0,],"previewInteractionShouldBegin",0,[0,],"previewInteractionDidUpdateCommitTransitionEnded",0,[0,0,0,],],
UIPrintError:["_nsError",0,[],"init_nsErrorNSError",0,[0,],"errorDomain",0,[],"_",0,[],"Code",0,[],"notAvailable",0,[],"_",0,[],"noContent",0,[],"_",0,[],"unknownImageFormat",0,[],"_",0,[],"jobFailed",0,[],"_",0,[],],
UIPrintFormatter:["deinit",0,[],"printPageRenderer",0,[],"removeFromPrintPageRenderer",0,[],"maximumContentHeight",0,[],"maximumContentWidth",0,[],"contentInsets",0,[],"perPageContentInsets",0,[],"startPage",0,[],"pageCount",0,[],"rectForPageAt",0,[0,],"rectForPageAtIndex",0,[0,],"drawInForPageAt",0,[0,0,],"drawInRectForPageAtIndex",0,[0,0,],"init",0,[],"copyWith",0,[1,],],
UIPrintInfo:["deinit",0,[],"initCoderNSCoder",0,[0,],"printInfo",0,[],"init",0,[],"initDictionaryOptional",0,[1,],"printInfoWithDictionary",0,[1,],"printerID",1,[],"jobName",0,[],"outputType",0,[],"orientation",0,[],"duplex",0,[],"dictionaryRepresentation",0,[],"init",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],"OutputType",0,[],"Orientation",0,[],"Duplex",0,[],],
UIPrintInteractionController:["deinit",0,[],"isPrintingAvailable",0,[],"printingAvailable",0,[],"printableUTIs",0,[],"canPrint",0,[0,],"canPrintURL",0,[0,],"canPrint",0,[0,],"canPrintData",0,[0,],"shared",0,[],"sharedPrintController",0,[],"printInfo",1,[],"delegate",0,[],"showsPageRange",0,[],"showsNumberOfCopies",0,[],"showsPaperSelectionForLoadedPapers",0,[],"printPaper",1,[],"printPageRenderer",1,[],"printFormatter",1,[],"printingItem",1,[],"printingItems",1,[],"presentAnimatedCompletionHandler",0,[0,1,],"presentAnimatedCompletionHandler",0,[0,1,],"presentFromInAnimatedCompletionHandler",0,[0,0,0,1,],"presentFromRectInViewAnimatedCompletionHandler",0,[0,0,0,1,],"presentFromAnimatedCompletionHandler",0,[0,0,1,],"presentFromBarButtonItemAnimatedCompletionHandler",0,[0,0,1,],"printToCompletionHandler",0,[0,1,],"printToPrinterCompletionHandler",0,[0,1,],"dismissAnimated",0,[0,],"dismissAnimated",0,[0,],"init",0,[],"CompletionHandler",0,[],],
UIPrintInteractionControllerDelegate:["printInteractionControllerParentViewController",0,[0,],"printInteractionControllerChoosePaper",0,[0,0,],"printInteractionControllerWillPresentPrinterOptions",0,[0,],"printInteractionControllerDidPresentPrinterOptions",0,[0,],"printInteractionControllerWillDismissPrinterOptions",0,[0,],"printInteractionControllerDidDismissPrinterOptions",0,[0,],"printInteractionControllerWillStartJob",0,[0,],"printInteractionControllerDidFinishJob",0,[0,],"printInteractionControllerCutLengthFor",0,[0,0,],"printInteractionControllerCutLengthForPaper",0,[0,0,],"printInteractionControllerChooseCutterBehavior",0,[0,0,],],
UIPrintPageRenderer:["deinit",0,[],"headerHeight",0,[],"footerHeight",0,[],"paperRect",0,[],"printableRect",0,[],"numberOfPages",0,[],"printFormatters",1,[],"printFormattersForPageAt",0,[0,],"printFormattersForPageAtIndex",0,[0,],"addPrintFormatterStartingAtPageAt",0,[0,0,],"addPrintFormatterStartingAtPageAtIndex",0,[0,0,],"prepareForDrawingPages",0,[0,],"prepareForDrawingPages",0,[0,],"drawPageAtIn",0,[0,0,],"drawPageAtIndexInRect",0,[0,0,],"drawPrintFormatterForPageAt",0,[0,0,],"drawPrintFormatterForPageAtIndex",0,[0,0,],"drawHeaderForPageAtIn",0,[0,0,],"drawHeaderForPageAtIndexInRect",0,[0,0,],"drawContentForPageAtIn",0,[0,0,],"drawContentForPageAtIndexInRect",0,[0,0,],"drawFooterForPageAtIn",0,[0,0,],"drawFooterForPageAtIndexInRect",0,[0,0,],"init",0,[],],
UIPrintPaper:["deinit",0,[],"bestPaperForPageSizeWithPapersFrom",0,[0,0,],"bestPaperForPageSizeWithPapersFromArray",0,[0,0,],"paperSize",0,[],"printableRect",0,[],"init",0,[],"printRect",0,[],],
UIPrinter:["deinit",0,[],"initUrlURL",0,[0,],"initURLURL",0,[0,],"printerWithURL",0,[0,],"url",0,[],"URL",0,[],"displayName",0,[],"displayLocation",1,[],"supportedJobTypes",0,[],"makeAndModel",1,[],"supportsColor",0,[],"supportsDuplex",0,[],"contactPrinter",0,[1,],"init",0,[],"CutterBehavior",0,[],"JobTypes",0,[],],
UIPrinterPickerController:["deinit",0,[],"initInitiallySelectedPrinterOptional",0,[1,],"printerPickerControllerWithInitiallySelectedPrinter",0,[1,],"selectedPrinter",1,[],"delegate",0,[],"presentAnimatedCompletionHandler",0,[0,1,],"presentAnimatedCompletionHandler",0,[0,1,],"presentFromInAnimatedCompletionHandler",0,[0,0,0,1,],"presentFromRectInViewAnimatedCompletionHandler",0,[0,0,0,1,],"presentFromAnimatedCompletionHandler",0,[0,0,1,],"presentFromBarButtonItemAnimatedCompletionHandler",0,[0,0,1,],"dismissAnimated",0,[0,],"dismissAnimated",0,[0,],"init",0,[],"CompletionHandler",0,[],],
UIPrinterPickerControllerDelegate:["printerPickerControllerParentViewController",0,[0,],"printerPickerControllerShouldShow",0,[0,0,],"printerPickerControllerShouldShowPrinter",0,[0,0,],"printerPickerControllerWillPresent",0,[0,],"printerPickerControllerDidPresent",0,[0,],"printerPickerControllerWillDismiss",0,[0,],"printerPickerControllerDidDismiss",0,[0,],"printerPickerControllerDidSelectPrinter",0,[0,],],
UIProgressView:["deinit",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"initProgressViewStyleUIProgressViewStyle",0,[0,],"progressViewStyle",0,[],"progress",0,[],"progressTintColor",1,[],"trackTintColor",1,[],"progressImage",1,[],"trackImage",1,[],"setProgressAnimated",0,[0,0,],"observedProgress",1,[],"init",0,[],"Style",0,[],],
UIPushBehavior:["deinit",0,[],"initItemsArrayModeUIPushBehaviorMode",0,[0,0,],"addItem",0,[0,],"removeItem",0,[0,],"items",0,[],"targetOffsetFromCenterFor",0,[0,],"targetOffsetFromCenterForItem",0,[0,],"setTargetOffsetFromCenterFor",0,[0,0,],"setTargetOffsetFromCenterForItem",0,[0,0,],"mode",0,[],"active",0,[],"angle",0,[],"magnitude",0,[],"pushDirection",0,[],"setAngleMagnitude",0,[0,0,],"init",0,[],"Mode",0,[],],
UIRectCorner:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"topLeft",0,[],"_",0,[],"TopLeft",0,[],"_",0,[],"topRight",0,[],"_",0,[],"TopRight",0,[],"_",0,[],"bottomLeft",0,[],"_",0,[],"BottomLeft",0,[],"_",0,[],"bottomRight",0,[],"_",0,[],"BottomRight",0,[],"_",0,[],"allCorners",0,[],"_",0,[],"AllCorners",0,[],"_",0,[],],
UIRectEdge:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"none",0,[],"_",0,[],"None",0,[],"_",0,[],"_top",0,[],"_",0,[],"Top",0,[],"_",0,[],"left",0,[],"_",0,[],"Left",0,[],"_",0,[],"bottom",0,[],"_",0,[],"Bottom",0,[],"_",0,[],"right",0,[],"_",0,[],"Right",0,[],"_",0,[],"_all",0,[],"_",0,[],"All",0,[],"_",0,[],],
UIReferenceLibraryViewController:["deinit",0,[],"dictionaryHasDefinitionForTerm",0,[0,],"dictionaryHasDefinitionForTerm",0,[0,],"initTermString",0,[0,],"initCoderNSCoder",0,[0,],"initNibNameOptionalBundleOptional",0,[1,1,],"init",0,[],],
UIRefreshControl:["deinit",0,[],"init",0,[],"isRefreshing",0,[],"refreshing",0,[],"tintColor",1,[],"attributedTitle",1,[],"beginRefreshing",0,[],"endRefreshing",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],],
UIRegion:["deinit",0,[],"infinite",0,[],"infiniteRegion",0,[],"initRadiusCGFloat",0,[0,],"initSizeCGSize",0,[0,],"inverse",0,[],"inverseRegion",0,[],"byUnionWith",0,[0,],"regionByUnionWithRegion",0,[0,],"byDifferenceFrom",0,[0,],"regionByDifferenceFromRegion",0,[0,],"byIntersectionWith",0,[0,],"regionByIntersectionWithRegion",0,[0,],"contains",0,[0,],"containsPoint",0,[0,],"init",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],],
UIRemoteNotificationType:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"none",0,[],"_",0,[],"None",0,[],"_",0,[],"badge",0,[],"_",0,[],"Badge",0,[],"_",0,[],"sound",0,[],"_",0,[],"Sound",0,[],"_",0,[],"_alert",0,[],"_",0,[],"Alert",0,[],"_",0,[],"newsstandContentAvailability",0,[],"_",0,[],"NewsstandContentAvailability",0,[],"_",0,[],],
UIResponder:["deinit",0,[],"next",1,[],"nextResponder",1,[],"canBecomeFirstResponder",0,[],"becomeFirstResponder",0,[],"canResignFirstResponder",0,[],"resignFirstResponder",0,[],"isFirstResponder",0,[],"touchesBeganWith",0,[0,1,],"touchesBeganWithEvent",0,[0,1,],"touchesMovedWith",0,[0,1,],"touchesMovedWithEvent",0,[0,1,],"touchesEndedWith",0,[0,1,],"touchesEndedWithEvent",0,[0,1,],"touchesCancelledWith",0,[0,1,],"touchesCancelledWithEvent",0,[0,1,],"touchesEstimatedPropertiesUpdated",0,[0,],"pressesBeganWith",0,[0,1,],"pressesBeganWithEvent",0,[0,1,],"pressesChangedWith",0,[0,1,],"pressesChangedWithEvent",0,[0,1,],"pressesEndedWith",0,[0,1,],"pressesEndedWithEvent",0,[0,1,],"pressesCancelledWith",0,[0,1,],"pressesCancelledWithEvent",0,[0,1,],"motionBeganWith",0,[0,1,],"motionBeganWithEvent",0,[0,1,],"motionEndedWith",0,[0,1,],"motionEndedWithEvent",0,[0,1,],"motionCancelledWith",0,[0,1,],"motionCancelledWithEvent",0,[0,1,],"remoteControlReceivedWith",0,[1,],"remoteControlReceivedWithEvent",0,[1,],"canPerformActionWithSender",0,[0,1,],"targetForActionWithSender",0,[0,1,],"targetForActionWithSender",0,[0,1,],"undoManager",1,[],"init",0,[],"cut",0,[1,],"copy",0,[1,],"paste",0,[1,],"_select",0,[1,],"selectAll",0,[1,],"_delete",0,[1,],"makeTextWritingDirectionLeftToRight",0,[1,],"makeTextWritingDirectionRightToLeft",0,[1,],"toggleBoldface",0,[1,],"toggleItalics",0,[1,],"toggleUnderline",0,[1,],"increaseSize",0,[1,],"decreaseSize",0,[1,],"keyboardWillShowNotification",0,[],"keyboardDidShowNotification",0,[],"keyboardWillHideNotification",0,[],"keyboardDidHideNotification",0,[],"keyboardFrameBeginUserInfoKey",0,[],"keyboardFrameEndUserInfoKey",0,[],"keyboardAnimationDurationUserInfoKey",0,[],"keyboardAnimationCurveUserInfoKey",0,[],"keyboardIsLocalUserInfoKey",0,[],"keyboardWillChangeFrameNotification",0,[],"keyboardDidChangeFrameNotification",0,[],"keyCommands",1,[],"inputView",1,[],"inputAccessoryView",1,[],"inputAssistantItem",0,[],"inputViewController",1,[],"inputAccessoryViewController",1,[],"textInputMode",1,[],"textInputContextIdentifier",1,[],"clearTextInputContextIdentifier",0,[0,],"reloadInputViews",0,[],"userActivity",1,[],"updateUserActivityState",0,[0,],"restoreUserActivityState",0,[0,],"pasteConfiguration",1,[],"pasteItemProviders",0,[0,],"canPaste",0,[0,],],
UIResponderStandardEditActions:["cut",0,[1,],"copy",0,[1,],"paste",0,[1,],"_select",0,[1,],"selectAll",0,[1,],"_delete",0,[1,],"makeTextWritingDirectionLeftToRight",0,[1,],"makeTextWritingDirectionRightToLeft",0,[1,],"toggleBoldface",0,[1,],"toggleItalics",0,[1,],"toggleUnderline",0,[1,],"increaseSize",0,[1,],"decreaseSize",0,[1,],],
UIReturnKeyType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"go",0,[],"Go",0,[],"_",0,[],"google",0,[],"Google",0,[],"_",0,[],"join",0,[],"Join",0,[],"_",0,[],"next",0,[],"Next",0,[],"_",0,[],"route",0,[],"Route",0,[],"_",0,[],"search",0,[],"Search",0,[],"_",0,[],"send",0,[],"Send",0,[],"_",0,[],"yahoo",0,[],"Yahoo",0,[],"_",0,[],"done",0,[],"Done",0,[],"_",0,[],"emergencyCall",0,[],"EmergencyCall",0,[],"_",0,[],"_continue",0,[],"Continue",0,[],"_",0,[],],
UIRotationGestureRecognizer:["deinit",0,[],"rotation",0,[],"velocity",0,[],"initTargetOptionalActionOptional",0,[1,1,],"init",0,[],],
UIScreen:["deinit",0,[],"screens",0,[],"main",0,[],"mainScreen",0,[],"bounds",0,[],"scale",0,[],"availableModes",0,[],"preferredMode",1,[],"currentMode",1,[],"overscanCompensation",0,[],"overscanCompensationInsets",0,[],"mirrored",1,[],"mirroredScreen",1,[],"isCaptured",0,[],"captured",0,[],"brightness",0,[],"wantsSoftwareDimming",0,[],"coordinateSpace",0,[],"fixedCoordinateSpace",0,[],"nativeBounds",0,[],"nativeScale",0,[],"displayLinkWithTargetSelector",0,[0,0,],"displayLinkWithTargetSelector",0,[0,0,],"maximumFramesPerSecond",0,[],"focusedItem",0,[],"focusedView",0,[],"supportsFocus",0,[],"applicationFrame",0,[],"init",0,[],"traitCollection",0,[],"traitCollectionDidChange",0,[1,],"didConnectNotification",0,[],"didDisconnectNotification",0,[],"modeDidChangeNotification",0,[],"brightnessDidChangeNotification",0,[],"capturedDidChangeNotification",0,[],"OverscanCompensation",0,[],"snapshotViewAfterScreenUpdates",0,[0,],"snapshotViewAfterScreenUpdates",0,[0,],],
UIScreenEdgePanGestureRecognizer:["deinit",0,[],"edges",0,[],"initTargetOptionalActionOptional",0,[1,1,],"init",0,[],],
UIScreenMode:["deinit",0,[],"size",0,[],"pixelAspectRatio",0,[],"init",0,[],],
UIScrollView:["deinit",0,[],"contentOffset",0,[],"contentSize",0,[],"contentInset",0,[],"adjustedContentInset",0,[],"adjustedContentInsetDidChange",0,[],"contentInsetAdjustmentBehavior",0,[],"contentLayoutGuide",0,[],"frameLayoutGuide",0,[],"delegate",0,[],"isDirectionalLockEnabled",0,[],"directionalLockEnabled",0,[],"bounces",0,[],"alwaysBounceVertical",0,[],"alwaysBounceHorizontal",0,[],"isPagingEnabled",0,[],"pagingEnabled",0,[],"isScrollEnabled",0,[],"scrollEnabled",0,[],"showsHorizontalScrollIndicator",0,[],"showsVerticalScrollIndicator",0,[],"scrollIndicatorInsets",0,[],"indicatorStyle",0,[],"decelerationRate",0,[],"indexDisplayMode",0,[],"setContentOffsetAnimated",0,[0,0,],"scrollRectToVisibleAnimated",0,[0,0,],"flashScrollIndicators",0,[],"isTracking",0,[],"tracking",0,[],"isDragging",0,[],"dragging",0,[],"isDecelerating",0,[],"decelerating",0,[],"delaysContentTouches",0,[],"canCancelContentTouches",0,[],"touchesShouldBeginWithIn",0,[0,1,0,],"touchesShouldBeginWithEventInContentView",0,[0,1,0,],"touchesShouldCancelIn",0,[0,],"touchesShouldCancelInContentView",0,[0,],"minimumZoomScale",0,[],"maximumZoomScale",0,[],"zoomScale",0,[],"setZoomScaleAnimated",0,[0,0,],"zoomToAnimated",0,[0,0,],"zoomToRectAnimated",0,[0,0,],"bouncesZoom",0,[],"isZooming",0,[],"zooming",0,[],"isZoomBouncing",0,[],"zoomBouncing",0,[],"scrollsToTop",0,[],"panGestureRecognizer",0,[],"pinchGestureRecognizer",1,[],"directionalPressGestureRecognizer",0,[],"keyboardDismissMode",0,[],"refreshControl",1,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"visibleSize",0,[],"IndicatorStyle",0,[],"KeyboardDismissMode",0,[],"IndexDisplayMode",0,[],"ContentInsetAdjustmentBehavior",0,[],"DecelerationRate",0,[],],
UIScrollViewAccessibilityDelegate:["accessibilityScrollStatusFor",0,[0,],"accessibilityScrollStatusForScrollView",0,[0,],"accessibilityAttributedScrollStatusFor",0,[0,],"accessibilityAttributedScrollStatusForScrollView",0,[0,],],
UIScrollViewDelegate:["scrollViewDidScroll",0,[0,],"scrollViewDidZoom",0,[0,],"scrollViewWillBeginDragging",0,[0,],"scrollViewWillEndDraggingWithVelocityTargetContentOffset",0,[0,0,0,],"scrollViewDidEndDraggingWillDecelerate",0,[0,0,],"scrollViewWillBeginDecelerating",0,[0,],"scrollViewDidEndDecelerating",0,[0,],"scrollViewDidEndScrollingAnimation",0,[0,],"viewForZoomingIn",0,[0,],"viewForZoomingInScrollView",0,[0,],"scrollViewWillBeginZoomingWith",0,[0,1,],"scrollViewWillBeginZoomingWithView",0,[0,1,],"scrollViewDidEndZoomingWithAtScale",0,[0,1,0,],"scrollViewDidEndZoomingWithViewAtScale",0,[0,1,0,],"scrollViewShouldScrollToTop",0,[0,],"scrollViewDidScrollToTop",0,[0,],"scrollViewDidChangeAdjustedContentInset",0,[0,],],
UISearchBar:["deinit",0,[],"init",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"barStyle",0,[],"delegate",0,[],"text",1,[],"_prompt",1,[],"placeholder",1,[],"showsBookmarkButton",0,[],"showsCancelButton",0,[],"showsSearchResultsButton",0,[],"isSearchResultsButtonSelected",0,[],"searchResultsButtonSelected",0,[],"setShowsCancelButtonAnimated",0,[0,0,],"inputAssistantItem",0,[],"tintColor",1,[],"barTintColor",1,[],"searchBarStyle",0,[],"isTranslucent",0,[],"translucent",0,[],"scopeButtonTitles",1,[],"selectedScopeButtonIndex",0,[],"showsScopeBar",0,[],"inputAccessoryView",1,[],"backgroundImage",1,[],"scopeBarBackgroundImage",1,[],"setBackgroundImageForBarMetrics",0,[1,0,0,],"setBackgroundImageForBarPositionBarMetrics",0,[1,0,0,],"backgroundImageForBarMetrics",0,[0,0,],"backgroundImageForBarPositionBarMetrics",0,[0,0,],"setSearchFieldBackgroundImageFor",0,[1,0,],"setSearchFieldBackgroundImageForState",0,[1,0,],"searchFieldBackgroundImageFor",0,[0,],"searchFieldBackgroundImageForState",0,[0,],"setImageForState",0,[1,0,0,],"setImageForSearchBarIconState",0,[1,0,0,],"imageForState",0,[0,0,],"imageForSearchBarIconState",0,[0,0,],"setScopeBarButtonBackgroundImageFor",0,[1,0,],"setScopeBarButtonBackgroundImageForState",0,[1,0,],"scopeBarButtonBackgroundImageFor",0,[0,],"scopeBarButtonBackgroundImageForState",0,[0,],"setScopeBarButtonDividerImageForLeftSegmentStateRightSegmentState",0,[1,0,0,],"scopeBarButtonDividerImageForLeftSegmentStateRightSegmentState",0,[0,0,],"scopeBarButtonDividerImageForLeftSegmentStateRightSegmentState",0,[0,0,],"setScopeBarButtonTitleTextAttributesFor",0,[1,0,],"setScopeBarButtonTitleTextAttributesForState",0,[1,0,],"scopeBarButtonTitleTextAttributesFor",0,[0,],"scopeBarButtonTitleTextAttributesForState",0,[0,],"searchFieldBackgroundPositionAdjustment",0,[],"searchTextPositionAdjustment",0,[],"setPositionAdjustmentFor",0,[0,0,],"setPositionAdjustmentForSearchBarIcon",0,[0,0,],"positionAdjustmentFor",0,[0,],"positionAdjustmentForSearchBarIcon",0,[0,],"barPosition",0,[],"autocapitalizationType",0,[],"autocorrectionType",0,[],"spellCheckingType",0,[],"smartQuotesType",0,[],"smartDashesType",0,[],"smartInsertDeleteType",0,[],"keyboardType",0,[],"keyboardAppearance",0,[],"returnKeyType",0,[],"enablesReturnKeyAutomatically",0,[],"isSecureTextEntry",0,[],"textContentType",1,[],"passwordRules",1,[],"Icon",0,[],"Style",0,[],],
UISearchBarDelegate:["searchBarShouldBeginEditing",0,[0,],"searchBarTextDidBeginEditing",0,[0,],"searchBarShouldEndEditing",0,[0,],"searchBarTextDidEndEditing",0,[0,],"searchBarTextDidChange",0,[0,0,],"searchBarShouldChangeTextInReplacementText",0,[0,0,0,],"searchBarShouldChangeTextInRangeReplacementText",0,[0,0,0,],"searchBarSearchButtonClicked",0,[0,],"searchBarBookmarkButtonClicked",0,[0,],"searchBarCancelButtonClicked",0,[0,],"searchBarResultsListButtonClicked",0,[0,],"searchBarSelectedScopeButtonIndexDidChange",0,[0,0,],],
UISearchContainerViewController:["deinit",0,[],"searchController",0,[],"initSearchControllerUISearchController",0,[0,],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],],
UISearchController:["deinit",0,[],"initSearchResultsControllerOptional",0,[1,],"searchResultsUpdater",0,[],"isActive",0,[],"active",0,[],"delegate",0,[],"dimsBackgroundDuringPresentation",0,[],"obscuresBackgroundDuringPresentation",0,[],"hidesNavigationBarDuringPresentation",0,[],"searchResultsController",1,[],"searchBar",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],"animationControllerForPresentedPresentingSource",0,[0,0,0,],"animationControllerForDismissed",0,[0,],"interactionControllerForPresentationUsing",0,[0,],"interactionControllerForDismissalUsing",0,[0,],"presentationControllerForPresentedPresentingSource",0,[0,1,0,],"transitionDurationUsing",0,[1,],"animateTransitionUsing",0,[0,],"interruptibleAnimatorUsing",0,[0,],"animationEnded",0,[0,],],
UISearchControllerDelegate:["willPresentSearchController",0,[0,],"didPresentSearchController",0,[0,],"willDismissSearchController",0,[0,],"didDismissSearchController",0,[0,],"presentSearchController",0,[0,],],
UISearchDisplayController:["deinit",0,[],"initSearchBarUISearchBarContentsControllerUIViewController",0,[0,0,],"delegate",0,[],"isActive",0,[],"active",0,[],"setActiveAnimated",0,[0,0,],"searchBar",0,[],"searchContentsController",0,[],"searchResultsTableView",0,[],"searchResultsDataSource",0,[],"searchResultsDelegate",0,[],"searchResultsTitle",1,[],"displaysSearchBarInNavigationBar",0,[],"navigationItem",1,[],"init",0,[],],
UISearchDisplayDelegate:["searchDisplayControllerWillBeginSearch",0,[0,],"searchDisplayControllerDidBeginSearch",0,[0,],"searchDisplayControllerWillEndSearch",0,[0,],"searchDisplayControllerDidEndSearch",0,[0,],"searchDisplayControllerDidLoadSearchResultsTableView",0,[0,0,],"searchDisplayControllerWillUnloadSearchResultsTableView",0,[0,0,],"searchDisplayControllerWillShowSearchResultsTableView",0,[0,0,],"searchDisplayControllerDidShowSearchResultsTableView",0,[0,0,],"searchDisplayControllerWillHideSearchResultsTableView",0,[0,0,],"searchDisplayControllerDidHideSearchResultsTableView",0,[0,0,],"searchDisplayControllerShouldReloadTableForSearch",0,[0,1,],"searchDisplayControllerShouldReloadTableForSearchString",0,[0,1,],"searchDisplayControllerShouldReloadTableForSearchScope",0,[0,0,],],
UISearchResultsUpdating:["updateSearchResultsFor",0,[0,],"updateSearchResultsForSearchController",0,[0,],],
UISegmentedControl:["deinit",0,[],"initItemsOptional",0,[1,],"segmentedControlStyle",0,[],"isMomentary",0,[],"momentary",0,[],"numberOfSegments",0,[],"apportionsSegmentWidthsByContent",0,[],"insertSegmentWithTitleAtAnimated",0,[1,0,0,],"insertSegmentWithTitleAtIndexAnimated",0,[1,0,0,],"insertSegmentWithAtAnimated",0,[1,0,0,],"insertSegmentWithImageAtIndexAnimated",0,[1,0,0,],"removeSegmentAtAnimated",0,[0,0,],"removeSegmentAtIndexAnimated",0,[0,0,],"removeAllSegments",0,[],"setTitleForSegmentAt",0,[1,0,],"setTitleForSegmentAtIndex",0,[1,0,],"titleForSegmentAt",0,[0,],"titleForSegmentAtIndex",0,[0,],"setImageForSegmentAt",0,[1,0,],"setImageForSegmentAtIndex",0,[1,0,],"imageForSegmentAt",0,[0,],"imageForSegmentAtIndex",0,[0,],"setWidthForSegmentAt",0,[0,0,],"setWidthForSegmentAtIndex",0,[0,0,],"widthForSegmentAt",0,[0,],"widthForSegmentAtIndex",0,[0,],"setContentOffsetForSegmentAt",0,[0,0,],"setContentOffsetForSegmentAtIndex",0,[0,0,],"contentOffsetForSegmentAt",0,[0,],"contentOffsetForSegmentAtIndex",0,[0,],"setEnabledForSegmentAt",0,[0,0,],"setEnabledForSegmentAtIndex",0,[0,0,],"isEnabledForSegmentAt",0,[0,],"isEnabledForSegmentAtIndex",0,[0,],"selectedSegmentIndex",0,[],"tintColor",1,[],"setBackgroundImageForBarMetrics",0,[1,0,0,],"setBackgroundImageForStateBarMetrics",0,[1,0,0,],"backgroundImageForBarMetrics",0,[0,0,],"backgroundImageForStateBarMetrics",0,[0,0,],"setDividerImageForLeftSegmentStateRightSegmentStateBarMetrics",0,[1,0,0,0,],"dividerImageForLeftSegmentStateRightSegmentStateBarMetrics",0,[0,0,0,],"dividerImageForLeftSegmentStateRightSegmentStateBarMetrics",0,[0,0,0,],"setTitleTextAttributesFor",0,[1,0,],"setTitleTextAttributesForState",0,[1,0,],"titleTextAttributesFor",0,[0,],"titleTextAttributesForState",0,[0,],"setContentPositionAdjustmentForSegmentTypeBarMetrics",0,[0,0,0,],"contentPositionAdjustmentForSegmentTypeBarMetrics",0,[0,0,],"contentPositionAdjustmentForSegmentTypeBarMetrics",0,[0,0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"noSegment",0,[],"Segment",0,[],"isSpringLoaded",0,[],],
UISegmentedControlStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"plain",0,[],"Plain",0,[],"_",0,[],"bordered",0,[],"Bordered",0,[],"_",0,[],"bar",0,[],"Bar",0,[],"_",0,[],"bezeled",0,[],"Bezeled",0,[],"_",0,[],],
UISelectionFeedbackGenerator:["deinit",0,[],"selectionChanged",0,[],"init",0,[],],
UISemanticContentAttribute:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unspecified",0,[],"Unspecified",0,[],"_",0,[],"playback",0,[],"Playback",0,[],"_",0,[],"spatial",0,[],"Spatial",0,[],"_",0,[],"forceLeftToRight",0,[],"ForceLeftToRight",0,[],"_",0,[],"forceRightToLeft",0,[],"ForceRightToLeft",0,[],"_",0,[],],
UISimpleTextPrintFormatter:["deinit",0,[],"initTextString",0,[0,],"initAttributedTextNSAttributedString",0,[0,],"text",1,[],"attributedText",1,[],"font",1,[],"color",1,[],"textAlignment",0,[],"init",0,[],],
UISlider:["deinit",0,[],"value",0,[],"minimumValue",0,[],"maximumValue",0,[],"minimumValueImage",1,[],"maximumValueImage",1,[],"isContinuous",0,[],"continuous",0,[],"minimumTrackTintColor",1,[],"maximumTrackTintColor",1,[],"thumbTintColor",1,[],"setValueAnimated",0,[0,0,],"setThumbImageFor",0,[1,0,],"setThumbImageForState",0,[1,0,],"setMinimumTrackImageFor",0,[1,0,],"setMinimumTrackImageForState",0,[1,0,],"setMaximumTrackImageFor",0,[1,0,],"setMaximumTrackImageForState",0,[1,0,],"thumbImageFor",0,[0,],"thumbImageForState",0,[0,],"minimumTrackImageFor",0,[0,],"minimumTrackImageForState",0,[0,],"maximumTrackImageFor",0,[0,],"maximumTrackImageForState",0,[0,],"currentThumbImage",1,[],"currentMinimumTrackImage",1,[],"currentMaximumTrackImage",1,[],"minimumValueImageRectForBounds",0,[0,],"minimumValueImageRectForBounds",0,[0,],"maximumValueImageRectForBounds",0,[0,],"maximumValueImageRectForBounds",0,[0,],"trackRectForBounds",0,[0,],"trackRectForBounds",0,[0,],"thumbRectForBoundsTrackRectValue",0,[0,0,0,],"thumbRectForBoundsTrackRectValue",0,[0,0,0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],],
UISnapBehavior:["deinit",0,[],"initItemUIDynamicItemSnapToCGPoint",0,[0,0,],"initItemUIDynamicItemSnapToPointCGPoint",0,[0,0,],"snapPoint",0,[],"damping",0,[],"init",0,[],],
UISplitViewController:["deinit",0,[],"viewControllers",0,[],"delegate",0,[],"presentsWithGesture",0,[],"isCollapsed",0,[],"collapsed",0,[],"preferredDisplayMode",0,[],"displayMode",0,[],"displayModeButtonItem",0,[],"preferredPrimaryColumnWidthFraction",0,[],"minimumPrimaryColumnWidth",0,[],"maximumPrimaryColumnWidth",0,[],"primaryColumnWidth",0,[],"primaryEdge",0,[],"showSender",0,[0,1,],"showViewControllerSender",0,[0,1,],"showDetailViewControllerSender",0,[0,1,],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],"DisplayMode",0,[],"PrimaryEdge",0,[],"automaticDimension",0,[],],
UISplitViewControllerDelegate:["splitViewControllerWillChangeTo",0,[0,0,],"splitViewControllerWillChangeToDisplayMode",0,[0,0,],"targetDisplayModeForActionIn",0,[0,],"targetDisplayModeForActionInSplitViewController",0,[0,],"splitViewControllerShowSender",0,[0,0,1,],"splitViewControllerShowViewControllerSender",0,[0,0,1,],"splitViewControllerShowDetailSender",0,[0,0,1,],"splitViewControllerShowDetailViewControllerSender",0,[0,0,1,],"primaryViewControllerForCollapsing",0,[0,],"primaryViewControllerForCollapsingSplitViewController",0,[0,],"primaryViewControllerForExpanding",0,[0,],"primaryViewControllerForExpandingSplitViewController",0,[0,],"splitViewControllerCollapseSecondaryOnto",0,[0,0,0,],"splitViewControllerCollapseSecondaryViewControllerOntoPrimaryViewController",0,[0,0,0,],"splitViewControllerSeparateSecondaryFrom",0,[0,0,],"splitViewControllerSeparateSecondaryViewControllerFromPrimaryViewController",0,[0,0,],"splitViewControllerSupportedInterfaceOrientations",0,[0,],"splitViewControllerPreferredInterfaceOrientationForPresentation",0,[0,],"splitViewControllerWillHideWithFor",0,[0,0,0,0,],"splitViewControllerWillHideViewControllerWithBarButtonItemForPopoverController",0,[0,0,0,0,],"splitViewControllerWillShowInvalidating",0,[0,0,0,],"splitViewControllerWillShowViewControllerInvalidatingBarButtonItem",0,[0,0,0,],"splitViewControllerPopoverControllerWillPresent",0,[0,0,0,],"splitViewControllerPopoverControllerWillPresentViewController",0,[0,0,0,],"splitViewControllerShouldHideIn",0,[0,0,0,],"splitViewControllerShouldHideViewControllerInOrientation",0,[0,0,0,],],
UISpringLoadedInteraction:["deinit",0,[],"_new",0,[],"init",0,[],"initInteractionBehaviorOptionalInteractionEffectOptionalActivationHandlerfunction_type",0,[1,1,0,],"initActivationHandlerfunction_type",0,[0,],"interactionBehavior",0,[],"interactionEffect",0,[],"view",0,[],"willMoveTo",0,[1,],"didMoveTo",0,[1,],],
UISpringLoadedInteractionBehavior:["shouldAllowWith",0,[0,0,],"shouldAllowInteractionWithContext",0,[0,0,],"interactionDidFinish",0,[0,],],
UISpringLoadedInteractionContext:["state",0,[],"targetView",1,[],"targetItem",1,[],"locationIn",0,[1,],"locationInView",0,[1,],],
UISpringLoadedInteractionEffect:["interactionDidChangeWith",0,[0,0,],"interactionDidChangeWithContext",0,[0,0,],],
UISpringLoadedInteractionEffectState:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"inactive",0,[],"Inactive",0,[],"_",0,[],"possible",0,[],"Possible",0,[],"_",0,[],"activating",0,[],"Activating",0,[],"_",0,[],"activated",0,[],"Activated",0,[],"_",0,[],],
UISpringLoadedInteractionSupporting:["isSpringLoaded",0,[],"springLoaded",0,[],],
UISpringTimingParameters:["deinit",0,[],"initialVelocity",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"initDampingRatioCGFloatInitialVelocityCGVector",0,[0,0,],"initMassCGFloatStiffnessCGFloatDampingCGFloatInitialVelocityCGVector",0,[0,0,0,0,],"initDampingRatioCGFloat",0,[0,],"timingCurveType",0,[],"cubicTimingParameters",1,[],"springTimingParameters",1,[],"encodeWith",0,[0,],"copyWith",0,[1,],],
UIStackView:["deinit",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"initArrangedSubviewsArray",0,[0,],"arrangedSubviews",0,[],"addArrangedSubview",0,[0,],"removeArrangedSubview",0,[0,],"insertArrangedSubviewAt",0,[0,0,],"insertArrangedSubviewAtIndex",0,[0,0,],"axis",0,[],"distribution",0,[],"alignment",0,[],"spacing",0,[],"setCustomSpacingAfter",0,[0,0,],"setCustomSpacingAfterView",0,[0,0,],"customSpacingAfter",0,[0,],"customSpacingAfterView",0,[0,],"isBaselineRelativeArrangement",0,[],"baselineRelativeArrangement",0,[],"isLayoutMarginsRelativeArrangement",0,[],"layoutMarginsRelativeArrangement",0,[],"init",0,[],"Distribution",0,[],"Alignment",0,[],"spacingUseDefault",0,[],"spacingUseSystem",0,[],],
UIStateRestoring:["restorationParent",1,[],"objectRestorationClass",1,[],"encodeRestorableStateWith",0,[0,],"encodeRestorableStateWithCoder",0,[0,],"decodeRestorableStateWith",0,[0,],"decodeRestorableStateWithCoder",0,[0,],"applicationFinishedRestoringState",0,[],],
UIStatusBarAnimation:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"none",0,[],"None",0,[],"_",0,[],"fade",0,[],"Fade",0,[],"_",0,[],"slide",0,[],"Slide",0,[],"_",0,[],],
UIStatusBarStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"lightContent",0,[],"LightContent",0,[],"_",0,[],"blackTranslucent",0,[],"_",0,[],"blackOpaque",0,[],],
UIStepper:["deinit",0,[],"isContinuous",0,[],"continuous",0,[],"autorepeat",0,[],"wraps",0,[],"value",0,[],"minimumValue",0,[],"maximumValue",0,[],"stepValue",0,[],"tintColor",1,[],"setBackgroundImageFor",0,[1,0,],"setBackgroundImageForState",0,[1,0,],"backgroundImageFor",0,[0,],"backgroundImageForState",0,[0,],"setDividerImageForLeftSegmentStateRightSegmentState",0,[1,0,0,],"dividerImageForLeftSegmentStateRightSegmentState",0,[0,0,],"dividerImageForLeftSegmentStateRightSegmentState",0,[0,0,],"setIncrementImageFor",0,[1,0,],"setIncrementImageForState",0,[1,0,],"incrementImageFor",0,[0,],"incrementImageForState",0,[0,],"setDecrementImageFor",0,[1,0,],"setDecrementImageForState",0,[1,0,],"decrementImageFor",0,[0,],"decrementImageForState",0,[0,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],],
UIStoryboard:["deinit",0,[],"initNameStringBundleOptional",0,[0,1,],"storyboardWithNameBundle",0,[0,1,],"instantiateInitialViewController",0,[],"instantiateViewControllerWithIdentifier",0,[0,],"instantiateViewControllerWithIdentifier",0,[0,],"init",0,[],],
UIStoryboardPopoverSegue:["deinit",0,[],"popoverController",0,[],"initIdentifierOptionalSourceUIViewControllerDestinationUIViewControllerPerformHandlerfunction_type",0,[1,0,0,0,],"initIdentifierOptionalSourceUIViewControllerDestinationUIViewController",0,[1,0,0,],"init",0,[],],
UIStoryboardSegue:["deinit",0,[],"initIdentifierOptionalSourceUIViewControllerDestinationUIViewControllerPerformHandlerfunction_type",0,[1,0,0,0,],"segueWithIdentifierSourceDestinationPerformHandler",0,[1,0,0,0,],"initIdentifierOptionalSourceUIViewControllerDestinationUIViewController",0,[1,0,0,],"init",0,[],"identifier",1,[],"source",0,[],"sourceViewController",0,[],"destination",0,[],"destinationViewController",0,[],"perform",0,[],],
UIStoryboardUnwindSegueSource:["deinit",0,[],"init",0,[],"source",0,[],"sourceViewController",0,[],"unwindAction",0,[],"sender",1,[],],
UISwipeActionsConfiguration:["deinit",0,[],"initActionsArray",0,[0,],"configurationWithActions",0,[0,],"actions",0,[],"performsFirstActionWithFullSwipe",0,[],"init",0,[],],
UISwipeGestureRecognizer:["deinit",0,[],"numberOfTouchesRequired",0,[],"direction",0,[],"initTargetOptionalActionOptional",0,[1,1,],"init",0,[],"Direction",0,[],],
UISwitch:["deinit",0,[],"onTintColor",1,[],"tintColor",1,[],"thumbTintColor",1,[],"onImage",1,[],"offImage",1,[],"isOn",0,[],"on",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"setOnAnimated",0,[0,0,],"init",0,[],],
UITabBar:["deinit",0,[],"delegate",0,[],"items",1,[],"selectedItem",0,[],"setItemsAnimated",0,[1,0,],"beginCustomizingItems",0,[0,],"endCustomizingAnimated",0,[0,],"endCustomizingAnimated",0,[0,],"isCustomizing",0,[],"customizing",0,[],"tintColor",1,[],"barTintColor",1,[],"unselectedItemTintColor",1,[],"selectedImageTintColor",1,[],"backgroundImage",1,[],"selectionIndicatorImage",1,[],"shadowImage",1,[],"itemPositioning",0,[],"itemWidth",0,[],"itemSpacing",0,[],"barStyle",0,[],"isTranslucent",0,[],"translucent",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"ItemPositioning",0,[],"isSpringLoaded",0,[],],
UITabBarController:["deinit",0,[],"viewControllers",1,[],"setViewControllersAnimated",0,[1,0,],"selectedViewController",0,[],"selectedIndex",0,[],"moreNavigationController",0,[],"customizableViewControllers",1,[],"tabBar",0,[],"delegate",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],"tabBarDidSelect",0,[0,0,],"tabBarWillBeginCustomizing",0,[0,0,],"tabBarDidBeginCustomizing",0,[0,0,],"tabBarWillEndCustomizingChanged",0,[0,0,0,],"tabBarDidEndCustomizingChanged",0,[0,0,0,],],
UITabBarControllerDelegate:["tabBarControllerShouldSelect",0,[0,0,],"tabBarControllerShouldSelectViewController",0,[0,0,],"tabBarControllerDidSelect",0,[0,0,],"tabBarControllerDidSelectViewController",0,[0,0,],"tabBarControllerWillBeginCustomizing",0,[0,0,],"tabBarControllerWillBeginCustomizingViewControllers",0,[0,0,],"tabBarControllerWillEndCustomizingChanged",0,[0,0,0,],"tabBarControllerWillEndCustomizingViewControllersChanged",0,[0,0,0,],"tabBarControllerDidEndCustomizingChanged",0,[0,0,0,],"tabBarControllerDidEndCustomizingViewControllersChanged",0,[0,0,0,],"tabBarControllerSupportedInterfaceOrientations",0,[0,],"tabBarControllerPreferredInterfaceOrientationForPresentation",0,[0,],"tabBarControllerInteractionControllerFor",0,[0,0,],"tabBarControllerInteractionControllerForAnimationController",0,[0,0,],"tabBarControllerAnimationControllerForTransitionFromTo",0,[0,0,0,],"tabBarControllerAnimationControllerForTransitionFromViewControllerToViewController",0,[0,0,0,],],
UITabBarDelegate:["tabBarDidSelect",0,[0,0,],"tabBarDidSelectItem",0,[0,0,],"tabBarWillBeginCustomizing",0,[0,0,],"tabBarWillBeginCustomizingItems",0,[0,0,],"tabBarDidBeginCustomizing",0,[0,0,],"tabBarDidBeginCustomizingItems",0,[0,0,],"tabBarWillEndCustomizingChanged",0,[0,0,0,],"tabBarWillEndCustomizingItemsChanged",0,[0,0,0,],"tabBarDidEndCustomizingChanged",0,[0,0,0,],"tabBarDidEndCustomizingItemsChanged",0,[0,0,0,],],
UITabBarItem:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"initTitleOptionalImageOptionalTagInt",0,[1,1,0,],"initTitleOptionalImageOptionalSelectedImageOptional",0,[1,1,1,],"initTabBarSystemItemUITabBarItemSystemItemTagInt",0,[0,0,],"selectedImage",1,[],"badgeValue",1,[],"setFinishedSelectedImageWithFinishedUnselectedImage",0,[1,1,],"finishedSelectedImage",0,[],"finishedUnselectedImage",0,[],"titlePositionAdjustment",0,[],"badgeColor",1,[],"setBadgeTextAttributesFor",0,[1,0,],"setBadgeTextAttributesForState",0,[1,0,],"badgeTextAttributesFor",0,[0,],"badgeTextAttributesForState",0,[0,],"SystemItem",0,[],"isSpringLoaded",0,[],],
UITableView:["deinit",0,[],"initFrameCGRectStyleUITableViewStyle",0,[0,0,],"initCoderNSCoder",0,[0,],"style",0,[],"dataSource",0,[],"delegate",0,[],"prefetchDataSource",0,[],"dragDelegate",0,[],"dropDelegate",0,[],"rowHeight",0,[],"sectionHeaderHeight",0,[],"sectionFooterHeight",0,[],"estimatedRowHeight",0,[],"estimatedSectionHeaderHeight",0,[],"estimatedSectionFooterHeight",0,[],"separatorInset",0,[],"separatorInsetReference",0,[],"backgroundView",1,[],"numberOfSections",0,[],"numberOfRowsInSection",0,[0,],"numberOfRowsInSection",0,[0,],"rectForSection",0,[0,],"rectForSection",0,[0,],"rectForHeaderInSection",0,[0,],"rectForHeaderInSection",0,[0,],"rectForFooterInSection",0,[0,],"rectForFooterInSection",0,[0,],"rectForRowAt",0,[0,],"rectForRowAtIndexPath",0,[0,],"indexPathForRowAt",0,[0,],"indexPathForRowAtPoint",0,[0,],"indexPathFor",0,[0,],"indexPathForCell",0,[0,],"indexPathsForRowsIn",0,[0,],"indexPathsForRowsInRect",0,[0,],"cellForRowAt",0,[0,],"cellForRowAtIndexPath",0,[0,],"visibleCells",0,[],"indexPathsForVisibleRows",1,[],"headerViewForSection",0,[0,],"headerViewForSection",0,[0,],"footerViewForSection",0,[0,],"footerViewForSection",0,[0,],"scrollToRowAtAtAnimated",0,[0,0,0,],"scrollToRowAtIndexPathAtScrollPositionAnimated",0,[0,0,0,],"scrollToNearestSelectedRowAtAnimated",0,[0,0,],"scrollToNearestSelectedRowAtScrollPositionAnimated",0,[0,0,],"performBatchUpdatesCompletion",0,[1,1,],"beginUpdates",0,[],"endUpdates",0,[],"insertSectionsWith",0,[0,0,],"insertSectionsWithRowAnimation",0,[0,0,],"deleteSectionsWith",0,[0,0,],"deleteSectionsWithRowAnimation",0,[0,0,],"reloadSectionsWith",0,[0,0,],"reloadSectionsWithRowAnimation",0,[0,0,],"moveSectionToSection",0,[0,0,],"insertRowsAtWith",0,[0,0,],"insertRowsAtIndexPathsWithRowAnimation",0,[0,0,],"deleteRowsAtWith",0,[0,0,],"deleteRowsAtIndexPathsWithRowAnimation",0,[0,0,],"reloadRowsAtWith",0,[0,0,],"reloadRowsAtIndexPathsWithRowAnimation",0,[0,0,],"moveRowAtTo",0,[0,0,],"moveRowAtIndexPathToIndexPath",0,[0,0,],"hasUncommittedUpdates",0,[],"reloadData",0,[],"reloadSectionIndexTitles",0,[],"isEditing",0,[],"editing",0,[],"setEditingAnimated",0,[0,0,],"allowsSelection",0,[],"allowsSelectionDuringEditing",0,[],"allowsMultipleSelection",0,[],"allowsMultipleSelectionDuringEditing",0,[],"indexPathForSelectedRow",1,[],"indexPathsForSelectedRows",1,[],"selectRowAtAnimatedScrollPosition",0,[1,0,0,],"selectRowAtIndexPathAnimatedScrollPosition",0,[1,0,0,],"deselectRowAtAnimated",0,[0,0,],"deselectRowAtIndexPathAnimated",0,[0,0,],"sectionIndexMinimumDisplayRowCount",0,[],"sectionIndexColor",1,[],"sectionIndexBackgroundColor",1,[],"sectionIndexTrackingBackgroundColor",1,[],"separatorStyle",0,[],"separatorColor",1,[],"separatorEffect",1,[],"cellLayoutMarginsFollowReadableWidth",0,[],"insetsContentViewsToSafeArea",0,[],"tableHeaderView",1,[],"tableFooterView",1,[],"dequeueReusableCellWithIdentifier",0,[0,],"dequeueReusableCellWithIdentifier",0,[0,],"dequeueReusableCellWithIdentifierFor",0,[0,0,],"dequeueReusableCellWithIdentifierForIndexPath",0,[0,0,],"dequeueReusableHeaderFooterViewWithIdentifier",0,[0,],"dequeueReusableHeaderFooterViewWithIdentifier",0,[0,],"registerForCellReuseIdentifier",0,[1,0,],"registerNibForCellReuseIdentifier",0,[1,0,],"registerForCellReuseIdentifier",0,[1,0,],"registerClassForCellReuseIdentifier",0,[1,0,],"registerForHeaderFooterViewReuseIdentifier",0,[1,0,],"registerNibForHeaderFooterViewReuseIdentifier",0,[1,0,],"registerForHeaderFooterViewReuseIdentifier",0,[1,0,],"registerClassForHeaderFooterViewReuseIdentifier",0,[1,0,],"remembersLastFocusedIndexPath",0,[],"dragInteractionEnabled",0,[],"hasActiveDrag",0,[],"hasActiveDrop",0,[],"initFrameCGRect",0,[0,],"init",0,[],"presentationSectionIndexForDataSourceSectionIndex",0,[0,],"dataSourceSectionIndexForPresentationSectionIndex",0,[0,],"presentationIndexPathForDataSourceIndexPath",0,[1,],"dataSourceIndexPathForPresentationIndexPath",0,[1,],"performUsingPresentationValues",0,[0,],"Style",0,[],"ScrollPosition",0,[],"RowAnimation",0,[],"indexSearch",0,[],"automaticDimension",0,[],"selectionDidChangeNotification",0,[],"SeparatorInsetReference",0,[],"isSpringLoaded",0,[],],
UITableViewCell:["deinit",0,[],"initStyleUITableViewCellCellStyleReuseIdentifierOptional",0,[0,1,],"initCoderNSCoder",0,[0,],"imageView",1,[],"textLabel",1,[],"detailTextLabel",1,[],"contentView",0,[],"backgroundView",1,[],"selectedBackgroundView",1,[],"multipleSelectionBackgroundView",1,[],"reuseIdentifier",1,[],"prepareForReuse",0,[],"selectionStyle",0,[],"isSelected",0,[],"selected",0,[],"isHighlighted",0,[],"highlighted",0,[],"setSelectedAnimated",0,[0,0,],"setHighlightedAnimated",0,[0,0,],"editingStyle",0,[],"showsReorderControl",0,[],"shouldIndentWhileEditing",0,[],"accessoryType",0,[],"accessoryView",1,[],"editingAccessoryType",0,[],"editingAccessoryView",1,[],"indentationLevel",0,[],"indentationWidth",0,[],"separatorInset",0,[],"isEditing",0,[],"editing",0,[],"setEditingAnimated",0,[0,0,],"showingDeleteConfirmation",0,[],"focusStyle",0,[],"willTransitionTo",0,[0,],"willTransitionToState",0,[0,],"didTransitionTo",0,[0,],"didTransitionToState",0,[0,],"dragStateDidChange",0,[0,],"userInteractionEnabledWhileDragging",0,[],"initFrameCGRect",0,[0,],"init",0,[],"gestureRecognizerShouldBegin",0,[0,],"gestureRecognizerShouldRecognizeSimultaneouslyWith",0,[0,0,],"gestureRecognizerShouldRequireFailureOf",0,[0,0,],"gestureRecognizerShouldBeRequiredToFailBy",0,[0,0,],"gestureRecognizerShouldReceive",0,[0,0,],"gestureRecognizerShouldReceive",0,[0,0,],"CellStyle",0,[],"SeparatorStyle",0,[],"SelectionStyle",0,[],"FocusStyle",0,[],"EditingStyle",0,[],"AccessoryType",0,[],"StateMask",0,[],"DragState",0,[],"initFrameCGRectReuseIdentifierOptional",0,[0,1,],"text",1,[],"font",1,[],"textAlignment",0,[],"lineBreakMode",0,[],"textColor",1,[],"selectedTextColor",1,[],"_image",1,[],"selectedImage",1,[],"hidesAccessoryWhenEditing",0,[],"target",0,[],"editAction",1,[],"accessoryAction",1,[],],
UITableViewController:["deinit",0,[],"initStyleUITableViewStyle",0,[0,],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"tableView",1,[],"clearsSelectionOnViewWillAppear",0,[],"refreshControl",1,[],"init",0,[],"tableViewWillDisplayForRowAt",0,[0,0,0,],"tableViewWillDisplayHeaderViewForSection",0,[0,0,0,],"tableViewWillDisplayFooterViewForSection",0,[0,0,0,],"tableViewDidEndDisplayingForRowAt",0,[0,0,0,],"tableViewDidEndDisplayingHeaderViewForSection",0,[0,0,0,],"tableViewDidEndDisplayingFooterViewForSection",0,[0,0,0,],"tableViewHeightForRowAt",0,[0,0,],"tableViewHeightForHeaderInSection",0,[0,0,],"tableViewHeightForFooterInSection",0,[0,0,],"tableViewEstimatedHeightForRowAt",0,[0,0,],"tableViewEstimatedHeightForHeaderInSection",0,[0,0,],"tableViewEstimatedHeightForFooterInSection",0,[0,0,],"tableViewViewForHeaderInSection",0,[0,0,],"tableViewViewForFooterInSection",0,[0,0,],"tableViewAccessoryTypeForRowWith",0,[0,0,],"tableViewAccessoryButtonTappedForRowWith",0,[0,0,],"tableViewShouldHighlightRowAt",0,[0,0,],"tableViewDidHighlightRowAt",0,[0,0,],"tableViewDidUnhighlightRowAt",0,[0,0,],"tableViewWillSelectRowAt",0,[0,0,],"tableViewWillDeselectRowAt",0,[0,0,],"tableViewDidSelectRowAt",0,[0,0,],"tableViewDidDeselectRowAt",0,[0,0,],"tableViewEditingStyleForRowAt",0,[0,0,],"tableViewTitleForDeleteConfirmationButtonForRowAt",0,[0,0,],"tableViewEditActionsForRowAt",0,[0,0,],"tableViewLeadingSwipeActionsConfigurationForRowAt",0,[0,0,],"tableViewTrailingSwipeActionsConfigurationForRowAt",0,[0,0,],"tableViewShouldIndentWhileEditingRowAt",0,[0,0,],"tableViewWillBeginEditingRowAt",0,[0,0,],"tableViewDidEndEditingRowAt",0,[0,1,],"tableViewTargetIndexPathForMoveFromRowAtToProposedIndexPath",0,[0,0,0,],"tableViewIndentationLevelForRowAt",0,[0,0,],"tableViewShouldShowMenuForRowAt",0,[0,0,],"tableViewCanPerformActionForRowAtWithSender",0,[0,0,0,1,],"tableViewPerformActionForRowAtWithSender",0,[0,0,0,1,],"tableViewCanFocusRowAt",0,[0,0,],"tableViewShouldUpdateFocusIn",0,[0,0,],"tableViewDidUpdateFocusInWith",0,[0,0,0,],"indexPathForPreferredFocusedViewIn",0,[0,],"tableViewShouldSpringLoadRowAtWith",0,[0,0,0,],"scrollViewDidScroll",0,[0,],"scrollViewDidZoom",0,[0,],"scrollViewWillBeginDragging",0,[0,],"scrollViewWillEndDraggingWithVelocityTargetContentOffset",0,[0,0,0,],"scrollViewDidEndDraggingWillDecelerate",0,[0,0,],"scrollViewWillBeginDecelerating",0,[0,],"scrollViewDidEndDecelerating",0,[0,],"scrollViewDidEndScrollingAnimation",0,[0,],"viewForZoomingIn",0,[0,],"scrollViewWillBeginZoomingWith",0,[0,1,],"scrollViewDidEndZoomingWithAtScale",0,[0,1,0,],"scrollViewShouldScrollToTop",0,[0,],"scrollViewDidScrollToTop",0,[0,],"scrollViewDidChangeAdjustedContentInset",0,[0,],"tableViewNumberOfRowsInSection",0,[0,0,],"tableViewCellForRowAt",0,[0,0,],"numberOfSectionsIn",0,[0,],"tableViewTitleForHeaderInSection",0,[0,0,],"tableViewTitleForFooterInSection",0,[0,0,],"tableViewCanEditRowAt",0,[0,0,],"tableViewCanMoveRowAt",0,[0,0,],"sectionIndexTitlesFor",0,[0,],"tableViewSectionForSectionIndexTitleAt",0,[0,0,0,],"tableViewCommitForRowAt",0,[0,0,0,],"tableViewMoveRowAtTo",0,[0,0,0,],],
UITableViewDataSource:["tableViewNumberOfRowsInSection",0,[0,0,],"tableViewCellForRowAt",0,[0,0,],"tableViewCellForRowAtIndexPath",0,[0,0,],"numberOfSectionsIn",0,[0,],"numberOfSectionsInTableView",0,[0,],"tableViewTitleForHeaderInSection",0,[0,0,],"tableViewTitleForFooterInSection",0,[0,0,],"tableViewCanEditRowAt",0,[0,0,],"tableViewCanEditRowAtIndexPath",0,[0,0,],"tableViewCanMoveRowAt",0,[0,0,],"tableViewCanMoveRowAtIndexPath",0,[0,0,],"sectionIndexTitlesFor",0,[0,],"sectionIndexTitlesForTableView",0,[0,],"tableViewSectionForSectionIndexTitleAt",0,[0,0,0,],"tableViewSectionForSectionIndexTitleAtIndex",0,[0,0,0,],"tableViewCommitForRowAt",0,[0,0,0,],"tableViewCommitEditingStyleForRowAtIndexPath",0,[0,0,0,],"tableViewMoveRowAtTo",0,[0,0,0,],"tableViewMoveRowAtIndexPathToIndexPath",0,[0,0,0,],],
UITableViewDataSourcePrefetching:["tableViewPrefetchRowsAt",0,[0,0,],"tableViewPrefetchRowsAtIndexPaths",0,[0,0,],"tableViewCancelPrefetchingForRowsAt",0,[0,0,],"tableViewCancelPrefetchingForRowsAtIndexPaths",0,[0,0,],],
UITableViewDelegate:["tableViewWillDisplayForRowAt",0,[0,0,0,],"tableViewWillDisplayCellForRowAtIndexPath",0,[0,0,0,],"tableViewWillDisplayHeaderViewForSection",0,[0,0,0,],"tableViewWillDisplayFooterViewForSection",0,[0,0,0,],"tableViewDidEndDisplayingForRowAt",0,[0,0,0,],"tableViewDidEndDisplayingCellForRowAtIndexPath",0,[0,0,0,],"tableViewDidEndDisplayingHeaderViewForSection",0,[0,0,0,],"tableViewDidEndDisplayingFooterViewForSection",0,[0,0,0,],"tableViewHeightForRowAt",0,[0,0,],"tableViewHeightForRowAtIndexPath",0,[0,0,],"tableViewHeightForHeaderInSection",0,[0,0,],"tableViewHeightForFooterInSection",0,[0,0,],"tableViewEstimatedHeightForRowAt",0,[0,0,],"tableViewEstimatedHeightForRowAtIndexPath",0,[0,0,],"tableViewEstimatedHeightForHeaderInSection",0,[0,0,],"tableViewEstimatedHeightForFooterInSection",0,[0,0,],"tableViewViewForHeaderInSection",0,[0,0,],"tableViewViewForFooterInSection",0,[0,0,],"tableViewAccessoryTypeForRowWith",0,[0,0,],"tableViewAccessoryTypeForRowWithIndexPath",0,[0,0,],"tableViewAccessoryButtonTappedForRowWith",0,[0,0,],"tableViewAccessoryButtonTappedForRowWithIndexPath",0,[0,0,],"tableViewShouldHighlightRowAt",0,[0,0,],"tableViewShouldHighlightRowAtIndexPath",0,[0,0,],"tableViewDidHighlightRowAt",0,[0,0,],"tableViewDidHighlightRowAtIndexPath",0,[0,0,],"tableViewDidUnhighlightRowAt",0,[0,0,],"tableViewDidUnhighlightRowAtIndexPath",0,[0,0,],"tableViewWillSelectRowAt",0,[0,0,],"tableViewWillSelectRowAtIndexPath",0,[0,0,],"tableViewWillDeselectRowAt",0,[0,0,],"tableViewWillDeselectRowAtIndexPath",0,[0,0,],"tableViewDidSelectRowAt",0,[0,0,],"tableViewDidSelectRowAtIndexPath",0,[0,0,],"tableViewDidDeselectRowAt",0,[0,0,],"tableViewDidDeselectRowAtIndexPath",0,[0,0,],"tableViewEditingStyleForRowAt",0,[0,0,],"tableViewEditingStyleForRowAtIndexPath",0,[0,0,],"tableViewTitleForDeleteConfirmationButtonForRowAt",0,[0,0,],"tableViewTitleForDeleteConfirmationButtonForRowAtIndexPath",0,[0,0,],"tableViewEditActionsForRowAt",0,[0,0,],"tableViewEditActionsForRowAtIndexPath",0,[0,0,],"tableViewLeadingSwipeActionsConfigurationForRowAt",0,[0,0,],"tableViewLeadingSwipeActionsConfigurationForRowAtIndexPath",0,[0,0,],"tableViewTrailingSwipeActionsConfigurationForRowAt",0,[0,0,],"tableViewTrailingSwipeActionsConfigurationForRowAtIndexPath",0,[0,0,],"tableViewShouldIndentWhileEditingRowAt",0,[0,0,],"tableViewShouldIndentWhileEditingRowAtIndexPath",0,[0,0,],"tableViewWillBeginEditingRowAt",0,[0,0,],"tableViewWillBeginEditingRowAtIndexPath",0,[0,0,],"tableViewDidEndEditingRowAt",0,[0,1,],"tableViewDidEndEditingRowAtIndexPath",0,[0,1,],"tableViewTargetIndexPathForMoveFromRowAtToProposedIndexPath",0,[0,0,0,],"tableViewTargetIndexPathForMoveFromRowAtIndexPathToProposedIndexPath",0,[0,0,0,],"tableViewIndentationLevelForRowAt",0,[0,0,],"tableViewIndentationLevelForRowAtIndexPath",0,[0,0,],"tableViewShouldShowMenuForRowAt",0,[0,0,],"tableViewShouldShowMenuForRowAtIndexPath",0,[0,0,],"tableViewCanPerformActionForRowAtWithSender",0,[0,0,0,1,],"tableViewCanPerformActionForRowAtIndexPathWithSender",0,[0,0,0,1,],"tableViewPerformActionForRowAtWithSender",0,[0,0,0,1,],"tableViewPerformActionForRowAtIndexPathWithSender",0,[0,0,0,1,],"tableViewCanFocusRowAt",0,[0,0,],"tableViewCanFocusRowAtIndexPath",0,[0,0,],"tableViewShouldUpdateFocusIn",0,[0,0,],"tableViewShouldUpdateFocusInContext",0,[0,0,],"tableViewDidUpdateFocusInWith",0,[0,0,0,],"tableViewDidUpdateFocusInContextWithAnimationCoordinator",0,[0,0,0,],"indexPathForPreferredFocusedViewIn",0,[0,],"indexPathForPreferredFocusedViewInTableView",0,[0,],"tableViewShouldSpringLoadRowAtWith",0,[0,0,0,],"tableViewShouldSpringLoadRowAtIndexPathWithContext",0,[0,0,0,],],
UITableViewDragDelegate:["tableViewItemsForBeginningAt",0,[0,0,0,],"tableViewItemsForBeginningDragSessionAtIndexPath",0,[0,0,0,],"tableViewItemsForAddingToAtPoint",0,[0,0,0,0,],"tableViewItemsForAddingToDragSessionAtIndexPathPoint",0,[0,0,0,0,],"tableViewDragPreviewParametersForRowAt",0,[0,0,],"tableViewDragPreviewParametersForRowAtIndexPath",0,[0,0,],"tableViewDragSessionWillBegin",0,[0,0,],"tableViewDragSessionDidEnd",0,[0,0,],"tableViewDragSessionAllowsMoveOperation",0,[0,0,],"tableViewDragSessionIsRestrictedToDraggingApplication",0,[0,0,],],
UITableViewDropCoordinator:["items",0,[],"destinationIndexPath",1,[],"proposal",0,[],"session",0,[],"dropTo",0,[0,0,],"dropItemToPlaceholder",0,[0,0,],"dropToRowAt",0,[0,0,],"dropItemToRowAtIndexPath",0,[0,0,],"dropIntoRowAtRect",0,[0,0,0,],"dropItemIntoRowAtIndexPathRect",0,[0,0,0,],"dropTo",0,[0,0,],"dropItemToTarget",0,[0,0,],],
UITableViewDropDelegate:["tableViewPerformDropWith",0,[0,0,],"tableViewPerformDropWithCoordinator",0,[0,0,],"tableViewCanHandle",0,[0,0,],"tableViewCanHandleDropSession",0,[0,0,],"tableViewDropSessionDidEnter",0,[0,0,],"tableViewDropSessionDidUpdateWithDestinationIndexPath",0,[0,0,1,],"tableViewDropSessionDidExit",0,[0,0,],"tableViewDropSessionDidEnd",0,[0,0,],"tableViewDropPreviewParametersForRowAt",0,[0,0,],"tableViewDropPreviewParametersForRowAtIndexPath",0,[0,0,],],
UITableViewDropItem:["dragItem",0,[],"sourceIndexPath",1,[],"previewSize",0,[],],
UITableViewDropPlaceholder:["deinit",0,[],"previewParametersProvider",1,[],"initInsertionIndexPathIndexPathReuseIdentifierStringRowHeightCGFloat",0,[0,0,0,],"init",0,[],],
UITableViewDropPlaceholderContext:["dragItem",0,[],"commitInsertionDataSourceUpdates",0,[0,],"commitInsertionWithDataSourceUpdates",0,[0,],"deletePlaceholder",0,[],],
UITableViewDropProposal:["deinit",0,[],"initOperationUIDropOperationIntentUITableViewDropProposalIntent",0,[0,0,],"initDropOperationUIDropOperationIntentUITableViewDropProposalIntent",0,[0,0,],"intent",0,[],"initOperationUIDropOperation",0,[0,],"init",0,[],"Intent",0,[],],
UITableViewFocusUpdateContext:["deinit",0,[],"previouslyFocusedIndexPath",1,[],"nextFocusedIndexPath",1,[],"init",0,[],],
UITableViewHeaderFooterView:["deinit",0,[],"initReuseIdentifierOptional",0,[1,],"initCoderNSCoder",0,[0,],"textLabel",1,[],"detailTextLabel",1,[],"contentView",0,[],"backgroundView",1,[],"reuseIdentifier",1,[],"prepareForReuse",0,[],"initFrameCGRect",0,[0,],"init",0,[],],
UITableViewPlaceholder:["deinit",0,[],"initInsertionIndexPathIndexPathReuseIdentifierStringRowHeightCGFloat",0,[0,0,0,],"init",0,[],"_new",0,[],"cellUpdateHandler",1,[],],
UITableViewRowAction:["deinit",0,[],"initStyleUITableViewRowActionStyleTitleOptionalHandlerfunction_type",0,[0,1,0,],"rowActionWithStyleTitleHandler",0,[0,1,0,],"style",0,[],"title",1,[],"backgroundColor",1,[],"backgroundEffect",1,[],"init",0,[],"copyWith",0,[1,],"Style",0,[],],
UITapGestureRecognizer:["deinit",0,[],"numberOfTapsRequired",0,[],"numberOfTouchesRequired",0,[],"initTargetOptionalActionOptional",0,[1,1,],"init",0,[],],
UITargetedDragPreview:["deinit",0,[],"initViewUIViewParametersUIDragPreviewParametersTargetUIDragPreviewTarget",0,[0,0,0,],"initViewUIViewParametersUIDragPreviewParameters",0,[0,0,],"initViewUIView",0,[0,],"init",0,[],"_new",0,[],"target",0,[],"view",0,[],"parameters",0,[],"size",0,[],"retargetedPreviewWith",0,[0,],"retargetedPreviewWithTarget",0,[0,],"copyWith",0,[1,],"initForURLTargetUIDragPreviewTarget",0,[0,0,],"initForURLURLTargetUIDragPreviewTarget",0,[0,0,],"previewForURLTarget",0,[0,0,],"initForURLTitleOptionalTargetUIDragPreviewTarget",0,[0,1,0,],"initForURLURLTitleOptionalTargetUIDragPreviewTarget",0,[0,1,0,],"previewForURLTitleTarget",0,[0,1,0,],],
UITextAlignment:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"left",0,[],"Left",0,[],"_",0,[],"center",0,[],"Center",0,[],"_",0,[],"right",0,[],"Right",0,[],"_",0,[],],
UITextAutocapitalizationType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"none",0,[],"None",0,[],"_",0,[],"words",0,[],"Words",0,[],"_",0,[],"sentences",0,[],"Sentences",0,[],"_",0,[],"allCharacters",0,[],"AllCharacters",0,[],"_",0,[],],
UITextAutocorrectionType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"no",0,[],"No",0,[],"_",0,[],"yes",0,[],"Yes",0,[],"_",0,[],],
UITextChecker:["deinit",0,[],"rangeOfMisspelledWordInRangeStartingAtWrapLanguage",0,[0,0,0,0,0,],"rangeOfMisspelledWordInStringRangeStartingAtWrapLanguage",0,[0,0,0,0,0,],"guessesForWordRangeInLanguage",0,[0,0,0,],"guessesForWordRangeInStringLanguage",0,[0,0,0,],"completionsForPartialWordRangeInLanguage",0,[0,0,0,],"completionsForPartialWordRangeInStringLanguage",0,[0,0,0,],"ignoreWord",0,[0,],"ignoredWords",1,[],"learnWord",0,[0,],"hasLearnedWord",0,[0,],"unlearnWord",0,[0,],"availableLanguages",0,[],"init",0,[],],
UITextContentType:["initRawValueString",0,[0,],"_rawValue",0,[],"rawValue",0,[],"_",0,[],"RawValue",0,[],"_ObjectiveCType",0,[],"_name",0,[],"namePrefix",0,[],"givenName",0,[],"middleName",0,[],"familyName",0,[],"nameSuffix",0,[],"nickname",0,[],"jobTitle",0,[],"organizationName",0,[],"_location",0,[],"fullStreetAddress",0,[],"streetAddressLine1",0,[],"streetAddressLine2",0,[],"addressCity",0,[],"addressState",0,[],"addressCityAndState",0,[],"sublocality",0,[],"countryName",0,[],"postalCode",0,[],"telephoneNumber",0,[],"emailAddress",0,[],"URL",0,[],"creditCardNumber",0,[],"username",0,[],"_password",0,[],"newPassword",0,[],"oneTimeCode",0,[],],
UITextDirection:["initRawValueInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"storage",0,[0,],"layout",0,[0,],],
UITextDocumentProxy:["documentContextBeforeInput",1,[],"documentContextAfterInput",1,[],"selectedText",1,[],"documentInputMode",1,[],"documentIdentifier",0,[],"adjustTextPositionByCharacterOffset",0,[0,],"adjustTextPositionByCharacterOffset",0,[0,],],
UITextDragDelegate:["textDraggableViewItemsForDrag",0,[0,0,],"textDraggableViewDragPreviewForLiftingItemSession",0,[0,0,0,],"textDraggableViewWillAnimateLiftWithSession",0,[0,0,0,],"textDraggableViewWillAnimateLiftWithAnimatorSession",0,[0,0,0,],"textDraggableViewDragSessionWillBegin",0,[0,0,],"textDraggableViewDragSessionDidEndWith",0,[0,0,0,],"textDraggableViewDragSessionDidEndWithOperation",0,[0,0,0,],],
UITextDragOptions:["initRawValueInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"none",0,[],"_",0,[],"None",0,[],"_",0,[],"stripTextColorFromPreviews",0,[],"_",0,[],"UITextDragOptionStripTextColorFromPreviews",0,[],"_",0,[],],
UITextDragPreviewRenderer:["deinit",0,[],"initLayoutManagerNSLayoutManagerRangeNSRange",0,[0,0,],"initLayoutManagerNSLayoutManagerRangeNSRangeUnifyRectsBool",0,[0,0,0,],"_new",0,[],"init",0,[],"layoutManager",0,[],"_image",0,[],"firstLineRect",0,[],"bodyRect",0,[],"lastLineRect",0,[],"adjustFirstLineRectBodyRectLastLineRectTextOrigin",0,[0,0,0,0,],"adjustFirstLineRectBodyRectLastLineRectTextOrigin",0,[0,0,0,0,],],
UITextDragRequest:["dragRange",0,[],"suggestedItems",0,[],"existingItems",0,[],"isSelected",0,[],"selected",0,[],"dragSession",0,[],],
UITextDraggable:["textDragDelegate",0,[],"textDragInteraction",1,[],"isTextDragActive",0,[],"textDragActive",0,[],"textDragOptions",0,[],],
UITextDropDelegate:["textDroppableViewWillBecomeEditableForDrop",0,[0,0,],"textDroppableViewProposalForDrop",0,[0,0,],"textDroppableViewWillPerformDrop",0,[0,0,],"textDroppableViewPreviewForDroppingAllItemsWithDefault",0,[0,0,],"textDroppableViewDropSessionDidEnter",0,[0,0,],"textDroppableViewDropSessionDidUpdate",0,[0,0,],"textDroppableViewDropSessionDidExit",0,[0,0,],"textDroppableViewDropSessionDidEnd",0,[0,0,],],
UITextDropEditability:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"no",0,[],"No",0,[],"_",0,[],"temporary",0,[],"Temporary",0,[],"_",0,[],"yes",0,[],"Yes",0,[],"_",0,[],],
UITextDropProposal:["deinit",0,[],"dropAction",0,[],"dropProgressMode",0,[],"useFastSameViewOperations",0,[],"dropPerformer",0,[],"initOperationUIDropOperation",0,[0,],"init",0,[],"Action",0,[],"ProgressMode",0,[],"Performer",0,[],],
UITextDropRequest:["dropPosition",0,[],"suggestedProposal",0,[],"isSameView",0,[],"sameView",0,[],"dropSession",0,[],],
UITextDroppable:["textDropDelegate",0,[],"textDropInteraction",1,[],"textDropActive",0,[],],
UITextField:["deinit",0,[],"text",1,[],"attributedText",1,[],"textColor",1,[],"font",1,[],"textAlignment",0,[],"borderStyle",0,[],"defaultTextAttributes",0,[],"placeholder",1,[],"attributedPlaceholder",1,[],"clearsOnBeginEditing",0,[],"adjustsFontSizeToFitWidth",0,[],"minimumFontSize",0,[],"delegate",0,[],"background",1,[],"disabledBackground",1,[],"isEditing",0,[],"editing",0,[],"allowsEditingTextAttributes",0,[],"typingAttributes",1,[],"clearButtonMode",0,[],"leftView",1,[],"leftViewMode",0,[],"rightView",1,[],"rightViewMode",0,[],"borderRectForBounds",0,[0,],"borderRectForBounds",0,[0,],"textRectForBounds",0,[0,],"textRectForBounds",0,[0,],"placeholderRectForBounds",0,[0,],"placeholderRectForBounds",0,[0,],"editingRectForBounds",0,[0,],"editingRectForBounds",0,[0,],"clearButtonRectForBounds",0,[0,],"clearButtonRectForBounds",0,[0,],"leftViewRectForBounds",0,[0,],"leftViewRectForBounds",0,[0,],"rightViewRectForBounds",0,[0,],"rightViewRectForBounds",0,[0,],"drawTextIn",0,[0,],"drawTextInRect",0,[0,],"drawPlaceholderIn",0,[0,],"drawPlaceholderInRect",0,[0,],"inputView",1,[],"inputAccessoryView",1,[],"clearsOnInsertion",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"selectedTextRange",1,[],"markedTextRange",1,[],"markedTextStyle",1,[],"beginningOfDocument",0,[],"endOfDocument",0,[],"inputDelegate",0,[],"tokenizer",0,[],"textInputView",0,[],"selectionAffinity",0,[],"insertDictationResultPlaceholder",0,[],"hasText",0,[],"autocapitalizationType",0,[],"autocorrectionType",0,[],"spellCheckingType",0,[],"smartQuotesType",0,[],"smartDashesType",0,[],"smartInsertDeleteType",0,[],"keyboardType",0,[],"keyboardAppearance",0,[],"returnKeyType",0,[],"enablesReturnKeyAutomatically",0,[],"isSecureTextEntry",0,[],"textContentType",1,[],"passwordRules",1,[],"adjustsFontForContentSizeCategory",0,[],"textIn",0,[0,],"replaceWithText",0,[0,0,],"setMarkedTextSelectedRange",0,[1,0,],"unmarkText",0,[],"textRangeFromTo",0,[0,0,],"positionFromOffset",0,[0,0,],"positionFromInOffset",0,[0,0,0,],"compareTo",0,[0,0,],"offsetFromTo",0,[0,0,],"positionWithinFarthestIn",0,[0,0,],"characterRangeByExtendingIn",0,[0,0,],"baseWritingDirectionForIn",0,[0,0,],"setBaseWritingDirectionFor",0,[0,0,],"firstRectFor",0,[0,],"caretRectFor",0,[0,],"selectionRectsFor",0,[0,],"closestPositionTo",0,[0,],"closestPositionToWithin",0,[0,0,],"characterRangeAt",0,[0,],"shouldChangeTextInReplacementText",0,[0,0,],"textStylingAtIn",0,[0,0,],"positionWithinAtCharacterOffset",0,[0,0,],"characterOffsetOfWithin",0,[0,0,],"insertDictationResult",0,[0,],"dictationRecordingDidEnd",0,[],"dictationRecognitionFailed",0,[],"frameForDictationResultPlaceholder",0,[0,],"removeDictationResultPlaceholderWillInsertResult",0,[0,0,],"beginFloatingCursorAt",0,[0,],"updateFloatingCursorAt",0,[0,],"endFloatingCursor",0,[],"insertText",0,[0,],"deleteBackward",0,[],"textDidBeginEditingNotification",0,[],"textDidEndEditingNotification",0,[],"textDidChangeNotification",0,[],"didEndEditingReasonUserInfoKey",0,[],"BorderStyle",0,[],"ViewMode",0,[],"DidEndEditingReason",0,[],"textDragDelegate",0,[],"textDragInteraction",1,[],"isTextDragActive",0,[],"textDragOptions",0,[],"textDropDelegate",0,[],"textDropInteraction",1,[],"textDropActive",0,[],"pasteDelegate",0,[],],
UITextFieldDelegate:["textFieldShouldBeginEditing",0,[0,],"textFieldDidBeginEditing",0,[0,],"textFieldShouldEndEditing",0,[0,],"textFieldDidEndEditing",0,[0,],"textFieldDidEndEditingReason",0,[0,0,],"textFieldShouldChangeCharactersInReplacementString",0,[0,0,0,],"textFieldShouldChangeCharactersInRangeReplacementString",0,[0,0,0,],"textFieldShouldClear",0,[0,],"textFieldShouldReturn",0,[0,],],
UITextGranularity:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"character",0,[],"Character",0,[],"_",0,[],"word",0,[],"Word",0,[],"_",0,[],"sentence",0,[],"Sentence",0,[],"_",0,[],"paragraph",0,[],"Paragraph",0,[],"_",0,[],"line",0,[],"Line",0,[],"_",0,[],"_document",0,[],"Document",0,[],"_",0,[],],
UITextInput:["textIn",0,[0,],"textInRange",0,[0,],"replaceWithText",0,[0,0,],"replaceRangeWithText",0,[0,0,],"selectedTextRange",1,[],"markedTextRange",1,[],"markedTextStyle",1,[],"setMarkedTextSelectedRange",0,[1,0,],"unmarkText",0,[],"beginningOfDocument",0,[],"endOfDocument",0,[],"textRangeFromTo",0,[0,0,],"textRangeFromPositionToPosition",0,[0,0,],"positionFromOffset",0,[0,0,],"positionFromPositionOffset",0,[0,0,],"positionFromInOffset",0,[0,0,0,],"positionFromPositionInDirectionOffset",0,[0,0,0,],"compareTo",0,[0,0,],"comparePositionToPosition",0,[0,0,],"offsetFromTo",0,[0,0,],"offsetFromPositionToPosition",0,[0,0,],"inputDelegate",0,[],"tokenizer",0,[],"positionWithinFarthestIn",0,[0,0,],"positionWithinRangeFarthestInDirection",0,[0,0,],"characterRangeByExtendingIn",0,[0,0,],"characterRangeByExtendingPositionInDirection",0,[0,0,],"baseWritingDirectionForIn",0,[0,0,],"baseWritingDirectionForPositionInDirection",0,[0,0,],"setBaseWritingDirectionFor",0,[0,0,],"setBaseWritingDirectionForRange",0,[0,0,],"firstRectFor",0,[0,],"firstRectForRange",0,[0,],"caretRectFor",0,[0,],"caretRectForPosition",0,[0,],"selectionRectsFor",0,[0,],"selectionRectsForRange",0,[0,],"closestPositionTo",0,[0,],"closestPositionToPoint",0,[0,],"closestPositionToWithin",0,[0,0,],"closestPositionToPointWithinRange",0,[0,0,],"characterRangeAt",0,[0,],"characterRangeAtPoint",0,[0,],"shouldChangeTextInReplacementText",0,[0,0,],"shouldChangeTextInRangeReplacementText",0,[0,0,],"textStylingAtIn",0,[0,0,],"textStylingAtPositionInDirection",0,[0,0,],"positionWithinAtCharacterOffset",0,[0,0,],"positionWithinRangeAtCharacterOffset",0,[0,0,],"characterOffsetOfWithin",0,[0,0,],"characterOffsetOfPositionWithinRange",0,[0,0,],"textInputView",0,[],"selectionAffinity",0,[],"insertDictationResult",0,[0,],"dictationRecordingDidEnd",0,[],"dictationRecognitionFailed",0,[],"insertDictationResultPlaceholder",0,[],"frameForDictationResultPlaceholder",0,[0,],"frameForDictationResultPlaceholder",0,[0,],"removeDictationResultPlaceholderWillInsertResult",0,[0,0,],"beginFloatingCursorAt",0,[0,],"beginFloatingCursorAtPoint",0,[0,],"updateFloatingCursorAt",0,[0,],"updateFloatingCursorAtPoint",0,[0,],"endFloatingCursor",0,[],],
UITextInputAssistantItem:["deinit",0,[],"allowsHidingShortcuts",0,[],"leadingBarButtonGroups",0,[],"trailingBarButtonGroups",0,[],"init",0,[],],
UITextInputDelegate:["selectionWillChange",0,[1,],"selectionDidChange",0,[1,],"textWillChange",0,[1,],"textDidChange",0,[1,],],
UITextInputMode:["deinit",0,[],"primaryLanguage",1,[],"current",0,[],"currentInputMode",0,[],"activeInputModes",0,[],"init",0,[],"supportsSecureCoding",0,[],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],"currentInputModeDidChangeNotification",0,[],],
UITextInputPasswordRules:["deinit",0,[],"passwordRulesDescriptor",0,[],"init",0,[],"_new",0,[],"initDescriptorString",0,[0,],"passwordRulesWithDescriptor",0,[0,],"supportsSecureCoding",0,[],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],"copyWith",0,[1,],],
UITextInputStringTokenizer:["deinit",0,[],"initTextInputprotocol_composition_type",0,[0,],"init",0,[],"rangeEnclosingPositionWithInDirection",0,[0,0,0,],"isPositionAtBoundaryInDirection",0,[0,0,0,],"positionFromToBoundaryInDirection",0,[0,0,0,],"isPositionWithinTextUnitInDirection",0,[0,0,0,],],
UITextInputTokenizer:["rangeEnclosingPositionWithInDirection",0,[0,0,0,],"rangeEnclosingPositionWithGranularityInDirection",0,[0,0,0,],"isPositionAtBoundaryInDirection",0,[0,0,0,],"positionFromToBoundaryInDirection",0,[0,0,0,],"positionFromPositionToBoundaryInDirection",0,[0,0,0,],"isPositionWithinTextUnitInDirection",0,[0,0,0,],],
UITextInputTraits:["autocapitalizationType",0,[],"autocorrectionType",0,[],"spellCheckingType",0,[],"smartQuotesType",0,[],"smartDashesType",0,[],"smartInsertDeleteType",0,[],"keyboardType",0,[],"keyboardAppearance",0,[],"returnKeyType",0,[],"enablesReturnKeyAutomatically",0,[],"isSecureTextEntry",0,[],"secureTextEntry",0,[],"textContentType",1,[],"passwordRules",1,[],],
UITextItemInteraction:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"invokeDefaultAction",0,[],"InvokeDefaultAction",0,[],"_",0,[],"presentActions",0,[],"PresentActions",0,[],"_",0,[],"preview",0,[],"Preview",0,[],"_",0,[],],
UITextLayoutDirection:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"right",0,[],"Right",0,[],"_",0,[],"left",0,[],"Left",0,[],"_",0,[],"up",0,[],"Up",0,[],"_",0,[],"down",0,[],"Down",0,[],"_",0,[],],
UITextPasteConfigurationSupporting:["pasteDelegate",0,[],],
UITextPasteDelegate:["textPasteConfigurationSupportingTransform",0,[0,0,],"textPasteConfigurationSupportingTransformPasteItem",0,[0,0,],"textPasteConfigurationSupportingCombineItemAttributedStringsFor",0,[0,0,0,],"textPasteConfigurationSupportingCombineItemAttributedStringsForRange",0,[0,0,0,],"textPasteConfigurationSupportingPerformPasteOfTo",0,[0,0,0,],"textPasteConfigurationSupportingPerformPasteOfAttributedStringToRange",0,[0,0,0,],"textPasteConfigurationSupportingShouldAnimatePasteOfTo",0,[0,0,0,],"textPasteConfigurationSupportingShouldAnimatePasteOfAttributedStringToRange",0,[0,0,0,],],
UITextPasteItem:["itemProvider",0,[],"localObject",1,[],"defaultAttributes",0,[],"setResultString",0,[0,],"setStringResult",0,[0,],"setResultAttributedString",0,[0,],"setAttributedStringResult",0,[0,],"setResultAttachment",0,[0,],"setAttachmentResult",0,[0,],"setNoResult",0,[],"setDefaultResult",0,[],],
UITextPosition:["deinit",0,[],"init",0,[],],
UITextRange:["deinit",0,[],"isEmpty",0,[],"empty",0,[],"start",0,[],"end",0,[],"init",0,[],],
UITextSelectionRect:["deinit",0,[],"rect",0,[],"writingDirection",0,[],"containsStart",0,[],"containsEnd",0,[],"isVertical",0,[],"init",0,[],],
UITextSmartDashesType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"no",0,[],"No",0,[],"_",0,[],"yes",0,[],"Yes",0,[],"_",0,[],],
UITextSmartInsertDeleteType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"no",0,[],"No",0,[],"_",0,[],"yes",0,[],"Yes",0,[],"_",0,[],],
UITextSmartQuotesType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"no",0,[],"No",0,[],"_",0,[],"yes",0,[],"Yes",0,[],"_",0,[],],
UITextSpellCheckingType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"no",0,[],"No",0,[],"_",0,[],"yes",0,[],"Yes",0,[],"_",0,[],],
UITextStorageDirection:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"forward",0,[],"Forward",0,[],"_",0,[],"backward",0,[],"Backward",0,[],"_",0,[],],
UITextView:["deinit",0,[],"delegate",0,[],"text",1,[],"font",1,[],"textColor",1,[],"textAlignment",0,[],"selectedRange",0,[],"isEditable",0,[],"editable",0,[],"isSelectable",0,[],"selectable",0,[],"dataDetectorTypes",0,[],"allowsEditingTextAttributes",0,[],"attributedText",1,[],"typingAttributes",0,[],"scrollRangeToVisible",0,[0,],"inputView",1,[],"inputAccessoryView",1,[],"clearsOnInsertion",0,[],"initFrameCGRectTextContainerOptional",0,[0,1,],"initCoderNSCoder",0,[0,],"textContainer",0,[],"textContainerInset",0,[],"layoutManager",0,[],"textStorage",0,[],"linkTextAttributes",1,[],"initFrameCGRect",0,[0,],"init",0,[],"selectedTextRange",1,[],"markedTextRange",1,[],"markedTextStyle",1,[],"beginningOfDocument",0,[],"endOfDocument",0,[],"inputDelegate",0,[],"tokenizer",0,[],"textInputView",0,[],"selectionAffinity",0,[],"insertDictationResultPlaceholder",0,[],"hasText",0,[],"autocapitalizationType",0,[],"autocorrectionType",0,[],"spellCheckingType",0,[],"smartQuotesType",0,[],"smartDashesType",0,[],"smartInsertDeleteType",0,[],"keyboardType",0,[],"keyboardAppearance",0,[],"returnKeyType",0,[],"enablesReturnKeyAutomatically",0,[],"isSecureTextEntry",0,[],"textContentType",1,[],"passwordRules",1,[],"adjustsFontForContentSizeCategory",0,[],"textIn",0,[0,],"replaceWithText",0,[0,0,],"setMarkedTextSelectedRange",0,[1,0,],"unmarkText",0,[],"textRangeFromTo",0,[0,0,],"positionFromOffset",0,[0,0,],"positionFromInOffset",0,[0,0,0,],"compareTo",0,[0,0,],"offsetFromTo",0,[0,0,],"positionWithinFarthestIn",0,[0,0,],"characterRangeByExtendingIn",0,[0,0,],"baseWritingDirectionForIn",0,[0,0,],"setBaseWritingDirectionFor",0,[0,0,],"firstRectFor",0,[0,],"caretRectFor",0,[0,],"selectionRectsFor",0,[0,],"closestPositionTo",0,[0,],"closestPositionToWithin",0,[0,0,],"characterRangeAt",0,[0,],"shouldChangeTextInReplacementText",0,[0,0,],"textStylingAtIn",0,[0,0,],"positionWithinAtCharacterOffset",0,[0,0,],"characterOffsetOfWithin",0,[0,0,],"insertDictationResult",0,[0,],"dictationRecordingDidEnd",0,[],"dictationRecognitionFailed",0,[],"frameForDictationResultPlaceholder",0,[0,],"removeDictationResultPlaceholderWillInsertResult",0,[0,0,],"beginFloatingCursorAt",0,[0,],"updateFloatingCursorAt",0,[0,],"endFloatingCursor",0,[],"insertText",0,[0,],"deleteBackward",0,[],"textDidBeginEditingNotification",0,[],"textDidChangeNotification",0,[],"textDidEndEditingNotification",0,[],"textDragDelegate",0,[],"textDragInteraction",1,[],"isTextDragActive",0,[],"textDragOptions",0,[],"textDropDelegate",0,[],"textDropInteraction",1,[],"textDropActive",0,[],"pasteDelegate",0,[],],
UITextViewDelegate:["textViewShouldBeginEditing",0,[0,],"textViewShouldEndEditing",0,[0,],"textViewDidBeginEditing",0,[0,],"textViewDidEndEditing",0,[0,],"textViewShouldChangeTextInReplacementText",0,[0,0,0,],"textViewShouldChangeTextInRangeReplacementText",0,[0,0,0,],"textViewDidChange",0,[0,],"textViewDidChangeSelection",0,[0,],"textViewShouldInteractWithInInteraction",0,[0,0,0,0,],"textViewShouldInteractWithURLInRangeInteraction",0,[0,0,0,0,],"textViewShouldInteractWithInInteraction",0,[0,0,0,0,],"textViewShouldInteractWithTextAttachmentInRangeInteraction",0,[0,0,0,0,],"textViewShouldInteractWithIn",0,[0,0,0,],"textViewShouldInteractWithURLInRange",0,[0,0,0,],"textViewShouldInteractWithIn",0,[0,0,0,],"textViewShouldInteractWithTextAttachmentInRange",0,[0,0,0,],],
UITextWritingDirection:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"natural",0,[],"Natural",0,[],"_",0,[],"leftToRight",0,[],"LeftToRight",0,[],"_",0,[],"rightToLeft",0,[],"RightToLeft",0,[],"_",0,[],],
UITimingCurveProvider:["timingCurveType",0,[],"cubicTimingParameters",1,[],"springTimingParameters",1,[],],
UITimingCurveType:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"builtin",0,[],"Builtin",0,[],"_",0,[],"cubic",0,[],"Cubic",0,[],"_",0,[],"spring",0,[],"Spring",0,[],"_",0,[],"composed",0,[],"Composed",0,[],"_",0,[],],
UIToolbar:["deinit",0,[],"barStyle",0,[],"items",1,[],"isTranslucent",0,[],"translucent",0,[],"setItemsAnimated",0,[1,0,],"tintColor",1,[],"barTintColor",1,[],"setBackgroundImageForToolbarPositionBarMetrics",0,[1,0,0,],"backgroundImageForToolbarPositionBarMetrics",0,[0,0,],"backgroundImageForToolbarPositionBarMetrics",0,[0,0,],"setShadowImageForToolbarPosition",0,[1,0,],"shadowImageForToolbarPosition",0,[0,],"shadowImageForToolbarPosition",0,[0,],"delegate",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"barPosition",0,[],],
UIToolbarDelegate:[],
UITouch:["deinit",0,[],"timestamp",0,[],"phase",0,[],"tapCount",0,[],"type",0,[],"majorRadius",0,[],"majorRadiusTolerance",0,[],"window",1,[],"view",1,[],"gestureRecognizers",1,[],"locationIn",0,[1,],"locationInView",0,[1,],"previousLocationIn",0,[1,],"previousLocationInView",0,[1,],"preciseLocationIn",0,[1,],"preciseLocationInView",0,[1,],"precisePreviousLocationIn",0,[1,],"precisePreviousLocationInView",0,[1,],"force",0,[],"maximumPossibleForce",0,[],"azimuthAngleIn",0,[1,],"azimuthAngleInView",0,[1,],"azimuthUnitVectorIn",0,[1,],"azimuthUnitVectorInView",0,[1,],"altitudeAngle",0,[],"estimationUpdateIndex",1,[],"estimatedProperties",0,[],"estimatedPropertiesExpectingUpdates",0,[],"init",0,[],"Phase",0,[],"TouchType",0,[],"Properties",0,[],],
UITraitCollection:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"containsTraitsIn",0,[1,],"containsTraitsInCollection",0,[1,],"initTraitsFromArray",0,[0,],"initTraitsFromCollectionsArray",0,[0,],"traitCollectionWithTraitsFromCollections",0,[0,],"initUserInterfaceIdiomUIUserInterfaceIdiom",0,[0,],"traitCollectionWithUserInterfaceIdiom",0,[0,],"userInterfaceIdiom",0,[],"initUserInterfaceStyleUIUserInterfaceStyle",0,[0,],"traitCollectionWithUserInterfaceStyle",0,[0,],"userInterfaceStyle",0,[],"initLayoutDirectionUITraitEnvironmentLayoutDirection",0,[0,],"traitCollectionWithLayoutDirection",0,[0,],"layoutDirection",0,[],"initDisplayScaleCGFloat",0,[0,],"traitCollectionWithDisplayScale",0,[0,],"displayScale",0,[],"initHorizontalSizeClassUIUserInterfaceSizeClass",0,[0,],"traitCollectionWithHorizontalSizeClass",0,[0,],"horizontalSizeClass",0,[],"initVerticalSizeClassUIUserInterfaceSizeClass",0,[0,],"traitCollectionWithVerticalSizeClass",0,[0,],"verticalSizeClass",0,[],"initForceTouchCapabilityUIForceTouchCapability",0,[0,],"traitCollectionWithForceTouchCapability",0,[0,],"forceTouchCapability",0,[],"initPreferredContentSizeCategoryUIContentSizeCategory",0,[0,],"traitCollectionWithPreferredContentSizeCategory",0,[0,],"preferredContentSizeCategory",0,[],"initDisplayGamutUIDisplayGamut",0,[0,],"traitCollectionWithDisplayGamut",0,[0,],"displayGamut",0,[],"supportsSecureCoding",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],],
UITraitEnvironment:["traitCollection",0,[],"traitCollectionDidChange",0,[1,],],
UITraitEnvironmentLayoutDirection:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unspecified",0,[],"Unspecified",0,[],"_",0,[],"leftToRight",0,[],"LeftToRight",0,[],"_",0,[],"rightToLeft",0,[],"RightToLeft",0,[],"_",0,[],],
UITransitionContextViewControllerKey:["initRawValueString",0,[0,],"_rawValue",0,[],"rawValue",0,[],"_",0,[],"RawValue",0,[],"_ObjectiveCType",0,[],"from",0,[],"to",0,[],],
UITransitionContextViewKey:["initRawValueString",0,[0,],"_rawValue",0,[],"rawValue",0,[],"_",0,[],"RawValue",0,[],"_ObjectiveCType",0,[],"from",0,[],"to",0,[],],
UIUserActivityRestoring:["restoreUserActivityState",0,[0,],],
UIUserInterfaceIdiom:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unspecified",0,[],"Unspecified",0,[],"_",0,[],"phone",0,[],"Phone",0,[],"_",0,[],"pad",0,[],"Pad",0,[],"_",0,[],"tv",0,[],"TV",0,[],"_",0,[],"carPlay",0,[],"CarPlay",0,[],"_",0,[],],
UIUserInterfaceLayoutDirection:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"leftToRight",0,[],"LeftToRight",0,[],"_",0,[],"rightToLeft",0,[],"RightToLeft",0,[],"_",0,[],],
UIUserInterfaceSizeClass:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unspecified",0,[],"Unspecified",0,[],"_",0,[],"compact",0,[],"Compact",0,[],"_",0,[],"regular",0,[],"Regular",0,[],"_",0,[],],
UIUserInterfaceStyle:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"unspecified",0,[],"Unspecified",0,[],"_",0,[],"light",0,[],"Light",0,[],"_",0,[],"dark",0,[],"Dark",0,[],"_",0,[],],
UIUserNotificationAction:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"identifier",1,[],"title",1,[],"behavior",0,[],"parameters",0,[],"activationMode",0,[],"isAuthenticationRequired",0,[],"authenticationRequired",0,[],"isDestructive",0,[],"destructive",0,[],"supportsSecureCoding",0,[],"copyWith",0,[1,],"mutableCopyWith",0,[1,],"encodeWith",0,[0,],],
UIUserNotificationActionBehavior:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"textInput",0,[],"TextInput",0,[],"_",0,[],],
UIUserNotificationActionContext:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"_default",0,[],"Default",0,[],"_",0,[],"minimal",0,[],"Minimal",0,[],"_",0,[],],
UIUserNotificationActivationMode:["initRawValueUInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"foreground",0,[],"Foreground",0,[],"_",0,[],"background",0,[],"Background",0,[],"_",0,[],],
UIUserNotificationCategory:["deinit",0,[],"init",0,[],"initCoderNSCoder",0,[0,],"identifier",1,[],"actionsFor",0,[0,],"actionsForContext",0,[0,],"supportsSecureCoding",0,[],"copyWith",0,[1,],"mutableCopyWith",0,[1,],"encodeWith",0,[0,],],
UIUserNotificationSettings:["deinit",0,[],"initTypesUIUserNotificationTypeCategoriesOptional",0,[0,1,],"initForTypesUIUserNotificationTypeCategoriesOptional",0,[0,1,],"settingsForTypesCategories",0,[0,1,],"types",0,[],"categories",1,[],"init",0,[],],
UIUserNotificationType:["initRawValueUInt",0,[0,],"rawValue",0,[],"_",0,[],"RawValue",0,[],"Element",0,[],"ArrayLiteralElement",0,[],"none",0,[],"_",0,[],"None",0,[],"_",0,[],"badge",0,[],"_",0,[],"Badge",0,[],"_",0,[],"sound",0,[],"_",0,[],"Sound",0,[],"_",0,[],"_alert",0,[],"_",0,[],"Alert",0,[],"_",0,[],],
UIVibrancyEffect:["deinit",0,[],"initBlurEffectUIBlurEffect",0,[0,],"initForBlurEffectUIBlurEffect",0,[0,],"effectForBlurEffect",0,[0,],"init",0,[],"initCoderNSCoder",0,[0,],],
UIVideoEditorController:["deinit",0,[],"canEditVideoAtPath",0,[0,],"canEditVideoAtPath",0,[0,],"delegate",0,[],"videoPath",0,[],"videoMaximumDuration",0,[],"videoQuality",0,[],"initNavigationBarClassOptionalToolbarClassOptional",0,[1,1,],"initRootViewControllerUIViewController",0,[0,],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"init",0,[],],
UIVideoEditorControllerDelegate:["videoEditorControllerDidSaveEditedVideoToPath",0,[0,0,],"videoEditorControllerDidFailWithError",0,[0,0,],"videoEditorControllerDidCancel",0,[0,],],
UIView:["deinit",0,[],"layerClass",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"isUserInteractionEnabled",0,[],"userInteractionEnabled",0,[],"tag",0,[],"_layer",0,[],"canBecomeFocused",0,[],"isFocused",0,[],"focused",0,[],"semanticContentAttribute",0,[],"userInterfaceLayoutDirectionFor",0,[0,],"userInterfaceLayoutDirectionForSemanticContentAttribute",0,[0,],"userInterfaceLayoutDirectionForRelativeTo",0,[0,0,],"userInterfaceLayoutDirectionForSemanticContentAttributeRelativeToLayoutDirection",0,[0,0,],"effectiveUserInterfaceLayoutDirection",0,[],"init",0,[],"collisionBoundsType",0,[],"collisionBoundingPath",0,[],"traitCollection",0,[],"preferredFocusEnvironments",0,[],"parentFocusEnvironment",0,[],"focusItemContainer",1,[],"preferredFocusedView",0,[],"coordinateSpace",0,[],"encodeWith",0,[0,],"appearance",0,[],"appearanceWhenContainedInInstancesOf",0,[0,],"appearanceFor",0,[0,],"appearanceForWhenContainedInInstancesOf",0,[0,0,],"traitCollectionDidChange",0,[1,],"convertTo",0,[0,0,],"convertFrom",0,[0,0,],"convertTo",0,[0,0,],"convertFrom",0,[0,0,],"didHintFocusMovement",0,[0,],"setNeedsFocusUpdate",0,[],"updateFocusIfNeeded",0,[],"shouldUpdateFocusIn",0,[0,],"didUpdateFocusInWith",0,[0,0,],"soundIdentifierForFocusUpdateIn",0,[0,],"focusItemsIn",0,[0,],"display",0,[0,],"drawIn",0,[0,0,],"layerWillDraw",0,[0,],"layoutSublayersOf",0,[0,],"actionForForKey",0,[0,0,],"AnimationCurve",0,[],"ContentMode",0,[],"AnimationTransition",0,[],"AutoresizingMask",0,[],"AnimationOptions",0,[],"KeyframeAnimationOptions",0,[],"SystemAnimation",0,[],"TintAdjustmentMode",0,[],"noIntrinsicMetric",0,[],"layoutFittingCompressedSize",0,[],"layoutFittingExpandedSize",0,[],"_frame",0,[],"bounds",0,[],"center",0,[],"transform",0,[],"contentScaleFactor",0,[],"isMultipleTouchEnabled",0,[],"multipleTouchEnabled",0,[],"isExclusiveTouch",0,[],"exclusiveTouch",0,[],"hitTestWith",0,[0,1,],"hitTestWithEvent",0,[0,1,],"pointInsideWith",0,[0,1,],"pointInsideWithEvent",0,[0,1,],"convertTo",0,[0,1,],"convertPointToView",0,[0,1,],"convertFrom",0,[0,1,],"convertPointFromView",0,[0,1,],"convertTo",0,[0,1,],"convertRectToView",0,[0,1,],"convertFrom",0,[0,1,],"convertRectFromView",0,[0,1,],"autoresizesSubviews",0,[],"autoresizingMask",0,[],"sizeThatFits",0,[0,],"sizeToFit",0,[],"superview",1,[],"subviews",0,[],"window",1,[],"removeFromSuperview",0,[],"insertSubviewAt",0,[0,0,],"insertSubviewAtIndex",0,[0,0,],"exchangeSubviewAtWithSubviewAt",0,[0,0,],"exchangeSubviewAtIndexWithSubviewAtIndex",0,[0,0,],"addSubview",0,[0,],"insertSubviewBelowSubview",0,[0,0,],"insertSubviewAboveSubview",0,[0,0,],"bringSubviewToFront",0,[0,],"bringSubviewToFront",0,[0,],"sendSubviewToBack",0,[0,],"sendSubviewToBack",0,[0,],"didAddSubview",0,[0,],"willRemoveSubview",0,[0,],"willMoveToSuperview",0,[1,],"willMoveToSuperview",0,[1,],"didMoveToSuperview",0,[],"willMoveToWindow",0,[1,],"willMoveToWindow",0,[1,],"didMoveToWindow",0,[],"isDescendantOf",0,[0,],"isDescendantOfView",0,[0,],"viewWithTag",0,[0,],"setNeedsLayout",0,[],"layoutIfNeeded",0,[],"layoutSubviews",0,[],"layoutMargins",0,[],"directionalLayoutMargins",0,[],"preservesSuperviewLayoutMargins",0,[],"insetsLayoutMarginsFromSafeArea",0,[],"layoutMarginsDidChange",0,[],"safeAreaInsets",0,[],"safeAreaInsetsDidChange",0,[],"layoutMarginsGuide",0,[],"readableContentGuide",0,[],"safeAreaLayoutGuide",0,[],"draw",0,[0,],"drawRect",0,[0,],"setNeedsDisplay",0,[],"setNeedsDisplay",0,[0,],"setNeedsDisplayInRect",0,[0,],"clipsToBounds",0,[],"backgroundColor",1,[],"alpha",0,[],"isOpaque",0,[],"opaque",0,[],"clearsContextBeforeDrawing",0,[],"isHidden",0,[],"_hidden",0,[],"contentMode",0,[],"contentStretch",0,[],"mask",1,[],"maskView",1,[],"tintColor",1,[],"tintAdjustmentMode",0,[],"tintColorDidChange",0,[],"beginAnimationsContext",0,[1,1,],"commitAnimations",0,[],"setAnimationDelegate",0,[1,],"setAnimationWillStart",0,[1,],"setAnimationWillStartSelector",0,[1,],"setAnimationDidStop",0,[1,],"setAnimationDidStopSelector",0,[1,],"setAnimationDuration",0,[0,],"setAnimationDelay",0,[0,],"setAnimationStart",0,[0,],"setAnimationStartDate",0,[0,],"setAnimationCurve",0,[0,],"setAnimationRepeatCount",0,[0,],"setAnimationRepeatAutoreverses",0,[0,],"setAnimationBeginsFromCurrentState",0,[0,],"setAnimationTransitionForCache",0,[0,0,0,],"setAnimationTransitionForViewCache",0,[0,0,0,],"setAnimationsEnabled",0,[0,],"areAnimationsEnabled",0,[],"performWithoutAnimation",0,[0,],"inheritedAnimationDuration",0,[],"animateWithDurationDelayOptionsAnimationsCompletion",0,[0,0,0,0,1,],"animateWithDurationDelayOptionsAnimationsCompletion",0,[0,0,0,0,1,],"animateWithDurationAnimationsCompletion",0,[0,0,1,],"animateWithDurationAnimationsCompletion",0,[0,0,1,],"animateWithDurationAnimations",0,[0,0,],"animateWithDurationAnimations",0,[0,0,],"animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion",0,[0,0,0,0,0,0,1,],"animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion",0,[0,0,0,0,0,0,1,],"transitionWithDurationOptionsAnimationsCompletion",0,[0,0,0,1,1,],"transitionWithViewDurationOptionsAnimationsCompletion",0,[0,0,0,1,1,],"transitionFromToDurationOptionsCompletion",0,[0,0,0,0,1,],"transitionFromViewToViewDurationOptionsCompletion",0,[0,0,0,0,1,],"performOnOptionsAnimationsCompletion",0,[0,0,0,1,1,],"performSystemAnimationOnViewsOptionsAnimationsCompletion",0,[0,0,0,1,1,],"animateKeyframesWithDurationDelayOptionsAnimationsCompletion",0,[0,0,0,0,1,],"animateKeyframesWithDurationDelayOptionsAnimationsCompletion",0,[0,0,0,0,1,],"addKeyframeWithRelativeStartTimeRelativeDurationAnimations",0,[0,0,0,],"addKeyframeWithRelativeStartTimeRelativeDurationAnimations",0,[0,0,0,],"gestureRecognizers",1,[],"addGestureRecognizer",0,[0,],"removeGestureRecognizer",0,[0,],"gestureRecognizerShouldBegin",0,[0,],"addMotionEffect",0,[0,],"removeMotionEffect",0,[0,],"motionEffects",0,[],"constraints",0,[],"addConstraint",0,[0,],"addConstraints",0,[0,],"removeConstraint",0,[0,],"removeConstraints",0,[0,],"updateConstraintsIfNeeded",0,[],"updateConstraints",0,[],"needsUpdateConstraints",0,[],"setNeedsUpdateConstraints",0,[],"translatesAutoresizingMaskIntoConstraints",0,[],"requiresConstraintBasedLayout",0,[],"alignmentRectForFrame",0,[0,],"alignmentRectForFrame",0,[0,],"frameForAlignmentRect",0,[0,],"frameForAlignmentRect",0,[0,],"alignmentRectInsets",0,[],"forBaselineLayout",0,[],"viewForBaselineLayout",0,[],"forFirstBaselineLayout",0,[],"viewForFirstBaselineLayout",0,[],"forLastBaselineLayout",0,[],"viewForLastBaselineLayout",0,[],"intrinsicContentSize",0,[],"invalidateIntrinsicContentSize",0,[],"contentHuggingPriorityFor",0,[0,],"contentHuggingPriorityForAxis",0,[0,],"setContentHuggingPriorityFor",0,[0,0,],"setContentHuggingPriorityForAxis",0,[0,0,],"contentCompressionResistancePriorityFor",0,[0,],"contentCompressionResistancePriorityForAxis",0,[0,],"setContentCompressionResistancePriorityFor",0,[0,0,],"setContentCompressionResistancePriorityForAxis",0,[0,0,],"systemLayoutSizeFitting",0,[0,],"systemLayoutSizeFittingSize",0,[0,],"systemLayoutSizeFittingWithHorizontalFittingPriorityVerticalFittingPriority",0,[0,0,0,],"systemLayoutSizeFittingSizeWithHorizontalFittingPriorityVerticalFittingPriority",0,[0,0,0,],"layoutGuides",0,[],"addLayoutGuide",0,[0,],"removeLayoutGuide",0,[0,],"leadingAnchor",0,[],"trailingAnchor",0,[],"leftAnchor",0,[],"rightAnchor",0,[],"topAnchor",0,[],"bottomAnchor",0,[],"widthAnchor",0,[],"heightAnchor",0,[],"centerXAnchor",0,[],"centerYAnchor",0,[],"firstBaselineAnchor",0,[],"lastBaselineAnchor",0,[],"constraintsAffectingLayoutFor",0,[0,],"constraintsAffectingLayoutForAxis",0,[0,],"hasAmbiguousLayout",0,[],"exerciseAmbiguityInLayout",0,[],"restorationIdentifier",1,[],"encodeRestorableStateWith",0,[0,],"encodeRestorableStateWithCoder",0,[0,],"decodeRestorableStateWith",0,[0,],"decodeRestorableStateWithCoder",0,[0,],"snapshotViewAfterScreenUpdates",0,[0,],"snapshotViewAfterScreenUpdates",0,[0,],"resizableSnapshotViewFromAfterScreenUpdatesWithCapInsets",0,[0,0,0,],"resizableSnapshotViewFromRectAfterScreenUpdatesWithCapInsets",0,[0,0,0,],"drawHierarchyInAfterScreenUpdates",0,[0,0,],"drawViewHierarchyInRectAfterScreenUpdates",0,[0,0,],"accessibilityIgnoresInvertColors",0,[],"accessibilityIdentifier",1,[],"addInteraction",0,[0,],"removeInteraction",0,[0,],"interactions",0,[],"endEditing",0,[0,],"viewPrintFormatter",0,[],"drawFor",0,[0,0,],"drawRectForViewPrintFormatter",0,[0,0,],"_defaultCustomPlaygroundQuickLook",0,[],"_",0,[],],
UIViewAnimating:["state",0,[],"isRunning",0,[],"running",0,[],"isReversed",0,[],"reversed",0,[],"fractionComplete",0,[],"startAnimation",0,[],"startAnimationAfterDelay",0,[0,],"startAnimationAfterDelay",0,[0,],"pauseAnimation",0,[],"stopAnimation",0,[0,],"finishAnimationAt",0,[0,],"finishAnimationAtPosition",0,[0,],],
UIViewAnimatingPosition:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"end",0,[],"End",0,[],"_",0,[],"start",0,[],"Start",0,[],"_",0,[],"current",0,[],"Current",0,[],"_",0,[],],
UIViewAnimatingState:["initRawValueInt",0,[0,],"_",0,[],"rawValue",0,[],"RawValue",0,[],"inactive",0,[],"Inactive",0,[],"_",0,[],"active",0,[],"Active",0,[],"_",0,[],"stopped",0,[],"Stopped",0,[],"_",0,[],],
UIViewController:["deinit",0,[],"initNibNameOptionalBundleOptional",0,[1,1,],"initCoderNSCoder",0,[0,],"view",1,[],"loadView",0,[],"loadViewIfNeeded",0,[],"viewIfLoaded",1,[],"viewWillUnload",0,[],"viewDidUnload",0,[],"viewDidLoad",0,[],"isViewLoaded",0,[],"viewLoaded",0,[],"nibName",1,[],"nibBundle",1,[],"storyboard",1,[],"performSegueWithIdentifierSender",0,[0,1,],"performSegueWithIdentifierSender",0,[0,1,],"shouldPerformSegueWithIdentifierSender",0,[0,1,],"shouldPerformSegueWithIdentifierSender",0,[0,1,],"prepareForSender",0,[0,1,],"prepareForSegueSender",0,[0,1,],"canPerformUnwindSegueActionFromWithSender",0,[0,0,0,],"canPerformUnwindSegueActionFromViewControllerWithSender",0,[0,0,0,],"allowedChildrenForUnwindingFrom",0,[0,],"allowedChildViewControllersForUnwindingFrom",0,[0,],"allowedChildViewControllersForUnwindingFromSource",0,[0,],"childContaining",0,[0,],"childViewControllerContaining",0,[0,],"childViewControllerContainingSegueSource",0,[0,],"forUnwindSegueActionFromWithSender",0,[0,0,1,],"viewControllerForUnwindSegueActionFromViewControllerWithSender",0,[0,0,1,],"unwindForTowards",0,[0,0,],"unwindForTowardsViewController",0,[0,0,],"unwindForSegueTowardsViewController",0,[0,0,],"segueForUnwindingToFromIdentifier",0,[0,0,1,],"segueForUnwindingToViewControllerFromViewControllerIdentifier",0,[0,0,1,],"viewWillAppear",0,[0,],"viewDidAppear",0,[0,],"viewWillDisappear",0,[0,],"viewDidDisappear",0,[0,],"viewWillLayoutSubviews",0,[],"viewDidLayoutSubviews",0,[],"title",1,[],"didReceiveMemoryWarning",0,[],"_parent",0,[],"parentViewController",0,[],"modal",1,[],"modalViewController",1,[],"presentedViewController",1,[],"presentingViewController",1,[],"definesPresentationContext",0,[],"providesPresentationContextTransitionStyle",0,[],"restoresFocusAfterTransition",0,[],"isBeingPresented",0,[],"beingPresented",0,[],"isBeingDismissed",0,[],"beingDismissed",0,[],"isMovingToParent",0,[],"isMovingToParentViewController",0,[],"movingToParentViewController",0,[],"isMovingFromParent",0,[],"isMovingFromParentViewController",0,[],"movingFromParentViewController",0,[],"presentAnimatedCompletion",0,[0,0,1,],"presentViewControllerAnimatedCompletion",0,[0,0,1,],"dismissAnimatedCompletion",0,[0,1,],"dismissViewControllerAnimatedCompletion",0,[0,1,],"presentModalViewControllerAnimated",0,[0,0,],"dismissModalViewControllerAnimated",0,[0,],"dismissModalViewControllerAnimated",0,[0,],"modalTransitionStyle",0,[],"modalPresentationStyle",0,[],"modalPresentationCapturesStatusBarAppearance",0,[],"disablesAutomaticKeyboardDismissal",0,[],"wantsFullScreenLayout",0,[],"edgesForExtendedLayout",0,[],"extendedLayoutIncludesOpaqueBars",0,[],"automaticallyAdjustsScrollViewInsets",0,[],"preferredContentSize",0,[],"preferredStatusBarStyle",0,[],"prefersStatusBarHidden",0,[],"preferredStatusBarUpdateAnimation",0,[],"setNeedsStatusBarAppearanceUpdate",0,[],"targetViewControllerForActionSender",0,[0,1,],"targetViewControllerForActionSender",0,[0,1,],"showSender",0,[0,1,],"showViewControllerSender",0,[0,1,],"showDetailViewControllerSender",0,[0,1,],"preferredUserInterfaceStyle",0,[],"setNeedsUserInterfaceAppearanceUpdate",0,[],"init",0,[],"traitCollection",0,[],"preferredFocusEnvironments",0,[],"parentFocusEnvironment",0,[],"focusItemContainer",1,[],"preferredFocusedView",0,[],"encodeWith",0,[0,],"traitCollectionDidChange",0,[1,],"preferredContentSizeDidChangeForChildContentContainer",0,[0,],"systemLayoutFittingSizeDidChangeForChildContentContainer",0,[0,],"sizeForChildContentContainerWithParentContainerSize",0,[0,0,],"viewWillTransitionToWith",0,[0,0,],"willTransitionToWith",0,[0,0,],"setNeedsFocusUpdate",0,[],"updateFocusIfNeeded",0,[],"shouldUpdateFocusIn",0,[0,],"didUpdateFocusInWith",0,[0,0,],"soundIdentifierForFocusUpdateIn",0,[0,],"showDetailTargetDidChangeNotification",0,[],"hierarchyInconsistencyException",0,[],"attemptRotationToDeviceOrientation",0,[],"shouldAutorotateTo",0,[0,],"shouldAutorotateToInterfaceOrientation",0,[0,],"shouldAutorotate",0,[],"supportedInterfaceOrientations",0,[],"preferredInterfaceOrientationForPresentation",0,[],"rotatingHeaderView",0,[],"rotatingFooterView",0,[],"interfaceOrientation",0,[],"willRotateToDuration",0,[0,0,],"willRotateToInterfaceOrientationDuration",0,[0,0,],"didRotateFrom",0,[0,],"didRotateFromInterfaceOrientation",0,[0,],"willAnimateRotationToDuration",0,[0,0,],"willAnimateRotationToInterfaceOrientationDuration",0,[0,0,],"willAnimateFirstHalfOfRotationToDuration",0,[0,0,],"willAnimateFirstHalfOfRotationToInterfaceOrientationDuration",0,[0,0,],"didAnimateFirstHalfOfRotationTo",0,[0,],"didAnimateFirstHalfOfRotationToInterfaceOrientation",0,[0,],"willAnimateSecondHalfOfRotationFromDuration",0,[0,0,],"willAnimateSecondHalfOfRotationFromInterfaceOrientationDuration",0,[0,0,],"isEditing",0,[],"editing",0,[],"setEditingAnimated",0,[0,0,],"editButtonItem",0,[],"searchDisplayController",1,[],"children",0,[],"childViewControllers",0,[],"addChild",0,[0,],"addChildViewController",0,[0,],"removeFromParent",0,[],"removeFromParentViewController",0,[],"transitionFromToDurationOptionsAnimationsCompletion",0,[0,0,0,0,1,1,],"transitionFromViewControllerToViewControllerDurationOptionsAnimationsCompletion",0,[0,0,0,0,1,1,],"beginAppearanceTransitionAnimated",0,[0,0,],"endAppearanceTransition",0,[],"childForStatusBarStyle",1,[],"childViewControllerForStatusBarStyle",1,[],"childForStatusBarHidden",1,[],"childViewControllerForStatusBarHidden",1,[],"setOverrideTraitCollectionForChild",0,[1,0,],"setOverrideTraitCollectionForChildViewController",0,[1,0,],"overrideTraitCollectionForChild",0,[0,],"overrideTraitCollectionForChildViewController",0,[0,],"overrideTraitCollectionForChildViewController",0,[0,],"childViewControllerForUserInterfaceStyle",1,[],"automaticallyForwardAppearanceAndRotationMethodsToChildViewControllers",0,[],"shouldAutomaticallyForwardRotationMethods",0,[],"shouldAutomaticallyForwardAppearanceMethods",0,[],"willMoveToParent",0,[1,],"willMoveToParentViewController",0,[1,],"willMoveToParentViewController",0,[1,],"didMoveToParent",0,[1,],"didMoveToParentViewController",0,[1,],"didMoveToParentViewController",0,[1,],"restorationIdentifier",1,[],"restorationClass",1,[],"encodeRestorableStateWith",0,[0,],"encodeRestorableStateWithCoder",0,[0,],"decodeRestorableStateWith",0,[0,],"decodeRestorableStateWithCoder",0,[0,],"applicationFinishedRestoringState",0,[],"restorationParent",1,[],"objectRestorationClass",1,[],"updateViewConstraints",0,[],"transitioningDelegate",0,[],"topLayoutGuide",0,[],"bottomLayoutGuide",0,[],"additionalSafeAreaInsets",0,[],"systemMinimumLayoutMargins",0,[],"viewRespectsSystemMinimumLayoutMargins",0,[],"viewLayoutMarginsDidChange",0,[],"viewSafeAreaInsetsDidChange",0,[],"addKeyCommand",0,[0,],"removeKeyCommand",0,[0,],"extensionContext",1,[],"beginRequestWith",0,[0,],"presentationController",1,[],"popoverPresentationController",1,[],"registerForPreviewingWithSourceView",0,[0,0,],"registerForPreviewingWithDelegateSourceView",0,[0,0,],"unregisterForPreviewingWithContext",0,[0,],"unregisterForPreviewingWithContext",0,[0,],"childForScreenEdgesDeferringSystemGestures",1,[],"childViewControllerForScreenEdgesDeferringSystemGestures",1,[],"preferredScreenEdgesDeferringSystemGestures",0,[],"setNeedsUpdateOfScreenEdgesDeferringSystemGestures",0,[],"childForHomeIndicatorAutoHidden",1,[],"childViewControllerForHomeIndicatorAutoHidden",1,[],"prefersHomeIndicatorAutoHidden",0,[],"setNeedsUpdateOfHomeIndicatorAutoHidden",0,[],"previewActionItems",0,[],"navigationItem",0,[],"hidesBottomBarWhenPushed",0,[],"navigationController",1,[],"toolbarItems",1,[],"setToolbarItemsAnimated",0,[1,0,],"isModalInPopover",0,[],"modalInPopover",0,[],"contentSizeForViewInPopover",0,[],"transitionCoordinator",1,[],"splitViewController",1,[],"collapseSecondaryViewControllerFor",0,[0,0,],"collapseSecondaryViewControllerForSplitViewController",0,[0,0,],"separateSecondaryViewControllerFor",0,[0,],"separateSecondaryViewControllerForSplitViewController",0,[0,],"tabBarItem",1,[],"tabBarController",1,[],],
UIViewControllerAnimatedTransitioning:["transitionDurationUsing",0,[1,],"transitionDuration",0,[1,],"animateTransitionUsing",0,[0,],"animateTransition",0,[0,],"interruptibleAnimatorUsing",0,[0,],"interruptibleAnimatorForTransition",0,[0,],"animationEnded",0,[0,],],
UIViewControllerContextTransitioning:["containerView",0,[],"isAnimated",0,[],"animated",0,[],"isInteractive",0,[],"interactive",0,[],"transitionWasCancelled",0,[],"presentationStyle",0,[],"updateInteractiveTransition",0,[0,],"finishInteractiveTransition",0,[],"cancelInteractiveTransition",0,[],"pauseInteractiveTransition",0,[],"completeTransition",0,[0,],"viewControllerForKey",0,[0,],"viewControllerForKey",0,[0,],"viewForKey",0,[0,],"viewForKey",0,[0,],"targetTransform",0,[],"initialFrameFor",0,[0,],"initialFrameForViewController",0,[0,],"finalFrameFor",0,[0,],"finalFrameForViewController",0,[0,],],
UIViewControllerInteractiveTransitioning:["startInteractiveTransition",0,[0,],"completionSpeed",0,[],"completionCurve",0,[],"wantsInteractiveStart",0,[],],
UIViewControllerPreviewing:["previewingGestureRecognizerForFailureRelationship",0,[],"delegate",0,[],"sourceView",0,[],"sourceRect",0,[],],
UIViewControllerPreviewingDelegate:["previewingContextViewControllerForLocation",0,[0,0,],"previewingContextCommit",0,[0,0,],"previewingContextCommitViewController",0,[0,0,],],
UIViewControllerRestoration:["viewControllerWithRestorationIdentifierPathCoder",0,[0,0,],"viewControllerWithRestorationIdentifierPathCoder",0,[0,0,],],
UIViewControllerTransitionCoordinator:["animateAlongsideTransitionCompletion",0,[1,1,],"animateAlongsideTransitionCompletion",0,[1,1,],"animateAlongsideTransitionInAnimationCompletion",0,[1,1,1,],"animateAlongsideTransitionInViewAnimationCompletion",0,[1,1,1,],"notifyWhenInteractionEnds",0,[0,],"notifyWhenInteractionEndsUsingBlock",0,[0,],"notifyWhenInteractionChanges",0,[0,],"notifyWhenInteractionChangesUsingBlock",0,[0,],],
UIViewControllerTransitionCoordinatorContext:["isAnimated",0,[],"animated",0,[],"presentationStyle",0,[],"initiallyInteractive",0,[],"isInterruptible",0,[],"isInteractive",0,[],"interactive",0,[],"isCancelled",0,[],"cancelled",0,[],"transitionDuration",0,[],"percentComplete",0,[],"completionVelocity",0,[],"completionCurve",0,[],"viewControllerForKey",0,[0,],"viewControllerForKey",0,[0,],"viewForKey",0,[0,],"viewForKey",0,[0,],"containerView",0,[],"targetTransform",0,[],],
UIViewControllerTransitioningDelegate:["animationControllerForPresentedPresentingSource",0,[0,0,0,],"animationControllerForPresentedControllerPresentingControllerSourceController",0,[0,0,0,],"animationControllerForDismissed",0,[0,],"animationControllerForDismissedController",0,[0,],"interactionControllerForPresentationUsing",0,[0,],"interactionControllerForPresentation",0,[0,],"interactionControllerForDismissalUsing",0,[0,],"interactionControllerForDismissal",0,[0,],"presentationControllerForPresentedPresentingSource",0,[0,1,0,],"presentationControllerForPresentedViewControllerPresentingViewControllerSourceViewController",0,[0,1,0,],],
UIViewImplicitlyAnimating:["addAnimationsDelayFactor",0,[0,0,],"addAnimations",0,[0,],"addCompletion",0,[0,],"continueAnimationWithTimingParametersDurationFactor",0,[1,0,],"continueAnimationWithTimingParametersDurationFactor",0,[1,0,],],
UIViewPrintFormatter:["deinit",0,[],"view",0,[],"init",0,[],],
UIViewPropertyAnimator:["deinit",0,[],"timingParameters",1,[],"duration",0,[],"delay",0,[],"isUserInteractionEnabled",0,[],"userInteractionEnabled",0,[],"isManualHitTestingEnabled",0,[],"manualHitTestingEnabled",0,[],"isInterruptible",0,[],"interruptible",0,[],"scrubsLinearly",0,[],"pausesOnCompletion",0,[],"initDurationTimeIntervalTimingParametersUITimingCurveProvider",0,[0,0,],"initDurationTimeIntervalCurveUIViewAnimationCurveAnimationsOptional",0,[0,0,1,],"initDurationTimeIntervalControlPoint1CGPointControlPoint2CGPointAnimationsOptional",0,[0,0,0,1,],"initDurationTimeIntervalDampingRatioCGFloatAnimationsOptional",0,[0,0,1,],"runningPropertyAnimatorWithDurationDelayOptionsAnimationsCompletion",0,[0,0,0,0,1,],"runningPropertyAnimatorWithDurationDelayOptionsAnimationsCompletion",0,[0,0,0,0,1,],"addAnimationsDelayFactor",0,[0,0,],"addAnimations",0,[0,],"addCompletion",0,[0,],"continueAnimationWithTimingParametersDurationFactor",0,[1,0,],"continueAnimationWithTimingParametersDurationFactor",0,[1,0,],"init",0,[],"state",0,[],"isRunning",0,[],"isReversed",0,[],"fractionComplete",0,[],"startAnimation",0,[],"startAnimationAfterDelay",0,[0,],"pauseAnimation",0,[],"stopAnimation",0,[0,],"finishAnimationAt",0,[0,],"copyWith",0,[1,],],
UIVisualEffect:["deinit",0,[],"init",0,[],"supportsSecureCoding",0,[],"copyWith",0,[1,],"encodeWith",0,[0,],"initCoderNSCoder",0,[0,],],
UIVisualEffectView:["deinit",0,[],"contentView",0,[],"effect",1,[],"initEffectOptional",0,[1,],"initCoderNSCoder",0,[0,],"initFrameCGRect",0,[0,],"init",0,[],"supportsSecureCoding",0,[],],
UIWebView:["deinit",0,[],"delegate",0,[],"scrollView",0,[],"loadRequest",0,[0,],"loadHTMLStringBaseURL",0,[0,1,],"loadMimeTypeTextEncodingNameBaseURL",0,[0,0,0,0,],"loadDataMIMETypeTextEncodingNameBaseURL",0,[0,0,0,0,],"request",1,[],"reload",0,[],"stopLoading",0,[],"goBack",0,[],"goForward",0,[],"canGoBack",0,[],"canGoForward",0,[],"isLoading",0,[],"loading",0,[],"stringByEvaluatingJavaScriptFrom",0,[0,],"stringByEvaluatingJavaScriptFromString",0,[0,],"scalesPageToFit",0,[],"detectsPhoneNumbers",0,[],"dataDetectorTypes",0,[],"allowsInlineMediaPlayback",0,[],"mediaPlaybackRequiresUserAction",0,[],"mediaPlaybackAllowsAirPlay",0,[],"suppressesIncrementalRendering",0,[],"keyboardDisplayRequiresUserAction",0,[],"paginationMode",0,[],"paginationBreakingMode",0,[],"pageLength",0,[],"gapBetweenPages",0,[],"pageCount",0,[],"allowsPictureInPictureMediaPlayback",0,[],"allowsLinkPreview",0,[],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"scrollViewDidScroll",0,[0,],"scrollViewDidZoom",0,[0,],"scrollViewWillBeginDragging",0,[0,],"scrollViewWillEndDraggingWithVelocityTargetContentOffset",0,[0,0,0,],"scrollViewDidEndDraggingWillDecelerate",0,[0,0,],"scrollViewWillBeginDecelerating",0,[0,],"scrollViewDidEndDecelerating",0,[0,],"scrollViewDidEndScrollingAnimation",0,[0,],"viewForZoomingIn",0,[0,],"scrollViewWillBeginZoomingWith",0,[0,1,],"scrollViewDidEndZoomingWithAtScale",0,[0,1,0,],"scrollViewShouldScrollToTop",0,[0,],"scrollViewDidScrollToTop",0,[0,],"scrollViewDidChangeAdjustedContentInset",0,[0,],"NavigationType",0,[],"PaginationMode",0,[],"PaginationBreakingMode",0,[],],
UIWebViewDelegate:["webViewShouldStartLoadWithNavigationType",0,[0,0,0,],"webViewShouldStartLoadWithRequestNavigationType",0,[0,0,0,],"webViewDidStartLoad",0,[0,],"webViewDidFinishLoad",0,[0,],"webViewDidFailLoadWithError",0,[0,0,],],
UIWindow:["deinit",0,[],"screen",0,[],"windowLevel",0,[],"isKeyWindow",0,[],"keyWindow",0,[],"becomeKey",0,[],"becomeKeyWindow",0,[],"resignKey",0,[],"resignKeyWindow",0,[],"makeKey",0,[],"makeKeyWindow",0,[],"makeKeyAndVisible",0,[],"rootViewController",1,[],"sendEvent",0,[0,],"convertTo",0,[0,1,],"convertPointToWindow",0,[0,1,],"convertFrom",0,[0,1,],"convertPointFromWindow",0,[0,1,],"convertTo",0,[0,1,],"convertRectToWindow",0,[0,1,],"convertFrom",0,[0,1,],"convertRectFromWindow",0,[0,1,],"initFrameCGRect",0,[0,],"initCoderNSCoder",0,[0,],"init",0,[],"Level",0,[],"didBecomeVisibleNotification",0,[],"didBecomeHiddenNotification",0,[],"didBecomeKeyNotification",0,[],"didResignKeyNotification",0,[],],
_UIKitNumericRawRepresentable:["infix_60",0,[0,0,],"infix_43",0,[0,0,],"infix_43",0,[0,0,],"infix_45",0,[0,0,],"infix_45",0,[0,0,],"infix_43_61",0,[0,0,],"infix_45_61",0,[0,0,],],
_UIViewQuickLookState:["views",0,[],"_",0,[],"_",0,[0,],"_",0,[],"init",0,[],],}
for(let className in UIKitMembers) {
    let mio
    try {
        eval('mio = ' + className)
    }
    catch(err) {
        continue
    }
    miojslibs[className] = mio
}
