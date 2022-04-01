
// import { MIOCoreBundleGetMainURLString } from "./core/MIOCore";
// import { NSObject } from "./NSObject";
// import { NSURL } from "./NSURL";
// import { NSURLRequest } from "./NSURLRequest";
// import { NSURLConnection } from "./NSURLConnection";
// import { MIOCoreBundleGetContentsFromURLString } from "./platform/web/MIOCore_web";
// import { MIOCoreBundleGetAppResource } from "./core/MIOCoreBundle";
// import { MIOCoreBundleSetAppResource } from "./core/MIOCoreBundle";

/// <reference path="NSObject.ts" />
/// <reference path="NSURL.ts" />
/// <reference path="NSURLRequest.ts" />
/// <reference path="NSURLConnection.ts" />
/// <reference path="./core/MIOCoreBundle.ts" />


/**
 * Created by godshadow on 9/4/16.
 */

class Bundle extends NSObject
{
    url:NSURL = null;

    private static _mainBundle = null;
    
    public static mainBundle():Bundle{
        if (this._mainBundle == null){            
            let urlString = MIOCoreBundleGetMainURLString();

            this._mainBundle = new Bundle();
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

function MIOCoreBundleDownloadResource(name:string, extension:string, target, completion){        
    let resource = name + "." + extension;
    let request = NSURLRequest.requestWithURL(NSURL.urlWithString(resource));
    let con = new NSURLConnection();
    con.initWithRequestBlock(request, target, function(code, data){
        if (code == 200) {                
            MIOCoreBundleSetAppResource(name, extension, data);
        }
        completion.call(target, data);
    });        

}


