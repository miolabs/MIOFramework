import { NSLocalizeString } from "mio-foundation-web";
import { UIControl } from "./UIControl";
import { MUICoreLayerAddStyle } from "./core/MUICoreLayer";
import { MUICoreLayerRemoveStyle } from "./core/MUICoreLayer";
import { MUICoreLayerGetFirstElementWithTag } from "./core/MUICoreLayer";
import { NSClassFromString } from "mio-foundation-web";
import { UIViewController } from "./UIViewController";
import { MUICoreBundleGetClassesByDestination } from "./core/MUICoreNibParser";

/**
 * Created by godshadow on 12/3/16.
 */

export enum UIButtonType
{
    MomentaryPushIn,
    PushOnPushOff,
    PushIn
}

export class UIButton extends UIControl
{
    private _statusStyle = null;

    private _titleStatusStyle = null;
    private _titleLayer = null;

    private _imageStatusStyle = null;
    private _imageLayer = null;
    
    type = UIButtonType.MomentaryPushIn;

    init(){
        super.init();
        MUICoreLayerAddStyle(this.layer, "btn");
        this.setupLayers();
    }

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);

        let type = this.layer.getAttribute("data-type");
        if (type == "MomentaryPushIn")
            this.type = UIButtonType.MomentaryPushIn;
        else if (type == "PushOnPushOff")
            this.type = UIButtonType.PushOnPushOff;
        else if (type == "PushIn")
            this.type = UIButtonType.PushIn;

        // Check for title layer
        this._titleLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "SPAN");


        // Check for img layer
        this._imageLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "IMG");
        if (this._imageLayer == null) this._imageLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "DIV");

        // Check for status
        let status = this.layer.getAttribute("data-status");
        if (status == "selected")
            this.setSelected(true);

        this.setupLayers();
    }

    private setupLayers(){
        //UICoreLayerRemoveStyle(this.layer, "view");
        //UICoreLayerAddStyle(this.layer, "btn");

        if (this._titleLayer == null) {
            this._titleLayer = document.createElement("span");
            this.layer.appendChild(this._titleLayer);
        }

        let key = this.layer.getAttribute("data-title");
        if (key != null) this.setTitle(NSLocalizeString(key, key));
        
        // Prevent click
        this.layer.addEventListener("click", function(e) {
            e.stopPropagation();
        });
        
        this.layer.addEventListener("mousedown", function(e) {
            e.stopPropagation();
            if (this.enabled == false) return;

            switch (this.type){
                case UIButtonType.MomentaryPushIn:
                case UIButtonType.PushIn:
                this.setSelected(true);
                break;

                case UIButtonType.PushOnPushOff:
                this.setSelected(!this.selected);
                break;
            }
            
        }.bind(this));

        this.layer.addEventListener("mouseup", function(e) {
            e.stopPropagation();
            if (this.enabled == false) return;            
            if (this.type == UIButtonType.MomentaryPushIn) this.setSelected(false);

            if (this.action != null && this.target != null)
                this.action.call(this.target, this);
            
        }.bind(this));
    }

    setTitle(title){
        this._titleLayer.innerHTML = title;
    }

    set title(title){
        this.setTitle(title);
    }

    get title(){
        return this._titleLayer.innerHTML;
    }

    setImageURL(urlString:string){
        if (urlString != null){
            this._imageLayer.setAttribute("src", urlString);
        }
        else {
            this._imageLayer.removeAttribute("src");
        }
    }

}



