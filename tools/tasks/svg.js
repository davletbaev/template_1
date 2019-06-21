const gulp         = require('gulp')  
const pump         = require('pump')
const sprite       = require('gulp-svg-sprite')
const imagemin     = require('gulp-imagemin')
const imageminSvgo = require('imagemin-svgo')
 
const paths = require('../paths')

const buildSvg = (mode) => (done) => {
  pump([
    gulp.src(paths.src.icons),
    imagemin([
      imageminSvgo(),
    ]),
    sprite({
      mode: {
        stack: {
          sprite: "../icons.svg"
        }
      },
    }),
    gulp.dest(paths.dist.images)
  ], done)
}

module.exports = buildSvg