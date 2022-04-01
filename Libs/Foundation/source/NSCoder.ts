
// import { NSObject } from "./NSObject";
/// <reference path="NSObject.ts" />



interface NSCoding
{
    initWithCoder?(coder:NSCoder):void;
    encodeWithCoder?(coder:NSCoder):void;
}

class NSCoder extends NSObject
{
    decodeIntegerForKey(key:string):any{

    }

    decodeObjectForKey(key:string):any{

    }
}