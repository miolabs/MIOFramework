import { UIViewController } from "./UIViewController";
import { UIView } from "./UIView";
/**
 * Created by godshadow on 11/3/16.
 */
export declare class UIWindow extends UIView {
    rootViewController: UIViewController;
    private _resizeWindow;
    init(): void;
    initWithRootViewController(vc: any): void;
    makeKey(): void;
    makeKeyAndVisible(): void;
    layoutSubviews(): void;
    addSubview(view: UIView): void;
    protected _addLayerToDOM(): void;
    removeFromSuperview(): void;
    protected _removeLayerFromDOM(): void;
    setHidden(hidden: any): void;
    _eventHappendOutsideWindow(): void;
    _becameKeyWindow(): void;
    _resignKeyWindow(): void;
    private _dismissRootViewController;
}
