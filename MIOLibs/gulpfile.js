
var gulp = require('gulp');
var clean = require('gulp-clean');
var exec = require('gulp-exec');


gulp.task('miofoundation', function () {

  var cmd = "java -jar ../swift-js-transpiler/out/artifacts/antlr4example_jar/antlr4example.jar <%= file.path %> ts"

  gulp.src('MIOFoundation/source/*.swift')
  .pipe(exec(cmd))
  .pipe(gulp.dest('build/miofoundation/'))
});

gulp.task('libs', ['miofoundation'], function () {

});

gulp.task('default', ['libs'], function() {

});

// Clean build folder task
gulp.task('clean', function(){
  gulp.src('build', {read: false})
  .pipe(clean());
});
