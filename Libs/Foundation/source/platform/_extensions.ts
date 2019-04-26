
interface String
{ 
    lastPathComponent():string; 
    pathExtension():string;     
    stringByAppendingPathComponent(path:string):string;
    stringByDeletingLastPathComponent():string; 
    hasPreffix(preffix:string):boolean; 
    hasSuffix(suffix:string):boolean;     
};

interface Array<T>
{
    count():number;
    addObject(object:any):void;
    removeObject(object:any):void;
    removeObjectAtIndex(index:number):void;
    indexOfObject(object:any):number;
    containsObject(object:any):boolean;
    objectAtIndex(index:number):any;
    firstObject():any;
    lastObject():any;
};

