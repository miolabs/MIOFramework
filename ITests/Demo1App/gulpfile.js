var gulp = require("gulp");
var pipeline = require('readable-stream').pipeline;
var ts = require("gulp-typescript");
var fs = require("file-system");
var sb = require("./Demo1App/gulp.storyboard");
var utils = require("./Demo1App/gulp.utils");

function unifySwiftFiles(done) {
	var fileArr = [];
	fs.recurseSync("./Demo1App/", ["*.swift"], function(filepath, relative, filename) {
		if(filename === "data.swift") {
			//remove data.swift if exists
			fs.unlinkSync("./Demo1App/data.swift");
		} else {
			fileArr.push(filepath);
		}
	});
	fileArr.reverse().forEach((item) => {
		var currentItem = fs.readFileSync(item, "utf8");
		var filteredItem = utils.filterSwiftFile(currentItem);
		fs.appendFileSync("./Demo1App/.build/data.swift", filteredItem, "utf8");
	});
	done();
}
function transpileTsToJs() {
	return gulp.src("./Demo1App/.build/data.ts")
				.pipe(ts({
					outFile: "app.js",
					removeComments: true,
					allowJs: true,
					suppressImplicitAnyIndexErrors: true,
					types: ["mio-foundation-web", "mio-uikit-web"],
					target: "es5"
				}))
				.pipe(gulp.dest("./Demo1App/dist/"));
}
function uglifyJs() {
	return pipeline( 
			//sourcemaps.init({largeFile: true}),
			gulp.src("./Demo1App/.build/app.js"),
			// uglify({
			// 	sourceMap: true
			// }),
			//sourcemaps.write(),
			gulp.dest("./Demo1App/dist/")
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

module.exports = {
	unifySwiftFiles,
	transpileTsToJs,
	uglifyJs,
	parseStoryBoard
}