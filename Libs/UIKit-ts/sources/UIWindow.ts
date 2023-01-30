/**
 * Created by godshadow on 11/3/16.
 */

import { CALayer, CAWindowLayer } from "./CoreAnimation/CALayer";
import { UIApplication } from "./UIApplication";
import { UIView } from "./UIView";
import { UIViewController } from "./UIViewController";


export class UIWindow extends UIView
{
    rootViewController:UIViewController;

    private _resizeWindow = false; 

    init(){
        this.layer = new CAWindowLayer( );
        this.layer.style = { "StyleClass":"window" };
        // MUICoreLayerAddStyle(this.layer, "window");
    }

    initWithRootViewController(vc: UIViewController){
        this.init();        
        this.rootViewController = vc;        
    }

    makeKey(){
        UIApplication.shared.makeKeyWindow(this);
    }

    makeKeyAndVisible(){
        this.makeKey();
        this.setHidden(false);
    }

    layoutSubviews(){
        if (this.rootViewController != null)
            this.rootViewController.view.layoutSubviews();
        else
            super.layoutSubviews();                
    }

    addSubview(view:UIView){
        view._window = this;
        super.addSubview(view);
    }

    // protected _addLayerToDOM(){
    //     if (this._isLayerInDOM == true)
    //         return;

    //     if (this.layer == null)
    //         return;

    //     document.body.appendChild(this.layer);

    //     this._isLayerInDOM = true;
    // }

    removeFromSuperview(){                
        // this._removeLayerFromDOM();
    }

    // protected _removeLayerFromDOM(){
    //     if (this._isLayerInDOM == false)
    //         return;

    //     document.body.removeChild(this.layer);
    //     this._isLayerInDOM = false;
    // }

    setHidden(hidden:boolean){
        // if (hidden == false){
        //     this._addLayerToDOM();
        // }
        // else{
        //     this._removeLayerFromDOM();
        // }
    }

    _eventHappendOutsideWindow(){
        this._dismissRootViewController();        
    }

    _becameKeyWindow(){
        
    }

    _resignKeyWindow(){
        this._dismissRootViewController();
    }

    private _dismissRootViewController(){
        // if (this.rootViewController.isPresented == true){
        //     let pc = this.rootViewController.presentationController;
        //     if (pc instanceof UIPopoverPresentationController)
        //         this.rootViewController.dismissViewController(true);
        // }
    }
}

