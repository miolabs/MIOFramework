import { NSObject } from "mio-foundation-web";
import { MIOCoreHTMLParser } from "mio-foundation-web";
import { MIOCoreHTMLParserDelegate } from "mio-foundation-web";
import { NSLocalizeString } from "mio-foundation-web";
import { MIOCoreBundleGetContentsFromURLString } from "mio-foundation-web";
import { NSClassFromString } from "mio-foundation-web";

export function MUICoreBundleLoadNibName(name:string, target:any, completion:any){

    let parser = new MUICoreNibParser();
    parser.target = target;
    parser.completion = completion;    

    MIOCoreBundleGetContentsFromURLString(name, this, function(code, data){
        if (code == 200) parser.parseString(data);
        else throw new Error("MUICoreBundleLoadNibName: Couldn't download resource " + name);
    });    
}

class MUICoreNibParser extends NSObject implements MIOCoreHTMLParserDelegate
{
    target = null;
    completion = null;    

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

        let vc = NSClassFromString(this.rootClassname);
        vc.initWithLayer(layer, vc);                

        this.completion.call(this.target, vc);
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