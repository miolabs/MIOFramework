import { CALayerEvent, UIControl } from "uikit";
import { CAComboBoxLayer } from "./CustomLayers/CAComboBoxLayer";
import { CAComboBoxItemLayer } from "./CustomLayers/CAComboBoxItemLayer";


export class MUIComboBox extends UIControl
{    
    static get layerClass() : any { return CAComboBoxLayer }

    private _selectedItem = -1;

    init(): void {
        this.layer = new MUIComboBox.layerClass();

        (this.layer as CAComboBoxLayer).setOnChangeBlock( this, this.on_change );
    }    

    addItem(title:string, value?:any)
    {
        let item = new CAComboBoxItemLayer( );
        item.setValue( title, value );
        (this.layer as CAComboBoxLayer).addItemLayer( item );
    }

    selectItem( value:any ){
        (this.layer as CAComboBoxLayer).selectItem( value );
    }

    get selectedItem() : any {
        return (this.layer as CAComboBoxLayer).selectedItem;
    }

    private on_change() {
        this.sendActions( UIControl.Event.valueChanged );
    }

    // addItems(items)
    // {
    //     for (var count = 0; count < items.length; count++)
    //     {
    //         var text = items[count];
    //         this.addItem(text);
    //     }
    // }

    removeAllItems()
    {
    //     var node = this._selectLayer;

    //     while (this._selectLayer.hasChildNodes()) {              // selected elem has children

    //         if (node.hasChildNodes()) {                // current node has children
    //             node = node.lastChild;                 // set current node to child
    //         }
    //         else {                                     // last child found
    //             node = node.parentNode;                // set node to parent
    //             node.removeChild(node.lastChild);      // remove last node
    //         }
    //     }
    }

    // getItemAtIndex(index)
    // {
    //     if (this._selectLayer.childNodes.length == 0)
    //         return null;

    //     var option = this._selectLayer.childNodes[index];
    //     return option.innerHTML;
    // }


    // getSelectedItemText()
    // {
    //     for (var index = 0; index < this._selectLayer.childNodes.length; index++)
    //     {
    //         var option = this._selectLayer.childNodes[index];
    //         if (this._selectLayer.value == option.value)
    //             return option.innerHTML;
    //     }
    // }


    protected on_event( event:any ) {
        super.on_event( event );
        
        if (event == CALayerEvent.change) {
            this.sendActions( UIControl.Event.valueChanged );
        }
    }
}