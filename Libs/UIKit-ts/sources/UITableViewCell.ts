/// <reference path="core/UICoreLayer.ts" />

import { UILabel } from "./UILabel";
import { UIView } from "./UIView";
import { NSCoder } from "foundation";
import { CATableCellLayer } from "./CoreAnimation/CATableCellLayer";


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
    static get layerClass() : any { return CATableCellLayer }

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
            this.addSubview(this.textLabel);
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

    private accessoryViewDidClick(e:Event){
        e.stopPropagation();
        this._onAccessoryClickFn.call(this._target, this);
    }

    private editingAccessoryInsertView:UIView = null;
    private editingAccessoryDeleteView:UIView = null;

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

    setSelected(value:boolean, animated:boolean) {
        if (this._selected == value) return;

        this.willChangeValue("selected");
        this._selected = value;
        (this.layer as CATableCellLayer).setSelected(value, animated);
        this.didChangeValue("selected"); 
    }

    set isSelected(value:boolean) { this.setSelected(value, false); }
    get isSelected() { return this._selected; }

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