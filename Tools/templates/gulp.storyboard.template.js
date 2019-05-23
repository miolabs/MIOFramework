var fs = require("./node_modules/file-system");
var NSXMLParser = require("./node_modules/mio-foundation-node").NSXMLParser;
var NSPropertyListSerialization = require("./node_modules/mio-foundation-node").NSPropertyListSerialization;

//GLOBAL VARIABLES
var initialViewControllerID = null;
var initialDestination = null;
var viewClassByDestination = {};

var currentFileName = null;
var currentFileContent = null;
var elementsStack = [];
var currentElement = null;
var outletsStack = [];
var seguesStack = [];

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
	
	if (element == "document"){
		initialViewControllerID = attributes["initialViewController"];
	}
	if (element == "scene"){				
		let id = attributes["sceneID"];		
		currentFileContent = '<!DOCTYPE html><html><head><link rel="stylesheet" type="text/css" href="base.css"></head><body>';
	}
	else if (element == "viewController" || element == "navigationController" || element == "tableViewController"){
		let id = attributes["id"];
		currentFileName = id + ".html";								
		
		let customClass = attributes["customClass"];
		if (customClass == null) customClass = "UI" + element.charAt(0).toUpperCase() + element.substring(1);
		viewClassByDestination[id] = customClass;

		// Update app plist file with the main html file
		if (id == initialViewControllerID) {
			initialDestination = id;			
			updateAppPListFile();
		}		

		currentFileContent += '<div class="' + parseClassType(element) +'" id="' + id + '" data-root-view-controller="true"';	
		currentFileContent += ' data-class="' + customClass + '"';
		currentFileContent += '>';

		let outlets = {};
		outletsStack.push(outlets);
		let segues = {};
		seguesStack.push(segues);
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
		pushNewElement(element, attributes);
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
		//TODO: let eventType = attributes["eventType"];		
		currentElement["Content"] = currentElement["Content"] + '<div class="hidden" data-action-selector="' + selector.replace("WithSender:", "") +'"></div>';
	}
	else if (element == "outlet") {
		let outlet = attributes["property"];
		let destination = attributes["destination"];
						
		let outlets = outletsStack[outletsStack.length - 1];
		outlets[outlet] = destination;		
	}
	else if (element == "segue"){
		let destination = attributes["destination"];
		let relationship = attributes["relationship"];		
				
		let segues = seguesStack[seguesStack.length - 1];
		segues[relationship] = destination;
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
		currentFileContent += '<div class="hidden" data-connections="true">';
		// Segues
		let outlets = outletsStack.pop();		
		for (let key in outlets){
			let id = outlets[key];
			currentFileContent += '<div class="hidden" data-connection-type="outlet" data-outlet="' + id + '" data-property="' + key + '"></div>';
		}
		// Segues
		let segues = seguesStack.pop();
		for (let key in segues){
			let destination = segues[key];			
			currentFileContent += '<div class="hidden" data-connection-type="segue" data-segue-destination="'+ destination + '" data-segue-relationship="' + key + '"></div>';
		}
		currentFileContent += '</div></div>';				
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

	if (attributes["customClass"] != null) item["ExtraAttributes"] = ['data-class="' + attributes["customClass"] + '"'];
	else item["ExtraAttributes"] = ['data-class="UI' + element.charAt(0).toUpperCase() + element.substring(1) + '"'];

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

function updateAppPListFile() {		
	const PLIST_PATH = "./dist/app.plist";
	
	if (initialDestination == null) return;
	console.log("MAIN URL: " + initialDestination);
	
	let plist = null;
	if (fs.existsSync(PLIST_PATH)) {
		let content = fs.readFileSync(PLIST_PATH, "utf8");
		plist = NSPropertyListSerialization.propertyListWithData(content, null, null, null);
	}
	else plist = {};

	plist["UIMainResourceFile"] = initialDestination;
	plist["UIMainClasses"] = viewClassByDestination;
	
	let newContent = NSPropertyListSerialization.dataWithpropertyList(plist, null, null, null);
	fs.writeFileSync("./dist/app.plist", newContent);		
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