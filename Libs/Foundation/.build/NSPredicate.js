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
var NSCore_1 = require("../NSCore");
var NSObject_1 = require("./NSObject");
var NSISO8601DateFormatter_1 = require("./NSISO8601DateFormatter");
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
})(NSPredicateComparatorType = exports.NSPredicateComparatorType || (exports.NSPredicateComparatorType = {}));
var NSPredicateRelationshipOperatorType;
(function (NSPredicateRelationshipOperatorType) {
    NSPredicateRelationshipOperatorType[NSPredicateRelationshipOperatorType["ANY"] = 0] = "ANY";
    NSPredicateRelationshipOperatorType[NSPredicateRelationshipOperatorType["ALL"] = 1] = "ALL";
})(NSPredicateRelationshipOperatorType = exports.NSPredicateRelationshipOperatorType || (exports.NSPredicateRelationshipOperatorType = {}));
var NSPredicateOperatorType;
(function (NSPredicateOperatorType) {
    NSPredicateOperatorType[NSPredicateOperatorType["OR"] = 0] = "OR";
    NSPredicateOperatorType[NSPredicateOperatorType["AND"] = 1] = "AND";
})(NSPredicateOperatorType = exports.NSPredicateOperatorType || (exports.NSPredicateOperatorType = {}));
var NSPredicateBitwiseOperatorType;
(function (NSPredicateBitwiseOperatorType) {
    NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["OR"] = 0] = "OR";
    NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["AND"] = 1] = "AND";
    NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["XOR"] = 2] = "XOR";
})(NSPredicateBitwiseOperatorType = exports.NSPredicateBitwiseOperatorType || (exports.NSPredicateBitwiseOperatorType = {}));
var NSPredicateType;
(function (NSPredicateType) {
    NSPredicateType[NSPredicateType["Predicate"] = 0] = "Predicate";
    NSPredicateType[NSPredicateType["Item"] = 1] = "Item";
    NSPredicateType[NSPredicateType["Operation"] = 2] = "Operation";
})(NSPredicateType = exports.NSPredicateType || (exports.NSPredicateType = {}));
var NSPredicateOperator = (function () {
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
exports.NSPredicateOperator = NSPredicateOperator;
var NSPredicateItemValueType;
(function (NSPredicateItemValueType) {
    NSPredicateItemValueType[NSPredicateItemValueType["Undefined"] = 0] = "Undefined";
    NSPredicateItemValueType[NSPredicateItemValueType["UUID"] = 1] = "UUID";
    NSPredicateItemValueType[NSPredicateItemValueType["String"] = 2] = "String";
    NSPredicateItemValueType[NSPredicateItemValueType["Number"] = 3] = "Number";
    NSPredicateItemValueType[NSPredicateItemValueType["Boolean"] = 4] = "Boolean";
    NSPredicateItemValueType[NSPredicateItemValueType["Null"] = 5] = "Null";
    NSPredicateItemValueType[NSPredicateItemValueType["Property"] = 6] = "Property";
})(NSPredicateItemValueType = exports.NSPredicateItemValueType || (exports.NSPredicateItemValueType = {}));
var NSPredicateItem = (function () {
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
            if (object instanceof NSObject_1.NSObject) {
                lValue = object.valueForKeyPath(k);
            }
            else {
                lValue = object[k];
            }
            if (lValue instanceof Date) {
                var sdf = new NSISO8601DateFormatter_1.NSISO8601DateFormatter();
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
exports.NSPredicateItem = NSPredicateItem;
var NSPredicateGroup = (function () {
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
exports.NSPredicateGroup = NSPredicateGroup;
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
})(NSPredicateTokenType = exports.NSPredicateTokenType || (exports.NSPredicateTokenType = {}));
var NSPredicate = (function (_super) {
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
    NSPredicate.prototype.tokenizeWithFormat = function (format) {
        this.lexer = new NSCore_1.NSCoreLexer(format);
        this.lexer.addTokenType(NSPredicateTokenType.UUIDValue, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
        this.lexer.addTokenType(NSPredicateTokenType.StringValue, /^"([^"]*)"|^'([^']*)'/);
        this.lexer.addTokenType(NSPredicateTokenType.NumberValue, /^-?\d+(?:\.\d+)?(?:e[+\-]?\d+)?/i);
        this.lexer.addTokenType(NSPredicateTokenType.BooleanValue, /^(true|false)/i);
        this.lexer.addTokenType(NSPredicateTokenType.NullValue, /^(null|nil)/i);
        this.lexer.addTokenType(NSPredicateTokenType.OpenParenthesisSymbol, /^\(/);
        this.lexer.addTokenType(NSPredicateTokenType.CloseParenthesisSymbol, /^\)/);
        this.lexer.addTokenType(NSPredicateTokenType.MinorOrEqualComparator, /^<=/);
        this.lexer.addTokenType(NSPredicateTokenType.MinorComparator, /^</);
        this.lexer.addTokenType(NSPredicateTokenType.MajorOrEqualComparator, /^>=/);
        this.lexer.addTokenType(NSPredicateTokenType.MajorComparator, /^>/);
        this.lexer.addTokenType(NSPredicateTokenType.EqualComparator, /^==?/);
        this.lexer.addTokenType(NSPredicateTokenType.DistinctComparator, /^!=/);
        this.lexer.addTokenType(NSPredicateTokenType.NotContainsComparator, /^not contains /i);
        this.lexer.addTokenType(NSPredicateTokenType.ContainsComparator, /^contains /i);
        this.lexer.addTokenType(NSPredicateTokenType.InComparator, /^in /i);
        this.lexer.addTokenType(NSPredicateTokenType.BitwiseAND, /^& /i);
        this.lexer.addTokenType(NSPredicateTokenType.BitwiseOR, /^\| /i);
        this.lexer.addTokenType(NSPredicateTokenType.AND, /^(and|&&) /i);
        this.lexer.addTokenType(NSPredicateTokenType.OR, /^(or|\|\|) /i);
        this.lexer.addTokenType(NSPredicateTokenType.ANY, /^any /i);
        this.lexer.addTokenType(NSPredicateTokenType.ALL, /^all /i);
        this.lexer.addTokenType(NSPredicateTokenType.Whitespace, /^\s+/);
        this.lexer.ignoreTokenType(NSPredicateTokenType.Whitespace);
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
}(NSObject_1.NSObject));
exports.NSPredicate = NSPredicate;
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
exports._NSPredicateFilterObjects = _NSPredicateFilterObjects;
//# sourceMappingURL=NSPredicate.js.map