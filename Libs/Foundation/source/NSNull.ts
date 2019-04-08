import { NSObject } from "./NSObject";

export class NSNull extends NSObject
{            
    static nullValue():NSNull {
        var n = new NSNull();
        n.init();
        return n;
    }
}