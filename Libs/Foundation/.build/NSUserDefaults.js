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
//# sourceMappingURL=NSUserDefaults.js.map