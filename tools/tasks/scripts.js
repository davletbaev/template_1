const gulp         = require('gulp')
const pump         = require('pump')
const babel        = require('gulp-babel')
const uglify       = require('gulp-uglify')
const sourcemaps   = require('gulp-sourcemaps')

const paths = require('../paths')

const buildScripts = (mode) => (done) => {
  pump([
      gulp.src(paths.src.js),
      ...((mode === 'development') ? [ sourcemaps.init({ loadMaps: true }) ] : []),
      babel({
        presets: ['@babel/env']
      }),
      ...((mode === 'production') ? [ uglify() ] : []),
      ...((mode === 'development') ? [ sourcemaps.write('./') ] : []),
      gulp.dest(paths.dist.js)
  ], done)
}

module.exports = buildScripts