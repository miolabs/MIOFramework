import { _UICoreLayerGetFirstElementWithTag } from "../core/UICoreLayer";
import { CALayer } from "./CALayer";
import { CATextLayer } from "./CATextLayer";


export class CAButtonLayer extends CALayer
{   
    private textLayer:CATextLayer;
    private imageLayer:CALayer;

    constructor( contents?:any ) {
        super( contents );
        this.textLayer = new CATextLayer( contents );
    }

    set string(title:string) { this.textLayer.string = title; }
    get string() { return this.textLayer.string; }

}
