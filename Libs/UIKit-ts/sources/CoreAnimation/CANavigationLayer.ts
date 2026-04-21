import { CALayer } from "./CALayer";

export class CANavigationLayer extends CALayer
{        
    constructor( contents?:any ){
        super( contents );
        this.addStyle("navigation_view")
    }
}
