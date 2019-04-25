import { UIControl } from "./UIControl";
/**
 * Created by godshadow on 12/3/16.
 */
export declare enum UIButtonType {
    MomentaryPushIn = 0,
    PushOnPushOff = 1,
    PushIn = 2
}
export declare class UIButton extends UIControl {
    private _statusStyle;
    private _titleStatusStyle;
    private _titleLayer;
    private _imageStatusStyle;
    private _imageLayer;
    target: any;
    action: any;
    private _selected;
    type: UIButtonType;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setupLayers;
    initWithAction(target: any, action: any): void;
    setAction(target: any, action: any): void;
    setTitle(title: any): void;
    title: any;
    selected: any;
    setSelected(value: any): void;
    setImageURL(urlString: string): void;
}
