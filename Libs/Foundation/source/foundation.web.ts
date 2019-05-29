export enum MIOCorePlatformType
{
    Unknown,
    Node,
    Safari,
    Chrome    
}



export function NSClassFromString(className:string){
    let classObject = window[className];
    //if (classObject == null) classObject = MIOCoreClassByName(className);

    if (classObject == null) throw new Error("NSClassFromString: class '" + className + "' didn't register.");

    let newClass = new classObject();
    if((newClass as any).init$vars) (newClass as any).init$vars()//quick fix for transpiler because it needs it
    return newClass;
}

export function MIOCoreGetPlatform():MIOCorePlatformType {
    let agent = navigator.userAgent.toLowerCase();
    let browserType = MIOCorePlatformType.Unknown;    
    if (agent.indexOf("chrome") != -1) browserType = MIOCorePlatformType.Chrome;
    else if (agent.indexOf("safari") != -1) browserType = MIOCorePlatformType.Safari;    
    
    return browserType;
}

export function MIOCoreGetPlatformLocale(){
    // navigator.languages:    Chrome & FF
    // navigator.language:     Safari & Others
    // navigator.userLanguage: IE & Others
    return navigator.languages || navigator.language || navigator['userLanguage'];
}

export function MIOCoreGetPlatformLanguage(){
    let locale = MIOCoreGetPlatformLocale();
    if (typeof(locale) == "string") return locale.substring(0, 2);
    else {
        let l = locale[0];
        return l.substring(0, 2);
    }
}

export function MIOCoreIsPhone(){    

    let phone = ['iphone','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
    for (let index = 0; index < phone.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(phone[index].toLowerCase()) > 0) {
            return true;
        }
    }    
    return false;
}

export function MIOCoreIsPad(){
    let pad = ['ipad'];
    for (let index = 0; index < pad.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(pad[index].toLowerCase()) > 0) {
            return true;
        }
    }
    
    return false;    
}

export function MIOCoreIsMobile()
{
    //var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
    let mobile = ['iphone','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
    for (let index = 0; index < mobile.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(mobile[index].toLowerCase()) > 0) return true;
    }

    // nothing found.. assume desktop
    return false;
}

export function MIOCoreBundleGetMainURLString():string{
    return window.location.href;
}

export function MIOCoreBundleGetContentsFromURLString(path:string, target:any, completion:any){
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {        
        completion.call(target, this.status, this.responseText);    
    };
    xhr.open("GET", path);
    xhr.send();
}



