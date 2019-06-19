const gulp     = require('gulp')
const pump     = require('pump')
const nunjucks = require('gulp-nunjucks')
const rename   = require('gulp-rename')
const beautify = require('gulp-html-beautify')

const paths = require('../paths')

const buildHtml = (mode) => (done) => {
  pump([
      gulp.src(paths.src.html),
      rename({ dirname: '' }),
      nunjucks.compile(),
      beautify({
        indentSize: 2,
        preserve_newlines: false,
      }),
      gulp.dest(paths.dist.html)
  ], done)
}

module.exports = buildHtml