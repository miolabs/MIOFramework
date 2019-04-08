import { NSDateFormatter } from "./NSDateFormatter";
export declare class NSISO8601DateFormatter extends NSDateFormatter {
    static iso8601DateFormatter(): NSISO8601DateFormatter;
    timeZone: any;
    dateFromString(str: string): Date;
    stringFromDate(date: Date): string;
}