export function MIOCoreCreateMD5(s) {function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

export function MIOCoreStringHasPreffix(str, preffix)
{
    return str.substring(0, preffix.length) === preffix;
}

export function MIOCoreStringHasSuffix(str, suffix)
{
    let s = str.substr(str.length - suffix.length);
    return s == suffix;
}

export function MIOCoreStringAppendPathComponent(string:string, path):string
{
    let str = string;

    if (string.charAt(string.length - 1) == "/" && path.charAt(0) == "/"){
        str += path.substr(1);
    }
    else if (string.charAt(string.length - 1) != "/" && path.charAt(0) != "/"){
        str += "/" + path;
    }
    else {
        str += path;
    }

    return str;
}

export function MIOCoreStringLastPathComponent(string:string)
{
    let index = string.lastIndexOf("/");
    if (index == -1) return string;
    let len = string.length - index;
    let str = string.substr(index, len);

    return str;
}

export function MIOCoreStringPathExtension(string:string):string
{
    let lastPathComponent = MIOCoreStringLastPathComponent(string);
    let items = lastPathComponent.split(".");
    if (items.length == 1) return "";

    let ext = items[items.length - 1];
    return ext;
}

export function MIOCoreStringDeletingLastPathComponent(string:string)
{
    let index = string.lastIndexOf("/");
    let str = string.substr(0, index);

    return str;
}

export function MIOCoreStringStandardizingPath(string)
{
    let array = string.split("/");

    let newArray = []; 
    let index = 0;
    for (let count = 0; count < array.length; count++)
    {
        let component:string = array[count];
        if (component.substr(0,2) == "..")
            index--;
        else 
        {
            newArray[index] = component;
            index++;
        }                
    }

    let str = "";
    if (index > 0)
        str = newArray[0];

    for (let count = 1; count < index; count++){
        str += "/" + newArray[count];
    }

    return str;
}


let _MIOLocalizedStrings = null;
export function MIOCoreStringSetLocalizedStrings(data) 
{
    _MIOLocalizedStrings = data
}

export function MIOCoreStringGetLocalizedStrings() 
{
    return _MIOLocalizedStrings
}

export function  MIOCoreStringLocalizeString(key:string, defaultValue:string){
    let strings =  MIOCoreStringGetLocalizedStrings;
    if (strings == null)
        return defaultValue;

    let value = strings[key];
    if (value == null)
        return defaultValue;

    return value;
}


export class MIOCoreLexer 
{
    private input:string = null;
    private tokenTypes = [];
    private tokens = null;
    private tokenIndex = -1;

    private ignoreTokenTypes = [];

    constructor(string:string) {
        this.input = string;
    }

    addTokenType(type, regex) {
        this.tokenTypes.push({"regex":regex, "type":type});
    }

    ignoreTokenType(type) {
        this.ignoreTokenTypes.push(type);
    }

    tokenize() {
        this.tokens = this._tokenize();
        this.tokenIndex = 0;
    }

    private _tokenize(){
        
        let tokens = [];
        let foundToken = false;
    
        let matches;
        let i;
        let numTokenTypes = this.tokenTypes.length;
    
        do {          
            foundToken = false;  
            for (i = 0; i < numTokenTypes; i++) {
                let regex = this.tokenTypes[i].regex;
                let type = this.tokenTypes[i].type;
    
                matches = regex.exec(this.input);
                if (matches) {
                    if (this.ignoreTokenTypes.indexOf(type) == -1) {
                        tokens.push({ type: type, value: matches[0], matches : matches});
                    }
                    this.input = this.input.substring(matches[0].length);
                    foundToken = true;
                    break;  
                }              
            }
            
            if (foundToken == false) {
                throw new Error(`MIOCoreLexer: Token doesn't match any pattern. (${this.input})`);
            }
            
        } while (this.input.length > 0);
    
        return tokens;
    }    

    nextToken(){

        if (this.tokenIndex >= this.tokens.length) {
            return null;
        }

        let token = this.tokens[this.tokenIndex];
        this.tokenIndex++;

        // Check if we have to ignore
        let index = this.ignoreTokenTypes.indexOf(token.type);        
        return index == -1 ? token : this.nextToken();
    }
    
    prevToken(){

        this.tokenIndex--;
        if (this.tokenIndex < 0) {
            return null;
        }
        
        let token = this.tokens[this.tokenIndex];

        // Check if we have to ignore
        let index = this.ignoreTokenTypes.indexOf(token.type);                                        
        return index == -1 ? token : this.prevToken();
    }
}

let _miocore_languages = null;
export function MIOCoreAddLanguage(lang, url)
{
    if (_miocore_languages == null) _miocore_languages = {};
    _miocore_languages[lang] = url;
}

export function MIOCoreGetLanguages()
{
    return _miocore_languages;
}



export interface MIOCoreHTMLParserDelegate {
    parserDidStartElement(parser:MIOCoreHTMLParser, element:string, attributes:any):void;
    parserDidEndElement(parser:MIOCoreHTMLParser, element:string):void;

    parserFoundCharacters(parser:MIOCoreHTMLParser, characters:string):void;

    parserFoundComment(parser:MIOCoreHTMLParser, comment:string):void;

    parserDidStartDocument(parser:MIOCoreHTMLParser):void;
    parserDidEndDocument(parser:MIOCoreHTMLParser):void;
}

export enum MIOCoreHTMLParserTokenType {
    Identifier,    
    OpenTag,    
    CloseTag,
    OpenCloseTag,
    InlineCloseTag,
    Question,
    Exclamation,
    Equal,
    Quote,
    Commentary,
    End
}

export class MIOCoreHTMLParser 
{
    private string:string = null;
    private stringIndex = 0;
    private delegate:MIOCoreHTMLParserDelegate = null;

    private exceptionsTags = ["!DOCTYPE", "area", "base", "br", "col", "hr", "img", "input", "link", "meta", "param", "keygen", "source"];

    initWithString(string:string, delegate:MIOCoreHTMLParserDelegate) {
        this.string = string;
        this.delegate = delegate;
    }

    private nextChar():string{
        if (this.stringIndex >= this.string.length) return null;
        let ch = this.string.charAt(this.stringIndex);
        this.stringIndex++;
        return ch;
    }

    private prevChar():string{
        this.stringIndex--;
        return this.string.charAt(this.stringIndex);
    }

    private getChars(stopChars) {

        var chs:string = "";        
        var exit = false;
        while(exit == false) {
            chs += this.nextChar();
            if (MIOCoreStringHasSuffix(chs, stopChars) == true) exit = true;
        }

        // Remove the stop chars
        return chs.substr(0, chs.length - stopChars.length);
    }

    /*
    STREAM TOKENIZER
    */

    private readToken(){
                
        let value = "";

        this.lastTokenIndex = this.stringIndex;

        let ch = this.nextChar();        
        if (ch == null) return null;
        while(ch == " ") ch = this.nextChar();

        let exit = false;
        while (exit == false) {
            
            switch(ch) {
                case "<":
                    if (value.length == 0) value = this.minor();
                    else this.prevChar();
                    exit = true;
                    break;

                // case "!":
                //     if (value.length == 0) value = this.exclamation();
                //     else this.prevChar();
                //     exit = true;
                //     break;

                case ">":
                    if (value.length == 0) value = this.major();
                    else this.prevChar();
                    exit = true;
                    break;

                // case "/":
                //     if (value.length == 0) value = this.slash();
                //     else this.prevChar();                    
                //     exit = true;
                //     break;

                case "=":
                    if (value.length == 0) value = ch;
                    else this.prevChar();
                    exit = true;

                case " ":
                    exit = true;
                    break;      
                    
                case "\"":                    
                case "'":
                    if (value.length == 0) value = ch;
                    exit = true;
                    break;

                default:
                    value += ch;
                    ch = this.nextChar();
                    if (ch == null) exit = true;
                    break;
            }
            
        }

        return value;
    }

    private minor(){
        let ch = this.nextChar();
        let value = "";

        switch (ch) {
            case "/":
                value = "</";    
                break;

            case "!":
                value = this.exclamation();
                break;

            default: 
                value = "<";
                this.prevChar();
                break;
            
        }
        
        return value;
    }

    private major(){

        this.prevChar(); // Major symbol
        let ch = this.prevChar();

        let value = ">";
        if (ch == "/"){
            value = "/>";
        }

        value = this.nextChar();
        value = this.nextChar();            
        return value;
    }

    // private slash(){

    //     let ch = this.nextChar();
    //     if (ch == ">") return "/>";

    //     this.unexpectedToken();
    // }

    private exclamation(){

        let ch = this.nextChar();
        if (ch == "-") {
            let ch2 = this.nextChar();
            if (ch2 == "-") {
                return "<!--";
            }
            else this.unexpectedToken(ch + ch2);
        }
        
        this.prevChar();
        this.prevChar();
        return "<";
    }

    private lastTokenIndex = -1;
    private lastTokenValue:string = null;
    private prevToken() {
        this.stringIndex = this.lastTokenIndex;
        this.lastTokenIndex = -1;
        let value = this.lastTokenValue;
        this.lastTokenValue = null;
        return value;
    }

    private nextToken(){

        let type = MIOCoreHTMLParserTokenType.Identifier;
        let value = this.readToken();

        if (value == null) return [MIOCoreHTMLParserTokenType.End, value];

        switch(value) {
            case "<":
                type = MIOCoreHTMLParserTokenType.OpenTag;
                break;

            case ">":
                type = MIOCoreHTMLParserTokenType.CloseTag;
                break;

            case "</":
                type = MIOCoreHTMLParserTokenType.OpenCloseTag;
                break;                

            case "/>":
                type = MIOCoreHTMLParserTokenType.InlineCloseTag;
                break;

            case "<!--":
                type = MIOCoreHTMLParserTokenType.Commentary;                
                break;

            case "=":
                type = MIOCoreHTMLParserTokenType.Equal;
                break;       
                
            case "\"":
            case "'":
                type = MIOCoreHTMLParserTokenType.Quote;
                break;
        }

        this.lastTokenValue = value;
        return [type, value];
    }

    /* 
        PARSER
    */

    parse(){
        if (this.string == null) return;
        
        if (typeof this.delegate.parserDidStartDocument === "function") {
            this.delegate.parserDidStartDocument(this);
        }
        
        let exit = false;        
        do {            
            let [type, value] = this.nextToken();
            switch (type) {

                case MIOCoreHTMLParserTokenType.OpenTag:
                    this.openTag();
                    break;

                case MIOCoreHTMLParserTokenType.OpenCloseTag:
                    this.closeElement();
                    break;
                        
                case MIOCoreHTMLParserTokenType.Commentary:
                    this.comment();
                    break;

                case MIOCoreHTMLParserTokenType.Identifier:
                    this.foundChars(value);
                    break;

                case MIOCoreHTMLParserTokenType.End:
                    exit = true;
                    break;

                default:
                    this.unexpectedToken(value);
                    break;
            }

        } while (exit == false);

        if (typeof this.delegate.parserDidEndDocument === "function") {
            this.delegate.parserDidEndDocument(this);
        }

    }

    private unexpectedToken(value) {
        throw new Error("Unexpected token: " + value);
    }

    private openTag(){

        let [type, value] = this.nextToken();
        switch (type){

            case MIOCoreHTMLParserTokenType.Identifier:
                this.openElement(value);
                break;

            case MIOCoreHTMLParserTokenType.Exclamation:
                this.exclamation();
                break;                            
        }
    }

    private openElement(element){        
        let attributes = this.attributes();
        this.closeTag(element, attributes);
    }

    private attributes(){        

        var attributes = {};
        var exit = false;
        
        var attrKey = null;

        let isKey = true;

        while (exit == false) {

            let [type, value] = this.nextToken();
            switch (type) {
            
                case MIOCoreHTMLParserTokenType.Identifier:
                    if (isKey) {
                        attrKey = value;
                        attributes[attrKey] = null;
                    }
                    else {
                        attributes[attrKey] = value;
                        isKey = true;
                    }
                    break;

                case MIOCoreHTMLParserTokenType.Equal:
                    isKey = false;
                    break;

                case MIOCoreHTMLParserTokenType.Quote:
                    attributes[attrKey] = this.getChars(value);
                    isKey = true;
                    break;

                case MIOCoreHTMLParserTokenType.CloseTag:
                case MIOCoreHTMLParserTokenType.InlineCloseTag:
                    this.prevToken();
                    exit = true;
                    break;                    
            }            
        }  
        
        return attributes;
    }

    private closeTag(element, attributes){

        let [type, value] = this.nextToken();

        switch (type) {

            case MIOCoreHTMLParserTokenType.CloseTag:
                if (typeof this.delegate.parserDidStartElement === "function") {
                    this.delegate.parserDidStartElement(this, element, attributes);
                }
                // Only call close element for the execeptions tags            
                if ((this.exceptionsTags.indexOf(element) > -1) && (typeof this.delegate.parserDidEndElement === "function")) {
                    this.delegate.parserDidEndElement(this, element);
                }

                // Special cases like <style></style> or <script></script>
                // We need to read everything 'til the next close tag
                if (element == "style" || element == "script"){
                    let chars = this.readToNextString("</" + element + ">");
                    this.foundChars(chars);
                    
                    if (typeof this.delegate.parserDidEndElement === "function") {
                        this.delegate.parserDidEndElement(this, element);
                    }                                        
                }                
                
                break;

            case MIOCoreHTMLParserTokenType.InlineCloseTag:
                if (typeof this.delegate.parserDidEndElement === "function") {
                    this.delegate.parserDidEndElement(this, element);
                }                
                break;

            default:
                this.unexpectedToken(value);
                break;
        }

    }

    private closeElement(){
        
        let [type, value] = this.nextToken();
        if (type != MIOCoreHTMLParserTokenType.Identifier) this.unexpectedToken(value);
        let element = value as string;

        [type, value] = this.nextToken();
        if (type != MIOCoreHTMLParserTokenType.CloseTag) this.unexpectedToken(value);
        
        if (typeof this.delegate.parserDidEndElement === "function") {
            this.delegate.parserDidEndElement(this, element);
        }
    }    

    private comment(){
        let cmt = this.getChars("-->");
        if (typeof this.delegate.parserFoundComment === "function") {
            this.delegate.parserFoundComment(this, cmt);
        }
    }

    private foundChars(chars){
        if (chars == null) return;
        if (typeof this.delegate.parserFoundCharacters === "function") {
            this.delegate.parserFoundCharacters(this, chars);
        }        
    }

    private readToNextString(element:string){
        
        let str = "";
        for (let index = 0; index < element.length; index++){
            let ch = this.nextChar();
            if (ch == null) throw Error("Unexpected end of string: " + str);
            str += ch;
        }

        if (str == element) return null;
        
        let exit = false;
        while (exit == false){
            let ch = this.nextChar();            
            if (ch == null) throw Error("Unexpected end of string: " + str);
            str += ch;
            let cmp = str.substr(-element.length);
            if (cmp == element) exit = true;
        }

        let chars = str.substr(0, str.length - element.length);
        console.log("*****\n" + chars + "\n*****\n");
        return chars;
    }

}

export class MIOCoreBundle
{
    
}

let _MIOAppBundleResources = {};

export function MIOCoreBundleSetAppResource(resource:string, type:string, content:string){
    let files = _MIOAppBundleResources[type];
    if (files == null) {
        files = {};
        _MIOAppBundleResources[type] = files;
    }

    files[resource] = content;
}

export function MIOCoreBundleGetAppResource(resource:string, type:string){
    let files = _MIOAppBundleResources[type];
    if (files == null) return null;

    let content = files[resource];
    return content;
}






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
            
            if (attributes["data-main-view-controller"] == true) {
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




export class MIOCoreBundle_web extends MIOCoreBundle
{
    baseURL:string = null;

    private _layoutWorker = null;
    private _layoutQueue = null;
    private _layoutCache = null;

    private _isDownloadingResource = false;
    
    loadHTMLFromPath(path, target, completion){
        MIOCoreBundleGetContentsFromURLString(path, this, function(code, data){

            let parser = new MIOCoreBundleHTMLParser(data);
            let contents = parser.parse();

            completion.call(target, contents);
        });
    }

    // loadHMTLFromPath(path, layerID, target, completion)
    // {
    //     if (this._layoutWorker == null)
    //     {
    //         this._layoutWorker = new Worker("libs/miojslibs/webworkers/Bundle_WebWorker.js");
    //         this._layoutWorker.postMessage({"CMD" : "SetLanguageStrings", "LanguageStrings" : MIOCoreStringGetLocalizedStrings()});
            
    //         let instance = this;
    //         this._layoutWorker.onmessage = function (event) {

    //             let item = event.data;

    //             if (item["Type"] == "HTML"){
    //                 let result = item["Result"];

    //                 let layerID = item["LayerID"];
    //                 console.log(" <- layerid: " + layerID);                    
    
    //                 instance.layerDidDownload(result);
    //             }     
    //             else if (item["Error"] != null) {
    //                 throw new Error(`MIOBundle: ${item["Error"]}`);
    //             }           
    //         }
    //     }

    //     if (this._layoutQueue == null)
    //         this._layoutQueue = [];

    //     if (this._layoutCache == null)
    //         this._layoutCache = {};

    //     if (this._layoutCache[path] != null)
    //     {
    //         let i = this._layoutCache[path];
    //         let layout = i["Layer"];
    //         completion.call(target, layout);
    //     }
    //     else
    //     {
    //         let url = MIOCoreStringAppendPathComponent(this.baseURL, path);
    //         let item = {"Key" : path, "Path" : MIOCoreStringDeletingLastPathComponent(path), "URL": url, "LayerID": layerID, "Target" : target, "Completion" : completion};
    //         this._layoutQueue.push(item);

    //         this.checkQueue();        
    //     }
    // }

    private checkQueue()
    {
        if (this._isDownloadingResource == true)
            return;

        if (this._layoutQueue.length == 0)
            return;

        this._isDownloadingResource = true;
        let item = this._layoutQueue[0];

        // Send only the information need
        console.log("Download resource: " + item["URL"]);
        var msg = {"CMD" : "DownloadHTML", "URL" : item["URL"], "Path" : item["Path"], "LayerID" : item["LayerID"]};
        console.log(" -> layerid: " + item["LayerID"]);
        this._layoutWorker.postMessage(msg);
    }

    private layerDidDownload(layer)
    {
        let item = this._layoutQueue[0];

        console.log("Downloaded resource: " + item["URL"]);

        this._isDownloadingResource = false;

        item["Layer"] = layer;

        var key = item["Key"];
        this._layoutCache[key] = item; 

        this._checkDownloadCount();
    }

    private _checkDownloadCount()
    {
        if (this._isDownloadingResource == true) return;

        let item = this._layoutQueue[0];

        this._layoutQueue.splice(0, 1);

        var target = item["Target"];
        var completion = item["Completion"];
        var layer = item["Layer"];

        completion.call(target, layer);

        delete item["Target"];
        delete item["Completion"];

        this.checkQueue();
    }
}


export class NSPoint
{
    x = 0;
    y = 0;

    public static Zero()
    {
        var p = new NSPoint(0, 0);
        return p;
    }

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

export class NSRange 
{
    location = 0;
    length = 0;
    
    constructor(location, length) {
        this.location = location;
        this.length = length;
    }    
}

export function NSMaxRange(range:NSRange):number{
    return range.location + range.length;
 }

export function NSEqualRanges(range1:NSRange, range2:NSRange):boolean {
    return (range1.location == range2.location && range1.length == range2.length);
 }

export function NSLocationInRange(location:number, range:NSRange){
    if (range == null) return false;
    return (location >= range.location && location < NSMaxRange(range))? true : false;
 }

export function NSIntersectionRange(range1:NSRange, range2:NSRange):NSRange {

    let max1 = NSMaxRange(range1);
    let max2 = NSMaxRange(range2);
    var min, loc;
    var result;
 
    min = (max1 < max2) ? max1: max2;
    loc = (range1.location > range2.location) ? range1.location : range2.location;
 
    if(min < loc) {
        result.location = result.length = 0;
    }
    else {
        result.location = loc;
        result.length = min - loc;
    }
 
    return result;
}

export function NSUnionRange(range1:NSRange, range2:NSRange):NSRange{
    
    let max1 = NSMaxRange(range1);
    let max2 = NSMaxRange(range2); 
    
    var max,loc;
    var result;
 
    max = (max1 > max2) ? max1 : max2;
    loc = (range1.location < range2.location) ? range1.location:range2.location;
 
    result.location = loc;
    result.length = max - result.location;
    
    return result;
 }



export class NSRect
{
    origin:NSPoint = null;
    size:NSSize = null;

    public static Zero()
    {
        var f = new NSRect(NSPoint.Zero(), NSSize.Zero());
        return f;
    }

    public static rectWithValues(x, y, w, h)
    {
        var p = new NSPoint(x, y);
        var s = new NSSize(w, h);
        var f = new NSRect(p, s);

        return f;
    }
    constructor(p, s)
    {
        this.origin = p;
        this.size = s;
    }
}

function NSRectMaxY(rect:NSRect) {
    return rect.origin.y;
}

function NSRectMinY(rect:NSRect) {
    return rect.origin.y + rect.size.height;
}


export class NSSize
{
    width = 0;
    height = 0;

    public static Zero():NSSize
    {
        var s = new NSSize(0, 0);
        return s;
    }

    constructor(w, h)
    {
        this.width = w;
        this.height = h;
    }

    isEqualTo(size):boolean
    {
        if (this.width == size.width
            && this.height == size.height)
            return true;

        return false;
    }
}
/**
 * Created by godshadow on 26/3/16.
 */



export class NSObject
{
    private _className:string = null;
    getClassName():string {
        if (this._className != null) return this._className;

        this._className = this.constructor["name"];

        // let funcNameRegex = /function (.{1,})\(/;
        // let results = (funcNameRegex).exec((this).constructor.toString());        
        // this._className = (results && results.length > 1) ? results[1] : null;
        return this._className;
    }    
    
    get className():string{
        return this.getClassName();
    }

    keyPaths = {};

    init(){}

    private _notifyValueChange(key:string, type:string){
        
        let observers = this.keyPaths[key];
        if (observers == null) return;

        // copy the array so we can iterating safetly
        let obs = [];
        for(let count = 0; count < observers.length; count++) {
            let item = observers[count];
            obs.push(item);
        }        

        for(let count = 0; count < obs.length; count++) {
            let item = obs[count];
            let o = item["OBS"];            
            if (typeof o.observeValueForKeyPath === "function") {
                let keyPath = item["KP"] != null ? item["KP"]: key;
                let ctx = item["CTX"];            
                o.observeValueForKeyPath.call(o, keyPath, type, this, ctx);
            }
        }
    }

    willChangeValueForKey(key:string) {
        this.willChangeValue(key);
    }
    
    didChangeValueForKey(key:string) {
        this.didChangeValue(key);
    }

    //TODO: Remove below method
    willChangeValue(key:string) {
        this._notifyValueChange(key, "will");
    }

    didChangeValue(key:string){
        this._notifyValueChange(key, "did");
    }

    private _addObserver(obs:any, key:string, context:any, keyPath?:string) {

        let observers = this.keyPaths[key];
        if (observers == null)
        {
            observers = [];
            this.keyPaths[key] = observers;
        }

        let item = {"OBS" : obs};
        if (context != null) item["CTX"] = context;
        if (keyPath != null) item["KP"] = keyPath;
        observers.push(item);
    }

    private _keyFromKeypath(keypath:string) {

        let index = keypath.indexOf('.');
        if (index == -1) {
            return [keypath, null];
        }

        let key = keypath.substring(0, index);
        let offset = keypath.substring(index + 1);

        return [key, offset];
    }

    addObserver(obs:any, keypath:string, context?:any)
    {
        let [key, offset] = this._keyFromKeypath(keypath);
        
        if (offset == null) {
            this._addObserver(obs, key, context);
        }
        else {
            let obj = this;
            let exit = false;
            while (exit == false) {                
                if (offset == null) {
                    obj._addObserver(obs, key, context, keypath);
                    exit = true;
                }
                else  {
                    obj = this.valueForKey(key);
                    [key, offset] = this._keyFromKeypath(offset);
                }

                if (obj == null) throw new Error("ERROR: Registering observer to null object");
            }
        }
    }

    removeObserver(obs:any, keypath:string)
    {
        let observers = this.keyPaths[keypath];
        if (observers == null)
            return;

        let index = observers.indexOf(obs);
        observers.splice(index, 1);
    }

    setValueForKey(value:any, key:string) {
    
        this.willChangeValue(key);
        this[key] = value;
        this.didChangeValue(value);
    }

    valueForKey(key:string) {
        return this[key];
    }

    valueForKeyPath(keyPath:string) {

        let [key, offset] = this._keyFromKeypath(keyPath);
        
        let value = null;
        let obj = this;
        let exit = false;
        while (exit == false) {                
            if (offset == null) {
                value = obj.valueForKey(key);
                exit = true;
            }
            else  {
                obj = obj.valueForKey(key);
                [key, offset] = this._keyFromKeypath(offset);
                if (obj == null) exit = true;
            }            
        }

        return value;
    }
        

    copy() {
        let obj = NSClassFromString(this.className);
        obj.init();
        
        return obj;
    }

    performSelector(selector:string){
        return this[selector]();
    }

    performSelectorOnMainThread(selector:string, arg:any, waitUntilDone:boolean){
        this[selector](arg);
    }

}


export class NSNull extends NSObject
{            
    static nullValue():NSNull {
        var n = new NSNull();
        n.init();
        return n;
    }
}


export class NSError extends NSObject
{
    errorCode = 0;
}










/**
 * Created by godshadow on 9/4/16.
 */

export class NSBundle extends NSObject
{
    url:NSURL = null;

    private static _mainBundle = null;
    
    public static mainBundle():NSBundle{
        if (this._mainBundle == null){            
            let urlString = MIOCoreBundleGetMainURLString();

            this._mainBundle = new NSBundle();
            this._mainBundle.initWithURL(NSURL.urlWithString(urlString));
        }

        return this._mainBundle;
    }

    initWithURL(url:NSURL){
        this.url = url;
    }

    loadNibNamed(name:string, owner, options){
        let path = MIOCoreBundleGetMainURLString() + "/" + name;
        MIOCoreBundleGetContentsFromURLString(path, this, function(code, data){
            owner._didLoadNibWithLayerData(data);
        });
    }

    pathForResourceOfType(resource:string, type:string){
        return MIOCoreBundleGetAppResource(resource, type);
    }

}

export function MIOCoreBundleDownloadResource(name:string, extension:string, target, completion){        
    let resource = name + "." + extension;
    let request = NSURLRequest.requestWithURL(NSURL.urlWithString(resource));
    let con = new NSURLConnection();
    con.initWithRequestBlock(request, target, function(code, data){
        if (code == 200) {                
            MIOCoreBundleSetAppResource(name, extension, data);
        }
        completion.call(target, data);
    });        

}







export interface NSCoding
{
    initWithCoder?(coder:NSCoder):void;
    encodeWithCoder?(coder:NSCoder):void;
}

export class NSCoder extends NSObject
{
    decodeIntegerForKey(key:string):any{

    }

    decodeObjectForKey(key:string):any{

    }
}





export class NSKeyedUnarchiver extends NSCoder
{
    static unarchiveTopLevelObjectWithData(data:string){
        let coder = new NSKeyedUnarchiver();
        coder.init();

        return coder._parseData(data, null);
    }

    private objects = null;
    _parseData(data:string, error){
        let items = NSPropertyListSerialization.propertyListWithData(data, 0, 0, null);

        this.objects = items["$objects"];
        let rootIndex = items["$top"]["$0"]["CF$UID"];

        let rootInfo = this.objects[rootIndex];
        let obj = this.createObjectFromInfo(rootInfo);

        return obj;
    }

    private classFromInfo(info){
        let name = info["$classname"];
        if (name == null) {
            let index = info["$class"]["CF$UID"];            
            let objInfo = this.objects[index];
            name = this.classFromInfo(objInfo);
        }

        return name;
    }
    private createObjectFromInfo(info){
        let classname = this.classFromInfo(info);                

        switch (classname){
            case "NSMutableArray":
            case "NSArray":
            return this.createArray(info);            

            case "NSMutableDictionary":
            case "NSDictionary":
            return this.createDictionary(info);

            default:                        
            return this.createObject(classname, info);
        }

        
    }

    private currentInfo = null;
    private createObject(classname, info){
        let obj = NSClassFromString(classname);
        this.currentInfo = info;
        obj.initWithCoder(this);
        this.currentInfo = null;

        return obj;
    }

    decodeObjectForKey(key:string){        
        let obj = this.valueFromInfo(this.currentInfo[key]);                                    
        return obj;
    }

    private createArray(info){
        let objects = info["NS.objects"];
        let array = [];
        for (let index = 0; index < objects.length; index++){
            let value = this.valueFromInfo(objects[index]);                                    
            array.push(value);
        }

        return array;
    }
    
    private createDictionary(info){
        let keys = info["NS.keys"];
        let objects = info["NS.objects"];

        let dict = {};
        for (let index = 0; index < keys.length; index++){
            let k = this.valueFromInfo(keys[index]);
            let v = this.valueFromInfo(objects[index]); 
            dict[k] = v;           
        }

        return dict;
    }

    private valueFromInfo(info){
        let index = info["CF$UID"];
        let value = this.objects[index];

        if (typeof value === "boolean") return value;
        if (typeof value === "number") return value;
        if (typeof value === "string" && value != "$null") return value;
        if (typeof value === "string" && value == "$null") return null;
        
        //TODO: Check for date

        return this.createObjectFromInfo(value);
    }

}


export class NSNumber extends NSObject
{    
    static numberWithBool(value):NSNumber{
        let n = new NSNumber();
        n.initWithBool(value);
        return n;                
    }

    static numberWithInteger(value):NSNumber{
        let n = new NSNumber();
        n.initWithInteger(value);
        return n;        
    }

    static numberWithFloat(value):NSNumber{
        let n = new NSNumber();
        n.initWithFloat(value);
        return n;
    }

    protected storeValue = null;

    initWithBool(value){
        if (isNaN(value) || value == null) {
            this.storeValue = 1;
        }
        else {
            this.storeValue = value ? 0 : 1;
        }
    }

    initWithInteger(value){
        if (isNaN(value) || value == null) {
            this.storeValue = 0;
        }
        else {
            this.storeValue = value;
        }
    }

    initWithFloat(value){
        if (isNaN(value) || value == null) {
            this.storeValue = 0.0;
        }
        else {
            this.storeValue = value;
        }
    }

}


import { Decimal } from 'decimal.js';

export class NSDecimalNumber extends NSNumber
{
    static decimalNumberWithString(str:string):NSDecimalNumber{
        let dn = new NSDecimalNumber();
        dn.initWithString(str);
        return dn;
    }

    static one ():NSDecimalNumber {
        return NSDecimalNumber.numberWithInteger(1);
    }

    static zero():NSDecimalNumber {
        return NSDecimalNumber.numberWithInteger(0);
    }

    // static subclasses from NSnumber
    static numberWithBool(value):NSDecimalNumber{
        let n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;                
    }

    static numberWithInteger(value):NSDecimalNumber{
        let n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;        
    }

    static numberWithFloat(value):NSDecimalNumber{
        let n = new NSDecimalNumber();
        n._initWithValue(value);
        return n;
    }
    
    initWithString(str:string){
        this._initWithValue(str);
    }

    initWithDecimal(value){
        super.init();
        if (isNaN(value) || value == null) {
            this.storeValue = new Decimal(0);
        }
        else {
            this.storeValue = value;
        }
    }

    _initWithValue(value){
        super.init();
        this.storeValue = new Decimal(value||0);
    }

    decimalNumberByAdding(value:NSDecimalNumber){
        let dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.add(value.storeValue));
        return dv;
    }

    decimalNumberBySubtracting(value:NSDecimalNumber){
        let dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.sub(value.storeValue));
        return dv;        
    }

    decimalNumberByMultiplyingBy(value:NSDecimalNumber){
        let dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.mul(value.storeValue));
        return dv;        
    }

    decimalNumberByDividingBy(value:NSDecimalNumber){
        let dv = new NSDecimalNumber();
        dv.initWithDecimal(this.storeValue.div(value.storeValue));
        return dv;        
    }

    get decimalValue(){
        return this.storeValue.toNumber();
    }

    get floatValue(){
        return this.storeValue.toNumber();
    }
}




