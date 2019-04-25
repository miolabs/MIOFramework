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
var MIOFoundation_1 = require("../MIOFoundation");
var UIGestureRecognizerState;
(function (UIGestureRecognizerState) {
    UIGestureRecognizerState[UIGestureRecognizerState["Possible"] = 0] = "Possible";
    UIGestureRecognizerState[UIGestureRecognizerState["Began"] = 1] = "Began";
    UIGestureRecognizerState[UIGestureRecognizerState["Changed"] = 2] = "Changed";
    UIGestureRecognizerState[UIGestureRecognizerState["Ended"] = 3] = "Ended";
    UIGestureRecognizerState[UIGestureRecognizerState["Cancelled"] = 4] = "Cancelled";
    UIGestureRecognizerState[UIGestureRecognizerState["Failed"] = 5] = "Failed";
    UIGestureRecognizerState[UIGestureRecognizerState["Recognized"] = 6] = "Recognized";
})(UIGestureRecognizerState = exports.UIGestureRecognizerState || (exports.UIGestureRecognizerState = {}));
var UIGestureRecognizer = /** @class */ (function (_super) {
    __extends(UIGestureRecognizer, _super);
    function UIGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.delegate = null;
        _this.isEnabled = true;
        _this.name = null;
        _this.target = null;
        _this.block = null;
        _this._view = null;
        _this._state = UIGestureRecognizerState.Possible;
        return _this;
    }
    Object.defineProperty(UIGestureRecognizer.prototype, "view", {
        get: function () { return this._view; },
        set: function (v) { this.setView(v); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIGestureRecognizer.prototype, "state", {
        get: function () { return this._state; },
        set: function (value) { this.setState(value); },
        enumerable: true,
        configurable: true
    });
    UIGestureRecognizer.prototype.initWithTarget = function (target, block) {
        _super.prototype.init.call(this);
        this.target = target;
        this.block = block;
    };
    UIGestureRecognizer.prototype.setView = function (view) {
        this._view = view;
    };
    UIGestureRecognizer.prototype.setState = function (state) {
        if (this.isEnabled == false)
            return;
        if (this._state == state && state != UIGestureRecognizerState.Changed)
            return;
        this._state = state;
        this.block.call(this.target, this);
    };
    UIGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Began;
    };
    UIGestureRecognizer.prototype.touchesMovedWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Changed;
    };
    UIGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        this.state = UIGestureRecognizerState.Ended;
    };
    UIGestureRecognizer.prototype.reset = function () {
        this.state = UIGestureRecognizerState.Possible;
    };
    // To call from UIView. Only for internal use
    UIGestureRecognizer.prototype._viewTouchesBeganWithEvent = function (touches, ev) {
        this.reset();
        this.touchesBeganWithEvent(touches, ev);
    };
    UIGestureRecognizer.prototype._viewTouchesMovedWithEvent = function (touches, ev) {
        this.touchesMovedWithEvent(touches, ev);
    };
    UIGestureRecognizer.prototype._viewTouchesEndedWithEvent = function (touches, ev) {
        this.touchesEndedWithEvent(touches, ev);
    };
    return UIGestureRecognizer;
}(MIOFoundation_1.MIOObject));
exports.UIGestureRecognizer = UIGestureRecognizer;
//# sourceMappingURL=UIGestureRecognizer.js.map