import { NSLocalizeString, NSObject } from "foundation";
import { MIOCoreGetContentsFromURLString, MIOCoreHTMLParser, MIOCoreHTMLParserDelegate, NSClassFromString } from "mio-core";
import { CALayer, UIView, UIViewController } from "../_index";

let _UICoreClassesByDestination = {}
function UICoreSetClassesByDestination(classes){
    _UICoreClassesByDestination = classes;
}

function UICoreGetClassesByDestination(resource:string){    
    return _UICoreClassesByDestination[resource];
}

export function UICoreLoadNibName(name:string, owner:any, completion:any){

    let parser = new UICoreNibParser();    
    parser.completion = completion;

    MIOCoreGetContentsFromURLString(name, this, function(code, data){
        if (code == 200) parser.parseString(data, owner);
        else throw new Error("MUICoreBundleLoadNibName: Couldn't download resource " + name);
    });    
}

export class UICoreNibParser extends NSObject implements MIOCoreHTMLParserDelegate
{
    completion = null;    
    owner = null;  

    private result = "";
    private isCapturing = false;    
    private elementCapturingCount = 0;

    private layerID = null;
    private rootClassname = null;

    parseString(data:string, owner:any){
        let parser = new MIOCoreHTMLParser();
        parser.initWithString(data, this);

        parser.parse();

        let domParser = new DOMParser();
        let items = domParser.parseFromString(this.result, "text/html");
        let contents = items.getElementById(this.layerID);

        let view = parse_root_controller( contents, owner);
        this.completion(view, this.rootClassname);
    }

    parserDidStartDocument(parser:MIOCoreHTMLParser){
        console.log("parser started");
    }

    // HTML Parser delegate
    parserDidStartElement(parser:MIOCoreHTMLParser, element:string, attributes){
        
        if (element.toLocaleLowerCase() == "div"){
            
            if (attributes["data-root-view-controller"] == "true") {
                // Start capturing   
                this.isCapturing = true;
                this.layerID = attributes["id"];
                this.rootClassname = attributes["data-class"];
                if (this.rootClassname == null) this.rootClassname = "UIViewController";
            }
        }

        if (this.isCapturing == true) {            
            this.openTag(element, attributes);
            this.elementCapturingCount++;
        }
    }

    private currentString = null;
    private currentStringLocalizedKey = null;
    parserFoundCharacters(parser:MIOCoreHTMLParser, characters:string){
        if (this.isCapturing == true) {
            if (this.currentString == null) {
                this.currentString = characters;
            }
            else 
                this.currentString += " " + characters;
            
            //this.result += " " + characters;
        }
    }

    parserFoundComment(parser:MIOCoreHTMLParser, comment:string) {
        if (this.isCapturing == true) {
            this.result += "<!-- " + comment + "-->";
        }
    }

    parserDidEndElement(parser:MIOCoreHTMLParser, element:string){        

        if (this.isCapturing == true) {            
                this.closeTag(element);                
                this.elementCapturingCount--;            
        }

        if (this.elementCapturingCount == 0) this.isCapturing = false;

        this.currentString = null;        
    }

    parserDidEndDocument(parser:MIOCoreHTMLParser){
        console.log("html parser finished");
        console.log(this.result);        
    }

    private openTag(element, attributes){

        this.translateCharacters();

        this.result += "<" + element;        

        for (let key in attributes){            
            let value = attributes[key];
            if (value != null) {
                this.result += " " + key + "='" + value + "'";
            }
            else {
                this.result += " " + key;
            }
        }

        this.result += ">";

        if (element == "span") {
            this.currentStringLocalizedKey = attributes["localized-key"] || attributes["data-localized-key"];
        }
    }

    private closeTag(element){
        this.translateCharacters();
        this.result += "</" + element + ">";        
    }

    private translateCharacters(){
        if (this.currentString != null) {
            if (this.currentStringLocalizedKey == null) {
                this.result += this.currentString;
            }else {
                this.result += NSLocalizeString(this.currentStringLocalizedKey, this.currentString);
            }
        }
        this.currentString = null;
        this.currentStringLocalizedKey = null;        
    }
}


