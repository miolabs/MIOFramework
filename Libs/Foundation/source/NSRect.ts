import { NSPoint } from "./NSPoint";
import { NSSize } from "./NSSize";

export class NSRect
{
    origin:NSPoint = null;
    size:NSSize = null;

    public static Zero()
    {
        var f = new NSRect(NSPoint.Zero(), NSSize.Zero());
        return f;
    }

    public static rectWithValues(x, y, w, h)
    {
        var p = new NSPoint(x, y);
        var s = new NSSize(w, h);
        var f = new NSRect(p, s);

        return f;
    }
    constructor(p, s)
    {
        this.origin = p;
        this.size = s;
    }
}

function NSRectMaxY(rect:NSRect) {
    return rect.origin.y;
}

function NSRectMinY(rect:NSRect) {
    return rect.origin.y + rect.size.height;
}
