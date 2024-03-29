
/// <reference path="UITableView.ts" />

import { IndexPath, NSObject } from "foundation";
import { UITableView } from "./UITableView";
import { UITextField } from "./UITextField";
import { UIView } from "./UIView";
import { UIViewController } from "./UIViewController";
import { CGSize } from "./CoreGraphics/CGSize";
import { UIModalPresentationStyle } from "./UIPresentationController";
import { UITableViewCell, UITableViewCellSeparatorStyle, UITableViewCellStyle } from "./UITableViewCell";
import { UILabel } from "./UILabel";


export enum UIAlertViewStyle
{
    default
}


export enum UIAlertItemType 
{
    none,
    action,
    textField,
    comboBox
}

export class UIAlertItem extends NSObject
{
    type = UIAlertItemType.none;

    initWithType(type:UIAlertItemType) {

        this.type = type;
    }
}

export class UIAlertTextField extends UIAlertItem
{
    textField:UITextField = null;

    initWithConfigurationHandler(target, handler) {

        super.initWithType(UIAlertItemType.textField);

        this.textField = new UITextField();
        this.textField.init();
    
        if (target != null && handler != null) {
            handler.call(target, this.textField);
        }
    }
}

class UIAlertAction extends UIAlertItem
{
    title = null;
    style = UIAlertAction.Style._default;

    target = null;
    completion = null;

    static Style = class {
        static get _default() {return Object.assign(new UIAlertAction.Style(), {rawValue: 0})}
        static get cancel() {return Object.assign(new UIAlertAction.Style(), {rawValue: 1})}
        static get destructive() {return Object.assign(new UIAlertAction.Style(), {rawValue: 2})}
    }

    initTitleOptionalStyleUIAlertActionStyleHandlerOptional(title:string, style:any/*UIAlertAction.Style*/, completion){
        this.initWithTitle(title, style);
        this.completion = completion;
    }

    initWithTitle(title:string, style){
        super.initWithType(UIAlertItemType.action);

        this.title = title;
        this.style = style;
    }
}

export class UIAlertController extends UIViewController
{
    textFields = [];
    comboBoxes = [];
    
    private target = null;
    private completion = null; 

    private _items = [];        

    private _title:string = null;
    private _message:string = null;
    private _style = UIAlertViewStyle.default;

    private _backgroundView:UIView = null;
    private tableView:UITableView = null;

    private _headerCell = null;

    private _alertViewSize = new CGSize(320, 50);

    static Style = class {
        static get actionSheet() {return Object.assign(new UIAlertController.Style(), {rawValue: 0})}
        static get alert() {return Object.assign(new UIAlertController.Style(), {rawValue: 1})}
    }

    initWithTitle(title:string, message:string, style:UIAlertViewStyle){
        super.init();

        this.modalPresentationStyle = UIModalPresentationStyle.formSheet;

        this._title = title;
        this._message = message;
        this._style = style;

        this.transitioningDelegate = this;
    }

    viewDidLoad(){
        super.viewDidLoad();
        //UICoreLayerRemoveStyle(this.view.layer, "page");
        // this.view.layer.style.background = "";
        // this.view.layer.style.backgroundColor = "";
        //this.view.layer.classList.add("alert-container");

        this._backgroundView = new UIView();
        this._backgroundView.init();
        // MUICoreLayerAddStyle(this._backgroundView.layer, "alert-container");
        this.view.addSubview(this._backgroundView);

        this.tableView = new UITableView();
        this.tableView.init();
        this.tableView.dataSource = this;
        this.tableView.delegate = this;
        // this.tableView.layer.style.background = "";
        // this.tableView.layer.style.position = "";
        // this.tableView.layer.style.width = "";
        // this.tableView.layer.style.height = "";
        // MUICoreLayerAddStyle(this.tableView.layer, "alert-table");

        this._backgroundView.addSubview(this.tableView);
    }

