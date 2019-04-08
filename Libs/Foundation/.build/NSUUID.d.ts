import { NSObject } from "./NSObject";
export declare class NSUUID extends NSObject {
    static UUID(): NSUUID;
    private _uuid;
    init(): void;
    readonly UUIDString: string;
}
