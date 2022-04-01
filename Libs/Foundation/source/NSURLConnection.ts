// import { NSURLRequest } from "./NSURLRequest";

/**
 * Created by godshadow on 14/3/16.
 */

class NSURLConnection
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
