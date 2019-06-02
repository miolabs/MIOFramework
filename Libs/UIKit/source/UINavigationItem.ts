import { NSObject } from "mio-foundation-web";
import { UIView } from "./UIView";
import { UIButton } from "./UIButton";
import { MUICoreLayerSearchElementByAttribute } from "./core/MUICoreLayer";
import { UILabel } from "./UILabel";

export class UINavigationItem extends NSObject
{    
    backBarButtonItem:UIButton = null;
    titleView:UIView = null;
    title:string = null;

    private leftView:UIView = null;    
    private rightView:UIView = null;
    
    initWithTitle(title:string){
        super.init();

        this.title = title;
        let titleLabel = new UILabel();
        titleLabel.init();
        titleLabel.text = title;
        
        this.titleView = titleLabel;
    }

    initWithLayer(layer){
        if (layer.childNodes.length > 0) {
            for (let index = 0; index < layer.childNodes.length; index++) {
                let subLayer = layer.childNodes[index];
        
                if (subLayer.tagName != "DIV") continue;
    
                if (subLayer.getAttribute("data-nav-item-left") != null) {
                    let v:UIView = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.leftView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-center") != null) {
                    let v:UIView = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.titleView = v;
                }
                else if (subLayer.getAttribute("data-nav-item-right") != null) {
                    let v:UIView = new UIView();
                    v.initWithLayer(subLayer, this);
                    this.rightView = v;
                }
            }

            let backButtonLayer = MUICoreLayerSearchElementByAttribute(layer, "data-nav-item-back");
            if (backButtonLayer != null) {
                this.backBarButtonItem = new UIButton();
                this.backBarButtonItem.initWithLayer(backButtonLayer, this);
            }
        }
    }
}
