import { MIOCoreGetContentsFromURLString, MIOCoreHTMLParser, MIOCoreHTMLParserDelegate } from "mio-core";
import { NSLocalizeString, NSObject, NSClassFromString, NSCoder } from "foundation";
import { UIView } from "../UIView";
import { UIViewController } from "../UIViewController";


let _UICoreClassesByDestination = {}
function UICoreSetClassesByDestination(classes){
    _UICoreClassesByDestination = classes;
}

function UICoreGetClassesByDestination(resource:string){    
    return _UICoreClassesByDestination[resource];
}

export function UICoreLoadNibName(name:string, owner:any /*, completion:any */){

    let parser = new UICoreNibParser();
    // parser.completion = completion;

    let resource_name = name + ".html";

    MIOCoreGetContentsFromURLString( resource_name, this, function( code:number, data:string ){
        if (code == 200) parser.parseString(data, owner);
        else throw new Error("MUICoreBundleLoadNibName: Couldn't download resource " + name);
    });    
}

let _valid_html_tags = [ "DIV", "SECTION", "LABEL", "BUTTON" ];

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

        parse_root_element( contents, owner );
    }

    //
    // XML PARSER
    //
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

// 

export function UICoreNibLoad( contents:any, owner:any ) {
    parse_root_element( contents, owner );
}

function parse_root_element( contents:any, owner:any )
{
    let coder = new UICoreNibCoder();
    coder.initWithContents( contents, owner, {} );

    owner.initWithCoder( coder );
}

function parse_element( contents:any, coder:UICoreNibCoder ) : UIView | UIViewController {

    let classname = contents.getAttribute("data-class");
    
    if ( classname == null && contents.tagName.toLowerCase() == "button") classname = "UIButton"
    if ( classname == null && contents.tagName.toLowerCase() == "label") classname = "UILabel"
    if ( classname == null ) classname = "UIView";

    let obj = NSClassFromString( classname );

    let outlets = coder?.outlets || {};
    let outlet_id = contents.getAttribute( "id" );
    if ( outlet_id != null) outlets[ outlet_id ] = obj;

    let new_coder = new UICoreNibCoder();
    new_coder.initWithContents( contents, obj, outlets );

    obj.initWithCoder( new_coder );

    return obj;
}


function parse_connections_layer(contents:any, object:object ){
    // Check outlets and segues
    if (contents.childNodes.length > 0) {
        for (let index = 0; index < contents.childNodes.length; index++) {
            let subLayer = contents.childNodes[index] as HTMLElement;

            if ( !_valid_html_tags.containsObject( subLayer.tagName ) ) continue;

            let type = subLayer.getAttribute("data-connection-type");

            if (type == "outlet") {
                let prop = subLayer.getAttribute("data-property");
                let outlet = subLayer.getAttribute("data-outlet");

                parse_outlet(object, prop, outlet);
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



function parse_outlet(object:any, property:any, outletID:string){
    console.log("prop: " + property + " - outlet: " + outletID);

    object._outlets[ outletID ] = property;
    // let obj = outlets[outletID];
    // object[property] = obj;
}


function parse_segue(owner:any, destination:string, kind:string, relationship:string, identifier:string) {
    let s:any = {};
    s["Destination"] = destination;
    s["Kind"] = kind;
    if (identifier != null) s["Identifier"] = identifier;
    if (relationship != null) s["Relationship"] = relationship;
    owner._segues.push(s);
}



export class UICoreNibCoder extends NSCoder
{    
    owner:object;    
    outlets: object;

    private contents: any;

    initWithContents(contents:any, owner: object, outlets: object ) {
        this.contents = contents;
        this.owner = owner;
        this.outlets = outlets;        
    }

    decodeBoolForKey(key:string):any {
        return this.contents.getAttribute("data-" + key ) ?? false;
    }

    decodeIntegerForKey(key: string) : number {
        return this.contents.getAttribute("data-" + key ) ?? 0;
    }

    decodeClassname() : string {
        return this.contents.getAttribute("data-class" );
    }

    decodeContentView() : UIView {
        return this.decodeSubviews()[0];
    }    

    decodeSubviews() : UIView[] {

        // Add subviews
        if (this.contents.childNodes.length == 0) return [];

        let views:UIView[] = [];

        for ( let index = 0; index < this.contents.childNodes.length; index++ ) {
            let subLayer = this.contents.childNodes[ index ];

            if ( !_valid_html_tags.containsObject( subLayer.tagName ) ) continue;

            if (subLayer.getAttribute("data-connections") == "true") {
                parse_connections_layer( subLayer, this.owner );
            }

            // let v = parse_contents( subLayer, this.owner, this.outlets );
    
            let v = parse_element( subLayer, this );
            views.addObject( v );
        }

        return views;
    }

    get layerContents() : any {
        return this.contents;
    }
}