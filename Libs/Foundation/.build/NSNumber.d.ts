import { NSObject } from "./NSObject";
export declare class NSNumber extends NSObject {
    static numberWithBool(value: any): NSNumber;
    static numberWithInteger(value: any): NSNumber;
    static numberWithFloat(value: any): NSNumber;
    protected storeValue: any;
    initWithBool(value: any): void;
    initWithInteger(value: any): void;
    initWithFloat(value: any): void;
}
