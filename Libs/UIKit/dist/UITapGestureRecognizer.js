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
var UITapGestureRecognizer = /** @class */ (function (_super) {
    __extends(UITapGestureRecognizer, _super);
    function UITapGestureRecognizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.numberOfTapsRequired = 1;
        return _this;
    }
    UITapGestureRecognizer.prototype.touchesBeganWithEvent = function (touches, ev) {
        _super.prototype.touchesBeganWithEvent.call(this, touches, ev);
        this.state = _1.UIGestureRecognizerState.Began;
    };
    UITapGestureRecognizer.prototype.touchesEndedWithEvent = function (touches, ev) {
        _super.prototype.touchesEndedWithEvent.call(this, touches, ev);
        this.state = _1.UIGestureRecognizerState.Ended;
    };
    return UITapGestureRecognizer;
}(_1.UIGestureRecognizer));
exports.UITapGestureRecognizer = UITapGestureRecognizer;
//# sourceMappingURL=UITapGestureRecognizer.js.map