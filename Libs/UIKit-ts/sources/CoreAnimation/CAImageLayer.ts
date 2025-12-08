import { _UICoreLayerGetFirstElementWithTag } from "../core/UICoreLayer";
import { CALayer } from "./CALayer";

export class CAImageLayer extends CALayer
{        
    private imageElement:any;

    constructor( contents?:any ){
        super( contents );
        if ( contents != null ) this.imageElement = _UICoreLayerGetFirstElementWithTag( contents, "IMG");
        
        if ( this.imageElement == null ) {
            this.imageElement = document.createElement("IMG");
            this.contents.appendChild( this.imageElement );
        }        
    }

    set imageURL( url:string ) { this.imageElement.setAttribute("src", url); }
    get imageURL() { return this.imageElement.getAttribute("src"); }
}
