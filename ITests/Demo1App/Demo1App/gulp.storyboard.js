var fs = require("file-system");

//GLOBAL VARIABLES
var currentFileName = null;
var currentFileContent = null;

function parseDocument(node) {	
	console.log('Entering Document');		

	let doc = node["document"];
	if (doc == null) return null; // Error

	parseScenes(doc["scenes"]);

	console.log(currentFileContent);
}

function parseScenes(item){
	console.log("Entering parseScenes");
	console.log(item);
	
	for (let index = 0; index < item.length; index++){
		let sc = item[index];
		parseScene(sc["scene"]);
	}	
}

function parseScene(item){
	console.log("Entering parseScene");
	console.log(item);
	let attr = item[0]["$"];
	console.log(attr);
	let id = attr["sceneID"];
	currentFileName = "scene-" + id + ".html";
	console.log(currentFileName);
	currentFileContent = "<html><head><link rel='stylesheet' type='text/css' href='base.css'></head><body><div class='scene' id='"+ id +"'>";

	let objs = item[0]["objects"];
	parseObjects(objs);			
		
	currentFileContent += "</div></body></html>";
	generateHtmlFile();		
}

function parseObjects(item) {
	console.log("Entering objects");
	let objs = item[0];
	console.log(objs);

	parseViewController(objs["viewController"])
}

function parseViewController(item){
	console.log("Entering parseViewController");
	console.log(item);
	let attr = item[0]["$"];
	console.log(attr);

	let id = attr["id"];
	let customClass = attr["customClass"];	
		
	currentFileContent += "<div class='viewController' id='" + id + "'";	
	if (customClass != null) currentFileContent += " data-class='" + customClass + "'";
	currentFileContent += ">";	
	
	parseView(item[0]["view"][0], "view");
	
	currentFileContent += "</div>";	
}

function parseClassType(classType){
	switch (classType){
		case "textField":
		return "text-field";
	}

	return classType;
}

function parseView(item, classType){
	console.log("Entering parseView");
	console.log(item);	
	let attr = item["$"];
	console.log(attr);
	
	let id = attr["id"];
	let contenMode = parseContentMode(attr["contentMode"]);
	
	let classes = []; 
	classes.push(parseClassType(classType));	
	if (contenMode != null) classes.push(contenMode);		
	
	let content = null;

	switch (classType){
		case "label":
		content = parseLabel(item, classes);
		break;

		case "button":
		content = parseButton(item, classes);
		break;

		case "textField":
		content = parseTextField(item, classes);
		break;
	}

	let styles = []; 
	parseProperties(item, styles);	
	if (styles.length > 0) {
		styles = "style='" + styles.join("") + "'"; 
	}
	else {
		styles = "";
	}

	currentFileContent += "<div class='" + classes.join(" ") + "' id='" + id + "'" + styles + ">";
	if (content != null) currentFileContent += content;

	let sv = item["subviews"];
	parseSubViews(sv);
	
	currentFileContent += "</div>";	
}

function parseSubViews(item){
	if (item == null) return;

	console.log("Entering parseSubViews");
	let objs = item[0];
	console.log(objs);

	for (let key in objs){
		let obj = objs[key];
		for (let index = 0; index < obj.length; index++){
			let v = obj[index];
			parseView(v, key);
		}		
	}
}

function parseContentMode(contentMode){
	switch (contentMode){
		case "scaleToFill":
		return "scale-to-fill";
	}

	return null;
}


function parseProperties(item, styles){
	console.log("Entering parse Properties");
	console.log(item);
	for (let type in item){
		if (type == "subviews") continue;		
		
		switch(type){
			case "rect":
			parseRects(item, styles);
			break;

			case "fontDescription":
			parseFonts(item, styles);
			break;

			case "color":
			parseColors(item, styles);
			break;
		}
	}

}

function parseRects(view, styles){	
	let rects = view["rect"];
	if (rects == null) return;
	for (let index = 0; index < rects.length; index++){
		let r = rects[index];		
		parseViewRect(r, styles);
	}
}

