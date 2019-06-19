const gulp         = require('gulp')
const pump         = require('pump')
const sass         = require('gulp-sass')
const postcss      = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const flexbugs     = require('postcss-flexbugs-fixes')
const sourcemaps   = require('gulp-sourcemaps')
const gcmq         = require('gulp-group-css-media-queries')
const cssnano      = require('cssnano')
const normalize    = require('postcss-normalize')

const paths = require('../paths')

const buildStyles = (mode, bs) => (done) => {
  const outputStyle = (mode === 'production') ? 'compressed' : 'nested'
  const plugins =  [
    normalize,
    autoprefixer,
    flexbugs,
    ...((mode === 'production') ? [ cssnano ] : [])
  ]

  pump([
      gulp.src(paths.src.css),
      ...((mode === 'development') ? [sourcemaps.init({ loadMaps: true })] : []),
      sass({
          includePaths: [
            'node_modules/include-media/dist/'
          ],
          outputStyle: outputStyle
      }),
      postcss(plugins),
      ...((mode === 'production') ? [
        gcmq()
      ] : []),
      ...((mode === 'development') ? [sourcemaps.write('./')] : []),
      gulp.dest(paths.dist.css),
      ...(bs ? [bs.stream()] : [])
  ], done)
}

module.exports = buildStyles