/**
 * Created by godshadow on 12/3/16.
 */

import { UIControl } from "./UIControl";
import { UIEvent } from "./UIEvent";

export class UICheckButton extends UIControl
{
    target = null;
    action = null;    

    // init(){
    //     super.init();
    //     MUICoreLayerAddStyle(this.layer, "checkbox"); 
    // }

    // initWithLayer(layer, owner, options?){
    //     super.initWithLayer(layer, owner, options);        
    //     this.layer.addEventListener("click", this._on_click.bind(this), false);
    // }

    // private _on_click(ev:Event){
    //     if (this.enabled) {
    //         this.toggleValue();
    //     }
    // }

    // setOnChangeValue(target, action){
    //     this.target = target;
    //     this.action = action;
    // }

    touchesBeganWithEvent(touches: any, event: UIEvent): void {
        super.touchesBeganWithEvent( touches, event );
        this.toggleValue();
    }

    private _on = false;
    get on():boolean{
        return this._on;
    }

    set on(value:boolean){
        this.setOn(value);
    }    

    setOn(on:boolean){
        this._on = on;
        this.selected = on;
    }

    toggleValue(){
        this.setOn(!this._on);
    }
}
