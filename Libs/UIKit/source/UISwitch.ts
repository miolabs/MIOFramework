import { UIControl } from "./UIControl";
import { MUICoreLayerGetFirstElementWithTag } from "./core/MUICoreLayer";

/**
 * Created by godshadow on 12/3/16.
 */

export class UISwitch extends UIControl
{
    private _inputLayer = null;
    private _labelLayer = null;

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);

        this.layer.classList.add("switch_button");

        this._inputLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "INPUT");
        if (this._inputLayer == null) {
            this._inputLayer = document.createElement("input");
            this._inputLayer.setAttribute("type", "checkbox");
            this._inputLayer.setAttribute("id", this.layerID + "_input");
            this._inputLayer.classList.add("switch_button_input");
            layer.appendChild(this._inputLayer);
        }       

        var instance = this;
        this.layer.onclick = function() {

            if (instance.enabled) {
                instance._toggleValue.call(instance);
            }
        }
    }

    setOnChangeValue(target, action){
        this.target = target;
        this.action = action;
    }


    private _on = false;
    get isOn() {return this._on;}
    set isOn(value){this.setOn(value);}
    setOn(value){
        if (value == this._on) return;
        this._inputLayer.checked = value;
        this._on = value;
    }

    private _toggleValue(){
        this.isOn = !this.isOn;

        if (this.target != null && this.action != null)
            this.action.call(this.target, this, this.isOn);
    }
}
