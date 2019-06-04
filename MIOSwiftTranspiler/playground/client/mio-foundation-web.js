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
    if (newClass.init$vars)
        newClass.init$vars(); //quick fix for transpiler because it needs it
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
 
var CGPoint = /** @class */ (function () {
    function CGPoint(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    CGPoint.Zero = function () {
        var p = new CGPoint(0, 0);
        return p;
    };
    return CGPoint;
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
 
var CGRect = /** @class */ (function () {
    function CGRect(p, s) {
        this.origin = null;
        this.size = null;
        this.origin = p;
        this.size = s;
    }
    CGRect.Zero = function () {
        var f = new CGRect(CGPoint.Zero(), CGSize.Zero());
        return f;
    };
    CGRect.prototype.initXYWidthHeight = function (x, y, w, h) {
        this.origin = new CGPoint(x, y);
        this.size = new CGSize(w, h);
    };
    return CGRect;
}());
 
function NSRectMaxY(rect) {
    return rect.origin.y;
}
function NSRectMinY(rect) {
    return rect.origin.y + rect.size.height;
}
var CGSize = /** @class */ (function () {
    function CGSize(w, h) {
        this.width = 0;
        this.height = 0;
        this.width = w;
        this.height = h;
    }
    CGSize.Zero = function () {
        var s = new CGSize(0, 0);
        return s;
    };
    CGSize.prototype.isEqualTo = function (size) {
        if (this.width == size.width
            && this.height == size.height)
            return true;
        return false;
    };
    return CGSize;
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
    NSObject.prototype.addObserverForKeyPathOptionsContext = function (obs, keypath, context) {
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
var Bundle = /** @class */ (function (_super) {
    __extends(Bundle, _super);
    function Bundle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.url = null;
        return _this;
    }
    Bundle.mainBundle = function () {
        if (this._mainBundle == null) {
            var urlString = MIOCoreBundleGetMainURLString();
            this._mainBundle = new Bundle();
            this._mainBundle.initWithURL(NSURL.urlWithString(urlString));
        }
        return this._mainBundle;
    };
    Bundle.prototype.initUrlURL = function (url) {
        this.url = url;
    };
    Bundle.prototype.loadNibNamed = function (name, owner, options) {
        var path = MIOCoreBundleGetMainURLString() + "/" + name;
        MIOCoreBundleGetContentsFromURLString(path, this, function (code, data) {
            owner._didLoadNibWithLayerData(data);
        });
    };
    Bundle.prototype.pathForResourceOfType = function (resource, type) {
        return MIOCoreBundleGetAppResource(resource[0], type[0]);
    };
    Bundle._mainBundle = null;
    return Bundle;
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
        var items = PropertyListSerialization.propertyListWithData(data, 0, 0, null);
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
        n.initValueBool(value);
        return n;
    };
    NSNumber.numberWithInteger = function (value) {
        var n = new NSNumber();
        n.initValueInt(value);
        return n;
    };
    NSNumber.numberWithFloat = function (value) {
        var n = new NSNumber();
        n.initValueFloat(value);
        return n;
    };
    NSNumber.prototype.initValueBool = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 1;
        }
        else {
            this.storeValue = value ? 0 : 1;
        }
    };
    NSNumber.prototype.initValueInt = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 0;
        }
        else {
            this.storeValue = value;
        }
    };
    NSNumber.prototype.initValueFloat = function (value) {
        if (isNaN(value) || value == null) {
            this.storeValue = 0.0;
        }
        else {
            this.storeValue = value;
        }
    };
    Object.defineProperty(NSNumber.prototype, "floatValue", {
        get: function () {
            return this.storeValue;
        },
        enumerable: true,
        configurable: true
    });
    return NSNumber;
}(NSObject));
 

