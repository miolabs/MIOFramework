import { MIOCorePlatformType } from "./MIOCoreTypes";


export function NSClassFromString(className:string):any{
    return null;
}

export function MIOCoreGetPlatform():MIOCorePlatformType {
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

