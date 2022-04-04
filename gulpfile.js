const gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'),
  cleanCSS = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  bourbon = require('node-bourbon')

gulp.task('browser-sync', function () {
  browserSync({
    notify: false
  })
})

// Компиляция style.css
gulp.task('sass', function () {
  return gulp
    .src('./src/assets/styles/index.scss')
    .pipe(
      sass({
        includePaths: bourbon.includePaths
      }).on('error', sass.logError)
    )
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.reload({ stream: true }))
})

// Наблюдение за файлами
gulp.task('watch', function attachWatch() {
  console.log('Started watching changes')

  gulp.watch('./src/assets/styles/*', gulp.series('sass'))
  browserSync.reload
})

gulp.task('default', gulp.series('sass', gulp.parallel('watch')))
