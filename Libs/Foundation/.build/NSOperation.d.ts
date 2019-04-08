import { NSObject } from "./NSObject";
export declare class NSOperation extends NSObject {
    name: string;
    target: any;
    completion: any;
    private _dependencies;
    readonly dependencies: any[];
    private _isExecuting;
    readonly isExecuting: boolean;
    private setExecuting;
    private _isFinished;
    readonly isFinished: boolean;
    private setFinished;
    private _ready;
    private setReady;
    readonly ready: boolean;
    addDependency(operation: NSOperation): void;
    main(): void;
    start(): void;
    executing(): boolean;
    finished(): boolean;
    observeValueForKeyPath(keyPath: string, type: string, object: any, ctx: any): void;
    private checkDependecies;
}
