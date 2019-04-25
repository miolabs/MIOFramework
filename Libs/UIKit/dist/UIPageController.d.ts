import { UIViewController } from "./UIViewController";
import { MIOObject } from "../MIOFoundation";
/**
 * Created by godshadow on 11/3/16.
 */
export declare class UIPageController extends UIViewController {
    selectedViewControllerIndex: number;
    pageControllersCount: number;
    addPageViewController(vc: any): void;
    protected _loadChildControllers(): void;
    viewWillAppear(animated?: any): void;
    viewDidAppear(animated?: any): void;
    viewWillDisappear(animated?: any): void;
    viewDidDisappear(animated?: any): void;
    showPageAtIndex(index: any): void;
    showNextPage(): void;
    showPrevPage(): void;
    private _pageAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: any): any;
}
export declare class MIOPageAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
