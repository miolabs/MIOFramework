import { MIOObject, MIOIndexPath } from "../MIOFoundation";
import { UITextField } from "./UITextField";
import { UIComboBox } from "./UIComboBox";
import { UIViewController } from "./UIViewController";
import { UITableView } from "./UITableView";
import { UITableViewCell } from "./UITableViewCell";
export declare enum UIAlertViewStyle {
    Default = 0
}
export declare enum UIAlertActionStyle {
    Default = 0,
    Cancel = 1,
    Destructive = 2
}
export declare enum UIAlertItemType {
    None = 0,
    Action = 1,
    TextField = 2,
    ComboBox = 3
}
export declare class UIAlertItem extends MIOObject {
    type: UIAlertItemType;
    initWithType(type: UIAlertItemType): void;
}
export declare class UIAlertTextField extends UIAlertItem {
    textField: UITextField;
    initWithConfigurationHandler(target: any, handler: any): void;
}
export declare class UIAlertComboBox extends UIAlertItem {
    comboBox: UIComboBox;
    initWithConfigurationHandler(target: any, handler: any): void;
}
export declare class UIAlertAction extends UIAlertItem {
    title: any;
    style: UIAlertActionStyle;
    target: any;
    completion: any;
    static alertActionWithTitle(title: string, style: UIAlertActionStyle, target: any, completion: any): UIAlertAction;
    initWithTitle(title: any, style: any): void;
}
export declare class UIAlertViewController extends UIViewController {
    textFields: any[];
    comboBoxes: any[];
    private target;
    private completion;
    private _items;
    private _title;
    private _message;
    private _style;
    private _backgroundView;
    private tableView;
    private _headerCell;
    private _alertViewSize;
    initWithTitle(title: string, message: string, style: UIAlertViewStyle): void;
    viewDidLoad(): void;
    viewDidAppear(animated?: any): void;
    viewWillDisappear(animated?: any): void;
    readonly preferredContentSize: any;
    private _addItem;
    addAction(action: UIAlertAction): void;
    addTextFieldWithConfigurationHandler(target: any, handler: any): void;
    addComboBoxWithConfigurationHandler(target: any, handler: any): void;
    addCompletionHandler(target: any, handler: any): void;
    private _calculateContentSize;
    numberOfSections(tableview: any): number;
    numberOfRowsInSection(tableview: any, section: any): number;
    cellAtIndexPath(tableview: any, indexPath: MIOIndexPath): UITableViewCell;
    heightForRowAtIndexPath(tableView: UITableView, indexPath: MIOIndexPath): number;
    canSelectCellAtIndexPath(tableview: any, indexPath: MIOIndexPath): boolean;
    didSelectCellAtIndexPath(tableView: any, indexPath: MIOIndexPath): void;
    private _createHeaderCell;
    private _createActionCellWithTitle;
    private _createTextFieldCell;
    private _createComboBoxCell;
    private _fadeInAnimationController;
    private _fadeOutAnimationController;
    animationControllerForPresentedController(presentedViewController: any, presentingViewController: any, sourceController: any): any;
    animationControllerForDismissedController(dismissedController: any): any;
}
export declare class UIAlertFadeInAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
export declare class UIAlertFadeOutAnimationController extends MIOObject {
    transitionDuration(transitionContext: any): number;
    animateTransition(transitionContext: any): void;
    animationEnded(transitionCompleted: any): void;
    animations(transitionContext: any): any;
}
