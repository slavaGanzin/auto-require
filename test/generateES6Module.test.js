const t = require('tap')
const fs = require('fs')
const path = require('path')
const generateES6Module = require('../lib/generateES6Module')

t.test('generateES6Module', t => {
  const collection = {
    lodashCamelcase: require('lodash.camelcase'),
    lodashZipobject: require('lodash.zipobject'),
    eslint: require('eslint')
  }

  const expectedOutput = `
import lodashCamelcase from 'lodash.camelcase';
import lodashZipobject from 'lodash.zipobject';
import eslint from 'eslint';
`.trim()

  const tempFilePath = path.join(__dirname, 'tempES6Module.js')

  // Generate the ES6 module
  generateES6Module(collection, tempFilePath)

  // Read the generated file
  const generatedContent = fs.readFileSync(tempFilePath, 'utf8')

  // Compare the generated content with the expected output
  t.equal(generatedContent.trim(), expectedOutput, 'Generated ES6 module should match the expected output')

  // Clean up the temporary file
  fs.unlinkSync(tempFilePath)

  t.end()
})

