import { UIView } from "./UIView";
/**
 * Created by godshadow on 21/5/16.
 */
export declare enum UIActivityIndicatorViewStyle {
    White = 0,
    WhiteLarge = 1,
    Gray = 2
}
export declare class UIActivityIndicatorView extends UIView {
    initWithLayer(layer: any, owner: any, options: any): void;
    startAnimating(): void;
    stopAnimating(): void;
    private _hidesWhenStopped;
    hidesWhenStopped: boolean;
    private isAnimating;
    readonly animating: boolean;
    private _activityIndicatorViewStyle;
    activityIndicatorViewStyle: UIActivityIndicatorViewStyle;
}
