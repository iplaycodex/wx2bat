const del = require('del')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const minimist = require('minimist')
const argv = minimist(process.argv.slice(5,8))

const SRC = argv.src
const DEST = argv.dest
const PLATFORM = argv.platform
const wxssFiles = SRC + '/**/*.wxss'
const jsFiles = SRC + '/**/*.js'
const wxmlFiles = SRC + '/**/*.wxml'
const images = SRC + '/**/*.{png,jpg,jpeg,gif,ico,svg}'
const otherFiles = [
  SRC + '/**/*',
  '!' + SRC + '/**/*.{wxss,js,wxml,png,jpg,jpeg,gif,ico,svg}'
]
const list = [{
  key: 'baidu',
  ext: {
    html: '.swan',
    css: ".css",
    js: '.js',
    ins:'s-',
    api: "swan."
  }
}, {
  key: "alipay",
  ext: {
    html: '.axml',
    css: ".acss",
    js: '.js',
    ins:'a:',
    api: 'my.'
  }
}, {
  key: "toutiao",
  ext: {
    html: '.ttml',
    css: ".ttss",
    js: '.js',
    ins:'tt:',
    api: 'tt.'
  }
}];
let obj;
list.forEach(ele => {
  if (ele.key == PLATFORM) obj = ele.ext;
});
// 清除输出目录
gulp.task('clean', function (cb) {
  return del(DEST, { force: true }).then(() => {
    cb()
  })
})

// 处理wxml文件
gulp.task('wxml', function () {
  return (
    gulp
      .src(wxmlFiles)
      .pipe($.debug({ title: '[wxml 文件]' }))
      .pipe($.replace('wx:', obj.ins))
      .pipe(
        $.rename({
          extname: obj.html
        })
      )
      .pipe(gulp.dest(DEST))
  )
})

// 处理wxss
gulp.task('wxss', function () {
  return (
    gulp
      .src(wxssFiles)
      .pipe($.debug({ title: '[wxss 文件]' }))
      .pipe(
        $.rename({
          extname: obj.css
        })
      )
      .pipe($.replace('.wxss', obj.css))
      .pipe(gulp.dest(DEST))
  )
})

// 处理js
gulp.task('js', function () {
  return (
    gulp
      .src(jsFiles)
      .pipe($.debug({ title: '[js 文件]' }))
      .pipe($.replace('wx.', obj.api))
      .pipe(
        $.if(
          argv.minify || argv['minify-js'],
          $.babel({
            presets: ['@babel/env']
          })
        )
      )
      .pipe(gulp.dest(DEST))
  )
})

// 处理图片
gulp.task('images', function () {
  return (
    gulp
      .src(images)
      .pipe($.debug({ title: '[image 文件]' }))
      .pipe(gulp.dest(DEST))
  )
})

// 其他文件
gulp.task('others', function () {
  return gulp
    .src(otherFiles)
    .pipe($.debug({ title: '[other files]' }))
    .pipe(gulp.dest(DEST))
})

gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel('wxss', 'js', 'images', 'wxml', 'others')
  )
)
