import { NSObject } from "./NSObject";
export declare enum NSURLTokenType {
    Protocol = 0,
    Host = 1,
    Path = 2,
    Param = 3,
    Value = 4
}
export declare class NSURL extends NSObject {
    baseURL: NSURL;
    absoluteString: string;
    scheme: string;
    user: string;
    password: any;
    host: string;
    port: number;
    hostname: string;
    path: string;
    file: string;
    pathExtension: string;
    params: any[];
    static urlWithString(urlString: string): NSURL;
    initWithScheme(scheme: string, host: string, path: string): void;
    initWithURLString(urlString: string): void;
    private _parseURLString;
    urlByAppendingPathComponent(path: string): NSURL;
    standardizedURL(): NSURL;
}
