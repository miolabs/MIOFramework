var gulp = require("gulp");
var pipeline = require('readable-stream').pipeline;
var ts = require("gulp-typescript");
var fs = require("file-system");
var sb = require("../../Tools/gulp.storyboard");
var utils = require("../../Tools/gulp.utils");

function unifySwiftFiles(done) {
	var fileArr = [];
	fs.recurseSync("./Demo1App/", ["*.swift"], function(filepath, relative, filename) {
		if(filename === "data.swift") {
			//remove data.swift if exists
			fs.unlinkSync("./data.swift");
		} else {
			fileArr.push(filepath);
		}
	});
	fileArr.reverse().forEach((item) => {
		var currentItem = fs.readFileSync(item, "utf8");
		var filteredItem = utils.filterSwiftFile(currentItem);
		fs.appendFileSync("./.build/data.swift", filteredItem, "utf8");
	});
	done();
}
function transpileTsToJs() { //doesn't work
	return gulp.src("./.build/data.ts")
				.pipe(ts({
					outFile: "app.js",
					removeComments: true,
					allowJs: true,
					suppressImplicitAnyIndexErrors: true,
					types: ["mio-foundation-web", "mio-uikit-web"],
					target: "es5"
				}))
				.pipe(gulp.dest("./dist/"));
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
	var pathStoryBoard = "./Demo1App/Base.lproj/";

	fs.readdirSync(pathStoryBoard).forEach(item => {
		filesArr.unshift(item);
	});
	for(item of filesArr) {
		var fileString = fs.readFileSync(pathStoryBoard+item, "utf8");		
		sb.parseDocument(fileString);		
	}
	done();
}

function generateAppPlist(done) {

	done();
}

function copyResources(done) {
	const SRC = "../../Tools/resources/";
	const FOUNDATION_PATH = "../../Libs/Foundation/packages/";
	const UIKIT_PATH = "../../Libs/UIKit/packages/";
	const DEST = __dirname + "/dist/";

	fs.copyFileSync(SRC + "index.html", DEST + "index.html");
	fs.copyFileSync(SRC + "main.js", DEST + "scripts/main.js" );
	fs.copyFileSync(SRC + "app.css", DEST + "styles/app.css" );

	//FOUNDATION
	fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web/types/mio-foundation-web.d.ts", DEST + "libs/mio-foundation-web/types/mio-foundation-web.d.ts");
	fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web/extensions.ts", DEST + "libs/mio-foundation-web/extensions.ts");
	fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web/LICENSE", DEST + "libs/mio-foundation-web/LICENSE");
	fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web/mio-foundation-web.min.js", DEST + "libs/mio-foundation-web/mio-foundation-web.min.js");
	fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web/package-lock.json", DEST + "libs/mio-foundation-web/package-lock.json");
	fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web/package.json", DEST + "libs/mio-foundation-web/package.json");
	fs.copyFileSync(FOUNDATION_PATH + "mio-foundation-web/README.md", DEST + "libs/mio-foundation-web/README.md");

	//UIKIT
	fs.copyFileSync(UIKIT_PATH + "mio-uikit-web/types/mio-uikit-web.d.ts", DEST + "libs/mio-uikit-web/types/mio-uikit-web.d.ts");
	fs.copyFileSync(UIKIT_PATH + "mio-uikit-web/LICENSE", DEST + "libs/mio-uikit-web/LICENSE");
	fs.copyFileSync(UIKIT_PATH + "mio-uikit-web/mio-uikit-web.min.js", DEST + "libs/mio-uikit-web/mio-uikit-web.min.js");
	fs.copyFileSync(UIKIT_PATH + "mio-uikit-web/package-lock.json", DEST + "libs/mio-uikit-web/package-lock.json");
	fs.copyFileSync(UIKIT_PATH + "mio-uikit-web/package.json", DEST + "libs/mio-uikit-web/package.json");
	fs.copyFileSync(UIKIT_PATH + "mio-uikit-web/README.md", DEST + "libs/mio-uikit-web/README.md");

	done();
}

module.exports = {
	unifySwiftFiles,
	transpileTsToJs,
	uglifyJs,
	parseStoryBoard,
	generateAppPlist,
	copyResources
}