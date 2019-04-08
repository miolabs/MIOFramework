"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NSDateFirstWeekDay;
(function (NSDateFirstWeekDay) {
    NSDateFirstWeekDay[NSDateFirstWeekDay["Sunday"] = 0] = "Sunday";
    NSDateFirstWeekDay[NSDateFirstWeekDay["Monday"] = 1] = "Monday";
})(NSDateFirstWeekDay = exports.NSDateFirstWeekDay || (exports.NSDateFirstWeekDay = {}));
var _NSDateFirstWeekDay = NSDateFirstWeekDay.Monday;
var _NSDateStringDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var _NSDateStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function NSDateSetFirstWeekDay(day) {
    _NSDateFirstWeekDay = day;
    if (day == NSDateFirstWeekDay.Sunday)
        _NSDateStringDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    else
        _NSDateStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}
exports.NSDateSetFirstWeekDay = NSDateSetFirstWeekDay;
function NSDateGetStringForMonth(month) {
    return _NSDateStringMonths[month];
}
exports.NSDateGetStringForMonth = NSDateGetStringForMonth;
function NSDateGetStringForDay(day) {
    return _NSDateStringDays[day];
}
exports.NSDateGetStringForDay = NSDateGetStringForDay;
function NSDateGetDayFromDate(date) {
    if (_NSDateFirstWeekDay == NSDateFirstWeekDay.Sunday)
        return date.getDay();
    var day = date.getDay();
    if (day == 0)
        day = 6;
    else
        day--;
    return day;
}
exports.NSDateGetDayFromDate = NSDateGetDayFromDate;
function NSDateGetMonthFromDate(date) {
    return date.getMonth();
}
exports.NSDateGetMonthFromDate = NSDateGetMonthFromDate;
function NSDateGetYearFromDate(date) {
    return date.getFullYear();
}
exports.NSDateGetYearFromDate = NSDateGetYearFromDate;
function NSDateGetDayStringFromDate(date) {
    var day = NSDateGetDayFromDate(date);
    return NSDateGetStringForDay(day);
}
exports.NSDateGetDayStringFromDate = NSDateGetDayStringFromDate;
function NSDateGetString(date) {
    var d = NSDateGetDateString(date);
    var t = NSDateGetTimeString(date);
    return d + " " + t;
}
exports.NSDateGetString = NSDateGetString;
function NSDateGetDateString(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
}
exports.NSDateGetDateString = NSDateGetDateString;
function NSDateGetTimeString(date) {
    var hh = date.getHours().toString();
    var mm = date.getMinutes().toString();
    return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]);
}
exports.NSDateGetTimeString = NSDateGetTimeString;
function NSDateGetUTCString(date) {
    var d = NSDateGetUTCDateString(date);
    var t = NSDateGetUTCTimeString(date);
    return d + " " + t;
}
exports.NSDateGetUTCString = NSDateGetUTCString;
function NSDateGetUTCDateString(date) {
    var yyyy = date.getUTCFullYear().toString();
    var mm = (date.getUTCMonth() + 1).toString();
    var dd = date.getUTCDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
}
exports.NSDateGetUTCDateString = NSDateGetUTCDateString;
function NSDateGetUTCTimeString(date) {
    var hh = date.getUTCHours().toString();
    var mm = date.getUTCMinutes().toString();
    var ss = date.getUTCSeconds().toString();
    return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);
}
exports.NSDateGetUTCTimeString = NSDateGetUTCTimeString;
function NSDateFromString(string) {
    var lexer = new NSCoreLexer(string);
    lexer.addTokenType(0, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/i);
    lexer.addTokenType(1, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2})/i);
    lexer.addTokenType(2, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2})/i);
    lexer.tokenize();
    var y = -1;
    var m = -1;
    var d = -1;
    var h = -1;
    var mm = -1;
    var s = -1;
    var token = lexer.nextToken();
    while (token != null) {
        switch (token.type) {
            case 0:
                y = token.matches[1];
                m = token.matches[2] - 1;
                d = token.matches[3];
                h = token.matches[4];
                mm = token.matches[5];
                s = token.matches[6];
                break;
            case 1:
                y = token.matches[1];
                m = token.matches[2] - 1;
                d = token.matches[3];
                h = token.matches[4];
                mm = token.matches[5];
                break;
            case 2:
                y = token.matches[1];
                m = token.matches[2] - 1;
                d = token.matches[3];
                break;
            default:
                return null;
        }
        token = lexer.nextToken();
    }
    if (h == -1)
        h = 0;
    if (mm == -1)
        mm = 0;
    if (s == -1)
        s = 0;
    var date = new Date(y, m, d, h, mm, s);
    return date;
}
exports.NSDateFromString = NSDateFromString;
function NSDateToUTC(date) {
    var dif = date.getTimezoneOffset();
    var d = new Date();
    d.setTime(date.getTime() + (dif * 60 * 1000));
    return d;
}
exports.NSDateToUTC = NSDateToUTC;
function NSDateAddDaysToDateString(dateString, days) {
    var d = NSDateFromString(dateString);
    d.setDate(d.getDate() + parseInt(days));
    var ds = NSDateGetDateString(d);
    return ds;
}
exports.NSDateAddDaysToDateString = NSDateAddDaysToDateString;
function NSDateRemoveDaysToDateString(dateString, days) {
    var d = NSDateFromString(dateString);
    d.setDate(d.getDate() - parseInt(days));
    var ds = NSDateGetDateString(d);
    return ds;
}
exports.NSDateRemoveDaysToDateString = NSDateRemoveDaysToDateString;
function NSDateFromMiliseconds(miliseconds) {
    var mEpoch = parseInt(miliseconds);
    if (mEpoch < 10000000000)
        mEpoch *= 1000;
    var ds = new Date();
    ds.setTime(mEpoch);
    return ds;
}
exports.NSDateFromMiliseconds = NSDateFromMiliseconds;
function isDate(x) {
    return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate);
}
exports.isDate = isDate;
function NSDateToday() {
    var d = new Date();
    d.setHours(0, 0, 0);
    return d;
}
exports.NSDateToday = NSDateToday;
function NSDateNow() {
    return new Date();
}
exports.NSDateNow = NSDateNow;
function NSDateTodayString() {
    var d = NSDateToday();
    return NSDateGetString(d);
}
exports.NSDateTodayString = NSDateTodayString;
function NSDateYesterday() {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0, 0, 0);
    return d;
}
exports.NSDateYesterday = NSDateYesterday;
function NSDateTomorrow() {
    var d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0, 0, 0);
    return d;
}
exports.NSDateTomorrow = NSDateTomorrow;
function NSDateGetFirstDayOfTheWeek(date) {
    var dayString = NSDateGetDateString(date);
    var firstDayString = NSDateRemoveDaysToDateString(dayString, date.getDay() - 1);
    var first = NSDateFromString(firstDayString);
    return first;
}
exports.NSDateGetFirstDayOfTheWeek = NSDateGetFirstDayOfTheWeek;
function NSDateGetLastDayOfTheWeek(date) {
    var dayString = NSDateGetDateString(date);
    var lastDayString = NSDateAddDaysToDateString(dayString, (7 - date.getDay()));
    var last = NSDateFromString(lastDayString);
    return last;
}
exports.NSDateGetLastDayOfTheWeek = NSDateGetLastDayOfTheWeek;
function NSDateGetFirstDateOfTheMonth(month, year) {
    return new Date(year, month, 1);
}
exports.NSDateGetFirstDateOfTheMonth = NSDateGetFirstDateOfTheMonth;
function NSDateGetFirstDayOfTheMonth(month, year) {
    var d = NSDateGetFirstDateOfTheMonth(month, year);
    return d.getDate();
}
exports.NSDateGetFirstDayOfTheMonth = NSDateGetFirstDayOfTheMonth;
function NSDateGetLastDateOfTheMonth(month, year) {
    return new Date(year, month + 1, 0);
}
exports.NSDateGetLastDateOfTheMonth = NSDateGetLastDateOfTheMonth;
function NSDateGetLastDayOfTheMonth(month, year) {
    var d = NSDateGetLastDateOfTheMonth(month, year);
    return d.getDate();
}
exports.NSDateGetLastDayOfTheMonth = NSDateGetLastDayOfTheMonth;
function NSDateCopy(date) {
    return new Date(date.getTime());
}
exports.NSDateCopy = NSDateCopy;
//# sourceMappingURL=NSDate.js.map