/// <reference path="core/UICoreLayer.ts" />

import { UINavigationItem } from "./UINavigationItem";
import { UIView } from "./UIView";


export class UINavigationBar extends UIView
{
    init(){
        super.init();
        this.setup();
    }

    // initWithLayer(layer, owner, options?){
    //     super.initWithLayer(layer, owner, options);
    //     this.setup();
    // }

    private leftView:UIView = null;
    private titleView:UIView = null;
    private rigthView:UIView = null;
    private setup(){
        // MUICoreLayerAddStyle(this.layer, "navigation-bar");
        // this.layer.style.width = "100%";

        this.leftView = new UIView();
        this.leftView.init();
        // this.leftView.layer.style.position = "absolute";
        // this.leftView.layer.style.top = "0px";
        // this.leftView.layer.style.height = "100%";
        // this.leftView.layer.style.width = "20%";
        // this.leftView.layer.style.left = "0px";
        this.addSubview(this.leftView);

        this.titleView = new UIView();
        this.titleView.init();
        // this.titleView.layer.style.position = "absolute";
        // this.titleView.layer.style.top = "0px";
        // this.titleView.layer.style.height = "100%";
        // this.titleView.layer.style.width = "60%";
        // this.titleView.layer.style.left = "20%";
        this.addSubview(this.titleView);

        this.rigthView = new UIView();
        this.rigthView.init();
        // this.rigthView.layer.style.position = "absolute";
        // this.rigthView.layer.style.top = "0px";
        // this.rigthView.layer.style.height = "100%";
        // this.rigthView.layer.style.width = "44px";
        // this.rigthView.layer.style.right = "0px";        
        this.addSubview(this.rigthView);
    }

    private _items = [];
    get items(){return this._items;}
    setItems(items:UINavigationItem[], animated:boolean){        
        this._items = items;

        //TODO: Animate!!!

        for (let index = 0; index < items.length; index++){
            let ni = items[index];

            // Add title
            if (ni.titleView != null) {
                this.titleView.addSubview(ni.titleView);
            }

            // Add right button
            if (ni.leftBarButtonItem != null) {
                this.leftView.addSubview(ni.leftBarButtonItem.customView);                
            }

            // Add right button
            if (ni.rightBarButtonItem != null) {
                this.rigthView.addSubview(ni.rightBarButtonItem.customView);                
            }
        }
    }    
    
    pushNavigationItem(item:UINavigationItem, animated){
        this.items.addObject(item);
        // TODO: Make the animation and change the items
    }

    popNavigationItem(item:UINavigationItem, animated) {
        this.items.removeObject(item);
        // TODO: Make the animation and change the items
    }

    get topItem(){
        if (this.items.length == 0) return null;
        return this.items[this.items.length - 1];
    }

    get backItem(){
        if (this.items.length < 2) return null;
        return this.items[this.items.length - 2];
    }
}