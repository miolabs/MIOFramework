interface String 
{ 
    lastPathComponent():string, 
    pathExtension():string,     
    stringByAppendingPathComponent(path:string):string,
    stringByDeletingLastPathComponent():string, 
    hasPreffix(preffix:string):boolean, 
    hasSuffix(suffix:string):boolean 
};

//For code completion the interface is defined in types/mio/index.d.ts

String.prototype.lastPathComponent = function():string{
    return MIOCoreStringLastPathComponent(this);
}

String.prototype.pathExtension = function():string{
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
    var index = string.lastIndexOf("/");
    var str = string.substr(0, index);

    return str;
}

function MIOCoreStringStandardizingPath(string)
{
    var array = string.split("/");

    var newArray = []; 
    var index = 0;
    for (let count = 0; count < array.length; count++)
    {
        var component:string = array[count];
        if (component.substr(0,2) == "..")
            index--;
        else 
        {
            newArray[index] = component;
            index++;
        }                
    }

    var str = "";
    if (index > 0)
        str = newArray[0];

    for (let count = 1; count < index; count++)
    {
        str += "/" + newArray[count];
    }

    return str;
}


let _MIOLocalizedStrings = null;

function MIOLocalizeString(key, defaultValue)
{
    let strings =  _MIOLocalizedStrings;
    if (strings == null)
        return defaultValue;

    let value = strings[key];
    if (value == null)
        return defaultValue;

    return value;
}

function setMIOLocalizedStrings(data) {
    _MIOLocalizedStrings = data
}

function getMIOLocalizedStrings() {
    return _MIOLocalizedStrings
}
