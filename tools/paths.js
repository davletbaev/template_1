const paths = {
  config: [ 'package.json', 'gulpfile.js', 'tools/**/*.*' ],
  src: {
    html: 'src/html/**/[^_]*.html',
    css: 'src/sass/styles.scss',
    js: 'src/js/**/*.js',
    images: 'src/img/**/*.{jpg,jpeg,png,webp}',
    icons: ['src/img/icons/**/*.svg','src/img/logo/*.svg'],
    fonts: 'src/fonts/**/*.{woff,woff2}'
  },
  watch: {
    html: 'src/html/**/*.html',
    css: 'src/sass/**/*.scss',
    js: 'src/js/**/*.js',
    images: 'src/img/**/*.{jpg,jpeg,png,webp}',
    icons: ['src/img/icons/**/*.svg','src/img/logo/*.svg'],
    fonts: 'src/fonts/**/*.{woff,woff2}'
  },
  dist: {
    html: 'dist',
    css: 'dist/css',
    js: 'dist/js',
    images: 'dist/img',
    fonts: 'dist/fonts'
  }
}

module.exports = paths