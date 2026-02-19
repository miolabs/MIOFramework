// import { NSObject } from "./NSObject";
// import { NSError } from "./NSError";
// import { XMLParser } from "./NSXMLParser";

import { NSObject } from "./NSObject";
import { XMLParser } from "./XMLParser";

export enum PropertyListFormat
{
    OpenStepFormat,
    XMLFormat_v1_0,
    BinaryFormat_v1_0,    
}

export enum PropertyListReadOptions
{
    None
}

export enum PropertyListWriteOptions
{
    None
}

export class PropertyListSerialization extends NSObject
{            
    static propertyListWithData(data:string, options:PropertyListReadOptions, format:PropertyListFormat, error:Error){
        let pl = new PropertyListSerialization();
        pl.initWithData(data, options, format);

        let item = pl.parseData(error);
        return item;
    }

    static dataWithpropertyList(plist:any, format:PropertyListFormat, options:PropertyListReadOptions, error:Error){
        let pl = new PropertyListSerialization();
        pl.initWithObject(plist, options, format);

        let data = pl.parsePList(error);
        return data;
    }


    private data:string = null;
    private initWithData(data:string, options:PropertyListReadOptions, format:PropertyListFormat){
        super.init();
        this.data = data;
    }

    private plist:any = null;
    private initWithObject(plist:any, options:PropertyListReadOptions, format:PropertyListFormat){
        super.init();
        this.plist = plist;
    }

    private rootItem = null;        
    private parseData(error:Error){
        this.currentElement = null;
        let parser = new XMLParser();
        parser.initWithString(this.data, this);
        parser.parse();
        
        return this.rootItem;

    }

    // #region XML Parser delegate 
    private currentElement = null;
    private currentElementType = null;
    private currentValue = null;
    private currentKey = null;
    private currentString:string = null;
    private itemStack = [];
    
    parserDidStartElement(parser:XMLParser, element:string, attributes){
        
        if (element == "dict"){            
            let item = {};
            if (this.currentElement != null && this.currentElementType == 0){
                let key = this.currentKey;
                this.currentElement[key] = item;
            }
            else if (this.currentElement != null && this.currentElementType == 1){
                this.currentElement.push(item);
            }
            
            this.currentElement = item;
            this.currentElementType = 0;
            this.itemStack.push({"Element": item, "Type":0});

            if (this.rootItem == null) this.rootItem = item;
        }    
        else if (element == "array"){
            let item = [];
            if (this.currentElement != null && this.currentElementType == 0){
                let key = this.currentKey;
                this.currentElement[key] = item;
            }
            else if (this.currentElement != null && this.currentElementType == 1){
                this.currentElement.push(item);
            }
            this.currentElement = item;
            this.currentElementType = 1;
            this.itemStack.push({"Element": item, "Type":1});

            if (this.rootItem == null) this.rootItem = item;
        }
        
        this.currentString = "";
    }
    
    parserFoundCharacters(parser:XMLParser, characters:string){
        this.currentString += characters;
    }

    parserDidEndElement(parser:XMLParser, element:string){
                
        if (element == "key") {
            this.currentKey = this.currentString;            
        }
        else if (element == "string" || element == "true" || element == "false" || element == "integer" || element == "real" || element == "data") {
            this.currentValue = this.currentString;
            if (element == "true") this.currentValue = true;
            else if (element == "false") this.currentValue = false;
            else if (element == "integer") this.currentValue = parseInt(this.currentString);
            else if (element == "real") this.currentValue = parseFloat(this.currentString);

            if (this.currentElementType == 1) this.currentElement.push(this.currentValue);
            else if (this.currentElementType == 0 && this.currentKey != null){
                let key = this.currentKey;
                let value = this.currentValue;
                this.currentElement[key] = value;
            }
        }
        else if (element == "dict" || element == "array"){
            if (this.itemStack.length > 1) {
                let lastItem = this.itemStack[this.itemStack.length - 2];            
                this.currentElement = lastItem["Element"];
                this.currentElementType = lastItem["Type"];                
            }
            else {                
                this.currentElement = null;
                this.currentElementType = null;
            }
            this.itemStack.splice(-1,1);
        }
    }    
    
    parserDidEndDocument(parser:XMLParser){

    }

    private contentString:string = null;
    private parsePList(error:Error){
        this.contentString = '<?xml version="1.0" encoding="UTF-8"?>';
        this.contentString += '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">';
        this.contentString += '<plist version="1.0">';
        
        this.parseObject(this.plist);

        this.contentString += '</plist>';

        return this.contentString;
    }

    private parseObject(object:any){
        
        if (typeof object === "string") this.parseString(object);
        else if (typeof object === "number") this.parseNumber(object);
        //else if (typeof object === "Date") this.parseDate(object);
        else if (object instanceof Array) this.parseArray(object);
        else this.parseDictionary(object);
    }

    private parseString(object:string){
        this.contentString += "<string>";
        this.contentString += object;
        this.contentString += "</string>";
    }

    private parseNumber(object:number){
        if (object % 1 === 0) {
            this.contentString += "<integer>";
            this.contentString += object;
            this.contentString += "</integer>";    
        }
        else {
            this.contentString += "<real>";
            this.contentString += object;
            this.contentString += "</real>";    
        }        
    }

    private parseArray(objects:any){
        this.contentString += "<array>";

        for (let index = 0; index < objects.length; index++){
            let obj = objects[index];
            this.parseObject(obj);
        }

        this.contentString += "</array>";
    }

    private parseDictionary(objects:any){
        this.contentString += "<dict>";

        for (let key in objects){            
            this.contentString += "<key>";
            this.contentString += key;
            this.contentString += "</key>";

            let obj = objects[key];
            this.parseObject(obj);
        }

        this.contentString += "</dict>";
    }

}