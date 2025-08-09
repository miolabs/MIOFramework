/// <reference path="core/UICoreLayer.ts" />

import { UILabel } from "./UILabel";
import { UIView } from "./UIView";
import { NSCoder } from "foundation";


export enum UITableViewCellStyle 
{
    custom,
    default
}

export enum UITableViewCellAccessoryType
{

    none,
    disclosureIndicator,
    detailDisclosureButton,
    checkmark
}

export enum UITableViewCellEditingStyle 
{
    none,
    delete,
    insert
}

export enum UITableViewCellSeparatorStyle
{
    none,
    singleLine,
    singleLineEtched // TODO 
}

export enum UITableViewCellSelectionStyle 
{
    none,
    default
}

export class UITableViewCell extends UIView 
{
    reuseIdentifier: string = null;

    nodeID: string = null;

    contentView: UIView = null;
    style = UITableViewCellStyle.custom;

    textLabel: UILabel = null;
    
    accessoryView:UIView = null;
    separatorStyle = UITableViewCellSeparatorStyle.singleLine;

    private _editing = false;
    editingAccessoryView: UIView = null;

    selectionStyle = UITableViewCellSelectionStyle.default;
    private _selected = false;

    _target = null;
    _onClickFn = null;
    _onDblClickFn = null;
    _onAccessoryClickFn = null;
    _onEditingAccessoryClickFn = null;

    _section = null;

    initWithStyle(style: UITableViewCellStyle) {

        super.init();
        this.style = style;

        if (style == UITableViewCellStyle.default) {
            this.textLabel = new UILabel();
            this.textLabel.init();
            // this.textLabel.layer.style.top = "";
            // this.textLabel.layer.style.left = "";
            // this.textLabel.layer.style.width = "";
            // this.textLabel.layer.style.height = "";
            // this.textLabel.layer.classList.add("tableviewcell_default_textlabel");
            this.addSubview(this.textLabel);
            // this.layer.style.height = "44px";

            // MUICoreLayerAddStyle(this.layer, "cell");
        }

        this._setupLayer();
    }
/*
    initWithLayer(layer, owner, options?) {
        // super.initWithLayer(layer, owner, options);

        this.scanLayerNodes(layer, owner);
        
        let style = layer.getAttribute("data-cell-style");
        if (style == "IBUITableViewCellStyleDefault") {
            this.style = UITableViewCellStyle.default;
            let propertyID = layer.getAttribute("data-cell-textlabel-id")
            let item = owner._outlets[propertyID];
            this.textLabel = item;
        }                

        //MUICoreStoryboardParseLayer(layer, this, owner);

        this._setupLayer();
    }
*/

    initWithCoder( coder: NSCoder ) {
        super.initWithCoder(coder);
        this._setupLayer();
    }

    private scanLayerNodes(layer, owner) {

        if (layer.childNodes.length == 0) return;

        if (layer.childNodes.length > 0) {
            for (var index = 0; index < layer.childNodes.length; index++) {
                var subLayer = layer.childNodes[index];

                if (subLayer.tagName != "DIV")
                    continue;

                this.scanLayerNodes(subLayer, owner);

                if (subLayer.getAttribute("data-accessory-type") != null) {
                    this.addAccessoryView(subLayer, owner);
                }

                if (subLayer.getAttribute("data-editing-accessory-view") != null) {
                    this.addEditingAccessoryView(subLayer, owner);
                }
            }
        }

    }

        // Check for actions    

    //data-accessory-type="checkmark"

    private addAccessoryView(layer, owner) {

        let type = layer.getAttribute("data-accessory-type");

        this.accessoryView = new UIView();
        // this.accessoryView.initWithLayer(layer, owner);

        if (type == "checkmark") this.accessoryType = UITableViewCellAccessoryType.checkmark;
        else this.accessoryType = UITableViewCellAccessoryType.none;

        if (this.accessoryType != UITableViewCellAccessoryType.none) return;
        
        // this.accessoryView.layer.addEventListener("click", this.accessoryViewDidClick.bind(this));
    }

    private accessoryViewDidClick(e:Event){
        e.stopPropagation();
        this._onAccessoryClickFn.call(this._target, this);
    }

