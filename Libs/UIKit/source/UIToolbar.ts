import { UIButton } from "./UIButton";
import { UIView } from "./UIView";

/**
 * Created by godshadow on 22/5/16.
 */


export class UIToolbarButton extends UIButton
{
    public static buttonWithLayer(layer, owner)
    {        
        var lid = layer.getAttribute("id");
        var tb = new UIToolbarButton(lid); 
        tb.initWithLayer(layer, owner);

        return tb;
    }
}

export class UIToolbar extends UIView
{
    buttons = [];

    initWithLayer(layer, owner, options?)
    {
        super.initWithLayer(layer, owner, options);

        // Check if we have sub nodes
        if (this.layer.childNodes.length > 0)
        {
            for (var index = 0; index < this.layer.childNodes.length; index++)
            {
                let layer = this.layer.childNodes[index]; // TODO: variablename shadows parameter
                if (layer.tagName == "DIV")
                {
                    var lid = layer.getAttribute("id");
                    var tb = new UIToolbarButton(lid); 
                    var button = UIToolbarButton.buttonWithLayer(layer, owner);
                    button.parent = this;

                    this._linkViewToSubview(button);
                    this.addToolbarButton(button);
                }
            }
        }
    }

    addToolbarButton(button)
    {
        this.buttons.push(button);
    }
}