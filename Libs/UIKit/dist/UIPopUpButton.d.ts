import { UIButton } from "./UIButton";
/**
 * Created by godshadow on 12/3/16.
 */
export declare class UIPopUpButton extends UIButton {
    private _menu;
    private _isVisible;
    initWithLayer(layer: any, owner: any, options?: any): void;
    setMenuAction(target: any, action: any): void;
    addMenuItemWithTitle(title: any): void;
}
