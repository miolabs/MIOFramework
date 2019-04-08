export declare class NSObject {
    private _className;
    getClassName(): string;
    readonly className: string;
    keyPaths: {};
    init(): void;
    private _notifyValueChange;
    willChangeValueForKey(key: string): void;
    didChangeValueForKey(key: string): void;
    willChangeValue(key: string): void;
    didChangeValue(key: string): void;
    private _addObserver;
    private _keyFromKeypath;
    addObserver(obs: any, keypath: string, context?: any): void;
    removeObserver(obs: any, keypath: string): void;
    setValueForKey(value: any, key: string): void;
    valueForKey(key: string): any;
    valueForKeyPath(keyPath: string): any;
    copy(): any;
}
