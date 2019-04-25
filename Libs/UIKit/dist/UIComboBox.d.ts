import { UIControl } from "./UIControl";
/**
 * Created by godshadow on 2/5/16.
 */
export declare class UIComboBox extends UIControl {
    private _selectLayer;
    target: any;
    action: any;
    init(): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private _setup_layers;
    setAllowMultipleSelection(value: any): void;
    addItem(text: any, value?: any): void;
    addItems(items: any): void;
    removeAllItems(): void;
    getItemAtIndex(index: any): any;
    getSelectedItem(): any;
    getSelectedItemText(): any;
    selectItem(item: any): void;
    setOnChangeAction(target: any, action: any): void;
}
