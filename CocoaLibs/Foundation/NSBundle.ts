
import { NSCoreGetMainBundleURLString, NSCoreBundle } from "../NSCore/platform";
import { NSCoreAppType, NSCoreGetAppType, NSCoreHTMLParser, NSCoreHTMLParserDelegate, NSLocalizeString } from "../NSCore";
import { NSObject } from "./NSObject";
import { NSURL } from "./NSURL";
import { NSURLRequest } from "./NSURLRequest";
import { NSURLConnection } from "./NSURLConnection";

/**
 * Created by godshadow on 9/4/16.
 */

export class NSBundle extends NSObject
{
    url:NSURL = null;

    private static _mainBundle = null;

    private _webBundle:NSCoreBundle = null;

    public static mainBundle():NSBundle
    {
        if (this._mainBundle == null)
        {
            // Main url. Getting from broser window url search field

            var urlString = NSCoreGetMainBundleURLString();

            this._mainBundle = new NSBundle();
            this._mainBundle.initWithURL(NSURL.urlWithString(urlString));
        }

        return this._mainBundle;
    }

    initWithURL(url:NSURL)
    {
        this.url = url;
    }

    loadHTMLNamed(path, layerID, target?, completion?)
    {            
        if (NSCoreGetAppType() == NSCoreAppType.Web)
        {
            if (this._webBundle == null){
                this._webBundle = new NSCoreBundle();
                this._webBundle.baseURL = this.url.absoluteString;
            }

            this._webBundle.loadHMTLFromPath(path, layerID, this, function(layerData){
                                
                // let parser = new BundleFileParser(layerData, layerID);
                // let result = parser.parse();

                var domParser = new DOMParser();
                var items = domParser.parseFromString(layerData, "text/html");
                var layer = items.getElementById(layerID);

                if (target != null && completion != null)
                    completion.call(target, layer);
            });
        }
    }

    private _loadResourceFromURL(url:NSURL, target, completion)
    {
        var request = NSURLRequest.requestWithURL(url);
        var conn =  new NSURLConnection();
        conn.initWithRequestBlock(request, this, function(error, data){

            completion.call(target, data);
        });
    }


}

/*
export class BundleFileParser implements NSCoreHTMLParserDelegate {

    private text = null;
    private layerID = null;

    private result = "";
    private isCapturing = false;
    private elementCapturingCount = 0;

    constructor(text, layerID) {
        this.text = text;
        this.layerID = layerID;
    }

    parse(){
        let parser = new NSCoreHTMLParser();
        parser.initWithString(this.text, this);

        parser.parse();

        return this.result;
    }    

    // HTML Parser delegate
    parserDidStartElement(parser:NSCoreHTMLParser, element:string, attributes){
        
        if (element.toLocaleLowerCase() == "div"){
            
            if (attributes["id"] == this.layerID) {
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
    parserFoundCharacters(parser:NSCoreHTMLParser, characters:string){
        if (this.isCapturing == true) {
            if (this.currentString == null) {
                this.currentString = characters;
            }
            else 
                this.currentString += " " + characters;
            
            //this.result += " " + characters;
        }
    }

    parserFoundComment(parser:NSCoreHTMLParser, comment:string) {
        if (this.isCapturing == true) {
            this.result += "<!-- " + comment + "-->";
        }
    }

    parserDidEndElement(parser:NSCoreHTMLParser, element:string){        

        if (this.isCapturing == true) {            
                this.closeTag(element);                
                this.elementCapturingCount--;            
        }

        if (this.elementCapturingCount == 0) this.isCapturing = false;

        this.currentString = null;        
    }

    parserDidStartDocument(parser:NSCoreHTMLParser){
        console.log("parser started");
    }

    parserDidEndDocument(parser:NSCoreHTMLParser){
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
                this.result += NSLocalizeString(this.currentStringLocalizedKey, this.currentString);
            }
        }
        this.currentString = null;
        this.currentStringLocalizedKey = null;        
    }

} */