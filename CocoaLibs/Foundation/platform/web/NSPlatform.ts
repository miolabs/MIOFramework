import {MIOCoreClassByName} from "./MIOCore"

export function NSClassFromString(className)
{
    let classObject = window[className];
    if (classObject == null) classObject = MIOCoreClassByName(className);

    if (classObject == null) throw new Error("MIOClassFromString: class '" + className + "' didn't register.");

    let newClass = new classObject();
    return newClass;
}
