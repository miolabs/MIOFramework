import { NSObject } from "./NSObject";
import { NSURL } from "./NSURL";

export class NSURLRequest extends NSObject
{
    url:NSURL = null;
    httpMethod:string = "GET";
    httpBody = null;
    headers = [];
    binary = false;
    download = false;

    static requestWithURL(url:NSURL):NSURLRequest
    {
        var request = new NSURLRequest();
        request.initWithURL(url);

        return request;
    }

    initWithURL(url:NSURL)
    {
        this.url = url;
    }

    setHeaderField(field, value)
    {
        this.headers.push({"Field" : field, "Value" : value});
    }
}
