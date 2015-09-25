// Generated by CoffeeScript 1.10.0
var $, Require;

Require = (function() {
  function Require() {
    var fs, nodeModulesName, packagesName, quest;
    fs = require('fs');
    quest = fs.readdirSync('./node_modules').slice(1);
    packagesName = this.makePackagesName(quest);
    nodeModulesName = this.makeNodeModulesName(quest);
    this.makeCollection(packagesName, nodeModulesName);
  }

  Require.prototype.makePackagesName = function(files) {
    var buildTool, i, len, one, packages, part, three, two;
    packages = [];
    one = function(arr) {
      if (arr.length === 1) {
        return true;
      }
    };
    two = function(arr) {
      if (arr.length === 2) {
        return true;
      }
    };
    three = function(arr) {
      if (arr.length === 3) {
        return true;
      }
    };
    buildTool = function(arr) {
      if (arr[0] === 'gulp' || arr[0] === 'grunt') {
        return true;
      }
    };
    for (i = 0, len = files.length; i < len; i++) {
      part = files[i];
      part = part.split('-');
      if (one(part)) {
        packages.push(part[0]);
      } else if (((one(part)) || (two(part))) && buildTool(part)) {
        packages.push(part[1]);
      } else if ((three(part)) && buildTool(part)) {
        packages.push("" + part[1] + (part[2][0].toUpperCase()) + part[2].slice(1));
      } else if ((two(part)) && !buildTool(part)) {
        packages.push("" + part[0] + (part[1][0].toUpperCase()) + part[1].slice(1));
      } else if ((three(part)) && !buildTool(part)) {
        packages.push("" + part[0] + (part[1][0].toUpperCase()) + part[1].slice(1) + (part[2][0].toUpperCase()) + part[2].slice(1));
      }
    }
    return packages;
  };

  Require.prototype.makeNodeModulesName = function(files) {
    var file, i, len, results;
    results = [];
    for (i = 0, len = files.length; i < len; i++) {
      file = files[i];
      results.push(require(file));
    }
    return results;
  };

  Require.prototype.makeCollection = function(a, b) {
    var zipObject;
    zipObject = require('lodash.zipobject');
    return this.collection = zipObject(a, b);
  };

  return Require;

})();

$ = new Require;

module.exports = $.collection;
