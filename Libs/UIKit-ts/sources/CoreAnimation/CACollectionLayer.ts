import { NSClassFromString, NSLocalizeString } from "foundation";
import { _UICoreLayerGetFirstElementWithTag } from "../core/UICoreLayer";
import { CALayer, CALayerDelegate } from "./CALayer";
import { MIOCoreClassByName } from "mio-core";
import { UIView } from "../UIView";
import { UICollectionViewCell } from "../UICollectionView";
import { UICoreNibCoder, UICoreNibLoad } from "../core/UICoreNibParser";


export class CACollectionLayer extends CALayer 
{
    constructor( contents?:any ){
        super( contents );

        this.contents.style.width = "100%";
        this.contents.style.overflowX = "scroll";

        if ( this.contents.childNodes.length > 0 ) {
            for ( let element of this.contents.childNodes) {

                if (element.tagName != "DIV")
                    continue;

                if (element.getAttribute("data-cell-identifier") != null) {
                    this._add_cell_layer( element );                    
                }
                else if (element.getAttribute("data-supplementary-view-identifier") != null) {
                    this._add_supplementary_layer( element );
                }
                // else if (subLayer.getAttribute("data-collection-view-layout") != null){
                //     let classname = subLayer.getAttribute("data-class");
                //     this._collectionViewLayout = NSClassFromString(classname);
                //     this._collectionViewLayout.initWithLayer(subLayer, owner);
                // }
            }            
        }
    }

    cellLayersByIdentifier = {};

    newCellViewByIdentifier( identifier:string ) : UICollectionViewCell {
        
        let item = this.cellLayersByIdentifier[ identifier ];
        if ( item == null) throw Error("Can't find collection view cell for identifier " + identifier );

        return this.newViewFromItem( item ) as UICollectionViewCell ;
    }

    private _add_cell_layer( element:any ) {
        element.style.display = "none";
        
        let identifier = element.getAttribute("data-cell-identifier");
        let classname = element.getAttribute("data-class") ?? "UICollectionViewCell";

        let item = {};
        item["class"] = classname;
        item["contents"] = element;
        // let size = new CGSize(subLayer.clientWidth, subLayer.clientHeight);
        // if (size != null) item["size"] = size;
        // let bg = window.getComputedStyle(subLayer ,null).getPropertyValue('background-color');
        // if (bg != null) item["bg"] = bg;

        this.cellLayersByIdentifier[ identifier ] = item;
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

    private _add_supplementary_layer( element:any ){
        element.style.display = "none";

        let identifier = element.getAttribute("data-supplementary-view-identifier");
        let classname = element.getAttribute("data-class") ?? "UIView";        

        let item = {};
        item["class"] = classname;
        item["contents"] = element;
        // var size = new CGSize(subLayer.clientWidth, subLayer.clientHeight);
        // if (size != null) item["size"] = size;
        // var bg = window.getComputedStyle(subLayer ,null).getPropertyValue('background-color');
        // if (bg != null) item["bg"] = bg;

        this.supplementaryLayersByIdentifier[ identifier ] = item;
    }

}
