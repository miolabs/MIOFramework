import { NSClassFromString } from "mio-core";
import { CGContext } from "../CoreGraphics/CGContext";

export interface CALayerDelegate 
{
    display(layer:CALayer):void;
    draw(layer:CALayer, context:CGContext):void;
    layerWillDraw(layer:CALayer):void;
    layoutSublayers(of: CALayer):void;
}

export class CALayer 
{    
    delegate: CALayerDelegate|null = null;
    
    _layerID: string|null = null;

    constructor( contents?:any ) {
        this._contents = contents ?? document.createElement('div');
        this._layerID = contents?.getAttribute( "id" );
    }    
    
    private _opacity:number = 1.0;
    set opacity(opacity:number) {
        this._opacity = opacity;
    }

    get opacity() : number {
        return this._opacity;
    }

    private _style:any|null = null;
    set style(style:any) {
        this._style = style;
    }
    get style() : any {
        return this._style;
    }    

    private _contents:any;
    get contents() : any {
        return this._contents;
    }
    set contents( contents:any ) {
        this._contents = contents;
    }

    superlayer:CALayer|null = null;
    sublayers:CALayer[] = [];

    protected _isLayerInDOM = false;
    addSublayer( layer:CALayer ){
        if (this._isLayerInDOM == true) return;

        // if (this.contents == null || this.parent == null)
        //     return;

        layer.superlayer = this;
        layer.sublayers.addObject( layer );
        // HTML Stuff
        this.contents.appendChild( layer.contents );
        this._isLayerInDOM = true;
    }    
}

export class CAWindowLayer extends CALayer{
    
    constructor( ) {
        super( document.body );
    }    
}

function MUICoreViewSearchViewTag(view, tag) {
    if (view.tag == tag) return view;

    for (let index = 0; index < view.subviews.length; index++) {
        let v = view.subviews[index];
        v = MUICoreViewSearchViewTag(v, tag);
        if (v != null) return v;
    }

    return null;
} 

function MUICoreViewCreateView(layer, owner){
    let className = layer.getAttribute("data-class");
    if (className == null || className.length == 0) className = "UIView";

    let sv = NSClassFromString(className);
    sv.initWithLayer(layer, owner);    
    sv.awakeFromHTML();
    sv._checkSegues();    

    let id = layer.getAttribute("id");
    if (id != null) owner._outlets[id] = sv;

    return sv;
}
