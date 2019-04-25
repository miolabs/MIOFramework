import { UIView, UINavigationItem } from ".";
export declare class UINavigationBar extends UIView {
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private setup;
    private _items;
    readonly items: any[];
    setItems(items: any, animated: any): void;
    pushNavigationItem(item: UINavigationItem, animated: any): void;
    popNavigationItem(item: UINavigationItem, animated: any): void;
    readonly topItem: any;
    readonly backItem: any;
}
