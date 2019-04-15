const gulp = require("gulp");
const fs = require("fs");
const utils = require("./gulp.utils");

function build(cb) {
	var env = process.env["BUILD_ENV"];
	var platform = process.env["BUILD_PLATFORM"];

	console.log("Environment: " + env + " Platform: " + platform);

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

function createNodePackage(cb) {
	const SRC = __dirname + "/.build/";
	const DEST = __dirname + "/packages/mio-foundation-node/";
	const DIST = __dirname + "/dist/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy foundation.d.ts to types folder
		fs.copyFileSync(DIST + "core/MIOCoreTypes.d.ts", DEST + "types/foundation.d.ts");

		//Copy foundation.min.js
		fs.copyFileSync(SRC + "node-prod/foundation.min.js", DEST + "foundation.min.js");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		//Copy foundation.js to the package folder
		//fs.copyFileSync(__dirname + "/.build/node-prod/foundation.js", DEST + "foundation.min.js");
		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist");
	}
	utils.cleanBuild();
	cb();
}

function createWebPackage(cb) {
	const SRC = __dirname + "/.build/web-prod/";
	const DEST = __dirname + "/packages/mio-foundation-web/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy foundation.d.ts to types folder
		fs.copyFileSync(SRC + "foundation.d.ts", DEST + "types/foundation.d.ts");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		//Copy foundation.js to the package folder
		//fs.copyFileSync(__dirname + "/.build/node-prod/foundation.js", DEST + "foundation.min.js");
		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist");
	}
	//utils.minifyWebProd();
	//utils.cleanBuild();
	cb();
}

module.exports = {
	build: build,
	createNodePackage: createNodePackage,
	createWebPackage: createWebPackage
}