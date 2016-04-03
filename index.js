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

function endWith(str, suffix) {

  str = '' + str;

  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function fixBaseName(baseName) {

  if (!baseName) {
    throw new Error('The "basename" should be specified.')
  }

  if (!endWith(baseName, 'rc')) {
    baseName += 'rc';
  }

  return baseName;
}

function fixRoot(root) {

  var cwd = process.cwd();

  if (!root) {
    return cwd;
  }

  if (!isAbsolute(root)) {
    root = path.resolve(cwd, root);
  }

  return root;
}


exports.load = function (baseName, root) {

  baseName = fixBaseName(baseName);
  root     = fixRoot(root);

  var legacy = path.join(root, '.' + baseName);
  var result = null;

  [
    loadJSConfig.bind(null, legacy + '.js'),
    loadYAMLConfig.bind(null, legacy + '.yaml'),
    loadYAMLConfig.bind(null, legacy + '.yml'),
    loadJSONConfig.bind(null, legacy + '.json'),
    loadLegacyConfig.bind(null, legacy),
    loadPackageConfig.bind(null, path.join(cwd, 'package.json'), baseName.substr(0, baseName.length - 2)),
  ].some(function (loadConfig) {
    result = loadConfig();
    if (result) {
      return true;
    }
  });

  return result;
};
