import { UIView } from "./UIView";
/**
 * Created by godshadow on 5/5/16.
 */
export declare class UIMenuItem extends UIView {
    checked: boolean;
    title: any;
    private _titleLayer;
    target: any;
    action: any;
    static itemWithTitle(title: any): UIMenuItem;
    initWithTitle(title: any): void;
    _setupLayer(): void;
    getWidth(): any;
    getHeight(): any;
}
export declare class UIMenu extends UIView {
    items: any[];
    private _isVisible;
    private _updateWidth;
    target: any;
    action: any;
    private _menuLayer;
    init(): void;
    _setupLayer(): void;
    private _addMenuItem;
    addMenuItem(menuItem: any): void;
    removeMenuItem(menuItem: any): void;
    private _menuItemDidClick;
    showFromControl(control: any): void;
    hide(): void;
    readonly isVisible: boolean;
    layout(): void;
}
