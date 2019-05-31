var fs = require("file-system");
var NSXMLParser = require("mio-foundation-node").NSXMLParser;

//GLOBAL VARIABLES
var currentFileName = null;
var currentFileContent = null;
var elementsStack = [];
var currentElement = null;
var outletsStack = [];

function parseDocument(xmlString) {	
	console.log('Entering Document');			

	var parser = new NSXMLParser();
	parser.initWithString(xmlString, this);
	parser.parse();	
}

function parserDidStartDocument(parser){
	console.log("Start to parse the storyboard");
}

function parserDidStartElement(parser, element, attributes){
	
	if (element == "scene"){				
		let id = attributes["sceneID"];
		currentFileName = "scene-" + id + ".html";		
		currentFileContent = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="base.css"></head><body><div class="scene" id="' + id + '">';
	}
	else if (element == "viewController"){
		let id = attributes["id"];
		let customClass = attributes["customClass"] || "UIViewController";
					
		currentFileContent += '<div class="view-controller" id="' + id + '" data-root-view-controller="true"';	
		currentFileContent += ' data-class="' + customClass + '"';
		currentFileContent += '>';

		let outlets = {};
		outletsStack.push(outlets);
	}
	else if (element == "navigationController"){
		let id = attributes["id"];
		let customClass = attributes["customClass"] || "UINavigationController";
					
		currentFileContent += '<div class="nav-controller" id="' + id + '" data-root-view-controller="true"';	
		currentFileContent += ' data-class="' + customClass + '"';
		currentFileContent += '>';

		let outlets = {};
		outletsStack.push(outlets);
	}
	else if (element == "view"){
		pushNewElement(element, attributes);
	}
	else if (element == "label"){
		let item = pushNewElement(element, attributes);
		parseTextAlignment(attributes["textAlignment"], item["Classes"]);

		let text = attributes["text"];			
		if (text != null) item["Content"] = item["Content"] + "<span>" + text + "</span>";
	}
	else if (element == "button"){
		let item = pushNewElement(element, attributes);		
		parseTextAlignment(attributes["textAlignment"], item["Classes"]);
		parseButtonType(attributes["buttonType"], item["Classes"]);
	}
	else if (element == "textField"){
		let item = pushNewElement(element, attributes);		
		parseTextAlignment(attributes["textAlignment"], item["Classes"]);		
	
		let inputAttrs = [];	
		if (attributes["text"] != null) inputAttrs.push("value='" + attributes["text"] + "'");
		if (attributes["placeholder"] != null) inputAttrs.push("placeholder='" + attributes["placeholder"] + "'");
		
		let inputClasses = [];
		parseBorderStyle(attributes["borderStyle"], inputClasses);
		if (inputClasses.length > 0) inputAttrs.push(classesStringify(inputClasses));		
		
		item["Content"] = item["Content"] + '<input type="text" ' + inputAttrs.join(" ") + '>'
	}
	else if (element == "rect"){
		let styles = currentElement["Styles"];
		styles.push("position:absolute;");
	
		if (attributes["x"] != null) styles.push("left:" + attributes["x"] + "px;");
		if (attributes["y"] != null) styles.push("top:" + attributes["y"] + "px;");
		if (attributes["width"] != null) styles.push("width:" + attributes["width"] + "px;");
		if (attributes["height"] != null) styles.push("height:" + attributes["height"] + "px;");		
	}
	else if (element == "color"){
		let styles = currentElement["Styles"];
		let key = parseColorKey(attributes["key"]);
		if (key == null) return;

		let r = 0;
		let g = 0;
		let b = 0;
		if (attributes["white"] == "1") {
			r = 255;
			g = 255;
			b = 255;	
		}
		else {
			let r = parseFloat(attributes["red"]) * 255;
			let g = parseFloat(attributes["green"]) * 255;
			let b = parseFloat(attributes["blue"]) * 255;		
		}
		
		let a = parseFloat(attributes["alpha"]);
		
		let value = key + ":rgba(" + r + ", " + g + ", " + b + ", " + a + ");";
		styles.push(value);	
	}
	else if (element == "fontDescription"){
		let styles = currentElement["Styles"];
		let size = attributes["pointSize"];	
		if (size != null) styles.push("font-size:" + size + "px;");	
	}
	else if (element == "state"){
		let title = attributes["title"];
		if (title != null) currentElement["Content"] = currentElement["Content"] + '<span>' + title + '</span>';	
	}
	else if (element == "action") {
		let selector =  attributes["selector"];
		//TODO: let eventType = attributes["eventType"];		
		currentElement["Content"] = currentElement["Content"] + '<div class="hidden" data-action-selector="' + selector.replace("WithSender:", "") +'"></div>';
	}
	else if (element == "outlet") {
		let outlet = attributes["property"];
		let destination = attributes["destination"];
						
		let outlets = outletsStack[outletsStack.length - 1];
		outlets[outlet] = destination;		
	}
}

