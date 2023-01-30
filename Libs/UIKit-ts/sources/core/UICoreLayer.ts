
let _MUICoreLayerIDCount = 0;

export function UICoreLayerIDFromObject(object): string 
{
    let classname = object.constructor.name;
    return UICoreLayerIDFromClassname(classname);
}

export function UICoreLayerIDFromClassname(classname:string): string 
{
    let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    let random = "";
    for (let count = 0; count < 4; count++) {
        let randomNumber = Math.floor(Math.random() * 16);
        let randomDigit = digits[randomNumber];
        random += randomDigit;
    }

    let layerID = classname.toLowerCase() + "_" + random;
    _MUICoreLayerIDCount++;

    return layerID;
}

function MUICoreLayerCreate(layerID?) {
    let layer = document.createElement("DIV");
    if (layerID != null)
        layer.setAttribute("id", layerID);

    //layer.style.position = "absolute";

    return layer;
}

function MUICoreLayerAddSublayer(layer, subLayer){    
    layer.appendChild(subLayer);
}

function MUICoreLayerRemoveSublayer(layer, subLayer){    
    layer.removeChild(subLayer);
}

function MUICoreLayerCreateWithStyle(style, layerID?) {
    var layer = MUICoreLayerCreate(layerID);
    MUICoreLayerAddStyle(layer, style);

    return layer;
}

function MUICoreLayerAddStyle(layer:any, style:string) {
    layer.classList.add(style);
}

function MUICoreLayerRemoveStyle(layer, style) {
    layer.classList.remove(style);
}

function MUICoreLayerSearchElementByAttribute(layer, key)
{
    if (layer.tagName != "DIV" && layer.tagName != "INPUT" && layer.tagName != "SECTION")
            return null;

    if (layer.getAttribute(key) == "true") return layer;
    
    let elementFound = null;

    for (let count = 0; count < layer.childNodes.length; count++){
        let l = layer.childNodes[count];
        elementFound = MUICoreLayerSearchElementByAttribute(l, key);
        if (elementFound != null) return elementFound;
    }

    return null;
}



function MUICoreLayerSearchElementByID(layer, elementID)
{
    if (layer.tagName != "DIV" && layer.tagName != "INPUT" && layer.tagName != "SECTION")
            return null;

    if (layer.getAttribute("data-outlet") == elementID)
        return layer;
    
    // Deprecated. For old code we still mantein
    if (layer.getAttribute("id") == elementID)
        return layer;

    let elementFound = null;

    for (let count = 0; count < layer.childNodes.length; count++){
        let l = layer.childNodes[count];
        elementFound = MUICoreLayerSearchElementByID(l, elementID);
        if (elementFound != null)
            return elementFound;

    }

    return null;
}

function MUICoreLayerGetFirstElementWithTag(layer, tag)
{
    let foundLayer:HTMLElement|null = null;

    if (layer.childNodes.length > 0) {
        let index = 0;
        foundLayer = layer.childNodes[index];
        while (foundLayer.tagName != tag) {
            index++;
            if (index >= layer.childNodes.length) {
                foundLayer = null;
                break;
            }

            foundLayer = layer.childNodes[index];
        }
    }

    return foundLayer;
}