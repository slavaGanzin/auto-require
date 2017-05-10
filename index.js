const parseOptions = require('./lib/parseOptions')
const parseModulesMap = require('./lib/parseModulesMap')
const makePackageNames = require('./lib/makePackageNames')
const requireModules = require('./lib/requireModules')
const zipObject = require('lodash.zipobject')

module.exports = function autoRequire (options) {
  options = parseOptions(options)
  const schema = options.schema
  const globaly = options.globaly
  const map = parseModulesMap(schema, options.as)
  const packageNames = makePackageNames(map.packages)
  const modules = requireModules(map.fullPaths)
  const collection = zipObject(packageNames, modules)
  if (options.toRoot) {
    options.toRoot.map(module => {
      Object.keys(collection[module]).map(key => {
        collection[key] = collection[module][key]
      })
      
      delete collection[module]
    })
  }
  if (globaly) {
    Object.keys(collection).forEach(name => {
      Object.defineProperty(global, name, {
        set: () => {
          throw new Error(`${name} is already defined`)
        },
        get: () => collection[name],
      })
    })
  }
  return collection
}
