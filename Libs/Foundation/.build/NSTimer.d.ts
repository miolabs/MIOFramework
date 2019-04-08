import { NSObject } from "./NSObject";
export declare class NSTimer extends NSObject {
    private _timerInterval;
    private _repeat;
    private _target;
    private _completion;
    private _coreTimer;
    static scheduledTimerWithTimeInterval(timeInterval: any, repeat: any, target: any, completion: any): NSTimer;
    initWithTimeInterval(timeInterval: any, repeat: any, target: any, completion: any): void;
    fire(): void;
    invalidate(): void;
    private _timerCallback;
}
