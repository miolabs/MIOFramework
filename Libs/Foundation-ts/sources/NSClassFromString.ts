import { MIOCoreClassByName } from "mio-core";

export function NSClassFromString( className:string ) : any 
{
    let classObject = MIOCoreClassByName( className );
    
    if (classObject == null) throw new Error("NSClassFromString: class '" + className + "' didn't register.");

    let newClass = new classObject();
    // if((newClass as any).init$vars) (newClass as any).init$vars()//quick fix for transpiler because it needs it
    newClass._className = className;
    
    return newClass;
}