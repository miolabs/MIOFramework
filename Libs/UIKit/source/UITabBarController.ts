import { UITabBar } from "./UITabBar";
import { UIViewController } from "./UIViewController";

/**
 * Created by godshadow on 24/08/16.
 */

export class UITabBarController extends UIViewController
{
    tabBar = null;
    private pageController = null;

    viewDidLoad()
    {
        super.viewDidLoad();

        this.tabBar = new UITabBar(this.layerID + "tabbar");
        this.view.addSubview(this.tabBar);
    }

    addTabBarViewController(vc)
    {
        this.addChildViewController(vc);
        vc.onLoadLayer(this, function () {

            this.tabBar.addTabBarItem(vc.tabBarItem);
            this.pageController.addPageViewController(vc);
        });
    }
}