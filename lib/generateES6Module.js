const fs = require('fs');
const path = require('path');

/**
 * Generates an ES6 module with all imports that were imported by auto-require.
 * @param {Object} collection - The collection of modules imported by auto-require.
 * @param {string} outputPath - The path where the generated ES6 module should be saved.
 * @returns {string} - The generated ES6 module as a string.
 */
function generateES6Module(collection, outputPath) {
  let moduleContent = '';

  Object.keys(collection).forEach(moduleName => {
    moduleContent += `import ${moduleName} from '${collection[moduleName].path}';
`;
  });

  // Write the generated module to the specified output path
  fs.writeFileSync(path.resolve(outputPath), moduleContent, 'utf8');

  return moduleContent;
}

module.exports = generateES6Module;

