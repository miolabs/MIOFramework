"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NSRange = (function () {
    function NSRange(location, length) {
        this.location = 0;
        this.length = 0;
        this.location = location;
        this.length = length;
    }
    return NSRange;
}());
exports.NSRange = NSRange;
function NSMaxRange(range) {
    return range.location + range.length;
}
exports.NSMaxRange = NSMaxRange;
function NSEqualRanges(range1, range2) {
    return (range1.location == range2.location && range1.length == range2.length);
}
exports.NSEqualRanges = NSEqualRanges;
function NSLocationInRange(location, range) {
    if (range == null)
        return false;
    return (location >= range.location && location < NSMaxRange(range)) ? true : false;
}
exports.NSLocationInRange = NSLocationInRange;
function NSIntersectionRange(range1, range2) {
    var max1 = NSMaxRange(range1);
    var max2 = NSMaxRange(range2);
    var min, loc;
    var result;
    min = (max1 < max2) ? max1 : max2;
    loc = (range1.location > range2.location) ? range1.location : range2.location;
    if (min < loc) {
        result.location = result.length = 0;
    }
    else {
        result.location = loc;
        result.length = min - loc;
    }
    return result;
}
exports.NSIntersectionRange = NSIntersectionRange;
function NSUnionRange(range1, range2) {
    var max1 = NSMaxRange(range1);
    var max2 = NSMaxRange(range2);
    var max, loc;
    var result;
    max = (max1 > max2) ? max1 : max2;
    loc = (range1.location < range2.location) ? range1.location : range2.location;
    result.location = loc;
    result.length = max - result.location;
    return result;
}
exports.NSUnionRange = NSUnionRange;
//# sourceMappingURL=NSRange.js.map