function parse_root_controller( contents:any, owner:UIViewController ) : UIView {
    let view:UIView;    

    if (contents.childNodes.length > 0) {
        for (let index = 0; index < contents.childNodes.length; index++) {
            let subLayer = contents.childNodes[index] as HTMLElement;

            if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

            if (subLayer.getAttribute("data-connections") == "true") {
                parse_connections_layer( subLayer, owner, owner);
            }
            else if (subLayer.getAttribute("data-navigation-key") == "navigationItem"){             
                // owner.navigationItem = new UINavigationItem();
                // owner.navigationItem.initWithLayer(subLayer, owner);
            }
            else {
                view = parse_contents(subLayer, owner);                
            }
        }
    }

    return view;
}

function parse_connections_layer(contents:any, object, owner:UIViewController){
    // Check outlets and segues
    if (contents.childNodes.length > 0) {
        for (let index = 0; index < contents.childNodes.length; index++) {
            let subLayer = contents.childNodes[index] as HTMLElement;

            if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

            let type = subLayer.getAttribute("data-connection-type");

            if (type == "outlet") {
                let prop = subLayer.getAttribute("data-property");
                let outlet = subLayer.getAttribute("data-outlet");

                parse_outlet(object, owner, prop, outlet);
            }
            else if (type == "segue") {
                let destination = subLayer.getAttribute("data-segue-destination");
                let kind = subLayer.getAttribute("data-segue-kind");
                let relationship = subLayer.getAttribute("data-segue-relationship");
                let identifier = subLayer.getAttribute("data-segue-identifier");

                parse_segue(object, destination, kind, relationship, identifier);
            }

        }
    }    
}

function parse_outlet(object, owner, property, outletID){
    console.log("prop: " + property + " - outlet: " + outletID);

    let obj = owner._outlets[outletID];
    object[property] = obj;
}


function parse_segue(owner, destination:string, kind:string, relationship:string, identifier:string) {
    let s = {};
    s["Destination"] = destination;
    s["Kind"] = kind;
    if (identifier != null) s["Identifier"] = identifier;
    if (relationship != null) s["Relationship"] = relationship;
    owner._segues.push(s);
}

function parse_contents( contents:any, owner:any ) : UIView|CALayer
{       
    let className = contents.getAttribute("data-class");    
    if (className == "UIBarItem" || className == "UIBarButtonItem" || className == "UINavigationItem" || className == "UICollectionViewFlowLayout") return;

    let item: CALayer|UIView;
    let layer = new CALayer( contents );
    
    if (className != null && className.length > 0) {
        let view = NSClassFromString( className );
        view.layer = layer;
        view.tag = contents.getAttribute("data-tag") || 0;
        item = view;
    }
    else {
        item = layer;
    }

        
//     this._addLayerToDOM();

    // Add subviews
    if (contents.childNodes.length > 0) {
        for (let index = 0; index < contents.childNodes.length; index++) {
            let subLayer = contents.childNodes[index];

            if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

            if (subLayer.getAttribute("data-connections") == "true") {
                parse_connections_layer( subLayer, view, owner);
                // let obj = this;
                // if (options != null && options["Object"] != null) obj = options["Object"];
                // MUICoreStoryboardParseConnectionsLayer(subLayer, obj, owner);
                continue;
            }

//             if (subLayer.getAttribute("data-navigation-key") == "navigationItem"){             
//                 owner.navigationItem = new UINavigationItem();
//                 owner.navigationItem.initWithLayer(subLayer, owner);
//                 continue;
//             }

            let className = contents.getAttribute("data-class");
            if (className == null || className.length == 0) className = "UIView";

            if (className == "UIBarItem" || className == "UIBarButtonItem" || className == "UINavigationItem" || className == "UICollectionViewFlowLayout") return;

            let sv = parse_contents( subLayer, owner );
            sv.parent = view;
            view.subviews.addObject( sv );

            sv.layer.superlayer = view.layer;
            view.layer.sublayers.addObject( sv.layer );
                        
//             let sv = MUICoreViewCreateView(subLayer, owner);
//             this._linkViewToSubview(sv);

            let id = subLayer.getAttribute("id");
            if (id != null) owner._outlets[id] = sv;
        }           
    }

    return view;
}