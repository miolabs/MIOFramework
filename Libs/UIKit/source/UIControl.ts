import { UIView } from "./UIView";
import { UIViewController } from "./UIViewController";
import { UIStoryboardSegue } from "./UIStoryboardSegue";
import { MUICoreLayerAddStyle } from "./core/MUICoreLayer";
import { MUICoreLayerRemoveStyle } from "./core/MUICoreLayer";

/**
 * Created by godshadow on 12/3/16.
 */

 export enum UIControlEvents
 {
     TouchDown = 1 <<  0,
     TouchDownRepeat = 1 <<  1,
     TouchDragInside = 1 <<  2,
     TouchDragOutside = 1 <<  3,
     TouchDragEnter = 1 <<  4,
     TouchDragExit = 1 <<  5,
     TouchUpInside = 1 <<  6,
     TouchUpOutside = 1 <<  7,
     TouchCancel = 1 <<  8,
     ValueChanged = 1 << 12,
     PrimaryActionTriggered = 1 << 13,
     EditingDidBegin = 1 << 16,
     EditingChanged = 1 << 17,
     EditingDidEnd = 1 << 18,
     EditingDidEndOnExit = 1 << 19,
     AllTouchEvents = 0x00000FFF,
     EditingEvents = 0x000F0000,
     ApplicationReserved = 0x0F000000,
     SystemReserved = 0xF0000000,
     AllEvents = 0xFFFFFFFF
 }

function MUICoreControlParseEventTypeString(eventTypeString:string){

    if (eventTypeString == null) return UIControlEvents.AllEvents;

    let value = eventTypeString[0].toUpperCase() + eventTypeString.substr(1);
    return UIControlEvents[value];
}

export class UIControl extends UIView
{
    initWithLayer(layer, owner, options?){
        super.initWithLayer(layer, owner, options);
    
        // Check for actions
        if (this.layer.childNodes.length > 0) {
            for (let index = 0; index < this.layer.childNodes.length; index++) {
                let subLayer = this.layer.childNodes[index];

                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

                let actionSelector = subLayer.getAttribute("data-action-selector");
                let eventType = MUICoreControlParseEventTypeString(subLayer.getAttribute("data-event-type"));
                if (actionSelector != null) {                    
                    this.addTarget(owner, owner[actionSelector], eventType);
                }
            }
        }
    }

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

                }, UIControlEvents.AllEvents);                
            }    
        }        
    }

    private actions = [];    
    addTarget(target, action, controlEvents:UIControlEvents){
        
        if (action == null) throw new Error("UIControl: Can't add null action");

        let item = {};        
        item["Target"] = target;
        item["Action"] = action;
        item["EventType"] = controlEvents;

        this.actions.push(item);
    }

    protected _performActionsForEvents(events:UIControlEvents){

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
            MUICoreLayerAddStyle(this.layer, "selected");
        }
        else {            
            MUICoreLayerRemoveStyle(this.layer, "selected");
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

         this.layer.onmouseover = function()
         {
             if (instance.enabled)
                 instance.mouseOverAction.call(target);
         }
    }

    setOnMouseOutAction(target, action){
         this.mouseOutTarget = target;
         this.mouseOutAction = action;
         var instance = this;

         this.layer.onmouseout = function()
         {
             if (instance.enabled)
                 instance.mouseOutAction.call(target);
         }
    }
}

