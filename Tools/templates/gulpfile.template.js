var gulp = require("gulp");
var pipeline = require('readable-stream').pipeline;
var ts = require("gulp-typescript");
var fs = require("file-system");
var sb = require("./gulp.storyboard");
var parseModel = require("./gulp.datamodel");
var utils = require("./gulp.utils");

function unifySwiftFiles(done) {
	var fileArr = [];
	var dir = "./.build";
	var content = "";

	fs.mkdirSync(dir);
	fs.recurseSync("./{AppName}/", ["*.swift"], function(filepath, relative, filename) {
		if(filename === "app.swift" || filename === "app.ts" || filename === "app.js") {
			fs.unlinkSync("./.build/app.swift");
			fs.unlinkSync("./.build/app.ts");
			fs.unlinkSync("./.build/app.js");
		} else {
			fileArr.push(filepath);
		}
	});
	//if there's a file '/{AppName}/order.json', we expect it in the format ["file1.swift", "subfolder/file2.swift"]
	//it's a way to provide a custom order for the swift files (with proper dependency order)
	if(fs.existsSync("./{AppName}/order.json")) {
		let order = JSON.parse(fs.readFileSync("./{AppName}/order.json", "utf8"))
		fileArr.sort((a, b) => {
			let aIndex = order.indexOf(a.slice(a.indexOf('/') + 1))
			let bIndex = order.indexOf(b.slice(b.indexOf('/') + 1))
			return aIndex < bIndex ? -1 : 1
		})
	}
	else {
		fileArr.reverse()//I think that's a just bodge to get files in reverse alphabetical order
	}
	fileArr.forEach((item) => {
		var currentItem = fs.readFileSync(item, "utf8");
		var filteredItem = utils.filterSwiftFile(currentItem);
		content += filteredItem;
		fs.writeFileSync("./.build/app.swift", content, "utf8");
	});
	done();
}

function uglifyJs() { 
	return pipeline( 
			//sourcemaps.init({largeFile: true}),
			gulp.src("./.build/app.js"),
			// uglify({
			// 	sourceMap: true
			// }),
			//sourcemaps.write(),
			gulp.dest("./dist/")
		);
}

function parseStoryBoard(done) {
	var filesArr = [];
	var pathStoryBoard = "./{AppName}/Base.lproj/";

	fs.readdirSync(pathStoryBoard).forEach(item => {
		filesArr.unshift(item);
	});
	for(item of filesArr) {
		if(item == "LaunchScreen.storyboard") continue;
		var fileString = fs.readFileSync(pathStoryBoard+item, "utf8");		
		sb.parseDocument(fileString, item);		
	}
	done();
}

function parseDataModel(done) {
	var DATAMODEL_PATH = "./{AppName}/{AppName}" + ".xcdatamodeld/{AppName}.xcdatamodel/contents";

	if(fs.existsSync(DATAMODEL_PATH)) {
		var fileString = fs.readFileSync(DATAMODEL_PATH, "utf8");
		console.log(fileString);
		parseModel.parserDidStartElement(fileString); //gulp.datamodel.js
	} else {
		console.log("DATAMODEL PATH DOES NOT EXIST!");
	}
	
	done();
}

function copyResources(done) {
	const RESOURCES_PATH = "../../Tools/resources/";
	const DEST = __dirname + "/dist/";
	const APP_PLIST_PATH = "./{AppName}/Info.plist";
	const FOUNDATION_PATH = "node_modules/mio-foundation-web/";
	const UIKIT_PATH = "node_modules/mio-uikit-web/";
	const SWIFT_PATH = "node_modules/mio-swiftlib/";
	const ANIMATECSS_PATH = "node_modules/animate.css/animate.min.css";
	const SRC_ICONS_PATH = "../../Tools/resources/icons/";

	//RESOURCES
	fs.copyFileSync(RESOURCES_PATH + "index.html", DEST + "index.html");
	fs.copyFileSync(RESOURCES_PATH + "main.js", DEST + "scripts/main.js");
	fs.copyFileSync("./.build/app.js", DEST + "scripts/app.js");
	fs.copyFileSync(RESOURCES_PATH + "app.css", DEST + "styles/app.css");
	fs.copyFileSync(SWIFT_PATH + "lib.js", DEST + "libs/mio-swiftlib/lib.js");

	//COPY ICONS FOLDER
	fs.mkdirSync("dist/icons/", {recursive: true});
	fs.recurseSync(SRC_ICONS_PATH, function(filepath, relative, filename) {
		fs.copyFileSync(filepath, "dist/icons/" + filename);
	});

	//FOUNDATION WEB
	if (fs.existsSync(FOUNDATION_PATH + "mio-foundation-web.js")) fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web.js", DEST + "libs/mio-foundation-web/mio-foundation-web.js");

	//UIKIT
	if (fs.existsSync(UIKIT_PATH + "mio-uikit-web.js")) fs.copyFileSync(UIKIT_PATH + "mio-uikit-web.js", DEST + "libs/mio-uikit-web/mio-uikit-web.js");
	fs.copyFileSync(ANIMATECSS_PATH, DEST + "styles/animate.min.css");
	fs.copyFileSync(APP_PLIST_PATH, DEST + "app.plist");

	done();
}

module.exports = {
	unifySwiftFiles,
	uglifyJs,
	parseStoryBoard,
	parseDataModel,
	copyResources
}