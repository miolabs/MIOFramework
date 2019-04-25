import { NSObject } from "mio-foundation-web";
export declare class UIEvent extends NSObject {
    static eventWithSysEvent(sysEvent: any): UIEvent;
    x: number;
    y: number;
    initWithSysEvent(e: any): void;
}
