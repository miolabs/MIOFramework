import { UIView } from "./UIView";
/**
 * Created by godshadow on 12/3/16.
 */
export declare class UIControl extends UIView {
    mouseOverTarget: any;
    mouseOverAction: any;
    mouseOutTarget: any;
    mouseOutAction: any;
    private _enabled;
    enabled: boolean;
    setEnabled(enabled: boolean): void;
    setOnMouseOverAction(target: any, action: any): void;
    setOnMouseOutAction(target: any, action: any): void;
}
