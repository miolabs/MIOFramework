import { NSLog } from "./NSLog";
import { NSObject } from "./NSObject";

export interface NSXMLParserDelegate {
    parserDidStartDocument?(parser:NSXMLParser);
    parserDidEndDocument?(parser:NSXMLParser);
    
    parserDidStartElement?(parser:NSXMLParser, element:string, attributes);
    parserDidEndElement?(parser:NSXMLParser, element:string);

    parserFoundCharacters?(parser:NSXMLParser, characters:string);
    parserFoundComment?(parser:NSXMLParser, comment:string);
}

export enum NSXMLTokenType{
    Identifier,
    QuestionMark,
    ExclamationMark,
    OpenTag,
    CloseTag,
    Slash,
    Quote,
    End
}

export class NSXMLParser extends NSObject
{
    private str:string = null;
    private delegate:NSXMLParserDelegate = null;

    private strIndex = 0;

    private elements = [];
    private attributes = null;
    private currentElement = null;
    private currentTokenValue:NSXMLTokenType = null;
    private lastTokenValue:NSXMLTokenType = null;

    initWithString(str:string, delegate:NSXMLParserDelegate){
        this.str = str;
        this.delegate = delegate;
    }

    // LEXER / TOKENIZER
    private nextChar():string{
        
        if (this.strIndex >= this.str.length) return null;
        let ch = this.str.charAt(this.strIndex);
        this.strIndex++;
        return ch;
    }

    private prevChar():string{
        this.strIndex--;
        return this.str.charAt(this.strIndex);
    }

    private readToken():string{

        let exit = false;
        let value = "";

        while(exit == false){

            let ch = this.nextChar();
            if (ch == null) return null;

            if (ch == "<" || ch == ">" || ch == "/" || ch == "?" || ch == "!"){
                
                if (value.length > 0) 
                    this.prevChar();                    
                else 
                    value = ch;
                exit = true;
            }
            else if (ch == "\"" || ch == "'") {                
                value += ch;
                let ch2 = this.nextChar();
                while(ch2 != ch){                    
                    value += ch2;
                    ch2 = this.nextChar();                    
                }
                value += ch2;
            }

            else if (ch == " "){
                exit = true;
            }                                
            else
                value += ch;
        }

        return value;
    }    

    private nextToken():[NSXMLTokenType, string]{
        
        this.lastTokenValue = this.currentTokenValue;

        let exit = false;
        let token = NSXMLTokenType.Identifier;
        let value = this.readToken();                        

        if (value == null) return [NSXMLTokenType.End, null];

        switch(value){

            case "<":
                token = NSXMLTokenType.OpenTag;
                break;

            case ">":
                token = NSXMLTokenType.CloseTag;
                break;                

            case "/":
                token = NSXMLTokenType.Slash;
                break;

            case "?":
                token = NSXMLTokenType.QuestionMark;
                break;

            case "!":
                token = NSXMLTokenType.ExclamationMark;
                break;

            default:
                break;
        }

        this.currentTokenValue = token;
        
        return [token, value];
    }

    private prevToken():NSXMLTokenType{
        
        return this.lastTokenValue;
    }

    //
    // Parser
    //

    parse(){

        //console.log("**** Start parser")

        if (typeof this.delegate.parserDidStartDocument === "function")
            this.delegate.parserDidStartDocument(this);

        var token, value;
        [token, value] = this.nextToken();
                
        while(token != NSXMLTokenType.End){

            switch(token) {

                case NSXMLTokenType.OpenTag:
                    this.openTag();
                    break;

                case NSXMLTokenType.Identifier:
                    this.text(value);
                    break;                    

                default:
                    break;
            }

            [token, value] = this.nextToken();
        }

        //console.log("**** End parser")

        if (typeof this.delegate.parserDidEndDocument === "function")
            this.delegate.parserDidEndDocument(this);
    }

    private openTag(){

        //console.log("Open Tag");
        
        this.attributes = {};

        var token, value;
        [token, value] = this.nextToken();

        switch(token){

            case NSXMLTokenType.Identifier:
                this.beginElement(value);
                break;                        

            case NSXMLTokenType.QuestionMark:
                this.questionMark();
                break;

            case NSXMLTokenType.ExclamationMark:
                this.exclamationMark();
                break;

            case NSXMLTokenType.Slash:
                this.slash();
                break;

            default:
                this.error("Expected: element");
                break;
        }
    }

    private questionMark(){
        
        //console.log("Question mark");
        var token, val;
        [token, val] = this.nextToken();

        switch (token){

            case NSXMLTokenType.Identifier:
                this.xmlOpenTag(val);
                break;

            case NSXMLTokenType.CloseTag:
                this.xmlCloseTag();
                break;   
                
            default:
                break;
        }        
    }

