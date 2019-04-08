export declare enum NSDateFirstWeekDay {
    Sunday = 0,
    Monday = 1
}
export declare function NSDateSetFirstWeekDay(day: NSDateFirstWeekDay): void;
export declare function NSDateGetStringForMonth(month: any): string;
export declare function NSDateGetStringForDay(day: number): string;
export declare function NSDateGetDayFromDate(date: any): any;
export declare function NSDateGetMonthFromDate(date: Date): number;
export declare function NSDateGetYearFromDate(date: Date): number;
export declare function NSDateGetDayStringFromDate(date: any): string;
export declare function NSDateGetString(date: any): string;
export declare function NSDateGetDateString(date: any): string;
export declare function NSDateGetTimeString(date: any): string;
export declare function NSDateGetUTCString(date: any): string;
export declare function NSDateGetUTCDateString(date: any): string;
export declare function NSDateGetUTCTimeString(date: any): string;
export declare function NSDateFromString(string: any): Date;
export declare function NSDateToUTC(date: any): Date;
export declare function NSDateAddDaysToDateString(dateString: any, days: any): string;
export declare function NSDateRemoveDaysToDateString(dateString: any, days: any): string;
export declare function NSDateFromMiliseconds(miliseconds: any): Date;
export declare function isDate(x: any): boolean;
export declare function NSDateToday(): Date;
export declare function NSDateNow(): Date;
export declare function NSDateTodayString(): string;
export declare function NSDateYesterday(): Date;
export declare function NSDateTomorrow(): Date;
export declare function NSDateGetFirstDayOfTheWeek(date: Date): Date;
export declare function NSDateGetLastDayOfTheWeek(date: Date): Date;
export declare function NSDateGetFirstDateOfTheMonth(month: any, year: any): Date;
export declare function NSDateGetFirstDayOfTheMonth(month: any, year: any): number;
export declare function NSDateGetLastDateOfTheMonth(month: any, year: any): Date;
export declare function NSDateGetLastDayOfTheMonth(month: any, year: any): number;
export declare function NSDateCopy(date: Date): Date;
