var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("core/MIOCoreTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MIOCorePlatformType;
    (function (MIOCorePlatformType) {
        MIOCorePlatformType[MIOCorePlatformType["Unknown"] = 0] = "Unknown";
        MIOCorePlatformType[MIOCorePlatformType["Node"] = 1] = "Node";
        MIOCorePlatformType[MIOCorePlatformType["Safari"] = 2] = "Safari";
        MIOCorePlatformType[MIOCorePlatformType["Chrome"] = 3] = "Chrome";
    })(MIOCorePlatformType = exports.MIOCorePlatformType || (exports.MIOCorePlatformType = {}));
});
define("core/MIOCoreLexer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MIOCoreLexer = (function () {
        function MIOCoreLexer(string) {
            this.input = null;
            this.tokenTypes = [];
            this.tokens = null;
            this.tokenIndex = -1;
            this.ignoreTokenTypes = [];
            this.input = string;
        }
        MIOCoreLexer.prototype.addTokenType = function (type, regex) {
            this.tokenTypes.push({ "regex": regex, "type": type });
        };
        MIOCoreLexer.prototype.ignoreTokenType = function (type) {
            this.ignoreTokenTypes.push(type);
        };
        MIOCoreLexer.prototype.tokenize = function () {
            this.tokens = this._tokenize();
            this.tokenIndex = 0;
        };
        MIOCoreLexer.prototype._tokenize = function () {
            var tokens = [];
            var foundToken = false;
            var matches;
            var i;
            var numTokenTypes = this.tokenTypes.length;
            do {
                foundToken = false;
                for (i = 0; i < numTokenTypes; i++) {
                    var regex = this.tokenTypes[i].regex;
                    var type = this.tokenTypes[i].type;
                    matches = regex.exec(this.input);
                    if (matches) {
                        if (this.ignoreTokenTypes.indexOf(type) == -1) {
                            tokens.push({ type: type, value: matches[0], matches: matches });
                        }
                        this.input = this.input.substring(matches[0].length);
                        foundToken = true;
                        break;
                    }
                }
                if (foundToken == false) {
                    throw new Error("MIOCoreLexer: Token doesn't match any pattern. (" + this.input + ")");
                }
            } while (this.input.length > 0);
            return tokens;
        };
        MIOCoreLexer.prototype.nextToken = function () {
            if (this.tokenIndex >= this.tokens.length) {
                return null;
            }
            var token = this.tokens[this.tokenIndex];
            this.tokenIndex++;
            var index = this.ignoreTokenTypes.indexOf(token.type);
            return index == -1 ? token : this.nextToken();
        };
        MIOCoreLexer.prototype.prevToken = function () {
            this.tokenIndex--;
            if (this.tokenIndex < 0) {
                return null;
            }
            var token = this.tokens[this.tokenIndex];
            var index = this.ignoreTokenTypes.indexOf(token.type);
            return index == -1 ? token : this.prevToken();
        };
        return MIOCoreLexer;
    }());
    exports.MIOCoreLexer = MIOCoreLexer;
});
define("platform/web/MIOCore_web", ["require", "exports", "core/MIOCoreTypes"], function (require, exports, MIOCoreTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function MIOCoreGetPlatform() {
        var agent = navigator.userAgent.toLowerCase();
        var browserType = MIOCoreTypes_1.MIOCorePlatformType.Unknown;
        if (agent.indexOf("chrome") != -1)
            browserType = MIOCoreTypes_1.MIOCorePlatformType.Chrome;
        else if (agent.indexOf("safari") != -1)
            browserType = MIOCoreTypes_1.MIOCorePlatformType.Safari;
        return browserType;
    }
    exports.MIOCoreGetPlatform = MIOCoreGetPlatform;
    function NSClassFromString(className) {
        return null;
    }
    exports.NSClassFromString = NSClassFromString;
});
;
Array.prototype.addObject = function () {
    return this.length;
};
Array.prototype.addObject = function (object) {
    this.push(object);
};
Array.prototype.removeObject = function (object) {
    var index = this.indexOf(object);
    if (index > -1) {
        this.splice(index, 1);
    }
};
Array.prototype.removeObjectAtIndex = function (index) {
    this.splice(index, 1);
};
Array.prototype.indexOfObject = function (object) {
    return this.indexOf(object);
};
Array.prototype.containsObject = function (object) {
    var index = this.indexOf(object);
    return index > -1 ? true : false;
};
Array.prototype.objectAtIndex = function (index) {
    return this[index];
};
Object.defineProperty(Array.prototype, "count", {
    get: function () {
        return this.length;
    },
    enumerable: true,
    configurable: true
});
Array.prototype.firstObject = function () {
    return this[0];
};
Array.prototype.lastObject = function () {
    return this[this.count - 1];
};
define("core/MIOCore", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function MIOCoreGetPlatform() {
        return null;
    }
    exports.MIOCoreGetPlatform = MIOCoreGetPlatform;
    function NSClassFromString(className) {
        return null;
    }
    exports.NSClassFromString = NSClassFromString;
});
define("NSObject", ["require", "exports", "core/MIOCore"], function (require, exports, MIOCore_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSObject = (function () {
        function NSObject() {
            this._className = null;
            this.keyPaths = {};
        }
        NSObject.prototype.getClassName = function () {
            if (this._className != null)
                return this._className;
            this._className = this.constructor["name"];
            return this._className;
        };
        Object.defineProperty(NSObject.prototype, "className", {
            get: function () {
                return this.getClassName();
            },
            enumerable: true,
            configurable: true
        });
        NSObject.prototype.init = function () { };
        NSObject.prototype._notifyValueChange = function (key, type) {
            var observers = this.keyPaths[key];
            if (observers == null)
                return;
            var obs = [];
            for (var count = 0; count < observers.length; count++) {
                var item = observers[count];
                obs.push(item);
            }
            for (var count = 0; count < obs.length; count++) {
                var item = obs[count];
                var o = item["OBS"];
                if (typeof o.observeValueForKeyPath === "function") {
                    var keyPath = item["KP"] != null ? item["KP"] : key;
                    var ctx = item["CTX"];
                    o.observeValueForKeyPath.call(o, keyPath, type, this, ctx);
                }
            }
        };
        NSObject.prototype.willChangeValueForKey = function (key) {
            this.willChangeValue(key);
        };
        NSObject.prototype.didChangeValueForKey = function (key) {
            this.didChangeValue(key);
        };
        NSObject.prototype.willChangeValue = function (key) {
            this._notifyValueChange(key, "will");
        };
        NSObject.prototype.didChangeValue = function (key) {
            this._notifyValueChange(key, "did");
        };
        NSObject.prototype._addObserver = function (obs, key, context, keyPath) {
            var observers = this.keyPaths[key];
            if (observers == null) {
                observers = [];
                this.keyPaths[key] = observers;
            }
            var item = { "OBS": obs };
            if (context != null)
                item["CTX"] = context;
            if (keyPath != null)
                item["KP"] = keyPath;
            observers.push(item);
        };
        NSObject.prototype._keyFromKeypath = function (keypath) {
            var index = keypath.indexOf('.');
            if (index == -1) {
                return [keypath, null];
            }
            var key = keypath.substring(0, index);
            var offset = keypath.substring(index + 1);
            return [key, offset];
        };
        NSObject.prototype.addObserver = function (obs, keypath, context) {
            var _a;
            var _b = this._keyFromKeypath(keypath), key = _b[0], offset = _b[1];
            if (offset == null) {
                this._addObserver(obs, key, context);
            }
            else {
                var obj = this;
                var exit = false;
                while (exit == false) {
                    if (offset == null) {
                        obj._addObserver(obs, key, context, keypath);
                        exit = true;
                    }
                    else {
                        obj = this.valueForKey(key);
                        _a = this._keyFromKeypath(offset), key = _a[0], offset = _a[1];
                    }
                    if (obj == null)
                        throw new Error("ERROR: Registering observer to null object");
                }
            }
        };
        NSObject.prototype.removeObserver = function (obs, keypath) {
            var observers = this.keyPaths[keypath];
            if (observers == null)
                return;
            var index = observers.indexOf(obs);
            observers.splice(index, 1);
        };
        NSObject.prototype.setValueForKey = function (value, key) {
            this.willChangeValue(key);
            this[key] = value;
            this.didChangeValue(value);
        };
        NSObject.prototype.valueForKey = function (key) {
            return this[key];
        };
        NSObject.prototype.valueForKeyPath = function (keyPath) {
            var _a;
            var _b = this._keyFromKeypath(keyPath), key = _b[0], offset = _b[1];
            var value = null;
            var obj = this;
            var exit = false;
            while (exit == false) {
                if (offset == null) {
                    value = obj.valueForKey(key);
                    exit = true;
                }
                else {
                    obj = obj.valueForKey(key);
                    _a = this._keyFromKeypath(offset), key = _a[0], offset = _a[1];
                    if (obj == null)
                        exit = true;
                }
            }
            return value;
        };
        NSObject.prototype.copy = function () {
            var obj = MIOCore_1.NSClassFromString(this.className);
            obj.init();
            return obj;
        };
        return NSObject;
    }());
    exports.NSObject = NSObject;
});
define("NSBundle", ["require", "exports", "NSObject"], function (require, exports, NSObject_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSBundle = (function (_super) {
        __extends(NSBundle, _super);
        function NSBundle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NSBundle;
    }(NSObject_1.NSObject));
});
define("NSCoder", ["require", "exports", "NSObject"], function (require, exports, NSObject_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSCoder = (function (_super) {
        __extends(NSCoder, _super);
        function NSCoder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NSCoder.prototype.decodeIntegerForKey = function (key) {
        };
        NSCoder.prototype.decodeObjectForKey = function (key) {
        };
        return NSCoder;
    }(NSObject_2.NSObject));
    exports.NSCoder = NSCoder;
});
define("NSDate", ["require", "exports", "core/MIOCoreLexer"], function (require, exports, MIOCoreLexer_1) {
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
        var lexer = new MIOCoreLexer_1.MIOCoreLexer(string);
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
});
define("NSFormatter", ["require", "exports", "NSObject"], function (require, exports, NSObject_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSFormatter = (function (_super) {
        __extends(NSFormatter, _super);
        function NSFormatter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NSFormatter.prototype.stringForObjectValue = function (value) {
            return value;
        };
        NSFormatter.prototype.getObjectValueForString = function (str) {
        };
        NSFormatter.prototype.editingStringForObjectValue = function (value) {
        };
        NSFormatter.prototype.isPartialStringValid = function (str) {
            var newStr = "";
            return [false, newStr];
        };
        return NSFormatter;
    }(NSObject_3.NSObject));
    exports.NSFormatter = NSFormatter;
});
define("NSDateFormatter", ["require", "exports", "NSFormatter", "core/MIOCore", "core/MIOCoreTypes"], function (require, exports, NSFormatter_1, MIOCore_2, MIOCoreTypes_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSDateFormatterStyle;
    (function (NSDateFormatterStyle) {
        NSDateFormatterStyle[NSDateFormatterStyle["NoStyle"] = 0] = "NoStyle";
        NSDateFormatterStyle[NSDateFormatterStyle["ShortStyle"] = 1] = "ShortStyle";
        NSDateFormatterStyle[NSDateFormatterStyle["MediumStyle"] = 2] = "MediumStyle";
        NSDateFormatterStyle[NSDateFormatterStyle["LongStyle"] = 3] = "LongStyle";
        NSDateFormatterStyle[NSDateFormatterStyle["FullStyle"] = 4] = "FullStyle";
    })(NSDateFormatterStyle = exports.NSDateFormatterStyle || (exports.NSDateFormatterStyle = {}));
    var NSDateFormatter = (function (_super) {
        __extends(NSDateFormatter, _super);
        function NSDateFormatter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.dateStyle = NSDateFormatterStyle.ShortStyle;
            _this.timeStyle = NSDateFormatterStyle.ShortStyle;
            _this.browserDateSeparatorSymbol = null;
            return _this;
        }
        NSDateFormatter.prototype.init = function () {
            _super.prototype.init.call(this);
            var browser = MIOCore_2.MIOCoreGetPlatform();
            if (browser == MIOCoreTypes_2.MIOCorePlatformType.Safari)
                this.browserDateSeparatorSymbol = "/";
            else
                this.browserDateSeparatorSymbol = "-";
        };
        NSDateFormatter.prototype.dateFromString = function (str) {
            var _a;
            var result, value, dateString;
            if (!str || str.length <= 0)
                return null;
            _a = this._parse(str), result = _a[0], value = _a[1], dateString = _a[2];
            if (result == true) {
                var date = Date.parse(dateString);
                return isNaN(date) == false ? new Date(dateString) : null;
            }
            return null;
        };
        NSDateFormatter.prototype.stringFromDate = function (date) {
            return this.stringForObjectValue(date);
        };
        NSDateFormatter.prototype.stringForObjectValue = function (value) {
            var date = value;
            if (date == null)
                return null;
            var str = "";
            switch (this.dateStyle) {
                case NSDateFormatterStyle.ShortStyle:
                    str = this._shortDateStyle(date);
                    break;
                case NSDateFormatterStyle.FullStyle:
                    str = this._fullDateStyle(date);
                    break;
            }
            if (this.dateStyle != NSDateFormatterStyle.NoStyle && this.timeStyle != NSDateFormatterStyle.NoStyle)
                str += " ";
            switch (this.timeStyle) {
                case NSDateFormatterStyle.ShortStyle:
                    str += this._shortTimeStyle(date);
                    break;
            }
            return str;
        };
        NSDateFormatter.prototype.isPartialStringValid = function (str) {
            var _a;
            if (str.length == 0)
                return [true, str];
            var result, newStr;
            _a = this._parse(str), result = _a[0], newStr = _a[1];
            return [result, newStr];
        };
        NSDateFormatter.prototype._parse = function (str) {
            var _a, _b;
            var result, newStr, value, offset;
            var dateString = "";
            if (this.dateStyle != NSDateFormatterStyle.NoStyle) {
                _a = this._parseDate(str), result = _a[0], newStr = _a[1], value = _a[2], offset = _a[3];
                if (result == false)
                    return [result, newStr, value];
                dateString = value;
            }
            else {
                var today = new Date();
                dateString = this.iso8601DateStyle(today);
            }
            if (this.timeStyle != NSDateFormatterStyle.NoStyle) {
                var timeString = str;
                if (offset > 0)
                    timeString = str.substr(offset, str.length - offset);
                _b = this._parseTime(timeString), result = _b[0], newStr = _b[1], value = _b[2];
                if (result == false) {
                    return [result, newStr, value];
                }
                dateString += " " + value;
            }
            return [result, newStr, dateString];
        };
        NSDateFormatter.prototype._parseDate = function (str) {
            var _a, _b, _c;
            var chIndex = 0;
            var parseString = "";
            var step = 0;
            var dd = "";
            var mm = "";
            var yy = "";
            for (var index = 0; index < str.length; index++) {
                var ch = str[index];
                chIndex++;
                if (ch == "-" || ch == "." || ch == "/") {
                    if (parseString.length == 0)
                        return [false, parseString, "", chIndex];
                    parseString += "/";
                    step++;
                }
                else if (ch == " ") {
                    break;
                }
                else {
                    var r = void 0, value = void 0;
                    switch (step) {
                        case 0:
                            _a = this._parseDay(ch, dd), r = _a[0], dd = _a[1];
                            break;
                        case 1:
                            _b = this._parseMonth(ch, mm), r = _b[0], mm = _b[1];
                            break;
                        case 2:
                            _c = this._parseYear(ch, yy), r = _c[0], yy = _c[1];
                            break;
                    }
                    if (r == true)
                        parseString += ch;
                    else
                        return [false, parseString, "", chIndex];
                }
            }
            var result = true;
            if (dd.length > 0)
                result = result && this._validateDay(dd);
            if (mm.length > 0)
                result = result && this._validateMonth(mm);
            if (yy.length > 0)
                result = result && this._validateYear(yy);
            if (result == false)
                return [false, parseString, null, chIndex];
            var dateString = (yy[3] ? yy : ("20" + yy)) + this.browserDateSeparatorSymbol + (mm[1] ? mm : "0" + mm) + this.browserDateSeparatorSymbol + (dd[1] ? dd : "0" + dd);
            return [true, parseString, dateString, chIndex];
        };
        NSDateFormatter.prototype._parseDay = function (ch, dd) {
            var c = parseInt(ch);
            if (isNaN(c))
                return [false, dd];
            var v = parseInt(dd + ch);
            return [true, dd + ch];
        };
        NSDateFormatter.prototype._validateDay = function (dd) {
            var v = parseInt(dd);
            if (isNaN(v))
                return false;
            if (dd < 1 || dd > 31)
                return false;
            return true;
        };
        NSDateFormatter.prototype._parseMonth = function (ch, mm) {
            var c = parseInt(ch);
            if (isNaN(c))
                return [false, mm];
            var v = parseInt(mm + ch);
            return [true, mm + ch];
        };
        NSDateFormatter.prototype._validateMonth = function (mm) {
            var v = parseInt(mm);
            if (isNaN(v))
                return false;
            if (v < 1 || v > 12)
                return false;
            return true;
        };
        NSDateFormatter.prototype._parseYear = function (ch, yy) {
            var c = parseInt(ch);
            if (isNaN(c))
                return [false, yy];
            var v = parseInt(yy + ch);
            return [true, yy + ch];
        };
        NSDateFormatter.prototype._validateYear = function (yy) {
            var v = parseInt(yy);
            if (isNaN(yy) == true)
                return false;
            if (v > 3000)
                return false;
            return true;
        };
        NSDateFormatter.prototype.iso8601DateStyle = function (date) {
            var dd = date.getDate().toString();
            var mm = (date.getMonth() + 1).toString();
            var yy = date.getFullYear().toString();
            return yy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
        };
        NSDateFormatter.prototype._shortDateStyle = function (date, separatorString) {
            var separator = separatorString ? separatorString : "/";
            var d = date.getDate().toString();
            var m = (date.getMonth() + 1).toString();
            var y = date.getFullYear().toString();
            return (d[1] ? d : 0 + d) + separator + (m[1] ? m : "0" + m) + separator + y;
        };
        NSDateFormatter.prototype._fullDateStyle = function (date) {
            var day = _NSDateFormatterStringDays[date.getDay()];
            var month = _NSDateFormatterStringMonths[date.getMonth()];
            return day + ", " + month + " " + date.getDate() + ", " + date.getFullYear();
        };
        NSDateFormatter.prototype._parseTime = function (str) {
            var _a, _b, _c;
            var parseString = "";
            var step = 0;
            var hh = "";
            var mm = "";
            var ss = "";
            for (var index = 0; index < str.length; index++) {
                var ch = str[index];
                if (ch == ":" || ch == ".") {
                    if (parseString.length == 0)
                        return [false, parseString, ""];
                    parseString += ":";
                    step++;
                }
                else {
                    var result = void 0, value = void 0;
                    switch (step) {
                        case 0:
                            _a = this._parseHour(ch, hh), result = _a[0], hh = _a[1];
                            break;
                        case 1:
                            _b = this._parseMinute(ch, mm), result = _b[0], mm = _b[1];
                            break;
                        case 2:
                            _c = this._parseSecond(ch, ss), result = _c[0], ss = _c[1];
                            break;
                    }
                    if (result == true)
                        parseString += ch;
                    else
                        return [false, parseString, ""];
                }
            }
            var hourString = (hh[1] ? hh : ("0" + hh));
            if (mm.length > 0)
                hourString += ":" + (mm[1] ? mm : ("0" + mm));
            else
                hourString += ":00";
            if (ss.length > 0)
                hourString += ":" + (ss[1] ? ss : ("0" + ss));
            else
                hourString += ":00";
            return [true, parseString, hourString];
        };
        NSDateFormatter.prototype._parseHour = function (ch, hh) {
            var c = parseInt(ch);
            if (isNaN(c))
                return [false, hh];
            var v = parseInt(hh + ch);
            if (v < 0 || v > 23)
                return [false, hh];
            return [true, hh + ch];
        };
        NSDateFormatter.prototype._parseMinute = function (ch, mm) {
            var c = parseInt(ch);
            if (isNaN(c))
                return [false, mm];
            var v = parseInt(mm + ch);
            if (v < 0 || v > 59)
                return [false, mm];
            return [true, mm + ch];
        };
        NSDateFormatter.prototype._parseSecond = function (ch, ss) {
            var c = parseInt(ch);
            if (isNaN(c))
                return [false, ss];
            var v = parseInt(ss + ch);
            if (v < 0 || v > 59)
                return [false, ss];
            return [true, ss + ch];
        };
        NSDateFormatter.prototype.iso8601TimeStyle = function (date) {
            var hh = date.getHours().toString();
            var mm = date.getMinutes().toString();
            var ss = date.getSeconds().toString();
            return (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);
        };
        NSDateFormatter.prototype._shortTimeStyle = function (date) {
            var h = date.getHours().toString();
            var m = date.getMinutes().toString();
            return (h[1] ? h : "0" + h) + ":" + (m[1] ? m : "0" + m);
        };
        return NSDateFormatter;
    }(NSFormatter_1.NSFormatter));
    exports.NSDateFormatter = NSDateFormatter;
    var _NSDateFormatterStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var _NSDateFormatterStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
});
define("NSNumber", ["require", "exports", "NSObject"], function (require, exports, NSObject_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSNumber = (function (_super) {
        __extends(NSNumber, _super);
        function NSNumber() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.storeValue = null;
            return _this;
        }
        NSNumber.numberWithBool = function (value) {
            var n = new NSNumber();
            n.initWithBool(value);
            return n;
        };
        NSNumber.numberWithInteger = function (value) {
            var n = new NSNumber();
            n.initWithInteger(value);
            return n;
        };
        NSNumber.numberWithFloat = function (value) {
            var n = new NSNumber();
            n.initWithFloat(value);
            return n;
        };
        NSNumber.prototype.initWithBool = function (value) {
            if (isNaN(value) || value == null) {
                this.storeValue = 1;
            }
            else {
                this.storeValue = value ? 0 : 1;
            }
        };
        NSNumber.prototype.initWithInteger = function (value) {
            if (isNaN(value) || value == null) {
                this.storeValue = 0;
            }
            else {
                this.storeValue = value;
            }
        };
        NSNumber.prototype.initWithFloat = function (value) {
            if (isNaN(value) || value == null) {
                this.storeValue = 0.0;
            }
            else {
                this.storeValue = value;
            }
        };
        return NSNumber;
    }(NSObject_4.NSObject));
    exports.NSNumber = NSNumber;
});
define("NSDecimalNumber", ["require", "exports", "NSNumber", "decimal.js"], function (require, exports, NSNumber_1, decimal_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSDecimalNumber = (function (_super) {
        __extends(NSDecimalNumber, _super);
        function NSDecimalNumber() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NSDecimalNumber.decimalNumberWithString = function (str) {
            var dn = new NSDecimalNumber();
            dn.initWithString(str);
            return dn;
        };
        NSDecimalNumber.one = function () {
            return NSDecimalNumber.numberWithInteger(1);
        };
        NSDecimalNumber.zero = function () {
            return NSDecimalNumber.numberWithInteger(0);
        };
        NSDecimalNumber.numberWithBool = function (value) {
            var n = new NSDecimalNumber();
            n._initWithValue(value);
            return n;
        };
        NSDecimalNumber.numberWithInteger = function (value) {
            var n = new NSDecimalNumber();
            n._initWithValue(value);
            return n;
        };
        NSDecimalNumber.numberWithFloat = function (value) {
            var n = new NSDecimalNumber();
            n._initWithValue(value);
            return n;
        };
        NSDecimalNumber.prototype.initWithString = function (str) {
            this._initWithValue(str);
        };
        NSDecimalNumber.prototype.initWithDecimal = function (value) {
            _super.prototype.init.call(this);
            if (isNaN(value) || value == null) {
                this.storeValue = new decimal_js_1.Decimal(0);
            }
            else {
                this.storeValue = value;
            }
        };
        NSDecimalNumber.prototype._initWithValue = function (value) {
            _super.prototype.init.call(this);
            this.storeValue = new decimal_js_1.Decimal(value || 0);
        };
        NSDecimalNumber.prototype.decimalNumberByAdding = function (value) {
            var dv = new NSDecimalNumber();
            dv.initWithDecimal(this.storeValue.add(value.storeValue));
            return dv;
        };
        NSDecimalNumber.prototype.decimalNumberBySubtracting = function (value) {
            var dv = new NSDecimalNumber();
            dv.initWithDecimal(this.storeValue.sub(value.storeValue));
            return dv;
        };
        NSDecimalNumber.prototype.decimalNumberByMultiplyingBy = function (value) {
            var dv = new NSDecimalNumber();
            dv.initWithDecimal(this.storeValue.mul(value.storeValue));
            return dv;
        };
        NSDecimalNumber.prototype.decimalNumberByDividingBy = function (value) {
            var dv = new NSDecimalNumber();
            dv.initWithDecimal(this.storeValue.div(value.storeValue));
            return dv;
        };
        Object.defineProperty(NSDecimalNumber.prototype, "decimalValue", {
            get: function () {
                return this.storeValue.toNumber();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSDecimalNumber.prototype, "floatValue", {
            get: function () {
                return this.storeValue.toNumber();
            },
            enumerable: true,
            configurable: true
        });
        return NSDecimalNumber;
    }(NSNumber_1.NSNumber));
    exports.NSDecimalNumber = NSDecimalNumber;
});
define("NSError", ["require", "exports", "NSObject"], function (require, exports, NSObject_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSError = (function (_super) {
        __extends(NSError, _super);
        function NSError() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.errorCode = 0;
            return _this;
        }
        return NSError;
    }(NSObject_5.NSObject));
    exports.NSError = NSError;
});
define("NSISO8601DateFormatter", ["require", "exports", "core/MIOCore", "core/MIOCoreTypes", "NSDateFormatter"], function (require, exports, MIOCore_3, MIOCoreTypes_3, NSDateFormatter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSISO8601DateFormatter = (function (_super) {
        __extends(NSISO8601DateFormatter, _super);
        function NSISO8601DateFormatter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.timeZone = null;
            return _this;
        }
        NSISO8601DateFormatter.iso8601DateFormatter = function () {
            var df = new NSISO8601DateFormatter();
            df.init();
            return df;
        };
        NSISO8601DateFormatter.prototype.dateFromString = function (str) {
            if (str == null)
                return null;
            var dateString = null;
            if (MIOCore_3.MIOCoreGetPlatform() == MIOCoreTypes_3.MIOCorePlatformType.Safari) {
                dateString = str.split('-').join("/");
                if (dateString.length > 19)
                    dateString = dateString.substr(0, 19);
            }
            else
                dateString = str;
            var timestamp = Date.parse(dateString);
            var d = null;
            if (isNaN(timestamp) == false) {
                d = new Date(dateString);
            }
            else {
                console.log("DATE FORMATTER: Error, invalid date");
            }
            return d;
        };
        NSISO8601DateFormatter.prototype.stringFromDate = function (date) {
            var str = "";
            if (date == null)
                return null;
            if (this.dateStyle != NSDateFormatter_1.NSDateFormatterStyle.NoStyle) {
                str += this.iso8601DateStyle(date);
            }
            if (this.timeStyle != NSDateFormatter_1.NSDateFormatterStyle.NoStyle) {
                if (str.length > 0)
                    str += " ";
                str += this.iso8601TimeStyle(date);
            }
            return str;
        };
        return NSISO8601DateFormatter;
    }(NSDateFormatter_1.NSDateFormatter));
    exports.NSISO8601DateFormatter = NSISO8601DateFormatter;
});
define("NSIndexPath", ["require", "exports", "NSObject"], function (require, exports, NSObject_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function NSIndexPathEqual(indexPath1, indexPath2) {
        if (indexPath1 == null || indexPath2 == null)
            return false;
        if (indexPath1.section == indexPath2.section
            && indexPath1.row == indexPath2.row) {
            return true;
        }
        return false;
    }
    exports.NSIndexPathEqual = NSIndexPathEqual;
    var NSIndexPath = (function (_super) {
        __extends(NSIndexPath, _super);
        function NSIndexPath() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.indexes = [];
            return _this;
        }
        NSIndexPath.indexForRowInSection = function (row, section) {
            var ip = new NSIndexPath();
            ip.add(section);
            ip.add(row);
            return ip;
        };
        NSIndexPath.indexForColumnInRowAndSection = function (column, row, section) {
            var ip = NSIndexPath.indexForRowInSection(row, section);
            ip.add(column);
            return ip;
        };
        NSIndexPath.prototype.add = function (value) {
            this.indexes.push(value);
        };
        Object.defineProperty(NSIndexPath.prototype, "section", {
            get: function () {
                return this.indexes[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSIndexPath.prototype, "row", {
            get: function () {
                return this.indexes[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSIndexPath.prototype, "item", {
            get: function () {
                return this.indexes[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSIndexPath.prototype, "column", {
            get: function () {
                return this.indexes[2];
            },
            enumerable: true,
            configurable: true
        });
        NSIndexPath.prototype.isEqualToIndexPath = function (indexPath) {
            return NSIndexPathEqual(this, indexPath);
        };
        return NSIndexPath;
    }(NSObject_6.NSObject));
    exports.NSIndexPath = NSIndexPath;
});
define("NSLog", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function NSLog(format) {
        console.log(format);
    }
    exports.NSLog = NSLog;
});
define("NSXMLParser", ["require", "exports", "NSLog", "NSObject"], function (require, exports, NSLog_1, NSObject_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSXMLTokenType;
    (function (NSXMLTokenType) {
        NSXMLTokenType[NSXMLTokenType["Identifier"] = 0] = "Identifier";
        NSXMLTokenType[NSXMLTokenType["QuestionMark"] = 1] = "QuestionMark";
        NSXMLTokenType[NSXMLTokenType["ExclamationMark"] = 2] = "ExclamationMark";
        NSXMLTokenType[NSXMLTokenType["OpenTag"] = 3] = "OpenTag";
        NSXMLTokenType[NSXMLTokenType["CloseTag"] = 4] = "CloseTag";
        NSXMLTokenType[NSXMLTokenType["Slash"] = 5] = "Slash";
        NSXMLTokenType[NSXMLTokenType["Quote"] = 6] = "Quote";
        NSXMLTokenType[NSXMLTokenType["WhiteSpace"] = 7] = "WhiteSpace";
        NSXMLTokenType[NSXMLTokenType["End"] = 8] = "End";
    })(NSXMLTokenType = exports.NSXMLTokenType || (exports.NSXMLTokenType = {}));
    var NSXMLParser = (function (_super) {
        __extends(NSXMLParser, _super);
        function NSXMLParser() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.str = null;
            _this.delegate = null;
            _this.strIndex = 0;
            _this.elements = [];
            _this.attributes = null;
            _this.currentElement = null;
            _this.currentTokenValue = null;
            _this.lastTokenValue = null;
            _this.ignoreWhiteSpace = false;
            return _this;
        }
        NSXMLParser.prototype.initWithString = function (str, delegate) {
            this.str = str;
            this.delegate = delegate;
        };
        NSXMLParser.prototype.nextChar = function () {
            if (this.strIndex >= this.str.length)
                return null;
            var ch = this.str.charAt(this.strIndex);
            this.strIndex++;
            return ch;
        };
        NSXMLParser.prototype.prevChar = function () {
            this.strIndex--;
            return this.str.charAt(this.strIndex);
        };
        NSXMLParser.prototype.readToken = function () {
            var exit = false;
            var value = "";
            while (exit == false) {
                var ch = this.nextChar();
                if (ch == null)
                    return null;
                if (ch == "<" || ch == ">" || ch == "/" || ch == "?" || ch == "!") {
                    if (value.length > 0)
                        this.prevChar();
                    else
                        value = ch;
                    exit = true;
                }
                else if (ch == "\"" || ch == "'") {
                    value += ch;
                    var ch2 = this.nextChar();
                    while (ch2 != ch && ch2 != "<") {
                        value += ch2;
                        ch2 = this.nextChar();
                    }
                    if (ch2 != "<")
                        value += ch2;
                    else
                        this.prevChar();
                }
                else if (ch == " ") {
                    if (this.ignoreWhiteSpace == false) {
                        if (value != "")
                            this.prevChar();
                        else
                            value = " ";
                    }
                    exit = true;
                }
                else
                    value += ch;
            }
            return value;
        };
        NSXMLParser.prototype.nextToken = function () {
            this.lastTokenValue = this.currentTokenValue;
            var exit = false;
            var token = NSXMLTokenType.Identifier;
            var value = this.readToken();
            if (value == null)
                return [NSXMLTokenType.End, null];
            switch (value) {
                case "<":
                    token = NSXMLTokenType.OpenTag;
                    break;
                case ">":
                    token = NSXMLTokenType.CloseTag;
                    break;
                case "/":
                    token = NSXMLTokenType.Slash;
                    break;
                case "?":
                    token = NSXMLTokenType.QuestionMark;
                    break;
                case "!":
                    token = NSXMLTokenType.ExclamationMark;
                    break;
                case " ":
                    token = NSXMLTokenType.WhiteSpace;
                    break;
                default:
                    break;
            }
            this.currentTokenValue = token;
            return [token, value];
        };
        NSXMLParser.prototype.prevToken = function () {
            return this.lastTokenValue;
        };
        NSXMLParser.prototype.parse = function () {
            var _a, _b;
            if (typeof this.delegate.parserDidStartDocument === "function")
                this.delegate.parserDidStartDocument(this);
            var token, value;
            _a = this.nextToken(), token = _a[0], value = _a[1];
            while (token != NSXMLTokenType.End) {
                switch (token) {
                    case NSXMLTokenType.OpenTag:
                        this.ignoreWhiteSpace = true;
                        this.openTag();
                        this.ignoreWhiteSpace = false;
                        break;
                    case NSXMLTokenType.Identifier:
                    case NSXMLTokenType.Slash:
                    case NSXMLTokenType.WhiteSpace:
                        this.text(value);
                        break;
                    default:
                        break;
                }
                _b = this.nextToken(), token = _b[0], value = _b[1];
            }
            if (typeof this.delegate.parserDidEndDocument === "function")
                this.delegate.parserDidEndDocument(this);
        };
        NSXMLParser.prototype.openTag = function () {
            var _a;
            this.attributes = {};
            var token, value;
            _a = this.nextToken(), token = _a[0], value = _a[1];
            switch (token) {
                case NSXMLTokenType.Identifier:
                    this.beginElement(value);
                    break;
                case NSXMLTokenType.QuestionMark:
                    this.questionMark();
                    break;
                case NSXMLTokenType.ExclamationMark:
                    this.exclamationMark();
                    break;
                case NSXMLTokenType.Slash:
                    this.slash();
                    break;
                default:
                    this.error("Expected: element");
                    break;
            }
        };
        NSXMLParser.prototype.questionMark = function () {
            var _a;
            var token, val;
            _a = this.nextToken(), token = _a[0], val = _a[1];
            switch (token) {
                case NSXMLTokenType.Identifier:
                    this.xmlOpenTag(val);
                    break;
                case NSXMLTokenType.CloseTag:
                    this.xmlCloseTag();
                    break;
                default:
                    break;
            }
        };
        NSXMLParser.prototype.exclamationMark = function () {
            var ch = this.nextChar();
            var foundMark = 0;
            if (ch == "-") {
                foundMark++;
                ch = this.nextChar();
                if (ch == "-") {
                    foundMark++;
                }
            }
            if (foundMark < 2) {
                for (var i = 0; i < foundMark; i++) {
                    this.prevChar();
                }
            }
            else {
                var comments = "";
                var exit = false;
                while (exit == false) {
                    var ch2 = this.nextChar();
                    if (ch2 == null)
                        throw new Error("NSXMLParser: Unexpected end of file!");
                    comments += ch2;
                    if (comments.length >= 3 && comments.substr(-3) == "-->")
                        exit = true;
                }
                this.comments(comments.substr(0, comments.length - 3));
            }
        };
        NSXMLParser.prototype.xmlOpenTag = function (value) {
            var _a;
            var token, val;
            _a = this.nextToken(), token = _a[0], val = _a[1];
            switch (token) {
                case NSXMLTokenType.Identifier:
                    this.attribute(val);
                    break;
                case NSXMLTokenType.QuestionMark:
                    this.questionMark();
                    break;
                default:
                    break;
            }
        };
        NSXMLParser.prototype.xmlCloseTag = function () {
        };
        NSXMLParser.prototype.beginElement = function (value) {
            var _a;
            this.elements.push(value);
            this.currentElement = value;
            this.attributes = {};
            var token, val;
            _a = this.nextToken(), token = _a[0], val = _a[1];
            switch (token) {
                case NSXMLTokenType.Identifier:
                    this.attribute(val);
                    break;
                case NSXMLTokenType.Slash:
                    this.slash();
                    break;
                case NSXMLTokenType.CloseTag:
                    this.closeTag();
                    this.didStartElement();
                    break;
                default:
                    break;
            }
        };
        NSXMLParser.prototype.endElement = function (value) {
            var _a;
            this.attributes = {};
            this.currentElement = null;
            var token, val;
            _a = this.nextToken(), token = _a[0], val = _a[1];
            switch (token) {
                case NSXMLTokenType.CloseTag:
                    this.closeTag();
                    this.didEndElement();
                    break;
                default:
                    this.error("Expected: close token");
                    break;
            }
        };
        NSXMLParser.prototype.attribute = function (attr) {
            var _a;
            this.decodeAttribute(attr);
            var token, value;
            _a = this.nextToken(), token = _a[0], value = _a[1];
            switch (token) {
                case NSXMLTokenType.Identifier:
                    this.attribute(value);
                    break;
                case NSXMLTokenType.Slash:
                    this.slash();
                    break;
                case NSXMLTokenType.QuestionMark:
                    this.questionMark();
                    break;
                case NSXMLTokenType.CloseTag:
                    this.closeTag();
                    this.didStartElement();
                    break;
                default:
                    break;
            }
        };
        NSXMLParser.prototype.decodeAttribute = function (attr) {
            var key = null;
            var value = null;
            var token = "";
            for (var index = 0; index < attr.length; index++) {
                var ch = attr[index];
                if (ch == "=") {
                    key = token;
                    token = "";
                }
                else if (ch == "\"" || ch == "'") {
                    index++;
                    var ch2 = attr[index];
                    while (ch2 != ch) {
                        token += ch2;
                        index++;
                        ch2 = attr[index];
                    }
                }
                else {
                    token += ch;
                }
            }
            if (key != null && token.length > 0)
                value = token;
            else if (key == null && token.length > 0)
                key = token;
            this.attributes[key] = value;
        };
        NSXMLParser.prototype.slash = function () {
            var _a;
            var token, value;
            _a = this.nextToken(), token = _a[0], value = _a[1];
            switch (token) {
                case NSXMLTokenType.CloseTag:
                    this.closeTag();
                    this.didStartElement();
                    this.didEndElement();
                    break;
                case NSXMLTokenType.Identifier:
                    this.endElement(value);
                    break;
                default:
                    break;
            }
        };
        NSXMLParser.prototype.closeTag = function () {
        };
        NSXMLParser.prototype.didStartElement = function () {
            var element = this.currentElement;
            if (typeof this.delegate.parserDidStartElement === "function")
                this.delegate.parserDidStartElement(this, element, this.attributes);
            this.currentElement = null;
            this.attributes = {};
        };
        NSXMLParser.prototype.didEndElement = function () {
            var element = this.elements.pop();
            if (typeof this.delegate.parserDidEndElement === "function")
                this.delegate.parserDidEndElement(this, element);
        };
        NSXMLParser.prototype.text = function (value) {
            if (typeof this.delegate.parserFoundCharacters === "function")
                this.delegate.parserFoundCharacters(this, value);
        };
        NSXMLParser.prototype.comments = function (comment) {
            if (typeof this.delegate.parserFoundComment === "function")
                this.delegate.parserFoundComment(this, comment);
        };
        NSXMLParser.prototype.error = function (expected) {
            NSLog_1.NSLog("Error: Unexpected token. " + expected);
        };
        return NSXMLParser;
    }(NSObject_7.NSObject));
    exports.NSXMLParser = NSXMLParser;
});
define("NSPropertyListSerialization", ["require", "exports", "NSObject", "NSXMLParser"], function (require, exports, NSObject_8, NSXMLParser_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSPropertyListReadOptions;
    (function (NSPropertyListReadOptions) {
        NSPropertyListReadOptions[NSPropertyListReadOptions["None"] = 0] = "None";
    })(NSPropertyListReadOptions = exports.NSPropertyListReadOptions || (exports.NSPropertyListReadOptions = {}));
    var NSPropertyListFormatformat;
    (function (NSPropertyListFormatformat) {
        NSPropertyListFormatformat[NSPropertyListFormatformat["None"] = 0] = "None";
    })(NSPropertyListFormatformat = exports.NSPropertyListFormatformat || (exports.NSPropertyListFormatformat = {}));
    var NSPropertyListSerialization = (function (_super) {
        __extends(NSPropertyListSerialization, _super);
        function NSPropertyListSerialization() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.data = null;
            _this.rootItem = null;
            _this.currentElement = null;
            _this.currentElementType = null;
            _this.currentValue = null;
            _this.currentKey = null;
            _this.currentString = null;
            _this.itemStack = [];
            return _this;
        }
        NSPropertyListSerialization.propertyListWithData = function (data, options, format, error) {
            var pl = new NSPropertyListSerialization();
            pl.initWithData(data, options, format);
            var item = pl._parse(error);
            return item;
        };
        NSPropertyListSerialization.prototype.initWithData = function (data, options, format) {
            _super.prototype.init.call(this);
            this.data = data;
        };
        NSPropertyListSerialization.prototype._parse = function (error) {
            this.currentElement = null;
            var parser = new NSXMLParser_1.NSXMLParser();
            parser.initWithString(this.data, this);
            parser.parse();
            return this.rootItem;
        };
        NSPropertyListSerialization.prototype.parserDidStartElement = function (parser, element, attributes) {
            if (element == "dict") {
                var item = {};
                if (this.currentElement != null && this.currentElementType == 0) {
                    var key = this.currentKey;
                    this.currentElement[key] = item;
                }
                else if (this.currentElement != null && this.currentElementType == 1) {
                    this.currentElement.push(item);
                }
                this.currentElement = item;
                this.currentElementType = 0;
                this.itemStack.push({ "Element": item, "Type": 0 });
                if (this.rootItem == null)
                    this.rootItem = item;
            }
            else if (element == "array") {
                var item = [];
                if (this.currentElement != null && this.currentElementType == 0) {
                    var key = this.currentKey;
                    this.currentElement[key] = item;
                }
                else if (this.currentElement != null && this.currentElementType == 1) {
                    this.currentElement.push(item);
                }
                this.currentElement = item;
                this.currentElementType = 1;
                this.itemStack.push({ "Element": item, "Type": 1 });
                if (this.rootItem == null)
                    this.rootItem = item;
            }
            this.currentString = "";
        };
        NSPropertyListSerialization.prototype.parserFoundCharacters = function (parser, characters) {
            this.currentString += characters;
        };
        NSPropertyListSerialization.prototype.parserDidEndElement = function (parser, element) {
            if (element == "key") {
                this.currentKey = this.currentString;
            }
            else if (element == "string" || element == "integer" || element == "data") {
                this.currentValue = this.currentString;
                if (element == "integer")
                    this.currentValue = parseInt(this.currentString);
                if (this.currentElementType == 1)
                    this.currentElement.push(this.currentValue);
                else if (this.currentElementType == 0 && this.currentKey != null) {
                    var key = this.currentKey;
                    var value = this.currentValue;
                    this.currentElement[key] = value;
                }
            }
            else if (element == "dict" || element == "array") {
                if (this.itemStack.length > 1) {
                    var lastItem = this.itemStack[this.itemStack.length - 2];
                    this.currentElement = lastItem["Element"];
                    this.currentElementType = lastItem["Type"];
                }
                else {
                    this.currentElement = null;
                    this.currentElementType = null;
                }
                this.itemStack.splice(-1, 1);
            }
        };
        NSPropertyListSerialization.prototype.parserDidEndDocument = function (parser) {
        };
        return NSPropertyListSerialization;
    }(NSObject_8.NSObject));
    exports.NSPropertyListSerialization = NSPropertyListSerialization;
});
define("NSKeyedUnarchiver", ["require", "exports", "NSCoder", "NSPropertyListSerialization", "core/MIOCore"], function (require, exports, NSCoder_1, NSPropertyListSerialization_1, MIOCore_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSKeyedUnarchiver = (function (_super) {
        __extends(NSKeyedUnarchiver, _super);
        function NSKeyedUnarchiver() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.objects = null;
            _this.currentInfo = null;
            return _this;
        }
        NSKeyedUnarchiver.unarchiveTopLevelObjectWithData = function (data) {
            var coder = new NSKeyedUnarchiver();
            coder.init();
            return coder._parseData(data, null);
        };
        NSKeyedUnarchiver.prototype._parseData = function (data, error) {
            var items = NSPropertyListSerialization_1.NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);
            this.objects = items["$objects"];
            var rootIndex = items["$top"]["$0"]["CF$UID"];
            var rootInfo = this.objects[rootIndex];
            var obj = this.createObjectFromInfo(rootInfo);
            return obj;
        };
        NSKeyedUnarchiver.prototype.classFromInfo = function (info) {
            var name = info["$classname"];
            if (name == null) {
                var index = info["$class"]["CF$UID"];
                var objInfo = this.objects[index];
                name = this.classFromInfo(objInfo);
            }
            return name;
        };
        NSKeyedUnarchiver.prototype.createObjectFromInfo = function (info) {
            var classname = this.classFromInfo(info);
            switch (classname) {
                case "NSMutableArray":
                case "NSArray":
                    return this.createArray(info);
                case "NSMutableDictionary":
                case "NSDictionary":
                    return this.createDictionary(info);
                default:
                    return this.createObject(classname, info);
            }
        };
        NSKeyedUnarchiver.prototype.createObject = function (classname, info) {
            var obj = MIOCore_4.NSClassFromString(classname);
            this.currentInfo = info;
            obj.initWithCoder(this);
            this.currentInfo = null;
            return obj;
        };
        NSKeyedUnarchiver.prototype.decodeObjectForKey = function (key) {
            var obj = this.valueFromInfo(this.currentInfo[key]);
            return obj;
        };
        NSKeyedUnarchiver.prototype.createArray = function (info) {
            var objects = info["NS.objects"];
            var array = [];
            for (var index = 0; index < objects.length; index++) {
                var value = this.valueFromInfo(objects[index]);
                array.push(value);
            }
            return array;
        };
        NSKeyedUnarchiver.prototype.createDictionary = function (info) {
            var keys = info["NS.keys"];
            var objects = info["NS.objects"];
            var dict = {};
            for (var index = 0; index < keys.length; index++) {
                var k = this.valueFromInfo(keys[index]);
                var v = this.valueFromInfo(objects[index]);
                dict[k] = v;
            }
            return dict;
        };
        NSKeyedUnarchiver.prototype.valueFromInfo = function (info) {
            var index = info["CF$UID"];
            var value = this.objects[index];
            if (typeof value === "boolean")
                return value;
            if (typeof value === "number")
                return value;
            if (typeof value === "string" && value != "$null")
                return value;
            if (typeof value === "string" && value == "$null")
                return null;
            return this.createObjectFromInfo(value);
        };
        return NSKeyedUnarchiver;
    }(NSCoder_1.NSCoder));
    exports.NSKeyedUnarchiver = NSKeyedUnarchiver;
});
define("NSLocale", ["require", "exports", "NSObject"], function (require, exports, NSObject_9) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _NS_currentLocale;
    var NSLocale = (function (_super) {
        __extends(NSLocale, _super);
        function NSLocale() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.languageIdentifier = "es";
            _this.countryIdentifier = "ES";
            return _this;
        }
        NSLocale.currentLocale = function () {
            if (_NS_currentLocale == null) {
                _NS_currentLocale = new NSLocale();
                _NS_currentLocale.initWithLocaleIdentifier("es_ES");
            }
            return _NS_currentLocale;
        };
        NSLocale._setCurrentLocale = function (localeIdentifier) {
            _NS_currentLocale = new NSLocale();
            _NS_currentLocale.initWithLocaleIdentifier(localeIdentifier);
        };
        NSLocale.prototype.initWithLocaleIdentifier = function (identifer) {
            var array = identifer.split("_");
            if (array.length == 1) {
                this.languageIdentifier = array[0];
            }
            else if (array.length == 2) {
                this.languageIdentifier = array[0];
                this.countryIdentifier = array[1];
            }
        };
        Object.defineProperty(NSLocale.prototype, "decimalSeparator", {
            get: function () {
                var ds = "";
                switch (this.countryIdentifier) {
                    case "ES":
                        ds = ",";
                        break;
                    case "US":
                        ds = ".";
                        break;
                    case "UK":
                        ds = ".";
                        break;
                    case "AE":
                        ds = ".";
                        break;
                }
                return ds;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSLocale.prototype, "currencySymbol", {
            get: function () {
                var cs = "";
                switch (this.countryIdentifier) {
                    case "ES":
                    case "DE":
                    case "FR":
                    case "IT":
                    case "NL":
                        cs = "€";
                        break;
                    case "US":
                        cs = "$";
                        break;
                    case "UK":
                        cs = "£";
                        break;
                }
                return cs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSLocale.prototype, "currencyCode", {
            get: function () {
                var cc = "";
                switch (this.countryIdentifier) {
                    case "ES":
                    case "DE":
                    case "FR":
                    case "IT":
                    case "NL":
                        cc = "EUR";
                        break;
                    case "US":
                        cc = "USD";
                        break;
                    case "UK":
                        cc = "GBP";
                        break;
                    case "AE":
                        cc = "AED";
                }
                return cc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSLocale.prototype, "groupingSeparator", {
            get: function () {
                var gs = "";
                switch (this.countryIdentifier) {
                    case "ES":
                        gs = ".";
                        break;
                    case "US":
                        gs = ",";
                        break;
                    case "UK":
                        gs = ",";
                        break;
                    case "AE":
                        gs = ",";
                        break;
                }
                return gs;
            },
            enumerable: true,
            configurable: true
        });
        return NSLocale;
    }(NSObject_9.NSObject));
    exports.NSLocale = NSLocale;
});
define("NSNotificationCenter", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSNotification = (function () {
        function NSNotification(name, object, userInfo) {
            this.name = null;
            this.object = null;
            this.userInfo = null;
            this.name = name;
            this.object = object;
            this.userInfo = userInfo;
        }
        return NSNotification;
    }());
    exports.NSNotification = NSNotification;
    var NSNotificationCenter = (function () {
        function NSNotificationCenter() {
            this.notificationNames = {};
            if (NSNotificationCenter._sharedInstance) {
                throw new Error("Error: Instantiation failed: Use defaultCenter() instead of new.");
            }
            NSNotificationCenter._sharedInstance = this;
        }
        NSNotificationCenter.defaultCenter = function () {
            return NSNotificationCenter._sharedInstance;
        };
        NSNotificationCenter.prototype.addObserver = function (obs, name, fn) {
            var notes = this.notificationNames[name];
            if (notes == null) {
                notes = [];
            }
            var item = { "observer": obs, "function": fn };
            notes.push(item);
            this.notificationNames[name] = notes;
        };
        ;
        NSNotificationCenter.prototype.removeObserver = function (obs, name) {
            var notes = this.notificationNames[name];
            if (notes == null)
                return;
            var index = -1;
            for (var count = 0; count < notes.length; count++) {
                var item = notes[count];
                var obsAux = item["observer"];
                if (obsAux === obs) {
                    index = count;
                    break;
                }
            }
            if (index > -1) {
                notes.splice(index, 1);
            }
        };
        NSNotificationCenter.prototype.postNotification = function (name, object, userInfo) {
            var notes = this.notificationNames[name];
            if (notes == null)
                return;
            var n = new NSNotification(name, object, userInfo);
            for (var count = 0; count < notes.length; count++) {
                var item = notes[count];
                var obs = item["observer"];
                var fn = item["function"];
                fn.call(obs, n);
            }
        };
        NSNotificationCenter._sharedInstance = new NSNotificationCenter();
        return NSNotificationCenter;
    }());
    exports.NSNotificationCenter = NSNotificationCenter;
});
define("NSNull", ["require", "exports", "NSObject"], function (require, exports, NSObject_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSNull = (function (_super) {
        __extends(NSNull, _super);
        function NSNull() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NSNull.nullValue = function () {
            var n = new NSNull();
            n.init();
            return n;
        };
        return NSNull;
    }(NSObject_10.NSObject));
    exports.NSNull = NSNull;
});
define("NSNumberFormatter", ["require", "exports", "NSFormatter", "NSLocale"], function (require, exports, NSFormatter_2, NSLocale_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSNumberFormatterStyle;
    (function (NSNumberFormatterStyle) {
        NSNumberFormatterStyle[NSNumberFormatterStyle["NoStyle"] = 0] = "NoStyle";
        NSNumberFormatterStyle[NSNumberFormatterStyle["DecimalStyle"] = 1] = "DecimalStyle";
        NSNumberFormatterStyle[NSNumberFormatterStyle["CurrencyStyle"] = 2] = "CurrencyStyle";
        NSNumberFormatterStyle[NSNumberFormatterStyle["CurrencyISOCodeStyle"] = 3] = "CurrencyISOCodeStyle";
        NSNumberFormatterStyle[NSNumberFormatterStyle["PercentStyle"] = 4] = "PercentStyle";
    })(NSNumberFormatterStyle = exports.NSNumberFormatterStyle || (exports.NSNumberFormatterStyle = {}));
    var _NSNumberFormatterType;
    (function (_NSNumberFormatterType) {
        _NSNumberFormatterType[_NSNumberFormatterType["Int"] = 0] = "Int";
        _NSNumberFormatterType[_NSNumberFormatterType["Decimal"] = 1] = "Decimal";
    })(_NSNumberFormatterType = exports._NSNumberFormatterType || (exports._NSNumberFormatterType = {}));
    var NSNumberFormatter = (function (_super) {
        __extends(NSNumberFormatter, _super);
        function NSNumberFormatter() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.numberStyle = NSNumberFormatterStyle.NoStyle;
            _this.locale = null;
            _this.minimumFractionDigits = 0;
            _this.maximumFractionDigits = 0;
            _this.groupingSeparator = null;
            _this.currencySymbol = null;
            _this.currencyCode = null;
            _this.currencyHasSpaces = true;
            _this.currencyIsRight = true;
            return _this;
        }
        NSNumberFormatter.prototype.init = function () {
            _super.prototype.init.call(this);
            this.locale = NSLocale_1.NSLocale.currentLocale();
            this.groupingSeparator = this.locale.groupingSeparator;
            this.currencySymbol = this.locale.currencySymbol;
            this.currencyCode = this.locale.currencyCode;
            switch (this.locale.countryIdentifier) {
                case "US":
                    this.currencyHasSpaces = false;
                    this.currencyIsRight = false;
                    break;
            }
        };
        NSNumberFormatter.prototype.numberFromString = function (str) {
            var _a;
            if (str === null)
                return null;
            var result, parseString, numberString, type;
            _a = this._parse(str), result = _a[0], parseString = _a[1], numberString = _a[2], type = _a[3];
            if (result == true) {
                var value = null;
                if (type == _NSNumberFormatterType.Int) {
                    value = parseInt(numberString);
                }
                else if (type == _NSNumberFormatterType.Decimal) {
                    value = parseFloat(numberString);
                }
                return isNaN(value) ? null : value;
            }
            return null;
        };
        NSNumberFormatter.prototype.stringFromNumber = function (number) {
            return this.stringForObjectValue(number);
        };
        NSNumberFormatter.prototype.stringForObjectValue = function (value) {
            var _a;
            var number = value;
            if (!number)
                number = 0;
            var str = number.toString();
            var intValue = null;
            var floatValue = null;
            var array = str.split(".");
            if (array.length == 1) {
                intValue = array[0];
            }
            else if (array.length == 2) {
                intValue = array[0];
                floatValue = array[1];
            }
            if (floatValue != null) {
                _a = this.round(intValue, floatValue), intValue = _a[0], floatValue = _a[1];
            }
            var res = "";
            var minusOffset = intValue.charAt(0) == "-" ? 1 : 0;
            if (intValue.length > (3 + minusOffset)) {
                var offset = Math.floor((intValue.length - minusOffset) / 3);
                if (((intValue.length - minusOffset) % 3) == 0)
                    offset--;
                var posArray = [];
                var intLen = intValue.length;
                for (var index = offset; index > 0; index--) {
                    posArray.push(intLen - (index * 3));
                }
                var posArrayIndex = 0;
                var groupPos = posArray[0];
                for (var index = 0; index < intLen; index++) {
                    if (index == groupPos) {
                        res += this.groupingSeparator;
                        posArrayIndex++;
                        groupPos = posArrayIndex < posArray.length ? posArray[posArrayIndex] : -1;
                    }
                    var ch = intValue[index];
                    res += ch;
                }
            }
            else {
                res = intValue;
            }
            if (this.minimumFractionDigits > 0 && floatValue == null)
                floatValue = "";
            if (floatValue != null) {
                res += this.locale.decimalSeparator;
                if (this.minimumFractionDigits > 0 && floatValue.length < this.minimumFractionDigits) {
                    for (var index = 0; index < this.minimumFractionDigits; index++) {
                        if (index < floatValue.length)
                            res += floatValue[index];
                        else
                            res += "0";
                    }
                }
                else {
                    res += floatValue;
                }
            }
            if (this.numberStyle == NSNumberFormatterStyle.PercentStyle)
                res += "%";
            res = this.stringByAppendingCurrencyString(res);
            return res;
        };
        NSNumberFormatter.prototype.round = function (intValue, floatValue) {
            if (floatValue.length <= this.maximumFractionDigits)
                return [intValue, floatValue];
            var roundedFloat = "";
            var d = parseInt(floatValue.substr(this.maximumFractionDigits, 1));
            var inc = d < 5 ? 0 : 1;
            for (var index = this.maximumFractionDigits - 1; index >= 0; index--) {
                if (inc == 0) {
                    roundedFloat = floatValue.substring(0, index + 1) + roundedFloat;
                    break;
                }
                var digit = parseInt(floatValue.substr(index, 1));
                if (digit == 9) {
                    inc = 1;
                    roundedFloat = "0" + roundedFloat;
                }
                else {
                    inc = 0;
                    var newDigit = digit + 1;
                    roundedFloat = newDigit + roundedFloat;
                }
            }
            var removeIndex = null;
            for (var index = roundedFloat.length - 1; index >= this.minimumFractionDigits; index--) {
                var digit = roundedFloat.substr(index, 1);
                if (digit != "0")
                    break;
                removeIndex = index;
            }
            if (removeIndex != null)
                roundedFloat = roundedFloat.substring(0, removeIndex);
            if (inc == 0)
                return [intValue, roundedFloat];
            var roundedInt = "";
            for (var index = intValue.length - 1; index >= 0; index--) {
                var digit = parseInt(intValue.substr(index, 1));
                var newDigit = digit + inc;
                if (newDigit == 10) {
                    inc = 1;
                    roundedInt = "0" + roundedInt;
                }
                else {
                    inc = 0;
                    roundedInt = intValue.substring(0, index) + newDigit.toString() + roundedInt;
                    break;
                }
            }
            return [roundedInt, roundedFloat];
        };
        NSNumberFormatter.prototype.stringByAppendingCurrencyString = function (text) {
            var currency = "";
            if (this.numberStyle == NSNumberFormatterStyle.CurrencyStyle) {
                currency = this.currencySymbol;
                if (currency.length == 0)
                    currency = this.currencyCode;
            }
            else if (this.numberStyle == NSNumberFormatterStyle.CurrencyISOCodeStyle)
                currency = this.currencyCode;
            else {
                return text;
            }
            if (currency.length == 0)
                return text;
            var result = "";
            if (this.currencyIsRight == true) {
                result = text + (this.currencyHasSpaces ? " " : "") + currency;
            }
            else {
                result = currency + (this.currencyHasSpaces ? " " : "") + text;
            }
            return result;
        };
        NSNumberFormatter.prototype.isPartialStringValid = function (str) {
            var _a;
            if (str.length == 0)
                return [true, str];
            var result, newStr;
            _a = this._parse(str), result = _a[0], newStr = _a[1];
            return [result, newStr];
        };
        NSNumberFormatter.prototype._parse = function (str) {
            var number = 0;
            var parseString = "";
            var numberString = "";
            var type = _NSNumberFormatterType.Int;
            var minusSymbol = false;
            var percentSymbol = false;
            for (var index = 0; index < str.length; index++) {
                var ch = str[index];
                if (ch == this.locale.decimalSeparator && type != _NSNumberFormatterType.Decimal) {
                    parseString += ch;
                    numberString += ".";
                    type = _NSNumberFormatterType.Decimal;
                }
                else if (ch == "-" && minusSymbol == false) {
                    parseString += ch;
                    numberString += ch;
                    minusSymbol = true;
                }
                else if (ch == "%"
                    && this.numberStyle == NSNumberFormatterStyle.PercentStyle
                    && percentSymbol == false) {
                    percentSymbol = true;
                    parseString += ch;
                }
                else if (ch == " ") {
                    continue;
                }
                else if (!isNaN(parseInt(ch))) {
                    parseString += ch;
                    numberString += ch;
                }
                else
                    return [(parseString.length > 0 ? true : false), parseString, numberString, type];
            }
            return [true, parseString, numberString, type];
        };
        return NSNumberFormatter;
    }(NSFormatter_2.NSFormatter));
    exports.NSNumberFormatter = NSNumberFormatter;
});
define("NSOperation", ["require", "exports", "NSObject"], function (require, exports, NSObject_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSOperation = (function (_super) {
        __extends(NSOperation, _super);
        function NSOperation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.name = null;
            _this.target = null;
            _this.completion = null;
            _this._dependencies = [];
            _this._isExecuting = false;
            _this._isFinished = false;
            _this._ready = true;
            return _this;
        }
        Object.defineProperty(NSOperation.prototype, "dependencies", {
            get: function () { return this._dependencies; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSOperation.prototype, "isExecuting", {
            get: function () { return this.executing(); },
            enumerable: true,
            configurable: true
        });
        NSOperation.prototype.setExecuting = function (value) {
            if (value == this._isExecuting)
                return;
            this.willChangeValue("isExecuting");
            this._isExecuting = value;
            this.didChangeValue("isExecuting");
        };
        Object.defineProperty(NSOperation.prototype, "isFinished", {
            get: function () { return this.finished(); },
            enumerable: true,
            configurable: true
        });
        NSOperation.prototype.setFinished = function (value) {
            if (value == this._isFinished)
                return;
            this.willChangeValue("isFinished");
            this._isFinished = value;
            this.didChangeValue("isFinished");
        };
        NSOperation.prototype.setReady = function (value) {
            if (value == this._ready)
                return;
            this.willChangeValue("ready");
            this._ready = value;
            this.didChangeValue("ready");
        };
        Object.defineProperty(NSOperation.prototype, "ready", {
            get: function () {
                return this._ready;
            },
            enumerable: true,
            configurable: true
        });
        NSOperation.prototype.addDependency = function (operation) {
            this._dependencies.push(operation);
            if (operation.isFinished == false) {
                operation.addObserver(this, "isFinished");
                this.setReady(false);
            }
        };
        NSOperation.prototype.main = function () { };
        NSOperation.prototype.start = function () {
            this.setExecuting(true);
            this.main();
            this.setExecuting(false);
            this.setFinished(true);
        };
        NSOperation.prototype.executing = function () {
            return this._isExecuting;
        };
        NSOperation.prototype.finished = function () {
            return this._isFinished;
        };
        NSOperation.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
            if (type != "did")
                return;
            if (keyPath == "isFinished") {
                var op = object;
                if (op.isFinished == true) {
                    object.removeObserver(this, "isFinished");
                    this.checkDependecies();
                }
            }
        };
        NSOperation.prototype.checkDependecies = function () {
            for (var index = 0; index < this._dependencies.length; index++) {
                var op = this._dependencies[index];
                if (op.isFinished == false)
                    return;
            }
            this.setReady(true);
        };
        return NSOperation;
    }(NSObject_11.NSObject));
    exports.NSOperation = NSOperation;
    var NSBlockOperation = (function (_super) {
        __extends(NSBlockOperation, _super);
        function NSBlockOperation() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.executionBlocks = [];
            return _this;
        }
        NSBlockOperation.operationWithBlock = function (target, block) {
            var op = new NSBlockOperation();
            op.init();
        };
        NSBlockOperation.prototype.addExecutionBlock = function (target, block) {
            var item = {};
            item["Target"] = target;
            item["Block"] = block;
            this.executionBlocks.push(item);
        };
        NSBlockOperation.prototype.main = function () {
            for (var index = 0; index < this.executionBlocks.length; index++) {
                var item = this.executionBlocks[index];
                var target = item["Target"];
                var block = item["Block"];
                block.call(target);
            }
        };
        return NSBlockOperation;
    }(NSOperation));
});
define("NSOperationQueue", ["require", "exports", "NSObject", "./NSArray"], function (require, exports, NSObject_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSOperationQueue = (function (_super) {
        __extends(NSOperationQueue, _super);
        function NSOperationQueue() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._operations = [];
            _this._suspended = false;
            return _this;
        }
        NSOperationQueue.prototype.addOperation = function (operation) {
            if (operation.isFinished == true) {
                throw new Error("NSOperationQueue: Tying to add an operation already finished");
            }
            this.willChangeValue("operationCount");
            this.willChangeValue("operations");
            this._operations.addObject(operation);
            this.didChangeValue("operationCount");
            this.didChangeValue("operations");
            if (operation.ready == false) {
                operation.addObserver(this, "ready", null);
            }
            else {
                operation.addObserver(this, "isFinished", null);
                if (this.suspended == false)
                    operation.start();
            }
        };
        NSOperationQueue.prototype.removeOperation = function (operation) {
            var index = this._operations.indexOf(operation);
            if (index == -1)
                return;
            this.willChangeValue("operationCount");
            this.willChangeValue("operations");
            this._operations.splice(index, 1);
            this.didChangeValue("operationCount");
            this.didChangeValue("operations");
        };
        Object.defineProperty(NSOperationQueue.prototype, "operations", {
            get: function () {
                return this._operations;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSOperationQueue.prototype, "operationCount", {
            get: function () {
                return this._operations.count;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSOperationQueue.prototype, "suspended", {
            get: function () {
                return this._suspended;
            },
            set: function (value) {
                this.setSupended(value);
            },
            enumerable: true,
            configurable: true
        });
        NSOperationQueue.prototype.setSupended = function (value) {
            if (this._suspended == value)
                return;
            this._suspended = value;
            if (value == true)
                return;
            for (var index = 0; index < this.operations.length; index++) {
                var op = this.operations[index];
                if (op.ready == true)
                    op.start();
            }
        };
        NSOperationQueue.prototype.observeValueForKeyPath = function (keyPath, type, object, ctx) {
            if (type != "did")
                return;
            if (keyPath == "ready") {
                var op = object;
                if (op.ready == true) {
                    op.removeObserver(this, "ready");
                    op.addObserver(this, "isFinished", null);
                    if (this.suspended == false)
                        op.start();
                }
            }
            else if (keyPath == "isFinished") {
                var op = object;
                if (op.isFinished == true) {
                    op.removeObserver(this, "isFinished");
                    this.removeOperation(op);
                    if (op.target != null && op.completion != null)
                        op.completion.call(op.target);
                }
            }
        };
        return NSOperationQueue;
    }(NSObject_12.NSObject));
    exports.NSOperationQueue = NSOperationQueue;
});
define("NSPoint", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSPoint = (function () {
        function NSPoint(x, y) {
            this.x = 0;
            this.y = 0;
            this.x = x;
            this.y = y;
        }
        NSPoint.Zero = function () {
            var p = new NSPoint(0, 0);
            return p;
        };
        return NSPoint;
    }());
    exports.NSPoint = NSPoint;
});
define("NSPredicate", ["require", "exports", "NSObject", "NSISO8601DateFormatter", "core/MIOCoreLexer"], function (require, exports, NSObject_13, NSISO8601DateFormatter_1, MIOCoreLexer_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSPredicateComparatorType;
    (function (NSPredicateComparatorType) {
        NSPredicateComparatorType[NSPredicateComparatorType["Equal"] = 0] = "Equal";
        NSPredicateComparatorType[NSPredicateComparatorType["Less"] = 1] = "Less";
        NSPredicateComparatorType[NSPredicateComparatorType["LessOrEqual"] = 2] = "LessOrEqual";
        NSPredicateComparatorType[NSPredicateComparatorType["Greater"] = 3] = "Greater";
        NSPredicateComparatorType[NSPredicateComparatorType["GreaterOrEqual"] = 4] = "GreaterOrEqual";
        NSPredicateComparatorType[NSPredicateComparatorType["Distinct"] = 5] = "Distinct";
        NSPredicateComparatorType[NSPredicateComparatorType["Contains"] = 6] = "Contains";
        NSPredicateComparatorType[NSPredicateComparatorType["NotContains"] = 7] = "NotContains";
        NSPredicateComparatorType[NSPredicateComparatorType["In"] = 8] = "In";
        NSPredicateComparatorType[NSPredicateComparatorType["NotIn"] = 9] = "NotIn";
    })(NSPredicateComparatorType = exports.NSPredicateComparatorType || (exports.NSPredicateComparatorType = {}));
    var NSPredicateRelationshipOperatorType;
    (function (NSPredicateRelationshipOperatorType) {
        NSPredicateRelationshipOperatorType[NSPredicateRelationshipOperatorType["ANY"] = 0] = "ANY";
        NSPredicateRelationshipOperatorType[NSPredicateRelationshipOperatorType["ALL"] = 1] = "ALL";
    })(NSPredicateRelationshipOperatorType = exports.NSPredicateRelationshipOperatorType || (exports.NSPredicateRelationshipOperatorType = {}));
    var NSPredicateOperatorType;
    (function (NSPredicateOperatorType) {
        NSPredicateOperatorType[NSPredicateOperatorType["OR"] = 0] = "OR";
        NSPredicateOperatorType[NSPredicateOperatorType["AND"] = 1] = "AND";
    })(NSPredicateOperatorType = exports.NSPredicateOperatorType || (exports.NSPredicateOperatorType = {}));
    var NSPredicateBitwiseOperatorType;
    (function (NSPredicateBitwiseOperatorType) {
        NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["OR"] = 0] = "OR";
        NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["AND"] = 1] = "AND";
        NSPredicateBitwiseOperatorType[NSPredicateBitwiseOperatorType["XOR"] = 2] = "XOR";
    })(NSPredicateBitwiseOperatorType = exports.NSPredicateBitwiseOperatorType || (exports.NSPredicateBitwiseOperatorType = {}));
    var NSPredicateType;
    (function (NSPredicateType) {
        NSPredicateType[NSPredicateType["Predicate"] = 0] = "Predicate";
        NSPredicateType[NSPredicateType["Item"] = 1] = "Item";
        NSPredicateType[NSPredicateType["Operation"] = 2] = "Operation";
    })(NSPredicateType = exports.NSPredicateType || (exports.NSPredicateType = {}));
    var NSPredicateOperator = (function () {
        function NSPredicateOperator(type) {
            this.type = null;
            this.type = type;
        }
        NSPredicateOperator.andPredicateOperatorType = function () {
            var op = new NSPredicateOperator(NSPredicateOperatorType.AND);
            return op;
        };
        NSPredicateOperator.orPredicateOperatorType = function () {
            var op = new NSPredicateOperator(NSPredicateOperatorType.OR);
            return op;
        };
        return NSPredicateOperator;
    }());
    exports.NSPredicateOperator = NSPredicateOperator;
    var NSPredicateItemValueType;
    (function (NSPredicateItemValueType) {
        NSPredicateItemValueType[NSPredicateItemValueType["Undefined"] = 0] = "Undefined";
        NSPredicateItemValueType[NSPredicateItemValueType["UUID"] = 1] = "UUID";
        NSPredicateItemValueType[NSPredicateItemValueType["String"] = 2] = "String";
        NSPredicateItemValueType[NSPredicateItemValueType["Number"] = 3] = "Number";
        NSPredicateItemValueType[NSPredicateItemValueType["Boolean"] = 4] = "Boolean";
        NSPredicateItemValueType[NSPredicateItemValueType["Null"] = 5] = "Null";
        NSPredicateItemValueType[NSPredicateItemValueType["Property"] = 6] = "Property";
    })(NSPredicateItemValueType = exports.NSPredicateItemValueType || (exports.NSPredicateItemValueType = {}));
    var NSPredicateItem = (function () {
        function NSPredicateItem() {
            this.relationshipOperation = null;
            this.bitwiseOperation = null;
            this.bitwiseKey = null;
            this.bitwiseValue = null;
            this.key = null;
            this.comparator = null;
            this.value = null;
            this.valueType = NSPredicateItemValueType.Undefined;
        }
        NSPredicateItem.prototype.evaluateObject = function (object, key, lvalue) {
            var lValue = lvalue;
            if (lvalue == null) {
                var k = key != null ? key : this.key;
                if (object instanceof NSObject_13.NSObject) {
                    lValue = object.valueForKeyPath(k);
                }
                else {
                    lValue = object[k];
                }
                if (lValue instanceof Date) {
                    var sdf = new NSISO8601DateFormatter_1.NSISO8601DateFormatter();
                    sdf.init();
                    lValue = sdf.stringFromDate(lValue);
                }
                else if (typeof lValue === "string") {
                    lValue = lValue.toLocaleLowerCase();
                }
            }
            var rValue = this.value;
            if (this.valueType == NSPredicateItemValueType.Property) {
                rValue = object.valueForKeyPath(rValue);
            }
            if (typeof rValue === "string") {
                rValue = rValue.toLocaleLowerCase();
            }
            if (this.comparator == NSPredicateComparatorType.Equal)
                return (lValue == rValue);
            else if (this.comparator == NSPredicateComparatorType.Distinct)
                return (lValue != rValue);
            else if (this.comparator == NSPredicateComparatorType.Less)
                return (lValue < rValue);
            else if (this.comparator == NSPredicateComparatorType.LessOrEqual)
                return (lValue <= rValue);
            else if (this.comparator == NSPredicateComparatorType.Greater)
                return (lValue > rValue);
            else if (this.comparator == NSPredicateComparatorType.GreaterOrEqual)
                return (lValue >= rValue);
            else if (this.comparator == NSPredicateComparatorType.Contains) {
                if (lValue == null)
                    return false;
                if (lValue.indexOf(rValue) > -1)
                    return true;
                return false;
            }
            else if (this.comparator == NSPredicateComparatorType.NotContains) {
                if (lValue == null)
                    return true;
                if (lValue.indexOf(rValue) > -1)
                    return false;
                return true;
            }
        };
        NSPredicateItem.prototype.evaluateRelationshipObject = function (object) {
            var relObjs = null;
            var keys = this.key.split('.');
            var lastKey = keys[keys.length - 1];
            if (keys.length > 1) {
                var relKey = this.key.substring(0, this.key.length - lastKey.length - 1);
                relObjs = object.valueForKeyPath(relKey);
            }
            else {
                relObjs = object.valueForKeyPath(this.key);
            }
            for (var index = 0; index < relObjs.count; index++) {
                var o = relObjs.objectAtIndex(index);
                var result = this.evaluateObject(o, lastKey);
                if (result == true && this.relationshipOperation == NSPredicateRelationshipOperatorType.ANY) {
                    return true;
                }
                else if (result == false && this.relationshipOperation == NSPredicateRelationshipOperatorType.ALL) {
                    return false;
                }
            }
            return false;
        };
        NSPredicateItem.prototype.evaluateBitwaseOperatorObject = function (object) {
            var lvalue = object.valueForKeyPath(this.bitwiseKey);
            var rvalue = parseInt(this.bitwiseValue);
            var value = 0;
            if (this.bitwiseOperation == NSPredicateBitwiseOperatorType.AND) {
                value = lvalue & rvalue;
            }
            else if (this.bitwiseOperation == NSPredicateBitwiseOperatorType.OR) {
                value = lvalue | rvalue;
            }
            return this.evaluateObject(object, null, value);
        };
        return NSPredicateItem;
    }());
    exports.NSPredicateItem = NSPredicateItem;
    var NSPredicateGroup = (function () {
        function NSPredicateGroup() {
            this.predicates = [];
        }
        NSPredicateGroup.prototype.evaluateObject = function (object) {
            var result = false;
            var op = null;
            var lastResult = null;
            for (var count = 0; count < this.predicates.length; count++) {
                var o = this.predicates[count];
                if (o instanceof NSPredicateGroup) {
                    result = o.evaluateObject(object);
                }
                else if (o instanceof NSPredicateItem) {
                    if (o.relationshipOperation != null) {
                        result = o.evaluateRelationshipObject(object);
                    }
                    else if (o.bitwiseOperation != null) {
                        result = o.evaluateBitwaseOperatorObject(object);
                    }
                    else {
                        result = o.evaluateObject(object);
                    }
                }
                else if (o instanceof NSPredicateOperator) {
                    op = o.type;
                    lastResult = result;
                    result = null;
                }
                else {
                    throw new Error("NSPredicate: Error. Predicate class type invalid. (" + o + ")");
                }
                if (op != null && result != null) {
                    if (op == NSPredicateOperatorType.AND) {
                        result = result && lastResult;
                        op = null;
                        if (result == false)
                            break;
                    }
                    else if (op == NSPredicateOperatorType.OR) {
                        result = result || lastResult;
                        op = null;
                    }
                }
            }
            return result;
        };
        return NSPredicateGroup;
    }());
    exports.NSPredicateGroup = NSPredicateGroup;
    var NSPredicateTokenType;
    (function (NSPredicateTokenType) {
        NSPredicateTokenType[NSPredicateTokenType["Identifier"] = 0] = "Identifier";
        NSPredicateTokenType[NSPredicateTokenType["UUIDValue"] = 1] = "UUIDValue";
        NSPredicateTokenType[NSPredicateTokenType["StringValue"] = 2] = "StringValue";
        NSPredicateTokenType[NSPredicateTokenType["NumberValue"] = 3] = "NumberValue";
        NSPredicateTokenType[NSPredicateTokenType["BooleanValue"] = 4] = "BooleanValue";
        NSPredicateTokenType[NSPredicateTokenType["NullValue"] = 5] = "NullValue";
        NSPredicateTokenType[NSPredicateTokenType["PropertyValue"] = 6] = "PropertyValue";
        NSPredicateTokenType[NSPredicateTokenType["MinorOrEqualComparator"] = 7] = "MinorOrEqualComparator";
        NSPredicateTokenType[NSPredicateTokenType["MinorComparator"] = 8] = "MinorComparator";
        NSPredicateTokenType[NSPredicateTokenType["MajorOrEqualComparator"] = 9] = "MajorOrEqualComparator";
        NSPredicateTokenType[NSPredicateTokenType["MajorComparator"] = 10] = "MajorComparator";
        NSPredicateTokenType[NSPredicateTokenType["EqualComparator"] = 11] = "EqualComparator";
        NSPredicateTokenType[NSPredicateTokenType["DistinctComparator"] = 12] = "DistinctComparator";
        NSPredicateTokenType[NSPredicateTokenType["ContainsComparator"] = 13] = "ContainsComparator";
        NSPredicateTokenType[NSPredicateTokenType["NotContainsComparator"] = 14] = "NotContainsComparator";
        NSPredicateTokenType[NSPredicateTokenType["InComparator"] = 15] = "InComparator";
        NSPredicateTokenType[NSPredicateTokenType["NotIntComparator"] = 16] = "NotIntComparator";
        NSPredicateTokenType[NSPredicateTokenType["BitwiseAND"] = 17] = "BitwiseAND";
        NSPredicateTokenType[NSPredicateTokenType["BitwiseOR"] = 18] = "BitwiseOR";
        NSPredicateTokenType[NSPredicateTokenType["OpenParenthesisSymbol"] = 19] = "OpenParenthesisSymbol";
        NSPredicateTokenType[NSPredicateTokenType["CloseParenthesisSymbol"] = 20] = "CloseParenthesisSymbol";
        NSPredicateTokenType[NSPredicateTokenType["Whitespace"] = 21] = "Whitespace";
        NSPredicateTokenType[NSPredicateTokenType["AND"] = 22] = "AND";
        NSPredicateTokenType[NSPredicateTokenType["OR"] = 23] = "OR";
        NSPredicateTokenType[NSPredicateTokenType["ANY"] = 24] = "ANY";
        NSPredicateTokenType[NSPredicateTokenType["ALL"] = 25] = "ALL";
    })(NSPredicateTokenType = exports.NSPredicateTokenType || (exports.NSPredicateTokenType = {}));
    var NSPredicate = (function (_super) {
        __extends(NSPredicate, _super);
        function NSPredicate() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.predicateGroup = null;
            _this.lexer = null;
            _this._predicateFormat = null;
            return _this;
        }
        NSPredicate.predicateWithFormat = function (format) {
            var p = new NSPredicate();
            p.initWithFormat(format);
            return p;
        };
        NSPredicate.prototype.initWithFormat = function (format) {
            this._predicateFormat = format;
            this.parse(format);
        };
        Object.defineProperty(NSPredicate.prototype, "predicateFormat", {
            get: function () {
                return this._predicateFormat;
            },
            enumerable: true,
            configurable: true
        });
        NSPredicate.prototype.evaluateObject = function (object) {
            return this.predicateGroup.evaluateObject(object);
        };
        NSPredicate.prototype.tokenizeWithFormat = function (format) {
            this.lexer = new MIOCoreLexer_2.MIOCoreLexer(format);
            this.lexer.addTokenType(NSPredicateTokenType.UUIDValue, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
            this.lexer.addTokenType(NSPredicateTokenType.StringValue, /^"([^"]*)"|^'([^']*)'/);
            this.lexer.addTokenType(NSPredicateTokenType.NumberValue, /^-?\d+(?:\.\d+)?(?:e[+\-]?\d+)?/i);
            this.lexer.addTokenType(NSPredicateTokenType.BooleanValue, /^(true|false)/i);
            this.lexer.addTokenType(NSPredicateTokenType.NullValue, /^(null|nil)/i);
            this.lexer.addTokenType(NSPredicateTokenType.OpenParenthesisSymbol, /^\(/);
            this.lexer.addTokenType(NSPredicateTokenType.CloseParenthesisSymbol, /^\)/);
            this.lexer.addTokenType(NSPredicateTokenType.MinorOrEqualComparator, /^<=/);
            this.lexer.addTokenType(NSPredicateTokenType.MinorComparator, /^</);
            this.lexer.addTokenType(NSPredicateTokenType.MajorOrEqualComparator, /^>=/);
            this.lexer.addTokenType(NSPredicateTokenType.MajorComparator, /^>/);
            this.lexer.addTokenType(NSPredicateTokenType.EqualComparator, /^==?/);
            this.lexer.addTokenType(NSPredicateTokenType.DistinctComparator, /^!=/);
            this.lexer.addTokenType(NSPredicateTokenType.NotContainsComparator, /^not contains /i);
            this.lexer.addTokenType(NSPredicateTokenType.ContainsComparator, /^contains /i);
            this.lexer.addTokenType(NSPredicateTokenType.InComparator, /^in /i);
            this.lexer.addTokenType(NSPredicateTokenType.BitwiseAND, /^& /i);
            this.lexer.addTokenType(NSPredicateTokenType.BitwiseOR, /^\| /i);
            this.lexer.addTokenType(NSPredicateTokenType.AND, /^(and|&&) /i);
            this.lexer.addTokenType(NSPredicateTokenType.OR, /^(or|\|\|) /i);
            this.lexer.addTokenType(NSPredicateTokenType.ANY, /^any /i);
            this.lexer.addTokenType(NSPredicateTokenType.ALL, /^all /i);
            this.lexer.addTokenType(NSPredicateTokenType.Whitespace, /^\s+/);
            this.lexer.ignoreTokenType(NSPredicateTokenType.Whitespace);
            this.lexer.addTokenType(NSPredicateTokenType.Identifier, /^[a-zA-Z-_][a-zA-Z0-9-_\.]*/);
            this.lexer.tokenize();
        };
        NSPredicate.prototype.parse = function (format) {
            console.log("**** Start predicate format parser");
            console.log(format);
            console.log("****");
            this.tokenizeWithFormat(format);
            this.predicateGroup = new NSPredicateGroup();
            this.predicateGroup.predicates = this.parsePredicates();
            console.log("**** End predicate format parser");
        };
        NSPredicate.prototype.parsePredicates = function () {
            var token = this.lexer.nextToken();
            var predicates = [];
            var exit = false;
            while (token != null && exit == false) {
                switch (token.type) {
                    case NSPredicateTokenType.Identifier:
                        var pi = this.nextPredicateItem();
                        predicates.push(pi);
                        break;
                    case NSPredicateTokenType.AND:
                        predicates.push(NSPredicateOperator.andPredicateOperatorType());
                        break;
                    case NSPredicateTokenType.OR:
                        predicates.push(NSPredicateOperator.orPredicateOperatorType());
                        break;
                    case NSPredicateTokenType.ANY:
                        this.lexer.nextToken();
                        var anyPI = this.nextPredicateItem();
                        anyPI.relationshipOperation = NSPredicateRelationshipOperatorType.ANY;
                        predicates.push(anyPI);
                        break;
                    case NSPredicateTokenType.ALL:
                        this.lexer.nextToken();
                        var allPI = this.nextPredicateItem();
                        anyPI.relationshipOperation = NSPredicateRelationshipOperatorType.ALL;
                        predicates.push(anyPI);
                        break;
                    case NSPredicateTokenType.OpenParenthesisSymbol:
                        var pg = new NSPredicateGroup();
                        pg.predicates = this.parsePredicates();
                        predicates.push(pg);
                        break;
                    case NSPredicateTokenType.CloseParenthesisSymbol:
                        exit = true;
                        break;
                    default:
                        throw new Error("NSPredicate: Error. Unexpected token. (" + token.value + ")");
                }
                if (exit != true) {
                    token = this.lexer.nextToken();
                }
            }
            return predicates;
        };
        NSPredicate.prototype.nextPredicateItem = function () {
            var pi = new NSPredicateItem();
            this.lexer.prevToken();
            this.property(pi);
            this.comparator(pi);
            this.value(pi);
            return pi;
        };
        NSPredicate.prototype.property = function (item) {
            var token = this.lexer.nextToken();
            switch (token.type) {
                case NSPredicateTokenType.Identifier:
                    item.key = token.value;
                    break;
                default:
                    throw new Error("NSPredicate: Error. Unexpected identifier key. (" + token.value + ")");
            }
        };
        NSPredicate.prototype.comparator = function (item) {
            var token = this.lexer.nextToken();
            switch (token.type) {
                case NSPredicateTokenType.EqualComparator:
                    item.comparator = NSPredicateComparatorType.Equal;
                    break;
                case NSPredicateTokenType.MajorComparator:
                    item.comparator = NSPredicateComparatorType.Greater;
                    break;
                case NSPredicateTokenType.MajorOrEqualComparator:
                    item.comparator = NSPredicateComparatorType.GreaterOrEqual;
                    break;
                case NSPredicateTokenType.MinorComparator:
                    item.comparator = NSPredicateComparatorType.Less;
                    break;
                case NSPredicateTokenType.MinorOrEqualComparator:
                    item.comparator = NSPredicateComparatorType.LessOrEqual;
                    break;
                case NSPredicateTokenType.DistinctComparator:
                    item.comparator = NSPredicateComparatorType.Distinct;
                    break;
                case NSPredicateTokenType.ContainsComparator:
                    item.comparator = NSPredicateComparatorType.Contains;
                    break;
                case NSPredicateTokenType.NotContainsComparator:
                    item.comparator = NSPredicateComparatorType.NotContains;
                    break;
                case NSPredicateTokenType.InComparator:
                    item.comparator = NSPredicateComparatorType.In;
                    break;
                case NSPredicateTokenType.BitwiseAND:
                    item.bitwiseOperation = NSPredicateBitwiseOperatorType.AND;
                    item.bitwiseKey = item.key;
                    item.key += " & ";
                    token = this.lexer.nextToken();
                    item.bitwiseValue = token.value;
                    item.key += token.value;
                    this.comparator(item);
                    break;
                case NSPredicateTokenType.BitwiseOR:
                    item.bitwiseOperation = NSPredicateBitwiseOperatorType.OR;
                    item.bitwiseKey = item.key;
                    item.key += " & ";
                    token = this.lexer.nextToken();
                    item.bitwiseValue = token.value;
                    item.key += token.value;
                    this.comparator(item);
                    break;
                default:
                    throw new Error("NSPredicate: Error. Unexpected comparator. (" + token.value + ")");
            }
        };
        NSPredicate.prototype.value = function (item) {
            var token = this.lexer.nextToken();
            switch (token.type) {
                case NSPredicateTokenType.UUIDValue:
                    item.value = token.value;
                    item.valueType = NSPredicateItemValueType.UUID;
                    break;
                case NSPredicateTokenType.StringValue:
                    item.value = token.value.substring(1, token.value.length - 1);
                    item.valueType = NSPredicateItemValueType.String;
                    break;
                case NSPredicateTokenType.NumberValue:
                    item.value = token.value;
                    item.valueType = NSPredicateItemValueType.Number;
                    break;
                case NSPredicateTokenType.BooleanValue:
                    item.value = this.booleanFromString(token.value);
                    item.valueType = NSPredicateItemValueType.Boolean;
                    break;
                case NSPredicateTokenType.NullValue:
                    item.value = this.nullFromString(token.value);
                    item.valueType = NSPredicateItemValueType.Null;
                    break;
                case NSPredicateTokenType.Identifier:
                    item.value = token.value;
                    item.valueType = NSPredicateItemValueType.Property;
                    break;
                default:
                    throw new Error("NSPredicate: Error. Unexpected comparator. (" + token.value + ")");
            }
        };
        NSPredicate.prototype.booleanFromString = function (value) {
            var v = value.toLocaleLowerCase();
            var bv = false;
            switch (v) {
                case "yes":
                case "true":
                    bv = true;
                    break;
                case "no":
                case "false":
                    bv = false;
                    break;
                default:
                    throw new Error("NSPredicate: Error. Can't convert '" + value + "' to boolean");
            }
            return bv;
        };
        NSPredicate.prototype.nullFromString = function (value) {
            var v = value.toLocaleLowerCase();
            var nv = null;
            switch (v) {
                case "nil":
                case "null":
                    nv = null;
                    break;
                default:
                    throw new Error("NSPredicate: Error. Can't convert '" + value + "' to null");
            }
            return nv;
        };
        return NSPredicate;
    }(NSObject_13.NSObject));
    exports.NSPredicate = NSPredicate;
    function _NSPredicateFilterObjects(objs, predicate) {
        if (objs == null)
            return [];
        var resultObjects = null;
        if (objs.length == 0 || predicate == null) {
            resultObjects = objs.slice(0);
        }
        else {
            resultObjects = objs.filter(function (obj) {
                var result = predicate.evaluateObject(obj);
                if (result)
                    return obj;
            });
        }
        return resultObjects;
    }
    exports._NSPredicateFilterObjects = _NSPredicateFilterObjects;
});
define("NSRange", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSRange = (function () {
        function NSRange(location, length) {
            this.location = 0;
            this.length = 0;
            this.location = location;
            this.length = length;
        }
        return NSRange;
    }());
    exports.NSRange = NSRange;
    function NSMaxRange(range) {
        return range.location + range.length;
    }
    exports.NSMaxRange = NSMaxRange;
    function NSEqualRanges(range1, range2) {
        return (range1.location == range2.location && range1.length == range2.length);
    }
    exports.NSEqualRanges = NSEqualRanges;
    function NSLocationInRange(location, range) {
        if (range == null)
            return false;
        return (location >= range.location && location < NSMaxRange(range)) ? true : false;
    }
    exports.NSLocationInRange = NSLocationInRange;
    function NSIntersectionRange(range1, range2) {
        var max1 = NSMaxRange(range1);
        var max2 = NSMaxRange(range2);
        var min, loc;
        var result;
        min = (max1 < max2) ? max1 : max2;
        loc = (range1.location > range2.location) ? range1.location : range2.location;
        if (min < loc) {
            result.location = result.length = 0;
        }
        else {
            result.location = loc;
            result.length = min - loc;
        }
        return result;
    }
    exports.NSIntersectionRange = NSIntersectionRange;
    function NSUnionRange(range1, range2) {
        var max1 = NSMaxRange(range1);
        var max2 = NSMaxRange(range2);
        var max, loc;
        var result;
        max = (max1 > max2) ? max1 : max2;
        loc = (range1.location < range2.location) ? range1.location : range2.location;
        result.location = loc;
        result.length = max - result.location;
        return result;
    }
    exports.NSUnionRange = NSUnionRange;
});
define("NSSize", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSSize = (function () {
        function NSSize(w, h) {
            this.width = 0;
            this.height = 0;
            this.width = w;
            this.height = h;
        }
        NSSize.Zero = function () {
            var s = new NSSize(0, 0);
            return s;
        };
        NSSize.prototype.isEqualTo = function (size) {
            if (this.width == size.width
                && this.height == size.height)
                return true;
            return false;
        };
        return NSSize;
    }());
    exports.NSSize = NSSize;
});
define("NSRect", ["require", "exports", "NSPoint", "NSSize"], function (require, exports, NSPoint_1, NSSize_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSRect = (function () {
        function NSRect(p, s) {
            this.origin = null;
            this.size = null;
            this.origin = p;
            this.size = s;
        }
        NSRect.Zero = function () {
            var f = new NSRect(NSPoint_1.NSPoint.Zero(), NSSize_1.NSSize.Zero());
            return f;
        };
        NSRect.rectWithValues = function (x, y, w, h) {
            var p = new NSPoint_1.NSPoint(x, y);
            var s = new NSSize_1.NSSize(w, h);
            var f = new NSRect(p, s);
            return f;
        };
        return NSRect;
    }());
    exports.NSRect = NSRect;
    function NSRectMaxY(rect) {
        return rect.origin.y;
    }
    function NSRectMinY(rect) {
        return rect.origin.y + rect.size.height;
    }
});
define("NSSet", ["require", "exports", "NSObject", "NSPredicate", "./NSArray"], function (require, exports, NSObject_14, NSPredicate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSSet = (function (_super) {
        __extends(NSSet, _super);
        function NSSet() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._objects = [];
            return _this;
        }
        NSSet.set = function () {
            var s = new NSSet();
            s.init();
            return s;
        };
        NSSet.prototype.addObject = function (object) {
            if (this._objects.containsObject(object) == true)
                return;
            this._objects.addObject(object);
        };
        NSSet.prototype.removeObject = function (object) {
            if (this._objects.containsObject(object) == false)
                return;
            this._objects.removeObject(object);
        };
        NSSet.prototype.removeAllObjects = function () {
            this._objects = [];
        };
        NSSet.prototype.indexOfObject = function (object) {
            return this._objects.indexOf(object);
        };
        NSSet.prototype.containsObject = function (object) {
            return this._objects.indexOfObject(object) > -1 ? true : false;
        };
        NSSet.prototype.objectAtIndex = function (index) {
            return this._objects[index];
        };
        Object.defineProperty(NSSet.prototype, "allObjects", {
            get: function () {
                return this._objects;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSSet.prototype, "count", {
            get: function () {
                return this._objects.length;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(NSSet.prototype, "length", {
            get: function () {
                return this._objects.length;
            },
            enumerable: true,
            configurable: true
        });
        NSSet.prototype.copy = function () {
            var set = new NSSet();
            set.init();
            for (var index = 0; index < this._objects.length; index++) {
                var obj = this._objects[index];
                set.addObject(obj);
            }
            return set;
        };
        NSSet.prototype.filterWithPredicate = function (predicate) {
            var objs = NSPredicate_1._NSPredicateFilterObjects(this._objects, predicate);
            return objs;
        };
        NSSet.prototype.addObserver = function (obs, keypath, context) {
            if (keypath == "count" || keypath == "length")
                throw new Error("NSSet: Can't observe count. It's not KVO Compilant");
            _super.prototype.addObserver.call(this, obs, keypath, context);
        };
        return NSSet;
    }(NSObject_14.NSObject));
    exports.NSSet = NSSet;
});
define("NSSortDescriptor", ["require", "exports", "NSObject"], function (require, exports, NSObject_15) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSSortDescriptor = (function (_super) {
        __extends(NSSortDescriptor, _super);
        function NSSortDescriptor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.key = null;
            _this.ascending = false;
            return _this;
        }
        NSSortDescriptor.sortDescriptorWithKey = function (key, ascending) {
            var sd = new NSSortDescriptor();
            sd.initWithKey(key, ascending);
            return sd;
        };
        NSSortDescriptor.prototype.initWithKey = function (key, ascending) {
            this.key = key;
            this.ascending = ascending;
        };
        return NSSortDescriptor;
    }(NSObject_15.NSObject));
    exports.NSSortDescriptor = NSSortDescriptor;
    function _NSSortDescriptorSortObjects(objs, sortDescriptors) {
        var resultObjects = null;
        if (objs.length == 0 || sortDescriptors == null) {
            resultObjects = objs.slice(0);
        }
        else {
            if (sortDescriptors == null)
                return objs;
            if (objs.length == 0)
                return objs;
            resultObjects = objs.sort(function (a, b) {
                return _NSSortDescriptorSortObjects2(a, b, sortDescriptors, 0);
            });
        }
        return resultObjects;
    }
    exports._NSSortDescriptorSortObjects = _NSSortDescriptorSortObjects;
    function _NSSortDescriptorSortObjects2(a, b, sortDescriptors, index) {
        if (index >= sortDescriptors.length)
            return 0;
        var sd = sortDescriptors[index];
        var key = sd.key;
        var lv = a[key];
        var rv = b[key];
        if (typeof lv === "string") {
            lv = lv.toLocaleLowerCase();
        }
        if (typeof rv === "string") {
            rv = rv.toLocaleLowerCase();
        }
        if (typeof lv === "string" && typeof rv === "string" && lv.length != rv.length) {
            var lv2 = lv;
            var rv2 = rv;
            var sortValue = 0;
            if (lv.length > rv.length) {
                lv2 = lv.substr(0, rv.length);
                sortValue = sd.ascending ? 1 : -1;
            }
            else if (lv.length < rv.length) {
                rv2 = rv.substr(0, lv.length);
                sortValue = sd.ascending ? -1 : 1;
            }
            if (lv2 == rv2)
                return sortValue;
            else if (lv2 < rv2)
                return sd.ascending ? -1 : 1;
            else
                return sd.ascending ? 1 : -1;
        }
        else if (lv == rv)
            return _NSSortDescriptorSortObjects2(a, b, sortDescriptors, ++index);
        else if (lv < rv)
            return sd.ascending ? -1 : 1;
        else
            return sd.ascending ? 1 : -1;
    }
});
;
String.prototype.lastPathComponent = function () {
    return MIOCoreStringLastPathComponent(this);
};
String.prototype.pathExtension = function () {
    return MIOCoreStringPathExtension(this);
};
String.prototype.stringByAppendingPathComponent = function (path) {
    return MIOCoreStringAppendPathComponent(this, path);
};
String.prototype.stringByDeletingLastPathComponent = function () {
    return MIOCoreStringDeletingLastPathComponent(this);
};
String.prototype.hasPreffix = function (preffix) {
    return MIOCoreStringHasPreffix(this, preffix);
};
String.prototype.hasSuffix = function (suffix) {
    return MIOCoreStringHasSuffix(this, suffix);
};
function MIOCoreStringHasPreffix(str, preffix) {
    return str.substring(0, preffix.length) === preffix;
}
function MIOCoreStringHasSuffix(str, suffix) {
    var s = str.substr(str.length - suffix.length);
    return s == suffix;
}
function MIOCoreStringAppendPathComponent(string, path) {
    var str = string;
    if (string.charAt(string.length - 1) == "/" && path.charAt(0) == "/") {
        str += path.substr(1);
    }
    else if (string.charAt(string.length - 1) != "/" && path.charAt(0) != "/") {
        str += "/" + path;
    }
    else {
        str += path;
    }
    return str;
}
function MIOCoreStringLastPathComponent(string) {
    var index = string.lastIndexOf("/");
    if (index == -1)
        return string;
    var len = string.length - index;
    var str = string.substr(index, len);
    return str;
}
function MIOCoreStringPathExtension(string) {
    var lastPathComponent = MIOCoreStringLastPathComponent(string);
    var items = lastPathComponent.split(".");
    if (items.length == 1)
        return "";
    var ext = items[items.length - 1];
    return ext;
}
function MIOCoreStringDeletingLastPathComponent(string) {
    var index = string.lastIndexOf("/");
    var str = string.substr(0, index);
    return str;
}
function MIOCoreStringStandardizingPath(string) {
    var array = string.split("/");
    var newArray = [];
    var index = 0;
    for (var count = 0; count < array.length; count++) {
        var component = array[count];
        if (component.substr(0, 2) == "..")
            index--;
        else {
            newArray[index] = component;
            index++;
        }
    }
    var str = "";
    if (index > 0)
        str = newArray[0];
    for (var count = 1; count < index; count++) {
        str += "/" + newArray[count];
    }
    return str;
}
var _MIOLocalizedStrings = null;
function MIOLocalizeString(key, defaultValue) {
    var strings = _MIOLocalizedStrings;
    if (strings == null)
        return defaultValue;
    var value = strings[key];
    if (value == null)
        return defaultValue;
    return value;
}
function setMIOLocalizedStrings(data) {
    _MIOLocalizedStrings = data;
}
function getMIOLocalizedStrings() {
    return _MIOLocalizedStrings;
}
define("NSTimer", ["require", "exports", "NSObject"], function (require, exports, NSObject_16) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSTimer = (function (_super) {
        __extends(NSTimer, _super);
        function NSTimer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._timerInterval = 0;
            _this._repeat = false;
            _this._target = null;
            _this._completion = null;
            _this._coreTimer = null;
            return _this;
        }
        NSTimer.scheduledTimerWithTimeInterval = function (timeInterval, repeat, target, completion) {
            var timer = new NSTimer();
            timer.initWithTimeInterval(timeInterval, repeat, target, completion);
            timer.fire();
            return timer;
        };
        NSTimer.prototype.initWithTimeInterval = function (timeInterval, repeat, target, completion) {
            this._timerInterval = timeInterval;
            this._repeat = repeat;
            this._target = target;
            this._completion = completion;
        };
        NSTimer.prototype.fire = function () {
            var instance = this;
            if (this._repeat) {
                this._coreTimer = setInterval(function () {
                    instance._timerCallback.call(instance);
                }, this._timerInterval);
            }
            else {
                this._coreTimer = setTimeout(function () {
                    instance._timerCallback.call(instance);
                }, this._timerInterval);
            }
        };
        NSTimer.prototype.invalidate = function () {
            if (this._repeat)
                clearInterval(this._coreTimer);
            else
                clearTimeout(this._coreTimer);
        };
        NSTimer.prototype._timerCallback = function () {
            if (this._target != null && this._completion != null)
                this._completion.call(this._target, this);
            if (this._repeat == true)
                this.invalidate();
        };
        return NSTimer;
    }(NSObject_16.NSObject));
    exports.NSTimer = NSTimer;
});
define("NSURL", ["require", "exports", "NSObject"], function (require, exports, NSObject_17) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSURLTokenType;
    (function (NSURLTokenType) {
        NSURLTokenType[NSURLTokenType["Protocol"] = 0] = "Protocol";
        NSURLTokenType[NSURLTokenType["Host"] = 1] = "Host";
        NSURLTokenType[NSURLTokenType["Path"] = 2] = "Path";
        NSURLTokenType[NSURLTokenType["Param"] = 3] = "Param";
        NSURLTokenType[NSURLTokenType["Value"] = 4] = "Value";
    })(NSURLTokenType = exports.NSURLTokenType || (exports.NSURLTokenType = {}));
    var NSURL = (function (_super) {
        __extends(NSURL, _super);
        function NSURL() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.baseURL = null;
            _this.absoluteString = null;
            _this.scheme = null;
            _this.user = null;
            _this.password = null;
            _this.host = null;
            _this.port = 0;
            _this.hostname = null;
            _this.path = "/";
            _this.file = null;
            _this.pathExtension = null;
            _this.params = [];
            return _this;
        }
        NSURL.urlWithString = function (urlString) {
            var url = new NSURL();
            url.initWithURLString(urlString);
            return url;
        };
        NSURL.prototype.initWithScheme = function (scheme, host, path) {
            _super.prototype.init.call(this);
            this.scheme = scheme;
            this.host = host;
            this.path = path;
            this.absoluteString = "";
            if (scheme.length > 0)
                this.absoluteString += scheme + "://";
            if (host.length > 0)
                this.absoluteString += host + "/";
            if (path.length > 0)
                this.absoluteString += path;
        };
        NSURL.prototype.initWithURLString = function (urlString) {
            _super.prototype.init.call(this);
            this.absoluteString = urlString;
            this._parseURLString(urlString);
        };
        NSURL.prototype._parseURLString = function (urlString) {
            var param = "";
            var value = "";
            var token = "";
            var step = NSURLTokenType.Protocol;
            var foundPort = false;
            var foundExt = false;
            for (var index = 0; index < urlString.length; index++) {
                var ch = urlString.charAt(index);
                if (ch == ":") {
                    if (step == NSURLTokenType.Protocol) {
                        this.scheme = token;
                        token = "";
                        index += 2;
                        step = NSURLTokenType.Host;
                    }
                    else if (step == NSURLTokenType.Host) {
                        this.hostname = token;
                        token = "";
                        foundPort = true;
                    }
                }
                else if (ch == "/") {
                    if (step == NSURLTokenType.Host) {
                        if (foundPort == true) {
                            this.host = this.hostname + ":" + token;
                            this.port = parseInt(token);
                        }
                        else {
                            this.host = token;
                            this.hostname = token;
                        }
                        step = NSURLTokenType.Path;
                    }
                    else {
                        this.path += token + ch;
                    }
                    token = "";
                }
                else if (ch == "." && step == NSURLTokenType.Path) {
                    this.file = token;
                    foundExt = true;
                    token = "";
                }
                else if (ch == "?") {
                    if (foundExt == true) {
                        this.file += "." + token;
                        this.pathExtension = token;
                    }
                    else
                        this.file = token;
                    token = "";
                    step = NSURLTokenType.Param;
                }
                else if (ch == "&") {
                    var item = { "Key": param, "Value": value };
                    this.params.push(item);
                    step = NSURLTokenType.Param;
                    param = "";
                    value = "";
                }
                else if (ch == "=") {
                    param = token;
                    step = NSURLTokenType.Value;
                    token = "";
                }
                else {
                    token += ch;
                }
            }
            if (token.length > 0) {
                if (step == NSURLTokenType.Path) {
                    if (foundExt == true) {
                        this.file += "." + token;
                        this.pathExtension = token;
                    }
                    else
                        this.path += token;
                }
                else if (step == NSURLTokenType.Param) {
                    var i = { "key": token };
                    this.params.push(i);
                }
                else if (step == NSURLTokenType.Value) {
                    var item = { "Key": param, "Value": token };
                    this.params.push(item);
                }
            }
        };
        NSURL.prototype.urlByAppendingPathComponent = function (path) {
            var urlString = this.scheme + "://" + this.host + this.path;
            if (urlString.charAt(urlString.length - 1) != "/")
                urlString += "/";
            if (path.charAt(0) != "/")
                urlString += path;
            else
                urlString += path.substr(1);
            var newURL = NSURL.urlWithString(urlString);
            return newURL;
        };
        NSURL.prototype.standardizedURL = function () {
            return null;
        };
        return NSURL;
    }(NSObject_17.NSObject));
    exports.NSURL = NSURL;
});
define("NSURLRequest", ["require", "exports", "NSObject"], function (require, exports, NSObject_18) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSURLRequest = (function (_super) {
        __extends(NSURLRequest, _super);
        function NSURLRequest() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.url = null;
            _this.httpMethod = "GET";
            _this.httpBody = null;
            _this.headers = [];
            _this.binary = false;
            _this.download = false;
            return _this;
        }
        NSURLRequest.requestWithURL = function (url) {
            var request = new NSURLRequest();
            request.initWithURL(url);
            return request;
        };
        NSURLRequest.prototype.initWithURL = function (url) {
            this.url = url;
        };
        NSURLRequest.prototype.setHeaderField = function (field, value) {
            this.headers.push({ "Field": field, "Value": value });
        };
        return NSURLRequest;
    }(NSObject_18.NSObject));
    exports.NSURLRequest = NSURLRequest;
});
define("NSURLConnection", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSURLConnection = (function () {
        function NSURLConnection() {
            this.request = null;
            this.delegate = null;
            this.blockFN = null;
            this.blockTarget = null;
            this.xmlHttpRequest = null;
        }
        NSURLConnection.prototype.initWithRequest = function (request, delegate) {
            this.request = request;
            this.delegate = delegate;
            this.start();
        };
        NSURLConnection.prototype.initWithRequestBlock = function (request, blockTarget, blockFN) {
            this.request = request;
            this.blockFN = blockFN;
            this.blockTarget = blockTarget;
            this.start();
        };
        NSURLConnection.prototype.start = function () {
            _http_request(this, this.request.url.absoluteString, this.request.headers, this.request.httpMethod, this.request.httpBody, this.request.binary, this.delegate, this.blockTarget, this.blockFN, this.request.download);
        };
        return NSURLConnection;
    }());
    exports.NSURLConnection = NSURLConnection;
    function _http_request(instance, urlString, headers, method, body, binary, delegate, target, completion, download) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var body = this.responseText;
            if (this.status < 300 && body != null) {
                if (delegate != null) {
                    delegate.connectionDidReceiveText(instance, body);
                }
                else if (target != null) {
                    completion.call(target, this.status, body);
                }
            }
            else {
                if (delegate != null) {
                    delegate.connectionDidFail(instance);
                }
                else if (target != null) {
                    completion.call(target, this.status, body);
                }
            }
        };
        xhr.open(method, urlString);
        for (var count = 0; count < headers.length; count++) {
            var item = headers[count];
            xhr.setRequestHeader(item["Field"], item["Value"]);
        }
        if (binary == true) {
            xhr.responseType = "arraybuffer";
        }
        if (method == "GET" || body == null) {
            xhr.send();
        }
        else {
            xhr.send(body);
        }
    }
    function _http_request_sync(urlString, headers, method, body, binary) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, urlString, false);
        for (var count = 0; count < headers.length; count++) {
            var item = headers[count];
            xhr.setRequestHeader(item["Field"], item["Value"]);
        }
        if (binary == true) {
            xhr.responseType = "arraybuffer";
        }
        if (method == "GET" || body == null) {
            xhr.send();
        }
        else {
            xhr.send(body);
        }
        return xhr.responseText;
    }
});
define("NSUUID", ["require", "exports", "NSObject"], function (require, exports, NSObject_19) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSUUID = (function (_super) {
        __extends(NSUUID, _super);
        function NSUUID() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._uuid = null;
            return _this;
        }
        NSUUID.UUID = function () {
            var uuid = new NSUUID();
            uuid.init();
            return uuid;
        };
        NSUUID.prototype.init = function () {
            this._uuid = _create_UUID();
        };
        Object.defineProperty(NSUUID.prototype, "UUIDString", {
            get: function () {
                return this._uuid;
            },
            enumerable: true,
            configurable: true
        });
        return NSUUID;
    }(NSObject_19.NSObject));
    exports.NSUUID = NSUUID;
    function _create_UUID() {
        var d = new Date().getTime();
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid.toUpperCase();
    }
});
define("NSUserDefaults", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var NSUserDefaults = (function () {
        function NSUserDefaults() {
            if (NSUserDefaults._sharedInstance) {
                throw new Error("Error: Instantiation failed: Use standardUserDefaults() instead of new.");
            }
            NSUserDefaults._sharedInstance = this;
        }
        NSUserDefaults.standardUserDefaults = function () {
            return NSUserDefaults._sharedInstance;
        };
        NSUserDefaults.prototype.setBooleanForKey = function (key, value) {
            var v = value ? "1" : "0";
            this.setValueForKey(key, v);
        };
        NSUserDefaults.prototype.booleanForKey = function (key) {
            var v = this.valueForKey(key);
            return v == "1" ? true : false;
        };
        NSUserDefaults.prototype.setValueForKey = function (key, value) {
            localStorage.setItem(key, value);
        };
        NSUserDefaults.prototype.valueForKey = function (key) {
            return localStorage.getItem(key);
        };
        NSUserDefaults.prototype.removeValueForKey = function (key) {
            localStorage.removeItem(key);
        };
        NSUserDefaults._sharedInstance = new NSUserDefaults();
        return NSUserDefaults;
    }());
    exports.NSUserDefaults = NSUserDefaults;
});
define("index", ["require", "exports", "NSPoint", "NSRange", "NSRect", "NSSize", "NSObject", "NSNull", "NSError", "NSCoder", "NSKeyedUnarchiver", "NSDecimalNumber", "NSDate", "NSUUID", "NSPredicate", "NSSet", "NSIndexPath", "NSLocale", "NSFormatter", "NSDateFormatter", "NSISO8601DateFormatter", "NSNumberFormatter", "NSTimer", "NSNotificationCenter", "NSUserDefaults", "NSURL", "NSURLRequest", "NSURLConnection", "NSXMLParser", "NSOperation", "NSOperationQueue", "NSLog", "NSNumber", "NSSortDescriptor", "NSPropertyListSerialization"], function (require, exports, NSPoint_2, NSRange_1, NSRect_1, NSSize_2, NSObject_20, NSNull_1, NSError_1, NSCoder_2, NSKeyedUnarchiver_1, NSDecimalNumber_1, NSDate_1, NSUUID_1, NSPredicate_2, NSSet_1, NSIndexPath_1, NSLocale_2, NSFormatter_3, NSDateFormatter_2, NSISO8601DateFormatter_2, NSNumberFormatter_1, NSTimer_1, NSNotificationCenter_1, NSUserDefaults_1, NSURL_1, NSURLRequest_1, NSURLConnection_1, NSXMLParser_2, NSOperation_1, NSOperationQueue_1, NSLog_2, NSNumber_2, NSSortDescriptor_1, NSPropertyListSerialization_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(NSPoint_2);
    __export(NSRange_1);
    __export(NSRect_1);
    __export(NSSize_2);
    __export(NSObject_20);
    __export(NSNull_1);
    __export(NSError_1);
    __export(NSCoder_2);
    __export(NSKeyedUnarchiver_1);
    __export(NSDecimalNumber_1);
    __export(NSDate_1);
    __export(NSUUID_1);
    __export(NSPredicate_2);
    __export(NSSet_1);
    __export(NSIndexPath_1);
    __export(NSLocale_2);
    __export(NSFormatter_3);
    __export(NSDateFormatter_2);
    __export(NSISO8601DateFormatter_2);
    __export(NSNumberFormatter_1);
    __export(NSTimer_1);
    __export(NSNotificationCenter_1);
    __export(NSUserDefaults_1);
    __export(NSURL_1);
    __export(NSURLRequest_1);
    __export(NSURLConnection_1);
    __export(NSXMLParser_2);
    __export(NSOperation_1);
    __export(NSOperationQueue_1);
    __export(NSLog_2);
    __export(NSNumber_2);
    __export(NSSortDescriptor_1);
    __export(NSPropertyListSerialization_2);
});
