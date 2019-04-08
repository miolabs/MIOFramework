import { NSObject } from "./NSObject";
export declare enum NSPredicateComparatorType {
    Equal = 0,
    Less = 1,
    LessOrEqual = 2,
    Greater = 3,
    GreaterOrEqual = 4,
    Distinct = 5,
    Contains = 6,
    NotContains = 7,
    In = 8,
    NotIn = 9
}
export declare enum NSPredicateRelationshipOperatorType {
    ANY = 0,
    ALL = 1
}
export declare enum NSPredicateOperatorType {
    OR = 0,
    AND = 1
}
export declare enum NSPredicateBitwiseOperatorType {
    OR = 0,
    AND = 1,
    XOR = 2
}
export declare enum NSPredicateType {
    Predicate = 0,
    Item = 1,
    Operation = 2
}
export declare class NSPredicateOperator {
    type: any;
    static andPredicateOperatorType(): NSPredicateOperator;
    static orPredicateOperatorType(): NSPredicateOperator;
    constructor(type: any);
}
export declare enum NSPredicateItemValueType {
    Undefined = 0,
    UUID = 1,
    String = 2,
    Number = 3,
    Boolean = 4,
    Null = 5,
    Property = 6
}
export declare class NSPredicateItem {
    relationshipOperation: NSPredicateRelationshipOperatorType;
    bitwiseOperation: NSPredicateBitwiseOperatorType;
    bitwiseKey: string;
    bitwiseValue: any;
    key: any;
    comparator: any;
    value: any;
    valueType: NSPredicateItemValueType;
    evaluateObject(object: any, key?: any, lvalue?: any): boolean;
    evaluateRelationshipObject(object: any): boolean;
    evaluateBitwaseOperatorObject(object: any): boolean;
}
export declare class NSPredicateGroup {
    predicates: any[];
    evaluateObject(object: any): boolean;
}
export declare enum NSPredicateTokenType {
    Identifier = 0,
    UUIDValue = 1,
    StringValue = 2,
    NumberValue = 3,
    BooleanValue = 4,
    NullValue = 5,
    PropertyValue = 6,
    MinorOrEqualComparator = 7,
    MinorComparator = 8,
    MajorOrEqualComparator = 9,
    MajorComparator = 10,
    EqualComparator = 11,
    DistinctComparator = 12,
    ContainsComparator = 13,
    NotContainsComparator = 14,
    InComparator = 15,
    NotIntComparator = 16,
    BitwiseAND = 17,
    BitwiseOR = 18,
    OpenParenthesisSymbol = 19,
    CloseParenthesisSymbol = 20,
    Whitespace = 21,
    AND = 22,
    OR = 23,
    ANY = 24,
    ALL = 25
}
export declare class NSPredicate extends NSObject {
    predicateGroup: any;
    private lexer;
    static predicateWithFormat(format: any): NSPredicate;
    initWithFormat(format: any): void;
    private _predicateFormat;
    readonly predicateFormat: string;
    evaluateObject(object: NSObject): any;
    private tokenizeWithFormat;
    private parse;
    private parsePredicates;
    private nextPredicateItem;
    private property;
    private comparator;
    private value;
    private booleanFromString;
    private nullFromString;
}
export declare function _NSPredicateFilterObjects(objs: any, predicate: any): any;
