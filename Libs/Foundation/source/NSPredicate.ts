// import { NSObject } from "./NSObject";
// import { ISO8601DateFormatter } from "./NSISO8601DateFormatter";
// import { MIOCoreLexer } from "./core/MIOCoreLexer";

/**
 * Created by godshadow on 1/5/16.
 */

enum NSPredicateComparatorType {
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

enum NSPredicateRelationshipOperatorType {
    ANY,
    ALL
}

enum NSPredicateOperatorType {
    OR,
    AND
}

enum NSPredicateBitwiseOperatorType {
    OR,
    AND,
    XOR
}

enum NSPredicateType {
    Predicate,
    Item,
    Operation
}

class NSPredicateOperator {
    type = null;

    public static andPredicateOperatorType() {
        let op = new NSPredicateOperator(NSPredicateOperatorType.AND);
        return op;
    }

    public static orPredicateOperatorType() {
        let op = new NSPredicateOperator(NSPredicateOperatorType.OR);
        return op;
    }

    constructor(type) {
        this.type = type;
    }    
}

enum NSPredicateItemValueType {
    
    Undefined,
    UUID,
    String,
    Number,
    Boolean,    
    Null,
    Property
}

class NSPredicateItem {
    relationshipOperation:NSPredicateRelationshipOperatorType = null;
    bitwiseOperation:NSPredicateBitwiseOperatorType = null;
    bitwiseKey:string = null;
    bitwiseValue = null;
    key = null;
    comparator = null;
    value = null;
    valueType = NSPredicateItemValueType.Undefined;

    evaluateObject(object, key?, lvalue?) {

        let lValue = lvalue;        
        if (lvalue == null) {
            let k = key != null ? key : this.key;            
            if (object instanceof NSObject) {
                lValue = object.valueForKeyPath(k);
            }
            else {
                lValue = object[k];
            }
            
            if (lValue instanceof Date) {
                let sdf = new ISO8601DateFormatter();
                sdf.init();
                lValue = sdf.stringFromDate(lValue);
            }
            else if (typeof lValue === "string") {
                lValue = lValue.toLocaleLowerCase();
            }    
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

    evaluateRelationshipObject(object){
        let relObjs = null;
        let keys = this.key.split('.');
        let lastKey = keys[keys.length - 1];
        if (keys.length > 1) {            
            let relKey = this.key.substring(0, this.key.length - lastKey.length - 1);
            relObjs = object.valueForKeyPath(relKey);
        }
        else {
            relObjs = object.valueForKeyPath(this.key);
        }
                       
        for (let index = 0; index < relObjs.count; index++) {
            let o = relObjs.objectAtIndex(index);
            let result = this.evaluateObject(o, lastKey);
            if (result == true && this.relationshipOperation == NSPredicateRelationshipOperatorType.ANY) {
                return true;
            }
            else if (result == false && this.relationshipOperation == NSPredicateRelationshipOperatorType.ALL) {
                return false;
            }
        }
        
        return false;        
    }

    // HACK: Dirty hack to bitwaire comparate more than 32bits    


    evaluateBitwaseOperatorObject(object){        
        let lvalue = object.valueForKeyPath(this.bitwiseKey);         
        let rvalue =  parseInt(this.bitwiseValue);
        
        let value = 0;
        if (this.bitwiseOperation == NSPredicateBitwiseOperatorType.AND){
            value = lvalue & rvalue;
        }
        else if (this.bitwiseOperation == NSPredicateBitwiseOperatorType.OR){
            value = lvalue | rvalue;
        }

        return this.evaluateObject(object, null, value);        
    }
}

class NSPredicateGroup {

    predicates = [];

    evaluateObject(object):boolean {
        
        let result = false;
        let op = null;
        let lastResult = null;

        for (let count = 0; count < this.predicates.length; count++) {
            let o = this.predicates[count];

            if (o instanceof NSPredicateGroup) {
                result = o.evaluateObject(object);
            }
            else if (o instanceof NSPredicateItem) {
                if (o.relationshipOperation != null) {
                    result = o.evaluateRelationshipObject(object);                    
                }
                else if (o.bitwiseOperation != null){
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

enum NSPredicateTokenType{
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

    BitwiseAND,
    BitwiseOR,
    
    OpenParenthesisSymbol,
    CloseParenthesisSymbol,
    Whitespace,

    AND,
    OR,

    ANY,
    ALL
}

class NSPredicate extends NSObject {
     
    predicateGroup = null;    

    private lexer:MIOCoreLexer = null;

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
                    let pi = this.nextPredicateItem();
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
                    let anyPI = this.nextPredicateItem();
                    anyPI.relationshipOperation = NSPredicateRelationshipOperatorType.ANY;
                    predicates.push(anyPI);
                    break;

                case NSPredicateTokenType.ALL:
                    this.lexer.nextToken();
                    let allPI = this.nextPredicateItem();
                    anyPI.relationshipOperation = NSPredicateRelationshipOperatorType.ALL;
                    predicates.push(anyPI);
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

    private nextPredicateItem(){
        let pi = new NSPredicateItem();
        this.lexer.prevToken();
        this.property(pi);
        this.comparator(pi);
        this.value(pi);
        return pi;
    }    

    private property(item:NSPredicateItem) {
        
        let token = this.lexer.nextToken();

        switch (token.type) {

            case NSPredicateTokenType.Identifier:
                item.key = token.value;
                break;

            default:
                throw new Error(`NSPredicate: Error. Unexpected identifier key. (${token.value})`);
        }                    
    }

    private comparator(item:NSPredicateItem) {
        
        let token = this.lexer.nextToken();

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
                throw new Error(`NSPredicate: Error. Unexpected comparator. (${token.value})`);                                
        }

    }

    private value(item:NSPredicateItem) {

        let token = this.lexer.nextToken();
        
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
        let bv = false;
        
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
        let nv = null;

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

function _NSPredicateFilterObjects(objs, predicate)
{
    if (objs == null) return [];

    let resultObjects = null;    

    if (objs.length == 0 || predicate == null) {
        resultObjects = objs.slice(0);        
    } 
    else {    
        
        resultObjects = objs.filter(function(obj){

            let result = predicate.evaluateObject(obj);
            if (result)
                return obj;
        });
    }

    return resultObjects;
}

