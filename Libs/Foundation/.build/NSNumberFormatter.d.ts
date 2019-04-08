import { NSFormatter } from "./NSFormatter";
import { NSLocale } from "./NSLocale";
export declare enum NSNumberFormatterStyle {
    NoStyle = 0,
    DecimalStyle = 1,
    CurrencyStyle = 2,
    CurrencyISOCodeStyle = 3,
    PercentStyle = 4
}
export declare enum _NSNumberFormatterType {
    Int = 0,
    Decimal = 1
}
export declare class NSNumberFormatter extends NSFormatter {
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
