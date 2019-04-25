import { MIOObject } from "../MIOFoundation";
import { UIView } from "./UIView";
import { UIButton } from "./UIButton";
export declare class UINavigationItem extends MIOObject {
    backBarButtonItem: UIButton;
    titleView: UIView;
    title: string;
    private leftView;
    private rightView;
    initWithLayer(layer: any): void;
}
export declare function UINavItemSearchInLayer(layer: any): UINavigationItem;
