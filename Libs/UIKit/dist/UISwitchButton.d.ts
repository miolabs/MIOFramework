import { UIControl } from "./UIControl";
/**
 * Created by godshadow on 12/3/16.
 */
export declare class UISwitchButton extends UIControl {
    target: any;
    action: any;
    private _inputLayer;
    private _labelLayer;
    initWithLayer(layer: any, owner: any, options?: any): void;
    setOnChangeValue(target: any, action: any): void;
    private _on;
    on: boolean;
    setOn(on: any): void;
    private _toggleValue;
}
