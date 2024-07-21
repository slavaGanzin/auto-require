const t = require('tap')
const parseModulesMap = require('../lib/parseModulesMap')

t.test('parseModulesMap - basic input', t => {
  const input = {
    'node_modules/': [
      'gulp',
      'grunt'
    ],
    'custom-folder/': [
      'abba-new',
      'nano'
    ]
  }
  const map = parseModulesMap(input)
  t.equal(map.packages.includes('gulp'), true)
  t.equal(map.packages.includes('grunt'), true)
  t.equal(map.packages.includes('abba-new'), true)
  t.equal(map.packages.includes('nano'), true)
  t.equal(map.fullPaths.includes('node_modules/gulp'), true)
  t.equal(map.fullPaths.includes('node_modules/grunt'), true)
  t.equal(map.fullPaths.includes('custom-folder/abba-new'), true)
  t.equal(map.fullPaths.includes('custom-folder/nano'), true)
  t.equal(map.fullPaths.includes('custom-folder/some-random-stuff'), false)
  t.equal(map.fullPaths.includes('node_modules/some-random-stuff-in-node'), false)
  t.end()
})

t.test('parseModulesMap - with renaming', t => {
  const input = {
    'node_modules/': [
      'gulp',
      'grunt'
    ],
    'custom-folder/': [
      'abba-new',
      'nano'
    ]
  }
  const map = parseModulesMap(input, {grunt: 'GRNT'})
  t.equal(map.packages.includes('gulp'), true)
  t.equal(map.packages.includes('grunt'), false)
  t.equal(map.packages.includes('GRNT'), true)
  t.equal(map.packages.includes('abba-new'), true)
  t.equal(map.packages.includes('nano'), true)
  t.equal(map.fullPaths.includes('node_modules/gulp'), true)
  t.equal(map.fullPaths.includes('node_modules/grunt'), true)
  t.equal(map.fullPaths.includes('custom-folder/abba-new'), true)
  t.equal(map.fullPaths.includes('custom-folder/nano'), true)
  t.equal(map.fullPaths.includes('custom-folder/some-random-stuff'), false)
  t.equal(map.fullPaths.includes('node_modules/some-random-stuff-in-node'), false)
  t.end()
})

t.test('parseModulesMap - empty input', t => {
  const input = {}
  const map = parseModulesMap(input)
  t.equal(map.packages.length, 0)
  t.equal(map.fullPaths.length, 0)
  t.end()
})

t.test('parseModulesMap - non-existent modules', t => {
  const input = {
    'node_modules/': [
      'non-existent-module'
    ]
  }
  const map = parseModulesMap(input)
  t.equal(map.packages.includes('non-existent-module'), true)
  t.equal(map.fullPaths.includes('node_modules/non-existent-module'), true)
  t.end()
})

