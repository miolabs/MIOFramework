const gulp = require("gulp");
const { series, parallel } = require("gulp");
const fs = require("fs");
const utils = require("./gulp.utils");

function build(cb) {
	var env = process.env["BUILD_ENV"];
	var platform = process.env["BUILD_PLATFORM"];
	console.log(env);
	console.log(platform);
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

module.exports = {
	build: build
}