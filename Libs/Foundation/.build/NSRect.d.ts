import { NSPoint } from "./NSPoint";
import { NSSize } from "./NSSize";
export declare class NSRect {
    origin: NSPoint;
    size: NSSize;
    static Zero(): NSRect;
    static rectWithValues(x: any, y: any, w: any, h: any): NSRect;
    constructor(p: any, s: any);
}
