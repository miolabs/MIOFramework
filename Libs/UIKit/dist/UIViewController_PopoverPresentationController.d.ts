import { UIPresentationController } from "./UIViewController_PresentationController";
import { MIOObject } from "../MIOFoundation";
/**
 * Created by godshadow on 11/11/2016.
 */
export declare enum UIPopoverArrowDirection {
    Any = 0,
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4
}
export interface UIPopoverPresentationControllerDelegate {
    popoverPresentationControllerDidDismissPopover?(popoverPresentationController: UIPopoverPresentationController): any;
}
export declare class UIPopoverPresentationController extends UIPresentationController {
    permittedArrowDirections: UIPopoverArrowDirection;
    sourceView: any;
    sourceRect: any;
    delegate: any;
    private _contentSize;
    private _canvasLayer;
    private _contentView;
    readonly transitioningDelegate: any;
    presentationTransitionWillBegin(): void;
    dismissalTransitionDidEnd(completed: any): void;
    _calculateFrame(): void;
    private _drawRoundRect;
}
export declare class MIOModalPopOverTransitioningDelegate extends MIOObject {
    modalTransitionStyle: any;
    private _showAnimationController;
    private _dissmissAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: any): any;
}
export declare class MIOPopOverPresentAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare class MIOPopOverDismissAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
