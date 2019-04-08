import { NSObject } from "./NSObject";
export declare class NSFormatter extends NSObject {
    stringForObjectValue(value: any): any;
    getObjectValueForString(str: string): void;
    editingStringForObjectValue(value: any): void;
    isPartialStringValid(str: string): [boolean, string];
}
