const gulp = require("gulp");
const { series, parallel } = require("gulp");
const fs = require("fs");
const utils = require("./gulp.utils");
const dts = require("dts-bundle");
const rimraf = require("rimraf");

function build(cb) {
	var env = process.env["BUILD_ENV"];
	var platform = process.env["BUILD_PLATFORM"];

	console.log(env + " " + platform);

	if (env == "dev" && platform == "node") {
		utils.buildNodeDev();
	}
	else if (env == "dev" && platform == "web"){
		utils.buildWebDev();
	}
	else if (env == "prod" && platform == "node") {
		utils.buildNodeProd();
	}
	else if (env == "prod" && platform == "web") {
		utils.buildWebProd();
	}
	cb();
}

function createPackage(cb) {
	const DEST = __dirname + "/packages/mio-foundation-node/";
	const SRC = __dirname + "/.build/node-prod/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy foundation.d.ts to types folder
		fs.copyFileSync(SRC + "foundation.d.ts", DEST + "types/foundation.d.ts");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		//Copy foundation.js to the package folder
		fs.copyFileSync(__dirname + "/.build/foundation-min/node-prod/foundation.js", DEST + "foundation.min.js");
		console.log("Package created succesfully");
		cleanBuild();
	} else {
		console.log("/.build directory does not exist");
	}
	cb();
}

function cleanBuild() {
	const dir = __dirname + "/.build";
	const rollupcache = __dirname + "/.rpt2_cache";

	if(fs.existsSync(dir)) {
		rimraf(dir, function(err) {
			if(err) throw err;
			rimraf.sync(rollupcache);
			console.log("/.build folder deleted successfully");
		});
	} else {
		console.log("/.build directory does not exist");
	}
}

module.exports = {
	build: build,
	createPackage: createPackage,
	cleanBuild: cleanBuild
}