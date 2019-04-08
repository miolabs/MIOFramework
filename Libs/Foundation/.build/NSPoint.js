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
//# sourceMappingURL=NSPoint.js.map