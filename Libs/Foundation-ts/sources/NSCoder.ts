import { NSObject } from "./NSObject";

export interface NSCoding
{
    initWithCoder?(coder:NSCoder):void;
    encodeWithCoder?(coder:NSCoder):void;
}

export class NSCoder extends NSObject
{
    encodeObject(object:any) {}
    
    decodeObject() : any {}

    decodeBoolForKey(key:string):any {}
    decodeIntegerForKey(key:string):any {}
    decodeObjectForKey(key:string):any {}
}