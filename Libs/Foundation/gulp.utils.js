const gulp = require("gulp");
const fs = require("fs");
const ts = require("gulp-typescript");
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');

const NODE_INDEX_PATH = "source/index-node.ts";
const WEB_INDEX_PATH = "source/platform/web/index.ts";

//var tsProjectProd = ts.createProject('tsconfig.json');
var tsProjectDev = ts.createProject('tsconfig-node.json');


function buildNodeDev() { //no sourcemaps
	return rollup.rollup({
		input: './source/index.ts',
		plugins: [
		  rollupTypescript()
		]
	}).then(bundle => {
		return bundle.write({
		  file: './dist/foundation.js',
		  format: 'cjs',
		  name: 'foundation',
		  sourcemap: true
		});
	});
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