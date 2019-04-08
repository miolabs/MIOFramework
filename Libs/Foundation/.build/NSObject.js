"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_1 = require("../NSCore/platform");
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
        var obj = platform_1.NSClassFromString(this.className);
        obj.init();
        return obj;
    };
    return NSObject;
}());
exports.NSObject = NSObject;
//# sourceMappingURL=NSObject.js.map