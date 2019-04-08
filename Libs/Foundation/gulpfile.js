const gulp = require("gulp");
const { series, parallel } = require("gulp");
const fs = require("fs");
const utils = require("./gulp.utils");

function build(env, cb) {

	cb();
}

module.exports = {
	buildLibs: buildLibs
}