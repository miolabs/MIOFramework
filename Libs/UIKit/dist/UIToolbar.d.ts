import { UIButton } from "./UIButton";
import { UIView } from "./UIView";
/**
 * Created by godshadow on 22/5/16.
 */
export declare class UIToolbarButton extends UIButton {
    static buttonWithLayer(layer: any, owner: any): UIToolbarButton;
}
export declare class UIToolbar extends UIView {
    buttons: any[];
    initWithLayer(layer: any, owner: any, options?: any): void;
    addToolbarButton(button: any): void;
}
