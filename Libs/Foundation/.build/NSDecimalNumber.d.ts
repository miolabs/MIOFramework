import { NSNumber } from "./NSNumber";
export declare class NSDecimalNumber extends NSNumber {
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
