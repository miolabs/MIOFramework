import { NSObject } from "./NSObject";
import { NSOperation } from "./NSOperation";
export declare class NSOperationQueue extends NSObject {
    private _operations;
    addOperation(operation: NSOperation): void;
    removeOperation(operation: NSOperation): void;
    readonly operations: any[];
    readonly operationCount: any;
    private _suspended;
    suspended: any;
    private setSupended;
    observeValueForKeyPath(keyPath: string, type: string, object: any, ctx: any): void;
}
