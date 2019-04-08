import { NSObject } from "./NSObject";
import { NSPredicate } from "./NSPredicate";
export declare class NSSet extends NSObject {
    static set(): NSSet;
    private _objects;
    addObject(object: any): void;
    removeObject(object: any): void;
    removeAllObjects(): void;
    indexOfObject(object: any): number;
    containsObject(object: any): boolean;
    objectAtIndex(index: any): any;
    readonly allObjects: any[];
    readonly count: number;
    readonly length: number;
    copy(): NSSet;
    filterWithPredicate(predicate: NSPredicate): any;
    addObserver(obs: any, keypath: string, context?: any): void;
}
