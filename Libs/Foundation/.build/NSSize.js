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
//# sourceMappingURL=NSSize.js.map