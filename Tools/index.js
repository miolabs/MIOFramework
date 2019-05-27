const fs = require("file-system");
const program = require('commander');

module.exports = () => {
    program.version("0.9").command("generateProject").description("Generate project to compile swift app in js").action(createApp);
    program.parse(process.argv);

    if (program.args.length === 0) program.help();
}

function createApp() {
	console.log("");
	console.log("########################################");
	console.log("########################################");
	console.log("########### NEW APP CREATED ############");
	console.log("########################################");
	console.log("########################################");
	console.log("");
	
	const TEMPLATES_PATH = __dirname + "/templates/";

	let appName = process.cwd();
	appName = appName.substr(appName.lastIndexOf('/') + 1);

	parseGulpfile(appName);

	fs.copyFileSync(TEMPLATES_PATH + "gulp.storyboard.template.js", "./gulp.storyboard.js");
	fs.copyFileSync(TEMPLATES_PATH + "gulp.utils.template.js", "./gulp.utils.js");
	fs.copyFileSync(TEMPLATES_PATH + "package.template.json", "./package.json");
	fs.copyFileSync(TEMPLATES_PATH + "tsconfig.template.json", "./tsconfig.json");
}

function parseGulpfile(appName) {
	const GULPFILE_PATH = __dirname + "/templates/gulpfile.template.js";

	let content = fs.readFileSync(GULPFILE_PATH, "utf8");
	let newContent = content.replace(/{AppName}/g, appName);
	fs.writeFileSync("./gulpfile.js", newContent, "utf8");
}