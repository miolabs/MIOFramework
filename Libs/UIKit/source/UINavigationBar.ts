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

    private setup(){
        MUICoreLayerAddStyle(this.layer, "navbar");
    }

    private _items = [];
    get items(){return this._items;}
    setItems(items, animated){        
        this._items = items;

        //TODO: Animate!!!
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