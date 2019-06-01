import { UIControl } from "./UIControl";
import { UIButton, UIButtonType } from "./UIButton";
import { MUIOutletRegister } from "./core/MUICore";

/**
 * Created by godshadow on 29/08/16.
 */

export class UISegmentedControl extends UIControl
{
    segmentedItems = [];
    selectedSegmentedIndex = -1;

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);

        for (let index = 0; index < this.layer.childNodes.length; index++){
            let itemLayer = this.layer.childNodes[index];
            if (itemLayer.tagName == "DIV"){
                let si = new UIButton();
                si.initWithLayer(itemLayer, owner);
                si.type = UIButtonType.PushIn;
                this._addSegmentedItem(si);
                MUIOutletRegister(owner, si.layerID, si);
            }
        }

        if (this.segmentedItems.length > 0){
            let item = this.segmentedItems[0];
            item.setSelected(true);
            this.selectedSegmentedIndex = 0;
        }
    }

    private _addSegmentedItem(item:UIButton){
        this.segmentedItems.push(item);
        item.addTarget(this, this._didClickSegmentedButton, UIControlEvents.AllTouchEvents);
    }

    private _didClickSegmentedButton(button){
        let index = this.segmentedItems.indexOf(button);
        this.selectSegmentedAtIndex(index);

        if (this.mouseOutTarget != null)
            this.mouseOutAction.call(this.mouseOutTarget, this, index);
    }

    selectSegmentedAtIndex(index){
        if (this.selectedSegmentedIndex == index) return;

        if (this.selectedSegmentedIndex > -1){
            let lastItem = this.segmentedItems[this.selectedSegmentedIndex];
            lastItem.setSelected(false);
        }

        this.selectedSegmentedIndex = index;
        
        let item = this.segmentedItems[this.selectedSegmentedIndex];
        item.setSelected(true);

        this._performActionsForEvents(UIControlEvents.ValueChanged);
    }
}