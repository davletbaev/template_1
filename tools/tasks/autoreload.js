const gulp  = require('gulp')  
const spawn = require('child_process').spawn;

const paths = require('../paths')
 
const watchGulpfile = (done) => {
  let prevProcess;

  const spawnChildren = (cbdone) => {
    if (prevProcess) {
      prevProcess.kill();
    }

    prevProcess = spawn('gulp', [ 'dev' ], { stdio: 'inherit' });
    cbdone && cbdone()
  }

  gulp.watch(paths.config, Object.assign(spawnChildren, { displayName: `Gulp configuration updated. Restarting` }));
  spawnChildren();
  done()
}

module.exports = watchGulpfile