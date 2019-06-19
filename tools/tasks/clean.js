const del = require('del')

/**
* Cleaning Task
* @param {string} path - file or folder name to remove
*/
const clean = (path) => (done) => del(path, done)

module.exports = clean