import { MIOObject } from "../MIOFoundation";
import { UIView, UIEvent } from ".";
export declare enum UIGestureRecognizerState {
    Possible = 0,
    Began = 1,
    Changed = 2,
    Ended = 3,
    Cancelled = 4,
    Failed = 5,
    Recognized = 6
}
export declare class UIGestureRecognizer extends MIOObject {
    delegate: any;
    view: UIView;
    state: UIGestureRecognizerState;
    isEnabled: boolean;
    name: string;
    private target;
    private block;
    initWithTarget(target: any, block: any): void;
    private _view;
    setView(view: UIView): void;
    private _state;
    private setState;
    touchesBeganWithEvent(touches: any, ev: UIEvent): void;
    touchesMovedWithEvent(touches: any, ev: UIEvent): void;
    touchesEndedWithEvent(touches: any, ev: UIEvent): void;
    reset(): void;
    _viewTouchesBeganWithEvent(touches: any, ev: UIEvent): void;
    _viewTouchesMovedWithEvent(touches: any, ev: UIEvent): void;
    _viewTouchesEndedWithEvent(touches: any, ev: UIEvent): void;
}
