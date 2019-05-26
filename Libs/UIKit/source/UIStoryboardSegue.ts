import { NSObject } from "mio-foundation-web";
import { UIViewController } from "./UIViewController";

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

    perform(){
        
    }
}