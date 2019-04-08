"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NSPoint_1 = require("./NSPoint");
var NSSize_1 = require("./NSSize");
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
//# sourceMappingURL=NSRect.js.map