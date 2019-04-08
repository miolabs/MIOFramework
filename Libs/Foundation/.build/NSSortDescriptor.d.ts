import { NSObject } from "./NSObject";
export declare class NSSortDescriptor extends NSObject {
    key: any;
    ascending: boolean;
    static sortDescriptorWithKey(key: any, ascending: any): NSSortDescriptor;
    initWithKey(key: any, ascending: any): void;
}
export declare function _NSSortDescriptorSortObjects(objs: any, sortDescriptors: any): any;
