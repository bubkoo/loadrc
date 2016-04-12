# loadrc 

> Load runtime configuration files for your module.

[![MIT License](https://img.shields.io/badge/license-MIT_License-green.svg?style=flat-square)](https://github.com/bubkoo/loadrc/blob/master/LICENSE) 

Many NodeJS modules have `**rc**` [files](http://stackoverflow.com/questions/11030552/what-does-rc-mean-in-dot-files), such as `.babelrc`, `.eslintrc.yml`, etc. 

Use `loadrc` to parse your `rc` files into JavaScript object.

**Supported files:**

- JavaScript Module
- Yaml file
- JSON file
- Legacy file, such as `.config`
- package.json


`loadrc` will try to load these files by the listed order, stop **until** any of them loaded.

 
## Install

```
$ npm install loadrc --save
```

## Usage

```js
var loadrc = require('loadrc');
var config = loadrc.load(basename, rootDir);

// example
// -------
// try to load these files order by order: 
// - .congifrc.js
// - .congifrc.yaml
// - .congifrc.yml
// - .congifrc.json
// - .congifrc
// - load "package.json" and return "config" section
var config = loadrc.load('configrc');
```

# Contributing
 
Pull requests and stars are highly welcome. 

For bugs and feature requests, please [create an issue](https://github.com/bubkoo/loadrc/issues).
