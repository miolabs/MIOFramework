import { CALayer } from "uikit";
import { _UICoreLayerGetFirstElementWithTag } from "uikit";


export class CAComboBoxItemLayer extends CALayer
{
    public optionElement:any;

    constructor( contents?:any ) {
        super( contents );
        if ( contents != null ) {
            this.optionElement = _UICoreLayerGetFirstElementWithTag( contents, "OPTION") 
        }
        
        if ( this.optionElement == null ) {
            this.optionElement = document.createElement("OPTION");
            this.contents.appendChild( this.optionElement );
        }        
    }

    title:string = null;
    value:any = null;

    setValue( title:string, value?:any ) {
        this.title = title;
        let v = value ?? title;        
        this.value = v;

        this.optionElement.innerHTML = title;
        this.optionElement.value = v;
    }

}