    viewDidAppear(animated?) {
        super.viewDidAppear(animated);        
        this.tableView.reloadData();
        if (this.textFields.length > 0) {
            let tf = this.textFields[0] as UITextField;
            tf.becomeFirstResponder();
        }
    }

    viewWillDisappear(animated?){
        super.viewWillDisappear(animated);
        
        if (this.target != null && this.completion != null){
            this.completion.call(this.target);
        }
    }

    get preferredContentSize(){
        return this._alertViewSize;
    }

    private _addItem(item:UIAlertItem){
        this._items.push(item);
        this._calculateContentSize();
    }

    addAction(action:UIAlertAction){
        this._addItem(action);
    }

    addTextFieldWithConfigurationHandler(target, handler)
    {
        var ai = new UIAlertTextField();
        ai.initWithConfigurationHandler(target, handler);
        this.textFields.push(ai.textField);
        this._addItem(ai);
    }

    addCompletionHandler(target, handler){

        this.target = target;
        this.completion = handler;
    }

    private _calculateContentSize(){
        let h = 80 + (this._items.length * 50) + 1;
        this._alertViewSize = new CGSize(320, h);
    }

    numberOfSectionsIn(tableview:UITableView){
        return 1;
    }

    tableViewNumberOfRowsInSection(tableview:UITableView, section:number){
        return this._items.length + 1;
    }

    tableViewCellForRowAt( tableView:UITableView, indexPath:IndexPath ){
        let cell:UITableViewCell = null;
        if (indexPath.row == 0){
            cell = this._createHeaderCell();
        }
        else{
            let item = this._items[indexPath.row - 1];
            if (item.type == UIAlertItemType.action) {
                cell = this._createActionCellWithTitle((item as UIAlertAction).title, (item as UIAlertAction).style);
            }
            else if (item.type == UIAlertItemType.textField) {
                cell = this._createTextFieldCell((item as UIAlertTextField).textField);
            }
        }

        cell.separatorStyle = UITableViewCellSeparatorStyle.none;
        return cell;
    }

    heightForRowAtIndexPath(tableView:UITableView, indexPath:IndexPath) {
        let h = 50;
        if (indexPath.row == 0) h = 80;
        
        return h;
    }

    canSelectCellAtIndexPath(tableview, indexPath:IndexPath){
        if (indexPath.row == 0) return false;

        let item = this._items[indexPath.row - 1];
        if (item.type == UIAlertItemType.action) return true;

        return false;
    }

    didSelectCellAtIndexPath(tableView, indexPath:IndexPath){
        let item = this._items[indexPath.row - 1];
        if (item.type == UIAlertItemType.action) {
            
            if (item.completion != null) item.completion();            
            this.dismissViewController(true);
        }
    }

    // Private methods

    private _createHeaderCell():UITableViewCell{
        let cell = new UITableViewCell();
        cell.initWithStyle(UITableViewCellStyle.custom);
        // MUICoreLayerAddStyle(cell.layer, "alert-header");

        let titleLabel = new UILabel();
        titleLabel.init();
        titleLabel.text = this._title;
        // titleLabel.layer.style.left = "";
        // titleLabel.layer.style.top = "";
        // titleLabel.layer.style.right = "";
        // titleLabel.layer.style.height = "";
        // titleLabel.layer.style.width = ""; 
        // titleLabel.layer.style.background = "";
        // MUICoreLayerAddStyle(titleLabel.layer, "large");
        // MUICoreLayerAddStyle(titleLabel.layer, "strong");        
        cell.addSubview(titleLabel);

        let messageLabel = new UILabel();
        messageLabel.init();
        messageLabel.text = this._message;
        // messageLabel.layer.style.left = "";
        // messageLabel.layer.style.top = "";
        // messageLabel.layer.style.right = "";
        // messageLabel.layer.style.height = "";
        // messageLabel.layer.style.width = "";
        // messageLabel.layer.style.background = "";
        // MUICoreLayerAddStyle(messageLabel.layer, "light");        
        cell.addSubview(messageLabel);          
        
        //cell.layer.style.background = "transparent";

        return cell;
    }

