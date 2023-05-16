import { _UICoreLayerGetFirstElementWithTag } from "../core/UICoreLayer";
import { CALayer } from "./CALayer";

export function CAGetOrCreateElementWithTag( layer:CALayer, contents:any, tag:string) : any {
    let element = null;

    if ( contents != null ) {
        element = _UICoreLayerGetFirstElementWithTag( contents, tag ) 
    }
    
    if ( element == null ) {
        element = document.createElement( tag );
        contents.appendChild( element );
    }

    return element;
}