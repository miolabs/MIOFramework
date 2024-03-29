
function MIOCoreStringHasPreffix(str, preffix)
{
    return str.substring(0, preffix.length) === preffix;
}

function MIOCoreStringHasSuffix(str, suffix)
{
    let s = str.substr(str.length - suffix.length);
    return s == suffix;
}

function MIOCoreStringAppendPathComponent(string:string, path):string
{
    let str = string;

    if (string.charAt(string.length - 1) == "/" && path.charAt(0) == "/"){
        str += path.substr(1);
    }
    else if (string.charAt(string.length - 1) != "/" && path.charAt(0) != "/"){
        str += "/" + path;
    }
    else {
        str += path;
    }

    return str;
}

function MIOCoreStringLastPathComponent(string:string)
{
    let index = string.lastIndexOf("/");
    if (index == -1) return string;
    let len = string.length - index;
    let str = string.substr(index, len);

    return str;
}

function MIOCoreStringPathExtension(string:string):string
{
    let lastPathComponent = MIOCoreStringLastPathComponent(string);
    let items = lastPathComponent.split(".");
    if (items.length == 1) return "";

    let ext = items[items.length - 1];
    return ext;
}

function MIOCoreStringDeletingLastPathComponent(string:string)
{
    let index = string.lastIndexOf("/");
    let str = string.substr(0, index);

    return str;
}

function MIOCoreStringStandardizingPath(string)
{
    let array = string.split("/");

    let newArray = []; 
    let index = 0;
    for (let count = 0; count < array.length; count++)
    {
        let component:string = array[count];
        if (component.substr(0,2) == "..")
            index--;
        else 
        {
            newArray[index] = component;
            index++;
        }                
    }

    let str = "";
    if (index > 0)
        str = newArray[0];

    for (let count = 1; count < index; count++){
        str += "/" + newArray[count];
    }

    return str;
}


let _MIOLocalizedStrings = null;
function MIOCoreStringSetLocalizedStrings(data) 
{
    _MIOLocalizedStrings = data
}

function MIOCoreStringGetLocalizedStrings() 
{
    return _MIOLocalizedStrings
}

function  MIOCoreStringLocalizeString(key:string, defaultValue:string){
    let strings =  MIOCoreStringGetLocalizedStrings;
    if (strings == null)
        return defaultValue;

    let value = strings[key];
    if (value == null)
        return defaultValue;

    return value;
}
