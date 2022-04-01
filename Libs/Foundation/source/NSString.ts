// import "./extensions/extensions";
// import { MIOCoreStringPathExtension, MIOCoreStringHasPreffix, MIOCoreStringHasSuffix, MIOCoreStringLastPathComponent, MIOCoreStringAppendPathComponent, MIOCoreStringDeletingLastPathComponent, MIOCoreStringLocalizeString } from "./core/MIOCoreString";
/// <reference path="./core/MIOCoreString.ts" />
/// <reference path="./extensions/extensions.ts" />


String.prototype.lastPathComponent = function() {
    return MIOCoreStringLastPathComponent(this);    
}

String.prototype.pathExtension = function(){
    return MIOCoreStringPathExtension(this);
} 

String.prototype.stringByAppendingPathComponent = function(path:string):string{
    return MIOCoreStringAppendPathComponent(this, path);
}

String.prototype.stringByDeletingLastPathComponent = function():string{
    return MIOCoreStringDeletingLastPathComponent(this);
}

String.prototype.hasPreffix = function(preffix:string):boolean{
    return MIOCoreStringHasPreffix(this, preffix);
}

String.prototype.hasSuffix = function(suffix:string):boolean{
    return MIOCoreStringHasSuffix(this, suffix);
}

function NSLocalizeString(key:string, defaultValue:string)
{
    return MIOCoreStringLocalizeString(key, defaultValue);
}
