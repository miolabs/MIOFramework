import { UIView } from "./UIView";

/**
 * Created by godshadow on 21/5/16.
 */

 export enum UIActivityIndicatorViewStyle {
    White,
    WhiteLarge,
    Gray
 }

export class UIActivityIndicatorView extends UIView
{    
    initWithLayer(layer, owner, options){
        super.initWithLayer(layer, owner, options);
        this.setHidden(true);
    }

    startAnimating(){
        this.setHidden(false);
    }

    stopAnimating(){
        this.setHidden(true);
    }
    
    private _hidesWhenStopped = true;
    set hidesWhenStopped(value:boolean){
        this._hidesWhenStopped = value;
    }

    get hidesWhenStopped():boolean{
        return this._hidesWhenStopped;
    }

    private isAnimating = false;
    get animating():boolean{
        return this.isAnimating;
    }

    private _activityIndicatorViewStyle = UIActivityIndicatorViewStyle.White;
    set activityIndicatorViewStyle(value:UIActivityIndicatorViewStyle){

    }

    get activityIndicatorViewStyle(){
        return this._activityIndicatorViewStyle;
    }
}