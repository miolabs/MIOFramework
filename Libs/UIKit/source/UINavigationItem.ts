import { MIOObject } from "../MIOFoundation";
import { UIView, UILayerSearchElementByAttribute } from "./UIView";
import { UIButton } from "./UIButton";

export class UINavigationItem extends MIOObject
{    
    backBarButtonItem:UIButton = null;
    titleView:UIView = null;
    title:string = null;

    private leftView:UIView = null;    
    private rightView:UIView = null;
    
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

            let backButtonLayer = UILayerSearchElementByAttribute(layer, "data-nav-item-back");
            if (backButtonLayer != null) {
                this.backBarButtonItem = new UIButton();
                this.backBarButtonItem.initWithLayer(backButtonLayer, this);
            }
        }
    }
}

export function UINavItemSearchInLayer(layer)
{
    if (layer.childNodes.length > 0) {
        for (let index = 0; index < layer.childNodes.length; index++) {
            let subLayer = layer.childNodes[index];
    
            if (subLayer.tagName != "DIV") continue;

            if (subLayer.getAttribute("data-nav-item") != null) {
                let ni = new UINavigationItem();
                ni.initWithLayer(subLayer);  
                
                // Check for tittle if center view doesn't exists
                if (ni.titleView == null) {
                    let title = subLayer.getAttribute("data-nav-item-title");
                    if (title != null) ni.title = title;
                }

                return ni;             
            }
        }
    }

    return null;
 }
