import { UIEvent, UIGestureRecognizer } from ".";
import { MIOPoint } from "../MIOFoundation";
import { UIView } from "./UIView";
export declare class UIPanGestureRecognizer extends UIGestureRecognizer {
    minimumNumberOfTouches: number;
    maximumNumberOfTouches: number;
    private initialX;
    private initialY;
    private touchDown;
    touchesBeganWithEvent(touches: any, ev: UIEvent): void;
    touchesEndedWithEvent(touches: any, ev: UIEvent): void;
    private hasStarted;
    touchesMovedWithEvent(touches: any, ev: UIEvent): void;
    private deltaX;
    private deltaY;
    translationInView(view: UIView): MIOPoint;
}
