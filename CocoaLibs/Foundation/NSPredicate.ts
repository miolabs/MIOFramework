import { NSCoreLexer } from "../NSCore";
import { NSObject } from "./NSObject";
import { NSISO8601DateFormatter } from "./NSISO8601DateFormatter";

/**
 * Created by godshadow on 1/5/16.
 */

export enum NSPredicateComparatorType {
    Equal,
    Less,
    LessOrEqual,
    Greater,
    GreaterOrEqual,
    Distinct,    
    Contains,
    NotContains,
    In,
    NotIn
}

export enum NSPredicateOperatorType {
    OR,
    AND
}

export enum NSPredicateType {
    Predicate,
    Item,
    Operation
}

export class NSPredicateOperator {
    type = null;

    public static andPredicateOperatorType() {
        var op = new NSPredicateOperator(NSPredicateOperatorType.AND);
        return op;
    }

    public static orPredicateOperatorType() {
        var op = new NSPredicateOperator(NSPredicateOperatorType.OR);
        return op;
    }

    constructor(type) {
        this.type = type;
    }
}

export enum NSPredicateItemValueType {
    
    Undefined,
    UUID,
    String,
    Number,
    Boolean,    
    Null,
    Property
}

export class NSPredicateItem {
    key = null;
    comparator = null;
    value = null;
    valueType = NSPredicateItemValueType.Undefined;

    evaluateObject(object) {

        let lValue = null;
        if (object instanceof NSObject) {
            lValue = object.valueForKeyPath(this.key);
        }
        else {
            lValue = object[this.key];
        }
        
        if (lValue instanceof Date) {
            let sdf = new NSISO8601DateFormatter();
            sdf.init();
            lValue = sdf.stringFromDate(lValue);
        }
        else if (typeof lValue === "string") {
            lValue = lValue.toLocaleLowerCase();
        }

        let rValue = this.value;
        if (this.valueType == NSPredicateItemValueType.Property){
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
    }
}

export class NSPredicateGroup {

    predicates = [];

