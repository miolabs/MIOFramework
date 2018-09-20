import { MIOCoreUUIDcreate } from "./platform/web/MIOCoreUUID";
import { NSObject } from "./NSObject";

/**
 * Created by godshadow on 15/3/16.
 */

export class NSUUID extends NSObject
{
    // Deprecated
    static UUID():NSUUID{
        let uuid = new NSUUID();
        uuid.init();

        return uuid;
    }

    private _uuid = null;
    init(){
        this._uuid = MIOCoreUUIDcreate();
    }

    get UUIDString():string{
        return this._uuid;
    }

}
