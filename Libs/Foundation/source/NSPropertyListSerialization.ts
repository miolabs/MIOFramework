import { NSObject } from "./NSObject";
import { NSError } from "./NSError";
import { NSXMLParser } from "./NSXMLParser";

export enum NSPropertyListReadOptions
{
    None
}

export enum NSPropertyListFormatformat
{
    None
}

export class NSPropertyListSerialization extends NSObject
{            
    static propertyListWithData(data:string, options:NSPropertyListReadOptions, format:NSPropertyListFormatformat, error:NSError){
        let pl = new NSPropertyListSerialization();
        pl.initWithData(data, options, format);

        let item = pl._parse(error);
        return item;
    }

    private data:string = null;
    initWithData(data:string, options:NSPropertyListReadOptions, format:NSPropertyListFormatformat){
        super.init();
        this.data = data;
    }

    private rootItem = null;        
    private _parse(error:NSError){
        this.currentElement = null;
        let parser = new NSXMLParser();
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
    
    parserDidStartElement(parser:NSXMLParser, element:string, attributes){
        
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
    
    parserFoundCharacters(parser:NSXMLParser, characters:string){
        this.currentString += characters;
    }

    parserDidEndElement(parser:NSXMLParser, element:string){
                
        if (element == "key") {
            this.currentKey = this.currentString;            
        }
        else if (element == "string" || element == "integer" || element == "data") {
            this.currentValue = this.currentString;
            if (element == "integer") this.currentValue = parseInt(this.currentString);
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
    
    parserDidEndDocument(parser:NSXMLParser){

    }

    // #endregion
}