import { NSObject } from "./NSObject";
export interface NSCoding {
    initWithCoder?(coder: NSCoder): any;
    encodeWithCoder?(coder: NSCoder): any;
}
export declare class NSCoder extends NSObject {
    decodeIntegerForKey(key: string): void;
    decodeObjectForKey(key: string): void;
}
