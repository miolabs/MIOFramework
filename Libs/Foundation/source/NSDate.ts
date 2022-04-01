// import { MIOCoreLexer } from "./core/MIOCoreLexer";

/**
 * Created by godshadow on 11/3/16.
 */

enum NSDateFirstWeekDay{
    Sunday,
    Monday
}

var _NSDateFirstWeekDay = NSDateFirstWeekDay.Monday;
var _NSDateStringDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var _NSDateStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function NSDateSetFirstWeekDay(day:NSDateFirstWeekDay){

    _NSDateFirstWeekDay = day;
    if (day == NSDateFirstWeekDay.Sunday)
        _NSDateStringDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    else
        _NSDateStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}

function NSDateGetStringForMonth(month)
{
    return _NSDateStringMonths[month];
}

function NSDateGetStringForDay(day:number)
{
    return _NSDateStringDays[day];
}

function NSDateGetDayFromDate(date) 
{
    if (_NSDateFirstWeekDay == NSDateFirstWeekDay.Sunday) return date.getDay();    

    // Transform to start on Monday instead of Sunday
    // 0 - Mon, 1 - Tue, 2 - Wed, 3 - Thu, 4 - Fri, 5 - Sat, 6 - Sun
    let day = date.getDay();
    if (day == 0)
        day = 6;
    else
        day--;

    return day;
}

function NSDateGetMonthFromDate(date:Date)
{
    return date.getMonth();
}

function NSDateGetYearFromDate(date:Date)
{
    return date.getFullYear();
}

function NSDateGetDayStringFromDate(date) 
{
    var day = NSDateGetDayFromDate(date);
    return NSDateGetStringForDay(day);
}

function NSDateGetString(date)
{
    var d = NSDateGetDateString(date);
    var t = NSDateGetTimeString(date);

    return d + " " + t;
}

function NSDateGetDateString(date)
{
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    return yyyy + "-" +(mm[1]?mm:"0"+mm[0]) + "-" +  (dd[1]?dd:"0"+dd[0]); // padding
}

function NSDateGetTimeString(date)
{
    var hh = date.getHours().toString();
    var mm = date.getMinutes().toString();
    return (hh[1]?hh:"0"+hh[0]) + ":" + (mm[1]?mm:"0"+mm[0]);
}

function NSDateGetUTCString(date)
{
    var d = NSDateGetUTCDateString(date);
    var t = NSDateGetUTCTimeString(date);

    return d + " " + t;
}

function NSDateGetUTCDateString(date)
{
    var yyyy = date.getUTCFullYear().toString();
    var mm = (date.getUTCMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getUTCDate().toString();
    return yyyy + "-" +(mm[1]?mm:"0"+mm[0]) + "-" +  (dd[1]?dd:"0"+dd[0]); // padding
}

function NSDateGetUTCTimeString(date)
{
    var hh = date.getUTCHours().toString();
    var mm = date.getUTCMinutes().toString();
    var ss = date.getUTCSeconds().toString();
    return (hh[1]?hh:"0" + hh[0]) + ":" + (mm[1]?mm:"0" + mm[0]) + ":" + (ss[1]?ss:"0" + ss[0]);
}

function NSDateFromString(string)
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

function NSDateToUTC(date)
{
    var dif = date.getTimezoneOffset();
    let d = new Date();
    d.setTime(date.getTime() + (dif * 60 * 1000));

    return d;
}

function NSDateAddDaysToDateString(dateString, days)
{
    var d = NSDateFromString(dateString);
    d.setDate(d.getDate() + parseInt(days));
    var ds = NSDateGetDateString(d);

    return ds;
}

function NSDateRemoveDaysToDateString(dateString, days)
{
    var d = NSDateFromString(dateString);
    d.setDate(d.getDate() - parseInt(days));
    var ds = NSDateGetDateString(d);

    return ds;
}


function NSDateFromMiliseconds(miliseconds){
  var mEpoch = parseInt(miliseconds); 
  if(mEpoch<10000000000) mEpoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
  var ds = new Date();
  ds.setTime(mEpoch)
  return ds;
}

function isDate (x) 
{ 
  return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate); 
}

function NSDateToday(){
    var d = new Date();
    d.setHours(0,0,0);
    return d;
}

function NSDateNow(){
    return new Date();
}

function NSDateTodayString(){
    let d = NSDateToday();
    return NSDateGetString(d);
}

function NSDateYesterday(){
    let d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0,0,0);
    return d;
}

function NSDateTomorrow(){
    let d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0,0,0);
    return d;
}

function NSDateGetFirstDayOfTheWeek(date:Date){

    let dayString = NSDateGetDateString(date);
    // TODO: Check sunday start or monday start
    let firstDayString = NSDateRemoveDaysToDateString(dayString, date.getDay() - 1);
    let first = NSDateFromString(firstDayString);

    return first;
}

function NSDateGetLastDayOfTheWeek(date:Date){

    let dayString = NSDateGetDateString(date);
    // TODO: Check sunday start or monday start
    let lastDayString = NSDateAddDaysToDateString(dayString, (7 - date.getDay()));
    let last = NSDateFromString(lastDayString);

    return last;
}

function NSDateGetFirstDateOfTheMonth(month, year):Date{
    return new Date(year, month, 1);    
}

function NSDateGetFirstDayOfTheMonth(month, year){
    let d = NSDateGetFirstDateOfTheMonth(month, year);
    return d.getDate();
}

function NSDateGetLastDateOfTheMonth(month, year):Date{
    return new Date(year, month + 1, 0);
}

function NSDateGetLastDayOfTheMonth(month, year){
    let d = NSDateGetLastDateOfTheMonth(month, year);
    return d.getDate();
}

function NSDateCopy(date:Date):Date{    
    return new Date(date.getTime());
}