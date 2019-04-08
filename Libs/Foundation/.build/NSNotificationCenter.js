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
//# sourceMappingURL=NSNotificationCenter.js.map