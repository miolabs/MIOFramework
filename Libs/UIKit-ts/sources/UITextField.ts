/**
 * Created by godshadow on 12/3/16.
 */

import { Formatter, NSCoder, NSLocalizeString } from "foundation";
import { CAInputLayer } from "./CoreAnimation/CAInputLayer";
import { UIControl } from "./UIControl";

export enum UITextFieldType 
{
    normalType,
    passwordType,
    searchType,    
}

export class UITextField extends UIControl
{
    placeHolder = null;    
    type = UITextFieldType.normalType;
    private _inputLayer = null;

    textChangeTarget = null;
    textChangeAction = null;
    private _textChangeFn = null;

    enterPressTarget = null;
    enterPressAction = null;

    keyPressTarget   = null;
    keyPressAction   = null;

    formatter:Formatter = null;

    static get layerClass(): any { return CAInputLayer; }

    initWithCoder(coder: NSCoder): void {
        super.initWithCoder( coder );
        (this.layer as CAInputLayer).onChangeBlock = ( value:string ) => { this._textDidChange( value ); }
    }

    // initWithLayer(layer, owner, options?){
    //     super.initWithLayer(layer, owner, options);
    //     this._inputLayer = MUICoreLayerGetFirstElementWithTag(this.layer, "INPUT");
    //     this._setupLayer();
    // }

    private _setupLayer(){
        if (this._inputLayer == null){
            this._inputLayer = document.createElement("input");

            switch(this.type){
                case UITextFieldType.searchType:
                this._inputLayer.setAttribute("type", "search");
                break;

                default:
                this._inputLayer.setAttribute("type", "text");
                break;
            }

            // this.layer.appendChild(this._inputLayer);
        }

        const placeholderKey = this._inputLayer.getAttribute("data-placeholder");
        if (placeholderKey != null)
            this._inputLayer.setAttribute("placeholder", NSLocalizeString(placeholderKey, placeholderKey));

        this._registerInputEvent();            
    }
    // layoutSubviews(){
    //     super.layoutSubviews();

        // var w = this.getWidth();
        // var h = this.getHeight();

        // this._inputLayer.style.marginLeft = "4px";
        // this._inputLayer.style.width = (w - 8) + "px";
        // this._inputLayer.style.marginTop = "4px";
        // this._inputLayer.style.height = (h - 8) + "px";
//    }

    setText(text:string){
        this.text = text;
    }

    set text(text:string){        
        let newValue = text != null ? text : "";        
        (this.layer as CAInputLayer).string = newValue;
    }

    get text():string{
        return (this.layer as CAInputLayer).string;
    }

    setPlaceholderText( text: string ){
        ( this.layer as CAInputLayer).placeHolderText = text;        
    }

    set placeholderText( text:string ){ this.setPlaceholderText(text); }

    setOnChangeText(target:any, action:any){
        this.textChangeTarget = target;
        this.textChangeAction = action;
    }    

    private _textStopPropagationFn = null;
    private _registerInputEvent(){
        let instance = this;
        this._textChangeFn = function() {
            if (instance.enabled)
                instance._textDidChange.call(instance);
        }

        this._textStopPropagationFn = function(e){
            //instance._textDidBeginEditing();
            e.stopPropagation();
        };

        this._textDidBeginEditingFn = this._textDidBeginEditing.bind(this);
        this._textDidEndEditingFn = this._textDidEndEditing.bind(this);
        
        // this.layer.addEventListener("input", this._textChangeFn);        
        // this.layer.addEventListener("click", this._textStopPropagationFn);
        // this._inputLayer.addEventListener("focus", this._textDidBeginEditingFn);
        // this._inputLayer.addEventListener("blur", this._textDidEndEditingFn);
    }

    private _unregisterInputEvent(){
        // this.layer.removeEventListener("input", this._textChangeFn);
        // this.layer.removeEventListener("click", this._textStopPropagationFn);
        // this._inputLayer.removeEventListener("focus", this._textDidBeginEditingFn);
        // this._inputLayer.removeEventListener("blur", this._textDidEndEditingFn);

    }

    private _textDidChange( value:string ) {
        if (this.enabled == false) return;

        // Check the formater        
        if (this.formatter == null) {
            this._textDidChangeDelegate( value);
        }
        else {
            let result, newStr;
            [result, newStr] = this.formatter.isPartialStringValid(value);

            this._unregisterInputEvent();
            this._inputLayer.value = newStr;
            this._registerInputEvent();

            if (result == true) {
                this._textDidChangeDelegate(value);
            }
        }
    }

    private _textDidChangeDelegate(value){
        if (this.textChangeAction != null && this.textChangeTarget != null)
            this.textChangeAction.call(this.textChangeTarget, this, value);
    }    

    private didBeginEditingAction = null;
    private didBeginEditingTarget = null;    
    setOnBeginEditing(target, action) {
        this.didBeginEditingTarget = target;
        this.didBeginEditingAction = action;        
    }    

    private _textDidBeginEditingFn = null;
    private _textDidBeginEditing(){
        if (this.enabled == false)  return;

        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);

        if (this.didBeginEditingTarget == null || this.didBeginEditingAction == null) return;
        this.didBeginEditingAction.call(this.didBeginEditingTarget, this, this.text);
    }

    private didEndEditingAction = null;
    private didEndEditingTarget = null;    
    setOnDidEndEditing(target, action) {
        this.didEndEditingTarget = target;
        this.didEndEditingAction = action;        
    }    

    private _textDidEndEditingFn = null;
    private _textDidEndEditing(){
        if (this.enabled == false)  return;

        //if (this.formatter != null) this.text = this.formatter.stringForObjectValue(this.text);

        if (this.didEndEditingTarget == null || this.didEndEditingAction == null) return;
        this.didEndEditingAction.call(this.didEndEditingTarget, this, this.text);
    }

    setOnEnterPress(target, action){
        this.enterPressTarget = target;
        this.enterPressAction = action;
        var instance = this;

        // this.layer.onkeyup = function(e){
        //     if (instance.enabled) {
        //         if (e.keyCode == 13)
        //             instance.enterPressAction.call(target, instance, instance._inputLayer.value);
        //     }
        // }
    }

    setOnKeyPress(target, action){
        this.keyPressTarget = target;
        this.keyPressAction = action;
        var instance = this;

        // this.layer.onkeydown = function(e){
        //     if (instance.enabled) {
        //         instance.keyPressAction.call(target, instance, e.keyCode);
        //     }
        // }
    }

    setTextRGBColor(r, g, b){
        let value = "rgb(" + r + ", " + g + ", " + b + ")";
        this._inputLayer.style.color = value;
    }

    set textColor(color){
        this._inputLayer.style.color = color;
    }

    // get textColor(){
    //     let color = this._getValueFromCSSProperty("color");
    //     return color;        
    // }

    setEnabled(value){
        super.setEnabled(value);
        this._inputLayer.readOnly = !value;
    }

    becomeFirstResponder(){
        this._inputLayer.focus();
    }

    resignFirstResponder(){
        this._inputLayer.blur();
    }

    selectAll(control:UITextField){
        this._inputLayer.select();
    }

}

