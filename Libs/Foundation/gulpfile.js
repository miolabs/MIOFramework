const gulp = require("gulp");
const { series, parallel } = require("gulp");
const fs = require("fs");
const utils = require("./gulp.utils");

function buildLibs(cb) {
	utils.readDir();
	cb();
}

module.exports = {
	buildLibs: buildLibs
}