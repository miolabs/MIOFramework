import { UIView } from "./UIView";
import { UINavigationItem } from "./UINavigationItem";
import { MUICoreLayerAddStyle } from "./core/MUICoreLayer";
import "mio-foundation-web/extensions"

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
    setItems(items, animated){        
        this._items = items;

        //TODO: Animate!!!

        for (let index = 0; index < items.length; index++){
            let ni = items[index];

            if (ni.titleView != null) {
                this.titleView.addSubview(ni.titleView);
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