function parseViewRect(rect, styles){
	console.log("Entering parse Rect");
	let attr = rect["$"];
	if (attr["key"] != "frame") return;
	
	styles.push("position:absolute;");
	
	if (attr["x"] != null) styles.push("left:" + attr["x"] + "px;");
	if (attr["y"] != null) styles.push("top:" + attr["y"] + "px;");
	if (attr["width"] != null) styles.push("width:" + attr["width"] + "px;");
	if (attr["height"] != null) styles.push("height:" + attr["height"] + "px;");	
}

function parseFonts(item, styles){
	let fonts = item["fontDescription"];
	if (fonts == null) return;
	for (let index = 0; index < fonts.length; index++){
		let f = fonts[index];		
		parseFont(f, styles);
	}
}

function parseFont(item, styles){
	console.log("Entering parse Font Description");
	let attr = item["$"];
	let size = attr["pointSize"];
	
	if (size != null) styles.push("font-size:" + size + "px;");
}

function parseLabel(label, classes){	
	let attr = label["$"];
	let content = "";
	
	let text = attr["text"];	
	if (text != null) content += "<span>" + text + "</span>"

	parseTextAlignment(attr["textAlignment"], classes);	

	return content;
}

function parseTextAlignment(align, classes){
	if (align == null) return;
	let ta = null;
	switch (align){
		case "natural":
		ta = "align-left";
		break;

		default:
		ta = "align-" + align;
		break;
	}	
	
	classes.push(ta);
}

function parseColors(item, styles){
	let colors = item["color"];
	if (colors == null) return;
	for (let index = 0; index < colors.length; index++){
		let c = colors[index];		
		parseColor(c, styles);
	}
}

function parseColor(color, styles){
	console.log("Entering parse Color");
	let attr = color["$"];
	console.log(color);

	let key = parseColorKey(attr["key"]);
	if (key == null) return;
	let r = parseFloat(attr["red"]) * 255;
	let g = parseFloat(attr["green"]) * 255;
	let b = parseFloat(attr["blue"]) * 255;
	let a = parseFloat(attr["alpha"]);
	
	let value = key + ":rgba(" + r + ", " + g + ", " + b + ", " + a + ");";
	styles.push(value);
}

function parseColorKey(key){
	switch (key){
		case "backgroundColor":
		return "background-color";
	}

	return null;
}

function parseButton(button, classes){		
	let attr = button["$"];	
	let content = "";
	
	parseButtonType(attr["buttonType"], classes);		
		
	let title = parseButtonState(button["state"], "title");
	if (title != null) content += "<span>" + title + "</span>";

	return content;
}

function parseButtonType(type, classes){	
	let value = "default";

	switch(type){
		case "roundedRect":
		value = "rounded-rect";
		break;
	}

	classes.push(value);
}


function parseButtonState(buttonState, key){
	if (buttonState == null) return null;
	let state = buttonState[0];
	let value = state["$"][key];
	return value;
}

function parseTextField(textField, classes){
	let attr = textField["$"];		

	parseTextAlignment(attr["textAlignment"], classes);	
	
	let attributes = [];	
	if (attr["text"] != null) attributes.push("value='" + attr["text"] + "'");
	if (attr["placeholder"] != null) attributes.push("placeholder='" + attr["placeholder"] + "'");
	
	let inputClasses = [];
	parseBorderStyle(attr["borderStyle"], inputClasses);
	if (inputClasses.length > 0) attributes.push(classesStringify(inputClasses));		
	
	let content = "<input type='text' " + attributes.join(" ") + ">"

	return content;
}

function parseBorderStyle(borderStyle, classes){
	let value = null

	switch(borderStyle){
		case "roundedRect":
		value = "rounded-rect";
		break;
	}

	if (value != null) classes.push(value);
}

function classesStringify(classes){
	if (classes == null) return "";
	if (classes.length == 0) return "";

	return "class='" + classes.join(" ") + "'";
}

function generateHtmlFile() {
	fs.writeFileSync("./ITests/Demo1App/Demo1App/dist/" + currentFileName, currentFileContent);
}

module.exports = {
	parseDocument
};