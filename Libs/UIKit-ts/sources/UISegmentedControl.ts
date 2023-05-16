/**
 * Created by godshadow on 29/08/16.
 */

import { NSCoder } from "foundation";
import { UIButton, UIButtonType } from "./UIButton";
import { UIControl } from "./UIControl";

export class UISegmentedControl extends UIControl
{
    segmentedItems = [];
    selectedSegmentIndex = -1;

    initWithCoder( coder: NSCoder ) {
        super.initWithCoder( coder );
        for ( let v of this.subviews ) {
            if ( v instanceof UIButton ) this._addSegmentedItem( v );            
        };        
    }

    // initWithLayer(layer, owner, options?){
    //     // super.initWithLayer(layer, owner, options);

    //     // for (let index = 0; index < this.layer.childNodes.length; index++){
    //     //     let itemLayer = this.layer.childNodes[index];
    //     //     if (itemLayer.tagName == "DIV"){
    //     //         let si = new UIButton();
    //     //         // si.initWithLayer(itemLayer, owner);
    //     //         si.type = UIButtonType.PushIn;
    //     //         this._addSegmentedItem(si);
    //     //         // MUIOutletRegister(owner, si.layerID, si);
    //     //     }
    //     // }

    //     if (this.segmentedItems.length > 0){
    //         let item = this.segmentedItems[0];
    //         item.setSelected(true);
    //         this.selectedSegmentIndex = 0;
    //     }
    // }

    private _addSegmentedItem( item:UIButton ){        
        item.addTarget( this, this._didClickSegmentedButton, UIControl.Event.allTouchEvents );
        if (item.selected) this.selectedSegmentIndex = this.segmentedItems.count;
        
        this.segmentedItems.addObject( item );
    }

    private _didClickSegmentedButton( button: UIButton ){
        let index = this.segmentedItems.indexOf( button );
        this.selectSegmentedAtIndex( index );
        this.sendActions( UIControl.Event.valueChanged );
    }

    selectSegmentedAtIndex( index: number ){
        if (this.selectedSegmentIndex == index) return;

        if (this.selectedSegmentIndex > -1){
            let lastItem = this.segmentedItems[this.selectedSegmentIndex];
            lastItem.setSelected(false);
        }

        this.selectedSegmentIndex = index;        
        if ( index == -1 ) return;

        let item = this.segmentedItems[this.selectedSegmentIndex];
        item.setSelected(true);        
    }
}