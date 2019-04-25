import { UIControl } from "./UIControl";
/**
 * Created by godshadow on 31/08/16.
 */
export declare class UIPageControl extends UIControl {
    numberOfPages: number;
    private _items;
    private _currentPage;
    initWithLayer(layer: any, owner: any, options?: any): void;
    currentPage: any;
}
