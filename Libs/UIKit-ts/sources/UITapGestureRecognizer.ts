import { UIEvent } from "./UIEvent";
import { UIGestureRecognizer, UIGestureRecognizerState } from "./UIGestureRecognizer";

export class UITapGestureRecognizer extends UIGestureRecognizer
{
    numberOfTapsRequired = 1;
    
    touchesBeganWithEvent(touches, ev:UIEvent){
        super.touchesBeganWithEvent(touches, ev);
        this.state = UIGestureRecognizerState.Began;
    }

    touchesEndedWithEvent(touches, ev:UIEvent){
        super.touchesEndedWithEvent(touches, ev);
        this.state = UIGestureRecognizerState.Ended;
    }

}