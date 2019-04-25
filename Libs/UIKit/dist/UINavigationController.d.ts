import { UIViewController } from "./UIViewController";
import { MIOObject } from "../MIOFoundation";
/**
 * Created by godshadow on 9/4/16.
 */
export declare class UINavigationController extends UIViewController {
    rootViewController: any;
    viewControllersStack: any[];
    currentViewControllerIndex: number;
    init(): void;
    initWithRootViewController(vc: UIViewController): void;
    setRootViewController(vc: UIViewController): void;
    viewWillAppear(animated?: boolean): void;
    viewDidAppear(animated?: any): void;
    viewWillDisappear(animated?: any): void;
    viewDidDisappear(animated?: any): void;
    pushViewController(vc: UIViewController, animated?: boolean): void;
    popViewController(animated?: boolean): void;
    popToRootViewController(animated?: boolean): void;
    preferredContentSize: any;
    private _pushAnimationController;
    private _popAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: any): any;
}
export declare class UIPushAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare class UIPopAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
