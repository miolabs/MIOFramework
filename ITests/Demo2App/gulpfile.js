var gulp = require("gulp");
var pipeline = require('readable-stream').pipeline;
var ts = require("gulp-typescript");
var fs = require("file-system");
var sb = require("./gulp.storyboard");
var utils = require("./gulp.utils");

function unifySwiftFiles(done) {
	var fileArr = [];
	var dir = "./.build";

	if (!fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	fs.recurseSync("./Demo2App/", ["*.swift"], function(filepath, relative, filename) {
		if(filename === "app.swift") {
			//remove app.swift if exists
			fs.unlinkSync("./.build/app.swift");
		} else {
			fileArr.push(filepath);
		}
	});
	fileArr.reverse().forEach((item) => {
		var currentItem = fs.readFileSync(item, "utf8");
		var filteredItem = utils.filterSwiftFile(currentItem);
		fs.appendFileSync("./.build/app.swift", filteredItem, "utf8");
	});
	done();
}

function transpileTsToJs() { //doesn't work
	return gulp.src("./.build/app.ts")
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
	var pathStoryBoard = "./Demo2App/Base.lproj/";

	fs.readdirSync(pathStoryBoard).forEach(item => {
		filesArr.unshift(item);
	});
	for(item of filesArr) {
		if(item == "LaunchScreen.storyboard") continue;
		var fileString = fs.readFileSync(pathStoryBoard+item, "utf8");		
		sb.parseDocument(fileString);		
	}
	done();
}

function copyResources(done) {
	const SRC = "../../Tools/resources/";
	const FOUNDATION_PATH = "node_modules/mio-foundation-web/";
	const UIKIT_PATH = "node_modules/mio-uikit-web/";
	const DEST = __dirname + "/dist/";

	fs.copyFileSync(SRC + "index.html", DEST + "index.html");
	fs.copyFileSync(SRC + "main.js", DEST + "scripts/main.js");
	fs.copyFileSync("./.build/app.js", DEST + "scripts/app.js");
	fs.copyFileSync(SRC + "app.css", DEST + "styles/app.css");

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
	//fs.copyFileSync(UIKIT_PATH + "package.json", DEST + "libs/mio-uikit-web/package.json");
	//fs.copyFileSync(UIKIT_PATH + "README.md", DEST + "libs/mio-uikit-web/README.md");

	done();
}

module.exports = {
	unifySwiftFiles,
	transpileTsToJs,
	uglifyJs,
	parseStoryBoard,
	copyResources
}