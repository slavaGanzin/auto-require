// Import the tap testing framework
const t = require('tap');

// Import the contains function
const contains = require('../lib/contains');

// Test cases for the contains function
t.test('contains', t => {
  // Scenario: Module is in the list
  t.equal(contains(['module1', 'module2', 'module3'], 'module2'), true, 'should return true when module is in the list');

  // Scenario: Module is not in the list
  t.equal(contains(['module1', 'module2', 'module3'], 'module4'), false, 'should return false when module is not in the list');

  // Scenario: List is empty
  t.equal(contains([], 'module1'), false, 'should return false when list is empty');

  // Scenario: Module is null
  t.equal(contains(['module1', 'module2', 'module3'], null), false, 'should return false when module is null');

  // Scenario: Module is undefined
  t.equal(contains(['module1', 'module2', 'module3'], undefined), false, 'should return false when module is undefined');

  // Scenario: List contains null values
  t.equal(contains([null, 'module2', 'module3'], 'module2'), true, 'should return true when list contains null values and module is in the list');
  t.equal(contains([null, 'module2', 'module3'], 'module1'), false, 'should return false when list contains null values and module is not in the list');

  // Scenario: List contains undefined values
  t.equal(contains([undefined, 'module2', 'module3'], 'module2'), true, 'should return true when list contains undefined values and module is in the list');
  t.equal(contains([undefined, 'module2', 'module3'], 'module1'), false, 'should return false when list contains undefined values and module is not in the list');

  t.end();
});

