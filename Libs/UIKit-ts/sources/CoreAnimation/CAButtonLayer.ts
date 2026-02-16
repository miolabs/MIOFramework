import { _UICoreLayerGetFirstElementWithTag } from "../core/UICoreLayer";
import { CALayer } from "./CALayer";
import { CATextLayer } from "./CATextLayer";


export class CAButtonLayer extends CALayer
{   
    private imageLayer:CALayer;

    constructor( contents?:any ) {
        super( contents );
        if (contents == null) this.addStyle( "button" );
    }

    set title(title:string) { this.contents.innerHTML = title; }
    get title() { return this.contents.innerHTML; }

}
