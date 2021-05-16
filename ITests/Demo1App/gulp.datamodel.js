var fs = require("file-system");
var NSXMLParser = require("./node_modules/mio-foundation-node").NSXMLParser;
var NSPropertyListSerialization = require("./node_modules/mio-foundation-node").NSPropertyListSerialization;

//GLOBAL VARIABLES
var filename, currentClassEntityName, currentClassName, fileContent, modelContent;

function parseDocument(xmlString, filename) {	
	console.log('Entering Document');			

	var parser = new NSXMLParser();
	parser.initWithString(xmlString, this);
	parser.parse();
}

function parserDidStartElement(parser, elementName, attributes) {

	if (elementName == "entity") {
		let filename = attributes["name"]
		let classname = attributes["representedClassName"]
		let parentName = attributes["parentEntity"]

		openModelEntity(filename, classname, parentName)
	} else if (elementName == "attribute") {
		let name = attributes["name"];
		let type = attributes["attributeType"];
		let optional = attributes["optional"];
		let defaultValue = attributes["defaultValueString"];

		appendAttribute(name, type, optional, defaultValue)
	} else if (elementName == "relationship") {
		let name = attributes["name"];
		let optional = attributes["optional"];
		let destinationEntity = attributes["destinationEntity"];
		let toMany = attributes["toMany"];

		appendRelationship(name, destinationEntity, toMany, optional)
	}
}

function parserdidEndElement(parser, didEndElement, elementName, namespaceURI, qualifiedName) {

	if (elementName == "entity") {
		closeModelEntity()
	}
}

function parserfoundCharacters(parser, foundCharacters) {

}

function parserparseErrorOccurred(parser, parseErrorOccurred) {

}

function parserDidEndDocument(parser) {
	writeModelFile()
}

function openModelEntity(filename, classname, parentName) {

	filename = "/" + filename + "_ManagedObject.ts";
	let cn = classname + "_ManagedObject";
	currentClassEntityName = cn;
	currentClassName = classname;

	let parentObject = parentName ? parentName : "MIOManagedObject";

	fileContent = "\n";

	if (parentName != null) {
		fileContent += "\n/// <reference path=" + parentName + ".ts" + " />\n"
	}

	fileContent += "\n";
	fileContent += "// Generated class \(cn)\n";
	fileContent += "\n";
	fileContent += "class " + cn + " extends " + parentObject + "\n{\n";
}

function appendAttribute(name, type, optional, defaultValue) {

	var dv;
	var t = ":";

	switch (type) {
		case "Integer",
		"Float",
		"Number",
		"Integer 16",
		"Integer 8",
		"Integer 32",
		"Integer 64",
		"Decimal":
			t += "number"

		case "String":
			t += type.toLowerCase()

		case "Boolean":
			t += type.toLowerCase()

		case "Array",
		"Dictionary":
			t = "";

		default:
			t += type;
	}

	if (defaultValue == null) {
		dv = " = null;";
	} else {
		if (type == "String") {
			dv = " = " + defaultValue + ";";
		} else if (type == "Number") {
			dv = " = " + defaultValue + ";";
		} else if (type == "Array") {
			t = "";
			dv = " = [];"
		} else if (type == "Dictionary") {
			t = "";
			dv = " = {};"
		} else {
			dv = ";"
		}
	}

	fileContent += "\n";
	fileContent += "    // Property:" + name + "\n";
	// Var
	//fileContent += "    protected _\(name)\(t)\(dv)\n";
	// Setter
	fileContent += "    set " +  name + value + " {\n";
	fileContent += "        this.setValueForKey(value, '" + name + "');\n";
	fileContent += "    }\n";

	// Getter
	fileContent += "    get " + name + "()\(t) {\n";
	fileContent += "        return this.valueForKey('" + name + "');\n";
	fileContent += "    }\n";

	// Setter raw value
	fileContent += "    set " + name + "PrimitiveValue(value\(t)) {\n";
	fileContent += "        this.setPrimitiveValueForKey(value, '" + name + "');\n";
	fileContent += "    }\n";

	// Getter raw value
	fileContent += "    get " + name + "PrimitiveValue()\(t) {\n";
	fileContent += "        return this.primitiveValueForKey('" + name + "');\n";
	fileContent += "    }\n";
}

