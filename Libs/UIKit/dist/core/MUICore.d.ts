import { NSSize } from "mio-foundation-web";
import { UIViewController } from "../UIViewController";
import { UIPresentationController } from "../UIViewController_PresentationController";
export interface Window {
    prototype: any;
}
export declare function UIOutletRegister(owner: any, layerID: any, c: any): void;
export declare function UIOutletQuery(owner: any, layerID: any): any;
export declare function UIOutlet(owner: any, elementID: any, className?: any, options?: any): any;
export declare function UIWindowSize(): NSSize;
export declare function _MIUShowViewController(fromVC: UIViewController, toVC: UIViewController, sourceVC: any, animated: boolean, target?: any, completion?: any): void;
export declare function _UIAnimationDidStart(fromVC: UIViewController, toVC: UIViewController, pc: UIPresentationController, target?: any, completion?: any): void;
export declare function _UIHideViewController(fromVC: UIViewController, toVC: UIViewController, sourceVC: any, target?: any, completion?: any): void;
export declare function _UITransitionFromViewControllerToViewController(fromVC: any, toVC: any, sourceVC: any, target?: any, completion?: any): void;
