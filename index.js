/**
 * Metalsmith plugin to filter files.
 *
 * @param {Function} predicate
 * @returns {Function}
 */
const plugin = (predicate) => {
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function')
  }

  return (files, _metalsmith, done) => {
    setImmediate(done)
    Object.keys(files).forEach((filename) => {
      const data = files[filename]
      if (!predicate(filename, data)) {
        delete files[filename]
      }
    })
  }
}

module.exports = plugin
