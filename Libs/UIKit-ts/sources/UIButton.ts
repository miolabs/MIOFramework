/**
 * Created by godshadow on 12/3/16.
 */

import { NSCoder } from "foundation";
import { CAButtonLayer } from "./CoreAnimation/CAButtonLayer";
import { CGRect } from "./CoreGraphics/CGRect";
import { UIColor } from "./UIColor";
import { UIControl } from "./UIControl";
import { UIEvent } from "./UIEvent";

export enum UIButtonType
{
    MomentaryPushIn,
    PushOnPushOff,
    PushIn
}

export class UIButton extends UIControl
{
    private _statusStyle = null;

    private _titleStatusStyle = null;
    private _titleLayer = null;

    private _imageStatusStyle = null;
    private _imageLayer = null;
    
    type = UIButtonType.MomentaryPushIn;
    
    static get layerClass() : any { return CAButtonLayer }

    initWithFrame(frame: CGRect) {
        super.initWithFrame(frame);
        // MUICoreLayerAddStyle(this.layer, "btn");
        // this.setupLayers();
    }

    initWithCoder( coder: NSCoder ) {
        super.initWithCoder( coder );

        let type = coder.decodeIntegerForKey( "type" );
        switch( type ){
            case "MomentaryPushIn": this.type = UIButtonType.MomentaryPushIn; break;
            case "PushOnPushOff"  : this.type = UIButtonType.PushOnPushOff; break;
            case "PushIn"         : this.type = UIButtonType.PushIn; break;
        }
    }

    //
    // Event handling
    //

    touchesBeginWithEvent(touches: any, event: UIEvent ): void {
        switch ( this.type ) {
            case UIButtonType.MomentaryPushIn:
            case UIButtonType.PushIn:
            this.setSelected( true );
            break;

            case UIButtonType.PushOnPushOff:
            this.setSelected( !this.selected );
            break;
        }
    }

    touchesEndedWithEvent( touches: any, event: UIEvent ): void {
        super.touchesEndedWithEvent( touches, event );
        if ( this.type == UIButtonType.MomentaryPushIn ) this.setSelected( false );
    }

    //
    // Properties
    //

    setTitle(title:string){
        (this.layer as CAButtonLayer).string = title;
    }

    set title(title){ this.setTitle( title ); }
    get title() { return (this.layer as CAButtonLayer).string; }

    setTitleColorFor(color: UIColor) {
        this._titleLayer.style.color = "#" + color.hex;
    }

    setImageURL(urlString:string){

        if (urlString != null){
            this._imageLayer.setAttribute("src", urlString);
        }
        else {
            this._imageLayer.removeAttribute("src");
        }
    }

}



