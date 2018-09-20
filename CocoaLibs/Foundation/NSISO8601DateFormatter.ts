import { NSCoreGetBrowser, NSCoreBrowserType } from "./platform/web/MIOCore";
import { NSDateFormatter, NSDateFormatterStyle } from "./NSDateFormatter";

export class NSISO8601DateFormatter extends NSDateFormatter {

    static iso8601DateFormatter():NSISO8601DateFormatter {
        var df = new NSISO8601DateFormatter();
        df.init();

        return df;
    }

    timeZone = null;

    dateFromString(str:string):Date {

        if (str == null) return null;
        let dateString;
        if (NSCoreGetBrowser() == NSCoreBrowserType.Safari)
            dateString = str.split('-').join("/");
        else 
            dateString = str;
        var d = new Date(dateString);
        if (d == null) 
            console.log("DATE FORMATTER: Error, invalid date");

        return d;
    }

    stringFromDate(date:Date):string {

        var str = "";

        if (date == null) return null;

        if (this.dateStyle != NSDateFormatterStyle.NoStyle) {
            str += this.iso8601DateStyle(date);
        }

        if (this.timeStyle != NSDateFormatterStyle.NoStyle){

            if (str.length > 0)
            str += " ";
            
            str += this.iso8601TimeStyle(date);
        }

        return str;
    }
}
