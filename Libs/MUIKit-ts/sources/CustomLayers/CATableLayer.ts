import { CALayer } from "uikit";
import { _UICoreLayerGetFirstElementWithTag } from "uikit";


export class CATableElementLayer extends CALayer
{
    protected element:any
    
    constructor( contents?:any, tag:string = null ) {
        let element = null;
        let c = contents;
        
        if ( contents != null ) {
            element = _UICoreLayerGetFirstElementWithTag( contents, tag );
        }
        
        if ( element == null ) {
            element = document.createElement( tag );
            if ( contents != null ) contents.appendChild( element );
            else c = element;
        }
    
        super( c );
        this.element = element;
    }
}


export class CATableLayer extends CATableElementLayer
{    
    constructor( contents?:any, tag:string = "TABLE" ) {
        super( contents, tag );
    }
}

export class CATableHeadLayer extends CATableElementLayer
{    
    constructor( contents?:any, tag:string = "THEAD" ) {
        super( contents, tag );
    }
}

export class CATableHeaderLayer extends CATableElementLayer
{    
    constructor( contents?:any, tag:string = "TH" ) {
        super( contents, tag );
    }

    set value(value:string) {
        this.element.innerHTML = value ?? "";
    }

}

export class CATableRowLayer extends CATableElementLayer
{    
    constructor( contents?:any, tag:string = "TR" ) {
        super( contents, tag );
    }

}

export class CATableBodyLayer extends CATableElementLayer
{    
    constructor( contents?:any, tag:string = "TBODY" ) {
        super( contents, tag );
    }

}

export class CATableCellLayer extends CATableElementLayer
{    
    constructor( contents?:any, tag:string = "TD" ) {
        super( contents, tag );
    }

    set value( value:string) {
        this.element.innerHTML = value;
    }

}