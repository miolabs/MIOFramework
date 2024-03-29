declare global {
    export interface URL {
        absoluteString:string;
    }
}

Object.defineProperty(Array.prototype, "absoluteString", {
    get: function () {
        let str = "";
        if (this.scheme.length > 0) str += this.scheme + "://";
        if (this.host.length > 0) str += this.host;
        if (this.port.length > 0) str += ":" + this.port;
        if (this.path.length > 0) str += "/" + this.path;
        return str;    
    },
    enumerable: true,
    configurable: true
})

export {}

// enum URLTokenType
// {
//     Protocol,
//     Host,
//     Path,
//     Param,
//     Value
// }

// export class URL extends NSObject 
// {    
//     baseURL:URL = null;
//     absoluteString:string = null;

//     scheme:string = null;
//     user:string = null;
//     password = null;
//     host:string = null;
//     port:number = 0;
//     hostname:string = null;
//     path:string = "/";
//     file:string = null;
//     pathExtension:string = null;
    
//     params = [];

//     public static urlWithString(urlString:string) : URL
//     {
//         let url = new URL();
//         url.initWithURLString(urlString);

//         return url;
//     }

//     initWithScheme(scheme:string, host:string, path:string){
//         super.init();
//         this.scheme = scheme;
//         this.host = host;
//         this.path = path;

//         this.absoluteString = "";
//         if (scheme.length > 0) this.absoluteString += scheme + "://";
//         if (host.length > 0) this.absoluteString += host + "/";
//         if (path.length > 0) this.absoluteString += path;                
//     }

//     initWithURLString(urlString:string)
//     {
//         super.init();
//         this.absoluteString = urlString;
//         this._parseURLString(urlString);
//     }

//     private _parseURLString(urlString:string)
//     {    
//         let param = "";
//         let value = "";

//         let token = "";
//         let step = URLTokenType.Protocol;

//         let foundPort = false;
//         let foundExt = false;        

//         for (let index = 0; index < urlString.length; index++)
//         {
//             let ch = urlString.charAt(index);

//             if (ch == ":")
//             {
//                 if (step == URLTokenType.Protocol)
//                 {
//                     this.scheme = token;
//                     token = "";
//                     index += 2; //Igonring the double slash // from the protocol (http://)
//                     step = URLTokenType.Host;
//                 }
//                 else if (step == URLTokenType.Host)
//                 {
//                     this.hostname = token;
//                     token = "";
//                     foundPort = true;
//                 }
//             }
//             else if (ch == "/")
//             {
//                 if (step == URLTokenType.Host)
//                 {
//                     if (foundPort == true)
//                     {
//                         this.host = this.hostname + ":" + token;
//                         this.port = parseInt(token);                        
//                     }
//                     else 
//                     {
//                         this.host = token;
//                         this.hostname = token;
//                     }
//                     step = URLTokenType.Path;                    
//                 }
//                 else
//                 { 
//                     this.path += token + ch;                    
//                 }

//                 token = "";                    
//             }
//             else if (ch == "." && step == URLTokenType.Path)
//             {
//                 this.file = token;
//                 foundExt = true;
//                 token = "";
//             }
//             else if (ch == "?")
//             {
//                 if (foundExt == true)
//                 {
//                     this.file += "." + token;
//                     this.pathExtension = token;
//                 }
//                 else 
//                     this.file = token;

//                 token = "";
//                 step = URLTokenType.Param;
//             }
//             else if (ch == "&")
//             {
//                 let item = {"Key" : param, "Value":value};
//                 this.params.push(item);
//                 step = URLTokenType.Param;
//                 param = "";
//                 value = "";
//             }
//             else if (ch == "=")
//             {
//                 param = token;
//                 step = URLTokenType.Value;
//                 token = "";
//             }
//             else
//             {
//                 token += ch;
//             }
//         }

//         if (token.length > 0)
//         {
//             if (step == URLTokenType.Path)
//             {
//                 if (foundExt == true)
//                 {
//                     this.file += "." + token;
//                     this.pathExtension = token;
//                 }
//                 else
//                     this.path += token;
//             }
//             else if (step == URLTokenType.Param)
//             {
//                 let i = {"key" : token};
//                 this.params.push(i);
//             }
//             else if (step == URLTokenType.Value)
//             {
//                 let item = {"Key" : param, "Value" : token};
//                 this.params.push(item);                
//             }
//         }
//     }    

//     public urlByAppendingPathComponent(path:string) : URL
//     {                
//         let urlString = this.scheme + "://" + this.host + this.path;
        
//         if (urlString.charAt(urlString.length - 1) != "/")
//             urlString += "/";

//         if (path.charAt(0) != "/")
//             urlString += path;
//         else
//             urlString += path.substr(1);

//         let newURL = URL.urlWithString(urlString);
//         return newURL;
//     }

//     public standardizedURL() : URL
//     {
//         return null;
//     }

// }