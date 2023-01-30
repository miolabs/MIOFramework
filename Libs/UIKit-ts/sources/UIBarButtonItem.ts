/// <reference path="UIBarItem.ts" />

import { UIBarItem } from "./UIBarItem";
import { UIButton, UIControl, UIView } from "./_index";


export enum UIBarButtonSystemItem 
{
    Done,
    Cancel,
    Edit,
    Save,
    Add,
    FlexibleSpace,
    FixedSpace,
    Compose,
    Reply,
    Action,
    Organize,
    Bookmarks,
    Search,
    Refresh,
    Stop,
    Camera,
    Trash,
    Play,
    Pause,
    Rewind,
    FastForward,
    Undo,
    Redo    
}

export class UIBarButtonItem extends UIBarItem
{
    target:any;
    action:any;

    layer = null;
    owner = null;

    customView:UIView = null;

    initWithCustomView(view:UIView){
        super.init();
        this.customView = view;
    }

    initWithBarButtonSystemItem(systemItem:UIBarButtonSystemItem, target, action){
        super.init();

        let button = new UIButton();
        button.init();
        // MUICoreLayerAddStyle(button.layer, "system-" + UIBarButtonSystemItem[systemItem] + "-icon");

        this.customView = button;
    }

    initWithLayer(layer, owner){
        super.init();
        this.layer = layer;
        this.owner = owner;

        let button = new UIButton();
        button.init();
        button.owner = owner;
        
        let systemStyle = layer.getAttribute("data-bar-button-item-system");
        // if (systemStyle != null) MUICoreLayerAddStyle(button.layer, "system-" + systemStyle + "-icon");

        let imageStyle = layer.getAttribute("data-bar-button-item-image");
        if (imageStyle != null) button.setImageURL("assets/" + imageStyle + ".png");

        let titleStyle = layer.getAttribute("data-bar-button-item-title");
        if (titleStyle != null) {
            button.setTitle(titleStyle);
            button.layer.style.position = "absolute";
            button.layer.style.left = "10px";
            button.layer.style.top = "15px";
        }

        if (layer.childNodes.length > 0) {
            for (let index = 0; index < layer.childNodes.length; index++) {
                let subLayer = layer.childNodes[index] as HTMLElement;
    
                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;
    
                if (subLayer.getAttribute("data-action-selector")) {
                    let action = subLayer.getAttribute("data-action-selector");
                    this.target = owner;
                    this.action = owner[action];

                    button.addTarget(this.target, this.action, UIControl.Event.touchUpInside);
                }
                else if (subLayer.getAttribute("data-connections") == "true") {
                    let obj = this;
                    //if (options != null && options["Object"] != null) obj = options["Object"];
                    // MUICoreStoryboardParseConnectionsLayer(subLayer, button, owner);
                    continue;
                }

            }
        }

        this.customView = button;
    }
}