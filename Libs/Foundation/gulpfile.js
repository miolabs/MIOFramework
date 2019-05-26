const gulp = require("gulp");
const fs = require("fs");
const concat = require("gulp-concat");
const rimraf = require("rimraf");
const uglify = require("gulp-uglify");

let arrIndexFiles = [];

/********** PROD **********/
/********** PROD **********/
/********** PROD **********/

/********** NODE **********/
function parseIndexNodeTs(done) {
	var regEx = /export\s.\sfrom \'.\/(.*)\'/gm;
	var content = fs.readFileSync("./source/index.node.ts", "utf8");
	var item;

	arrIndexFiles = [];

	while (item = regEx.exec(content)) {		
		arrIndexFiles.push("./source/" + item[1] + ".ts");
	}
	done();
}

function concatNodeTsFiles() {		
	return gulp.src(arrIndexFiles)
	.pipe(concat("foundation.node.ts"))
	.pipe(gulp.dest("./source/"));
}

function cleanNodeFoundation(done) {
	const path = "./source/foundation.node.ts";
	var originalContent = fs.readFileSync(path, "utf8");
	var newContent = originalContent.replace(/import(.*)["|']\..*/g, "");
	fs.writeFileSync(path, newContent);
	done();
}

function minifyNodeProd() {
	return gulp.src('./dist/foundation.node.js')
	.pipe(uglify())
	.pipe(gulp.dest('./.build/node-prod/'));
}

function createNodePackage(done) {
	const SRC = __dirname + "/.build/";
	const DEST = __dirname + "/packages/mio-foundation-node/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy foundation.d.ts to types folder
		fs.copyFileSync("./dist/foundation.node.d.ts", DEST + "types/mio-foundation-node.d.ts");

		//Copy foundation.min.js
		fs.copyFileSync("./.build/node-prod/foundation.node.js", DEST + "mio-foundation-node.js");

		//Create package.platform.json
		fs.copyFileSync("package.platform.json", DEST + "package.json");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist - Execute first gulp minifyNodeProd");
	}
	done();
}

function buildNodePackageFile(done) {
	var platform = "node";
	var regEx = /{%platform%}/gm;
	const DEST = "packages/mio-foundation-node/";

	//Create package.platform.json
	fs.copyFileSync("package.platform.json", DEST + "package.json"); 
	
	var content = fs.readFileSync("packages/mio-foundation-" + platform + "/package.json", "utf8");
	content = content.replace(regEx, platform);
	fs.writeFileSync("packages/mio-foundation-" + platform + "/package.json", content);
	done();
}

/********** WEB **********/
function parseIndexWebTs(done) {
	var regEx = /export\s.\sfrom \'.\/(.*)\'/gm;
	var content = fs.readFileSync("./source/index.web.ts", "utf8");
	var item;

	arrIndexFiles = [];	

	while (item = regEx.exec(content)) {		
		arrIndexFiles.push("./source/" + item[1] + ".ts");
	}
	done();
}

function concatWebTsFiles() {		
	return gulp.src(arrIndexFiles)
	.pipe(concat("foundation.web.ts"))
	.pipe(gulp.dest("./source/"));
}

function cleanWebFoundation(done) {
	const path = "./source/foundation.web.ts";
	var originalContent = fs.readFileSync(path, "utf8");
	var newContent =  originalContent.replace(/import(.*)["|']\..*/g, "");
	fs.writeFileSync(path, newContent);
	done();
}

function cleanWebJsFile(done) {
	const path = "./dist/foundation.web.js";
	const regExObject = /\}\)\((.*) = exports.*\{\}\)\);/g;
	const ObjectReplace = "})($1 || ($1 = {}));";
	const regExExport = /exports\..*;/g;
	const regExObjectProperties = 'Object.defineProperty(exports, "__esModule", { value: true });';

	let content = fs.readFileSync(path, "utf8");
	let newContent = content.replace(regExObject, ObjectReplace).replace(regExExport, " ").replace(regExObjectProperties, " ");

	newContent = newContent.replace(/.*require.*/g, "").replace(/mio_foundation_web_[0-9]*\./g, "");
	
	fs.writeFileSync(path, newContent);
	done();
}

function minifyWebProd() {
	return gulp.src('./dist/foundation.web.js')
	.pipe(uglify())
	.pipe(gulp.dest('./.build/web-prod/'));
}

function createWebPackage(done) {
	const SRC = __dirname + "/.build/";
	const DEST = __dirname + "/packages/mio-foundation-web/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy foundation.d.ts to types folder
		fs.copyFileSync("./dist/foundation.web.d.ts", DEST + "types/mio-foundation-web.d.ts");

		//Copy foundation.min.js
		fs.copyFileSync("./.build/web-prod/foundation.web.js", DEST + "mio-foundation-web.min.js");

		//Copy extensions.ts file
		fs.copyFileSync("source/extensions/extensions.ts", DEST + "extensions.ts");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist - Execute first gulp minifyWebProd");
	}
	done();
}

function buildWebPackageFile(done) {
	var platform = "web";
	var regEx = /{%platform%}/gm;
	const DEST = "packages/mio-foundation-web/";

	//Create package.platform.json
	fs.copyFileSync("package.platform.json", DEST + "package.json");
	
	var content = fs.readFileSync("packages/mio-foundation-" + platform + "/package.json", "utf8");
	content = content.replace(regEx, platform);
	fs.writeFileSync("packages/mio-foundation-" + platform + "/package.json", content);
	done();
}

/********** *** **********/
/********** DEV **********/
/********** *** **********/
function buildWebDevPackage(done) {
	const SRC = __dirname + "/dist/";
	const DEST = __dirname + "/packages/mio-foundation-web-dev/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy foundation.d.ts to types folder
		fs.copyFileSync("./dist/foundation.web.d.ts", DEST + "types/mio-foundation-web.d.ts");

		//Copy foundation.web.js
		fs.copyFileSync("./dist/foundation.web.js", DEST + "mio-foundation-web.js");

		//Copy foundation.web.js.map
		fs.copyFileSync("./dist/foundation.web.js.map", DEST + "mio-foundation-web.js.map");

		//Copy extensions.ts file
		fs.copyFileSync("source/extensions/extensions.ts", DEST + "extensions.ts");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist - Execute first gulp minifyWebProd");
	}
	done();
}

function buildWebDevPackageFile(done) {
	var platform = "web";
	var regEx = /{%platform%}/gm;
	const DEST = "packages/mio-foundation-web-dev/";

	//Create package.platform.json
	fs.copyFileSync("package.platform.json", DEST + "package.json");
	
	var content = fs.readFileSync("packages/mio-foundation-" + platform + "-dev/package.json", "utf8");
	content = content.replace(regEx, platform);
	fs.writeFileSync("packages/mio-foundation-" + platform + "-dev/package.json", content);
	done();
}

/********** ***** **********/
/********** UTILS **********/
/********** ***** **********/
function removeTempFolders(done) {
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
	done();
}

module.exports = {
	//NODE PROD
	buildNode: gulp.series(parseIndexNodeTs, concatNodeTsFiles, cleanNodeFoundation),
	minifyNodeProd,
	buildNodePackage: gulp.series(createNodePackage, buildNodePackageFile),

	//WEB PROD
	buildWeb: gulp.series(parseIndexWebTs, concatWebTsFiles, cleanWebFoundation),
	cleanWebJsFile,
	minifyWebProd,
	buildWebPackage: gulp.series(createWebPackage, buildWebPackageFile),

	removeTempFolders,

	//WEB DEV
	buildWebDevPackage,
	buildWebDevPackageFile
}