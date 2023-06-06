/**
 * Created by godshadow on 12/3/16.
 */

import { NSCoder } from "foundation";
import { UIStoryboardSegue } from "./UIStoryboardSegue";
import { UIView } from "./UIView";
import { UIViewController } from "./UIViewController";
import { CALayer } from "./CoreAnimation/CALayer";
import { UIEvent } from "./UIEvent";

function MUICoreControlParseEventTypeString(eventTypeString:string){

    if (eventTypeString == null) return UIControl.Event.allEvents;

    let value = eventTypeString[0].toUpperCase() + eventTypeString.substr(1);
    return UIControl.Event[value];
}

export class UIControl extends UIView
{
    static get layerClass() : any { return CALayer }

    initWithCoder( coder: NSCoder ) {
        super.initWithCoder( coder );
        
        this._selected = coder.decodeIntegerForKey( "selected" );

        this.userInteraction = true;
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

                }, UIControl.Event.allEvents);                
            }    
        }        
    }

    protected actionEvents = [];
    addTarget(target:any, action:any, controlEvents:any /*UIControl.Event */ ){
        
        if (action == null) throw new Error("UIControl: Can't add a null action");

        let item = {};        
        item["Target"] = target;
        item["Action"] = action;
        item["EventType"] = controlEvents;

        this.actionEvents.addObject( item );

        // if ( this.layer instanceof CAControlLayer) {
        //     this.layer.registerEventBlock( ( event: any) => {
        //         this.sendActions( event );
        //     });
        // }
    }

    sendAction( action: any, target: any, event: UIEvent ) {
        action.call( target, this );
    }

    sendActions( controlEvents: any ) {        
        for ( let item of this.actionEvents ) {
            let ev = item["EventType"];
            if ( ( ev & controlEvents ) == 0 ) continue;
            
            let a = item[ "Action" ];
            let t = item[ "Target" ];
            this.sendAction(a, t, controlEvents );
        }
    }
    
    get enabled(){return this.layer.disabled;}
    set enabled(value:boolean){this.setEnabled(value);}

    setEnabled(enabled:boolean){        
        this.layer.disabled = !enabled;
    }

    private _selected = false;
    set selected( value ) { this.setSelected( value ); }
    get selected()        { return this._selected;     }
    
    setSelected( value :boolean){
        if (this._selected == value)
            return;

        this.willChangeValue("selected");
        if (value == true) {
            // MUICoreLayerAddStyle(this.layer, "selected");
            this.layer.addStyle( "selected" );
        }
        else {            
            // MUICoreLayerRemoveStyle(this.layer, "selected");
            this.layer.removeStyle( "selected" );
        }
        this._selected = value;
        this.didChangeValue("selected");
    }

    //
    // Event handling
    //
    touchesBeginWithEvent( touches: any, event: UIEvent ): void  {
        this.sendActions( UIControl.Event.touchDown );
    }

    touchesEndedWithEvent( touches: any, event: UIEvent ): void {
        // TODO: Check if the event was up inside the bounds or not.
        this.sendActions( UIControl.Event.touchUpInside );
        this._performSegue();            
    }

     // TODO: Make delegation of the methods above
     mouseOverTarget = null;
     mouseOverAction = null;
     mouseOutTarget = null;
     mouseOutAction = null;
 
    setOnMouseOverAction(target:any, action:any) {
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

    static State = class 
    {
        static normal      = 0
        static highlighted = 1
        static disabled    = 2
        static selected    = 3
        static focused     = 4
        static application = 5
        static reserved    = 6
    }

    static Event = class 
    {
        static touchDown              = 1 <<  0
        static touchDownRepeat        = 1 <<  1
        static touchDragInside        = 1 <<  2
        static touchDragOutside       = 1 <<  3
        static touchDragEnter         = 1 <<  4
        static touchDragExit          = 1 <<  5
        static touchUpInside          = 1 <<  6
        static touchUpOutside         = 1 <<  7
        static touchCancel            = 1 <<  8
        static valueChanged           = 1 << 12
        static primaryActionTriggered = 1 << 13
        static editingDidBegin        = 1 << 16
        static editingChanged         = 1 << 17
        static editingDidEnd          = 1 << 18
        static editingDidEndOnExit    = 1 << 19
        static allTouchEvents         = 0x00000FFF
        static editingEvents          = 0x000F0000
        static applicationReserved    = 0x0F000000
        static systemReserved         = 0xF0000000
        static allEvents              = 0xFFFFFFFF
    }
}

