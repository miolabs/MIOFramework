import { UIEvent, UIGestureRecognizer } from ".";
export declare class UITapGestureRecognizer extends UIGestureRecognizer {
    numberOfTapsRequired: number;
    touchesBeganWithEvent(touches: any, ev: UIEvent): void;
    touchesEndedWithEvent(touches: any, ev: UIEvent): void;
}
