import { NSObject } from "foundation";
export declare enum UIAnimationType {
    None = 0,
    BeginSheet = 1,
    EndSheet = 2,
    Push = 3,
    Pop = 4,
    FlipLeft = 5,
    FlipRight = 6,
    FadeIn = 7,
    FadeOut = 8,
    LightSpeedIn = 9,
    LightSpeedOut = 10,
    Hinge = 11,
    SlideInUp = 12,
    SlideOutDown = 13,
    SlideInRight = 14,
    SlideOutRight = 15,
    SlideInLeft = 16,
    SlideOutLeft = 17,
    HorizontalOutFlip = 18,
    HorizontalInFlip = 19,
    ZoomIn = 20,
    ZoomOut = 21
}
export interface UIViewControllerAnimatedTransitioning extends NSObject {
    animationControllerForPresentedController(): any;
}
export interface UIViewControllerAnimatedTransitioning extends NSObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare function UIClassListForAnimationType(type: any): any[];
export declare function _UIAddAnimations(layer: any, animations: any): void;
export declare function _UIRemoveAnimations(layer: any, animations: any): void;
export declare function _UIAnimationStart(layer: any, animationController: any, animationContext: any, target?: any, completion?: any): void;
export declare function _UIAnimationDidFinish(event: any): void;
