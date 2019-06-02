import { NSObject } from "mio-foundation-web";
import { NSBundle } from "mio-foundation-web";
import { UIViewController } from "./UIViewController";
import { MIOCoreBundleGetAppResource } from "mio-foundation-web";
import { NSClassFromString } from "mio-foundation-web";
import { UINavigationItem } from "./UINavigationItem";
import { UIBarButtonItem } from "./UIBarButtonItem";

export class UIStoryboard extends NSObject
{
    private name:string = null;
    private bundle:NSBundle = null;

    private items = null;
    initWithName(name:string, bundle:NSBundle) {
        super.init();
        this.name = name;
        this.bundle = bundle;

        let content = MIOCoreBundleGetAppResource(this.name, "json");
        this.items = JSON.parse(content);
    }

    instantiateInitialViewController():UIViewController {
        let resource = this.items["InitialViewControllerID"];
        if (resource == null) return;

        return this._instantiateViewControllerWithDestination(resource);        
    }

    instantiateViewControllerWithIdentifier(identifier:string):UIViewController {        
        let resource = null; //TODO: Get from main.json
        return this._instantiateViewControllerWithDestination(resource);
    }

    _instantiateViewControllerWithDestination(resource:string):UIViewController {
        let classname = this.items["ClassByID"][resource];
        if (classname == null) return null;

        let vc = NSClassFromString(classname) as UIViewController;
        vc.initWithResource("layout/" + resource + ".html");
        vc.storyboard = this;

        return vc;
    }
}

export function MUICoreStoryboardParseLayer(layer, object, owner){
    
    // Check outlets and segues
    if (layer.childNodes.length > 0) {
        for (let index = 0; index < layer.childNodes.length; index++) {
            let subLayer = layer.childNodes[index] as HTMLElement;

            if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

            if (subLayer.getAttribute("data-connections") == "true") {
                for (let index2 = 0; index2 < subLayer.childNodes.length; index2++) {
                    let d = subLayer.childNodes[index2] as HTMLElement;
                    if (d.tagName != "DIV") continue;

                    let type = d.getAttribute("data-connection-type");

                    if (type == "outlet") {
                        let prop = d.getAttribute("data-property");
                        let outlet = d.getAttribute("data-outlet");

                        MUICoreStoryboardConnectOutlet(owner, prop, outlet);
                    }
                    else if (type == "segue") {
                        let destination = d.getAttribute("data-segue-destination");
                        let kind = d.getAttribute("data-segue-kind");
                        let relationship = d.getAttribute("data-segue-relationship");
                        let identifier = d.getAttribute("data-segue-identifier");

                        MUICoreStoryboardAddSegue(object, destination, kind, relationship, identifier);
                    }
                }
            }
            else if (subLayer.getAttribute("data-navigation-key") == "navigationItem"){             
                owner.navigationItem = new UINavigationItem();
                owner.navigationItem.initWithLayer(subLayer, owner);
            }
        }
    }
}

declare function _injectIntoOptional(value:any);

export function MUICoreStoryboardConnectOutlet(owner, property, outletID){
    console.log("prop: " + property + " - outluet: " + outletID);

    let obj = owner._outlets[outletID];
    owner[property] = _injectIntoOptional(obj);
}


export function MUICoreStoryboardAddSegue(owner, destination:string, kind:string, relationship:string, identifier:string) {        
    let s = {};
    s["Destination"] = destination;
    s["Kind"] = kind;
    if (identifier != null) s["Identifier"] = identifier;
    if (relationship != null) s["Relationship"] = relationship;
    owner._segues.push(s);
}