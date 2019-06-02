import { NSObject } from "./NSObject";

export class Formatter extends NSObject {

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