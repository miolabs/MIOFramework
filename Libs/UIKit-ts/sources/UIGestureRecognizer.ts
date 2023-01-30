import { NSObject } from "foundation";
import { UIView } from "./UIView";

export enum UIGestureRecognizerState 
{
    Possible,
    Began,
    Changed,
    Ended,
    Cancelled,
    Failed,
    Recognized
}

export class UIGestureRecognizer extends NSObject
{
    delegate = null;

    set view(v:UIView){this.setView(v);}
    get view(){ return this._view;}
    
    set state(value:UIGestureRecognizerState) {this.setState(value);}
    get state() {return this._state;}
    isEnabled = true;

    name:string = null;
    
    private target = null;
    private block = null;
    initWithTarget(target, block){
        super.init();

        this.target = target;
        this.block = block;
    }

    private _view:UIView = null;        
    setView(view:UIView){                
        this._view = view;
    }
    
    private _state:UIGestureRecognizerState = UIGestureRecognizerState.Possible;
    private setState(state:UIGestureRecognizerState){
        if (this.isEnabled == false) return;
        if (this._state == state && state != UIGestureRecognizerState.Changed) return;
        this._state = state;
        this.block.call(this.target, this);
    }
    
    
    touchesBeganWithEvent(touches, ev:UIEvent){
        this.state = UIGestureRecognizerState.Began;
    }    

    touchesMovedWithEvent(touches, ev:UIEvent){
        this.state = UIGestureRecognizerState.Changed;
    }

    touchesEndedWithEvent(touches, ev:UIEvent){
        this.state = UIGestureRecognizerState.Ended;
    }

    reset(){
        this.state = UIGestureRecognizerState.Possible;
    }

    // To call from UIView. Only for internal use
    _viewTouchesBeganWithEvent(touches, ev:UIEvent){
        this.reset();
        this.touchesBeganWithEvent(touches, ev);
    }

    _viewTouchesMovedWithEvent(touches, ev:UIEvent){
        this.touchesMovedWithEvent(touches, ev);
    }

    _viewTouchesEndedWithEvent(touches, ev:UIEvent){
        this.touchesEndedWithEvent(touches, ev);
    }

}