
export var _UICoreLayerIDCount = 0;

export function UICoreLayerIDFromObject(object): string {

    var classname = object.constructor.name.substring(3);
    return UICoreLayerIDFromClassname(classname);
}

export function UICoreLayerIDFromClassname(classname:string): string {

    var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    var random = "";
    for (var count = 0; count < 4; count++) {
        var randomNumber = Math.floor(Math.random() * 16);
        var randomDigit = digits[randomNumber];
        random += randomDigit;
    }

    var layerID = classname.toLowerCase() + "_" + random;
    _UICoreLayerIDCount++;

    return layerID;
}

export function UICoreLayerCreate(layerID?) {
    var layer = document.createElement("DIV");
    if (layerID != null)
        layer.setAttribute("id", layerID);

    //layer.style.position = "absolute";

    return layer;
}

export function UICoreLayerAddSublayer(layer, subLayer){    
    layer.appendChild(subLayer);
}

export function UICoreLayerRemoveSublayer(layer, subLayer){    
    layer.removeChild(subLayer);
}

export function UICoreLayerCreateWithStyle(style, layerID?) {
    var layer = UICoreLayerCreate(layerID);
    UICoreLayerAddStyle(layer, style);

    return layer;
}

export function UICoreLayerAddStyle(layer, style) {
    layer.classList.add(style);
}

export function UICoreLayerRemoveStyle(layer, style) {
    layer.classList.remove(style);
}
