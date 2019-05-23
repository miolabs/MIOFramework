import { NSObject } from "mio-foundation-web";
import { MIOCoreHTMLParser } from "mio-foundation-web";
import { MIOCoreHTMLParserDelegate } from "mio-foundation-web";
import { NSLocalizeString } from "mio-foundation-web";
import { MIOCoreBundleGetContentsFromURLString } from "mio-foundation-web";
import { NSClassFromString } from "mio-foundation-web";


var _MIOCoreBundleClassesByDestination = {}
export function MUICoreBundleSetClassesByDestination(classes){
    _MIOCoreBundleClassesByDestination = classes;
}

export function MUICoreBundleGetClassesByDestination(resource:string){    
    return _MIOCoreBundleClassesByDestination[resource];
}

export function MUICoreBundleLoadNibName(owner, name:string, target:any, completion:any){

    let parser = new MUICoreNibParser();
    parser.target = target;
    parser.completion = completion;               
    parser.owner = owner;

    MIOCoreBundleGetContentsFromURLString(name, this, function(code, data){
        if (code == 200) parser.parseString(data);
        else throw new Error("MUICoreBundleLoadNibName: Couldn't download resource " + name);
    });    
}


declare function _injectIntoOptional(param:any);

class MUICoreNibParser extends NSObject implements MIOCoreHTMLParserDelegate
{
    target = null;
    completion = null;    
    owner = null;  

    private result = "";
    private isCapturing = false;    
    private elementCapturingCount = 0;

    private layerID = null;
    private rootClassname = null;

    parseString(data:string){
        let parser = new MIOCoreHTMLParser();
        parser.initWithString(data, this);

        parser.parse();

        let domParser = new DOMParser();
        let items = domParser.parseFromString(this.result, "text/html");
        let layer = items.getElementById(this.layerID);

        // Check outlets
        if (layer.childNodes.length > 0) {
            for (let index = 0; index < layer.childNodes.length; index++) {
                let subLayer = layer.childNodes[index] as HTMLElement;

                if (subLayer.tagName != "DIV" && subLayer.tagName != "SECTION") continue;

                if (subLayer.getAttribute("data-connections") == "true") {
                    for (let index2 = 0; index2 < subLayer.childNodes.length; index2 ++){
                        let d = subLayer.childNodes[index2] as HTMLElement;
                        if (d.tagName != "DIV") continue;

                        let type = d.getAttribute("data-connection-type");
                        
                        if (type == "outlet") {
                            let prop = d.getAttribute("data-property");
                            let outlet = d.getAttribute("data-outlet");

                            this.connectOutlet(prop, outlet);
                        }
                        else if (type == "segue") {
                            let destination = d.getAttribute("data-segue-destination");
                            let destinationClass = d.getAttribute("data-segue-destination-class");
                            let relationship = d.getAttribute("data-segue-relationship");

                            this.addSegue(relationship, destination, destinationClass);
                        }
                    }
                }                
            }
        }
        
        this.completion.call(this.target, layer);
    }

    private connectOutlet(property, outletID){
        console.log("prop: " + property + " - outluet: " + outletID);

        let obj = this.owner._outlets[outletID];
        this.owner[property] = _injectIntoOptional(obj);
    }

    private addSegue(relationship:string, destination:string, destinationClass:string) {        
        this.owner._segues[relationship] = {"Resource": destination, "Class": destinationClass};
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