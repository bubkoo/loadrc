# loadrc 

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/bubkoo/loadrc/blob/master/LICENSE) 

[![npm:](https://img.shields.io/npm/v/loadrc.svg?style=flat-square)](https://www.npmjs.com/packages/loadrc)
[![downloads:?](https://img.shields.io/npm/dm/loadrc.svg?style=flat-square)](https://www.npmjs.com/packages/loadrc)
[![dependencies:?](https://img.shields.io/david/bubkoo/loadrc.svg?style=flat-square)](https://david-dm.org/bubkoo/loadrc)

> Load runtime configuration files for your module


Many NodeJS modules have a `**rc**` [file](http://stackoverflow.com/questions/11030552/what-does-rc-mean-in-dot-files), such as `.babelrc`, `.eslintrc.yml`, etc. We can use `loadrc` to parse your `rc` file into JavaScript object.

**Supported files:**

- JavaScript Module
- Yaml file
- JSON file
- Legacy file, such as `.config`
- package.json


`loadrc` will try to load these files by the listed order, and stop **until** any of them loaded.

 
## Install

```
$ npm install loadrc --save
```

## Useage

```js
var loadrc = require('loadrc');
var config = loadrc.load(basename, rootDir);

// example
// -------
// try to load these files order by order: 
// - .congif.js
// - .congif.yaml
// - .congif.yml
// - .congif.json
// - .congif
// - load "package.json" and return "config" section
var config = loadrc.load('config');
```

