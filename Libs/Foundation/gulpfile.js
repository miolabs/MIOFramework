const gulp = require("gulp");
const fs = require("fs");
const concat = require("gulp-concat");
const webpackStream = require('webpack-stream');
const rimraf = require("rimraf");

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

function concatJsFiles(cb) {
	var arrayFiles = ["./dist/NSPoint.js", "./dist/NSRange.js", "./dist/NSRect.js", "./dist/NSSize.js", "./dist/NSObject.js", "./dist/NSNull.js", "./dist/NSError.js"];

	for (var index = 0; index < arrayFiles.length; index++){
		let file = arrayFiles[index];		
		var content = fs.readFileSync(file, "utf8");
		content = content.replace('"use strict";', '');	
		content = content.replace('Object.defineProperty(exports, "__esModule", { value: true });', '');	
		content = content.replace(/require\(\"\.\/(.*)\"\);/g, "$1");
		fs.writeFileSync(file, content);
	}

	var content = '"use strict";\n';
	//content += 'var __extends = (this && this.__extends) || (function () {\nvar extendStatics = function (d, b) {\nextendStatics = Object.setPrototypeOf ||\n({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\nfunction (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\nreturn extendStatics(d, b);\n};\nreturn function (d, b) {\nextendStatics(d, b);\nfunction __() { this.constructor = d; }\nd.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n};\n})();';
	content += 'Object.defineProperty(exports, "__esModule", { value: true });\n';
	fs.writeFileSync("./dist/header.js", content);
	arrayFiles.unshift("./dist/header.js");

	gulp.src(arrayFiles)
	.pipe(concat("foundation.js"))
	.pipe(gulp.dest("./.build"))
	cb();
}

//Creates foundation.d.ts
function buildDts(cb) {
	return gulp.src(['./dist/*.d.ts', '!./dist/index.d.ts', './dist/core/*.d.ts'])
	.pipe(concat("foundation.d.ts"))
	.pipe(gulp.dest("./.build/types"))
	cb();
}

function deleteDtsImport() {
	var path = __dirname + "/.build/types/foundation.d.ts";
	var dtsContent = fs.readFileSync(path, "utf8");
	var newContent =  dtsContent.replace(/import(.*)/g, "");	
	fs.writeFileSync(path, newContent);

	return gulp.src(".")
	//.pipe(deleteDtsImport)
	.pipe(gulp.dest("."));
}

//Creates foundation.min.js
function buildNodeProd(cb) {
	return gulp.src('dist/platform/node/*.js', 'dist/index.js')
        .pipe(webpackStream({
            entry: {
                main: './dist/index.js'
            },
            output: {
                path: __dirname + "/.build/node-prod/",
				filename: 'foundation.min.js',
				library: ["foundation"],
                libraryTarget: "commonjs"
            }
        }))
        .pipe(gulp.dest('./.build/node-prod/'));
	cb();
}

//Creates foundation.min.js
function buildWebProd(cb) {
	return gulp.src('dist/platform/web/*.js', 'dist/index.js')
        .pipe(webpackStream({
            entry: {
                main: './dist/index.js'
            },
            output: {
                path: __dirname + "/.build/web-prod/",
				filename: 'foundation.min.js',
				library: ["foundation"],
                libraryTarget: "commonjs"
            }
        }))
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
		fs.copyFileSync(SRC + "types/foundation.d.ts", DEST + "types/foundation.d.ts");

		//Copy foundation.min.js
		fs.copyFileSync(SRC + "node-prod/foundation.min.js", DEST + "foundation.min.js");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist");
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
		fs.copyFileSync(SRC + "types/foundation.d.ts", DEST + "types/foundation.d.ts");

		//Copy foundation.min.js
		fs.copyFileSync(SRC + "web-prod/foundation.min.js", DEST + "foundation.min.js");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		//Copy foundation.js to the package folder
		//fs.copyFileSync(__dirname + "/.build/node-prod/foundation.js", DEST + "foundation.min.js");
		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist");
	}
	cb();
}

function cleanBuild(cb) {
	const dir = __dirname + "/.build";

	if(fs.existsSync(dir)) {
		rimraf(dir, function(err) {
			if(err) throw err;
			console.log("/.build folder deleted successfully");
		});
	} else {
		console.log("/.build directory does not exist");
	}
	cb();
}

module.exports = {
	concatJsFiles: concatJsFiles,
	build: build,
	buildDts: buildDts,
	deleteDtsImport: deleteDtsImport,
	buildNodeProd: buildNodeProd,
	buildWebProd: buildWebProd,
	createNodePackage: createNodePackage,
	createWebPackage: createWebPackage,
	cleanBuild: cleanBuild
}