String.prototype.lastPathComponent = function() {
    return MIOCoreStringLastPathComponent(this);    
}

String.prototype.pathExtension = function(){
    return MIOCoreStringPathExtension(this);
} 

String.prototype.stringByAppendingPathComponent = function(path:string):string{
    return MIOCoreStringAppendPathComponent(this, path);
}

String.prototype.stringByDeletingLastPathComponent = function():string{
    return MIOCoreStringDeletingLastPathComponent(this);
}

String.prototype.hasPreffix = function(preffix:string):boolean{
    return MIOCoreStringHasPreffix(this, preffix);
}

String.prototype.hasSuffix = function(suffix:string):boolean{
    return MIOCoreStringHasSuffix(this, suffix);
}

export function NSLocalizeString(key:string, defaultValue:string)
{
    return MIOCoreStringLocalizeString(key, defaultValue);
}



/**
 * Created by godshadow on 11/3/16.
 */

export enum NSDateFirstWeekDay{
    Sunday,
    Monday
}

var _NSDateFirstWeekDay = NSDateFirstWeekDay.Monday;
var _NSDateStringDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
var _NSDateStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function NSDateSetFirstWeekDay(day:NSDateFirstWeekDay){

    _NSDateFirstWeekDay = day;
    if (day == NSDateFirstWeekDay.Sunday)
        _NSDateStringDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    else
        _NSDateStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
}

export function NSDateGetStringForMonth(month)
{
    return _NSDateStringMonths[month];
}

export function NSDateGetStringForDay(day:number)
{
    return _NSDateStringDays[day];
}

export function NSDateGetDayFromDate(date) 
{
    if (_NSDateFirstWeekDay == NSDateFirstWeekDay.Sunday) return date.getDay();    

    // Transform to start on Monday instead of Sunday
    // 0 - Mon, 1 - Tue, 2 - Wed, 3 - Thu, 4 - Fri, 5 - Sat, 6 - Sun
    let day = date.getDay();
    if (day == 0)
        day = 6;
    else
        day--;

    return day;
}

export function NSDateGetMonthFromDate(date:Date)
{
    return date.getMonth();
}

export function NSDateGetYearFromDate(date:Date)
{
    return date.getFullYear();
}

export function NSDateGetDayStringFromDate(date) 
{
    var day = NSDateGetDayFromDate(date);
    return NSDateGetStringForDay(day);
}

export function NSDateGetString(date)
{
    var d = NSDateGetDateString(date);
    var t = NSDateGetTimeString(date);

    return d + " " + t;
}

export function NSDateGetDateString(date)
{
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    return yyyy + "-" +(mm[1]?mm:"0"+mm[0]) + "-" +  (dd[1]?dd:"0"+dd[0]); // padding
}

export function NSDateGetTimeString(date)
{
    var hh = date.getHours().toString();
    var mm = date.getMinutes().toString();
    return (hh[1]?hh:"0"+hh[0]) + ":" + (mm[1]?mm:"0"+mm[0]);
}

export function NSDateGetUTCString(date)
{
    var d = NSDateGetUTCDateString(date);
    var t = NSDateGetUTCTimeString(date);

    return d + " " + t;
}

