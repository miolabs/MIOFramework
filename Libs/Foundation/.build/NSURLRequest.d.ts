import { NSObject } from "./NSObject";
import { NSURL } from "./NSURL";
export declare class NSURLRequest extends NSObject {
    url: NSURL;
    httpMethod: string;
    httpBody: any;
    headers: any[];
    binary: boolean;
    download: boolean;
    static requestWithURL(url: NSURL): NSURLRequest;
    initWithURL(url: NSURL): void;
    setHeaderField(field: any, value: any): void;
}
