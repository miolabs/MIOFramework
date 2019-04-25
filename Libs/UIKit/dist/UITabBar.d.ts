import { UIButton } from "./UIButton";
import { UIView } from "./UIView";
/**
 * Created by godshadow on 25/08/16.
 */
export declare class UITabBarItem extends UIButton {
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
}
export declare class UITabBar extends UIView {
    items: any[];
    selectedTabBarItemIndex: number;
    private _itemsByIdentifier;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private _addTabBarItem;
    addTabBarItem(item: any): void;
    selectTabBarItem(item: any): void;
    selectTabBarItemAtIndex(index: any): void;
    layout(): void;
}
