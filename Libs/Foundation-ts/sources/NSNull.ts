import { NSObject } from "./NSObject";

export class NSNull extends NSObject
{            
    static nullValue() : NSNull {
        let n = new NSNull();
        n.init();
        return n;
    }
}