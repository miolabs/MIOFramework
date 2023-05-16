/**
 * Created by godshadow on 21/5/16.
 */

import { UIView } from "./UIView";


export enum UIActivityIndicatorViewStyle 
{
    white,
    whiteLarge,
    gray
 }

export class UIActivityIndicatorView extends UIView
{    
    initWithLayer(layer, owner, options){
        // super.initWithLayer(layer, owner, options);
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

    private _activityIndicatorViewStyle = UIActivityIndicatorViewStyle.white;
    set activityIndicatorViewStyle(value:UIActivityIndicatorViewStyle){

    }

    get activityIndicatorViewStyle(){
        return this._activityIndicatorViewStyle;
    }
}