const t = require('tap')
const drop = require('../lib/drop')

t.test('drop', t => {
  // Test dropping a single element from a list
  t.deepEqual(drop([1, 2, 3], [2]), [1, 3], 'Should drop the element 2 from the list [1, 2, 3]')
  
  // Test dropping multiple elements from a list
  t.deepEqual(drop([1, 2, 3, 4], [2, 4]), [1, 3], 'Should drop the elements 2 and 4 from the list [1, 2, 3, 4]')
  
  // Test dropping elements that are not in the list
  t.deepEqual(drop([1, 2, 3], [4]), [1, 2, 3], 'Should not change the list [1, 2, 3] when dropping element 4')
  
  // Test dropping elements from an empty list
  t.deepEqual(drop([], [1, 2, 3]), [], 'Should return an empty list when dropping elements from an empty list')
  
  // Test dropping null or undefined elements
  t.deepEqual(drop([1, 2, 3], [null, undefined]), [1, 2, 3], 'Should not change the list [1, 2, 3] when dropping null or undefined elements')
  
  // Test dropping elements when the list contains null or undefined values
  t.deepEqual(drop([1, null, 2, undefined, 3], [null, undefined]), [1, 2, 3], 'Should drop null and undefined elements from the list [1, null, 2, undefined, 3]')
  
  t.end()
})

