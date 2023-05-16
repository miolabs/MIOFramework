import { NSClassFromString } from "foundation";
import { CGContext } from "../CoreGraphics/CGContext";


export interface CALayerDelegate 
{
    display?(layer:CALayer):void;
    draw?(layer:CALayer, context:CGContext):void;
    layerWillDraw?(layer:CALayer):void;
    layoutSublayers?(of: CALayer):void;
}

export class CALayer 
{    
    delegate: CALayerDelegate|null = null;        

    _layerID: string|null = null;
    contents:any;

    constructor( contents?:any ) {
        this.contents = contents ?? document.createElement('div');
        this._layerID = contents?.getAttribute( "id" );        
    }
            
    set isHidden(value:boolean) {
        if (value)
            this.contents.style.display = "none";
        else
            this.contents.style.display = "";
    }
    
    set opacity(opacity:number) {
        this.contents.style.opacity = String( opacity );
    }

    get opacity() : number {
        return Number( this.contents.style.opacity ) ?? 1.0;
    }
    
    addStyle( style:string ) {
        this.contents.classList.add( style );
    }
    removeStyle( style:string ) {
        this.contents.classList.remove( style );
    }    

    // private _contents:any;
    // get contents() : any {
    //     return this._contents;
    // }
    // set contents( contents:any ) {
    //     this._contents = contents;
    // }

    superlayer:CALayer|null = null;
    sublayers:CALayer[] = [];

    protected _isLayerInDOM = false;
    addSublayer( layer:CALayer ){
        if (layer._isLayerInDOM == true) return;

        layer.superlayer = this;
        this.sublayers.addObject( layer );

        // HTML Stuff
        this.contents.appendChild( layer.contents );
        layer._isLayerInDOM = true;
    }    

    removeFromSuperlayer(){
        if ( this.superlayer == null ) return;
        this.superlayer.sublayers.removeObject( this );
        
        if ( this._isLayerInDOM == false ) return; 

        this.superlayer.contents.removeChild( this.contents );
        this._isLayerInDOM = false;
    }

    //
    // Events
    // 

    private _event_target: any = null;
    private _event_action: any = null;
    registerEventAction( target:any, action: any ) {
        this._event_target = target;
        this._event_action = action;        

        this.contents.addEventListener( "click", function(e:any) { e.stopPropagation(); } );

        let instance = this;
        if (action == null && this._event_action != null ) {
            this._event_action = null;            
            this.contents.removeEventListener( "mouseup", this.on_mouse_down.bind(this) );
            this.contents.removeEventListener( "mousedown", this.on_mouse_down.bind(this) );

        }
        else if ( action != null ) {
            this._event_action = action;
            this.contents.addEventListener( "mouseup", this.on_mouse_up.bind(this) );
            this.contents.addEventListener( "mousedown", this.on_mouse_down.bind(this) );
        }

    }

    private on_mouse_up( e:any ){
        if ( this._event_action != null ) this._event_action.call( this._event_target, CALayerEvent.mouseUp );
    }

    private on_mouse_down( e:any ){
        if ( this._event_action != null ) this._event_action.call( this._event_target, CALayerEvent.mouseDown );
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


export enum CALayerEvent
{
    mouseUp = 0,
    mouseDown = 1,
    mouseMove = 2,
    click = 3,
    change = 4
}