export function NSDateGetUTCDateString(date)
{
    var yyyy = date.getUTCFullYear().toString();
    var mm = (date.getUTCMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getUTCDate().toString();
    return yyyy + "-" +(mm[1]?mm:"0"+mm[0]) + "-" +  (dd[1]?dd:"0"+dd[0]); // padding
}

export function NSDateGetUTCTimeString(date)
{
    var hh = date.getUTCHours().toString();
    var mm = date.getUTCMinutes().toString();
    var ss = date.getUTCSeconds().toString();
    return (hh[1]?hh:"0" + hh[0]) + ":" + (mm[1]?mm:"0" + mm[0]) + ":" + (ss[1]?ss:"0" + ss[0]);
}

export function NSDateFromString(string)
{
    let lexer = new MIOCoreLexer(string);
    
    // Values    
    // lexer.addTokenType(0, /^([0-9]{2,4})-/i); // Year
    // lexer.addTokenType(1, /^[0-9]{1,2}-/i); // Month
    // lexer.addTokenType(2, /^[0-9]{1,2} /i); // day

    // lexer.addTokenType(3, /^[0-9]{1,2}:/i); // hh // mm
    // lexer.addTokenType(4, /^[0-9]{1,2}/i); // ss
    
    lexer.addTokenType(0, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/i); // yyyy-MM-dd hh:mm:ss
    lexer.addTokenType(1, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2})/i); // yyyy-MM-dd hh:mm 
    lexer.addTokenType(2, /^([0-9]{2,4})-([0-9]{1,2})-([0-9]{1,2})/i); // yyyy-MM-dd    

    lexer.tokenize();

    let y = -1;
    let m = -1;
    let d = -1;
    let h = -1;
    let mm = -1;
    let s = -1;

    let token = lexer.nextToken();
    while(token != null){

        switch (token.type) {

            case 0:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                h = token.matches[4];
                mm = token.matches[5];
                s = token.matches[6];
                break;

            case 1:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                h = token.matches[4];
                mm = token.matches[5];
                break;

            case 2:
                y = token.matches[1];
                m = token.matches[2] - 1; // Month start by index 0
                d = token.matches[3];
                break;

            default:
                return null;
        }

        token = lexer.nextToken();
    }

    if (h == -1) h = 0;
    if (mm == -1) mm = 0;
    if (s == -1) s = 0;

    let date = new Date(y, m, d, h, mm, s);
    return date;
}

export function NSDateToUTC(date)
{
    var dif = date.getTimezoneOffset();
    let d = new Date();
    d.setTime(date.getTime() + (dif * 60 * 1000));

    return d;
}

export function NSDateAddDaysToDateString(dateString, days)
{
    var d = NSDateFromString(dateString);
    d.setDate(d.getDate() + parseInt(days));
    var ds = NSDateGetDateString(d);

    return ds;
}

export function NSDateRemoveDaysToDateString(dateString, days)
{
    var d = NSDateFromString(dateString);
    d.setDate(d.getDate() - parseInt(days));
    var ds = NSDateGetDateString(d);

    return ds;
}


export function NSDateFromMiliseconds(miliseconds){
  var mEpoch = parseInt(miliseconds); 
  if(mEpoch<10000000000) mEpoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
  var ds = new Date();
  ds.setTime(mEpoch)
  return ds;
}

export function isDate (x) 
{ 
  return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate); 
}

export function NSDateToday(){
    var d = new Date();
    d.setHours(0,0,0);
    return d;
}
export function NSDateNow(){
    return new Date();
}
export function NSDateTodayString(){
    let d = NSDateToday();
    return NSDateGetString(d);
}

export function NSDateYesterday(){
    let d = new Date();
    d.setDate(d.getDate() - 1);
    d.setHours(0,0,0);
    return d;
}

export function NSDateTomorrow(){
    let d = new Date();
    d.setDate(d.getDate() + 1);
    d.setHours(0,0,0);
    return d;
}

export function NSDateGetFirstDayOfTheWeek(date:Date){

    let dayString = NSDateGetDateString(date);
    // TODO: Check sunday start or monday start
    let firstDayString = NSDateRemoveDaysToDateString(dayString, date.getDay() - 1);
    let first = NSDateFromString(firstDayString);

    return first;
}

export function NSDateGetLastDayOfTheWeek(date:Date){

    let dayString = NSDateGetDateString(date);
    // TODO: Check sunday start or monday start
    let lastDayString = NSDateAddDaysToDateString(dayString, (7 - date.getDay()));
    let last = NSDateFromString(lastDayString);

    return last;
}

export function NSDateGetFirstDateOfTheMonth(month, year):Date{
    return new Date(year, month, 1);    
}

export function NSDateGetFirstDayOfTheMonth(month, year){
    let d = NSDateGetFirstDateOfTheMonth(month, year);
    return d.getDate();
}

export function NSDateGetLastDateOfTheMonth(month, year):Date{
    return new Date(year, month + 1, 0);
}

export function NSDateGetLastDayOfTheMonth(month, year){
    let d = NSDateGetLastDateOfTheMonth(month, year);
    return d.getDate();
}

export function NSDateCopy(date:Date):Date{    
    return new Date(date.getTime());
}


/**
 * Created by godshadow on 15/3/16.
 */

export class NSUUID extends NSObject
{
    // Deprecated
    static UUID():NSUUID{
        let uuid = new NSUUID();
        uuid.init();

        return uuid;
    }

    private _uuid = null;
    init(){
        this._uuid = _create_UUID();
    }

    get UUIDString():string{
        return this._uuid;
    }

}

function _create_UUID() 
{
    let d = new Date().getTime();
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    return uuid.toUpperCase();
}




Array.prototype.addObject = function(){
    return this.length;
}

Array.prototype.addObject = function(object){
    this.push(object);
}

Array.prototype.removeObject = function(object){
    let index = this.indexOf(object);
    if (index > -1) {
        this.splice(index, 1);
    }
}

Array.prototype.removeObjectAtIndex = function(index){        
    this.splice(index, 1);    
}

Array.prototype.indexOfObject = function(object){
    return this.indexOf(object);
}

Array.prototype.containsObject = function(object):boolean{
    let index = this.indexOf(object);
    return index > -1 ? true : false;
}

Array.prototype.objectAtIndex = function(index){
    return this[index];
}

Object.defineProperty(Array.prototype, "count", {
    get: function () {
        return this.length;
    },
    enumerable: true,
    configurable: true
})

Array.prototype.firstObject = function(){
    return this[0];
}

Array.prototype.lastObject = function(){
    return this[this.count - 1];
}





/**
 * Created by godshadow on 1/5/16.
 */

export enum NSPredicateComparatorType {
    Equal,
    Less,
    LessOrEqual,
    Greater,
    GreaterOrEqual,
    Distinct,    
    Contains,
    NotContains,
    In,
    NotIn    
}

export enum NSPredicateRelationshipOperatorType {
    ANY,
    ALL
}

export enum NSPredicateOperatorType {
    OR,
    AND
}

export enum NSPredicateBitwiseOperatorType {
    OR,
    AND,
    XOR
}

export enum NSPredicateType {
    Predicate,
    Item,
    Operation
}

export class NSPredicateOperator {
    type = null;

    public static andPredicateOperatorType() {
        let op = new NSPredicateOperator(NSPredicateOperatorType.AND);
        return op;
    }

    public static orPredicateOperatorType() {
        let op = new NSPredicateOperator(NSPredicateOperatorType.OR);
        return op;
    }

    constructor(type) {
        this.type = type;
    }    
}

export enum NSPredicateItemValueType {
    
    Undefined,
    UUID,
    String,
    Number,
    Boolean,    
    Null,
    Property
}

export class NSPredicateItem {
    relationshipOperation:NSPredicateRelationshipOperatorType = null;
    bitwiseOperation:NSPredicateBitwiseOperatorType = null;
    bitwiseKey:string = null;
    bitwiseValue = null;
    key = null;
    comparator = null;
    value = null;
    valueType = NSPredicateItemValueType.Undefined;

    evaluateObject(object, key?, lvalue?) {

        let lValue = lvalue;        
        if (lvalue == null) {
            let k = key != null ? key : this.key;            
            if (object instanceof NSObject) {
                lValue = object.valueForKeyPath(k);
            }
            else {
                lValue = object[k];
            }
            
            if (lValue instanceof Date) {
                let sdf = new NSISO8601DateFormatter();
                sdf.init();
                lValue = sdf.stringFromDate(lValue);
            }
            else if (typeof lValue === "string") {
                lValue = lValue.toLocaleLowerCase();
            }    
        }

        let rValue = this.value;
        if (this.valueType == NSPredicateItemValueType.Property){
            rValue = object.valueForKeyPath(rValue);
        }
        if (typeof rValue === "string") {
            rValue = rValue.toLocaleLowerCase();
        }
        
        if (this.comparator == NSPredicateComparatorType.Equal)
            return (lValue == rValue);
        else if (this.comparator == NSPredicateComparatorType.Distinct)
            return (lValue != rValue);
        else if (this.comparator == NSPredicateComparatorType.Less)
            return (lValue < rValue);
        else if (this.comparator == NSPredicateComparatorType.LessOrEqual)
            return (lValue <= rValue);        
        else if (this.comparator == NSPredicateComparatorType.Greater)
            return (lValue > rValue);
        else if (this.comparator == NSPredicateComparatorType.GreaterOrEqual)
            return (lValue >= rValue);        
        else if (this.comparator == NSPredicateComparatorType.Contains) {
            if (lValue == null)
                return false;

            if (lValue.indexOf(rValue) > -1)
                return true;

            return false;
        }
        else if (this.comparator == NSPredicateComparatorType.NotContains) {
            if (lValue == null)
                return true;

            if (lValue.indexOf(rValue) > -1)
                return false;

            return true;
        }
    }

    evaluateRelationshipObject(object){
        let relObjs = null;
        let keys = this.key.split('.');
        let lastKey = keys[keys.length - 1];
        if (keys.length > 1) {            
            let relKey = this.key.substring(0, this.key.length - lastKey.length - 1);
            relObjs = object.valueForKeyPath(relKey);
        }
        else {
            relObjs = object.valueForKeyPath(this.key);
        }
                       
        for (let index = 0; index < relObjs.count; index++) {
            let o = relObjs.objectAtIndex(index);
            let result = this.evaluateObject(o, lastKey);
            if (result == true && this.relationshipOperation == NSPredicateRelationshipOperatorType.ANY) {
                return true;
            }
            else if (result == false && this.relationshipOperation == NSPredicateRelationshipOperatorType.ALL) {
                return false;
            }
        }
        
        return false;        
    }

    // HACK: Dirty hack to bitwaire comparate more than 32bits    


    evaluateBitwaseOperatorObject(object){        
        let lvalue = object.valueForKeyPath(this.bitwiseKey);         
        let rvalue =  parseInt(this.bitwiseValue);
        
        let value = 0;
        if (this.bitwiseOperation == NSPredicateBitwiseOperatorType.AND){
            value = lvalue & rvalue;
        }
        else if (this.bitwiseOperation == NSPredicateBitwiseOperatorType.OR){
            value = lvalue | rvalue;
        }

        return this.evaluateObject(object, null, value);        
    }
}

export class NSPredicateGroup {

    predicates = [];

    evaluateObject(object):boolean {
        
        let result = false;
        let op = null;
        let lastResult = null;

        for (let count = 0; count < this.predicates.length; count++) {
            let o = this.predicates[count];

            if (o instanceof NSPredicateGroup) {
                result = o.evaluateObject(object);
            }
            else if (o instanceof NSPredicateItem) {
                if (o.relationshipOperation != null) {
                    result = o.evaluateRelationshipObject(object);                    
                }
                else if (o.bitwiseOperation != null){
                    result = o.evaluateBitwaseOperatorObject(object);
                }
                else {
                    result = o.evaluateObject(object);
                }
            }
            else if (o instanceof NSPredicateOperator) {
                op = o.type;
                lastResult = result;
                result = null;
            }
            else {
                throw new Error(`NSPredicate: Error. Predicate class type invalid. (${o})`);
            }

            if (op != null && result != null) {
                if (op == NSPredicateOperatorType.AND) {
                    result = result && lastResult;
                    op = null;
                    if (result == false)
                        break;
                }
                else if (op == NSPredicateOperatorType.OR) {
                    result = result || lastResult;
                    op = null;
                }
            }
        }

        return result;
    }
}

export enum NSPredicateTokenType{
    Identifier,
    
    UUIDValue,
    StringValue,
    NumberValue,
    BooleanValue,    
    NullValue,
    PropertyValue,

    MinorOrEqualComparator,
    MinorComparator,
    MajorOrEqualComparator,
    MajorComparator,
    EqualComparator,
    DistinctComparator,
    ContainsComparator,
    NotContainsComparator,
    InComparator,
    NotIntComparator,    

    BitwiseAND,
    BitwiseOR,
    
    OpenParenthesisSymbol,
    CloseParenthesisSymbol,
    Whitespace,

    AND,
    OR,

    ANY,
    ALL
}

export class NSPredicate extends NSObject {
     
    predicateGroup = null;    

    private lexer:MIOCoreLexer = null;

    public static predicateWithFormat(format) {
        let p = new NSPredicate();
        p.initWithFormat(format);

        return p;
    }

    initWithFormat(format) {
        this._predicateFormat = format;
        this.parse(format);
    }

    private _predicateFormat:string = null;
    get predicateFormat(){
        return this._predicateFormat;
    }

    evaluateObject(object:NSObject) {        
        return this.predicateGroup.evaluateObject(object);
    }

    // 
    // Parse format string
    //

