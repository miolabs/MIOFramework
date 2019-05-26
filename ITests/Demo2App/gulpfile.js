var gulp = require("gulp");
var pipeline = require('readable-stream').pipeline;
var ts = require("gulp-typescript");
var fs = require("file-system");
var sb = require("./gulp.storyboard");
var utils = require("./gulp.utils");

function unifySwiftFiles(done) {
	var fileArr = [];
	var dir = "./.build";
	var content = "";

	fs.mkdirSync(dir);
	fs.recurseSync("./Demo2App/", ["*.swift"], function(filepath, relative, filename) {
		if(filename === "app.swift" || filename === "app.ts" || filename === "app.js") {
			fs.unlinkSync("./.build/app.swift");
			fs.unlinkSync("./.build/app.ts");
			fs.unlinkSync("./.build/app.js");
		} else {
			fileArr.push(filepath);
		}
	});
	fileArr.reverse().forEach((item) => {
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
	var pathStoryBoard = "./Demo2App/Base.lproj/";

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

function copyResources(done) {
	const SRC = "../../Tools/resources/";
	const FOUNDATION_PATH = "node_modules/mio-foundation-web/";
	const UIKIT_PATH = "node_modules/mio-uikit-web/";
	const ANIMATECSS_PATH = "node_modules/animate.css/animate.min.css";
	const DEST = __dirname + "/dist/";
	const APP_PLIST_PATH = "./Demo2App/Info.plist";

	fs.copyFileSync(SRC + "index.html", DEST + "index.html");
	fs.copyFileSync(SRC + "main.js", DEST + "scripts/main.js");
	fs.copyFileSync("./.build/app.js", DEST + "scripts/app.js");
	fs.copyFileSync(SRC + "app.css", DEST + "styles/app.css");
	//temporary
	fs.copyFileSync("../../Tools/temp/lib.js", DEST + "libs/swiftlib/lib.js");
	fs.copyFileSync("../../Tools/temp/app.js", DEST + "scripts/app.js");

	//FOUNDATION WEB
	//fs.copyFileSync(FOUNDATION_PATH + "types/mio-foundation-web.d.ts", DEST + "libs/mio-foundation-web/types/mio-foundation-web.d.ts");
	//fs.copyFileSync(FOUNDATION_PATH + "extensions.ts", DEST + "libs/mio-foundation-web/extensions.ts");
	//fs.copyFileSync(FOUNDATION_PATH + "LICENSE", DEST + "libs/mio-foundation-web/LICENSE");
	if (fs.existsSync(FOUNDATION_PATH + "mio-foundation-web.js")) fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web.js", DEST + "libs/mio-foundation-web/mio-foundation-web.js");
	if (fs.existsSync(FOUNDATION_PATH + "mio-foundation-web.min.js")) fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web.min.js", DEST + "libs/mio-foundation-web/mio-foundation-web.min.js");
	//fs.copyFileSync(FOUNDATION_PATH + "package.json", DEST + "libs/mio-foundation-web/package.json");
	//fs.copyFileSync(FOUNDATION_PATH + "README.md", DEST + "libs/mio-foundation-web/README.md");


	//UIKIT
	//fs.copyFileSync(UIKIT_PATH + "types/mio-uikit-web.d.ts", DEST + "libs/mio-uikit-web/types/mio-uikit-web.d.ts");
	//fs.copyFileSync(UIKIT_PATH + "LICENSE", DEST + "libs/mio-uikit-web/LICENSE");
	if (fs.existsSync(UIKIT_PATH + "mio-uikit-web.js")) fs.copyFileSync(UIKIT_PATH + "mio-uikit-web.js", DEST + "libs/mio-uikit-web/mio-uikit-web.js");
	if (fs.existsSync(UIKIT_PATH + "mio-uikit-web.min.js")) fs.copyFileSync(UIKIT_PATH + "mio-uikit-web.min.js", DEST + "libs/mio-uikit-web/mio-uikit-web.min.js");
	
	fs.copyFileSync(ANIMATECSS_PATH, DEST + "styles/animate.min.css");

	//fs.copyFileSync(UIKIT_PATH + "package.json", DEST + "libs/mio-uikit-web/package.json");
	//fs.copyFileSync(UIKIT_PATH + "README.md", DEST + "libs/mio-uikit-web/README.md");

	fs.copyFileSync(APP_PLIST_PATH, DEST + "app.plist");

	done();
}

module.exports = {
	unifySwiftFiles,
	uglifyJs,
	parseStoryBoard,
	copyResources
}