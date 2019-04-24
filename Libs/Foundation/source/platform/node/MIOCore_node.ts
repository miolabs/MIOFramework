
import {MIOCorePlatformType} from "../../core/MIOCoreTypes"


export function MIOCoreGetPlatform():MIOCorePlatformType {
    return MIOCorePlatformType.Node;
}

export function NSClassFromString(className:string)
{
    return null;
}

export function MIOCoreGetPlatformLocale(){
    return "en_US";
}

export function MIOCoreGetPlatformLanguage(){
    return "en";
}

export function MIOCoreIsPhone()
{    
    return false;
}

export function MIOCoreIsPad()
{
    return false;    
}

export function MIOCoreIsMobile()
{
    return false;
}

export function MIOCoreBundleGetMainURLString():string{
    return null;
}


export function MIOCoreBundleGetContentsFromURLString(path:string, target, completion):string{
    return null;
}