    private tokenizeWithFormat(format:string){
        
        this.lexer = new MIOCoreLexer(format);
        
        // Values
        
        this.lexer.addTokenType(NSPredicateTokenType.UUIDValue, /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
        this.lexer.addTokenType(NSPredicateTokenType.StringValue, /^"([^"]*)"|^'([^']*)'/);

        this.lexer.addTokenType(NSPredicateTokenType.NumberValue, /^-?\d+(?:\.\d+)?(?:e[+\-]?\d+)?/i);
        this.lexer.addTokenType(NSPredicateTokenType.BooleanValue, /^(true|false)/i);
        this.lexer.addTokenType(NSPredicateTokenType.NullValue, /^(null|nil)/i);
        // Symbols
        this.lexer.addTokenType(NSPredicateTokenType.OpenParenthesisSymbol, /^\(/);
        this.lexer.addTokenType(NSPredicateTokenType.CloseParenthesisSymbol, /^\)/);
        // Comparators
        this.lexer.addTokenType(NSPredicateTokenType.MinorOrEqualComparator, /^<=/);
        this.lexer.addTokenType(NSPredicateTokenType.MinorComparator, /^</);
        this.lexer.addTokenType(NSPredicateTokenType.MajorOrEqualComparator, /^>=/);
        this.lexer.addTokenType(NSPredicateTokenType.MajorComparator, /^>/);
        this.lexer.addTokenType(NSPredicateTokenType.EqualComparator, /^==?/);
        this.lexer.addTokenType(NSPredicateTokenType.DistinctComparator, /^!=/);
        this.lexer.addTokenType(NSPredicateTokenType.NotContainsComparator, /^not contains /i);
        this.lexer.addTokenType(NSPredicateTokenType.ContainsComparator, /^contains /i);
        this.lexer.addTokenType(NSPredicateTokenType.InComparator, /^in /i);
        // Bitwise operators
        this.lexer.addTokenType(NSPredicateTokenType.BitwiseAND, /^& /i);
        this.lexer.addTokenType(NSPredicateTokenType.BitwiseOR, /^\| /i);                
        // Join operators
        this.lexer.addTokenType(NSPredicateTokenType.AND, /^(and|&&) /i);
        this.lexer.addTokenType(NSPredicateTokenType.OR, /^(or|\|\|) /i);        
        // Relationship operators
        this.lexer.addTokenType(NSPredicateTokenType.ANY, /^any /i);
        this.lexer.addTokenType(NSPredicateTokenType.ALL, /^all /i);
        // Extra
        this.lexer.addTokenType(NSPredicateTokenType.Whitespace, /^\s+/);        
        this.lexer.ignoreTokenType(NSPredicateTokenType.Whitespace);
        // Identifiers - Has to be the last one
        this.lexer.addTokenType(NSPredicateTokenType.Identifier, /^[a-zA-Z-_][a-zA-Z0-9-_\.]*/);            

        this.lexer.tokenize();
    }    

    private parse(format:string){

        console.log("**** Start predicate format parser")
        console.log(format);
        console.log("****")
        
        this.tokenizeWithFormat(format);
        this.predicateGroup = new NSPredicateGroup();
        this.predicateGroup.predicates = this.parsePredicates();
        
        console.log("**** End predicate format parser")
    }

    private parsePredicates(){

        let token = this.lexer.nextToken();
        let predicates = [];
        let exit = false;

        while (token != null && exit == false) {
            
            switch (token.type) {

                case NSPredicateTokenType.Identifier:
                    let pi = this.nextPredicateItem();
                    predicates.push(pi);
                    break;

                case NSPredicateTokenType.AND:
                    predicates.push(NSPredicateOperator.andPredicateOperatorType());
                    break;

                case NSPredicateTokenType.OR:
                    predicates.push(NSPredicateOperator.orPredicateOperatorType());
                    break;
                    
                case NSPredicateTokenType.ANY:
                    this.lexer.nextToken();
                    let anyPI = this.nextPredicateItem();
                    anyPI.relationshipOperation = NSPredicateRelationshipOperatorType.ANY;
                    predicates.push(anyPI);
                    break;

                case NSPredicateTokenType.ALL:
                    this.lexer.nextToken();
                    let allPI = this.nextPredicateItem();
                    anyPI.relationshipOperation = NSPredicateRelationshipOperatorType.ALL;
                    predicates.push(anyPI);
                    break;

                case NSPredicateTokenType.OpenParenthesisSymbol:
                    let pg = new NSPredicateGroup();
                    pg.predicates = this.parsePredicates();
                    predicates.push(pg);
                    break;

                case NSPredicateTokenType.CloseParenthesisSymbol:
                    exit = true;
                    break;

                default:
                    throw new Error(`NSPredicate: Error. Unexpected token. (${token.value})`);
            }

            if (exit != true) {
                token = this.lexer.nextToken();
            }
        }

        return predicates;
    }

    private nextPredicateItem(){
        let pi = new NSPredicateItem();
        this.lexer.prevToken();
        this.property(pi);
        this.comparator(pi);
        this.value(pi);
        return pi;
    }    

    private property(item:NSPredicateItem) {
        
        let token = this.lexer.nextToken();

        switch (token.type) {

            case NSPredicateTokenType.Identifier:
                item.key = token.value;
                break;

            default:
                throw new Error(`NSPredicate: Error. Unexpected identifier key. (${token.value})`);
        }                    
    }

    private comparator(item:NSPredicateItem) {
        
        let token = this.lexer.nextToken();

        switch(token.type) {

            case NSPredicateTokenType.EqualComparator:
                item.comparator = NSPredicateComparatorType.Equal;
                break;

            case NSPredicateTokenType.MajorComparator:
                item.comparator = NSPredicateComparatorType.Greater;
                break;

            case NSPredicateTokenType.MajorOrEqualComparator:
                item.comparator = NSPredicateComparatorType.GreaterOrEqual;
                break;

            case NSPredicateTokenType.MinorComparator:
                item.comparator = NSPredicateComparatorType.Less;
                break;
                
            case NSPredicateTokenType.MinorOrEqualComparator:
                item.comparator = NSPredicateComparatorType.LessOrEqual;
                break;

            case NSPredicateTokenType.DistinctComparator:
                item.comparator = NSPredicateComparatorType.Distinct;
                break;

            case NSPredicateTokenType.ContainsComparator:
                item.comparator = NSPredicateComparatorType.Contains;
                break;

            case NSPredicateTokenType.NotContainsComparator:
                item.comparator = NSPredicateComparatorType.NotContains;
                break;                

            case NSPredicateTokenType.InComparator:
                item.comparator = NSPredicateComparatorType.In;
                break;

            case NSPredicateTokenType.BitwiseAND:
                item.bitwiseOperation = NSPredicateBitwiseOperatorType.AND;
                item.bitwiseKey = item.key;
                item.key += " & ";
                token = this.lexer.nextToken();
                item.bitwiseValue = token.value;
                item.key += token.value;                
                this.comparator(item);                
                break;

            case NSPredicateTokenType.BitwiseOR:
                item.bitwiseOperation = NSPredicateBitwiseOperatorType.OR;
                item.bitwiseKey = item.key;
                item.key += " & ";
                token = this.lexer.nextToken();
                item.bitwiseValue = token.value;
                item.key += token.value;                
                this.comparator(item);                
                break;

            default:
                throw new Error(`NSPredicate: Error. Unexpected comparator. (${token.value})`);                                
        }

    }

    private value(item:NSPredicateItem) {

        let token = this.lexer.nextToken();
        
        switch(token.type) {
            
            case NSPredicateTokenType.UUIDValue:
                item.value = token.value;
                item.valueType = NSPredicateItemValueType.UUID;
                break;
            
            case NSPredicateTokenType.StringValue:
                item.value = token.value.substring(1, token.value.length - 1);
                item.valueType = NSPredicateItemValueType.String;
                break;

            case NSPredicateTokenType.NumberValue:
                item.value = token.value;
                item.valueType = NSPredicateItemValueType.Number;
                break;

            case NSPredicateTokenType.BooleanValue:
                item.value = this.booleanFromString(token.value);
                item.valueType = NSPredicateItemValueType.Boolean;
                break;

            case NSPredicateTokenType.NullValue:
                item.value = this.nullFromString(token.value);
                item.valueType = NSPredicateItemValueType.Null;
                break;

            case NSPredicateTokenType.Identifier:
                item.value = token.value;
                item.valueType = NSPredicateItemValueType.Property;
                break;

            default:
                throw new Error(`NSPredicate: Error. Unexpected comparator. (${token.value})`);
        }            
    }

    private booleanFromString(value:string){

        let v = value.toLocaleLowerCase();
        let bv = false;
        
        switch (v) {

            case "yes":
            case "true":
                bv = true;
                break;

            case "no":
            case "false":
                bv = false;
                break;

            default:
                throw new Error(`NSPredicate: Error. Can't convert '${value}' to boolean`);
        }

        return bv;
    }

    private nullFromString(value:string){

        let v = value.toLocaleLowerCase();
        let nv = null;

        switch (v) {

            case "nil":
            case "null":
                nv = null;
                break;

            default:
                throw new Error(`NSPredicate: Error. Can't convert '${value}' to null`);
        }

        return nv;
    }
}

//
// For internal purposes: Don't use it, could change
//

export function _NSPredicateFilterObjects(objs, predicate)
{
    if (objs == null) return [];

    let resultObjects = null;    

    if (objs.length == 0 || predicate == null) {
        resultObjects = objs.slice(0);        
    } 
    else {    
        
        resultObjects = objs.filter(function(obj){

            let result = predicate.evaluateObject(obj);
            if (result)
                return obj;
        });
    }

    return resultObjects;
}






export class NSSet extends NSObject {

    static set() {

        let s = new NSSet();
        s.init();

        return s;
    }

    private _objects = [];

    addObject(object){
        if (this._objects.containsObject(object) == true) return;        
        this._objects.addObject(object);
    }

    removeObject(object){
        if (this._objects.containsObject(object) == false) return;        
        this._objects.removeObject(object);
    }

    removeAllObjects(){
        this._objects = [];
    }

    indexOfObject(object) {
        return this._objects.indexOf(object);
    }

    containsObject(object){
        return this._objects.indexOfObject(object) > -1 ? true : false;
    }

    objectAtIndex(index){
        return this._objects[index];
    }

    get allObjects(){
        return this._objects;
    }

    get count(){
        return this._objects.length;
    }

    get length(){
        return this._objects.length;
    }    

    copy():NSSet{
         
        let set = new NSSet();
        set.init();

        for (var index = 0; index < this._objects.length; index++){
            var obj = this._objects[index];
            set.addObject(obj);
        }

        return set;
    }

    filterWithPredicate(predicate:NSPredicate) {
        var objs = _NSPredicateFilterObjects(this._objects, predicate);
        return objs;
    }

    // Prevent KVO on special properties
    addObserver(obs, keypath:string, context?){
        if (keypath == "count" || keypath == "length") throw new Error("NSSet: Can't observe count. It's not KVO Compilant"); 
        super.addObserver(obs, keypath, context);
    }
    

}



export function NSIndexPathEqual(indexPath1:NSIndexPath, indexPath2:NSIndexPath):boolean {

    //TODO: CHECK REAL INDEX PATH
    if (indexPath1 == null || indexPath2 == null) return false;

    if (indexPath1.section == indexPath2.section
        && indexPath1.row == indexPath2.row){
            return true;
    }

    return false;
}

export class NSIndexPath extends NSObject
{
    static indexForRowInSection(row:number, section:number){
        let ip = new NSIndexPath();
        ip.add(section);
        ip.add(row);
        return ip;
    }

    static indexForColumnInRowAndSection(column:number, row:number, section:number){
        let ip = NSIndexPath.indexForRowInSection(row, section);
        ip.add(column);
        return ip;
    }

    private indexes = [];

    add(value:number){
        this.indexes.push(value);
    }

    get section(){
        return this.indexes[0];
    }

    get row(){
        return this.indexes[1];
    }

    get item(){
        return this.indexes[1];
    }

    get column(){
        return this.indexes[2];
    }

    isEqualToIndexPath(indexPath:NSIndexPath){
        return NSIndexPathEqual(this, indexPath);
    }
}


/**
 * Created by godshadow on 30/3/16.
 */

var _NS_currentLocale;

export class NSLocale extends NSObject
{
    languageIdentifier = "es";
    countryIdentifier = "ES";

    public static currentLocale(){
        if (_NS_currentLocale == null) {
            _NS_currentLocale = new NSLocale();
            _NS_currentLocale.initWithLocaleIdentifier("es_ES");
        }
        //return NSWebApplication.sharedInstance().currentLanguage;

        return _NS_currentLocale;
    }

    public static _setCurrentLocale(localeIdentifier:string){
        _NS_currentLocale = new NSLocale();
        _NS_currentLocale.initWithLocaleIdentifier(localeIdentifier);
    }

    initWithLocaleIdentifier(identifer:string) {

        let array = identifer.split("_");
        if (array.length == 1) {
            this.languageIdentifier = array[0];
        }
        else if (array.length == 2) {
            this.languageIdentifier = array[0];
            this.countryIdentifier = array[1];
        }
    }

    get decimalSeparator():string{

        let ds = "";
        
        switch (this.countryIdentifier) {

            case "ES":
                ds =  ",";
                break;

            case "US":
                ds =  ".";
                break;

            case "UK":
                ds =  ".";
                break;     
                
            case "AE":
                ds = ".";
                break;
        }

        return ds;
    }

