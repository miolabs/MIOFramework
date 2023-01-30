import { NSObject } from "./NSObject";
// import { URL } from "./URL";

export class URLRequest extends NSObject
{
    url:URL;
    httpMethod:string = "GET";
    httpBody = null;
    headers:any[] = [];
    binary = false;
    download = false;

    static requestWithURL(url:URL) : URLRequest{
        let request = new URLRequest();
        request.initWithURL(url);

        return request;
    }

    initWithURL(url:URL){
        this.url = url;
    }

    setHeaderField(field:string, value:string){
        this.headers.push( { "Field" : field, "Value" : value } );
    }
}
