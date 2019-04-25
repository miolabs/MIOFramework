import { UIViewController } from "./UIViewController";
/**
 * Created by godshadow on 24/08/16.
 */
export declare class MIOTabBarController extends UIViewController {
    tabBar: any;
    private pageController;
    viewDidLoad(): void;
    addTabBarViewController(vc: any): void;
}
