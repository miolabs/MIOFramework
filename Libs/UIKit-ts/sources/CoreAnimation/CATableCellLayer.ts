import { CALayer } from "./CALayer";


export class CATableCellLayer extends CALayer
{
    constructor( contents?:any ){
        super( contents );

        if ( this.contents.childNodes.length > 0 ) {
            for ( let element of this.contents.childNodes) {

                if (element.tagName != "DIV") continue;

                // TODO: let style = layer.getAttribute("data-cell-style");

                if (element.getAttribute("data-accessory-type") != null) {
                    this._add_accessoryView( element );
                }

                if (element.getAttribute("data-editing-accessory-view") != null) {
                    this._add_editing_accessoryView( element );
                }
            }
        }
    }
            
    //data-accessory-type="checkmark"
    
    private _add_accessoryView( element:any ) {
    
        let type = element.getAttribute("data-accessory-type");

        // this.accessoryView = new UIView();
        // this.accessoryView.initWithLayer(layer, owner);

        // if (type == "checkmark") this.accessoryType = UITableViewCellAccessoryType.checkmark;
        // else this.accessoryType = UITableViewCellAccessoryType.none;

        // if (this.accessoryType != UITableViewCellAccessoryType.none) return;
        
        // this.accessoryView.layer.addEventListener("click", this.accessoryViewDidClick.bind(this));
    }

    private _add_editing_accessoryView( element:any ) 
    {
        // let type = layer.getAttribute("data-editing-accessory-view");
        // if (type == "insert") {
        //     this.editingAccessoryInsertView = new UIView();
        //     // this.editingAccessoryInsertView.initWithLayer(layer, owner);

        //     // this.editingAccessoryInsertView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        // }
        // else if (type == "delete") {
        //     this.editingAccessoryDeleteView = new UIView();
        //     // this.editingAccessoryDeleteView.initWithLayer(layer, owner);

        //     // this.editingAccessoryDeleteView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        // }
        // else {
        //     this.editingAccessoryView = new UIView();
        //     // this.editingAccessoryView.initWithLayer(layer, owner);    

        //     // this.editingAccessoryView.layer.addEventListener("click", this.editingAccessoryViewDidClick.bind(this));
        // }

        // // TODO: Change for a gesuture recongnizer or something independent of the html
        // let instance = this;
        // this.editingAccessoryView.layer.onclick = function (e) {
        //     if (instance._onAccessoryClickFn != null) {
        //         e.stopPropagation();
        //         instance._onAccessoryClickFn.call(instance._target, instance);
        //     }
        // };
    }
    
    setSelected(value:boolean, animated:boolean) {
        if (value == true) this.addStyle( "selected" );
        else this.removeStyle( "selected" );
    }

}