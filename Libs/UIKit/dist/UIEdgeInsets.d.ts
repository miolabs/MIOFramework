import { MIOObject } from "../MIOFoundation";
export declare function MIOEdgeInsetsMake(top: any, left: any, bottom: any, rigth: any): UIEdgeInsets;
export declare class UIEdgeInsets extends MIOObject {
    top: number;
    left: number;
    bottom: number;
    right: number;
    static Zero(): UIEdgeInsets;
    initWithValues(top: any, left: any, bottom: any, right: any): void;
}
