const t = require('tap')
const autoRequire = require('../index')

t.test('autoRequire', t => {
  const collection = autoRequire({
    globaly: true
  })
  t.ok(collection)
  t.ok(collection.lodashCamelcase)
  t.ok(collection.lodashZipobject)
  t.ok(collection.eslint)
  t.deepEqual(collection.eslint, global.eslint)
  t.ok(Object.keys(collection).length)
  
  
  
  const collection2 = autoRequire({
    toRoot: ['eslint']
  })
  
  t.ok(collection2)
  t.ok(collection2.lodashCamelcase)
  t.ok(collection2.lodashZipobject)
  
  t.ok(! collection2.eslint)
  t.ok(collection2.linter)
  t.ok(collection2.CLIEngine)
  t.ok(collection2.RuleTester)
  t.ok(collection2.SourceCode)
  
  t.ok(Object.keys(collection2).length)
  
  t.end()
})
