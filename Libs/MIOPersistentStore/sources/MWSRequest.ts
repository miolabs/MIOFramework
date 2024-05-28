import { NSObject, URLRequest, URLConnection, NotificationCenter, UUID } from "foundation";

export enum MWSRequestType {
    Fetch,
    Save
}

export class MWSRequest extends NSObject
{
    url: URL|null = null;
    httpMethod = "GET"
    body = null;
    bodyData = null;    

    resultCode = 0
    resultData = null;

    type = MWSRequestType.Fetch;
    
    transaction:string = UUID.UUID().UUIDString;
    schema:string|null = null;
    
    private urlRequest:URLRequest|null = null;
    initWithURL(url:URL, body?, httpMethod?:string){
        this.url = url;
        this.body = body;
        if (httpMethod != null) this.httpMethod = httpMethod;
    }

    headers = {};
    setHeaderValue(value:string, key:string) {
        this.headers[key] = value;
    }    

    // Completion block (Int, Any?) -> Void
    execute(target, completion?){
        NotificationCenter.defaultCenter().postNotification("MWSRequestSentFetch", this);
        this.willStart()

        this.urlRequest = URLRequest.requestWithURL(this.url);      

        for (let key in this.headers) {
            let value = this.headers[key];
            this.urlRequest.setHeaderField(key, value);
        }    
        
        this.urlRequest.httpMethod = this.httpMethod;
        this.urlRequest.httpBody = this.bodyData;
        
        let con = new URLConnection();
        con.initWithRequestBlock(this.urlRequest, this, (code, data, blob) => {

            if (code < 200 || code >= 300) {
                NotificationCenter.defaultCenter().postNotification("MWSRequestFetchError", this, {"Type" : this.type});
            }
            this.resultCode = code;
            this.resultData = data;

            this.didFinish();

            if (completion != null){
                completion.call(target, code, this.resultData);
            }

            NotificationCenter.defaultCenter().postNotification("MWSRequestReceivedFetch", this);
        });
    }

     // For subclasing
    protected willStart(){ this.bodyData = this.body; }
    protected didFinish(){}
}