    evaluateObject(object):boolean {
        
        var result = false;
        var op = null;
        var lastResult = null;

        for (var count = 0; count < this.predicates.length; count++) {
            var o = this.predicates[count];

            if (o instanceof NSPredicateGroup) {
                result = o.evaluateObject(object);
            }
            else if (o instanceof NSPredicateItem) {
                result = o.evaluateObject(object);
            }
            else if (o instanceof NSPredicateOperator) {
                op = o.type;
                lastResult = result;
                result = null;
            }
            else {
                throw new Error(`NSPredicate: Error. Predicate class type invalid. (${o})`);
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
    }
}

export enum NSPredicateTokenType{
    Identifier,
    
    UUIDValue,
    StringValue,
    NumberValue,
    BooleanValue,    
    NullValue,
    PropertyValue,

    MinorOrEqualComparator,
    MinorComparator,
    MajorOrEqualComparator,
    MajorComparator,
    EqualComparator,
    DistinctComparator,
    ContainsComparator,
    NotContainsComparator,
    InComparator,
    NotIntComparator,
    
    OpenParenthesisSymbol,
    CloseParenthesisSymbol,
    Whitespace,

    AND,
    OR
}

export class NSPredicate extends NSObject {
     
    predicateGroup = null;    

    private lexer:NSCoreLexer = null;

    public static predicateWithFormat(format) {
        let p = new NSPredicate();
        p.initWithFormat(format);

        return p;
    }

    initWithFormat(format) {
        this._predicateFormat = format;
        this.parse(format);
    }

    private _predicateFormat:string = null;
    get predicateFormat(){
        return this._predicateFormat;
    }

    evaluateObject(object:NSObject) {        
        return this.predicateGroup.evaluateObject(object);
    }

    // 
    // Parse format string
    //

    private tokenizeWithFormat(format:string){
        
        this.lexer = new NSCoreLexer(format);
        
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
        // Join operators
        this.lexer.addTokenType(NSPredicateTokenType.AND, /^(and|&&) /i);
        this.lexer.addTokenType(NSPredicateTokenType.OR, /^(or|\|\|) /i);        
        // Extra
        this.lexer.addTokenType(NSPredicateTokenType.Whitespace, /^\s+/);        
        this.lexer.ignoreTokenType(NSPredicateTokenType.Whitespace);
        // Identifiers - Has to be the last one
        this.lexer.addTokenType(NSPredicateTokenType.Identifier, /^[a-zA-Z-_][a-zA-Z0-9-_\.]*/);            

        this.lexer.tokenize();
    }    

    private parse(format:string){

        console.log("**** Start predicate format parser")
        console.log(format);
        console.log("****")
        
        this.tokenizeWithFormat(format);
        this.predicateGroup = new NSPredicateGroup();
        this.predicateGroup.predicates = this.parsePredicates();
        
        console.log("**** End predicate format parser")
    }

    private parsePredicates(){

        let token = this.lexer.nextToken();
        let predicates = [];
        let exit = false;

        while (token != null && exit == false) {
            
            switch (token.type) {

                case NSPredicateTokenType.Identifier:
                    let pi = new NSPredicateItem();
                    this.lexer.prevToken();
                    this.property(pi);
                    this.comparator(pi);
                    this.value(pi);
                    predicates.push(pi);
                    break;

                case NSPredicateTokenType.AND:
                    predicates.push(NSPredicateOperator.andPredicateOperatorType());
                    break;

                case NSPredicateTokenType.OR:
                    predicates.push(NSPredicateOperator.orPredicateOperatorType());
                    break;                    

                case NSPredicateTokenType.OpenParenthesisSymbol:
                    let pg = new NSPredicateGroup();
                    pg.predicates = this.parsePredicates();
                    predicates.push(pg);
                    break;

                case NSPredicateTokenType.CloseParenthesisSymbol:
                    exit = true;
                    break;

                default:
                    throw new Error(`NSPredicate: Error. Unexpected token. (${token.value})`);
            }

            if (exit != true) {
                token = this.lexer.nextToken();
            }
        }

        return predicates;
    }

    private property(item:NSPredicateItem) {
        
        var token = this.lexer.nextToken();

        switch (token.type) {

            case NSPredicateTokenType.Identifier:
                item.key = token.value;
                break;

            default:
                throw new Error(`NSPredicate: Error. Unexpected identifier key. (${token.value})`);
        }                    
    }

    private comparator(item:NSPredicateItem) {
        
        var token = this.lexer.nextToken();

        switch(token.type) {

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

            default:
                throw new Error(`NSPredicate: Error. Unexpected comparator. (${token.value})`);                                
        }

    }

    private value(item:NSPredicateItem) {

        var token = this.lexer.nextToken();
        
        switch(token.type) {
            
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
                throw new Error(`NSPredicate: Error. Unexpected comparator. (${token.value})`);
        }            
    }

    private booleanFromString(value:string){

        let v = value.toLocaleLowerCase();
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
                throw new Error(`NSPredicate: Error. Can't convert '${value}' to boolean`);
        }

        return bv;
    }

    private nullFromString(value:string){

        let v = value.toLocaleLowerCase();
        var nv = null;

        switch (v) {

            case "nil":
            case "null":
                nv = null;
                break;

            default:
                throw new Error(`NSPredicate: Error. Can't convert '${value}' to null`);
        }

        return nv;
    }
}

//
// For internal purposes: Don't use it, could change
//

export function _NSPredicateFilterObjects(objs, predicate)
{
    if (objs == null) return [];

    var resultObjects = null;    

    if (objs.length == 0 || predicate == null) {
        resultObjects = objs.slice(0);        
    } 
    else {    
        
        resultObjects = objs.filter(function(obj){

            var result = predicate.evaluateObject(obj);
            if (result)
                return obj;
        });
    }

    return resultObjects;
}
