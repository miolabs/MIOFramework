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
var _1 = require(".");
var MIOFoundation_1 = require("../MIOFoundation");
var UIPanGestureRecognizer = /** @class */ (function (_super) {
    __extends(UIPanGestureRecognizer, _super);
    function UIPanGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.minimumNumberOfTouches = 1;
        _this.maximumNumberOfTouches = 0;
        _this.initialX = null;
        _this.initialY = null;
        _this.touchDown = false;
        _this.hasStarted = false;
        _this.deltaX = 0;
        _this.deltaY = 0;
        return _this;
    }
    UIPanGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        this.initialX = ev.x;
        this.initialY = ev.y;
        this.touchDown = true;
    };
    UIPanGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        _super.prototype.touchesEndedWithEvent.call(this, touches, ev);
        this.initialX = null;
        this.initialY = null;
        this.hasStarted = false;
        this.touchDown = false;
    };
    UIPanGestureRecognizer.prototype.touchesMovedWithEvent = function (touches, ev) {
        if (this.touchDown == false)
            return;
        if (this.hasStarted == false)
            this.state = _1.UIGestureRecognizerState.Began;
        this.hasStarted = true;
        this.deltaX = this.initialX - ev.x;
        this.deltaY = this.initialY - ev.y;
        this.state = _1.UIGestureRecognizerState.Changed;
    };
    UIPanGestureRecognizer.prototype.translationInView = function (view) {
        return new MIOFoundation_1.MIOPoint(this.deltaX, this.deltaY);
    };
    return UIPanGestureRecognizer;
}(_1.UIGestureRecognizer));
exports.UIPanGestureRecognizer = UIPanGestureRecognizer;
//# sourceMappingURL=UIPanGestureRecognizer.js.map