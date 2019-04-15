const gulp = require("gulp");
const fs = require("fs");
const ts = require("gulp-typescript");
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');
const dts = require("dts-bundle");
const uglify = require("gulp-uglify");
const pipeline = require('readable-stream').pipeline;

function buildNodeDev() {
	return rollup.rollup({
		input: './source/index.ts',
		plugins: [
		  rollupTypescript()
		]
	}).then(bundle => {
		return bundle.write({
		  file: '.build/node-dev/foundation.js',
		  format: 'cjs',
		  name: 'foundation',
		  sourcemap: true
		}).then(function(){
			return dts.bundle({
				name: 'foundation',
				main: '.build/node-dev/index.d.ts'
			});
		});			
	});
}

function buildWebDev() {
	return rollup.rollup({
		input: './source/index.ts',
		plugins: [
		  rollupTypescript()
		]
	}).then(bundle => {
		return bundle.write({
		  file: '.build/web-dev/foundation.js',
		  format: 'cjs',
		  name: 'foundation',
			sourcemap: true,			
		}).then(function(){
			return dts.bundle({
				name: 'foundation',
				main: '.build/web-dev/index.d.ts'
			});	
		});			
	});
}

function buildNodeProd() {
	return rollup.rollup({
		input: './source/index.ts',
		plugins: [
		  rollupTypescript({
				tsconfigDefaults:{ compilerOptions: { declaration: true } }
			})
		]
	}).then(bundle => {
		return bundle.write({
		  file: '.build/node-prod/foundation.js',
		  format: 'cjs',
		  name: 'foundation',
		  sourcemap: false
		}).then(() => {
			return dts.bundle({
				name: 'foundation',
				main: '.build/node-prod/index.d.ts'
			});
		}).then(() => {
			return minifyNodeProd();
		});
	});
}

function buildWebProd() {
	return rollup.rollup({
		input: './source/index.ts',
		plugins: [
		  rollupTypescript()
		]
	}).then(bundle => {
		return bundle.write({
		  file: '.build/web-prod/foundation.js',
		  format: 'cjs',
		  name: 'foundation',
		  sourcemap: false
		}).then(() => {
			return dts.bundle({
				name: 'foundation',
				main: '.build/web-prod/index.d.ts'
			});
		}).then(() => {
			return minifyWebProd();			
		});
	});
}

function minifyNodeProd() {
	return pipeline (
		gulp.src(".build/node-prod/foundation.js"),
		uglify(),
		gulp.dest(".build/foundation-min/node-prod")
	);
}

function minifyWebProd() {
	return pipeline (
		gulp.src(".build/web-prod/foundation.js"),
		uglify(),
		gulp.dest(".build/foundation-min/web-prod")
	);
}

module.exports = {
	buildNodeDev,
	buildWebDev,
	buildNodeProd,
	buildWebProd,
	minifyNodeProd,
	minifyWebProd
}