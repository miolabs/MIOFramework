const fs = require("fs");

function readDir() {
	let fileArr = [];
	const extension = ".ts";
	fileArr = fs.readdirSync("source", {encoding: "utf8"});
	fileArr = fileArr.filter(function(file) {
		readFileToString(file.indexOf(extension) !== -1);
	});
}

function readFileToString(file) {
	let fileString = null;

	fs.mkdirSync("./.build/libs.min.ts", {encoding: "utf8"});
	fileString = fs.readFileSync(file, {encoding: "utf8"});
	return fileString;
}

module.exports = {
	readDir,
	readFileToString
}