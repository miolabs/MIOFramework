import { NSObject } from "./NSObject";
export interface NSXMLParserDelegate {
    parserDidStartDocument?(parser: NSXMLParser): any;
    parserDidEndDocument?(parser: NSXMLParser): any;
    parserDidStartElement?(parser: NSXMLParser, element: string, attributes: any): any;
    parserDidEndElement?(parser: NSXMLParser, element: string): any;
    parserFoundCharacters?(parser: NSXMLParser, characters: string): any;
    parserFoundComment?(parser: NSXMLParser, comment: string): any;
}
export declare enum NSXMLTokenType {
    Identifier = 0,
    QuestionMark = 1,
    ExclamationMark = 2,
    OpenTag = 3,
    CloseTag = 4,
    Slash = 5,
    Quote = 6,
    WhiteSpace = 7,
    End = 8
}
export declare class NSXMLParser extends NSObject {
    private str;
    private delegate;
    private strIndex;
    private elements;
    private attributes;
    private currentElement;
    private currentTokenValue;
    private lastTokenValue;
    private ignoreWhiteSpace;
    initWithString(str: string, delegate: NSXMLParserDelegate): void;
    private nextChar;
    private prevChar;
    private readToken;
    private nextToken;
    private prevToken;
    parse(): void;
    private openTag;
    private questionMark;
    private exclamationMark;
    private xmlOpenTag;
    private xmlCloseTag;
    private beginElement;
    private endElement;
    private attribute;
    private decodeAttribute;
    private slash;
    private closeTag;
    private didStartElement;
    private didEndElement;
    private text;
    private comments;
    private error;
}
