/**
 * Created by godshadow on 22/5/16.
 */


class UIToolbarButton extends UIButton
{
    public static buttonWithLayer(layer, owner)
    {        
        let lid = layer.getAttribute("id");
        let tb = new UIToolbarButton(lid); 
        tb.initWithLayer(layer, owner);

        return tb;
    }
}

class UIToolbar extends UIView
{
    buttons = [];

    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);
        layer.style.width = "100%";
        layer.style.top = "";
        layer.style.bottom = "0px";

        // Check if we have sub nodes
        if (this.layer.childNodes.length > 0)
        {
            for (let index = 0; index < this.layer.childNodes.length; index++)
            {
                let layer = this.layer.childNodes[index]; // TODO: variablename shadows parameter
                if (layer.tagName == "DIV")
                {
                    let lid = layer.getAttribute("id");
                    let tb = new UIToolbarButton(lid); 
                    let button = UIToolbarButton.buttonWithLayer(layer, owner);
                    button.parent = this;

                    this._linkViewToSubview(button);
                    this.addToolbarButton(button);
                }
            }
        }
    }

    addToolbarButton(button){
        this.buttons.push(button);
    }
}