import { NSLocalizeString } from "foundation";
import { _UICoreLayerGetFirstElementWithTag } from "../core/UICoreLayer";
import { CALayer, CALayerDelegate } from "./CALayer";


export class CAInputLayer extends CALayer 
{        
    private inputElement:any;

    constructor( contents?:any ){
        super( contents );
        this.inputElement = _UICoreLayerGetFirstElementWithTag( contents, "INPUT") ?? document.createElement("INPUT");

        const placeholderKey = contents.getAttribute("data-placeholder");
        if (placeholderKey != null)
            this.inputElement.setAttribute( "placeholder", NSLocalizeString( placeholderKey, placeholderKey ) );
        
        // this.element.addEventListener("input", this.on_input);
        // this.element.addEventListener("click", this.on_click);
        // this.element.addEventListener("focus", this.on_focus);
        // this.element.addEventListener("blur", this.on_blur);
    }

    set string( text: string|null ) {
        let newValue = text != null ? text : "";
        this.inputElement.value = newValue;
    }

    get string(){
        return this.inputElement.value;
    }

    set placeHolderText( text:string ) { this.contents.setAttribute( "placeholder", text ); }

    // HTML Related events
    private _onChangeBlock:any = null;
    set onChangeBlock( block:any ) {
        if ( block == null && this._onChangeBlock != null ) {
            // Remove callback
            this._onChangeBlock = null;
            this.inputElement.removeEventListener( "input", this.on_input.bind(this) );
        }
        else if ( block != null ) {
            this._onChangeBlock = block;
            this.inputElement.addEventListener( "input", this.on_input.bind(this) );
        }
    }
    private on_input() {
        this._onChangeBlock( this.inputElement.value );
    }

    private on_click( e:any ) {
        e.stopPropagation();
    }

    private on_focus() {

    }

    private on_blur() {

    }

}
