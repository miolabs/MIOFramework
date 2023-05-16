
/**
 * Created by godshadow on 9/4/16.
 */

import { MIOCoreGetContentsFromURLString, MIOCoreGetMainURLString } from "mio-core";
import { NSLog } from "./NSLog";
import { NSObject } from "./NSObject";


export class Bundle extends NSObject
{
    url:URL;

    private static _mainBundle:Bundle;
    
    public static get main():Bundle{
        if (this._mainBundle == null){            
            let urlString = MIOCoreGetMainURLString();

            this._mainBundle = new Bundle();
            this._mainBundle.initWithURL( new URL( urlString ) );
        }

        return this._mainBundle;
    }

    initWithURL(url:URL){
        this.url = url;
    }

    loadNibNamed(name:string, owner:any, options:any){
        let path = MIOCoreGetMainURLString() + "/" + name;
        MIOCoreGetContentsFromURLString(path, this, function(code, data){
            owner._didLoadNibWithLayerData(data);
        });
    }

    pathForResourceOfType( resource:string, type:string ) : any {
        return _MIOBundleAppGetResource("Main", resource, type);        
    }

}

function MIOCoreBundleDownloadResource(name:string, extension:string, target, completion){        
    // let resource = name + "." + extension;
    // let request = NSURLRequest.requestWithURL(NSURL.urlWithString(resource));
    // let con = new NSURLConnection();
    // con.initWithRequestBlock(request, target, function(code, data){
    //     if (code == 200) {                
    //         MIOCoreBundleSetAppResource(name, extension, data);
    //     }
    //     completion.call(target, data);
    // });        

}

let _MIOCoreBundleLoadCompletion:any;

export function _MIOBundleLoadBundles(urlString:string, completion:any) {
    // Download and create the App Bundles    

    _MIOCoreBundleLoadCompletion = completion;

    MIOCoreGetContentsFromURLString(urlString, this, function(this:Bundle, code:number, data:string){
        if (code != 200) {
            completion( new Error("Bundles not found!"));
            return;
        }
        
        // Process the data
        let bundleJSON = null;
        try {
            bundleJSON = JSON.parse(data.replace(/(\r\n|\n|\r)/gm, ""));    
        } catch (error) {
            NSLog ("BUNDLE JSON PARSER ERROR: " + error);
            NSLog ("BUNDLE JSON PARSER DATA: " + data);
            completion(new Error("BUNDLE JSON PARSER ERROR"));
            return;
        }

        // Keep going
        _MIOBundleResourcesDownloadingCount = 0;
        for (let key in bundleJSON) {
            let resources = bundleJSON[key];
            _MIOBundleResourcesDownloadingCount += resources.length;
            _MIOBundleCreateBundle(key, resources);
        }        
    });
}

let _MIOBundleResourcesDownloadingCount = 0

export function _MIOBundleCreateBundle(key:string, resources:any){    

    for (let urlString of resources) {
                
        MIOCoreGetContentsFromURLString(urlString, this, function(this:Bundle, code:number, data:any){ 
            _MIOBundleResourcesDownloadingCount--;
            if (code == 200) {                
                let type = urlString.match(/\.[0-9a-z]+$/i);
                if (type != null && type.length > 0) type = type[0].substring(1);
                let resource = type != null ? urlString.substring(0, urlString.length - type.length - 1) : urlString ;
                _MIOBundleSetResource(key, resource, type, data);
            }
            _MIOBundleResourceDownloadCheck();
        });
    }

}

export function  _MIOBundleResourceDownloadCheck(){
    if (_MIOBundleResourcesDownloadingCount > 0) return;    
    _MIOCoreBundleLoadCompletion( null );    
    _MIOCoreBundleLoadCompletion = null;    
}


var _MIOAppBundles = {};

export function _MIOBundleSetResource(identifier:string, resource:string, type:string, content:string){

    console.log("ID: " + identifier + ", " + resource + ", " + type);

    let bundle = _MIOAppBundles[identifier];
    if (bundle == null) {
        bundle = {}
        _MIOAppBundles[identifier] = bundle;
    }

    let t = type;
    if (type == null) t = "NO_TYPE";
    let files = bundle[t];
    if (files == null) {
        files = {};
        bundle[t] = files;
    }

    files[resource] = content;
}

export function _MIOBundleAppGetResource(identifier:string, resource:string, type:string){

    let bundle = _MIOAppBundles[identifier];
    if (bundle == null) return null;    

    let t = type;
    if (type == null) t = "NO_TYPE";
    let files = bundle[t];
    if (files == null) return null;

    let content = files[resource];
    return content;
}

