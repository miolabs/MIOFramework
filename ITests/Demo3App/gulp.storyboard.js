var fs = require("./node_modules/file-system");
var NSXMLParser = require("./node_modules/mio-foundation-node").NSXMLParser;
var NSPropertyListSerialization = require("./node_modules/mio-foundation-node").NSPropertyListSerialization;

//GLOBAL VARIABLES
var initialViewControllerID = null;
var storyBoardItems = {};

var currentFileName = null;
var currentFileContent = null;
var elementsStack = [];
var currentElement = null;

function parseDocument(xmlString, filename) {	
	console.log('Entering Document');			

	var parser = new NSXMLParser();
	parser.initWithString(xmlString, this);
	parser.parse();	

	generateStoryboardFile(filename);
}

function parserDidStartDocument(parser){
	console.log("Start to parse the storyboard");
}

function parserDidStartElement(parser, element, attributes){
	
	if (element == "document"){
		initialViewControllerID = attributes["initialViewController"];
	}
	if (element == "scene"){				
		let id = attributes["sceneID"];		
		currentFileContent = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="base.css"></head><body>';
	}
	else if (element == "viewController" || element == "navigationController" || element == "tableViewController"){
		let item = pushNewElement(element, attributes);
		
		let id = attributes["id"];
		currentFileName = id + ".html";								
		
		storyBoardItems[id] = item["CustomClass"];		

		item["ExtraAttributes"].push('data-root-view-controller="true"');
	}
	else if (element == "view"){
		pushNewElement(element, attributes);
	}
	else if (element == "navigationBar"){
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
	else if(element == "tableView") {
		pushNewElement(element, attributes);
	}
	else if(element == "tableViewCell") {
		let item = pushNewElement(element, attributes);

		let reuseIdentifier = attributes["reuseIdentifier"];
		item["ExtraAttributes"].push('data-cell-identifier="' + reuseIdentifier + '"');
	}
	else if(element == "tableViewCellContentView") {
		pushNewElement(element, attributes);
	}
	else if (element == "segmentedControl"){
		let item = pushNewElement(element, attributes);						
	
		parseSegmentControlStyle(attributes["segmentControlStyle"], item["Classes"]);		
	}
	else if (element == "segment"){		
		currentElement["Content"] = currentElement["Content"] + '<div class="segment"><span>' + attributes["title"] +'</span></div>';
	}
	else if (element == "switch"){
		let item = pushNewElement(element, attributes);
	}
	else if (element == "slider"){
		let item = pushNewElement(element, attributes);
	}
	else if (element == "progressView"){
		let item = pushNewElement(element, attributes);
	}
	else if (element == "activityIndicatorView"){
		let item = pushNewElement(element, attributes);
	}
	else if (element == "pageControl"){
		let item = pushNewElement(element, attributes);
	}
	else if (element == "stepper"){
		let item = pushNewElement(element, attributes);
	}
	else if (element == "rect"){		
		let styles = currentElement["Styles"];
		if (currentElement["CustomClass"] != "UITableViewCell") {			
			styles.push("position:relative;");
		}
		// else {
		// 	styles.push("position:relative;");
		// }
	
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
			r = parseFloat(attributes["red"]) * 255;
			g = parseFloat(attributes["green"]) * 255;
			b = parseFloat(attributes["blue"]) * 255;		
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
		let eventType = attributes["eventType"];		
		let actionDiv = '<div class="hidden" data-action-selector="' + selector.replace("WithSender:", "") + '" data-event-type="' + eventType + '"></div>';
		currentElement["Content"] = currentElement["Content"] + actionDiv;
	}
	else if (element == "outlet") {
		let outlets = currentElement["Outlets"];
		
		let property = attributes["property"];
		let destination = attributes["destination"];
								
		let o = {"Property" : property, "Destination": destination};
		outlets.push(o);
	}
	else if (element == "segue"){
		let segues = currentElement["Segues"];
				
		let destination = attributes["destination"];
		let kind = attributes["kind"];
		let relationship = attributes["relationship"];		
		let identifier = attributes["identifier"];
						
		let segue = {"Destination" : destination, "Kind" : kind };
		if (identifier != null) segue["Identifier"] = identifier;
		if (relationship != null) segue["Relationship"] = relationship;

		segues.push(segue);
	}
}

function parserDidEndElement(parser, element){

	if (element == "scene"){				
		currentFileContent += '</body></html>';
		generateHtmlFile();			
		console.log(currentFileContent);
		currentFileName = null;
		currentFileContent = null;
	}
	else if (element == "viewController" || element == "navigationController" || element == "tableViewController"){
		popElement();
	}
	else if (element == "view"){
		popElement();
	}
	else if (element == "navigationBar"){
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
	else if (element == "tableView") {
		popElement();
	}
	else if(element == "tableViewCell") {
		popElement();
	}
	else if(element == "tableViewCellContentView") {
		popElement();
	}
	else if (element == "segmentedControl"){
		popElement();
	}
	else if (element == "switch"){
		popElement();
	}
	else if (element == "slider"){
		popElement();
	}
	else if (element == "progressView"){
		popElement();
	}
	else if (element == "activityIndicatorView"){
		popElement();
	}
	else if (element == "pageControl"){
		popElement();
	}
	else if (element == "stepper"){
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
	item["Segues"]	= [];	
	item["Outlets"] = [];

	let customClass = attributes["customClass"];
	if (customClass == null) customClass = "UI" + element.charAt(0).toUpperCase() + element.substring(1);
	item["ExtraAttributes"] = ['data-class="' + customClass + '"'];	
	item["CustomClass"] = customClass;

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
	let content = item["Content"] || "";

	let outlets = item["Outlets"];
	let segues = item["Segues"];	
	
	if (outlets.length + segues.length > 0) content += '<div class="hidden" data-connections="true">';

	// Outlets	
	for (let index = 0; index < outlets.length; index++){
		let o = outlets[index];
		let prop = o["Property"];
		let dst = o["Destination"];
		content += '<div class="hidden" data-connection-type="outlet" data-outlet="' + dst + '" data-property="' + prop + '"></div>';
	}
	// Segues		
	for (let index = 0; index < segues.length; index++){
		let item = segues[index];
		
		content += '<div class="hidden" data-connection-type="segue"';
		content += ' data-segue-destination="' + item["Destination"] + '"';
		content += ' data-segue-kind="' + item["Kind"] + '"';
		if (item["Identifier"] != null) content += ' data-segue-identifier="' + item["Identifier"] + '"';
		if (item["Relationship"] != null) content += ' data-segue-relationship="' + item["Relationship"] + '"';
		content += '></div>';
	}
	
	if (outlets.length + segues.length > 0) content += '</div>';

	addContentToParentItem('<div ' + classes + 'id="' + id + '"' + extraAttributes.join(" ") + styles + '>', parentItem);
	if (content.length > 0) addContentToParentItem(content, parentItem);	
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

function parseClassType(classType){
	let formattedString = "";
	let arrLetters = Array.from(classType);

	for(var i=0; i < arrLetters.length; i++) {
		if (classType[i] == classType[i].toUpperCase()) {
			formattedString += "-" + classType[i].toLowerCase();
		} else {
			formattedString += classType[i];
		}
	} 

	return formattedString;
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

function parseSegmentControlStyle(style, classes){
	let value = null

	switch(style){
		case "plain":
		value = "plain";
		break;
	}

	if (value != null) classes.push(value);
}

function classesStringify(classes){
	if (classes == null) return "";
	if (classes.length == 0) return "";

	return "class='" + classes.join(" ") + "'";
}

function generateStoryboardFile(name){

	let filename = name.replace("storyboard", "json");

	let item = {};
	item["InitialViewControllerID"] = initialViewControllerID;
	item["ClassByID"] = storyBoardItems;

	let content = JSON.stringify(item);
	fs.writeFileSync("./dist/layout/" + filename, content);		
}

function generateHtmlFile() {
	fs.writeFileSync("./dist/layout/" + currentFileName, currentFileContent);
}

module.exports = {
	parseDocument,
	parserDidStartDocument,
	parserDidStartElement,
	parserDidEndElement,
	parserDidEndDocument
};