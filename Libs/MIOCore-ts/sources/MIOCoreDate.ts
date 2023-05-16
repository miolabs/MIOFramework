
/**
 * Created by godshadow on 11/3/16.
 */

import { MIOCoreLexer } from "./MIOCoreLexer"

enum NSDateFirstWeekDay
{
    Sunday,
    Monday
}

let _MCDateFirstWeekDay = NSDateFirstWeekDay.Monday;
let _MCDateStringDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
let _MCDateStringMonths = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

export function MCDateSetFirstWeekDay(day:NSDateFirstWeekDay){

    _MCDateFirstWeekDay = day;
    if (day == NSDateFirstWeekDay.Sunday)
        _MCDateStringDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    else
        _MCDateStringDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
}

export function MCDateGetStringForMonth(month:number) : string
{
    return _MCDateStringMonths[month];
}

export function MCDateGetStringForDay(day:number) : string
{
    return _MCDateStringDays[day];
}

export function MCDateGetDayFromDate(date:Date) : number 
{
    if (_MCDateFirstWeekDay == NSDateFirstWeekDay.Sunday) return date.getDay();    

    // Transform to start on Monday instead of Sunday
    // 0 - Mon, 1 - Tue, 2 - Wed, 3 - Thu, 4 - Fri, 5 - Sat, 6 - Sun
    let day = date.getDay();
    if (day == 0)
        day = 6;
    else
        day--;

    return day;
}

export function MCDateGetMonthFromDate( date:Date ) : number
{
    return date.getMonth();
}

export function MCDateGetYearFromDate( date:Date ) : number
{
    return date.getFullYear();
}

export function MCDateGetDayStringFromDate( date:Date ) : string 
{
    let day = MCDateGetDayFromDate( date );
    return MCDateGetStringForDay( day );
}

export function MCDateGetString( date:Date ) : string
{
    let d = MCDateGetDateString( date );
    let t = MCDateGetTimeString( date );

    return d + " " + t;
}

export function MCDateGetDateString( date:Date ) : string
{
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    let dd  = date.getDate().toString();
    return yyyy + "-" +(mm[1]?mm:"0"+mm[0]) + "-" +  (dd[1]?dd:"0"+dd[0]); // padding
}

export function MCDateGetTimeString( date:Date ) : string
{
    let hh = date.getHours().toString();
    let mm = date.getMinutes().toString();
    return (hh[1]?hh:"0"+hh[0]) + ":" + (mm[1]?mm:"0"+mm[0]);
}

export function MCDateGetUTCString( date:Date ) : string
{
    var d = MCDateGetUTCDateString(date);
    var t = MCDateGetUTCTimeString(date);

    return d + " " + t;
}

export function MCDateGetUTCDateString(date:Date) : string
{
    var yyyy = date.getUTCFullYear().toString();
    var mm = (date.getUTCMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getUTCDate().toString();
    return yyyy + "-" +(mm[1]?mm:"0"+mm[0]) + "-" +  (dd[1]?dd:"0"+dd[0]); // padding
}

export function MCDateGetUTCTimeString( date:Date ) : string
{
    var hh = date.getUTCHours().toString();
    var mm = date.getUTCMinutes().toString();
    var ss = date.getUTCSeconds().toString();
    return (hh[1]?hh:"0" + hh[0]) + ":" + (mm[1]?mm:"0" + mm[0]) + ":" + (ss[1]?ss:"0" + ss[0]);
}

export function NSDateFromString( string:string ) : Date
{
    let lexer = new MIOCoreLexer(string);
    
    // Values    
    // lexer.addTokenType(0, /^([0-9]{2,4})-/i); // Year
    // lexer.addTokenType(1, /^[0-9]{1,2}-/i); // Month
    // lexer.addTokenType(2, /^[0-9]{1,2} /i); // day

    // lexer.addTokenType(3, /^[0-9]{1,2}:/i); // hh // mm
    // lexer.addTokenType(4, /^[0-9]{1,2}/i); // ss
    
    lexer.addTokenType(0, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/i); // yyyy-MM-dd hh:mm:ss
    lexer.addTokenType(1, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2})/i); // yyyy-MM-dd hh:mm 
    lexer.addTokenType(2, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2})/i); // yyyy-MM-dd    

    lexer.tokenize();

    let y = -1;
    let m = -1;
    let d = -1;
    let h = -1;
    let mm = -1;
    let s = -1;

    let token = lexer.nextToken();
    while(token != null){

        switch (token.type) {

            case 0:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                h = token.matches[4];
                mm = token.matches[5];
                s = token.matches[6];
                break;

            case 1:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                h = token.matches[4];
                mm = token.matches[5];
                break;

            case 2:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                break;

            default:
                return null;
        }

        token = lexer.nextToken();
    }

    if (h == -1) h = 0;
    if (mm == -1) mm = 0;
    if (s == -1) s = 0;

    let date = new Date(y, m, d, h, mm, s);
    return date;
}

