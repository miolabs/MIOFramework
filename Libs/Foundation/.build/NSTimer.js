"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var NSObject_1 = require("./NSObject");
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
}(NSObject_1.NSObject));
exports.NSTimer = NSTimer;
//# sourceMappingURL=NSTimer.js.map