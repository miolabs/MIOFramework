import { NSURLRequest } from "./NSURLRequest";
export declare class NSURLConnection {
    request: NSURLRequest;
    delegate: any;
    blockFN: any;
    blockTarget: any;
    private xmlHttpRequest;
    initWithRequest(request: NSURLRequest, delegate: any): void;
    initWithRequestBlock(request: NSURLRequest, blockTarget: any, blockFN: any): void;
    start(): void;
}
