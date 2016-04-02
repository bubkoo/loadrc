var fs         = require('fs');
var path       = require('path');
var yaml       = require('js-yaml');
var stripMe    = require('strip-json-comments');
var isAbsolute = require('path-is-absolute');


function readFile(filePath) {
  return fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
};

function loadJSConfig(filePath) {
  try {
    return require(filePath);
  } catch (e) {
    return false;
  }
}

function loadYAMLConfig(filePath) {
  try {
    return yaml.safeLoad(readFile(filePath)) || {};
  } catch (e) {
    return false;
  }
}

function loadJSONConfig(filePath) {
  try {
    return JSON.parse(stripMe(readFile(filePath)));
  } catch (e) {
    return false;
  }
}

function loadLegacyConfig(filePath) {
  try {
    return yaml.safeLoad(stripMe(readFile(filePath))) || {};
  } catch (e) {
    return false;
  }
}

function loadPackageConfig(filePath, baseName) {
  try {
    return require(filePath)[baseName] || null;
  } catch (e) {
    return false;
  }
}


exports.load = function (baseName, root) {

  var cwd = process.cwd();

  root = root || cwd;

  if (!isAbsolute(root)) {
    root = path.resolve(cwd, root);
  }

  var legacy = path.join(root, '.' + baseName);
  var result = null;

  [
    loadJSConfig.bind(null, legacy + 'rc.js'),
    loadYAMLConfig.bind(null, legacy + 'rc.yaml'),
    loadYAMLConfig.bind(null, legacy + 'rc.yml'),
    loadJSONConfig.bind(null, legacy + 'rc.json'),
    loadLegacyConfig.bind(null, legacy + 'rc'),
    loadPackageConfig.bind(null, path.join(cwd, 'package.json'), baseName),
  ].some(function (loadConfig) {
    result = loadConfig();
    if (result) {
      return true;
    }
  });

  return result;
};