    private exclamationMark() {

        let ch = this.nextChar();
        let foundMark = 0;

        if (ch == "-"){
            foundMark++;
            ch = this.nextChar();
            if (ch == "-") {
                foundMark++;
            }
        }

        if (foundMark < 2) {
            for (let i = 0; i < foundMark; i++) {
                this.prevChar();
            }
        } else {

            let comments = "";
            let exit = false;

            while (exit == false) {
                let ch = this.nextChar();
                if (ch == null) throw new Error("NSXMLParser: Unexpected end of file!");
                comments += ch;                
                if (comments.length >= 3 && comments.substr(-3) == "-->") exit = true;
            }

            this.comments(comments.substr(0, comments.length - 3));
        }
    }

    private xmlOpenTag(value){
     
        //console.log("XML open tag");

        let token, val;
        [token, val] = this.nextToken();

        switch (token){

            case NSXMLTokenType.Identifier:
                this.attribute(val);
                break;

            case NSXMLTokenType.QuestionMark:
                this.questionMark();
                break;

            default:
                break;
        }
    }

    private xmlCloseTag(){
        //console.log("XML close tag");
    }

    private beginElement(value){

        //console.log("Begin Element: " + value);
        
        this.elements.push(value);
        this.currentElement = value;
        this.attributes = {};

        let token, val;
        [token, val] = this.nextToken();

        switch (token){

            case NSXMLTokenType.Identifier:
                this.attribute(val);
                break;

            case NSXMLTokenType.Slash:
                this.slash();
                break;

            case NSXMLTokenType.CloseTag:
                this.closeTag();
                this.didStartElement();                                
                break;

            default:
                break;
        }
    }

    private endElement(value){

        //console.log("End Element: " + value);

        //this.elements.push(value);
        this.attributes = {};
        this.currentElement = null;

        let token, val;
        [token, val] = this.nextToken();

        switch (token){

            case NSXMLTokenType.CloseTag:
                this.closeTag();
                this.didEndElement();
                break;

            default:
                this.error("Expected: close token");
                break;
        }
    }

    private attribute(attr){

        //console.log("Attribute: " + attr);

        this.decodeAttribute(attr);

        let token, value;
        [token, value] = this.nextToken();

        switch (token){

            case NSXMLTokenType.Identifier:
                this.attribute(value);
                break;

            case NSXMLTokenType.Slash:
                this.slash();
                break;

            case NSXMLTokenType.QuestionMark:
                this.questionMark();
                break;

            case NSXMLTokenType.CloseTag:
                this.closeTag();
                this.didStartElement();                
                break;

            default:
                break;
        }
    }

    private decodeAttribute(attr){

        var key = null;
        var value = null;        
        var token = "";

        for (let index = 0; index < attr.length; index++){

            let ch = attr[index];
            if (ch == "=") {
                key = token;
                token = "";
            }
            else if (ch == "\"" || ch == "'") {
                
                index++;
                let ch2 = attr[index];
                while(ch2 != ch){
                    token += ch2;
                    index++;
                    ch2 = attr[index];
                }
            }
            else {
                token += ch;
            }
        }
        
        if (key != null && token.length > 0) value = token;
        else if (key == null && token.length > 0) key = token;

        this.attributes[key] = value;        
    }

    private slash(){
        
        let token, value;
        [token, value] = this.nextToken();

        switch(token){

            case NSXMLTokenType.CloseTag:                    
                this.closeTag();
                this.didStartElement();
                this.didEndElement();                
                break;            

            case NSXMLTokenType.Identifier:
                this.endElement(value);
                break;     
                
            default:
                break;
        }
    }

    private closeTag(){        
        
        //console.log("Close Tag");
    }

    private didStartElement(){        
        
        let element = this.currentElement;
        //console.log("Start Element: " + element);
        if (typeof this.delegate.parserDidStartElement === "function")
            this.delegate.parserDidStartElement(this, element, this.attributes);

        this.currentElement = null;
        this.attributes = {};        
    }

    private didEndElement(){        
        
        let element = this.elements.pop();
        //console.log("End Element " + element);        
        if (typeof this.delegate.parserDidEndElement === "function")
            this.delegate.parserDidEndElement(this, element);
    }

    private text(value){        
        //console.log("Text: " + value);
        if (typeof this.delegate.parserFoundCharacters === "function")
            this.delegate.parserFoundCharacters(this, value);        
    }

    private comments(comment:string){
        if (typeof this.delegate.parserFoundComment === "function")
            this.delegate.parserFoundComment(this, comment);                
    }

    private error(expected){
        NSLog("Error: Unexpected token. " + expected);
    }

}
