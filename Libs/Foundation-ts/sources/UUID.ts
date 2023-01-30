/**
 * Created by godshadow on 15/3/16.
 */

import { MIOCoreUUIDcreate } from "mio-core";
import { NSObject } from "./NSObject";

export class UUID extends NSObject
{
    // Deprecated
    static UUID() : UUID {
        let uuid = new UUID();
        uuid.init();

        return uuid;
    }

    private _uuid:string;
    init(){
        this._uuid = MIOCoreUUIDcreate();
    }

    get UUIDString() : string {
        return this._uuid;
    }

}

