import { MIOCoreGetPlatform, MIOCorePlatformType } from "mio-core";
import { DateFormatter, DateFormatterStyle } from "./DateFormatter";

export class ISO8601DateFormatter extends DateFormatter {

    static iso8601DateFormatter():ISO8601DateFormatter {
        var df = new ISO8601DateFormatter();
        df.init();

        return df;
    }

    timeZone = null;

    dateFromString( str:string ) : Date|null {
        
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

        if (this.dateStyle != DateFormatterStyle.NoStyle) {
            str += this.iso8601DateStyle(date);
        }

        if (this.timeStyle != DateFormatterStyle.NoStyle){

            if (str.length > 0)
            str += " ";
            
            str += this.iso8601TimeStyle(date);
        }

        return str;
    }
}