function parserDidEndElement(parser, element){

	if (element == "scene"){				
		currentFileContent += '</div></body></html>';
		generateHtmlFile();			
		console.log(currentFileContent);
		currentFileName = null;
		currentFileContent = null;
	}
	else if (element == "viewController" || element == "navigationController"){
		let outlets = outletsStack.pop();
		currentFileContent += '<div data-outlets="true">';
		for (let key in outlets){
			let id = outlets[key];
			currentFileContent += '<div data-outlet="' + id + '" data-property="' + key + '"></div>';
		}
		currentFileContent += '</div></div>';				
	}
	else if (element == "view"){
		popElement();
	}
	else if (element == "label"){
		popElement();
	}
	else if (element == "button"){
		popElement();
	}
	else if (element == "textField"){
		popElement();
	}
}

function pushNewElement(element, attributes){
	let id = attributes["id"];
	let contenMode = parseContentMode(attributes["contentMode"]);
	
	let item = {};		
	let styles = [];
	let classes = [];
	item["ID"] = id;
	item["Content"] = "";
	item["Styles"] = styles;
	item["Classes"] = classes;	
	
	if (attributes["customClass"] != null) item["ExtraAttributes"] = ['data-class="' + attributes["customClass"] + '"'];
	else if (element == "view") item["ExtraAttributes"] = ['data-class="UIView"'];
	else if (element == "label") item["ExtraAttributes"] = ['data-class="UILabel"'];
	else if (element == "button") item["ExtraAttributes"] = ['data-class="UIButton"'];

	classes.push(parseClassType(element));
	if (contenMode != null) classes.push(contenMode);

	elementsStack.push(item);
	currentElement = item;

	return item;
}

function popElement(){
	let item = elementsStack.pop();
	console.log(item["Classes"]);
	let parentItem = null;	
	let parentContent = "";	
	if (elementsStack.length > 0){
		parentItem = elementsStack[elementsStack.length - 1];
		currentElement = parentItem;			
	}

	let id = item["ID"];
	let classes = item["Classes"];
	let styles = item["Styles"];
	let extraAttributes = item["ExtraAttributes"];
	classes = classes.length > 0 ? 'class="' + classes.join(" ") + '"': '';		
	styles = styles.length > 0 ? 'style="' + styles.join("") + '"': '';		
	let content = item["Content"];

	addContentToParentItem('<div ' + classes + 'id="' + id + '"' + extraAttributes.join(" ") + styles + '>', parentItem);
	if (content != null) addContentToParentItem(content, parentItem);			
	addContentToParentItem('</div>', parentItem);		

}

function addContentToParentItem(content, item){
	if (item == null) {
		currentFileContent += content;		
	}
	else {
		item["Content"] = item["Content"] + content;		
	}
}

function parserFoundCharacters(parser, characters){

}

function parserDidEndDocument(parser){

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
	fs.writeFileSync("./ITests/Demo2App/Demo2App/dist/" + currentFileName, currentFileContent);
}

module.exports = {
	parseDocument,
	parserDidStartDocument,
	parserDidStartElement,
	parserDidEndElement,
	parserDidEndDocument
};