    get currencySymbol():string {

        let cs = "";

        switch(this.countryIdentifier) {

            case "ES":
            case "DE":
            case "FR":
            case "IT":
            case "NL":
                cs = "€";
                break;

            case "US":
                cs = "$";
                break;

            case "UK":
                cs = "£";
                break;
        }

        return cs;
    }

    get currencyCode(){
        let cc = "";

        switch(this.countryIdentifier){
            case "ES":                
            case "DE":
            case "FR":
            case "IT":
            case "NL":
                cc = "EUR";
                break;

            case "US":
                cc = "USD";
                break;

            case "UK":
                cc = "GBP";
                break;

            case "AE":
                cc = "AED";
        }

        return cc;
    }

    get groupingSeparator():string {

        let gs = "";

        switch(this.countryIdentifier){

            case "ES":
                gs = ".";
                break;

            case "US":
                gs = ",";
                break;

            case "UK":
                gs = ",";
                break;

            case "AE":
                gs = ",";
                break;
        }

        return gs;
    }
}






export class NSFormatter extends NSObject {

    stringForObjectValue(value) {
        return value;
    }

    getObjectValueForString(str:string) {

    }

    editingStringForObjectValue(value) {

    }

    isPartialStringValid(str:string):[boolean, string]{

        var newStr = "";
        
        return [false, newStr];
    }
}




export enum NSDateFormatterStyle {
    NoStyle,
    ShortStyle,
    MediumStyle,
    LongStyle,
    FullStyle
}

export class NSDateFormatter extends NSFormatter {

    dateStyle = NSDateFormatterStyle.ShortStyle;
    timeStyle = NSDateFormatterStyle.ShortStyle;    

    private browserDateSeparatorSymbol:string = null;

    init(){
        super.init();

        let browser = MIOCoreGetPlatform();
        if (browser == MIOCorePlatformType.Safari)
            this.browserDateSeparatorSymbol = "/";
        else 
            this.browserDateSeparatorSymbol = "-";
    }

    dateFromString(str:string):Date {

        let result, value, dateString;

        if(!str || str.length <= 0) return null;
        
        [result, value, dateString] = this._parse(str);
        if (result == true) {
            var date = Date.parse(dateString);
            return  isNaN(date) == false? new Date(dateString) : null;
        }

        return null;
    }

    stringFromDate(date:Date):string {
        return this.stringForObjectValue(date);
    }

    stringForObjectValue(value):string {

        let date = value as Date;
        if (date == null) return null;

        var str = "";
        
        switch (this.dateStyle) {

            case NSDateFormatterStyle.ShortStyle:
                str = this._shortDateStyle(date);
                break;

            case NSDateFormatterStyle.FullStyle:
                str = this._fullDateStyle(date);
                break;
        }        

        if (this.dateStyle != NSDateFormatterStyle.NoStyle && this.timeStyle != NSDateFormatterStyle.NoStyle)
            str += " ";

        switch (this.timeStyle) {
            
            case NSDateFormatterStyle.ShortStyle:
                str += this._shortTimeStyle(date);
                break;
        }

        return str;
    }

    isPartialStringValid(str:string):[boolean, string]{

        if (str.length == 0) return [true, str];

        let result, newStr;
        [result, newStr] = this._parse(str);                

        return [result, newStr];
    }

    private _parse(str:string):[boolean, string, string]{

        let result, newStr, value, offset;
        var dateString = "";

        if (this.dateStyle != NSDateFormatterStyle.NoStyle) {
            [result, newStr, value, offset] = this._parseDate(str);   
            if (result == false) 
                return [result, newStr, value];   
            dateString = value;         
        }
        else {
            let today = new Date();
            dateString = this.iso8601DateStyle(today);
        }                                     

        if (this.timeStyle != NSDateFormatterStyle.NoStyle) {
            let timeString = str;
            if (offset > 0) timeString = str.substr(offset, str.length - offset);
            [result, newStr, value] = this._parseTime(timeString);
            if (result == false) {
                return [result, newStr, value];
            }
            dateString += " " + value;
        }
        
        return [result, newStr, dateString];
    }

    private _parseDate(str:string):[boolean, string, string, number]{
        let chIndex = 0;

        let parseString = "";
        let step = 0;

        let dd = "";
        let mm = "";
        let yy = "";

        // Check dd-mm-yy or dd-mm-yyyy
        for (let index = 0; index < str.length; index++) {
            let ch = str[index];
            chIndex++;

            if (ch == "-" || ch == "." || ch == "/")
            {
                // Next step
                if (parseString.length == 0) return [false, parseString, "", chIndex];
                parseString += "/";
                step++;
            }
            else if(ch == " ") {
                break;
            }
            else 
            {
                let r, value;
                
                switch(step) {

                    case 0: //dd
                        [r, dd] = this._parseDay(ch, dd);
                        break;

                    case 1: // mm                        
                        [r, mm] = this._parseMonth(ch, mm);                        
                        break;

                    case 2: // yy or yyyy
                        [r, yy] = this._parseYear(ch, yy);
                        break;
                }

                if (r == true)
                    parseString += ch;
                else 
                    return [false, parseString, "", chIndex];
            }            
        }

        let result = true;
        if (dd.length > 0) result = result && this._validateDay(dd);
        if (mm.length > 0) result = result && this._validateMonth(mm);
        if (yy.length > 0) result = result && this._validateYear(yy);
        if (result == false) return [false, parseString, null, chIndex];
        
        var dateString = (yy[3]? yy : ("20" + yy)) + this.browserDateSeparatorSymbol + (mm[1]?mm:"0"+mm) + this.browserDateSeparatorSymbol + (dd[1]?dd:"0"+dd);
        return [true, parseString, dateString, chIndex];
    }

    private _parseDay(ch, dd):[boolean, string] {

        var c = parseInt(ch);
        if (isNaN(c)) return [false, dd];
        var v = parseInt(dd + ch);
        return [true, dd + ch];
    }

    private _validateDay(dd):boolean {
        var v = parseInt(dd);
        if (isNaN(v)) return false;
        if (dd < 1 || dd > 31) return false;
        return true;
    }
    
    private _parseMonth(ch, mm):[boolean, string] {
        var c = parseInt(ch);
        if (isNaN(c)) return [false, mm];
        var v = parseInt(mm + ch);        
        return [true, mm + ch];
    }

    private _validateMonth(mm):boolean {
        var v = parseInt(mm);
        if (isNaN(v)) return false;
        if (v < 1 || v > 12) return false;
        return true;
    }    

    private _parseYear(ch, yy):[boolean, string]{

        var c = parseInt(ch);
        if (isNaN(c)) return [false, yy];
        var v = parseInt(yy + ch);
        return [true, yy + ch];
    }

    private _validateYear(yy):boolean{
        var v = parseInt(yy);
        if (isNaN(yy) == true) return false;
        if (v > 3000) return false;
        return true;        
    }

    protected iso8601DateStyle(date:Date)
    {
        let dd = date.getDate().toString();
        let mm = (date.getMonth() + 1).toString();
        let yy = date.getFullYear().toString();        

        return yy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
    }

    private _shortDateStyle(date:Date, separatorString?:string){
        
        let separator = separatorString ? separatorString : "/";

        let d = date.getDate().toString();
        let m = (date.getMonth() + 1).toString();
        let y = date.getFullYear().toString();        

        return (d[1]?d:0+d) + separator + (m[1]?m:"0"+m) + separator + y;
    }

    private _fullDateStyle(date:Date){

        var day = _NSDateFormatterStringDays[date.getDay()];
        var month = _NSDateFormatterStringMonths[date.getMonth()];

        return day + ", " + month + " " + date.getDate() + ", " + date.getFullYear();
    }

    private _parseTime(str:string):[boolean, string, string]{

        let parseString = "";
        let step = 0;

        let hh = "";
        let mm = "";
        let ss = "";

        // Check dd-mm-yy or dd-mm-yyyy
        for (let index = 0; index < str.length; index++) {
            let ch = str[index];

            if (ch == ":" || ch == ".")
            {
                // Next step
                if (parseString.length == 0) return [false, parseString, ""];
                parseString += ":";
                step++;
            }
            else 
            {
                let result, value;
                
                switch(step) {

                    case 0: //hh
                        [result, hh] = this._parseHour(ch, hh);
                        break;

                    case 1: // mm
                        [result, mm] = this._parseMinute(ch, mm);
                        break;

                    case 2: // ss
                        [result, ss] = this._parseSecond(ch, ss);
                        break;
                }

                if (result == true)
                    parseString += ch;
                else 
                    return [false, parseString, ""];
            }            
        }

        var hourString = (hh[1]? hh : ("0" + hh));
        if (mm.length > 0)
            hourString += ":" + (mm[1]?mm:("0"+mm));
        else 
            hourString += ":00";
        
        if (ss.length > 0)
            hourString += ":" + (ss[1]?ss:("0"+ss));
        else 
            hourString += ":00";
        
        return [true, parseString, hourString];
    }

    private _parseHour(ch, hh):[boolean, string] {

        var c = parseInt(ch);
        if (isNaN(c)) return [false, hh];
        var v = parseInt(hh + ch);
        if (v < 0 || v > 23) return [false, hh];
        return [true, hh + ch];
    }

    private _parseMinute(ch, mm):[boolean, string] {

        var c = parseInt(ch);
        if (isNaN(c)) return [false, mm];
        var v = parseInt(mm + ch);
        if (v < 0 || v > 59) return [false, mm];
        return [true, mm + ch];
    }

    private _parseSecond(ch, ss):[boolean, string] {

        var c = parseInt(ch);
        if (isNaN(c)) return [false, ss];
        var v = parseInt(ss + ch);
        if (v < 0 || v > 59) return [false, ss];
        return [true, ss + ch];
    }

    protected iso8601TimeStyle(date:Date){
        
        let hh = date.getHours().toString();
        let mm = date.getMinutes().toString();
        let ss = date.getSeconds().toString();

        return (hh[1]?hh:"0" + hh[0]) + ":" + (mm[1]?mm:"0" + mm[0]) + ":" + (ss[1]?ss:"0" + ss[0]);
    }

    private _shortTimeStyle(date:Date) {

        var h = date.getHours().toString();
        var m = date.getMinutes().toString();

        return (h[1]?h:"0"+h) + ":" + (m[1]?m:"0"+m);
    }

}

var _NSDateFormatterStringDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var _NSDateFormatterStringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];





export class NSISO8601DateFormatter extends NSDateFormatter {

    static iso8601DateFormatter():NSISO8601DateFormatter {
        var df = new NSISO8601DateFormatter();
        df.init();

        return df;
    }

    timeZone = null;

    dateFromString(str:string):Date {

        if (str == null) return null;
        let dateString:string = null;
        if (MIOCoreGetPlatform() == MIOCorePlatformType.Safari){
            dateString = str.split('-').join("/");
            if (dateString.length > 19) dateString = dateString.substr(0, 19);
        }
        else 
            dateString = str;

        let timestamp = Date.parse(dateString);
        let d = null;
        if (isNaN(timestamp) == false){
            d = new Date(dateString);
        }
        else {
            console.log("DATE FORMATTER: Error, invalid date");            
        }                    

        return d;
    }

    stringFromDate(date:Date):string {

        var str = "";

        if (date == null) return null;

        if (this.dateStyle != NSDateFormatterStyle.NoStyle) {
            str += this.iso8601DateStyle(date);
        }

        if (this.timeStyle != NSDateFormatterStyle.NoStyle){

            if (str.length > 0)
            str += " ";
            
            str += this.iso8601TimeStyle(date);
        }

        return str;
    }
}




export enum NSNumberFormatterStyle {
    NoStyle,
    DecimalStyle,
    CurrencyStyle,
    CurrencyISOCodeStyle,
    PercentStyle,    
}

export enum _NSNumberFormatterType {
    
    Int,
    Decimal
}

export class NSNumberFormatter extends NSFormatter {

    numberStyle = NSNumberFormatterStyle.NoStyle;
    locale:NSLocale = null;
    minimumFractionDigits = 0;
    maximumFractionDigits = 0;
    groupingSeparator = null;
    currencySymbol = null;
    currencyCode = null;
    private currencyHasSpaces = true;
    private currencyIsRight = true;

    init(){
        super.init();
        this.locale = NSLocale.currentLocale();

        this.groupingSeparator = this.locale.groupingSeparator;
        this.currencySymbol = this.locale.currencySymbol;
        this.currencyCode = this.locale.currencyCode;

        switch(this.locale.countryIdentifier){            
            case "US":
            this.currencyHasSpaces = false;
            this.currencyIsRight = false;
            break;
        }
    }

    numberFromString(str:string){

        if(str === null) return null;
        
        let result, parseString, numberString, type;
        [result, parseString, numberString, type] = this._parse(str);
        
        if (result == true) {
            let value = null;    
            if (type == _NSNumberFormatterType.Int){
                value =  parseInt(numberString);
            }
            else if (type == _NSNumberFormatterType.Decimal){
                value = parseFloat(numberString);
            }
            
            return isNaN(value) ? null : value;
        }

        return null;
    }

    stringFromNumber(number:number):string{
        return this.stringForObjectValue(number);
    }

