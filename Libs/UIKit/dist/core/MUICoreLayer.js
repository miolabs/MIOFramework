"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._MUICoreLayerIDCount = 0;
function MUICoreLayerIDFromObject(object) {
    var classname = object.constructor.name.substring(3);
    return MUICoreLayerIDFromClassname(classname);
}
exports.MUICoreLayerIDFromObject = MUICoreLayerIDFromObject;
function MUICoreLayerIDFromClassname(classname) {
    var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    var random = "";
    for (var count = 0; count < 4; count++) {
        var randomNumber = Math.floor(Math.random() * 16);
        var randomDigit = digits[randomNumber];
        random += randomDigit;
    }
    var layerID = classname.toLowerCase() + "_" + random;
    exports._MUICoreLayerIDCount++;
    return layerID;
}
exports.MUICoreLayerIDFromClassname = MUICoreLayerIDFromClassname;
function MUICoreLayerCreate(layerID) {
    var layer = document.createElement("DIV");
    if (layerID != null)
        layer.setAttribute("id", layerID);
    //layer.style.position = "absolute";
    return layer;
}
exports.MUICoreLayerCreate = MUICoreLayerCreate;
function MUICoreLayerAddSublayer(layer, subLayer) {
    layer.appendChild(subLayer);
}
exports.MUICoreLayerAddSublayer = MUICoreLayerAddSublayer;
function MUICoreLayerRemoveSublayer(layer, subLayer) {
    layer.removeChild(subLayer);
}
exports.MUICoreLayerRemoveSublayer = MUICoreLayerRemoveSublayer;
function MUICoreLayerCreateWithStyle(style, layerID) {
    var layer = MUICoreLayerCreate(layerID);
    MUICoreLayerAddStyle(layer, style);
    return layer;
}
exports.MUICoreLayerCreateWithStyle = MUICoreLayerCreateWithStyle;
function MUICoreLayerAddStyle(layer, style) {
    layer.classList.add(style);
}
exports.MUICoreLayerAddStyle = MUICoreLayerAddStyle;
function MUICoreLayerRemoveStyle(layer, style) {
    layer.classList.remove(style);
}
exports.MUICoreLayerRemoveStyle = MUICoreLayerRemoveStyle;
//# sourceMappingURL=MUICoreLayer.js.map