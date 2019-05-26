import { NSObject } from "mio-foundation-web";
import { NSBundle } from "mio-foundation-web";
import { UIViewController } from "./UIViewController";

class UIStoryboard extends NSObject
{
    private name:string = null;
    private bundle:NSBundle = null;
    
    initWithName(name:string, bundle:NSBundle) {
        super.init();
        this.name = name;
        this.bundle = bundle;
    }

    instantiateInitialViewController():UIViewController {
        return null;
    }

    instantiateViewControllerWithIdentifier(identifier:string):UIViewController {
        return null;
    }
}