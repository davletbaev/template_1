const gulp         = require('gulp')
const pump         = require('pump')
const changed      = require('gulp-changed')

const paths = require('../paths')

const buildFonts = (mode) => (done) => {
  pump([
      gulp.src(paths.src.fonts),
      changed(paths.dist.fonts),
      gulp.dest(paths.dist.fonts)
  ], done)
}

module.exports = buildFonts