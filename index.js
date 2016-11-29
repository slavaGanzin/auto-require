const parseOptions = require('./lib/parseOptions')
const parseModulesMap = require('./lib/parseModulesMap')
const makePackageNames = require('./lib/makePackageNames')
const requireModules = require('./lib/requireModules')
const zipObject = require('lodash.zipobject')

module.exports = function autoRequire (options) {
  options = parseOptions(options)
  const schema = options.schema
  const globaly = options.globaly
  const map = parseModulesMap(schema)
  const packageNames = makePackageNames(map.packages)
  const modules = requireModules(map.fullPaths)
  const collection = zipObject(packageNames, modules)
  if (globaly) {
    Object.keys(collection).forEach(x => {
      global[x] = collection[x]
    })
  }
  return collection
}
