/**
 * Created by godshadow on 15/3/16.
 */

import { NSCoder } from "foundation";
import { CATextAreaLayer } from "./CoreAnimation/CATextAreaLayer";
import { UIControl } from "./UIControl";


export class UITextArea extends UIControl
{
    private textareaLayer = null;

    textChangeTarget = null;
    textChangeAction = null;

    static get layerClass(): any { return CATextAreaLayer; }

    /*
    initWithCoder(coder: NSCoder): void {
        super.initWithCoder( coder );
        // (this.layer as CATextAreaLayer).onChangeBlock = ( value:string ) => { this._textDidChange( value ); }
    }
    */

    setText( text:string ) { this.text = text; }    
    get text(){ return (this.layer as CATextAreaLayer).string; }
    set text(text){ (this.layer as CATextAreaLayer).string = text != null ? text : ""; }

    setEditMode(value:boolean){
        this.textareaLayer.disabled = !value;
    }

    
    setOnChangeText(target:any, action:any){
    
    /*    this.textChangeTarget = target;
        this.textChangeAction = action;
        var instance = this;

        this.textareaLayer.addEventListener("input", function(e){
            if (instance.enabled) {
                let value = instance.textareaLayer.value;
                instance.textChangeAction.call(target, instance, value);
            }
        });
        */
    }
}
