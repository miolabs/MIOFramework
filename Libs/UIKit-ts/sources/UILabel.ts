/**
 * Created by godshadow on 11/3/16.
 */

import { CATextLayer } from "./CoreAnimation/CATextLayer";
import { UIView } from "./UIView";


export class UILabel extends UIView
{    
    autoAdjustFontSize = "none";
    autoAdjustFontSizeValue = 4;

    static get layerClass(): any { return CATextLayer; }

    init(): void {
        this.layer = new UILabel.layerClass();
    }

    setText( text:string ) { this.text = text; }    
    get text(){ return (this.layer as CATextLayer).string; }
    set text(text){ (this.layer as CATextLayer).string = text != null ? text : ""; }

    setTextAlignment( alignment ){
        // this.layer.style.textAlign = alignment;
    }

    setHightlighted( value:boolean ){
        if (value == true){
            // this.layer.style[ "StyleClass" ].addObject( "label_highlighted_color" );
        }
        else{
            // this.layer.style[ "StyleClass" ].removeObject( "label_highlighted_color" );
        }
    }

    setTextRGBColor(r:number, g:number, b:number){
        let value = "rgb(" + r + ", " + g + ", " + b + ")";
        // this.layer.style["color"] = value;
    }

    setFontSize( size:number ){
        // this.layer.style[ "fontSize" ] = size;
    }

    setFontStyle(style){
        // this.layer.style[ "FontWeight" ] = style;
    }

    setFontFamily(fontFamily){
        // this.layer.style[ "FontFamily" ] = fontFamily;
    }
}
