var gulp = require("gulp");
var { series, parallel } = require("gulp");
var uglify = require("gulp-uglify");
var pipeline = require('readable-stream').pipeline;
var ts = require("gulp-typescript");
var fs = require("file-system");
var rf = require("rimraf");
var parseString = require('xml2js').parseString;
var sourcemaps = require("gulp-sourcemaps");
var sb = require("./ITests/Demo1App/Demo1App/gulp.storyboard");
var utils = require("./ITests/Demo1App/Demo1App/gulp.utils");

function unifySwiftFiles(cb) {
	var fileArr = [];
	fs.recurseSync("./ITests/Demo1App/Demo1App/", ["*.swift"], function(filepath, relative, filename) {
		if(filename === "data.swift") {
			//remove data.swift if exists
			fs.unlinkSync("./ITests/Demo1App/Demo1App/data.swift");
		} else {
			fileArr.push(filepath);
		}
	});
	fileArr.reverse().forEach((item) => {
		var currentItem = fs.readFileSync(item, "utf8");
		var filteredItem = utils.filterSwiftFile(currentItem);
		fs.appendFileSync("./ITests/Demo1App/Demo1App/.build/data.swift", filteredItem, "utf8");
	});
	cb();
}
function transpileTsToJs(cb) {
	return gulp.src("./ITests/Demo1App/Demo1App/.build/data.ts")
				.pipe(ts({
					outFile: "app.js",
					removeComments: true,
					allowJs: true,
					suppressImplicitAnyIndexErrors: true,
					types: ["miojslibs"],
					target: "es5"
				}))
				.pipe(gulp.dest("./ITests/Demo1App/Demo1App/dist/"));
	cb();
}
function uglifyJs(cb) {
	return pipeline( 
			//sourcemaps.init({largeFile: true}),
			gulp.src("./ITests/Demo1App/Demo1App/.build/data.js"),
			uglify({
				sourceMap: true
			}),
			//sourcemaps.write(),
			gulp.dest("./ITests/Demo1App/Demo1App/dist/")
		);
	cb(); 
}
function parseStoryBoard(cb) {
	var filesArr = [];
	var pathStoryBoard = "ITests/Demo1App/Demo1App/Base.lproj/";

	fs.readdirSync(pathStoryBoard).forEach(item => {
		filesArr.unshift(item);
	});
	for(item of filesArr) {
		var fileString = fs.readFileSync(pathStoryBoard+item, "utf8");		
		sb.parseDocument(fileString);		
	}
	cb();
}

module.exports = {
	unifySwiftFiles: unifySwiftFiles,
	transpileTsToJs: transpileTsToJs,
	uglifyJs: uglifyJs,
	parseStoryBoard: parseStoryBoard
}