export function MCDateToUTC( date:Date ) : Date
{
    let dif = date.getTimezoneOffset();
    let d = new Date();
    d.setTime(date.getTime() + (dif * 60 * 1000));

    return d;
}

export function MCDateAddDaysToDateString( dateString:string, days:number ) : string
{
    let d = NSDateFromString(dateString);
    d.setDate(d.getDate() + days);
    let ds = MCDateGetDateString(d);

    return ds;
}

export function MCDateRemoveDaysToDateString( dateString:string, days:number) : string
{
    let d = NSDateFromString(dateString);
    d.setDate(d.getDate() - days);
    let ds = MCDateGetDateString(d);

    return ds;
}


export function MCDateFromMiliseconds(miliseconds:number) : Date {
  let epoch = miliseconds; 
  if( epoch < 10000000000 ) epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
  let ds = new Date();
  ds.setTime( epoch )
  return ds;
}

export function isDate (x) : boolean
{ 
  return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate); 
}

export function MCDateToday() : Date {
    let d = new Date();
    d.setHours(0,0,0);
    return d;
}

export function MCDateNow() : Date {
    return new Date();
}

export function MCDateTodayString() : string {
    let d = MCDateToday();
    return MCDateGetString(d);
}

export function MCDateYesterday() : Date {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0,0,0);
    return d;
}

export function MCDateTomorrow() : Date {
    let d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0,0,0);
    return d;
}

export function MCDateGetFirstDayOfTheWeek( date:Date ) : Date  {

    let dayString = MCDateGetDateString(date);
    // TODO: Check sunday start or monday start
    let firstDayString = MCDateRemoveDaysToDateString(dayString, date.getDay() - 1);
    let first = NSDateFromString(firstDayString);

    return first;
}

export function MCDateGetLastDayOfTheWeek( date:Date ) : Date {

    let dayString = MCDateGetDateString(date);
    // TODO: Check sunday start or monday start
    let lastDayString = MCDateAddDaysToDateString(dayString, (7 - date.getDay()));
    let last = NSDateFromString(lastDayString);

    return last;
}

export function MCDateGetFirstDateOfTheMonth(month:number, year:number) : Date {
    return new Date(year, month, 1);    
}

export function MCDateGetFirstDayOfTheMonth(month:number, year:number) : number {
    let d = MCDateGetFirstDateOfTheMonth(month, year);
    return d.getDate();
}

export function MCDateGetLastDateOfTheMonth(month:number, year:number) : Date {
    return new Date(year, month + 1, 0);
}

export function MCDateGetLastDayOfTheMonth(month:number, year:number) : number {
    let d = MCDateGetLastDateOfTheMonth(month, year);
    return d.getDate();
}

export function MCDateCopy(date:Date) : Date {    
    return new Date(date.getTime());
}