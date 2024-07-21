const t = require('tap');
const makePackageNames = require('../lib/makePackageNames');

t.test('makePackageNames', t => {
  // Test with package names that include hyphens
  t.deepEqual(makePackageNames(['abba-name', 'anna']), ['abbaName', 'anna'], 'Hyphenated names should be camelCased');
  
  // Test with package names that include dots
  t.deepEqual(makePackageNames(['lodash.zipobject']), ['lodashZipobject'], 'Dot-separated names should be camelCased');
  
  // Test with package names that include both hyphens and dots
  t.deepEqual(makePackageNames(['gulp-plumber', 'gulp']), ['plumber', 'gulp'], 'Hyphenated names should be camelCased and gulp should remain gulp');
  
  // Test with package names that are simple strings without special characters
  t.deepEqual(makePackageNames(['simple', 'name']), ['simple', 'name'], 'Simple names should remain unchanged');
  
  // Test with package names that include multiple hyphens
  t.deepEqual(makePackageNames(['broccoli-sass', 'grunt-as-lodash']), ['sass', 'asLodash'], 'Multiple hyphens should be camelCased correctly');
  
  t.end();
});

