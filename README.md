# loadrc

> Load runtime configuration files for your module


Many NodeJS modules have a `"rc"` [file](http://stackoverflow.com/questions/11030552/what-does-rc-mean-in-dot-files), such as `".babelrc"`, `".eslintrc.yml"`, etc. We can use `loadrc` parsing your `"rc"` file to JavaScript object.

**Supported files:**

- JavaScript Module
- Yaml file
- JSON file
- Legacy file, such as `".config"`
- package.json


`loadrc` will try to load these files by the listed order, and stop **until** any of them loaded.

 
## Install

## Useage


