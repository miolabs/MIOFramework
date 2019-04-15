declare module "core/MIOCoreTypes" {
    export enum MIOCorePlatformType {
        Unknown = 0,
        Node = 1,
        Safari = 2,
        Chrome = 3
    }
}
declare module "core/MIOCoreLexer" {
    export class MIOCoreLexer {
        private input;
        private tokenTypes;
        private tokens;
        private tokenIndex;
        private ignoreTokenTypes;
        constructor(string: string);
        addTokenType(type: any, regex: any): void;
        ignoreTokenType(type: any): void;
        tokenize(): void;
        private _tokenize;
        nextToken(): any;
        prevToken(): any;
    }
}
declare module "platform/web/MIOCore_web" {
    import { MIOCorePlatformType } from "core/MIOCoreTypes";
    export function MIOCoreGetPlatform(): MIOCorePlatformType;
    export function NSClassFromString(className: string): any;
}
interface Array<T> {
    count(): any;
    addObject(object: any): any;
    removeObject(object: any): any;
    removeObjectAtIndex(index: any): any;
    indexOfObject(object: any): any;
    containsObject(object: any): any;
    objectAtIndex(index: any): any;
    firstObject(): any;
    lastObject(): any;
}
declare module "core/MIOCore" {
    import { MIOCorePlatformType } from "core/MIOCoreTypes";
    export function MIOCoreGetPlatform(): MIOCorePlatformType;
    export function NSClassFromString(className: string): any;
}
declare module "NSObject" {
    export class NSObject {
        private _className;
        getClassName(): string;
        readonly className: string;
        keyPaths: {};
        init(): void;
        private _notifyValueChange;
        willChangeValueForKey(key: string): void;
        didChangeValueForKey(key: string): void;
        willChangeValue(key: string): void;
        didChangeValue(key: string): void;
        private _addObserver;
        private _keyFromKeypath;
        addObserver(obs: any, keypath: string, context?: any): void;
        removeObserver(obs: any, keypath: string): void;
        setValueForKey(value: any, key: string): void;
        valueForKey(key: string): any;
        valueForKeyPath(keyPath: string): any;
        copy(): any;
    }
}
declare module "NSBundle" { }
declare module "NSCoder" {
    import { NSObject } from "NSObject";
    export interface NSCoding {
        initWithCoder?(coder: NSCoder): void;
        encodeWithCoder?(coder: NSCoder): void;
    }
    export class NSCoder extends NSObject {
        decodeIntegerForKey(key: string): any;
        decodeObjectForKey(key: string): any;
    }
}
declare module "NSDate" {
    export enum NSDateFirstWeekDay {
        Sunday = 0,
        Monday = 1
    }
    export function NSDateSetFirstWeekDay(day: NSDateFirstWeekDay): void;
    export function NSDateGetStringForMonth(month: any): string;
    export function NSDateGetStringForDay(day: number): string;
    export function NSDateGetDayFromDate(date: any): any;
    export function NSDateGetMonthFromDate(date: Date): number;
    export function NSDateGetYearFromDate(date: Date): number;
    export function NSDateGetDayStringFromDate(date: any): string;
    export function NSDateGetString(date: any): string;
    export function NSDateGetDateString(date: any): string;
    export function NSDateGetTimeString(date: any): string;
    export function NSDateGetUTCString(date: any): string;
    export function NSDateGetUTCDateString(date: any): string;
    export function NSDateGetUTCTimeString(date: any): string;
    export function NSDateFromString(string: any): Date;
    export function NSDateToUTC(date: any): Date;
    export function NSDateAddDaysToDateString(dateString: any, days: any): string;
    export function NSDateRemoveDaysToDateString(dateString: any, days: any): string;
    export function NSDateFromMiliseconds(miliseconds: any): Date;
    export function isDate(x: any): boolean;
    export function NSDateToday(): Date;
    export function NSDateNow(): Date;
    export function NSDateTodayString(): string;
    export function NSDateYesterday(): Date;
    export function NSDateTomorrow(): Date;
    export function NSDateGetFirstDayOfTheWeek(date: Date): Date;
    export function NSDateGetLastDayOfTheWeek(date: Date): Date;
    export function NSDateGetFirstDateOfTheMonth(month: any, year: any): Date;
    export function NSDateGetFirstDayOfTheMonth(month: any, year: any): number;
    export function NSDateGetLastDateOfTheMonth(month: any, year: any): Date;
    export function NSDateGetLastDayOfTheMonth(month: any, year: any): number;
    export function NSDateCopy(date: Date): Date;
}
declare module "NSFormatter" {
    import { NSObject } from "NSObject";
    export class NSFormatter extends NSObject {
        stringForObjectValue(value: any): any;
        getObjectValueForString(str: string): void;
        editingStringForObjectValue(value: any): void;
        isPartialStringValid(str: string): [boolean, string];
    }
}
declare module "NSDateFormatter" {
    import { NSFormatter } from "NSFormatter";
    export enum NSDateFormatterStyle {
        NoStyle = 0,
        ShortStyle = 1,
        MediumStyle = 2,
        LongStyle = 3,
        FullStyle = 4
    }
    export class NSDateFormatter extends NSFormatter {
        dateStyle: NSDateFormatterStyle;
        timeStyle: NSDateFormatterStyle;
        private browserDateSeparatorSymbol;
        init(): void;
        dateFromString(str: string): Date;
        stringFromDate(date: Date): string;
        stringForObjectValue(value: any): string;
        isPartialStringValid(str: string): [boolean, string];
        private _parse;
        private _parseDate;
        private _parseDay;
        private _validateDay;
        private _parseMonth;
        private _validateMonth;
        private _parseYear;
        private _validateYear;
        protected iso8601DateStyle(date: Date): string;
        private _shortDateStyle;
        private _fullDateStyle;
        private _parseTime;
        private _parseHour;
        private _parseMinute;
        private _parseSecond;
        protected iso8601TimeStyle(date: Date): string;
        private _shortTimeStyle;
    }
}
declare module "NSNumber" {
    import { NSObject } from "NSObject";
    export class NSNumber extends NSObject {
        static numberWithBool(value: any): NSNumber;
        static numberWithInteger(value: any): NSNumber;
        static numberWithFloat(value: any): NSNumber;
        protected storeValue: any;
        initWithBool(value: any): void;
        initWithInteger(value: any): void;
        initWithFloat(value: any): void;
    }
}
declare module "NSDecimalNumber" {
    import { NSNumber } from "NSNumber";
    export class NSDecimalNumber extends NSNumber {
        static decimalNumberWithString(str: string): NSDecimalNumber;
        static one(): NSDecimalNumber;
        static zero(): NSDecimalNumber;
        static numberWithBool(value: any): NSDecimalNumber;
        static numberWithInteger(value: any): NSDecimalNumber;
        static numberWithFloat(value: any): NSDecimalNumber;
        initWithString(str: string): void;
        initWithDecimal(value: any): void;
        _initWithValue(value: any): void;
        decimalNumberByAdding(value: NSDecimalNumber): NSDecimalNumber;
        decimalNumberBySubtracting(value: NSDecimalNumber): NSDecimalNumber;
        decimalNumberByMultiplyingBy(value: NSDecimalNumber): NSDecimalNumber;
        decimalNumberByDividingBy(value: NSDecimalNumber): NSDecimalNumber;
        readonly decimalValue: any;
        readonly floatValue: any;
    }
}
declare module "NSError" {
    import { NSObject } from "NSObject";
    export class NSError extends NSObject {
        errorCode: number;
    }
}
declare module "NSISO8601DateFormatter" {
    import { NSDateFormatter } from "NSDateFormatter";
    export class NSISO8601DateFormatter extends NSDateFormatter {
        static iso8601DateFormatter(): NSISO8601DateFormatter;
        timeZone: any;
        dateFromString(str: string): Date;
        stringFromDate(date: Date): string;
    }
}
declare module "NSIndexPath" {
    import { NSObject } from "NSObject";
    export function NSIndexPathEqual(indexPath1: NSIndexPath, indexPath2: NSIndexPath): boolean;
    export class NSIndexPath extends NSObject {
        static indexForRowInSection(row: number, section: number): NSIndexPath;
        static indexForColumnInRowAndSection(column: number, row: number, section: number): NSIndexPath;
        private indexes;
        add(value: number): void;
        readonly section: any;
        readonly row: any;
        readonly item: any;
        readonly column: any;
        isEqualToIndexPath(indexPath: NSIndexPath): boolean;
    }
}
declare module "NSLog" {
    export function NSLog(format: any): void;
}
declare module "NSXMLParser" {
    import { NSObject } from "NSObject";
    export interface NSXMLParserDelegate {
        parserDidStartDocument?(parser: NSXMLParser): any;
        parserDidEndDocument?(parser: NSXMLParser): any;
        parserDidStartElement?(parser: NSXMLParser, element: string, attributes: any): any;
        parserDidEndElement?(parser: NSXMLParser, element: string): any;
        parserFoundCharacters?(parser: NSXMLParser, characters: string): any;
        parserFoundComment?(parser: NSXMLParser, comment: string): any;
    }
    export enum NSXMLTokenType {
        Identifier = 0,
        QuestionMark = 1,
        ExclamationMark = 2,
        OpenTag = 3,
        CloseTag = 4,
        Slash = 5,
        Quote = 6,
        WhiteSpace = 7,
        End = 8
    }
    export class NSXMLParser extends NSObject {
        private str;
        private delegate;
        private strIndex;
        private elements;
        private attributes;
        private currentElement;
        private currentTokenValue;
        private lastTokenValue;
        private ignoreWhiteSpace;
        initWithString(str: string, delegate: NSXMLParserDelegate): void;
        private nextChar;
        private prevChar;
        private readToken;
        private nextToken;
        private prevToken;
        parse(): void;
        private openTag;
        private questionMark;
        private exclamationMark;
        private xmlOpenTag;
        private xmlCloseTag;
        private beginElement;
        private endElement;
        private attribute;
        private decodeAttribute;
        private slash;
        private closeTag;
        private didStartElement;
        private didEndElement;
        private text;
        private comments;
        private error;
    }
}
declare module "NSPropertyListSerialization" {
    import { NSObject } from "NSObject";
    import { NSError } from "NSError";
    import { NSXMLParser } from "NSXMLParser";
    export enum NSPropertyListReadOptions {
        None = 0
    }
    export enum NSPropertyListFormatformat {
        None = 0
    }
    export class NSPropertyListSerialization extends NSObject {
        static propertyListWithData(data: string, options: NSPropertyListReadOptions, format: NSPropertyListFormatformat, error: NSError): any;
        private data;
        initWithData(data: string, options: NSPropertyListReadOptions, format: NSPropertyListFormatformat): void;
        private rootItem;
        private _parse;
        private currentElement;
        private currentElementType;
        private currentValue;
        private currentKey;
        private currentString;
        private itemStack;
        parserDidStartElement(parser: NSXMLParser, element: string, attributes: any): void;
        parserFoundCharacters(parser: NSXMLParser, characters: string): void;
        parserDidEndElement(parser: NSXMLParser, element: string): void;
        parserDidEndDocument(parser: NSXMLParser): void;
    }
}
declare module "NSKeyedUnarchiver" {
    import { NSCoder } from "NSCoder";
    export class NSKeyedUnarchiver extends NSCoder {
        static unarchiveTopLevelObjectWithData(data: string): any;
        private objects;
        _parseData(data: string, error: any): any;
        private classFromInfo;
        private createObjectFromInfo;
        private currentInfo;
        private createObject;
        decodeObjectForKey(key: string): any;
        private createArray;
        private createDictionary;
        private valueFromInfo;
    }
}
declare module "NSLocale" {
    import { NSObject } from "NSObject";
    export class NSLocale extends NSObject {
        languageIdentifier: string;
        countryIdentifier: string;
        static currentLocale(): any;
        static _setCurrentLocale(localeIdentifier: string): void;
        initWithLocaleIdentifier(identifer: string): void;
        readonly decimalSeparator: string;
        readonly currencySymbol: string;
        readonly currencyCode: string;
        readonly groupingSeparator: string;
    }
}
declare module "NSNotificationCenter" {
    export class NSNotification {
        name: any;
        object: any;
        userInfo: any;
        constructor(name: any, object: any, userInfo: any);
    }
    export class NSNotificationCenter {
        private static _sharedInstance;
        notificationNames: {};
        constructor();
        static defaultCenter(): NSNotificationCenter;
        addObserver(obs: any, name: any, fn: any): void;
        removeObserver(obs: any, name: any): void;
        postNotification(name: any, object: any, userInfo?: any): void;
    }
}
declare module "NSNull" {
    import { NSObject } from "NSObject";
    export class NSNull extends NSObject {
        static nullValue(): NSNull;
    }
}
declare module "NSNumberFormatter" {
    import { NSFormatter } from "NSFormatter";
    import { NSLocale } from "NSLocale";
    export enum NSNumberFormatterStyle {
        NoStyle = 0,
        DecimalStyle = 1,
        CurrencyStyle = 2,
        CurrencyISOCodeStyle = 3,
        PercentStyle = 4
    }
    export enum _NSNumberFormatterType {
        Int = 0,
        Decimal = 1
    }
    export class NSNumberFormatter extends NSFormatter {
        numberStyle: NSNumberFormatterStyle;
        locale: NSLocale;
        minimumFractionDigits: number;
        maximumFractionDigits: number;
        groupingSeparator: any;
        currencySymbol: any;
        currencyCode: any;
        private currencyHasSpaces;
        private currencyIsRight;
        init(): void;
        numberFromString(str: string): any;
        stringFromNumber(number: number): string;
        stringForObjectValue(value: any): string;
        private round;
        private stringByAppendingCurrencyString;
        isPartialStringValid(str: string): [boolean, string];
        private _parse;
    }
}
declare module "NSOperation" {
    import { NSObject } from "NSObject";
    export class NSOperation extends NSObject {
        name: string;
        target: any;
        completion: any;
        private _dependencies;
        readonly dependencies: any[];
        private _isExecuting;
        readonly isExecuting: boolean;
        private setExecuting;
        private _isFinished;
        readonly isFinished: boolean;
        private setFinished;
        private _ready;
        private setReady;
        readonly ready: boolean;
        addDependency(operation: NSOperation): void;
        main(): void;
        start(): void;
        executing(): boolean;
        finished(): boolean;
        observeValueForKeyPath(keyPath: string, type: string, object: any, ctx: any): void;
        private checkDependecies;
    }
}
declare module "NSOperationQueue" {
    import { NSObject } from "NSObject";
    import { NSOperation } from "NSOperation";
    import "./NSArray";
    export class NSOperationQueue extends NSObject {
        private _operations;
        addOperation(operation: NSOperation): void;
        removeOperation(operation: NSOperation): void;
        readonly operations: any[];
        readonly operationCount: () => any;
        private _suspended;
        suspended: any;
        private setSupended;
        observeValueForKeyPath(keyPath: string, type: string, object: any, ctx: any): void;
    }
}
declare module "NSPoint" {
    export class NSPoint {
        x: number;
        y: number;
        static Zero(): NSPoint;
        constructor(x: any, y: any);
    }
}
declare module "NSPredicate" {
    import { NSObject } from "NSObject";
    export enum NSPredicateComparatorType {
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
    export enum NSPredicateRelationshipOperatorType {
        ANY = 0,
        ALL = 1
    }
    export enum NSPredicateOperatorType {
        OR = 0,
        AND = 1
    }
    export enum NSPredicateBitwiseOperatorType {
        OR = 0,
        AND = 1,
        XOR = 2
    }
    export enum NSPredicateType {
        Predicate = 0,
        Item = 1,
        Operation = 2
    }
    export class NSPredicateOperator {
        type: any;
        static andPredicateOperatorType(): NSPredicateOperator;
        static orPredicateOperatorType(): NSPredicateOperator;
        constructor(type: any);
    }
    export enum NSPredicateItemValueType {
        Undefined = 0,
        UUID = 1,
        String = 2,
        Number = 3,
        Boolean = 4,
        Null = 5,
        Property = 6
    }
    export class NSPredicateItem {
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
    export class NSPredicateGroup {
        predicates: any[];
        evaluateObject(object: any): boolean;
    }
    export enum NSPredicateTokenType {
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
    export class NSPredicate extends NSObject {
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
    export function _NSPredicateFilterObjects(objs: any, predicate: any): any;
}
declare module "NSRange" {
    export class NSRange {
        location: number;
        length: number;
        constructor(location: any, length: any);
    }
    export function NSMaxRange(range: NSRange): number;
    export function NSEqualRanges(range1: NSRange, range2: NSRange): boolean;
    export function NSLocationInRange(location: number, range: NSRange): boolean;
    export function NSIntersectionRange(range1: NSRange, range2: NSRange): NSRange;
    export function NSUnionRange(range1: NSRange, range2: NSRange): NSRange;
}
declare module "NSSize" {
    export class NSSize {
        width: number;
        height: number;
        static Zero(): NSSize;
        constructor(w: any, h: any);
        isEqualTo(size: any): boolean;
    }
}
declare module "NSRect" {
    import { NSPoint } from "NSPoint";
    import { NSSize } from "NSSize";
    export class NSRect {
        origin: NSPoint;
        size: NSSize;
        static Zero(): NSRect;
        static rectWithValues(x: any, y: any, w: any, h: any): NSRect;
        constructor(p: any, s: any);
    }
}
declare module "NSSet" {
    import { NSObject } from "NSObject";
    import { NSPredicate } from "NSPredicate";
    import "./NSArray";
    export class NSSet extends NSObject {
        static set(): NSSet;
        private _objects;
        addObject(object: any): void;
        removeObject(object: any): void;
        removeAllObjects(): void;
        indexOfObject(object: any): number;
        containsObject(object: any): boolean;
        objectAtIndex(index: any): any;
        readonly allObjects: any[];
        readonly count: number;
        readonly length: number;
        copy(): NSSet;
        filterWithPredicate(predicate: NSPredicate): any;
        addObserver(obs: any, keypath: string, context?: any): void;
    }
}
declare module "NSSortDescriptor" {
    import { NSObject } from "NSObject";
    export class NSSortDescriptor extends NSObject {
        key: any;
        ascending: boolean;
        static sortDescriptorWithKey(key: any, ascending: any): NSSortDescriptor;
        initWithKey(key: any, ascending: any): void;
    }
    export function _NSSortDescriptorSortObjects(objs: any, sortDescriptors: any): any;
}
interface String {
    lastPathComponent(): string;
    pathExtension(): string;
    stringByAppendingPathComponent(path: string): string;
    stringByDeletingLastPathComponent(): string;
    hasPreffix(preffix: string): boolean;
    hasSuffix(suffix: string): boolean;
}
declare function MIOCoreStringHasPreffix(str: any, preffix: any): boolean;
declare function MIOCoreStringHasSuffix(str: any, suffix: any): boolean;
declare function MIOCoreStringAppendPathComponent(string: string, path: any): string;
declare function MIOCoreStringLastPathComponent(string: string): string;
declare function MIOCoreStringPathExtension(string: string): string;
declare function MIOCoreStringDeletingLastPathComponent(string: string): string;
declare function MIOCoreStringStandardizingPath(string: any): string;
declare let _MIOLocalizedStrings: any;
declare function MIOLocalizeString(key: any, defaultValue: any): any;
declare function setMIOLocalizedStrings(data: any): void;
declare function getMIOLocalizedStrings(): any;
declare module "NSTimer" {
    import { NSObject } from "NSObject";
    export class NSTimer extends NSObject {
        private _timerInterval;
        private _repeat;
        private _target;
        private _completion;
        private _coreTimer;
        static scheduledTimerWithTimeInterval(timeInterval: any, repeat: any, target: any, completion: any): NSTimer;
        initWithTimeInterval(timeInterval: any, repeat: any, target: any, completion: any): void;
        fire(): void;
        invalidate(): void;
        private _timerCallback;
    }
}
declare module "NSURL" {
    import { NSObject } from "NSObject";
    export enum NSURLTokenType {
        Protocol = 0,
        Host = 1,
        Path = 2,
        Param = 3,
        Value = 4
    }
    export class NSURL extends NSObject {
        baseURL: NSURL;
        absoluteString: string;
        scheme: string;
        user: string;
        password: any;
        host: string;
        port: number;
        hostname: string;
        path: string;
        file: string;
        pathExtension: string;
        params: any[];
        static urlWithString(urlString: string): NSURL;
        initWithScheme(scheme: string, host: string, path: string): void;
        initWithURLString(urlString: string): void;
        private _parseURLString;
        urlByAppendingPathComponent(path: string): NSURL;
        standardizedURL(): NSURL;
    }
}
declare module "NSURLRequest" {
    import { NSObject } from "NSObject";
    import { NSURL } from "NSURL";
    export class NSURLRequest extends NSObject {
        url: NSURL;
        httpMethod: string;
        httpBody: any;
        headers: any[];
        binary: boolean;
        download: boolean;
        static requestWithURL(url: NSURL): NSURLRequest;
        initWithURL(url: NSURL): void;
        setHeaderField(field: any, value: any): void;
    }
}
declare module "NSURLConnection" {
    import { NSURLRequest } from "NSURLRequest";
    export class NSURLConnection {
        request: NSURLRequest;
        delegate: any;
        blockFN: any;
        blockTarget: any;
        private xmlHttpRequest;
        initWithRequest(request: NSURLRequest, delegate: any): void;
        initWithRequestBlock(request: NSURLRequest, blockTarget: any, blockFN: any): void;
        start(): void;
    }
}
declare module "NSUUID" {
    import { NSObject } from "NSObject";
    export class NSUUID extends NSObject {
        static UUID(): NSUUID;
        private _uuid;
        init(): void;
        readonly UUIDString: string;
    }
}
declare module "NSUserDefaults" {
    export class NSUserDefaults {
        private static _sharedInstance;
        constructor();
        static standardUserDefaults(): NSUserDefaults;
        setBooleanForKey(key: any, value: boolean): void;
        booleanForKey(key: any): boolean;
        setValueForKey(key: string, value: any): void;
        valueForKey(key: string): any;
        removeValueForKey(key: string): void;
    }
}
declare module "index" {
    export * from "NSPoint";
    export * from "NSRange";
    export * from "NSRect";
    export * from "NSSize";
    export * from "NSObject";
    export * from "NSNull";
    export * from "NSError";
    export * from "NSCoder";
    export * from "NSKeyedUnarchiver";
    export * from "NSDecimalNumber";
    export * from "NSDate";
    export * from "NSUUID";
    export * from "NSPredicate";
    export * from "NSSet";
    export * from "NSIndexPath";
    export * from "NSLocale";
    export * from "NSFormatter";
    export * from "NSDateFormatter";
    export * from "NSISO8601DateFormatter";
    export * from "NSNumberFormatter";
    export * from "NSTimer";
    export * from "NSNotificationCenter";
    export * from "NSUserDefaults";
    export * from "NSURL";
    export * from "NSURLRequest";
    export * from "NSURLConnection";
    export * from "NSXMLParser";
    export * from "NSOperation";
    export * from "NSOperationQueue";
    export * from "NSBundle";
    export * from "NSLog";
    export * from "NSNumber";
    export * from "NSSortDescriptor";
    export * from "NSPropertyListSerialization";
}
