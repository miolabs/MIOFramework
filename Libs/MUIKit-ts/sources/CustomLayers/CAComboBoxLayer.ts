import { CALayer, CALayerEvent, CATextLayer } from "uikit";
import { _UICoreLayerGetFirstElementWithTag } from "uikit";
import { CAComboBoxItemLayer } from "./CAComboBoxItemLayer";

export class CAComboBoxLayer extends CALayer
{    
    private selectElement:any;

    constructor( contents?:any ) {
        super( contents );
        if ( contents != null ) {
            this.selectElement = _UICoreLayerGetFirstElementWithTag( contents, "SELECT" );
        }
        
        if ( this.selectElement == null ) {
            this.selectElement = document.createElement("SELECT");
            this.contents.appendChild( this.selectElement );
        }

        // TODO: Parse items

        
    }
    
    private _on_change_target:any = null;
    private _on_change_action:any = null;
    setOnChangeBlock( target:any, action:any) {        
        this._on_change_target = target;
        this._on_change_action = action;

        if (target == null) {
            this.selectElement.removeEventListener( "change", this.on_change.bind(this) );
        }
        else {
            this.selectElement.addEventListener( "change", this.on_change.bind(this) );
        }
    }

    private on_change( e:any ){
        if ( this._on_change_action != null ) this._on_change_action.call( this._on_change_target, CALayerEvent.change );
    }

    private items:CAComboBoxItemLayer[] = []
    
    addItemLayer( item:CAComboBoxItemLayer ){
        this.items.addObject( item );
        this.selectElement.appendChild( item.optionElement );
    }

    selectItem( value: any ) {
        this.selectElement.value = value;
    }

    get selectedItem() : any {
        return this.selectElement.value;
    }

    removeItemLayers() {
        for(let i of this.items) {
            this.selectElement.removeChild( i.optionElement );
        }

        this.items = [];
    }

}