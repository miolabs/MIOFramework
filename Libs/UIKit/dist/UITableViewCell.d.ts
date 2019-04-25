import { UIView } from "./UIView";
export declare enum UITableViewCellStyle {
    Custom = 0,
    Default = 1
}
export declare enum UITableViewCellAccessoryType {
    None = 0,
    DisclosureIndicator = 1,
    DetailDisclosureButton = 2,
    Checkmark = 3
}
export declare enum UITableViewCellEditingStyle {
    None = 0,
    Delete = 1,
    Insert = 2
}
export declare enum UITableViewCellSeparatorStyle {
    None = 0,
    SingleLine = 1,
    SingleLineEtched = 2
}
export declare enum UITableViewCellSelectionStyle {
    None = 0,
    Default = 1
}
export declare class UITableViewCell extends UIView {
    reuseIdentifier: string;
    nodeID: string;
    contentView: UIView;
    style: UITableViewCellStyle;
    textLabel: any;
    accessoryView: UIView;
    separatorStyle: UITableViewCellSeparatorStyle;
    private _editing;
    editingAccessoryView: UIView;
    selectionStyle: UITableViewCellSelectionStyle;
    private _selected;
    _target: any;
    _onClickFn: any;
    _onDblClickFn: any;
    _onAccessoryClickFn: any;
    _onEditingAccessoryClickFn: any;
    _section: any;
    initWithStyle(style: UITableViewCellStyle): void;
    initWithLayer(layer: any, owner: any, options?: any): void;
    private scanLayerNodes;
    private addAccessoryView;
    private accessoryViewDidClick;
    private editingAccessoryInsertView;
    private editingAccessoryDeleteView;
    private addEditingAccessoryView;
    private _editingAccessoryType;
    editingAccessoryType: UITableViewCellEditingStyle;
    setEditingAccessoryType(value: UITableViewCellEditingStyle): void;
    private editingAccessoryViewDidClick;
    private _setupLayer;
    private _accessoryType;
    accessoryType: UITableViewCellAccessoryType;
    setAccessoryType(type: any): void;
    setPaddingIndex(value: any): void;
    setHeight(h: any): void;
    setSelected(value: any): void;
    selected: any;
    _setHightlightedSubviews(value: any): void;
    setEditing(editing: any, animated?: any): void;
    editing: boolean;
    readonly isEditing: boolean;
}
