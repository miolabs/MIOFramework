
import { NSObject } from "./NSObject";


export interface NSCoding
{
    initWithCoder?(coder:NSCoder);
    encodeWithCoder?(coder:NSCoder);
}

export class NSCoder extends NSObject
{
    decodeIntegerForKey(key:string){

    }

    decodeObjectForKey(key:string){

    }
}