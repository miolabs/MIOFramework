import { NSFormatter } from './NSFormatter';
export declare enum NSDateFormatterStyle {
    NoStyle = 0,
    ShortStyle = 1,
    MediumStyle = 2,
    LongStyle = 3,
    FullStyle = 4
}
export declare class NSDateFormatter extends NSFormatter {
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
