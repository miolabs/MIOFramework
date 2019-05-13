#!/usr/bin/env node
'use strict'
const fs = require("file-system");
const program = require('commander');


function createApp() {
	const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	});

	console.log("########################################");
	console.log("########################################");
	console.log("########### CREATE A NEW APP ###########");
	console.log("########################################");
	console.log("########################################");
	console.log("");
	console.log("");
	
	var appName = process.argv[1];
	readline.question("App name (" + appName + "): " , (name) => {
		readline.close()
		const DEST = "../ITests/" + name;
		const TEMPLATES_PATH = __dirname + "/templates/";

		fs.mkdirSync(DEST)
		fs.copyFileSync(TEMPLATES_PATH + "gulp.storyboard.template.js", DEST + "/gulp.storyboard.js");
		fs.copyFileSync(TEMPLATES_PATH + "gulp.utils.template.js", DEST + "/gulp.utils.js");
		fs.copyFileSync(TEMPLATES_PATH + "tsconfig.template.json", DEST + "/tsconfig.json");
	});
}

program.version("0.9").command("generateProject").description("Generate project to compile swift app in js").action(createApp);
program.parse(process.argv);

if (program.args.length === 0) program.help();