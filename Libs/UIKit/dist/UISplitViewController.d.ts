import { UIViewController } from "./UIViewController";
import { UIButton } from "./UIButton";
/**
 * Created by godshadow on 05/08/16.
 */
export declare enum UISplitViewControllerDisplayMode {
    Automatic = 0,
    PrimaryHidden = 1,
    AllVisible = 2,
    PrimaryOverlay = 3
}
export declare class UISplitViewController extends UIViewController {
    private masterView;
    private detailView;
    preferredDisplayMode: UISplitViewControllerDisplayMode;
    init(): void;
    readonly displayMode: UISplitViewControllerDisplayMode;
    private _displayModeButtonItem;
    readonly displayModeButtonItem: UIButton;
    private _collapsed;
    readonly collapsed: boolean;
    private setCollapsed;
    private _masterViewController;
    setMasterViewController(vc: any): void;
    private _detailViewController;
    setDetailViewController(vc: any): void;
    showDetailViewController(vc: UIViewController): void;
    readonly masterViewController: UIViewController;
    readonly detailViewController: UIViewController;
    private _showDetailViewController;
    private _pushDetailViewController;
    private _popViewController;
    private displayModeButtonItemAction;
    private _pushAnimationController;
    private _popAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: UIViewController): any;
}
