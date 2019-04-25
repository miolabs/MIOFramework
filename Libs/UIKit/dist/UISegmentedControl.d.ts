import { UIControl } from "./UIControl";
/**
 * Created by godshadow on 29/08/16.
 */
export declare class UISegmentedControl extends UIControl {
    segmentedItems: any[];
    selectedSegmentedIndex: number;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private _addSegmentedItem;
    private _didClickSegmentedButton;
    setAction(target: any, action: any): void;
    selectSegmentedAtIndex(index: any): void;
}
