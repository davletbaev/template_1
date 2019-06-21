const gulp             = require('gulp')
const pump             = require('pump')
const changed          = require('gulp-changed')
const imagemin         = require('gulp-imagemin')
const imageminWebp     = require('imagemin-webp')
const imageminMozjpeg  = require('imagemin-mozjpeg')
const imageminOptiPng  = require('imagemin-optipng')
// const responsive       = require('gulp-responsive')

const paths = require('../paths')

const buildImages = (mode) => (done) => {
  pump([
    gulp.src(paths.src.images),
    ...((mode === 'development') ? [ changed(paths.dist.images) ] : []),
    // responsive({
    //   '**/*.png': [{
    //     width: '50%',
    //     rename: {
    //       suffix: '@1x',
    //     }
    //   },{
    //     width: '50%',
    //     format: 'webp',
    //     rename: {
    //       suffix: '@1x'
    //     }
    //   },{
    //     width: '100%',
    //     rename: {
    //       suffix: '@2x'
    //     }
    //   },{
    //     width: '100%',
    //     format: 'webp',
    //     rename: {
    //       suffix: '@2x'
    //     }
    //   }],
    //   '**/*.jpg': [{
    //     width: '50%',
    //     rename: {
    //       suffix: '@1x',
    //     }
    //   },{
    //     width: '50%',
    //     format: 'webp',
    //     rename: {
    //       suffix: '@1x'
    //     }
    //   },{
    //     width: '100%',
    //     rename: {
    //       suffix: '@2x'
    //     }
    //   },{
    //     width: '100%',
    //     format: 'webp',
    //     rename: {
    //       suffix: '@2x'
    //     }
    //   }]
    // }),
    ...((mode === 'production') ? [
      imagemin([
        imageminWebp({
          quality: 80,
          method: 4
        }),
        imageminMozjpeg({
          quality: 80,
          progressive: true
        }),
        imageminOptiPng({
          optimizationLevel: 2,
          paletteReduction: true
        }),
      ])
    ] : []),
    gulp.dest(paths.dist.images)
  ], done)
}

module.exports = buildImages