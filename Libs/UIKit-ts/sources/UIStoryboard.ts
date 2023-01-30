import { Bundle, NSObject } from "foundation";
import { NSClassFromString } from "mio-core";
import { UIViewController } from "./UIViewController";

export class UIStoryboard extends NSObject
{
    private name:string = null;
    private bundle:Bundle = null;    
    private items = null;
    
    constructor(name:string, bundle?:Bundle) {
        super();
        this.name = name;
        this.bundle = bundle;

        // let content = MIOCoreGetAppResource(this.name, "json");
        // this.items = JSON.parse(content);
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
        vc.initWithNibName(resource + ".html");
        vc.storyboard = this;

        return vc;
    }
}

function MUICoreStoryboardParseLayer(layer, object, owner:UIViewController){
    
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

                        MUICoreStoryboardConnectOutlet(object, owner, prop, outlet);
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
                // owner.navigationItem = new UINavigationItem();
                // owner.navigationItem.initWithLayer(subLayer, owner);
            }
        }
    }
}

function MUICoreStoryboardParseConnectionsLayer(layer, object, owner:UIViewController){
    // Check outlets and segues
    if (layer.childNodes.length > 0) {
        for (let index = 0; index < layer.childNodes.length; index++) {
            let subLayer = layer.childNodes[index] as HTMLElement;

            if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

            let type = subLayer.getAttribute("data-connection-type");

            if (type == "outlet") {
                let prop = subLayer.getAttribute("data-property");
                let outlet = subLayer.getAttribute("data-outlet");

                MUICoreStoryboardConnectOutlet(object, owner, prop, outlet);
            }
            else if (type == "segue") {
                let destination = subLayer.getAttribute("data-segue-destination");
                let kind = subLayer.getAttribute("data-segue-kind");
                let relationship = subLayer.getAttribute("data-segue-relationship");
                let identifier = subLayer.getAttribute("data-segue-identifier");

                MUICoreStoryboardAddSegue(object, destination, kind, relationship, identifier);
            }

        }

    }    
}

function MUICoreStoryboardConnectOutlet(object, owner, property, outletID){
    console.log("prop: " + property + " - outlet: " + outletID);

    let obj = owner._outlets[outletID];
    object[property] = obj;
}


function MUICoreStoryboardAddSegue(owner, destination:string, kind:string, relationship:string, identifier:string) {
    let s = {};
    s["Destination"] = destination;
    s["Kind"] = kind;
    if (identifier != null) s["Identifier"] = identifier;
    if (relationship != null) s["Relationship"] = relationship;
    owner._segues.push(s);
}