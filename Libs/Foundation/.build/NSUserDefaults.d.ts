export declare class NSUserDefaults {
    private static _sharedInstance;
    constructor();
    static standardUserDefaults(): NSUserDefaults;
    setBooleanForKey(key: any, value: boolean): void;
    booleanForKey(key: any): boolean;
    setValueForKey(key: string, value: any): void;
    valueForKey(key: string): any;
    removeValueForKey(key: string): void;
}
