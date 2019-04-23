const gulp = require("gulp");
const fs = require("fs");
const concat = require("gulp-concat");
const rimraf = require("rimraf");
const uglify = require("gulp-uglify");

let arrIndexFiles = [];

function build(cb) {
	var env = process.env["BUILD_ENV"];
	var platform = process.env["BUILD_PLATFORM"];

	console.log("Environment: " + env + " Platform: " + platform);

	if (env == "dev" && platform == "node") {
		//buildNodeDev();
	}
	else if (env == "dev" && platform == "web"){
		//buildWebDev();
	}
	else if (env == "prod" && platform == "node") {
		buildNodeProd();
	}
	else if (env == "prod" && platform == "web") {
		buildWebProd();
	}
	cb();
}

function parseIndexNodeTs(cb) {
	var regEx = /export\s.\sfrom \'.\/(.*)\'/gm;
	var content = fs.readFileSync("./source/index.node.ts", "utf8");
	var item;

	arrIndexFiles = [];

	while (item = regEx.exec(content)) {		
		arrIndexFiles.push("./source/" + item[1] + ".ts");
	}
	cb();
}

function concatNodeTsFiles() {		
	return gulp.src(arrIndexFiles)
	.pipe(concat("foundation.node.ts"))
	.pipe(gulp.dest("./source/"))
}

function cleanNodeFoundation(cb) {
	const path = "./source/foundation.node.ts";
	var originalContent = fs.readFileSync(path, "utf8");
	var newContent =  originalContent.replace(/import(.*)/g, "");
	fs.writeFileSync(path, newContent);
	cb();
}

function minifyNodeProd(cb) {
	return gulp.src('./dist/foundation.node.js')
	.pipe(uglify())
	.pipe(gulp.dest('./.build/node-prod/'));
	cb();
}

function parseIndexWebTs(cb) {
	var regEx = /export\s.\sfrom \'.\/(.*)\'/gm;
	var content = fs.readFileSync("./source/index.web.ts", "utf8");
	var item;

	arrIndexFiles = [];

	while (item = regEx.exec(content)) {		
		arrIndexFiles.push("./source/" + item[1] + ".ts");
	}
	cb();
}

function concatWebTsFiles() {		
	return gulp.src(arrIndexFiles)
	.pipe(concat("foundation.web.ts"))
	.pipe(gulp.dest("./source/"))
}

function cleanWebFoundation(cb) {
	const path = "./source/foundation.web.ts";
	var originalContent = fs.readFileSync(path, "utf8");
	var newContent =  originalContent.replace(/import(.*)/g, "");
	fs.writeFileSync(path, newContent);
	cb();
}

function minifyWebProd(cb) {
	return gulp.src('./dist/foundation.web.js')
	.pipe(uglify())
	.pipe(gulp.dest('./.build/web-prod/'));
	cb();
}

function createNodePackage(cb) {
	const SRC = __dirname + "/.build/";
	const DEST = __dirname + "/packages/mio-foundation-node/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy foundation.d.ts to types folder
		fs.copyFileSync("./dist/foundation.node.d.ts", DEST + "types/foundation.node.d.ts");

		//Copy foundation.min.js
		fs.copyFileSync("./.build/node-prod/foundation.node.js", DEST + "foundation.node.js");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist - Execute first gulp minifyNodeProd");
	}
	cb();
}

function createWebPackage(cb) {
	const SRC = __dirname + "/.build/";
	const DEST = __dirname + "/packages/mio-foundation-web/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy foundation.d.ts to types folder
		fs.copyFileSync("./dist/foundation.web.d.ts", DEST + "types/foundation.web.d.ts");

		//Copy foundation.min.js
		fs.copyFileSync("./.build/web-prod/foundation.web.js", DEST + "foundation.web.js");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		//Copy foundation.js to the package folder
		//fs.copyFileSync(__dirname + "/.build/node-prod/foundation.js", DEST + "foundation.min.js");
		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist - Execute first gulp minifyWebProd");
	}
	cb();
}

function removeTempFolders(cb) {
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
	build: build, //Not working, fix it when implementing dev building
	buildNodeProd: gulp.series(parseIndexNodeTs, concatNodeTsFiles, cleanNodeFoundation),
	buildWebProd: gulp.series(parseIndexWebTs, concatWebTsFiles, cleanWebFoundation),
	minifyNodeProd: minifyNodeProd,
	minifyWebProd: minifyWebProd,
	createNodePackage: createNodePackage,
	createWebPackage: createWebPackage,
	removeTempFolders: removeTempFolders
}