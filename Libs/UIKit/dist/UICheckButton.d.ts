import { UIControl } from "./UIControl";
/**
 * Created by godshadow on 12/3/16.
 */
export declare class UICheckButton extends UIControl {
    target: any;
    action: any;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private _on_click;
    setOnChangeValue(target: any, action: any): void;
    private _on;
    on: boolean;
    setOn(on: any): void;
    toggleValue(): void;
}
