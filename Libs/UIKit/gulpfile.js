const gulp = require("gulp");
const fs = require("fs");
const concat = require("gulp-concat");
const rimraf = require("rimraf");
const uglify = require("gulp-uglify");

let arrIndexFiles = [];

function UIParseIndexWebTs(cb) {
	var regEx = /export\s.\sfrom \'.\/(.*)\'/gm;
	var content = fs.readFileSync("./source/index.ts", "utf8");
	var item;

	arrIndexFiles = [];

	while (item = regEx.exec(content)) {		
		arrIndexFiles.push("./source/" + item[1] + ".ts");
	}
	cb();
}

function UIConcatWebTsFiles() {		
	return gulp.src(arrIndexFiles)
	.pipe(concat("UIKit.web.ts"))
	.pipe(gulp.dest("./source/"))
}

function UICleanWebFoundation(cb) {
	const path = "./source/UIKit.web.ts";
	var originalContent = fs.readFileSync(path, "utf8");
	var newContent =  originalContent.replace(/import(.*)/g, "");
	fs.writeFileSync(path, newContent);
	cb();
}

function UIMinifyWebProd(cb) {
	return gulp.src('./dist/UIKit.web.js')
	.pipe(uglify())
	.pipe(gulp.dest('./.build/web-prod/'));
	cb();
}

function UICreateWebPackage(cb) {
	const SRC = __dirname + "/.build/";
	const DEST = __dirname + "/packages/mio-uikit-web/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy UIKit.d.ts to types folder
		fs.copyFileSync("./dist/UIKit.web.d.ts", DEST + "types/UIKit.web.d.ts");

		//Copy UIKit js
		fs.copyFileSync("./.build/web-prod/UIKit.web.js", DEST + "UIKit.web.js");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		//Copy foundation.js to the package folder
		//fs.copyFileSync(__dirname + "/.build/node-prod/foundation.js", DEST + "foundation.min.js");
		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist - Execute first gulp UIminifyWebProd");
	}
	cb();
}

function UIRemoveTempFolders(cb) {
	const buildDir = __dirname + "/.build";
	const distDir =  __dirname + "/dist";

	if(fs.existsSync(buildDir)) {
		rimraf(buildDir, function(err) {
			if(err) throw err;
			console.log("/.build folder deleted successfully");
		});
	} else {
		console.log("/.build directory does not exist");
	}

	if(fs.existsSync(distDir)) {
		rimraf(distDir, function(err) {
			if(err) throw err;
			console.log("/dist folder deleted successfully");
		});
	} else {
		console.log("/dist directory does not exist");
	}
	cb();
}

module.exports = {
	//build: build, //Not working, fix it when implementing dev building
	UIBuildWebProd: gulp.series(UIParseIndexWebTs, UIConcatWebTsFiles, UICleanWebFoundation),
	UIMinifyWebProd,
	UICreateWebPackage,
	UIRemoveTempFolders
}