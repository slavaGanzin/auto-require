const fs = require('fs')
const path = require('path')
const pkg = require(path.resolve(process.cwd(), 'package.json'))
const contains = require('./contains')
const drop = require('./drop')
const zipObject = require('lodash.zipobject')

module.exports = function parseOptions (options) {
  options = options || {}
  const only = options.only
  const globaly = options.globaly || false
  const search = options.search || ['node_modules/']
  let without = options.without

  const nm = search
    .filter(x => x.match('node_modules/'))
    .map(x => {
      const arr = []
      const depKeys = pkg.dependencies ? Object.keys(pkg.dependencies) : []
      const devDepKeys = pkg.devDependencies ? Object.keys(pkg.devDependencies) : []
      if (depKeys.length) {
        depKeys.forEach(x => arr.push(x))
      }
      if (devDepKeys.length) {
        devDepKeys.forEach(x => arr.push(x))
      }
      return arr
    })

  const custom = search
    .filter(x => !x.match('node_modules/'))
    .map(x => fs.readdirSync(path.resolve(x)))

  let modules = [].concat(nm, custom)

  if (only && without) {
    without = null
  }

  if (only) {
    modules = modules.map(x => contains(x, only))
  }

  if (without) {
    modules = modules.map(x => drop(x, without))
  }

  return {
    schema: zipObject(search, modules),
    globaly: globaly,
    as: options.as,
    toRoot: options.toRoot,
  }
}