    stringForObjectValue(value):string {
        
        let number = value as number;
        if(!number) number = 0;
        let str = number.toString();
        let intValue = null;
        let floatValue = null;
        let array = str.split(".");
        if (array.length == 1) {
            // Only int
            intValue = array[0];
        }
        else if (array.length == 2) {
            intValue = array[0];
            floatValue = array[1];
        }
        
        // Check the round rules
        if (floatValue != null) {
            [intValue, floatValue] = this.round(intValue, floatValue);
        }

        let res = "";
        let minusOffset = intValue.charAt(0) == "-" ? 1 : 0;
    
        if (intValue.length > (3 + minusOffset)) {

            let offset = Math.floor((intValue.length - minusOffset) / 3);
            if (((intValue.length - minusOffset) % 3) == 0)
                offset--;
            let posArray = [];
            let intLen = intValue.length;
            for (let index = offset; index > 0; index--){
                posArray.push(intLen - (index * 3));
            }

            let posArrayIndex = 0;
            let groupPos = posArray[0];
            for (let index = 0; index < intLen; index++)
            {
                if (index == groupPos) {
                    res += this.groupingSeparator;
                    posArrayIndex++;                    
                    groupPos = posArrayIndex < posArray.length ? posArray[posArrayIndex] : -1;
                }
                let ch = intValue[index];
                res += ch;
            }                        
        }
        else {
            res = intValue;
        }

        if (this.minimumFractionDigits > 0 && floatValue == null)
            floatValue = "";

        if (floatValue != null){            
            res += this.locale.decimalSeparator;            
            if (this.minimumFractionDigits > 0 && floatValue.length < this.minimumFractionDigits){
                for (let index = 0; index < this.minimumFractionDigits; index++){
                    if (index < floatValue.length)
                        res += floatValue[index];
                    else 
                        res += "0";
                }    
            }
            else {
                res += floatValue;
            }
        }
                
        if (this.numberStyle == NSNumberFormatterStyle.PercentStyle) res += "%";
        res = this.stringByAppendingCurrencyString(res);

        return res;
    }

    private round(intValue:string, floatValue:string):[string, string]{                
        if (floatValue.length <= this.maximumFractionDigits) return[intValue, floatValue];

        // Check float first        
        let roundedFloat = "";
        let d = parseInt(floatValue.substr(this.maximumFractionDigits, 1));
        let inc =  d < 5 ? 0 : 1;
        
        for (let index = this.maximumFractionDigits - 1; index >= 0; index--){
            if (inc == 0) {
                roundedFloat = floatValue.substring(0, index + 1) + roundedFloat;
                break;
            }
            let digit = parseInt(floatValue.substr(index, 1));            
            if (digit == 9) {
                inc = 1;
                roundedFloat = "0" + roundedFloat;                
            }
            else {
                inc = 0;
                let newDigit = digit + 1;
                roundedFloat = newDigit + roundedFloat;                
            }
        }

        // Removes Zeros
        let removeIndex = null;
        for (let index = roundedFloat.length - 1; index >= this.minimumFractionDigits; index--){
            let digit = roundedFloat.substr(index, 1);
            if (digit != "0") break;
            removeIndex = index;
        }
        if (removeIndex != null) roundedFloat = roundedFloat.substring(0, removeIndex);

        if (inc == 0) return [intValue, roundedFloat];
        
        let roundedInt = "";
        for (let index = intValue.length - 1; index >= 0; index--){
            let digit = parseInt(intValue.substr(index, 1));
            let newDigit = digit + inc;
            if (newDigit == 10) {
                inc = 1;                
                roundedInt = "0" + roundedInt;                
            }
            else {
                inc = 0;                
                roundedInt = intValue.substring(0, index) + newDigit.toString() + roundedInt;
                break;
            }
        }

        return [roundedInt, roundedFloat];        
    }

    private stringByAppendingCurrencyString(text:string):string {
        let currency = "";        
        if (this.numberStyle == NSNumberFormatterStyle.CurrencyStyle) {
            currency = this.currencySymbol;
            if (currency.length == 0) currency = this.currencyCode; // If there's no symbol, add the code instead.
        }
        else if (this.numberStyle == NSNumberFormatterStyle.CurrencyISOCodeStyle) currency = this.currencyCode;
        else {
            return text;
        }        

        if (currency.length == 0) return text;

        let result = "";        
        if (this.currencyIsRight == true) {
            result = text + (this.currencyHasSpaces ? " ":"") + currency;
        }
        else {
            result = currency + (this.currencyHasSpaces ? " ":"") + text;
        }

        return result;
    }

    isPartialStringValid(str:string):[boolean, string]{

        if (str.length == 0) return [true, str];

        let result, newStr;
        [result, newStr] = this._parse(str);

        return [result, newStr];
    }

    private _parse(str:string):[boolean, string, string, _NSNumberFormatterType]{

        let number = 0;
        let parseString = "";
        let numberString = "";
        let type = _NSNumberFormatterType.Int;
        let minusSymbol = false;
        let percentSymbol = false;

        for (let index = 0; index < str.length; index++) {
         
            let ch = str[index];
            if (ch == this.locale.decimalSeparator && type != _NSNumberFormatterType.Decimal){
                parseString += ch;
                numberString += ".";
                type = _NSNumberFormatterType.Decimal;
            }
            else if (ch == "-" && minusSymbol == false) {
                parseString += ch;
                numberString += ch;
                minusSymbol = true;                
            }
            else if (ch == "%"
                     && this.numberStyle == NSNumberFormatterStyle.PercentStyle
                     && percentSymbol == false){
                
                percentSymbol = true;
                parseString += ch;                
            }
            else if (ch == " "){
                continue;
            }
            else if (!isNaN(parseInt(ch))) {
                parseString += ch;
                numberString += ch;
            }
            else 
                return [(parseString.length > 0 ? true : false), parseString, numberString, type];
        }

        return [true, parseString, numberString, type];
    }
}


/**
 * Created by godshadow on 21/3/16.
 */

export class NSTimer extends NSObject
{    
    private _timerInterval = 0;
    private _repeat = false;
    private _target = null;
    private _completion = null;

    private _coreTimer = null;

    static scheduledTimerWithTimeInterval(timeInterval, repeat, target, completion)
    {
        var timer = new NSTimer();
        timer.initWithTimeInterval(timeInterval, repeat, target, completion);

        timer.fire();

        return timer;
    }

    initWithTimeInterval(timeInterval, repeat, target, completion)
    {
        this._timerInterval = timeInterval;
        this._repeat = repeat;
        this._target = target;
        this._completion = completion;
    }

    fire()
    {
        var instance = this;
        
        if (this._repeat){
            this._coreTimer = setInterval(function(){
                instance._timerCallback.call(instance);
            }, this._timerInterval);
        }
        else {
            this._coreTimer = setTimeout(function(){
                instance._timerCallback.call(instance);
            }, this._timerInterval);
        }
    }

    invalidate()
    {
        if (this._repeat)
            clearInterval(this._coreTimer);
        else 
            clearTimeout(this._coreTimer);
    }

    private _timerCallback()
    {
        if (this._target != null && this._completion != null)
            this._completion.call(this._target, this);

        if (this._repeat == true)
            this.invalidate();
    }
}
/**
 * Created by godshadow on 11/3/16.
 */

export class NSNotification
{
    name = null;
    object = null;
    userInfo = null;

    constructor(name, object, userInfo)
    {
        this.name = name;
        this.object = object;
        this.userInfo = userInfo;
    }
}

export class NSNotificationCenter
{
    private static _sharedInstance:NSNotificationCenter = new NSNotificationCenter();
    notificationNames = {};

    constructor()
    {
        if (NSNotificationCenter._sharedInstance)
        {
            throw new Error("Error: Instantiation failed: Use defaultCenter() instead of new.");
        }
        NSNotificationCenter._sharedInstance = this;
    }

    public static defaultCenter():NSNotificationCenter
    {
        return NSNotificationCenter._sharedInstance;
    }

    addObserver(obs, name, fn)
    {
        var notes = this.notificationNames[name];
        if (notes == null)
        {
            notes = [];
        }

        var item = {"observer" : obs, "function" : fn};
        notes.push(item);
        this.notificationNames[name] = notes;
    };

    removeObserver(obs, name)
    {
        var notes = this.notificationNames[name];

        if (notes == null)
            return;

        var index = -1;
        for (var count = 0; count < notes.length; count++)
        {
            var item = notes[count];
            var obsAux = item["observer"];

            if (obsAux === obs) {
                index = count;
                break;
            }
        }

        if (index > -1) {
            notes.splice(index, 1);
        }

    }

    postNotification(name, object, userInfo?)
    {
        var notes = this.notificationNames[name];

        if (notes == null)
            return;

        var n = new NSNotification(name, object, userInfo);

        for (var count = 0; count < notes.length; count++)
        {
            var item = notes[count];
            var obs = item["observer"];
            var fn = item["function"];

            fn.call(obs, n);
        }
    }
}


/**
 * Created by godshadow on 29/09/2016.
 */

export class NSUserDefaults
{
    private static _sharedInstance:NSUserDefaults = new NSUserDefaults();

    constructor(){
        if (NSUserDefaults._sharedInstance){
            throw new Error("Error: Instantiation failed: Use standardUserDefaults() instead of new.");
        }
        NSUserDefaults._sharedInstance = this;
    }

    public static standardUserDefaults():NSUserDefaults{
        return NSUserDefaults._sharedInstance;
    }

    setBooleanForKey(key, value:boolean){
        let v = value ? "1" : "0";
        this.setValueForKey(key, v);
    }

    booleanForKey(key){
        let v = this.valueForKey(key);
        return v == "1" ? true : false;
    }

    setValueForKey(key:string, value:any){
        localStorage.setItem(key, value);
    }

    valueForKey(key:string):any{
        return localStorage.getItem(key);
    }

    removeValueForKey(key:string){
        localStorage.removeItem(key);
    }
}


export enum NSURLTokenType
{
    Protocol,
    Host,
    Path,
    Param,
    Value
}

export class NSURL extends NSObject
{    
    baseURL:NSURL = null;
    absoluteString:string = null;

    scheme:string = null;
    user:string = null;
    password = null;
    host:string = null;
    port:number = 0;
    hostname:string = null;
    path:string = "/";
    file:string = null;
    pathExtension:string = null;
    
    params = [];

    public static urlWithString(urlString:string):NSURL
    {
        var url = new NSURL();
        url.initWithURLString(urlString);

        return url;
    }

    initWithScheme(scheme:string, host:string, path:string){
        super.init();
        this.scheme = scheme;
        this.host = host;
        this.path = path;

        this.absoluteString = "";
        if (scheme.length > 0) this.absoluteString += scheme + "://";
        if (host.length > 0) this.absoluteString += host + "/";
        if (path.length > 0) this.absoluteString += path;                
    }

    initWithURLString(urlString:string)
    {
        super.init();
        this.absoluteString = urlString;
        this._parseURLString(urlString);
    }

    private _parseURLString(urlString:string)
    {    
        var param = "";
        var value = "";

        var token = "";
        var step = NSURLTokenType.Protocol;

        var foundPort = false;
        var foundExt = false;        

        for (var index = 0; index < urlString.length; index++)
        {
            var ch = urlString.charAt(index);

            if (ch == ":")
            {
                if (step == NSURLTokenType.Protocol)
                {
                    this.scheme = token;
                    token = "";
                    index += 2; //Igonring the double slash // from the protocol (http://)
                    step = NSURLTokenType.Host;
                }
                else if (step == NSURLTokenType.Host)
                {
                    this.hostname = token;
                    token = "";
                    foundPort = true;
                }
            }
            else if (ch == "/")
            {
                if (step == NSURLTokenType.Host)
                {
                    if (foundPort == true)
                    {
                        this.host = this.hostname + ":" + token;
                        this.port = parseInt(token);                        
                    }
                    else 
                    {
                        this.host = token;
                        this.hostname = token;
                    }
                    step = NSURLTokenType.Path;                    
                }
                else
                { 
                    this.path += token + ch;                    
                }

                token = "";                    
            }
            else if (ch == "." && step == NSURLTokenType.Path)
            {
                this.file = token;
                foundExt = true;
                token = "";
            }
            else if (ch == "?")
            {
                if (foundExt == true)
                {
                    this.file += "." + token;
                    this.pathExtension = token;
                }
                else 
                    this.file = token;

                token = "";
                step = NSURLTokenType.Param;
            }
            else if (ch == "&")
            {
                let item = {"Key" : param, "Value":value};
                this.params.push(item);
                step = NSURLTokenType.Param;
                param = "";
                value = "";
            }
            else if (ch == "=")
            {
                param = token;
                step = NSURLTokenType.Value;
                token = "";
            }
            else
            {
                token += ch;
            }
        }

        if (token.length > 0)
        {
            if (step == NSURLTokenType.Path)
            {
                if (foundExt == true)
                {
                    this.file += "." + token;
                    this.pathExtension = token;
                }
                else
                    this.path += token;
            }
            else if (step == NSURLTokenType.Param)
            {
                var i = {"key" : token};
                this.params.push(i);
            }
            else if (step == NSURLTokenType.Value)
            {
                let item = {"Key" : param, "Value" : token};
                this.params.push(item);                
            }
        }
    }    