    private editingAccessoryInsertView:UIView = null;
    private editingAccessoryDeleteView:UIView = null;
    private addEditingAccessoryView(layer, owner) {

        let type = layer.getAttribute("data-editing-accessory-view");
        if (type == "insert") {
            this.editingAccessoryInsertView = new UIView();
            // this.editingAccessoryInsertView.initWithLayer(layer, owner);

            // this.editingAccessoryInsertView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }
        else if (type == "delete") {
            this.editingAccessoryDeleteView = new UIView();
            // this.editingAccessoryDeleteView.initWithLayer(layer, owner);

            // this.editingAccessoryDeleteView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }
        else {
            this.editingAccessoryView = new UIView();
            // this.editingAccessoryView.initWithLayer(layer, owner);    

            // this.editingAccessoryView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        }

        // // TODO: Change for a gesuture recongnizer or something independent of the html
        // let instance = this;
        // this.editingAccessoryView.layer.onclick = function (e) {
        //     if (instance._onAccessoryClickFn != null) {
        //         e.stopPropagation();
        //         instance._onAccessoryClickFn.call(instance._target, instance);
        //     }
        // };
    }

    private _editingAccessoryType = UITableViewCellEditingStyle.none;

    get editingAccessoryType(){ return this._editingAccessoryType;}
    set editingAccessoryType(value:UITableViewCellEditingStyle){
        this.setEditingAccessoryType(value);
    }

    setEditingAccessoryType(value:UITableViewCellEditingStyle){
        this._editingAccessoryType = value;

        // Reset
        if (this.editingAccessoryDeleteView != null) this.editingAccessoryDeleteView.setHidden(true);
        if (this.editingAccessoryInsertView != null) this.editingAccessoryInsertView.setHidden(true);
        if (this.editingAccessoryView != null) this.editingAccessoryView.setHidden(true);

        // Set the view type
        if (value == UITableViewCellEditingStyle.insert && this.editingAccessoryInsertView != null) {
            this.editingAccessoryView = this.editingAccessoryInsertView;
            this.editingAccessoryInsertView.setHidden(false);            
        } 
        else if (value == UITableViewCellEditingStyle.delete && this.editingAccessoryDeleteView != null) {
            this.editingAccessoryView = this.editingAccessoryDeleteView;
            this.editingAccessoryDeleteView.setHidden(false);            
        } 
    }

    private editingAccessoryViewDidClick(e:Event){
        e.stopPropagation();
        this._onEditingAccessoryClickFn.call(this._target, this);
    }

    private _setupLayer() {
        // this.layer.registerEventAction( this, this._onClickFn );


        // this.layer.ondblclick = function (e) {
        //     if (instance._onDblClickFn != null) {
        //         e.stopPropagation();
        //         instance._onDblClickFn.call(instance._target, instance);
        //     }
        // };
    }

    private _accessoryType:UITableViewCellAccessoryType = UITableViewCellAccessoryType.none;
    get accessoryType() {return this._accessoryType;}
    set accessoryType(value:UITableViewCellAccessoryType){
        this.setAccessoryType(value);
    }

    setAccessoryType(type) {
        if (type == this._accessoryType)
            return;

        if (this.accessoryView == null) {
            // if (this.style == UITableViewCellStyle.default) this.textLabel.layer.style.right = "25px";

            let layer = document.createElement("div");
            layer.style.position = "absolute";
            layer.style.top = "15px";
            layer.style.right = "5px";
            layer.style.width = "15px";
            layer.style.height = "15px";

            // this.accessoryView = new UIView("accessory_view");
            // this.accessoryView.initWithLayer(layer, null);

            // this.addSubview(this.accessoryView);
        }

        // if (type == UITableViewCellAccessoryType.None) this.accessoryView.setHidden(true);
        // else this.accessoryView.setHidden(false);

        // if (type == UITableViewCellAccessoryType.none) MUICoreLayerRemoveStyle(this.layer, "checked");
        // else MUICoreLayerAddStyle(this.layer, "checked");

        // this._accessoryType = type;
    }

    setPaddingIndex(value) {

        var offset = (value + 1) * 10;
        if (this.style == UITableViewCellStyle.default) this.textLabel.setX(offset);
    }

    setHeight(h) {
        super.setHeight(h);

        var offsetY = (h - 15) / 2;

        if (this.accessoryView != null) {
            // this.accessoryView.layer.style.top = offsetY + "px";
        }
    }

    setSelected(value) {
        if (this._selected == value) return;

        // WORKAORUND
        //let fix = this.layer.getClientRects();
        // WORKAORUND

        this.willChangeValue("selected");
        this._selected = value;
        if (this.selectionStyle == UITableViewCellSelectionStyle.default) {
            // if (value == true)
            //     MUICoreLayerAddStyle(this.layer, "selected");
            // else 
            //     MUICoreLayerRemoveStyle(this.layer, "selected");
        }
        
        this.didChangeValue("selected"); 
    }

    set selected(value) {
        this.setSelected(value);
    }

    get selected() {
        return this._selected;
    }

    _setHightlightedSubviews(value) {
        for (var count = 0; count < this.subviews.length; count++) {
            var v = this.subviews[count];
            if (v instanceof UILabel)
                v.setHightlighted(value);
        }
        if (this.accessoryView == null) return;

        if (value == true) {

            switch (this.accessoryType) {

                case UITableViewCellAccessoryType.disclosureIndicator:
                    //this.accessoryView.layer.classList.remove("tableviewcell_accessory_disclosure_indicator");
                    //this.accessoryView.layer.classList.add("tableviewcell_accessory_disclosure_indicator_highlighted");
                    break;
            }
        }
        else {

            switch (this.accessoryType) {

                case UITableViewCellAccessoryType.disclosureIndicator:
                    //this.accessoryView.layer.classList.remove("tableviewcell_accessory_disclosure_indicator_highlighted");
                    //this.accessoryView.layer.classList.add("tableviewcell_accessory_disclosure_indicator");
                    break;
            }
        }
    }

    setEditing(editing, animated?) {

        if (editing == this._editing) return;

        this._editing = editing;

        if (this.editingAccessoryView != null) {
            this.editingAccessoryView.setHidden(!editing);
        }
    }

    set editing(value: boolean) {
        this.setEditing(value, false);
    }

    get isEditing(): boolean {
        return this._editing;
    }
}