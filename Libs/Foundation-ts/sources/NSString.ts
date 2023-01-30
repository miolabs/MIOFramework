import { MIOCoreStringAppendPathComponent, MIOCoreStringDeletingLastPathComponent, MIOCoreStringHasPreffix, MIOCoreStringHasSuffix, MIOCoreStringLastPathComponent, MIOCoreStringPathExtension, MIOLocalizeString } from "mio-core";

declare global {
interface String
{ 
    lastPathComponent():string; 
    pathExtension():string;     
    stringByAppendingPathComponent(path:string):string;
    stringByDeletingLastPathComponent():string; 
    hasPreffix(preffix:string):boolean; 
    hasSuffix(suffix:string):boolean;     
}
}

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

export function NSLocalizeString(key:string, comments:string)
{
    return MIOLocalizeString(key, comments);
}

