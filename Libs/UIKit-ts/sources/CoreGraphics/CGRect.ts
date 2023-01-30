import { CGPoint } from "./CGPoint";
import { CGSize } from "./CGSize";

export class CGRect
{
    origin:CGPoint;
    size:CGSize;

    public static zero()
    {
        let r = new CGRect();
        r.origin = CGPoint.Zero();
        r.size =CGSize.Zero();
        return r;
    }

    public static rectFromPointAndSize(p:CGPoint, s:CGSize) : CGRect {
        let rect = new CGRect();
        rect.origin = p;
        rect.size = s;
        return rect;
    }

    public static rectFromValues(x:number, y:number, w:number, h:number) {
        let rect = new CGRect();
        rect.origin = new CGPoint(x, y);
        rect.size = new CGSize(w, h);
        return rect;
    }
}

export function NSRectMaxY(rect:CGRect) {
    return rect.origin.y;
}

export function NSRectMinY(rect:CGRect) {
    return rect.origin.y + rect.size.height;
}
