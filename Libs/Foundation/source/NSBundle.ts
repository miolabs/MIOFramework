
import { MIOCoreBundleGetMainURLString } from "./core/MIOCore";
import { NSObject } from "./NSObject";
import { NSURL } from "./NSURL";
import { NSURLRequest } from "./NSURLRequest";
import { NSURLConnection } from "./NSURLConnection";

/**
 * Created by godshadow on 9/4/16.
 */

export class MIOBundle extends NSObject
{
    url:NSURL = null;

    private static _mainBundle = null;
    
    public static mainBundle():MIOBundle{
        if (this._mainBundle == null){            
            let urlString = MIOCoreBundleGetMainURLString();

            this._mainBundle = new MIOBundle();
            this._mainBundle.initWithURL(NSURL.urlWithString(urlString));
        }

        return this._mainBundle;
    }

    initWithURL(url:NSURL){
        this.url = url;
    }

    loadNibNamed(name:string, owner, options){

    }

    loadHTMLNamed(path, layerID, target?, completion?){            
        if (MIOCoreGetAppType() == MIOCoreAppType.Web){
            if (this._webBundle == null){
                this._webBundle = new MIOCoreBundle();
                this._webBundle.baseURL = this.url.absoluteString;
            }

            this._webBundle.loadHMTLFromPath(path, layerID, this, function(layerData){
                                
                // let parser = new BundleFileParser(layerData, layerID);
                // let result = parser.parse();

                let domParser = new DOMParser();
                let items = domParser.parseFromString(layerData, "text/html");
                let layer = items.getElementById(layerID);

                if (target != null && completion != null)
                    completion.call(target, layer);
            });
        }
    }

    private _loadResourceFromURL(url:NSURL, target, completion){
        let request = NSURLRequest.requestWithURL(url);
        let conn =  new NSURLConnection();
        conn.initWithRequestBlock(request, this, function(error, data){
            completion.call(target, data);
        });
    }

    pathForResourceOfType(resource:string, type:string){
        return MIOCoreBundleGetAppResource(resource, type);
    }

}

let _MIOAppBundleResources = {};

export function MIOCoreBundleSetAppResource(resource:string, type:string, content:string){
    let files = _MIOAppBundleResources[type];
    if (files == null) {
        files = {};
        _MIOAppBundleResources[type] = files;
    }

    files[resource] = content;
}

export function MIOCoreBundleGetAppResource(resource:string, type:string){
    let files = _MIOAppBundleResources[type];
    if (files == null) return null;

    let content = files[resource];
    return content;
}
