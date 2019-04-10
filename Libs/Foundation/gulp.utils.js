const gulp = require("gulp");
const fs = require("fs");
const ts = require("gulp-typescript");

const NODE_INDEX_PATH = "source/index-node.ts";
const WEB_INDEX_PATH = "source/platform/web/index.ts";

var tsProjectProd = ts.createProject('tsconfig.json');
var tsProjectDev = ts.createProject('tsconfig-node.json', { sourceMap: false });


function buildNodeDev() { //no sourcemaps
	return gulp.src("source/")
	.pipe(tsProjectDev())
	.pipe(gulp.dest(".build/"));
}

function buildWebDev() { //no sourcemaps
	return gulp.src(WEB_INDEX_PATH)
	.pipe(tsProjectDev())
	.pipe(gulp.dest(".build/"));
}

function buildNodeProd() { //generate sourcemaps
	return gulp.src(NODE_INDEX_PATH)
	.pipe(tsProjectProd())
	.pipe(gulp.dest(".build/"));
}

function buildWebProd() { //generate sourcemaps
	return gulp.src(WEB_INDEX_PATH)
	.pipe(tsProjectProd())
	.pipe(gulp.dest(".build/"));
}

module.exports = {
	buildNodeDev,
	buildWebDev,
	buildNodeProd,
	buildWebProd

}