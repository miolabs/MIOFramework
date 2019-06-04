import { UIBarItem } from "./UIBarItem";
import { UIView } from "./UIView";
import { UIButton } from "./UIButton";
import { NSLocalizeString } from "mio-foundation-web";

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
        MUICoreLayerAddStyle(button.layer, "system-" + UIBarButtonSystemItem[systemItem] + "-icon");

        this.customView = button;
    }

    initWithLayer(layer, owner){
        super.init();
        this.layer = layer;
        this.owner = owner;

        let button = new UIButton();
        button.init();
        let systemStyle = layer.getAttribute("data-bar-button-item-system");
        if (systemStyle != null) MUICoreLayerAddStyle(button.layer, "system-" + systemStyle + "-icon");

        if (layer.childNodes.length > 0) {
            for (let index = 0; index < layer.childNodes.length; index++) {
                let subLayer = layer.childNodes[index] as HTMLElement;
    
                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;
    
                if (subLayer.getAttribute("data-action-selector")) {
                    let action = subLayer.getAttribute("data-action-selector");
                    this.target = owner;
                    this.action = owner[action];

                    button.addTarget(this.target, this.action, UIControl.Event.TouchUpInside);
                }
            }
        }

        this.customView = button;
    }
}