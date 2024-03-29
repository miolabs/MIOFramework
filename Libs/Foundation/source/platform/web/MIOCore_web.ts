// import { MIOCorePlatformType } from "../../core/MIOCoreTypes";

function NSClassFromString(className:string){
    let classObject = window[className];
    //if (classObject == null) classObject = MIOCoreClassByName(className);

    if (classObject == null) throw new Error("NSClassFromString: class '" + className + "' didn't register.");

    let newClass = new classObject();
    if((newClass as any).init$vars) (newClass as any).init$vars()//quick fix for transpiler because it needs it
    return newClass;
}

function MIOCoreGetPlatform():MIOCorePlatformType {
    let agent = navigator.userAgent.toLowerCase();
    let browserType = MIOCorePlatformType.Unknown;    
    if (agent.indexOf("chrome") != -1) browserType = MIOCorePlatformType.Chrome;
    else if (agent.indexOf("safari") != -1) browserType = MIOCorePlatformType.Safari;    
    
    return browserType;
}

function MIOCoreGetPlatformLocale(){
    // navigator.languages:    Chrome & FF
    // navigator.language:     Safari & Others
    // navigator.userLanguage: IE & Others
    return navigator.languages || navigator.language || navigator['userLanguage'];
}

function MIOCoreGetPlatformLanguage(){
    let locale = MIOCoreGetPlatformLocale();
    if (typeof(locale) == "string") return locale.substring(0, 2);
    else {
        let l = locale[0];
        return l.substring(0, 2);
    }
}

function MIOCoreIsPhone(){    

    let phone = ['iphone','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
    for (let index = 0; index < phone.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(phone[index].toLowerCase()) > 0) {
            return true;
        }
    }    
    return false;
}

function MIOCoreIsPad(){
    let pad = ['ipad'];
    for (let index = 0; index < pad.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(pad[index].toLowerCase()) > 0) {
            return true;
        }
    }
    
    return false;    
}

function MIOCoreIsMobile()
{
    //var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
    let mobile = ['iphone','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
    for (let index = 0; index < mobile.length; index++) {
        if (navigator.userAgent.toLowerCase().indexOf(mobile[index].toLowerCase()) > 0) return true;
    }

    // nothing found.. assume desktop
    return false;
}

function MIOCoreBundleGetMainURLString():string{
    return window.location.href;
}

function MIOCoreBundleGetContentsFromURLString(path:string, target:any, completion:any){
    let xhr = new XMLHttpRequest();

    xhr.onload = function () {        
        completion.call(target, this.status, this.responseText);    
    };
    xhr.open("GET", path);
    xhr.send();
}

