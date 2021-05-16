import { NSObject } from "mio-foundation-web";
import { UIViewController } from "./UIViewController";
import { UIView } from "./UIView";

export class UIStoryboardSegue extends NSObject
{
    identifier:string = null;
    source:UIViewController = null;
    destination:UIViewController = null;

    initWithIdentifier(identifier:string, source:UIViewController, destination:UIViewController){
        super.init();

        this.identifier = identifier;
        this.source = source = source;
        this.destination = destination;        
    }

    private performHandler = null;
    initWithIdentifierAndPerformHandler(identifier:string, source:UIViewController, destination:UIViewController, performHandler:any){
        this.initWithIdentifier(identifier, source, destination);
        this.performHandler = performHandler;
    }

    _sender = null;
    perform(){
        let canPerfom = this.source.shouldPerformSegueWithIdentifier(this.identifier, this._sender);
        if (canPerfom == false) return;

        this.source.prepareForSegue(this, this._sender);
        if (this.performHandler != null) this.performHandler();
    }
}

export function _UIStoryboardSeguePerform(kind:string, sender:any, identifier:string, sourceViewController:UIViewController, destination:string){             
    let vc = sourceViewController.storyboard._instantiateViewControllerWithDestination(destination);
    let segue = new UIStoryboardSegue();
    segue.initWithIdentifierAndPerformHandler(identifier, sourceViewController, vc, function(this:UIStoryboardSegue){
        if (kind == "show") this.source.navigationController.pushViewController(vc, true);
        else if (kind == "presentation") this.source.presentViewController(vc, true);
    });
    segue._sender = sender;
    segue.perform();
}
