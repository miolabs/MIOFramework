const gulp = require("gulp");
const fs = require("fs");
const ts = require("gulp-typescript");
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');
const dts = require("dts-bundle");
const uglify = require("gulp-uglify");
const pipeline = require('readable-stream').pipeline;
const concat = require("gulp-concat");
const rimraf = require("rimraf");

// function buildNodeDev() {
// 	return rollup.rollup({
// 		input: './source/index.ts',
// 		plugins: [
// 		  rollupTypescript()
// 		]
// 	}).then(bundle => {
// 		return bundle.write({
// 		  file: '.build/node-dev/foundation.js',
// 		  format: 'cjs',
// 		  name: 'foundation',
// 		  sourcemap: true
// 		}).then(function(){
// 			return dts.bundle({
// 				name: 'foundation',
// 				main: '.build/node-dev/index.d.ts'
// 			});
// 		});			
// 	});
// }

// function buildWebDev() {
// 	return rollup.rollup({
// 		input: './source/index.ts',
// 		plugins: [
// 		  rollupTypescript()
// 		]
// 	}).then(bundle => {
// 		return bundle.write({
// 		  file: '.build/web-dev/foundation.js',
// 		  format: 'cjs',
// 		  name: 'foundation',
// 		  sourcemap: true
// 		}).then(function(){
// 			return dts.bundle({
// 				name: 'foundation',
// 				main: '.build/web-dev/index.d.ts'
// 			});	
// 		});			
// 	});
// }

// function buildNodeProd() {
// 	return rollup.rollup({
// 		input: ['./source/index.ts', './source/platform/node/MIOCore_node.ts'],
// 		plugins: [
// 			rollupTypescript()
// 		]
// 	}).then(bundle => {
// 		return bundle.write({
// 			dir: '.build/node-prod/',
// 			format: 'cjs',
// 			name: 'foundation',
// 			sourcemap: false
// 		}).then(() => {
// 			return dts.bundle({
// 				name: 'foundation',
// 				main: '.build/node-prod/index.d.ts'
// 			});
// 		}).then(() => {
// 			return concatNodeSourceFiles();	
// 		})		
// 	});
// }

// function buildWebProd() {
// 	return rollup.rollup({
// 		input: ['./source/index.ts', './source/platform/web/MIOCore_web.ts'],
// 		plugins: [
// 			rollupTypescript()
// 		]
// 	}).then(bundle => {
// 		return bundle.write({
// 			dir: '.build/web-prod/',
// 			format: 'cjs',
// 			name: 'foundation',
// 			sourcemap: false
// 		}).then(() => {
// 			return dts.bundle({
// 				name: 'foundation',
// 				main: '.build/web-prod/index.d.ts'
// 			});
// 		}).then(() => {
// 			return concatWebSourceFiles();	
// 		})		
// 	});
// }

function buildNodeProd() {
	return gulp.src(['./dist/*.js', './dist/core/MIOCoreTypes.js', './dist/platform/node/MIOCore_node.js'])
	.pipe(concat("foundation.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("./.build/node-prod/"))
}

function buildWebProd() {
	return gulp.src(['./dist/*.js', './dist/core/MIOCoreTypes.js', './dist/platform/web/MIOCore_web.js'])
	.pipe(concat("foundation.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("./.build/web-prod/"))
}

function cleanBuild() {
	const dir = __dirname + "/.build";
	//const rollupcache = __dirname + "/.rpt2_cache";

	if(fs.existsSync(dir)) {
		rimraf(dir, function(err) {
			if(err) throw err;
			// rimraf.sync(rollupcache);
			console.log("/.build folder deleted successfully");
		});
	} else {
		console.log("/.build directory does not exist");
	}
}

module.exports = {
	buildNodeProd,
	buildWebProd,
	cleanBuild
}