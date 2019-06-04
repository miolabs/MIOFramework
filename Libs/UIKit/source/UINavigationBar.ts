import { UIView } from "./UIView";
import { UINavigationItem } from "./UINavigationItem";
import { MUICoreLayerAddStyle } from "./core/MUICoreLayer";
import "./node_modules/mio-foundation-web/extensions"

export class UINavigationBar extends UIView
{
    init(){
        super.init();
        this.setup();
    }

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);
        this.setup();
    }

    private leftView:UIView = null;
    private titleView:UIView = null;
    private rigthView:UIView = null;
    private setup(){
        MUICoreLayerAddStyle(this.layer, "navigation-bar");
        this.layer.style.width = "100%";

        this.leftView = new UIView();
        this.leftView.init();
        this.addSubview(this.leftView);

        this.titleView = new UIView();
        this.titleView.init();
        this.addSubview(this.titleView);

        this.rigthView = new UIView();
        this.rigthView.init();
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