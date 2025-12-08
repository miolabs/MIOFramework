/**
 * Created by godshadow on 12/3/16.
 */

import { UIImage } from "./UIImage";
import { UIView } from "./UIView";
import { CAImageLayer } from "./CoreAnimation/CAImageLayer";


export class UIImageView extends UIView
{
    static get layerClass(): any { return CAImageLayer; }

    init(): void {
        this.layer = new UIImageView.layerClass();
    }

    set imageURL( url:string ) { (this.layer as CAImageLayer).imageURL = url; }

    // set image( image:UIImage ){
    //     if (image != null){
    //         this._imageLayer.setAttribute("src", image._url);
    //     }
    //     else {
    //         this._imageLayer.removeAttribute("src");
    //     }

    // }

    // setHeight(h){
    //     super.setHeight(h);
    //     this._imageLayer.setAttribute("height", h);
    // }

    // setWidth(w){
    //     super.setWidth(w);
    //     this._imageLayer.setAttribute("width", w);
    // }
}
