import { UIEvent } from "./UIEvent";
import { UIGestureRecognizer, UIGestureRecognizerState } from "./UIGestureRecognizer";
import { UIView } from "./UIView";
import { CGPoint } from "./_index";


export class UIPanGestureRecognizer extends UIGestureRecognizer
{
    minimumNumberOfTouches = 1;
    maximumNumberOfTouches = 0;
    
    private initialX = null;
    private initialY = null;

    private touchDown = false;
    touchesBeganWithEvent(touches, ev:UIEvent){
        this.initialX = ev.x;
        this.initialY = ev.y;
        this.touchDown = true;
    }

    touchesEndedWithEvent(touches, ev:UIEvent){
        super.touchesEndedWithEvent(touches, ev);
        this.initialX = null;
        this.initialY = null;
        this.hasStarted = false;
        this.touchDown = false;
    }

    private hasStarted = false;
    touchesMovedWithEvent(touches, ev:UIEvent){
        if (this.touchDown == false) return;
        if (this.hasStarted == false) this.state = UIGestureRecognizerState.Began;

        this.hasStarted = true;
        this.deltaX = this.initialX - ev.x;
        this.deltaY = this.initialY - ev.y;

        this.state = UIGestureRecognizerState.Changed;
    }

    private deltaX = 0;
    private deltaY = 0;
    translationInView( view:UIView ): CGPoint {
        return new CGPoint( this.deltaX, this.deltaY );
    }

}