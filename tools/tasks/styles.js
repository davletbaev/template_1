const gulp         = require('gulp')
const pump         = require('pump')
const sass         = require('gulp-sass')
const postcss      = require('gulp-postcss')
const flexbugs     = require('postcss-flexbugs-fixes')
const uncss        = require('postcss-uncss')
const normalize    = require('postcss-normalize')
const autoprefixer = require('autoprefixer')
const cssnano      = require('cssnano')
const mqpacker     = require('css-mqpacker')
const sortCSSmq    = require('sort-css-media-queries');
const sourcemaps   = require('gulp-sourcemaps')

const paths = require('../paths')

const buildStyles = (mode, bs) => (done) => {
  const outputStyle = (mode === 'production') ? 'compressed' : 'nested'
  const plugins =  [
    normalize,
    autoprefixer,
    flexbugs,
    mqpacker({
      sort: sortCSSmq
    }),
    ...((mode === 'production') ? [
      uncss({
        html: ['dist/**/*.html'],
        ignore: ['\.js-.*']
      }),
      cssnano,
    ] : [])
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
    ...((mode === 'development') ? [sourcemaps.write('./')] : []),
    gulp.dest(paths.dist.css),
    ...(bs ? [bs.stream()] : [])
  ], done)
}

module.exports = buildStyles