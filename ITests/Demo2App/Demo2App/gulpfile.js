var gulp = require("gulp");
var pipeline = require('readable-stream').pipeline;
var ts = require("gulp-typescript");
var fs = require("file-system");
var sb = require("./ITests/Demo2App/Demo2App/gulp.storyboard");
var utils = require("./ITests/Demo2App/Demo2App/gulp.utils");

function unifySwiftFiles(done) {
	var fileArr = [];
	fs.recurseSync("./", ["*.swift"], function(filepath, relative, filename) {
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
function transpileTsToJs() {
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
	var pathStoryBoard = "/Base.lproj/";

	fs.readdirSync(pathStoryBoard).forEach(item => {
		filesArr.unshift(item);
	});
	for(item of filesArr) {
		var fileString = fs.readFileSync(pathStoryBoard+item, "utf8");		
		sb.parseDocument(fileString);		
	}
	done();
}

function copyLibsFiles(done) {
	const FOUNDATION_NODE_PATH = "node_modules/mio-foundation-node/foundation.node.js";
	const FOUNDATION_WEB_PATH = "node_modules/mio-foundation-web/foundation.web.js";
	const DEST_PATH = "ITests/Demo2App/dist/libs/";

	done();
}

module.exports = {
	unifySwiftFiles,
	transpileTsToJs,
	uglifyJs,
	parseStoryBoard
}