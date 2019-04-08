import { NSCoder } from "./NSCoder";
export declare class NSKeyedUnarchiver extends NSCoder {
    static unarchiveTopLevelObjectWithData(data: string): any;
    private objects;
    _parseData(data: string, error: any): any;
    private classFromInfo;
    private createObjectFromInfo;
    private currentInfo;
    private createObject;
    decodeObjectForKey(key: string): any;
    private createArray;
    private createDictionary;
    private valueFromInfo;
}
