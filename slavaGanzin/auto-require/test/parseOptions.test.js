// Import necessary modules
const t = require('tap')
const parseOptions = require('../lib/parseOptions')

// Test cases for parseOptions function
t.test('parseOptions - Default behavior', t => {
  const options = parseOptions()
  t.equal(options.globaly, false, 'globaly should be set to false by default')
  t.ok(options.schema)
  t.ok(options.schema['node_modules/'])
  t.equal(Array.isArray(options.schema['node_modules/']), true)
  t.end()
})

t.test('parseOptions - Only option', t => {
  const options = parseOptions({
    only: ['eslint', 'tap']
  })
  t.ok(options.schema)
  t.ok(options.schema['node_modules/'])
  t.equal(options.schema['node_modules/'].includes('eslint'), true)
  t.equal(options.schema['node_modules/'].includes('tap'), true)
  t.equal(options.schema['node_modules/'].includes('lodash.camelcase'), false)
  t.end()
})

t.test('parseOptions - Without option', t => {
  const options = parseOptions({
    without: ['eslint', 'tap']
  })
  t.ok(options.schema)
  t.ok(options.schema['node_modules/'])
  t.equal(options.schema['node_modules/'].includes('eslint'), false)
  t.equal(options.schema['node_modules/'].includes('tap'), false)
  t.equal(options.schema['node_modules/'].includes('lodash.camelcase'), true)
  t.end()
})

t.test('parseOptions - Only and Without options', t => {
  const options = parseOptions({
    only: ['eslint', 'tap'],
    without: ['lodash.camelcase']
  })
  t.ok(options.schema)
  t.ok(options.schema['node_modules/'])
  t.equal(options.schema['node_modules/'].includes('eslint'), true)
  t.equal(options.schema['node_modules/'].includes('tap'), true)
  t.equal(options.schema['node_modules/'].includes('lodash.camelcase'), false)
  t.end()
})

t.test('parseOptions - Globaly option', t => {
  const options = parseOptions({
    globaly: true
  })
  t.equal(options.globaly, true, 'globaly should be set to true')
  t.end()
})

t.test('parseOptions - Search option', t => {
  const options = parseOptions({
    search: ['custom-folder/']
  })
  t.ok(options.schema)
  t.ok(options.schema['custom-folder/'])
  t.end()
})

t.test('parseOptions - As option', t => {
  const options = parseOptions({
    as: { 'eslint': 'ESLint' }
  })
  t.ok(options.as)
  t.equal(options.as['eslint'], 'ESLint')
  t.end()
})

t.test('parseOptions - ToRoot option', t => {
  const options = parseOptions({
    toRoot: ['eslint']
  })
  t.ok(options.toRoot)
  t.equal(options.toRoot.includes('eslint'), true)
  t.end()
})

