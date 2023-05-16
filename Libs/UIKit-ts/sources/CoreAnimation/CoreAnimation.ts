/*
    ANIMATIONS
 */

import { NSObject } from "foundation";
import { UIViewController } from "../UIViewController";


export interface UIViewControllerTransitioningDelegate
{
    animationControllerForPresentedController?( presentedViewController:UIViewController, presentingViewController: UIViewController, sourceController: UIViewController ):void;
    animationControllerForDismissedController?( vs:UIViewController ):void;
}

export interface UIViewControllerAnimatedTransitioning extends NSObject
{       
    transitionDuration(transitionContext):number;
    animateTransition(transitionContext):void;
    animationEnded(transitionCompleted):void;
    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext):void;
}
