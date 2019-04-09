
import { NSObject } from "./NSObject";


export interface NSCoding
{
    initWithCoder?(coder:NSCoder):void;
    encodeWithCoder?(coder:NSCoder):void;
}

export class NSCoder extends NSObject
{
    decodeIntegerForKey(key:string):any{

    }

    decodeObjectForKey(key:string):any{

    }
}