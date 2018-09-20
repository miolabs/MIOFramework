import { NSURLRequest } from "./NSURLRequest";
import { NSHTTPRequest } from "../NSCore/platform";

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
        NSHTTPRequest(this, this.request.url.absoluteString, this.request.headers, this.request.httpMethod, this.request.httpBody, this.request.binary, this.delegate, this.blockTarget, this.blockFN, this.request.download);
    }
}
