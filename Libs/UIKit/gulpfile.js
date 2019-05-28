const gulp = require("gulp");
const fs = require("fs");
const concat = require("gulp-concat");
const rimraf = require("rimraf");
const uglify = require("gulp-uglify");
const execSync = require('child_process').execSync;
const argv = require('yargs').argv;

function DIST_FOLDER(outer) {
	return 'dist'
	//return (argv.transpiler !== undefined) ? 'dist-swift-transpiler' + (outer ? '' : '/source') : 'dist';
}

let arrIndexFiles = [];

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

function UICleanWebUIkit(done) {
	const path = "./source/UIKit.web.ts";
	var originalContent = fs.readFileSync(path, "utf8");
	var newContent = originalContent.replace(/import(.*)["|']\..*/g, "");

	var array = newContent.match(/import.*/g)
	var imports = {}
	for (var index = 0; index < array.length; index++){
		var imp = array[index];
		imports[imp] = true;
	}

	var content = "";
	for (var key in imports){
		content += key + "\n";
	}			
	content += newContent.replace(/import.*/g, "");

	fs.writeFileSync(path, content);
	done();
}

function UICleanWebJsFile(done) {
	const path = `./${DIST_FOLDER()}/UIKit.web.js`;
	const regExObject = /\}\)\((.*) = exports.*\{\}\)\);/g;
	const ObjectReplace = "})($1 || ($1 = {}));";
	const regExExport = /exports\..*;/g;
	const regExObjectProperties = 'Object.defineProperty(exports, "__esModule", { value: true });';

	let content = fs.readFileSync(path, "utf8");
	let newContent = content.replace(regExObject, ObjectReplace)
							.replace(regExExport, " ")
							.replace(regExObjectProperties, " ")
							.replace(/.*require.*/g, "")							
							.replace(/mio_foundation_web_[0-9]*\./g, "");
	
	fs.writeFileSync(path, newContent);
	done();
}

function UIMinifyWebProd() {
	return gulp.src(`./${DIST_FOLDER()}/UIKit.web.js`)
	.pipe(uglify())
	.pipe(gulp.dest('./.build/web-prod/'));
}

function UICreateWebProdPackage(done) {
	const SRC = __dirname + `/${DIST_FOLDER()}/`;
	const DEST = __dirname + "/packages/mio-uikit-web/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder				
		execSync('mkdir -p ' + DEST + "types"); // Always you can relay on bash :)
		
		//Copy UIKit.d.ts to types folder
		fs.copyFileSync(`./${DIST_FOLDER()}/UIKit.web.d.ts`, DEST + "types/mio-uikit-web.d.ts");

		//Copy UIKit js minified
		if(fs.existsSync("./.build/web-prod/UIKit.web.js")) {
			fs.copyFileSync("./.build/web-prod/UIKit.web.js", DEST + "mio-uikit-web.js");
		}

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		console.log("Package created succesfully");
	} else {
		console.log("SOMETHING WENT WRONG!");
	}
	done();
}

function UICreateWebDevPackage(done) {
	const SRC = __dirname + `/${DIST_FOLDER()}/`;
	const DEST = __dirname + "/packages/mio-uikit-web-dev/";

	if(fs.existsSync(SRC)) {
		//Create package and types folder				
		execSync('mkdir -p ' + DEST + "types"); // Always you can relay on bash :)
		
		//Copy UIKit.d.ts to types folder
		fs.copyFileSync(`./${DIST_FOLDER()}/UIKit.web.d.ts`, DEST + "types/mio-uikit-web.d.ts");

		//Copy UIKit js for DEV not minified
		if(fs.existsSync(`./${DIST_FOLDER()}/UIKit.web.js`)) {
			fs.copyFileSync(`./${DIST_FOLDER()}/UIKit.web.js`, DEST + "mio-uikit-web.js");
		}
		//Copy UIKit js map if exists
		if(fs.existsSync(`./${DIST_FOLDER()}/UIKit.web.js.map`)) {
			fs.copyFileSync(`./${DIST_FOLDER()}/UIKit.web.js.map`, DEST + "mio-uikit-web.js.map");
		}

		//Copy package.json, LICENSE AND README
		fs.copyFileSync(__dirname + "/../../LICENSE", DEST + "LICENSE");
		fs.copyFileSync(__dirname + "/../../README.md", DEST + "README.md");

		console.log("Package created succesfully");
	} else {
		console.log("SOMETHING WENT WRONG!");
	}
	done();
}

function UIBuildWebProdPackageFile(done) {
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

function UIBuildWebDevPackageFile(done) {
	var platform = "web";
	var regEx = /{%platform%}/gm;
	const DEST = "packages/mio-uikit-web-dev/";

	//Create package.platform.json
	fs.copyFileSync("package.platform.json", DEST + "package.json");
	
	var content = fs.readFileSync("packages/mio-uikit-" + platform + "-dev/package.json", "utf8");
	content = content.replace(regEx, platform);
	fs.writeFileSync("packages/mio-uikit-" + platform + "-dev/package.json", content);
	done();
}

function UIRemoveTempFolders(done) {
	const buildDir = __dirname + "/.build";
	const distDir =  __dirname + `/${DIST_FOLDER(true)}`;

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
			console.log(`/${DIST_FOLDER(true)} folder deleted successfully`);
		});
	} else {
		console.log(`/${DIST_FOLDER(true)} directory does not exist`);
	}
	done();
}

module.exports = {
	UIBuildWeb: gulp.series(UIParseIndexWebTs, UIConcatWebTsFiles, UICleanWebUIkit),
	UICleanWebJsFile,
	UIMinifyWebProd,
	UIBuildWebProdPackage: gulp.series(UICreateWebProdPackage, UIBuildWebProdPackageFile),
	UIBuildWebDevPackage: gulp.series(UICreateWebDevPackage, UIBuildWebDevPackageFile),
	UIRemoveTempFolders
}