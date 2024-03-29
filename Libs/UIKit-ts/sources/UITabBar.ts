/**
 * Created by godshadow on 25/08/16.
 */

import { UIButton, UIButtonType } from "./UIButton";
import { UIControl } from "./UIControl";
import { UIView } from "./UIView";
import { CGRect } from "./CoreGraphics/CGRect";


export class UITabBarItem extends UIButton
{
    // TODO: Add more extra features. Comming soon
    init(){
        super.init();
        this.type = UIButtonType.PushIn;
    }

    initWithLayer(layer, owner, options?){
        // super.initWithLayer(layer, owner, options);
        this.type = UIButtonType.PushIn;
    }
}

export class UITabBar extends UIView
{
    items = [];
    selectedTabBarItemIndex = -1;

    private _itemsByIdentifier = {};

    initWithLayer(layer, owner, options?){
        // super.initWithLayer(layer, owner, options);

        // Check for tab items
        let opts = {};
        let sp = layer.getAttribute("data-status-style-prefix");
        if (sp != null) opts["status-style-prefix"] = sp;
        
        // for (let index = 0; index < this.layer.childNodes.length; index++){
        //     let tabItemLayer = this.layer.childNodes[index];
        //     if (tabItemLayer.tagName == "DIV"){
        //         let ti = new UITabBarItem();
        //         ti.initWithLayer(tabItemLayer, owner, opts);
        //         ti.type = UIButtonType.PushIn;                
        //         this._addTabBarItem(ti);
        //         MUIOutletRegister(owner, ti.layerID, ti);
        //     }
        // }

        if (this.items.length > 0)
            this.selectTabBarItemAtIndex(0);
    }

    private _addTabBarItem(item:UIButton){
        this.items.push(item);
        item.addTarget(this, function(){
            this.selectTabBarItem(item);
        }, UIControl.Event.touchDown);
    }

    addTabBarItem(item){
        this._addTabBarItem(item);
        this.addSubview(item);
    }

    selectTabBarItem(item){
        let index = this.items.indexOf(item);
        if (index == this.selectedTabBarItemIndex)
            return;

        if (this.selectedTabBarItemIndex > -1){
            // Deselect
            let lastItem = this.items[this.selectedTabBarItemIndex];
            lastItem.setSelected(false);
        }

        this.willChangeValue("selectedTabBarItemIndex");
        this.selectedTabBarItemIndex = index;
        this.didChangeValue("selectedTabBarItemIndex");
    }

    selectTabBarItemAtIndex(index){
        let item = this.items[index];
        this.selectTabBarItem(item);
    }

    layout(){
        let len = this.items.length;
        let width = this.getWidth();
        let w = width / len;
        let x = 0;

        for (let index = 0; index < this.items.length; index++){            
            let item = this.items[index];
            if (item.hidden == true) continue;
            item.setFrame(CGRect.rectFromValues(x, 0, w, this.getHeight()));
            x += w;
        }
    }
}