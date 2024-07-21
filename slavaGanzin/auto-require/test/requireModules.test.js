const t = require('tap');
const requireModules = require('../lib/requireModules');

t.test('requireModules', t => {
  t.test('should correctly require a single module', t => {
    const modules = requireModules(['lodash.camelcase']);
    t.ok(modules);
    t.ok(modules[0]);
    t.equal(typeof modules[0], 'function');
    t.end();
  });

  t.test('should correctly require multiple modules', t => {
    const modules = requireModules(['lodash.camelcase', 'lodash.zipobject']);
    t.ok(modules);
    t.equal(modules.length, 2);
    t.equal(typeof modules[0], 'function');
    t.equal(typeof modules[1], 'function');
    t.end();
  });

  t.test('should throw an error when a module does not exist', t => {
    t.throws(() => requireModules(['non-existent-module']), {
      message: /Cannot find module/
    });
    t.end();
  });

  t.test('should handle an empty array of modules correctly', t => {
    const modules = requireModules([]);
    t.ok(modules);
    t.equal(modules.length, 0);
    t.end();
  });

  t.end();
});

