/**
 * Created by godshadow on 12/3/16.
 */

import { UIStoryboardSegue } from "./UIStoryboardSegue";
import { UIView } from "./UIView";
import { UIViewController } from "./UIViewController";

function MUICoreControlParseEventTypeString(eventTypeString:string){

    if (eventTypeString == null) return UIControl.Event.allEvents;

    let value = eventTypeString[0].toUpperCase() + eventTypeString.substr(1);
    return UIControl.Event[value];
}

export class UIControl extends UIView
{
    // initWithLayer(layer, owner, options?){
    //     super.initWithLayer(layer, owner, options);
    
    //     // Check for actions
    //     if (this.layer.childNodes.length > 0) {
    //         for (let index = 0; index < this.layer.childNodes.length; index++) {
    //             let subLayer = this.layer.childNodes[index];

    //             if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

    //             let actionSelector = subLayer.getAttribute("data-action-selector");
    //             let eventType = MUICoreControlParseEventTypeString(subLayer.getAttribute("data-event-type"));
    //             if (actionSelector != null) {                    
    //                 this.addTarget(owner, owner[actionSelector], eventType);
    //             }
    //         }
    //     }
    // }

    private actionSegue = null;
    _checkSegues() {
        super._checkSegues();

        for (let index = 0; index < this._segues.length; index++) {

            let s = this._segues[index];
            let kind = s["Kind"];
            
            if (kind == "show") {
                if ((this.owner instanceof UIViewController) == false) continue;
                
                this.actionSegue = {};
                this.actionSegue["VC"] = this.owner;
                this.actionSegue["Destination"] = s["Destination"];
                let identifier = s["Identifier"];
                if (identifier != null) this.actionSegue["Identifier"] = identifier;
                
                this.addTarget(this, function(){

                    let fromVC = this.actionSegue["VC"] as UIViewController;
                    let destination = this.actionSegue["Destination"];                    
                    let identifier = this.actionSegue["Identifier"];

                    let toVC = fromVC.storyboard._instantiateViewControllerWithDestination(destination);

                    let segue = new UIStoryboardSegue();                
                    segue.initWithIdentifierAndPerformHandler(identifier, fromVC, toVC, function(){
                        fromVC.navigationController.pushViewController(toVC);
                    });           
                    
                    segue._sender = this;
                    segue.perform();

                }, UIControl.Event.allEvents);                
            }    
        }        
    }

    private actions = [];    
    addTarget(target, action, controlEvents:any/*UIControl.Event*/){
        
        if (action == null) throw new Error("UIControl: Can't add null action");

        let item = {};        
        item["Target"] = target;
        item["Action"] = action;
        item["EventType"] = controlEvents;

        this.actions.push(item);
    }

    protected _performActionsForEvents(events:any/*UIControl.Event*/){

        for (let index = 0; index < this.actions.length; index++){
            let action = this.actions[index];

            let target = action["Target"];
            let block = action["Action"];

            if (block != null && target != null)
                block.call(target, this);
        }
    }

    private _enabled = true;
    get enabled(){return this._enabled;}
    set enabled(value:boolean){this.setEnabled(value);}

    setEnabled(enabled:boolean){
        this._enabled = enabled;
        if (enabled == true)
            this.layer.style.opacity = "1.0";
        else
            this.layer.style.opacity = "0.10";
    }

    private _selected = false;
    set selected(value){
        this.setSelected(value);
    }

    get selected(){
        return this._selected;
    }
    
    setSelected(value){
        if (this._selected == value)
            return;

        this.willChangeValue("selected");
        if (value == true) {
            // MUICoreLayerAddStyle(this.layer, "selected");
        }
        else {            
            // MUICoreLayerRemoveStyle(this.layer, "selected");
        }
        this._selected = value;
        this.didChangeValue("selected");
    }

     // TODO: Make delegation of the methods above
     mouseOverTarget = null;
     mouseOverAction = null;
     mouseOutTarget = null;
     mouseOutAction = null;
 
    setOnMouseOverAction(target, action){
         this.mouseOverTarget = target;
         this.mouseOverAction = action;
         var instance = this;

        //  this.layer.onmouseover = function()
        //  {
        //      if (instance.enabled)
        //          instance.mouseOverAction.call(target);
        //  }
    }

    setOnMouseOutAction(target, action){
         this.mouseOutTarget = target;
         this.mouseOutAction = action;
         var instance = this;

        //  this.layer.onmouseout = function()
        //  {
        //      if (instance.enabled)
        //          instance.mouseOutAction.call(target);
        //  }
    }

    static State = class {
        static normal = 0
        static highlighted = 1
        static disabled = 2
        static selected = 3
        static focused = 4
        static application = 5
        static reserved = 6
    }

    static Event = class {
        static touchDown = 1 <<  0
        static touchDownRepeat = 1 <<  1
        static touchDragInside = 1 <<  2
        static touchDragOutside = 1 <<  3
        static touchDragEnter = 1 <<  4
        static touchDragExit = 1 <<  5
        static touchUpInside = 1 <<  6
        static touchUpOutside = 1 <<  7
        static touchCancel = 1 <<  8
        static valueChanged = 1 << 12
        static primaryActionTriggered = 1 << 13
        static editingDidBegin = 1 << 16
        static editingChanged = 1 << 17
        static editingDidEnd = 1 << 18
        static editingDidEndOnExit = 1 << 19
        static allTouchEvents = 0x00000FFF
        static editingEvents = 0x000F0000
        static applicationReserved = 0x0F000000
        static systemReserved = 0xF0000000
        static allEvents = 0xFFFFFFFF
    }
}

