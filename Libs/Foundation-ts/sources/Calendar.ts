import { Locale } from "./Locale";
import { NSObject } from "./NSObject";

export enum CalendarUnit
{
    era,
    year,
    yearForWeekOfYear,
    quarter,
    month,

    weekOfYear,
    weekOfMonth,
    weekday,
    weekdayOrdinal,
    day,

    hour,
    minute,
    second,
    nanosecond,

    calendar,
    timeZone

}

export class Calendar extends NSObject
{
    firstWeekday() : number {

        let day = 0;

        switch (this.locale.region){
            case "US":
            case "UK":
            case "AR":
                day = 0;
                break;

            default:
                day = 1;
                break;
        }

        return day;
    }

    private _locale:Locale = null;
    getLocale():Locale {
        if (this._locale == null) return Locale.currentLocale();

        return this._locale;
    }

    setLocale(locale:Locale){
        this._locale = locale;
    }

    get locale():Locale {return this.getLocale();}
    set locale(locale:Locale) {this.setLocale(locale);}

    componentFromDate( component:CalendarUnit, date:Date ) : number {
        
        if (component == CalendarUnit.weekday) {
            let day = date.getDay();    // O means Sunday
            day -= this.firstWeekday(); // We decrement the first the of the week depends on the calendar
            if (day < 0) {
                day = 7 + day;
            }
            return day;
        }

        return 0;
    }

}