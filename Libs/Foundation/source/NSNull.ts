// import { NSObject } from "./NSObject";
/// <reference path="NSObject.ts" />
class NSNull extends NSObject
{            
    static nullValue():NSNull {
        var n = new NSNull();
        n.init();
        return n;
    }
}