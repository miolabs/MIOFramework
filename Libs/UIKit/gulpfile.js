const gulp = require("gulp");
const fs = require("fs");
const concat = require("gulp-concat");
const rimraf = require("rimraf");
const uglify = require("gulp-uglify");

let arrIndexFiles = [];

/********** PROD **********/
/********** PROD **********/
/********** PROD **********/

/********** WEB **********/
function UIParseIndexWebTs(done) {
	var regEx = /export\s.\sfrom \'.\/(.*)\'/gm;
	var content = fs.readFileSync("./source/index.ts", "utf8");
	var item;

	arrIndexFiles = [];

	while (item = regEx.exec(content)) {		
		arrIndexFiles.push("./source/" + item[1] + ".ts");
	}
	done();
}

function UIConcatWebTsFiles() {		
	return gulp.src(arrIndexFiles)
	.pipe(concat("UIKit.web.ts"))
	.pipe(gulp.dest("./source/"));
}

function UICleanWebFoundation(done) {
	const path = "./source/UIKit.web.ts";
	var originalContent = fs.readFileSync(path, "utf8");
	var newContent =  originalContent.replace(/import(.*)["|']\..*/g, "");
	fs.writeFileSync(path, newContent);
	done();
}

function UICleanWebJsFile(done) {
	const path = "./dist/uikit.web.js";
	const regExObject = /\}\)\((.*) = exports.*\{\}\)\);/g;
	const ObjectReplace = "})($1 || ($1 = {}));";
	const regExExport = /exports\..*;/g;
	const regExObjectProperties = 'Object.defineProperty(exports, "__esModule", { value: true });';

	let content = fs.readFileSync(path, "utf8");
	let newContent = content.replace(regExObject, ObjectReplace).replace(regExExport, " ").replace(regExObjectProperties, " ");
	
	fs.writeFileSync(path, newContent);
	done();
}

function UIMinifyWebProd() {
	return gulp.src('./dist/UIKit.web.js')
	.pipe(uglify())
	.pipe(gulp.dest('./.build/web-prod/'));
}

function UICreateWebPackage(done) {
	const SRC = __dirname + "/.build/";
	const DEST = __dirname + "/packages/mio-uikit-web/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder
		fs.mkdirSync(DEST + "types", {recursive: true});
		
		//Copy UIKit.d.ts to types folder
		fs.copyFileSync("./dist/UIKit.web.d.ts", DEST + "types/mio-uikit-web.d.ts");

		//Copy UIKit js
		fs.copyFileSync("./.build/web-prod/UIKit.web.js", DEST + "mio-uikit-web.js");

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		console.log("Package created succesfully");
	} else {
		console.log("/.build directory does not exist - Execute first gulp UIminifyWebProd");
	}
	done();
}

function UIBuildWebPackageFile(done) {
	var platform = "web";
	var regEx = /{%platform%}/gm;
	const DEST = "packages/mio-uikit-web/";

	//Create package.platform.json
	fs.copyFileSync("package.platform.json", DEST + "package.json");
	
	var content = fs.readFileSync("packages/mio-uikit-" + platform + "/package.json", "utf8");
	content = content.replace(regEx, platform);
	fs.writeFileSync("packages/mio-uikit-" + platform + "/package.json", content);
	done();
}

function UIRemoveTempFolders(done) {
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

/********** DEV **********/
/********** DEV **********/
/********** DEV **********/

/********** WEB **********/


module.exports = {
	//WEB PROD
	UIBuildWeb: gulp.series(UIParseIndexWebTs, UIConcatWebTsFiles, UICleanWebFoundation),
	UICleanWebJsFile,
	UIMinifyWebProd,
	UIBuildWebPackage: gulp.series(UICreateWebPackage, UIBuildWebPackageFile),

	//WEB DEV

	UIRemoveTempFolders
}