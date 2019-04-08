import { MIOCoreGetPlatform} from './core/MIOCore';
import { MIOCorePlatformType } from './core/MIOCoreTypes';
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
        let dateString:string = null;
        if (MIOCoreGetPlatform() == MIOCorePlatformType.Safari){
            dateString = str.split('-').join("/");
            if (dateString.length > 19) dateString = dateString.substr(0, 19);
        }
        else 
            dateString = str;

        let timestamp = Date.parse(dateString);
        let d = null;
        if (isNaN(timestamp) == false){
            d = new Date(dateString);
        }
        else {
            console.log("DATE FORMATTER: Error, invalid date");            
        }                    

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
