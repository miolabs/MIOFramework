import { UIBarItem } from "./UIBarItem";
import { UIView } from "./UIView";
import { UIButton } from "./UIButton";

export class UIBarButtonItem extends UIBarItem
{
    target:any;
    action:any;

    layer = null;
    owner = null;

    customView:UIView = null;

    initWithLayer(layer, owner){
        this.layer = layer;
        this.owner = owner;

        let button = new UIButton();
        button.init();
        let systemStyle = layer.getAttribute("data-bar-button-item-system");
        if (systemStyle != null) MUICoreLayerAddStyle(button.layer, systemStyle);

        if (layer.childNodes.length > 0) {
            for (let index = 0; index < layer.childNodes.length; index++) {
                let subLayer = layer.childNodes[index] as HTMLElement;
    
                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;
    
                if (subLayer.getAttribute("data-action-selector")) {
                    let action = subLayer.getAttribute("data-action-selector");
                    this.target = owner;
                    this.action = owner[action];

                    button.addTarget(this.target, this.action, UIControlEvents.TouchUpInside);
                }
            }
        }

        this.customView = button;
    }
}