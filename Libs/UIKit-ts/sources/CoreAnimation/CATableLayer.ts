import { CALayer, CALayerDelegate } from "./CALayer";
import { UICoreNibCoder, UICoreNibLoad } from "../core/UICoreNibParser";
import { UIView } from "../UIView";
import { NSClassFromString, NSLocalizeString } from "foundation";
import { UITableViewCell } from "../UITableViewCell";
import { MIOCoreClassByName } from "mio-core";

export class CATableLayer extends CALayer 
{
    constructor( contents?:any ){
        super( contents );

        this.contents.style.width = "100%";
        this.contents.style.overflowY = "scroll";

        if ( this.contents.childNodes.length > 0 ) {
            for ( let element of this.contents.childNodes) {

                if (element.tagName != "DIV")
                    continue;

                if (element.getAttribute("data-cell-identifier") != null) {
                    this._add_cell_layer( element );                    
                }
                else if (element.getAttribute("data-tableview-header") != null) {
                    this._add_header_layer( element );
                }
                else if (element.getAttribute("data-tableview-footer") != null) {
                    this._add_footer_layer( element);
                }
            }
        }
    }

    private cellLayersByIdentifier = {};
    private _add_cell_layer( element:any ) {
        element.style.display = "none";
        
        let identifier = element.getAttribute("data-cell-identifier");
        let classname = element.getAttribute("data-class") ?? "UITableViewCell";

        let item = {};
        item["class"] = classname;
        item["contents"] = element;

        this.cellLayersByIdentifier[ identifier ] = item;
    }

    private headerLayer = null;
    private _add_header_layer( element:any ){    
        element.style.display = "none";

        let classname = element.getAttribute("data-class") ?? "UIView";
             
        let item = {};
        item["class"] = classname;
        item["contents"] = element;
        this.headerLayer = item;
    }

    private footerLayer = null;
    private _add_footer_layer( element:any ){
        element.style.display = "none";
        
        let classname = element.getAttribute("data-class") ?? "UIView";        
     
        let item = {};
        item["class"] = classname;
        item["layer"] = element;
        this.footerLayer = item;
    } 

    newContentView() : UIView {
        let v = new UIView();
        v.init();
        v.layer.contents.classList.add( "table-cell-content" );
        return v;
    }

    newHeaderView( ) : UIView|null {
        if ( this.headerLayer == null ) return null;
        return this.newViewFromItem( this.headerLayer ) as UIView;
    }

    newFooterView( ) : UIView|null {
        if ( this.footerLayer == null ) return null;
        return this.newViewFromItem( this.footerLayer ) as UIView;
    }

    newCellViewByIdentifier( identifier:string ) : UITableViewCell {
        
        let item = this.cellLayersByIdentifier[ identifier ];
        if ( item == null) throw Error("Can't find collection view cell for identifier " + identifier );

        return this.newViewFromItem( item ) as UITableViewCell ;
    }


    supplementaryLayersByIdentifier = {};

    newSupplementaryViewByIdentifier( identifier:string, owner:any ) : UIView {

        let item = this.supplementaryLayersByIdentifier[ identifier ];
        if ( item == null) throw Error("Can't find supplementary view for identifier " + identifier );

        //instance creation here
        return this.newViewFromItem( item );
    }

    private newViewFromItem( item:any ) : UIView {
        let c = MIOCoreClassByName( item["class"] );
        let v = NSClassFromString( item["class"] );

        let content_prototype = item["contents"];
        let contents = content_prototype.cloneNode( true);
        contents.style.display = "";
        v.layer = new c.layerClass( contents );

        UICoreNibLoad( contents, v );
 
        return v;
    }
}
