// import { CGPoint } from "./NSPoint";
// import { CGSize } from "./NSSize";

class CGRect
{
    origin:CGPoint = null;
    size:CGSize = null;

    public static Zero()
    {
        var f = new CGRect(CGPoint.Zero(), CGSize.Zero());
        return f;
    }

    public initXIntYIntWidthIntHeightInt(x, y, w, h)
    {
        this.origin = new CGPoint(x, y);
        this.size = new CGSize(w, h);
    }
    constructor(p, s)
    {
        this.origin = p;
        this.size = s;
    }
}

function NSRectMaxY(rect:CGRect) {
    return rect.origin.y;
}

function NSRectMinY(rect:CGRect) {
    return rect.origin.y + rect.size.height;
}
