import { MIOObject } from "../MIOFoundation";
import { UIViewController } from "./UIViewController";
import { UIWindow } from "./UIWindow";
/**
 * Created by godshadow on 06/12/2016.
 */
export declare enum UIModalPresentationStyle {
    FullScreen = 0,
    PageSheet = 1,
    FormSheet = 2,
    CurrentContext = 3,
    Custom = 4,
    OverFullScreen = 5,
    OverCurrentContext = 6,
    Popover = 7,
    None = 8
}
export declare enum UIModalTransitionStyle {
    CoverVertical = 0,
    FlipHorizontal = 1,
    CrossDisolve = 2
}
export declare class UIPresentationController extends MIOObject {
    presentationStyle: UIModalPresentationStyle;
    shouldPresentInFullscreen: boolean;
    protected _presentedViewController: UIViewController;
    presentingViewController: any;
    presentedView: any;
    protected _transitioningDelegate: any;
    private _window;
    _isPresented: boolean;
    initWithPresentedViewControllerAndPresentingViewController(presentedViewController: any, presentingViewController: any): void;
    setPresentedViewController(vc: UIViewController): void;
    presentedViewController: UIViewController;
    readonly transitioningDelegate: any;
    presentationTransitionWillBegin(): void;
    presentationTransitionDidEnd(completed: any): void;
    dismissalTransitionWillBegin(): void;
    dismissalTransitionDidEnd(completed: any): void;
    _calculateFrame(): void;
    window: UIWindow;
    observeValueForKeyPath(key: any, type: any, object: any): void;
}
export declare class MIOModalTransitioningDelegate extends MIOObject {
    modalTransitionStyle: any;
    private _presentAnimationController;
    private _dissmissAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: any): any;
}
export declare class MIOAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare class MIOModalPresentAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare class MIOModalDismissAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