var NSDecimalNumber = /** @class */ (function (_super) {
    __extends(NSDecimalNumber, _super);
    function NSDecimalNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NSDecimalNumber.decimalNumberWithString = function (str) {
        var dn = new NSDecimalNumber();
        dn.initStringOptional(str);
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
    NSDecimalNumber.prototype.initStringOptional = function (str) {
        this._initWithValue(str[0]);
    };
    NSDecimalNumber.prototype.initDecimalDecimal = function (value) {
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
        dv.initDecimalDecimal(this.storeValue.add(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberBySubtracting = function (value) {
        var dv = new NSDecimalNumber();
        dv.initDecimalDecimal(this.storeValue.sub(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberByMultiplyingBy = function (value) {
        var dv = new NSDecimalNumber();
        dv.initDecimalDecimal(this.storeValue.mul(value.storeValue));
        return dv;
    };
    NSDecimalNumber.prototype.decimalNumberByDividingBy = function (value) {
        var dv = new NSDecimalNumber();
        dv.initDecimalDecimal(this.storeValue.div(value.storeValue));
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
Array.prototype.addObject = function () {
    return this.length;
};
Array.prototype.addObject = function (object) {
    this.push(object);
};
Array.prototype.removeObject = function (object) {
    var index = this.indexOf(object);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.removeObjectAtIndex = function (index) {
    this.splice(index, 1);
};
Array.prototype.indexOfObject = function (object) {
    return this.indexOf(object);
};
Array.prototype.containsObject = function (object) {
    var index = this.indexOf(object);
    return index > -1 ? true : false;
};
Array.prototype.objectAtIndex = function (index) {
    return this[index];
};
Object.defineProperty(Array.prototype, "count", {
    get: function () {
        return this.length;
    },
    enumerable: true,
    configurable: true
});
Array.prototype.firstObject = function () {
    return this[0];
};
Array.prototype.lastObject = function () {
    return this[this.count - 1];
};
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
                var sdf = new ISO8601DateFormatter();
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
        p.initFormatStringArgumentArrayOptional(format);
        return p;
    };
    NSPredicate.prototype.initFormatStringArgumentArrayOptional = function (format) {
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
    NSPredicate.prototype.evaluateWithObject = function (object) {
        return this.predicateGroup.evaluateObject(object[0]);
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
    NSSet.prototype.filteredSetUsingPredicate = function (predicate) {
        var objs = _NSPredicateFilterObjects(this._objects, predicate);
        return objs;
    };
    // Prevent KVO on special properties
    NSSet.prototype.addObserverForKeyPathOptionsContext = function (obs, keypath, context) {
        if (keypath == "count" || keypath == "length")
            throw new Error("NSSet: Can't observe count. It's not KVO Compilant");
        _super.prototype.addObserverForKeyPathOptionsContext.call(this, obs, keypath, context);
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
var Locale = /** @class */ (function (_super) {
    __extends(Locale, _super);
    function Locale() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.languageIdentifier = "es";
        _this.countryIdentifier = "ES";
        return _this;
    }
    Locale.currentLocale = function () {
        if (_NS_currentLocale == null) {
            _NS_currentLocale = new Locale();
            _NS_currentLocale.initIdentifierString("es_ES");
        }
        //return NSWebApplication.sharedInstance().currentLanguage;
        return _NS_currentLocale;
    };
    Locale._setCurrentLocale = function (localeIdentifier) {
        _NS_currentLocale = new Locale();
        _NS_currentLocale.initIdentifierString(localeIdentifier);
    };
    Locale.prototype.initIdentifierString = function (identifer) {
        var array = identifer.split("_");
        if (array.length == 1) {
            this.languageIdentifier = array[0];
        }
        else if (array.length == 2) {
            this.languageIdentifier = array[0];
            this.countryIdentifier = array[1];
        }
    };
    Object.defineProperty(Locale.prototype, "decimalSeparator", {
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
            return _injectIntoOptional(ds);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Locale.prototype, "currencySymbol", {
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
            return _injectIntoOptional(cs);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Locale.prototype, "currencyCode", {
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
            return _injectIntoOptional(cc);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Locale.prototype, "groupingSeparator", {
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
            return _injectIntoOptional(gs);
        },
        enumerable: true,
        configurable: true
    });
    return Locale;
}(NSObject));
 
var Formatter = /** @class */ (function (_super) {
    __extends(Formatter, _super);
    function Formatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Formatter.prototype.stringForObjectValue = function (value) {
        return value[0];
    };
    Formatter.prototype.getObjectValueForStringErrorDescription = function (str) {
    };
    Formatter.prototype.editingStringForObjectValue = function (value) {
    };
    Formatter.prototype.isPartialStringValidationEnabledNewEditingStringErrorDescription = function (str) {
        var newStr = "";
        return [false, newStr];
    };
    return Formatter;
}(NSObject));
 
var NSDateFormatterStyle;
(function (NSDateFormatterStyle) {
    NSDateFormatterStyle[NSDateFormatterStyle["NoStyle"] = 0] = "NoStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["ShortStyle"] = 1] = "ShortStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["MediumStyle"] = 2] = "MediumStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["LongStyle"] = 3] = "LongStyle";
    NSDateFormatterStyle[NSDateFormatterStyle["FullStyle"] = 4] = "FullStyle";
})(NSDateFormatterStyle || (NSDateFormatterStyle = {}));
var DateFormatter = /** @class */ (function (_super) {
    __extends(DateFormatter, _super);
    function DateFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dateStyle = NSDateFormatterStyle.ShortStyle;
        _this.timeStyle = NSDateFormatterStyle.ShortStyle;
        _this.browserDateSeparatorSymbol = null;
        return _this;
    }
    DateFormatter.prototype.init = function () {
        _super.prototype.init.call(this);
        var browser = MIOCoreGetPlatform();
        if (browser == MIOCorePlatformType.Safari)
            this.browserDateSeparatorSymbol = "/";
        else
            this.browserDateSeparatorSymbol = "-";
    };
    DateFormatter.prototype.dateFromString = function (str) {
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
    DateFormatter.prototype.stringFromDate = function (date) {
        return this.stringForObjectValue(date);
    };
    DateFormatter.prototype.stringForObjectValue = function (value) {
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
    DateFormatter.prototype.isPartialStringValidationEnabledNewEditingStringErrorDescription = function (str) {
        var _a;
        if (str.length == 0)
            return [true, str];
        var result, newStr;
        _a = this._parse(str), result = _a[0], newStr = _a[1];
        return [result, newStr];
    };
    DateFormatter.prototype._parse = function (str) {
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
    DateFormatter.prototype._parseDate = function (str) {
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
    DateFormatter.prototype._parseDay = function (ch, dd) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, dd];
        var v = parseInt(dd + ch);
        return [true, dd + ch];
    };
    DateFormatter.prototype._validateDay = function (dd) {
        var v = parseInt(dd);
        if (isNaN(v))
            return false;
        if (dd < 1 || dd > 31)
            return false;
        return true;
    };
    DateFormatter.prototype._parseMonth = function (ch, mm) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, mm];
        var v = parseInt(mm + ch);
        return [true, mm + ch];
    };
    DateFormatter.prototype._validateMonth = function (mm) {
        var v = parseInt(mm);
        if (isNaN(v))
            return false;
        if (v < 1 || v > 12)
            return false;
        return true;
    };
    DateFormatter.prototype._parseYear = function (ch, yy) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, yy];
        var v = parseInt(yy + ch);
        return [true, yy + ch];
    };
    DateFormatter.prototype._validateYear = function (yy) {
        var v = parseInt(yy);
        if (isNaN(yy) == true)
            return false;
        if (v > 3000)
            return false;
        return true;
    };
    DateFormatter.prototype.iso8601DateStyle = function (date) {
        var dd = date.getDate().toString();
        var mm = (date.getMonth() + 1).toString();
        var yy = date.getFullYear().toString();
        return yy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
    };
    DateFormatter.prototype._shortDateStyle = function (date, separatorString) {
        var separator = separatorString ? separatorString : "/";
        var d = date.getDate().toString();
        var m = (date.getMonth() + 1).toString();
        var y = date.getFullYear().toString();
        return (d[1] ? d : 0 + d) + separator + (m[1] ? m : "0" + m) + separator + y;
    };
    DateFormatter.prototype._fullDateStyle = function (date) {
        var day = _NSDateFormatterStringDays[date.getDay()];
        var month = _NSDateFormatterStringMonths[date.getMonth()];
        return day + ", " + month + " " + date.getDate() + ", " + date.getFullYear();
    };
    DateFormatter.prototype._parseTime = function (str) {
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
    DateFormatter.prototype._parseHour = function (ch, hh) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, hh];
        var v = parseInt(hh + ch);
        if (v < 0 || v > 23)
            return [false, hh];
        return [true, hh + ch];
    };
    DateFormatter.prototype._parseMinute = function (ch, mm) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, mm];
        var v = parseInt(mm + ch);
        if (v < 0 || v > 59)
            return [false, mm];
        return [true, mm + ch];
    };
    DateFormatter.prototype._parseSecond = function (ch, ss) {
        var c = parseInt(ch);
        if (isNaN(c))
            return [false, ss];
        var v = parseInt(ss + ch);
        if (v < 0 || v > 59)
            return [false, ss];
        return [true, ss + ch];
    };
    DateFormatter.prototype.iso8601TimeStyle = function (date) {
        var hh = date.getHours().toString();
        var mm = date.getMinutes().toString();
        var ss = date.getSeconds().toString();
        return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);
    };
    DateFormatter.prototype._shortTimeStyle = function (date) {
        var h = date.getHours().toString();
        var m = date.getMinutes().toString();
        return (h[1] ? h : "0" + h) + ":" + (m[1] ? m : "0" + m);
    };
    return DateFormatter;
}(Formatter));
 
var _NSDateFormatterStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var _NSDateFormatterStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var ISO8601DateFormatter = /** @class */ (function (_super) {
    __extends(ISO8601DateFormatter, _super);
    function ISO8601DateFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timeZone = _injectIntoOptional(null);
        return _this;
    }
    ISO8601DateFormatter.iso8601DateFormatter = function () {
        var df = new ISO8601DateFormatter();
        df.init();
        return df;
    };
    ISO8601DateFormatter.prototype.dateFromString = function (str) {
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
    ISO8601DateFormatter.prototype.stringFromDate = function (date) {
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
    return ISO8601DateFormatter;
}(DateFormatter));
 
var _NSNumberFormatterType;
(function (_NSNumberFormatterType) {
    _NSNumberFormatterType[_NSNumberFormatterType["Int"] = 0] = "Int";
    _NSNumberFormatterType[_NSNumberFormatterType["Decimal"] = 1] = "Decimal";
})(_NSNumberFormatterType || (_NSNumberFormatterType = {}));
var NumberFormatter = /** @class */ (function (_super) {
    __extends(NumberFormatter, _super);
    function NumberFormatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberStyle = NumberFormatter.Style.none;
        _this.locale = _injectIntoOptional(null);
        _this.minimumFractionDigits = 0;
        _this.maximumFractionDigits = 0;
        _this.groupingSeparator = _injectIntoOptional(null);
        _this.currencySymbol = _injectIntoOptional(null);
        _this.currencyCode = _injectIntoOptional(null);
        _this.currencyHasSpaces = true;
        _this.currencyIsRight = true;
        return _this;
    }
    NumberFormatter.prototype.init = function () {
        _super.prototype.init.call(this);
        this.locale = _injectIntoOptional(Locale.currentLocale());
        this.groupingSeparator = _injectIntoOptional(this.locale[0].groupingSeparator[0]);
        this.currencySymbol = _injectIntoOptional(this.locale[0].currencySymbol[0]);
        this.currencyCode = _injectIntoOptional(this.locale[0].currencyCode[0]);
        switch (this.locale[0].countryIdentifier) {
            case "US":
                this.currencyHasSpaces = false;
                this.currencyIsRight = false;
                break;
        }
    };
    NumberFormatter.prototype.numberFromString = function (str) {
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
    NumberFormatter.prototype.stringFrom = function (number) {
        return _injectIntoOptional(this.stringForObjectValue(number)); //TODO automatically refactor function results
    };
    NumberFormatter.prototype.stringForObjectValue = function (value) {
        var _a;
        var number = value;
        if (number == null)
            number = NSNumber.numberWithFloat(0);
        var str = number.floatValue.toString();
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
                    res += this.groupingSeparator[0];
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
            res += this.locale[0].decimalSeparator[0];
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
        if (this.numberStyle.rawValue == NumberFormatter.Style.percent.rawValue)
            res += "%";
        res = this.stringByAppendingCurrencyString(res);
        return res;
    };
    NumberFormatter.prototype.round = function (intValue, floatValue) {
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
    NumberFormatter.prototype.stringByAppendingCurrencyString = function (text) {
        var currency = "";
        if (this.numberStyle.rawValue == NumberFormatter.Style.currency.rawValue) {
            currency = this.currencySymbol[0];
            if (currency.length == 0)
                currency = this.currencyCode[0]; // If there's no symbol, add the code instead.
        }
        else if (this.numberStyle.rawValue == NumberFormatter.Style.currencyISOCode.rawValue)
            currency = this.currencyCode[0];
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
    NumberFormatter.prototype.isPartialStringValidationEnabledNewEditingStringErrorDescription = function (str) {
        var _a;
        if (str.length == 0)
            return [true, str];
        var result, newStr;
        _a = this._parse(str), result = _a[0], newStr = _a[1];
        return [result, newStr];
    };
    NumberFormatter.prototype._parse = function (str) {
        var number = 0;
        var parseString = "";
        var numberString = "";
        var type = _NSNumberFormatterType.Int;
        var minusSymbol = false;
        var percentSymbol = false;
        for (var index = 0; index < str.length; index++) {
            var ch = str[index];
            if (ch == this.locale[0].decimalSeparator[0] && type != _NSNumberFormatterType.Decimal) {
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
                && this.numberStyle.rawValue == NumberFormatter.Style.percent.rawValue
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
    NumberFormatter.Style = /** @class */ (function () {
        function class_1() {
        }
        Object.defineProperty(class_1, "none", {
            get: function () { return Object.assign(new NumberFormatter.Style(), { rawValue: 0 }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_1, "decimal", {
            get: function () { return Object.assign(new NumberFormatter.Style(), { rawValue: 1 }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_1, "currency", {
            get: function () { return Object.assign(new NumberFormatter.Style(), { rawValue: 2 }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_1, "currencyISOCode", {
            get: function () { return Object.assign(new NumberFormatter.Style(), { rawValue: 3 }); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(class_1, "percent", {
            get: function () { return Object.assign(new NumberFormatter.Style(), { rawValue: 4 }); },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }());
    return NumberFormatter;
}(Formatter));
 
/**
 * Created by godshadow on 21/3/16.
 */
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._timerInterval = 0;
        _this._repeat = false;
        _this._target = null;
        _this._completion = null;
        _this._coreTimer = null;
        return _this;
    }
    Timer.scheduledTimerWithTimeInterval = function (timeInterval, repeat, target, completion) {
        var timer = new Timer();
        timer.initTimeIntervalTimeIntervalRepeatsBoolBlockfunction_type(timeInterval, repeat, target, completion);
        timer.fire();
        return timer;
    };
    Timer.prototype.initTimeIntervalTimeIntervalRepeatsBoolBlockfunction_type = function (timeInterval, repeat, target, completion) {
        this._timerInterval = timeInterval;
        this._repeat = repeat;
        this._target = target;
        this._completion = completion;
    };
    Timer.prototype.fire = function () {
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
    Timer.prototype.invalidate = function () {
        if (this._repeat)
            clearInterval(this._coreTimer);
        else
            clearTimeout(this._coreTimer);
    };
    Timer.prototype._timerCallback = function () {
        if (this._target != null && this._completion != null)
            this._completion.call(this._target, this);
        if (this._repeat == true)
            this.invalidate();
    };
    return Timer;
}(NSObject));
 
/**
 * Created by godshadow on 11/3/16.
 */
var NSNotification = /** @class */ (function () {
    function NSNotification(name, object, userInfo) {
        this.name = null;
        this.object = _injectIntoOptional(null);
        this.userInfo = _injectIntoOptional(null);
        this.name = name;
        this.object = _injectIntoOptional(object);
        this.userInfo = _injectIntoOptional(userInfo);
    }
    return NSNotification;
}());
 
var NotificationCenter = /** @class */ (function () {
    function NotificationCenter() {
        this.notificationNames = {};
        if (NotificationCenter._sharedInstance) {
            throw new Error("Error: Instantiation failed: Use defaultCenter() instead of new.");
        }
        NotificationCenter._sharedInstance = this;
    }
    NotificationCenter.defaultCenter = function () {
        return NotificationCenter._sharedInstance;
    };
    NotificationCenter.prototype.addObserverForNameObjectQueueUsingBlock = function (obs, name, fn) {
        var notes = this.notificationNames[name[0]];
        if (notes == null) {
            notes = [];
        }
        var item = { "observer": obs[0], "function": fn[0] };
        notes.push(item);
        this.notificationNames[name[0]] = notes;
    };
    ;
    NotificationCenter.prototype.removeObserver = function (obs, name) {
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
    NotificationCenter.prototype.postNotification = function (name, object, userInfo) {
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
    NotificationCenter._sharedInstance = new NotificationCenter();
    return NotificationCenter;
}());
 
/**
 * Created by godshadow on 29/09/2016.
 */
var UserDefaults = /** @class */ (function () {
    function UserDefaults() {
        if (UserDefaults._sharedInstance) {
            throw new Error("Error: Instantiation failed: Use standardUserDefaults() instead of new.");
        }
        UserDefaults._sharedInstance = this;
    }
    UserDefaults.standardUserDefaults = function () {
        return UserDefaults._sharedInstance;
    };
    UserDefaults.prototype.setBoolForKey = function (key, value) {
        var v = value ? "1" : "0";
        this.setForKey(key, v);
    };
    UserDefaults.prototype.booleanForKey = function (key) {
        var v = this.valueForKey(key);
        return v == "1" ? true : false;
    };
    UserDefaults.prototype.setForKey = function (key, value) {
        localStorage.setItem(key[0], value);
    };
    UserDefaults.prototype.valueForKey = function (key) {
        return localStorage.getItem(key);
    };
    UserDefaults.prototype.removeObjectForKey = function (key) {
        localStorage.removeItem(key);
    };
    UserDefaults._sharedInstance = new UserDefaults();
    return UserDefaults;
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
        _this.baseURL = _injectIntoOptional(null);
        _this.absoluteString = _injectIntoOptional(null);
        _this.scheme = _injectIntoOptional(null);
        _this.user = _injectIntoOptional(null);
        _this.password = null;
        _this.host = _injectIntoOptional(null);
        _this.port = _injectIntoOptional(0);
        _this.hostname = null;
        _this.path = _injectIntoOptional("/");
        _this.file = null;
        _this.pathExtension = _injectIntoOptional(null);
        _this.params = [];
        return _this;
    }
    NSURL.urlWithString = function (urlString) {
        var url = new NSURL();
        url.initStringString(urlString);
        return url;
    };
    NSURL.prototype.initSchemeStringHostOptionalPathString = function (scheme, host, path) {
        _super.prototype.init.call(this);
        this.scheme = _injectIntoOptional(scheme);
        this.host = _injectIntoOptional(host[0]);
        this.path = _injectIntoOptional(path);
        this.absoluteString = _injectIntoOptional("");
        if (scheme.length > 0)
            this.absoluteString[0] += scheme + "://";
        if (host[0].length > 0)
            this.absoluteString[0] += host[0] + "/";
        if (path.length > 0)
            this.absoluteString[0] += path;
    };
    NSURL.prototype.initStringString = function (urlString) {
        _super.prototype.init.call(this);
        this.absoluteString = _injectIntoOptional(urlString);
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
                    this.scheme = _injectIntoOptional(token);
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
                        this.host = _injectIntoOptional(this.hostname + ":" + token);
                        this.port = _injectIntoOptional(parseInt(token));
                    }
                    else {
                        this.host = _injectIntoOptional(token);
                        this.hostname = token;
                    }
                    step = NSURLTokenType.Path;
                }
                else {
                    this.path[0] += token + ch;
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
                    this.pathExtension = _injectIntoOptional(token);
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
                    this.pathExtension = _injectIntoOptional(token);
                }
                else
                    this.path[0] += token;
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
        var urlString = this.scheme[0] + "://" + this.host[0] + this.path[0];
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
        _this.url = _injectIntoOptional(null);
        _this.httpMethod = _injectIntoOptional("GET");
        _this.httpBody = _injectIntoOptional(null);
        _this.headers = [];
        _this.binary = false;
        _this.download = false;
        return _this;
    }
    NSURLRequest.requestWithURL = function (url) {
        var request = new NSURLRequest();
        request.initUrlURL(url);
        return request;
    };
    NSURLRequest.prototype.initUrlURL = function (url) {
        this.url = _injectIntoOptional(url);
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
        _http_request(this, this.request.url[0].absoluteString[0], this.request.headers, this.request.httpMethod[0], this.request.httpBody[0], this.request.binary, this.delegate, this.blockTarget, this.blockFN, this.request.download);
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
var XMLTokenType;
(function (XMLTokenType) {
    XMLTokenType[XMLTokenType["Identifier"] = 0] = "Identifier";
    XMLTokenType[XMLTokenType["QuestionMark"] = 1] = "QuestionMark";
    XMLTokenType[XMLTokenType["ExclamationMark"] = 2] = "ExclamationMark";
    XMLTokenType[XMLTokenType["OpenTag"] = 3] = "OpenTag";
    XMLTokenType[XMLTokenType["CloseTag"] = 4] = "CloseTag";
    XMLTokenType[XMLTokenType["Slash"] = 5] = "Slash";
    XMLTokenType[XMLTokenType["Quote"] = 6] = "Quote";
    XMLTokenType[XMLTokenType["WhiteSpace"] = 7] = "WhiteSpace";
    XMLTokenType[XMLTokenType["End"] = 8] = "End";
})(XMLTokenType || (XMLTokenType = {}));
var XMLParser = /** @class */ (function (_super) {
    __extends(XMLParser, _super);
    function XMLParser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.str = null;
        _this.delegate = _injectIntoOptional(null);
        _this.strIndex = 0;
        _this.elements = [];
        _this.attributes = null;
        _this.currentElement = null;
        _this.currentTokenValue = null;
        _this.lastTokenValue = null;
        _this.ignoreWhiteSpace = false;
        return _this;
    }
    XMLParser.prototype.initWithString = function (str, delegate) {
        this.str = str;
        this.delegate = _injectIntoOptional(delegate);
    };
    // LEXER / TOKENIZER
    XMLParser.prototype.nextChar = function () {
        if (this.strIndex >= this.str.length)
            return null;
        var ch = this.str.charAt(this.strIndex);
        this.strIndex++;
        return ch;
    };
    XMLParser.prototype.prevChar = function () {
        this.strIndex--;
        return this.str.charAt(this.strIndex);
    };
    XMLParser.prototype.readToken = function () {
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
    XMLParser.prototype.nextToken = function () {
        this.lastTokenValue = this.currentTokenValue;
        var exit = false;
        var token = XMLTokenType.Identifier;
        var value = this.readToken();
        if (value == null)
            return [XMLTokenType.End, null];
        switch (value) {
            case "<":
                token = XMLTokenType.OpenTag;
                break;
            case ">":
                token = XMLTokenType.CloseTag;
                break;
            case "/":
                token = XMLTokenType.Slash;
                break;
            case "?":
                token = XMLTokenType.QuestionMark;
                break;
            case "!":
                token = XMLTokenType.ExclamationMark;
                break;
            case " ":
                token = XMLTokenType.WhiteSpace;
                break;
            default:
                break;
        }
        this.currentTokenValue = token;
        return [token, value];
    };
    XMLParser.prototype.prevToken = function () {
        return this.lastTokenValue;
    };
    //
    // Parser
    //
    XMLParser.prototype.parse = function () {
        //console.log("**** Start parser")
        var _a, _b;
        if (typeof this.delegate[0].parserDidStartDocument === "function")
            this.delegate[0].parserDidStartDocument(this);
        var token, value;
        _a = this.nextToken(), token = _a[0], value = _a[1];
        while (token != XMLTokenType.End) {
            switch (token) {
                case XMLTokenType.OpenTag:
                    this.ignoreWhiteSpace = true;
                    this.openTag();
                    this.ignoreWhiteSpace = false;
                    break;
                case XMLTokenType.Identifier:
                case XMLTokenType.Slash:
                case XMLTokenType.WhiteSpace:
                    this.text(value);
                    break;
                default:
                    break;
            }
            _b = this.nextToken(), token = _b[0], value = _b[1];
        }
        //console.log("**** End parser")
        if (typeof this.delegate[0].parserDidEndDocument === "function")
            this.delegate[0].parserDidEndDocument(this);
    };
    XMLParser.prototype.openTag = function () {
        //console.log("Open Tag");
        var _a;
        this.attributes = {};
        var token, value;
        _a = this.nextToken(), token = _a[0], value = _a[1];
        switch (token) {
            case XMLTokenType.Identifier:
                this.beginElement(value);
                break;
            case XMLTokenType.QuestionMark:
                this.questionMark();
                break;
            case XMLTokenType.ExclamationMark:
                this.exclamationMark();
                break;
            case XMLTokenType.Slash:
                this.slash();
                break;
            default:
                this.error("Expected: element");
                break;
        }
    };
    XMLParser.prototype.questionMark = function () {
        var _a;
        //console.log("Question mark");
        var token, val;
        _a = this.nextToken(), token = _a[0], val = _a[1];
        switch (token) {
            case XMLTokenType.Identifier:
                this.xmlOpenTag(val);
                break;
            case XMLTokenType.CloseTag:
                this.xmlCloseTag();
                break;
            default:
                break;
        }
    };
    XMLParser.prototype.exclamationMark = function () {
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
    XMLParser.prototype.xmlOpenTag = function (value) {
        //console.log("XML open tag");
        var _a;
        var token, val;
        _a = this.nextToken(), token = _a[0], val = _a[1];
        switch (token) {
            case XMLTokenType.Identifier:
                this.attribute(val);
                break;
            case XMLTokenType.QuestionMark:
                this.questionMark();
                break;
            default:
                break;
        }
    };
    XMLParser.prototype.xmlCloseTag = function () {
        //console.log("XML close tag");
    };
    XMLParser.prototype.beginElement = function (value) {
        //console.log("Begin Element: " + value);
        var _a;
        this.elements.push(value);
        this.currentElement = value;
        this.attributes = {};
        var token, val;
        _a = this.nextToken(), token = _a[0], val = _a[1];
        switch (token) {
            case XMLTokenType.Identifier:
                this.attribute(val);
                break;
            case XMLTokenType.Slash:
                this.slash();
                break;
            case XMLTokenType.CloseTag:
                this.closeTag();
                this.didStartElement();
                break;
            default:
                break;
        }
    };
    XMLParser.prototype.endElement = function (value) {
        //console.log("End Element: " + value);
        var _a;
        //this.elements.push(value);
        this.attributes = {};
        this.currentElement = null;
        var token, val;
        _a = this.nextToken(), token = _a[0], val = _a[1];
        switch (token) {
            case XMLTokenType.CloseTag:
                this.closeTag();
                this.didEndElement();
                break;
            default:
                this.error("Expected: close token");
                break;
        }
    };
    XMLParser.prototype.attribute = function (attr) {
        //console.log("Attribute: " + attr);
        var _a;
        this.decodeAttribute(attr);
        var token, value;
        _a = this.nextToken(), token = _a[0], value = _a[1];
        switch (token) {
            case XMLTokenType.Identifier:
                this.attribute(value);
                break;
            case XMLTokenType.Slash:
                this.slash();
                break;
            case XMLTokenType.QuestionMark:
                this.questionMark();
                break;
            case XMLTokenType.CloseTag:
                this.closeTag();
                this.didStartElement();
                break;
            default:
                break;
        }
    };
    XMLParser.prototype.decodeAttribute = function (attr) {
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
    XMLParser.prototype.slash = function () {
        var _a;
        var token, value;
        _a = this.nextToken(), token = _a[0], value = _a[1];
        switch (token) {
            case XMLTokenType.CloseTag:
                this.closeTag();
                this.didStartElement();
                this.didEndElement();
                break;
            case XMLTokenType.Identifier:
                this.endElement(value);
                break;
            default:
                break;
        }
    };
    XMLParser.prototype.closeTag = function () {
        //console.log("Close Tag");
    };
    XMLParser.prototype.didStartElement = function () {
        var element = this.currentElement;
        //console.log("Start Element: " + element);
        if (typeof this.delegate[0].parserDidStartElementNamespaceURIQualifiedNameAttributes === "function")
            this.delegate[0].parserDidStartElementNamespaceURIQualifiedNameAttributes(this, element, this.attributes);
        this.currentElement = null;
        this.attributes = {};
    };
    XMLParser.prototype.didEndElement = function () {
        var element = this.elements.pop();
        //console.log("End Element " + element);        
        if (typeof this.delegate[0].parserDidEndElementNamespaceURIQualifiedName === "function")
            this.delegate[0].parserDidEndElementNamespaceURIQualifiedName(this, element);
    };
    XMLParser.prototype.text = function (value) {
        //console.log("Text: " + value);
        if (typeof this.delegate[0].parserFoundCharacters === "function")
            this.delegate[0].parserFoundCharacters(this, value);
    };
    XMLParser.prototype.comments = function (comment) {
        if (typeof this.delegate[0].parserFoundComment === "function")
            this.delegate[0].parserFoundComment(this, comment);
    };
    XMLParser.prototype.error = function (expected) {
        NSLog("Error: Unexpected token. " + expected);
    };
    return XMLParser;
}(NSObject));
 
var Operation = /** @class */ (function (_super) {
    __extends(Operation, _super);
    function Operation() {
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
    Object.defineProperty(Operation.prototype, "dependencies", {
        get: function () { return this._dependencies; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Operation.prototype, "isExecuting", {
        get: function () { return this.executing(); },
        enumerable: true,
        configurable: true
    });
    Operation.prototype.setExecuting = function (value) {
        if (value == this._isExecuting)
            return;
        this.willChangeValue("isExecuting");
        this._isExecuting = value;
        this.didChangeValue("isExecuting");
    };
    Object.defineProperty(Operation.prototype, "isFinished", {
        get: function () { return this.finished(); },
        enumerable: true,
        configurable: true
    });
    Operation.prototype.setFinished = function (value) {
        if (value == this._isFinished)
            return;
        this.willChangeValue("isFinished");
        this._isFinished = value;
        this.didChangeValue("isFinished");
    };
    Operation.prototype.setReady = function (value) {
        if (value == this._ready)
            return;
        this.willChangeValue("ready");
        this._ready = value;
        this.didChangeValue("ready");
    };
    Object.defineProperty(Operation.prototype, "ready", {
        get: function () {
            return this._ready;
        },
        enumerable: true,
        configurable: true
    });
    Operation.prototype.addDependency = function (operation) {
        this._dependencies.push(operation);
        if (operation.isFinished == false) {
            operation.addObserverForKeyPathOptionsContext(this, "isFinished");
            this.setReady(false);
        }
    };
    // Non concurrent task
    Operation.prototype.main = function () { };
    // Concurrent task
    Operation.prototype.start = function () {
        this.setExecuting(true);
        this.main();
        this.setExecuting(false);
        this.setFinished(true);
    };
    Operation.prototype.executing = function () {
        return this._isExecuting;
    };
    Operation.prototype.finished = function () {
        return this._isFinished;
    };
    Operation.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
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
    Operation.prototype.checkDependecies = function () {
        for (var index = 0; index < this._dependencies.length; index++) {
            var op = this._dependencies[index];
            if (op.isFinished == false)
                return;
        }
        // So if we are in this point, means every dependecy is finished
        // and we can start our own task
        this.setReady(true);
    };
    return Operation;
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
}(Operation));
var OperationQueue = /** @class */ (function (_super) {
    __extends(OperationQueue, _super);
    function OperationQueue() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._operations = [];
        _this._suspended = false;
        return _this;
    }
    OperationQueue.prototype.addOperation = function (operation) {
        if (operation.isFinished == true) {
            throw new Error("NSOperationQueue: Tying to add an operation already finished");
        }
        this.willChangeValue("operationCount");
        this.willChangeValue("operations");
        this._operations.addObject(operation);
        this.didChangeValue("operationCount");
        this.didChangeValue("operations");
        if (operation.ready == false) {
            operation.addObserverForKeyPathOptionsContext(this, "ready", null);
        }
        else {
            operation.addObserverForKeyPathOptionsContext(this, "isFinished", null);
            if (this.suspended == false)
                operation.start();
        }
    };
    OperationQueue.prototype.removeOperation = function (operation) {
        var index = this._operations.indexOf(operation);
        if (index == -1)
            return;
        this.willChangeValue("operationCount");
        this.willChangeValue("operations");
        this._operations.splice(index, 1);
        this.didChangeValue("operationCount");
        this.didChangeValue("operations");
    };
    Object.defineProperty(OperationQueue.prototype, "operations", {
        get: function () {
            return this._operations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationQueue.prototype, "operationCount", {
        get: function () {
            return this._operations.count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperationQueue.prototype, "suspended", {
        get: function () {
            return this._suspended;
        },
        set: function (value) {
            this.setSupended(value);
        },
        enumerable: true,
        configurable: true
    });
    OperationQueue.prototype.setSupended = function (value) {
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
    OperationQueue.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
        if (type != "did")
            return;
        if (keyPath == "ready") {
            var op = object;
            if (op.ready == true) {
                op.removeObserver(this, "ready");
                op.addObserverForKeyPathOptionsContext(this, "isFinished", null);
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
    return OperationQueue;
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
        _this.key = _injectIntoOptional(null);
        _this.ascending = false;
        return _this;
    }
    NSSortDescriptor.sortDescriptorWithKey = function (key, ascending) {
        var sd = new NSSortDescriptor();
        sd.initKeyOptionalAscendingBool(key, ascending);
        return sd;
    };
    NSSortDescriptor.prototype.initKeyOptionalAscendingBool = function (key, ascending) {
        this.key = _injectIntoOptional(key[0]);
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
var PropertyListFormat;
(function (PropertyListFormat) {
    PropertyListFormat[PropertyListFormat["OpenStepFormat"] = 0] = "OpenStepFormat";
    PropertyListFormat[PropertyListFormat["XMLFormat_v1_0"] = 1] = "XMLFormat_v1_0";
    PropertyListFormat[PropertyListFormat["BinaryFormat_v1_0"] = 2] = "BinaryFormat_v1_0";
})(PropertyListFormat || (PropertyListFormat = {}));
var PropertyListReadOptions;
(function (PropertyListReadOptions) {
    PropertyListReadOptions[PropertyListReadOptions["None"] = 0] = "None";
})(PropertyListReadOptions || (PropertyListReadOptions = {}));
var PropertyListWriteOptions;
(function (PropertyListWriteOptions) {
    PropertyListWriteOptions[PropertyListWriteOptions["None"] = 0] = "None";
})(PropertyListWriteOptions || (PropertyListWriteOptions = {}));
var PropertyListSerialization = /** @class */ (function (_super) {
    __extends(PropertyListSerialization, _super);
    function PropertyListSerialization() {
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
    PropertyListSerialization.propertyListWithData = function (data, options, format, error) {
        var pl = new PropertyListSerialization();
        pl.initWithData(data, options, format);
        var item = pl.parseData(error);
        return item;
    };
    PropertyListSerialization.dataWithpropertyList = function (plist, format, options, error) {
        var pl = new PropertyListSerialization();
        pl.initWithObject(plist, options, format);
        var data = pl.parsePList(error);
        return data;
    };
    PropertyListSerialization.prototype.initWithData = function (data, options, format) {
        _super.prototype.init.call(this);
        this.data = data;
    };
    PropertyListSerialization.prototype.initWithObject = function (plist, options, format) {
        _super.prototype.init.call(this);
        this.plist = plist;
    };
    PropertyListSerialization.prototype.parseData = function (error) {
        this.currentElement = null;
        var parser = new XMLParser();
        parser.initWithString(this.data, this);
        parser.parse();
        return this.rootItem;
    };
    PropertyListSerialization.prototype.parserDidStartElement = function (parser, element, attributes) {
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
    PropertyListSerialization.prototype.parserFoundCharacters = function (parser, characters) {
        this.currentString += characters;
    };
    PropertyListSerialization.prototype.parserDidEndElement = function (parser, element) {
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
    PropertyListSerialization.prototype.parserDidEndDocument = function (parser) {
    };
    PropertyListSerialization.prototype.parsePList = function (error) {
        this.contentString = '<?xml version="1.0" encoding="UTF-8"?>';
        this.contentString += '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">';
        this.contentString += '<plist version="1.0">';
        this.parseObject(this.plist);
        this.contentString += '</plist>';
        return this.contentString;
    };
    PropertyListSerialization.prototype.parseObject = function (object) {
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
    PropertyListSerialization.prototype.parseString = function (object) {
        this.contentString += "<string>";
        this.contentString += object;
        this.contentString += "</string>";
    };
    PropertyListSerialization.prototype.parseNumber = function (object) {
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
    PropertyListSerialization.prototype.parseArray = function (objects) {
        this.contentString += "<array>";
        for (var index = 0; index < objects.length; index++) {
            var obj = objects[index];
            this.parseObject(obj);
        }
        this.contentString += "</array>";
    };
    PropertyListSerialization.prototype.parseDictionary = function (objects) {
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
    return PropertyListSerialization;
}(NSObject));
 
//# sourceMappingURL=foundation.web.js.map