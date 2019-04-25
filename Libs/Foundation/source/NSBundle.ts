
import { MIOCoreBundleGetMainURLString } from "./core/MIOCore";
import { NSObject } from "./NSObject";
import { NSURL } from "./NSURL";
import { NSURLRequest } from "./NSURLRequest";
import { NSURLConnection } from "./NSURLConnection";
import { MIOCoreBundleGetContentsFromURLString } from "./platform/web/MIOCore_web";
import { MIOCoreBundleGetAppResource } from "./core/MIOCoreBundle";

/**
 * Created by godshadow on 9/4/16.
 */

export class NSBundle extends NSObject
{
    url:NSURL = null;

    private static _mainBundle = null;
    
    public static mainBundle():NSBundle{
        if (this._mainBundle == null){            
            let urlString = MIOCoreBundleGetMainURLString();

            this._mainBundle = new NSBundle();
            this._mainBundle.initWithURL(NSURL.urlWithString(urlString));
        }

        return this._mainBundle;
    }

    initWithURL(url:NSURL){
        this.url = url;
    }

    loadNibNamed(name:string, owner, options){
        let path = MIOCoreBundleGetMainURLString() + "/" + name;
        MIOCoreBundleGetContentsFromURLString(path, this, function(code, data){
            owner._didLoadNibWithLayerData(data);
        });
    }

    pathForResourceOfType(resource:string, type:string){
        return MIOCoreBundleGetAppResource(resource, type);
    }

}
