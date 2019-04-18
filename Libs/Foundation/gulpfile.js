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

//Creates foundation.d.ts
function buildDts(cb) {
	return gulp.src(['./dist/*.d.ts', '!./dist/index.d.ts', './dist/core/*.d.ts'])
	.pipe(concat("foundation.d.ts"))
	.pipe(gulp.dest("./.build/types"))
	cb();
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
				library: ["agGrid"],
                libraryTarget: "umd"
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
				library: ["agGrid"],
                libraryTarget: "umd"
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
	build: build,
	buildDts: buildDts,
	buildNodeProd: buildNodeProd,
	buildWebProd: buildWebProd,
	createNodePackage: createNodePackage,
	createWebPackage: createWebPackage,
	cleanBuild: cleanBuild
}