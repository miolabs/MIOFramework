import { NSObject } from "./NSObject";

export class Formatter extends NSObject {

    stringForObjectValue(value:any) {
        return value;
    }

    getObjectValueForString(str:string) {

    }

    editingStringForObjectValue(value:any) {

    }

    isPartialStringValid(str:string):[boolean, string]{
        let newStr = "";        
        return [false, newStr];
    }
}