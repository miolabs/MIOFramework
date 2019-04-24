import { MIOCoreHTMLParserDelegate, MIOCoreHTMLParser } from "./MIOCoreHTMLParser";
import { MIOCoreStringLocalizeString } from "./MIOCoreString";

export class MIOCoreBundleHTMLParser implements MIOCoreHTMLParserDelegate 
{
    private text = null;    

    private result = "";
    private isCapturing = false;
    private elementCapturingCount = 0;

    constructor(text) {
        this.text = text;
    }

    parse(){
        let parser = new MIOCoreHTMLParser();
        parser.initWithString(this.text, this);

        parser.parse();

        return this.result;
    }    

    // HTML Parser delegate
    parserDidStartElement(parser:MIOCoreHTMLParser, element:string, attributes){
        
        if (element.toLocaleLowerCase() == "div"){
            
            if (attributes["main-div"] == true) {
                // Start capturing   
                this.isCapturing = true;
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

    parserDidStartDocument(parser:MIOCoreHTMLParser){
        console.log("parser started");
    }

    parserDidEndDocument(parser:MIOCoreHTMLParser){
        console.log("datamodel.xml parser finished");
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
                this.result += MIOCoreStringLocalizeString(this.currentStringLocalizedKey, this.currentString);
            }
        }
        this.currentString = null;
        this.currentStringLocalizedKey = null;        
    }

}