    public urlByAppendingPathComponent(path:string):NSURL
    {                
        var urlString = this.scheme + "://" + this.host + this.path;
        
        if (urlString.charAt(urlString.length - 1) != "/")
            urlString += "/";

        if (path.charAt(0) != "/")
            urlString += path;
        else
            urlString += path.substr(1);

        var newURL = NSURL.urlWithString(urlString);
        return newURL;
    }

    public standardizedURL():NSURL
    {
        return null;
    }

}



export class NSURLRequest extends NSObject
{
    url:NSURL = null;
    httpMethod:string = "GET";
    httpBody = null;
    headers = [];
    binary = false;
    download = false;

    static requestWithURL(url:NSURL):NSURLRequest{
        var request = new NSURLRequest();
        request.initWithURL(url);

        return request;
    }

    initWithURL(url:NSURL){
        this.url = url;
    }

    setHeaderField(field, value){
        this.headers.push({"Field" : field, "Value" : value});
    }
}



/**
 * Created by godshadow on 14/3/16.
 */

export class NSURLConnection
{
    request:NSURLRequest = null;
    delegate = null;
    blockFN = null;
    blockTarget = null;

    private xmlHttpRequest = null;

    initWithRequest(request:NSURLRequest, delegate){
        this.request = request;
        this.delegate = delegate;
        this.start();
    }

    initWithRequestBlock(request:NSURLRequest, blockTarget, blockFN){
        this.request = request;
        this.blockFN = blockFN;
        this.blockTarget = blockTarget;
        this.start();
    }

    start(){
        _http_request(this, this.request.url.absoluteString, this.request.headers, this.request.httpMethod, this.request.httpBody, this.request.binary, this.delegate, this.blockTarget, this.blockFN, this.request.download);
    }
}

function _http_request(instance, urlString: string, headers, method, body, binary, delegate, target, completion, download: boolean) {
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {
        const body = this.responseText;
        if(this.status < 300 && body != null){
            // Success!
            if (delegate != null) {
                delegate.connectionDidReceiveText(instance, body);
            } else if (target != null) {
                completion.call(target, this.status, body);
            }
        } else {
            // something went wrong
            if (delegate != null) {
                delegate.connectionDidFail(instance);
            } else if (target != null) {
                completion.call(target, this.status, body);
            }
        }
    };
    xhr.open(method, urlString);

    // Add headers
    for (let count = 0; count < headers.length; count++) {
        let item = headers[count];
        xhr.setRequestHeader(item["Field"], item["Value"]);
    }
    if (binary == true) {
        xhr.responseType = "arraybuffer";
    } 
    if (method == "GET" || body == null) {
        xhr.send();
    } else {
        xhr.send(body);
    }
}

function _http_request_sync(urlString: string, headers, method, body, binary) {

    let xhr = new XMLHttpRequest();    
    xhr.open(method, urlString, false);

    // Add headers
    for (let count = 0; count < headers.length; count++) {
        let item = headers[count];
        xhr.setRequestHeader(item["Field"], item["Value"]);
    }
    
    if (binary == true) {
        xhr.responseType = "arraybuffer";
    } 
    if (method == "GET" || body == null) {
        xhr.send();
    } else {
        xhr.send(body);
    }

    return xhr.responseText;
}




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
    WhiteSpace,
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

    private ignoreWhiteSpace = false;

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
                while(ch2 != ch && ch2 != "<"){                    
                    value += ch2;
                    ch2 = this.nextChar();                    
                }
                if (ch2 != "<") value += ch2;
                else this.prevChar();                
            }
            else if (ch == " "){
                if (this.ignoreWhiteSpace == false){
                    if (value != "") this.prevChar();
                    else value = " ";
                }
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
            
            case " ":
                token = NSXMLTokenType.WhiteSpace;
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

        let token, value;
        [token, value] = this.nextToken();
                
        while(token != NSXMLTokenType.End){

            switch(token) {

                case NSXMLTokenType.OpenTag:
                    this.ignoreWhiteSpace = true;
                    this.openTag();
                    this.ignoreWhiteSpace = false;
                    break;

                case NSXMLTokenType.Identifier:
                case NSXMLTokenType.Slash:
                case NSXMLTokenType.WhiteSpace:
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
                let ch2 = this.nextChar();
                if (ch2 == null) throw new Error("NSXMLParser: Unexpected end of file!");
                comments += ch2;                
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



export class NSOperation extends NSObject {

    name:string = null;
    target = null;
    completion = null;

    private _dependencies = [];
    get dependencies() {return this._dependencies;}

    private _isExecuting = false;
    get isExecuting() {return this.executing()}
    
    private setExecuting(value){
        if (value == this._isExecuting) return;
        this.willChangeValue("isExecuting");
        this._isExecuting = value;
        this.didChangeValue("isExecuting");
    }

    private _isFinished = false;
    get isFinished() {return this.finished();}
    
    private setFinished(value){
        if (value == this._isFinished) return;        
        this.willChangeValue("isFinished");
        this._isFinished = value;
        this.didChangeValue("isFinished");
    }

    private _ready = true;
    private setReady(value){
        if (value == this._ready) return;        
        this.willChangeValue("ready");
        this._ready = value;
        this.didChangeValue("ready");
    }
    
    get ready() {
        return this._ready;
    }

    addDependency(operation:NSOperation){
        
        this._dependencies.push(operation);
        if (operation.isFinished == false) {
            operation.addObserver(this, "isFinished");
            this.setReady(false);
        }
    } 

    // Non concurrent task
    main() {}
    
    // Concurrent task
    start() {

        this.setExecuting(true);
        this.main();
        this.setExecuting(false);
        this.setFinished(true);
    }

    executing() {
        return this._isExecuting;
    }

    finished(){
        return this._isFinished;
    }    
    
    observeValueForKeyPath(keyPath:string, type:string, object, ctx) {

        if (type != "did") return;

        if (keyPath == "isFinished") {
            let op:NSOperation = object;
            if (op.isFinished == true){
                object.removeObserver(this, "isFinished");
                this.checkDependecies();
            }
        }
    }

    private checkDependecies(){

        for (var index = 0; index < this._dependencies.length; index++){
            let op = this._dependencies[index];
            if (op.isFinished == false) return;
        }

        // So if we are in this point, means every dependecy is finished
        // and we can start our own task
        this.setReady(true);
    }
}

class NSBlockOperation extends NSOperation {
    
    private executionBlocks = [];

    static operationWithBlock(target, block) {

        let op = new NSBlockOperation();
        op.init();

    }

    addExecutionBlock(target, block) {

        var item = {};
        item["Target"] = target;
        item["Block"] = block;

        this.executionBlocks.push(item);
    }

    main() {

        for(var index = 0; index < this.executionBlocks.length; index++){
            let item = this.executionBlocks[index];
            let target = item["Target"];
            let block = item["Block"];

            block.call(target);
        }
    }
}





export class NSOperationQueue extends NSObject {

    private _operations = [];

    addOperation(operation: NSOperation) {

        if (operation.isFinished == true) {
            throw new Error("NSOperationQueue: Tying to add an operation already finished");
        }

        this.willChangeValue("operationCount");
        this.willChangeValue("operations");
        this._operations.addObject(operation);        
        this.didChangeValue("operationCount");                    
        this.didChangeValue("operations");        

        if (operation.ready == false) {
            operation.addObserver(this, "ready", null);
        }
        else {
            operation.addObserver(this, "isFinished", null);
            if (this.suspended == false) operation.start();
        }
    }

    removeOperation(operation:NSOperation) {

        let index = this._operations.indexOf(operation);
        if (index == -1) return;

        this.willChangeValue("operationCount");
        this.willChangeValue("operations");
        this._operations.splice(index, 1);
        this.didChangeValue("operationCount");                    
        this.didChangeValue("operations");        
    }

    get operations(){
        return this._operations;
    }

    get operationCount(){
        return this._operations.count;
    }

    private _suspended = false;
    set suspended(value){
        this.setSupended(value);
    }
    get suspended(){
        return this._suspended;
    }

    private setSupended(value){
        if (this._suspended == value) return;

        this._suspended = value;
        // if the value is false, we don't need to do anything
        if (value == true) return;

        // This means we need to re-active every operation
        for(let index = 0; index < this.operations.length; index++){
            let op:NSOperation = this.operations[index];
            if (op.ready == true) op.start();
        }
    }

    observeValueForKeyPath(keyPath: string, type: string, object, ctx) {

        if (type != "did") return;

        if (keyPath == "ready") {
            let op:NSOperation = object; 
            if (op.ready == true) {
                op.removeObserver(this, "ready");
                op.addObserver(this, "isFinished", null);
                if (this.suspended == false) op.start();
            }
        }
        else if (keyPath == "isFinished"){
            let op:NSOperation = object; 
            if (op.isFinished == true) {
                op.removeObserver(this, "isFinished");
                this.removeOperation(op);
                if (op.target != null && op.completion != null)
                op.completion.call(op.target);
            }
        }
    }

}

export function NSLog(format) {
    console.log(format);
}



/**
 * Created by godshadow on 28/09/2016.
 */

export class NSSortDescriptor extends NSObject
{
    key = null;
    ascending = false;

    public static sortDescriptorWithKey(key, ascending)
    {
        var sd = new NSSortDescriptor();
        sd.initWithKey(key, ascending);
        return sd;
    }

    initWithKey(key, ascending)
    {
        this.key = key;
        this.ascending = ascending;
    }
}

//
// For internal purposes: Don't use it, could change
//

export function _NSSortDescriptorSortObjects(objs, sortDescriptors)
{
    let resultObjects = null;
    
    if (objs.length == 0 || sortDescriptors == null) {
        resultObjects = objs.slice(0);        
    } 
    else {    
    
        if (sortDescriptors == null) return objs;
        if (objs.length == 0) return objs;

        resultObjects = objs.sort(function(a, b){

            return _NSSortDescriptorSortObjects2(a, b, sortDescriptors, 0);
            //return instance._NSSortDescriptorSortObjects2(a, b, sortDescriptors, 0);
        });
    }

    return resultObjects;
}

function _NSSortDescriptorSortObjects2(a, b, sortDescriptors, index)
{
    if (index >= sortDescriptors.length)
        return 0;

    let sd = sortDescriptors[index];
    let key = sd.key;

    let lv = a[key];
    let rv = b[key];

    if (typeof lv === "string"){
        lv = lv.toLocaleLowerCase();
    }

    if (typeof rv === "string"){
        rv = rv.toLocaleLowerCase();
    }

    if (typeof lv === "string" && typeof rv === "string" && lv.length != rv.length){
        // Check the length
        let lv2 = lv;
        let rv2 = rv;
        let sortValue = 0;
        if (lv.length > rv.length){
            lv2 = lv.substr(0, rv.length);
            sortValue = sd.ascending ? 1 : -1;
        }
        else if (lv.length < rv.length){
            rv2 = rv.substr(0, lv.length);
            sortValue = sd.ascending ? -1 : 1;
        }

        if (lv2 == rv2)
            return sortValue;
        else if (lv2 < rv2)
            return sd.ascending ? -1 : 1;
        else
            return sd.ascending ? 1 : -1;            
    }
    else if (lv == rv)
        return _NSSortDescriptorSortObjects2(a, b, sortDescriptors, ++index);
    else if (lv < rv)
        return sd.ascending ? -1 : 1;
    else
        return sd.ascending ? 1 : -1;

}





export enum NSPropertyListFormat
{
    OpenStepFormat,
    XMLFormat_v1_0,
    BinaryFormat_v1_0,    
}

export enum NSPropertyListReadOptions
{
    None
}

export enum NSPropertyListWriteOptions
{
    None
}

export class NSPropertyListSerialization extends NSObject
{            
    static propertyListWithData(data:string, options:NSPropertyListReadOptions, format:NSPropertyListFormat, error:NSError){
        let pl = new NSPropertyListSerialization();
        pl.initWithData(data, options, format);

        let item = pl.parseData(error);
        return item;
    }

    static dataWithpropertyList(plist:any, format:NSPropertyListFormat, options:NSPropertyListReadOptions, error:NSError){
        let pl = new NSPropertyListSerialization();
        pl.initWithObject(plist, options, format);

        let data = pl.parsePList(error);
        return data;
    }


    private data:string = null;
    private initWithData(data:string, options:NSPropertyListReadOptions, format:NSPropertyListFormat){
        super.init();
        this.data = data;
    }

    private plist:any = null;
    private initWithObject(plist:any, options:NSPropertyListReadOptions, format:NSPropertyListFormat){
        super.init();
        this.plist = plist;
    }

    private rootItem = null;        
    private parseData(error:NSError){
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
        else if (element == "string" || element == "integer" || element == "real" || element == "data") {
            this.currentValue = this.currentString;
            if (element == "integer") this.currentValue = parseInt(this.currentString);
            if (element == "real") this.currentValue = parseFloat(this.currentString);
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

    private contentString:string = null;
    private parsePList(error:NSError){
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