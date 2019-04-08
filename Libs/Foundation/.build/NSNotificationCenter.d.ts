export declare class NSNotification {
    name: any;
    object: any;
    userInfo: any;
    constructor(name: any, object: any, userInfo: any);
}
export declare class NSNotificationCenter {
    private static _sharedInstance;
    notificationNames: {};
    constructor();
    static defaultCenter(): NSNotificationCenter;
    addObserver(obs: any, name: any, fn: any): void;
    removeObserver(obs: any, name: any): void;
    postNotification(name: any, object: any, userInfo?: any): void;
}
