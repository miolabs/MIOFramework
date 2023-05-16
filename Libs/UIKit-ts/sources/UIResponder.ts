import { NSObject } from "foundation";
import { UIEvent } from "./UIEvent";
import { UIGestureRecognizer } from "./UIGestureRecognizer";

export class UIResponder extends NSObject
{
    protected gestureRecognizers = [];

    touchesBeganWithEvent(touches:any, event: UIEvent ) {
        for (let index = 0; index < this.gestureRecognizers.length; index++) {
            let gr: UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesBeganWithEvent(touches, event);
        }
    }

    touchesMovedWithEvent(touches:any, event: UIEvent) {
        for (let index = 0; index < this.gestureRecognizers.length; index++) {
            let gr: UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesMovedWithEvent(touches, event);
        }
    }

    touchesEndedWithEvent( touches:any, event: UIEvent ) {
        for (let index = 0; index < this.gestureRecognizers.length; index++) {
            let gr: UIGestureRecognizer = this.gestureRecognizers[index];
            gr._viewTouchesEndedWithEvent(touches, event);
        }
    }
}