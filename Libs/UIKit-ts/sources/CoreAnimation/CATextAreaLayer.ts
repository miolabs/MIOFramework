import { _UICoreLayerGetFirstElementWithTag } from "../core/UICoreLayer";
import { CALayer } from "./CALayer";

export interface CATextProtocol
{
    set string( text:string | null );
    get string( ): string | null;
}

export class CATextAreaLayer extends CALayer implements CATextProtocol
{        
    private textElement:any;

    constructor( contents?:any ){
        super( contents );
        if ( contents != null ) this.textElement = _UICoreLayerGetFirstElementWithTag( contents, "TEXTAREA");
        
        if ( this.textElement == null ) {
            this.textElement = document.createElement("TEXTAREA");
            this.contents.appendChild( this.textElement );
        }        
    }

    set string( text: string|null ) {
        let newValue = text != null ? text : "";
        this.textElement.value = newValue;
    }

    get string(){
        return this.textElement.value;
    }

}
