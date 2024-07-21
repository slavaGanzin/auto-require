const t = require('tap')
const exclusive = require('../lib/exclusive')

t.test('exclusive function', t => {
  t.test('should return true if the item is in the list', t => {
    const list = ['item1', 'item2', 'item3']
    const item = 'item2'
    t.equal(exclusive(list, item), true)
    t.end()
  })

  t.test('should return false if the item is not in the list', t => {
    const list = ['item1', 'item2', 'item3']
    const item = 'item4'
    t.equal(exclusive(list, item), false)
    t.end()
  })

  t.test('should return false if the list is empty', t => {
    const list = []
    const item = 'item1'
    t.equal(exclusive(list, item), false)
    t.end()
  })

  t.test('should return false if the item is null', t => {
    const list = ['item1', 'item2', 'item3']
    const item = null
    t.equal(exclusive(list, item), false)
    t.end()
  })

  t.test('should return false if the item is undefined', t => {
    const list = ['item1', 'item2', 'item3']
    const item = undefined
    t.equal(exclusive(list, item), false)
    t.end()
  })

  t.test('should return false if the list contains null or undefined', t => {
    const list = [null, undefined]
    const item = 'item1'
    t.equal(exclusive(list, item), false)
    t.end()
  })

  t.end()
})