function appendRelationship(name, destinationEntity, toMany, optional) {

	if (toMany == "NO") {
		//appendAttribute(name:name, type:destinationEntity, optional:optional, defaultValue:nil);
		fileContent += "    // Relationship: " + name + "\n";
		// Var
		//fileContent += "    protected _\(name):\(destinationEntity) = null;\n";

		// Setter
		fileContent += "    set " + name + "(value:" + destinationEntity + ") {\n";
		fileContent += "        this.setValueForKey(value, '" + name + "');\n";
		fileContent += "    }\n";

		// Getter
		fileContent += "    get "+ name + "():" + destinationEntity + " {\n";
		fileContent += "        return this.valueForKey('" + name + "') as " + destinationEntity + ";\n";
		fileContent += "    }\n";

		//            // Setter raw value
		//            fileContent += "    set \(name)PrimitiveValue(value\(t)) {\n";
		//            fileContent += "        this.setPrimitiveValueForKey(value, '\(name)');\n";
		//            fileContent += "    }\n";
		//
		//
		//            // Getter raw value
		//            fileContent += "    get \(name)PrimitiveValue()\(t) {\n";
		//            fileContent += "        return this.primitiveValueForKey('\(name)');\n";
		//            fileContent += "    }\n";

	} else {

		fileContent += "\n";

		let first = name.substring(1, name.length-1);
		let cname = first.toUpperCase() + name.substring(1); 

		fileContent += "    // Relationship: " + cname + "\n";
		// Var
		fileContent += "    protected _" + name + ":MIOManagedObjectSet = null;\n";
		// Getter
		fileContent += "    get " + name + "():MIOManagedObjectSet {\n";
		fileContent += "        return this.valueForKey('" + name + "');\n";
		fileContent += "    }\n";
		// Add
		fileContent += "    add" + name + "Object(value:" + destinationEntity + ") {\n";
		fileContent += "        this._addObjectForKey(value, '" + name + "');\n";
		fileContent += "    }\n";
		// Remove
		fileContent += "    remove" + name + "Object(value:" + destinationEntity + ") {\n";
		fileContent += "        this._removeObjectForKey(value, '" + name + "');\n";
		fileContent += "    }\n";
		// Add objects
		//            fileContent += "    add\(cname)(value:MIOMOanagedObjectSet) {\n";
		//            fileContent += "        this.setValueForKey(value, '\(name)');\n";
		//            fileContent += "    }\n";
		// Remove objects
		//            fileContent += "    remove\(cname)(value:MIOSet) {\n";
		//            fileContent += "        this.removeObjects('\(name)', value);\n";
		//            fileContent += "    }\n";
	}

}

function closeModelEntity() {

	fileContent += "}\n";

	let path = __dirname + "/" + filename;
	//Write to disc
	writeTextFile(fileContent, path) //app.swift

	let fp = modelPath + "/" + currentClassName + ".ts"
	if (FileManager.default.fileExists(fp) == false) {
		// Create Subclass in case that is not already create
		var content = ""
		content += "//\n"
		content += "// Generated class " + currentClassEntityName + "\n"
		content += "//\n"
		content += "\n/// <reference path=\"" + currentClassEntityName + ".ts\" />\n"
		content += "\nclass " + currentClassEntityName + " extends " + currentClassEntityName + "\n"
		content += "{\n"
		content += "\n}\n";

		WriteTextFile(content, fp)
	}

	modelContent += "\n\t MIOCoreRegisterClassByName('" + currentClassName + "_ManagedObject', " + currentClassName + "_ManagedObject);";
	modelContent += "\n\t MIOCoreRegisterClassByName('" + currentClassName + "', " + currentClassName + ");";
}

function writeTextFile(fileContent, path) {
	let filePath = process.cwd() + "/.build/app.swift";

	//Append parsed file to app.swift
	fs.appendFileSync(filePath, fileContent);
}

module.exports = {
	parseDocument
}