    private _createActionCellWithTitle(title:string, style:any/*UIAlertAction.Style*/):UITableViewCell{
        let cell = new UITableViewCell();
        cell.initWithStyle(UITableViewCellStyle.custom);
        // MUICoreLayerAddStyle(cell.layer, "alert-cell");

        let buttonLabel = new UILabel();
        buttonLabel.init();
        //UICoreLayerRemoveStyle(buttonLabel.layer, "label");
        buttonLabel.text = title;
        // buttonLabel.layer.style.left = "";
        // buttonLabel.layer.style.top = "";
        // buttonLabel.layer.style.right = "";
        // buttonLabel.layer.style.height = "";
        // buttonLabel.layer.style.width = "";
        // buttonLabel.layer.style.background = "";        
        cell.addSubview(buttonLabel);  

        //cell.layer.style.background = "transparent";
        // MUICoreLayerAddStyle(buttonLabel.layer, "btn");                
        //MUICoreLayerAddStyle(buttonLabel.layer, "label");                

        switch(style.rawValue){

            case UIAlertAction.Style._default.rawValue:
                // MUICoreLayerAddStyle(buttonLabel.layer, "default");
                break;

            case UIAlertAction.Style.cancel.rawValue:                
                // MUICoreLayerAddStyle(buttonLabel.layer, "cancel");
                break;

            case UIAlertAction.Style.destructive.rawValue:                
                // MUICoreLayerAddStyle(buttonLabel.layer, "destructive");
                break;
        }

        return cell;        
    }

    private _createTextFieldCell(textField:UITextField):UITableViewCell{
        var cell = new UITableViewCell();
        cell.initWithStyle(UITableViewCellStyle.custom);    
        // MUICoreLayerAddStyle(cell.layer, "alert-cell");    

        // textField.layer.style.left = "";
        // textField.layer.style.top = "";
        // textField.layer.style.right = "";
        // textField.layer.style.height = "";
        // textField.layer.style.width = "";
        // textField.layer.style.background = "";
        // MUICoreLayerAddStyle(textField.layer, "input-text");

        cell.addSubview(textField);

        return cell;
    }
    
    // Transitioning delegate
    private _fadeInAnimationController = null;
    private _fadeOutAnimationController = null;

    animationControllerForPresentedController(presentedViewController, presentingViewController, sourceController){
        if (this._fadeInAnimationController == null) {
            this._fadeInAnimationController = new UIAlertFadeInAnimationController();
            this._fadeInAnimationController.init();
        }

        return this._fadeInAnimationController;
    }

    animationControllerForDismissedController(dismissedController){
        if (this._fadeOutAnimationController == null) {

            this._fadeOutAnimationController = new UIAlertFadeOutAnimationController();
            this._fadeOutAnimationController.init();
        }

        return this._fadeOutAnimationController;
    }
}

export class UIAlertFadeInAnimationController extends NSObject{
    
    transitionDuration(transitionContext){
        return 0.25;
    }

    animateTransition(transitionContext){
        // make view configurations before transitions       
    }

    animationEnded(transitionCompleted){
        // make view configurations after transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        // let animations = MUIClassListForAnimationType(MUIAnimationType.FadeIn);
        // return animations;
    }

}

export class UIAlertFadeOutAnimationController extends NSObject
{
    transitionDuration(transitionContext){
        return 0.25;
    }

    animateTransition(transitionContext){
        // make view configurations before transitions       
    }

    animationEnded(transitionCompleted){
        // make view configurations after transitions
    }

    // TODO: Not iOS like transitions. For now we use css animations
    animations(transitionContext){
        // let animations = MUIClassListForAnimationType(MUIAnimationType.FadeOut);
        // return animations;
    }
    
}