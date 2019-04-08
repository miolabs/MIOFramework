export declare class NSRange {
    location: number;
    length: number;
    constructor(location: any, length: any);
}
export declare function NSMaxRange(range: NSRange): number;
export declare function NSEqualRanges(range1: NSRange, range2: NSRange): boolean;
export declare function NSLocationInRange(location: number, range: NSRange): boolean;
export declare function NSIntersectionRange(range1: NSRange, range2: NSRange): NSRange;
export declare function NSUnionRange(range1: NSRange, range2: NSRange): NSRange;
