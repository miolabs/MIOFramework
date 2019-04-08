import { NSObject } from "./NSObject";
import { NSError } from "./NSError";
import { NSXMLParser } from "./NSXMLParser";
export declare enum NSPropertyListReadOptions {
    None = 0
}
export declare enum NSPropertyListFormatformat {
    None = 0
}
export declare class NSPropertyListSerialization extends NSObject {
    static propertyListWithData(data: string, options: NSPropertyListReadOptions, format: NSPropertyListFormatformat, error: NSError): any;
    private data;
    initWithData(data: string, options: NSPropertyListReadOptions, format: NSPropertyListFormatformat): void;
    private rootItem;
    private _parse;
    private currentElement;
    private currentElementType;
    private currentValue;
    private currentKey;
    private currentString;
    private itemStack;
    parserDidStartElement(parser: NSXMLParser, element: string, attributes: any): void;
    parserFoundCharacters(parser: NSXMLParser, characters: string): void;
    parserDidEndElement(parser: NSXMLParser, element: string): void;
    parserDidEndDocument(parser: NSXMLParser): void;
}
