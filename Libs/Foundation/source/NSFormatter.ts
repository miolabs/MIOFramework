//import { NSObject } from "./NSObject";
/// <reference path="NSObject.ts" />

class Formatter extends NSObject {

    stringForObjectValue(value) {
        return value;
    }

    getObjectValueForString(str:string) {

    }

    editingStringForObjectValue(value) {

    }

    isPartialStringValid(str:string):[boolean, string]{

        var newStr = "";
        
        return [false, newStr];
    }
}